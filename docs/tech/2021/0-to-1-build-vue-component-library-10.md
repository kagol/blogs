# 从0到1搭建Vue组件库10：如何实现组件的按需打包📦

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)

## 0 上期直播回顾

上一次带着大家将【Vue DevUI开源指南】系列直播1-6期的所有内容串起来了，并诞生了[mini-vue-devui](https://github.com/57code/mini-vue-devui)项目，`mini-vue-devui`是一个迷你版的组件库产品，目前包含：
1. `vite`+`vue3`+`ts`+`jsx`+`sass`的基础工程
1. 基于`vitepress`+`vitepress-theme-demoblock`的文档系统
1. `jest`+`@vue/test-utils`的单元测试环境
1. 一个用`jsx`编写的初版Tree组件
1. 一个初版`devui-cli`脚手架

直播的最后，我们快速过了一下单元测试环境搭建的流程，但并没有手把手教，而是留了一个作业，这个作业最后由[QbjGKNick](https://github.com/57code/mini-vue-devui/pull/1)同学率先提交。

最终的 效果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9d7006e8fd145de91e9dde7b7bd02b5~tplv-k3u1fbpfcp-watermark.image?)

上一次直播的文章：
1. [手把手带你从0到1搭建一个vue3组件库：mini-vue-devui](https://juejin.cn/post/7024443197854056456)
2. [【我要做开源】给 vue devui 组件库项目增加单元测试](https://juejin.cn/post/7023409900239716382)

但这就是一个组件库的全部了吗？

这只是冰山一角而已。

这一期我们将继续之前的直播，完善`mini-vue-devui`项目，打通组件库按需构建的流程，并增加`Monorepo`支持。

## 1 组件库入口文件

`devui/vue-devui.ts`
```
import type { App } from 'vue'
import TreeInstall, { Tree } from './tree'

const installs = [
  TreeInstall,
]

export {
  Tree,
}

export default {
  version: '0.0.1',
  install(app: App): void {
    installs.forEach((p) => app.use(p as any))
  }
}
```

## 2 增加全量构建脚本

新增`devui-cli/commands/build.js`文件

```
const path = require('path')
const fs = require('fs')
const { defineConfig, build } = require('vite')
const vue = require('@vitejs/plugin-vue')
const vueJsx = require('@vitejs/plugin-vue-jsx')

const entryDir = path.resolve(__dirname, 'devui-vue/devui')
const outputDir = path.resolve(__dirname, 'devui-vue/build')

const baseConfig = defineConfig({
  configFile: false,
  publicDir: false,
  plugins: [ vue(), vueJsx() ]
})

const rollupOptions = {
  external: ['vue', 'vue-router'],
  output: {
    globals: {
      vue: 'Vue'
    }
  }
}

//全量构建
const buildAll = async () => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, 'vue-devui.ts'),
        name: 'vue-devui',
        fileName: 'vue-devui',
        formats: ['es', 'umd']
      },
      outDir: outputDir
    }
  }))
}

const buildLib = async () => {
  await buildAll()
}

buildLib()
```

## 3 修改`package.json`

```
"main": "vue-devui.umd.js",
"module": "vue-devui.es.js",

"build:components": "node ./devui-cli/commands/build.js",
"build:lib": "yarn predev && yarn build:components && cp package.json build && cp README.md build",
```

测试全量组件库构建

```
yarn build:lib
```

使用组件库

`src/main.ts`
```
import { createApp } from 'vue'
import App from './App.vue'

// import Tree from '../devui/tree'
import MiniVueDevUI from '../build'

createApp(App)
// .use(Tree)
 .use(MiniVueDevUI)
.mount('#app')
```

启动

```
yarn dev
```

## 4 增加按需构建脚本

修改`devui-cli/commands/build.js`文件

```
const fsExtra = require('fs-extra')

// 单组件按需构建
const buildSingle = async (name) => {
  await build(defineConfig({
    ...baseConfig,
    build: {
      rollupOptions,
      lib: {
        entry: path.resolve(entryDir, name),
        name: 'index',
        fileName: 'index',
        formats: ['es', 'umd']
      },
      outDir: path.resolve(outputDir, name)
    }
  }))
}

// 生成组件的 package.json 文件
const createPackageJson = (name) => {
  const fileStr = `{
  "name": "${name}",
  "version": "0.0.0",
  "main": "index.umd.js",
  "module": "index.es.js",
  "style": "style.css"
}`

  fsExtra.outputFile(
    path.resolve(outputDir, `${name}/package.json`),
    fileStr,
    'utf-8'
  )
}

const buildLib = async () => {
  await buildAll()

  // 获取组件名称组成的数组
  const components = fs.readdirSync(entryDir).filter(name => {
    const componentDir = path.resolve(entryDir, name)
    const isDir = fs.lstatSync(componentDir).isDirectory()
    return isDir && fs.readdirSync(componentDir).includes('index.ts')
  })

  // 循环一个一个组件构建
  for(const name of components) {
    // 构建单组件
    await buildSingle(name)
    
    // 生成组件的 package.json 文件
    createPackageJson(name)
  }
}

buildLib()
```

测试按需构建

```
yarn build:lib
```

使用组件库

`src/main.ts`
```
import { createApp } from 'vue'
import App from './App.vue'

// import Tree from '../devui/tree'
// import MiniVueDevUI from '../build'
import Tree from '../build/tree'

createApp(App)
// .use(Tree)
// .use(MiniVueDevUI)
.use(Tree)
.mount('#app')
```

启动

```
yarn dev
```

正常！

参考：
- [build: 增加按需打包脚本](https://gitee.com/devui/vue-devui/pulls/93)
- [vite库模式构建生产版本](https://cn.vitejs.dev/guide/build.html#library-mode)

<EditInfo time="2021年11月11日 20:46" title="阅读 4017 ·  点赞 26 ·  评论 6 ·  收藏 21" />
