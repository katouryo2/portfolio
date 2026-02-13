import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/nutrition': {
        target: 'https://api.calorieninjas.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/nutrition/, '/v1/nutrition'),
      },
    },
  },
})
