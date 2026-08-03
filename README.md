# Cursor Ambassador Evergreen Template

![Cursor Ambassador Banner](public/images/readme-banner.jpg)

Configurable Next.js template for Cursor Ambassador community sites. Created by [Luis Fernando Romero Calero](https://lfrc.me) ([@luisfer](https://github.com/luisfer)), adapted from [Cursor Thailand](https://cursorthailand.com).

This is a community-maintained template, not an official Cursor product.

## Attribution (required)

Country sites based on this template must show a visible footer credit. The default footer already includes:

> Based on [Cursor Ambassador Evergreen](https://github.com/luisfer/cursor-ambassador-evergreen) by [Luis Romero](https://lfrc.me)

Do not remove that line without replacing it with an equivalent visible credit. Details: [`NOTICE`](NOTICE) and [`ATTRIBUTION.md`](ATTRIBUTION.md).

### What “clamped upstream” means

- The default footer credit stays in the template.
- PRs that strip attribution without an equivalent credit are declined.
- Sample event photography is not redistributed as free stock — hero slots ship as empty placeholders.
- Code remains MIT; deployment credit and media rules live in `NOTICE`.

## Quick Start

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open `http://localhost:3000`.

Before launching a country site, walk through the checklist in [`ATTRIBUTION.md`](ATTRIBUTION.md).

## Project Structure

### App routes

- `app/page.tsx`: homepage on the shared 24-column marketing grid.
- `app/recaps/[slug]/page.tsx`: dynamic recap page route.
- `app/slides/[id]/page.tsx`: optional workshop slides route.

### Core components

- `components/ui/`: portable Cursor marketing primitives (`Button`, `Badge`, `TextLink`, card styles). See `docs/ui-kit.md`.
- `components/layout/MarketingGrid.tsx`: 1300px / 24-column page shell with reusable content spans.
- `components/HeroHeaderServer.tsx`: server-side daily photo shuffle into fixed bento slots.
- `components/HeroHeader.tsx`: opaque rounded copy panel over the top-left 2×2 bento slot.
- `components/BentoGrid.tsx`: clean photo grid with click-to-expand.
- `components/CommunityTweets.tsx`: optional curated X/Twitter mosaic (`react-tweet`).
- `components/FeaturedSection.tsx`: featured resource card.
- `components/UpcomingEvents.tsx`: date-grouped event index.
- `components/PastEvents.tsx`: editorial recap index.
- `components/LumaCalendar.tsx`: optional embedded Luma calendar section.
- `components/AmbassadorSection.tsx`: ambassador cards.
- `components/CommunityQuotes.tsx`: optional short quote grid (gated in site config).
- `components/ClosingCTA.tsx`: “Come build with us” band with Turner wallpaper.
- `components/Partners.tsx`: hosting partner cards/logos.
- `components/GlobalEvents.tsx`: world events section wrapper.
- `components/WorldEventsCarousel.tsx`: carousel inside GlobalEvents.

### Content-driven configuration (`content/`)

This template is content-first. Most customization is done by editing files in `content/`.

- `content/site.config.ts`: global site settings (community name, city/country, URLs, locales, footer text, optional sections).
- `content/bento-slots.ts`: fixed hero grid geometry (desktop 4×4, mobile 2×4).
- `content/header-photos.ts`: hero image pool (`src`, `alt` only — images shuffle daily).
- `content/featured.ts`: featured card text + CTA.
- `content/events.ts`: upcoming/past events and recap links.
- `content/ambassadors.ts`: ambassador data and social links.
- `content/partners.ts`: host/sponsor logos and URLs.
- `content/world-events.ts`: world carousel entries.
- `content/community-tweets.ts`: curated tweet status URLs for the optional mosaic.
- `content/community-quotes.ts`: short attendee/ambassador quotes for the optional quotes section.
- `content/recaps/*.ts`: recap documents rendered by slug.
- `content/locales/*.json`: translation dictionaries.
- `content/locales/index.ts`: locale bundle registry consumed by `lib/i18n.tsx`.

## Customization Guide

### 1) Site identity

Edit `content/site.config.ts`:

- `communityName`, `communityNameLocal`, `city`, `country`
- `lumaUrl`, `lumaCalendarEmbedUrl`, `cursorCommunityUrl`
- `defaultLocale`, `locales`
- `footerTagline`
- `description` — short Open Graph / Twitter / `<meta>` description (keep it concrete; avoid marketing fluff)
- `ogImage` — path under `public/` for a 1200×630 share image (template ships `public/og.jpg`; replace with a chapter photo)
- `sections`: toggle optional blocks (`matchmaking`, `photoDisclaimer`, `lumaCalendar`, `communityTweets`, `communityQuotes`)

Set `NEXT_PUBLIC_SITE_URL` in `.env.local` for sitemap, canonical URLs, and Open Graph (`metadataBase`). Without it, previews fall back to `http://localhost:3000`.

### 2) Hero bento grid

Layout slots live in `content/bento-slots.ts`. Images live in `content/header-photos.ts`.

Images shuffle once per day (seeded by date + community name) into fixed slots on the server — no hydration flash. Desktop and mobile use separate shuffles. Layout geometry stays fixed; only photos change.

Add at least as many images as slots (7 on desktop). Run `pnpm validate:bento` after editing slots.

The bento occupies the full hero viewport. An opaque rounded copy panel covers the top-left 2×2 slot (heading + events CTA) — keep that first slot’s geometry in `content/bento-slots.ts`, or update `HeroHeader.tsx` to match. Each photo tile can expand to full-bleed on click (Escape or second click collapses). The daily shuffle remains server-owned.

When pulling upstream into a customized fork, prefer merging `components/` and resolving `content/events.ts` by keeping your events (optionally add `host`). See **Notes for consumers** in `CHANGELOG.md`.

### Automatic themes

Marketing and recap surfaces follow `prefers-color-scheme`: warm off-white in light mode and espresso in dark mode. Semantic `cursor-*` tokens live in `app/globals.css`; components should not add raw page colors.

### 3) Community tweets (optional)

Edit `content/community-tweets.ts` with status URLs from your chapter (`https://x.com/.../status/...`, not profile URLs). Set `relevance` to control order.

**Replace the example seed before enabling.** The template ships global Cafe Cursor / Ben Lang examples. If you set `communityTweets: true` without replacing them, visitors will see those posts — not your chapter's.

Enable the section in `content/site.config.ts`:

```ts
sections: {
  communityTweets: true,
}
```

Tweets are fetched via `react-tweet` and cached at `app/api/tweets/[id]/route.ts` (allowlisted IDs only). The "Browse on X" link uses your `city` and `communityName` from site config. The component is dynamically imported so chapters that leave the toggle off do not ship `react-tweet` in the homepage bundle.

### 4) Events and recaps

Edit `content/events.ts`.

- `status: 'upcoming' | 'past'` controls which list renders the event.
- `displayDate` is shown in the UI (use for TBD labels like "Later this year").
- `date` is optional; when omitted, the event is excluded from homepage JSON-LD.
- `lumaUrl` powers registration links. When missing, a muted "Coming soon" chip appears instead of hiding the CTA.
- `recapPath` connects a past event to a recap route (for example `/recaps/example-event`).
- `thumbnail` is shown in past event cards.

To add a recap:

1. Add a recap file in `content/recaps/` and register it in `content/recaps/index.ts`.
2. Ensure the recap exports a valid recap object with a matching `slug`.
3. Add `recapPath` in the corresponding event.

### 5) Luma integration

- `siteConfig.lumaUrl` — Navbar "Join us", footer "All events", footer CTA fallback
- `event.lumaUrl` — register links on upcoming event cards
- `siteConfig.lumaCalendarEmbedUrl` — embedded calendar (hidden when empty; also set `sections.lumaCalendar: true`)

The curated upcoming list and Luma embed serve different purposes. Avoid duplicating the same events in both without intent.

To enable the calendar embed: copy the embed URL from Luma → Calendar → Embed into `lumaCalendarEmbedUrl`, then set `sections.lumaCalendar: true`.

### 6) Optional slides

Slides are optional and live in `modules/slides/`. See `modules/slides/README.md`.

- Registry: `modules/slides/content/index.ts`
- Skeleton deck: `modules/slides/content/example-deck.tsx` (replace with your content)
- Shareable entry: `/slides` (slide 1). Numbered: `/slides/2`…
- `/slides/1` and invalid `/slides/XX` redirect to `/slides`
- Chrome: `TitleCard`, primitives, `CodeBlock` / `PromptBlock` / `DiagramSlide` (CursorGothic)

If your community does not use slides, remove links to `/slides` from content.

### 7) Ambassadors and partners

- `content/ambassadors.ts`: `name`, optional `role`, `photo`, and links (`x`, `linkedin`, `github`, `website`).
- `content/partners.ts`: partner `name`, `logo`, `url`, optional `logoBg`, optional `logoHeight`.

Local SVG logos in `public/images/partners/` are recommended.

### 8) World events carousel

Edit `content/world-events.ts` entries (`src`, `location`, `date`, `alt`). `GlobalEvents` renders the section; `WorldEventsCarousel` renders the photo grid.

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

## Add or Remove Sections

Homepage order is defined in `app/page.tsx`.

Optional sections are gated in `siteConfig.sections`:

- `matchmaking`: co-working matchmaking card
- `photoDisclaimer`: photo consent notice
- `lumaCalendar`: embedded Luma calendar (also requires `lumaCalendarEmbedUrl`)
- `communityTweets`: curated X/Twitter mosaic (also edit `content/community-tweets.ts`)
- `communityQuotes`: short quote grid (also edit `content/community-quotes.ts`; replace samples before enabling)

The closing CTA (“Come build with us”) and footer always render. Remove an always-on section by deleting its component from `app/page.tsx` — keep the footer template credit.

## Scripts

```bash
pnpm dev                         # local development
pnpm verify                      # format + lint + typecheck + validators + build
pnpm validate:bento              # slot overlap / grid coverage check
pnpm validate:community-tweets   # tweet URL/id allowlist + Browse on X href
pnpm test:smoke                  # optional: production server tweet API (needs Twitter egress)
pnpm typecheck                   # TypeScript only
```

## Changelog

See [`CHANGELOG.md`](CHANGELOG.md) for version history (current: **0.3.1**).

## Image Strategy

This template uses local images in `public/images/` for hero photos, world events, ambassadors, and partner logos.

Hero and world-event slots ship as **empty placeholders** (`public/images/events/placeholder-*.jpg`). Replace them with your own chapter photos before launch (≥7 for the bento). Do not reuse Athita’s photography or other named Cursor Thailand event photos without permission and credit.

The closing CTA uses J. M. W. Turner, _Norham Castle, Sunrise_ (c. 1845) from Wikimedia — public domain; credited in the image `alt` text.

With fully local images, `next.config.js` does not need remote image domains for hero photos. If you enable community tweets, `pbs.twimg.com` and `abs.twimg.com` are already allowlisted for tweet avatars and media.

## Deployment

### Vercel

1. Push to GitHub.
2. Import repository in Vercel.
3. Set `NEXT_PUBLIC_SITE_URL` to your production domain.
4. Deploy with default Next.js settings.

### Other platforms

```bash
pnpm build
pnpm start
```

## Contributing

See `CONTRIBUTING.md`.

## Sites Using This Template

| Country / region     | Site                                                       | Maintainer(s)                                           |
| -------------------- | ---------------------------------------------------------- | ------------------------------------------------------- |
| Austria              | [cursoraustria.com](https://cursoraustria.com)             | —                                                       |
| Belgium              | [cursorbelgium.com](https://cursorbelgium.com)             | [Kris](https://github.com/krismatterz) (`@krismatterz`) |
| Bulgaria             | [cursorbulgaria.com](https://cursorbulgaria.com)           | [Kristiyan Velkov](https://github.com/kristiyan-velkov) |
| Canada (Calgary)     | [cursorcalgary.com](https://cursorcalgary.com)             | —                                                       |
| Croatia              | [cursorcroatia.com](https://cursorcroatia.com)             | [Nico](https://github.com/nitodeco)                     |
| El Salvador          | [cursorelsalvador.com](https://cursorelsalvador.com)       | —                                                       |
| Germany              | [cursorgermany.com](https://cursorgermany.com)             | [Maurice](https://github.com/mpdesigncode27)            |
| Indonesia            | [cursorindonesia.com](https://cursorindonesia.com)         | —                                                       |
| Italy (Trento)       | [trento.cursor-italy.com](https://trento.cursor-italy.com) | [Davide Carlomagno](https://github.com/dvdcarlomagno)   |
| Netherlands          | [cursornetherlands.com](https://cursornetherlands.com)     | Rogier Muller, Thijs Sondag                             |
| New Zealand          | [cursornewzealand.com](https://cursornewzealand.com)       | —                                                       |
| Romania              | [cursorromania.com](https://cursorromania.com)             | [Sergei Chyrkov](https://github.com/chyrkov)            |
| Serbia               | [cursorserbia.com](https://cursorserbia.com)               | [Aleksandar Hadzibabic](https://github.com/hadzija7)    |
| South Africa         | [cursorsouthafrica.com](https://cursorsouthafrica.com)     | [@TKala82](https://github.com/TKala82)                  |
| Sri Lanka            | [cursorsrilanka.com](https://cursorsrilanka.com)           | Rasal Jayasinghe                                        |
| Thailand             | [cursorthailand.com](https://cursorthailand.com)           | [Luisfer Romero Calero](https://github.com/luisfer)     |
| UAE                  | [cursoruae.com](https://cursoruae.com)                     | [Juanjo do Olmo](https://github.com/SimplyJuanjo)       |
| USA (Salt Lake City) | [cursorslc.com](https://cursorslc.com)                     | [Will Rowston](https://github.com/wrowston)             |

> This list is forked or deployed from this repo only. Maintainer links point to the GitHub profile that owns or maintains the chapter site when known. Corrections welcome via PR.

Using this template? Open a PR to add your site here.

## Credits

**Created by** [Luis Fernando Romero Calero](https://lfrc.me) ([@luisfer](https://github.com/luisfer)) — design and implementation of this template, adapted from [Cursor Thailand](https://cursorthailand.com) and [Cursor](https://cursor.com) community branding.

**Contributors**

- [Kristiyan Velkov](https://kristiyanvelkov.com/) ([@kristiyan-velkov](https://github.com/kristiyan-velkov))
- [Nico](https://nicomoehn.codes) ([@nitodeco](https://github.com/nitodeco))
- Built with [Cursor](https://cursor.com) and Claude

## License

MIT for code — see [`LICENSE`](LICENSE). Deployment credit and media rules — see [`NOTICE`](NOTICE) and [`ATTRIBUTION.md`](ATTRIBUTION.md).
