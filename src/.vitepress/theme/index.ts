// https://vitepress.dev/guide/custom-theme
import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme-without-fonts'
import Download from "./components/Download.vue";
import type { EnhanceAppContext } from 'vitepress'
import { useMediumZoomProvider } from '../hooks'
import { h } from 'vue'
import './style.css'
import './fonts.css'
import './animate.css'

export default {
  extends: DefaultTheme,

  enhanceApp({ app, router, siteData }) {
    // 注册全局组件
    app.component('Download', Download)
    useMediumZoomProvider(app, router)
  }
} satisfies Theme