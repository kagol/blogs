export function sidebarTech() {
  return [
    {
      text: '前端',
      collapsed: true,
      items: [
        { text: '使用 Rollup 打包并发布自己的工具库', link: '/tech/2020/rollup-practice' },
        { text: '三步法助你快速定位网站性能问题', link: '/tech/2020/performance-analysis-method' },
        { text: 'html2canvas 实现浏览器截图的原理', link: '/tech/2020/html2canvas-principle' },
        { text: '让我们来构建一个浏览器引擎吧', link: '/tech/2021/build-a-browser-engine' },
        { text: '解决异步接口请求导致的数据错误', link: '/tech/2021/asynchronous-interface-request' },
        { text: 'Angular 路由的懒加载和守卫', link: '/tech/2021/angular-routing-lazy-loading' },
        { text: '两把前端数据 Mock 神器', link: '/tech/2020/front-end-mock-data' },
        { text: '将 Angular 工程改造成 Monorepo', link: '/tech/2021/monorepo-angular' },
        { text: '给 Vue 项目加上 ESLint', link: '/tech/2022/vue-eslint' },
        { text: '使用 Webpack 打包 AngularJS 项目', link: '/tech/2016/getting-started-with-webpack' },
        { text: 'Backbone.js 入门', link: '/tech/2016/getting-started-with-backbone' },
        { text: '使用 JavaScript 进行数组去重', link: '/tech/2016/array-deduplication-algorithm' },
        { text: '使用 Angular.js 构建单页面应用', link: '/tech/2016/angular-spa' },
        { text: 'z-index 失效原因分析', link: '/tech/2017/thinking-z-index' },
        { text: '浏览器内部工作原理', link: '/tech/2017/how-browser-works' }
      ]
    },
    {
      text: 'Vue',
      collapsed: true,
      items: [
        { text: '老板：你为什么要选择 Vue？', link: '/tech/2022/why-did-you-choose-vue' },
        { text: 'TypeScript 基础及在 Vue 中的实践', link: '/tech/2023/typescript-vue' },
        { text: 'Vue3 组件的组成', link: '/tech/2021/getting-started-with-vue' },
        { text: 'Vue3 模板语法', link: '/tech/2021/vue3-template-syntax' },
        { text: 'Vue3 中使用 JSX 简明语法', link: '/tech/2022/jsx-concise-syntax-in-vue3' },
        { text: 'Vue 组件单元测试宝典', link: '/tech/2023/unit-testing-guide-for-vue-components' }
      ]
    },
    {
      text: '组件库建设',
      collapsed: true,
      items: [
        { text: '前端开发的积木理论', link: '/tech/2019/building-block-theory' },
        { text: '设计一个灵活好用的 Carousel 组件', link: '/tech/2022/building-block-theory-develop-carousel' },
        { text: '0行JS代码实现手风琴式折叠卡片效果', link: '/tech/2022/carousel-indicator-component' },
        { text: 'Carousel 组件的几个使用场景', link: '/tech/2022/carousel-component' },
        { text: '实现一个 DatePicker 日期选择组件', link: '/tech/2019/date-picker-component' },
        { text: '使用三大框架开发 Pagination 组件', link: '/tech/2020/develop-pagination-component-using-vue-react-angular' },
        { text: 'CDK Tree 源码解析', link: '/tech/2022/cdk-tree' },
        { text: '实现 Tree 组件基本结构和文档', link: '/tech/2021/0-to-1-build-vue-component-library-1' },
        { text: '实现一个能渲染多层节点的 Tree 组件', link: '/tech/2021/0-to-1-build-vue-component-library-2' },
        { text: '如何给 Tree 组件增加展开/收起功能', link: '/tech/2021/0-to-1-build-vue-component-library-3' },
        { text: '搭建 Vite+Vue3+TypeScript+JSX 工程', link: '/tech/2021/0-to-1-build-vue-component-library-4' },
        { text: '给 Vue3 组件库添加 VitePress 文档', link: '/tech/2021/0-to-1-build-vue-component-library-5' },
        { text: '手把手带你开发一个组件库脚手架', link: '/tech/2021/0-to-1-build-vue-component-library-6' },
        { text: '给 Vue3 组件库项目增加单元测试', link: '/tech/2021/0-to-1-build-vue-component-library-7' },
        { text: '从0到1搭建 Vue3 组件库阶段性小结', link: '/tech/2021/0-to-1-build-vue-component-library-8' },
        { text: 'Vue3 组件库 Monorepo 改造', link: '/tech/2021/0-to-1-build-vue-component-library-9' },
        { text: '如何实现组件的按需打包', link: '/tech/2021/0-to-1-build-vue-component-library-10' },
        { text: '实现 Tree 组件禁止展开/收起功能', link: '/tech/2021/0-to-1-build-vue-component-library-11' },
        { text: '实现 Tree 组件节点勾选功能', link: '/tech/2021/0-to-1-build-vue-component-library-12' },
      ]
    },
    {
      text: '富文本编辑器',
      collapsed: true,
      items: [
        { text: 'Quill 基本使用和配置', link: '/tech/2021/quill-basic' },
        { text: '通过 Quill API 实现对内容的完全控制', link: '/tech/2021/quill-api' },
        { text: 'Quill 模块化机制', link: '/tech/2020/quill-modularization-principle' },
        { text: 'Quill 内容渲染机制', link: '/tech/2020/quill-rendering-principle' },
        { text: 'Quill 富文本编辑器的实践', link: '/tech/2021/quill-practice' },
        { text: '在富文本编辑器中插入一条中国龙', link: '/tech/2021/rich-text-editor-insert-dragon' },
        { text: '在富文本编辑器中玩贪吃蛇游戏', link: '/tech/2021/rich-text-editor-insert-snake-game' },
      ]
    },
    {
      text: '前端之外',
      collapsed: true,
      items: [
        { text: '使用 Git，10件你可能需要“反悔”的事', link: '/tech/2020/git-undo-redo' },
        { text: '使用 DevCloud 实现前端自动化部署', link: '/tech/2020/automate-deployment-of-web-applications' },
        { text: '使用 git bisect 助你快速定位疑难 bug', link: '/tech/2021/git-bisect' },
        { text: '实现复杂状态机的一种思路', link: '/tech/2019/a-way-to-realize-complex-state-machine' },
        { text: 'Nginx 配置 HTTPS', link: '/tech/2018/nginx-https' },
        { text: 'MongoDB 数据库迁移 MySQL', link: '/tech/2016/mongodb-to-mysql' },
        { text: 'Linux 搭建和配置 Apache 服务器', link: '/tech/2016/linux-apache' },
        { text: '使用 Mongoose 操作 MongoDB 数据库', link: '/tech/2016/nodejs-mongoose' },
        { text: '2016 腾讯"创益24小时"公益大赛总结', link: '/tech/2016/summary-create-public-welfare-24-hour' },
        { text: '立完 flag，你可能需要对 flag 进行量化', link: '/tech/2020/how-to-quantify-front-end-goals' },
        
      ]
    }
  ]
}

export function sidebarOpenSource() {
  return [
    {
      text: '优秀开源项目',
      collapsed: true,
      items: [
        { text: '推荐7个 Angular 前端组件库', link: '/open-source/2021/angular-component-libraries' },
        { text: '一个 OpenTiny，Vue2 Vue3 都支持！', link: '/open-source/2023/opentiny-support-vue2-and-vue3' }
      ]
    },
    {
      text: '开源社区运营',
      collapsed: true,
      items: [
        { text: '从启动开源项目到运营开源社区', link: '/open-source/2022/operation-experience-of-open-source-community' }
      ]
    },
    {
      text: '个人总结',
      collapsed: true,
      items: [
        { text: '2022 年终：把时间沉淀到自己的热爱里', link: '/open-source/2022/summary-2022' },
        { text: '2022 年中：种子终会破土而出', link: '/open-source/2022/summary-2022-mid' },
        { text: '2021 年终：建设一个温暖的开源社区', link: '/open-source/2021/summary-2021' },
        { text: '2021 年中：烧不死的鸟是凤凰', link: '/open-source/2021/summary-2021-mid' }
      ]
    }
  ]
}
