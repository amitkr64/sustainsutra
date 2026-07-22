const asyncHandler = require('express-async-handler');
const OffsetProject = require('../models/offsetProjectModel');

/**
 * @desc    Get all offset projects
 * @route   GET /api/ccts/offset-projects
 * @access  Public
 */
const getOffsetProjects = asyncHandler(async (req, res) => {
    const { projectType, status, registrationStatus } = req.query;

    let query = {};

    if (projectType) query.projectType = projectType;
    if (status) query.status = status;
    if (registrationStatus) query.registrationStatus = registrationStatus;

    const projects = await OffsetProject.find(query)
        .populate('entity', 'entityName registrationNumber')
        .populate('createdBy', 'name email')
        .sort({ createdAt: -1 });

    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
});

/**
 * @desc    Get offset project by ID
 * @route   GET /api/ccts/offset-projects/:id
 * @access  Public
 */
const getOffsetProjectById = asyncHandler(async (req, res) => {
    const project = await OffsetProject.findById(req.params.id)
        .populate('entity', 'entityName registrationNumber sector')
        .populate('verifiedBy', 'name email')
        .populate('createdBy', 'name email');

    if (!project) {
        res.status(404);
        throw new Error('Offset project not found');
    }

    res.json({
        success: true,
        data: project
    });
});

/**
 * @desc    Create offset project
 * @route   POST /api/ccts/offset-projects
 * @access  Private
 */
const createOffsetProject = asyncHandler(async (req, res) => {
    // If user is entity, auto-link
    const User = require('../models/userModel');
    const user = await User.findById(req.user._id).populate('cctsEntity');

    const projectData = {
        ...req.body,
        createdBy: req.user._id
    };

    if (user.cctsEntity) {
        projectData.entity = user.cctsEntity._id;
        projectData.ownerType = 'Obligated Entity';
    }

    const project = await OffsetProject.create(projectData);

    res.status(201).json({
        success: true,
        message: 'Offset project created successfully',
        data: project
    });
});

/**
 * @desc    Update offset project
 * @route   PUT /api/ccts/offset-projects/:id
 * @access  Private/Owner or Admin
 */
const updateOffsetProject = asyncHandler(async (req, res) => {
    let project = await OffsetProject.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Offset project not found');
    }

    // Check authorization
    const isOwner = project.createdBy.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'ccts-admin';

    if (!isOwner && !isAdmin) {
        res.status(403);
        throw new Error('Not authorized to update this project');
    }

    project = await OffsetProject.findByIdAndUpdate(
        req.params.id,
        { ...req.body, lastUpdatedBy: req.user._id },
        { new: true, runValidators: true }
    );

    res.json({
        success: true,
        message: 'Offset project updated successfully',
        data: project
    });
});

/**
 * @desc    Retire credits from project
 * @route   POST /api/ccts/offset-projects/:id/retire-credits
 * @access  Private
 */
const retireCredits = asyncHandler(async (req, res) => {
    const { quantity, purpose } = req.body;

    const project = await OffsetProject.findById(req.params.id);

    if (!project) {
        res.status(404);
        throw new Error('Offset project not found');
    }

    await project.retireCredits(quantity, req.user._id, purpose);

    res.json({
        success: true,
        message: `${quantity} credits retired successfully`,
        data: project
    });
});

/**
 * @desc    Find available offset projects by type
 * @route   GET /api/ccts/offset-projects/available/:type
 * @access  Public
 */
const getAvailableOffsetsByType = asyncHandler(async (req, res) => {
    const { minCredits = 0 } = req.query;

    const projects = await OffsetProject.findAvailableByType(
        req.params.type,
        parseInt(minCredits)
    );

    res.json({
        success: true,
        count: projects.length,
        data: projects
    });
});

module.exports = {
    getOffsetProjects,
    getOffsetProjectById,
    createOffsetProject,
    updateOffsetProject,
    retireCredits,
    getAvailableOffsetsByType
};
