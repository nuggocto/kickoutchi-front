import { z } from "zod";

/** Canonical project identity and every off-site link, validated once here. */

export const SITE = {
  name: "Kickoutchi",
  domain: "kickoutchi.com",
  url: "https://kickoutchi.com",
  tagline: "Kick stale dev servers out of your local ports.",
  description:
    "Kickoutchi is a TUI and CLI port janitor for finding open local ports, inspecting process families, and safely kicking stale dev servers out.",
  /** Canonical binary name; `kick` is the short daily-use shortcut. */
  binary: "kickoutchi",
  shortBinary: "kick",
  /** Latest published release; mirrors the repository release version. */
  version: "1.0.0",
  author: "nugget",
} as const;

const REPO = "https://github.com/nuggocto/kickoutchi";
const REPO_BRANCH = "shrek";

const linksSchema = z.object({
  github: z.url(),
  releases: z.url(),
  latestRelease: z.url(),
  issues: z.url(),
  license: z.url(),
  readme: z.url(),
  aurPackaging: z.url(),
});

export const LINKS = linksSchema.parse({
  github: REPO,
  releases: `${REPO}/releases`,
  latestRelease: `${REPO}/releases/latest`,
  issues: `${REPO}/issues`,
  license: `${REPO}/blob/${REPO_BRANCH}/LICENSE`,
  readme: `${REPO}/blob/${REPO_BRANCH}/README.md`,
  aurPackaging: `${REPO}/tree/${REPO_BRANCH}/packaging/arch`,
});

/** Direct release-download URLs used by the install flow. */
export const RELEASE_ASSETS = {
  installerSh: `${REPO}/releases/latest/download/kickoutchi-installer.sh`,
  installerPs1: `${REPO}/releases/latest/download/kickoutchi-installer.ps1`,
} as const;
