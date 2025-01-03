import { defineConfig } from 'vitepress'
import { sidebarOpenSource, sidebarTech } from './sidebar'

export default defineConfig({
  title: 'Kagol',
  description: '卡哥博客, 卡哥, 卡哥的博客, 前端卡哥, 前端Kagol, 前端kagol, Kagol 博客, Kagol博客, kagol 博客, kagol博客, Kagol blog, Kagol blogs, kagol-blogs, kagol-blog, Kagol, kagol, 前端开源星球, 前端开源, 前端, Web, UI, Front end, front-end, frontend, 开源, Open Source, opensource, open-source, Vue, vue, JavaScript, javascript, JS, TypeScript, typescript, TS, 前端组件库, Component toolkit, Component library, Component, component, component-library, component-toolkit, 富文本编辑器, Rich text editor, rich-text-editor, rich-text, wysiwyg, wysiwyg-editor',
  base: '/blogs/',
  appearance: 'dark',
  themeConfig: {
    nav: [
      { text: '技术', link: '/tech/overview', activeMatch: '/tech/' },
      { text: '开源', link: '/open-source/overview', activeMatch: '/open-source/' }
    ],
    sidebar: {
      '/tech/': sidebarTech(),
      '/open-source/': sidebarOpenSource()
    }
  }
})
