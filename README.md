# Ejt Legacy Homes — Website

Static marketing site for **Ejt Legacy Homes**, a custom home builder / general contractor.
Hand-built semantic HTML + one CSS file + vanilla JS. **No build step** — it deploys as-is from
the repo root on **GitHub Pages** at `ejtlegacyhomes.com`.

## Stack & structure
```
/ (repo root)
├── CNAME                     ← binds ejtlegacyhomes.com — DO NOT delete or rename
├── .nojekyll                 ← tells Pages to skip Jekyll
├── index.html                ← the whole site (single-page scroll)
├── robots.txt
├── sitemap.xml
├── site.webmanifest
├── assets/
│   ├── css/styles.css
│   ├── js/main.js
│   ├── img/                  ← hero, project, about, OG images (placeholders → REPLACE)
│   └── icons/                ← favicon.svg, favicon-32.png, apple-touch-icon.png, icon-512.png
└── README.md
```

## Local preview
No tooling required. From the repo root:
```bash
python3 -m http.server 8000
```
Then open <http://localhost:8000>. (Use a local server rather than opening the file directly so
the root-relative `/assets/...` paths and `fetch()` form submit behave like production.)

## Deploy (GitHub Pages)
Settings → Pages → Deploy from branch → `main` / root. Commit + push to `main`; Pages rebuilds
automatically. The `CNAME` file keeps the custom domain bound — **never delete it.**

## Design notes
- **Palette:** warm ivory `#F6F2E9`, charcoal ink `#161513`, single antique-brass accent `#9A7B4A`.
  Tokens live at the top of `assets/css/styles.css` (`:root`) — change them in one place.
- **Type:** Cormorant Garamond (display serif), Cinzel (engraved caps / wordmark), Inter (body),
  loaded via Google Fonts.
- **Logo:** the EJT Legacy wordmark is recreated as live, scalable text (`.wordmark` component in
  the header & footer). To use the official artwork instead, drop an SVG/PNG in `assets/img/` and
  swap the `.wordmark` markup for an `<img>`.

---

# ✅ Go-live checklist — placeholders to fill in

Search the repo for `[[` to jump to every placeholder. Replace each, then delete the brackets.

### Contact & identity
- [ ] **Owner / GC name** — `index.html` (Why Us section, about image alt)
- [ ] **Phone** — appears in: nav, mobile drawer, CTA band, contact card, form fallback, footer,
      and JSON-LD. Fill both the **display** form (`[[PHONE — FILL IN]]`) and the **`tel:` digits-only**
      form (`[[PHONE — DIGITS ONLY]]`, e.g. `18135550100`).
- [ ] **Email** — contact card, form fallback, footer, JSON-LD
- [ ] **Street address + City, State ZIP** — contact card, footer, JSON-LD
- [ ] **State contractor license #** — trust bar, FAQ, footer, JSON-LD (`[[LICENSE # — FILL IN]]`)

### Location & service area
- [ ] **Service area / region** — `[[SERVICE AREA]]` and `[[REGION]]` in title, meta description,
      OG tags, hero, why-us, footer
- [ ] **Service-area city/county list** — Service Area section (6 items) + JSON-LD `areaServed`

### Trust / stats (only if true — do not invent)
- [ ] **Years building**, **homes delivered**, **client rating** — trust bar `[[#]]` values
- [ ] **Association badges** — NAHB / local builders association / BBB (remove any that don't apply)

### Content
- [ ] **Cost / timeline / financing / warranty answers** — FAQ section (fill the bracketed guidance)
- [ ] **Testimonials** — 2 quotes with client name + project type (real only; remove if none yet)
- [ ] **About / owner paragraph** — Why Us section

### Form
- [ ] **Web3Forms access key** — `[[WEB3FORMS_ACCESS_KEY — FILL IN]]` (hidden input in the contact
      form). Get a free key at <https://web3forms.com> (no account needed — enter your email, it
      mails you the key). This key is public by design; it's safe in client code. Until it's set,
      the form shows a friendly "email/call us instead" message instead of submitting.

### Social
- [ ] **Instagram / Facebook / Houzz / Google Business Profile URLs** — footer icons + JSON-LD `sameAs`

### Images — replace placeholders in `assets/img/`
Current images are clearly-labeled **REPLACE ME** SVG placeholders. Swap each for a real,
optimized photo (JPG/WebP recommended; keep `loading="lazy"` and update `alt` text + captions):
- [ ] `hero.svg` → hero shot of a finished home (update `<img src>` in the hero)
- [ ] `project-1…6.svg` → real portfolio photos (update each tile's `src`, `data-full`, `alt`, captions, and `data-cat` filter)
- [ ] `about.svg` → owner/team/job-site photo (Why Us)
- [ ] `og-image.png` → optional: replace with a branded photo composition (1200×630)
- [ ] **Favicon / app icons** — regenerate from your real logo if desired (`assets/icons/`)

### Optional
- [ ] **Analytics** — not included. To add GA4 or Plausible, paste the snippet just before `</head>`
      in `index.html`.
- [ ] **Add real project pages** — if the portfolio grows, consider splitting into `/projects.html`.

> ⚠️ Do not invent license numbers, awards, years in business, addresses, or reviews. Leave a
> placeholder until you have the real value.
