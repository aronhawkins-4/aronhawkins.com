export interface Faq {
	question: string;
	answer: string;
}

export const faqs: Faq[] = [
	{
		question: 'What services do you offer?',
		answer: `
		<ul>
			<li><p><strong>Apps:</strong> web and mobile apps built from scratch to fit how your business works, whether that's a customer-facing product, an internal tool, or both.</p></li>
			<li><p><strong>Sites:</strong> websites that are fast, mobile-responsive, optimized for SEO, and designed to convert, getting you found by users and gaining valuable leads.</p></li>
			<li><p><strong>Automation:</strong> automation workflows that handle the busywork and let you focus on what you're best at, giving you time back to solve the problems that matter.</p></li>
		</ul>`
	},
	{
		question: 'What is your pricing?',
		answer: `
		<ul>
			<li><p>App projects start at $10,000 and can range to over $100,000.</p></li>
			<li><p>Website projects start at $5,000. Sites needing a larger number of pages or more complex functionality such as ecommerce, custom integrations, or dynamic data can range up to $50,000+.</p></li>
			<li><p>Automation projects start at $750. Automations needing to connect multiple platforms, include complex branching, or needing AI can range up to $10,000+.</p></li>
		</ul>
		<p>Every project is unique and will be transparently priced according to the scope and scale of its unique requirements.</p>`
	},
	{
		question: 'How long does a project take?',
		answer: `
		<ul>
			<li><p>App projects take between 3-12 months.</p></li>
			<li><p>Website projects take between 1-4 months.</p></li>
			<li><p>Automation projects take between 1-4 weeks.</p></li>
		</ul>`
	},
	{
		question: 'Do you work with existing codebases?',
		answer: `
		<p>Yes. I convert AI-generated or "vibe-coded" apps and websites into production-level codebases. I also perform contract work to add new features to existing apps and websites.</p>`
	},
	{
		question: 'How do payments work?',
		answer: `
		<p>For projects under $10,000, I collect 50% at the start of the project and 50% at the end of the project.</p>
		<p>For projects over $10,000, I implement milestone-based payments.</p>
		<p>I am willing to work with clients who require more flexible payment options.</p>`
	},
];
