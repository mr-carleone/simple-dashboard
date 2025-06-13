import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import { fileURLToPath } from 'url'
import { dirname } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
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
