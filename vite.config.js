import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/PharmacieDuStade/',
  define: {
    CESIUM_BASE_URL: JSON.stringify('/PharmacieDuStade/cesium'),
  },
  build: {
    outDir: 'docs',
    assetsDir: 'assets',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          cesium: ['cesium']
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    fs: {
      allow: ['..']
    }
  },
  optimizeDeps: {
    include: ['cesium']
  }
})
