import { defineConfig } from 'vitepress'
import { argv } from "node:process";
import path from "node:path"
import tailwind from "tailwindcss"
import autoprefixer from "autoprefixer"

const base = argv.at(-1) === 'yima' ? '/yima/' : '/'
console.log(base);
// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "易码",
  base,
  description: "极致的乱序纯形顶功输入方案",
  lang: "zh-hans-CN",
  outDir: "../dist",
  markdown: {
    theme: {
      light: "light-plus",
      dark: "material-theme-palenight",
    },
  },
  head: [
    ['link', { rel: 'icon', href: base + 'icon.svg', type: 'image/svg+xml' }],
  ],
  vite: {
    css: {
      postcss: {
        plugins: [tailwind(), autoprefixer()],
      },
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '../../components'),
      }
    }
  },
  themeConfig: {
    logo: base + 'icon.svg',
    nav: [
      { text: '主页', link: '/' },
      {
        text: '输入方案', items: [
          { text: '易码（四二顶）', link: '/easy-code/' },
          { text: '逸码（二码顶）', link: '/graceful-code/' },
          { text: '晨逸（两笔二码顶）', link: '/chenyi/' },
        ]
      },
    ],
    sidebar: {
      '/easy-code': [
        {
          text: '易码介绍',
          link: '/easy-code/',
        },
        {
          text: '反查',
          link: '/easy-code/search',
        },
        {
          text: '字根练习',
          link: '/easy-code/gen',
        },
        {
          text: '常用一千字练习',
          link: '/easy-code/zi'
        },
        {
          text: '常用两千字练习',
          link: '/easy-code/zi2'
        },
      ],
      '/graceful-code': [
        {
          text: '介绍',
          link: '/graceful-code/',
        },
        {
          text: '逸码 V20',
          collapsed: false,
          items: [
            { text: 'V20 说明', link: '/graceful-code/v20/' },
            { text: '反查工具', link: '/graceful-code/v20/search' },
            { text: '字根练习', link: '/graceful-code/v20/gen' },
            { text: '常用一千字练习', link: '/graceful-code/v20/zi' },
            { text: '常用两千字练习', link: '/graceful-code/v20/zi2' },
          ]
        },
        {
          text: '逸码 VV9 · 26键',
          collapsed: true,
          items: [
            { text: 'VV9 说明', link: '/graceful-code/vv9-26/' },
            { text: '反查工具', link: '/graceful-code/vv9-26/search' },
            { text: '字根练习', link: '/graceful-code/vv9-26/gen' },
            { text: '常用一千字练习', link: '/graceful-code/vv9-26/zi' },
            { text: '常用两千字练习', link: '/graceful-code/vv9-26/zi2' },
          ]
        },
        {
          text: '逸码 VV4 · 27键',
          collapsed: true,
          items: [
            { text: 'VV4 说明', link: '/graceful-code/vv4/' },
          ]
        },
        {
          text: '实验版',
          collapsed: true,
          items: [
            {
              text: '逸码 V20 · 27键',
              link: '/graceful-code/v20-27/'
            },
            {
              text: '逸码 VV9 · 27键',
              link: '/graceful-code/vv9-27/'
            },
          ],
        },
      ],
      '/chenyi': [
        {
          text: '晨逸两笔',
          link: '/chenyi/'
        }
      ],
    },
    footer: {
      message: "易码逸码分享学习网站",
      copyright: "Yima team. Copyright © 2023 Under GPLv3 license.",
    },
    darkModeSwitchLabel: "黑暗模式",
    langMenuLabel: "选择语言",
    returnToTopLabel: "回到顶部",
    sidebarMenuLabel: "目录",
    outline: {
      level: "deep",
      label: "本页大纲"
    },
    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonAriaLabel: "搜索",
            buttonText: "搜索",
          },
          modal: {
            displayDetails: "展示详细内容",
            resetButtonTitle: "清空关键词",
            noResultsText: "搜索不到，请换个关键词",
            backButtonTitle: "返回",
            footer: {
              selectText: "进入网页",
              navigateText: "浏览",
              navigateDownKeyAriaLabel: "下键",
              navigateUpKeyAriaLabel: "上键",
              closeKeyAriaLabel: "关闭",
              closeText: "取消搜索",
            },
          },
        },
      },
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/yb6b/yima' },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-tencent-qq" viewBox="0 0 16 16">
      <path d="M6.048 3.323c.022.277-.13.523-.338.55-.21.026-.397-.176-.419-.453-.022-.277.13-.523.338-.55.21-.026.397.176.42.453Zm2.265-.24c-.603-.146-.894.256-.936.333-.027.048-.008.117.037.15.045.035.092.025.119-.003.361-.39.751-.172.829-.129l.011.007c.053.024.147.028.193-.098.023-.063.017-.11-.006-.142-.016-.023-.089-.08-.247-.118Z"/>
      <path fill-rule="evenodd" d="M11.727 6.719c0-.022.01-.375.01-.557 0-3.07-1.45-6.156-5.015-6.156-3.564 0-5.014 3.086-5.014 6.156 0 .182.01.535.01.557l-.72 1.795a25.85 25.85 0 0 0-.534 1.508c-.68 2.187-.46 3.093-.292 3.113.36.044 1.401-1.647 1.401-1.647 0 .979.504 2.256 1.594 3.179-.408.126-.907.319-1.228.556-.29.213-.253.43-.201.518.228.386 3.92.246 4.985.126 1.065.12 4.756.26 4.984-.126.052-.088.088-.305-.2-.518-.322-.237-.822-.43-1.23-.557 1.09-.922 1.594-2.2 1.594-3.178 0 0 1.041 1.69 1.401 1.647.168-.02.388-.926-.292-3.113a25.78 25.78 0 0 0-.534-1.508l-.72-1.795ZM9.773 5.53c-.13-.286-1.431-.605-3.042-.605h-.017c-1.611 0-2.913.319-3.042.605a.096.096 0 0 0-.01.04c0 .022.008.04.018.056.11.159 1.554.943 3.034.943h.017c1.48 0 2.924-.784 3.033-.943a.095.095 0 0 0 .008-.096Zm-4.32-.989c-.483.022-.896-.529-.922-1.229-.026-.7.344-1.286.828-1.308.483-.022.896.529.922 1.23.027.7-.344 1.286-.827 1.307Zm2.538 0c.483.022.896-.529.922-1.229.026-.7-.344-1.286-.827-1.308-.484-.022-.896.529-.923 1.23-.026.7.344 1.285.828 1.307ZM2.928 8.99a10.674 10.674 0 0 0-.097 2.284c.146 2.45 1.6 3.99 3.846 4.012h.091c2.246-.023 3.7-1.562 3.846-4.011.054-.9 0-1.663-.097-2.285-1.312.26-2.669.41-3.786.396h-.017c-.297.003-.611-.005-.937-.023v2.148c-1.106.154-2.21-.068-2.21-.068V9.107a22.93 22.93 0 0 1-.639-.117Z"/>
    </svg>`,
        },
        link: "https://jq.qq.com/?_wv=1027&k=5V71KdOJ",
      },
      {
        icon: {
          svg: `<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96" viewBox="0 0 56 56"><path fill="currentColor" fill-rule="evenodd" d="M31.8 36.237c-.917 3.427-.942 6.285-.074 8.574c1.595 4.208 7.2 5.419 7.464 6.522C39.454 52.437 31.726 53 27.358 53c-4.367 0-9.724-.833-9.724-1.667c0-.833 5.084-1.939 6.629-6.6c.9-2.717.802-5.838-.296-9.361a2.808 2.808 0 0 1-.845.128c-1.191 0-2.183-.73-2.397-1.694c-.822.54-1.852.86-2.969.86c-2.41 0-4.411-1.492-4.807-3.454a4.534 4.534 0 0 1-1.047.121C9.747 31.333 8 29.841 8 28c0-1.243.796-2.327 1.977-2.9c-.607-.379-1.001-.992-1.001-1.683c0-.24.047-.471.135-.686C8.442 22.434 8 21.92 8 21.333c0-.727.682-1.345 1.632-1.573C8.637 19.15 8 18.214 8 17.167c0-1.663 1.603-3.04 3.699-3.293a3.368 3.368 0 0 1-.772-2.124c0-2.071 1.965-3.75 4.39-3.75c.244 0 .484.017.718.05c.585-1.483 2.227-2.55 4.16-2.55c.537 0 1.051.082 1.527.233C22.052 4.179 23.646 3 25.56 3c1.958 0 3.58 1.232 3.86 2.837c.715-.716 1.78-1.17 2.97-1.17c2.155 0 3.902 1.492 3.902 3.333c0 .62-.199 1.201-.544 1.699c.177-.021.359-.032.544-.032c2.006 0 3.66 1.293 3.878 2.958a4.4 4.4 0 0 1 1.975-.458c2.156 0 3.903 1.492 3.903 3.333c0 1.255-.812 2.348-2.012 2.917c1.2.568 2.012 1.661 2.012 2.916c0 1.09-.613 2.059-1.56 2.667c.366.418.584.937.584 1.5c0 .216-.032.425-.092.624c1.8.853 3.019 2.493 3.019 4.376c0 2.761-2.62 5-5.854 5a6.68 6.68 0 0 1-2.362-.424c-.886.776-2.123 1.257-3.491 1.257a5.415 5.415 0 0 1-2.955-.85c-.42.357-.948.621-1.538.754"/></svg>`,
        },
        link: "http://yima.ysepan.com/",
      },
    ]
  },
})
