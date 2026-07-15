export interface Project {
	name: string;
	url: string;
	projectType: "app" | "site" | "automation";
	image: string
}

export const projects: Project[] = [
	{
		name: 'Image Optimize',
		url: 'https://image-optimize.io',
		projectType: "app",
		image: '/images/image-optimize_screenshot.webp',
	},
	{
		name: 'Ritz-Carlton, Las Colinas',
		url: "/",
		projectType: "site",
		image: '/images/ritz-carlton_screenshot.webp',
	},
	{
		name: 'Sendero Provisions Co.',
		url: 'https://senderopc.com/',
		projectType: "site",
		image: '/images/sendero_screenshot.webp',
	},
	{
		name: 'Centurion American',
		url: 'https://centurionamerican.com/',
		projectType: "site",
		image: '/images/centurion_screenshot.webp',
	},
	{
		name: 'Higgins.AI',
		url: 'https://bniatl.com/en-US/index',
		projectType: "app",
		image: '/images/higgins_screenshot.avif',
	},
	{
		name: 'Onward Real Estate',
		url: 'https://www.onwardrealestateteam.com/',
		projectType: "site",
		image: '/images/onward_screenshot.avif',

	},
	{
		name: 'Cromwell Commercial Group',
		url: 'https://www.cromwellcommercialgroup.com/',
		projectType: "site",
		image: '/images/cromwell_screenshot.webp',
	},
	{
		name: 'Bellfit',
		url: 'https://thebellfit.com',
		projectType: "app",
		image: '/images/bellfit_screenshot.avif',
	},
	{
		name: 'Custom Automations',
		url: '/',
		projectType: "automation",
		image: '/images/automations_screenshot.avif',
	},
];
