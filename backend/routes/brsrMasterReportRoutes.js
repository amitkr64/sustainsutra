const express = require('express');
const router = express.Router();
const {
    getReports,
    getReportById,
    createReport,
    updateReport,
    deleteReport
} = require('../controllers/brsrMasterReportController');
const brsrExportController = require('../controllers/brsrExportController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
    .get(protect, getReports)
    .post(protect, createReport);

router.route('/:id')
    .get(protect, getReportById)
    .put(protect, updateReport)
    .delete(protect, deleteReport);

// Export routes
router.post('/export/xml/:reportId', protect, brsrExportController.exportXML);
router.post('/export/pdf/:reportId', protect, brsrExportController.exportPDF);
router.get('/export/status/:reportId', protect, brsrExportController.getExportStatus);

module.exports = router;
