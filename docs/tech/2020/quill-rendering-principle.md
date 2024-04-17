# 现代富文本编辑器Quill的内容渲染机制

## 引言

在 Web 开发领域，富文本编辑器（ Rich Text Editor ）是一个使用场景非常广，又非常复杂的组件。

要从0开始做一款好用、功能强大的富文本编辑器并不容易，基于现有的开源库进行开发能节省不少成本。

Quill 是一个很不错的选择。

[上一篇](https://rnd-think.huawei.com/think-home/community/activity-detail?id=blog1624504039941&module=devKnowledge)文章给大家介绍了 Quill 的模块化机制，本文主要介绍 Quill 内容渲染相关的基本原理，主要包括：

1.  Quill 描述编辑器内容的方式
2.  Quill 将 Delta 渲染到 DOM 的基本原理
3.  Scroll 类管理所有子 Blot 的基本原理

## 1 Quill 如何描述编辑器内容？

### 1.1 Quill 简介

Quill 是一款API驱动、易于扩展和跨平台的现代 Web 富文本编辑器。目前在 Github 的 star 数已经超过25k。

Quill 使用起来也非常方便，简单几行代码就可以创建一个基本的编辑器：

```html
<script>
  var quill = new Quill('#editor', {
    theme: 'snow'
  });
</script>
```


![snow默认效果.png](/public/assets/quill-rendering-principle-1.png)

### 1.2 Quill 如何描述格式化的文本

当我们在编辑器里面插入一些格式化的内容时，传统的做法是直接往编辑器里面插入相应的 DOM，通过比较 DOM 树来记录内容的改变。

直接操作 DOM 的方式有很多不便，比如很难知道编辑器里面某些字符或者内容到底是什么格式，特别是对于自定义的富文本格式。

Quill 在 DOM 之上做了一层抽象，使用一种非常简洁的数据结构来描述编辑器的内容及其变化：Delta。

Delta 是 JSON 的一个子集，只包含一个 ops 属性，它的值是一个对象数组，每个数组项代表对编辑器的一个操作（以编辑器初始状态为空为基准）。

比如编辑器里面有"Hello World"：


![hello world.png](/public/assets/quill-rendering-principle-2.png)

用 Delta 进行描述如下：

```ts
{
  "ops": [
    { "insert": "Hello " },
    { "insert": "World", "attributes": { "bold": true } },
    { "insert": "\n" }
  ]
}
```

意思很明显，在空的编辑器里面插入"Hello "，在上一个操作后面插入加粗的"World"，最后插入一个换行"\n"。

### 1.3 Quill 如何描述内容的变化

Delta 非常简洁，但却极富表现力。

它只有3种动作和1种属性，却足以描述任何富文本内容和任意内容的变化。

3种动作：

*   insert：插入
*   retain：保留
*   delete：删除

1种属性：

*   attributes：格式属性

比如我们把加粗的"World"改成红色的文字"World"，这个动作用 Delta 描述如下：

```ts
{
  "ops": [
    { "retain": 6 },
    { "retain": 5, "attributes": { "color": "#ff0000" } }
  ]
}
```

意思是：保留编辑器最前面的6个字符，即保留"Hello "不动，保留之后的5个字符"World"，并将这些字符设置为字体颜色为"#ff0000"。

如果要删除"World"，相信聪明的你也能猜到怎么用 Delta 描述，没错就是你猜到的：

```ts
{
  "ops": [
    { "retain": 6 },
    { "delete": 5 }
  ]
}
```

### 1.4 Quill 如何描述富文本内容

最常见的富文本内容就是图片，Quill 怎么用 Delta 描述图片呢？

insert 属性除了可以是用于描述普通字符的字符串格式之外，还可以是描述富文本内容的对象格式，比如图片：

```ts
{
  "ops": [
    { "insert": { "image": "https://quilljs.com/assets/images/logo.svg" } },
    { "insert": "\n" }
  ]
}
```

比如公式：

```ts
{ 
  "ops": [ 
    { "insert": { "formula": "e=mc^2" } }, 
    { "insert": "\n" } 
  ]
}
```

Quill 提供了极大的灵活性和可扩展性，可以自由定制富文本内容和格式，比如幻灯片、思维导图，甚至是3D模型。

## 2 setContent 如何将 Delta 数据渲染成 DOM？

上一节我们介绍了 Quill 如何使用 Delta 描述编辑器内容及其变化，我们了解到 Delta 只是普通的 JSON 结构，只有3种动作和1种属性，却极富表现力。

那么 Quill 是如何应用 Delta 数据，并将其渲染到编辑器中的呢？

### 2.1 setContents 初探

Quill 中有一个 API 叫 setContents，可以将 Delta 数据渲染到编辑器中，本期将重点解析这个 API 的实现原理。

还是用上一期的 Delta 数据作为例子：

```ts
const delta = {  "ops": [
    { "insert": "Hello " },
    { "insert": "World", "attributes": { "bold": true } },
    { "insert": "\n" } ]
}
```

当使用 new Quill() 创建好 Quill 的实例之后，我们就可以调用它的 API 啦。

```ts
const quill = new Quill('#editor', {
  theme: 'snow'
});
```

我们试着调用下 setContents 方法，传入刚才的 Delta 数据：

```ts
quill.setContents(delta);
```

编辑器中就出现了我们预期的格式化文本：

![image](/public/assets/quill-rendering-principle-3.png)

### 2.2 setContents 源码

通过查看 setContents 的源码，发现就调用了 modify 方法，主要传入了一个函数：

```ts
setContents(delta, source = Emitter.sources.API) {
  return modify.call( this, () => {
    delta = new Delta(delta);
    const length = this.getLength();
    const deleted = this.editor.deleteText(0, length);
    const applied = this.editor.applyDelta(delta);
    ... // 为了方便阅读，省略了非核心代码
    return deleted.compose(applied);
  }, source, );
}
```

使用 call 方法调用 modify 是为了改变其内部的 this 指向，这里指向的是当前的 Quill 实例，因为 modify 方法并不是定义在 Quill 类中的，所以需要这么做。

我们先不看 modify 方法，来看下传入 modify 方法的匿名函数。

该函数主要做了三件事：

1.  把编辑器里面原有的内容全部删除
2.  应用传入的 Delta 数据，将其渲染到编辑器中
3.  返回1和2组合之后的 Delta 数据

我们重点看第2步，这里涉及到 Editor 类的 applyDelta 方法。

### 2.3 applyDelta 方法解析

根据名字大概能猜到该方法的目的是：把传入的 Delta 数据应用和渲染到编辑器中。

它的实现我们大概也可以猜测就是：循环 Delta 里的 ops 数组，一个一个地应用到编辑器中。

它的源码一共54行，大致如下：

```ts
applyDelta(delta) {
  let consumeNextNewline = false;
  this.scroll.update();
  let scrollLength = this.scroll.length();
  this.scroll.batchStart();
  const normalizedDelta = normalizeDelta(delta);

  normalizedDelta.reduce((index, op) => {
    const length = op.retain || op.delete || op.insert.length || 1;
    let attributes = op.attributes || {};    
    // 1.插入文本
    if (op.insert != null) {
      if (typeof op.insert === 'string') {        
        // 普通文本内容
        let text = op.insert;        
        ... // 为了阅读方便，省略非核心代码
        this.scroll.insertAt(index, text);
        ... // 为了阅读方便，省略非核心代码
      } else if (typeof op.insert === 'object') {
        // 富文本内容
        const key = Object.keys(op.insert)[0];
        // There should only be one key
        if (key == null) return index;
        this.scroll.insertAt(index, key, op.insert[key]);
      }
      scrollLength += length;
    }    
    // 2.对文本进行格式化
    Object.keys(attributes).forEach(name => {
      this.scroll.formatAt(index, length, name, attributes[name]);
    });
    return index + length;
  }, 0);
... // 为了阅读方便，省略非核心代码  this.scroll.batchEnd();
  this.scroll.optimize();
  return this.update(normalizedDelta);
}
```

和我们猜测的一样，该方法就是用 Delta 的 reduce 方法对传入的 Delta 数据进行迭代，将插入内容和删除内容的逻辑分开了，插入内容的迭代里主要做了两件事：

1.  插入普通文本或富文本内容：insertAt
2.  格式化该文本：formatAt

至此，将 Delta 数据应用和渲染到编辑器中的逻辑，我们已经解析完毕。
下面做一个总结：

1.  setContents 方法本身没有什么逻辑，仅仅是调用了 modify 方法而已
2.  在传入 modify 方法的匿名函数中调用了 Editor 对象的 applyDelta 方法
3.  applyDelta 方法对传入的 Delta 数据进行迭代，并依次插入/格式化/删除 Delta 数据所描述的编辑器内容

## 3 Scroll 如何管理所有的 Blot 类型？

上一节我们介绍了 Quill 将 Delta 数据应用和渲染到编辑器中的原理：通过迭代 Delta 中的 ops 数据，将 Delta 行一个一个渲染到编辑器中。

了解到最终内容的插入和格式化都是通过调用 Scroll 对象的方法实现的，Scroll 对象到底是何方神圣？在编辑器的操作中发挥了什么作用？

### 3.1 Scroll 对象的创建‍

上一节的解析终止于 applyDelta 方法，该方法最终调用了 this.scroll.insertAt 将 Delta 内容插入到编辑器中。

applyDelta 方法定义在 Editor 类中，在 Quill 类的 setContents 方法中被调用，通过查看源码，发现 this.scroll 最初是在 Quill 的构造函数中被赋值的。

```ts
this.scroll = Parchment.create(this.root, {
  emitter: this.emitter,
  whitelist: this.options.formats
});
```

Scroll 对象是通过调用 Parchment 的 create 方法创建的。

前面两期我们简单介绍了 Quill 的数据模型 Delta，那么 Parchment 又是什么呢？它跟 Quill 和 Delta 是什么关系？这些疑问我们先不解答，留着后续详细讲解。

先来简单看下 create 方法是怎么创建 Scroll 对象的，create 方法最终是定义在 parchment 库源码中的 registry.ts 文件中的，就是一个普通的方法：

```ts
export function create(input: Node | string | Scope, value?: any): Blot {
  // 传入的 input 就是编辑器主体 DOM 元素（.ql-editor），里面包含了编辑器里所有可编辑的实际内容   
  // match 是通过 query 方法查询到的 Blot 类，这里就是 Scroll 类  
  let match = query(input);
  if (match == null) {
    throw new ParchmentError(`Unable to create ${input} blot`);
  }  
  let BlotClass = <BlotConstructor>match;  
  let node = input instanceof Node || input['nodeType'] === Node.TEXT_NODE
    ? input
    : BlotClass.create(value);

  // 最后返回 Scroll 对象
  return new BlotClass(<Node>node, value);
}
```

create 方法的入参是编辑器主体 DOM 元素 .ql-editor，通过调用同文件中的 query 普通方法，查询到 Blot 类是 Scroll 类，查询的大致逻辑就是在一个 map 表里查，最后通过 new Scroll() 返回 Scroll 对象实例，赋值给 this.scroll。

```ts
{
  ql-cursor: ƒ Cursor(domNode, selection),  
  ql-editor: ƒ Scroll(domNode, config), // 这个就是 Scroll 类
  ql-formula: ƒ FormulaBlot(),
  ql-syntax: ƒ SyntaxCodeBlock(),
  ql-video: ƒ Video(),
}
```

### 3.2 Scroll 类详解

Scroll 类是我们解析的第一个 Blot 格式，后续我们将遇到各种形式的 Blot 格式，并且会定义自己的 Blot 格式，用于在编辑器中插入自定义内容，这些 Blot 格式都有类似的结构。

可以简单理解为 Blot 格式是对 DOM 节点的抽象，而 Parchment 是对 HTML 文档的抽象，就像 DOM 节点是构成 HTML 文档的基本单元一样，Blot 是构成 Parchment 文档的基本单元。

比如：DOM 节点是`<div>`，对其进行封装变成`<div class="ql-editor">`，并在其内部封装一些属性和方法，就变成 Scroll 类。

Scroll 类是所有 Blot 的根 Blot，它对应的 DOM 节点也是编辑器内容的最外层节点，所有编辑器内容都被包裹在它之下，可以认为 Scroll 统筹着其他 Blot 对象（实际 Scroll 的父类 ContainerBlot 才是幕后总 BOSS，负责总的调度）。

```html
<div class="ql-editor" contenteditable="true">
  <p>
    Hello
    <strong>World</strong>
  </p>
  ... // 其他编辑器内容
</div>
```

Scroll 类定义在 Quill 源码中的 blots/scroll.js 文件中，之前 applyDelta 方法中通过 this.scroll 调用的 insertAt / formatAt / deleteAt / update / batchStart / batchEnd / optimize 等方法都在 Scroll 类中。

以下是 Scroll 类的定义：

```ts
class Scroll extends ScrollBlot {
  constructor(domNode, config) {
    super(domNode);
    ...  
  }    

  // 标识批量更新的开始，此时执行 update / optimize 都不会进行实际的更新   
  batchStart() {
    this.batch = true;  
  }    

  // 标识批量更新的结束
  batchEnd() {
    this.batch = false;
    this.optimize();  
  }    

  // 在制定位置删除制定长度的内容  
  // 比如：deleteAt(6, 5) 将删除 "World"  
  // 在 Quill 的 API 中对应 deleteText(index, length, source) 方法  
  deleteAt(index, length) {}   
 
  // 设置编辑器的可编辑状态  
  enable(enabled = true) {
    this.domNode.setAttribute('contenteditable', enabled);  
  }    

  // 在制定位置用制定格式格式化制定长度的内容  
  // 比如：formatAt(6, 5, 'bold', false) 将取消 "World" 的粗体格式  
  // 在 Quill 的 API 中对应 formatText(index, length, name, value, source) 方法 formatAt(index, length,  format, value) {
    if (this.whitelist != null && !this.whitelist[format]) return;
    super.formatAt(index, length, format, value); this.optimize();  
  }    

  // 在制定位置插入内容  
  // 比如：insertAt(11, '\n你好，世界');  
  // 在 Quill 的 API 中对应 insertText(index, text, name, value, source)  
  // Quill 中的 insertText 其实是 Scroll 的 insertAt 和 formatAt 的复合方法  
  insertAt(index, value, def) {}    

  // 在某个 Blot 前面插入 Blot  
  insertBefore(blot, ref) {}    

  // 弹出当前位置 Blot 路径最外面的叶子 Blot（会改变原数组）
  leaf(index) { return this.path(index).pop() || [null, -1];  }    

  // 实际上调用的是父类 ContainerBlot 的 descendant 方法  
  // 目的是得到当前位置所在的 Blot 对象
  line(index) {
    if (index === this.length()) {
      return this.line(index - 1);
    }
    return this.descendant(isLine, index);
  }    

  // 获取某一范围的 Blot 对象  
  lines(index = 0, length = Number.MAX_VALUE) {}    

  // TODO
  optimize(mutations = [], context = {}) {
    if (this.batch === true) return;
    super.optimize(mutations, context);
    if (mutations.length > 0) {
      this.emitter.emit(Emitter.events.SCROLL_OPTIMIZE, mutations, context);
    }  
  }    

  // 实际上调用的是父类 ContainerBlot 的 path 方法  
  // 目的是得到当前位置的 Blot 路径，并排除 Scroll 自己  
  // Blot 路径就和 DOM 节点路径是对应的  
  // 比如：DOM 节点路径 div.ql-editor -> p -> strong，  
  // 对应 Blot 路径就是 [[Scroll div.ql-editor, 0], [Block p, 0], [Bold strong, 6]]
  path(index) {
    return super.path(index).slice(1); // Exclude self  
  }    

  // TODO
  update(mutations) {
    if (this.batch === true) return;
    ...  
  }
}

Scroll.blotName = 'scroll';
Scroll.className = 'ql-editor';
Scroll.tagName = 'DIV';
Scroll.defaultChild = 'block';
Scroll.allowedChildren = [Block, BlockEmbed, Container];

export default Scroll;
```

Scroll 类上定义的静态属性 blotName 和 tagName 是必须的，前者用于唯一标识该 Blot 格式，后者对应于一个具体的 DOM 标签，一般还会定义一个 className，如果该 Blot 是一个父级 Blot，一般还会定义 allowedChildren 用来限制允许的子级 Blot 白名单，不在白名单之内的子级 Blot 对应的 DOM 将无法插入父类 Blot 对应的 DOM 结构里。

Scroll 类中除了定义了插入 / 格式化 / 删除内容的方法之外，定义了一些很实用的用于获取当前位置 Blot 路径和 Blot 对象的方法，以及触发编辑器内容更新的事件。

相应方法的解析都在以上源码的注释里，其中 optimize 和 update 方法涉及 Quill 中的事件和状态变更相关逻辑，放在后续单独进行解析。

关于 Blot 格式的规格定义文档可以参阅以下文章：

<https://github.com/quilljs/parchment#blots>

我也是初次使用 Quill 进行富文本编辑器的开发，难免有理解不到位的地方，欢迎大家提意见和建议。

## 总结

本文主要介绍了 Quill 如何使用 Delta 这种数据结构来描述编辑器的内容及其变化，Delta 是一种基于 JSON 的数据结构，不仅能描述编辑器内容及其变化，而且提供了一系列方法来操作富文本内容。

接着重点介绍了 setContent 方法，这个方法最主要的作用就是解析 Delta 数据，并将其渲染到 DOM 中。

Quill 最核心的模块化机制和内容渲染机制的原理就给大家介绍完了，后续我将通过几个有趣的实践项目，带大家拓展自己的 Quill 模块和内容格式，为自己的编辑器增加定制化能力。

<EditInfo time="2020年04月30日 15:47" title="阅读 2814 ·  点赞 25 ·  评论 3 ·  收藏 12" />
