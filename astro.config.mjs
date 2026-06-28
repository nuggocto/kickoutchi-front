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
      // Dual-theme code blocks: Shiki emits both colour sets as CSS variables
      // and `global.css` picks the active one from `data-theme`.
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      wrap: true,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
