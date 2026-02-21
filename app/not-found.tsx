import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/content/site.config';

const NotFound: React.FC = () => {
	return (
		<main className="min-h-screen bg-cursor-bg text-cursor-text flex flex-col items-center justify-center px-6">
			<Image src="/cursor-logo.svg" alt="Cursor" width={120} height={32} className="h-8 w-auto mb-12 opacity-40" />
			<h1 className="text-6xl md:text-8xl font-bold tracking-tight text-cursor-text-faint mb-4">404</h1>
			<p className="text-cursor-text-muted text-lg mb-8">This page doesn&apos;t exist.</p>
			<Link
				href="/"
				className="inline-flex items-center gap-2 px-5 py-2.5 bg-cursor-text text-cursor-bg rounded-md hover:bg-cursor-text-muted transition-colors text-sm font-medium"
			>
				Back to {siteConfig.communityName}
			</Link>
		</main>
	);
};

export default NotFound;
