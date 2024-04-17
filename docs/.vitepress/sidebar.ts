export function sidebarTech() {
  return [
    {
      text: '前端',
      collapsed: true,
      items: [
        { text: '手把手教你使用 Rollup 打包并发布自己的工具库📦', link: '/tech/2020/rollup-practice' },
        { text: '在瀑布下用火焰烤饼：三步法助你快速定位网站性能问题', link: '/tech/2020/performance-analysis-method' },
        { text: 'html2canvas 实现浏览器截图的原理', link: '/tech/2020/html2canvas-principle' },
        { text: '让我们来构建一个浏览器引擎吧', link: '/tech/2021/build-a-browser-engine' },
        { text: '如何解决异步接口请求快慢不均导致的数据错误问题？', link: '/tech/2021/asynchronous-interface-request' },
        { text: 'Angular 路由：懒加载、守卫、动态参数', link: '/tech/2021/angular-routing-lazy-loading' },
        { text: '前端有了这两样神器，再也不用追着后台要接口啦', link: '/tech/2020/front-end-mock-data' },
        { text: 'Monorepo 初体验：将现有的 NG CLI 工程改造成 Monorepo 方式', link: '/tech/2021/monorepo-angular' },
        { text: '前端Vuer，请给你的项目加上 ESLint', link: '/tech/2022/vue-eslint' },
        { text: 'Webpack入门——使用Webpack打包Angular项目的一个例子', link: '/tech/2016/getting-started-with-webpack' },
        { text: 'Backbone入门', link: '/tech/2016/getting-started-with-backbone' },
        { text: '使用JavaScript进行数组去重——一种高效的算法', link: '/tech/2016/array-deduplication-algorithm' },
        { text: '使用Angular构建单页面应用(SPA)', link: '/tech/2016/angular-spa' },
        { text: 'z-index 失效原因分析：由一个 bug 引发的对层叠上下文和 z-index 属性的深度思考', link: '/tech/2017/thinking-z-index' },
        { text: '浏览器内部工作原理', link: '/tech/2017/how-browser-works' }
      ]
    },
    {
      text: 'Vue',
      collapsed: true,
      items: [
        { text: '老板：你为什么要选择 Vue？', link: '/tech/2022/why-did-you-choose-vue' },
        { text: 'TypeScript 基础及在 Vue 中的实践', link: '/tech/2023/typescript-vue' },
        { text: '点线面Vue3：先跑起来再说！', link: '/tech/2021/getting-started-with-vue' },
        { text: '点线面Vue3：把模板语法这条线串起来！', link: '/tech/2021/vue3-template-syntax' },
        { text: '前端Vuer，请收下这份《Vue3中使用JSX简明语法》', link: '/tech/2022/jsx-concise-syntax-in-vue3' },
        { text: '前端Vuer，请收好这份《Vue组件单元测试》宝典，给自己多一些安全感', link: '/tech/2023/unit-testing-guide-for-vue-components' }
      ]
    },
    {
      text: '组件库建设',
      collapsed: true,
      items: [
        { text: '前端开发的积木理论——像搭积木一样做前端开发', link: '/tech/2019/building-block-theory' },
        { text: '用积木理论设计一个灵活好用的Carousel走马灯组件', link: '/tech/2022/building-block-theory-develop-carousel' },
        { text: 'CarouseIndicator 组件应用：0行JS代码实现好看的手风琴式折叠卡片效果', link: '/tech/2022/carousel-indicator-component' },
        { text: '用积木理论设计的Carousel组件都有哪些有趣的玩法？', link: '/tech/2022/carousel-component' },
        { text: 'DatePicker 日期选择组件的实现', link: '/tech/2019/date-picker-component' },
        { text: '手把手教你使用Vue/React/Angular三大框架开发Pagination分页组件', link: '/tech/2020/develop-pagination-component-using-vue-react-angular' },
        { text: '从 CDK Tree 源码学习如何开发一个UI无关的 Tree 组件', link: '/tech/2022/cdk-tree' },
        { text: '从0到1搭建Vue组件库01：提交我的第一次 PR', link: '/tech/2021/0-to-1-build-vue-component-library-1' },
        { text: '从0到1搭建Vue组件库02：实现一个能渲染多层节点的 Tree 组件', link: '/tech/2021/0-to-1-build-vue-component-library-2' },
        { text: '从0到1搭建Vue组件库03：如何给 tree 组件增加展开/收起功能', link: '/tech/2021/0-to-1-build-vue-component-library-3' },
        { text: '从0到1搭建Vue组件库04：使用 Vite 搭建一个支持 TypeScript / JSX 的 Vue3 组件库工程', link: '/tech/2021/0-to-1-build-vue-component-library-4' },
        { text: '从0到1搭建Vue组件库05：给 Vue3 组件库添加 VitePress 文档系统', link: '/tech/2021/0-to-1-build-vue-component-library-5' },
        { text: '从0到1搭建Vue组件库06：手把手带你开发一个脚手架', link: '/tech/2021/0-to-1-build-vue-component-library-6' },
        { text: '从0到1搭建Vue组件库07：给组件库项目增加单元测试', link: '/tech/2021/0-to-1-build-vue-component-library-7' },
        { text: '从0到1搭建Vue组件库08：阶段性小结', link: '/tech/2021/0-to-1-build-vue-component-library-8' },
        { text: '从0到1搭建Vue组件库09：Monorepo改造', link: '/tech/2021/0-to-1-build-vue-component-library-9' },
        { text: '从0到1搭建Vue组件库10：如何实现组件的按需打包📦', link: '/tech/2021/0-to-1-build-vue-component-library-10' },
        { text: '从0到1搭建Vue组件库11：实现tree组件禁止展开/收起、点选高亮和节点禁用功能', link: '/tech/2021/0-to-1-build-vue-component-library-11' },
        { text: '从0到1搭建Vue组件库12：实现tree组件自定义图标和节点勾选功能', link: '/tech/2021/0-to-1-build-vue-component-library-12' },
      ]
    },
    {
      text: '富文本编辑器',
      collapsed: true,
      items: [
        { text: '现代富文本编辑器Quill的模块化机制', link: '/tech/2020/quill-modularization-principle' },
        { text: '现代富文本编辑器Quill的内容渲染机制', link: '/tech/2020/quill-rendering-principle' },
        { text: 'Quill 富文本编辑器的实践', link: '/tech/2021/quill-practice' },
        { text: '如何将龙插入到编辑器中？', link: '/tech/2021/rich-text-editor-insert-dragon' },
        { text: '今天是儿童节，整个贪吃蛇到编辑器里玩儿吧', link: '/tech/2021/rich-text-editor-insert-snake-game' },
        { text: '深入浅出Quill：Quill基本使用和配置', link: '/tech/2021/quill-basic' },
        { text: '深入浅出Quill：通过 Quill API 实现对编辑器内容的完全控制', link: '/tech/2021/quill-api' }
      ]
    },
    {
      text: '前端之外',
      collapsed: true,
      items: [
        { text: '使用Git，10件你可能需要“反悔”的事', link: '/tech/2020/git-undo-redo' },
        { text: '大厂是如何用DevCloud流水线实现自动化部署Web应用的？', link: '/tech/2020/automate-deployment-of-web-applications' },
        { text: '利用好 git bisect 这把利器，帮助你快速定位疑难 bug', link: '/tech/2021/git-bisect' },
        { text: '实现复杂状态机的一种思路', link: '/tech/2019/a-way-to-realize-complex-state-machine' },
        { text: 'Nginx配置HTTPS', link: '/tech/2018/nginx-https' },
        { text: '如何将MongoDB数据库的数据迁移到MySQL数据库中', link: '/tech/2016/mongodb-to-mysql' },
        { text: 'Linux下服务器环境的搭建和配置之一——Apache篇', link: '/tech/2016/linux-apache' },
        { text: 'Node使用Mongoose操作MongoDB数据库——增删改查的实现', link: '/tech/2016/nodejs-mongoose' },
        { text: '2016腾讯"创益24小时"互联网公益创新大赛总结', link: '/tech/2016/summary-create-public-welfare-24-hour' },
        { text: '立完flag，你可能需要对flag进行量化', link: '/tech/2020/how-to-quantify-front-end-goals' },
        
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
        { text: '2021年最值得推荐的7个 Angular 前端组件库', link: '/open-source/2021/angular-component-libraries' },
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
        { text: '2022 年终总结：把时间沉淀到自己的热爱里', link: '/open-source/2022/summary-2022' },
        { text: '2022 年中总结：种子终会破土而出！', link: '/open-source/2022/summary-2022-mid' },
        { text: '2021 年终总结：建设一个温暖的开源社区', link: '/open-source/2021/summary-2021' },
        { text: '2021 年中总结：烧不死的鸟是凤凰🐦', link: '/open-source/2021/summary-2021-mid' }
      ]
    }
  ]
}
