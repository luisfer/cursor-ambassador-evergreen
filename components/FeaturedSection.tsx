'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { featuredResource } from '@/content/featured';
import { useI18n } from '@/lib/i18n';

const FeaturedSection: React.FC = () => {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5, delay: 0.2 }}
			className="mb-16"
		>
			<div className="bg-[#1B1913] border border-cursor-border rounded-md p-6">
				<p className="text-xs uppercase tracking-wider text-cursor-text-muted mb-4">{t('home.featured')}</p>

				<h2 className="text-3xl md:text-4xl font-bold tracking-tight text-cursor-text mb-1">
					{featuredResource.title}
				</h2>
				<p className="text-cursor-text-muted leading-relaxed mb-6">
					{featuredResource.description || t('featured.defaultDescription')}
				</p>

				<Link
					href={featuredResource.href}
					className="inline-flex items-center gap-2 px-4 py-2 bg-cursor-text text-cursor-bg rounded-md hover:bg-cursor-text-muted transition-colors text-sm font-medium"
				>
					{featuredResource.ctaLabel || t('home.viewSlides')}
					<ArrowRight className="w-4 h-4" />
				</Link>
			</div>
		</motion.section>
	);
};

export default FeaturedSection;
