/**
 * CCTS Verification Service
 * Handles API calls for verification reports and workflow
 */

const API_URL = '/api/ccts/verification';

/**
 * Get all verification reports
 */
export const getVerificationReports = async (token, filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch verification reports');
    }

    return response.json();
};

/**
 * Get pending verifications (for verifiers)
 */
export const getPendingVerifications = async (token) => {
    const response = await fetch(`${API_URL}/pending`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch pending verifications');
    }

    return response.json();
};

/**
 * Get verification report by ID
 */
export const getVerificationReportById = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch verification report');
    }

    return response.json();
};

/**
 * Create verification report
 */
export const createVerificationReport = async (token, data) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create verification report');
    }

    return response.json();
};

/**
 * Update verification report
 */
export const updateVerificationReport = async (token, id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update verification report');
    }

    return response.json();
};

/**
 * Submit verification report
 */
export const submitVerificationReport = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}/submit`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to submit verification report');
    }

    return response.json();
};

/**
 * Approve verification report (Admin only)
 */
export const approveVerificationReport = async (token, id, marketPrice) => {
    const response = await fetch(`${API_URL}/${id}/approve`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ marketPrice })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to approve verification report');
    }

    return response.json();
};

/**
 * Reject verification report (Admin only)
 */
export const rejectVerificationReport = async (token, id, comments) => {
    const response = await fetch(`${API_URL}/${id}/reject`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ comments })
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to reject verification report');
    }

    return response.json();
};

/**
 * Get verification statistics (Admin only)
 */
export const getVerificationStats = async (token) => {
    const response = await fetch(`${API_URL}/stats/overview`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch statistics');
    }

    return response.json();
};

export default {
    getVerificationReports,
    getPendingVerifications,
    getVerificationReportById,
    createVerificationReport,
    updateVerificationReport,
    submitVerificationReport,
    approveVerificationReport,
    rejectVerificationReport,
    getVerificationStats
};
