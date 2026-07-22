import React from 'react';
import { Play } from 'lucide-react';

const VideoPlayer = ({ url, title }) => {
    // Disable right-click to prevent downloading
    const handleContextMenu = (e) => {
        e.preventDefault();
    };

    return (
        <div className="relative w-full" onContextMenu={handleContextMenu}>
            <div className="aspect-video bg-black rounded-lg overflow-hidden">
                <iframe
                    src={url}
                    title={title}
                    className="w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    // Disable download attribute
                    controlsList="nodownload"
                />
            </div>

            {/* Watermark overlay */}
            <div className="absolute top-4 right-4 bg-navy/80 px-3 py-1 rounded-lg text-xs text-gold backdrop-blur-sm">
                SustainSutra
            </div>
        </div>
    );
};

export default VideoPlayer;
