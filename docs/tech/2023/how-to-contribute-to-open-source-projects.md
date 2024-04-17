# 如何为开源项目做贡献


大家好，我是 Kagol，个人公众号：前端开源星球。

随着开源在国内的热度逐年上升，越来越多开发者投入开源的怀抱。

为了给开源入门者提供一个快速的指引，我与前端杨村长在B站做了一个系列的直播，带大家走进开源的世界，这是一个开放、自由、充满无限可能的世界，你能在其中：

- 学习新技术
- 磨练编程技能
- 结识优秀开发者
- 天马行空地编码创作
- 收获知识、友谊、荣誉、自信和尊敬

在开源的世界里，并不看你的出身，要想获得发言权、赢得人们的尊敬，只有通过贡献，通过持续不断地创造价值才可以。

## 第一步：选择一个适合自己的开源项目

当我们决定迈出参与开源的第一步，而不是停留在使用开源阶段，首先要做的就是选择一个适合自己的开源项目。

每个开源项目有自己的特点、技术栈、发展阶段，能和我们的个人发展匹配上的、符合我们口味的、我们能参与进去的，才是我们应该选择的开源项目，而不能只看 Star 数和知名度。

根据 GitHub Topic 来寻找开源项目是一个好的选择。

[https://github.com/topics](https://github.com/topics)

比如我喜欢 Vue，想选一个 Vue 相关的开源项目，就可以在 Vue 话题下找。

[https://github.com/topics/vue](https://github.com/topics/vue)

![Vue Topic.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ffe532286e744e4b1a2b6d8a95bed70~tplv-k3u1fbpfcp-watermark.image?)

这个项目卡片里面有项目描述，可以让我们快速了解这个项目是干什么的，从而决定是否做进一步的了解。

比如我们选择了 TinyVue 项目，它的描述信息如下

> 一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端。

我想知道怎么实现一套同时支持 Vue2 和 Vue3 的组件库，就可以进入它的项目仓库：

[https://github.com/opentiny/tiny-vue](https://github.com/opentiny/tiny-vue)

一般看以下信息：
- Issues 问题
- Pull requests 拉取请求
- Insights Pulse 洞察项目活跃度

现有的 Issues 列表是参与贡献的好机会，一般先选择带 `good-first-issue` 或者 `welcome-pr` 标签的 Issue。

[good-first-issue](https://github.com/opentiny/tiny-vue/labels/good%20first%20issue)

![good-first-issue.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a8d309579d44c43ab324515a561cefb~tplv-k3u1fbpfcp-watermark.image?)

Pull requests 列表可以历史 PR 被检视和合入的情况，也可以预测未来你提交的 PR 被检视和合入的可能性。

Insights Pulse 一般用来洞察项目的活跃度，主要显示近一周该项目的 Issue、PR、Contributor、Commit 等数据。

![TinyVue Pulse 活跃度.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/201f645f3d7d418db16fe7caed0d1ad6~tplv-k3u1fbpfcp-watermark.image?)

比如 TinyVue 项目，近一周有：
- 17 位贡献者
- 17 个 PR
- 10 个 Issue

是一个非常活跃和新兴的开源项目，也很适合参与进来。

## 第二步：初步了解这个开源项目

一旦我们凭感觉选择了一个开源项目，就要开始了解这个开源项目，一般有以下途径：
- GitHub 仓库：README、贡献指南、源代码等
- 官网
- 社区和社群

以 TinyVue 组件库项目为例，通过阅读 REAME，我们能知道：
- 它是什么：一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端。
- 有什么特点：一套代码同时支持 Vue2 / Vue3，组件支持配置式开发、适合低代码平台。
- 怎么安装和使用
- 如何本地启动项目
- 如何加入社群、参与贡献
- 开源协议是 MIT

看完 README，我们对 TinyVue 就有了一个初步的印象。

想要进一步了解，可以添加小助手微信：opentiny-official，加入技术交流群，不错过它的最新资讯。

也可以访问官网：[https://opentiny.design/tiny-vue](https://opentiny.design/tiny-vue)

做更加全面的了解，包括：
- 它有哪些组件
- 组件有哪些能力
- 每个组件怎么使用

## 第三步：尝试使用和体验下这个开源项目

只是看文档只能形成表面的理解，要想深入了解这个开源项目，还得亲自用用看。

通过前面的了解，我们已经知道如何使用，接下来就是亲自实操。

三步即可在你的项目中使用 TinyVue：
- 安装依赖：`npm i @opentiny/vue`
- 引入组件：`import { Button as TinyButton } from '@opentiny/vue'`
- 使用组件：`<tiny-button>OpenTiny</tiny-button>`

值得一提的是，我们的组件 Demo 是可以直接编辑生效的。

![demo实时编辑.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5343672a78e44e9b1d8569e7f52cfa9~tplv-k3u1fbpfcp-watermark.image?)

Button 比较简单，我们再来看一个复杂一点的组件：[DatePicker](https://opentiny.design/tiny-vue/zh-CN/os-theme/components/date-picker)

```vue
<template>
  <div style="width: 270px">
    <tiny-date-picker v-model="value"></tiny-date-picker>
  </div>
</template>

<script lang="jsx">
import { DatePicker } from '@opentiny/vue'

export default {
  components: {
    TinyDatePicker: DatePicker
  },
  data() {
    return {
      value: ''
    }
  }
}
</script>
```

直接把 Demo 代码拷贝过来就能用，效果如下

![DatePicker.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2615c4d53086479fbb1a15978f8ebcd4~tplv-k3u1fbpfcp-watermark.image?)

## 第四步：给开源项目反馈问题也是一种贡献

从这一步是一个分界线，界定了开源项目的用户和贡献者。

如果你在使用开源项目过程中，遇到了问题，并且你将自己发现的问题反馈给社区，你就成为了广义上的贡献者。

一般会通过 Issue 来反馈项目问题，这里有几个需要注意的：

- 取一个清晰易懂的标题
- 在描述中补充更多信息
- 详细的复现步骤或需求说明

如果项目配置了 Issue 模板，你在创建 Issue 时会需要选择是报告一个问题还是提出一个需求。

![issue模板.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a273f74f0ce04c43b57d522e897a2a60~tplv-k3u1fbpfcp-watermark.image?)

如果是报告问题，标题会自动带上 `🐛 [Bug]: ` 前缀；如果是新需求，则会带上 `✨ [Feature]: ` 前缀。

报告问题时，标题格式为：

- 在什么场景下
- 什么组件或模块
- 出了什么问题

比如：[🐛 [Bug]: 表格组件，设置 列左右冻结固定 时，会出现 行数据错位的情况](https://github.com/opentiny/tiny-vue/issues/129)

Issue 描述里需要详细描述：
- 这个问题的表现是什么
- 按照什么样的步骤能复现这个问题
- 相应的截图和示例代码

如果是提出一个新需求，标题格式为：
- 我希望给哪个组件或模块
- 提供一个什么功能

比如：[✨ [Feature]: tabs 添加按钮希望挨着tab标签，在大屏幕上，如果放到右侧，移动距离太远](https://github.com/opentiny/tiny-vue/issues/127)

## 第五步：参与实际的代码贡献

随着你频繁地使用一个开源项目，你会发现它的更多问题，而开源项目有自己的规划和版本节奏，不一定能及时响应你提出的问题和需求，这时你会希望能参与共建，参与实际的代码贡献。

这时你一般需要仔细看一遍[贡献指南](https://github.com/opentiny/tiny-vue/blob/dev/CONTRIBUTING.zh-CN.md)文档。

比如 TinyVue 的贡献指南就非常详细地介绍了如何参与贡献：
1. 点击 [TinyVue](https://github.com/opentiny/tiny-vue) 代码仓库右上角的 Fork 按钮，将上游仓库 Fork 到个人仓库
2. Clone 个人仓库到本地
3. 关联上游仓库，方便同步上游仓库最新代码
4. 在 Tiny Vue 根目录下运行 `pnpm i`, 安装 node 依赖
5. 运行 `pnpm dev`，启动组件库网站
6. 打开浏览器访问：<http://127.0.0.1:6175/>
7. 请确保你已经完成本地启动中的步骤，并能正常访问：<http://127.0.0.1:6175/>
8. 同步上游仓库 dev 分支最新代码：git pull upstream dev
9. 从上游仓库 dev 分支创建新分支 `git checkout -b username/feature1 upstream/dev`，分支名字建议为 `username/feat-xxx` / `username/fix-xxx`
10. 本地编码
11. 遵循 [Commit Message Format](https://www.conventionalcommits.org/zh-hans/v1.0.0/) 规范进行提交，不符合提交规范的 PR 将不会被合并
12. 提交到远程仓库：git push origin branchName
13. 打开 TinyVue 代码仓库的 [Pull requests](https://github.com/opentiny/tiny-vue/pulls) 链接，点击 New pull request 按钮提交 PR
14. 项目 Committer 进行 Code Review，并提出意见
15. PR 作者根据意见调整代码，请注意一个分支发起了 PR 后，后续的 commit 会自动同步，无需重新提交 PR
16. 项目管理员合并 PR

总结起来就是：
- 先 Fork 项目，并将项目代码克隆到本地
- 本地启动项目
- 编码开发，修复问题或实现特性
- 提交 PR

贡献的步骤其实很简单，但是要参与贡献却是要付出大量时间和精力的，非常感谢为开源项目作出贡献的所有开发者们，也希望你们在开源世界里收获自己想要的，并享受这个过程。

最后给大家推荐一个 GitHub 官方出品的开源软件指南：

[https://opensource.guide/zh-hans/](https://opensource.guide/zh-hans/)

![GitHub开源指南.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf82c900d6c34b75b57216b72ead53e3~tplv-k3u1fbpfcp-watermark.image?)

---

欢迎加入 OpenTiny 开源社区。

添加微信小助手：opentiny-official，一起参与共建！

[OpenTiny](https://opentiny.design/) 官网：https://opentiny.design/

[Vue组件库](https://opentiny.design/tiny-vue)：https://opentiny.design/tiny-vue 

[Angular组件库](https://opentiny.design/tiny-ng)：https://opentiny.design/tiny-ng 

OpenTiny 代码仓库：https://github.com/opentiny/ （欢迎 Star ⭐）

<EditInfo time="2023-04-22 15:09" title="6219展现 · 801阅读 · 6点赞 · 0评论 · 1收藏" />
