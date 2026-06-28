# Kickoutchi Frontend Plan

## Goal

Build the public website for Kickoutchi at `kickoutchi.com`.

The site should make the project immediately understandable: Kickoutchi is a cross-platform TUI and CLI port janitor that shows what is squatting on local ports and helps users kick stale dev servers out safely.

The first version should be small, fast, clear, and memorable. It should explain the project, show how to install it, document both the TUI and CLI workflows, and point users to GitHub releases/package sources.

## Product Positioning

Kickoutchi should feel like a serious terminal utility with a cute tiny-creature shell around it.

Core message:

- See open local TCP/UDP ports.
- See the process behind each port when the OS allows it.
- Use either a guided TUI or a script-friendly CLI.
- Terminate stale local dev servers safely, with confirmations and guardrails.
- Works on Linux, macOS, and Windows.

Tone:

- Practical first, playful second.
- Clear commands before jokes.
- Swampy, stubborn, mischievous energy is welcome.
- Avoid direct public branding around protected characters or likenesses.

## Stack

- Astro v7
- pnpm
- Vite
- Tailwind CSS v4
- `@tailwindcss/vite`
- `@astrojs/mdx`
- Zod
- ky
- Oxlint
- Oxfmt
- MD/MDX content collections
- Cloudflare Pages

## Hosting

Host the production site on Cloudflare Pages.

- Domain: `kickoutchi.com`
- Build command: `pnpm build`
- Output directory: `dist`
- Production branch: likely `main`
- Use preview deployments for pull requests.
- Keep the first version static-first.
- Do not add SSR or Pages Functions unless a later feature needs them.

Astro should use static output for the first version. Cloudflare Pages can serve the generated `dist/` folder directly.

Because the first version is static, the Cloudflare adapter is not needed unless SSR, Pages Functions, or Cloudflare runtime bindings are added later.

## Design Direction

The design should mix terminal/Linux utility with cute Tamagotchi-style personality.

Visual language:

- Dark terminal base as the default visual mood.
- Light mode that keeps the same pocket-terminal identity instead of becoming generic.
- Pixel-art details.
- 8-bit accents.
- Rounded pocket-device panels.
- `IBM Plex Sans` for body/UI copy.
- `JetBrains Mono` for code, command blocks, CLI examples, and terminal details.
- `Pixelify Sans` for restrained pixel accents, badges, logo-adjacent labels, or tiny mascot moments.
- Command blocks that look great on desktop and remain readable on mobile.
- Simple layout, but with a distinct identity instead of a generic SaaS landing page.

Logo concept to reserve space for:

- Pixel/8-bit Tamagotchi device.
- Inside the device, a foot ready to kick.
- Must work as a favicon, nav mark, hero logo, and social preview element.

Design should stay restrained. The mascot/logo can carry most of the cuteness; the rest of the site should remain clean, fast, and useful.

Theme support:

- Provide both dark and light themes.
- Respect the user's system preference by default.
- Provide a visible theme toggle button in the header.
- Persist the user's explicit choice in local storage.
- Keep both themes accessible, high-contrast, and recognizably Kickoutchi.
- Do not treat light mode as an afterthought; light users deserve swamp rights too.

## Site Map

Initial pages:

- `/`: Landing page.
- `/install`: Installation, update, package status, and platform support.
- `/docs`: Friendly documentation overview.
- `/docs/tui`: TUI walkthrough.
- `/docs/cli`: CLI walkthrough.
- `/docs/commands`: Command reference.
- `/docs/troubleshooting`: Common issues and fixes.
- `/changelog`: Release notes from GitHub releases, with local fallback.
- `/404`: Small themed not-found page.

Possible later pages:

- `/about`: Why this exists and project philosophy.
- `/docs/config`: Config file details.
- `/docs/safety`: Deep dive into termination safety.
- `/docs/packages`: Maintainer/package details.

## Landing Page

The homepage should quickly answer what Kickoutchi is and why someone should install it.

Sections:

