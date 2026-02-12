import React from 'react';

/**
 * Save Status Indicator Component
 * Shows current save status with visual feedback
 */
const SaveStatusIndicator = ({ saveStatus, lastSaved, error, onSaveNow }) => {
    const getStatusConfig = () => {
        switch (saveStatus) {
            case 'saving':
                return {
                    icon: (
                        <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                    ),
                    text: 'Saving...',
                    className: 'text-blue-600 bg-blue-50 border-blue-200'
                };
            case 'saved':
                return {
                    icon: (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    ),
                    text: lastSaved ? `Saved ${formatTimeAgo(lastSaved)}` : 'All changes saved',
                    className: 'text-green-600 bg-green-50 border-green-200'
                };
            case 'unsaved':
                return {
                    icon: (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    ),
                    text: 'Unsaved changes',
                    className: 'text-yellow-600 bg-yellow-50 border-yellow-200'
                };
            case 'error':
                return {
                    icon: (
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                    ),
                    text: error || 'Save failed',
                    className: 'text-red-600 bg-red-50 border-red-200'
                };
            default:
                return null;
        }
    };

    const config = getStatusConfig();
    if (!config) return null;

    return (
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${config.className} text-sm font-medium`}>
            {config.icon}
            <span>{config.text}</span>

            {(saveStatus === 'unsaved' || saveStatus === 'error') && onSaveNow && (
                <button
                    onClick={onSaveNow}
                    className="ml-2 px-2 py-1 text-xs bg-white rounded hover:bg-gray-50 border"
                >
                    Save Now
                </button>
            )}
        </div>
    );
};

/**
 * Format time ago helper
 */
function formatTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);

    if (seconds < 60) return 'just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}

export default SaveStatusIndicator;
