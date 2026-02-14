const { z } = require('zod');

// ============================================
// User Validation Schemas
// ============================================

const registerSchema = z.object({
    name: z.string()
        .min(2, 'Name must be at least 2 characters')
        .max(100, 'Name must be less than 100 characters'),
    email: z.string()
        .email('Invalid email address')
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
        }),
    role: z.enum(['user', 'admin', 'instructor', 'ccts-entity', 'ccts-verifier', 'ccts-admin'])
        .optional()
        .default('user')
});

const loginSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .toLowerCase(),
    password: z.string()
        .min(1, 'Password is required')
});

const updateProfileSchema = z.object({
    name: z.string()
        .min(2)
        .max(100)
        .optional(),
    bio: z.string()
        .max(500)
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

const blogSchema = z.object({
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
    readTime: z.string().optional(),
    slug: z.string()
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must contain only lowercase letters, numbers, and hyphens')
        .optional()
});

// ============================================
// Appointment Validation Schemas
// ============================================

const appointmentSchema = z.object({
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
    type: z.string().optional(),
    status: z.enum(['pending', 'confirmed', 'cancelled']).optional()
});

// ============================================
// Course Validation Schemas
// ============================================

const courseSchema = z.object({
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
    published: z.boolean().optional()
});

// ============================================
// CCTS Entity Validation Schemas
// ============================================

const cctsEntitySchema = z.object({
    entityName: z.string()
        .min(2, 'Entity name must be at least 2 characters')
        .max(200, 'Entity name must be less than 200 characters'),
    registrationNumber: z.string()
        .regex(/^[A-Z]{3}OE\d{3}[A-Z]{2}$/, 'Invalid registration number format'),
    sector: z.enum([
        'Aluminium', 'Cement', 'Copper', 'Fertilizer', 'Iron & Steel',
        'Petroleum Refinery', 'Pulp & Paper', 'Textile',
        'Thermal Power Plant', 'Petrochemical'
    ]),
    subSector: z.string()
        .min(2, 'Sub-sector is required'),
    baselineYear: z.string()
        .regex(/^\d{4}-\d{2}$/, 'Invalid baseline year format'),
    baselineProduction: z.number()
        .positive('Baseline production must be positive'),
    baselineProductionUnit: z.string().default('tonnes'),
    baselineGHGIntensity: z.number()
        .nonnegative('GHG intensity cannot be negative')
});

// ============================================
// Monitoring Data Validation Schemas
// ============================================

const monitoringDataSchema = z.object({
    entity: z.string()
        .min(1, 'Entity ID is required'),
    reportingPeriod: z.object({
        startDate: z.coerce.date(),
        endDate: z.coerce.date(),
        complianceYear: z.string()
            .regex(/^\d{4}-\d{2}$/, 'Invalid compliance year format')
    }),
    rawMaterials: z.array(z.object({
        name: z.string().min(1),
        quantity: z.number().nonnegative(),
        unit: z.enum(['tonnes', 'kg', 'm³', 'litres']),
        ncv: z.number().nonnegative().optional(),
        emissionFactor: z.number().nonnegative(),
        emissionFactorType: z.enum(['Type I - Default', 'Type II - Site-Specific']).optional(),
        isBiomass: z.boolean().default(false)
    })).optional(),
    fuels: z.array(z.object({
        fuelType: z.enum([
            'Coal', 'Natural Gas', 'Diesel', 'Fuel Oil', 'Petcoke',
            'LPG', 'Biomass', 'Other'
        ]),
        quantity: z.number().nonnegative(),
        unit: z.enum(['tonnes', 'kg', 'm³', 'litres', 'GJ']),
        ncv: z.number().nonnegative(),
        emissionFactor: z.number().nonnegative(),
        isBiomass: z.boolean().default(false)
    })).optional(),
    purchasedElectricity: z.object({
        grid: z.number().nonnegative().default(0),
        openAccess: z.number().nonnegative().default(0),
        renewable: z.number().nonnegative().default(0),
        emissionFactor: z.number().nonnegative().default(0.82)
    }).optional(),
    production: z.array(z.object({
        productType: z.string().min(1),
        quantity: z.number().positive(),
        unit: z.string().default('tonnes'),
        equivalentFactor: z.number().default(1)
    })).optional()
});

// ============================================
// Newsletter Validation Schema
// ============================================

const newsletterSchema = z.object({
    email: z.string()
        .email('Invalid email address')
        .toLowerCase()
});

// ============================================
// Validation Middleware Factory
// ============================================

const validate = (schema) => {
    return (req, res, next) => {
        try {
            schema.parse(req.body);
            next();
        } catch (error) {
            if (error instanceof z.ZodError) {
                const errors = error.errors.reduce((acc, err) => {
                    acc[err.path.join('.')] = err.message;
                    return acc;
                }, {});

                return res.status(400).json({
                    success: false,
                    message: 'Validation error',
                    errors
                });
            }
            return res.status(400).json({
                success: false,
                message: error.message
            });
        }
    };
};

module.exports = {
    registerSchema,
    loginSchema,
    updateProfileSchema,
    blogSchema,
    appointmentSchema,
    courseSchema,
    cctsEntitySchema,
    monitoringDataSchema,
    newsletterSchema,
    validate
};
