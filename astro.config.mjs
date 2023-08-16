import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import prefetch from "@astrojs/prefetch";
import svelte from "@astrojs/svelte";

import solidJs from "@astrojs/solid-js";

// https://astro.build/config
export default defineConfig({
  site: "https://yb6b.github.io",
  base: "/yima",
  compressHTML: true,
  scopedStyleStrategy: "class",
  integrations: [sitemap({
    i18n: {
      defaultLocale: "zh-CN"
    }
  }), prefetch(), svelte(), solidJs()]
});