import en from './en.json';

export const localeBundles = {
	en,
} as const;

export type LocaleBundleKey = keyof typeof localeBundles;
