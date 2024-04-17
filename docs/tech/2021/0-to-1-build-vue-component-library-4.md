# 从0到1搭建Vue组件库04：使用 Vite 搭建一个支持 TypeScript / JSX 的 Vue3 组件库工程

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)


最近在与[村长](https://space.bilibili.com/480140591)老师一起做[直播](https://www.bilibili.com/video/BV1Z64y187dR)，给大家分享[vue devui](https://gitee.com/devui/vue-devui)开源组件库的建设，前面三期以 tree 组件为栗子🌰，介绍了如何设计和开发Vue组件：
1. [Vue DevUI开源指南01：提交我的第一次pr](https://juejin.cn/post/7009273646884028430)
1. [Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件](https://juejin.cn/post/7011535488171376671)
1. [Vue DevUI开源指南03：如何给 tree 组件增加展开/收起功能](https://juejin.cn/post/7015023354847428645)

这次给大家分享组件库工程化相关的内容。

后续的直播也会分成两条线：
1. 一条是组件的设计和实现
1. 另一条是组件库的工程化

欢迎大家持续关注～

## 上一次直播内容回顾

-   先是停下来，给上上次的tree组件（渲染嵌套的多层节点）增加单元测试
-   然后完善tree组件，实现展开/收起功能
-   并使用vue3的组合式API，对该功能进行重构，实现useToggle方法，将该功能从setup中抽离出来

最终实现的效果：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc92cb2779bb4089a00ba7b0d2fc5ae9~tplv-k3u1fbpfcp-zoom-1.image)

## 1 创建基础项目工程

使用yarn创建一个vite工程，并使用`vue-ts`（Vue3+TypeScript）模板。

```
yarn create vite vite-demo --template vue-ts

# or
# npm init vite@latest vite-demo -- --template vue-ts
```

```
$ yarn create vite vite-demo --template vue-ts
yarn create v1.22.10
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Installed "create-vite@2.6.6" with binaries:
      - create-vite
      - cva

Scaffolding project in /kagol/vite-demo...

Done. Now run:

  cd vite-demo
  yarn
  yarn dev

✨  Done in 5.46s.
```

创建完成之后，非常友好地提示了下一步要做什么：

```
  cd vite-demo
  yarn
  yarn dev
```

我们按照提示的步骤一步一步把项目先启动起来。

### 安装依赖

```
$ yarn
yarn install v1.22.10
warning package.json: No license field
info No lockfile found.
warning vite-demo@0.0.0: No license field
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...
success Saved lockfile.
✨  Done in 7.33s.
```

### 本地启动

本地启动直接执行的是不带任何参数的`vite`命令

```
"dev": "vite",
```

启动速度非常快，只花了402ms

```
$ yarn dev
yarn run v1.22.10
warning package.json: No license field
$ vite
Pre-bundling dependencies:
  vue
(this will be run only when your dependencies or config have changed)

  vite v2.6.5 dev server running at:

  > Local: http://localhost:3000/
  > Network: use `--host` to expose

  ready in 402ms.
```

### 浏览器看效果

在浏览器地址栏输入以下链接查看效果：

`http://localhost:3000/`


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e96beb1cf3274b92bb883cb0a30f8d33~tplv-k3u1fbpfcp-zoom-1.image)


### 构建生产包

```
"build": "vue-tsc --noEmit && vite build",
```

生产构建的脚本，`vue-ts`模板和`vue`模板不一样的地方是，`vue-ts`模板增加了类型检查的命令：
```
vue-tsc --noEmit
```

在构建的过程中，会检查有没有类型错误，并提示出来。

```
$ yarn build
yarn run v1.22.10
warning package.json: No license field
$ vue-tsc --noEmit && vite build
vite v2.6.5 building for production...
✓ 14 modules transformed.
dist/assets/logo.03d6d6da.png    6.69 KiB
dist/index.html                  0.48 KiB
dist/assets/index.31b3d229.js    1.95 KiB / gzip: 1.03 KiB
dist/assets/index.459f8680.css   0.34 KiB / gzip: 0.24 KiB
dist/assets/vendor.2acfe60d.js   49.61 KiB / gzip: 19.93 KiB
✨  Done in 11.09s.
```

## 2 一些关键文件

使用`tree`命令看下目录结构

```
$ tree -l 3
/kagol/vite-demo
├── README.md
├── index.html
├── package.json
├── public
|  └── favicon.ico
├── src
|  ├── App.vue
|  ├── assets
|  |  └── logo.png
|  ├── components
|  |  └── HelloWorld.vue
|  ├── env.d.ts // vue-ts模板
|  └── main.ts
├── tsconfig.json // vue-ts模板
└── vite.config.ts

directory: 4 file: 11
```

### package.json

一个开源项目，首先关注的是它的`package.json`文件，里面有该项目的基本信息、脚本命令和依赖库等信息。

```
{
  "name": "vite-demo",
  "version": "0.0.0",
  "scripts": {
    "dev": "vite", // 本地启动
    "build": "vue-tsc --noEmit && vite build", // 构建生产包，增加了vue-tsc类型检查 vue模板为 vite build
    "serve": "vite preview" // 预览生产包效果
  },
  "dependencies": {
    "vue": "^3.2.16"
  },
  "devDependencies": {
    "@vitejs/plugin-vue": "^1.9.3", // 提供 Vue 3 单文件组件支持
    "typescript": "^4.4.3", // vue-ts模板
    "vite": "^2.6.4",
    "vue-tsc": "^0.3.0" // volar的子包，vue3的ts类型检查工具（可选） vue-ts模板
  }
}
```

一共有5个依赖

运行态依赖：vue

开发态依赖：
- vite
- @vitejs/plugin-vue 提供 Vue 3 单文件组件支持的vite插件
- typescript
- vue-tsc vue3的类型检查工具，可选

### vite.config.ts

这个是vite的配置文件，里面主要引入了一个`@vitejs/plugin-vue`插件，用来为vue3单文件组件提供支持。

后续我们要支持`jsx`等其他功能，都可以通过配置相应的插件来提供支持。

```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()]
})
```

### tsconfig.json

这个文件是`vue-ts`模板才有的，用来提供TypeScript支持。主要指定了一些ts的编译选项和需要编译的文件/文件夹。

```
{
  // 编译选项 https://www.tslang.cn/docs/handbook/compiler-options.html
  "compilerOptions": {
    "target": "esnext",              // 目标语言的版本
    "useDefineForClassFields": true, // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier
    "module": "esnext",              // 指定生成代码的模块标准
    "moduleResolution": "node",      // 决定如何处理模块
    "strict": true,                  // 启用所有严格类型检查选项
    "jsx": "preserve",               // 在.tsx文件里支持JSX https://www.tslang.cn/docs/handbook/jsx.html
    "sourceMap": true,               // 生成目标文件的sourceMap文件
    "resolveJsonModule": true,       // 为了import json文件方便
    "esModuleInterop": true,         // 为了import cjs文件方便 https://zhuanlan.zhihu.com/p/148081795
    "lib": ["esnext", "dom"]         // 编译过程中需要引入的库文件的列表
  },
  
  // 指定编译器需要编译的文件或文件夹
  "include": ["src/**/*.ts", "src/**/*.d.ts", "src/**/*.tsx", "src/**/*.vue"]
}
```

### index.html

index.html是网站的入口文件，它和一般的html文件不太一样，引入`main.ts`文件入口ts文件的`<script>`标签是带有`type="module"`属性的，用来支持ES6模块。

```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vite App</title>
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.ts"></script>
  </body>
</html>
```

没有加`type="module"`的话，浏览器控制台会报错：

```
Uncaught SyntaxError: Cannot use import statement outside a module
```

### main.ts

main.ts是vue的入口文件，主要创建了一个vue实例，并挂载到dom中。

这里可以用来安装vue插件。

```
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
```

### App.vue

这个是Vue应用的根组件。

```
<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### env.d.ts

vue组件的类型声明，不添加该文件会提示：

```
找不到模块“./App.vue”或其相应的类型声明。
```

## 3 添加 jsx 支持

我们希望能在项目中使用jsx编写的组件，先编写一个最简单的jsx函数式组件：`HelloWorld.tsx`

```
export const HelloWorld = () => <div>Hello World jsx</div>
```

然后在`App.vue`中引入该组件。

```
import { HelloWorld } from './components/HelloWorld'

<HelloWorld />
```

### 报错：Uncaught ReferenceError: React is not defined

由于没有引入jsx的支持，意料之中的报错了

```
Uncaught ReferenceError: React is not defined
    at HelloWorld (HelloWorld.tsx:1)
```

报这个错的原因，村长老师已经在直播间讲得很清楚了，一句话解释：

> Babel解析xx.tsx文件时，会把它当成React组件，而咱们项目中又没有引入React，所以报错了

解决的方式就是引入一个`@vitejs/plugin-vue-jsx`插件。

### 引入vite插件：@vitejs/plugin-vue-jsx

安装插件

```
yarn add -D @vitejs/plugin-vue-jsx
```

引入插件

在`vite.config.ts`的`plugins`中引入vueJsx插件

```
import vueJsx from '@vitejs/plugin-vue-jsx'

plugins: [vue(), vueJsx()]
```

### 接第一次直播的 tree 组件

在第一次直播中，我和村长一起给大家分享了如何参与开源项目，并给Vue DevUI组件库添加了一个基础版的Tree组件：

[Vue DevUI开源指南01：提交我的第一次pr](https://www.bilibili.com/video/BV1GU4y1N7eC)

这个tree组件就是用jsx的方式写的，我们一起来回顾下：

新建一个`tree.tsx`文件：
```
import { defineComponent, ExtractPropTypes, PropType } from 'vue'

// 定义类型和组件的props，这部分一般会放在一个单独的文件中
interface TreeItem {
  label: string
  children?: TreeData
}

type TreeData = Array<TreeItem>

const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    default: () => [],
  }
}

