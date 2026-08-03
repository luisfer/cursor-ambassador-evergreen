'use client';

import React from 'react';
import { useI18n } from '@/lib/i18n';
import { communityQuotes } from '@/content/community-quotes';

const CommunityQuotes: React.FC = () => {
	const { t } = useI18n();

	if (communityQuotes.length === 0) {
		return null;
	}

	return (
		<section className="mb-16 md:mb-20">
			<p className="cursor-eyebrow mb-2">{t('home.quotesEyebrow')}</p>
			<h2 className="cursor-section-title mb-10 text-cursor-text md:mb-12">{t('home.quotesHeading')}</h2>

			<div className="grid gap-10 border-t border-cursor-border pt-10 md:grid-cols-3 md:gap-8">
				{communityQuotes.map((item) => (
					<blockquote key={`${item.name}-${item.quote.slice(0, 24)}`} className="min-w-0">
						<p className="text-xl font-normal leading-snug tracking-[-0.02em] text-cursor-text md:text-[1.35rem]">
							“{item.quote}”
						</p>
						<footer className="mt-5">
							<cite className="not-italic text-sm font-medium text-cursor-text">{item.name}</cite>
							<p className="mt-0.5 text-sm text-cursor-text-muted">{item.role}</p>
						</footer>
					</blockquote>
				))}
			</div>
		</section>
	);
};

export default CommunityQuotes;
