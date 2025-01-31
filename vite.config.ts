import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MyCookbook/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',  // 恢复 assets 目录
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material'],
          'vendor': ['react', 'react-dom', 'react-router-dom', 'date-fns']
        },
        entryFileNames: '[name].[hash].js',      // 移除 assets 前缀
        chunkFileNames: '[name].[hash].js',      // 移除 assets 前缀
        assetFileNames: '[name].[hash][extname]' // 移除 assets 前缀
      }
    }
  }
})
