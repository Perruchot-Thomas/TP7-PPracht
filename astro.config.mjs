// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Pré-optimise les bibliothèques utilisées côté client dès le démarrage du serveur de dev
    // (évite les erreurs 504 "Outdated Optimize Dep" et la carte qui ne s'affiche pas)
    optimizeDeps: {
      include: ["@observablehq/plot", "leaflet"]
    }
  },

  adapter: netlify()
});