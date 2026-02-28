import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        port: 5173,
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/signup': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/login': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/auth': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/dashboard': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/logout': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/forgot-password': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
            '/reset-password': {
                target: 'http://localhost:5000',
                changeOrigin: true,
            },
        },
    },
    build: {
        outDir: 'build',
    },
});