- Hero with project name, short pitch, install CTA, GitHub CTA, and logo placeholder.
- Tiny terminal demo showing `kick list` and `kick kill --port 3000`.
- TUI vs CLI choice cards.
- Feature cards.
- Safety section.
- Install preview with link to `/install`.
- Platform/package status strip.
- Screenshot preview section with placeholders until screenshots are provided.
- Footer with GitHub, releases, license, docs, and install links.

Hero copy direction:

```text
Kick stale dev servers out of your local ports.

Kickoutchi shows which process owns each open TCP/UDP port, then lets you clear the swamp safely from a TUI or CLI.
```

Primary CTAs:

- Install Kickoutchi.
- Read the docs.
- View on GitHub.

## Install Page

The install page should be practical and status-driven.

Install methods and current status:

- Linux installer: available.
- macOS installer: available.
- Windows PowerShell installer: available.
- Direct release archives: available for Linux, macOS, and Windows.
- Cargo install from Git: available.
- Nix flake: available.
- AUR: coming soon. Templates are ready, but publishing is blocked while AUR registration is locked after recent AUR security incidents.
- Homebrew: not planned right now.
- winget: not planned right now.

Important install commands:

```sh
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/nuggocto/kickoutchi/releases/latest/download/kickoutchi-installer.sh \
  | sh
```

```powershell
irm https://github.com/nuggocto/kickoutchi/releases/latest/download/kickoutchi-installer.ps1 | iex
```

```sh
kickoutchi-update
```

```sh
cargo install --locked --git https://github.com/nuggocto/kickoutchi
```

```sh
nix run github:nuggocto/kickoutchi
nix run github:nuggocto/kickoutchi#kick -- list
nix profile install github:nuggocto/kickoutchi
```

```sh
yay -S kickoutchi-bin
yay -S kickoutchi
```

Both AUR commands should be shown with a clear `coming soon` badge until the packages are published. Explain that `kickoutchi-bin` will install the prebuilt GitHub Release archive, while `kickoutchi` will build from the release source archive with Cargo.

The install page should also explain:

- `kickoutchi` is the canonical binary name.
- `kick` is the short daily-use shortcut.
- Running either binary without a command opens the TUI.
- Installer-based installs include `kickoutchi-update` on current releases.
- Older installer users should rerun the latest installer once to get `kickoutchi-update`.

## Docs Strategy

Use Astro content collections for docs.

- Support both `.md` and `.mdx` with a `docs` collection.
- Prefer `.mdx` for pages using screenshots, command blocks, cards, callouts, or comparison components.
- Add the `@astrojs/mdx` integration.
- Use Zod schemas to validate frontmatter.
- Generate docs navigation from collection metadata.
- Keep docs friendly and example-heavy.

Suggested content tree:

```text
src/content/docs/
  index.mdx
  tui.mdx
  cli.mdx
  commands.mdx
  troubleshooting.mdx
  config.mdx
  safety.mdx
```

Suggested frontmatter fields:

- `title`
- `description`
- `order`
- `section`
- `mode`: `general`, `tui`, or `cli`
- `draft`
- `screenshots`
- `related`

Docs should be based on the real `kickoutchi` repo behavior, README, CLI parser, and TUI source. Do not invent commands that do not exist.

## Docs Tone

Docs should feel approachable and playful, but never hide the real behavior.

Use patterns like:

```text
The cozy way: open the TUI and let Kickoutchi walk you through the swamp.

The goblin-speed way: use the CLI when you already know which port needs a tiny boot.
```

Rules:

- Every command should be copyable.
- Every destructive action should explain what confirmation will happen.
- Screenshots should be paired with short captions and plain-English explanations.
- Jokes should not make safety-critical behavior ambiguous.

## TUI Documentation

The TUI opens when the user runs either binary without a subcommand:

```sh
kickoutchi
kick
```

The TUI docs should cover:

- Main table.
- Details panel.
- Details modal.
- Help modal.
- Search/filter mode.
- Sort cycling.
- Manual refresh.
- Auto-refresh behavior.
- Normal termination.
- Force kill.
- Protected-process confirmation.
- Too-small terminal state.

