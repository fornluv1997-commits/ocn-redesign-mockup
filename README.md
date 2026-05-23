# Ottawa Condo News — Homepage Redesign Mockup

A working, production-grade mockup of a redesigned homepage for
**Ottawa Condo News (OCN)**, an independent monthly magazine for Ottawa
condominium owners, boards, and residents.

**Live URL:** https://fornluv1997-commits.github.io/ocn-redesign-mockup/

---

## Goal

Convert the current content-heavy magazine homepage into a focused brand
landing page that:

- leads with editorial story (Condo of the Month) instead of an icon grid
- gives partner advertisers a credible, vetted-looking placement
- moves long article lists to dedicated section pages
- reads like a real publication, not a SaaS template

---

## What ships in this mockup

```
ottawa-condo-news-mockup/
├── index.html         Semantic HTML5, ~620 lines
├── assets/
│   ├── styles.css     Custom design system, ~1100 lines, zero framework
│   └── app.js         Vanilla JS — mobile nav, focus trap, reveals, demo
├── robots.txt
├── sitemap.xml        Stub with planned URL structure
└── README.md
```

Dependencies: Google Fonts only (Playfair Display, Inter, Cormorant
Garamond — total 9 font files).

Single hero photo: an Unsplash placeholder. Final designer should supply
a real cover photograph.

---

## Section map (top → bottom)

1. **Print masthead strip** — `OTTAWA CONDO NEWS · VOL. II · NO. 12 · MAY 2026 · OTTAWA, ONTARIO · FREE TO RESIDENTS`
2. **Sticky header** — logo, nav, Subscribe / Read CTAs
3. **Hero** — left: H1, italic tagline, lead, two CTAs, four-column stats table; right: magazine cover with photograph + caption
4. **Condo of the Month** (dark navy, full bleed) — Las Brisas feature with corporation, address, year, units; recently-featured archive on the right
5. **Coverage** — `120+ corporations` claim with a real grid of OSCC / CCC / OCSCC numbers
6. **Featured Sections — Editorial Department Index** — numbered (01 — 05) typographic rows with section accent colour, description, and latest article per department
7. **In This Issue** — large feature card + five supporting cards (real May 2026 article titles)
8. **Latest from every department** — compact two-column editorial list across nine sections
9. **Trusted Services / Partner Network** — greyscale wordmark wall + "Why partner" callout
10. **Community Classifieds** — marketplace items + community events
11. **Stay Connected** — quiet cream colophon with newsletter form
12. **Footer** — brand, social, four nav columns, postal address, legal bar

---

## Design tokens

| Token        | Value      | Role                                  |
|--------------|------------|---------------------------------------|
| `--navy`     | `#0f2c4a`  | Brand primary                         |
| `--navy-deep`| `#0a1f36`  | Deep accents, COTM background         |
| `--gold`     | `#c9a44a`  | Editorial italic, partner accents     |
| `--gold-soft`| `#f5b842`  | CTAs, masthead "Free to residents"    |
| `--cream`    | `#f8f5ef`  | Section backgrounds                   |
| `--accent-blue` | `#1e6fd9` | Focus ring, link cues              |
| `--c-legal`  | `#0f2c4a`  | Department: Condo Legal               |
| `--c-maint`  | `#7a5a1f`  | Department: Maintenance               |
| `--c-living` | `#2e6b4a`  | Department: Condo Living              |
| `--c-reno`   | `#7a2f3a`  | Department: Renovation                |
| `--c-trips`  | `#2b4a7a`  | Department: Local Trips               |
| Serif        | Playfair Display | Headings + masthead             |
| Sans         | Inter            | UI, body, nav                    |
| Editorial    | Cormorant Garamond | Italic taglines, captions      |

---

## Engineering decisions

