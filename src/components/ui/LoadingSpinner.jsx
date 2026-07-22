import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner = ({ size = "md", fullScreen = false }) => {
    const sizeClasses = {
        sm: "w-6 h-6 border-2",
        md: "w-10 h-10 border-4",
        lg: "w-16 h-16 border-4"
    };

    const spinner = (
        <div className="flex flex-col items-center gap-4">
            <motion.div
                className={`${sizeClasses[size]} border-gold border-t-transparent rounded-full`}
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
            <motion.span
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="text-gold text-sm font-medium tracking-wider uppercase"
            >
                Loading...
            </motion.span>
        </div>
    );

    if (fullScreen) {
        return (
            <div className="fixed inset-0 bg-navy z-50 flex items-center justify-center">
                {spinner}
            </div>
        );
    }

    return (
        <div className="w-full flex justify-center py-12">
            {spinner}
        </div>
    );
};

export default LoadingSpinner;
