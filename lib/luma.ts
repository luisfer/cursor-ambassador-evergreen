import type { Chapter, CursorEvent } from '@/lib/types';

// Shape minimo da resposta de api.lu.ma que o site consome. A API nao e
// documentada, entao tudo aqui e validado em runtime antes do uso.
export interface LumaApiEvent {
	api_id?: string;
	name?: string;
	start_at?: string;
	url?: string;
	cover_url?: string | null;
}

interface LumaGetItemsResponse {
	entries?: Array<{ event?: LumaApiEvent }>;
}

const LUMA_GET_ITEMS_URL = 'https://api.lu.ma/calendar/get-items';
const FETCH_TIMEOUT_MS = 6_000;
const REVALIDATE_SECONDS = 3_600;
const USER_AGENT = 'CursorBrasil/1.0 (+https://www.cursorbrasil.com.br)';
const MAX_ATTEMPTS = 3;
const RETRY_BASE_MS = 500;

let queueTail: Promise<void> = Promise.resolve();

function enqueue<T>(task: () => Promise<T>): Promise<T> {
	const result = queueTail.then(task, task);
	queueTail = result.then(
		() => undefined,
		() => undefined,
	);
	return result;
}

function wait(ms: number): Promise<void> {
	return new Promise((resolve) => {
		setTimeout(resolve, ms);
	});
}

function isNonEmptyString(value: unknown): value is string {
	return typeof value === 'string' && value.length > 0;
}

function isLumaResponse(value: unknown): value is LumaGetItemsResponse {
	if (typeof value !== 'object' || value === null) return false;
	const entries = (value as { entries?: unknown }).entries;
	return entries === undefined || Array.isArray(entries);
}

export type LumaEventPeriod = 'future' | 'past';

async function requestCalendarEvents(
	calendarApiId: string,
	period: LumaEventPeriod,
	paginationLimit: number,
): Promise<LumaApiEvent[]> {
	const url = `${LUMA_GET_ITEMS_URL}?calendar_api_id=${encodeURIComponent(calendarApiId)}&period=${period}&pagination_limit=${paginationLimit}`;

	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		const response = await fetch(url, {
			headers: { accept: 'application/json', 'user-agent': USER_AGENT },
			signal: AbortSignal.timeout(FETCH_TIMEOUT_MS),
			next: { revalidate: REVALIDATE_SECONDS, tags: [`luma:${calendarApiId}:${period}`] },
		});
		if (response.ok) {
			const json: unknown = await response.json();
			if (!isLumaResponse(json)) {
				throw new Error(`Luma ${calendarApiId} returned an unexpected shape`);
			}

			return (json.entries ?? [])
				.map((entry) => entry?.event)
				.filter(
					(event): event is LumaApiEvent =>
						Boolean(event) &&
						isNonEmptyString(event?.name) &&
						isNonEmptyString(event?.start_at) &&
						isNonEmptyString(event?.url),
				);
		}

		if (response.status !== 429) {
			throw new Error(`Luma ${calendarApiId} responded with HTTP ${response.status}`);
		}

		if (attempt < MAX_ATTEMPTS) {
			await wait(RETRY_BASE_MS * attempt);
		}
	}

	throw new Error(`Luma ${calendarApiId} responded with HTTP 429`);
}

export async function fetchCalendarEvents(
	calendarApiId: string,
	period: LumaEventPeriod,
	paginationLimit = 20,
): Promise<LumaApiEvent[]> {
	return enqueue(() => requestCalendarEvents(calendarApiId, period, paginationLimit));
}

// start_at chega em UTC; a data exibida e agrupada segue o fuso do publico.
function toSaoPauloIsoDate(isoUtc: string): string | null {
	const parsed = new Date(isoUtc);
	if (Number.isNaN(parsed.getTime())) return null;

	return new Intl.DateTimeFormat('en-CA', {
		timeZone: 'America/Sao_Paulo',
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
	}).format(parsed);
}

function formatDisplayDate(isoDate: string, locale: string): string {
	return new Intl.DateTimeFormat(locale, {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
		timeZone: 'UTC',
	}).format(new Date(`${isoDate}T12:00:00Z`));
}

export function mapLumaEventToCursor(
	lumaEvent: LumaApiEvent,
	chapter: Chapter,
	displayLocale: string,
	status: CursorEvent['status'] = 'upcoming',
): CursorEvent | null {
	if (!lumaEvent.name || !lumaEvent.start_at || !lumaEvent.url) return null;

	const date = toSaoPauloIsoDate(lumaEvent.start_at);
	if (!date) return null;

	return {
		id: `luma:${chapter.slug}:${lumaEvent.api_id ?? lumaEvent.url}`,
		title: lumaEvent.name,
		date,
		displayDate: formatDisplayDate(date, displayLocale),
		location: chapter.state ? `${chapter.city}, ${chapter.state}` : chapter.city,
		lumaUrl: `https://luma.com/${lumaEvent.url}`,
		thumbnail: lumaEvent.cover_url ?? undefined,
		status,
		host: { name: `Cursor ${chapter.city}`, logo: '/cursor-logo.svg', url: chapter.lumaUrl },
	};
}
