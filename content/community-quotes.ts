export type CommunityQuote = {
	quote: string;
	name: string;
	role: string;
};

// REPLACE: Swap these sample quotes for real attendee / ambassador feedback.
// Keep quotes short. Enable the section in site.config.ts when ready.
export const communityQuotes: CommunityQuote[] = [
	{
		quote: 'This is where I stopped doomscrolling tutorials and started shipping with other builders.',
		name: 'Alex',
		role: 'Attendee',
	},
	{
		quote: 'Hands-on beats another slide deck every time. I left with a workflow I actually use.',
		name: 'Sam',
		role: 'Cursor Ambassador',
	},
	{
		quote: 'It feels like a proper community — show up, build, leave with new friends.',
		name: 'Jordan',
		role: 'Attendee',
	},
];