type TreeProps = ExtractPropTypes<typeof treeProps>

// vue组件定义，和`.vue`组件中的`<script>`标签中的一样，只是不再需要写`<template>`，setup中可以直接使用
export default defineComponent({
  name: 'DTree',
  props: treeProps,
  setup(props: TreeProps) {
    console.log('props:', props, props.data)
    return () => {
      return <div class="devui-tree">
        { props.data.map(item => <div>{ item.label }</div>) }
      </div>
    }
  }
})
```

然后在`App.vue`中使用 tree 组件，传入`data`参数。

```
import { ref } from 'vue'

import DTree from './components/tree'

const data = ref([{
  label: '一级 1',
  children: [{
    label: '二级 1-1',
    children: [{
      label: '三级 1-1-1'
    }]
  }]
}, ...])

<d-tree :data="data"></d-tree>
```

也欢迎我们之前的几期[Vue DevUI](https://gitee.com/devui/vue-devui)组件库建设的内容：
- [如何给 tree 组件增加展开/收起功能](https://juejin.cn/post/7015023354847428645)
- [Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件](https://juejin.cn/post/7011535488171376671)
- [Vue DevUI开源指南01：提交我的第一次pr](https://juejin.cn/post/7009273646884028430)

# 欢迎参与devui开源项目

我们 `DevUI` 团队有多个开源项目，现在都在招募`contributor`，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加`DevUI`小助手的微信：`devui-official`，将你拉到我们的核心开发群)

- Ng DevUI: [https://github.com/DevCloudFE/ng-devui](https://github.com/DevCloudFE/ng-devui)
- Vue DevUI: [https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)
- DevUI Admin [https://github.com/DevCloudFE/ng-devui-admin](https://github.com/DevCloudFE/ng-devui-admin)

`DevUI`官网：[https://devui.design/](https://devui.design/)


<EditInfo time="2021年10月10日 00:25" title="阅读 4651 ·  点赞 29 ·  评论 10 ·  收藏 24" />
