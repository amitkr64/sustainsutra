const express = require('express');
const router = express.Router();

// Import controllers
const {
    getAllEntities,
    getMyEntity,
    getEntityById,
    createEntity,
    updateEntity,
    updateEntityStatus,
    deleteEntity,
    getEntityDashboard,
    getEntityStats
} = require('../controllers/cctsEntityController');

const {
    getMonitoringData,
    getMonitoringDataById,
    createMonitoringData,
    updateMonitoringData,
    calculateEmissions,
    submitForVerification,
    assignVerifier,
    deleteMonitoringData,
    getMonitoringStats
} = require('../controllers/monitoringController');

const {
    getVerificationReports,
    getPendingVerifications,
    getVerificationReportById,
    createVerificationReport,
    updateVerificationReport,
    submitVerificationReport,
    approveVerificationReport,
    rejectVerificationReport,
    getVerificationStats
} = require('../controllers/verificationController');

const {
    getEmissionFactors,
    getEmissionFactorById,
    createEmissionFactor,
    updateEmissionFactor,
    deleteEmissionFactor,
    findApplicableFactor
} = require('../controllers/emissionFactorController');

const {
    getOffsetProjects,
    getOffsetProjectById,
    createOffsetProject,
    updateOffsetProject,
    retireCredits,
    getAvailableOffsetsByType
} = require('../controllers/offsetProjectController');

const {
    getCCCBalances,
    getCCCBalanceById,
    getMyCCCBalance,
    applyOffsetCredits,
    purchaseCredits,
    sellCredits,
    getEntityComplianceHistory,
    getCCCBalanceStats
} = require('../controllers/cccBalanceController');

// Import middleware
const { protect } = require('../middleware/authMiddleware');
const {
    cctsEntity,
    cctsVerifier,
    cctsAdmin,
    anyCCTSRole,
    checkVerifierAccreditation
} = require('../middleware/cctsAuthMiddleware');

// ==================== ENTITY ROUTES ====================

// GET /api/ccts/entities - Get all entities (Admin only)
router.get('/entities', protect, cctsAdmin, getAllEntities);

// GET /api/ccts/entities/stats/overview - Get entity statistics (Admin only)
router.get('/entities/stats/overview', protect, cctsAdmin, getEntityStats);

// GET /api/ccts/entities/my-entity - Get my entity profile (Entity user)
router.get('/entities/my-entity', protect, cctsEntity, getMyEntity);

// POST /api/ccts/entities - Create new entity (Admin only)
router.post('/entities', protect, cctsAdmin, createEntity);

// GET /api/ccts/entities/:id - Get entity by ID
router.get('/entities/:id', protect, anyCCTSRole, getEntityById);

// PUT /api/ccts/entities/:id - Update entity
router.put('/entities/:id', protect, updateEntity);

// PATCH /api/ccts/entities/:id/status - Update entity status (Admin only)
router.patch('/entities/:id/status', protect, cctsAdmin, updateEntityStatus);

// DELETE /api/ccts/entities/:id - Delete entity (Admin only)
router.delete('/entities/:id', protect, cctsAdmin, deleteEntity);

// GET /api/ccts/entities/:id/dashboard - Get entity dashboard
router.get('/entities/:id/dashboard', protect, getEntityDashboard);

// ==================== MONITORING DATA ROUTES ====================

// GET /api/ccts/monitoring - Get monitoring data (filtered by role)
router.get('/monitoring', protect, anyCCTSRole, getMonitoringData);

// GET /api/ccts/monitoring/stats/overview - Get monitoring statistics (Admin only)
router.get('/monitoring/stats/overview', protect, cctsAdmin, getMonitoringStats);

// POST /api/ccts/monitoring - Create new monitoring data (Entity only)
router.post('/monitoring', protect, cctsEntity, createMonitoringData);

// GET /api/ccts/monitoring/:id - Get monitoring data by ID
router.get('/monitoring/:id', protect, anyCCTSRole, getMonitoringDataById);

// PUT /api/ccts/monitoring/:id - Update monitoring data (Entity owner only)
router.put('/monitoring/:id', protect, cctsEntity, updateMonitoringData);

// POST /api/ccts/monitoring/:id/calculate - Calculate emissions
router.post('/monitoring/:id/calculate', protect, cctsEntity, calculateEmissions);

// POST /api/ccts/monitoring/:id/submit - Submit for verification
router.post('/monitoring/:id/submit', protect, cctsEntity, submitForVerification);

// PATCH /api/ccts/monitoring/:id/assign-verifier - Assign verifier (Admin only)
router.patch('/monitoring/:id/assign-verifier', protect, cctsAdmin, assignVerifier);

// DELETE /api/ccts/monitoring/:id - Delete monitoring data
router.delete('/monitoring/:id', protect, deleteMonitoringData);

// ==================== VERIFICATION ROUTES ====================

