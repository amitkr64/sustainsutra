/**
 * CCTS CCC Balance Service
 * Handles API calls for Carbon Credit Certificate balance and trading
 */

const API_URL = '/api/ccts/ccc-balance';

/**
 * Get all CCC balances
 */
export const getCCCBalances = async (token, filters = {}) => {
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
        throw new Error(error.message || 'Failed to fetch CCC balances');
    }

    return response.json();
};

/**
 * Get CCC balance by ID
 */
export const getCCCBalanceById = async (token, id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch CCC balance');
    }

    return response.json();
};

/**
 * Get my CCC balance for specific compliance year
 */
export const getMyCCCBalance = async (token, complianceYear) => {
    const response = await fetch(`${API_URL}/my-balance/${complianceYear}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch balance');
    }

    return response.json();
};

/**
 * Get entity compliance history
 */
export const getEntityComplianceHistory = async (token, entityId) => {
    const response = await fetch(`${API_URL}/entity/${entityId}/history`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to fetch compliance history');
    }

    return response.json();
};

/**
 * Apply offset credits to balance
 */
export const applyOffsetCredits = async (token, balanceId, data) => {
    const response = await fetch(`${API_URL}/${balanceId}/apply-offset`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to apply offset credits');
    }

    return response.json();
};

/**
 * Purchase credits
 */
export const purchaseCredits = async (token, balanceId, data) => {
    const response = await fetch(`${API_URL}/${balanceId}/purchase-credits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to purchase credits');
    }

    return response.json();
};

/**
 * Sell credits
 */
export const sellCredits = async (token, balanceId, data) => {
    const response = await fetch(`${API_URL}/${balanceId}/sell-credits`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to sell credits');
    }

    return response.json();
};

/**
 * Get CCC balance statistics (Admin only)
 */
export const getCCCBalanceStats = async (token) => {
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
    getCCCBalances,
    getCCCBalanceById,
    getMyCCCBalance,
    getEntityComplianceHistory,
    applyOffsetCredits,
    purchaseCredits,
    sellCredits,
    getCCCBalanceStats
};
