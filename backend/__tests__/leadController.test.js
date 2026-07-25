/**
 * Unit tests for the lead controller.
 *
 * Strategy: mock the Lead model and emailService so the controller runs
 * without a DB or SMTP. This covers:
 *   - createLead validation (required fields) and 201 response
 *   - createLead tolerates email-sending failure (lead still saved)
 *   - createLead records activity when req.logActivity is present
 *   - getLeads pagination + status filter
 *   - updateLeadStatus validation of allowed statuses and 404 on missing lead
 */
jest.mock('../models/leadModel', () => {
    const Lead = jest.fn().mockImplementation(() => ({}));
    Lead.create = jest.fn();
    Lead.find = jest.fn();
    Lead.countDocuments = jest.fn();
    Lead.findById = jest.fn();
    return Lead;
});

jest.mock('../services/emailService', () => ({
    sendEmail: jest.fn().mockResolvedValue(true)
}));

jest.mock('../utils/logger', () => ({
    error: jest.fn(),
    warn: jest.fn(),
    info: jest.fn()
}));

jest.mock('express-async-handler', () => (fn) => fn);

const Lead = require('../models/leadModel');
const emailService = require('../services/emailService');
const {
    createLead,
    getLeads,
    updateLeadStatus
} = require('../controllers/leadController');

// --- Helpers ------------------------------------------------------------

const res = () => {
    const r = {
        statusCode: 200,
        body: {},
        status(code) { this.statusCode = code; return this; },
        json(payload) { this.body = payload; return this; }
    };
    return r;
};

const throwFrom = async (fn, req) => {
    const r = res();
    try {
        await fn(req, r);
        return null;
    } catch (e) {
        return e;
    }
};

beforeEach(() => {
    jest.clearAllMocks();
});

// =====================================================================
// CREATE LEAD
// =====================================================================
describe('createLead', () => {
    const validBody = {
        company: 'Acme Corp',
        contactName: 'John Doe',
        email: 'john@acme.com',
        phone: '+919999999999',
        sector: 'Cement',
        reportingStandard: 'BRSR',
        inquiryDetails: 'Need help with BRSR reporting for FY26.'
    };

    it('creates a lead and returns 201 with leadId', async () => {
        Lead.create.mockResolvedValue({ _id: 'lead_1', ...validBody });

        const r = res();
        await createLead({ body: validBody }, r);

        expect(r.statusCode).toBe(201);
        expect(r.body.success).toBe(true);
        expect(r.body.leadId).toBe('lead_1');
        expect(Lead.create).toHaveBeenCalledTimes(1);
    });

    it('sends a lead-notification email to the team', async () => {
        Lead.create.mockResolvedValue({ _id: 'lead_1' });

        const r = res();
        await createLead({ body: validBody }, r);

        expect(emailService.sendEmail).toHaveBeenCalledWith(
            expect.any(String), // team email (EMAIL_USER || fallback)
            'leadNotification',
            expect.objectContaining({ contactName: 'John Doe', company: 'Acme Corp' })
        );
    });

    it('still succeeds when the notification email fails (email is non-blocking)', async () => {
        Lead.create.mockResolvedValue({ _id: 'lead_1' });
        emailService.sendEmail.mockRejectedValueOnce(new Error('SMTP down'));

        const r = res();
        await createLead({ body: validBody }, r);

        // The controller must NOT fail the public request just because the
        // internal notification email could not be sent.
        expect(r.statusCode).toBe(201);
        expect(r.body.success).toBe(true);
    });

    it('rejects 400 when required fields are missing', async () => {
        const err = await throwFrom(createLead, {
            body: { contactName: 'John', email: 'john@acme.com' } // no company, no inquiryDetails
        });
        expect(err).toBeTruthy();
        expect(Lead.create).not.toHaveBeenCalled();
    });

    it('calls req.logActivity when provided', async () => {
        Lead.create.mockResolvedValue({ _id: 'lead_1', ...validBody });
        const logActivity = jest.fn();

        await createLead({ body: validBody, logActivity }, res());

        expect(logActivity).toHaveBeenCalledWith(expect.objectContaining({
            action: 'lead.create',
            entityType: 'lead'
        }));
    });

    it('works when req.logActivity is absent (public route has no activity middleware)', async () => {
        Lead.create.mockResolvedValue({ _id: 'lead_1', ...validBody });

        const r = res();
        await createLead({ body: validBody }, r); // no logActivity on req

        expect(r.statusCode).toBe(201);
    });

    it('defaults optional fields to empty strings', async () => {
        Lead.create.mockResolvedValue({ _id: 'lead_1' });

        await createLead({
            body: {
                company: 'Acme',
                contactName: 'John',
                email: 'john@acme.com',
                inquiryDetails: 'help'
            }
        }, res());

        const arg = Lead.create.mock.calls[0][0];
        expect(arg.phone).toBe('');
        expect(arg.sector).toBe('');
        expect(arg.reportingStandard).toBe('');
    });
});

