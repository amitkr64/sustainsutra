import React, { useState } from 'react';

/**
 * Tooltip Component
 * Displays helpful information on hover
 */
const Tooltip = ({ content, children, position = 'top' }) => {
    const [isVisible, setIsVisible] = useState(false);

    const positionClasses = {
        top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
        bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
        left: 'right-full top-1/2 -translate-y-1/2 mr-2',
        right: 'left-full top-1/2 -translate-y-1/2 ml-2'
    };

    const arrowClasses = {
        top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-800',
        bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-800',
        left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-800',
        right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-800'
    };

    if (!content) return children;

    return (
        <div
            className="relative inline-block"
            onMouseEnter={() => setIsVisible(true)}
            onMouseLeave={() => setIsVisible(false)}
            onFocus={() => setIsVisible(true)}
            onBlur={() => setIsVisible(false)}
        >
            {children}

            {isVisible && (
                <div
                    className={`absolute z-50 ${positionClasses[position]}`}
                    role="tooltip"
                >
                    <div className="bg-gray-800 text-white text-sm rounded-lg px-3 py-2 shadow-lg max-w-xs">
                        {content}
                        <div
                            className={`absolute w-0 h-0 border-4 border-transparent ${arrowClasses[position]}`}
                        />
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * Info Icon with Tooltip
 */
export const InfoTooltip = ({ content, className = '' }) => {
    return (
        <Tooltip content={content}>
            <button
                type="button"
                className={`inline-flex items-center justify-center w-5 h-5 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors ${className}`}
                aria-label="More information"
            >
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
            </button>
        </Tooltip>
    );
};

export default Tooltip;