Known TUI keys from the current app:

- `r`: refresh ports now.
- `/`: edit search/filter text.
- `s`: cycle sort mode.
- `j` or Down: move selection down.
- `k` or Up: move selection up.
- Enter: open selected-row details.
- `x`: terminate selected process.
- Shift+`X`: force-kill selected process.
- `?`: open help.
- Esc: clear search, close a modal, cancel kill confirmation, or quit depending on state.
- `q`: quit.
- Ctrl+C: quit.

TUI table columns:

- Protocol.
- Address.
- Port.
- PID.
- Process.
- State.
- Scope.

TUI details should explain:

- PID and process name.
- Bind address, port, protocol, state, and scope.
- Parent process.
- Child process loading.
- Path and command line.
- Docker context when available.
- Permission status.
- Protected-process warnings.

TUI screenshot placeholders:

- Home table.
- Search/filter editing.
- Details panel.
- Details modal.
- Help modal.
- Confirm termination modal.
- Force-kill confirmation.
- Protected-process confirmation.
- Successful kill status.

The user will provide/take screenshots later. Plan components and asset slots now, but do not block the first site structure on final screenshots.

## CLI Documentation

The CLI should be documented as the fast/scriptable path.

Main commands:

```sh
kick list
kick kill --port 3000
kickoutchi list --json
```

Global options:

- `--config FILE`: use an alternate config file.
- `--refresh-interval SECONDS`: override configured refresh interval.

`list` options:

- `--port PORT`: show rows bound to one exact port.
- `--process TEXT`: show rows whose process name contains text.
- `--filter TEXT`: apply TUI-style search text or structured filters.
- `--sort MODE`: sort by `port`, `pid`, `protocol`, `process`, `parent`, or `scope`.
- `--json`: print stable JSON instead of a table.

Useful filters to document:

```sh
kick list --filter 3000
kick list --filter port:3000
kick list --filter proto:udp
kick list --filter scope:public
kick list --filter protected:true
kick list --filter parent:node
```

`kill` options:

- `--pid PID`: terminate a specific PID.
- `--port PORT`: terminate the process owning a port.
- `--force`: force kill where the platform supports a distinction.
- `--yes`: skip normal confirmation, but never bypass protected-process confirmation.

Kill examples:

```sh
kick kill --port 3000
kick kill --pid 18422
kick kill --port 3000 --yes
kick kill --pid 18422 --force
```

CLI docs should explain:

- CLI commands never open the TUI.
- `list --json` is for scripts.
- Empty unfiltered lists are success.
- Empty filtered results exit with no-match.
- `kill --port` refuses ambiguous ports instead of guessing.
- `--yes` skips the normal prompt, not safety warnings.
- Protected processes still require stronger confirmation.

Stable exit codes to document:

- `0`: success.
- `1`: failure.
- `2`: invalid arguments.
- `3`: no match.
- `4`: permission denied or ownership unavailable.
- `5`: kill cancelled.
- `6`: protected process needs confirmation.

CLI screenshot placeholders:

- `kick --help`.
- `kick list` table output.
- `kick list --port 3000`.
- `kick list --json`.
- `kick kill --port 3000` confirmation.
- Successful kill output.
- No-match output and diagnostic.

## Command Reference Page

The command reference should be a compact index for users who already know what they need.

Recommended sections:

- Binary names.
- Global options.
- `list`.
- `kill`.
- Filters.
- Sort modes.
- JSON output.
- Exit codes.
- Config file pointer.

This should be factual and less playful than `/docs/tui` or `/docs/cli`.

## Troubleshooting Page

Initial topics:

- A port appears in another tool but not in Kickoutchi.
- Process metadata is missing.
- Permission denied when killing.
- Protected process requires stronger confirmation.
- `kill --port` says the target is ambiguous.
- Docker-owned port details are partial or unavailable.
- Linux kernel is too old for pidfd termination.
- Windows needs an elevated terminal for some processes.
- macOS permissions or process identity changed before termination.
- Terminal is too small for the TUI.
- `kickoutchi-update` missing after an older installer install.

