const express = require('express');
const router = express.Router();
const {
    getEmissionFactors,
    searchEmissionFactors,
    getCategories,
    getEmissionFactorById,
    getEmissionFactorByEfId,
    createEmissionFactor,
    updateEmissionFactor,
    deleteEmissionFactor,
    getCuratedFactors,
    getStats
} = require('../controllers/emissionFactorController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getEmissionFactors);
router.get('/search', searchEmissionFactors);
router.get('/categories', getCategories);
router.get('/stats', getStats);
router.get('/curated/:type', getCuratedFactors);
router.get('/ef/:efId', getEmissionFactorByEfId);
router.get('/:id', getEmissionFactorById);

// Admin routes (protected)
router.post('/', protect, admin, createEmissionFactor);
router.put('/:id', protect, admin, updateEmissionFactor);
router.delete('/:id', protect, admin, deleteEmissionFactor);

module.exports = router;
