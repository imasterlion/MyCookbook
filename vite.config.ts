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
      input: {
        main: '/Users/shenyang/Documents/个人/Program/MyCookbook/index.html'
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
