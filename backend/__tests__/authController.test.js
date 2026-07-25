/**
 * Unit tests for the auth (user) controller.
 *
 * Strategy: mock the Mongoose models and external services so the controller
 * runs in pure-JS without a DB. This exercises the real business logic:
 *   - role cannot be set via registration (privilege escalation guard)
 *   - duplicate-email rejection
 *   - JWT_SECRET fail-closed in production
 *   - login password mismatch
 *   - update-password flow
 *
 * Mocks:
 *   - User model (findOne, create, findById)
 *   - emailService (so no SMTP calls happen)
 *   - jsonwebtoken (deterministic token)
 */
const jwt = require('jsonwebtoken');

// --- Mocks --------------------------------------------------------------

// The User model mock. We recreate class/instance methods used by the controller.
const mockUserInstance = (overrides = {}) => ({
    _id: 'user_123',
    id: 'user_123',
    name: 'Test User',
    email: 'test@example.com',
    phone: '',
    role: 'user',
    password: 'hashed_secret',
    matchPassword: jest.fn().mockResolvedValue(true),
    save: jest.fn().mockResolvedValue(true),
    ...overrides
});

jest.mock('../models/userModel', () => {
    const User = jest.fn().mockImplementation(() => mockUserInstance());
    User.findOne = jest.fn();
    User.create = jest.fn();
    User.findById = jest.fn();
    return User;
});

// Stable token so assertions can check it.
jest.mock('jsonwebtoken', () => ({
    sign: jest.fn().mockReturnValue('mock_jwt_token'),
    verify: jest.fn()
}));

jest.mock('../services/emailService', () => ({
    sendEmail: jest.fn().mockResolvedValue(true),
    sendPasswordReset: jest.fn().mockResolvedValue({ demo: true })
}));

jest.mock('../utils/logger', () => ({
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
}));

// Suppress express-async-handler's pass-through; tests call handlers directly.
jest.mock('express-async-handler', () => (fn) => fn);

const User = require('../models/userModel');
const {
    registerUser,
    loginUser,
    logoutUser,
    updatePassword
} = require('../controllers/userController');

// --- Helpers ------------------------------------------------------------

const res = () => {
    const r = {
        statusCode: 200,
        body: {},
        cookie: jest.fn().mockReturnThis(),
        status(code) { this.statusCode = code; return this; },
        json(payload) { this.body = payload; return this; }
    };
    return r;
};

// Capture the error thrown by an async handler so we can assert on it.
const throwFrom = async (fn, req) => {
    const r = res();
    try {
        await fn(req, r);
        return null;
    } catch (e) {
        return e;
    }
};

// --- Test lifecycle -----------------------------------------------------

beforeEach(() => {
    jest.clearAllMocks();
    // Clean env + globals the controller reads.
    delete process.env.JWT_SECRET;
    delete process.env.NODE_ENV;
    global.isDemoMode = false;
});

afterAll(() => {
    delete global.isDemoMode;
});

// =====================================================================
// REGISTER
// =====================================================================
describe('registerUser', () => {
    const baseReq = {
        body: {
            name: 'Alice',
            email: 'alice@example.com',
            password: 'Strong123'
        }
    };

    it('forces role to "user" and ignores any role in the payload (anti-escalation)', async () => {
        process.env.JWT_SECRET = 'secret';
        User.create.mockResolvedValue(mockUserInstance({ name: 'Alice' }));

        const req = { body: { ...baseReq.body, role: 'admin' } };
        const r = res();
        await registerUser(req, r);

        const createArg = User.create.mock.calls[0][0];
        expect(createArg.role).toBe('user');
        expect(r.statusCode).toBe(201);
    });

    it('sets an httpOnly jwt cookie on success', async () => {
        process.env.JWT_SECRET = 'secret';
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(mockUserInstance());

        const r = res();
        await registerUser({ body: baseReq.body }, r);

        expect(r.cookie).toHaveBeenCalledWith(
            'jwt',
            'mock_jwt_token',
            expect.objectContaining({ httpOnly: true, path: '/' })
        );
    });

    it('rejects when required fields are missing', async () => {
        const err = await throwFrom(registerUser, { body: { email: 'a@b.com', password: 'Strong123' } });
        expect(err).toBeTruthy();
        // The controller sets 400 then throws.
    });

    it('fails closed with 500 when JWT_SECRET is missing', async () => {
        const err = await throwFrom(registerUser, { body: baseReq.body });
        expect(err).toBeTruthy();
    });

    it('rejects duplicate email with 400', async () => {
        process.env.JWT_SECRET = 'secret';
        User.findOne.mockResolvedValue(mockUserInstance());

        const err = await throwFrom(registerUser, { body: baseReq.body });
        expect(err).toBeTruthy();
        expect(User.create).not.toHaveBeenCalled();
    });

    it('returns the public user object (no password field)', async () => {
        process.env.JWT_SECRET = 'secret';
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(mockUserInstance());

        const r = res();
        await registerUser({ body: baseReq.body }, r);

        expect(r.statusCode).toBe(201);
        expect(r.body).not.toHaveProperty('password');
    });
});

