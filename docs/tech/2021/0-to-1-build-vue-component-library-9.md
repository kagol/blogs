# 从0到1搭建Vue组件库09：Monorepo改造

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)

## 0 上期直播回顾

上一次带着大家将【Vue DevUI开源指南】系列直播1-6期的所有内容串起来了，并诞生了[mini-vue-devui](https://github.com/57code/mini-vue-devui)项目，`mini-vue-devui`是一个迷你版的组件库产品，目前包含：
1. `vite`+`vue3`+`ts`+`jsx`+`sass`的基础工程
1. 基于`vitepress`+`vitepress-theme-demoblock`的文档系统
1. `jest`+`@vue/test-utils`的单元测试环境
1. 一个用`jsx`编写的初版Tree组件
1. 一个初版`devui-cli`脚手架

直播的最后，我们快速过了一下单元测试环境搭建的流程，但并没有手把手教，而是留了一个作业，这个作业最后由[QbjGKNick](https://github.com/57code/mini-vue-devui/pull/1)同学率先提交。

上一次直播的文章：
1. [手把手带你从0到1搭建一个vue3组件库：mini-vue-devui](https://juejin.cn/post/7024443197854056456)
2. [【我要做开源】给 vue devui 组件库项目增加单元测试](https://juejin.cn/post/7023409900239716382)

但这就是一个组件库的全部了吗？

这只是冰山一角而已。

这一期我们将继续之前的直播，完善`mini-vue-devui`项目，增加`Monorepo`支持，并打通组件库按需构建的流程。

## 1 为什么要做 monorepo 改造

### 1.1 启动 mini-vue-devui

```
## 克隆代码仓库到本地
git clone https://github.com/57code/mini-vue-devui.git

## 安装依赖
yarn // or npm i

## 本地启动
yarn docs:dev // or npm run docs:dev
```

效果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9d7006e8fd145de91e9dde7b7bd02b5~tplv-k3u1fbpfcp-watermark.image?)

### 1.2 lerna 简介

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f0c00468ada741c9869a3d6dbfcb8ffa~tplv-k3u1fbpfcp-watermark.image?)

[lerna](https://lerna.js.org/)官网这种图很形象地表示了lerna是做什么的：

> 整个多头龙的身体代表单体仓库，每个龙头代表一个个的子包，每个子包是独立的（每个龙头有自主意识），独立测试、独立启动、独立构建、独立部署互不影响。

简单来说，`lerna`就是一个用于管理具有多个包的JavaScript项目的工具。

我们一起来看看怎么使用`lerna`，并使用`yarn`+`lerna`将我们的`mini-vue-devui`项目改造成monorepo形式。

参考：
1. lerna 官网：[https://lerna.js.org/](https://lerna.js.org/)
2. 源码：[https://github.com/lerna/lerna](https://github.com/lerna/lerna)

### 1.3 mini-vue-devui 目前的目录结构

```
mini-vue-devui
├── devui // vue devui 组件库
├── devui-cli // devui cli 脚手架工具
├── docs // vitepress 文档系统
├── index.html
├── jest.config.js
├── lib
├── node_modules
├── package-lock.json
├── package.json
├── public
├── README.md
├── src
├── tsconfig.json
├── vite.config.ts
└── yarn.lock
```

可以看到：
1. devui // vue devui 组件库
1. devui-cli // devui cli 脚手架工具
1. docs // vitepress 文档系统

这三个最关键的模块都放在根目录下面，这样显得很混乱，并且不方便子模块的扩展，比如以后想做一个
- `eslint-config-plugin`
- 或者`devui-vscode-plugin`
- 或者`vue-devui-admin`
- 又或者是`react-devui`

这些子模块应该放在哪里呢？

如果全部放在根目录下，将会一片混乱，不可维护。

如果每一个都拆成一个代码仓库，又会存在
- 代码复用的问题
- 仓库的依赖重复安装的问题
- 仓库之间切换的成本

这就是`lerna`发挥价值的地方。

## 2 如何使用 lerna 将 mini-vue-devui 改造成 monorepo 方式？

### 2.1 全局安装 lerna

```
npm i lerna -g

```

### 2.2 初始化 lerna 工程

创建`mini-vue-devui`目录，在根目录下执行
```
lerna init
```

配置`lerna.json`文件

```
{
  "packages": [
    "packages/*"
  ],
  "version": "0.0.0",
  "npmClient": "yarn", // 新增，使用 yarn 包管理工具
  "useWorkspaces": true // 新增，使用 yarn workspaces
}
```

配置`package.json`

```
{
  "name": "mini-vue-devui",
  "private": true,
  "devDependencies": {
    "lerna": "^4.0.0"
  },
  
  // 新增，配置 packages 目录
  "workspaces": [
    "packages/*"
  ]
}
```

### 2.3 添加子包

```
lerna create devui-vue -y
```

将`mini-vue-devui`中的全部文件拷贝到`packages/devui-vue`目录中。

### 2.4 安装依赖

```
lerna bootstrap
```

### 2.5 本地启动

```
lerna exec --scope mini-vue-devui yarn docs:dev
```

启动成功！

### 2.6 构建

```
lerna exec --scope mini-vue-devui yarn docs:build
```

构建成功！

## 3 抽离 devui-cli

### 测试下功能

```
// 构建cli文件
lerna exec --scope mini-vue-devui yarn cli:build

// 执行cli命令，创建组件模板
lerna exec --scope mini-vue-devui yarn cli
```

### 创建 devui-cli 子包

```
lerna create devui-cli -y
```

将`packages/devui-vue/devui-cli`中的全部文件拷贝到`packages/devui-cli`目录中。

### 再次测试功能

```
// 构建cli文件
lerna exec --scope mini-vue-devui yarn cli:build

// 执行cli命令，创建组件模板
lerna exec --scope mini-vue-devui yarn cli
```

运行正常！

## DevUI 开源招募

加入[DevUI](https://devui.design/)开源生态建设你将收获什么？

直接的价值：
1. 通过打造一个实际的[vue3组件库项目](https://gitee.com/devui/vue-devui)，学习最新的`Vite`+`Vue3`+`TypeScript`+`JSX`技术
1. 学习从0到1搭建一个自己的组件库的整套流程和方法论，包括组件库工程化、组件的设计和开发等
1. 为自己的简历和职业生涯添彩，参与过优秀的开源项目，这本身就是受面试官青睐的亮点
1. 结识一群优秀的、热爱学习、热爱开源的小伙伴，大家一起打造一个伟大的产品

长远的价值：
1. 打造个人品牌，提升个人影响力
1. 培养良好的编码习惯
1. 获得华为云DevUI团队的荣誉&认可和定制小礼物
1. 成为PMC&Committer之后还能参与DevUI整个开源生态的决策和长远规划，培养自己的管理和规划能力
1. 未来有更多机会和可能

DevUI开源，未来可期！

添加DevUI小助手微信：`devui-official`，拉你到我们的官方交流群。

这是我们的开源故事：

[DevUI开源的故事](https://juejin.cn/post/7029092585452863525)


<EditInfo time="2021年11月11日 18:49" title="阅读 3551 ·  点赞 25 ·  评论 10 ·  收藏 9" />

