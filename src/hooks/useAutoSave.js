import { useState, useEffect, useCallback, useRef } from 'react';
import axios from 'axios';
import { userService } from '@/services/userService';

/**
 * Auto-save hook for BRSR forms
 * Automatically saves form data with debouncing
 */
const useAutoSave = (reportId, formData, options = {}) => {
    const {
        debounceMs = 2000,        // Wait 2 seconds after last change
        onSaveSuccess = null,
        onSaveError = null,
        enabled = true
    } = options;

    const [saveStatus, setSaveStatus] = useState('saved'); // 'saving', 'saved', 'error', 'unsaved'
    const [lastSaved, setLastSaved] = useState(null);
    const [error, setError] = useState(null);

    const saveTimeoutRef = useRef(null);
    const previousDataRef = useRef(formData);
    const isSavingRef = useRef(false);

    /**
     * Save function
     */
    const save = useCallback(async (data) => {
        if (!enabled || !reportId || isSavingRef.current) {
            return;
        }

        try {
            isSavingRef.current = true;
            setSaveStatus('saving');
            setError(null);

            const response = await axios.put(
                `/api/brsr/${reportId}`,
                data,
                {
                    headers: {
                        'Authorization': `Bearer ${userService.getToken()}`
                    }
                }
            );

            setSaveStatus('saved');
            setLastSaved(new Date());
            previousDataRef.current = data;

            if (onSaveSuccess) {
                onSaveSuccess(response.data);
            }

        } catch (err) {
            console.error('Auto-save error:', err);
            setSaveStatus('error');
            setError(err.response?.data?.message || 'Failed to save');

            if (onSaveError) {
                onSaveError(err);
            }
        } finally {
            isSavingRef.current = false;
        }
    }, [reportId, enabled, onSaveSuccess, onSaveError]);

    /**
     * Debounced save effect
     */
    useEffect(() => {
        if (!enabled) return;

        // Check if data has changed
        const dataChanged = JSON.stringify(formData) !== JSON.stringify(previousDataRef.current);

        if (!dataChanged) return;

        // Mark as unsaved
        setSaveStatus('unsaved');

        // Clear existing timeout
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }

        // Set new timeout
        saveTimeoutRef.current = setTimeout(() => {
            save(formData);
        }, debounceMs);

        // Cleanup
        return () => {
            if (saveTimeoutRef.current) {
                clearTimeout(saveTimeoutRef.current);
            }
        };
    }, [formData, enabled, debounceMs, save]);

    /**
     * Manual save function
     */
    const saveNow = useCallback(() => {
        if (saveTimeoutRef.current) {
            clearTimeout(saveTimeoutRef.current);
        }
        save(formData);
    }, [formData, save]);

    return {
        saveStatus,
        lastSaved,
        error,
        saveNow,
        isSaving: saveStatus === 'saving'
    };
};

export default useAutoSave;
