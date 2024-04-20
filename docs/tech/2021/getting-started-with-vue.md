# 点线面 Vue3：先跑起来再说！

![](/assets/getting-started-with-vue-1.png)

一直觉得框架只是工具，工作中用不上就没必要去学，要用的时候再去学习即可。

所以对国内非常火爆的Vue框架也只有一个初浅的印象：
- Vue是一个渐进式的JavaScript框架
- Vue2通过defineProperty拦截对象实现响应式，而Vue3则改成了Proxy实现响应式
- Vue3增加了Composite API以解决代码复用和可维护性问题

近期系统地学习了一遍 Vue3，趁着刚学完，从初学者的角度总结 Vue3 的关键特性（只是从我个人的角度，不一定完全按照文档来）。

本文从以下技术栈的角度进行阐述：
- [vite@2.4.4](https://github.com/vitejs/vite/releases/tag/v2.4.4)
- [vue@3.1.5](https://github.com/vuejs/vue-next/releases/tag/v3.1.5)
- [typescript@4.3.5](https://github.com/microsoft/TypeScript/releases/tag/v4.3.5)

💡提示：截止到2021年8月7日，以上库/框架的版本都是最新版本。

文章较长，如果想直接看小结，可以跳转到以下章节：
[6 小结](#_6-小结)

## 1 先跑起来再说

对于一个小白来说，要学习一门新技术，最快的方式就是：
> 先跑起来再说

跑起来之后，我们会对这门新技术有一个直观的印象，后续看文档也会更清晰。

另外就是要多思考，带着问题去学习，记忆会更深刻，也更容易理解其中的原理。

后续我们学习过程中学到的新知识点，我都会加上官网的链接，不过这些官网资料只是一个进一步学习的参考，关键是我们自己要有思考，并带着问题去学习。

Vite是尤大大比较推荐的开发Vue3的工具，听说非常丝滑，所以第一步先建一个Vite的工程跑起来。

直接参考官网的[开始](https://cn.vitejs.dev/guide/)章节，一个命令就搞定啦：

```sh
yarn create vite learning-vue3 --template vue-ts
```

`--template`这个参数是选择一个工程模板，我们选择的是`vue-ts`：[Vue 3 + Typescript + Vite](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts)

Vite除了创建Vue的工程，还可以创建React/Preact/Svelte等多种框架的工程。

Vite果然非常快，不到3s就创建了一个基本的脚手架工程。

```
$ yarn create vite learning-vue3 --template vue-ts
yarn create v1.22.10
[1/4] 🔍  Resolving packages...
[2/4] 🚚  Fetching packages...
[3/4] 🔗  Linking dependencies...
[4/4] 🔨  Building fresh packages...

success Installed "create-vite@2.5.4" with binaries:
      - create-vite
      - cva
[###########################################################################################################################################################################################################] 232/232
Scaffolding project in /devui/kagol/learning-vue3...

Done. Now run:

  cd learning-vue3
  yarn
  yarn dev

✨  Done in 2.69s.
```

而且非常友好地提示我们下一步要执行的命令：
```
Done. Now run:

  cd learning-vue3
  yarn
  yarn dev
```

按照提示操作，我们很快就能将项目跑起来了！

![](/assets/getting-started-with-vue-2.png)

## 2 Vue 组件初步印象

启动画面最底下，有一个指引，让我们编辑`components/HelloWorld.vue`这个文件，测试下热更新（HMR）的功能。

我们找到这个文件`HelloWorld.vue`，不着急修改它，先来观察下它的结构。

这个文件是以`.vue`为文件后缀的，代表这是一个`Vue组件`。

一个Vue组件包含三个部分：
- 最顶部是一个`<template>`标签
- 中间是一个`<script lang="ts">`标签
- 最下面是一个`<style scoped>`标签

![](/assets/getting-started-with-vue-3.png)

这和我们最早学习前端编写html页面的结构是一样的，将`HTML`/`CSS`/`JavaScript`分成三个区块。

不过我们还是注意到一点不同：
- HTML部分是用`<template>`这个特殊的标签包裹起来的；
- `<script>`部分多了一个`lang="ts"`属性，代表支持`TypeScript`；
- `<style>`部分多了一个`scoped`属性，代表局部样式，即：这里面写的样式只针对当前这个Vue组件。

以上就是目前观察到的Vue组件的基本特点。

## 3 \<template\> 分析

我们把`<template>`/`<script>`/`<style>`三个标签展开，看下里面的结构。

先看下`<template>`，里面元素比较多，先都收起来，看下大致结构。

![](/assets/getting-started-with-vue-4.png)

我们注意到里面就是一些html元素，似乎和写html没什么区别，不过仔细一看，还有会有些不同：
- 首先就是第2行的双大括号包裹的部分`{{ msg }}`，这和我们之前写的html有点不一样，这是一种Vue的模板语法，叫[文本插值](https://vue3js.cn/docs/zh/guide/template-syntax.html#%E6%96%87%E6%9C%AC)，里面的msg是组件的变量，变量的值会被渲染到`<h1>`标签里面。

```html
<h1>{{ msg }}</h1>
```

- 第30行是一个`<button>`标签，我们很熟悉它是一个按钮，里面也有一个`文本插值`，绑定的是`count`变量，还有一个`@click`属性我们没见过，这是Vue[事件绑定](https://vue3js.cn/docs/zh/guide/events.html)的语法，绑定了button的点击事件。

```html
<button type="button" @click="count++">count is: {{ count }}</button>
```

### Vite 热更新 - template

我们尝试修改下`template`里面的内容，比如将最后一行的：

```
hot module replacement.
```

改成

```
hot module replacement(HMR).
```

看下页面会有什么变化。

![](/assets/getting-started-with-vue-5.gif)

从以上动图可以看出，修改完`template`中的内容，一保存文件，页面内容立马刷新，几乎没有任何延迟，页面也没有刷新，开发体验非常丝滑。

![](/assets/getting-started-with-vue-6.gif)

## 4 \<script\> 分析

这部分是全文的核心部分，内容较长，如果想直接看本章节的小结，可以点击直通车链接：
[4.9 小结](https://juejin.cn/post/6993676123385102373#heading-13)

模板部分我们已经有了一个初步的了解，再来看看脚本部分。

![](/assets/getting-started-with-vue-7.png)

### 4.1 导入Vue方法

脚本的第一行从`vue`导入了两个方法：
- [ref](https://vue3js.cn/docs/zh/api/refs-api.html#ref)：返回一个响应式且可变的ref对象；
- [defineComponent](https://vue3js.cn/docs/zh/api/global-api.html#definecomponent)：用来定义一个同步的Vue组件。

```js
import { ref, defineComponent } from 'vue'
```

这两个方法是高频方法，必须牢牢记住。

### 4.2 导出Vue组件

第39行导出了一个Vue组件。

```js
export default defineComponent({
  name: 'HelloWorld',
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  setup: () => {
    const count = ref(0)
    return { count }
  }
})
```

Vue组件通过`defineComponent`方法来定义，该方法的参数是一个对象，该对象有3个属性：
- name：一个字符串，代表组件的名字；
- [props](https://vue3js.cn/docs/zh/guide/component-props.html)：一个对象，代表组件的入参，也就是组件与外部进行交互的一个口子，外部使用组件时，可以通过`props`往组件内部传递数据；
- [setup](https://vue3js.cn/docs/zh/guide/composition-api-setup.html)：一个箭头函数，这是Vue3新推出的`Composite API`的入口，会在组件创建之前、props被解析之后执行。

### 4.3 组件入参

第42行定义了一个msg变量，之前我们在`template`中已经见过它，可是它的值是什么呢？

```
  props: {
    msg: {
      type: String,
      required: true
    }
  },
```

我们注意到msg是嵌套在props里面的，代表它是组件的一个入参，是组件与外部交互的API，那么它的值就应该是从外部传进来的。

从哪儿传进来的呢？使用组件是通过它的名字`name`来使用的，所以我们在源代码里面搜索组件的名字：`HelloWorld`，发现是在`App.vue`中使用的：

```html
<HelloWorld msg="Hello Vue 3 + TypeScript + Vite" />
```

### 4.4 使用Vue组件

使用一个组件和使用一个普通的html标签（比如div）几乎是一样的，唯一不同的是使用组件之前需要先导入并声明该组件。

使用组件的方式很简单，只需要3步：
- 导入组件
- 声明组件
- 使用组件

![](/assets/getting-started-with-vue-8.png)

### 4.5 Vite热更新 - script

我们尝试修改下这个msg的值（比如改成：`Hello everyone! I'm learning Vue 3 + TypeScript + Vite`），看下页面会有什么变化。

![](/assets/getting-started-with-vue-9.gif)

从以上动图可以看出，与修改`template`的效果一样，修改完msg的值，一保存文件，页面内容立马刷新，之前的：

```
Hello Vue 3 + TypeScript + Vite
```

立马变成了：

```
Hello everyone! I'm learning Vue 3 + TypeScript + Vite
```

几乎没有任何延迟，页面也没有刷新，开发体验非常丝滑。

![](/assets/getting-started-with-vue-10.gif)

### 4.6 响应式的ref对象

第48行定义了一个`count`变量：

```
  setup: () => {
    const count = ref(0)
    return { count }
  }
```

之前我们在`template`中也见过这个变量，它的值就是这里定义的`count`，我们注意到这个`count`的值是调用`ref`函数之后返回的，函数的参数是数字`0`。为什么要包一层ref，而不是直接将0赋值给count变量呢？

```js
const count = 0
```

直接赋值不是更简洁吗？

我们先来看下官网对ref的介绍：

```
接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property `.value`。
```

为了理解ref函数的作用，我们先尝试在页面里点击一下这个`count is: 0`的按钮。

![](/assets/getting-started-with-vue-11.png)

点击完发现里面的值立马变成：

```
count is: 1
```

这时我们将：

```js
const count = ref(0)
```

修改成：

```js
const count = 0
```

再次点击button按钮，发现值没有变。

我们大致能理解ref函数返回`响应式ref对象`的含义：

> 响应式的意思就是这个变量的值是动态的，某些动作（点击按钮）改变了它的值，模板里面的文本插值立马也会跟着变化，从而页面里面的内容也会跟着刷新。

如果count没有被ref函数包裹，那它就不是响应式的，点击按钮改变它的值之后，模板的内容不会跟着变化。

有一个需要注意的点：
> setup中定义的变量必须返回，才能在template中使用，否则插值不会被渲染，并且会在浏览器控制台警告提示这个变量没有在实例中定义。

![](/assets/getting-started-with-vue-12.png)

```
[Vue warn]: Property "count" was accessed during render but is not defined on instance.
```

### 4.7 TypeScript支持

前面提到`<script>`中的`lang="ts"`属性是用来支持TypeScript的，我们来试试看吧。

先定义一个type类型：

```js
type Size = 'sm' | 'md' | 'lg'
```

然后在setup方法中定义一个变量用来使用这个类型：

```js
const size = ref<Size>('md')

return { size } // 记得返回哦
```

最后在template通过文本插值使用该变量：

```html
<p>{{ size }}</p>
```

由于我们在`<script>`中加了`lang="ts"`，所以页面能正常显示`md`。

这时我们把`lang="ts"`去掉，保存文件并刷新页面，页面变成白页，并且浏览器控制台也报错：

```
Uncaught SyntaxError: unexpected token: identifier
```

前面定义的`Size`类型也出现了红色的波浪下划线。

![](/assets/getting-started-with-vue-13.png)

提示type类型声明必须在TypeScript文件中使用：

```
Type aliases can only be used in TypeScript files.
```

### 4.8 TypeScript类型错误高亮提示

这样似乎看不出TypeScript的优势，我们丰富下这个demo，来看看TypeScript的好处。

我们加一个`addSize`方法，用来增加尺寸：
```js
const addSize = () => {
  size.value = 'lg' // 给size变量赋值为Size类型中定义好的值是没问题的
}

return { addSize } // 记得返回哦
```

在`template`中使用该方法：
```html
<button type="button" @click="addSize">Add size</button>
```

如果将size赋值为Size类型定义的值，比如：`large`，[Vetur](https://vuejs.github.io/vetur/)类型检查马上就会提示，相应的赋值代码也会出现红色波浪下划线：

![](/assets/getting-started-with-vue-14.png)

这时我们能够立即警觉：
> 这里的代码可能写得有问题

💡提示：[Vetur](https://marketplace.visualstudio.com/items?itemName=octref.vetur)是一款VSCode插件，用来做`.vue`文件的语法高亮和TypeScript类型检查等。

非常感谢你能阅读到这里，还有最后5分钟就阅读完了，通过小结巩固下学到的知识，然后喝杯水放松下吧😋

### 4.9 小结

`<script>`部分基本就是这些，我们做一个简单的小结：
1. defineComponent方法用于定义Vue组件
2. Vue组件的名字通过name属性来定义，名字可以用来唯一区分一个组件
3. Vue组件通过props属性来与外界进行数据交互
4. setup方法是Vue3 Composite API的入口
5. 使用Vue组件和使用html元素差不多，只是需要先导入、声明组件才能使用
6. ref用于返回一个响应式对象
7. `lang="ts"`用来支持TypeScript

## 5 \<style\> 分析

最后再来看下`<style>`部分。

```vue
<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
```

看着和写CSS没什么区别，只是有一点不一样（前面也提到过），就是`<style>`标签中增加了一个`scoped`属性，这个属性用来定义局部样式，里面写的样式只针对当前组件生效。

### 5.1 局部样式

为了理解局部样式的含义，我们在其他组件中也写一个`<code>`标签，看下它的样式是不是和HelloWorld组件中的一样，HelloWorld组件中，code标签样式是这样的（有一个灰色的背景色）：

![](/assets/getting-started-with-vue-15.png)

```
code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
```

我们在App.vue中也写一个code标签：

```html
<code>Vue DevUI</code>
```

![](/assets/getting-started-with-vue-16.png)

发现在HelloWorld组件的style中写的样式并不会影响App组件中的code，这就是局部样式。

通过对比两者的html元素，发现HelloWorld组件中的元素都加上了一个`data-v-`开头的特殊属性，相应的css规则也加上了这个选择器。

![](/assets/getting-started-with-vue-17.png)

这一点和Angular中的`encapsulation`属性非常类似。

### 5.2 Vite 热更新 - style

除了`template`和`script`的热更新，Vite也支持`style`样式的热更新，一样的丝滑，就不再赘述。

## 6 小结

通过本文，我们使用Vite启动了一个初始的项目工程，并且对Vue组件有了一个初步的认识，现在做个简单的小结巩固下吧。

1. 先是搭建了一个Vue3+TypeScript+Vite的工程
2. 然后了解了一下Vue组件的整体结构（`.vue`文件，template+script+style）
3. 接着对template、script、style区块进行了单独的分析
4. template和html很类似，只是增加了一些Vue特有的`模板语法`，如`文本插值`、事件绑定等
5. script是定义组件逻辑的地方，可以通过`lang="ts"`支持TypeScript
6. `defineComponent`和`ref`是Vue提供的两个非常常用的方法，defineComponent用来定义Vue组件，ref用来生成一个响应式的ref对象
7. defineComponent方法的参数是一个对象，其中的`name`属性用来定义Vue组件的名字，使用组件时通过名字引用
8. 使用Vue组件和使用html标签很类似，只是需要先导入和声明组件
9. `props`属性用来定义组件与外部交互的API，是组件设计的关键
10. `setup`方法是Vue3 `Composite API`的入口，它会在组件生成之前、props解析之后执行
11. style用来编写组件的样式，可以通过`scoped`支持只对当前组件生效的局部样式

参考：

[Vue3 中文文档](https://cn.vuejs.org/)

<EditInfo time="2021年08月07日 21:19" title="阅读 4177 ·  点赞 51 ·  评论 7 ·  收藏 38" />
