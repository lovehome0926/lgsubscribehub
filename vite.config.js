import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { renderPromoPdf } from './scripts/render-promo-pdf.mjs'

function promoPages() {
  return {
    name: "promo-pages",
    async buildStart() {
      await renderPromoPdf()
    },
  }
}

export default defineConfig({
  plugins: [promoPages(), react(), tailwindcss()],
  server: {
    watch: {
      ignored: ["**/INSTALL_PHOTOS/**", "**/GROUP_PHOTOS/**", "**/CARESHIP_PHOTOS/**", "**/sheet/**"],
    },
  },
})
