import React from 'react';
import { FileText } from 'lucide-react';

const DocumentViewer = ({ url, title, type }) => {
    // Disable right-click
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    // Use Google Docs Viewer for Word and PowerPoint files
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

    const getFileTypeLabel = () => {
        switch (type) {
            case 'ppt':
                return 'PowerPoint Presentation';
            case 'doc':
                return 'Word Document';
            default:
                return 'Document';
        }
    };

    return (
        <div className="relative w-full h-[600px]" onContextMenu={handleContextMenu}>
            <iframe
                src={viewerUrl}
                title={title}
                className="w-full h-full border border-white/10 rounded-lg bg-white"
            />

            {/* Watermark overlay */}
            <div className="absolute top-4 right-4 bg-navy/80 px-3 py-1 rounded-lg text-xs text-gold backdrop-blur-sm pointer-events-none">
                SustainSutra - View Only
            </div>

            {/* Info banner */}
            <div className="mt-4 bg-gold/10 border border-gold/30 rounded-lg p-3 flex items-start gap-3">
                <FileText className="text-gold flex-shrink-0 mt-0.5" size={18} />
                <div className="text-sm text-offwhite">
                    <p className="font-medium mb-1">{getFileTypeLabel()} - View Only</p>
                    <p className="text-dimmed">
                        This document is for viewing purposes only. Download and editing functions are disabled.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default DocumentViewer;
