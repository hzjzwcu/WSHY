import { defineConfig } from 'vitepress';
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wshy-docs",
  head: [['link', { rel: 'icon', href: '/wshy-docs/favicon.ico' }]],
  description: "A VitePress Site",
  base: '/wshy-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: '/dogface2.svg',
    nav: [
      { text: 'Home', link: '/' },
      { text: '待归档', link: '/面试题/待归档面试题.md' },
      { text: '其他', link: '/其他/备忘录/书签.md' },
      { text: '网络通信', link: '/网络通信/DNS解析.md' },
      {
        text: '前端',
        items: [
          { text: 'JavaScript', link: '/JavaScript/JS基础/对象.md' },
          { text: 'Typescript', link: '/Typescript/常用工具类.md' },
          { text: 'Canvas', link: '/Canvas/基础/Canvas组件.md' },
          { text: 'CSS', link: '/CSS/超出省略.md' },
          { text: 'HTML', link: '/HTML/DOM操作.md' },
          { text: 'Vue', link: '/Vue/项目起步/vite+ts项目起步.md' },
        ]
      },
      {
        text: '后端',
        items: [
          { text: 'NodeJS', link: '/NodeJS/图床功能.md' },
          { text: 'Python', link: '/Python/环境搭建.md' },
        ]
      },
      {
        text: '测试',
        items: [
          { text: 'Selenium', link: '/测试/Selenium/Python.md' },
        ]
      },

    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/hzjzwcu/wshy-docs' }
    ]
  },
  vite: {
    plugins: [
      AutoSidebar({
        beforeCreateSideBarItems: (data: string[]) => {
          for (let i = data.length - 1; i >= 0; i--) {
            const matchList = ['.assets', '.png', 'jpg', 'gif'];
            const isMatch = matchList.some(ext => data[i].endsWith(ext));
            if (isMatch) {
              data.splice(i, 1)
            }
          }
          return data;
        }
      })
    ]
  },
})
