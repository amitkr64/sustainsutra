/**
 * CCTS Verification Service
 * Handles API calls for verification reports and workflow.
 *
 * Auth is via the httpOnly JWT cookie (credentials: 'include').
 */

const API_URL = '/api/ccts/verification';

const JSON_HEADERS = { 'Content-Type': 'application/json' };

async function parseError(response) {
    try {
        const error = await response.json();
        return new Error(error.message || 'Request failed');
    } catch {
        return new Error(`Request failed (${response.status})`);
    }
}

/**
 * Get all verification reports
 */
export const getVerificationReports = async (filters = {}) => {
    const queryParams = new URLSearchParams(filters).toString();
    const url = queryParams ? `${API_URL}?${queryParams}` : API_URL;

    const response = await fetch(url, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get pending verifications (for verifiers)
 */
export const getPendingVerifications = async () => {
    const response = await fetch(`${API_URL}/pending`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get verification report by ID
 */
export const getVerificationReportById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Create verification report
 */
export const createVerificationReport = async (data) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Update verification report
 */
export const updateVerificationReport = async (id, data) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Submit verification report
 */
export const submitVerificationReport = async (id) => {
    const response = await fetch(`${API_URL}/${id}/submit`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Approve verification report (Admin only)
 */
export const approveVerificationReport = async (id, marketPrice) => {
    const response = await fetch(`${API_URL}/${id}/approve`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify({ marketPrice })
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Reject verification report (Admin only)
 */
export const rejectVerificationReport = async (id, comments) => {
    const response = await fetch(`${API_URL}/${id}/reject`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify({ comments })
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get verification statistics (Admin only)
 */
export const getVerificationStats = async () => {
    const response = await fetch(`${API_URL}/stats/overview`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
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
