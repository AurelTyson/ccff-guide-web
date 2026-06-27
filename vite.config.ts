import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// Project page on GitHub Pages → served from /ccff-guide-web/.
// Override with `BASE_PATH=/ vite build` for a root deploy (Vercel/Netlify).
const base = process.env.BASE_PATH ?? '/ccff-guide-web/'

export default defineConfig({
  base,
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Icons are generated from src/assets/logo.svg via pwa-assets.config.ts
      // and injected into the manifest automatically.
      pwaAssets: {
        config: true,
        overrideManifestIcons: true,
      },
      manifest: {
        name: 'Guide pratique du Bénévole CCFF',
        short_name: 'Guide CCFF',
        description:
          'Guide pratique du bénévole des Comités Communaux Feux de Forêts ' +
          'de l’Hérault — consultable hors-ligne sur le terrain.',
        lang: 'fr',
        dir: 'ltr',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#f6f4ee',
        theme_color: '#1f7a3d',
        categories: ['reference', 'utilities', 'education'],
      },
      workbox: {
        // Precache the whole shell + the map images so every section works offline.
        globPatterns: [
          '**/*.{js,css,html,svg,png,ico,webmanifest,jpg,jpeg,webp,woff,woff2}',
        ],
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
      },
    }),
  ],
})
