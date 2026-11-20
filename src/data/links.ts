import { z } from "zod";
import release from "./release.json";

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
  /** Latest published release; `src/data/release.json` is the single source,
   *  shared with the build check that pins `public/install.sh`. */
  version: release.version,
  author: "nugget",
} as const;

/** The release installer this site serves at /install.sh: an exact copy of
 *  that release's `kickoutchi-installer.sh`, checked by `pnpm build`. */
export const INSTALLER = {
  sha256: release.installerSha256,
  releaseAsset: `https://github.com/nuggocto/kickoutchi/releases/download/v${release.version}/kickoutchi-installer.sh`,
} as const;

const REPO = "https://github.com/nuggocto/kickoutchi";
const REPO_BRANCH = "shrek";

const linksSchema = z.object({
  github: z.url(),
  releases: z.url(),
  issues: z.url(),
  license: z.url(),
  aurPackaging: z.url(),
  aurBin: z.url(),
});

export const LINKS = linksSchema.parse({
  github: REPO,
  releases: `${REPO}/releases`,
  issues: `${REPO}/issues`,
  license: `${REPO}/blob/${REPO_BRANCH}/LICENSE`,
  aurPackaging: `${REPO}/tree/${REPO_BRANCH}/packaging/arch`,
  aurBin: "https://aur.archlinux.org/packages/kickoutchi-bin",
});
