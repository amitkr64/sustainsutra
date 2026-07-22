const asyncHandler = require('express-async-handler');
const Team = require('../models/teamModel');

// @desc    Get all team members
// @route   GET /api/team
// @access  Public
const getTeam = asyncHandler(async (req, res) => {
    const team = await Team.find({});
    res.json(team);
});

// @desc    Create a team member
// @route   POST /api/team
// @access  Private/Admin
const createTeamMember = asyncHandler(async (req, res) => {
    const { name, role, bio, image, linkedin, email } = req.body;

    const member = await Team.create({
        name,
        role,
        bio,
        image,
        linkedin,
        email
    });

    if (member) {
        res.status(201).json(member);
    } else {
        res.status(400);
        throw new Error('Invalid team data');
    }
});

// @desc    Update a team member
// @route   PUT /api/team/:id
// @access  Private/Admin
const updateTeamMember = asyncHandler(async (req, res) => {
    const member = await Team.findById(req.params.id);

    if (member) {
        member.name = req.body.name || member.name;
        member.role = req.body.role || member.role;
        member.bio = req.body.bio || member.bio;
        member.image = req.body.image || member.image;
        member.linkedin = req.body.linkedin || member.linkedin;
        member.email = req.body.email || member.email;

        const updatedMember = await member.save();
        res.json(updatedMember);
    } else {
        res.status(404);
        throw new Error('Team member not found');
    }
});

// @desc    Delete a team member
// @route   DELETE /api/team/:id
// @access  Private/Admin
const deleteTeamMember = asyncHandler(async (req, res) => {
    const member = await Team.findById(req.params.id);

    if (member) {
        await member.deleteOne();
        res.json({ message: 'Team member removed' });
    } else {
        res.status(404);
        throw new Error('Team member not found');
    }
});

module.exports = {
    getTeam,
    createTeamMember,
    updateTeamMember,
    deleteTeamMember
};
