# Cursor UI kit (`components/ui`)

Self-contained marketing primitives aligned with cursor.com (`/pricing`, `/download`, `/evals`).

**Portable:** this folder has no `siteConfig` / i18n / content imports. Copy the whole directory into Thailand (or any chapter) and swap imports.

## Files

| File                                   | Role                                                             |
| -------------------------------------- | ---------------------------------------------------------------- |
| `Button.tsx` + `button-styles.ts`      | Theme-aware pill CTAs: `primary`, `accent`, `secondary`, `ghost` |
| `Badge.tsx` + `badge-styles.ts`        | Status chips (`Coming soon`, live, etc.)                         |
| `TextLink.tsx` + `text-link-styles.ts` | Accent / muted links (`→` internal, `↗` external)                |
| `card-styles.ts`                       | Flat hairline cards — no colored glow                            |
| `cn.ts`                                | Tiny class joiner                                                |
| `index.ts`                             | Barrel export                                                    |

Related chrome (chapter-agnostic, also portable):

| File                         | Role                                                                 |
| ---------------------------- | -------------------------------------------------------------------- |
| `lib/theme-boot.ts`          | FOUC script + storage key (safe for server `layout.tsx`)             |
| `lib/theme.tsx`              | `ThemeProvider` + `useTheme` (`system` \| `light` \| `dark`)         |
| `components/ThemeToggle.tsx` | Footer segmented control (system / sun / moon)                       |

## Hierarchy

- **primary** — Join us, Featured CTA, Footer join, 404 home (high-contrast filled pill)
- **accent** — Register / live actions only (orange, rationed)
- **secondary** — Browse on X, Load more
- **ghost** — rare text actions

## Theme (light / dark / system)

Default preference is **`system`**. Resolved theme sets `data-theme="light|dark"` on `<html>` (cream vs espresso tokens in `app/globals.css`).

1. Mount `ThemeProvider` inside `Providers` (outside or wrapping i18n is fine).
2. Inject `THEME_BOOT_SCRIPT` from `lib/theme-boot.ts` in `app/layout.tsx` `<head>` before paint (`suppressHydrationWarning` on `<html>`).
3. Put `<ThemeToggle />` in the footer (cursor.com-style). Keep strings in locales (`footer.themeLabel`, `themeSystem`, `themeLight`, `themeDark`).
4. Any third-party chrome that needs dark (e.g. `react-tweet`) must read `useTheme().resolved`, not OS `matchMedia` alone.

Do not hardcode a chapter into light-only or dark-only; chapters may override storage key only if they must isolate preferences across multi-tenant hosts.

## Chapter craft

Respect intentional differences (bento hero, local photos, events). These rules keep packaging Cursor-like across 20+ countries:

1. **Featured / CTA band** — typographic hairline sections over twin heavy cards. Icons optional; do not treat Lucide icons as brand voltage.
2. **Accent voltage** — orange + warm ink / hairline only on marketing chrome. No purple (or other rainbow) hovers on ambassadors.
3. **Closing CTA** — wallpaper split is fine; use tight radius (`rounded-sm`), not soft `rounded-2xl` promo cards.
4. **Community proof** — prefer curated quotes (`sections.communityQuotes`) when you have real lines. Tweets stay optional (`sections.communityTweets`, default off). Masonry embeds are allowed but denser lists read closer to cursor.com.

## Thailand / chapter port

1. Copy `components/ui/`, `lib/theme-boot.ts`, `lib/theme.tsx`, `components/ThemeToggle.tsx`.
2. Wire Providers + layout FOUC script + footer toggle; adapt `globals.css` tokens to `data-theme` (same light/dark values you already have).
3. Flatten Featured (and any Subscribe twin) to hairline typography; sharpen ClosingCTA radius; remove non-orange accent hovers.
4. Point tweet embeds at resolved theme.
5. Keep chapter-only surfaces out of Evergreen defaults (local fonts, SubscribeCTA, real event photos, sample tweets).

Requires semantic `cursor-*` tokens from `globals.css`. Do not replace them with raw page colors.
