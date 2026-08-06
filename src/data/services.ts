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
		description: 'Connecting the tools you already use and automating the repetitive tasks your team does by hand every week.',
		slug: 'sites',
	},
	{
		name: 'Automation',
		description: 'Bringing aging systems up to date: turning spreadsheets into secure applications, fixing security vulnerabilities, and migrating data without losing any of it.',
		slug: 'automation',
	}
];
