# 从0到1搭建Vue组件库01：提交我的第一次 PR

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)


欢迎大家围观Kagol和村长的直播，手把手带你一起为Vue DevUI开源组件库提交PR。

也欢迎大家参与到Vue DevUI的建设中来，可以加小助手微信 devui-official

Vue DevUI代码仓库：

[https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)

B站直播链接：

[https://www.bilibili.com/video/BV1GU4y1N7eC](https://www.bilibili.com/video/BV1GU4y1N7eC)

![B站直播分享图片.jpeg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f39ede310e3f4c599b6bde45905d0704~tplv-k3u1fbpfcp-watermark.image?)

以下是正文：

## 参与开源项目的步骤

参与开源的步骤：
1.  fork仓库
2.  生成和配置SSH公钥
3.  clone个人仓库代码
4.  本地启动项目
5.  本地开发和提交代码
6.  设置upstream和同步源仓库最新代码
7.  提交PR

### fork仓库

源仓库：<https://gitee.com/devui/vue-devui>

点击源仓库右上角的Fork按钮

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f316a78235a74d0282571f99a17d244b~tplv-k3u1fbpfcp-zoom-1.image)

在弹出框中选择自己的个人空间并确认

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f7d833c6cf204616a04c43abe7d2df03~tplv-k3u1fbpfcp-zoom-1.image)

这时会跳转到个人仓库空间：<https://gitee.com/kagol/vue-devui>

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e5a3bce5ac1e4020bda4935368c89d66~tplv-k3u1fbpfcp-zoom-1.image)

等待数秒，仓库就fork好了，可以看到个人仓库名称的下面有一个：

forked from DevUI/vue-devui

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7dd45c897cc0486aa11f33901e602b17~tplv-k3u1fbpfcp-zoom-1.image)

### 生成和配置SSH公钥

检查本地公钥：

```
cd ~/.ssh
```

生成SSH公钥：

```
ssh-keygen -t rsa -C kagol@sina.com
```

查看并拷贝SSH公钥：

```
cat ~/.ssh/id_rsa.pub
```

一般是以`ssh-rsa`开头，中间一长串字符，以个人邮箱结尾。

配置SSH公钥：

方式一：

直接输入链接：<https://gitee.com/profile/sshkeys>

方式二：

点击右上角的设置按钮：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9aec1cc70254326a87a6843a6c3f8ca~tplv-k3u1fbpfcp-zoom-1.image)

再点击左侧导航中安全设置的SSH公钥：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/832abb5d68ed40919851b1b4ad57be8e~tplv-k3u1fbpfcp-zoom-1.image)

即可进入SSH公钥配置页面。

把刚才复制下来的公钥粘贴到公钥文本框中，点击确定即完成SSH公钥配置。

### clone个人仓库代码

配置好SSH公钥，即可以clone代码啦。

复制SSH地址：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e6e2e36f2654c778ea4c55597ca4f5c~tplv-k3u1fbpfcp-zoom-1.image)

在VSCode终端中输入命令：

```
git clone git@gitee.com:kagol/vue-devui.git
```

等上数秒，即可完成仓库代码的克隆啦。

### 本地启动项目

要想快速了解一个开源项目，一般是先看下根目录下的README文档，里面有该项目的介绍，和快速上手的说明。

我们照着README文档将项目先启动起来：

```
## 安装依赖
yarn
## npm i

## 本地启动
yarn dev
## npm run dev
```

### 本地开发和提交代码

将本地修改的代码添加到git暂存区：

```
git add .
```

将暂存区的代码提交到本地git仓库:

```
git commit -m "feat: 增加基础版tree组件"
```

将本地git仓库代码push到远程个人仓库：

```
git push origin dev
```

### 设置upstream和同步源仓库最新代码

查看远程仓库地址：

```
git remote -v
```

默认情况下clone的仓库有以下两个远程地址：

```
$ git remote -v
origin  git@gitee.com:kagol/vue-devui.git (fetch)
origin  git@gitee.com:kagol/vue-devui.git (push)
```

为了同步源仓库最新代码，我们需要配置一个upstream地址：

```
git remote add upstream git@gitee.com:devui/vue-devui.git
```

