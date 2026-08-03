import type { Metadata } from 'next';
import { headers } from 'next/headers';
import { Analytics } from '@vercel/analytics/react';
import Providers from '@/components/Providers';
import { siteConfig } from '@/content/site.config';
import './globals.css';

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000').replace(/\/$/, '');
const title = siteConfig.communityName;
const description =
	siteConfig.description || `Cursor meetups and workshops in ${siteConfig.city}, ${siteConfig.country}.`;
const ogImage = siteConfig.ogImage || '/og.jpg';

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: {
		default: title,
		template: `%s | ${siteConfig.communityName}`,
	},
	description,
	alternates: {
		canonical: siteUrl,
	},
	openGraph: {
		title,
		description,
		type: 'website',
		url: siteUrl,
		siteName: siteConfig.communityName,
		locale: siteConfig.defaultLocale === 'en' ? 'en_US' : siteConfig.defaultLocale,
		images: [
			{
				url: ogImage,
				width: 1200,
				height: 630,
				alt: `${siteConfig.communityName} in ${siteConfig.city}`,
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title,
		description,
		images: [ogImage],
	},
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const headersList = await headers();
	const nonce = headersList.get('x-nonce') ?? '';

	return (
		<html lang={siteConfig.defaultLocale}>
			<body className="antialiased">
				<Providers>{children}</Providers>
				<Analytics {...({ nonce } as React.ComponentProps<typeof Analytics>)} />
			</body>
		</html>
	);
}
