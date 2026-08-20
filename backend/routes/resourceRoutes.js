const express = require('express');
const router = express.Router();
const { getResources, getResourceById, createResource, updateResource, deleteResource } = require('../controllers/resourceController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(getResources).post(protect, admin, createResource);
// Public detail read — CaseStudyDetailPage fetches GET /api/resources/:id.
router.route('/:id').get(getResourceById).put(protect, admin, updateResource).delete(protect, admin, deleteResource);

module.exports = router;
