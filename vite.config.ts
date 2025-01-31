import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MyCookbook/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material'],
          'vendor': ['react', 'react-dom', 'react-router-dom', 'date-fns'] // 将 date-fns 合并到 vendor 包中
        }
      }
    }
  }
})
