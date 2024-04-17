# 从0到1搭建Vue组件库08：阶段性小结

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)

本文主要对之前的直播内容做一次阶段性的总结，将之前的内容穿起来，并搭建一个[mini-vue-devui](https://github.com/57code/mini-vue-devui)项目，后续组件开发和工程化，只需要在这个统一的仓库里进行就行，不用每一次都起一个新项目。

这个【Vue DevUI开源指南】的系列的直播本就是一个连贯的整体，我们通过它给大家分享vue3组件库的搭建流程和组件设计和开发的原理，欢迎大家持续关注呀～

整体搭建步骤：
1. 搭建一个支持`TypeScript`/`JSX`的`Vue3`组件库工程
1. 增加能展开/收起的`tree`组件
1. 增加`VitePress`文档系统
1. 增加demo代码展开/收起功能
1. 搭建`DevUI CLI`快速创建组件模板

## 1 搭建一个支持TypeScript/JSX的Vue3组件库工程

### 搭建Vue 3 + Typescript + Vite基础工程

```
yarn create vite mini-vue-devui --template vue-ts
```

```
cd mini-vue-devui
yarn
yarn dev
yarn build
```

### 引入sass

```
yarn add -D sass
```

### 引入JSX

```
yarn add -D @vitejs/plugin-vue-jsx
```

vite.config.ts
```
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx' // 新增

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx() // 新增
  ]
})
```

参考：
1. [【我要做开源】Vue DevUI开源指南04：使用Vite搭建一个支持TypeScript/JSX的Vue3组件库工程](https://juejin.cn/post/7017101147865350158)

## 2 增加能展开/收起的tree组件

### 组件

目录结构
```
├── devui
|  └── tree
|     ├── index.ts
|     └── src
|        ├── components
|        |  ├── icon-close.tsx
|        |  └── icon-open.tsx
|        ├── composables
|        |  └── use-toggle.ts
|        ├── tree-types.ts
|        ├── tree.scss
|        └── tree.tsx
```

#### 组件入口文件`tree/index.ts`

tree/index.ts
```
import type { App } from 'vue'
import Tree from './src/tree'

Tree.install = function(app: App): void {
  app.component(Tree.name, Tree)
}

export { Tree }

export default {
  title: 'Tree 树',
  category: '数据展示',
  status: '20%',
  install(app: App): void {
    app.use(Tree as any)
  }
}

```

#### 组件源文件 `tree/src/tree.tsx`

tree/src/tree.tsx
```
import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps, TreeData, TreeItem } from './tree-types'
import IconOpen from './components/icon-open'
import IconClose from './components/icon-close'
import useToggle from './composables/use-toggle'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: [],
  setup(props: TreeProps, ctx) {
    const { data } = toRefs(props)
    const { openedData, toggle } = useToggle(data.value)

    // 增加缩进的展位元素
    const Indent = () => {
      return <span style="display: inline-block; width: 16px; height: 16px;"></span>
    }

    const renderNode = (item: TreeItem) => {
      return (
        <div
          class={['devui-tree-node', item.open && 'devui-tree-node__open']}
          style={{ paddingLeft: `${24 * (item.level - 1)}px` }}
        >
          <div class="devui-tree-node__content">
            <div class="devui-tree-node__content--value-wrapper">
              {
                item.children
                  ? item.open
                    ? <IconOpen class="mr-xs" onClick={() => toggle(item)} /> // 给节点绑定点击事件
                    : <IconClose class="mr-xs" onClick={() => toggle(item)} /> // 给节点绑定点击事件
                  : <Indent />
              }
              <span class="devui-tree-node__title">{ item.label }</span>
            </div>
          </div>
        </div>
      )
    }    

    const renderTree = (tree: TreeData): JSX.Element[] => {
      return tree.map(item => {
        if (!item.children) {
          return renderNode(item)
        } else {
          return (
            <>
              {renderNode(item)}
              {renderTree(item.children)}
            </>
          )
        }
      })
    }

    return () => {
      return (
        <div class="devui-tree">
          { openedData.value.map((item: TreeItem) => renderNode(item)) }
        </div>
      )
    }
  }
})

```

#### 组件props和类型文件`tree-types.ts`

tree-types.ts
```
import type { PropType, ExtractPropTypes } from 'vue'

export interface TreeItem {
  label: string
  children: TreeData
  [key: string]: any
}

export type TreeData = Array<TreeItem>;

export const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    default: () => [],
  }
} as const

export type TreeProps = ExtractPropTypes<typeof treeProps>

```

#### 展开/收起的hooks `use-toggle.ts`

use-toggle.ts
```
import { ref } from 'vue'
import { TreeData, TreeItem } from '../tree-types'

export default function useToggle(data: TreeData): any {
  const openedTree = (tree: any) => {
    return tree.reduce((acc: TreeItem, item: TreeItem) => (
      item.open
        ? acc.concat(item, openedTree(item.children))
        : acc.concat(item)
    ), [])
  }

  const openedData = ref(openedTree(data)) // 响应式对象

  const toggle = (item: TreeItem) => {
    if (!item.children) return
    item.open = !item.open
    openedData.value = openedTree(data)
  }

  return {
    openedData,
    toggle,
  }
}
```

#### 图标组件

icon-close.tsx
```
const IconClose = (props: any) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      class={["svg-icon", props.class]}
    >
      <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0.5" y="0.5" width="15" height="15" rx="2" stroke="#252b3a"></rect>
        <path
          fill="#252b3a"
          d="M8.75,4 L8.75,7.25 L12,7.25 L12,8.75 L8.749,8.75 L8.75,12 L7.25,12 L7.249,8.75 L4,8.75 L4,7.25 L7.25,7.25 L7.25,4 L8.75,4 Z"
        ></path>
      </g>
    </svg>
  )
}

export default IconClose
```

icon-open.tsx
```
const IconOpen = (props: any) => {
  return (
    <svg
      width="16px"
      height="16px"
      viewBox="0 0 16 16"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      class={["svg-icon svg-icon-close", props.class]}
    >
      <g stroke-width="1" fill="none" fill-rule="evenodd">
        <rect x="0.5" y="0.5" width="15" height="15" rx="2" stroke="#5e7ce0"></rect>
        <rect x="4" y="7" width="8" height="2" fill="#5e7ce0"></rect>
      </g>
    </svg>
  )
}

export default IconOpen
```


### 文档

目录结构
```
├── docs
|  ├── components
|  |  └── tree
|  |     └── index.md
```

tree/index.md
```
<template>
  <d-tree :data="data"></d-tree>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([{
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
    }])

    return {
      data,
    }
  }
})
</script>
```

### 引入tree组件

```
import Tree from '../devui/tree'

createApp(App).use(Tree).mount('#app')
```

使用
```
<d-tree :data="data"></d-tree>
```

参考：
1. [【我要做开源】Vue DevUI开源指南01：提交我的第一次pr](https://juejin.cn/post/7009273646884028430)
1. [【我要做开源】Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件](https://juejin.cn/post/7011535488171376671)
1. [【我要做开源】Vue DevUI开源指南03：如何给 tree 组件增加展开/收起功能](https://juejin.cn/post/7015023354847428645)

## 3 增加VitePress文档系统

### 安装vitepress依赖

```
yarn add -D vitepress
```

### 编写`docs/index.md`文档

docs/index.md
```
## Hello VitePress
```

### 编写脚本命令
```
{
  "scripts": {
    "dev": "vite",
    "build": "vue-tsc --noEmit && vite build",
    "serve": "vite preview",
    "docs:dev": "vitepress dev docs", // 新增
    "docs:build": "vitepress build docs", // 新增
    "docs:serve": "vitepress serve docs" // 新增
  }
}
```

### 配置JSX

docs/vite.config.ts
```
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vueJsx()]
})
```

### 配置左侧菜单sidebar

docs/.vitepress/config.ts
```
const sidebar = {
  '/': [
    { text: '快速开始', link: '/' },
    {
      text: '通用'
    },
    {
      text: '导航',
    },
    {
      text: '反馈',
    },
    {
      text: '数据录入',
    },
    {
      text: '数据展示',
      children: [
        { text: 'Tree 树', link: '/components/tree/' },
      ]
    },
    {
      text: '布局',
    },
  ]
}

const config = {
  themeConfig: {
    sidebar,
  }
}

export default config
```

### 引入tree组件

docs/.vitepress/theme/index.ts
```
import Theme from 'vitepress/dist/client/theme-default'
import Tree from '../../../devui/tree'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Tree)
  }
}
```

### 编写tree组件的md文档

docs/components/tree/index.md
```
## Tree 树

<d-tree :data="data"></d-tree>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([{
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
    }])

    return {
      data
    }
  }
})
</script>
```

参考：
1. [【我要做开源】Vue DevUI开源指南05：给Vue3组件库添加VitePress文档系统](https://juejin.cn/post/7019314307682795534)

## 4 增加demo代码展开/收起功能

### 安装vitepress-theme-demoblock依赖

```
yarn add -D vitepress-theme-demoblock
```


### 配置 demoBlockPlugin

docs/.vitepress/config.ts
```
import { demoBlockPlugin } from 'vitepress-theme-demoblock'

const config = {
  themeConfig: {
    sidebar,
  },
  
  // 以下是新增的
  markdown: {
    config: (md) => {
      // 这里可以使用 markdown-it 插件，vitepress-theme-demoblock就是基于此开发的
      md.use(demoBlockPlugin)
    }
  }
}
```

### 配置 vitepress-rc 脚本命令

自动生成`docs/.vitepress/theme/register-components.js`
```
"register:components": "vitepress-rc"
```

### 注册Demo/DemoBlock组件

docs/.vitepress/theme/index.ts
```
import Theme from 'vitepress/dist/client/theme-default'
import Tree from '../../../devui/tree'

// 新增
// 主题样式
import 'vitepress-theme-demoblock/theme/styles/index.css'
// 插件的组件，主要是demo组件
import { registerComponents } from './register-components.js'

export default {
  ...Theme,
  enhanceApp({ app }) {
    app.use(Tree)
    
    // 新增
    registerComponents(app)
  }
}
```

### 编写demo展开/收起的md文档

docs/components/tree/index.md
```
## Tree 树

:::demo 渲染一棵基本树

```vue
<template>
  <d-tree :data="data"></d-tree>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([{
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
    }])

    return {
      data
    }
  }
})
</script>
//```
:::
```

参考：
1. [【我要做开源】Vue DevUI开源指南05：给Vue3组件库添加VitePress文档系统](https://juejin.cn/post/7019314307682795534#heading-13)

## 5 搭建`DevUI CLI`快速创建组件模板

### 安装依赖

```
yarn add -D commander inquirer fs-extra kolorist esbuild
```

### 开发命令脚本

devui-cli/index.js
```
#!/usr/bin/env node
import { Command } from 'commander'
import { onCreate } from './commands/create'

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  // 注册 create 命令
  .command('create')
  // 添加命令描述
  .description('创建一个组件模板或配置文件')
  // 添加命令参数 -t | --type <type> ，<type> 表示该参数必填，[type] 表示选填
  .option('-t --type <type>', `创建类型，可选值：component, lib-entry`)
  // 注册命令回调
  .action(onCreate)

// 执行命令行参数解析
program.parse()
```

devui-cli/commands/create.js
```
import inquirer from 'inquirer'
import { red } from 'kolorist'

// create type 支持项
const CREATE_TYPES = ['component', 'lib-entry']
// 文档分类
const DOCS_CATEGORIES = ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']

export async function onCreate(cmd = {}) {
  let { type } = cmd

  // 如果没有在命令参数里带入 type 那么就询问一次
  if (!type) {
    const result = await inquirer.prompt([
      {
        // 用于获取后的属性名
        name: 'type',
        // 交互方式为列表单选
        type: 'list',
        // 提示信息
        message: '（必填）请选择创建类型：',
        // 选项列表
        choices: CREATE_TYPES,
        // 默认值，这里是索引下标
        default: 0
      }
    ])
    // 赋值 type
    type = result.type
  }

  // 如果获取的类型不在我们支持范围内，那么输出错误提示并重新选择
  if (CREATE_TYPES.every((t) => type !== t)) {
    console.log(
      red(`当前类型仅支持：${CREATE_TYPES.join(', ')}，收到不在支持范围内的 "${type}"，请重新选择！`)
    )
    return onCreate()
  }

  try {
    switch (type) {
      case 'component':
        // 如果是组件，我们还需要收集一些信息
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件 name ，将用作目录及文件名：',
            validate: (value) => {
              if (value.trim() === '') {
                return '组件 name 是必填项！'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件中文名称，将用作文档列表显示：',
            validate: (value) => {
              if (value.trim() === '') {
                return '组件名称是必填项！'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类，将用作文档列表分类：',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])

        createComponent(info)
        break
      case 'lib-entry':
        createLibEntry()
        break
      default:
        break
    }
  } catch (e) {
    console.log(red('✖') + e.toString())
    process.exit(1)
  }
}

function createComponent(info) {
  // 输出收集到的组件信息
  console.log(info)
}

function createLibEntry() {
  console.log('create lib-entry file.')
}
```

### 添加脚本命令

package.json
```
{
    // --bundle 标识打包的入口文件
    // --format 转换为目标格式代码
    // --platform 目标平台，默认 browser
    // --outdir 输出目录
    // 开发时实时编译
    "dev": "esbuild --bundle ./src/index.js --format=cjs --platform=node --outdir=./lib --watch",
    // 打包命令
    "build": "esbuild --bundle ./src/index.js --format=cjs --platform=node --outdir=./lib",
    // 执行 create 命令，如果有多个命令，可以去掉 create ，使用时再传入
    "cli": "node ./lib/index.js create"
}
```

交互模式执行：
```
yarn cli
```

带参数直接执行：
```
yarn cli -t component // -t 是 --type 的别名
```

参考：
1. [【我要做开源】Vue DevUI开源指南06：手把手带你开发一个脚手架](https://juejin.cn/post/7021915468046811144)

## 往期B站录播地址

- [【我要做开源】华为大佬亲授，Vue DevUI开源指南01：提交我的第一次pr](https://www.bilibili.com/video/BV1GU4y1N7eC)
- [【我要做开源】华为大佬亲授，Vue DevUI开源指南02：做一个有模有样的Tree组件](https://www.bilibili.com/video/BV1su411f7a1)
- [【我要做开源】华为大佬亲授，Vue DevUI开源指南03：学会“单测”才会有安全感！完成Tree组件！](https://www.bilibili.com/video/BV1Z64y187dR)
- [【我要做开源】华为大佬亲授，Vue DevUI开源指南04：组件库工程化建设之项目初始化、jsx支持](https://www.bilibili.com/video/BV1xR4y1H7yT)
- [【我要做开源】华为大佬亲授，Vue DevUI开源指南05：开源组件库中的文档建设，vitepress使用过程中的踩坑经历，克服这些困难你将收获多多！](https://www.bilibili.com/video/BV1r44y1x7sk)
- [【我要做开源】华为大佬亲授，Vue DevUI开源指南06：开源组件库中的CLI脚手架建设，再也不用担心重复工作和代码风格混乱了！](https://www.bilibili.com/video/BV1QQ4y1i7VV)

## 欢迎参与devui开源项目

我们 `DevUI` 团队有多个开源项目，现在都在招募`contributor`，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加`DevUI`小助手的微信：`devui-official`，将你拉到我们的核心开发群)

- Ng DevUI: [https://github.com/DevCloudFE/ng-devui](https://github.com/DevCloudFE/ng-devui)
- Vue DevUI: [https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)
- DevUI Admin [https://github.com/DevCloudFE/ng-devui-admin](https://github.com/DevCloudFE/ng-devui-admin)

`DevUI`官网：[https://devui.design/](https://devui.design/)

`mini-vue-devui`项目仓库地址：[https://github.com/57code/mini-vue-devui](https://github.com/57code/mini-vue-devui)


<EditInfo time="2021年10月29日 19:08" title="阅读 2717 ·  点赞 28 ·  评论 7 ·  收藏 26" />
