import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    server: {
      proxy: {
        '/api/nutrition': {
          target: 'https://api.calorieninjas.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/nutrition/, '/v1/nutrition'),
          headers: {
            'X-Api-Key': env.CALORIENINJAS_API_KEY ?? '',
          },
        },
        '/api/gemini': {
          target: 'https://generativelanguage.googleapis.com',
          changeOrigin: true,
          rewrite: (path) => {
            const url = new URL(path, 'http://localhost');
            const query = url.search;
            return `/v1beta/models/gemini-2.5-flash:generateContent?key=${encodeURIComponent(env.GEMINI_API_KEY ?? '')}${query ? '&' + query.slice(1) : ''}`;
          },
        },
      },
    },
  };
})
