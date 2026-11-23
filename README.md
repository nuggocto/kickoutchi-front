# kickoutchi.com

The public website for [Kickoutchi](https://github.com/nuggocto/kickoutchi), a TUI and CLI port
janitor that shows what owns your local ports, inspects process families, and stops stale dev
servers without hitting the wrong process ;D

Built with Astro 7, Tailwind CSS 4, and MDX content collections in a dark theme.
It's a static site deployed to Cloudflare Pages.

## Develop

```sh
pnpm install
pnpm dev          # http://localhost:4321
```

## Scripts

| Script                        | What it does                                         |
| ----------------------------- | ---------------------------------------------------- |
| `pnpm dev`                    | Start the dev server                                 |
| `pnpm build`                  | Build to `dist/`, then check the served installer    |
| `pnpm preview`                | Preview the production build                         |
| `pnpm check`                  | `astro check` (type-check `.astro`, content, and TS) |
| `pnpm lint` / `pnpm lint:fix` | Lint with oxlint                                     |
| `pnpm fmt` / `pnpm fmt:check` | Format with oxfmt                                    |
| `pnpm verify`                 | Format check, lint, type-check, and build            |

## Project structure

```text
public/              # favicons, OG image, robots.txt, _headers, install.sh, manifest
src/
  assets/logo/       # logo + mark source images (Astro-optimized)
  components/         # UI components (Header, SquatterScene, Terminal, CommandBlock…)
  content/docs/       # docs as MD/MDX (content collection)
  data/               # typed, Zod-validated site data (install, links, nav…)
  layouts/            # Layout.astro, DocsLayout.astro
  lib/                # schemas, docs helpers, changelog parser
  pages/              # routes (/, /install, /docs, /changelog, /404)
  styles/global.css   # Tailwind v4 + theme tokens + prose styles
src/content.config.ts # docs collection schema
scripts/             # build-time checks (check-installer.mjs)
astro.config.mjs
```

## Content accuracy

The docs follow the real `kickoutchi` source (CLI parser, TUI keys, scoped kill behavior, config,
exit codes); nothing is invented. `/changelog` renders the bundled `src/data/CHANGELOG.md`.

## Releasing a new kickoutchi version

`/install.sh` is served from `public/install.sh`, an exact copy of the release's
`kickoutchi-installer.sh`, so the install command needs no redirect. For each release:

1. Download the new `kickoutchi-installer.sh` from the GitHub Release to `public/install.sh` and
   check it against the digest GitHub shows for that asset.
2. Set `version` and `installerSha256` in `src/data/release.json`, and `version` in
   `package.json`.
3. Copy the new release section from the kickoutchi repository's `CHANGELOG.md` into
   `src/data/CHANGELOG.md`. Releases from 1.4.0 on match the repository word for word; older
   entries are condensed for the site, so do not overwrite the whole file.
4. Run `pnpm verify`. `scripts/check-installer.mjs` fails the build if the served installer's
   SHA-256, version, or download URL disagrees with `release.json`.

`/install.ps1` still redirects to the latest GitHub Release (`public/_redirects`).

## Deploy (Cloudflare Pages)

| Setting           | Value        |
| ----------------- | ------------ |
| Build command     | `pnpm build` |
| Output directory  | `dist`       |
| Production branch | `shrek`      |

The output is static, so no adapter is needed. Pull requests get preview deployments.
