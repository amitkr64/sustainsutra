import React, { useState, useEffect } from 'react';
import BRSRValidator from '../utils/brsrValidator';
import { InfoTooltip } from './Tooltip';

/**
 * Validated Input Field Component
 * Wraps input fields with validation and error display
 */
const ValidatedField = ({
    field,
    value,
    onChange,
    onBlur,
    className = '',
    showValidation = true,
    disabled = false
}) => {
    const [error, setError] = useState(null);
    const [touched, setTouched] = useState(false);

    /**
     * Validate field on value change
     */
    useEffect(() => {
        if (!showValidation || !touched) return;

        const validation = BRSRValidator.validateField(value, field);
        setError(validation.error);
    }, [value, field, showValidation, touched]);

    /**
     * Handle blur event
     */
    const handleBlur = (e) => {
        setTouched(true);
        if (onBlur) onBlur(e);
    };

    /**
     * Get input class names based on validation state
     */
    const getInputClassName = () => {
        const baseClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 transition-colors';

        if (disabled) {
            return `${baseClasses} bg-gray-100 text-gray-500 cursor-not-allowed border-gray-300`;
        }

        if (error && touched) {
            return `${baseClasses} border-red-300 focus:border-red-500 focus:ring-red-200`;
        }

        if (touched && !error && value) {
            return `${baseClasses} border-green-300 focus:border-green-500 focus:ring-green-200`;
        }

        return `${baseClasses} border-gray-300 focus:border-blue-500 focus:ring-blue-200`;
    };

    /**
     * Render input based on field type
     */
    const renderInput = () => {
        const commonProps = {
            id: field.name,
            name: field.name,
            value: value || '',
            onChange: (e) => onChange(e.target.value),
            onBlur: handleBlur,
            className: `${getInputClassName()} ${className}`,
            disabled,
            'aria-invalid': error && touched ? 'true' : 'false',
            'aria-describedby': error && touched ? `${field.name}-error` : undefined
        };

        switch (field.uiType) {
            case 'number':
                return (
                    <input
                        type="number"
                        step="any"
                        {...commonProps}
                        placeholder={field.placeholder || '0'}
                    />
                );

            case 'email':
                return (
                    <input
                        type="email"
                        {...commonProps}
                        placeholder={field.placeholder || 'email@example.com'}
                    />
                );

            case 'phone':
                return (
                    <input
                        type="tel"
                        {...commonProps}
                        placeholder={field.placeholder || '+91 XXXXX XXXXX'}
                    />
                );

            case 'date':
                return (
                    <input
                        type="date"
                        {...commonProps}
                    />
                );

            case 'select':
                return (
                    <select {...commonProps}>
                        <option value="">Select...</option>
                        {field.options?.map(option => (
                            <option key={option} value={option}>
                                {option}
                            </option>
                        ))}
                    </select>
                );

            case 'textarea':
                return (
                    <textarea
                        {...commonProps}
                        rows={field.rows || 4}
                        placeholder={field.placeholder || 'Enter details...'}
                    />
                );

            default:
                return (
                    <input
                        type="text"
                        {...commonProps}
                        placeholder={field.placeholder || ''}
                    />
                );
        }
    };

    return (
        <div className="validated-field">
            {/* Label */}
            {field.label && (
                <label
                    htmlFor={field.name}
                    className="block text-sm font-medium text-gray-700 mb-1"
                >
                    <span className="flex items-center gap-2">
                        {field.label}
                        {field.required && (
                            <span className="text-red-500" aria-label="required">*</span>
                        )}
                        {field.helpText && (
                            <InfoTooltip content={field.helpText} />
                        )}
                    </span>
                </label>
            )}

            {/* Input Field */}
            <div className="relative">
                {renderInput()}

                {/* Validation Icon */}
                {touched && !disabled && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
                        {error ? (
                            <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                            </svg>
                        ) : value ? (
                            <svg className="h-5 w-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                        ) : null}
                    </div>
                )}
            </div>

            {/* Error Message */}
            {error && touched && (
                <p
                    id={`${field.name}-error`}
                    className="mt-1 text-sm text-red-600 flex items-center gap-1"
                    role="alert"
                >
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}

            {/* Help Text */}
            {field.description && !error && (
                <p className="mt-1 text-sm text-gray-500">
                    {field.description}
                </p>
            )}
        </div>
    );
};

export default ValidatedField;
