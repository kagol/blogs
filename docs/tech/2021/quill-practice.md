# Quill 富文本编辑器的实践
## 引言

这是深入浅出 Quill 系列的最后1篇，本系列一共有7篇，以下是之前的6篇。

*   [深入浅出 Quill 系列之使用篇1：Quill 基本使用和配置](https://juejin.cn/post/7325705832070021120)
*   [深入浅出 Quill 系列之使用篇2：通过 Quill API 实现对编辑器内容的完全控制](https://juejin.cn/post/7325979519478218752)
*   [深入浅出 Quill 系列之原理篇1：现代富文本编辑器 Quill 的模块化机制](https://juejin.cn/post/7326814224330604544)
*   [深入浅出 Quill 系列之原理篇2：现代富文本编辑器 Quill 的内容渲染机制](https://juejin.cn/post/7326978201006555173)
*   [深入浅出 Quill 系列之实践篇1：如何将龙插入到编辑器中？](https://juejin.cn/post/7327467832866455578)
*   [深入浅出 Quill 系列之实践篇2：整个贪吃蛇游戏到编辑器里玩儿吧](https://juejin.cn/post/7328292293915344946)

富文本编辑器大概是最复杂、使用场景却极广的组件了。

可以说富文本编辑器让 Web 数据录入充满了无限的想象空间，如果只有文本框、下拉框这些纯文本的数据录入组件，那么Web的数据录入能力将极大地受限。我们将无法在网页上插入图片、视频这些富文本内容，更无法插入自定义的内容。

富文本编辑器让 Web 内容编辑变得更轻松、更高效，我们几乎可以在富文本编辑器中插入任何你想插入的内容，图片、视频、超链接、公式、代码块，都不在话下，甚至还可以插入表格、PPT、思维导图，甚至3D模型这种超复杂的自定义内容。

富文本编辑器的场景在 Web 上也是随处可见，写文章、写评论、意见反馈、录需求单，都需要使用到富文本。

本文从富文本编辑器的使用场景、技术选型，再到对 Quill 的扩展，以及 Quill 的基本原理，跟大家分享 Quill 富文本编辑器的那些事儿。

本文主要由以下部分组成：

1.  富文本编辑器的使用场景
2.  技术选型
3.  我们为什么选择 Quill
4.  如何扩展 Quill
5.  Quill 基本原理

以下内容来自 `Kagol` 在 `华为 HWEB 大前端技术分享会` 上的演讲（2021年5月28日）。

## 1 富文本编辑器的使用场景

*   博客文章
*   Wiki 词条
*   工作项描述
*   测试用例步骤
*   反馈意见
*   评论
*   …

![1.png](/assets/quill-practice-1.png)

![2.png](/assets/quill-practice-2.png)

![3.png](/assets/quill-practice-3.png)

## 2 技术选型

我们的需求：

*   开源协议友好
*   Angular 框架或框架无关
*   灵活可扩展
*   支持插入/编辑表格和图片
*   插件丰富，生态好

![4.png](/assets/quill-practice-4.png)

![5.png](/assets/quill-practice-5.png)

### 2.1 选型分析

*   首先排除官方不维护的`UEditor`
*   然后排除 React 框架专属的`Draft.js`和`Slate`
*   接着排除开源协议不友好的`CKEditor`
*   由于我们的业务场景丰富，需要富文本插入/编辑表格的功能，所以还需要排除不支持表格的`Trix`，弱支持表格的`Etherpad`和`Prosemirror`，以及表格功能收费的`TinyMCE`
*   最后只剩下`Quill`和`wangEditor`两款编辑器可选，`wangEditor`的扩展性和生态不如`Quill`，所以最终选择`Quill`作为富文本组件的基座

## 3 为什么选择 Quill？

*   BSD 协议，商业友好
*   文档详细，上手快
*   API 驱动，扩展性好
*   插件丰富，生态好

### 3.1 文档详细

Document：<https://quilljs.com/>

介绍 Quill 的 API：

![1622088667748.png](/assets/quill-practice-6.png)

介绍如何扩展 Quill：

![7.png](/assets/quill-practice-7.png)

### 3.2 上手快

*   安装 Quill：`npm i quill`
*   引入样式：`@import 'quill/dist/quill.snow.css';`
*   引入 Quill：`import Quill from 'quill';`
*   初始化 Quill：`new Quill('#editor', { theme: 'snow' });`

效果图：

![8.png](/assets/quill-practice-8.png)

### 3.3 API 驱动，扩展性好

![9.png](/assets/quill-practice-9.png)

![10.png](/assets/quill-practice-10.png)

### 3.4 插件丰富，生态好

![11.png](/assets/quill-practice-11.png)

## 4 扩展 Quill

### 4.1 插入标签

比如我想在编辑器里插入标签

![12.png](/assets/quill-practice-12.png)

### 4.2 上传附件

比如我想在编辑器里插入附件

![13.png](/assets/quill-practice-13.png)

### 4.3 插入表情

比如我想在编辑器中插入表情

类似语雀的评论：<https://www.yuque.com/yuque/blog/sguhed>

![14.png](/assets/quill-practice-14.png)

### 4.4 个性分割线

比如我想插入B站这种个性化的分割线

![15.png](/assets/quill-practice-15.png)

### 4.5 超链接卡片

比如我想插入知乎这样的超链接卡片

![16.png](/assets/quill-practice-16.png)

### 4.6 如何插入表情？

我们从如何插入表情入手，一起看看怎么在 Quill 中插入自定义的内容。

要在 Quill 中插入表情，只需要以下四步：

*   第一步：自定义工具栏按钮
*   第二步：自定义 Blot 内容 EmojiBlot
*   第三步：在 Quill 注册 EmojiBlot
*   第四步：调用 Quill 的 API 插入表情

#### 4.6.1 第一步：自定义工具栏按钮

    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        // 配置工具栏模块
        toolbar: {
          container: [ …, [ 'emoji' ] ], // 增加一个按钮
          handlers: {
            // 添加按钮的处理逻辑
            emoji() {
              console.log('插入表情');
            }
          }
        },
      }
    });

#### 4.6.2 给工具栏按钮增加图标

    // 扩展 Quill 内置的 icons 配置
    const icons = Quill.import('ui/icons');
    icons.emoji = ‘<svg>…</svg>’; // 图标的 svg 可以从 iconfont 网站复制

效果如下：

![17.png](/assets/quill-practice-17.png)

工具栏上已经多了一个表情的按钮，并且能够响应鼠标点击事件，下一步就是要编写插入表情的具体逻辑，这涉及到 Quill 的自定义内容相关的知识。

#### 4.6.3 第二步：自定义 Blot 内容 EmojiBlot

Quill 中的 Blot 就是一个普通的 ES6 Class，由于表情和图片的差别就在于：

Quill 内置的图片格式不支持自定义宽高，而我们要插入的表情是需要特定的宽高的。

因此我们可以基于 Quill 内置的 image 格式来扩展。

emoji.ts

    import Quill from 'quill';

    const ImageBlot = Quill.import('formats/image');

    // 扩展 Quill内置的 image 格式
    class EmojiBlot extends ImageBlot {
      static blotName = 'emoji'; // 定义自定义 Blot 的名字（必须全局唯一）
      static tagName = 'img'; // 自定义内容的标签名

      // 创建自定义内容的 DOM 节点
      static create(value): any {
        const node = super.create(value);
        node.setAttribute('src', ImageBlot.sanitize(value.url));
        if (value.width !== undefined) {
          node.setAttribute('width', value.width);
        }
        if (value.height !== undefined) {
          node.setAttribute('height', value.height);
        }
        return node;
      }
      
      // 返回 options 数据
      static value(node): any {
        return {
          url: node.getAttribute('src'),
          width: node.getAttribute('width'),
          height: node.getAttribute('height')
        };
      }
    }

    export default EmojiBlot;

#### 4.6.4 第三步：在 Quill 注册 EmojiBlot

有了 EmojiBlot，要将其插入 Quill 编辑器中，还需要将这个 ES6 类注册到 Quill 中。

    import EmojiBlot from './formats/emoji';
    Quill.register('formats/emoji', EmojiBlot);

#### 4.6.5 第四步：调用 Quill 的 API 插入表情

EmojiBlot 注册到 Quill 中之后，Quill 就能认识它了，也就可以调用 Quill 的 API 将其插入到编辑器中。

    emoji(): void {
      console.log('插入表情');
      // 获取当前光标位置
      const index = this.quill.getSelection().index;
      // 在当前光标处插入 emoji（blotName）
      this.quill.insertEmbed(index, 'emoji', {
        url: 'assets/emoji/good.png',
        width: '64px',
      });
    },

### 4.7 效果图

![图片.png](/assets/quill-practice-18.png)

### 4.8 Demo 源码

源码链接：<https://gitee.com/kagol/quill-practice>

## 5 Quill 基本原理

最后讲一讲 Quill 的基本原理。

### 5.1 基本原理

*   使用 Delta 数据模型描述富文本内容及其变化，以保证行为的可预测
*   通过 Parchment 对 DOM 进行抽象，以保证平台一致性
*   通过 Mutation Observe 监听 DOM 节点的变化，将 DOM 的更改同步到 Delta 数据模型中

![19.png](/assets/quill-practice-19.png)

### 5.2 Quill 如何表达编辑器内容？

#### 5.2.1 Delta 数据模型

通过 Delta 数据模型来描述富文本内容及其变化

![20.png](/assets/quill-practice-20.png)

Delta 是 JSON 的一个子集，只包含一个 ops 属性，它的值是一个对象数组，每个数组项代表对编辑器的一个操作（以编辑器初始状态为空为基准）。

    {
      "ops": [
        { "insert": "Hello " },
        { "insert": "World", "attributes": { "bold": true } },
        { "insert": "\n" }
      ]
    }

#### 5.2.2 修改编辑器内容

比如我们把加粗的"World"改成红色的文字"World"，这个动作用 Delta 描述如下：

    {
      "ops": [
        { "retain": 6 },
        { "retain": 5, "attributes": { "color": "#ff0000" } }
      ]
    }

意思是：保留编辑器最前面的6个字符，即保留"Hello "不动，保留之后的5个字符"World"，并将这些字符设置为字体颜色为"#ff0000"。

#### 5.2.3 删除编辑器内容

如果要删除"World"呢？

    {
      "ops": [
        { "retain": 6 },
        { "delete": 5 }
      ]
    }

即：保留前面6个字符（'Hello '），删除之后的5个字符（'World'）

### 5.3 Quill 如何渲染内容？

渲染富文本内容的基本原理：遍历 Delta 数组，将其中描述的内容一个一个应用（插入/格式化/删除）到编辑器中。

详情可参考以下文章：

[《Quill 的内容渲染机制》](https://juejin.cn/post/7326978201006555173)

### 5.4 Quill 如何扩展编辑器的能力？

扩展 Quill 的方式：

*   通过自定义 Blot 格式来扩展编辑器的内容
*   通过自定义模块来扩展编辑器的功能

详情可参考以下文章：

[《现代富文本编辑器 Quill 的模块化机制》](https://juejin.cn/post/7326814224330604544)

THANK YOU！


<EditInfo time="2021年05月27日 23:36" title="阅读 8984 ·  点赞 129 ·  评论 72 ·  收藏 142" />
