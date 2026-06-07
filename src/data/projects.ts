export interface Project {
	name: string;
	url?: string;
	description: string;
	tech: string;
	wide?: boolean;
	image?: string;
}

export const projects: Project[] = [
	{
		name: 'Image Optimize',
		wide: true,
		url: 'https://image-optimize.io',
		description:
			'An image optimization platform built for speed and privacy. Bulk uploads, conversion between AVIF, WebP, PNG, and JPG, and granular control over compression and sizing. Files are processed without ever being stored on the server, so images are never kept.',
		tech: 'TanStack Start · Supabase · Polar.sh',
		image: '/images/image-optimize_screenshot.avif',
	},
	{
		name: 'Higgins.AI',
		description:
			"An AI chatbot built to embed directly on business websites, with a companion mobile app. It connected to each business's own data to answer questions specific to that company, reading the direction of each conversation to suggest relevant follow-up prompts as the chat went on.",
		tech: 'Next.js · React Native · Express · ChromaDB · Supabase',
		image: '/images/higgins_screenshot.avif',
		url: 'https://bniatl.com/en-US/index',
	},
	{
		name: 'Onward Real Estate',
		description:
			'A website and web application for a local brokerage, built around fast, map-based property search with detailed filtering. A custom integration with the regional MLS automatically imports and updates listings, so nothing has to be entered or maintained by hand.',
		tech: 'Next.js · PayloadCMS · Supabase · Resend · NTREIS',
		image: '/images/onward_screenshot.avif',
		url: 'https://www.onwardrealestateteam.com/',
	},
	{
		name: 'Bellfit',
		description:
			'An online fitness platform where members create accounts, pay for access, and work through classes at their own pace, with progress tracked along the way. It streams a full library of class videos and hosts live sessions, powered by custom PHP behind the scenes.',
		tech: 'PHP · WordPress · Stripe · Vimeo',
		image: '/images/bellfit_screenshot.avif',
		url: 'https://thebellfit.com',
	},
	{
		name: 'Custom Automations',
		description:
			"Over 50 custom automations built to take repetitive work off businesses' plates: creating project tasks when a calendar event is scheduled, logging time when emails go out, running regular health checks on websites, posting client updates to Slack from project data, and drafting routine emails. If a process is repetitive and rule-based, there is a good chance it can be automated away.",
		tech: 'n8n · Python · JavaScript',
		image: '/images/automations_screenshot.avif',
	},
];