## Safety Page

Safety is a selling point and should be explained clearly.

Current safety behaviors to document:

- PID `0`, PID `1`, and Kickoutchi's own PID are blocked.
- `kill --port` refuses ambiguous ports.
- Protected processes require typing the PID or process name.
- Force kill requires stronger confirmation by default.
- Termination targets only the confirmed PID.
- Linux uses pidfd termination on supported kernels.
- macOS re-checks process identity before signalling.
- Windows uses process handles for termination.

## Screenshot Strategy

Screenshots should be curated and checked into the frontend repo once provided.

Preferred asset location:

```text
src/assets/screenshots/
  tui/
    home.png
    search.png
    details-panel.png
    details-modal.png
    help.png
    confirm-kill.png
    success.png
  cli/
    help.png
    list.png
    json.png
    kill-confirm.png
    kill-success.png
  install/
    installer.png
    update.png
```

Use Astro image optimization for local screenshot assets.

Screenshot rules:

- Use real Kickoutchi output.
- Keep terminal dimensions consistent.
- Prefer PNG source assets, let Astro optimize generated output.
- Add alt text and captions.
- Pair CLI screenshots with copyable command blocks.
- Add short clips later only if they make flows clearer; avoid heavy GIFs.

The user will provide/take screenshots later. The frontend should reserve slots and document expected screenshot names.

## Data Strategy

Use typed local data files for reusable site content.

Suggested data modules:

```text
src/data/install-methods.ts
src/data/features.ts
src/data/nav.ts
src/data/package-status.ts
src/data/screenshots.ts
src/data/links.ts
```

Use Zod to validate:

- Install method status.
- Package/platform support labels.
- Feature cards.
- Screenshot metadata.
- External links.
- Docs frontmatter.

Use narrow schemas and infer TypeScript types from them.

## GitHub Release Data

Use `ky` for GitHub/release metadata.

Preferred behavior:

- Fetch latest release data at build time where practical.
- Use Zod to validate the GitHub response shape used by the site.
- Keep a static local fallback so the site still builds if GitHub API is unavailable or rate-limited.
- Do not make every visitor's browser fetch GitHub data unless there is a clear reason later.

Data to show:

- Latest version.
- Release date.
- Release URL.
- Changelog summary.
- Installer/archive links if useful.

## Components

Core Astro components:

- `Layout.astro`
- `Header.astro`
- `Footer.astro`
- `Hero.astro`
- `ButtonLink.astro`
- `CommandBlock.astro`
- `CopyButton.astro`
- `ModeCard.astro`
- `InstallMethodCard.astro`
- `PackageStatusBadge.astro`
- `FeatureCard.astro`
- `ScreenshotFrame.astro`
- `Callout.astro`
- `DocsLayout.astro`
- `DocsSidebar.astro`
- `DocsPager.astro`
- `ReleaseBadge.astro`

Keep client JavaScript minimal. The first client-side behavior likely needed is copy-to-clipboard for command blocks.

## Styling

Use Tailwind CSS v4 with CSS-first configuration.

Add Tailwind through the Vite plugin (`@tailwindcss/vite`) in the Astro/Vite config.

Use `src/styles/global.css` with:

```css
@import "tailwindcss";
```

Define project tokens with `@theme`:

- Terminal background.
- Light and dark surface colors.
- Device panel colors.
- Pixel accent colors.
- Warning/safety colors.
- Font families.
- Border radii.
- Shadows/glow effects.

Font direction:

- Body/UI: `IBM Plex Sans`.
- Code/commands: `JetBrains Mono`.
- Pixel accents only: `Pixelify Sans`.

Theme implementation:

- Use CSS variables for color tokens.
- Default to system preference before JavaScript loads.
- Add a small inline script or early-loading component to avoid theme flash.
- Toggle a root attribute or class such as `data-theme="dark"` / `data-theme="light"`.
- Keep command blocks, screenshots, and status badges readable in both modes.

Avoid overusing animations. If animation is added, it should be subtle and respect reduced-motion preferences.

