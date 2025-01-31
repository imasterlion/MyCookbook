import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MyCookbook/',  // 改回项目名称
  build: {
    outDir: 'dist',
    assetsDir: '',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: {
          'mui': ['@mui/material', '@mui/icons-material'],
          'vendor': ['react', 'react-dom', 'react-router-dom', 'date-fns']
        },
        entryFileNames: `assets/[name].[hash].js`,      // 添加 assets 前缀
        chunkFileNames: `assets/[name].[hash].js`,      // 添加 assets 前缀
        assetFileNames: `assets/[name].[hash][extname]` // 添加 assets 前缀
      }
    }
  }
})
