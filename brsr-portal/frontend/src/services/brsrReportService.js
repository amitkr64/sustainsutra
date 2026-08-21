// BRSR report service (list, get, years, diff). Auth via httpOnly cookie.
const API_URL = '/api/brsr-reports';

const parseError = async (response) => {
    try {
        const e = await response.json();
        return new Error(e.message || e.error || 'Request failed');
    } catch {
        return new Error(`Request failed (${response.status})`);
    }
};

export const brsrReportService = {
    getYears: async () => {
        const response = await fetch(`${API_URL}/years`, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // Diff two reports by id.
    getDiff: async (idA, idB) => {
        const response = await fetch(`${API_URL}/diff?ids=${idA},${idB}`, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    },

    // List reports, optionally filtered by year(s).
    getReports: async (financialYear) => {
        const qs = financialYear ? `?financialYear=${encodeURIComponent(financialYear)}` : '';
        const response = await fetch(`${API_URL}${qs}`, { credentials: 'include' });
        if (!response.ok) throw await parseError(response);
        return response.json();
    }
};

export default brsrReportService;
