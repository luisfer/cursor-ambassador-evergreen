# Cursor Ambassador Evergreen Template

![Cursor Ambassador Banner](public/images/readme-banner.png)

This repository is a configurable Next.js template for Cursor Ambassador community sites.

## Quick Start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Project Structure

### App routes

- `app/page.tsx`: homepage composition (hero, featured, events, ambassadors, partners, world events).
- `app/recaps/[slug]/page.tsx`: dynamic recap page route.
- `app/slides/[id]/page.tsx`: optional workshop slides route.

### Core components

- `components/HeroHeader.tsx`: top section + bento photo grid.
- `components/FeaturedSection.tsx`: featured resource card.
- `components/UpcomingEvents.tsx` and `components/PastEvents.tsx`: event lists.
- `components/AmbassadorSection.tsx`: ambassador cards.
- `components/Partners.tsx`: hosting partner cards/logos.
- `components/WorldEventsCarousel.tsx`: global event photos.

### Content-driven configuration (`content/`)

This template is content-first. Most customization is done by editing files in `content/`.

- `content/site.config.ts`: global site settings (community name, city/country, URLs, locales, footer text).
- `content/header-photos.ts`: hero bento images (`src`, `alt`, `span`, `mobileHidden`).
- `content/featured.ts`: featured card text + CTA.
- `content/events.ts`: upcoming/past events and recap links.
- `content/ambassadors.ts`: ambassador data and social links.
- `content/partners.ts`: host/sponsor logos and URLs.
- `content/world-events.ts`: world carousel entries.
- `content/recaps/*.ts`: recap documents rendered by slug.
- `content/locales/*.json`: translation dictionaries.
- `content/locales/index.ts`: locale bundle registry consumed by `lib/i18n.tsx`.

## Customization Guide

### 1) Site identity

Edit `content/site.config.ts`:

- `communityName`, `communityNameLocal`, `city`, `country`
- `lumaUrl`, `cursorCommunityUrl`
- `defaultLocale`, `locales`
- `footerTagline`

### 2) Hero bento grid

Edit `content/header-photos.ts`.

Each entry uses explicit grid coordinates (1-indexed) for deterministic placement on a 4-column x 4-row grid:

- `src`: image path/URL
- `alt`: accessibility text
- `row`, `col`: starting row and column (required)
- `rowSpan`, `colSpan`: how many rows/columns the tile occupies (default 1)
- `mobile`: optional `{ row, col, rowSpan?, colSpan? }` override for the 2-column mobile grid
- `mobileHidden`: optional boolean to hide on small screens

Use local assets in `public/images/` for portability.

### 3) Events and recaps

Edit `content/events.ts`.

- `status: 'upcoming' | 'past'` controls which list renders the event.
- `lumaUrl` is used for registration links.
- `recapPath` connects a past event to a recap route (for example `/recaps/example-event`).
- `thumbnail` is shown in past event cards.

To add a recap:

1. Add a recap file in `content/recaps/`.
2. Ensure the recap exports a valid recap object with a matching `slug`.
3. Add `recapPath` in the corresponding event.

### 4) Optional slides

Slides are optional and live in `modules/slides/`.

- Data source: `modules/slides/content/example-deck.tsx`
- Route: `app/slides/[id]/page.tsx`

If your community does not use slides, remove links to `/slides/*` from content.

### 5) Ambassadors and partners

- `content/ambassadors.ts`: `name`, optional `role`, `photo`, and links (`x`, `linkedin`, `github`, `website`).
- `content/partners.ts`: partner `name`, `logo`, `url`, optional `logoBg`, optional `logoHeight`.

Local SVG logos in `public/images/partners/` are recommended.

### 6) World events carousel

Edit `content/world-events.ts` entries (`src`, `location`, `date`, `alt`).

`components/WorldEventsCarousel.tsx` renders this list directly.

## Locale / i18n

### Current model

- Runtime provider: `lib/i18n.tsx`
- Dictionaries: `content/locales/*.json`
- Bundle registry: `content/locales/index.ts`
- Config gate: `siteConfig.locales`

Language toggle appears when `siteConfig.locales.length > 1`.

### Add a second locale

1. Create `content/locales/xx.json` (for example `th.json`).
2. Register it in `content/locales/index.ts`.
3. Add `'xx'` to `siteConfig.locales`.
4. Optionally set `defaultLocale` to `'xx'`.

Example `content/locales/index.ts`:

```ts
import en from './en.json';
import th from './th.json';

export const localeBundles = {
	en,
	th,
} as const;
```

### Translation keys and params

Use `t('path.to.key', params)` from `useI18n()`.

- Dot-path keys: `t('home.upcomingEvents')`
- Parameter replacement: `t('home.attendees', { count: '42' })` for strings like `"{count} attendees"`

If a key is missing, the function returns the key path (useful for spotting missing translations).

## Add or Remove Sections

Homepage order is defined in `app/page.tsx`.

- Remove a section by deleting the component from the page.
- Add a section by creating a component and inserting it in `app/page.tsx`.

Keep content source files aligned with any component changes.

## Image Strategy

This template currently uses local images in `public/images/` for:

- hero event photos
- world events photos
- ambassadors
- partner logos

With fully local images, `next.config.js` does not need remote image domains.

## Deployment

### Vercel

1. Push to GitHub.
2. Import repository in Vercel.
3. Deploy with default Next.js settings.

### Other platforms

Build command:

```bash
npm run build
```

Start command:

```bash
npm run start
```

## Contributing

See `CONTRIBUTING.md`.

## Sites Using This Template

- [cursorthailand.com](https://cursorthailand.com)
- [cursorserbia.com](https://cursorserbia.com)
- [cursor-croatia.com](https://cursor-croatia.com)

Using this template? Open a PR to add your site here.

## Credits

Designed and implemented by [Luis Fernando Romero Calero](https://lfrc.me) and [Cursor](https://cursor.com).

## License

MIT. See `LICENSE`.
