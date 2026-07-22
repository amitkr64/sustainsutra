const express = require('express');
const router = express.Router();
const { getSubscribers, subscribe, unsubscribe } = require('../controllers/newsletterController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/').get(protect, admin, getSubscribers).post(subscribe);
router.route('/:id').delete(protect, admin, unsubscribe);

module.exports = router;
