# 从0到1搭建Vue组件库03：如何给 tree 组件增加展开/收起功能

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)


最近在与[村长](https://space.bilibili.com/480140591)老师一起做[直播](https://www.bilibili.com/video/BV1Z64y187dR)，给大家分享[vue devui](https://gitee.com/devui/vue-devui)开源组件库的建设，前面两期以从 0 开始开发一个 tree 组件为栗子🌰，介绍了如何实现一个能渲染多层节点的 tree 组件。

[实现能渲染一层节点的 tree 组件](https://juejin.cn/post/7009273646884028430)

[实现能渲染多层节点并带展开图标的 tree 组件](https://juejin.cn/post/7011535488171376671)

最终实现的效果如下：
![多层tree](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab34e2d95174074ba88a97cd3dace34~tplv-k3u1fbpfcp-watermark.image)

这只是实现了渲染的逻辑，tree 节点前面的减号图标是无法点击的，节点是无法收起的。

这次就将带大家一起实现点击图标展开/收起树节点的功能。

## 最终效果

我们需要实现的最终效果如下：

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c250b0bb6ada402c81db7d647a40f12b~tplv-k3u1fbpfcp-watermark.image?)

## 增加open标识

之前传入 tree 组件的 data 大致结构是这样的：

```
[
  {
    label: '一级 1', level: 1,
    children: [{
      label: '二级 1-1', level: 2,
    }]
  },
  ...
]
```

这样我并不知道哪些节点需要展开，哪些需要收起，所以第一步应该给需要展开的节点增加open字段。

比如我们希望让以下节点展开，其他都收起：
- 一级 2
- 一级 3
- 二级 3-2

改造后的数据结构如下：

```
[
  {
    label: '一级 1', level: 1,
    children: [...]
  },
  {
    label: '一级 2', level: 1,
    open: true, // 新增
    children: [...]
  },
  {
    label: '一级 3', level: 1,
    open: true, // 新增
    children: [{
      label: '二级 3-2', level: 2,
      open: true, // 新增
      children: [...]
    }]
  },
  {
    label: '一级 4', level: 1,
  }
]
```

## 渲染展开/收起图标

没有open字段的情况下，节点默认是全部展开的，节点前面的图标全部都是标识展开的减号图标。

现在有了open字段，我们可以根据该字段渲染展开（减号） or 收起（加号）图标，因此我们需要改造下`renderNode`方法。

```
const renderNode = (item) => {
  return (
    <div
      class="devui-tree-node"
      style={{ paddingLeft: `${24 * (item.level - 1)}px` }}
    >
      {
        item.children
          
          // Before
          // ? <IconOpen class="mr-xs" />
          
          // After
          ? item.open
            ? <IconOpen class="mr-xs" />
            : <IconClose class="mr-xs" />
          
          : <Indent />
      }
      { item.label }
    </div>
  )
}
```

## 基本渲染逻辑

1. 如果当前节点没有子节点，则直接渲染，节点无图标，根据当前层级显示相应数量的占位元素 Indent
1. 如果当前节点有子节点，open 属性不为 true，则直接渲染（不渲染子节点），前面的图标为 IconClose
1. 如果当前节点有子节点，open 属性为 true，则渲染当前节点+它的第一层子节点，前面的图标为 IconOpen
1. 如果子节点中又包含 open 为 true 的节点，则以此类推

## 只渲染展开的节点

为了方便渲染制定的节点，我们对之前的嵌套数据结构进行一些转换：
- 将数据拍平
- 过滤出 open 为 true 的节点数据

转换的基本思路是：
- 通过 reduce 方法进行递归，初始值为空数组`[]`
- 然后判断 item 数据是否有 open 属性
- 有的话将该数据+子数据都拼接起来
- 没有的话就只将该数据进行拼接

```
// 获取需要展开的节点数据（无嵌套结构的一维数组）
const openedTree = (tree) => {
  return tree.reduce((acc, item) => (
    item.open
      ? acc.concat(item, openedTree(item.children))
      : acc.concat(item)
  ), [])
}

const openedData = openedTree(data)
```

到这一步效果就已经有了，只是还不能交互。

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c250b0bb6ada402c81db7d647a40f12b~tplv-k3u1fbpfcp-watermark.image?)

## 给节点绑定点击事件

要实现点击图标展开/收起节点功能，就需要给节点图标绑定点击事件。

```
const renderNode = (item) => {
  return (
    <div
      class="devui-tree-node"
      style={{ paddingLeft: `${24 * (item.level - 1)}px` }}
    >
      {
        item.children
          ? item.open
            ? <IconOpen class="mr-xs" onClick={() => toggle(item)} /> // 给节点绑定点击事件
            : <IconClose class="mr-xs" onClick={() => toggle(item)} /> // 给节点绑定点击事件
          : <Indent />
      }
      { item.label }
    </div>
  )
}
```

```
const toggle = (item) => {
  // 展开/收起逻辑
}
```

## 处理展开/收起的逻辑

展开/收起功能，本质上就是改变当前节点数据的 open 字段：
- 如果当前 open 字段为 true，说明节点是展开的，点击图标时，应该将其设置为 false
- 如果当前没有 open 字段或者 open 字段为 false，说明节点是收起的，点击图标时，应该将其设置为 true

```
const toggle = (item) => {
  item.open = !item.open // 改变当前节点的open字段
}
```

这样我们的目标就完成了：

> 实现能展开/收起的 tree

不过目前代码都写在 tree 组件的 setup 方法里，加上之前的 renderNode 等方法，setup 方法已经有60+行代码，后续如果继续增加其他功能，setup 代码量会越来越大，也越来越不可读和难以维护，也就越容易出 bug。

因此需要对它进行重构，使用 vue3 的 [composition api](https://v3.cn.vuejs.org/guide/composition-api-introduction.html)，将节点展开/收起相关的变量和逻辑抽离到一个单独的`use-toggle.ts`文件中。

composables/use-toggle.ts

```
import { ref } from 'vue'

export default function useToggle(data: unknown): any {
  const openedTree = (tree) => {
    return tree.reduce((acc, item) => (
      item.open
        ? acc.concat(item, openedTree(item.children))
        : acc.concat(item)
    ), [])
  }

  const openedData = ref(openedTree(data)) // 响应式对象

  const toggle = (item) => {
    console.log('toggle', item, item.id, item.open);
    item.open = !item.open
    openedData.value = openedTree(data)
  }

  return {
    openedData,
    toggle,
  }
}
```

tree.tsx 中只需要引入需要的变量和方法即可。

```
import useToggle from './composables/use-toggle'

setup(props) {
  // 其他逻辑
  
  // 从 useToggle 中引入需要的变量和方法
  const { openedData, toggle } = useToggle(data.value)
  
  // 其他逻辑
}
```

## 小结

本文主要讲述如何一步步给 tree 组件增加展开/收起功能，并使用vue3的组合式api对这个功能从setup 中抽离。

## 欢迎参与devui开源项目

我们 `DevUI` 团队有多个开源项目，现在都在招募`contributor`，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加`DevUI`小助手的微信：`devui-official`，将你拉到我们的核心开发群)

- Ng DevUI: [https://github.com/DevCloudFE/ng-devui](https://github.com/DevCloudFE/ng-devui)
- Vue DevUI: [https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)
- DevUI Admin [https://github.com/DevCloudFE/ng-devui-admin](https://github.com/DevCloudFE/ng-devui-admin)

`DevUI`官网：[https://devui.design/](https://devui.design/)

<EditInfo time="2021年10月04日 09:55" title="阅读 2775 ·  点赞 25 ·  评论 12 ·  收藏 5" />

