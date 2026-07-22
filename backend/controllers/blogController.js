const asyncHandler = require('express-async-handler');
const Blog = require('../models/blogModel');
// 🛡️ Mock Storage for Demo Mode
let mockBlogs = global.mockBlogs;

// @desc    Get all blogs
// @route   GET /api/blogs
// @access  Public
const getBlogs = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        return res.json(mockBlogs);
    }
    const blogs = await Blog.find({});
    res.json(blogs);
});

// @desc    Get single blog
// @route   GET /api/blogs/:id
// @access  Public
const getBlogById = asyncHandler(async (req, res) => {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        res.json(blog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Create a blog
// @route   POST /api/blogs
// @access  Private/Admin
const createBlog = asyncHandler(async (req, res) => {
    const { title, content, author, excerpt, tags, categories, image, status } = req.body;

    const blog = new Blog({
        title,
        content,
        author,
        excerpt,
        tags,
        categories,
        image,
        status
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
});

// @desc    Update a blog
// @route   PUT /api/blogs/:id
// @access  Private/Admin
const updateBlog = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        const index = global.mockBlogs.findIndex(b => b._id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        global.mockBlogs[index] = { ...global.mockBlogs[index], ...req.body };
        return res.json(global.mockBlogs[index]);
    }
    const { title, content, author, excerpt, tags, categories, image, status } = req.body;

    const blog = await Blog.findById(req.params.id);

    if (blog) {
        blog.title = title || blog.title;
        blog.content = content || blog.content;
        blog.author = author || blog.author;
        blog.excerpt = excerpt || blog.excerpt;
        blog.tags = tags || blog.tags;
        blog.categories = categories || blog.categories;
        blog.image = image || blog.image;
        blog.status = status || blog.status;

        const updatedBlog = await blog.save();
        res.json(updatedBlog);
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

// @desc    Delete a blog
// @route   DELETE /api/blogs/:id
// @access  Private/Admin
const deleteBlog = asyncHandler(async (req, res) => {
    if (global.isDemoMode) {
        const index = global.mockBlogs.findIndex(b => b._id === req.params.id);
        if (index === -1) {
            return res.status(404).json({ message: 'Blog not found' });
        }
        global.mockBlogs.splice(index, 1);
        return res.json({ message: 'Blog removed' });
    }
    const blog = await Blog.findById(req.params.id);

    if (blog) {
        await blog.deleteOne();
        res.json({ message: 'Blog removed' });
    } else {
        res.status(404);
        throw new Error('Blog not found');
    }
});

module.exports = {
    getBlogs,
    getBlogById,
    createBlog,
    updateBlog,
    deleteBlog
};
