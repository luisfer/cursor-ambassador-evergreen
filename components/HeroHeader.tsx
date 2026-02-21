'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import BentoGrid from '@/components/BentoGrid';
import LanguageToggle from '@/components/LanguageToggle';
import { headerPhotos } from '@/content/header-photos';
import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';

const HeroHeader: React.FC = () => {
	const { t } = useI18n();

	return (
		<motion.div
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="h-svh flex flex-col pt-6 md:pt-8"
		>
			<div className="flex justify-between items-center px-6 md:px-12 lg:px-16">
				<div className="flex items-center gap-3">
					<Image src="/cursor-logo.svg" alt="Cursor" width={120} height={32} priority className="h-6 md:h-8 w-auto" />
					<span className="font-cursor text-lg md:text-xl font-semibold tracking-tight text-cursor-text">
						{siteConfig.communityName}
						{siteConfig.communityNameLocal ? (
							<span className="font-thai font-bold tracking-wide text-xl md:text-2xl text-cursor-text-secondary ml-2">
								{siteConfig.communityNameLocal}
							</span>
						) : null}
					</span>
				</div>
				<div className="flex items-center gap-4 md:gap-6">
					<a
						href="#upcoming"
						className="hidden sm:block text-sm text-cursor-text-muted hover:text-cursor-text transition-colors"
					>
						{t('home.upcomingEvents')}
					</a>
					<a
						href="#recaps"
						className="hidden sm:block text-sm text-cursor-text-muted hover:text-cursor-text transition-colors"
					>
						{t('home.pastEvents')}
					</a>
					<LanguageToggle />
				</div>
			</div>

			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.2 }}
				className="mt-8 flex-1 min-h-0 border-t border-cursor-border overflow-hidden"
				style={{
					maskImage: 'linear-gradient(to bottom, black 85%, transparent)',
					WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent)',
				}}
			>
				<BentoGrid photos={headerPhotos} cols={4} rows={4} mobileCols={2} mobileRows={4} />
			</motion.div>
		</motion.div>
	);
};

export default HeroHeader;
