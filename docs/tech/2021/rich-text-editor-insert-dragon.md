# 如何将龙插入到编辑器中？

## 引言

这是[深入浅出 Quill 系列](https://juejin.cn/column/7325707131678769152)的第5篇。

之前在掘金看到一篇文章：[《产品经理：你能不能用div给我画条龙？ 》](https://juejin.cn/post/6963476650356916254)

于是突发奇想：

> 能否把这条龙插入到富文本编辑器中呢？

## 1 在富文本编辑器中插入自定义内容

之前给大家分享了如何在 Quill 中插入自定义的内容，我们一起来回顾下：

*   第一步：自定义工具栏按钮
*   第二步：自定义 Blot 内容
*   第三步：在 Quill 注册自定义 Blot
*   第四步：调用 Quill 的 API 插入自定义内容

我们试着按照这个步骤来将龙插入到编辑器中。

## 2 第一步：自定义工具栏按钮

这个非常简单：
```ts
    const TOOLBAR_CONFIG = [
      [{ header: ['1', '2', '3', false] }],
      ['bold', 'italic', 'underline', 'link'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['clean'],
      ['card', 'divider', 'emoji', 'file', 'tag'],
      ['dragon'], // 新增的
    ];
```
自定义工具栏按钮图标：
```ts
    const dragonIcon = `<svg>...</svg>`;
    const icons = Quill.import('ui/icons');
    icons.dragon = dragonIcon;
```
增加工具栏按钮事件：
```ts
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            ...
            // 增加一个空的事件
            dragon(value): void {
              console.log('dragon~~');
            },
          },
        }
      },
    });
```
## 3 第二步：自定义 Blot 内容（核心）

之前的分享提到：

> Quill 中的 Blot 就是一个普通的 ES6 Class

因此我们需要编写一个类。

dragon.ts
```ts
    import Quill from 'quill';

    const BlockEmbed = Quill.import('blots/block/embed');

    class DragonBlot extends BlockEmbed {
      static blotName = 'dragon';
      static tagName = 'canvas';

      static create(value): any {
        const node = super.create(value);
        const { id, width, height } = value;

        node.setAttribute('id', id || DragonBlot.blotName);
        if (width !== undefined) {
          node.setAttribute('width', width);
        }
        if (height !== undefined) {
          node.setAttribute('height', height);
        }

        // 绘制龙的逻辑，参考大帅老师的文章：https://juejin.cn/post/6963476650356916254
        new Dragon(node);
        
        return node;
      }
    }

    export default DragonBlot;
```
### 3.1 绘制龙

绘制龙的逻辑参考大帅老师的文章，这里就不贴代码了，大帅老师的文章里有源码，直接拿来用就可以：

[产品经理：你能不能用div给我画条龙？](https://juejin.cn/post/6963476650356916254)

> 需要注意的是大帅老师文章里的龙图片背景不是纯黑的，需要换一张纯黑的图片。

## 4 第三步：在 Quill 注册自定义 Blot

有了 DragonBlot，还需要将其注册到 Quill 中才能使用：
```ts
    import DragonBlot from './formats/dragon';
    Quill.register('formats/dragon', DragonBlot);
```
## 5 第四步：调用 Quill 的 API 插入自定义内容

最后一步，见证奇迹的时刻到了！
```ts
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: {
          container: TOOLBAR_CONFIG,
          handlers: {
            ...
            dragon(value): void {
              console.log('dragon~~');
              const index = this.quill.getSelection().index;
              // 插入自定义内容
              this.quill.insertEmbed(index, 'dragon', {
                id: 'canvas-dragon',
              });
            },
          },
        }
      },
    });
```
效果图：


![插入龙2.gif](/assets/rich-text-editor-insert-dragon-1.gif)

## 总结

本文是一个 Quill 的综合案例，从自定义工具栏按钮，到自定义 Blot 编辑器内容格式，再到调用 Quill 实例的 insertEmbed 方法，完成在富文本编辑器中插入由 Canvas 绘制的龙这种复杂的自定义内容。

下一期我会带大家在富文本编辑器中插入贪吃蛇游戏，巩固在 Quill 中自定义内容的知识，大家也可以提前思考下如何实现。


<EditInfo time="2021年05月30日 23:25" title="阅读 8141 ·  点赞 54 ·  评论 22 ·  收藏 30" />


