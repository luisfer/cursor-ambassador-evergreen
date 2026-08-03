import React from 'react';
import Navbar from '@/components/Navbar';
import HeroHeaderServer from '@/components/HeroHeaderServer';
import AmbassadorSection from '@/components/AmbassadorSection';
import FeaturedSection from '@/components/FeaturedSection';
import UpcomingEvents from '@/components/UpcomingEvents';
import PastEvents from '@/components/PastEvents';
import GlobalEvents from '@/components/GlobalEvents';
import SectionDivider from '@/components/SectionDivider';
import CommunityQuotes from '@/components/CommunityQuotes';
import ClosingCTA from '@/components/ClosingCTA';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import MatchmakingSection from '@/components/MatchmakingSection';
import PhotoDisclaimer from '@/components/PhotoDisclaimer';
import LumaCalendarSection from '@/components/LumaCalendar';
import CommunityTweetsSection from '@/components/CommunityTweetsSection';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

function buildHomeJsonLd() {
	const org = {
		'@type': 'Organization',
		name: siteConfig.communityName,
		url: siteConfig.cursorCommunityUrl,
	};

	const eventItems = upcomingEvents
		.filter((event) => event.date)
		.map((event) => ({
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

type GridSectionProps = {
	children: React.ReactNode;
	width?: 'full' | 'wide' | 'reading' | 'prose';
};

function GridSection({ children, width = 'wide' }: GridSectionProps) {
	return (
		<MarketingGrid>
			<MarketingColumn width={width}>{children}</MarketingColumn>
		</MarketingGrid>
	);
}

const Home: React.FC = () => (
	<main className="min-h-screen scroll-smooth bg-cursor-bg text-cursor-text">
		<JsonLd data={buildHomeJsonLd()} />
		<Navbar />
		<HeroHeaderServer />

		<div className="py-20 md:py-28">
			<GridSection>
				<AmbassadorSection />
			</GridSection>
			<GridSection>
				<SectionDivider />
			</GridSection>
			<GridSection width="reading">
				<FeaturedSection />
			</GridSection>
			<GridSection>
				<SectionDivider />
			</GridSection>
			<GridSection>
				<UpcomingEvents />
			</GridSection>
			{siteConfig.sections.matchmaking ? (
				<>
					<GridSection width="reading">
						<MatchmakingSection />
					</GridSection>
					<GridSection>
						<SectionDivider />
					</GridSection>
				</>
			) : null}
			{siteConfig.sections.photoDisclaimer ? (
				<>
					<GridSection width="reading">
						<PhotoDisclaimer />
					</GridSection>
					<GridSection>
						<SectionDivider />
					</GridSection>
				</>
			) : null}
			<GridSection>
				<LumaCalendarSection />
			</GridSection>
			<GridSection>
				<SectionDivider />
			</GridSection>
			<GridSection>
				<PastEvents />
			</GridSection>
			{siteConfig.sections.communityTweets ? (
				<>
					<GridSection>
						<SectionDivider />
					</GridSection>
					<GridSection>
						<CommunityTweetsSection />
					</GridSection>
				</>
			) : null}
			{siteConfig.sections.communityQuotes ? (
				<>
					<GridSection>
						<SectionDivider />
					</GridSection>
					<GridSection>
						<CommunityQuotes />
					</GridSection>
				</>
			) : null}
			<GridSection>
				<SectionDivider />
			</GridSection>
			<GridSection>
				<GlobalEvents />
			</GridSection>
		</div>
		<ClosingCTA />
		<Footer />
	</main>
);

export default Home;
