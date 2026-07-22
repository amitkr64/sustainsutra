import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const ESGScoreChart = () => {
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);

    const data = [
        { label: 'Current', value: 58, color: '#A0AAB5' },
        { label: 'Projected', value: 85, color: '#C5A059' }
    ];

    const maxValue = 100;

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (chartRef.current) {
            observer.observe(chartRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <div ref={chartRef} className="glassmorphism rounded-xl p-6 h-full">
            <h3 className="text-2xl font-playfair text-gold mb-6">ESG Score Improvement</h3>

            <div className="space-y-8">
                {data.map((item, index) => (
                    <div key={item.label}>
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-offwhite font-medium">{item.label}</span>
                            <span className="text-gold font-playfair text-xl">{item.value}</span>
                        </div>

                        <div className="h-12 bg-navy/50 rounded-lg overflow-hidden relative">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={isVisible ? { width: `${(item.value / maxValue) * 100}%` } : { width: 0 }}
                                transition={{ duration: 1, delay: index * 0.2, ease: 'easeOut' }}
                                className="h-full rounded-lg flex items-center justify-end pr-4"
                                style={{ backgroundColor: item.color }}
                            >
                                <span className="text-navy font-bold text-sm">{item.value}%</span>
                            </motion.div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Legend */}
            <div className="flex gap-6 mt-6 pt-6 border-t border-white/10">
                {data.map((item) => (
                    <div key={item.label} className="flex items-center gap-2">
                        <div
                            className="w-4 h-4 rounded"
                            style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-dimmed">{item.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ESGScoreChart;