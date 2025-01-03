# 老板：你为什么要选择 Vue？

假如你是团队的前端负责人，现在老板要拓展新业务，需要开发一个 Web 应用，让你来做技术选型，你之前用 Vue 比较多，对 Vue 比较熟悉，希望能在团队内部推行 Vue 技术栈，你会怎么跟老板说呢？以下是我做的一些调研，也许能对你有帮助。

声明：Vue 和 React 都是我很喜欢的前端框架，如有说得不对的地方，欢迎一起讨论交流。

## 一、Vue 在国内的使用量远高于 React / Angular

- 业界主流前端框架：React、Vue、Angular，从近3年的使用趋势上看，React 稳定在第一，Angular 逐年下降，**Vue 持续增长**。
- 从受欢迎程度上看，以 Svelte、Solid 为代表的新兴前端框架很受开发者喜爱，不过它们的使用量和生态繁荣程度还远低于三大框架。
- 虽然 React 在国外的份额高于 Vue，但 **Vue 在国内的使用量大幅领先于 React**，并且呈现出持续增长的趋势，这意味着**在国内能更容易招聘到使用过 Vue、熟悉 Vue 的开发者**。

![全球使用情况.png](/assets/why-did-you-choose-vue-1.png)

图1: Vue 和 React 在全球的使用情况和受欢迎程度对比(来自 StateOfJS 数据)

![中国使用情况.png](/assets/why-did-you-choose-vue-2.png)

图2: Vue 和 React 在中国的使用情况对比（来自 CSDN 调查报告）

参考：
- [https://2021.stateofjs.com/en-US/libraries/front-end-frameworks/](https://2021.stateofjs.com/en-US/libraries/front-end-frameworks/)
- [https://csdn.gitcode.host/Survey-Report-on-Developers-in-China/survey/](https://csdn.gitcode.host/Survey-Report-on-Developers-in-China/survey/)

## 二、Vue 中文资料多，学习曲线平缓，上手快

- 国人开发，美观易读的官方中文文档，除了基本的使用指南和API文档之外，Vue 官网还提供了深色模式、互动教程、演练场和丰富的示例，降低了开发者的学习成本，提升了文档阅读体验。
- 在掘金、知乎、思否等国内技术社区，Vue 的关注者、文章数、讨论数都比 React 高，Vue 相关视频在B站的播放量和评论数总体上也比 React 高，Vue 中文书籍也比 React 的多，这意味着国内的 Vue 开发者拥有比 React 开发者更丰富的中文学习资料，并且在开发过程中遇到问题也能更容易找到解决方案。
- 从代码编写上，Vue 使用模板写法，从传统写法过渡的成本低，而 React 的 JSX 写法需要更多额外的学习成本。

![官方中文文档易读.png](/assets/why-did-you-choose-vue-3.png)

图3: Vue 官方中文文档

![中文学习资料多.png](/assets/why-did-you-choose-vue-4.png)

图4: Vue 和 React 在国内各技术社区的关注者和内容数据对比

![代码编写.png](/assets/why-did-you-choose-vue-5.png)

图5: Vue 和 React 在代码编写上的对比

参考：
- [https://cn.vuejs.org/](https://cn.vuejs.org/)
- [https://juejin.cn/live/xdc202201](https://juejin.cn/live/xdc202201)

## 三、Vue 是渐进式框架，更轻量，性能高

- Vue 是一个渐进式框架，它的设计非常注重灵活性和“可以被逐步集成”这个特点，可以根据你的需求场景，用不同的方式使用 Vue，并轻易地集成到你的现有项目中，不管你的项目是 HTML 网页、Web Components、SPA、桌面端、移动端、WebGL，甚至是命令行终端界面。
- Vue 的体积几乎只有 React 的一半（未压缩情况下），并且 Vue 3.0 的全局 API 和内置组件都支持摇树优化，这意味着用户只需要为他们实际使用到的功能“买单”，未使用的功能代码将不会出现在最终的打包产物中。
- 经过 Benchmark 工具的测试，包括创建数据行、替换所有行、部分更新、选择行、交换行、移除行、追加行在内的所有操作，**Vue 都比 React 性能要好**，特别是交换行操作，Vue 比 React 性能高出5倍以上。

![包体积.png](/assets/why-did-you-choose-vue-6.png)

图6: Vue 和 React 包体积对比

![性能测试.png](/assets/why-did-you-choose-vue-7.png)

图7: Vue 和 React 性能测试数据

参考：
- [https://krausest.github.io/js-framework-benchmark/2022/table_chrome_102.0.5005.61.html](https://krausest.github.io/js-framework-benchmark/2022/table_chrome_102.0.5005.61.html)

## 四、Vue 官方支持的 Web 应用开发工具全面，可持续性好

- Vue 官方提供路由、状态管理、单元测试、静态站点生成等常见 Web 应用开发工具，无需从众多第三方依赖库中做选择，并能获得更好的业务连续性支持；而 React 官方只提供了一个视图层工具，其他必要的 Web 应用开发配套工具都需要依赖于第三方库。
- 在 Awesome 资源大全中，awesome-vue 的资源数是 awesome-react 的6倍，这意味着 Vue 开发者不仅能获得更好的官方工具支持，而且能在社区找到更多配套的 Web 开发工具和学习资源。

![官方支持.png](/assets/why-did-you-choose-vue-8.png)

图8: Vue 和 React 官方工具和生态对比

参考：
- [https://github.com/vuejs/awesome-vue](https://github.com/vuejs/awesome-vue)
- [https://github.com/enaqx/awesome-react](https://github.com/enaqx/awesome-react)

再次声明：Vue 和 React 都是我很喜欢的前端框架，所以如有说得不对的地方，欢迎一起友好讨论交流。

<EditInfo time="2022-12-06 07:26" title="364977展现 · 23299阅读 · 163点赞 · 254评论 · 161收藏" />
