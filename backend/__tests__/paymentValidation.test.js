const crypto = require('crypto');
const { registerSchema, loginSchema, changePasswordSchema, resetPasswordSchema, forgotPasswordSchema } = require('../validations/userValidation');

describe('Razorpay signature verification logic', () => {
    const SECRET = 'test_payment_secret';

    // This replicates the exact verification logic from paymentController.js
    const verifySignature = (orderId, paymentId, signature, keySecret) => {
        const expected = crypto
            .createHmac('sha256', keySecret)
            .update(`${orderId}|${paymentId}`)
            .digest('hex');
        return expected === signature;
    };

    it('verifies a correct signature', () => {
        const orderId = 'order_abc123';
        const paymentId = 'pay_xyz789';
        const expected = crypto.createHmac('sha256', SECRET).update(`${orderId}|${paymentId}`).digest('hex');
        expect(verifySignature(orderId, paymentId, expected, SECRET)).toBe(true);
    });

    it('rejects a tampered payment ID', () => {
        const orderId = 'order_abc123';
        const paymentId = 'pay_xyz789';
        const expected = crypto.createHmac('sha256', SECRET).update(`${orderId}|${paymentId}`).digest('hex');
        expect(verifySignature(orderId, paymentId + 'TAMPERED', expected, SECRET)).toBe(false);
    });

    it('rejects a tampered order ID', () => {
        const orderId = 'order_abc123';
        const paymentId = 'pay_xyz789';
        const expected = crypto.createHmac('sha256', SECRET).update(`${orderId}|${paymentId}`).digest('hex');
        expect(verifySignature(orderId + 'TAMPERED', paymentId, expected, SECRET)).toBe(false);
    });

    it('rejects a wrong secret', () => {
        const orderId = 'order_abc123';
        const paymentId = 'pay_xyz789';
        const expected = crypto.createHmac('sha256', SECRET).update(`${orderId}|${paymentId}`).digest('hex');
        expect(verifySignature(orderId, paymentId, expected, 'wrong_secret')).toBe(false);
    });

    it('rejects a completely wrong signature', () => {
        expect(verifySignature('order_1', 'pay_1', 'bogus_signature', SECRET)).toBe(false);
    });
});

describe('Auth validation schemas', () => {
    describe('registerSchema', () => {
        it('accepts valid registration', () => {
            const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'Abcdef12' });
            expect(result.success).toBe(true);
        });

        it('strips role (privilege escalation protection)', () => {
            const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'Abcdef12', role: 'admin' });
            expect(result.success).toBe(true);
            expect(result.data.role).toBeUndefined();
        });

        it('rejects weak password (no uppercase)', () => {
            const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'abcdef12' });
            expect(result.success).toBe(false);
        });

        it('rejects weak password (no number)', () => {
            const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'Abcdefgh' });
            expect(result.success).toBe(false);
        });

        it('rejects short password', () => {
            const result = registerSchema.safeParse({ name: 'Alice', email: 'alice@test.com', password: 'Ab1' });
            expect(result.success).toBe(false);
        });

        it('rejects invalid email', () => {
            const result = registerSchema.safeParse({ name: 'Alice', email: 'not-an-email', password: 'Abcdef12' });
            expect(result.success).toBe(false);
        });
    });

    describe('loginSchema', () => {
        it('accepts valid login', () => {
            expect(loginSchema.safeParse({ email: 'a@b.com', password: 'x' }).success).toBe(true);
        });
        it('rejects invalid email', () => {
            expect(loginSchema.safeParse({ email: 'bad', password: 'x' }).success).toBe(false);
        });
    });

    describe('changePasswordSchema', () => {
        it('accepts valid passwords', () => {
            expect(changePasswordSchema.safeParse({ currentPassword: 'old', newPassword: 'Newpass12' }).success).toBe(true);
        });
        it('rejects weak new password', () => {
            expect(changePasswordSchema.safeParse({ currentPassword: 'old', newPassword: 'weak' }).success).toBe(false);
        });
    });

    describe('resetPasswordSchema', () => {
        it('accepts valid reset', () => {
            expect(resetPasswordSchema.safeParse({ token: 'abc', password: 'Newpass12' }).success).toBe(true);
        });
        it('rejects missing token', () => {
            expect(resetPasswordSchema.safeParse({ password: 'Newpass12' }).success).toBe(false);
        });
        it('rejects weak password', () => {
            expect(resetPasswordSchema.safeParse({ token: 'abc', password: 'weak' }).success).toBe(false);
        });
    });

    describe('forgotPasswordSchema', () => {
        it('accepts valid email', () => {
            expect(forgotPasswordSchema.safeParse({ email: 'a@b.com' }).success).toBe(true);
        });
        it('rejects invalid email', () => {
            expect(forgotPasswordSchema.safeParse({ email: 'bad' }).success).toBe(false);
        });
    });
});
