import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: 'Termark',
  description: 'Termark 使用文档',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],
  themeConfig: {
    logo: {
      src: '/logo.svg',
      alt: 'Termark'
    },
    nav: [
      { text: '首页', link: '/' },
      { text: '使用文档', link: '/usage/' }
    ],

    sidebar: {
      '/usage/': [
        {
          text: '使用文档',
          items: [
            { text: '文档概览', link: '/usage/' },
            { text: 'SFTP 目录跟随配置', link: '/usage/sftp-cwd-tracking' }
          ]
        }
      ]
    },

    outlineTitle: '本页导航',
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    footer: {
      message: 'Termark 使用文档',
      copyright: 'Copyright © 2026 Termark'
    }
  }
})
