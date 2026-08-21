import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Portal backend proxy target. Override with BACKEND_TARGET when needed.
const backendTarget = process.env.BACKEND_TARGET || 'http://localhost:5101';

export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        port: 3100,
        proxy: {
            '/api': {
                target: backendTarget,
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
