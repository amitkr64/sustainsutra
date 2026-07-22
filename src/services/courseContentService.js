// Course content data - High-fidelity curriculum for all sustainability courses
export const courseContent = {
    'ghg-accounting': {
        modules: [
            {
                id: 'ghg-m1',
                title: 'Concepts & Standards',
                lessons: [
                    {
                        id: 'ghg-l1-1',
                        title: 'Climate Change & GHGs',
                        type: 'video',
                        duration: '15 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Foundational science of global warming and the role of corporate accounting.'
                        }
                    },
                    {
                        id: 'ghg-l1-2',
                        title: 'GHG Protocol Standard',
                        type: 'pdf',
                        duration: '25 mins',
                        content: {
                            url: 'https://ghgprotocol.org/sites/default/files/standards/ghg-protocol-revised.pdf',
                            description: 'Reference guide for the Corporate Accounting and Reporting Standard.'
                        }
                    },
                    {
                        id: 'ghg-l1-3',
                        title: 'Setting Boundaries',
                        type: 'video',
                        duration: '20 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Equity share vs. control approaches for defining organizational boundaries.'
                        }
                    }
                ]
            },
            {
                id: 'ghg-m2',
                title: 'Quantifying Scope 1 & 2',
                lessons: [
                    {
                        id: 'ghg-l2-1',
                        title: 'Stationary Combustion',
                        type: 'video',
                        duration: '18 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Calculating emissions from boilers, furnaces, and heaters.'
                        }
                    },
                    {
                        id: 'ghg-l2-2',
                        title: 'Mobile Combustion',
                        type: 'video',
                        duration: '15 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Measuring emissions from owned or controlled vehicles.'
                        }
                    },
                    {
                        id: 'ghg-l2-3',
                        title: 'Purchased Energy (Scope 2)',
                        type: 'pdf',
                        duration: '30 mins',
                        content: {
                            url: 'https://ghgprotocol.org/sites/default/files/standards/Scope%202%20Guidance_Final_Sept26.pdf',
                            description: 'Advanced guidance on location-based and market-based methods.'
                        }
                    }
                ]
            },
            {
                id: 'ghg-m3',
                title: 'Scope 3 & Reporting',
                lessons: [
                    {
                        id: 'ghg-l3-1',
                        title: 'Value Chain Mapping',
                        type: 'video',
                        duration: '25 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Overview of the 15 categories of Scope 3 upstream and downstream.'
                        }
                    },
                    {
                        id: 'ghg-l3-2',
                        title: 'Reporting & Inventory Management',
                        type: 'doc',
                        duration: '45 mins',
                        content: {
                            url: 'https://www.epa.gov/sites/default/files/2016-03/ghg_inventory_management_plan.doc',
                            description: 'Framework for creating a permanent record of GHG inventory processes.'
                        }
                    }
                ]
            }
        ]
    },
    'iso-14064': {
        modules: [
            {
                id: 'iso-m1',
                title: 'Standard Requirements',
                lessons: [
                    {
                        id: 'iso-l1-1',
                        title: 'ISO 14064 Series Overview',
                        type: 'video',
                        duration: '20 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Introduction to standard parts 1, 2, and 3.'
                        }
                    },
                    {
                        id: 'iso-l1-2',
                        title: 'Inventory Principles',
                        type: 'pdf',
                        duration: '15 mins',
                        content: {
                            url: 'https://www.iso.org/files/live/sites/isoorg/files/store/en/ISO_PAS_45005_2020%28en%29.pdf',
                            description: 'Accuracy, completeness, and consistency requirements.'
                        }
                    }
                ]
            },
            {
                id: 'iso-m2',
                title: 'Verification Process',
                lessons: [
                    {
                        id: 'iso-l2-1',
                        title: 'The Audit Cycle',
                        type: 'video',
                        duration: '30 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Pre-audit documentation, site visits, and final verification statements.'
                        }
                    },
                    {
                        id: 'iso-l2-2',
                        title: 'Verification Checklist',
                        type: 'doc',
                        duration: '20 mins',
                        content: {
                            url: 'https://docs.google.com/document/d/1example/preview',
                            description: 'Practical checklist to prepare for external third-party verification.'
                        }
                    }
                ]
            }
        ]
    },
    'lca': {
        modules: [
            {
                id: 'lca-m1',
                title: 'LCA Methodology',
                lessons: [
                    {
                        id: 'lca-l1-1',
                        title: 'Cradle-to-Grave Thinking',
                        type: 'video',
                        duration: '20 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Introduction to total life cycle environmental impact.'
                        }
                    },
                    {
                        id: 'lca-l1-2',
                        title: 'Functional Units & Boundaries',
                        type: 'pdf',
                        duration: '25 mins',
                        content: {
                            url: 'https://www.iso.org/files/live/sites/isoorg/files/store/en/ISO_PAS_45005_2020%28en%29.pdf',
                            description: 'Goal and scope definition as per ISO 14040.'
                        }
                    }
                ]
            },
            {
                id: 'lca-m2',
                title: 'Inventory & Analysis',
                lessons: [
                    {
                        id: 'lca-l2-1',
                        title: 'Data Modeling in software',
                        type: 'video',
                        duration: '35 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Survey of GaBi, SimaPro, and OpenLCA platforms.'
                        }
                    },
                    {
                        id: 'lca-l2-2',
                        title: 'Impact Assessment Interpretation',
                        type: 'pdf',
                        duration: '20 mins',
                        content: {
                            url: 'https://www.iso.org/files/live/sites/isoorg/files/store/en/ISO_PAS_45005_2020%28en%29.pdf',
                            description: 'Understanding acidification, eutrophication, and global warming potentials.'
                        }
                    }
                ]
            }
        ]
    },
    'carbon-footprinting': {
        modules: [
            {
                id: 'cf-m1',
                title: 'Footprint Foundations',
                lessons: [
                    {
                        id: 'cf-l1-1',
                        title: 'What is a Carbon Footprint?',
                        type: 'video',
                        duration: '15 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Measuring individual vs. corporate climate legacy.'
                        }
                    },
                    {
                        id: 'cf-l1-2',
                        title: 'Emission Hotspot Analysis',
                        type: 'pdf',
                        duration: '20 mins',
                        content: {
                            url: 'https://ghgprotocol.org/sites/default/files/standards/ghg-protocol-revised.pdf',
                            description: 'Identifying where the most significant emissions originate.'
                        }
                    }
                ]
            },
            {
                id: 'cf-m2',
                title: 'Reduction Strategies',
                lessons: [
                    {
                        id: 'cf-l2-1',
                        title: 'Decarbonizing Operations',
                        type: 'video',
                        duration: '22 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Efficiency measures and renewable energy integration.'
                        }
                    },
                    {
                        id: 'cf-l2-2',
                        title: 'Carbon Credits & Net Zero',
                        type: 'pdf',
                        duration: '25 mins',
                        content: {
                            url: 'https://ghgprotocol.org/sites/default/files/standards/ghg-protocol-revised.pdf',
                            description: 'Vetting offsets and formulating science-based targets.'
                        }
                    }
                ]
            }
        ]
    },
    'esg-strategy': {
        modules: [
            {
                id: 'esg-m1',
                title: 'Frameworks & Disclosures',
                lessons: [
                    {
                        id: 'esg-l1-1',
                        title: 'The Rise of ESG Finance',
                        type: 'video',
                        duration: '18 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Why investors prioritize environmental and social factors.'
                        }
                    },
                    {
                        id: 'esg-l1-2',
                        title: 'SASB & GRI Standards',
                        type: 'pdf',
                        duration: '35 mins',
                        content: {
                            url: 'https://www.sasb.org/wp-content/uploads/2018/11/SASB-Implementation-Guide.pdf',
                            description: 'Deep dive into industry-specific sustainability metrics.'
                        }
                    },
                    {
                        id: 'esg-l1-3',
                        title: 'TCFD Climate Reporting',
                        type: 'video',
                        duration: '20 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Reporting on physical and transition risk governance.'
                        }
                    }
                ]
            },
            {
                id: 'esg-m2',
                title: 'Strategic Integration',
                lessons: [
                    {
                        id: 'esg-l2-1',
                        title: 'Executing ESG Strategy',
                        type: 'video',
                        duration: '25 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Moving from checking boxes to value creation.'
                        }
                    },
                    {
                        id: 'esg-l2-2',
                        title: 'Ratings & Scores Management',
                        type: 'pdf',
                        duration: '20 mins',
                        content: {
                            url: 'https://www.sasb.org/wp-content/uploads/2018/11/SASB-Implementation-Guide.pdf',
                            description: 'How MSCI, Sustainalytics, and others score your performance.'
                        }
                    }
                ]
            }
        ]
    },
    'materiality': {
        modules: [
            {
                id: 'mat-m1',
                title: 'Assessment Principles',
                lessons: [
                    {
                        id: 'mat-l1-1',
                        title: 'Introduction to Materiality',
                        type: 'video',
                        duration: '15 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Focusing on what truly matters to your business and stakeholders.'
                        }
                    },
                    {
                        id: 'mat-l1-2',
                        title: 'Double Materiality Deep Dive',
                        type: 'pdf',
                        duration: '30 mins',
                        content: {
                            url: 'https://www.efrag.org/Assets/Download?assetUrl=%2Fsites%2Fwebhosting%2FSiteAssets%2FEFRAG%2520Materiality%2520Assessment%2520IG%2520-%2520Final%2520Draft.pdf',
                            description: 'Financial materiality vs. environmental/social impact.'
                        }
                    }
                ]
            },
            {
                id: 'mat-m2',
                title: 'Stakeholder Engagement',
                lessons: [
                    {
                        id: 'mat-l2-1',
                        title: 'Engaging Stakeholders',
                        type: 'video',
                        duration: '22 mins',
                        content: {
                            url: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
                            description: 'Consulting employees, investors, and communities to map priorities.'
                        }
                    },
                    {
                        id: 'mat-l2-2',
                        title: 'Building the Matrix',
                        type: 'doc',
                        duration: '15 mins',
                        content: {
                            url: 'https://docs.google.com/document/d/1example/preview',
                            description: 'Visualizing materiality to inform sustainability strategy.'
                        }
                    }
                ]
            }
        ]
    }
};

