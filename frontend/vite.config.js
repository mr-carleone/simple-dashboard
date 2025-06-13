import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath, URL } from 'node:url'
import { dirname } from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false
      },
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // Используем @use вместо @import
        additionalData: `@use "@/assets/scss/variables" as *;`,
        sassOptions: {
          outputStyle: 'compressed',
          includePaths: ['node_modules'],
          sourceMap: true,
          sourceMapContents: true
        }
      },
    },
  },
  optimizeDeps: {
    include: ['sass']
  }
});
