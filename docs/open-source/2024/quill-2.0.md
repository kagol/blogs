# 重回铁王座！时隔5年！Quill 2.0 终于发布啦🎉

你好，我是 Kagol。

2024年4月17日，Quill 2.0 正式发布🎉

最后一个 1.0 版本 1.3.7 发布于 2019年9月9日，时隔4年零7个月。

富文本编辑器拥有非常丰富的使用场景，我在做 OpenTiny 开源运营过程中，也经常有用户问：OpenTiny 有富文本吗？

于是在2023年6月，我们开始规划富文本组件，做技术选型时，考虑了 Quill、Tiptap、Editor.js、TinyMCE 等多款开源富文本，最终还是选择了 Tiptap，Tiptap 本身很优秀、且能满足我们的需求是一方面，另一个原因是我们觉得 Quill 已经“死了”，因为它已经4年不发版本了。

Quill 2.0 的第一个 dev 版本 2.0.0-dev.0 是2018年7月2日发布的，同年10月份发完 2.0.0-dev.3 之后，2.0 版本一直没有动静、似乎遥遥无期，很多开发者在 issue 询问 2.0 版本是否会发布，什么时候发布，官网都没有回应，似乎 Quill 真的“死了”。

我从2019年开始接触 Quill，当时的 Quill 是最受欢迎的开源富文本之一，我也基于 Quill 打造了一款更加实用、功能更加丰富的富文本组件 EditorX，并被应用于华为内部众多业务，并沉淀了 [《深入浅出 Quill》](https://kagol.github.io/blogs/tech/2021/quill-practice.html) 系列文章7篇。

这5年来，我一直在期待 Quill 2.0 的发布，上周看到 Quill 2.0 终于发布了，心情非常激动，于是立马升级体验了下，接下来我就带大家一起看看 Quill 2.0 有哪些重大更新。

## 支持表格操作

从功能上来说，我觉得最大的变化就是支持表格的操作，1.0 版本是不包含表格功能的。

2.0 增加了一个 `table` 的 module 和 format，但目前还比较简单，只能通过调用 API 的方式操作表格，还没有操作表格的 UI，比如：在工具栏点击表格图标，只能插入一个一行一列的表格，没法直接在界面操作，比如插入行列等。

```ts
const quill = new Quill('#editor', {
  theme: 'snow',
  toolbar: [
    [{ header: ['1', '2', '3', false ] }],
    ['bold', 'italic', 'underline', 'link'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['clean'],
    ['table'] // 在工具栏中增加表格格式
  ]
})
```

效果如下：

![image.png](/assets/quill-2.0-1.png)

如果是 1.x 版本，以上代码是没法在工具栏显示表格图标的，并且在浏览器控制台会提示：不存在的表格格式

![image.png](/assets/quill-2.0-2.png)

这个表格功能还是太简陋，没法真正在项目中用起来，我早在 2019 年基于 Quill 和 QuillBetterTable 做了一个表格效果，当时是基于 2.0.0-dev.3 版本的 Quill。

支持了以下特性：
- 在工具栏插入指定行列的表格
- 表格行高、列宽拖拽
- 右键菜单工具栏操作：插入行/列、删除行/列、合并/拆分单元格等

在工具栏插入指定行列的表格：

![image.png](/assets/quill-2.0-3.png)

富文本中的表格操作效果：

![image.png](/assets/quill-2.0-4.png)

## 支持 TypeScript

从工程结构来看，最大的两个变化就是从 JavaScript 改造成了 TypeScript，项目组织方式改成了 Monorepo 方式。

更好的类型检验和错误提示，不仅提升了开发效率，而且增加了 DX 开发者体验，看来 TypeScript 和 Monorepo 依然是大趋所势！

![image.png](/assets/quill-2.0-5.png)

另外单元测试也由 WebdriverIO 迁移到 Vitest，E2E测试则由 Karma 迁移到了 Playwright。

看着这个技术栈，觉得非常熟悉，和我们的 [TinyVue](https://github.com/opentiny/tiny-vue) 跨端跨框架组件库基本是一样的。

## 支持多 Quill 实例

随着 Quill 的普及和使用频率的增加，越来越多开发者希望在同一页面使用多个 Quill。

例如，博客产品可能会使用 Quill 来为帖子本身提供功能齐全的编辑界面，包括标题、图像和代码块，而在同一页面上，Quill 还以仅支持粗体、斜体和链接格式的方式为评论输入提供能力。

Quill 2.0 的新注册表功能支持这种场景，允许在同一页面上共存多个具有各自格式配置的编辑器，而不会发生任何冲突。

在 Quill 的文档中了解更多关于注册表的信息：[Registries](https://quilljs.com/docs/registries)

## 性能提升

Quill 2.0 包含许多性能优化，其中最重要的是提高了大内容的渲染速度。

- 增加 insertBefore 函数，并通过尽可能使用 insertBefore，提高了 setContents 的性能
- 通过优化 getRange 函数，提升了同时渲染多个 Quill 实例的性能，在一个页面中同时渲染4000个Quill实例，优化后的渲染性能提升近10倍
- 优化 Quill 实例初始化逻辑，当内容为空时，无需执行 setContents 函数

渲染4000个Quill实例，优化前后加载时间对比：

![image.png](/assets/quill-2.0-6.png)

关于 Quill 2.0 的更多更新，请参考 Quill 官网文档和博客文章：

- [Announcing Quill 2.0](https://slab.com/blog/announcing-quill-2-0/)
- [Upgrading to 2.0](https://quilljs.com/docs/upgrading-to-2-0)
- [Release Notes: Version 2.0.0](https://github.com/quilljs/quill/releases/tag/v2.0.0)

## 欢迎关注《深入浅出 Quill》系列文章

之前写过一个 Quill 系列文章，从使用到原理，再到实践，以及富文本编辑器的选型。

由于 Quill 很久没更新，我觉得也没必要更新了，现在 Quill 2.0 发布，又给了我继续更新下去的动力，欢迎朋友们持续关注[深入浅出 Quill](https://juejin.cn/column/7325707131678769152) 系列文章，我将带你解锁更多 Quill 的玩法，并深入剖析 Quill 的实现原理，了解这款重新坐上开源富文本编辑器“铁王座”的 Quill，究竟有什么独特之处，能受到这么多开发者们的喜爱。

- [Quill 基本使用和配置](https://kagol.github.io/blogs/tech/2021/quill-basic.html)
- [通过 Quill API 实现对内容的完全控制](https://kagol.github.io/blogs/tech/2021/quill-api.html)
- [👍 Quill 模块化机制](https://kagol.github.io/blogs/tech/2020/quill-modularization-principle.html)
- [👍 Quill 内容渲染机制](https://kagol.github.io/blogs/tech/2020/quill-rendering-principle.html)
- [在富文本编辑器中插入一条中国龙](https://kagol.github.io/blogs/tech/2021/rich-text-editor-insert-dragon.html)
- [在富文本编辑器中玩贪吃蛇游戏](https://kagol.github.io/blogs/tech/2021/rich-text-editor-insert-snake-game.html)
- [👍 Quill 富文本编辑器的实践](https://kagol.github.io/blogs/tech/2021/quill-practice.html)

感兴趣的朋友也可以关注下我的微信公众号：`前端开源星球`和[个人博客](https://kagol.github.io/blogs)。

![image.png](/assets/quill-2.0-7.png)
