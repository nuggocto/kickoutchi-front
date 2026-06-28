import { z } from "zod";
import { LINKS } from "./links";

/** Header and footer navigation. Docs-section nav is generated from the
 *  content collection in `DocsLayout`; this file is the site chrome. */

const navItemSchema = z.object({
  label: z.string(),
  href: z.string(),
  external: z.boolean().optional(),
});
export type NavItem = z.infer<typeof navItemSchema>;

export const MAIN_NAV: NavItem[] = z.array(navItemSchema).parse([
  { label: "Install", href: "/install" },
  { label: "Docs", href: "/docs" },
  { label: "Changelog", href: "/changelog" },
  { label: "GitHub", href: LINKS.github, external: true },
]);

const footerGroupSchema = z.object({
  title: z.string(),
  items: z.array(navItemSchema),
});
export type FooterGroup = z.infer<typeof footerGroupSchema>;

export const FOOTER_NAV: FooterGroup[] = z.array(footerGroupSchema).parse([
  {
    title: "Start",
    items: [
      { label: "Install", href: "/install" },
      { label: "Documentation", href: "/docs" },
      { label: "Changelog", href: "/changelog" },
    ],
  },
  {
    title: "Docs",
    items: [
      { label: "TUI walkthrough", href: "/docs/tui" },
      { label: "CLI walkthrough", href: "/docs/cli" },
      { label: "Command reference", href: "/docs/commands" },
      { label: "Troubleshooting", href: "/docs/troubleshooting" },
    ],
  },
  {
    title: "Project",
    items: [
      { label: "GitHub", href: LINKS.github, external: true },
      { label: "Releases", href: LINKS.releases, external: true },
      { label: "Issues", href: LINKS.issues, external: true },
      { label: "License (MIT)", href: LINKS.license, external: true },
    ],
  },
]);
