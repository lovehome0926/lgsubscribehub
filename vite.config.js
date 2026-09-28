import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    watch: {
      ignored: ["**/INSTALL_PHOTOS/**", "**/GROUP_PHOTOS/**", "**/CARESHIP_PHOTOS/**", "**/sheet/**"],
    },
  },
})
