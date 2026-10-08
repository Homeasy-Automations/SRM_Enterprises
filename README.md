# SRM ENTERPRISES — Industrial Packaging Materials Website

**Complete Packaging Solutions Under One Roof**
*Your Complete Packaging Material Partner*

A production-ready monorepo: a Next.js 14 (App Router) marketing site, an Express + TypeScript
API, MongoDB Atlas storage for contact/quote inquiries, and Resend for transactional email.

There is deliberately **no admin panel, no authentication, no newsletter or subscriber system,
and no public read/update/delete endpoints**. Inquiries are submitted through the website and
reviewed directly in MongoDB Atlas.

---

## Table of contents

1. [Overview](#1-overview)
2. [Feature list](#2-feature-list)
3. [Tech stack](#3-tech-stack)
4. [Folder structure](#4-folder-structure)
5. [Install](#5-install)
6. [Environment variables](#6-environment-variables)
7. [MongoDB Atlas setup](#7-mongodb-atlas-setup)
8. [Viewing and managing inquiries in Atlas](#8-viewing-and-managing-inquiries-in-atlas)
9. [Resend setup](#9-resend-setup)
10. [Development commands](#10-development-commands)
11. [Production build](#11-production-build)
12. [Deployment order and every variable](#12-deployment-order-and-every-variable)
13. [API documentation](#13-api-documentation)
14. [Security notes](#14-security-notes)
15. [Accessibility, performance and responsive behaviour](#15-accessibility-performance-and-responsive-behaviour)
16. [Colour and animation system](#16-colour-and-animation-system)
17. [Placeholders to replace before launch](#17-placeholders-to-replace-before-launch)
18. [Verified build results and known limitations](#18-verified-build-results-and-known-limitations)
19. [Definition of done](#19-definition-of-done)

---

## 1. Overview

SRM Enterprises provides complete industrial packaging solutions and supplies them
across **Pan India**. This project is the public website plus the small
backend it genuinely needs:

- **Five product categories** — Corrugated Packaging, EPE Foam Packaging, LDPE Bubble &
  Protective Packaging, Poly Bags/Films & Flexible Packaging, Packaging Accessories.
- **Six industries** — Automotive & Auto Components, Engineering & Industrial, Electrical &
  Electronics, Pharmaceuticals, Food & FMCG, E-Commerce & Logistics.
- **One real, working quote pipeline** — the website form posts to the Express API, the inquiry
  is saved to MongoDB Atlas, then two emails are sent through Resend (notification to SRM,
  confirmation to the customer).

The copy is intentionally factual: no certifications, awards, client names, years of experience,
capacity figures, statistics or testimonials are claimed anywhere. Where a number would normally
be used for decoration, this site uses illustration and layout instead.

---

## 2. Feature list

### Pages (all rendered and shareable)

| Route | Notes |
| --- | --- |
| `/` | Hero, capability strip, about preview, 5-category showcase, why-us, industries, process timeline, gradient CTA |
| `/about` | Hero ("Packaging Supply Built Around Your Business"), what we provide, capabilities, industries, quality & supply philosophy, why businesses choose SRM, CTA |
| `/products` | Category overview grid, one full section per category, custom packaging, process, requirement CTA |
| `/products/[slug]` | One template for all five categories: range, customisation, protection/quality, applications, industries, related categories, `Request Quote → /contact?product=<slug>` |
| `/industries` | Industry grid + one section per industry (challenges, solutions, links to categories) + approach + CTA |
| `/industries/[slug]` | One template for all six industries: challenges, recommended packaging, category links, protection & supply approach, custom packaging, CTA |
| `/custom-packaging` | "Packaging Designed for Your Product": why custom, requirement assessment, material selection, dimensions & thickness, printing & branding, sample approval, production & bulk supply, interactive timeline, CTA |
| `/why-us` | Quality, customisation, competitive value, supply reliability, complete packaging solutions, industrial support, CTA |
| `/contact` | Hero with live API status, contact details, quote form, service area, WhatsApp CTA, FAQ accordion |
| `/privacy`, `/terms` | Complete template policies marked for legal review |
| `not-found.tsx`, `error.tsx`, `loading.tsx` | 404, error boundary and route skeleton |
| `sitemap.xml`, `robots.txt` | Generated from the data files (20 URLs) |

### Frontend

- Next.js 14 App Router, React 18, TypeScript strict mode, Tailwind CSS, Framer Motion, Lucide
  React, React Hook Form + Zod, `next/image`, `next/font` (Space Grotesk headings, Inter body).
- Fully responsive from 320 px to 2560 px+: swipeable industry rail on phones, asymmetric
  desktop grids, 44 px+ touch targets, no horizontal overflow (`overflow-x: clip`).
- Every visual is an inline SVG/CSS illustration — no external image dependency can break, and
  a typed `lib/image-config.ts` lets real photographs be dropped in later without code changes.
- SEO: per-page metadata, canonical URLs, Open Graph/Twitter, sitemap, robots, and JSON-LD
  (`Organization`, `BreadcrumbList`, `ItemList`, `Product` — never ratings or prices).
- Analytics-ready: GA, GTM and Meta Pixel load **only** when their env IDs exist;
  `trackEvent` covers page view, quote form start, quote submission, WhatsApp click, phone
  click, product view and CTA click.

### Backend

- Express 4 + TypeScript, Mongoose 8 (MongoDB Atlas), Zod (shared with the frontend), Resend,
  helmet, cors, express-rate-limit, express-mongo-sanitize, compression, pino, dotenv.
- One public write endpoint (`POST /api/inquiries`) plus `GET /api/health`. No read endpoints.
- Repository/service/controller layering so a new collection needs only a model, repository,
  service, route and controller.
- Emails are attempted **after** the inquiry is stored: an email outage never loses a lead and
  the whole truth is recorded in `emailStatus`.
- Honeypot submissions return the normal success response but are silently discarded.

### Colour, motion and interaction (all requested features implemented)

1. Each product card/page owns its category colour; hover transitions background wash, border,
   icon, button and shadow to that colour.
2. Page-level accent shift: hero blobs, underlines, buttons and links shift to the category
   colour on each product page, and follow the scroll position through the homepage showcase.
3. Animated gradient text on key headlines (slow hue pan).
4. Navbar active link, underline and CTA shift colour on hover and as you scroll the showcase.
5. Floating "Color Mood" swatch button with four **light** palettes (Ocean, Citrus, Meadow,
   Berry) that rewrites the CSS variables site-wide with a smooth transition — held in React
   state only, never localStorage.
6. Industry cards go from white to their own colour wash on hover with the icon inverting to white.

Motion: staggered hero word reveal, floating SVG packaging illustrations, rotating tagline,
animated blobs, CTA shine sweep, scroll reveals (fade-up, clip-path, side slide, scale-in) with
staggered children, card lift + 3D tilt + gradient border + ripple, drawing process timeline,
infinite marquees, magnetic buttons, wavy dividers, floating WhatsApp/Call/scroll-to-top with a
progress ring, top scroll-progress bar, box-folding loading screen (max ~1.2 s), route
transitions with a coloured wipe panel, and `prefers-reduced-motion` support throughout.

---

## 3. Tech stack

| Layer | Technology |
| --- | --- |
| Frontend | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS 3, Framer Motion 11, Lucide React, React Hook Form + Zod, next/image, next/font |
| Backend | Node.js 18+, Express 4, TypeScript, Mongoose 8, Zod, Resend, helmet, cors, express-rate-limit, express-mongo-sanitize, pino, compression, dotenv |
| Database | MongoDB Atlas (single `contactinquiries` collection) |
| Email | Resend (HTTP API — never SMTP, because hosting platforms such as Render block outbound SMTP ports) |
| Tooling | npm workspaces, ESLint, Prettier (+ Tailwind class sorting), tsup (API bundle), tsx (API dev) |
| Hosting | Frontend → Vercel · Backend → Render/Railway/any Node host · Database → MongoDB Atlas · Email → Resend |

---

## 4. Folder structure

```
srm-enterprises/
├── package.json                     # Root scripts for running/building both
├── .gitignore                       # Ignores .env and .env.local
├── README.md
│
├── frontend/                        # Standalone Next.js Frontend (Vercel / Netlify)
│   ├── package.json                 # Independent package.json (no workspace dependencies)
│   ├── tsconfig.json                # Standalone TSConfig with local path aliases
│   ├── .env.example / .env.local
│   ├── next.config.mjs
│   ├── tailwind.config.ts
│   ├── app/                         # App router pages & layouts
│   ├── components/                  # UI, navigation, sections, forms, art
│   ├── config/                      # Brand, routes, colors & limit constants
│   ├── types/                       # Shared domain types
│   ├── shared/                      # Inquiry validation schema & constants
│   ├── data/                        # Catalog products, industries, FAQs
│   ├── hooks/                       # UI hooks
│   └── public/                      # Static assets & images
│
└── backend/                         # Standalone Express API (Render / Railway / Docker)
    ├── package.json                 # Independent package.json (no workspace dependencies)
    ├── tsconfig.json                # Standalone TSConfig
    ├── tsup.config.ts               # Bundles self-contained dist/server.js
    ├── Dockerfile                   # Standalone container build
    ├── .env.example / .env
    └── src/
        ├── app.ts                   # Express app & middleware chain
        ├── server.ts                # Bootstrap, MongoDB connection, listeners
        ├── config/                  # env.ts, db.ts, cors.ts
        ├── controllers/             # health & inquiry controllers
        ├── routes/                  # /api/health & /api/inquiries
        ├── models/                  # Mongoose ContactInquiry model
        ├── shared/                  # Embedded shared types, config & validation schemas
        ├── services/                # Inquiry & mailer services (Resend)
        └── emails/                  # Transactional email templates
```

---

## 5. Install

Requirements: Node.js **18.18+** (tested on Node 20), npm 9+.

```bash
git clone <your-repo-url> srm-enterprises
cd srm-enterprises
npm install            # installs every workspace at once
```

Then create the two env files:

```bash
cp apps/web/.env.example apps/web/.env.local
cp services/api/.env.example services/api/.env
```

Fill in `apps/web/.env.local` (site URL, API URL, WhatsApp/phone) and `services/api/.env`
(MongoDB URI, CORS client URL, Resend key, receiver email, IP hash salt).

---

## 6. Environment variables

### `apps/web/.env.local`

| Variable | Required | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_API_URL` | yes | Public origin of the Express API, **no trailing slash** (e.g. `https://api.your-domain.com`). Leave empty to call the API relatively on the same origin (`/api/...`) when a reverse proxy is used. |
| `NEXT_PUBLIC_SITE_URL` | yes | Canonical site URL used for metadata, sitemap, robots and JSON-LD. No trailing slash. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | no | **Digits only** with country code, e.g. `919876543210`. Builds `https://wa.me/<digits>`. If empty, WhatsApp and Call buttons are **hidden** instead of linking to an invalid number. |
| `NEXT_PUBLIC_PHONE_NUMBER` | no | Display phone number (e.g. `+91 98765 43210`). If empty, call buttons are hidden and the placeholder text is shown. |
| `NEXT_PUBLIC_GA_ID` | no | Google Analytics ID. Loaded only when present. |
| `NEXT_PUBLIC_GTM_ID` | no | Google Tag Manager ID. Loaded only when present. |
| `NEXT_PUBLIC_META_PIXEL_ID` | no | Meta Pixel ID. Loaded only when present. |
| `API_PROXY_TARGET` | no | **Server-side only.** When set, this Next app proxies `/api/*` to that origin (e.g. `http://localhost:5000`). Read at **build time**, so set it before `next build`. |

### `services/api/.env`

| Variable | Required | Purpose |
| --- | --- | --- |
| `PORT` | yes | Port for the API (`5000` in development). |
| `NODE_ENV` | yes | `development` \| `test` \| `production`. Controls logging, rate-limit strictness and CORS localhost allowance. |
| `MONGODB_URI` | yes | MongoDB Atlas connection string. Must start with `mongodb://` or `mongodb+srv://`. |
| `CLIENT_URL` | yes | Comma-separated list of allowed browser origins. Trailing slashes are stripped and **www/apex variants are added automatically**. |
| `RESEND_API_KEY` | yes | Resend API key (`re_...`). The only email transport used. |
| `RESEND_FROM_EMAIL` | yes | From address on a **verified Resend domain**, e.g. `SRM Enterprises <noreply@your-domain.com>`. |
| `CONTACT_RECEIVER_EMAIL` | yes | Sales inbox that receives inquiry notifications. |
| `IP_HASH_SALT` | yes | Long random string used to hash visitor IPs (raw IPs are never stored). |
| `LOG_LEVEL` | no | pino level (`info` default). |
| `TRUST_PROXY` | no | Express `trust proxy` setting — `1` behind Render/Railway/Vercel. |

There are **no JWT, admin or authentication variables** anywhere in this project.

The API validates all of this at boot with Zod and **exits with a clear message** listing every
missing or invalid variable, so a misconfigured deploy fails immediately instead of at the first
form submission.

---

## 7. MongoDB Atlas setup

1. Create a free (or paid) cluster at <https://cloud.mongodb.com>.
2. **Database Access** → add a database user with a strong password.
   Grant it only **`readWrite`** on the site database (`srm-enterprises`) — not
   `Atlas admin` and not cluster-wide. It only needs to write one collection.
3. **Network Access** → add the outbound IPs of your API host. Render/Railway provide static
   outbound IPs on paid plans; on free tiers you may have to allow a broader range. Prefer the
   narrowest rule that works, and review it periodically.
4. Copy the connection string (`mongodb+srv://…`) and set `MONGODB_URI` on the API host,
   appending the database name, e.g.
   `mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/srm-enterprises?retryWrites=true&w=majority`
5. That is the whole setup. The API creates the `contactinquiries` collection on first write and
   indexes are declared in the model (`email`, `createdAt` desc, `status`, `productCategory`, plus
   the two compound indexes used for filtering).

---

## 8. Viewing and managing inquiries in Atlas

There is no admin dashboard by design. Use Atlas directly:

**A. Atlas UI (Data Explorer)**
1. Atlas → **Database** → **Browse Collections** → `srm-enterprises` → `contactinquiries`.
2. Filter, sort and edit inline. Change `status` using its enum values: `new` → `contacted` →
   `quoted` → `closed`.
3. `emailStatus.adminSent` / `emailStatus.customerSent` tell you whether the emails went out;
   `emailStatus.lastError` holds the delivery error when one occurred (the inquiry is still saved).

**B. mongosh (Atlas → Connect → Shell)**

```javascript
use("srm-enterprises")

// newest first
db.contactinquiries.find().sort({ createdAt: -1 }).limit(20)

// open, uncontacted inquiries for one category
db.contactinquiries.find({ status: "new", productCategory: "corrugated-packaging" })

// inquiries where an email failed
db.contactinquiries.find({ "emailStatus.lastError": { $exists: true } })

// mark as contacted
db.contactinquiries.updateOne({ _id: ObjectId("...") }, { $set: { status: "contacted" } })

// today's inquiries
db.contactinquiries.countDocuments({ createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) } })
```

**C. CSV export (`mongoexport`)**

```bash
mongoexport \
  --uri="mongodb+srv://user:pass@cluster0.xxxxx.mongodb.net/srm-enterprises" \
  --collection=contactinquiries \
  --type=csv \
  --fields=createdAt,name,companyName,email,phone,whatsapp,productCategory,material,quantity,size,thickness,application,message,status,source \
  --out=inquiries.csv
```

---

## 9. Resend setup

1. Create an account at <https://resend.com> and an API key (`re_...`).
2. **Domains** → add your domain (e.g. `your-domain.com`) and add the DNS records it shows
   (SPF/DKIM, and DMARC if you want stronger deliverability). Wait for verification.
3. Set `RESEND_FROM_EMAIL` to an address **on that verified domain**, e.g.
   `SRM Enterprises <noreply@your-domain.com>`.
4. Set `CONTACT_RECEIVER_EMAIL` to the inbox that should receive inquiry notifications.
5. ⚠️ **Until your domain is verified, Resend only delivers to the email address you signed up
   with.** Test with that address; customer confirmations to other addresses will fail until the
   domain is verified. Email failures never lose an inquiry — they are recorded in
   `emailStatus.lastError` and visible in the API logs.
6. Two emails are sent per submission:
   - **Notification to SRM** — subject `New Packaging Inquiry — <Product> — <Name>`, with
     Reply-To set to the customer, so replying straight from the inbox answers the customer.
   - **Confirmation to the customer** — subject
     `Your Packaging Inquiry Has Been Received — SRM Enterprises`, with a summary of what they
     submitted.

Both templates are table-based HTML with inline CSS, a light colourful brand header, a plain-text
fallback, and every user-supplied value HTML-escaped.

---

## 10. Development commands

### Option A: Run Both Together from the Root
```bash
npm install          # installs frontend & backend dependencies
npm run dev          # starts frontend (3000) and backend (5000) concurrently
```

### Option B: Run Frontend and Backend Independently

**Frontend only:**
```bash
cd frontend
npm install
npm run dev          # runs Next.js on http://localhost:3000
```

**Backend only:**
```bash
cd backend
npm install
npm run dev          # runs Express API on http://localhost:5000
```

Local URLs:
- Website: <http://localhost:3000>
- Backend API Health: <http://localhost:5000/api/health>

---

## 11. Production build

```bash
# Build both
npm run build

# Or build individually
npm run build:frontend     # builds frontend (.next)
npm run build:backend      # builds backend (dist/server.js)
```

---

## 12. Hosting and Deployment

Because the frontend and backend are completely decoupled into their own standalone folders with zero internal workspace dependencies, you can host them independently on any platform!

### 🌐 Frontend Hosting (Vercel)
1. In Vercel, connect your repository.
2. In **Project Settings**:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Next.js
   - **Build Command:** `next build`
3. In **Environment Variables**:
   - `NEXT_PUBLIC_API_URL` = Your deployed backend API URL (e.g. `https://srm-backend.onrender.com`)
   - `NEXT_PUBLIC_SITE_URL` = Your production domain (e.g. `https://www.srmenterprises.com`)
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `919876543210`
   - `NEXT_PUBLIC_PHONE_NUMBER` = `+91 98765 43210`
4. Click **Deploy**.

---

### 🖥️ Backend Hosting (Render / Railway / VPS / Docker)
1. On Render or Railway, create a new Web Service and link the repo.
2. In **Settings**:
   - **Root Directory:** `backend`
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Health Check Path:** `/api/health`
3. In **Environment Variables**:
   - `PORT` = `5000` (or host provided `$PORT`)
   - `NODE_ENV` = `production`
   - `MONGODB_URI` = Your MongoDB Atlas URI
   - `CLIENT_URL` = `https://www.srmenterprises.com,https://srm-enterprises-psi.vercel.app`
   - `RESEND_API_KEY` = Your Resend API key
   - `RESEND_FROM_EMAIL` = `SRM Enterprises <noreply@yourdomain.com>`
   - `CONTACT_RECEIVER_EMAIL` = `info@yourdomain.com`
   - `IP_HASH_SALT` = Long random secret string
4. Click **Deploy**.

---

## 13. API documentation

Base URL: `https://<api-host>/api`

### `GET /api/health`

Liveness and database state — used by hosting health checks and by the badge on the contact page.

```bash
curl https://<api-host>/api/health
```

```json
{
  "status": "ok",
  "uptime": 128,
  "timestamp": "2026-10-01T08:44:49.708Z",
  "database": "connected"
}
```

`status` is `"degraded"` when the database is not connected (the endpoint still answers 200 so a
flaky database does not trigger a restart loop; the real state is reported honestly).

### `POST /api/inquiries`

Public, rate limited (6 requests / 15 minutes per IP in production, 60 in development),
write-only.

Request body:

```json
{
  "name": "Ravi Sharma",
  "companyName": "Sharma Auto Parts",
  "email": "ravi@sharmaauto.in",
  "phone": "+91 98110 22334",
  "whatsapp": "9811022334",
  "productCategory": "corrugated-packaging",
  "material": "5-ply corrugated",
  "quantity": "5000 boxes / month",
  "size": "600 x 400 x 300 mm",
  "thickness": "5-ply",
  "application": "auto component transit",
  "message": "Need 5-ply boxes for auto components with a partition layout. Please share options and pricing.",
  "consentGiven": true,
  "source": "website"
}
```

Success — `201 Created`:

```json
{ "success": true, "message": "Inquiry submitted successfully" }
```

Validation failure — `422 Unprocessable Entity`:

```json
{
  "success": false,
  "message": "Please check the highlighted fields and try again.",
  "errors": [
    { "field": "email", "message": "Enter a valid email address, for example name@company.com." },
    { "field": "phone", "message": "Phone number looks too short. Include the full number with area/STD code." }
  ]
}
```

Other responses (every error uses the same envelope):

| Status | When |
| --- | --- |
| `400` | Malformed JSON body |
| `404` | Unknown route (`{ "success": false, "message": "API route not found.", "errors": [] }`) |
| `405` | Any method other than `POST` on `/api/inquiries` (no read endpoints exist) |
| `413` | Body larger than 32 kb |
| `429` | Rate limit exceeded |
| `503` | Database unreachable — the visitor sees a friendly message, never a driver error |

Notes:

- A filled honeypot field returns the same `201` success response but stores nothing.
- Emails are sent after the inquiry is saved. If Resend fails, the response is still a success
  and the failure is recorded in `emailStatus.lastError` on the document.
- There are **no** `GET`, `PATCH` or `DELETE` endpoints for inquiries anywhere in the codebase.

---

## 14. Security notes

- **helmet** sets security headers; CSP is deliberately disabled on the API (JSON only) and the
  web app sets its own headers in `next.config.mjs`.
- **CORS** is an explicit allow-list built from `CLIENT_URL`: comma-separated, trimmed,
  trailing slashes removed, with **both www and apex variants** added automatically. Localhost is
  additionally allowed only outside production.
- **Rate limiting**: strict on `POST /api/inquiries`, a general limit on everything else,
  `OPTIONS` and `/health` excluded so checks never consume a visitor's quota.
- **Input hardening**: body size limit (32 kb), `express-mongo-sanitize`, plus a recursive
  sanitiser that strips HTML tags, control characters and `javascript:`/`on*=` payloads, and drops
  `$`-prefixed or dotted keys. Zod validates every field before it reaches the service layer.
- **Validation is shared**: the React form and the API parse with the same Zod schema from
  `@srm/shared`, so the rules cannot drift.
- **No data exposure**: because there are no read endpoints, stored personal data cannot be
  fetched through the API at all. The 404/405 responses above are verified behaviour.
- **Privacy by design**: raw IP addresses are never stored — only a salted HMAC (`ipHash`) used
  to spot repeated abuse.
- **Errors**: one centralised handler turns every failure into
  `{ success: false, message, errors }`. Stack traces, Mongoose messages and database details are
  logged with pino and never returned to a visitor.
- **Secrets**: nothing is hard-coded; env values are validated at boot and the process exits with
  a clear message when something is missing. `.env` and `.env.local` are git-ignored.
- **Operational hygiene**: use a least-privilege Atlas database user (`readWrite` on the site
  database only) and restrict the Atlas IP access list to your API host's outbound IPs where your
  plan allows it. Rotate the Resend key and `IP_HASH_SALT` if they are ever exposed.

---

## 15. Accessibility, performance and responsive behaviour

- One `<h1>` per page, semantic landmarks, real labels (never placeholder-only), inline errors
  wired with `aria-describedby`, `aria-invalid`, and an `aria-live` status region on the form.
- Keyboard support: skip-to-content link, focus-visible rings, mega menu and drawer close on
  `Escape`, accordion/timeline disclosure buttons, and the mobile drawer traps scroll rather than
  the keyboard-in-a-trap pattern that breaks back navigation.
- Contrast: navy `#12294A` on white/cream/sky backgrounds, white on the blue→green and
  blue→violet gradients, and dark-on-light text inside every coloured wash.
- `prefers-reduced-motion` collapses animations to instant, non-moving states (and skips the
  loading screen entirely).
- Performance: static generation for every marketing route, `next/font` self-hosting, inline SVG
  instead of image requests, `next/image` for any photo added later, transform/opacity-only
  animation, and `optimizePackageImports` for Framer Motion and Lucide.
- Responsive: verified layout logic from 320 px (single column, swipeable industry rail) through
  768/1024 px (two-column and grid layouts) to 1536 px+ (wider containers, larger type). Body
  uses `overflow-x: clip` so decorative tilt never creates a horizontal scrollbar, and it does not
  break sticky positioning.

---

## 16. Colour and animation system

- Tokens live in `app/globals.css` as CSS variables (`--accent`, `--accent-soft`,
  `--accent-contrast`, `--accent-secondary`, `--accent-highlight`, `--accent-deep`, plus
  `-rgb` channel twins so Tailwind opacity modifiers such as `border-accent/25` work with
  variable colours).
- Category accents are scoped with `[data-category="…"]`, so any subtree — a card, a section or a
  whole page — adopts that category's colour automatically.
- Moods are `html[data-mood="ocean|citrus|meadow|berry"]`; the switcher writes
  `document.documentElement.dataset.mood` and the transition is defined by
  `--transition-theme` for a smooth repaint.
- The palette is **light only**: white `#FFFFFF`, sky `#F3F9FF`, cream `#FFF9F0`, brand blue
  `#1E6FFF`, fresh green `#19B26B`, sunny yellow `#FFC93C`, and category colours
  orange `#FF8A2B`, aqua `#19C3E6`, violet `#8B5CF6`, emerald `#10B981`, coral `#FF5C8A`.
  There is no dark mode variant anywhere in the codebase.

---

## 17. Placeholders to replace before launch

| # | Placeholder | Where |
| --- | --- | --- |
| 1 | `info@your-domain.com` | `apps/web/data/company.ts` (`CONTACT_PLACEHOLDERS.email`) |
| 2 | `+91 XXXXX XXXXX` phone | `apps/web/data/company.ts` + `NEXT_PUBLIC_PHONE_NUMBER` in `.env.local` |
| 3 | WhatsApp number | `NEXT_PUBLIC_WHATSAPP_NUMBER` (digits only, with country code) |
| 4 | `https://www.your-domain.com` | `NEXT_PUBLIC_SITE_URL` |
| 5 | Address line | `apps/web/data/company.ts` (`CONTACT_PLACEHOLDERS.addressLine`) |
| 6 | Photographs | `apps/web/public/images/` + `apps/web/lib/image-config.ts` (every visual is an SVG illustration until then) |
| 7 | Privacy Policy & Terms | `apps/web/app/privacy/page.tsx`, `apps/web/app/terms/page.tsx` — both are marked **templates for legal review**; confirm governing law, jurisdiction, retention periods and rights against your actual practice |
| 8 | MongoDB / Resend credentials | `services/api/.env` |
| 9 | Analytics IDs (optional) | `apps/web/.env.local` |

Nothing else needs touching. Product names, industry names, the five category colours, the six
process steps and every route are driven from `apps/web/data/*` and `packages/config`.

---

## 18. Verified build results and known limitations

**Verified in this workspace (Node 20.20.2):**

- `npm run typecheck` — `tsc --noEmit` clean for `packages/shared`, `packages/types`,
  `packages/config`, `services/api` and `apps/web` (strict mode, `noUncheckedIndexedAccess`).
- `npm run lint` — ESLint clean for both workspaces (`no-explicit-any` enforced as an error).
- `npm run build` — API bundle built (`dist/server.js`, 44 KB) and Next.js built **25 routes**
  (all static/SSG).
- All 23 route checks returned the expected status codes. `dynamicParams = false` on both
  dynamic templates means an unknown product/industry slug returns a **real 404** (no soft 404),
  verified for `/nope`, `/products/not-a-real-category` and `/industries/not-a-real-industry`.
- Exactly one `<h1>` and one `<title>` per page; canonical, OG, Twitter tags and per-page JSON-LD
  (`Organization`, `BreadcrumbList`, `ItemList`, `Product`) confirmed in the rendered HTML;
  `sitemap.xml` lists 20 URLs and `robots.txt` allows crawling while disallowing `/api/`.
- **Backend verified against a real MongoDB instance**: a valid submission returned `201`,
  the document was stored with `status: "new"`, `source: "website"`, `consentGiven: true` and a
  hashed `ipHash` (no raw IP); the indexes were created. With an intentionally invalid Resend
  key, `emailStatus.lastError` recorded the failure **and the inquiry was still saved and the API
  still returned success** — the designed behaviour.
- Validation returned `422` with per-field messages; honeypot submissions stored nothing;
  `GET`/`DELETE /api/inquiries` returned `405`, `PATCH` returned `404`; a disallowed Origin got no
  CORS header; rate-limit headers were present; a 40 KB body was rejected with a friendly message.
- The browser-facing path was verified end to end (page → same-origin `/api/inquiries` → Express →
  MongoDB) through the optional Next rewrite.

**Known limitations (stated honestly):**

1. **No real Resend delivery was performed here** — no live API key exists in this sandbox.
   The failure path is verified; the success path needs a real key and a verified domain.
2. **Visual/responsive verification was done by build, markup and CSS review**, not on a physical
   device lab. The layouts use mobile-first breakpoints and `overflow-x: clip`, but a quick pass on
   real iPhone/Android/tablet hardware before launch is still recommended.
3. **No automated test suite ships** (Vitest/Playwright were not requested). The checks listed
   above were run manually in this workspace; adding tests is a sensible next step.
4. **Lighthouse/Core Web Vitals scores were not measured** — they require a browser environment.
   The build is static-first with ~87 KB shared JS, but measure on the live domain.
5. **Real photographs and a physically verified address are not included** — the client supplied
   neither, so the site uses illustrations and clearly marked placeholder contact details.
6. `API_PROXY_TARGET` is read at build time (Next bakes rewrites into the build), so set it
   before running `next build` if you use it.
7. The legal pages are **templates** and must be reviewed by a qualified professional.

---

## 19. Definition of done

See the project checklist in the delivery notes. Summary of current status:

- All routes render (verified: 23 route checks + 3 soft-404 checks) — ✅
- Every nav link, mega menu item, footer link and CTA resolves to a real route — ✅
- `?product=<slug>` pre-selects the form category and scrolls to the form — ✅
- Quote form validates, submits to the real API, saves to MongoDB, sends both Resend emails,
  shows success/error states; email failure does not lose the inquiry — ✅ (success path needs a
  live Resend key)
- No admin pages, no auth, no newsletter/subscriber code, no read/update/delete endpoints — ✅
- Helmet, CORS (www + apex), rate limits, sanitisation, centralised errors — ✅ verified
- No dark backgrounds; every section and card animates; colour-change features 1–6 — ✅
- Mobile drawer: scroll lock, Escape, overlay, accordion — ✅
- `prefers-reduced-motion` respected; keyboard and focus behaviour — ✅
- SEO: metadata, sitemap, robots, JSON-LD, one H1 per page — ✅
- No invented claims, no other brand names, placeholders clearly marked — ✅
- `tsc --noEmit`, lint and build pass — ✅ (results above)

---

© SRM Enterprises. All Rights Reserved. · [Privacy Policy](/privacy) · [Terms](/terms)
