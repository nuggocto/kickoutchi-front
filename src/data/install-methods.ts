import { z } from "zod";
import { commandSchema, platformSchema, statusSchema } from "../lib/schemas";

/** Install methods and their honest current status. Commands mirror the real
 *  README and release artifacts exactly. */

const installMethodSchema = z.object({
  id: z.string(),
  name: z.string(),
  status: statusSchema,
  platforms: z.array(platformSchema).min(1),
  summary: z.string(),
  commands: z.array(commandSchema),
  note: z.string().optional(),
  /** Grouping for the install page layout. */
  group: z.enum(["recommended", "source", "package"]),
});
export type InstallMethod = z.infer<typeof installMethodSchema>;

export const INSTALL_METHODS: InstallMethod[] = z.array(installMethodSchema).parse([
  {
    id: "installer-unix",
    name: "Linux & macOS installer",
    status: "available",
    platforms: ["linux", "macos"],
    group: "recommended",
    summary:
      "The generated GitHub Release installer. Downloads the right archive for your platform and drops both binaries on your PATH.",
    commands: [
      {
        code: "curl --proto '=https' --tlsv1.2 -LsSf \\\n  https://github.com/nuggocto/kickoutchi/releases/latest/download/kickoutchi-installer.sh \\\n  | sh",
        lang: "sh",
      },
    ],
    note: "Installer-based installs also include the kickoutchi-update helper.",
  },
  {
    id: "installer-windows",
    name: "Windows PowerShell installer",
    status: "available",
    platforms: ["windows"],
    group: "recommended",
    summary: "The PowerShell installer • same release flow, Windows edition.",
    commands: [
      {
        code: 'powershell -ExecutionPolicy Bypass -NoProfile -Command "irm https://github.com/nuggocto/kickoutchi/releases/latest/download/kickoutchi-installer.ps1 | iex"',
        lang: "powershell",
      },
    ],
    note: "ExecutionPolicy Bypass is scoped to the installer process. Use an elevated terminal if higher-privilege processes hide metadata or reject termination. Windows supports CLI tree kill; --group is Unix-only.",
  },
  {
    id: "update",
    name: "Update an existing install",
    status: "available",
    platforms: ["linux", "macos", "windows"],
    group: "recommended",
    summary:
      "Installer-based installs ship kickoutchi-update. Run it to check for and install the newest GitHub Release.",
    commands: [{ code: "kickoutchi-update", lang: "sh" }],
    note: "Installed before this helper existed? Rerun the latest installer once to get kickoutchi-update; future upgrades can use the updater.",
  },
  {
    id: "archives",
    name: "Direct release archives",
    status: "available",
    platforms: ["linux", "macos", "windows"],
    group: "recommended",
    summary:
      "If installers make you nervous: grab the archive, verify the hash, and run kickoutchi or kick. Every release ships archives for all three platforms plus matching .sha256 files and a release-wide sha256.sum.",
    commands: [],
    note: "Download archives and checksums from the GitHub Releases page. Archives include Windows inspect and CLI tree kill; --group stays Linux/macOS-only.",
  },
  {
    id: "cargo",
    name: "Cargo (from Git)",
    status: "available",
    platforms: ["any"],
    group: "source",
    summary: "Rust users can build and install straight from the repository.",
    commands: [
      { code: "cargo install --locked --git https://github.com/nuggocto/kickoutchi", lang: "sh" },
    ],
    note: "Requires Rust 1.95.0 or newer.",
  },
  {
    id: "nix",
    name: "Nix flake",
    status: "available",
    platforms: ["linux", "macos"],
    group: "source",
    summary:
      "Run or install the flake directly • first-class because it fits Rust CLI/TUI tools cleanly.",
    commands: [
      { code: "nix run github:nuggocto/kickoutchi", lang: "sh", label: "Run the TUI" },
      { code: "nix run github:nuggocto/kickoutchi#kick -- list", lang: "sh", label: "Run the CLI" },
      { code: "nix profile install github:nuggocto/kickoutchi", lang: "sh", label: "Install" },
    ],
  },
  {
    id: "aur-bin",
    name: "AUR • kickoutchi-bin",
    status: "paused",
    platforms: ["linux"],
    group: "package",
    summary:
      "Installs the prebuilt binary from the GitHub Release archive. The fast path for Arch users.",
    commands: [{ code: "yay -S kickoutchi-bin", lang: "sh" }],
    note: "v1.1.2 templates are ready, but publishing is paused while AUR registration is locked after recent AUR security incidents.",
  },
  {
    id: "aur-source",
    name: "AUR • kickoutchi",
    status: "paused",
    platforms: ["linux"],
    group: "package",
    summary: "Builds from the release source archive with Cargo.",
    commands: [{ code: "yay -S kickoutchi", lang: "sh" }],
    note: "Same publication hold as kickoutchi-bin. The v1.1.2 AUR templates live in packaging/arch/ for maintainers who want to build or review locally.",
  },
  {
    id: "homebrew",
    name: "Homebrew",
    status: "available",
    platforms: ["macos"],
    group: "package",
    summary:
      "Install from the Homebrew tap • one formula, both binaries, and brew upgrade keeps them current.",
    commands: [{ code: "brew install nuggocto/tap/kickoutchi", lang: "sh" }],
    note: "The formula is generated and pushed to the tap automatically on every release.",
  },
  {
    id: "scoop",
    name: "Scoop",
    status: "available",
    platforms: ["windows"],
    group: "package",
    summary: "Install from the Scoop bucket • both binaries, and scoop update keeps them current.",
    commands: [
      {
        code: "scoop bucket add nuggocto https://github.com/nuggocto/scoop-bucket",
        lang: "powershell",
        label: "Add the bucket",
      },
      { code: "scoop install kickoutchi", lang: "powershell", label: "Install" },
    ],
    note: "The bucket manifest auto-updates from each release's checksummed archive.",
  },
]);
