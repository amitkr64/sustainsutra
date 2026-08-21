import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import path from 'path';

// Backend proxy target. Override with BACKEND_TARGET when the backend runs on
// a non-default port locally (e.g. BACKEND_TARGET=http://localhost:5001).
const backendTarget = process.env.BACKEND_TARGET || 'http://localhost:5000';

// Base path for GitHub Pages project deployment (repo: sustainsutra).
// Override with BASE_PATH=/ for a custom domain or user/organisation page.
const basePath = process.env.BASE_PATH || '/sustainsutra/';

// https://vitejs.dev/config/
export default defineConfig({
    base: basePath,
    plugins: [
        react(),
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],
            manifest: false, // We use public/manifest.json
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'google-fonts-cache',
                            expiration: {
                                maxEntries: 10,
                                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    },
                    {
                        urlPattern: /\/api\/.*/i,
                        handler: 'NetworkFirst',
                        options: {
                            cacheName: 'api-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 60 * 60 * 24 // 1 day
                            },
                            cacheableResponse: {
                                statuses: [0, 200]
                            }
                        }
                    }
                ]
            },
            devOptions: {
                enabled: false // Disable PWA in development
            }
        })
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    server: {
        proxy: {
            '/api': {
                target: backendTarget,
                changeOrigin: true,
                secure: false,
            },
            // SEO routes served by the backend in development.
            '/sitemap.xml': {
                target: backendTarget,
                changeOrigin: true,
            },
            '/robots.txt': {
                target: backendTarget,
                changeOrigin: true,
            },
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split heavy libraries into separate chunks so they load
                    // on-demand rather than bloating the initial bundle.
                    'vendor-charts': ['recharts'],
                    'vendor-xlsx': ['xlsx'],
                    'vendor-pdf': ['jspdf'],
                    'vendor-framer': ['framer-motion'],
                    'vendor-radix': [
                        '@radix-ui/react-dialog',
                        '@radix-ui/react-dropdown-menu',
                        '@radix-ui/react-tabs',
                        '@radix-ui/react-toast',
                        '@radix-ui/react-alert-dialog',
                    ],
                },
            },
        },
    },
});
