# 深入浅出Quill：通过 Quill API 实现对编辑器内容的完全控制
## 引言

这是深入浅出 Quill 系列的第2篇。

[上一篇](https://juejin.cn/post/6976023288753586184)我们介绍了 Quill 的基本使用和配置，相信大家能够使用 Quill 搭建一个简单的富文本编辑器啦。

不过实际的业务场景可能更复杂，有更多定制的需求，Quill 能否满足呢？

Quill 是一款 API 驱动的富文本编辑器，它的内容可以通过API实现完全的掌控，我们一起来看看吧。

## 1 对内容的控制

富文本编辑器最基本的操作就是对内容的`增`/`删`/`改`/`查`，比如：

*   在编辑器某处增加一些文本
*   选中编辑器中的一部分内容，将其删除
*   选中一部分文本，给它添加某种格式
*   获取其中一部分内容，对其进行转换

以上操作直接通过键盘和鼠标很容易操作，但是通过 API 如何实现呢？

### 1.1 删

先看`删`的部分，通过`deleteText()`方法实现，该方法主要有两个入参：

*   index 从哪儿删除
*   length 删除多少内容

比如我想把下面的`上一篇`删除：

    this.quill.deleteText(0, 3);

![删除文本.png](/assets/quill-api-1.png)

又比如我想删除编辑器里的所有内容，但我们不知道里面一共有多少内容，是不是需要一个一个数一下呢？

其实是不需要的，Quill 提供了一个查询编辑器总字符数的方法`getLength()`（后面介绍`查`的部分也会讲到）。

所以删除所有内容也很简单：

    this.quill.deleteText(0, this.quill.getLength());

还有一种常见的情况，就是我们想删除编辑器中选中的内容，这要如何实现呢？

Quill 提供了一个获取编辑器选区的方法`getSelection()`（后面介绍`对选区的控制`时会讲到）可以轻松实现：

    // 获取选区内容所在的index和length
    const { index, length } = this.quill.getSelection();

    this.quill.deleteText(index, length);

![2024-01-20 12.04.09.gif](/assets/quill-api-2.gif)

是不是非常方便呢？

### 1.2 查

再来看`查`的部分，Quill 托管了编辑器里所有的内容，因此它对里面的内容了如指掌，Quill 知道：

*   指定位置有什么内容
*   有多少内容
*   它的格式是什么

可以使用`getText()`方法获取纯文本内容，它的使用方式和前面介绍过的`deleteText()`类似：

    // 获取指定位置的文本
    this.quill.getText(0, 6);

    // 不传入任何参数，可以获取全部文本
    this.quill.getText();

    // 获取选中文本
    const { index, length } = this.quill.getSelection();
    this.quill.getText(index, length);

都知道有什么内容了，拿到内容的长度就很简单了：

    const length = this.quill.getText().length;

Quill 提供了一个简便的方法`getLength()`，可以直接拿到全部文本的长度：

    const length = this.quill.getLength();

要获取选中文本的长度，可以使用之前介绍过的`getSelection()`方法：

    const length = this.quill.getSelection().length;

### 1.3 增

#### 1.3.1 插入文本

往编辑器里增加格式化的内容是最常见的需求，Quill 针对该场景提供了非常丰富的 API，最基础的就是`insertText()`方法。

该方法既可以增加纯文本，又可以增加带格式的文本。

插入纯文本需要传入两个参数：

*   index 从哪个位置插入文本
*   text 插入什么文本

<!---->

    this.quill.insertText(0, 'Quill 是一款 API 驱动的富文本编辑器');

插入带格式的文本需要额外传入两个参数：

*   format 格式的名字
*   value 格式的值

比如我想在当前光标后面插入一个带超链接的`Quill`：

    const range = this.quill.getSelection();
    if (range) {
      this.quill.insertText(range.index, 'Quill', 'link', 'https://quilljs.com/');
    }

![2024-01-20 12.09.37.gif](/assets/quill-api-3.gif)

#### 1.3.2 插入嵌入内容

插入嵌入内容的方法`insertEmbed()`，这个方法很强大，后续我会给大家分享如何使用这个方法在编辑器中插入龙、插入贪吃蛇游戏等好玩的内容。

这个方法和`insertText()`的区别在于没有第二个参数，因为它不需要插入文本。

比如插入B站风格的分割线：

    const index = this.quill.getSelection().index;
    this.quill.insertEmbed(index, 'divider', {
      url: 'assets/images/divider.png',
      width: '660px',
    });

![B站风格的分割线.png](/assets/quill-api-4.png)

比如插入龙：

    const index = this.quill.getSelection().index;
    this.quill.insertEmbed(index, 'dragon', {
      id: 'canvas-dragon',
    });

![2024-01-20 12.16.21.gif](/assets/quill-api-5.gif)

比如插入贪吃蛇小游戏：

    const index = this.quill.getSelection().index;
    this.quill.insertEmbed(index, 'snake', {
      id: 'canvas-snake',
    });

![2024-01-20 12.41.58.gif](/assets/quill-api-6.gif)

#### 1.3.3 用纯文本替换现有内容

这两个方法都是在现有内容的基础上新增文本。

如果要直接用新的内容替换现有文本，要怎么做呢？

使用以下两个`set`方法即可：

*   setText 设置纯文本
*   setContents 设置带格式的文本

`setText()`方法只有一个参数：

*   text 需要插入的纯文本

<!---->

    this.quill.setText('Hello Quill!');

如果`text`参数传入空字符串，则会清空编辑器内容：

    this.quill.setText('');

#### 1.3.4 用 delta 数据替换现有内容

`setContents()`方法非常强大，可以使用指定的 delta 数据来渲染编辑器的内容。

比如我们想要将当前富文本的内容变成一个贪吃蛇游戏：

    this.quill.setContents([
      { insert: { snake: { id: 'snake' } } }
    ]);

一般 delta 数据会存储在数据库中，使用 delta 来初始化编辑器内容时，可以使用该方法。

### 1.4 改

`setContents()`方法还有一个兄弟叫`updateContents()`，这俩兄弟本领都非常强。

`updateContents()`方法可以使用 delta 更新编辑器中的指定内容。

比如我想把选中的`Quill`内容变成`QuillJS`，并加上超链接，不使用`updateContents()`方法的情况下，我们需要调用多个方法：

    const { index, length } = this.quill.getSelection();
    this.quill.deleteText(index, length);
    this.quill.insertText(index, 'QuillJS', 'link', 'https://quilljs.com/');

我们再来看看使用`updateContents()`方法如何实现：

    this.quill.updateContents([
      { retain: index },
      { delete: length },
      { insert: 'QuillJS', attributes: { link: 'https://quilljs.com/' } }
    ]);

两种方法的效果一样，但是后者只需要调用一个方法。

> `updateContents()`方法可以赋予我们通过操作 delta 这个 JSON 数据来操作编辑器内容，而不用手动调用 API 去改变内容，在某些场景下这将是一个极大的便利。

## 2 对格式的控制

### 2.1 删

除了可以删除编辑器内容外，我们可能还需要清除某部分内容的格式，清除格式可以使用`removeFormat()`方法，该方法的使用方式和`deleteText()`几乎是一样的，不再赘述。

    // 清除指定位置和长度的文本的格式
    this.quill.removeFormat(0, 6);

    // 清除全部文本的格式
    this.quill.removeFormat(0, this.quill.getLength());

    // 清除选中文本的格式
    const { index, length } = this.quill.getSelection();
    this.quill.removeFormat(index, length);

### 2.2 查

#### 获取单一格式

`getText()`方法只能拿到纯文本，并不知道里面有什么格式，要想获取指定文本的格式，可以使用`getFormat()`方法，使用方式都一样。

    // 获取选中文本的格式
    const { index, length } = this.quill.getSelection();
    const format = this.quill.getFormat(index, length);

比如粗体的格式：

    { bold: true }

超链接的格式：

    { link: "https://juejin.cn/post/6976023288753586184" }

![获取格式.gif](/assets/quill-api-7.gif)

#### 获取 Delta 格式

不过`getFormat()`方法只能拿到单一的格式，如果想知道指定内容的全部格式信息，需要使用一个更加强大的API：`getContents()`，这个方法能获取内容的 delta 形式，而 delta 格式不仅描述了有什么内容，还描述了这些内容的格式是什么。

比如以下选中的内容，我们看看它的内容和格式是什么。

![delta格式.png](/assets/quill-api-8.png)

调用`getContents()`方法：

    const { index, length } = this.quill.getSelection();
    const contents = this.quill.getContents(index, length);
    console.log('contents:', contents);

打印了以下信息：

    {
      ops: [
        { insert: '删除内容' },
        { attributes: { header: 2 }, insert: '\n' }, // 标题二格式
        { insert: '先看' },
        { attributes: { code: true }, insert: '删' }, // 行内代码格式
        { insert: '的部分，通过' },
        { attributes: { code: true }, insert: 'deleteText()' }, // 行内代码格式
        { insert: '方法实现，该方法主要有两个入参：\nindex 从哪儿删除' },
        { attributes: { list: 'bullet' }, insert: '\n' }, // 无序列表格式
        { insert: 'length 删除多少内容' },
        { attributes: { list: 'bullet' }, insert: '\n' }, // 无序列表格式
        { insert: '比如我想把下面的' },
        { attributes: { code: true }, insert: 'Hello ' }, // 行内代码格式
        { insert: '删除：\nthis.quill.deleteText(0, 6);' },
        { attributes: { 'code-block': true }, insert: '\n' }, // 代码块格式
        { insert: '\n' }
      ]
    }

从以上 delta 结构我们很容易得出编辑器内容的格式信息：

*   `删除内容`是标题二格式
*   `删`/`deleteText()`/`Hello `是行内代码格式
*   `index 从哪儿删除`和`length 删除多少内容`是无序列表格式
*   `this.quill.deleteText(0, 6);`是代码块格式
*   其他内容都是纯文本格式

是不是一目了然呢？

### 2.3 增

除了删除和查找格式之外，还可以设置格式，Quill提供了3个设置格式的方法：

*   format(format, value) 设置选中文本的格式
*   formatLine(index, length, format, value) 设置行（块级）格式
*   formatText(index, length, format, value) 设置指定位置的文本格式

<!---->

    // 设置选中文本为粉色
    this.quill.format('color', 'pink');

    // 设置第10-20个字符为粉色
    this.quill.formatText(10, 10, 'color', 'pink');

    // 设置第一行为有序列表
    this.quill.formatLine(0, 1, 'list', 'ordered');

## 3 对选区的控制

### 3.1 查

#### 3.1.1 查询选区信息

获取当前选区或光标的方法`getSelection()`，我们在前面已经使用过多次，说明这个方法是一个非常实用的高频方法。

该方法不需要传入参数，返回当前选区信息：

*   index 选区开始位置
*   length 选区长度

<!---->

    {
      index: 0,
      length: 3
    }

如果只有光标，没有选择任何内容，则返回的`length`为`0`。

如果编辑器没有光标，则返回`null`。

#### 3.1.2 查询文本相对定位位置

除了查询选区位置和长度，还可以使用`getBounds()`方法查询指定位置的文本在编辑器容器中的相对定位位置，该方法有两个入参：

*   index 选区开始位置
*   length 选区长度

比如我想看下编辑器开头的三个字符的位置：

    const bounds = this.quill.getBounds(0, 3);

返回结果：

    {
      bottom: 49.100006103515625
      height: 22.5
      left: 18
      right: 66
      top: 26.600006103515625
      width: 48
    }

### 3.2 增

除了查看当前选区信息，我们还可以使用`setSelection()`方法手动设置选区和光标位置，该方法有两个参数：

*   index 选区开始位置
*   length 选区长度

如果只设置第一个参数，将只设置光标位置，不选中文本：

    // 将光标定位到第10个字符后面
    this.quill.setSelection(10);

两个参数同时设置将选中文本：

    // 选中第1到10个字符
    this.quill.setSelection(0, 10);

选区和光标是后续操作的基础，所以该方法和`getSelection()`方法一样，是一个非常常用的方法。

## 4 小结

我们做一个简单的小结：

*   对内容的控制
    *   删除内容 deleteText(index, length)
    *   查找内容 getText(index, length)
    *   获取编辑器内容长度 getLength()
    *   插入文本内容 insertText(index, text, format, value)
    *   插入嵌入内容 insertEmbed(index, format, value)
    *   使用纯文本替换内容 setText(text)
    *   用 delta 数据替换现有内容 setContents(delta)
    *   用 delta 更新内容 updateContents(delta)
*   对格式的控制
    *   删除格式 removeFormat(index, length)
    *   查找单一格式 getFormat(index, length)
    *   获取 Delta 格式 getContents(index, length)
    *   设置选中文本的格式 format(format, value)
    *   设置行格式 formatLine(index, length, format, value)
    *   设置文本格式 formatText(index, length, format, value)
*   对选区的控制
    *   获取选区/光标信息 getSelection()
    *   获取指定文本的相对定位 getBounds(index, range)
    *   设置选区/光标  setSelection(index, range)

## 5 案例：查找替换功能

最后我们用一个查找替换的案例来温故下之前介绍过的 API。

    // 待查找文本
    const str = 'Quill';
    const length = str.length;

    // 匹配目标文本的正则
    const reg = new RegExp(str, 'g');

    let match;
    while ((match = reg.exec(this.quill.getText())) !== null) {
      // 目标文本在文档中的位置
      const index = match.index;
      
      // 匹配到目标文本之后，我们可以对该文本做高亮或替换的处理
      
      // 高亮
      this.quill.formatText(index, length, 'background', '#ef0fff');
      
      // 替换
      this.quill.deleteText(index, length);
      this.quill.insertText(index, 'QuillJS', 'link', 'https://quilljs.com/');
    }

`查找替换`动画演示效果：

![2024-01-20 13.13.57.gif](/assets/quill-api-9.gif)

深入浅出 Quill 系列之使用篇到此结束，相信你已经能够灵活使用 Quill 搭建自己的富文本编辑器，为了帮助大家更深入地理解 Quill，接下来我将会开始解析 Quill 的实现原理，敬请期待！

<EditInfo time="2021年07月08日 07:39" title="阅读 3703 ·  点赞 37 ·  评论 20 ·  收藏 43" />
