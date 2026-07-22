import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const CarbonAbatementChart = () => {
    const [isVisible, setIsVisible] = useState(false);
    const chartRef = useRef(null);

    const dataPoints = [
        { x: 0, y: 100, label: 'Baseline' },
        { x: 25, y: 75, label: '' },
        { x: 50, y: 50, label: '50% Reduction' },
        { x: 75, y: 30, label: '' },
        { x: 100, y: 15, label: 'Target' }
    ];

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

    const pathData = dataPoints.map((point, index) => {
        const x = (point.x / 100) * 300;
        const y = 200 - (point.y / 100) * 150;
        return index === 0 ? `M ${x} ${y}` : `L ${x} ${y}`;
    }).join(' ');

    return (
        <div ref={chartRef} className="glassmorphism rounded-xl p-6 h-full">
            <h3 className="text-2xl font-playfair text-gold mb-6">Carbon Abatement Curve</h3>

            <div className="relative">
                <svg viewBox="0 0 340 240" className="w-full h-64">
                    {/* Grid lines */}
                    {[0, 1, 2, 3, 4].map((i) => (
                        <line
                            key={`grid-${i}`}
                            x1="20"
                            y1={50 + i * 37.5}
                            x2="320"
                            y2={50 + i * 37.5}
                            stroke="rgba(240, 242, 245, 0.1)"
                            strokeWidth="1"
                        />
                    ))}

                    {/* Axes */}
                    <line x1="20" y1="200" x2="320" y2="200" stroke="#F0F2F5" strokeWidth="2" />
                    <line x1="20" y1="50" x2="20" y2="200" stroke="#F0F2F5" strokeWidth="2" />

                    {/* Axis labels */}
                    <text x="170" y="230" fill="#A0AAB5" fontSize="12" textAnchor="middle">
                        Tons CO2e Reduced
                    </text>
                    <text x="10" y="125" fill="#A0AAB5" fontSize="12" textAnchor="middle" transform="rotate(-90 10 125)">
                        Cost (₹/ton)
                    </text>

                    {/* Line path */}
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="#C5A059"
                        strokeWidth="3"
                        strokeLinecap="round"
                        initial={{ pathLength: 0 }}
                        animate={isVisible ? { pathLength: 1 } : { pathLength: 0 }}
                        transition={{ duration: 2, ease: 'easeInOut' }}
                    />

                    {/* Data points */}
                    {dataPoints.map((point, index) => {
                        const x = 20 + (point.x / 100) * 300;
                        const y = 200 - (point.y / 100) * 150;
                        return (
                            <motion.g key={index}>
                                <motion.circle
                                    cx={x}
                                    cy={y}
                                    r="5"
                                    fill="#C5A059"
                                    initial={{ scale: 0 }}
                                    animate={isVisible ? { scale: 1 } : { scale: 0 }}
                                    transition={{ duration: 0.3, delay: 0.5 + index * 0.2 }}
                                />
                                {point.label && (
                                    <text
                                        x={x}
                                        y={y - 12}
                                        fill="#F0F2F5"
                                        fontSize="11"
                                        textAnchor="middle"
                                    >
                                        {point.label}
                                    </text>
                                )}
                            </motion.g>
                        );
                    })}
                </svg>
            </div>

            {/* Legend */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-white/10">
                <div className="w-8 h-0.5 bg-gold"></div>
                <span className="text-sm text-dimmed">Abatement trajectory</span>
            </div>
        </div>
    );
};

export default CarbonAbatementChart;