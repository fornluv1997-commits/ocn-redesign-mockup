# Ottawa Condo News — Redesign Mockup

A working, single-page mockup of a redesigned homepage for **Ottawa Condo News (OCN)**.
Built to match the layout intent from the May 2026 wireframe: editorial hero,
five featured sections, in-issue articles, trusted partner network, community
classifieds, newsletter CTA, and a full footer.

---

## How to view

Just open `index.html` in any modern browser — no build, no install.

```
Double-click  →  C:\Users\fornl\Documents\ottawa-condo-news-mockup\index.html
```

Or drag the file onto Chrome / Edge / Safari.

To view on a phone, host it (one of):
- **Easiest** — drop the folder onto [vercel.com/new](https://vercel.com/new) or [netlify.com/drop](https://app.netlify.com/drop)
- **GitHub Pages** — push the folder to a repo, enable Pages
- **Local network** — `python -m http.server 8000` in this folder, then open `http://<your-ip>:8000`

---

## What's inside

```
ottawa-condo-news-mockup/
├── index.html        Semantic HTML5, ~280 lines
├── assets/
│   ├── styles.css    Custom CSS (no framework, ~900 lines)
│   └── app.js        Mobile nav, scroll reveal, demo toasts
└── README.md
```

No CDN dependencies except Google Fonts (Playfair Display, Inter, Cormorant Garamond).

---

## Design system

| Token        | Value      | Use                                  |
|--------------|------------|--------------------------------------|
| `--navy`     | `#0f2c4a`  | Primary brand, headings, buttons     |
| `--gold`     | `#c9a44a`  | Editorial accent, italic words       |
| `--gold-soft`| `#f5b842`  | CTAs, highlight badges               |
| `--cream`    | `#f8f5ef`  | Section backgrounds                  |
| `--accent-blue` | `#1e6fd9` | Newsletter CTA, link tags          |
| Serif        | Playfair Display | All headings + magazine cover   |
| Sans         | Inter            | UI, body, nav                   |
| Editorial    | Cormorant Garamond | Italic taglines + captions    |

---

## Section map (top → bottom)

1. **Announcement bar** — current issue + jump link
2. **Sticky header** — logo, nav (5 sections), Subscribe / Read CTA
3. **Hero**
   - Left: Eyebrow, headline w/ italic "Condo", tagline, lead, 2 CTAs, 3 stat tiles
   - Right: Magazine cover preview (CSS-art skyline, no image needed)
4. **Featured Sections** — 5 circular icon cards (Legal · Maintenance · Living · Renovation · Local Trips)
5. **In This Issue** — large feature card + 5 article cards (May 2026 content)
6. **Trusted Services** (dark) — partner intro, 6 logo tiles, "Why partner" callout card
7. **Community Classifieds** — 4 cards (mix of marketplace items + community events)
8. **Stay Connected** (blue banner) — newsletter signup form
9. **Footer** — brand + about + social + 4 link columns + contact + legal bar

---

## What's working

- Fully responsive (1280 / 1024 / 760 / 460 breakpoints)
- Mobile nav drawer with body scroll lock
- Sticky header w/ scroll shadow
- Scroll-reveal animation (IntersectionObserver)
- Newsletter form (demo — shows success state, no backend)
- Magazine cover built entirely in CSS (no image asset needed)
- Accessible: semantic landmarks, focus-visible rings, ARIA labels, prefers-reduced-motion
- All buttons demonstrate intent via toast on click

---

## Handoff to a developer

This mockup is intentionally framework-free so any developer can port it to:

- **WordPress** — convert sections to ACF blocks or Gutenberg patterns
- **Next.js / Astro** — each section becomes a component (`<Hero/>`, `<FeaturedSections/>`, etc.)
- **Webflow / Framer** — replicate visually using the same tokens above

### Real assets to swap in later

- Magazine cover image → replace the `.cover__art` skyline CSS art
- Partner logos → swap `.logo-tile__mark` text with actual SVGs
- Featured-section icons → keep or swap with custom illustration set
- Article thumbnails → add real photos to `.issue-card__media`

### Backend integrations to wire

| Feature        | Suggested stack            |
|----------------|----------------------------|
| Newsletter     | Mailchimp / Substack / Beehiiv |
| Article CMS    | Sanity / Contentful / Wordpress headless |
| Classifieds    | Simple form → Airtable / Google Sheets |
| Analytics      | Plausible / Fathom (privacy-friendly) |

---

## Notes from your developer (me)

- Designed mobile-first, then progressively enhanced
- No layout-shifting properties animated — only `transform` + `opacity`
- All images are placeholder; final designer should provide:
  - 1 hero cover photo (replaces CSS skyline)
  - 5 section icon set (or commit to current line-icon style)
  - 6 partner logos as SVG
- Color/contrast ratios checked against WCAG AA on body text
- Print-ready CSS not included (out of scope for landing page)
