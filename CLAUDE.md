# 6IX Site

Agency website built with Next.js 16, React 19, TypeScript, and Tailwind CSS v4.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Runtime**: Node.js

## Project Structure

```
src/
  app/          # App Router pages and layouts
    layout.tsx  # Root layout
    page.tsx    # Home page
    globals.css # Global styles
public/         # Static assets
```

## Dev Commands

```bash
npm run dev     # Start dev server at localhost:3000
npm run build   # Production build
npm run lint    # Run ESLint
```

## Conventions

- App Router only — no Pages Router
- Components go in `src/components/`
- One component per file, named exports preferred
- Tailwind for all styling — no CSS modules or styled-components
