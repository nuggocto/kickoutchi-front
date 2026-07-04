# kickoutchi.com

The public website for [Kickoutchi](https://github.com/nuggocto/kickoutchi) • a TUI and CLI port
janitor that shows what owns your local ports, inspects process families, and helps you terminate
stale dev servers safely.

Built with **Astro v7**, **Tailwind CSS v4**, MDX content collections, and a dark/light
pocket-terminal theme. Static-first, deployed to **Cloudflare Pages**.

## Develop

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

## Scripts

| Script                        | What it does                                         |
| ----------------------------- | ---------------------------------------------------- |
| `pnpm dev`                    | Start the dev server                                 |
| `pnpm build`                  | Build the static site to `dist/`                     |
| `pnpm preview`                | Preview the production build                         |
| `pnpm check`                  | `astro check` (type-check `.astro`, content, and TS) |
| `pnpm lint` / `pnpm lint:fix` | Lint with oxlint                                     |
| `pnpm fmt` / `pnpm fmt:check` | Format with oxfmt                                    |

## Project structure

```text
public/              # favicons, OG image, robots.txt, _headers, manifest
src/
  assets/logo/       # logo + mark source images (Astro-optimised)
  components/         # UI components (Header, CommandBlock, Terminal, cards…)
  content/docs/       # docs as MD/MDX (content collection)
  data/               # typed, Zod-validated site data (install, features, nav…)
  layouts/            # Layout.astro, DocsLayout.astro
  lib/                # schemas, docs helpers, changelog parser, GitHub fetch
  pages/              # routes (/, /install, /docs, /changelog, /404)
  styles/global.css   # Tailwind v4 + theme tokens + prose styles
src/content.config.ts # docs collection schema
astro.config.mjs
```

## Content accuracy

Docs are grounded in the real `kickoutchi` source (CLI parser, TUI keys, scoped kill behavior,
config, exit codes) • not invented. The bundled `src/data/CHANGELOG.md` drives `/changelog`.

## Deploy (Cloudflare Pages)

- **Build command:** `pnpm build`
- **Output directory:** `dist`
- **Production branch:** `shrek`

Static output, no adapter needed. Pull requests get preview deployments.
