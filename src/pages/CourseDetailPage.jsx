import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import {
    Clock, Users, TrendingUp, CheckCircle, ArrowLeft,
    BookOpen, Award, Calendar, Lock, Check, Play
} from 'lucide-react';
import { courseService } from '@/services/courseService';
import { useCourses } from '@/context/CourseContext';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const CourseDetailPage = () => {
    const { slug } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { registerForCourse, isRegistered } = useCourses();
    const { toast } = useToast();
    const [loading, setLoading] = useState(false);

    const course = courseService.getCourseBySlug(slug) || courseService.getAllCourses().find(c => c.slug === slug);
    const registered = isRegistered(course?.id);

    if (!course) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-playfair text-offwhite mb-4">Course Not Found</h2>
                    <Link to="/courses" className="text-gold hover:underline">
                        ← Back to Courses
                    </Link>
                </div>
            </div>
        );
    }

    const handleRegister = async () => {
        if (!user) {
            toast({
                title: "Login Required",
                description: "Please login to register for courses.",
                variant: "destructive"
            });
            navigate('/login');
            return;
        }

        setLoading(true);
        try {
            const result = await registerForCourse(course.id);
            if (result.success) {
                toast({
                    title: "Registration Successful!",
                    description: "You have been enrolled in the course.",
                });
                setTimeout(() => navigate('/my-courses'), 1500);
            } else {
                toast({
                    title: "Registration Failed",
                    description: result.message,
                    variant: "destructive"
                });
            }
        } catch (error) {
            toast({
                title: "Error",
                description: error.message,
                variant: "destructive"
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{course.title} - SustainSutra</title>
                <meta name="description" content={course.description} />
            </Helmet>

            {/* Hero Section */}
            <section className="relative py-20 bg-gradient-to-br from-navy via-forest to-navy">
                <div className="container mx-auto px-4">
                    <Link to="/courses" className="inline-flex items-center gap-2 text-gold hover:underline mb-8">
                        <ArrowLeft size={20} />
                        Back to Courses
                    </Link>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="md:col-span-2">
                            <div className="flex items-center gap-3 mb-4">
                                <span className="px-3 py-1 bg-sage/20 text-sage rounded-lg text-sm font-medium">
                                    {course.category}
                                </span>
                                <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-lg text-sm font-medium">
                                    {course.level}
                                </span>
                            </div>

                            <h1 className="text-4xl md:text-5xl font-playfair text-offwhite mb-6">
                                {course.title}
                            </h1>

                            <p className="text-xl text-dimmed leading-relaxed mb-8">
                                {course.description}
                            </p>

                            <div className="flex flex-wrap gap-6 text-dimmed">
                                <div className="flex items-center gap-2">
                                    <Clock size={20} className="text-gold" />
                                    <span>{course.duration}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Users size={20} className="text-gold" />
                                    <span>{course.instructor}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Award size={20} className="text-gold" />
                                    <span>Certificate on Completion</span>
                                </div>
                            </div>
                        </div>

                        {/* Registration Card */}
                        <div className="md:col-span-1">
                            <div className="glassmorphism-strong rounded-2xl p-6 sticky top-24">
                                <div className="text-center mb-6">
                                    <div className="text-4xl font-bold text-gold mb-2">
                                        ₹{course.price?.toLocaleString('en-IN')}
                                    </div>
                                    <p className="text-dimmed text-sm">One-time payment</p>
                                </div>

                                {registered ? (
                                    <>
                                        <Link
                                            to={`/courses/${slug}/learn`}
                                            className="w-full py-3 px-6 bg-gradient-sage-forest text-offwhite rounded-lg font-medium 
                                                     hover:opacity-90 transition-smooth flex items-center justify-center gap-2 mb-3"
                                        >
                                            <Play size={20} />
                                            Start Learning
                                        </Link>
                                        <Link
                                            to="/my-courses"
                                            className="w-full py-3 px-6 bg-white/5 border border-white/10 text-offwhite rounded-lg font-medium 
                                                     hover:bg-white/10 transition-smooth flex items-center justify-center gap-2"
                                        >
                                            <Check size={20} />
                                            My Courses
                                        </Link>
                                    </>
                                ) : (
                                    <button
                                        onClick={handleRegister}
                                        disabled={loading}
                                        className="w-full py-3 px-6 bg-gradient-sage-forest text-offwhite rounded-lg font-medium 
                                                 hover:opacity-90 transition-smooth disabled:opacity-50"
                                    >
                                        {loading ? 'Enrolling...' : 'Enroll Now'}
                                    </button>
                                )}

                                <div className="mt-6 space-y-3">
                                    <div className="flex items-start gap-2 text-sm text-dimmed">
                                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>Lifetime access to course materials</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-dimmed">
                                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>Expert instructor support</span>
                                    </div>
                                    <div className="flex items-start gap-2 text-sm text-dimmed">
                                        <CheckCircle size={16} className="text-green-400 mt-0.5 flex-shrink-0" />
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Course Highlights - NEW PROMINENT SECTION */}
            {course.highlights && course.highlights.length > 0 && (
                <section className="py-12 bg-navy relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                    <div className="container mx-auto px-4">
                        <div className="flex flex-col md:flex-row items-center gap-8 bg-gold/5 border border-gold/20 rounded-3xl p-8 backdrop-blur-sm relative z-10 shadow-2xl">
                            <div className="absolute -top-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-3xl" />
                            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-sage/10 rounded-full blur-3xl" />

                            <div className="md:w-1/3 relative z-10">
                                <h2 className="text-3xl md:text-4xl font-playfair text-gold mb-4 leading-tight">
                                    Exclusive <br />
                                    <span className="text-offwhite">Course Highlights</span>
                                </h2>
                                <p className="text-dimmed leading-relaxed">Key value propositions that make this training stand out in the industry.</p>
                            </div>
                            <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
                                {course.highlights.map((highlight, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: 20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex items-center gap-4 group bg-white/5 p-4 rounded-2xl border border-white/5 hover:border-gold/30 hover:bg-white/10 transition-all duration-300"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center border border-gold/20 group-hover:bg-gold group-hover:text-navy transition-all duration-300 flex-shrink-0">
                                            <TrendingUp size={24} />
                                        </div>
                                        <span className="text-lg font-medium text-offwhite group-hover:text-gold transition-colors">
                                            {highlight}
                                        </span>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
                </section>
            )}

            {/* Course Content */}
            <section className="py-16">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Learning Objectives */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-playfair text-offwhite mb-6">What You'll Learn</h2>
                        <div className="grid md:grid-cols-2 gap-4">
                            {course.objectives?.map((objective, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-3 glassmorphism rounded-lg p-4"
                                >
                                    <CheckCircle className="text-gold flex-shrink-0 mt-1" size={20} />
                                    <span className="text-dimmed">{objective}</span>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Prerequisites */}
                    {course.prerequisites && (
                        <div className="mb-12">
                            <h2 className="text-3xl font-playfair text-offwhite mb-6">Prerequisites</h2>
                            <div className="glassmorphism rounded-lg p-6">
                                <ul className="space-y-3">
                                    {course.prerequisites.map((prereq, index) => (
                                        <li key={index} className="flex items-center gap-3 text-dimmed">
                                            <div className="w-1.5 h-1.5 bg-gold rounded-full" />
                                            {prereq}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}

                    {/* Course Modules */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-playfair text-offwhite mb-6">Course Curriculum</h2>
                        <div className="space-y-4">
                            {course.modules?.map((module, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className="glassmorphism rounded-lg p-6"
                                >
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-start gap-4">
                                            <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                                                <BookOpen className="text-gold" size={20} />
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-semibold text-offwhite mb-1">
                                                    Module {index + 1}: {module.title}
                                                </h3>
                                                <div className="flex items-center gap-2 text-sm text-dimmed">
                                                    <Calendar size={14} />
                                                    <span>{module.duration}</span>
                                                </div>
                                            </div>
                                        </div>
                                        {!registered && <Lock size={20} className="text-dimmed" />}
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Instructor Section */}
                    <div className="mb-12">
                        <h2 className="text-3xl font-playfair text-offwhite mb-6">Your Instructor</h2>
                        <div className="glassmorphism rounded-xl p-8 flex flex-col md:flex-row gap-8 items-start">
                            <div className="w-24 h-24 bg-gradient-sage-forest rounded-full flex items-center justify-center text-3xl font-bold text-offwhite flex-shrink-0">
                                {course.instructor.charAt(0)}
                            </div>
                            <div>
                                <h3 className="text-2xl font-semibold text-offwhite mb-2">{course.instructor}</h3>
                                {course.instructorBio && (
                                    <p className="text-dimmed leading-relaxed mb-4">{course.instructorBio}</p>
                                )}
                                <div className="flex gap-4">
                                    <div className="flex items-center gap-2 text-gold">
                                        <Users size={16} />
                                        <span className="text-sm">500+ Students</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gold">
                                        <Award size={16} />
                                        <span className="text-sm">Certified Expert</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Reviews Section */}
                    {course.reviews && course.reviews.length > 0 && (
                        <div className="mb-16">
                            <h2 className="text-3xl font-playfair text-offwhite mb-6">Student Reviews</h2>
                            <div className="grid md:grid-cols-2 gap-6">
                                {course.reviews.map((review) => (
                                    <div key={review.id} className="glassmorphism rounded-xl p-6">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-offwhite font-bold text-xs">
                                                    {review.user.charAt(0)}
                                                </div>
                                                <span className="text-offwhite font-medium">{review.user}</span>
                                            </div>
                                            <div className="flex text-gold text-sm">
                                                {[...Array(5)].map((_, i) => (
                                                    <span key={i}>{i < review.rating ? '★' : '☆'}</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-dimmed text-sm italic">"{review.comment}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Courses */}
                    <div className="border-t border-white/10 pt-16">
                        <h2 className="text-3xl font-playfair text-offwhite mb-8">Related Courses</h2>
                        <div className="grid md:grid-cols-3 gap-6">
                            {courseService.getAllCourses()
                                .filter(c => c.category === course.category && c.id !== course.id && c.published)
                                .slice(0, 3)
                                .map(relatedCourse => (
                                    <Link key={relatedCourse.id} to={`/courses/${relatedCourse.slug}`} className="glassmorphism rounded-xl p-6 hover:translate-y-[-5px] transition-transform block">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="px-2 py-1 bg-white/10 text-xs rounded text-gold">{relatedCourse.category}</span>
                                            <span className="text-xs text-dimmed">{relatedCourse.level}</span>
                                        </div>
                                        <h3 className="text-lg font-playfair text-offwhite mb-2 line-clamp-2">{relatedCourse.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-dimmed mt-4">
                                            <Clock size={14} />
                                            <span>{relatedCourse.duration}</span>
                                        </div>
                                    </Link>
                                ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CourseDetailPage;