// Storage key for progress tracking
const PROGRESS_KEY = 'sustainsutra_course_progress';

export const courseContentService = {
    // Get course content
    getCourseContent: (courseId, userEmail) => {
        return courseContent[courseId] || null;
    },

    // Get lesson by ID
    getLesson: (courseId, moduleId, lessonId) => {
        const content = courseContent[courseId];
        if (!content) return null;

        const module = content.modules.find(m => m.id === moduleId);
        if (!module) return null;

        return module.lessons.find(l => l.id === lessonId);
    },

    // Get user progress for a course
    getUserProgress: (courseId, userEmail) => {
        const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const key = `${userEmail}_${courseId}`;
        return allProgress[key] || { completedLessons: [], currentLesson: null };
    },

    // Mark lesson as complete
    markLessonComplete: (courseId, userEmail, lessonId) => {
        const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const key = `${userEmail}_${courseId}`;

        if (!allProgress[key]) {
            allProgress[key] = { completedLessons: [], currentLesson: lessonId };
        }

        if (!allProgress[key].completedLessons.includes(lessonId)) {
            allProgress[key].completedLessons.push(lessonId);
        }

        localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
        return allProgress[key];
    },

    // Set current lesson
    setCurrentLesson: (courseId, userEmail, lessonId) => {
        const allProgress = JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
        const key = `${userEmail}_${courseId}`;

        if (!allProgress[key]) {
            allProgress[key] = { completedLessons: [], currentLesson: lessonId };
        } else {
            allProgress[key].currentLesson = lessonId;
        }

        localStorage.setItem(PROGRESS_KEY, JSON.stringify(allProgress));
        return allProgress[key];
    },

    // Calculate progress percentage
    calculateProgress: (courseId, userEmail) => {
        const content = courseContent[courseId];
        if (!content) return 0;

        const totalLessons = content.modules.reduce((sum, mod) => sum + mod.lessons.length, 0);
        const progress = courseContentService.getUserProgress(courseId, userEmail);
        const completedLessons = progress.completedLessons.length;

        return totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
    }
};
