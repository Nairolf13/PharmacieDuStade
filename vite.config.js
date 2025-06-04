import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ command }) => {
  const isProduction = command === 'build'
  const repoName = 'Pharmacie' // Changez ceci par le nom de votre repository GitHub
  
  return {
    plugins: [react()],
    base: isProduction ? `/${repoName}/` : '/',
    define: {
      CESIUM_BASE_URL: JSON.stringify(isProduction ? `/${repoName}/cesium` : '/cesium'),
    },
  server: {
    host: '0.0.0.0', // Permet l'accès depuis le réseau local
    port: 5173,      // Port par défaut de Vite
    fs: {
      allow: ['..']
    },
    proxy: {
      '/api/bdpm': {
        target: 'https://m.base-donnees-publique.medicaments.gouv.fr',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/bdpm/, ''),
        secure: true
      }
    }    },
    optimizeDeps: {
      include: ['cesium']
    }
  }
})
