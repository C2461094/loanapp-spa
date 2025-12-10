import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default defineConfig({
  plugins: [vue()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://loanapp-dev-iv3-func.azurewebsites.net',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },

    host: '0.0.0.0',
    port: 5173,
  },
});
