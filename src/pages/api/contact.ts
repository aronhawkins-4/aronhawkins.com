export const prerender = false;

import type { APIRoute } from 'astro';
// @ts-expect-error - virtual module provided by the Cloudflare adapter
import { env } from 'cloudflare:workers';
import { Resend } from 'resend';
import { ContactFormEmail } from '../../emails/contact-form-email';

const TO = 'howdy@aronhawkins.com';
const FROM = 'Contact Form <howdy@aronhawkins.com>';

export const POST: APIRoute = async ({ request }) => {
	const apiKey = env.RESEND_API_KEY ?? import.meta.env.RESEND_API_KEY;
	if (!apiKey) {
		return Response.json({ error: 'Email service is not configured.' }, { status: 500 });
	}

	let name: string, email: string, message: string;
	try {
		({ name, email, message } = await request.json());
	} catch {
		return Response.json({ error: 'Invalid request body.' }, { status: 400 });
	}
	if (typeof name !== 'string' || !name.trim() || typeof email !== 'string' || !email.includes('@') || typeof message !== 'string' || !message.trim()) {
		return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 });
	}

	const resend = new Resend(apiKey);
	const { error } = await resend.emails.send({
		from: FROM,
		to: [TO],
		replyTo: email,
		subject: `New contact form submission from ${name}`,
		react: ContactFormEmail({ name, email, message }),
	});

	if (error) {
		console.error('Resend error:', error);
		return Response.json({ error: 'Failed to send message.' }, { status: 502 });
	}

	return Response.json({ ok: true });
};
