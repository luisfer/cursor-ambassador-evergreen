'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { useTheme, type ThemePreference } from '@/lib/theme';
import { cn } from '@/components/ui';

const OPTIONS: { value: ThemePreference; icon: typeof Sun; labelKey: string }[] = [
	{ value: 'system', icon: Monitor, labelKey: 'footer.themeSystem' },
	{ value: 'light', icon: Sun, labelKey: 'footer.themeLight' },
	{ value: 'dark', icon: Moon, labelKey: 'footer.themeDark' },
];

export default function ThemeToggle() {
	const { t } = useI18n();
	const { preference, setPreference, mounted } = useTheme();

	return (
		<div
			className="inline-flex items-center rounded-full border border-cursor-border p-0.5"
			role="group"
			aria-label={t('footer.themeLabel')}
		>
			{OPTIONS.map(({ value, icon: Icon, labelKey }) => {
				const active = mounted ? preference === value : value === 'system';
				return (
					<button
						key={value}
						type="button"
						onClick={() => setPreference(value)}
						aria-label={t(labelKey)}
						aria-pressed={active}
						title={t(labelKey)}
						className={cn(
							'flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-150',
							active
								? 'bg-cursor-surface-raised text-cursor-text'
								: 'text-cursor-text-muted hover:text-cursor-text'
						)}
					>
						<Icon className="h-3.5 w-3.5" strokeWidth={1.75} aria-hidden />
					</button>
				);
			})}
		</div>
	);
}
