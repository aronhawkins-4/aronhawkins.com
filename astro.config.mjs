import { defineConfig, sessionDrivers } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  adapter: cloudflare(),
  integrations: [react()],
  // This site doesn't use Astro.session — opt out of the adapter's default
  // Cloudflare KV session driver so no SESSION KV namespace is required.
  session: { driver: sessionDrivers.null() },
});