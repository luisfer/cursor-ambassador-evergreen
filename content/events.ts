import { CursorEvent } from '@/lib/types';

// REPLACE: Replace all sample events, locations, and Luma URLs with real community events.
export const events: CursorEvent[] = [
	{
		id: 'cafe-cursor-example-1',
		title: 'Cafe Cursor YourCity',
		date: '2026-03-21',
		displayDate: 'March 21, 2026',
		location: 'Your City, YourCountry',
		lumaUrl: 'https://lu.ma/example-event-1',
		status: 'upcoming',
	},
	{
		id: 'cursor-seminar-yourcity',
		title: 'Cursor Seminar YourCity',
		date: '2026-02-14',
		displayDate: 'February 14, 2026',
		attendees: 38,
		location: 'Your City, YourCountry',
		recapPath: '/recaps/example-event',
		thumbnail: '/images/events/placeholder-01.jpg',
		galleryImages: ['/images/events/placeholder-02.jpg', '/images/events/placeholder-04.jpg'],
		host: {
			name: 'Host Venue',
			logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=200&auto=format&fit=crop',
		},
		status: 'past',
	},
];

export const upcomingEvents = events.filter((event) => event.status === 'upcoming');
export const pastEvents = events.filter((event) => event.status === 'past');
