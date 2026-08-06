import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

import icon from 'astro-icon';

import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [react(), icon()],
  // svgr turns `*.svg?react` imports into React components so SVGs can be
  // rendered inside React components (Astro's default `.svg` import returns an
  // Astro component that React can't render). Plain `.svg` imports in `.astro`
  // files are untouched — only the `?react` query is handled by svgr.
  vite: { plugins: [svgr()] },
  // This site doesn't use Astro.session — opt out of the adapter's default
  // Cloudflare KV session driver so no SESSION KV namespace is required.
  session: { driver: sessionDrivers.null() },
});