# Contributing

Thanks for helping improve the Cursor Ambassador Site Template.

## Setup

1. Fork this repository.
2. Clone your fork.
3. Install dependencies:

   ```bash
   pnpm install
   ```

4. Copy environment defaults:

   ```bash
   cp .env.example .env.local
   ```

5. Start development:

   ```bash
   pnpm dev
   ```

## Making Changes

- Keep UI components reusable and presentation-focused.
- Keep community-specific content in `content/` files.
- Use TypeScript for all code changes.
- Keep styling in Tailwind utility classes and existing design tokens.
- Avoid hardcoding city/community-specific values in `components/`.
- Keep the required template footer credit in `components/Footer.tsx` (see `NOTICE` / `ATTRIBUTION.md`).
- Do not re-add third-party event photography without credit and permission.
- Do not change the LICENSE copyright holder without discussion.

## Verification

Before submitting a PR, run:

```bash
pnpm verify
```

This runs format check, lint, typecheck, bento layout validation, and production build.

## Adding optional community tweets

1. Add status URLs to `content/community-tweets.ts` (replace the example seed).
2. Set `sections.communityTweets: true` in `content/site.config.ts`.
3. Add translation keys under `home.communityTweets*` in each locale JSON if you use i18n.

Only allowlisted tweet IDs are served by `/api/tweets/[id]`.

## Adding a New Locale

1. Add a new JSON file under `content/locales/`.
2. Add the locale code to `content/site.config.ts` in `locales`.
3. Add all translation keys used by components.
4. Verify language toggle behavior locally.

## Submitting a Pull Request

1. Create a focused branch from `main`.
2. Keep changes scoped to one concern where possible.
3. Run `pnpm verify` before submitting.
4. Open a PR with:
   - A clear summary
   - Screenshots for UI changes
   - Notes on any new config/content fields
