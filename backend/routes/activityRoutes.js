const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { listActivity, getEntityActivity } = require('../controllers/activityController');

router.use(protect);

router.get('/', listActivity);
router.get('/:entityType/:entityId', getEntityActivity);

module.exports = router;
