import { MetadataRoute } from 'next';

const BASE_URL =
	process.env.NEXT_PUBLIC_SITE_URL ||
	(process.env.VERCEL_PROJECT_PRODUCTION_URL
		? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
		: 'https://example.com');

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${BASE_URL}/sitemap.xml`,
	};
}
