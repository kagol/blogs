# 从0到1搭建Vue组件库07：给组件库项目增加单元测试

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)

[Vue DevUI](https://gitee.com/devui/vue-devui)是一个通过开源社区孵化的 Vue3 开源组件库，这意味着从一开始`Vue DevUI`就不是靠个人维护的项目，而是通过社区共同的力量进行持续演进的。

由于是新项目，在技术选型时，我们都是用的最新的技术：
- 用`Vite`搭建基础工程和构建打包
- 用最新的`Vue3`语法编写组件
- 用`TypeScript`给代码增加类型系统
- 用`JSX`语法编写Vue组件，确保最大的灵活性
- 用`VitePress`搭建组件库的文档

刚开始我们只是搭了一个架子，写了一些组件，加了`commit`检查，工程化方面的东西还很不完善，没有单元测试、没有`eslint`、没有`cli`工具。

社区的小伙伴 [Brenner](https://gitee.com/brenner8023) 发现了这个问题，作为一个开源项目，怎么能没有单元测试呢？后面正式发布了，别人一看，单元测试都没有，还敢用吗？

所以`Brenner`同学在2021年6月13日，正式提交了一个[PR](https://gitee.com/devui/vue-devui/pulls/4)，给`Vue DevUI`增加了基于[Jest](https://jestjs.io/zh-Hans/docs/getting-started)和[Vue Test Utils](https://next.vue-test-utils.vuejs.org/guide/)的单元测试环境。

[Brenner](https://gitee.com/brenner8023) 是我们的早期贡献者，`vue devui`于`2021.5.1`正式在掘金招募`contributor`。

[让我们一起建设 Vue DevUI 项目吧！🥳 ](https://juejin.cn/post/6956988395016945701)

当时其实响应的人不算多，直到[Brenner](https://gitee.com/brenner8023)的出现，`Brenner`同学在6月13日悄悄地给`vue devui`提交了一个pr：

[https://gitee.com/devui/vue-devui/pulls/4](https://gitee.com/devui/vue-devui/pulls/4)

之后几乎每隔一个星期都有提交pr，完善了单元测试、eslint等代码检查工具，并提交了好几个组件，比如：
1. Radio
2. Checkbox
3. Switch
4. TagInput
5. Input

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1d43d78755d4c7e85ea066316bebc3d~tplv-k3u1fbpfcp-watermark.image?)

`Brenner`同学给了我很大的信心，虽然现在`Brenner`同学已经退居幕后，但正是因为他的早期的持续贡献，让`vue devui`有个重大突破。

2个月之后的8月3日，vue devui的组件数量达到10个，我们在掘金同步了这个消息。

[Vue DevUI 已经有10个组件成员啦～🥳😋 ](https://juejin.cn/post/6992233443585163300)

之后vue devui开始活跃，涌现了大量的田主和contributor。

让我们一起来看看，如何给Vue3组件库搭建单元测试环境，并给Vue组件增加单元测试。

## 1 引入 Jest

### 1.1 安装 Jest

```
yarn add -D jest @types/jest
```

### 1.2 增加脚本命令

package.json
```
"scripts": {
  "dev": "vite",
  "build": "vue-tsc --noEmit && vite build",
  "serve": "vite preview",
  "test": "jest" // 新增
},
```

### 1.3 编写测试用例

```
// Step 1: 定义一个测试套 Test Suite
describe('tree', () => {
  // Step 2: 定义一个单元测试 Test
  // i think 'tree should render correctly'
  it('tree should render correctly', () => {
    // Step 3: 期望（expect）tree组件的class里面包含（toContain）'devui-tree'
    expect(wrapper.classes()).toContain('devui-tree')
    
    // 期望（expect）tree组件的子元素数量为（toBe）6
    expect(wrapper.element.childElementCount).toBe(6)
  })
})
```

### 1.4 编写第一个单元测试

`devui/tree/__tests__/tree.spec.ts`

```
// Step 1: 定义一个测试套 Test Suite
describe('tree', () => {
  // Step 2: 定义一个单元测试 Test
  // i think 'tree should render correctly'
  it('should render correctly', () => {
    // Step 3: 编写测试断言，期望（expect）1等于1
    expect(1).toEqual(1)
  })
})
```

### 1.5 执行 test 命令

```
yarn test
```

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/82812dd3714e4b698508807785bddb18~tplv-k3u1fbpfcp-watermark.image?)

## 2 测试组件

### 2.1 安装`@vue/test-utils`

```
yarn add -D @vue/test-utils
```

### 2.2 编写组件测试代码

`devui/tree/__tests__/tree.spec.ts`

```
import { mount } from '@vue/test-utils'
import DTree from '../src/tree'

describe('tree', () => {
  it('should render correctly', () => {
    const wrapper = mount({
      components: { DTree },
      template: `
        <d-tree :data="data"></d-tree>
      `,
      setup() {
        const data = [{
          label: '一级 1', level: 1,
          children: [{
            label: '二级 1-1', level: 2,
            children: [{
              label: '三级 1-1-1', level: 3,
            }]
          }]
        }, {
          label: '一级 2', level: 1,
          open: true, // 新增
          children: [{
            label: '二级 2-1', level: 2,
            children: [{
              label: '三级 2-1-1', level: 3,
            }]
          }, {
            label: '二级 2-2', level: 2,
            children: [{
              label: '三级 2-2-1', level: 3,
            }]
          }]
        }, {
          label: '一级 3', level: 1,
          open: true, // 新增
          children: [{
            label: '二级 3-1', level: 2,
            children: [{
              label: '三级 3-1-1', level: 3,
            }]
          }, {
            label: '二级 3-2', level: 2,
            open: true, // 新增
            children: [{
              label: '三级 3-2-1', level: 3,
            }]
          }]
        }, {
          label: '一级 4', level: 1,
        }]

        return {
          data
        }
      }
    })

    expect(wrapper.classes()).toContain('devui-tree')
  })
})
```

再重新执行`yarn test`命令，发现报错啦～

## 3 遇到的问题及相应的解法

### 3.1 第一个报错：SyntaxError: Cannot use import statement outside a module

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3e65605ec30c46059731255c5957a9bd~tplv-k3u1fbpfcp-watermark.image?)

这是一个比较典型的问题，jest解析文件过程中遇到的语法问题。

报错信息也提示了可能的原因和解法：

```
    Here's what you can do:
     • If you are trying to use ECMAScript Modules, see https://jestjs.io/docs/ecmascript-modules for how to enable it.
     • If you are trying to use TypeScript, see https://jestjs.io/docs/getting-started#using-typescript
     • To have some of your "node_modules" files transformed, you can specify a custom "transformIgnorePatterns" in your config.
     • If you need a custom transformation specify a "transform" option in your config.
     • If you simply want to mock your non-JS modules (e.g. binary assets) you can stub them out with the "moduleNameMapper" config option.
```

大意是你可能引入了`ES6`、`TypeScript`，但是又没有配置相应的`transform`转换器。

#### 安装 babel-jest

先安装依赖`babel-jest`和`@babel/preset-env`

```
yarn add -D babel-jest @babel/preset-env
```

#### 配置 jest transform

jest.config.js
```
module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest', { presets: ['@babel/preset-env'] }
    ]
  },
};
```

再重新执行`yarn test`命令，发现`又报错啦`～

### 3.2 第二个报错：Cannot find module 'vue-template-compiler'

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61d3a1071ca442a381eef088527223b7~tplv-k3u1fbpfcp-watermark.image?)

这个问题其实是没有安装正确的`@vue/test-utils`导致的，默认安装的是vue2版本的`@vue/test-utils`，但我们是vue3组件库，需要安装`@vue/test-utils@next`。

我们先按照报错提示安装下`vue-template-compiler`试试看。

#### 安装依赖 vue-template-compiler

```
yarn add -D vue-template-compiler
```

再重新执行`yarn test`命令，发现`又双报错啦`～

### 3.3 第三个报错：Vue packages version mismatch

果然不是`vue-template-compiler`的问题，不过这个提示倒是提醒我们是版本不匹配的问题。

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/977d4043628544fbad911e141921f38a~tplv-k3u1fbpfcp-watermark.image?)

#### 安装Vue3版本的@vue/test-utils@next

```
yarn add -D @vue/test-utils@next
```

再重新执行`yarn test`命令，发现`又双叒报错啦`～

接下来是一系列的语法错误`SyntaxError`，都是没有配置相应的transform转换器导致的。

### 3.4 第四个报错：SyntaxError: Unexpected token, expected ","

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e425dc4f832b4ec1900e9610229e93fb~tplv-k3u1fbpfcp-watermark.image?)

#### 安装 @babel/preset-typescript

```
yarn add -D @babel/preset-typescript
```

#### 配置 @babel/preset-typescript

jest.config.js
```
module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest', {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript' // 新增
        ]
      }
    ]
  },
};
```

重新执行`yarn test`命令，还是报错～

### 3.5 第五个报错：SyntaxError: Unexpected token '<'

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/801cd2d84c4d4c07a73e3d9d5c77f145~tplv-k3u1fbpfcp-watermark.image?)

#### 安装 @vue/babel-plugin-jsx

```
yarn add -D @vue/babel-plugin-jsx
```

#### 配置 @vue/babel-plugin-jsx

jest.config.js
```
module.exports = {
  transform: {
    '^.+\\.(ts|tsx|js|jsx)$': [
      'babel-jest', {
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript'
        ],
        plugins: ['@vue/babel-plugin-jsx'] // 新增
      }
    ]
  },
};
```

继续执行`yarn test`命令，还是报错～

### 3.6 第六个报错：SyntaxError: Invalid or unexpected token

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/40fe4262c1094d04a1caca8a1586c6cc~tplv-k3u1fbpfcp-watermark.image?)

