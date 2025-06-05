import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium'

// https://vite.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [react(), cesium()],
  base: '/PharmacieDuStade/',
  build: {
    outDir: 'docs',
    assetsDir: 'assets'
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    fs: {
      allow: ['..']
    }
  }
}))
