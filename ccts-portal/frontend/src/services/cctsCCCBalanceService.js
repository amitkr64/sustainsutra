/**
 * CCTS CCC Balance Service
 * Handles API calls for Carbon Credit Certificate balance and trading.
 *
 * Auth is via the httpOnly JWT cookie (credentials: 'include').
 */

const API_URL = '/api/ccts/ccc-balance';

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
 * Get all CCC balances
 */
export const getCCCBalances = async (filters = {}) => {
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
 * Get CCC balance by ID
 */
export const getCCCBalanceById = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get my CCC balance for specific compliance year
 */
export const getMyCCCBalance = async (complianceYear) => {
    const response = await fetch(`${API_URL}/my-balance/${complianceYear}`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get entity compliance history
 */
export const getEntityComplianceHistory = async (entityId) => {
    const response = await fetch(`${API_URL}/entity/${entityId}/history`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Apply offset credits to balance
 */
export const applyOffsetCredits = async (balanceId, data) => {
    const response = await fetch(`${API_URL}/${balanceId}/apply-offset`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Purchase credits
 */
export const purchaseCredits = async (balanceId, data) => {
    const response = await fetch(`${API_URL}/${balanceId}/purchase-credits`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Sell credits
 */
export const sellCredits = async (balanceId, data) => {
    const response = await fetch(`${API_URL}/${balanceId}/sell-credits`, {
        method: 'POST',
        headers: JSON_HEADERS,
        credentials: 'include',
        body: JSON.stringify(data)
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

/**
 * Get CCC balance statistics (Admin only)
 */
export const getCCCBalanceStats = async () => {
    const response = await fetch(`${API_URL}/stats/overview`, {
        method: 'GET',
        headers: JSON_HEADERS,
        credentials: 'include'
    });

    if (!response.ok) throw await parseError(response);
    return response.json();
};

export default {
    getCCCBalances,
    getCCCBalanceById,
    getMyCCCBalance,
    getEntityComplianceHistory,
    applyOffsetCredits,
    purchaseCredits,
    sellCredits,
    getCCCBalanceStats
};
