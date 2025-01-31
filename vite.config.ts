import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/MyCookbook/',
  build: {
    outDir: 'dist',
    assetsDir: '',
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // 恢复代码分割
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom', 'date-fns', '@mui/material', '@mui/icons-material'],
        },
        // 简化输出路径
        entryFileNames: `[name].[hash].js`,
        chunkFileNames: `[name].[hash].js`,
        assetFileNames: `[name].[hash][extname]`
      }
    }
  }
})
