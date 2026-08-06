export interface Project {
	name: string;
	description?: string;
	featuredImage: string
	imageGallery?: {
		path: string,
		alt?: string
	}[];
	deliverables?: string[];
	problem?: string;
	solution?: string;
	slug?: string;
	projectType: "app" | "site" | "automation";
	projectTypeDisplay?: string;
	tags?: string[];
}

export const projects: Project[] = [
	{
		name: 'Image Optimize',
		description: '<p>Image Optimize is a web application that provides a simple and effective solution for optimizing images. It allows users to upload images, choose optimization settings, and download optimized images quickly and easily. The app also provides an API for developers to integrate image optimization into their own applications.</p>',
		slug: 'image-optimize',
		projectType: "app",
		projectTypeDisplay: "Web App",
		deliverables: ['Web App', 'API', 'Payment processing'],
		problem: '<p>Image optimization is a critical aspect of web development, as it directly impacts website performance, user experience, and search engine rankings. However, many developers struggle to find an efficient and effective solution for optimizing images without sacrificing quality or speed.</p>',
		solution: '<p>Image Optimize is a web application that provides a simple and effective solution for optimizing images. It allows users to upload images, choose optimization settings, and download optimized images quickly and easily. The app also provides an API for developers to integrate image optimization into their own applications.</p>',
		featuredImage: '/images/projects/image-optimize/image-optimize-screenshot_1.webp',
		imageGallery: [
			{ path: '/images/projects/image-optimize/image-optimize-screenshot_1.webp' },
			{ path: '/images/projects/image-optimize/image-optimize-screenshot_2.webp' },
			{ path: '/images/projects/image-optimize/image-optimize-screenshot_3.webp' },
			{ path: '/images/projects/image-optimize/image-optimize-screenshot_4.webp' },
			{ path: '/images/projects/image-optimize/image-optimize-screenshot_5.webp' },
			{ path: '/images/projects/image-optimize/image-optimize-screenshot_6.webp' }
		],
		tags: ['Web App', 'Productivity']
	},
	{
		name: 'Ritz-Carlton, Las Colinas',
		slug: 'ritz-carlton',
		projectType: "site",
		projectTypeDisplay: "Web App & Website",
		description: "<p>The Ritz-Carlton is a luxury hospitality brand that exemplifies excellence. Their location in Las Colinas, Texas partnered with Sidekick Creative Agency to build several web projects, all of which were developed and architected by Aron Hawkins. The first was an asset management platform to make finding and downloading marketing materials simple and fast. The second project was a website for their high-end steakhouse, Knife Italian.</p>",
		problem: '<p>The Ritz-Carlton, Las Colinas did not have an efficient way to search for and share marketing materials, such as photos, brochures, and videos across their marketing team. This inefficiency was costing time and manpower whenever new marketing effors, such as social media posts, website updates, and event brochures needed to be made.</p><p>The Ritz-Carlton, Las Colinas was opening a new luxury restaruant, Knife Italian. They needed a website that represented both the brand of Ritz-Carlton and the italian heritage of the restaurant.</p>',
		solution: "<p>Aron Hawkins built a web application that allows digital assets, such as images, PDF documents, and videos to be easily organized, searched for, and downloaded. This app utilizes a Content Management System so the Ritz-Carlton marketing team can manage uploading, editing, and deleting assets without the need for outside help. The app saves their team time, allowing them to focus on creating the best campaigns possible.</p><p>Aron also developed the website for Knife Italian. The site allows users to easily browse restaurant menus, make dining and special event reservations, and view the dining areas and delicious dish offerings.</p>",
		deliverables: ['Web App', 'CMS', 'Restaurant Website', 'Reservation Integration'],
		featuredImage: '/images/ritz-carlton_screenshot.webp',
		imageGallery: [
			{ path: '/images/projects/ritz-carlton/rclc-screenshot_1.webp' },
			{ path: '/images/projects/ritz-carlton/rclc-screenshot_2.webp' },
			{ path: '/images/projects/ritz-carlton/rclc-screenshot_3.webp' },
			{ path: '/images/projects/ritz-carlton/knife-italian-screenshot_1.webp' },
			{ path: '/images/projects/ritz-carlton/knife-italian-screenshot_2.webp' },
			{ path: '/images/projects/ritz-carlton/knife-italian-screenshot_3.webp' },
			{ path: '/images/projects/ritz-carlton/knife-italian-screenshot_4.webp' },
			{ path: '/images/projects/ritz-carlton/knife-italian-screenshot_5.webp' },
		],
		tags: ['Internal Tools', 'Restaurant Website']
	},
	{
		name: 'Sendero Provisions Co.',
		description: '<p>Sendero Provisions Company is a western lifestyle and apparel brand. Their ecommerce website handles millions of dollars in online sales per year. In 2023, Sidekick Creative Agency completely redesigned the Sendero website, and Aron Hawkins developed the site in Shopify using the Liquid programming language.</p>',
		slug: 'senderopc',
		projectType: "site",
		projectTypeDisplay: 'Website',
		deliverables: ['Custom Shopify Theme', 'Retailer Map', 'YouTube Embed Integration'],
		problem: '<p>Sendero\'s previous site was outdated and didn\nt reflect the high-quality design and photography of the brand. They needed a site that reflected their brand while also being optimized to convert visitors into paying customers.</p>',
		solution: '<p>Building from Sidekick Creative Agency\'s website design, Aron Hawkins built an ecommerce site that uses dynamic layouts, mobile-responsiveness, and custom integrations to showcase Sendero\'s unique brand. The site highlights Sendero\'s professional photography and top-of-the-line apparel, leading users to easy purchases.</p>',
		featuredImage: '/images/sendero_screenshot.webp',
		tags: ['E-commerce', 'Shopify'],
		imageGallery: [
			{ path: '/images/projects/sendero/sendero-screenshot_1.webp' },
			{ path: '/images/projects/sendero/sendero-screenshot_2.webp' },
			{ path: '/images/projects/sendero/sendero-screenshot_3.webp' },
			{ path: '/images/projects/sendero/sendero-screenshot_4.webp' },
			{ path: '/images/projects/sendero/sendero-screenshot_5.webp' },
			{ path: '/images/projects/sendero/sendero-screenshot_6.webp' },
			{ path: '/images/projects/sendero/sendero-screenshot_7.webp' }
		]
	},
	{
		name: 'Centurion American',
		slug: 'centurion-american',
		description: '<p>Centurion American is a leading real estate developer in Texas. They have a vast commercial and residential portfolio, and their custom website utilizes complex search & filter functionality to make browsing their properties fast and easy, and a custom CMS designed to make adding new properties and website content as easy as possible for Centurion\'s marketing team. Their website was designed by Sidekick Creative Agency and developed by Aron Hawkins.</p>',
		projectType: "site",
		projectTypeDisplay: "Website",
		deliverables: ["Website", "Custom CMS", "Complex Form Routing"],
		problem: '<p>Centurion American is an industry leader in the world of real estate development, but their previous website was outdated and cookie-cutter. It was also complicated and difficult to add new content. They needed a site that was modern, reflecting their brand and position in the industry, allowed for complex form routing and lead funnels, and easy to maintain and update</p>',
		solution: '<p>Aron Hawkins developed a custom webiste on Wordpress, extending the default CMS to allow for complex search & filter functionality, while also being simple to create, edit, and delete content.</p>',
		featuredImage: '/images/centurion_screenshot.webp',
		tags: ['Corporate Portfolio'],
		imageGallery: [
			{ path: '/images/projects/centurion-american/centurion-screenshot_1.webp' },
			{ path: '/images/projects/centurion-american/centurion-screenshot_2.webp' },
			{ path: '/images/projects/centurion-american/centurion-screenshot_3.webp' },
			{ path: '/images/projects/centurion-american/centurion-screenshot_4.webp' },
			{ path: '/images/projects/centurion-american/centurion-screenshot_5.webp' },
			{ path: '/images/projects/centurion-american/centurion-screenshot_6.webp' },
		]
	},
	{
		name: 'Higgins.AI',
		projectType: "app",
		featuredImage: '/images/higgins_screenshot.avif',
		tags: ['AI', 'IOS & Android']
	},
	{
		name: 'Onward Real Estate',
		projectType: "site",
		featuredImage: '/images/onward_screenshot.avif',
		tags: ['Listings Map', 'Next.js']
	},
	{
		name: 'Cromwell Commercial Group',
		projectType: "site",
		featuredImage: '/images/cromwell_screenshot.webp',
		tags: ['Commercial Real Estate', 'Webflow']
	},
	{
		name: 'Bellfit',
		projectType: "app",
		featuredImage: '/images/bellfit_screenshot.avif',
		tags: ['Web App', 'Fitness Classes']
	},
	{
		name: 'Custom Automations',
		projectType: "automation",
		featuredImage: '/images/automations_screenshot.avif',
		tags: ['Bespoke Workflows', 'n8n', 'node.js']
	}
];
