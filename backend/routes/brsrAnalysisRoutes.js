const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { protect } = require('../middleware/authMiddleware');
const {
    uploadXBRL,
    getAnalysisReports,
    getComparison,
    deleteAnalysisReport
} = require('../controllers/brsrAnalysisController');

// Ensure uploads directory exists (using absolute path)
const uploadsDir = path.resolve(__dirname, '..', 'uploads');
console.log('[BRSR Routes] Uploads directory:', uploadsDir);

if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('[BRSR Routes] Created uploads directory:', uploadsDir);
}

// Multer config for file uploads
const storage = multer.diskStorage({
    destination(req, file, cb) {
        console.log('[BRSR Multer] Saving file to:', uploadsDir);
        cb(null, uploadsDir);
    },
    filename(req, file, cb) {
        const filename = `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`;
        console.log('[BRSR Multer] Filename:', filename);
        cb(null, filename);
    }
});

const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        console.log('[BRSR Multer] Received file:', file.originalname);
        // Accept XML files only
        const ext = path.extname(file.originalname).toLowerCase();
        if (ext !== '.xml') {
            console.error('[BRSR Multer] Invalid file type:', ext);
            return cb(new Error('Only XML files are allowed (.xml)'));
        }
        cb(null, true);
    },
    limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// Error handling middleware for multer
const handleMulterError = (err, req, res, next) => {
    if (err instanceof multer.MulterError) {
        console.error('[BRSR Multer] Multer error:', err.code, err.message);
        if (err.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ message: 'File size exceeds limit (50MB)' });
        }
        if (err.code === 'LIMIT_UNEXPECTED_FILE') {
            return res.status(400).json({ message: 'Unexpected file field. Use "xbrl" as field name.' });
        }
        return res.status(400).json({ message: 'File upload error: ' + err.message });
    }
    if (err) {
        console.error('[BRSR Multer] Unknown error:', err.message);
        return res.status(400).json({ message: err.message });
    }
    next();
};

router.route('/')
    .get(protect, getAnalysisReports)
    .post(protect, upload.single('xbrl'), handleMulterError, uploadXBRL);

router.get('/compare', protect, getComparison);

router.route('/:id')
    .delete(protect, deleteAnalysisReport);

module.exports = router;
