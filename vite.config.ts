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
        manualChunks: undefined,
        // 添加 MyCookbook 前缀到文件名
        entryFileNames: `MyCookbook/[name].[hash].js`,
        chunkFileNames: `MyCookbook/[name].[hash].js`,
        assetFileNames: `MyCookbook/[name].[hash][extname]`
      }
    }
  }
})
