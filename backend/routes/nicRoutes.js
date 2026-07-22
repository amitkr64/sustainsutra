const express = require('express');
const router = express.Router();
const { searchNIC, getNICByCode, getNICTree, getNICStats } = require('../controllers/nicController');

// Public read-only NIC endpoints. NIC codes are reference data (no auth).
router.get('/search', searchNIC);
router.get('/tree', getNICTree);
router.get('/stats', getNICStats);
router.get('/:code', getNICByCode);

module.exports = router;
