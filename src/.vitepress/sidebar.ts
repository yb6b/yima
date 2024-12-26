import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.SidebarMulti = {
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
            text: '在线输入法',
            link: '/easy-code/ime',
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
    '/grand-code': [
        {
            text: '奕码介绍',
            link: '/grand-code/',
        },
        {
            text: '反查',
            link: '/grand-code/search',
        },
        {
            text: '在线输入法',
            link: '/grand-code/ime',
        },
        {
            text: '字根大码练习',
            link: '/grand-code/da',
        },
        {
            text: '字根小码练习',
            link: '/grand-code/xiao',
        },
        {
            text: '常用一千字练习',
            link: '/grand-code/zi'
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
                { text: '在线输入法', link: '/graceful-code/v20/ime', },
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
                { text: '在线输入法', link: '/graceful-code/vv9-26/ime', },
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
}