import React, { useMemo } from 'react';

/**
 * Progress Tracker Component
 * Shows completion progress for BRSR report
 */
const ProgressTracker = ({ formData, metadata, currentSection }) => {
    /**
     * Calculate completion percentage
     */
    const progress = useMemo(() => {
        if (!metadata || !formData) return { percentage: 0, completed: 0, total: 0 };

        let totalFields = 0;
        let completedFields = 0;
        const sectionProgress = {};

        // Iterate through all sections
        Object.entries(metadata).forEach(([sectionName, questions]) => {
            let sectionTotal = 0;
            let sectionCompleted = 0;

            questions.forEach(question => {
                if (question.fields) {
                    question.fields.forEach(field => {
                        // Skip section headers and non-input fields
                        if (field.uiType === 'section_header') return;

                        totalFields++;
                        sectionTotal++;

                        const value = formData[field.name];
                        const isCompleted = value !== null && value !== undefined && value !== '';

                        if (isCompleted) {
                            completedFields++;
                            sectionCompleted++;
                        }
                    });
                }
            });

            sectionProgress[sectionName] = {
                total: sectionTotal,
                completed: sectionCompleted,
                percentage: sectionTotal > 0 ? Math.round((sectionCompleted / sectionTotal) * 100) : 0
            };
        });

        return {
            percentage: totalFields > 0 ? Math.round((completedFields / totalFields) * 100) : 0,
            completed: completedFields,
            total: totalFields,
            sections: sectionProgress
        };
    }, [formData, metadata]);

    return (
        <div className="progress-tracker bg-white rounded-lg shadow-md p-6 sticky top-4">
            {/* Overall Progress */}
            <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">Report Progress</h3>
                    <span className="text-2xl font-bold text-blue-600">{progress.percentage}%</span>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-500 ease-out"
                        style={{ width: `${progress.percentage}%` }}
                    />
                </div>

                <p className="text-sm text-gray-600 mt-2">
                    {progress.completed} of {progress.total} fields completed
                </p>
            </div>

            {/* Section Progress */}
            <div className="space-y-3">
                <h4 className="text-sm font-semibold text-gray-700 mb-3">Section Progress</h4>

                {Object.entries(progress.sections || {}).map(([sectionName, sectionData]) => (
                    <div
                        key={sectionName}
                        className={`p-3 rounded-lg border-2 transition-all cursor-pointer ${currentSection === sectionName
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700 truncate flex-1">
                                {sectionName.replace('Section C: ', '')}
                            </span>
                            <span className="text-sm font-semibold text-gray-900 ml-2">
                                {sectionData.percentage}%
                            </span>
                        </div>

                        <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                                className={`h-full rounded-full transition-all duration-300 ${sectionData.percentage === 100
                                        ? 'bg-green-500'
                                        : 'bg-blue-500'
                                    }`}
                                style={{ width: `${sectionData.percentage}%` }}
                            />
                        </div>

                        <p className="text-xs text-gray-500 mt-1">
                            {sectionData.completed}/{sectionData.total} fields
                        </p>
                    </div>
                ))}
            </div>

            {/* Completion Status */}
            {progress.percentage === 100 && (
                <div className="mt-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg">
                    <div className="flex items-center gap-2 text-green-700">
                        <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Report Complete!</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">
                        All fields have been filled. Ready to submit.
                    </p>
                </div>
            )}
        </div>
    );
};

export default ProgressTracker;
