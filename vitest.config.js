import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
    plugins: [react()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './src/tests/setup.js',
        css: true,
        exclude: [
            '**/node_modules/**',
            '**/dist/**',
            '**/backend/**',  // backend tests use jest, not vitest
        ],
        coverage: {
            provider: 'v8',
            reporter: ['text', 'json', 'html'],
            exclude: [
                'node_modules/',
                'src/tests/',
                '**/*.d.ts',
                '**/*.config.*',
                '**/dist/**'
            ]
        }
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
