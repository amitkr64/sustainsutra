const mongoose = require('mongoose');

const teamSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    bio: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    linkedin: {
        type: String
    },
    email: {
        type: String
    }
}, {
    timestamps: true
});

const Team = mongoose.model('Team', teamSchema);
module.exports = Team;