#### 修改样式导入

```
import './tree.scss'

->

import './tree'
```

再重新执行`yarn test`命令，发现`又双叒叕报错啦`～

### 3.7 第七个错：ReferenceError: document is not defined

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c832b4d3706445394576f5abb9838d5~tplv-k3u1fbpfcp-watermark.image?)

这个报错提示得很清楚：

```
The error below may be caused by using the wrong test environment, see https://jestjs.io/docs/configuration#testenvironment-string.
    Consider using the "jsdom" test environment.
```

测试环境错误，需要配置`jsdom`的测试环境。

#### 修改测试环境 testEnvironment

jest.config.js
```
testEnvironment: 'jest-environment-jsdom',
```

终于成功了！![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/54a9797041c84d4e84442b834d1bd2e3~tplv-k3u1fbpfcp-watermark.image?)

此处应该庆祝一下🎉！


![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d6470f55cb9444a9aa5eb0b6dc57583~tplv-k3u1fbpfcp-watermark.image?)

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/202bb63d018e46e2b83d423d467f69d4~tplv-k3u1fbpfcp-watermark.image?)

## 小结

本文主要分享搭建vue3组件库单元测试环境的步骤、遇到的问题及相应的解法。

1. 引入`jest`支持基本的单元测试
2. 引入`@vue/test-utils`支持vue组件的单元测试
3. 配置`jest.config.js`，增加`@babel/preset-env`和`@babel/preset-typescript`两个`preset`以支持`ES6`和`TS`语法，以及一个 `@vue/babel-plugin-jsx` plugin 以支持`JSX`语法
4. 配置`testEnvironment`为`jest-environment-jsdom`
5. 编写单元测试的三部曲：`测试套`、`单元测试`、`测试断言`
6. 分析了搭建单元测试环境中遇到的典型问题及相应的解决方案

