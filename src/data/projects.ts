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
		name: 'Ritz-Carlton, Las Colinas',
		description:
			"Multiple web projects for a world-class hospitality brand. Projects include an internal asset management system for the Ritz-Carlton, Las Colinas marketing team and a custom website for Knife Italian Steak, a premium steakhouse within the Ritz-Carlton, Las Colinas. Features of the asset management system include user authentication, search and filtering, and multiple size options for downloading assets, allowing the marketing team to easily find and use assets for various outlets and marketing platforms.",
		tech: 'JavaScript · Webflow',
		image: '/images/ritz-carlton_screenshot.webp',
	},
	{
		name: 'Sendero Provisions Co.',
		description:
			"Custom e-commerce site for a national retail brand. The site features a custom Shopify theme with with Liquid and JavaScript, including advanced theme-builder customizations to allow the client to easily create and update content across the site without needing to touch any code.",
		tech: 'Shopify · Liquid · JavaScript',
		image: '/images/sendero_screenshot.webp',
		url: 'https://senderopc.com/',
	},
	{
		name: 'Centurion American',
		description:
			"A custom website for a national real estate development company. The site features a custom CMS and advanced search and filtering for easy browsing of the company's residential and commercial portfolio.",
		tech: 'PHP · Wordpress · JavaScript',
		image: '/images/centurion_screenshot.webp',
		url: 'https://centurionamerican.com/',
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
		name: 'Cromwell Commercial Group',
		description:
			'A website and custom MLS integration for a commercial real estate brokerage. The MLS integration automatically imports and updates listings from the company\'s MLS, and the site includes advanced map search and filtering features.',
		tech: 'Node.js · Webflow',
		image: '/images/cromwell_screenshot.webp',
		url: 'https://www.cromwellcommercialgroup.com/',
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
