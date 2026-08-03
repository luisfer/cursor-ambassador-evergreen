# Changelog

All notable changes to this template are documented here.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/).

## [Unreleased]

### Added

- Shared 1300px / 24-column marketing grid with wide, reading, and prose spans
- Automatic warm-light and espresso-dark themes using semantic CSS tokens
- Opaque rounded hero copy panel over the top-left 2×2 bento slot (heading + events CTA)
- Optional host venue logo chip on past-event / recap index cards (`event.host`)
- Date-grouped upcoming event index
- Site SEO fields on `siteConfig` (`description`, `ogImage`) plus default `public/og.jpg` (1200×630) for Open Graph / Twitter cards
- `NOTICE`, `ATTRIBUTION.md`, and `AGENTS.md` for deployment credit and media rules
- Closing CTA (“Come build with us”) with Turner _Norham Castle, Sunrise_ (Wikimedia / public domain)
- Optional community quotes section (`sections.communityQuotes`, `content/community-quotes.ts`)

### Changed

- Navigation and footer use compact global chrome aligned to the marketing grid
- Hosting partners use a bordered logo grid with grayscale-to-color interaction
- Community tweets mosaic uses CSS-column masonry (Pinterest-style packing)
- Photography renders without colored tile washes or routine entrance animation
- Typography, surfaces, buttons, links, recaps, and optional sections use shared semantic tokens
- External text links use `↗`; internal links use `→`
- Landing recap cards use a larger photo column; host logo sits in the text column (not over photos)
- Root metadata uses `summary_large_image`, `metadataBase` from `NEXT_PUBLIC_SITE_URL`, and chapter `description` / `ogImage`
- Clarified ownership: MIT for code (copyright Luis Fernando Romero Calero); deployment credit and media rules in `NOTICE`
- Default footer includes required template attribution
- Sample event photography removed from the template seed; hero/world slots use empty placeholders

### Notes for consumers

- **Attribution:** keep the footer template credit (or an equivalent visible line). See `ATTRIBUTION.md`.
- **Photos:** replace `public/images/events/placeholder-*.jpg` with your chapter photos. Do not reuse Athita / Thailand event photos without credit and permission.
- **Hero:** the gradient overlay + eyebrow / description / Luma Join CTA are gone. Copy lives in an opaque panel. Keep Join in the nav (default) or re-add a CTA in `components/HeroHeader.tsx`.
- **Bento contract:** the panel assumes the first slot in `content/bento-slots.ts` stays top-left `2×2` on desktop and mobile. If you change that geometry, update the panel grid in `HeroHeader.tsx` to match.
- **`content/events.ts`:** sample `host` may conflict on merge — keep your events; optionally add `host: { name, logo }` for the venue chip.
- **Locales:** `home.heroEyebrow`, `home.heroDescription`, and `home.joinCommunity` remain in JSON but are unused by the new hero.
- No new dependencies for this change. Run `pnpm verify` after merging.

## [0.3.2] - 2026-07-10

### Added

- Slides skeleton chrome: `TitleCard`, primitives (`SlideTitle` / `SlideBody` / `SlideGrid` / `SlideCallout` / …), `DiagramSlide` with CursorGothic injection
- Shareable deck entry at `/slides` (slide 1); `/slides/1` and invalid ids redirect to `/slides`
- Placeholder diagram `public/slides/diagrams/example-flow.svg`

### Changed

- Example deck is structure-only (no workshop curriculum) — replace `modules/slides/content/example-deck.tsx`
- Slide nav uses UI kit pills; code/prompt blocks use CursorGothic (`font-sans`)
- Featured CTA points at `/slides`

## [0.3.1] - 2026-07-10

### Added

- Portable `components/ui` kit: pill `Button` (`primary` / `accent` / `secondary` / `ghost`), `Badge`, `TextLink`, flat `card-*` styles — see `docs/ui-kit.md` for Thailand port steps

### Changed

- CTAs use dark primary pills; orange reserved for Register / live actions
- Card hovers are hairline border only (no colored glow washes)
- Section headings use `font-normal tracking-tight` (Cursor display voice)

## [0.3.0] - 2026-07-09

### Added

- Hero tile accent washes and click-to-expand (FLIP) on the daily-seeded bento grid; Escape or second click collapses; respects `prefers-reduced-motion`
- Optional community tweets mosaic (`sections.communityTweets`, default `false`) via `react-tweet`
- `content/community-tweets.ts` for curated status URLs with relevance sorting
- Cached allowlisted API route at `/api/tweets/[id]`
- City-aware "Browse on X" search link derived from `siteConfig`
- `scripts/validate-community-tweets.ts` in `pnpm verify`; optional `scripts/smoke-tweets-api.mjs` via `pnpm test:smoke`

### Changed

- `BentoGrid` is interactive (expand/collapse) for all sites using the template hero
- CSP in `proxy.ts` allows Twitter image/media hosts when community tweets are enabled
- `next.config.js` adds `pbs.twimg.com` and `abs.twimg.com` to `images.remotePatterns`
- Community tweets load via dynamic import so the homepage does not ship `react-tweet` when the section is off
- README sites list → table with maintainers; Credits clarified (Created by / Contributors)
- Tweet API route times out upstream fetches; `pnpm verify` no longer runs live Twitter smoke (CI-safe)

### Notes for consumers

- Run `pnpm install` after pulling (`react-tweet` is a new dependency)
- Community tweets are **off by default** — no config change required for existing chapters
- Before enabling `sections.communityTweets: true`, replace the example seed URLs in `content/community-tweets.ts` with your chapter's posts; otherwise the mosaic shows global Cafe Cursor examples

## [0.2.0] - 2026-07-08

### Added

- Section toggles (`matchmaking`, `photoDisclaimer`, `lumaCalendar`)
- Seeded daily hero bento shuffle with `pnpm validate:bento`
- Coming-soon CTA for events without Luma URLs
- Slides sitemap support

### Changed

- Orange CTA tokens and reduced-motion handling

[0.3.0]: https://github.com/luisfer/cursor-ambassador-evergreen/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/luisfer/cursor-ambassador-evergreen/releases/tag/v0.2.0
