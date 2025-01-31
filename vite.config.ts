import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: '/MyCookbook/',
  build: {
    outDir: 'dist',
    assetsDir: '',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, 'index.html')  // 使用正确的入口文件路径
      },
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'date-fns', '@mui/material', '@mui/icons-material'],
        },
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash][extname]`
      }
    }
  }
})
