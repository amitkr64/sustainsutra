import { useState, useEffect, useCallback } from 'react';
import activityService from '@/services/activityService';

/**
 * Fetches the activity history for a specific entity (e.g. a BRSR report).
 * Re-fetches when the entity changes. Returns { entries, loading, refresh }.
 */
export const useActivity = (entityType, entityId, limit = 20) => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(false);

    const refresh = useCallback(async () => {
        if (!entityType || !entityId) return;
        setLoading(true);
        try {
            const res = await activityService.forEntity(entityType, entityId, limit);
            setEntries(res.data || []);
        } catch {
            setEntries([]);
        } finally {
            setLoading(false);
        }
    }, [entityType, entityId, limit]);

    useEffect(() => {
        refresh();
    }, [refresh]);

    return { entries, loading, refresh };
};

export default useActivity;