// =====================================================================
// GET LEADS (admin)
// =====================================================================
describe('getLeads', () => {
    // The controller chains .find().sort().skip().limit().lean() — mock the chain.
    const mockChain = (resolvedValue = []) => ({
        sort: jest.fn().mockReturnThis(),
        skip: jest.fn().mockReturnThis(),
        limit: jest.fn().mockReturnThis(),
        lean: jest.fn().mockResolvedValue(resolvedValue)
    });

    it('returns paginated leads with total + pages', async () => {
        Lead.find.mockReturnValue(mockChain([{ _id: 'lead_1' }]));
        Lead.countDocuments.mockResolvedValue(25);

        const r = res();
        await getLeads({ query: { page: '2', limit: '10' } }, r);

        expect(r.statusCode).toBe(200);
        expect(r.body.total).toBe(25);
        expect(r.body.page).toBe(2);
        expect(r.body.pages).toBe(3); // ceil(25/10)
        expect(r.body.data).toHaveLength(1);
    });

    it('applies status filter when present', async () => {
        Lead.find.mockReturnValue(mockChain([]));
        Lead.countDocuments.mockResolvedValue(0);

        await getLeads({ query: { status: 'qualified' } }, res());

        // Lead.find is called with a filter object.
        expect(Lead.find).toHaveBeenCalledWith({ status: 'qualified' });
    });

    it('defaults to page 1 / limit 50 when query params are absent', async () => {
        Lead.find.mockReturnValue(mockChain([]));
        Lead.countDocuments.mockResolvedValue(0);

        const r = res();
        await getLeads({ query: {} }, r);

        expect(r.body.page).toBe(1);
        expect(r.body.pages).toBe(0);
    });
});

// =====================================================================
// UPDATE LEAD STATUS (admin)
// =====================================================================
describe('updateLeadStatus', () => {
    it('updates a lead to a valid status', async () => {
        const lead = {
            _id: 'lead_1',
            status: 'new',
            save: jest.fn().mockResolvedValue(true)
        };
        Lead.findById.mockResolvedValue(lead);

        const r = res();
        await updateLeadStatus({ params: { id: 'lead_1' }, body: { status: 'qualified' } }, r);

        expect(lead.status).toBe('qualified');
        expect(lead.save).toHaveBeenCalled();
        expect(r.statusCode).toBe(200);
    });

    it('rejects an invalid status with 400', async () => {
        const err = await throwFrom(updateLeadStatus, {
            params: { id: 'lead_1' },
            body: { status: 'invalid_status' }
        });
        expect(err).toBeTruthy();
    });

    it('returns 404 when the lead does not exist', async () => {
        Lead.findById.mockResolvedValue(null);

        const err = await throwFrom(updateLeadStatus, {
            params: { id: 'missing' },
            body: { status: 'closed' }
        });
        expect(err).toBeTruthy();
    });

    it('accepts all four lifecycle statuses', async () => {
        for (const status of ['new', 'contacted', 'qualified', 'closed']) {
            const lead = { status: 'new', save: jest.fn().mockResolvedValue(true) };
            Lead.findById.mockResolvedValue(lead);

            const r = res();
            await updateLeadStatus({ params: { id: 'x' }, body: { status } }, r);

            expect(lead.status).toBe(status);
        }
    });
});
