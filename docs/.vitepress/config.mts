import { defineConfig } from 'vitepress';
import AutoSidebar from 'vite-plugin-vitepress-auto-sidebar';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "wshy-docs",
  description: "A VitePress Site",
  base: '/wshy-docs/',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: '面试题', link: '/面试题/待归档面试题.md' },
      { text: '其他', link: '/其他/备忘录/书签.md' },
      { text: 'Canvas', link: '/Canvas/基础/Canvas组件.md' },
      { text: 'CSS', link: '/CSS/超出省略.md' },
      { text: 'HTML', link: '/HTML/DOM操作.md' },
      { text: 'JavaScript', link: '/JavaScript/JS基础/对象.md' },
      { text: 'NodeJS', link: '/NodeJS/图床功能.md' },
      { text: 'Python', link: '/Python/环境搭建.md' },
      { text: 'Typescript', link: '/Typescript/常用工具类.md' },
      { text: 'Vue', link: '/Vue/项目起步/vite+ts项目起步.md' },
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