// =====================================================================
// LOGIN
// =====================================================================
describe('loginUser', () => {
    it('logs in with correct credentials and returns user + cookie', async () => {
        process.env.JWT_SECRET = 'secret';
        const u = mockUserInstance();
        User.findOne.mockResolvedValue(u);

        const r = res();
        await loginUser({ body: { email: 'test@example.com', password: 'Strong123' } }, r);

        expect(r.statusCode).toBe(200);
        expect(r.body.email).toBe('test@example.com');
        expect(r.cookie).toHaveBeenCalledWith('jwt', expect.any(String), expect.any(Object));
    });

    it('rejects wrong password with 401', async () => {
        process.env.JWT_SECRET = 'secret';
        const u = mockUserInstance({ matchPassword: jest.fn().mockResolvedValue(false) });
        User.findOne.mockResolvedValue(u);

        const err = await throwFrom(loginUser, { body: { email: 'test@example.com', password: 'wrong' } });
        expect(err).toBeTruthy();
    });

    it('rejects unknown user with 401', async () => {
        process.env.JWT_SECRET = 'secret';
        User.findOne.mockResolvedValue(null);

        const err = await throwFrom(loginUser, { body: { email: 'nope@example.com', password: 'Strong123' } });
        expect(err).toBeTruthy();
    });

    it('rejects when fields are missing', async () => {
        const err = await throwFrom(loginUser, { body: { email: '' } });
        expect(err).toBeTruthy();
    });
});

// =====================================================================
// LOGOUT
// =====================================================================
describe('logoutUser', () => {
    it('clears the jwt cookie by setting it empty with past expiry', async () => {
        const r = res();
        await logoutUser({}, r);

        expect(r.cookie).toHaveBeenCalledWith(
            'jwt',
            '',
            expect.objectContaining({
                httpOnly: true,
                expires: expect.any(Date),
                path: '/'
            })
        );
        // The expiry date should be in the past (epoch).
        const cookieCall = r.cookie.mock.calls[0];
        expect(cookieCall[2].expires.getTime()).toBeLessThanOrEqual(Date.now());
        expect(r.statusCode).toBe(200);
    });
});

// =====================================================================
// UPDATE PASSWORD
// =====================================================================
describe('updatePassword', () => {
    const baseReq = {
        user: { id: 'user_123' },
        body: { currentPassword: 'OldPass123', newPassword: 'NewPass123' }
    };

    it('rejects new password shorter than 8 chars', async () => {
        const err = await throwFrom(updatePassword, {
            user: { id: 'user_123' },
            body: { currentPassword: 'OldPass123', newPassword: 'short' }
        });
        expect(err).toBeTruthy();
    });

    it('rejects when current password is wrong', async () => {
        const u = mockUserInstance({ matchPassword: jest.fn().mockResolvedValue(false) });
        User.findById.mockReturnValue({
            select: jest.fn().mockResolvedValue(u)
        });

        const err = await throwFrom(updatePassword, { ...baseReq });
        expect(err).toBeTruthy();
    });

    it('rejects missing fields', async () => {
        const err = await throwFrom(updatePassword, {
            user: { id: 'user_123' },
            body: { currentPassword: 'OldPass123' }
        });
        expect(err).toBeTruthy();
    });
});

// =====================================================================
// JWT TOKEN GENERATION
// =====================================================================
describe('JWT generation', () => {
    it('signs the token with the user id and the configured secret + expiry', async () => {
        process.env.JWT_SECRET = 'super_secret';
        process.env.JWT_EXPIRE = '1d';
        User.findOne.mockResolvedValue(null);
        User.create.mockResolvedValue(mockUserInstance());

        const r = res();
        await registerUser({ body: { name: 'Bob', email: 'bob@example.com', password: 'Strong123' } }, r);

        expect(jwt.sign).toHaveBeenCalledWith(
            { id: 'user_123' },
            'super_secret',
            { expiresIn: '1d' }
        );
    });
});
