'use client';

import React from 'react';
import { featuredResource } from '@/content/featured';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui';

const FeaturedSection: React.FC = () => {
	const { t } = useI18n();

	return (
		<section className="mb-20 border-t border-cursor-border pt-10">
			<p className="cursor-eyebrow mb-2">{t('home.featured')}</p>
			<h2 className="cursor-section-title mb-3 text-cursor-text">{featuredResource.title}</h2>
			<p className="mb-6 max-w-2xl text-base leading-relaxed text-cursor-text-secondary md:text-lg">
				{featuredResource.description || t('featured.defaultDescription')}
			</p>
			<Button href={featuredResource.href} variant="primary" size="md">
				{featuredResource.ctaLabel || t('home.viewSlides')}
				<span aria-hidden="true">→</span>
			</Button>
		</section>
	);
};

export default FeaturedSection;
