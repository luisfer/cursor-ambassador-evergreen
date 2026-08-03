// REPLACE: Update these values for your local Cursor community.
// Keep the required footer template credit in components/Footer.tsx (see NOTICE / ATTRIBUTION.md).
export const siteConfig = {
	communityName: 'Cursor Community',
	communityNameLocal: 'YourCity',
	city: 'Your City',
	country: 'YourCountry',
	lumaUrl: 'https://lu.ma/cursor-community',
	// REPLACE: Paste your Luma calendar embed URL from Luma → Calendar → Embed. Leave empty to hide the calendar section.
	lumaCalendarEmbedUrl: '',
	cursorCommunityUrl: 'https://cursor.com/community',
	defaultLocale: 'en',
	locales: ['en'],
	footerTagline: 'Made with Cursor by ambassadors worldwide',
	/** Short site description for <meta>, Open Graph, and Twitter cards. Keep it concrete. */
	description: 'Local Cursor meetups, workshops, and event recaps.',
	/** Path under /public for the default 1200×630 share image. */
	ogImage: '/og.jpg',
	sections: {
		matchmaking: false,
		photoDisclaimer: false,
		lumaCalendar: false,
		communityTweets: false,
		/** Set true after replacing sample quotes in content/community-quotes.ts */
		communityQuotes: false,
	},
};

export type SiteConfig = typeof siteConfig;
