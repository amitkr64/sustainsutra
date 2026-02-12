import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/index.css';
import { initSentry } from '@/lib/sentry';
import { registerSW } from 'virtual:pwa-register';

// Initialize Sentry for error tracking
initSentry();

// Register PWA service worker
const updateSW = registerSW({
    onNeedRefresh() {
        if (confirm('New content available. Reload to update?')) {
            updateSW(true);
        }
    },
    onOfflineReady() {
        console.log('App ready to work offline');
    }
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
);