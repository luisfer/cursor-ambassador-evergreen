'use client';

import React from 'react';
import { siteConfig } from '@/content/site.config';
import { useI18n } from '@/lib/i18n';

const LanguageToggle: React.FC = () => {
	const { locale, setLocale } = useI18n();

	if (siteConfig.locales.length <= 1) {
		return null;
	}

	return (
		<div className="flex items-center gap-2">
			{siteConfig.locales.map((localeCode) => (
				<button
					key={localeCode}
					onClick={() => setLocale(localeCode)}
					className={`px-3 py-1.5 rounded text-sm font-medium transition-colors ${
						locale === localeCode ? 'bg-cursor-text text-cursor-bg' : 'text-cursor-text-muted hover:text-cursor-text'
					}`}
				>
					{localeCode.toUpperCase()}
				</button>
			))}
		</div>
	);
};

export default LanguageToggle;
