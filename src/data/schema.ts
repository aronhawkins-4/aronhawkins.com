import type { Faq } from './faqs';
import type { Project } from './projects';
import type { Service } from './services';

/**
 * Structured data (JSON-LD) for the site.
 *
 * Everything is emitted as a single `@graph` per page whose nodes are joined by
 * stable `@id` URIs, rather than as isolated snippets. That linkage is the point:
 * it lets Google reconcile "Aron Hawkins" the Person, the practice, and every
 * page into one entity, and it gives LLM crawlers a single resolvable subject
 * instead of a handful of disconnected facts.
 *
 * `coreGraph()` is emitted on every route by `Layout.astro`; routes layer
 * page-specific nodes on top via the `schema` prop.
 */

export const SITE = 'https://aronhawkins.com';

/** Stable node identifiers. Referenced across pages — do not change casually. */
export const ID = {
	person: `${SITE}/#person`,
	business: `${SITE}/#business`,
	website: `${SITE}/#website`,
} as const;

/** Profiles that link back here. `sameAs` only works when the link is mutual. */
const SAME_AS = [
	'https://instagram.com/aronhawkins',
	'https://linkedin.com/in/aronhawkins',
	'https://substack.com/@aronhawkins',
];

/** A bare `@id` reference to another node in the graph. */
const ref = (id: string) => ({ '@id': id });

/**
 * Absolute URL for a root-relative path, with a trailing slash.
 *
 * The slash is not cosmetic: the build emits directory-style routes, so
 * `Astro.url.pathname` is `/about/`, and `Layout.astro` derives the page `@id`
 * from it. Any `@id` built here has to match that exactly or the graph's
 * references dangle and the nodes never link up.
 */
export const abs = (path: string) =>
	new URL(path.endsWith('/') ? path : `${path}/`, SITE).href;

/**
 * Price ranges mirror the figures published in the visible pricing FAQ
 * (`faqs.ts`). Structured data must not claim anything the page doesn't show —
 * if the FAQ copy changes, change these too.
 */
const SERVICE_OFFERS: Record<
	Service['slug'],
	{ serviceType: string; low: number; high: number }
> = {
	apps: { serviceType: 'Custom Software Development', low: 20000, high: 100000 },
	sites: { serviceType: 'Web Design and Development', low: 5000, high: 50000 },
	automation: { serviceType: 'Business Process Automation', low: 750, high: 10000 },
};

/** Served remotely nationwide, operated from Texas. */
const AREA_SERVED = [
	{ '@type': 'Country', name: 'United States' },
	{ '@type': 'State', name: 'Texas' },
];

/**
 * The three global nodes present on every page: who Aron is, what the practice
 * is, and what the site is.
 */
export function coreGraph() {
	return [
		{
			'@type': 'Person',
			'@id': ID.person,
			name: 'Aron Hawkins',
			givenName: 'Aron',
			familyName: 'Hawkins',
			url: SITE,
			jobTitle: 'Full-Stack Software Developer',
			description:
				'Full-stack developer in Texas, building apps that make life easier, websites that convert, and automations that save time.',
			homeLocation: {
				'@type': 'Place',
				address: {
					'@type': 'PostalAddress',
					addressLocality: 'Waco',
					addressRegion: 'TX',
					addressCountry: 'US',
				},
			},
			knowsAbout: [
				'Web application development',
				'Mobile application development',
				'Website design and development',
				'Business process automation',
				'AI integration',
				'E-commerce development',
				'Search engine optimization',
			],
			sameAs: SAME_AS,
			worksFor: ref(ID.business),
		},
		{
			'@type': 'ProfessionalService',
			'@id': ID.business,
			name: 'Aron Hawkins Software Development',
			alternateName: 'Aron Hawkins',
			url: SITE,
			description:
				'Independent software practice building custom web and mobile apps, high-converting websites, and automation workflows for businesses.',
			founder: ref(ID.person),
			employee: ref(ID.person),
			areaServed: AREA_SERVED,
			availableLanguage: 'en',
			priceRange: '$$$',
			sameAs: SAME_AS,
			contactPoint: {
				'@type': 'ContactPoint',
				contactType: 'sales',
				url: abs('/contact'),
				areaServed: 'US',
				availableLanguage: 'en',
			},
		},
		{
			'@type': 'WebSite',
			'@id': ID.website,
			url: SITE,
			name: 'Aron Hawkins',
			description:
				'Apps, sites, and automation by Aron Hawkins, a full-stack developer in Texas.',
			inLanguage: 'en-US',
			publisher: ref(ID.business),
		},
	];
}

/**
 * The page-level node. `Layout.astro` builds this from the title/description it
 * already computes; `type` narrows it for routes with a more specific role
 * (AboutPage, ContactPage, CollectionPage).
 */
