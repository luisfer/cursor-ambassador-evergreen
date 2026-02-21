export type LocaleCode = string;

export interface CursorEvent {
	id: string;
	title: string;
	titleLocal?: string;
	date: string;
	displayDate: string;
	attendees?: number;
	location: string;
	lumaUrl?: string;
	recapPath?: string;
	thumbnail?: string;
	status: 'upcoming' | 'past';
	host?: { name: string; logo: string; url?: string };
}

export interface SocialLinks {
	x?: string;
	linkedin?: string;
	github?: string;
	website?: string;
}

export interface Ambassador {
	name: string;
	role?: string;
	photo: string;
	links: SocialLinks;
}

export interface Partner {
	name: string;
	logo: string;
	url: string;
	logoBg?: string;
	logoHeight?: string;
}

export interface FeaturedResource {
	title: string;
	description: string;
	href: string;
	ctaLabel: string;
}

export interface HeaderPhoto {
	src: string;
	alt: string;
	row: number;
	col: number;
	rowSpan?: number;
	colSpan?: number;
	mobile?: {
		row: number;
		col: number;
		rowSpan?: number;
		colSpan?: number;
	};
	mobileHidden?: boolean;
}

export interface GalleryPhoto {
	src: string;
	alt: string;
}

export interface RecapPhotoCredit {
	name: string;
	url?: string;
}

export interface RecapData {
	slug: string;
	title: string;
	date: string;
	attendees?: number;
	summary: string[];
	host?: { name: string; logo: string; url?: string };
	photoCredits?: RecapPhotoCredit[];
	photos: GalleryPhoto[];
}

export interface WorldEventPhoto {
	src: string;
	location: string;
	date?: string;
	alt: string;
}
