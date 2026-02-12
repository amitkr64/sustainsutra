const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true,
        unique: true
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    excerpt: {
        type: String
    },
    tags: [{
        type: String
    }],
    categories: [{
        type: String
    }],
    image: {
        type: String
    },
    status: {
        type: String,
        enum: ['draft', 'published'],
        default: 'draft'
    },
    readTime: {
        type: String
    }
}, {
    timestamps: true
});

// Database indexes for performance
blogSchema.index({ slug: 1 }); // Unique index for URL routing
blogSchema.index({ status: 1, createdAt: -1 }); // Common query: published blogs sorted by date
blogSchema.index({ tags: 1 });
blogSchema.index({ categories: 1 });
blogSchema.index({ createdAt: -1 });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;