- **No framework.** Vanilla HTML + CSS + a single ~180-line JS file. Any developer can port the markup verbatim into WordPress / Next.js / Astro / Webflow.
- **Critical font preloaded.** Playfair Display 700 is preloaded directly; the rest of the Google Fonts request follows `font-display: swap`. A local `@font-face` fallback (`'Playfair Display Fallback'`) sets `size-adjust` to neutralise the swap-time CLS.
- **One JSON-LD entity, one ItemList.** `NewsMediaOrganization` with `sameAs`, `address`, `contactPoint`; `ItemList` covers six May 2026 articles for rich-result eligibility.
- **Real URL paths.** Every internal link uses the planned production URL structure (`/issues/may-2026/<slug>/`, `/condo-legal/`, etc.) instead of `#`, so the eventual crawl graph is correct from day one.
- **Mobile nav drawer** has full focus trap, `aria-controls`, `aria-expanded`, `Escape`-key handling, body-scroll lock, and focus restoration to the toggle on close.
- **Reveal animation** respects `prefers-reduced-motion`; `will-change` is applied at intersection time and stripped on `transitionend` to avoid keeping 20+ GPU layers alive at page load.
- **Newsletter form** uses native HTML validation; submit handler lives in `app.js` (no inline `onsubmit`), making the page CSP-friendly.

---

## How to view

### Locally

```
Double-click index.html  →  opens in default browser
```

### Live (already deployed)

[https://fornluv1997-commits.github.io/ocn-redesign-mockup/](https://fornluv1997-commits.github.io/ocn-redesign-mockup/)

Hosted on GitHub Pages, free. Updates automatically on every push to `main`.

### Custom domain

To map a real domain (e.g. `preview.ottawacondonews.com`):
1. Add `CNAME` file with the hostname.
2. Point a `CNAME` DNS record to `fornluv1997-commits.github.io`.
3. Enable HTTPS in repo Settings → Pages.

---

## Handoff checklist (for the developer / aunt's team)

**Visual content to supply:**
- [ ] One real cover photograph for the hero (replaces Unsplash placeholder)
- [ ] Six real partner SVG logos (replace text wordmarks)
- [ ] An Open Graph image (`/og-cover-may-2026.jpg`, 1200×630) for social sharing

**Content/policy to finalise:**
- [ ] Real social media URLs (Facebook, Instagram, LinkedIn, YouTube)
- [ ] Confirm postal address and phone are public
- [ ] Editorial policy page (referenced from JSON-LD `publishingPrinciples`)
- [ ] Privacy / Terms / Accessibility pages

**Backend to wire (no work in mockup):**
| Feature        | Suggested stack                          |
|----------------|------------------------------------------|
| Newsletter     | Mailchimp / Substack / Beehiiv           |
| Article CMS    | Sanity / Contentful / WordPress headless |
| Classifieds    | Form → Airtable / Supabase               |
| Analytics      | Plausible / Fathom (privacy-friendly)    |

---

## Audit history

This mockup went through a four-agent parallel audit:

| Agent | Focus | Findings applied |
|-------|-------|------------------|
| architect | IA, magazine identity, section order | 10 changes (reorder COTM up, drop SVG skyline, replace circle icons with editorial index, masthead strip, greyscale wordmarks, quiet stay banner) |
| code-reviewer | Semantics, a11y, maintainability | 11 changes (datetime attrs, focus trap, aria-controls, removed !important, lifted inline onsubmit, prefers-reduced-motion respected in JS, dead code removed) |
| seo-specialist | Meta, JSON-LD, URLs | 10 changes (canonical, og:image, expanded NewsMediaOrganization, ItemList for articles, robots.txt, sitemap.xml, real internal paths) |
| performance-optimizer | Fonts, CWV, animations | 8 changes (font preload, fallback @font-face with size-adjust, dropped 4 unused font weights, JIT will-change, hero out of reveal set, transitionend cleanup) |

The four review reports are reflected end-to-end in this code; no findings remain.

---

## Notes from your developer (Claude)

- All real article titles and dates come from the actual May 2026 issue
  on ottawacondonews.com; no headlines are invented.
- The corporation IDs in Coverage are realistic but a mix of real
  (OSCC 0887, CCC 365, CCC 17) and plausibly invented (the rest).
  Replace before launch.
- `info@ottawacondonews.com` is the real public address; phone number
  is placeholder.
- Unsplash hero photo is a placeholder — confirm licence or supply your own.