export function webPage(opts: {
	url: string;
	name: string;
	description: string;
	image?: string;
	type?: string;
	/** `@id` of the node this page is primarily *about*, if not the practice. */
	mainEntity?: string;
	/** Set when the route emits its own breadcrumb trail. */
	hasBreadcrumb?: boolean;
}) {
	return {
		'@type': opts.type ?? 'WebPage',
		'@id': `${opts.url}#webpage`,
		url: opts.url,
		name: opts.name,
		description: opts.description,
		inLanguage: 'en-US',
		isPartOf: ref(ID.website),
		about: ref(ID.business),
		...(opts.mainEntity ? { mainEntity: ref(opts.mainEntity) } : {}),
		...(opts.image ? { primaryImageOfPage: { '@type': 'ImageObject', url: opts.image } } : {}),
		...(opts.hasBreadcrumb ? { breadcrumb: ref(`${opts.url}#breadcrumb`) } : {}),
	};
}

/**
 * Breadcrumb trail. Pass the full path including Home; the current page should
 * be last. Emitted on every route except the homepage.
 */
export function breadcrumb(url: string, trail: { name: string; path: string }[]) {
	return {
		'@type': 'BreadcrumbList',
		'@id': `${url}#breadcrumb`,
		itemListElement: trail.map((item, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			name: item.name,
			item: abs(item.path),
		})),
	};
}

/**
 * FAQ markup. Only valid on a page that actually renders these questions —
 * duplicating `FAQPage` across routes is a policy violation, not just noise.
 */
export function faqPage(url: string, entries: Faq[]) {
	return {
		'@type': 'FAQPage',
		'@id': `${url}#faq`,
		mainEntity: entries.map((faq) => ({
			'@type': 'Question',
			name: faq.question,
			acceptedAnswer: {
				'@type': 'Answer',
				// Answers are authored as HTML fragments; schema.org allows
				// markup in `text` and Google renders it, so pass through as-is.
				text: faq.answer.trim(),
			},
		})),
	};
}

/** A single service offering, with the price range published in the FAQ. */
export function serviceNode(service: Service, url: string) {
	const offer = SERVICE_OFFERS[service.slug];
	return {
		'@type': 'Service',
		'@id': `${url}#service`,
		name: service.name,
		serviceType: offer.serviceType,
		description: service.description,
		url,
		provider: ref(ID.business),
		areaServed: AREA_SERVED,
		offers: {
			'@type': 'Offer',
			priceSpecification: {
				'@type': 'PriceSpecification',
				minPrice: offer.low,
				maxPrice: offer.high,
				priceCurrency: 'USD',
			},
			availability: 'https://schema.org/InStock',
			url: abs('/contact'),
		},
	};
}

/** The three services as a list — used on the homepage. */
export function serviceList(url: string, services: Service[]) {
	return {
		'@type': 'ItemList',
		'@id': `${url}#services`,
		name: 'Services',
		itemListElement: services.map((service, i) => ({
			'@type': 'ListItem',
			position: i + 1,
			item: {
				'@type': 'Service',
				'@id': `${abs(`/${service.slug}`)}#service`,
				name: service.name,
				description: service.description,
				url: abs(`/${service.slug}`),
				provider: ref(ID.business),
			},
		})),
	};
}

/** Project type determines the most specific CreativeWork subtype available. */
const PROJECT_TYPE: Record<Project['projectType'], string> = {
	app: 'WebApplication',
	site: 'WebSite',
	automation: 'SoftwareApplication',
};

/** Strip the HTML wrapper off a rich-text field for use in a plain-text slot. */
const text = (html?: string) =>
	html
		?.replace(/<[^>]+>/g, ' ')
		.replace(/\s+/g, ' ')
		.trim();

/** A single project case study. */
export function projectNode(project: Project, url: string) {
	const type = PROJECT_TYPE[project.projectType];
	return {
		'@type': type,
		'@id': `${url}#project`,
		name: project.name,
		url,
		description: project.metaDescription ?? text(project.description),
		abstract: text(project.problem),
		creator: ref(ID.person),
		provider: ref(ID.business),
		image: (project.imageGallery?.length
			? project.imageGallery.map((img) => img.src)
			: [project.featuredImage]
		).map((img) => abs(img.src)),
		...(project.tags?.length ? { keywords: project.tags.join(', ') } : {}),
		...(type === 'WebApplication' || type === 'SoftwareApplication'
			? { applicationCategory: 'BusinessApplication' }
			: {}),
		isPartOf: ref(`${abs('/work')}#portfolio`),
	};
}

/** The portfolio as an ordered list — used on /work. */
export function projectList(url: string, list: Project[]) {
	return {
		'@type': 'ItemList',
		'@id': `${url}#portfolio`,
		name: 'Selected Work',
		numberOfItems: list.length,
		itemListElement: list
			.filter((project) => project.slug)
			.map((project, i) => ({
				'@type': 'ListItem',
				position: i + 1,
				name: project.name,
				url: abs(`/projects/${project.slug}`),
			})),
	};
}