## 欢迎一起建设 DevUI 开源项目

我们 `DevUI` 团队有多个开源项目，现在都在招募`contributor`，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加`DevUI`小助手的微信：`devui-official`，将你拉到我们的核心开发群)

- Ng DevUI: [https://github.com/DevCloudFE/ng-devui](https://github.com/DevCloudFE/ng-devui)
- Vue DevUI: [https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)
- DevUI Admin [https://github.com/DevCloudFE/ng-devui-admin](https://github.com/DevCloudFE/ng-devui-admin)

`DevUI`官网：[https://devui.design/](https://devui.design/)

也欢迎关注我和村长的【Vue DevUI开源指南】系列直播！

Vue DevUI开源指南系列直播打算分成两条线：
1. 组件设计和实现
2. 组件库的工程化

目前【组件设计和实现】已经完成了3期（还未结束）：
1. [【我要做开源】华为大佬亲授，Vue DevUI开源指南01：提交我的第一次pr](https://www.bilibili.com/video/BV1GU4y1N7eC/)
1. [【我要做开源】华为大佬亲授，Vue DevUI开源指南02：做一个有模有样的Tree组件](https://www.bilibili.com/video/BV1su411f7a1/)
1. [【我要做开源】华为大佬亲授，Vue DevUI开源指南03：学会“单测”才会有安全感！完成Tree组件！](https://www.bilibili.com/video/BV1Z64y187dR/)

【组件库工程化】已经完成了2期（正在进行中）：
1. [【我要做开源】华为大佬亲授，Vue DevUI开源指南04：组件库工程化建设之项目初始化、jsx支持](https://www.bilibili.com/video/BV1xR4y1H7yT/)
1. [【我要做开源】华为大佬亲授，Vue DevUI开源指南05：开源组件库中的文档建设，vitepress使用过程中的踩坑经历，克服这些困难你将收获多多！](https://www.bilibili.com/video/BV1r44y1x7sk)
1. [【我要做开源】Vue DevUI开源指南06：手把手带你开发一个脚手架 ](https://juejin.cn/post/7021915468046811144)

已经跟村长老师达成共识![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/744ce3b0c5ca4f5b9cc5285593166d7d~tplv-k3u1fbpfcp-watermark.image?)，只要村长老师的直播间不倒，只要还有小伙伴愿意参与进来，这个系列就会一直做下去！

欢迎大家持续关注、分享出去~我们一起来从0到1做一个vue3开源组件库！

每周五晚上九点，我们在村长的直播间，不见不散！

[村长直播间地址](https://live.bilibili.com/22531545)


<EditInfo time="2021年10月27日 00:20" title="阅读 1890 ·  点赞 34 ·  评论 7 ·  收藏 30" />


