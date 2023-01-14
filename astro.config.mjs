import { defineConfig } from 'astro/config';
import * as siteConfig from './src/config.js'
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from "@astrojs/svelte";
import purgecss from "astro-purgecss";
import prefetch from "@astrojs/prefetch";
import htmlMinifier from "astro-html-minifier";

export default defineConfig({
  site: 'https://yb6b.github.io',
  base: '/yima',
  integrations: [mdx(), sitemap(
    { i18n: { defaultLocale: 'zh-CN' } }
  ), svelte(), purgecss(), prefetch(), htmlMinifier()]
});