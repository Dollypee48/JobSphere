import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://job-sphere-67rc.vercel.app',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
