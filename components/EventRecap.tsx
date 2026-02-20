'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import PhotoGallery from '@/components/PhotoGallery';
import { RecapData } from '@/lib/types';
import { useI18n } from '@/lib/i18n';

interface EventRecapProps {
	recap: RecapData;
}

const EventRecap: React.FC<EventRecapProps> = ({ recap }) => {
	const { t } = useI18n();

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className="mb-8"
		>
			<div className="bg-[#1B1913] border border-cursor-border rounded-lg p-8">
				<h2 className="text-xl font-semibold text-cursor-text mb-2">{recap.title}</h2>
				<p className="text-cursor-text-muted text-sm mb-6">{recap.date}</p>

				{recap.host ? (
					<div className="text-cursor-text-muted text-sm mb-6 flex items-center gap-2">
						<span>{t('home.hostedBy')}</span>
						<a
							href={recap.host.url || '#'}
							target="_blank"
							rel="noopener noreferrer"
							className="text-cursor-text hover:underline inline-flex items-center gap-1.5"
						>
							<Image src={recap.host.logo} alt={recap.host.name} width={18} height={18} className="rounded-full" />
							{recap.host.name}
						</a>
					</div>
				) : null}

				{recap.attendees ? (
					<p className="text-cursor-text text-lg leading-relaxed mb-4">
						{t('home.attendees', { count: String(recap.attendees) })}
					</p>
				) : null}
				<div className="text-cursor-text-muted text-sm leading-relaxed space-y-3">
					{recap.summary.map((paragraph, index) => (
						<p key={index}>{paragraph}</p>
					))}
				</div>

				<PhotoGallery photos={recap.photos} embedded />

				{recap.photoCredits && recap.photoCredits.length > 0 ? (
					<div className="border-t border-cursor-border mt-6 pt-6 text-sm text-cursor-text-muted">
						<span className="mr-1">Photo credits:</span>
						{recap.photoCredits.map((credit, index) => (
							<span key={`${credit.name}-${index}`}>
								{credit.url ? (
									<a
										href={credit.url}
										target="_blank"
										rel="noopener noreferrer"
										className="text-cursor-text hover:underline"
									>
										{credit.name}
									</a>
								) : (
									<span className="text-cursor-text">{credit.name}</span>
								)}
								{index < recap.photoCredits!.length - 1 ? <span>, </span> : <span>.</span>}
							</span>
						))}
					</div>
				) : null}
			</div>
		</motion.section>
	);
};

export default EventRecap;
