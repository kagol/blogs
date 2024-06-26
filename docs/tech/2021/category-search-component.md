# CategorySearch 分类搜索组件初体验——来自真实业务的反馈

![image](https://user-images.githubusercontent.com/9566362/201514643-8046e42d-7cdd-47bd-a271-16a568cf79ff.png)

DevUI 近期发布了v11.1.0版本，这个版本给DevUI组件大家族增加了两个新成员：
- 一个是 CategorySearch 分类搜索组件
- 另一个是 ReadTip 阅读提示组件

这两个组件都非常实用，DevCloud 研发工具链已经有业务在使用了，我们一起来看看来自真实业务使用的反馈吧，以下是 ProjectMan 项目管理业务使用 CategorySearch 组件后的反馈。

---

近期 ProjectMan 服务接入了 DevUI 组件库的 CategorySearch 分类过滤器组件。

初步体验了下，搜索、过滤的体验比之前提升了很多。

## 1 旧过滤器的缺陷

之前的搜索和过滤功能存在以下缺点。

### 缺点一：搜索和过滤功能分离

主要体现在：

1. 搜索框和搜索条件的显示分离
2. 搜索框和字段过滤功能分离

如下图所示：

![1-1.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab7c4227a52b489c9c0e0d8e0e504405~tplv-k3u1fbpfcp-watermark.image)

### 缺陷二：高级过滤交互太复杂，操作效率低

之前的过滤功能有单独的入口，在显示字段的后面

![2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ff1d082db3e4273b0b18d5b3c49a669~tplv-k3u1fbpfcp-watermark.image)

点击这个过滤按钮，会展开一个很高的过滤面板，占用主体内容（工作项列表）的空间。

其次过滤面板为了尽可能不占用太大空间，将部分字段隐藏，然后设计了一个“增加过滤字段”的功能，让用户自己按需添加，从逻辑上来说是合理的，但是从体验上来说是糟糕的，增加了用户的学习成本，同时降低了操作的效率。

比如：

用户想按工作项的更新日期过滤，过滤最近三天更新过的工作项，需要执行以下操作：

1. 点击过滤按钮，展开过滤面板
2. 点击增加过滤字段按钮，打开字段选择模态框
3. 勾选更新日期字段
4. 点击确定按钮
5. 点击更新日期下拉框，弹出日期选择面板
6. 选择开始/结束日期
7. 点击确定
8. 点击临时过滤

替换成新的分类过滤器组件之后，以上过滤需求只需要5步就可以完成，提升了操作效率。

假设上面的日期需要修改，用户想要过滤最近七天的工作项，旧的过滤器需要6步，新的过滤器只需要4步。


![1-2.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6ae06619148f4d4aa0623ec6fe4aa091~tplv-k3u1fbpfcp-watermark.image)


![1-3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/031e559330154ce387f076ee6875b01b~tplv-k3u1fbpfcp-watermark.image)

### 缺陷三：交互扩展性差

一旦过滤字段增多，旧的过滤器无法扩展，会不断地占用主体内容的空间，直到屏幕显示的全是过滤条件，没有主体内容。

![1-4.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/99bfddbebfb04f80bbbdc6f6030c1a48~tplv-k3u1fbpfcp-watermark.image)

## 2 整合、提效和可扩展

旧过滤器的缺陷也是用户的痛点，而这些痛点正是新过滤器要解决的。

### 优化一：整合搜索、过滤、过滤条件的显示3个功能

新的过滤器将搜索、过滤、过滤条件的显示三者整合在一起，只有一个输入框。看着就非常清爽，简单通常意味着用户的学习成本低，上手容易，用户才会喜欢用、经常用。

而且由于将过滤条件的显示也放到输入框中，增加了交互上的可扩展性，不管过滤多少个字段，一个输入框搞定一切。

如下图所示：

![6.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1b7a4ca23c0a456fb5a6be8ffe5dea69~tplv-k3u1fbpfcp-watermark.image)

### 优化二：收纳过滤字段

如果只是简单，功能却少了，肯定是不行，新的分类过滤器保留了旧过滤器的全部功能，并做了交互上的简化，提高了操作效率和用户体验。

新过滤器移除了新增过滤字段这个蹩脚的设计，将所有过滤条件收纳到一个下拉框中，点击输入框即可弹出该下拉框。

如下图所示：

![7.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d02202f341e34cc9a1daae9679430b97~tplv-k3u1fbpfcp-watermark.image)

选择过滤字段之后，马上会弹出选择过滤值的下拉框，这种交互体验非常自然和流畅，这也是我喜欢这个过滤器最主要的原因。

除了流畅和符合预期，还缩短了操作路径，提高了操作效率：原来需要8步才能完成的操作，现在只需要5步。

![8.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4f9eeadcd3f943909d17941facdbd2c0~tplv-k3u1fbpfcp-watermark.image)

![9.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ca191485adba45709150f70aad2ae9e1~tplv-k3u1fbpfcp-watermark.image)

### 优化三：更高效地修改过滤条件

之前的过滤器由于过滤面板这个糟糕的设计，每次修改过滤条件都要重新打开过滤面板，非常麻烦。

新过滤器可以直接通过点击过滤条件选项，展开过滤值下拉框，直接修改，非常高效。

![10.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/30f845d9e8a742c9a02491d660741501~tplv-k3u1fbpfcp-watermark.image)

---

以下是 CategorySearch 组件的地址，欢迎大家试用和反馈：

https://devui.design/components/zh-cn/category-search



<EditInfo time="2021年04月30日 00:19" title="阅读 1197 ·  点赞 10 ·  评论 3 ·  收藏 0" />
