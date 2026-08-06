# Maverick — Anshul Kumar Meena's Portfolio

A production-grade personal website and developer portfolio built with the latest Next.js App Router. It showcases project case studies, an engineering timeline, reading log, and direct contact — designed as a living, fast, and content-driven site.

**Live site:** https://ansh17.netlify.app/

---

## Tech Stack

| Layer | Technology |
| --- | --- |
| Framework | Next.js 16 (Turbopack, App Router) |
| UI | React 19, Tailwind CSS v4, Radix UI |
| Animation | framer-motion, GSAP + ScrollTrigger |
| Diagrams | React Flow (@xyflow/react) |
| Icons | lucide-react, simple-icons (brand marks) |
| Contact | Resend (email API) |
| Data | Local JSON content (`src/content`) |
| Tooling | TypeScript, ESLint (next/core-web-vitals) |

---

## Project Structure

```
src/
├── app/                  # App Router file-based routing
│   ├── about/            # About page
│   ├── api/              # API routes (e.g. contact/email)
│   ├── contact/          # Contact page
│   ├── now/              # "Now" / current status page
│   ├── projects/         # Projects index + [slug] case studies
│   ├── reading/          # Reading log
│   ├── resume/           # Resume page
│   ├── uses/             # "Uses" / tools page
│   └── page.tsx          # Homepage
├── components/
│   ├── sections/         # Homepage sections
│   ├── case-study/       # Project detail building blocks
│   ├── projects/         # Project-specific UI
│   ├── reading/          # Reading log UI
│   ├── layout/           # Layout, nav, command menu
│   ├── shared/           # Shared primitives (badges, icons, cards)
│   └── ui/               # Reusable UI primitives
├── content/              # Content-as-data (JSON)
│   ├── achievements.json
│   ├── experience.json
│   ├── projects.json
│   ├── reading.json
│   ├── skills.json
│   └── timeline.json
└── lib/                  # Constants, data loaders, utils
```

---

## Design & Engineering Decisions

- **Content as data** — sections like projects, reading, and the timeline are driven by typed JSON in `src/content`, keeping content maintainable and the components reusable.
- **Performance-first animations** — interactive motion (hover, accordions, counters, route transitions) is kept while scroll-driven entrance animations were removed so core content renders statically and instantly.
- **Authentic brand icons** — technology badges render official brand marks + brand colors via `simple-icons`, with luminance-aware lightening for near-black marks on the dark theme.
- **Interactive project case studies** — selected projects include React Flow diagrams and GSAP-driven visuals for a richer technical narrative.
- **SEO & social ready** — structured sitemap, JSON-LD-ready metadata, and Open Graph defaults configured in `src/lib/constants.ts` and `src/app/sitemap.ts`.

---

## Contact

- GitHub: https://github.com/iamanshulkumar
- LinkedIn: https://linkedin.com/in/itisanshulkumar
- Email: anshulkm17@gmail.com
- Resume: https://ansh17.netlify.app/resume

---

© Anshul Kumar Meena