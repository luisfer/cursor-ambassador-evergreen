# Attribution

This template was created by [Luis Fernando Romero Calero](https://lfrc.me) ([@luisfer](https://github.com/luisfer)), adapted from [Cursor Thailand](https://cursorthailand.com).

Code is MIT (see `LICENSE`). Deployments and media follow `NOTICE`.

## Required footer credit

Any public site based on this template must show a visible footer credit. The default footer already includes it. If you customize the footer, keep an equivalent line:

```html
<p class="text-xs text-cursor-text-faint">
	Based on
	<a href="https://github.com/luisfer/cursor-ambassador-evergreen">Cursor Ambassador Evergreen</a>
	by
	<a href="https://lfrc.me">Luis Romero</a>
</p>
```

Plain text equivalent:

> Based on Cursor Ambassador Evergreen by Luis Romero (https://lfrc.me)

## Photos and media

- Hero / event slots under `public/images/events/` ship as **empty placeholders**. Replace them with your own chapter photos before launch.
- Do **not** copy Athita’s photography (or other named Thailand event photos) from Cursor Thailand or older template versions without permission and on-site credit.
- Partner logos and ambassador portraits should be your own assets.
- `public/images/cursor-wallpaper-norham-sunrise.jpg` is J. M. W. Turner, _Norham Castle, Sunrise_ (c. 1845) — Wikimedia / public domain. Credit stays in the image `alt` text.
- Replace `public/og.jpg` and `public/images/readme-banner.jpg` with your chapter art before production if you prefer not to ship the sample Cafe Cursor illustration.

## Already forked?

1. Add the required footer credit if it is missing.
2. Replace any real Cafe Cursor / Athita photographs you copied from earlier template versions with your own photos (or remove them).
3. Keep `LICENSE` and `NOTICE` in the repo.

## Launch checklist

- [ ] Edit `content/site.config.ts` (name, city, country, Luma, locales, description).
- [ ] Set `NEXT_PUBLIC_SITE_URL` for production.
- [ ] Replace placeholder images in `public/images/events/` (≥7 for the hero bento).
- [ ] Replace ambassador photos, partner logos, and sample events/recaps.
- [ ] Keep the template footer credit (or an equivalent visible line).
- [ ] Optional: enable `sections.communityQuotes` after adding real quotes in `content/community-quotes.ts`.
- [ ] Open a PR on this repo to add your site to the README table.
