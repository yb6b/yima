import { defineConfig } from 'astro/config';
import * as siteConfig from './src/config.js';
import sitemap from '@astrojs/sitemap';
import purgecss from "astro-purgecss";
import prefetch from "@astrojs/prefetch";
import htmlMinifier from "astro-html-minifier";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  site: siteConfig.SITE_SITE,
  base: siteConfig.SITE_BASE,
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'zh-CN'
    }
  }), purgecss(), prefetch(), htmlMinifier(), svelte()]
});