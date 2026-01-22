import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, Users, ArrowRight } from 'lucide-react';

const CourseCard = ({ course }) => {
    const getLevelColor = (level) => {
        switch (level?.toLowerCase()) {
            case 'beginner':
                return 'bg-green-500/20 text-green-400';
            case 'intermediate':
                return 'bg-blue-500/20 text-blue-400';
            case 'advanced':
                return 'bg-purple-500/20 text-purple-400';
            default:
                return 'bg-gray-500/20 text-gray-400';
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8 }}
            className="glassmorphism rounded-2xl p-6 h-full flex flex-col transition-smooth hover:border-gold/30"
        >
            <div className="flex items-start justify-between mb-4">
                <span className="px-3 py-1 bg-sage/20 text-sage rounded-lg text-sm font-medium">
                    {course.category}
                </span>
                <span className={`px-3 py-1 rounded-lg text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                </span>
            </div>

            <h3 className="text-2xl font-playfair text-offwhite mb-3 line-clamp-2">
                {course.title}
            </h3>

            <p className="text-dimmed text-sm mb-6 line-clamp-3 flex-grow">
                {course.description}
            </p>

            <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-dimmed">
                    <Clock size={16} className="text-gold" />
                    <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-dimmed">
                    <Users size={16} className="text-gold" />
                    <span>Instructor: {course.instructor}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <TrendingUp size={16} className="text-gold" />
                    <span className="text-gold font-semibold">₹{course.price?.toLocaleString('en-IN')}</span>
                </div>
            </div>

            <Link
                to={`/courses/${course.slug}`}
                className="w-full py-3 px-6 bg-gradient-sage-forest text-offwhite rounded-lg font-medium 
                         hover:opacity-90 transition-smooth flex items-center justify-center gap-2 group"
            >
                View Details
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-smooth" />
            </Link>
        </motion.div>
    );
};

export default CourseCard;
