import { defineConfig } from 'vitepress'

const logo = {
  src: '/logo.svg',
  alt: 'Termark'
}

const copyright = 'Copyright © 2026 Termark'

export default defineConfig({
  lang: 'en-US',
  title: 'Termark',
  description: 'Termark documentation',
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/logo.svg' }]
  ],
  locales: {
    root: {
      label: 'English',
      lang: 'en-US',
      link: '/',
      description: 'Termark documentation',
      themeConfig: {
        logo,
        nav: [
          { text: 'Docs', link: '/usage/' }
        ],
        sidebar: {
          '/usage/': [
            {
              text: 'Documentation',
              items: [
                { text: 'SFTP CWD Tracking', link: '/usage/sftp-cwd-tracking' }
              ]
            }
          ]
        },
        outlineTitle: 'On This Page',
        docFooter: {
          prev: 'Previous page',
          next: 'Next page'
        },
        footer: {
          message: 'Termark Documentation',
          copyright
        }
      }
    },
    zh: {
      label: '简体中文',
      lang: 'zh-CN',
      link: '/zh/',
      description: 'Termark 使用文档',
      themeConfig: {
        logo,
        nav: [
          { text: '使用文档', link: '/zh/usage/' }
        ],
        sidebar: {
          '/zh/usage/': [
            {
              text: '使用文档',
              items: [
                { text: 'SFTP 目录跟随配置', link: '/zh/usage/sftp-cwd-tracking' }
              ]
            }
          ]
        },
        outlineTitle: '本页导航',
        docFooter: {
          prev: '上一页',
          next: '下一页'
        },
        darkModeSwitchLabel: '外观',
        lightModeSwitchTitle: '切换到浅色模式',
        darkModeSwitchTitle: '切换到深色模式',
        sidebarMenuLabel: '菜单',
        returnToTopLabel: '返回顶部',
        langMenuLabel: '切换语言',
        skipToContentLabel: '跳转到内容',
        footer: {
          message: 'Termark 使用文档',
          copyright
        }
      }
    }
  }
})
