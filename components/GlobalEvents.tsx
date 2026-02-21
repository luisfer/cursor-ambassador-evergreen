'use client';

import React from 'react';
import { motion } from 'framer-motion';
import WorldEventsCarousel from '@/components/WorldEventsCarousel';
import { useI18n } from '@/lib/i18n';

const GlobalEvents: React.FC = () => {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16"
		>
			<div className="bg-[#1B1913] border border-cursor-border rounded-lg p-6">
				<h2 className="text-xl md:text-2xl font-semibold text-cursor-text mb-2">{t('worldEvents.title')}</h2>
				<p className="text-cursor-text-muted text-sm md:text-base mb-6">{t('worldEvents.description')}</p>
				<WorldEventsCarousel />
			</div>
		</motion.section>
	);
};

export default GlobalEvents;
