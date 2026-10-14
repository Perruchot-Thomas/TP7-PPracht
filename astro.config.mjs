// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

import netlify from '@astrojs/netlify';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
    // Évite les erreurs 504 "Outdated Optimize Dep" en dev
    optimizeDeps: {
      include: ["@observablehq/plot", "leaflet"]
    }
  },

  adapter: netlify()
});