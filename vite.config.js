import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  server: {
    proxy: {
      '/api': {
        target: 'https://newsapi.org/v2',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy) => {
          proxy.on('proxyRes', (proxyRes) => {
            proxyRes.headers['content-type'] = 'application/json';
          });
        }
      }
    }
  }

})
