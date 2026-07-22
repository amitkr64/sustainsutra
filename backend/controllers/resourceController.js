const asyncHandler = require('express-async-handler');
const Resource = require('../models/resourceModel');

// @desc    Get all resources (with optional type filter)
// @route   GET /api/resources
// @access  Public
const getResources = asyncHandler(async (req, res) => {
    const { type } = req.query;

    let filter = {};
    if (type) filter = { type };

    const resources = await Resource.find(filter).sort({ createdAt: -1 });
    res.json(resources);
});

// @desc    Create a resource
// @route   POST /api/resources
// @access  Private/Admin
const createResource = asyncHandler(async (req, res) => {
    const resource = await Resource.create(req.body);
    res.status(201).json(resource);
});

// @desc    Update a resource
// @route   PUT /api/resources/:id
// @access  Private/Admin
const updateResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        const updatedResource = await Resource.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedResource);
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

// @desc    Delete a resource
// @route   DELETE /api/resources/:id
// @access  Private/Admin
const deleteResource = asyncHandler(async (req, res) => {
    const resource = await Resource.findById(req.params.id);

    if (resource) {
        await resource.deleteOne();
        res.json({ message: 'Resource removed' });
    } else {
        res.status(404);
        throw new Error('Resource not found');
    }
});

module.exports = {
    getResources,
    createResource,
    updateResource,
    deleteResource
};
