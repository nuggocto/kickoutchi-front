import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "zod";

// Docs live as Markdown/MDX in src/content/docs. Frontmatter is validated by the
// schema below; navigation order and grouping are derived from it.
const docs = defineCollection({
  loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/docs" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    /** Order within a section (ascending). */
    order: z.number().default(99),
    /** Sidebar group; see SECTION_ORDER in src/lib/docs.ts. */
    section: z.enum(["Guides", "Reference", "Safety", "Help"]).default("Guides"),
    /** Tone hint: general, tui, or cli. */
    mode: z.enum(["general", "tui", "cli"]).default("general"),
    draft: z.boolean().default(false),
    related: z.array(z.string()).default([]),
  }),
});

export const collections = { docs };
