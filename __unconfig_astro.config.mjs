
let __unconfig_data;
let __unconfig_stub = function (data = {}) { __unconfig_data = data };
__unconfig_stub.default = (data = {}) => { __unconfig_data = data };
import { defineConfig } from 'astro/config';
import * as siteConfig from './src/config.js'
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import svelte from "@astrojs/svelte";
import purgecss from "astro-purgecss";
import prefetch from "@astrojs/prefetch";
import htmlMinifier from "astro-html-minifier";

const __unconfig_default =  defineConfig({
  site: 'https://yb6b.github.io',
  base: '/yima',
  integrations: [mdx(), sitemap(
    { i18n: { defaultLocale: 'zh-CN' } }
  ), svelte(), purgecss(), prefetch(), htmlMinifier()]
});
if (typeof __unconfig_default === "function") __unconfig_default(...[]);export default __unconfig_data;