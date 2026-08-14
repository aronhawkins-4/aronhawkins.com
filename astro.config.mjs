import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

import icon from 'astro-icon';

import svgr from 'vite-plugin-svgr';

// https://astro.build/config
export default defineConfig({
  // Absolute base URL — required so Open Graph tags can emit absolute image and
  // page URLs (crawlers don't resolve relative ones).
  site: 'https://aronhawkins.com',
  // `imageService: 'passthrough'` disables all image transformation. The adapter
  // defaults to 'cloudflare-binding', which routes every `<Image>` through a
  // runtime `/_image` endpoint and re-encodes via the Cloudflare Images binding —
  // and because Astro omits the `q` param when no `quality` prop is set, that
  // binding falls back to *lossless* WebP (the 311KB hero source came back as a
  // 2.7MB VP8L file). The images in `src/assets` are already optimized, so serve
  // them byte-for-byte instead.
  adapter: cloudflare({ imageService: 'passthrough' }),
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