## Code Quality

Use the OXC toolchain for frontend linting and formatting.

- Use `oxlint` instead of ESLint for JavaScript/TypeScript linting.
- Use `oxfmt` instead of Prettier for formatting.
- Keep scripts simple and direct through pnpm.

Expected scripts:

```json
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fmt": "oxfmt",
    "fmt:check": "oxfmt --check"
  }
}
```

Run `oxlint --init` when setting up the project if a config file is useful. Keep the config small unless the defaults conflict with Astro/MDX usage.

## Project Structure

Target structure:

```text
public/
  favicon.svg
  og-image.png
src/
  assets/
    logo/
    screenshots/
  components/
  content/
    docs/
  data/
  layouts/
  lib/
    github.ts
    schemas.ts
  pages/
    index.astro
    install.astro
    changelog.astro
    404.astro
    docs/
      [...slug].astro
  styles/
    global.css
src/content.config.ts
astro.config.mjs
package.json
tsconfig.json
```

## Accessibility

Baseline requirements:

- Good contrast on dark theme.
- Good contrast on light theme.
- Keyboard-reachable navigation and copy buttons.
- Keyboard-reachable theme toggle with clear accessible label.
- Skip link.
- Real headings in order.
- Descriptive alt text for every screenshot.
- Captions for important screenshots.
- Focus states that match the visual theme.
- Reduced-motion support.
- Do not rely on color alone for status badges.

## SEO And Metadata

Include:

- Title and description per page.
- Open Graph metadata.
- Social preview image.
- Canonical URLs.
- `robots.txt`.
- Sitemap.
- Favicon and app icons once logo is ready.

Target homepage description:

```text
Kickoutchi is a cross-platform TUI and CLI port janitor for finding open local ports and safely kicking stale dev servers out.
```

## Implementation Phases

Phase 1: Project foundation.

- Create Astro v7 project with pnpm.
- Add Tailwind CSS v4.
- Add `@tailwindcss/vite`.
- Add `@astrojs/mdx`.
- Add `oxlint` and `oxfmt` dev dependencies.
- Add `lint`, `lint:fix`, `fmt`, and `fmt:check` scripts.
- Set up global styles and theme tokens.
- Add base layout, header, footer, and routing.
- Configure static build for Cloudflare Pages.

Phase 2: Content model.

- Add docs content collection.
- Add Zod frontmatter schema.
- Add local data files and schemas for install methods, features, package status, screenshots, and links.
- Add docs layout and navigation.

Phase 3: Landing and install pages.

- Build homepage sections.
- Build `/install` with platform/package status.
- Add command blocks and copy buttons.
- Add AUR `coming soon` treatment.

Phase 4: Docs.

- Write `/docs` overview.
- Write `/docs/tui` walkthrough.
- Write `/docs/cli` walkthrough.
- Write `/docs/commands` reference.
- Write `/docs/troubleshooting`.
- Add screenshot placeholders and expected filenames.

Phase 5: Release data.

- Add `ky` GitHub release fetch helper.
- Validate release data with Zod.
- Add static fallback.
- Build `/changelog` from fetched release data where possible.

Phase 6: Polish and launch readiness.

- Add final logo assets when provided.
- Add screenshots when provided.
- Add SEO metadata and social image.
- Run accessibility and responsive checks.
- Configure Cloudflare Pages project and `kickoutchi.com` domain.

## Verification

Before launch:

- `pnpm install`
- `pnpm fmt:check`
- `pnpm lint`
- `pnpm build`
- `pnpm astro check`
- Test desktop and mobile layouts.
- Test command copy buttons.
- Test docs navigation.
- Test Cloudflare Pages preview deployment.
- Run a Lighthouse/accessibility pass.

## Open Questions

- Exact logo asset format and dimensions.
- Final screenshot set and filenames.
- Whether `/docs/config` and `/docs/safety` should ship in v1 or shortly after.
- Whether GitHub release notes should be rendered fully or summarized on `/changelog`.
- Whether to add Cloudflare Web Analytics after launch.
