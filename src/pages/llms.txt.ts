import type { APIRoute } from 'astro';
import { faqs } from '../data/faqs';
import { projects } from '../data/projects';
import { services } from '../data/services';
import { abs } from '../data/schema';

/**
 * `/llms.txt` — a plain-text site summary for LLM crawlers, following the
 * llmstxt.org convention.
 *
 * Generated from the same data the pages render, rather than hand-maintained,
 * so it can't drift out of sync with the site. Prerendered at build time.
 */

/** Strip authored HTML down to plain prose. */
const text = (html: string) =>
	html
		.replace(/<\/(p|li|ul)>/g, ' ')
		.replace(/<[^>]+>/g, '')
		.replace(/\s+/g, ' ')
		.trim();

export const GET: APIRoute = () => {
	const body = `# Aron Hawkins

> Full-stack software developer based in Waco, Texas, working remotely with clients across the United States. Builds custom web and mobile applications, marketing and e-commerce websites, and business automation workflows. Operates as an independent practice: fixed-price projects, direct communication, no agency layer.

## Services

${services
			.map(
				(service) =>
					`- [${service.name}](${abs(`/${service.slug}`)}): ${service.description}`,
			)
			.join('\n')}

## Selected work

${projects
			.filter((project) => project.slug)
			.map(
				(project) =>
					`- [${project.name}](${abs(`/projects/${project.slug}`)}): ${project.metaDescription ?? text(project.description ?? '')
					}`,
			)
			.join('\n')}

## Key pages

- [Home](${abs('/')}): Overview of services, work, and frequently asked questions.
- [About](${abs('/about')}): Background, working style, and clients.
- [Work](${abs('/work')}): Full portfolio of recent projects.
- [Contact](${abs('/contact')}): Project enquiry form.

`;

	// ## Frequently asked questions

	// ${ faqs.map((faq) => `### ${faq.question}\n\n${text(faq.answer)}`).join('\n\n') }
	return new Response(body, {
		headers: {
			'Content-Type': 'text/plain; charset=utf-8',
			'Cache-Control': 'public, max-age=3600',
		},
	});
};
