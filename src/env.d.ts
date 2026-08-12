/// <reference types="astro/client" />
/// <reference types="vite-plugin-svgr/client" />
/// <reference path="../.astro/types.d.ts" />

interface Window {
	posthog?: {
		capture: (event: string, properties?: Record<string, unknown>) => void;
	};
}
