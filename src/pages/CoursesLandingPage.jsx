import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { GraduationCap, Search, Filter, CheckCircle } from 'lucide-react';
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

            {/* Premium Hero Section */}
            <section className="relative min-h-[60vh] flex items-center pt-32 pb-20 overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80"
                        alt="Education"
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/95 to-navy/80" />
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10" />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/20 border border-gold/30 rounded-full mb-6 backdrop-blur-md">
                                <GraduationCap className="text-gold" size={20} />
                                <span className="text-gold font-medium tracking-wide uppercase text-xs">Academic Excellence</span>
                            </div>

                            <h1 className="text-5xl md:text-7xl font-playfair text-offwhite mb-6 leading-tight">
                                Professional <br />
                                <span className="text-gold italic">Sustainability</span> Training
                            </h1>
                            <p className="text-xl text-dimmed max-w-xl leading-relaxed mb-8">
                                Gain industry-recognized certifications and practical expertise from Dr. Amit Kumar and global ESG experts. Transform your career with data-driven climate action.
                            </p>

                            <div className="flex flex-wrap gap-4">
                                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                    <div className="w-2 h-2 rounded-full bg-gold animate-pulse" />
                                    <span className="text-offwhite text-sm">Live & Interactive</span>
                                </div>
                                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2 rounded-xl">
                                    <div className="w-2 h-2 rounded-full bg-sage animate-pulse" />
                                    <span className="text-offwhite text-sm">Industry Projects</span>
                                </div>
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="hidden lg:block"
                        >
                            <div className="relative">
                                <div className="absolute -inset-4 bg-gold/20 blur-3xl rounded-full" />
                                <div className="glassmorphism rounded-3xl p-8 border-gold/20 relative z-10 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gold/10 rounded-full -mr-16 -mt-16 blur-2xl" />
                                    <h3 className="text-2xl font-playfair text-offwhite mb-6">Why SustainSutra?</h3>
                                    <ul className="space-y-4">
                                        {[
                                            'Global Accreditation Alignment',
                                            'Real-world Case Studies',
                                            'Post-Training Support Ecosystem',
                                            'Practical Tools & Templates Included'
                                        ].map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <div className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-1">
                                                    <CheckCircle size={14} className="text-gold" />
                                                </div>
                                                <span className="text-dimmed leading-snug">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    </div>
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
