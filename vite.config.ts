// vite.config.ts
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  build: {
    rollupOptions: {
      // Tell Rollup to treat @vueuse/core as external (don't bundle it)
      external: ['@vueuse/core'],
    },
  },
})