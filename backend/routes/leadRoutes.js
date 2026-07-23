const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/authMiddleware');
const { authLimiter } = require('../middleware/rateLimitMiddleware');
const { createLead, getLeads, updateLeadStatus } = require('../controllers/leadController');

// Public: submit a lead (rate-limited to prevent spam)
router.post('/', authLimiter, createLead);

// Admin: manage leads
router.get('/', protect, admin, getLeads);
router.patch('/:id/status', protect, admin, updateLeadStatus);

module.exports = router;
