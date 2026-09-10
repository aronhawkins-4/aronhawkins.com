export interface Faq {
	question: string;
	answer: string;
}

export const faqs: Faq[] = [
	{
		question: 'What services do you offer?',
		answer: `
		<ul>
			<li><p><strong>Apps:</strong> web and mobile applications built for your business's exact needs.</p></li>
			<li><p><strong>Sites:</strong> e-commerce and company websites built for SEO and user experience, ensuring your site gets found and converts visitors into customers.</p></li>
			<li><p><strong>Automation:</strong> make your mundane, recurring tasks automatic, allowing you to spend your time on the things that deserve your attention.</p></li>
		</ul>`
	},
	{
		question: 'What is your pricing?',
		answer: `
		<ul>
			<li><p>App projects are the most complex and largest in scope. Pricing for app projects varies based on a number of factors and can range anywhere from $20,000 to over $100,000.</p></li>
			<li><p>Website projects start at $5,000 for basic websites up to 5 pages. Sites needing a larger number of pages, or more complex functionality such as ecommerce or real estate sites can range up to $50,000+.</p></li>
			<li><p>Automation projects start at $750 for basic automations that include connections for up to 2 platforms or tools. Automations needing to connect more than 2 platforms or needing decision and analysis flows using AI can range up to $10,000+.</p></li>
		</ul>
		<p>Every project is unique and will be transparently priced according to the scope and scale of its unique requirements.</p>`
	},
	{
		question: 'How long does a project take?',
		answer: 'A marketing site is typically two to four weeks. A custom app or an automation build depends entirely on scope, but most land between one and three months. I ship in stages so you see working software early instead of waiting until the end.'
	},
	{
		question: 'What does it cost?',
		answer: "Projects are quoted at a fixed price rather than billed hourly, so the number we agree on is the number you pay. Sites generally start in the low five figures; apps and automation work scale with complexity. You'll get a real quote after our first call."
	},
	{
		question: 'Do you work with existing codebases?',
		answer: "Yes. A good share of my work is picking up something already in flight — adding features, untangling a build someone else left behind, or getting a stalled project over the finish line."
	},
	{
		question: 'What happens after launch?',
		answer: "You own everything: the code, the accounts, the infrastructure. I hand off documentation your team can actually follow, and I'm available on an ongoing basis for support, changes, and new work when you need it."
	}
];
