// Course service for managing course data in localStorage

const COURSES_KEY = 'sustainsutra_courses';
const REGISTRATIONS_KEY = 'sustainsutra_course_registrations';

// Default courses - Synchronized with courseContentService.js
const defaultCourses = [
    {
        id: 'ghg-accounting',
        slug: 'greenhouse-gas-accounting',
        title: 'Greenhouse Gas (GHG) Accounting',
        category: 'Climate',
        level: 'Intermediate',
        duration: '8 weeks',
        price: 15000,
        description: 'Comprehensive training on GHG Protocol, Scope 1, 2, and 3 emissions calculation and reporting.',
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
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        reviews: [
            { id: 1, user: 'Priya S.', rating: 5, comment: 'Excellent course! The practical exercises on Scope 3 were very helpful.' },
            { id: 2, user: 'Rahul M.', rating: 4, comment: 'Great content, though the pace was a bit fast in the beginning.' }
        ],
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'iso-14064',
        slug: 'iso-14064-verification',
        title: 'ISO 14064 Verification & Validation',
        category: 'Standards',
        level: 'Advanced',
        duration: '6 weeks',
        price: 18000,
        description: 'Master ISO 14064 standards for GHG quantification, monitoring, reporting and verification.',
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
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        reviews: [
            { id: 1, user: 'Sneha P.', rating: 5, comment: 'Very thorough coverage of the ISO standard.' }
        ],
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'lca',
        slug: 'life-cycle-assessment',
        title: 'Life Cycle Assessment (LCA)',
        category: 'Environmental',
        level: 'Advanced',
        duration: '8 weeks',
        price: 20000,
        description: 'Complete guide to conducting Life Cycle Assessments from goal definition to interpretation.',
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
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        reviews: [],
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'carbon-footprinting',
        slug: 'carbon-footprinting',
        title: 'Carbon Footprinting for Organizations',
        category: 'Climate',
        level: 'Beginner',
        duration: '4 weeks',
        price: 12000,
        description: 'Learn to measure, manage and reduce organizational carbon footprints.',
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
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        reviews: [
            { id: 1, user: 'Vikram S.', rating: 5, comment: 'Perfect for beginners. Explained complex topics simply.' },
            { id: 2, user: 'Anjali D.', rating: 4, comment: 'Good overview, would have liked more case studies.' }
        ],
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'esg-strategy',
        slug: 'esg-strategy-implementation',
        title: 'ESG Strategy & Implementation',
        category: 'Sustainability',
        level: 'Intermediate',
        duration: '8 weeks',
        price: 16000,
        description: 'Develop and implement comprehensive ESG strategies aligned with global frameworks.',
        prerequisites: [
            'Management or Strategy experience',
            'Basic understanding of corporate governance'
        ],
        objectives: [
            'Understand ESG frameworks (GRI, SASB, TCFD)',
            'Develop ESG strategy',
            'Implement ESG programs',
            'Measure and report ESG performance'
        ],
        modules: [
            { title: 'Frameworks & Disclosures', duration: '4 weeks' },
            { title: 'Strategic Integration', duration: '4 weeks' }
        ],
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        reviews: [],
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    },
    {
        id: 'materiality',
        slug: 'materiality-assessment',
        title: 'Materiality Assessment for Sustainability',
        category: 'Sustainability',
        level: 'Intermediate',
        duration: '4 weeks',
        price: 10000,
        description: 'Master double materiality assessment and integrate it into sustainability strategy.',
        prerequisites: [
            'Basic ESG knowledge',
            'Experience in stakeholder engagement'
        ],
        objectives: [
            'Understand materiality concepts',
            'Conduct stakeholder engagement',
            'Perform impact and financial materiality analysis',
            'Create materiality matrices'
        ],
        modules: [
            { title: 'Assessment Principles', duration: '2 weeks' },
            { title: 'Stakeholder Engagement', duration: '2 weeks' }
        ],
        instructor: 'Dr. Amit Kumar',
        instructorBio: 'Ph.D. in Environmental Science with 15+ years of experience in carbon accounting and climate policy. Certified lead auditor for ISO 14064.',
        reviews: [],
        published: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];

export const courseService = {
    // Initialize courses
    initializeCourses: () => {
        // Clear and force update to ensure sync
        localStorage.setItem(COURSES_KEY, JSON.stringify(defaultCourses));

        if (!localStorage.getItem(REGISTRATIONS_KEY)) {
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify([]));
        }
    },

    // Get all courses
    getAllCourses: () => {
        const courses = localStorage.getItem(COURSES_KEY);
        return courses ? JSON.parse(courses) : [];
    },

    // Get published courses
    getPublishedCourses: () => {
        const courses = courseService.getAllCourses();
        return courses.filter(course => course.published);
    },

    // Get course by slug
    getCourseBySlug: (slug) => {
        const courses = courseService.getAllCourses();
        return courses.find(course => course.slug === slug);
    },

    // Get course by ID
    getCourseById: (id) => {
        const courses = courseService.getAllCourses();
        return courses.find(course => course.id === id);
    },

    // Create course
    createCourse: (courseData) => {
        const courses = courseService.getAllCourses();
        const newCourse = {
            ...courseData,
            id: Date.now().toString(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        courses.push(newCourse);
        localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
        return newCourse;
    },

    // Update course
    updateCourse: (id, courseData) => {
        const courses = courseService.getAllCourses();
        const index = courses.findIndex(course => course.id === id);
        if (index !== -1) {
            courses[index] = {
                ...courses[index],
                ...courseData,
                updatedAt: new Date().toISOString()
            };
            localStorage.setItem(COURSES_KEY, JSON.stringify(courses));
            return courses[index];
        }
        return null;
    },

    // Delete course
    deleteCourse: (id) => {
        const courses = courseService.getAllCourses();
        const filtered = courses.filter(course => course.id !== id);
        localStorage.setItem(COURSES_KEY, JSON.stringify(filtered));
        return true;
    },

    // Register for course
    registerForCourse: (courseId, userEmail, userName) => {
        const registrations = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
        const existing = registrations.find(r => r.courseId === courseId && r.userEmail === userEmail);

        if (existing) {
            return { success: false, message: 'Already registered for this course' };
        }

        const registration = {
            id: Date.now().toString(),
            courseId,
            userEmail,
            userName,
            registeredAt: new Date().toISOString(),
            status: 'active',
            progress: 0
        };

        registrations.push(registration);
        localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
        return { success: true, registration };
    },

    // Get user registrations
    getUserRegistrations: (userEmail) => {
        const registrations = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
        return registrations.filter(r => r.userEmail === userEmail);
    },

    // Check if user is registered
    isUserRegistered: (courseId, userEmail) => {
        const registrations = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
        return registrations.some(r => r.courseId === courseId && r.userEmail === userEmail);
    },

    // Get all registrations (admin)
    getAllRegistrations: () => {
        return JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
    },

    // Update registration progress
    updateProgress: (registrationId, progress) => {
        const registrations = JSON.parse(localStorage.getItem(REGISTRATIONS_KEY) || '[]');
        const index = registrations.findIndex(r => r.id === registrationId);
        if (index !== -1) {
            registrations[index].progress = progress;
            registrations[index].updatedAt = new Date().toISOString();
            localStorage.setItem(REGISTRATIONS_KEY, JSON.stringify(registrations));
            return registrations[index];
        }
        return null;
    }
};

// Initialize on load
if (typeof window !== 'undefined') {
    courseService.initializeCourses();
}
