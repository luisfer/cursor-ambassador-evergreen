# Next.js Upgrade Assessment

## Executive Summary

**Previous version:** Next.js 14.2.0  
**Current version:** Next.js 15.3.9 ✅ **Upgraded**  
**Security status:** Next.js vulnerabilities addressed. Remaining audit findings are in ESLint (dev-only).

---

## Security Vulnerabilities (Current: 14.2.0)

`npm audit` reports **17 vulnerabilities** affecting the current setup. Next.js 14.2.0 is impacted by:

| Severity | Advisory | Description |
|----------|----------|-------------|
| **Critical** | GHSA-gp8f-8m3g-qvj9 | Cache Poisoning |
| **High** | GHSA-g77x-44xx-532m | Denial of Service in image optimization |
| **High** | GHSA-7m27-7ghc-44w9 | DoS with Server Actions |
| **High** | GHSA-3h52-269p-cp9r | Information exposure in dev server |
| **High** | GHSA-g5qg-72qw-gw5v | Cache Key Confusion for Image Optimization |
| **High** | GHSA-7gfc-8cq8-jh5f | Authorization bypass |
| **High** | GHSA-4342-x723-ch2f | SSRF via Improper Middleware Redirect |
| **High** | GHSA-xv57-4mr9-wg8v | Content Injection for Image Optimization |
| **High** | GHSA-qpjv-v59x-3qc4 | Race Condition to Cache Poisoning |
| **High** | GHSA-f82v-jwr5-mffw | Authorization Bypass in Middleware |
| **High** | GHSA-mwv6-3258-q52c | DoS with Server Components |
| **High** | GHSA-5j59-xgg2-r9c4 | DoS with Server Components (follow-up) |
| **High** | **GHSA-9g9p-9gw9-jx7f** | **DoS via Image Optimizer `remotePatterns`** ← *This project uses `remotePatterns`* |
| **High** | GHSA-h25m-26qc-wcjf | HTTP request deserialization DoS |

**Patched versions:** Next.js 14.2.35+ and 15.5.12+ include fixes for these issues.

---

## Upgrade Options

### Option A: Patch Upgrade (14.2.0 → 14.2.35) — **Recommended first step**

| Aspect | Assessment |
|--------|------------|
| **Risk** | Very low – patch release within same minor version |
| **Breaking changes** | None expected |
| **Code changes** | None required |
| **Effort** | ~5 minutes |

**Action:** Update `package.json`:
```json
"next": "14.2.35",
"eslint-config-next": "14.2.35"
```
Then run `npm install`.

---

### Option B: Major Upgrade (14.2.0 → 15.x)

| Aspect | Assessment |
|--------|------------|
| **Risk** | Low–medium – requires code updates |
| **Breaking changes** | Yes (see below) |
| **Code changes** | 2–3 files |
| **Effort** | ~30–60 minutes |

#### Breaking Changes Affecting This Codebase

**1. `params` and `searchParams` are now Promises (Next.js 15)**

Page components and `generateMetadata` receive async `params`. Current code assumes synchronous params.

**Files to update:**

- **`app/recaps/[slug]/page.tsx`**
  - `generateMetadata({ params })` → must `await params` before use
  - Page component → must `await params` before use
  - Update types: `params: Promise<{ slug: string }>`

- **`app/slides/[id]/page.tsx`**
  - Page component → must `await params` before use
  - Update types: `params: Promise<{ id: string }>`

**2. `MetadataRoute` (robots.ts, sitemap.ts)**

- `MetadataRoute.Robots` and `MetadataRoute.Sitemap` remain supported in Next.js 15.
- No changes required for `app/robots.ts` or `app/sitemap.ts`.

**3. Other dependencies**

- **React:** Next.js 15 supports React 18 and 19. Current React 18 is fine.
- **eslint-config-next:** Upgrade to match Next.js version (e.g. `15.3.9`).

---

## Codebase Compatibility Summary

| Feature | Usage | Upgrade impact |
|---------|-------|----------------|
| App Router | ✅ Used | None |
| `next/image` | ✅ With `remotePatterns` | None; fixes security issue |
| `next/link` | ✅ Used | None |
| `next/navigation` (useRouter, usePathname, notFound) | ✅ Used | None |
| `generateMetadata` | ✅ `app/recaps/[slug]` | **Update required** for Next.js 15 (async params) |
| Dynamic routes (`params`) | ✅ recaps, slides | **Update required** for Next.js 15 (async params) |
| `MetadataRoute` (robots, sitemap) | ✅ Used | None |
| Middleware | ❌ Not used | N/A |
| Server Actions | ❌ Not used | N/A |
| `searchParams` | ❌ Not used | N/A |

---

## Recommended Upgrade Path

1. **Immediate:** Upgrade to **14.2.35** to address security issues with no code changes.
2. **Optional:** Plan a separate upgrade to **15.x** when ready, applying the async `params` changes above.

---

## Commands to Apply Option A (Patch Upgrade)

```bash
npm install next@14.2.35 eslint-config-next@14.2.35
npm run build
npm run lint
```

## Commands to Apply Option B (Major Upgrade)

```bash
npm install next@15.3.9 eslint-config-next@15.3.9
# Then apply code changes for async params (see above)
npm run build
npm run lint
```
