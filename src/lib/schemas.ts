import { z } from "zod";

/** Shared vocabulary for the typed site data files. */

export const platformSchema = z.enum(["linux", "macos", "windows", "any"]);
export type Platform = z.infer<typeof platformSchema>;

export const PLATFORM_LABELS: Record<Platform, string> = {
  linux: "Linux",
  macos: "macOS",
  windows: "Windows",
  any: "Any platform",
};

/**
 * Install / package availability. `not-planned` is a real, honest state here •
 * Homebrew and winget are explicitly out of scope for now.
 */
export const statusSchema = z.enum(["available", "coming-soon", "not-planned"]);
export type Status = z.infer<typeof statusSchema>;

export const STATUS_LABELS: Record<Status, string> = {
  available: "Available",
  "coming-soon": "Coming soon",
  "not-planned": "Not planned",
};

export const commandSchema = z.object({
  code: z.string().min(1),
  lang: z.enum(["sh", "powershell", "toml", "json", "text"]).default("sh"),
  label: z.string().optional(),
});
export type Command = z.infer<typeof commandSchema>;
