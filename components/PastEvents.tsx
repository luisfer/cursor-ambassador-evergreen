'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { pastEvents } from '@/content/events';
import { useI18n } from '@/lib/i18n';
import { cardInteractive } from '@/components/ui';

const PastEvents: React.FC = () => {
	const { t } = useI18n();

	if (pastEvents.length === 0) {
		return null;
	}

	return (
		<section id="recaps" className="mb-20 scroll-mt-20">
			<p className="cursor-eyebrow mb-2">{t('home.pastEvents')}</p>
			<h2 className="cursor-section-title mb-8 text-cursor-text">{t('home.pastEventsHeading')}</h2>

			<div className="space-y-5">
				{pastEvents.map((event) => {
					if (!event.recapPath) return null;

					return (
						<Link key={event.id} href={event.recapPath} className={`${cardInteractive} group block`}>
							<article className={event.thumbnail ? 'grid md:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.9fr)]' : ''}>
								{event.thumbnail ? (
									<div className="relative aspect-[16/10] overflow-hidden md:aspect-auto md:min-h-[280px]">
										<Image
											src={event.thumbnail}
											alt={event.title}
											fill
											className="object-cover"
											sizes="(max-width: 768px) 100vw, 720px"
										/>
									</div>
								) : null}
								<div className="flex flex-col justify-between gap-6 p-6 md:p-8">
									<div className="flex items-start justify-between gap-4">
										<div className="min-w-0">
											<p className="text-sm text-cursor-text-muted">
												{event.displayDate}
												{event.attendees ? ` · ${t('home.attendees', { count: String(event.attendees) })}` : ''}
											</p>
											<h3 className="mt-2 text-2xl font-normal tracking-tight text-cursor-text">{event.title}</h3>
											<p className="mt-2 text-sm text-cursor-text-muted">
												{event.host ? `${event.host.name} · ` : ''}
												{event.location}
											</p>
										</div>

										{event.host?.logo ? (
											<div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-sm border border-cursor-border bg-cursor-bg p-2.5">
												<Image
													src={event.host.logo}
													alt={event.host.name}
													width={40}
													height={40}
													className="h-full w-full object-contain"
												/>
											</div>
										) : null}
									</div>
									<p className="text-sm text-cursor-accent-orange">
										{t('home.viewRecap')} <span aria-hidden="true">→</span>
									</p>
								</div>
							</article>
						</Link>
					);
				})}
			</div>
		</section>
	);
};

export default PastEvents;
