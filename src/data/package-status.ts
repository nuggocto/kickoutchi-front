import { z } from "zod";
import { statusSchema } from "../lib/schemas";

/** The platform + package status strip shown on the landing and install pages. */

const platformSupportSchema = z.object({
  platform: z.string(),
  status: statusSchema,
  detail: z.string(),
});
export type PlatformSupport = z.infer<typeof platformSupportSchema>;

export const PLATFORM_SUPPORT: PlatformSupport[] = z.array(platformSupportSchema).parse([
  {
    platform: "Linux",
    status: "available",
    detail: "Native /proc collection with pidfd-backed tree/group kill and inspect.",
  },
  {
    platform: "macOS",
    status: "available",
    detail: "Native libproc / sysctl collection with tree/group kill and inspect.",
  },
  {
    platform: "Windows",
    status: "available",
    detail:
      "Native IP Helper listing, inspect, single-process kill, and CLI tree kill via Job Objects.",
  },
]);

const packageStatusSchema = z.object({
  name: z.string(),
  status: statusSchema,
  detail: z.string(),
});
export type PackageStatus = z.infer<typeof packageStatusSchema>;

export const PACKAGE_STATUS: PackageStatus[] = z.array(packageStatusSchema).parse([
  { name: "Installer", status: "available", detail: "Linux, macOS & Windows" },
  { name: "Release archives", status: "available", detail: "All platforms + checksums" },
  { name: "Cargo", status: "available", detail: "cargo install --git" },
  { name: "Nix flake", status: "available", detail: "nix run / nix profile" },
  { name: "AUR", status: "paused", detail: "Publication blocked; templates ready" },
  { name: "Homebrew", status: "not-planned", detail: "Use installer or archive" },
  { name: "winget", status: "not-planned", detail: "Use installer or archive" },
]);
