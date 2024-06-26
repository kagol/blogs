# 从错误中学习：分享 Vue DevUI 组件库开发过程中遇到的一些问题

![image](https://user-images.githubusercontent.com/9566362/201511264-8b55b842-cc14-4e87-a398-ba2fe46f5816.png)


DevOps理论中有一个很重要的观点：在复杂的系统中工作时，我们不可能预测到所有的结果。

因此错误或缺陷在所难免，我们要将错误视作机会，学习和自我改进的机会，当我们深刻理解了错误，我们就能避免下一次更严重的错误。

[Vue DevUI](https://gitee.com/devui/vue-devui) 是 Vue3 版本的 DevUI 组件库，基于 [Ng DevUI](https://devui.design/)。

Vue DevUI 使用最新的技术栈进行开发：
- 使用`Vite`搭建基础工程（[【我要做开源】Vue DevUI开源指南04：使用Vite搭建一个支持TypeScript/JSX的Vue3组件库工程 ](https://juejin.cn/post/7017101147865350158)）
- 使用`VitePress`搭建文档系统（[【我要做开源】Vue DevUI开源指南05：给Vue3组件库添加VitePress文档系统](https://juejin.cn/post/7019314307682795534)）
- 使用`Vue3`+`TypeScript`+`JSX`进行组件开发（[【我要做开源】Vue DevUI开源指南03：如何给 tree 组件增加展开/收起功能](https://juejin.cn/post/7015023354847428645)）
- 使用`Jest`+`@vue/test-utils`进行单元测试
- 使用`eslint`/`stylelint`/`ls-lint`进行代码规范检查

在开发 Vue DevUI 的过程中，我们也遇到不少问题：
1. 有些是我们的contributor提的issue
2. 有些在和村长直播过程中发现的问题
3. 还有一些和VitePress文档系统相关

以下是本文将要分享的问题列表：

- 8.16 [vitepress中使用自定义指令导致的问题](https://gitee.com/devui/vue-devui/issues/I45VB6)
- 9.18 defineEmit导致的文档启动白页问题
- 10.3 [使用window浏览器变量导致的vitepress ssr构建问题](https://gitee.com/devui/vue-devui/issues/I4D06D)

## 问题一：vitepress中使用自定义指令导致的问题

### 问题背景和描述

第一个问题最早可以追溯到8月16日，由`vue devui`的早期贡献者[wailen](https://gitee.com/laiweilun)提出 [I45VB6](https://gitee.com/devui/vue-devui/issues/I45VB6)，当时`vue devui`的文档系统刚刚切换到`vitepress`一个多星期。

以下是`wailen`同学当时提的issue：

[yarn build时会报错（loading组件报错）](https://gitee.com/devui/vue-devui/issues/I45VB6)

当时通过执行`yarn build`文档构建命令就可以很轻易地复现该错误：

报错信息如下：

```
SyntaxError: Custom directive is missing corresponding SSR transform and will be ignored.
```

以下是当时`wailen`的截图：

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/989ca47033a24fb98be9def1ab64a08a~tplv-k3u1fbpfcp-watermark.image?)

不过当时`vue devui`项目刚开始活跃，大家都忙着提交pr、提交issue、检视和合入代码，没有太关注到这个issue，而且当时咱们的网站还没有通过域名访问，不需要部署实际的主机，也就不需要执行`yarn build`构建生产包，因此都没关注到这个问题。

### 问题分析

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3c66ed40af194a1dacd54358ce602c68~tplv-k3u1fbpfcp-watermark.image?)

看截图的报错信息，是`vitepress`构建过程中遇到了语法错误导致构建失败，提示`自定义指令缺少服务端渲染的转换器`：

```
SyntaxError: Custom directive is missing corresponding SSR transform and will be ignored.
```

很幸运，报错提示定位到了具体的文件：

```
file: D:/code/vue-devui/sites/components/loading/index.md:124:3
```

这个文件是`Loading`组件的md文档，以下是会导致构建错误的内容：
```
<div
  v-dLoading="promises.value"
  :backdrop="true"
  message="One moment please..."
  style="margin-top: 20px; width: 100%; height: 80px; padding: 10px;"
>loading will show here2</div>
```

可以看到这个只用了一个`v-dLoading`的自定义指令，而`vitepress`文档使用的构建方式SSR服务端渲染，SSR过程中没有相应的`transform`转换器来解析这个vue的自定义指令，所以构建文档报错啦。

### 解决方案

知道问题的原因，解决起来就很容易啦。

- 一种方案是为这个自定义指令编写相应的transform
- 另一种方案是安装[patch-vue-directive-ssr](https://www.npmjs.com/package/patch-vue-directive-ssr)补丁

我们选择第二种方案：

```
yarn add -D patch-vue-directive-ssr
```

`patch-vue-directive-ssr`补丁包专门用于修补`@vue/compiler-ssr`，以使用SSR/SSG方式构建vue自定义指令。

## 问题二：defineEmit 导致的文档启动白页问题

### 问题背景和描述

这个问题最早发现于9月18日和村长在B站直播的那个晚上，以下是直播的录播地址：

[【我要做开源】华为大佬亲授，Vue DevUI开源指南01：提交我的第一次pr](https://www.bilibili.com/video/BV1GU4y1N7eC/)

这个问题发生在执行`yarn dev`命令启动组件库文档的时候，执行完`yarn dev`命令，在浏览器地址栏输入`http://localhost:3000/`访问文档，出现白页。

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f97321f940ab444abb9a943bcd7dbfb5~tplv-k3u1fbpfcp-watermark.image?)

### 问题分析

打开浏览器控制台，发现红色的报错，提示了一个语法错误：

```
Uncaught SyntaxError: The requested module '/vue-devui/node_modules/.vite/vue.js' does not provide an export named 'defineEmit'
```

依然非常幸运，这个报错定位到了具体的文件：

```
/vue-devui/sites/.vitepress/devui-theme/components/NavBar.vue
```

这个文件从`vue`中导入了`defineEmit`这个方法：

```
<script setup lang="ts">
import { defineEmit } from 'vue'
import NavBarTitle from './NavBarTitle.vue'
import NavLinks from './NavLinks.vue'
import ToggleSideBarButton from './ToggleSideBarButton.vue'

defineEmit(['toggle'])
</script>
```

错误就发生在这里。

非常巧，正好直播那天晚上，我们将`vue devui`的`vue`版本升级到了`vue@3.1.5`，从`3.1.5`这个版本开始，vue的一些api发生了变化，比如这里的`defineEmit -> defineEmits`。

### 解决方案

知道了原因，答案呼之即出。

> 直接把 `defineEmit` 改成 `defineEmits` 即可。

以下是当时直播间手速最快的 [hzttw](https://gitee.com/hzttw) 同学提的 pr：

[解决启动报错问题](https://gitee.com/devui/vue-devui/pulls/114)

## 问题三：使用 window/document 等浏览器变量导致的 vitepress ssr 构建问题

### 问题背景和描述

这也是一个非常典型的问题，最早发现于国庆节期间，当时我打算将 vue devui 的网站部署到域名，但我又不想购买云主机，所以打算白嫖码云的：部署到`gitee.io`域名。

部署之前得先构建网站的生产包，没想到那么久没执行`yarn build`命令，执行完直接报错了，先是包了问题一那个问题：

```
SyntaxError: Custom directive is missing corresponding SSR transform and will be ignored.
```

这个问题好解决，直接安装 [patch-vue-directive-ssr](https://www.npmjs.com/package/patch-vue-directive-ssr) 补丁包即可：

```
yarn add -D patch-vue-directive-ssr
```

安装完补丁包这个问题解决，再次构建还是出错，报了另一个错 [I4D06D](https://gitee.com/devui/vue-devui/issues/I4D06D)：

```
ReferenceError: window is not defined
```

### 问题分析

很不幸，这个报错没有定位到具体的文件。

以下是报错的详细信息：

```
✓ building client + server bundles...
✖ rendering pages...
build error:
 ReferenceError: window is not defined
    at /vue-devui-theme/node_modules/vitepress/dist/client/app/temp/app.js:932:3
    at Module.<anonymous> (/vue-devui-theme/node_modules/vitepress/dist/client/app/temp/app.js:937:2)
    at Module._compile (internal/modules/cjs/loader.js:999:30)
    at Module._extensions..js (internal/modules/cjs/loader.js:1027:10)
    at extensions..js (/vue-devui-theme/node_modules/esbuild-register/dist/node.js:2696:24)
    at Object.newLoader [as .js] (/vue-devui-theme/node_modules/esbuild-register/dist/node.js:2262:9)
    at Module.load (internal/modules/cjs/loader.js:863:32)
    at Function.Module._load (internal/modules/cjs/loader.js:708:14)
    at Module.require (internal/modules/cjs/loader.js:887:19)
    at require (internal/modules/cjs/helpers.js:74:18)
error Command failed with exit code 1.
info Visit https://yarnpkg.com/en/docs/cli/run for documentation about this command.
```

都是构建报错，我们对比下问题一的报错信息：

```
[vite:vue] Custom directive is missing corresponding SSR transform and will be ignored.
file: /Users/kagol/Documents/Kagol/code/vue-devui-theme/sites/components/loading/index.md:124:3
✖ building client + server bundles...
build error:
 SyntaxError: Custom directive is missing corresponding SSR transform and will be ignored.
    at Object.createCompilerError (/Users/kagol/Documents/Kagol/code/vue-devui-theme/node_modules/@vue/compiler-core/dist/compiler-core.cjs.js:19:19)
    ...
```

还是发现了一些不同，问题一的报错出现在`build bundles`阶段，而现在这个报错`build bundles`是成功的：

```
✓ building client + server bundles...
```

但是`render pages`阶段失败了：

```
✖ rendering pages...
```

这里涉及到 vitepress ssr 构建的知识。

通过阅读`vitepress`源码，我们了解到我们执行`vitepress build docs`命令时，实际上构建的过程分成两个步骤：
1. 调用`bundle`方法，使用`vite`进行`ssr`构建，也就是构建日志中的`building client + server bundles...`
2. 调用`renderPage`方法，使用`vue router`的`router.go(routePath)`进行页面的渲染，也就是构建日志中的`rendering pages...`

但是渲染页面的时候，`vitepress`并不知道具体是哪个文件出错，所以没法给出定位到具体文件的详细提示信息。

> 这时就需要靠有经验的程序员的直觉进行问题定位了。

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c70630b47014d1db6831444dfcdcc51~tplv-k3u1fbpfcp-watermark.image?)

由于是服务端渲染，并没有浏览器环境，只是一个nodejs的环境，因此`window`变量肯定是不存在的，所以提示：

```
ReferenceError: window is not defined
```

但到底是哪个文件导致的报错呢？

先尝试全局搜索下关键字`window`，一共有20个文件包含`window`：

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6a896a1b90847cb9be8b455519ef575~tplv-k3u1fbpfcp-watermark.image?)

再加个点`window.`缩小下范围，还有17个文件包含`window.`：

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc911b9e15224dd781b5c4d15230f9a3~tplv-k3u1fbpfcp-watermark.image?)

通过慢慢分析每一个文件，就能解决这个问题。

### 解决方案

这个棘手的问题最终由[Zcating](https://gitee.com/zcating)同学解决。

[fix(build): 修复 vitepress 打包时出现的问题](https://gitee.com/devui/vue-devui/pulls/186)

`Zcating`同学是`devui`开源组织的核心成员，从去年`Ng DevUI`刚开始开源以来就一直非常活跃，而且给我们的掘金专栏投过6篇`RxJS`原理分析的文章，`vue devui`组件库的第一个组件`Button`就是`Zcating`同学贡献的。

除了`Button`组件，`Zcating`同学还是`Modal`/`Overlay`等多个组件的田主，不仅频繁活跃地检视代码，而且承担着`vue devui`最复杂组件`Table`的设计和开发工作。

`Zcating`同学也在运营一个公众号：`zcx的工作室`，欢迎大家关注呀～

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbfc895d48034d64ac6e4eac8085d570~tplv-k3u1fbpfcp-watermark.image?)

主要解决手段包括：
1. 定义`inBrowser`方法，在使用了window等浏览器变量的地方提前返回
2. 将包含window等浏览器变量的代码移到`onMounted`生命周期事件中

感兴趣的小伙伴可以看下[Zcating](https://gitee.com/zcating)同学的pr：

[fix(build): 修复 vitepress 打包时出现的问题](https://gitee.com/devui/vue-devui/pulls/186)

<EditInfo time="2021年10月26日 00:04" title="阅读 2684 ·  点赞 21 ·  评论 6 ·  收藏 12" />
