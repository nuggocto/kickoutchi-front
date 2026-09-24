// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import rehypeCodeKinds from "./src/lib/rehype-code-kinds.mjs";

// Static-first: no adapter. Cloudflare Pages serves the generated `dist/`.
// https://astro.build/config
export default defineConfig({
  site: "https://kickoutchi.com",
  integrations: [mdx(), sitemap()],
  markdown: {
    // Mark inline code as a command, flag, or key so commands stand out.
    rehypePlugins: [rehypeCodeKinds],
    shikiConfig: {
      // Light-only site: single Shiki theme; `.prose pre` supplies the surface.
      theme: "github-light",
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
