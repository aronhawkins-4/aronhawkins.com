import imageOptimize1 from '@/assets/images/projects/image-optimize/image-optimize-screenshot_1.webp';
import imageOptimize2 from '@/assets/images/projects/image-optimize/image-optimize-screenshot_2.webp';
import imageOptimize3 from '@/assets/images/projects/image-optimize/image-optimize-screenshot_3.webp';
import imageOptimize4 from '@/assets/images/projects/image-optimize/image-optimize-screenshot_4.webp';
import imageOptimize5 from '@/assets/images/projects/image-optimize/image-optimize-screenshot_5.webp';
import imageOptimize6 from '@/assets/images/projects/image-optimize/image-optimize-screenshot_6.webp';

import knifeItalian1 from '@/assets/images/projects/ritz-carlton/knife-italian-screenshot_1.webp';
import knifeItalian2 from '@/assets/images/projects/ritz-carlton/knife-italian-screenshot_2.webp';
import knifeItalian3 from '@/assets/images/projects/ritz-carlton/knife-italian-screenshot_3.webp';
import knifeItalian4 from '@/assets/images/projects/ritz-carlton/knife-italian-screenshot_4.webp';
import knifeItalian5 from '@/assets/images/projects/ritz-carlton/knife-italian-screenshot_5.webp';

import sendero1 from '@/assets/images/projects/sendero/sendero-screenshot_1.webp';
import sendero2 from '@/assets/images/projects/sendero/sendero-screenshot_2.webp';
import sendero3 from '@/assets/images/projects/sendero/sendero-screenshot_3.webp';
import sendero4 from '@/assets/images/projects/sendero/sendero-screenshot_4.webp';
import sendero5 from '@/assets/images/projects/sendero/sendero-screenshot_5.webp';
import sendero6 from '@/assets/images/projects/sendero/sendero-screenshot_6.webp';
import sendero7 from '@/assets/images/projects/sendero/sendero-screenshot_7.webp';

import higgins1 from '@/assets/images/higgins_screenshot.webp';

import onward1 from '@/assets/images/projects/onward/onward-screenshot_1.webp';
import onward2 from '@/assets/images/projects/onward/onward-screenshot_2.webp';
import onward3 from '@/assets/images/projects/onward/onward-screenshot_3.webp';
import onward4 from '@/assets/images/projects/onward/onward-screenshot_4.webp';
import onward5 from '@/assets/images/projects/onward/onward-screenshot_5.webp';
import onward6 from '@/assets/images/projects/onward/onward-screenshot_6.webp';
import onward7 from '@/assets/images/projects/onward/onward-screenshot_7.webp';

import centurion1 from '@/assets/images/projects/centurion-american/centurion-screenshot_1.webp';
import centurion2 from '@/assets/images/projects/centurion-american/centurion-screenshot_2.webp';
import centurion3 from '@/assets/images/projects/centurion-american/centurion-screenshot_3.webp';
import centurion4 from '@/assets/images/projects/centurion-american/centurion-screenshot_4.webp';
import centurion5 from '@/assets/images/projects/centurion-american/centurion-screenshot_5.webp';
import centurion6 from '@/assets/images/projects/centurion-american/centurion-screenshot_6.webp';

import cromwell1 from '@/assets/images/projects/cromwell/cromwell-screenshot_1.webp';
import cromwell2 from '@/assets/images/projects/cromwell/cromwell-screenshot_2.webp';
import cromwell3 from '@/assets/images/projects/cromwell/cromwell-screenshot_3.webp';
import cromwell4 from '@/assets/images/projects/cromwell/cromwell-screenshot_4.webp';
import cromwell5 from '@/assets/images/projects/cromwell/cromwell-screenshot_5.webp';
import cromwell6 from '@/assets/images/projects/cromwell/cromwell-screenshot_6.webp';

