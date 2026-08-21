/**
 * BRSR Validation Utilities
 * Provides validation functions for form fields
 */

class BRSRValidator {
    /**
     * Validate percentage value (0-100)
     */
    static validatePercentage(value, fieldName = 'Percentage') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null }; // Empty is valid (optional field)
        }

        const numValue = parseFloat(value);

        if (isNaN(numValue)) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid number`
            };
        }

        if (numValue < 0 || numValue > 100) {
            return {
                isValid: false,
                error: `${fieldName} must be between 0 and 100`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate non-negative number
     */
    static validateNonNegative(value, fieldName = 'Value') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        const numValue = parseFloat(value);

        if (isNaN(numValue)) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid number`
            };
        }

        if (numValue < 0) {
            return {
                isValid: false,
                error: `${fieldName} cannot be negative`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate email address
     */
    static validateEmail(value, fieldName = 'Email') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(value)) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid email address`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate phone number (Indian format)
     */
    static validatePhone(value, fieldName = 'Phone number') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        // Remove spaces, dashes, and parentheses
        const cleaned = value.replace(/[\s\-()]/g, '');

        // Check for Indian phone number format (10 digits, optionally with +91)
        const phoneRegex = /^(\+91)?[6-9]\d{9}$/;

        if (!phoneRegex.test(cleaned)) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid 10-digit Indian phone number`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate CIN (Corporate Identity Number)
     */
    static validateCIN(value, fieldName = 'CIN') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        // CIN format: L/U + 5 digits + State code (2 chars) + Year (4 digits) + Type (3 chars) + 6 digits
        const cinRegex = /^[LU]\d{5}[A-Z]{2}\d{4}[A-Z]{3}\d{6}$/;

        if (!cinRegex.test(value)) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid 21-character CIN`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate required field
     */
    static validateRequired(value, fieldName = 'Field') {
        if (value === null || value === undefined || value === '' ||
            (Array.isArray(value) && value.length === 0)) {
            return {
                isValid: false,
                error: `${fieldName} is required`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate year format (YYYY or YYYY-YY)
     */
    static validateYear(value, fieldName = 'Year') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        const yearRegex = /^\d{4}(-\d{2})?$/;

        if (!yearRegex.test(value)) {
            return {
                isValid: false,
                error: `${fieldName} must be in format YYYY or YYYY-YY`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate date format (YYYY-MM-DD)
     */
    static validateDate(value, fieldName = 'Date') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        const date = new Date(value);

        if (isNaN(date.getTime())) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid date`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate URL
     */
    static validateURL(value, fieldName = 'URL') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        try {
            new URL(value);
            return { isValid: true, error: null };
        } catch (e) {
            return {
                isValid: false,
                error: `${fieldName} must be a valid URL`
            };
        }
    }

    /**
     * Validate text length
     */
    static validateLength(value, min, max, fieldName = 'Field') {
        if (value === null || value === undefined || value === '') {
            return { isValid: true, error: null };
        }

        const length = value.length;

        if (min && length < min) {
            return {
                isValid: false,
                error: `${fieldName} must be at least ${min} characters`
            };
        }

        if (max && length > max) {
            return {
                isValid: false,
                error: `${fieldName} must not exceed ${max} characters`
            };
        }

        return { isValid: true, error: null };
    }

    /**
     * Validate field based on UI type
     */
    static validateField(value, field) {
        const fieldName = field.label || 'Field';
        const validations = [];

        // Required validation
        if (field.required) {
            validations.push(this.validateRequired(value, fieldName));
        }

        // Type-specific validation
        switch (field.uiType) {
            case 'number':
                if (field.validation?.percentage) {
                    validations.push(this.validatePercentage(value, fieldName));
                } else {
                    validations.push(this.validateNonNegative(value, fieldName));
                }
                break;

            case 'email':
                validations.push(this.validateEmail(value, fieldName));
                break;

            case 'phone':
                validations.push(this.validatePhone(value, fieldName));
                break;

            case 'text':
                if (field.validation?.cin) {
                    validations.push(this.validateCIN(value, fieldName));
                } else if (field.validation?.year) {
                    validations.push(this.validateYear(value, fieldName));
                } else if (field.validation?.url) {
                    validations.push(this.validateURL(value, fieldName));
                }

                if (field.validation?.minLength || field.validation?.maxLength) {
                    validations.push(this.validateLength(
                        value,
                        field.validation.minLength,
                        field.validation.maxLength,
                        fieldName
                    ));
                }
                break;

            case 'date':
                validations.push(this.validateDate(value, fieldName));
                break;
        }

        // Return first error found
        const error = validations.find(v => !v.isValid);
        return error || { isValid: true, error: null };
    }

    /**
     * Validate entire form section
     */
    static validateSection(formData, fields) {
        const errors = {};
        let isValid = true;

        fields.forEach(field => {
            const value = formData[field.name];
            const validation = this.validateField(value, field);

            if (!validation.isValid) {
                errors[field.name] = validation.error;
                isValid = false;
            }
        });

        return { isValid, errors };
    }
}

// Export for use in both Node.js and browser
if (typeof module !== 'undefined' && module.exports) {
    module.exports = BRSRValidator;
} else {
    window.BRSRValidator = BRSRValidator;
}
