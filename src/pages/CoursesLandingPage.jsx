import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { GraduationCap, Search, Filter } from 'lucide-react';
import { courseService } from '@/services/courseService';
import CourseCard from '@/components/CourseCard';

const CoursesLandingPage = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [selectedLevel, setSelectedLevel] = useState('all');

    const courses = courseService.getPublishedCourses();

    const categories = useMemo(() => {
        const cats = new Set(courses.map(c => c.category));
        return ['all', ...Array.from(cats)];
    }, [courses]);

    const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

    const filteredCourses = useMemo(() => {
        return courses.filter(course => {
            const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                course.description.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesCategory = selectedCategory === 'all' || course.category === selectedCategory;
            const matchesLevel = selectedLevel === 'all' || course.level === selectedLevel;
            return matchesSearch && matchesCategory && matchesLevel;
        });
    }, [courses, searchTerm, selectedCategory, selectedLevel]);

    return (
        <>
            <Helmet>
                <title>Professional Courses - SustainSutra</title>
                <meta name="description" content="Master sustainability with expert-led courses in GHG Accounting, ISO 14064, LCA, Carbon Footprinting, ESG Strategy, and Materiality Assessment." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-navy via-forest to-navy overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gold rounded-full filter blur-3xl"></div>
                    <div className="absolute bottom-20 right-10 w-96 h-96 bg-sage rounded-full filter blur-3xl"></div>
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-4xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
                            <GraduationCap className="text-gold" size={20} />
                            <span className="text-gold font-medium">Professional Training</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-playfair text-offwhite mb-6">
                            Master <span className="text-gold">Sustainability</span> Skills
                        </h1>
                        <p className="text-xl text-dimmed max-w-2xl mx-auto leading-relaxed">
                            Expert-led courses designed to elevate your career in ESG, climate action, and sustainable business practices.
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Filters Section */}
            <section className="py-12 bg-navy/50">
                <div className="container mx-auto px-4">
                    <div className="glassmorphism rounded-2xl p-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search courses..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-navy/50 border border-white/10 rounded-lg 
                                             text-offwhite placeholder-dimmed focus:outline-none focus:border-gold/50"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-dimmed" size={20} />
                                <select
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-navy/50 border border-white/10 rounded-lg 
                                             text-offwhite focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat === 'all' ? 'All Categories' : cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Level Filter */}
                            <div className="relative">
                                <select
                                    value={selectedLevel}
                                    onChange={(e) => setSelectedLevel(e.target.value)}
                                    className="w-full px-4 py-3 bg-navy/50 border border-white/10 rounded-lg 
                                             text-offwhite focus:outline-none focus:border-gold/50 appearance-none cursor-pointer"
                                >
                                    {levels.map(level => (
                                        <option key={level} value={level}>
                                            {level === 'all' ? 'All Levels' : level}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="mt-4 text-sm text-dimmed">
                            Showing {filteredCourses.length} of {courses.length} courses
                        </div>
                    </div>
                </div>
            </section>

            {/* Courses Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {filteredCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-dimmed text-lg">No courses found matching your criteria.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredCourses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <CourseCard course={course} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Corporate Training Link */}
            <section className="py-12 border-t border-white/10 bg-navy/30">
                <div className="container mx-auto px-4 text-center">
                    <p className="text-xl text-offwhite mb-4">Looking for customized corporate training?</p>
                    <a href="/services/training-capacity" className="text-gold hover:underline font-medium text-lg">
                        Explore our Corporate Training Services &rarr;
                    </a>
                </div>
            </section>
        </>
    );
};

export default CoursesLandingPage;
