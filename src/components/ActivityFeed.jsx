import React from 'react';
import { History } from 'lucide-react';

// Renders an activity timeline. Pass either `entries` directly or
// `entityType`+`entityId` (which uses the useActivity hook to load).
import { useActivity } from '@/hooks/useActivity';

const formatRelative = (iso) => {
    const then = new Date(iso).getTime();
    const now = Date.now();
    const diff = Math.max(0, now - then);
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days}d ago`;
    return new Date(iso).toLocaleDateString();
};

const ActivityFeed = ({ entries: propEntries, entityType, entityId, limit = 20 }) => {
    const hook = useActivity(entityType, entityId, limit);
    const entries = propEntries || hook.entries;
    const loading = propEntries ? false : hook.loading;

    if (loading) {
        return <p className="text-sm text-dimmed px-2 py-4">Loading activity...</p>;
    }

    if (!entries || entries.length === 0) {
        return (
            <div className="text-center py-8 text-dimmed">
                <History className="mx-auto mb-2 opacity-40" size={24} />
                <p className="text-sm">No activity recorded yet.</p>
            </div>
        );
    }

    return (
        <div className="relative pl-6">
            {/* vertical line */}
            <div className="absolute left-2 top-1 bottom-1 w-px bg-white/10" aria-hidden="true" />
            <ul className="space-y-4">
                {entries.map((entry) => (
                    <li key={entry._id} className="relative">
                        <span className="absolute -left-[18px] top-1.5 w-2.5 h-2.5 rounded-full bg-gold/60 ring-2 ring-navy" aria-hidden="true" />
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm text-offwhite">{entry.summary}</p>
                                <p className="text-xs text-dimmed mt-0.5">
                                    {entry.actor?.email || 'System'} · {formatRelative(entry.createdAt)}
                                </p>
                            </div>
                            <span className="text-[10px] uppercase tracking-wider text-gold/60 bg-gold/5 px-2 py-0.5 rounded whitespace-nowrap">
                                {entry.action}
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityFeed;
