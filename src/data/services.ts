export interface Service {
	name: string;
	description: string;
	slug: string;
}

export const services: Service[] = [
	{
		name: 'Apps',
		description: "Web and mobile apps built from scratch to fit how your business works, whether that's a customer-facing product, an internal tool, or both.",
		slug: 'apps',
	},
	{
		name: 'Sites',
		description: 'Websites that are fast, mobile-responsive, optimized for SEO, and designed to convert, getting you found by users and gaining valuable leads.',
		slug: 'sites',
	},
	{
		name: 'Automation',
		description: 'Automation workflows that handle the busywork and let you focus on what you\'re best at, giving you time back to solve the problems that matter.',
		slug: 'automation',
	}
];
