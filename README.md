# VPD Technologies — website

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lucide. Frontend only: no backend, API routes or database.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (passes)
```

## Where content lives
All copy comes from `src/data/*.ts` (company, services, industries, products, careers, navigation).
All photos are declared once in `src/lib/images.ts`.

## Source of truth
The audit was done on the live site **https://www.vpdtechnologies.com** (the `vpd-tan.vercel.app` URL could not be fetched from the build environment).

- Careers: 6 roles / 42 positions, copied unchanged into `careers.ts`.
- Products: all 18 products with their published status and preview images (hot-linked from the live site).
- Contact: phone, email, address, hours and enquiry options from the live contact page.

## Things to do before launch
1. Add the official VPD logo to `public/images/brand/` and swap it into `components/layout/Logo.tsx` (a text wordmark stands in).
2. Open every Unsplash photo in a browser once: the IDs in `src/lib/images.ts` could not be tested from the build sandbox. A branded fallback shows if one fails.
3. Replace the summarised Privacy / Terms pages with the approved legal text.
4. Contact and job-apply forms are frontend only: connect `submitEnquiry()` in `components/contact/ContactForm.tsx` later.