// GET /api/ccts/verification - Get verification reports
router.get('/verification', protect, checkVerifierAccreditation, getVerificationReports);

// GET /api/ccts/verification/pending - Get pending verifications (Verifier only)
router.get('/verification/pending', protect, cctsVerifier, checkVerifierAccreditation, getPendingVerifications);

// GET /api/ccts/verification/stats/overview - Get verification statistics (Admin only)
router.get('/verification/stats/overview', protect, cctsAdmin, getVerificationStats);

// POST /api/ccts/verification - Create verification report (Verifier only)
router.post('/verification', protect, cctsVerifier, checkVerifierAccreditation, createVerificationReport);

// GET /api/ccts/verification/:id - Get verification report by ID
router.get('/verification/:id', protect, anyCCTSRole, getVerificationReportById);

// PUT /api/ccts/verification/:id - Update verification report (Verifier only)
router.put('/verification/:id', protect, cctsVerifier, updateVerificationReport);

// POST /api/ccts/verification/:id/submit - Submit verification report (Verifier only)
router.post('/verification/:id/submit', protect, cctsVerifier, submitVerificationReport);

// POST /api/ccts/verification/:id/approve - Approve verification report (Admin only)
router.post('/verification/:id/approve', protect, cctsAdmin, approveVerificationReport);

// POST /api/ccts/verification/:id/reject - Reject verification report (Admin only)
router.post('/verification/:id/reject', protect, cctsAdmin, rejectVerificationReport);

// ==================== EMISSION FACTOR ROUTES ====================

// GET /api/ccts/emission-factors - Get all emission factors (Public)
router.get('/emission-factors', getEmissionFactors);

// POST /api/ccts/emission-factors/find - Find applicable emission factor (Public)
router.post('/emission-factors/find', findApplicableFactor);

// POST /api/ccts/emission-factors - Create emission factor (Private)
router.post('/emission-factors', protect, createEmissionFactor);

// GET /api/ccts/emission-factors/:id - Get emission factor by ID (Public)
router.get('/emission-factors/:id', getEmissionFactorById);

// PUT /api/ccts/emission-factors/:id - Update emission factor (Private)
router.put('/emission-factors/:id', protect, updateEmissionFactor);

// DELETE /api/ccts/emission-factors/:id - Delete emission factor (Admin only)
router.delete('/emission-factors/:id', protect, cctsAdmin, deleteEmissionFactor);

// ==================== OFFSET PROJECT ROUTES ====================

// GET /api/ccts/offset-projects - Get all offset projects (Public)
router.get('/offset-projects', getOffsetProjects);

// GET /api/ccts/offset-projects/available/:type - Get available offsets by type (Public)
router.get('/offset-projects/available/:type', getAvailableOffsetsByType);

// POST /api/ccts/offset-projects - Create offset project (Private)
router.post('/offset-projects', protect, createOffsetProject);

// GET /api/ccts/offset-projects/:id - Get offset project by ID (Public)
router.get('/offset-projects/:id', getOffsetProjectById);

// PUT /api/ccts/offset-projects/:id - Update offset project (Private/Owner or Admin)
router.put('/offset-projects/:id', protect, updateOffsetProject);

// POST /api/ccts/offset-projects/:id/retire-credits - Retire credits (Private)
router.post('/offset-projects/:id/retire-credits', protect, retireCredits);

// ==================== CCC BALANCE ROUTES ====================

// GET /api/ccts/ccc-balance - Get CCC balances (filtered by role)
router.get('/ccc-balance', protect, anyCCTSRole, getCCCBalances);

// GET /api/ccts/ccc-balance/stats/overview - Get CCC balance statistics (Admin only)
router.get('/ccc-balance/stats/overview', protect, cctsAdmin, getCCCBalanceStats);

// GET /api/ccts/ccc-balance/my-balance/:complianceYear - Get my balance (Entity only)
router.get('/ccc-balance/my-balance/:complianceYear', protect, cctsEntity, getMyCCCBalance);

// GET /api/ccts/ccc-balance/entity/:entityId/history - Get entity compliance history
router.get('/ccc-balance/entity/:entityId/history', protect, getEntityComplianceHistory);

// GET /api/ccts/ccc-balance/:id - Get CCC balance by ID
router.get('/ccc-balance/:id', protect, anyCCTSRole, getCCCBalanceById);

// POST /api/ccts/ccc-balance/:id/apply-offset - Apply offset credits
router.post('/ccc-balance/:id/apply-offset', protect, applyOffsetCredits);

// POST /api/ccts/ccc-balance/:id/purchase-credits - Purchase credits
router.post('/ccc-balance/:id/purchase-credits', protect, purchaseCredits);

// POST /api/ccts/ccc-balance/:id/sell-credits - Sell credits
router.post('/ccc-balance/:id/sell-credits', protect, sellCredits);

module.exports = router;
