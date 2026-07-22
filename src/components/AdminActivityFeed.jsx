import React, { useState, useEffect } from 'react';
import { activityService } from '@/services/activityService';
import ActivityFeed from '@/components/ActivityFeed';

// Global activity feed for admins. Loads the most recent N events across all
// entities/users. Rendered in the Admin Dashboard "Activity" tab.
const AdminActivityFeed = () => {
    const [entries, setEntries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionFilter, setActionFilter] = useState('');

    useEffect(() => {
        const params = actionFilter ? { action: actionFilter, limit: 100 } : { limit: 100 };
        activityService.list(params)
            .then((res) => setEntries(res.data || []))
            .catch(() => setEntries([]))
            .finally(() => setLoading(false));
    }, [actionFilter]);

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-playfair text-offwhite">Activity Log</h2>
                    <p className="text-dimmed text-sm">Audit trail of significant actions across the platform.</p>
                </div>
                <select
                    value={actionFilter}
                    onChange={(e) => setActionFilter(e.target.value)}
                    className="bg-navy border border-white/10 rounded-lg px-4 py-2 text-sm text-offwhite focus:border-gold outline-none"
                >
                    <option value="">All actions</option>
                    <option value="report.create">Report created</option>
                    <option value="report.status_change">Report status</option>
                    <option value="report.delete">Report deleted</option>
                    <option value="user.create">User created</option>
                    <option value="user.role_change">Role changed</option>
                    <option value="user.delete">User deleted</option>
                    <option value="payment.verify">Payment</option>
                    <option value="emission_factor.create">EF created</option>
                    <option value="emission_factor.update">EF updated</option>
                    <option value="emission_factor.delete">EF deleted</option>
                </select>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                {loading ? (
                    <p className="text-dimmed p-4">Loading activity...</p>
                ) : (
                    <ActivityFeed entries={entries} />
                )}
            </div>
        </div>
    );
};

export default AdminActivityFeed;
