// The site serves the release's kickoutchi-installer.sh at /install.sh.
// Refuse to publish any bytes other than the reviewed copy for SITE.version.
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";

const release = JSON.parse(
  await readFile(new URL("../src/data/release.json", import.meta.url), "utf8"),
);
const script = await readFile(new URL("../dist/install.sh", import.meta.url));
const text = script.toString("utf8");

const actual = createHash("sha256").update(script).digest("hex");
if (actual !== release.installerSha256) {
  throw new Error(
    `install.sh SHA-256 ${actual} differs from the reviewed ${release.installerSha256}`,
  );
}
if (!text.includes(`APP_VERSION="${release.version}"`)) {
  throw new Error(`install.sh does not install release ${release.version}`);
}
if (!text.includes(`/releases/download/v${release.version}"`)) {
  throw new Error(`install.sh does not download the v${release.version} archives`);
}
// cargo-dist runs everything from its last line, so a truncated download
// cannot execute a partial script.
if (!text.trimEnd().endsWith('download_binary_and_run_installer "$@" || exit 1')) {
  throw new Error("install.sh must run the installer only on its last line");
}
console.log(`install.sh matches release ${release.version}.`);
