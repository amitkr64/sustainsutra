import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { useCourses } from '@/context/CourseContext';
import { useAuth } from '@/context/AuthContext';
import { courseService } from '@/services/courseService';

const MyCourses = () => {
    const { user } = useAuth();
    const { registrations } = useCourses();
    const navigate = useNavigate();

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-playfair text-offwhite mb-4">Please Login</h2>
                    <Link to="/login" className="text-gold hover:underline">
                        Go to Login →
                    </Link>
                </div>
            </div>
        );
    }

    const enrolledCourses = registrations.map(reg => ({
        ...courseService.getCourseById(reg.courseId),
        registrationId: reg.id,
        registeredAt: reg.registeredAt,
        progress: reg.progress || 0
    })).filter(c => c.id);

    return (
        <>
            <Helmet>
                <title>My Courses - SustainSutra</title>
                <meta name="description" content="Access your enrolled courses and track your learning progress." />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-navy via-forest to-navy">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/30 rounded-full mb-6">
                            <GraduationCap className="text-gold" size={20} />
                            <span className="text-gold font-medium">Your Learning Journey</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl font-playfair text-offwhite mb-6">
                            My <span className="text-gold">Courses</span>
                        </h1>
                        <p className="text-xl text-dimmed">
                            Welcome back, {user.name || user.email}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    {enrolledCourses.length === 0 ? (
                        <div className="text-center py-20">
                            <BookOpen className="mx-auto mb-6 text-dimmed" size={64} />
                            <h3 className="text-2xl font-playfair text-offwhite mb-4">
                                No Enrolled Courses Yet
                            </h3>
                            <p className="text-dimmed mb-8">
                                Start your learning journey by enrolling in a course.
                            </p>
                            <Link
                                to="/courses"
                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-sage-forest 
                                         text-offwhite rounded-lg font-medium hover:opacity-90 transition-smooth"
                            >
                                Browse Courses
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {enrolledCourses.map((course, index) => (
                                <motion.div
                                    key={course.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glassmorphism rounded-2xl p-6 flex flex-col"
                                >
                                    <div className="flex items-start justify-between mb-4">
                                        <span className="px-3 py-1 bg-sage/20 text-sage rounded-lg text-sm font-medium">
                                            {course.category}
                                        </span>
                                        <span className="text-xs text-dimmed">
                                            Enrolled: {new Date(course.registeredAt).toLocaleDateString()}
                                        </span>
                                    </div>

                                    <h3 className="text-2xl font-playfair text-offwhite mb-3">
                                        {course.title}
                                    </h3>

                                    <p className="text-dimmed text-sm mb-6 line-clamp-2 flex-grow">
                                        {course.description}
                                    </p>

                                    {/* Progress Bar */}
                                    <div className="mb-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-sm text-dimmed">Progress</span>
                                            <span className="text-sm font-semibold text-gold">{course.progress}%</span>
                                        </div>
                                        <div className="w-full h-2 bg-navy/50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-gradient-to-r from-gold to-sage transition-all duration-500"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-6 text-sm text-dimmed">
                                        <div className="flex items-center gap-2">
                                            <Clock size={16} className="text-gold" />
                                            <span>{course.duration}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <TrendingUp size={16} className="text-gold" />
                                            <span>{course.level}</span>
                                        </div>
                                    </div>

                                    <Link
                                        to={`/courses/${course.slug}`}
                                        className="w-full py-3 px-6 bg-gradient-sage-forest text-offwhite rounded-lg 
                                                 font-medium hover:opacity-90 transition-smooth text-center"
                                    >
                                        Continue Learning →
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </>
    );
};

export default MyCourses;
