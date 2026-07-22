// API Configuration with versioning support

const API_VERSION = 'v1';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_CONFIG = {
    baseURL: API_BASE_URL,
    version: API_VERSION,
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Build API URL with version
export const buildApiUrl = (endpoint) => {
    const url = new URL(endpoint, API_BASE_URL);
    return url.toString();
};

// API endpoints with versioning
export const API_ENDPOINTS = {
    // Auth endpoints
    auth: {
        login: () => `/api/${API_VERSION}/users/login`,
        register: () => `/api/${API_VERSION}/users`,
        me: () => `/api/${API_VERSION}/users/me`,
        forgotPassword: () => `/api/${API_VERSION}/users/forgot-password`,
        resetPassword: () => `/api/${API_VERSION}/users/reset-password`
    },

    // Blog endpoints
    blogs: {
        list: () => `/api/${API_VERSION}/blogs`,
        create: () => `/api/${API_VERSION}/blogs`,
        get: (id) => `/api/${API_VERSION}/blogs/${id}`,
        update: (id) => `/api/${API_VERSION}/blogs/${id}`,
        delete: (id) => `/api/${API_VERSION}/blogs/${id}`
    },

    // Appointment endpoints
    appointments: {
        create: () => `/api/${API_VERSION}/appointments`,
        list: () => `/api/${API_VERSION}/appointments`,
        get: (id) => `/api/${API_VERSION}/appointments/${id}`,
        update: (id) => `/api/${API_VERSION}/appointments/${id}`,
        delete: (id) => `/api/${API_VERSION}/appointments/${id}`
    },

    // Course endpoints
    courses: {
        list: () => `/api/${API_VERSION}/courses`,
        create: () => `/api/${API_VERSION}/courses`,
        get: (slug) => `/api/${API_VERSION}/courses/${slug}`,
        update: (id) => `/api/${API_VERSION}/courses/${id}`,
        delete: (id) => `/api/${API_VERSION}/courses/${id}`,
        enroll: (id) => `/api/${API_VERSION}/courses/${id}/enroll`
    },

    // CCTS endpoints
    ccts: {
        dashboard: () => `/api/${API_VERSION}/ccts/dashboard`,
        entities: () => `/api/${API_VERSION}/ccts/entities`,
        monitoringData: {
            list: () => `/api/${API_VERSION}/ccts/monitoring-data`,
            create: () => `/api/${API_VERSION}/ccts/monitoring-data`,
            get: (id) => `/api/${API_VERSION}/ccts/monitoring-data/${id}`,
            update: (id) => `/api/${API_VERSION}/ccts/monitoring-data/${id}`,
            submit: (id) => `/api/${API_VERSION}/ccts/monitoring-data/${id}/submit`
        },
        verification: {
            queue: () => `/api/${API_VERSION}/ccts/verification/queue`,
            get: (id) => `/api/${API_VERSION}/ccts/verification/${id}`,
            submit: (id) => `/api/${API_VERSION}/ccts/verification/${id}/submit`
        }
    },

    // BRSR endpoints
    brsr: {
        dashboard: () => `/api/${API_VERSION}/brsr-reports`,
        reports: {
            list: () => `/api/${API_VERSION}/brsr-reports`,
            create: () => `/api/${API_VERSION}/brsr-reports`,
            get: (id) => `/api/${API_VERSION}/brsr-reports/${id}`,
            update: (id) => `/api/${API_VERSION}/brsr-reports/${id}`,
            delete: (id) => `/api/${API_VERSION}/brsr-reports/${id}`
        },
        analysis: {
            list: () => `/api/${API_VERSION}/brsr-analysis`,
            get: (id) => `/api/${API_VERSION}/brsr-analysis/${id}`,
            upload: () => `/api/${API_VERSION}/brsr-analysis/upload`,
            compare: () => `/api/${API_VERSION}/brsr-analysis/compare`
        },
        export: {
            pdf: (id) => `/api/${API_VERSION}/brsr-analysis/${id}/export/pdf`,
            excel: (id) => `/api/${API_VERSION}/brsr-analysis/${id}/export/excel`,
            csv: (id) => `/api/${API_VERSION}/brsr-analysis/${id}/export/csv`
        }
    },

    // Emission factors
    emissionFactors: {
        list: () => `/api/${API_VERSION}/emission-factors`,
        categories: () => `/api/${API_VERSION}/emission-factors/categories`,
        search: () => `/api/${API_VERSION}/emission-factors/search`,
        get: (id) => `/api/${API_VERSION}/emission-factors/${id}`
    },

    // Resources
    resources: {
        list: () => `/api/${API_VERSION}/resources`,
        templates: () => `/api/${API_VERSION}/resources/templates`,
        reports: () => `/api/${API_VERSION}/resources/reports`,
        glossary: () => `/api/${API_VERSION}/resources/glossary`
    },

    // Newsletter
    newsletter: {
        subscribe: () => `/api/${API_VERSION}/newsletter/subscribe`,
        unsubscribe: () => `/api/${API_VERSION}/newsletter/unsubscribe`
    },

    // Health check
    health: () => `/api/${API_VERSION}/health`
};

export default API_CONFIG;
