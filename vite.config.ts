import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/asis',
  server: {
    proxy: {
      // Configura proxy para GraphQL
      '/asis_be': {
        target: 'https://ssb.matehuala.tecnm.mx',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path
      },
      // Alternativa específica para GraphQL
      '/graphql': {
        target: 'https://ssb.matehuala.tecnm.mx/asis_be',
        changeOrigin: true,
        secure: false,
      }
    },
    watch: {
      usePolling: true,
    },
  },
});