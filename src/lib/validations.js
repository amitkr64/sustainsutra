import { z } from 'zod';

// ============================================
// User Validation Schemas
// ============================================

export const registerSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: z.string()
        .email('Invalid email address')
        .min(5, 'Email must be at least 5 characters')
        .max(255, 'Email must be less than 255 characters')
        .toLowerCase(),
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    phone: z.string()
        .optional()
        .refine((val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(val), {
            message: 'Invalid phone number format'
        })
});

export const loginSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .toLowerCase(),
    password: z.string()
        .min(1, 'Password is required')
});

export const updateProfileSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters')
        .optional(),
    bio: z.string()
        .max(500, 'Bio must be less than 500 characters')
        .optional(),
    phone: z.string()
        .optional()
        .refine((val) => !val || /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/.test(val), {
            message: 'Invalid phone number format'
        })
});

// ============================================
// Blog Validation Schemas
// ============================================

export const blogSchema = z.object({
    title: z.string()
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must be less than 200 characters'),
    content: z.string()
        .min(50, 'Content must be at least 50 characters'),
    excerpt: z.string()
        .max(500, 'Excerpt must be less than 500 characters')
        .optional(),
    author: z.string()
        .min(2, 'Author name must be at least 2 characters'),
    tags: z.array(z.string()).optional(),
    categories: z.array(z.string()).optional(),
    image: z.string().url('Invalid image URL').optional(),
    status: z.enum(['draft', 'published']).optional(),
    readTime: z.string().optional()
});

// ============================================
// Appointment Validation Schemas
// ============================================

export const appointmentSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: z.string()
        .email('Invalid email address')
        .toLowerCase(),
    date: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, 'Invalid date format (YYYY-MM-DD)'),
    timeSlot: z.string()
        .min(1, 'Time slot is required'),
    type: z.string()
        .optional()
});

// ============================================
// Course Validation Schemas
// ============================================

export const courseSchema = z.object({
    title: z.string()
        .min(5, 'Title must be at least 5 characters')
        .max(200, 'Title must be less than 200 characters'),
    slug: z.string()
        .min(3, 'Slug must be at least 3 characters')
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens'),
    category: z.string()
        .min(2, 'Category must be at least 2 characters'),
    level: z.enum(['beginner', 'intermediate', 'advanced'], {
        errorMap: () => ({ message: 'Level must be beginner, intermediate, or advanced' })
    }),
    duration: z.string()
        .min(1, 'Duration is required'),
    price: z.number()
        .min(0, 'Price must be non-negative')
        .max(999999, 'Price must be less than 999999'),
    description: z.string()
        .min(20, 'Description must be at least 20 characters'),
    instructor: z.string()
        .min(2, 'Instructor name must be at least 2 characters'),
    highlights: z.array(z.string()).optional(),
    prerequisites: z.array(z.string()).optional(),
    objectives: z.array(z.string()).optional(),
    modules: z.array(z.object({
        title: z.string().min(1, 'Module title is required'),
        duration: z.string().min(1, 'Module duration is required')
    })).optional()
});

// ============================================
// BRSR Validation Schemas
// ============================================

export const brsrAnalysisSchema = z.object({
    companyName: z.string()
        .min(2, 'Company name must be at least 2 characters')
        .max(200, 'Company name must be less than 200 characters'),
    cin: z.string()
        .regex(/^[A-Z]{1}[0-9]{5}[A-Z]{2}[0-9]{4}[A-Z]{1}[0-9]{1}[A-Z]{1}$/, 'Invalid CIN format (e.g., L12345MH2024PTC123456)'),
    financialYear: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Invalid financial year format (YYYY-YY)'),
    sector: z.string().optional(),
    industry: z.string().optional(),
    nicCode: z.string().optional()
});

// ============================================
// CCTS Entity Validation Schemas
// ============================================

