# selfheal.ai — Marketing Site

The autonomous SRE that doesn't just find the bug, it ships the fix.

selfheal investigates the moment an alert fires, correlates signals across your stack, isolates the root cause and opens a reviewed pull request with a regression test attached — one agent, one continuous chain of custody from page to merge.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS (custom dark palette)
- Framer Motion (scroll, fade, and timeline animations)
- Lucide icons

## Local development

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## Production build

```bash
npm run build
npm start
```

## Project layout

```
app/
  layout.tsx            # root layout, fonts, metadata
  page.tsx              # the landing page assembly
  globals.css           # tailwind layer + utility classes
components/
  Nav.tsx               # top navigation with scroll-blur
  Hero.tsx              # headline + live agent terminal
  LiveAgent.tsx         # animated "agent on shift" card
  ValueProps.tsx        # four pillar cards (RCA, PR, verify, learn)
  HowItWorks.tsx        # the 6-step Heal Loop
  Platform.tsx          # two architectural bets
  Comparison.tsx        # "page the on-call" vs "merge the fix"
  Integrations.tsx      # logo strip / connectors
  CTA.tsx               # closing call to action
  Footer.tsx            # footer
lib/
  motion.ts             # shared motion variants
```

## Design notes

The site borrows the **information density and terminal vocabulary** of
modern infra-marketing sites (numbered framework cards, status chips, live
event feeds, comparison tables) but keeps the palette and copy unique to
selfheal: an **emerald-on-near-black** healing aesthetic and language built
around the closing of the loop — incident → investigation → **pull request**.
