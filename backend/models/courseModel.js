const mongoose = require('mongoose');

const moduleSchema = mongoose.Schema({
    title: { type: String, required: true },
    duration: { type: String, required: true }
}, { _id: false });

const reviewSchema = mongoose.Schema({
    user: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true }
}, { timestamps: true });

const courseSchema = mongoose.Schema({
    id: { type: String, unique: true }, // For compatibility with frontend if needed
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    duration: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    instructor: { type: String, required: true },
    instructorBio: { type: String },
    highlights: [String],
    prerequisites: [String],
    objectives: [String],
    modules: [moduleSchema],
    reviews: [reviewSchema],
    published: { type: Boolean, default: false },
}, {
    timestamps: true
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
