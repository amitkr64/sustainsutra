const Course = require('../models/courseModel');

// Initial course data for Demo Mode
const initialCourses = [
    {
        _id: '65ae12345678901234567890',
        slug: 'greenhouse-gas-accounting',
        title: 'Greenhouse Gas (GHG) Accounting',
        category: 'Climate',
        level: 'Intermediate',
        duration: '8 weeks',
        price: 15000,
        description: 'Comprehensive training on GHG Protocol, Scope 1, 2, and 3 emissions calculation and reporting.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'Master Scope 1, 2 & 3 Emissions',
            'GHG Protocol Standard Training',
            'Hands-on Excel Modeling',
            'BRSR Alignment Support'
        ],
        prerequisites: [
            'Basic understanding of environmental science',
            'Proficiency in Microsoft Excel',
            'Familiarity with corporate operations'
        ],
        objectives: [
            'Understand GHG Protocol standards',
            'Calculate Scope 1, 2, and 3 emissions',
            'Prepare GHG inventory reports',
            'Implement emission reduction strategies'
        ],
        modules: [
            { title: 'Concepts & Standards', duration: '2 weeks' },
            { title: 'Quantifying Scope 1 & 2', duration: '3 weeks' },
            { title: 'Scope 3 & Reporting', duration: '3 weeks' }
        ],
        published: true
    },
    {
        _id: '65ae12345678901234567891',
        slug: 'iso-14064-verification',
        title: 'ISO 14064 Verification & Validation',
        category: 'Standards',
        level: 'Advanced',
        duration: '6 weeks',
        price: 18000,
        description: 'Master ISO 14064 standards for GHG quantification, monitoring, reporting and verification.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'ISO 14064-1 & 14064-2 Focus',
            'Verification Audit Simulation',
            'Validation Methodology',
            'Global Compliance Standards'
        ],
        prerequisites: [
            'Completion of GHG Accounting course or equivalent',
            'Basic knowledge of auditing principles',
            'Industry experience of 2+ years'
        ],
        objectives: [
            'Understand ISO 14064 framework',
            'Conduct verification audits',
            'Validate GHG reports',
            'Ensure compliance with international standards'
        ],
        modules: [
            { title: 'Standard Requirements', duration: '2 weeks' },
            { title: 'Verification Process', duration: '4 weeks' }
        ],
        published: true
    },
    {
        _id: '65ae12345678901234567892',
        slug: 'life-cycle-assessment',
        title: 'Life Cycle Assessment (LCA)',
        category: 'Environmental',
        level: 'Advanced',
        duration: '8 weeks',
        price: 20000,
        description: 'Complete guide to conducting Life Cycle Assessments from goal definition to interpretation.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'Cradle-to-Grave Analysis',
            'LCA Software Tools Guide',
            'Environmental Impact Metrics',
            'Product Carbon Footprinting'
        ],
        prerequisites: [
            'Engineering or Science background',
            'Understanding of manufacturing processes',
            'Basic statistics knowledge'
        ],
        objectives: [
            'Master LCA methodology',
            'Use LCA software tools',
            'Conduct impact assessments',
            'Interpret and communicate results'
        ],
        modules: [
            { title: 'LCA Methodology', duration: '3 weeks' },
            { title: 'Inventory & Analysis', duration: '5 weeks' }
        ],
        published: true
    },
    {
        _id: '65ae12345678901234567893',
        slug: 'carbon-footprinting',
        title: 'Carbon Footprinting for Organizations',
        category: 'Climate',
        level: 'Beginner',
        duration: '4 weeks',
        price: 12000,
        description: 'Learn to measure, manage and reduce organizational carbon footprints.',
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        highlights: [
            'Measure Org Carbon Footprint',
            'Identify Emission Hotspots',
            'Reduction Strategy Planning',
            'Beginner Friendly Approach'
        ],
        prerequisites: [
            'None - Beginner Friendly',
            'Interest in sustainability',
            'Basic computer skills'
        ],
        objectives: [
            'Calculate organizational carbon footprint',
            'Identify emission hotspots',
            'Develop reduction strategies',
            'Create carbon neutrality roadmaps'
        ],
        modules: [
            { title: 'Footprint Foundations', duration: '2 weeks' },
            { title: 'Reduction Strategies', duration: '2 weeks' }
        ],
        published: true
    }
];

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = async (req, res) => {
    try {
        if (global.isDemoMode) {
            return res.json(initialCourses);
        }
        const courses = await Course.find({});
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get published courses
// @route   GET /api/courses/published
// @access  Public
const getPublishedCourses = async (req, res) => {
    try {
        if (global.isDemoMode) {
            return res.json(initialCourses.filter(c => c.published));
        }
        const courses = await Course.find({ published: true });
        res.json(courses);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get course by slug
// @route   GET /api/courses/slug/:slug
// @access  Public
const getCourseBySlug = async (req, res) => {
    try {
        if (global.isDemoMode) {
            const course = initialCourses.find(c => c.slug === req.params.slug);
            return course ? res.json(course) : res.status(404).json({ message: 'Course not found' });
        }
        const course = await Course.findOne({ slug: req.params.slug });
        if (course) {
            res.json(course);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = async (req, res) => {
    try {
        if (global.isDemoMode) {
            const newCourse = { ...req.body, _id: Date.now().toString() };
            initialCourses.push(newCourse);
            return res.status(201).json(newCourse);
        }
        const course = new Course(req.body);
        const createdCourse = await course.save();
        res.status(201).json(createdCourse);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = async (req, res) => {
    try {
        if (global.isDemoMode) {
            const index = initialCourses.findIndex(c => c._id === req.params.id);
            if (index !== -1) {
                initialCourses[index] = { ...initialCourses[index], ...req.body };
                return res.json(initialCourses[index]);
            }
            return res.status(404).json({ message: 'Course not found' });
        }
        const course = await Course.findById(req.params.id);
        if (course) {
            Object.assign(course, req.body);
            const updatedCourse = await course.save();
            res.json(updatedCourse);
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = async (req, res) => {
    try {
        if (global.isDemoMode) {
            const index = initialCourses.findIndex(c => c._id === req.params.id);
            if (index !== -1) {
                initialCourses.splice(index, 1);
                return res.json({ message: 'Course removed' });
            }
            return res.status(404).json({ message: 'Course not found' });
        }
        const course = await Course.findById(req.params.id);
        if (course) {
            await Course.deleteOne({ _id: req.params.id });
            res.json({ message: 'Course removed' });
        } else {
            res.status(404).json({ message: 'Course not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getCourses,
    getPublishedCourses,
    getCourseBySlug,
    createCourse,
    updateCourse,
    deleteCourse
};
