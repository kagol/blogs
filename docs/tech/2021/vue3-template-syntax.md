# 点线面 Vue3：把模板语法这条线串起来！

![image](https://user-images.githubusercontent.com/9566362/201513868-e6935caa-a697-42ff-ae89-88f4c4cfcfff.png)

我把一个初学者学习新技术分成3个大阶段8个小阶段，分别是：

阶段一：入门和熟悉
1. 先用起来：[从一个工作多年的Vue初学者角度学习Vue3：初识Vue组件](https://juejin.cn/post/6993676123385102373)
2. 熟悉API：`当前阶段`

阶段二：使用和输出
1. 做一个实际的项目
2. 编写扩展插件
3. 输出总结文章

阶段三：原理和再造
1. 了解总体架构和设计
2. 分析源码
3. 做一个迷你版本

[上一篇](https://juejin.cn/post/6993676123385102373)文章我们创建了一个Vue3的工程，并成功把它跑起来了，【先用起来】这个步骤算是完成。

【先用起来】这个步骤的主要目标是对新技术有一个感性的印象，这个步骤完成之后，我们大致能知道：
1. 这个新技术是干嘛的
2. 它的基本构造（基本概念）有哪些
3. 怎么用（跑）起来

通过上一篇文章：

[从一个工作多年的Vue初学者角度学习Vue3：初识Vue组件](https://juejin.cn/post/6993676123385102373)

我们基本上完成了上述目标：
1. 了解到Vue3是一个渐进式的JavaScript框架，用来构建UI层
2. 它的基本构造是Vue组件，Vue组件由template/script/style三部分组成
3. 通过Vite工程可以将Vue3项目跑起来，并体验了一把Vite非常丝滑的热更新（HMR）

第一个阶段我们只需要获取感性印象即可，把它跑起来、去体验，然后改改这个，改改那个，看下效果是什么。把这个打开，看下里面有什么，然后盖回去。对那个感兴趣，就去官网扫一眼API，或者亲自尝试下它是干嘛的。

而第二个阶段我们需要对这个新技术形成更广泛的认识，要了解它的全貌，要记住高频使用的API。根据二八定律，一般20%的API就能覆盖到80%的项目场景，因此最重要的任务就是熟悉API，并熟记那20%的高频API。

这时我们就需要看Vue3的官方文档了：
[https://vue3js.cn/docs/zh/guide/introduction.html](https://vue3js.cn/docs/zh/guide/introduction.html)

## 1 带着思考去看文档

文档写作者在写文档的时候，一般都会把文档的读者当成“傻瓜”来写，这样写出来的文档才能更清晰、更完整，读者才能更容易读懂。

但实际上读者并不是没有任何基础的“傻瓜”，不同的读者有不同的经历和背景，对文档的接受和理解程度也不一样。

因此我们看文档的时候，不一定要完全按照顺序去看，而是要结合自己的实际情况，有针对性、有目的地去看。

文档只是一个参考，我们学习新技术的方式有很多，看文档只是一方面，因此看文档的时候一定要带着思考和问题去看，而不是盲目地从头看到尾。

上一个阶段我们了解到 Vue 组件分成三个部分：
- template
- script
- style

不妨从这个思路去看文档。

先看基础部分的文档：

![基础.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/24b87ac68f994ee4b9836213a1ba4866~tplv-k3u1fbpfcp-watermark.image)

大部分都是在讲`template`部分（红框），也讲了一些`script`的内容（蓝框）。

在第一阶段我们已经对template有一定的直观印象：
- template里面可以使用Vue的模板语法，进行数据的动态渲染
- `文本插值`（双大括号包裹）是一种非常基础的模板语法
- `@click`是Vue事件绑定的语法

我们了解到了三个关键字：`模板语法`、`文本插值`、`事件绑定`。

所以看文档的第一步应该是去深入了解下这几个概念到底是什么。然后通过这几个单点的概念，串起来整个模板语法的线。

其中的`模板语法`和`文本插值`的文档在：[https://vue3js.cn/docs/zh/guide/template-syntax.html](https://vue3js.cn/docs/zh/guide/template-syntax.html)

`事件绑定`的文档在：[https://vue3js.cn/docs/zh/guide/events.html](https://vue3js.cn/docs/zh/guide/events.html)

文章较长，如果想直接看小结，可以跳转到以下章节： [6 小结](https://juejin.cn/post/6996654736652894222#heading-18)

## 2 模板语法概览

模板语法的文档其实就讲了两个东西：`插值`和`指令`。

![模板语法.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/46e1a12e04b54939a678d49576d93dbc~tplv-k3u1fbpfcp-watermark.image)

插值我们已经有一定的了解，并且知道了：

> `文本插值`就是把一个Vue组件的变量和模板绑在一起，变量的值最终会渲染到模板里面。

```html
<h1>{{ msg }}</h1>

<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
```

最终渲染出来就是：

```html
<h1>Hello Vue 3 + TypeScript + Vite</h1>
```

> 通过阅读文档，我们的目的是由点到线、由线到面地将零散的认识串起来。

`文本插值`只是一个点，线是什么？

所有的插值类型是线，整个模板语法是线，模板编译的原理也是线。

让我们一条一条线串起来吧。

## 3 插值

从文档我们可以了解到，除了文本插值，还有
- HTML插值
- 属性插值
- JavaScript表达式支持

### 3.1 HTML插值

关于HTML插值，文档给了一个非常好的例子，非常清晰：

```html
<p>Using mustaches: {{ rawHtml }}</p>

<p>Using v-html directive: <span v-html="rawHtml"></span></p>
```

```js
rawHtml: '<span style="color: red">This should be red.</span>'
```

同样一个HTML字符串文本，通过文本插值，会直接把这个HTML字符串文本显示出来；而HTML插值则会将HTML字符串渲染出来（这里是一个红色的文本）。

![HTML插值.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5df288026f4b4bd18e4e4a30c338de6b~tplv-k3u1fbpfcp-watermark.image)

这里借助了一个Vue指令：`v-html`。

这是我们接触到的第2个Vue指令，前面文本插值时也出现了一个`v-once`指令，用于一次性插值。

我们可以先不深究Vue指令到底是什么，后面会专门学习，只需要知道
- 它是以`v-`开头的
- 用在html元素或Vue组件元素上的一个“命令”
- 使用了这个“命令”的元素，它的表现或行为会发生一定的变化

知道这些就够了。

### 3.2 属性插值

除了可以将变量插到元素里面，还可以插到元素的属性上，比如`id`/`disabled`/`title`/`src`等属性。

属性插值需要借助另一个Vue指令：`v-bind`。

```html
<div v-bind:id="dynamicId"></div>
```

```js
dynamicId: 'name1'
```

最终渲染出来是：

```html
<div id="name1"></div>
```

这是我们学习的第3个指令，后面还接触到更多Vue内置指令。
> 这些指令在实际工作中使用的频率非常高，都需要记住，属于那20%的API。

这个`v-bind:id`和之前的`v-once`和`v-html`指令都不一样，这个`v-bind`指令是带参数的，这里的参数是`id`，代表需要绑定id这个属性。

由于`v-bind`指令太常用了，因此Vue给它提供了一个缩写形式，比如`v-bind:id`可以直接写成`:id`：

```html
<div v-bind:id="dynamicId"></div>

<=>

<div :id="dynamicId"></div>
```

### 3.3 使用JavaScript表达式

之前的插值，都是只绑定一个变量，其实还可以绑定一个JavaScript表达式，比如：

```html
<h1>{{ hasMsg ? msg : 'Hello World' }}</h1>
```

以上文本插值绑定了一个三目运算符，里面有两个变量和一个字符串：
- 当hasMsg为true时，实际绑定的是msg的值
- 当hasMsg为false时，绑定'Hello World'字符串

属性插值也可以绑定表达式：

```html
<div v-bind:id="'list-' + id"></div>
```

以上属性插值绑定了一个字符串拼接的表达式，实际绑定字符串'list-'和变量id的值拼接之后的值。

> 这样我们就把插值的线连起来了。

![插值线.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93cb27e5f51b41d6943a5e6e3e9d2a4a~tplv-k3u1fbpfcp-watermark.image)

让我们回顾一下：
- 插值就是将组件实例的变量绑定到dom中
- 共有`文本插值`、`HTML插值`、`属性插值`3种插值类型
- 插值除了支持变量，还支持JavaScript表达式
- 了解了Vue指令就是一个用在元素上的“命令”，会影响元素的表现和行为
- 学习了三个常用的Vue指令：`v-once`/`v-html`/`v-bind`（v-bind是带参数指令）

## 4 指令

模板语法这条线上除了`插值`这条线，还有一条`指令`的线。

指令我们前面已经有了初步的了解，并且学习了3个简单的指令，也了解到指令其实是可以带参数的。

这些都是孤立的点，通过阅读文档，我们就可以将已知的孤立点补充完整，串成一条线。

指令(Directives)是带有`v-`前缀的特殊属性，它的职责是：
> 当表达式的值改变时，将其产生的连带影响，响应式地作用于DOM。

文档中介绍了一个`v-if`指令的例子：

```html
<p v-if="seen">现在你看到我了</p>
```

如果seen变量为true，那么最终渲染成：
```
<p>现在你看到我了</p>
```

如果seen为false，则不会渲染p元素：
```
<!--v-if-->
```

`v-if`指令是我们学习到的第4个Vue内置指令，也非常常用。

通过文档我们了解到除了`一般的指令`和`参数指令`外，还有：
- 动态参数指令
- 带修饰符的指令

### 4.1 动态参数指令

参数指令我们前面介绍属性插值时提到过：

```html
<div v-bind:id="dynamicId"></div>
```

`v-bind`就是一个典型的参数指令，可以用于响应式地更新HTML属性，比如上面的例子用于更新`id`属性。

还有一个参数指令是`v-on`，用于事件绑定，比如想要给按钮绑定一个点击事件：

```html
<button type="button" v-on:click="confirm">确定</button>
```

`v-on`后面的`click`的就是这个指令的参数，代表绑定的是`click`点击事件。

`v-bind:id`其实等于是绑死了`id`这个元素，其中的参数部分还可以写一个JavaScript表达式，让其变成动态参数，比如：

```html
<div v-bind:[attributeName]="dynamicValue">测试动态参数指令</div>
```

当`attributeName`是`id`的时候，绑定的就是属性id，当`attributeName`变成`title`时，绑定的属性就变成`title`了，所以叫：动态参数指令。

`v-on`指令一样也可以带动态参数，比如：

```html
<a v-on:[eventName]="doSomething">测试v-on指令的动态参数</a>
```

当eventName是click时，绑定的是点击事件；当eventName是focus时，绑定的是聚焦事件。

### 4.2 带修饰符的指令

修饰符 (modifier) 是以半角句号`.`指明的特殊后缀，用于指出一个指令应该以特殊方式绑定。

`v-on`指令除了可以带参数之外，还可以带修饰符（比如带`.prevent`修饰符）。

![举个例子1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/568b4ee025b44cb8909126858b2874e3~tplv-k3u1fbpfcp-watermark.image)

```html
<a v-on:click.prevent="confirm" href="https://devui.design/">带prevent修饰符的超链接</a>
```

带了`.prevent`修饰符会在触发事件之后调用`event.preventDefault()`，以阻止超链接默认的跳转动作，所以上面的超链接点击之后只会执行confirm方法，不会跳转。

如果不带`.prevent`修饰符，则执行完confirm事件之后，还会执行超链接的默认跳转行为，并跳转到`https://devui.design/`链接：

```html
<a v-on:click="confirm" href="https://devui.design/">普通超链接</a>
```

需要注意的是：
> Vue指令的参数只能有一个，而修饰符可以有多个

目前Vue的大部分修饰符都存在于`v-on`指令。

`v-on`指令是我们学到的第5个Vue内置指令，用于绑定事件，该指令非常常见，因此和`v-bind`指令一样，Vue也给`v-on`指令提供了特定的简写形式，比如`v-on:click`可以简写成`@click`：

```html
<button type="button" v-on:click="confirm">确定</button>

<=>

<button type="button" @click="confirm">确定</button>
```

回顾下目前为止我们学习到的Vue内置指令：
1. `v-once`：一次性插值，并缓存该值，不可改变
2. `v-html`：HTML插值，用于渲染HTML内容，容易导致XSS攻击，谨慎使用
3. `v-bind`：非常常用，属性绑定，用于响应式的更新HTML属性，可带参数/动态参数，`v-bind:attributeName`可简写成`:attributeName`
4. `v-if`：非常常用，用于动态插入/移除元素和组件，会将元素从DOM树中实际移除
5. `v-on`：常用常用，用于事件绑定，可带参数/动态参数，可带修饰符，`v-on:eventName`可简写成`@eventName`

> 这样我们把指令这条线也基本串起来了。

![指令线.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/49a3ca1f9fe44db7b76bf18d098bc094~tplv-k3u1fbpfcp-watermark.image)

其实到这里，模板语法线基本上就已经串起来了，不过还漏了点内容：
1. 指令是Vue里面非常关键的概念，内容也非常多，Vue3文档的基础部分其实大部分都是在讲Vue的一些内置指令，因此指令线非常长，我们目前串起来的指令线是不完整的，后续还会继续延伸`指令线`
2. 在众多内置指令里面，`v-on`事件绑定算是一个非常基础又非常重要的存在，而且前面也多次提到过，因此也放在本篇文章
3. 模板语法里面还有一个概念没有在`基础`里面出现，而是在`深入组件`的文档里，就是`模板引用`，这部分内容非常简单，没什么内容，不过我觉得它也算模板语法线的一部分，因此也一并放进来

非常感谢你能阅读到这里，还有最后5分钟就阅读完了，先喝杯水放松下吧😋

### 4.3 事件绑定

事件绑定其实我们在[第一篇文章](https://juejin.cn/post/6993676123385102373/)就已经见过：

```html
<button type="button" @click="count++">count is: {{ count }}</button>
```

不过当时是以单点的方式有一个感官的认识。

前面我们在介绍`动态参数指令`和`带修饰符的指令`中又多次接触到`v-on`事件绑定，现在我们知道它属于`指令`这条线的一部分，而`指令线`又属于`模板语法`这条长线的一部分，这样知识点就串起来。

![模板语法线基本.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb2291ddf97c4446a9a2889461dc8876~tplv-k3u1fbpfcp-watermark.image)

如果我们学习的时候每次只记得一些点，没有串成线，就很难进行知识的联想，而且零散的知识点也容易忘记。

> 一旦将点串成线，线织成面，我们就能从全局的角度、连接的角度看待这门新技术，便于记忆，并能够举一反三地灵活运用这门新技术。

在Vue中事件绑定都是通过`v-on`指令来进行的，而`v-on:eventName`指令可以简写成`@eventName`。

前面我们已经知道如何绑定事件：

```html
<button type="button" @click="count++">count is: {{ count }}</button>
```

每次点击按钮，count变量都会自增1。

以上例子中的`count++`是一个表达式，通过阅读官方文档，我们了解到，除了写表达式，还可以写：
- 事件处理方法
- 内联处理器中的方法
- 多事件处理器
- 事件修饰符
- 按键修饰符
- 系统修饰键

#### 4.3.1 事件处理器

事件处理器就是给事件绑定一个方法名。

```html
<button type="button" @click="add">count is: {{ count }}</button>
```

```js
setup() {
  const count = ref(0)

  const add = () => {
    count.value++
  }

  return {
    count,
    add,
  }
}
```

除了绑定方法名，还可以直接执行方法（内联处理器）：

```html
<button type="button" @click="add()">count is: {{ count }}</button>
```

除了执行一个方法，还可以通过逗号分隔，一次执行多个方法：

```html
<button type="button" @click="add(),double()">count is: {{ count }}</button>
```

```js
setup() {
  const count = ref(0)

  const add = () => {
    count.value++
  }

  const double = () => {
    count.value = count.value * count.value
  }

  return {
    count,
    add,
    double,
  }
}
```

#### 4.3.2 事件修饰符

事件修饰符我们在讲`带修饰符的指令`时也初步了解过，修饰符是由点开头的指令后缀来表示的。

以下是一些常见的事件修饰符：
- `.stop` 阻止事件传播
- `.prevent` 阻止默认事件行为
- `.capture` 使用事件捕获模式
- `.self` 点中自己时才触发（点中内部元素不触发）
- `.once` 事件只触发一次
- `.passive` 滚动事件的默认行为 (即滚动行为) 将会立即触发，而不会等待 `onScroll` 完成

前面4个多用于click点击事件，我做了几个demo帮助大家理解它们的含义。

```html
<div @click="containerClick" style="border: solid 1px red">
  Container
  <div @click="outClick" style="border: solid 1px green; margin: 20px; padding: 20px;">
    Button wrapper
    <button type="button" @click="add">Add</button>
  </div>
</div>
```

```js
setup() {
  const containerClick = () => {
    console.log('containerClick')
  }

  const outClick = () => {
    console.log('outClick')
  }

  const add = () => {
    console.log('add')
  }

  return {
    containerClick,
    outClick,
    add,
  }
}
```

![点击事件.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/468f6a9d39324c8ebe15f29ae4548f73~tplv-k3u1fbpfcp-watermark.image)

从外到内一共有三个元素、三个点击点：
- 最外层的容器元素（Container 红色圆圈）
- 按钮的外部元素（Button wrapper 绿色圆圈）
- 按钮元素（Button 蓝色圆圈）

默认情况下，事件遵循冒泡的传播方式（从内到外）。

我们点击按钮元素，会依次打印：
```
add
outClick
containerClick
```

点击按钮外层元素，会依次打印：
```
outClick
containerClick
```

`.prevent`修饰符前面讲`带修饰符的指令`时已经举过🌰，不再重复，直接从`.stop`修饰符开始。

##### stop修饰符

我们给按钮元素加`.stop`修饰符，将会阻止事件往上传播。

```html
<button type="button" @click.stop="add">Add</button>
```

此时只会打印：
```
add
```

##### self修饰符

如果给按钮外层的元素加`.self`修饰符，将只有真正点击了该元素才会触发，点击里面的按钮不会触发。

```html
<div @click.self="outClick" style="border: solid 1px green; margin: 20px; padding: 20px;">
  Button wrapper
  <button type="button" @click="add">Add</button>
</div>
```

此时如果点击按钮，只会打印：
```
add
```

如果点击按钮外层元素，则会打印：
```
outClick
containerClick
```

##### capture修饰符

给某个元素的点击事件增加捕获修饰符，意味着该元素的事件传播遵循从外到内的捕获模式，只影响该元素的事件传播模式。

给按钮外部元素增加`.capture`修饰符：

```html
<div @click.capture="outClick" style="border: solid 1px green; margin: 20px; padding: 20px;">
  Button wrapper
  <button type="button" @click="add">Add</button>
</div>
```

此时点击按钮元素，将打印：
```
outClick
add
containerClick
```

事件修饰符中还有两种非常有用：
- 按键修饰符 enter / tab / delete / space 等
- 系统修饰键 ctrl / alt / shift / meta 等

涉及的修饰符比较多，也比较好理解，大家感兴趣可以自行阅读官网文档即可。

[按键修饰符](https://vue3js.cn/docs/zh/guide/events.html#%E6%8C%89%E9%94%AE%E4%BF%AE%E9%A5%B0%E7%AC%A6)

[系统修饰键](https://vue3js.cn/docs/zh/guide/events.html#%E7%B3%BB%E7%BB%9F%E4%BF%AE%E9%A5%B0%E9%94%AE)

加上事件处理这条线，指令这条长线就变得更加完整了。

![指令长线.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59c156889d514f42b46bc7c7aa1f9a71~tplv-k3u1fbpfcp-watermark.image)

## 5 模板引用

对于模板语法这条线来说，还差一个模板引用。

先看下官网文档怎么解释模板引用的：

> 尽管存在 prop 和事件，但有时你可能仍然需要直接访问 JavaScript 中的子组件。为此，可以使用 `ref` attribute 为子组件或 HTML 元素指定引用 ID。

所以其实模板引用就是为了获取到template模板中的具体元素，从而操纵它。而template模板里面就只有两类元素：
- 原生HTML元素
- 组件元素

对应两种模板引用。

### 5.1 HTML元素引用

HTML元素引用获取到的是DOM元素。

![举个例子2.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/08b9040847194941ab6942442fd12a43~tplv-k3u1fbpfcp-watermark.image)

我们给img标签增加一个ref属性，绑定img标签的引用imgRef。

```html
<img alt="Logo" src="./assets/logo.png" ref="imgRef" />
<br />
<button type="button" @click="changeImg">Change img src</button>
```

```js
setup() {
  const imgRef = ref(null)

  const changeImg = () => {
    imgRef.value.src = 'src/assets/devui.png'
    imgRef.value.width = 200
  }

  return {
    imgRef,
    changeImg,
  }
}
```

### 5.2 子组件引用

子组件引用获取到的是子组件实例。

还是举一个🌰

![举栗子3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/da03ef8d578d439798532e9fe6d042c0~tplv-k3u1fbpfcp-watermark.image)

```html
<HelloWorld ref="helloWorldRef" msg="Hello everyone! I'm learning Vue 3 + TypeScript + Vite" />
<button type="button" @click="add">Add</button>
```

```js
setup: () => {
  const helloWorldRef = ref(null)

  const add = () => {
    // 拿到子组件的引用之后，就可以获取组件实例的变量和方法啦～
    helloWorldRef.value.add()
    
    // 也可以直接修改子组件实例的count变量
    // helloWorldRef.value.count++
  }

  return { 
    helloWorldRef,
    add,
  }
}
```

hello-world.vue

```html
<p>{{ count }}</p>
```

```js
setup: () => {
  const count = ref(0)

  // 该方法为组件的实例方法，可以通过模板引用的方式调用
  const add = () => {
    count.value++
  }

  return { 
    count,
    add,
  }
}
```

至此，整个模板语法线就完整得串起来了。

## 6 小结

最后用这条模板语法的线，作为本文的小结吧。

![模板语法线详细.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/055c83653db64a51bab70d019d1b05ef~tplv-k3u1fbpfcp-watermark.image)

参考：

[Vue3 中文文档 - 模板语法](https://cn.vuejs.org/guide/essentials/template-syntax.html)

<EditInfo time="2021年08月15日 21:54" title="阅读 1249 ·  点赞 20 ·  评论 1 ·  收藏 9" />
