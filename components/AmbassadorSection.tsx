'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Globe, Linkedin } from 'lucide-react';
import { siGithub, siX } from 'simple-icons';
import { ambassadors } from '@/content/ambassadors';
import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';

type BrandIconProps = {
	iconPath: string;
};

const BrandIcon: React.FC<BrandIconProps> = ({ iconPath }) => {
	return (
		<svg viewBox="0 0 24 24" aria-hidden="true" className="w-4 h-4">
			<path d={iconPath} fill="currentColor" />
		</svg>
	);
};

type SocialIconProps = {
	kind: 'x' | 'linkedin' | 'github' | 'website';
};

const SocialIcon: React.FC<SocialIconProps> = ({ kind }) => {
	if (kind === 'x') return <BrandIcon iconPath={siX.path} />;
	if (kind === 'linkedin') return <Linkedin className="w-4 h-4" />;
	if (kind === 'github') return <BrandIcon iconPath={siGithub.path} />;
	return <Globe className="w-4 h-4" />;
};

const AmbassadorSection: React.FC = () => {
	const { t } = useI18n();

	if (ambassadors.length === 0) {
		return null;
	}

	return (
		<motion.section
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, margin: '-50px' }}
			transition={{ duration: 0.5 }}
			className="mb-16"
		>
			<h2 className="text-xs uppercase tracking-wider text-cursor-text-muted font-medium mb-4">
				{t('ambassadors.title', { communityName: siteConfig.communityName })}
			</h2>

			<div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
				{ambassadors.map((ambassador, index) => {
					const links = [
						{ kind: 'x' as const, href: ambassador.links.x },
						{ kind: 'linkedin' as const, href: ambassador.links.linkedin },
						{ kind: 'github' as const, href: ambassador.links.github },
						{ kind: 'website' as const, href: ambassador.links.website },
					].filter((entry) => Boolean(entry.href));

					return (
						<motion.article
							key={ambassador.name}
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, margin: '-50px' }}
							transition={{ duration: 0.3, delay: index * 0.07 }}
							className="bg-cursor-bg-dark border border-cursor-border rounded-md p-5"
						>
							<div className="flex items-center gap-4">
								<div className="relative w-14 h-14 rounded-full overflow-hidden border border-cursor-border-emphasis">
									<Image src={ambassador.photo} alt={ambassador.name} fill className="object-cover" sizes="56px" />
								</div>
								<div>
									<p className="text-cursor-text font-medium">{ambassador.name}</p>
									{ambassador.role ? <p className="text-cursor-text-muted text-sm">{ambassador.role}</p> : null}
								</div>
							</div>

							{links.length > 0 ? (
								<div className="flex items-center gap-3 mt-4">
									{links.map((link) => (
										<a
											key={`${ambassador.name}-${link.kind}`}
											href={link.href}
											target="_blank"
											rel="noopener noreferrer"
											className="p-2 rounded border border-cursor-border text-cursor-text-muted hover:text-cursor-text hover:border-cursor-border-emphasis transition-colors"
											aria-label={`${ambassador.name} ${link.kind}`}
										>
											<SocialIcon kind={link.kind} />
										</a>
									))}
								</div>
							) : null}
						</motion.article>
					);
				})}
			</div>
		</motion.section>
	);
};

export default AmbassadorSection;
