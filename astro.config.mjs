// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

// Static-first: no adapter. Cloudflare Pages serves the generated `dist/`.
// https://astro.build/config
export default defineConfig({
  site: "https://kickoutchi.com",
  integrations: [mdx(), sitemap()],
  markdown: {
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
