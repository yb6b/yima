import { defineConfig } from 'astro/config';
import * as siteConfig from './src/config.js';
import sitemap from '@astrojs/sitemap';
import prefetch from "@astrojs/prefetch";
import htmlMinifier from "astro-html-minifier";
import svelte from "@astrojs/svelte";

export default defineConfig({
  site: 'https://yb6b.github.io',
  base: '/yima',
  integrations: [sitemap({
    i18n: {
      defaultLocale: 'zh-CN'
    }
  }), prefetch(), htmlMinifier(), svelte()]
});