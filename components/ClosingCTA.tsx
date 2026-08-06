'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import { Button } from '@/components/ui';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

const CURSOR_DOWNLOAD_URL = 'https://cursor.com/download';
const WALLPAPER_SRC = '/images/cursor-wallpaper-norham-sunrise.jpg';

const ClosingCTA: React.FC = () => {
	const { t } = useI18n();
	const nextEvent = upcomingEvents[0];
	const joinUrl = nextEvent?.lumaUrl ?? siteConfig.lumaUrl;

	return (
		<section className="bg-cursor-bg py-10 md:py-14 lg:py-16">
			<MarketingGrid>
				<MarketingColumn width="full">
					<div className="cursor-on-image overflow-hidden rounded-sm border border-cursor-border bg-[rgb(20_18_11)] text-[rgb(237_236_236)]">
						<div className="grid md:grid-cols-2 md:items-stretch">
							<div className="flex flex-col justify-center px-6 py-12 sm:px-8 md:px-10 md:py-20 lg:px-14 lg:py-24">
								<h2 className="cursor-display max-w-[14ch]">{t('home.closingHeading')}</h2>
								<p className="mt-5 max-w-md text-base text-cursor-text-secondary md:text-lg">
									{t('home.closingDescription', {
										communityName: siteConfig.communityName,
										city: siteConfig.city,
									})}
								</p>
								<div className="mt-10 flex flex-wrap items-center gap-3">
									<Button href={joinUrl} external variant="accent" size="lg">
										{t('home.closingJoin')}
										<span aria-hidden="true">↗</span>
									</Button>
									<Button href={CURSOR_DOWNLOAD_URL} external variant="secondary" size="lg">
										{t('home.closingDownload')}
										<span aria-hidden="true">↗</span>
									</Button>
								</div>
							</div>

							<div className="relative min-h-[220px] overflow-hidden border-t border-cursor-border md:min-h-[420px] md:border-t-0 md:border-l md:border-cursor-border">
								<Image
									src={WALLPAPER_SRC}
									alt="J. M. W. Turner, Norham Castle, Sunrise, c. 1845"
									fill
									sizes="(max-width: 768px) 100vw, 50vw"
									className="object-cover object-[60%_center]"
								/>
							</div>
						</div>
					</div>
				</MarketingColumn>
			</MarketingGrid>
		</section>
	);
};

export default ClosingCTA;
