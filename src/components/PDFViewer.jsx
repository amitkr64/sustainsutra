import React, { useState } from 'react';
import { Download, FileText } from 'lucide-react';

const PDFViewer = ({ url, title }) => {
    const [error, setError] = useState(false);

    // Disable right-click
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    // Use Google Docs Viewer for PDF (view-only mode)
    const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;

    return (
        <div className="relative w-full h-[600px]" onContextMenu={handleContextMenu}>
            {!error ? (
                <>
                    <iframe
                        src={viewerUrl}
                        title={title}
                        className="w-full h-full border border-white/10 rounded-lg bg-white"
                        onError={() => setError(true)}
                    />

                    {/* Watermark overlay */}
                    <div className="absolute top-4 right-4 bg-navy/80 px-3 py-1 rounded-lg text-xs text-gold backdrop-blur-sm pointer-events-none">
                        SustainSutra - View Only
                    </div>

                    {/* Info banner */}
                    <div className="mt-4 bg-gold/10 border border-gold/30 rounded-lg p-3 flex items-start gap-3">
                        <FileText className="text-gold flex-shrink-0 mt-0.5" size={18} />
                        <div className="text-sm text-offwhite">
                            <p className="font-medium mb-1">PDF Document - View Only</p>
                            <p className="text-dimmed">
                                This document is for viewing purposes only. Download and print functions are disabled to protect course content.
                            </p>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full h-full border border-white/10 rounded-lg bg-navy/50 flex items-center justify-center">
                    <div className="text-center">
                        <FileText className="text-gold mx-auto mb-4" size={48} />
                        <p className="text-offwhite mb-2">Unable to load PDF</p>
                        <p className="text-dimmed text-sm">Please try refreshing the page</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PDFViewer;
