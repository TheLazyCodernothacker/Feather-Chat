import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import app from './server/app.js';

const expressServerPlugin = (path, expressApp) => ({
    name: 'configure-server',
    configureServer(server) {
        server.middlewares.use(path, expressApp);
    }
});

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        expressServerPlugin("/", app),
        react()
    ],
    server: {
        host: '0.0.0.0',
    }
})
