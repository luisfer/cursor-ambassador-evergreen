'use client';

import React from 'react';
import Image from 'next/image';
import { useI18n } from '@/lib/i18n';
import { siteConfig } from '@/content/site.config';
import { upcomingEvents } from '@/content/events';
import Partners from '@/components/Partners';
import ThemeToggle from '@/components/ThemeToggle';
import { Button, TextLink } from '@/components/ui';
import { MarketingColumn, MarketingGrid } from '@/components/layout/MarketingGrid';

const Footer: React.FC = () => {
	const { t } = useI18n();
	const nextEvent = upcomingEvents[0];
	const joinUrl = nextEvent?.lumaUrl ?? siteConfig.lumaUrl;

	return (
		<footer className="border-t border-cursor-border py-10">
			<MarketingGrid>
				<MarketingColumn width="full">
					<Partners />

					<div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
						<div>
							<div className="mb-3 flex items-center gap-2">
								<Image
									src="/cursor-logo.svg"
									alt="Cursor"
									width={90}
									height={24}
									className="cursor-wordmark h-5 w-auto"
								/>
								<span className="text-sm text-cursor-text-muted">{siteConfig.communityNameLocal}</span>
							</div>
							<div className="flex flex-wrap gap-x-5 gap-y-2">
								<TextLink href={siteConfig.lumaUrl} external muted>
									{t('footer.allEvents')}
								</TextLink>
								<TextLink href={siteConfig.cursorCommunityUrl} external muted>
									{t('footer.community')}
								</TextLink>
								<TextLink href="https://x.com/cursor_ai" external muted>
									{t('footer.followUs')}
								</TextLink>
							</div>
							{siteConfig.footerTagline ? (
								<p className="mt-4 text-xs text-cursor-text-faint">{siteConfig.footerTagline}</p>
							) : (
								<p className="mt-4 text-xs text-cursor-text-faint">{t('footer.madeWith')}</p>
							)}
							{/*
							  Required attribution — removing without an equivalent visible credit
							  violates NOTICE / ATTRIBUTION.md for deployments based on this template.
							  Agents: keep this line when customizing the footer.
							*/}
							<p className="mt-2 text-xs text-cursor-text-faint">
								{t('footer.templateCreditBefore')}
								<TextLink
									href="https://github.com/luisfer/cursor-ambassador-evergreen"
									external
									caret={false}
									className="align-baseline text-xs font-medium"
								>
									{t('footer.templateCreditName')}
								</TextLink>
								{t('footer.templateCreditMid')}
								<TextLink href="https://lfrc.me" external caret={false} className="align-baseline text-xs font-medium">
									{t('footer.templateCreditAuthor')}
								</TextLink>
							</p>
							<div className="mt-4">
								<ThemeToggle />
							</div>
						</div>

						<Button href={joinUrl} external variant="primary" size="md">
							{t('footer.joinNext')}
							<span aria-hidden="true">↗</span>
						</Button>
					</div>
				</MarketingColumn>
			</MarketingGrid>
		</footer>
	);
};

export default Footer;