import bellfit1 from '@/assets/images/projects/bellfit/bellfit-screenshot_1.webp';
import bellfit2 from '@/assets/images/projects/bellfit/bellfit-screenshot_2.webp';
import bellfit3 from '@/assets/images/projects/bellfit/bellfit-screenshot_3.webp';
import bellfit4 from '@/assets/images/projects/bellfit/bellfit-screenshot_4.webp';
import bellfit5 from '@/assets/images/projects/bellfit/bellfit-screenshot_5.webp';

export interface Project {
	name: string;
	description?: string;
	featuredImage: ImageMetadata;
	imageGallery?: {
		src: ImageMetadata,
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
		deliverables: ['Web App', 'User Accounts', 'Payment processing'],
		tags: ['Web App', 'Productivity'],
		problem: '<p>Image optimization is a critical aspect of web development, as it directly impacts website performance, user experience, and search engine rankings. However, many developers struggle to find an efficient and effective solution for optimizing images without sacrificing quality or speed.</p>',
		solution: '<p>Image Optimize is a web application that provides a simple and effective solution for optimizing images. It allows users to upload images, choose optimization settings, and download optimized images quickly and easily. The app also provides an API for developers to integrate image optimization into their own applications.</p>',
		featuredImage: imageOptimize1,
		imageGallery: [
			{ src: imageOptimize1 },
			{ src: imageOptimize2 },
			{ src: imageOptimize3 },
			{ src: imageOptimize4 },
			{ src: imageOptimize5 },
			{ src: imageOptimize6 }
		],
	},
	{
		name: 'Ritz-Carlton, Las Colinas',
		slug: 'ritz-carlton',
		projectType: "site",
		projectTypeDisplay: "Web App & Website",
		deliverables: ['Restaurant Website', 'Reservation Integration', 'Web App', 'CMS'],
		tags: ['Web App', 'Restaurant Website'],
		description: "<p>The Ritz-Carlton is a luxury hospitality brand that exemplifies excellence. Their location in Las Colinas, Texas partnered with Sidekick Creative Agency to build several web projects, all of which were developed and architected by Aron Hawkins. The first project was a website for their high-end steakhouse, Knife Italian. The second was an asset management platform to make finding and downloading marketing materials simple and fast. </p>",
		problem: '<p>The Ritz-Carlton, Las Colinas was opening a new luxury restaruant, Knife Italian. They needed a website that represented both the brand of Ritz-Carlton and the italian heritage of the restaurant.</p><p>The Ritz-Carlton, Las Colinas did not have an efficient way to search for and share marketing materials, such as photos, brochures, and videos across their marketing team. This inefficiency was costing time and manpower whenever new marketing effors, such as social media posts, website updates, and event brochures needed to be made.</p>',
		solution: "<p>Aron also developed the website for Knife Italian. The site allows users to easily browse restaurant menus, make dining and special event reservations, and view the dining areas and delicious dish offerings.</p><p>Aron Hawkins built a web application that allows digital assets, such as images, PDF documents, and videos to be easily organized, searched for, and downloaded. This app utilizes a Content Management System so the Ritz-Carlton marketing team can manage uploading, editing, and deleting assets without the need for outside help. The app saves their team time, allowing them to focus on creating the best campaigns possible. For privacy purposes, this project is not able to be shown to the public.</p>",
		featuredImage: knifeItalian1,
		imageGallery: [
			// rclc-screenshot_1..3 intentionally withheld (client privacy)
			{ src: knifeItalian1 },
			{ src: knifeItalian2 },
			{ src: knifeItalian3 },
			{ src: knifeItalian4 },
			{ src: knifeItalian5 },
		],
	},
	{
		name: 'Sendero Provisions Co.',
		slug: 'senderopc',
		projectType: "site",
		projectTypeDisplay: 'Website',
		deliverables: ['E-commerce Website', 'Retailer Map', 'YouTube Embed Integration'],
		tags: ['Website', 'E-commerce'],
		description: '<p>Sendero Provisions Company is a western lifestyle and apparel brand. Their ecommerce website handles millions of dollars in online sales per year. In 2023, Sidekick Creative Agency completely redesigned the Sendero website, and Aron Hawkins developed the site in Shopify using the Liquid programming language.</p>',
		problem: '<p>Sendero\'s previous site was outdated and didn\`t reflect the high-quality design and photography of the brand. They needed a site that reflected their brand while also being optimized to convert visitors into paying customers.</p>',
		solution: '<p>Aron Hawkins built an ecommerce site that uses dynamic layouts, mobile-responsiveness, and custom integrations to showcase Sendero\'s unique brand. The site highlights Sendero\'s professional photography and top-of-the-line apparel, guiding users to easy purchases.</p>',
		featuredImage: sendero1,
		imageGallery: [
			{ src: sendero1 },
			{ src: sendero2 },
			{ src: sendero3 },
			{ src: sendero4 },
			{ src: sendero5 },
			{ src: sendero6 },
			{ src: sendero7 }
		]
	},
	{
		name: 'Higgins.AI',
		slug: 'higgins-ai',
		projectType: "app",
		projectTypeDisplay: "Web & Mobile Apps",
		deliverables: ["Web App", "Mobile App", "AI Infrastructure", "Custom CMS"],
		tags: ['Mobile App', 'Web App', 'AI'],
		description: "<p>Higgins.AI is comprehensive AI platform for businesses. Aron worked as the Head of Technology at the start of the company and built a platform from scratch that now services over 40,000 clients across the US, Canada, and Australia.</p>",
		problem: "<p>Higgins.AI had a vision for an AI platform that could be a central hub for businesses, but not the technical knowledge to execute their vision. They wanted multiple products, including a mobile app, an embeddable chatbot customizable to each client, and a web-based dashboard and CMS to manage operations.</p>",
		solution: "<p>Higgins.AI hired Aron Hawkins as their Head of Technology. Aron architected their entire infrastructure and developed their initial product offerings. He developed a mobile app that was available on IOS and Android app stores, a customer service chatbot that could be trained on a company's internal data in order to provide accurate, up-to-date information to customers, as well as a custom admin dashboard content management system, allowing Higgins.AI team members to manage business operations.</p>",
		featuredImage: higgins1,
	},
	{
		name: 'Onward Real Estate Team',
		slug: 'onward-real-estate-team',
		projectType: "site",
		projectTypeDisplay: "Website",
		deliverables: ["Website", "Custom MLS Integration", "Custom CMS"],
		tags: ['Website', 'Real Estate'],
		description: "<p>Onward Real Estate Team is a commercial and residential brokerage in Waco, Texas. In 2025, Sidekick Creative Agency redesigned Onward's website and employed Aron Hawkins to develop it. Their new site includes a custom integration with their MLS, powerful search, filter, and mapping functionalities, as well as a custom CMS that enables the Onward team to easily update their properties and site content without outside support.</p>",
		problem: "<p>Onward Real Estate Team had an outdate website, using generic plugins to enable property search and mapping functionality, and was complicated and difficult to make edits on the backend.</p>",
		solution: "<p>Working off the site design done by Sidekick Creative Agency, Aron Hawkins built Onward a completely custom website using modern tools such as Next.js. He built them a custom content management system, making it simple and intuitive for the Onward team to manage and make updates to their site. Aron also built powerful property search, filter, and mapping functionality from scratch, enabling site users to quickly and easily find the exact properties they are looking for.</p>",
		featuredImage: onward1,
		imageGallery: [
			{ src: onward1 },
			{ src: onward2 },
			{ src: onward3 },
			{ src: onward4 },
			{ src: onward5 },
			{ src: onward6 },
			{ src: onward7 },
		]
	},
	{
		name: 'Centurion American',
		slug: 'centurion-american',
		projectType: "site",
		projectTypeDisplay: "Website",
		deliverables: ["Website", "Custom CMS", "Complex Form Routing"],
		tags: ['Website', 'Corporate Portfolio'],
		description: '<p>Centurion American is a leading real estate developer in Texas. They have a vast commercial and residential portfolio, and their custom website utilizes complex search & filter functionality to make browsing their properties fast and easy, and a custom CMS designed to make adding new properties and website content as easy as possible for Centurion\'s marketing team. Their website was designed by Sidekick Creative Agency and developed by Aron Hawkins.</p>',
		problem: '<p>Centurion American is an industry leader in the world of real estate development, but their previous website was outdated and cookie-cutter. It was also complicated and difficult to add new content. They needed a site that was modern, reflecting their brand and position in the industry, allowed for complex form routing and lead funnels, and easy to maintain and update</p>',
		solution: '<p>Aron Hawkins developed a custom webiste on Wordpress, extending the default CMS to allow for complex search & filter functionality, while also being simple to create, edit, and delete content.</p>',
		featuredImage: centurion1,
		imageGallery: [
			{ src: centurion1 },
			{ src: centurion2 },
			{ src: centurion3 },
			{ src: centurion4 },
			{ src: centurion5 },
			{ src: centurion6 },
		]
	},
	{
		name: 'Cromwell Commercial Group',
		slug: 'cromwell-commercial-group',
		projectType: "site",
		projectTypeDisplay: "Website",
		deliverables: ["Website", "Real Estate"],
		tags: ['Website', 'Property Sync Engine'],
		description: "<p>Cromwell Commercial Group is a commercial real estate brokerage in Central Texas. When launching their brokerage, they partnered with Sidekick Creative Agency to design and develop their website. Sidekick employoed Aron Hawkins to handle the site development. Features of Cromwell's site are a custom property sync engine with Cromwell's existing back-office platform, advanced search, filter, and mapping functionality, and high speed and SEO scores.</p>",
		problem: "<p>Cromwell Commercial Group wanted a modern and highly optimized website that would integrate with their existing back-office platform, which housed all of their commercial real estate listing data. There were no existing out-of-the-box solutions that would meet their needs.</p>",
		solution: "<p>Aron Hawkins built a custom website for Cromwell, including a boutique property sync engine that would connect their back-office platform with their website, allowing their properties to be displayed on the website while maintaining one source of truth for their data. The website went above and beyond what Cromwell hoped for, and includes features like complex search, filter, and mapping for their listings, incredibly fast page load times, and high on-page SEO scores.</p>",
		featuredImage: cromwell1,
		imageGallery: [
			{ src: cromwell1 },
			{ src: cromwell2 },
			{ src: cromwell3 },
			{ src: cromwell4 },
			{ src: cromwell5 },
			{ src: cromwell6 },
		]
	},
	{
		name: 'BellFit',
		slug: 'bellfit',
		projectType: "app",
		projectTypeDisplay: "Web App",
		deliverables: ["Web App", "User Accounts", "Payment Processing", "Vimeo Integration"],
		tags: ['Web App', 'Fitness Platform'],
		description: "<p>BellFit is an online fitness platform. The platform includes user accounts, workout tracking, payment processing, and a custom integration with Vimeo to manage and sync class video recordings. The Bellfit platform was designed by <a href='https://www.sidekick.agency' target='_blank' rel='noreferrer nofollow'>Sidekick Creative Agency</a> and developed by Aron Hawkins.</p>",
		problem: "<p>BellFit had the workouts recorded and a social media following ready to support their visions, but not the technical know-how to execute it. They needed a platform that would allow their users to create accounts, track their progress, and purchase subscriptions, as well as make it easy for the BellFit team to upload and manage their video content.</p>",
		solution: "<p>Aron Hawkins built a web app that allowed BellFit to turn their vision in to a reality. The BellFit platform includes a native integration with Stripe for payment processing, a custom configured CMS to allow the BellFit team to create and update content and classes, and a boutique Vimeo integration to sync video recordings and allow for both live and prerecorded classes.</p>",
		featuredImage: bellfit1,
		imageGallery: [
			{ src: bellfit1 },
			{ src: bellfit2 },
			{ src: bellfit3 },
			{ src: bellfit4 },
			{ src: bellfit5 },
		]
	},
	// {
	// 	name: 'Custom Automations',
	// 	projectType: "automation",
	// 	featuredImage: automationsScreenshot,
	// 	tags: ['Bespoke Workflows', 'n8n', 'node.js']
	// }
];