export const cctsEntitySchema = z.object({
    entityName: z.string()
        .min(2, 'Entity name must be at least 2 characters')
        .max(200, 'Entity name must be less than 200 characters'),
    registrationNumber: z.string()
        .regex(/^[A-Z]{3}OE\d{3}[A-Z]{2}$/, 'Invalid registration number format (e.g., ALMOE014MH)'),
    sector: z.enum([
        'Aluminium',
        'Cement',
        'Copper',
        'Fertilizer',
        'Iron & Steel',
        'Petroleum Refinery',
        'Pulp & Paper',
        'Textile',
        'Thermal Power Plant',
        'Petrochemical'
    ], { errorMap: () => ({ message: 'Invalid sector' }) }),
    subSector: z.string()
        .min(2, 'Sub-sector is required'),
    baselineYear: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Invalid baseline year format (YYYY-YY)'),
    baselineProduction: z.number()
        .positive('Baseline production must be positive'),
    baselineProductionUnit: z.string()
        .default('tonnes'),
    baselineGHGIntensity: z.number()
        .nonnegative('GHG intensity cannot be negative'),
    plantAddress: z.object({
        addressLine1: z.string().min(1, 'Address line 1 is required'),
        addressLine2: z.string().optional(),
        city: z.string().min(1, 'City is required'),
        state: z.string().min(1, 'State is required'),
        pincode: z.string().regex(/^\d{6}$/, 'Invalid pincode format'),
        country: z.string().default('India')
    }),
    complianceOfficer: z.object({
        name: z.string().min(2, 'Officer name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().regex(/^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,4}[-\s.]?[0-9]{1,9}$/, 'Invalid phone number'),
        designation: z.string().optional()
    }).optional()
});

// ============================================
// CCTS Monitoring Data Validation Schemas
// ============================================

export const monitoringDataSchema = z.object({
    reportingPeriod: z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        complianceYear: z.string()
            .regex(/^\d{4}-\d{2}$/, 'Invalid compliance year format (YYYY-YY)')
    }),
    rawMaterials: z.array(z.object({
        name: z.string().min(1, 'Material name is required'),
        quantity: z.number().nonnegative('Quantity cannot be negative'),
        unit: z.enum(['tonnes', 'kg', 'm³', 'litres'], {
            errorMap: () => ({ message: 'Invalid unit' })
        }),
        ncv: z.number().nonnegative().optional(),
        emissionFactor: z.number().nonnegative('Emission factor is required'),
        emissionFactorType: z.enum(['Type I - Default', 'Type II - Site-Specific']).optional(),
        emissionFactorSource: z.string().optional(),
        isBiomass: z.boolean().default(false)
    })).optional(),
    fuels: z.array(z.object({
        fuelType: z.enum([
            'Coal', 'Natural Gas', 'Diesel', 'Fuel Oil', 'Petcoke', 'LPG', 'Biomass', 'Other'
        ]),
        quantity: z.number().nonnegative('Quantity cannot be negative'),
        unit: z.enum(['tonnes', 'kg', 'm³', 'litres', 'GJ']),
        ncv: z.number().nonnegative('NCV is required'),
        emissionFactor: z.number().nonnegative('Emission factor is required'),
        emissionFactorType: z.enum(['Type I - Default', 'Type II - Site-Specific']).optional(),
        emissionFactorSource: z.string().optional(),
        isBiomass: z.boolean().default(false)
    })).optional(),
    purchasedElectricity: z.object({
        grid: z.number().nonnegative().default(0),
        openAccess: z.number().nonnegative().default(0),
        renewable: z.number().nonnegative().default(0),
        emissionFactor: z.number().nonnegative().default(0.82)
    }).optional(),
    production: z.array(z.object({
        productType: z.string().min(1, 'Product type is required'),
        quantity: z.number().positive('Quantity must be positive'),
        unit: z.string().default('tonnes'),
        equivalentFactor: z.number().default(1)
    })).optional()
});

// ============================================
// Newsletter Validation Schema
// ============================================

export const newsletterSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .toLowerCase()
        .min(5, 'Email must be at least 5 characters')
        .max(255, 'Email must be less than 255 characters')
});

// ============================================
// Password Reset Validation Schema
// ============================================

export const forgotPasswordSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .toLowerCase()
});

export const resetPasswordSchema = z.object({
    password: z.string()
        .min(8, 'Password must be at least 8 characters')
        .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
        .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
});

// ============================================
// Helper Functions
// ============================================

export const validateForm = (schema, data) => {
    try {
        schema.parse(data);
        return { success: true, errors: null };
    } catch (error) {
        if (error instanceof z.ZodError) {
            const errors = error.errors.reduce((acc, err) => {
                acc[err.path.join('.')] = err.message;
                return acc;
            }, {});
            return { success: false, errors };
        }
        return { success: false, errors: { _form: error.message } };
    }
};

export const validateWithZod = (schema) => (data) => {
    return schema.safeParse(data);
};
