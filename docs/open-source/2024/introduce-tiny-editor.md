# TinyEditor：一个基于 Quill 2.0 的富文本编辑器，功能强大、开箱即用！

你好，我是 Kagol，个人公众号：`前端开源星球`。

今年4月份，听到 Quill 2.0 正式发布的消息，我心情非常激动，立马体验了下，并写了一篇文章。

[重回铁王座！时隔5年！Quill 2.0 终于发布啦🎉](https://juejin.cn/post/7361284455535755299)

由于越来越多用户声音希望提供富文本组件，于是我们基于 Quill 2.0 封装了一个功能更全面的 Fluent Editor 富文本。

- 官网：[https://opentiny.github.io/tiny-editor/](https://opentiny.github.io/fluent-editor/)
- 源码：[https://github.com/opentiny/tiny-editor/](https://github.com/opentiny/tiny-editor/)（欢迎 Star ⭐）

接下来我就带大家一起使用下 Fluent Editor，使用起来基本上和 Quill 没什么区别，只需要重点关注下增强的部分，比如表格、附件、@提醒、表情等模块。

## 1 快速上手

Fluent Editor 基于 Quill 2.0 进行封装，扩展了很多实用的模块功能，使用方式和 Quill 一样。

安装依赖：
```shell
npm i @opentiny/fluent-editor
```


编写 HTML：
```html
<div id="editor">
  <p><strong>Fluent Editor</strong> 是一个基于 <a class="ql-normal-link" href="https://quilljs.com/" target="_blank">Quill 2.0</a> 的富文本编辑器，在 Quill 基础上扩展了丰富的模块和格式，功能强大、开箱即用。</p>
  <p><br></p>
  <p>官网：<a class="ql-normal-link" href="https://opentiny.github.io/tiny-editor/" target="_blank">https://opentiny.github.io/tiny-editor/</a></p>
  <p>源码：<a class="ql-normal-link" href="https://github.com/opentiny/fluent-editor/" target="_blank">https://github.com/opentiny/fluent-editor/</a>（欢迎 Star ⭐）</p>
</div>
```

引入样式：
```css
@import '@opentiny/fluent-editor/style.css';
```

初始化 Fluent Editor 编辑器：
```javascript
import FluentEditor from '@opentiny/fluent-editor'

const editor = new FluentEditor('#editor', {
  theme: 'snow'
})
```

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/9e8fd2bb04cf4617b3dc9f0d55d49a97~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239296&x-orig-sign=p9nCAE2Nvk1A0BleSVdtKijaQGo%3D)

## 2 配置工具栏

配置工具栏是最常见的需求。

Fluent Editor 支持 27 种内置工具栏按钮，当然也可以扩展。

除了支持 Quill 内置的 22 种工具栏之外，还支持以下工具栏：

-   `undo` 撤销
-   `redo` 重做
-   `better-table` 表格
-   `file` 文件上传，需要启用 `file` 模块
-   `emoji` 插入表情，需要启用 `emoji-toolbar` 模块

Quill 支持的工具栏: <https://quilljs.com/docs/modules/toolbar>

可以通过 toolbar 模块配置工具栏按钮：

```javascript
import FluentEditor from '@opentiny/fluent-editor'

const toolbarOptions = [
  ['undo', 'redo'],                                 // Fluent Editor added
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean'],                                         // remove formatting button
  ['better-table', 'file', 'emoji']                  // Fluent Editor added
]

const editor = new FluentEditor('#editor', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions,
    syntax: true,          // 代码块高亮
    file: true,            // 文件上传
    'emoji-toolbar': true, // 插入表情
  }
})
```

![toolbar.PNG](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/c1eac02120d44f7997d80367e3ea852a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239296&x-orig-sign=3keic3oIws%2FskgoT%2B%2Bgfrsg07zE%3D)

除了配置内置的工具栏，也支持扩展工具栏按钮，具体扩展方式可以参考我之前写的文章：

[深入浅出 Quill 系列之实践篇2：整个贪吃蛇游戏到编辑器里玩儿吧](https://juejin.cn/post/7328292293915344946)

或者参考 Quill 官方文档：[https://quilljs.com/docs/modules/toolbar#handlers](https://quilljs.com/docs/modules/toolbar#handlers)

## 3 配置内置模块

Fluent Editor 支持 11 种内置模块：

1. clipboard 粘贴版
2. history 操作历史
3. keyboard 键盘事件
4. syntax 语法高亮
5. toolbar 工具栏
6. uploader 文件上传
7. formula 公式，依赖 katex 公式库
8. ⭐better-table 表格
9. ⭐mention @提醒
10. ⭐emoji-toolbar 插入表情
11. ⭐file 附件上传，配合 file format 一起使用，可以插入附件

通过 modules 配置模块，比如要启用一个模块，可以设置该模块为 true。

```javascript
const editor = new FluentEditor('#editor', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions,
    syntax: true,          // 启用代码块高亮模块
    file: true,            // 启用文件上传模块
    'emoji-toolbar': true, // 启用插入表情模块
  }
})
```

还可以传入一些配置项，定制模块的功能，比如：配置表格右键操作菜单。

```javascript
const editor = new FluentEditor('#editor', {
  theme: 'snow',
  modules: {
    toolbar: toolbarOptions,
    'better-table': {
      operationMenu: {
        color: {
          text: '主题色',
          colors: [
            '#ffffff', '#f2f2f2', '#dddddd', '#a6a6a6', '#666666', '#000000',
            '#c00000', '#ff0000', '#ffc8d3', '#ffc000', '#ffff00', '#fff4cb',
            '#92d050', '#00b050', '#dff3d2', '#00b0f0', '#0070c0', '#d4f1f5',
            '#002060', '#7030a0', '#7b69ee', '#1476ff', '#ec66ab', '#42b883',
          ]
        }
      }
    }
  }
})
```

![better-table模块配置.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/8d33f8e8114c48e2b7c5123cddf448c5~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239296&x-orig-sign=%2FNJZu9qULH4NR1e6vhl4Ok5o81I%3D)

更多使用方式可参考 Fluent Editor 和 Quill 文档：
- Fluent Editor：[https://opentiny.github.io/fluent-editor/docs/custom-toolbar](https://opentiny.github.io/fluent-editor/docs/custom-toolbar)
- Quill：[https://quilljs.com/docs/modules](https://quilljs.com/docs/modules)

## 4 配置 Quill 生态模块

Quill 是一个模块化的富文本，拥有很多外部生态模块，Fluent Editor 基于 Quill，和 Quill 拥有一样的模块化能力，我们从以下 Quill 模块列表中选择一个 Markdown 快捷键的模块：`quill-markdown-shortcuts`，配置到我们的 Fluent Editor 富文本中。

[https://github.com/quilljs/awesome-quill](https://github.com/quilljs/awesome-quill)

首先需要安装 `quill-markdown-shortcuts`。

```shell
npm i quill-markdown-shortcuts
```

然后注册这个模块：

```javascript
import FluentEditor from '@opentiny/fluent-editor'

// 引入和注册
import MarkdownShortcuts from 'quill-markdown-shortcuts'

FluentEditor.register('modules/markdownShortcuts', MarkdownShortcuts)
```

配置到 modules 中即可：

```javascript
new FluentEditor('#editor', {
  theme: 'snow',
  modules: {
    markdownShortcuts: {} // 启动 Markdown 快捷键模块
  }
})
```

这时我们在富文本编辑器中输入 Markdown 语法的快捷键，比如：`#`，按空格键，会自动变成一级标题的格式。

效果如下：

![2024-08-17 16.11.16.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/afea4c4f80b84dde933118a17cffed1c~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239296&x-orig-sign=55udiGvaqlvi7TM%2F%2BRuew3%2FHWF0%3D)

除了配置现有模块之外，还支持扩展新模块，具体可以参考我之前写的文章：

[深入浅出 Quill 系列之原理篇1：现代富文本编辑器 Quill 的模块化机制](https://juejin.cn/post/7326814224330604544#heading-5)

## 5 在多种前端框架中使用

Fluent Editor 是一个框架无关的富文本编辑器，可以在任意前端框架中使用。

比如在 Vue 中使用：

App.vue

```html
<script setup lang="ts">
import { onMounted } from 'vue'
import FluentEditor from '@opentiny/fluent-editor'

onMounted(() => {
  new FluentEditor('#editor', {
    theme: 'snow'
  })
})
</script>

<template>
  <div id="editor"></div>
</template>
```

在 React 中使用：

App.tsx
```typescript
import { useEffect } from 'react'
import FluentEditor from '@opentiny/fluent-editor'
import '@opentiny/fluent-editor/style.css'

function App() {
  useEffect(() => {
    new FluentEditor('#editor', {
      theme: 'snow'
    })
  })

  return (
    <div id="editor"></div>
  )
}

export default App
```

## 6 总结

本文主要从以下几个部分给大家进行分享。

- 先是带大家快速上手使用 Fluent Editor 富文本
- 然后是介绍开发中最常见的配置工具栏，共内置 27 种实用的工具栏按钮
- 再介绍 Fluent Editor 的 11 个内置模块，并重点介绍表格模块的配置
- 由于 Fluent Editor 是兼容 Quill 生态的，以 Markdown 快捷键的模块：`quill-markdown-shortcuts` 为例，介绍如何配置 Quill 生态模块
- 最后介绍了如何在 Vue / React 框架中使用 Fluent Editor 

更多用法请参考 Tiny Editor 官网：[https://opentiny.github.io/tiny-editor/](https://opentiny.github.io/tiny-editor/)

由于 Fluent Editor 就是基于 Quill 进行封装的，其实掌握 Quill 基本上就掌握了 Fluent Editor，欢迎大家关注我之前写的《深入浅出 Quill》系列文章：

[https://juejin.cn/column/7325707131678769152](https://juejin.cn/column/7325707131678769152)

<EditInfo time="2024-08-17 17:15" title="105079展现 · 5307阅读 · 45点赞 · 26评论 · 92收藏" />