配置完我们在查看下远程仓库配置：

```
$ git remote -v
origin  git@gitee.com:kagol/vue-devui.git (fetch)
origin  git@gitee.com:kagol/vue-devui.git (push)
upstream    git@gitee.com:devui/vue-devui.git (fetch)
upstream    git@gitee.com:devui/vue-devui.git (push)
```

可以看到多了两个upstream地址。

同步源仓库最新代码到本地：

```
git pull upstream dev
```

### 提交PR

访问个人仓库的PR页面：<https://gitee.com/kagol/vue-devui/pulls>

点击右上角的新建Pull Request按钮：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ef4bb280a684838b1331c97988f8ddb~tplv-k3u1fbpfcp-zoom-1.image)

源分支选择个人仓库kagol/vue-devui的分支，目标分支选择devui/vue-devui的分支：![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6331d18ad60a4a289e2b8489d71eb95a~tplv-k3u1fbpfcp-zoom-1.image)编写PR的标题、描述，选择一个标签，查看下改动的内容，确保提交的代码没有问题，点击创建按钮：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc28eba0590d482a9463a55f01a9b8c7~tplv-k3u1fbpfcp-zoom-1.image)

PR就创建好了，并自动跳转到PR详情页面：<https://gitee.com/devui/vue-devui/pulls/111>![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/04c29eb0059540949f91fc7d9ba009e2~tplv-k3u1fbpfcp-zoom-1.image)后续就是Vue DevUI组件库项目的管理员对你提交的PR进行代码检视，没问题就可以合入啦～

## Tree组件的案例

步骤：

1.  使用命令创建一个新组件tree
1.  给tree组件生成新的组件库入口文件

<!---->

3.  给tree组件生成网站左侧导航
3.  给tree组件生成demo文档

<!---->

5.  预览tree组件的demo文档
5.  编写tree组件的基本渲染逻辑

\


### 使用命令创建一个新组件tree

```
yarn cli:create
```

选择组件component

### 给tree组件生成新的组件库入口文件

```
yarn cli:create
```

选择vue-devui

### 给tree组件生成网站左侧导航

```
yarn cli:create
```

选择vitepress/sidebar

### 给tree组件生成demo文档

创建sites/components/tree/index.md文件

### 预览tree组件的demo文档

```
yarn dev
```

访问：`http://localhost:3000/components/tree/`

### 编写tree组件的基本渲染逻辑

devui/tree/src/tree.tsx

```
import { defineComponent, toRefs } from 'vue'
import { treeProps, TreeProps } from './tree-types'
import './tree.scss'

export default defineComponent({
  name: 'DTree',
  props: treeProps,
  emits: [],
  setup(props: TreeProps, ctx) {
    const { data } = toRefs(props)
    console.log('data:', data, data.value)

    return () => {
      return <div class="d-tree">{
        data.value.map(item => {
          return <div>{item.label}</div>
        })
      }</div>
    }
  }
})
```

### 在demo中使用tree组件

sites/components/tree/index.md

````
## Tree 树

一种表现嵌套结构的组件。

#### 何时使用

文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。

:::demo

```vue
<template>
  <d-tree :data="data"></d-tree>
</template>
<script>
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const data = ref([{
      label: '一级 1',
      children: [{
        label: '二级 1-1',
        children: [{
          label: '三级 1-1-1'
        }]
      }]
    }, {
      label: '一级 2',
      children: [{
        label: '二级 2-1',
        children: [{
          label: '三级 2-1-1'
        }]
      }, {
        label: '二级 2-2',
        children: [{
          label: '三级 2-2-1'
        }]
      }]
    }, {
      label: '一级 3',
      children: [{
        label: '二级 3-1',
        children: [{
          label: '三级 3-1-1'
        }]
      }, {
        label: '二级 3-2',
        children: [{
          label: '三级 3-2-1'
        }]
      }]
    }])

    return {
      data
    }
  }
})
</script>
```

:::
````

### 组件props和TS类型文件

```js
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

<EditInfo time="2021年09月18日 22:03" title="阅读 2398 ·  点赞 24 ·  评论 13 ·  收藏 20" />
