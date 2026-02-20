'use client';

import React from 'react';
import { motion } from 'framer-motion';
import HeroHeader from '@/components/HeroHeader';
import AmbassadorSection from '@/components/AmbassadorSection';
import FeaturedSection from '@/components/FeaturedSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import Partners from '@/components/Partners';
import JsonLd from '@/components/JsonLd';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';

function buildHomeJsonLd() {
	const org = {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.cursorCommunityUrl,
	};

	const eventItems = upcomingEvents.map((event) => ({
		'@type': 'Event',
		name: event.title,
		startDate: event.date,
		location: {
			'@type': 'Place',
			name: event.location,
		},
		organizer: org,
		...(event.lumaUrl ? { url: event.lumaUrl } : {}),
		eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
		eventStatus: 'https://schema.org/EventScheduled',
	}));

	return {
		'@context': 'https://schema.org',
		'@graph': [org, ...eventItems],
	};
}

const Home: React.FC = () => {
	const { t } = useI18n();

	return (
		<main className="min-h-screen bg-cursor-bg text-cursor-text scroll-smooth">
			<JsonLd data={buildHomeJsonLd()} />
			<HeroHeader />

			<div className="max-w-3xl mx-auto px-6 py-16 md:py-24">
				<AmbassadorSection />
				<FeaturedSection />
				<UpcomingEvents />
				<PastEvents />
				<GlobalEvents />

				<motion.footer
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					viewport={{ once: true, margin: '-50px' }}
					transition={{ duration: 0.5 }}
					className="mt-24 pt-8 border-t border-cursor-border text-center"
				>
					<Partners />
					<p className="text-cursor-text-muted text-sm mb-3">{siteConfig.footerTagline || t('footer.madeWith')}</p>
					<div className="flex items-center justify-center gap-4">
						<a
							href={siteConfig.lumaUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-cursor-text hover:text-cursor-text-muted transition-colors text-sm"
						>
							{t('footer.allEvents')}
						</a>
						<span className="text-cursor-text-faint">·</span>
						<a
							href={siteConfig.cursorCommunityUrl}
							target="_blank"
							rel="noopener noreferrer"
							className="text-cursor-text hover:text-cursor-text-muted transition-colors text-sm"
						>
							{t('footer.community')}
						</a>
					</div>
				</motion.footer>
			</div>
		</main>
	);
};

export default Home;
