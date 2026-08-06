'use client';

import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from 'react';
import { THEME_STORAGE_KEY } from '@/lib/theme-boot';

export type ThemePreference = 'system' | 'light' | 'dark';
export type ResolvedTheme = 'light' | 'dark';

export { THEME_STORAGE_KEY };

type ThemeContextValue = {
	preference: ThemePreference;
	resolved: ResolvedTheme;
	setPreference: (preference: ThemePreference) => void;
	mounted: boolean;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function resolveTheme(preference: ThemePreference): ResolvedTheme {
	if (preference === 'light') return 'light';
	if (preference === 'dark') return 'dark';
	if (typeof window === 'undefined') return 'light';
	return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyResolvedTheme(resolved: ResolvedTheme) {
	document.documentElement.setAttribute('data-theme', resolved);
	document.documentElement.style.colorScheme = resolved;
}

function readStoredPreference(): ThemePreference {
	try {
		const stored = localStorage.getItem(THEME_STORAGE_KEY);
		if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
	} catch {
		/* ignore */
	}
	return 'system';
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [preference, setPreferenceState] = useState<ThemePreference>('system');
	const [resolved, setResolved] = useState<ResolvedTheme>('light');
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		const pref = readStoredPreference();
		const next = resolveTheme(pref);
		setPreferenceState(pref);
		setResolved(next);
		applyResolvedTheme(next);
		setMounted(true);

		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const onSystemChange = () => {
			setPreferenceState((current) => {
				if (current !== 'system') return current;
				const systemResolved = resolveTheme('system');
				setResolved(systemResolved);
				applyResolvedTheme(systemResolved);
				return current;
			});
		};
		media.addEventListener('change', onSystemChange);
		return () => media.removeEventListener('change', onSystemChange);
	}, []);

	const setPreference = useCallback((next: ThemePreference) => {
		setPreferenceState(next);
		try {
			localStorage.setItem(THEME_STORAGE_KEY, next);
		} catch {
			/* ignore */
		}
		const resolvedNext = resolveTheme(next);
		setResolved(resolvedNext);
		applyResolvedTheme(resolvedNext);
	}, []);

	const value = useMemo(
		() => ({ preference, resolved, setPreference, mounted }),
		[preference, resolved, setPreference, mounted]
	);

	return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
	const ctx = useContext(ThemeContext);
	if (!ctx) {
		throw new Error('useTheme must be used within ThemeProvider');
	}
	return ctx;
}
