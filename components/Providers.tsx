'use client';

import { MotionConfig } from 'framer-motion';
import { I18nProvider } from '@/lib/i18n';
import { ThemeProvider } from '@/lib/theme';

export default function Providers({ children }: { children: React.ReactNode }) {
	return (
		<MotionConfig reducedMotion="user">
			<ThemeProvider>
				<I18nProvider>{children}</I18nProvider>
			</ThemeProvider>
		</MotionConfig>
	);
}
