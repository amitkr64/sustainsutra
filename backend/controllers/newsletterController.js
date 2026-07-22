const asyncHandler = require('express-async-handler');
const Newsletter = require('../models/newsletterModel');

// @desc    Get all subscribers
// @route   GET /api/newsletter
// @access  Private/Admin
const getSubscribers = asyncHandler(async (req, res) => {
    const subscribers = await Newsletter.find({}).sort({ createdAt: -1 });
    res.json(subscribers);
});

// @desc    Subscribe
// @route   POST /api/newsletter
// @access  Public
const subscribe = asyncHandler(async (req, res) => {
    const { email } = req.body;

    const exists = await Newsletter.findOne({ email });
    if (exists) {
        res.status(400);
        throw new Error('Email already subscribed');
    }

    const subscriber = await Newsletter.create({ email });
    res.status(201).json(subscriber);
});

// @desc    Unsubscribe
// @route   DELETE /api/newsletter/:id
// @access  Private/Admin (or Public with token logic, implementing Admin delete only for now as per dashboard)
const unsubscribe = asyncHandler(async (req, res) => {
    const subscriber = await Newsletter.findById(req.params.id);

    if (subscriber) {
        await subscriber.deleteOne();
        res.json({ message: 'Subscriber removed' });
    } else {
        res.status(404);
        throw new Error('Subscriber not found');
    }
});

module.exports = {
    getSubscribers,
    subscribe,
    unsubscribe
};
