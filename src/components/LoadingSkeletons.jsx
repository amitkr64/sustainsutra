import React from 'react';

export const LoadingSkeleton = ({ className = '' }) => (
    <div className={`animate-pulse ${className}`}>
        <div className="bg-white/5 rounded-lg h-full"></div>
    </div>
);

export const BlogCardSkeleton = () => (
    <div className="glassmorphism rounded-xl overflow-hidden shadow-lg h-full flex flex-col animate-pulse">
        <div className="h-48 bg-white/5"></div>
        <div className="p-6 flex-1 flex flex-col space-y-3">
            <div className="h-4 bg-white/5 rounded w-3/4"></div>
            <div className="h-3 bg-white/5 rounded w-1/2"></div>
            <div className="space-y-2 flex-1">
                <div className="h-3 bg-white/5 rounded"></div>
                <div className="h-3 bg-white/5 rounded"></div>
                <div className="h-3 bg-white/5 rounded w-5/6"></div>
            </div>
        </div>
    </div>
);

export const CourseCardSkeleton = () => (
    <div className="glassmorphism rounded-2xl overflow-hidden border border-white/5 animate-pulse">
        <div className="h-56 bg-white/5"></div>
        <div className="p-6 space-y-4">
            <div className="h-6 bg-white/5 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-full"></div>
            <div className="h-4 bg-white/5 rounded w-5/6"></div>
            <div className="flex items-center justify-between pt-4">
                <div className="h-8 bg-white/5 rounded w-24"></div>
                <div className="h-10 bg-white/5 rounded w-32"></div>
            </div>
        </div>
    </div>
);

export const TableRowSkeleton = ({ columns = 4 }) => (
    <tr className="border-b border-white/5">
        {Array.from({ length: columns }).map((_, index) => (
            <td key={index} className="p-4">
                <div className="h-4 bg-white/5 rounded animate-pulse"></div>
            </td>
        ))}
    </tr>
);

export const CalculatorSkeleton = () => (
    <div className="space-y-4 animate-pulse">
        {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white/[0.03] rounded-2xl p-6 border border-white/5">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    <div className="lg:col-span-3">
                        <div className="h-12 bg-white/5 rounded-xl"></div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="h-12 bg-white/5 rounded-xl"></div>
                    </div>
                    <div className="lg:col-span-4">
                        <div className="h-12 bg-white/5 rounded-xl"></div>
                    </div>
                    <div className="lg:col-span-1">
                        <div className="h-12 bg-white/5 rounded-xl"></div>
                    </div>
                </div>
            </div>
        ))}
    </div>
);

export const PageLoadingSkeleton = () => (
    <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="text-center">
            <div className="w-16 h-16 border-4 border-gold/20 border-t-gold rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-dimmed text-sm font-medium">Loading...</p>
        </div>
    </div>
);

export default {
    LoadingSkeleton,
    BlogCardSkeleton,
    CourseCardSkeleton,
    TableRowSkeleton,
    CalculatorSkeleton,
    PageLoadingSkeleton
};
