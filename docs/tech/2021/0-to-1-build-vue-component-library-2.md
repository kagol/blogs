# 从0到1搭建Vue组件库02：实现一个能渲染多层节点的 Tree 组件

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)

欢迎大家围观Kagol和村长的直播，手把手带你一起为Vue DevUI开源组件库提交PR。

也欢迎大家参与到Vue DevUI的建设中来，可以加小助手微信 devui-official

Vue DevUI代码仓库：

[https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)

B站直播链接：

[https://www.bilibili.com/video/BV1GU4y1N7eC](https://www.bilibili.com/video/BV1GU4y1N7eC)


以下是正文：

## 渲染一层树节点

[上一期](https://juejin.cn/post/7009273646884028430)直播我们给大家分享了如何给Vue DevUI开源组件库提交第一个PR，并以tree组件为例子，介绍如何给Vue DevUI贡献组件，上次只开了个头，写了一个渲染一层树节点的非常简单的tree组件，并且只有data这一个api。

```
<d-tree :data="[{ label: '中国菜' }]"></d-tree>
```

```
import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: [],
  setup(props: TreeProps,) {
    return () => (
      <div class="devui-tree">
      	{ props.data.map(item => <div>{item.label}</div>) }
  		</div>
    )
  }
})
```

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbf2ab546e064bbaaf8c7a1bf1527bec~tplv-k3u1fbpfcp-zoom-1.image)

## 整体设计思路

实现一个tree组件，我们的第一直觉就是一层一层嵌套渲染子节点的dom结构，这么做会有一个问题，就是如果一棵树有非常多节点，并且嵌套层级非常深，我们很难用虚拟滚动的方式去进行优化，因此不可避免地导致性能问题。

我测试了ElementPlus组件库，使用Tree组件渲染5万个树节点，耗时6s左右，同样的数据量，AntDesign组件库的Tree组件耗时10s左右，但是AntDesign的Tree组件提供了虚拟滚动功能，开启虚拟滚动，加载时间瞬间降到1s以内，而且不会因为节点数的增加而影响性能。

而要使用虚拟滚动，就需要将嵌套结构变成平铺结构。

为了方便用户使用，我们设计的data属性依然使用嵌套结构，但是组件内部需要将其拍平，并用平铺的方式将树节点渲染到dom中。

data结构：

```
data: [
  {
    label: 'node-1',
    children: [
      {
      	label: 'node-11',
        children: [
          { label: 'node-111' },
          { label: 'node-112' },
        ],
      },
      {
      	label: 'node-12',
        children: [
          { label: 'node-121' },
          { label: 'node-122' },
          { label: 'node-123' },
        ],
      },
    ],
  },
  {
  	label: 'node-2'
  },
]
```

DOM结构：

```
<div class="node-1">
  <div class="node-11">
    <div class="node-111"></div>
    <div class="node-112"></div>
	</div>
  <div class="node-12">
    <div class="node-121"></div>
    <div class="node-122"></div>
    <div class="node-123"></div>
	</div>
</div>
<div class="node-2"></div>

->
  
<div class="node-1"></div>
<div class="node-11"></div>
<div class="node-111"></div>
<div class="node-112"></div>
<div class="node-12"></div>
<div class="node-121"></div>
<div class="node-122"></div>
<div class="node-123"></div>
<div class="node-2"></div>
```

## 引入SVG

由于tree组件节点前面一般会有一个小图标，为了方便使用svg图标，我们可以借助vite-svg-plugin插件。

安装vite-svg-loader插件

```
yarn add -D vite-svg-loader
```

docs/vite.config.ts

```
import path from 'path'
import { defineConfig } from 'vite'
import vueJsx from '@vitejs/plugin-vue-jsx'
import svgLoader from 'vite-svg-loader' // 引入vite-svg-loader插件

export default defineConfig({
  resolve: {
    alias: [
      { find: '@devui', replacement: path.resolve(__dirname, '../devui') },
    ]
  },
  plugins: [
    vueJsx({}),
    svgLoader(), // 使用vite-svg-loader插件
  ],
})
```

导入svg

```
import IconOpen from './assets/open.svg'
```

open.svg

```
<svg
  width="16px"
  height="16px"
  viewBox="0 0 16 16"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  xmlns:xlink="http://www.w3.org/1999/xlink"
  class="svg-icon svg-icon-close"
>
  <g stroke-width="1" fill="none" fill-rule="evenodd">
    <rect x="0.5" y="0.5" width="15" height="15" rx="2" stroke="#5e7ce0"></rect>
    <rect x="4" y="7" width="8" height="2" fill="#5e7ce0"></rect>
  </g>
</svg>
```

使用svg

```
<template>
  <IconOpen />
</template>

or

setup() {
  return () => <IconOpen />
}
```

## 给节点增加一个层级的标识level

不同层级节点的缩进是不一样的，我们需要一个level属性来标识当前节点的层级。

第一层的level是1，第二层是2，以此类推。

```
data: [
  {
    label: 'node-1',
    level: 1,
    children: [
      {
      	label: 'node-11',
    	level: 2,
        children: [
          { label: 'node-111', level: 3, },
          { label: 'node-112', level: 3, },
        ],
      },
      {
      	label: 'node-12',
    	level: 2,
        children: [
          { label: 'node-121', level: 3, },
          { label: 'node-122', level: 3, },
          { label: 'node-123', level: 3, },
        ],
      },
    ],
  },
  {
    label: 'node-2',
    level: 1,
  },
]
```

## 渲染多层树节点（重点）

渲染一层节点非常简单：

```
<div class="devui-tree">
  { props.data.map(item => <div>{item.label}</div>) }
</div>
```

渲染多层则需要定义一个渲染函数，在函数中做一次递归操作。

```
// 增加缩进的展位元素
const Indent = () => {
  return <span style="display: inline-block; width: 16px; height: 16px;"></span>
}

const renderNode = (item) => {
  return (
    <div class="devui-tree-node" style={{ paddingLeft: `${24 * (item.level - 1)}px` }}>
      { item.children ? <IconOpen class="mr-xs" /> : <Indent /> }
      { item.label }
    </div>
  )
}

const renderTree = (tree) => {
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
```

```
<div class="devui-tree">
  { renderTree(props.data) }
</div>
```

## 实现的效果

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab34e2d95174074ba88a97cd3dace34~tplv-k3u1fbpfcp-zoom-1.image)

## demo文档

````
## Tree 树

一种表现嵌套结构的组件。

#### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

#### 基础用法

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
      children: [{
        label: '二级 3-1', level: 2,
        children: [{
          label: '三级 3-1-1', level: 3,
        }]
      }, {
        label: '二级 3-2', level: 2,
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
      children: [{
        label: '二级 3-1', level: 2,
        children: [{
          label: '三级 3-1-1', level: 3,
        }]
      }, {
        label: '二级 3-2', level: 2,
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

#### Props

| 参数         | 类型    | 默认  | 说明                                     | 跳转 Demo |
| ------------ | ------- | ----- | ---------------------------------------- | --------- |
| data  | `TreeData`  | `[]`    | 必选，数据源                 |           |

#### TreeData 数据结构

| 参数        | 类型      | 默认值  | 说明                                                                     |
| ----------- | --------- | ------- | ------------------------------------------------------------------------ |
| label        | `string`  |  `-` | 文本内容 |
| children     | `TreeData`  | `-`     | 子节点                                               |
````

<EditInfo time="2021年09月25日 00:22" title="阅读 3041 ·  点赞 27 ·  评论 2 ·  收藏 11" />

