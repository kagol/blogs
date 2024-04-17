# 现代富文本编辑器 Quill 的模块化机制

## 引言

如果还没有接触过 Quill，建议先阅读以下两篇文章，了解下它的基本概念。

[深入浅出 Quill 系列之使用篇1：Quill 基本使用和配置](https://juejin.cn/post/7325705832070021120)

[深入浅出 Quill 系列之使用篇2：通过 Quill API 实现对编辑器内容的完全控制](https://juejin.cn/post/7325979519478218752)

通过阅读本文，你将收获：

1.  了解 Quill 模块是什么，怎么配置 Quill 模块
2.  为什么要创建 Quill 模块，怎么创建自定义 Quill 模块
3.  Quill 模块如何与 Quill 进行通信
4.  深入了解 Quill 的模块化机制

## 1 Quill 模块初探

使用 Quill 开发过富文本应用的人，应该都对 Quill 的模块有所了解。

比如，当我们需要定制自己的工具栏按钮时，会配置工具栏模块：

```ts
var quill = new Quill('#editor', {
  theme: 'snow',
  modules: {
    toolbar: [['bold', 'italic'], ['link', 'image']]
  }
});
```

其中的 modules 参数就是用来配置模块的。

toolbar 参数用来配置工具栏模块，这里传入一个二维数组，表示分组后的工具栏按钮。

渲染出来的编辑器将包含4个工具栏按钮：


![quill-modularization-principle-1.png](/public/assets/quill-modularization-principle-1.png)

要看以上 Demo，请怒戳[配置工具栏模块](https://codepen.io/kagol/pen/oNXZwQv)。

### 1.1 Quill 模块是一个普通的 JS 类

那么 Quill 模块是什么呢？我们为什么要了解和使用 Quill 模块呢？

Quill 模块其实就是一个普通的 JavaScript类，有构造函数，有成员变量，有方法。

以下是工具栏模块的大致源码结构：

```ts
class Toolbar {
  constructor(quill, options) {
    // 解析传入模块的工具栏配置（就是前面介绍的二维数组），并渲染工具栏
  }


  addHandler(format, handler) {
    this.handlers[format] = handler;
  }
  ...
}
```

可以看到工具栏模块就是一个普通的 JS 类。在构造函数中传入了 quill 的实例和 options 配置，模块类拿到 quill 实例就可以对编辑器进行控制和操作。

比如：工具栏模块会根据 options 配置构造工具栏容器，将按钮/下拉框等元素填充到该容器中，并绑定按钮/下拉框的处理事件。最终的结果就是在编辑器主体上方渲染了一个工具栏，可以通过工具栏按钮/下拉框给编辑器内的元素设置格式，或者在编辑器中插入新元素。

Quill 模块的功能很强大，我们可以利用它来扩展编辑器的能力，实现我们想要的功能。

除了工具栏模块之外，Quill 还内置了一些很实用的模块，我们一起来看看吧。

### 1.2 Quill 内置模块

Quill 一共内置6个模块：

1.  Clipboard 粘贴版
2.  History 操作历史
3.  Keyboard 键盘事件
4.  Syntax 语法高亮
5.  Toolbar 工具栏
6.  Uploader 文件上传

Clipboard、History、Keyboard 是 Quill 必需的内置模块，会自动开启，可以配置但不能取消。其中：

Clipboard 模块用于处理复制/粘贴事件、HTML 元素节点的匹配以及 HTML 到 Delta 的转换。

History 模块维护了一个操作的堆栈，记录了每一次的编辑器操作，比如插入/删除内容、格式化内容等，可以方便地实现撤销/重做等功能。

Keyboard 模块用于配置键盘事件，为实现快捷键提供便利。

Syntax 模块用于代码语法高亮，它依赖外部库 highlight.js，默认关闭，要使用语法高亮功能，必须安装 highlight.js，并手动开启该功能。

其他模块不多做介绍，想了解可以参考 [Quill 的模块文档](https://quilljs.com/docs/modules)。

### 1.3 Quill 模块的配置

刚才提到 Keyboard 键盘事件模块，我们再举一个例子，加深对 Quill 模块配置的理解。

Keyboard 模块默认支持很多快捷键，比如：

1.  加粗的快捷键是 `Ctrl+B`；
2.  超链接的快捷键是 `Ctrl+K`;
3.  撤销/回退的快捷键是 `Ctrl+Z/Y`。

但它不支持删除线的快捷键，如果我们想定制删除线的快捷键，假设是 `Ctrl+Shift+S`，我们可以这样配置：

```ts
modules: {
  keyboard: {
    bindings: {
      strike: {
        key: 'S',
        ctrlKey: true,
        shiftKey: true,
        handler: function(range, context) {
          const format = this.quill.getFormat(range);
          this.quill.format('strike', !format.strike);
        }
      },
    }
  },
  toolbar: [['bold', 'italic', 'strike'], ['link', 'image']]
}
```

要看以上 Demo，请怒戳[配置键盘模块](https://codepen.io/kagol/pen/mdJWwvE)。

在使用 Quill 开发富文本编辑器的过程中，我们会遇到各种模块，也会创建很多自定义模块，所有模块都是通过 modules 参数进行配置的。

接下来我们将尝试创建一个自定义模块，加深对 Quill 模块和模块配置的理解。

## 2 创建自定义模块

通过上一节的介绍，我们了解到其实 Quill 模块就是一个普通的JS类，并没有什么特殊的，在该类的初始化参数中会传入 Quill 实例和该模块的 options 配置参数，然后就可以控制并增强编辑器的功能。

当 Quill 内置模块无法满足我们的需求时，就需要创建自定义模块来实现我们想要的功能。

比如：我们想实现一个统计编辑器当前字数的功能，就可以通过自定义模块来实现的，下面我们将一步一步介绍如何将该功能封装成独立的 Counter 模块。

创建一个 Quill 模块分三步：

### 2.1 第一步：创建模块类

新建一个 JS 文件，里面是一个普通的 JavaScript 类。

```ts
class Counter {
  constructor(quill, options) {
    console.log('quill:', quill);
    console.log('options:', options);
  }
}

export default Counter;
```

这是一个空类，什么都没有，只是在初始化方法中打印了 Quill 实例和模块的 options 配置信息。

### 2.2 第二步：配置模块参数

```ts
modules: {
  toolbar: [
    ['bold', 'italic'],
    ['link', 'image']
  ],
  counter: true
}
```

我们先不传配置数据，只是简单地将该模块启用起来，结果发现并没有打印信息。

### 2.3 第三步：注册模块

要使用一个模块，需要在 Quill 初始化之前先调用 Quill.register 方法注册该模块类（后面我们详细介绍其中的原理），并且由于我们需要扩展的是模块（module），所以前缀需要以 modules 开头：

```ts
import Quill from 'quill';
import Counter from './counter';
Quill.register('modules/counter', Counter);
```

这时我们能看到信息已经打印出来。

### 2.4 添加模块的逻辑

这时我们在 Counter 模块中加点逻辑，用于统计当前编辑器内容的字数：

```ts
constructor(quill, options) {
  this.container = quill.addContainer('ql-counter');
  quill.on(Quill.events.TEXT_CHANGE, () => {
    const text = quill.getText(); // 获取编辑器中的纯文本内容
    const char = text.replace(/\s/g, ''); // 使用正则表达式将空白字符去掉
    this.container.innerHTML = `当前字数：${char.length}`;
  });
}
```

在 Counter 模块的初始化方法中，我们调用 Quill 提供的[addContainer](https://quilljs.com/docs/api/#addcontainer)方法，为编辑器增加一个空的容器，用于存放字数统计模块的内容，然后绑定编辑器的内容变更事件，这样当我们在编辑器中输入内容时，字数能实时统计。

在 Text Change 事件中，我们调用 Quill 实例的 getText 方法获取编辑器里的纯文本内容，然后用正则表达式将其中的空白字符去掉，最后将字数信息插入到字符统计的容器中。

展示的大致效果如下：

![quill-modularization-principle-2.png](/public/assets/quill-modularization-principle-2.png)

要看以上 Demo，请怒戳[自定义字符统计模块](https://codepen.io/kagol/pen/MWwpoRq)。

## 3 模块加载机制

对 Quill 模块有了初步的理解之后，我们就会想知道 Quill 模块是如何运作的，下面将从 Quill 的初始化过程切入，通过工具栏模块的例子，深入探讨 Quill 的模块加载机制。（本小结涉及 Quill 源码的解析，有不懂的地方欢迎留言讨论）

### 3.1 Quill 类的初始化

当我们执行 new Quill() 的时候，会执行 Quill 类的 constructor 方法，该方法位于 Quill 源码的 core/quill.js 文件中。

初始化方法的大致源码结构如下（移除模块加载无关的代码）：

```ts
constructor(container, options = {}) {
  this.options = expandConfig(container, options); // 扩展配置数据，包括增加主题类等
  ...
  this.theme = new this.options.theme(this, this.options); // 1.使用options中的主题类初始化主题实例

  // 2.增加必需模块
  this.keyboard = this.theme.addModule('keyboard');
  this.clipboard = this.theme.addModule('clipboard');
  this.history = this.theme.addModule('history');

  this.theme.init(); // 3.初始化主题，这个方法是模块渲染的核心（实际的核心是其中调用的addModule方法），会遍历配置的所有模块类，并将它们渲染到DOM中
  ... 
}
```

Quill 在初始化时，会使用 expandConfig 方法对传入的 options 进行扩展，加入主题类等元素，用于初始化主题。（不配置主题也会有默认的 BaseTheme 主题）

之后调用主题实例的 addModule 方法将内置必需模块挂载到主题实例中。

最后调用主题实例的 init 方法将所有模块渲染到 DOM。（后面会详细介绍其中的原理）

如果是 snow 主题，此时将会看到编辑器上方出现工具栏：


![quill-modularization-principle-3.png](/public/assets/quill-modularization-principle-3.png)

如果是 bubble 主题，那么当选中一段文本时，会出现工具栏浮框：


![quill-modularization-principle-4.png](/public/assets/quill-modularization-principle-4.png)

接下来我们以工具栏模块为例，详细介绍 Quill 模块的加载和渲染原理。

### 3.2 工具栏模块的加载

以 snow 主题为例，当初始化 Quill 实例时配置以下参数：

```ts
{
  theme: 'snow',
  modules: {
    toolbar: [['bold', 'italic', 'strike'], ['link', 'image']]
  }
}
```

Quill 的 constructor 方法中获取到的 this.theme 是 SnowTheme 类的实例，执行 this.theme.init() 方法时调用的是其父类 Theme 的 init 方法，该方法位于 core/theme.js 文件。

```ts
init() {
  // 遍历Quill options中的modules参数，将所有用户配置的modules挂载到主题类中
  Object.keys(this.options.modules).forEach(name => {
    if (this.modules[name] == null) {
      this.addModule(name);
    }
  });
}
```

它会遍历 options.modules 参数中的所有模块，调用 BaseTheme 的 addModule 方法，该方法位于 themes/base.js 文件。

```ts
addModule(name) {
  const module = super.addModule(name);
  if (name === 'toolbar') {
    this.extendToolbar(module);
  }
  return module;
}
```

该方法会先执行其父类的 addModule 方法，将所有模块初始化，如果是工具栏模块，则会在工具栏模块初始化之后对工具栏模块进行额外的处理，主要是构建 icons 和绑定超链接快捷键。

我们再回过头来看下 BaseTheme 的 addModule 方法，该方法是模块加载的核心。

该方法前面我们介绍 Quill 的初始化时已经见过，加载三个内置必需模块时调用过。其实所有模块的加载都会经过该方法，因此有必要研究下这个方法，该方法位于 core/theme.js。

```ts
addModule(name) {
  const ModuleClass = this.quill.constructor.import(`modules/${name}`); // 导入模块类，创建自定义模块的时候需要通过Quill.register方法将类注册到Quill，才能导入
  // 初始化模块类
  this.modules[name] = new ModuleClass(
    this.quill,
    this.options.modules[name] || {},
  );
  return this.modules[name];
}
```

addModule 方法会先调用 Quill.import 方法导入模块类（通过 Quill.register 方法注册过的才能导入）。

然后初始化该类，将其实例挂载到主题类的 modules 成员变量中（此时该成员变量已有内置必须模块的实例）。

以工具栏模块为例，在 addModule 方法中初始化的是 Toolbar 类，该类位于 modules/toolbar.js 文件。

```ts
class Toolbar {
  constructor(quill, options) {
    super(quill, options);

    // 解析modules.toolbar参数，生成工具栏结构
    if (Array.isArray(this.options.container)) {
      const container = document.createElement('div');
      addControls(container, this.options.container);
      quill.container.parentNode.insertBefore(container, quill.container);
      this.container = container;
    } else {
      ...
    }

    this.container.classList.add('ql-toolbar');

    // 绑定工具栏事件
    this.controls = [];
    this.handlers = {};
    Object.keys(this.options.handlers).forEach(format => {
      this.addHandler(format, this.options.handlers[format]);
    });
    Array.from(this.container.querySelectorAll('button, select')).forEach(
      input => {
        this.attach(input);
      },
    );
    ...
  }
}
```

工具栏模块初始化时会先解析 modules.toolbar 参数，调用 addControls 方法生成工具栏按钮和下拉框（基本原理就是遍历一个二维数组，将它们以按钮/下拉框形式插入到工具栏中），并为它们绑定事件。

```ts
function addControls(container, groups) {
 if (!Array.isArray(groups[0])) {
  groups = [groups];
 }
 groups.forEach(controls => {
  const group = document.createElement('span');
  group.classList.add('ql-formats');
  controls.forEach(control => {
    if (typeof control === 'string') {
      addButton(group, control);
    } else {
      const format = Object.keys(control)[0];
      const value = control[format];
      if (Array.isArray(value)) {
        addSelect(group, format, value);
      } else {
        addButton(group, format, value);
      }
    }
  });
  container.appendChild(group);
 });
}
```

工具栏模块就这样被加载并渲染到富文本编辑器中，为编辑器操作提供便利。

现在对模块的加载过程做一个小结：

1.  模块加载的起点是 Theme 类的 init 方法，该方法将 option.modules 参数里配置的所有模块加载到主题类的成员变量 modules 中，并与内置必需模块合并；
2.  addModule 方法会先通过 import 方法导入模块类，然后通过 new 关键字创建模块实例；
3.  创建模块实例时会执行模块的初始化方法，执行模块的具体逻辑。

以下是模块与编辑器实例的关系图：

![quill-modularization-principle-5.png](/public/assets/quill-modularization-principle-5.png)

## 总结

本文先通过2个例子简单介绍了 Quill 模块的配置方法，让大家对 Quill 模块有个直观初步的印象。

然后通过字符统计模块这个简单的例子介绍如何开发自定义 Quill 模块，对富文本编辑器的功能进行扩展。

最后通过剖析 Quill 的初始化过程，逐步切入 Quill 模块的加载机制，并详细阐述了工具栏模块的加载过程。


<EditInfo time="2020年02月27日 14:00" title="阅读 8155 ·  点赞 118 ·  评论 29 ·  收藏 86" />
