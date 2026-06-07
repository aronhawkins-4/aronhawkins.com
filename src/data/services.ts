export interface Service {
	name: string;
	description: string;
	tech: string;
}

export const services: Service[] = [
	{
		name: 'Custom web & mobile apps',
		description: "Web and mobile apps built from scratch to fit how your business works, whether that's a customer-facing product, an internal tool, or both.",
		tech: 'Web · Desktop · iOS · Android',
	},
	{
		name: 'Automation & integrations',
		description: 'Connecting the tools you already use and automating the repetitive tasks your team does by hand every week.',
		tech: 'Emails · Data sync · Scheduled tasks · Notifications',
	},
	{
		name: 'Modernizing older software',
		description: 'Bringing aging systems up to date: turning spreadsheets into secure applications, fixing security vulnerabilities, and migrating data without losing any of it.',
		tech: 'Modern rebuilds · Security fixes · Data migration',
	},
	{
		name: 'Ongoing maintenance & support',
		description: 'After launch, I stick around to fix bugs, ship updates, keep an eye on uptime, and add features as you need them.',
		tech: 'Bug fixes · Updates · Monitoring · New features',
	},
	{
		name: 'Project consulting',
		description: 'A second opinion on the technical decisions that are expensive to undo: what to build with, how to host it, and which tools are worth paying for.',
		tech: 'Architecture · Hosting & infrastructure · Integrations',
	},
];
