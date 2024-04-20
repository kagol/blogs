# z-index 失效原因分析：由一个 bug 引发的对层叠上下文和 z-index 属性的深度思考

新年刚开工就被一个 bug 虐得整个人都不好了，特地记录下。

## 1 bug描述

在一个 fixed-data-table(一个 React 组件)制作的表格中，需要给表头的字段提示的特效，所以做了一个提示层，但是这个提示层被固定的表格列遮住了，并且无论设置该层的 z-index 为多大都不能让其在固定列之上，效果如下：

![](/assets/thinking-z-index-1.png)

## 2 原因分析

通过对页面的 html 元素层级进行分析，把有可能影响层级的部分抽出来：

![](/assets/thinking-z-index-2.png)

主要有这四部分会影响到元素的层级（关于设置了哪些属性会影响层级请看后面的附录），下面逐一分析：

- A元素和B元素都有一个样式是 `position:absolute;`，因此有可能影响到层级（其实不会影响，因为没有设置 z-index）
- D元素有以下样式可能会影响到层级：`position: absolute; z-index: 0; transform: translate3d(0px, 0px, 0px)`;
- C元素有以下样式可能会影响到层级： `opacity: 1; transform: translate(-50%, 0); z-index: 99999999; position: absolute;`
- A、B最近的会创建层叠上下文的父元素F有这些样式：`z-index: 1; transform: translate3d(0px, 0px, 0px); position: absolute;`（其实不会，因为子元素创建的所有层叠上下文只在父元素的层叠上下文中有效）
- A元素的直接子元素E的样式：`position: absolute; width: 140px; z-index: 2; transform: translate3d(0px, 0px, 0px);`
- A和B是处于同一个层叠上下文（由其E创建的）中的，这样的话，应该是后面的元素（B）会覆盖前面的元素（A），但现在并不是这样。

原因：A最近的子元素F创建的层叠上下文（z-index:2）比B最近的子元素C（z-index:0）创建的层叠上下文高。

结论：这就导致了B的所有子元素（当然也包括我们的提示层C）都会比A的层级低，所以D的z-index设置为多大都没用。

## 3 问题抽象

本来是一个应用场景中的问题，我们可以抽象为以下问题：
- 两个兄弟元素A和B，A的直接子元素E，其层级是2（`position: absolute;z-index:2;transform: translate3d(0px, 0px, 0px);`）
- B的直接子元素D，其层级是0（`position: absolute;z-index:0;transform: translate3d(0px, 0px, 0px);`）
- D下面还有一个子元素C，层级很大（`z-index:9999`），并且 transform 属性不能改，也不能去掉

怎么实现C在A的上面（层级上的上面），B在A的下面？

HTML 结构大概这样：

```html
<div class="div-a">A is here
    <div class="div-e">E is here</div>
</div>
<div class="div-b">B is here
    <div class="div-d">D is here
        <div class="div-c">C is here</div>
    </div>
</div>
```

## 4 建立 Demo

以下是问题定位过程中建立的几个Demo（其中最后一个是最合理的Demo，想直接看结论的可直接看最后一个Demo）：

[z-index失效原因探索Demo1](http://codepen.io/kagol/pen/VPGxWP)

[z-index失效原因探索Demo2](http://codepen.io/kagol/pen/JEavyX)

[z-index失效原因探索Demo3](http://codepen.io/kagol/pen/VPGbGq)

[最合理的Demo](http://codepen.io/kagol/pen/qRQajW)

## 5 解决方案

单纯从抽象出来的问题来看，解决的方案是D不要设置任何会创建层叠上下文的属性，并且让C的层级比E的高，这样的话，E自然会遮住B和D，而C又会遮住E，这就是我们要的效果。

不过在实际的项目环境中，D的transform属性一定会有（且其值会随表格的水平滚动条的拖动而改变），没法改变，所以在我看来这个问题似乎是无解的。

最后感谢我们前端组的同事 water 大神提供的三个解决方案：

- 让提示层往下移一点
- 把提示层改成浏览器默认的title
- 将提示层C放在D的外层，并控制其所在的位置

我采用了其中的第一种，因为这种方案体验还不错，并且实现起来比较简单。第二种方案体验不太好，title属性的提示效果有点延迟，第三种方案实现成本太大了。

最终的效果是这样的：

![](/assets/thinking-z-index-3.png)

## 6 经验总结

这个问题本身是很简单的，之所以花了折腾了这么久，最主要的原因是之前没有深入去思考过z-index属性和层叠上下文（stacking context），只是把问题解决了，而没有深入去思考为什么这么做可以？背后的原理是什么？有没有别的或者更好的方法？

现在这个问题也是一样，如果只是把提示层移下来了事，就不管这个问题了，也就不会深入去思考层叠上下文和z-index的相关知识和原理，这样永远无法真正的进步，无法成为领域的专家，永远只是大厦的建造者，而不是大厦的设计者。

从这个bug的修复过程中，我学到（领悟到）了以下三点：

1. 关于z-index和层叠上下文原理相关的专业知识

- 层叠上下文（stacking context）并不只是z-index（必须配合position才能生效）才能创建，还有很多其他元素（如：opacity、transform等）也可以创建层叠上下文，不信点[这里](http://codepen.io/kagol/pen/qRLxEd)
- 在存在层叠上下文的情况下，z-index的大小决定了层叠水平（stacking level），即谁在谁上面，这是“谁大谁上”原则，不信点[这里](http://codepen.io/kagol/pen/OWrQXz)
- 层叠水平的比较只有在同一级别的DOM节点的层叠上下文中才有意义，就比如上面例子中的D和E比较是有意义的，但是C和E比较就没有意义了，因为如果D的层级比E小的话，C层级再大也没用，也不会在E之上，不信看[这里](http://codepen.io/kagol/pen/wgRypx)
- 在同一DOM节点，并且层级水平一样的情况下，在HTML文档中写在后面的元素会遮住前面的元素（后者会在前者上面），这是“后来居上”原则，不信点[这里](http://codepen.io/kagol/pen/jyXYjK)

2. 深入探索的精神

遇到问题，多思考：

- 问题是如何出现的？
- 为什么会出现？
- 涉及到哪一块的知识？
- 背后的原理是什么？

然后才是着手去解决，先想方设法自己寻找解决方案；

解决了回顾下这个问题，对这个问题进行抽象，看下有没有更好的解决方案；

并参考别人是如何解决这类问题的，别人的方法有什么优劣，并学习别人的闪光点，用微创新的方式，试着对现有的解决方案进行改良、优化、重构。

3. 解决问题的方法论

遇到问题，先分析是什么问题（如何分析？需要扎实的基础和丰富的实践经验），并根据自己的猜测去实验试错；

自己解决不了，再自行 Google / Baidu，并继续实验试错；

还是解决不了，问导师、同事、朋友、网友（论坛、QQ群等）提供解决的思路（如何提问？点[这里](http://blog.jobbole.com/28784/)）。

## 附录：会改变层叠上下文的情况

![](/assets/thinking-z-index-4.png)

翻译过来就是：

- 根元素`<html>`
- position(值为"absolute"或"relative") + `z-index`(不为"auto")
- flex item (即父元素有"display:flex|inline-flex"属性的元素) + `z-index`(不为"auto")
- opacity 小于1的元素
- transform 不为"none"的元素
- mix-blend-mode 不为"normal"的元素
- filter 不为"none"的元素
- perspective 不为"none"的元素
- `isolation:isolate` 的元素
- `position:fixed` 的元素
- 在 `will-change` 中指定了任意 CSS 属性，即便你没有直接指定这些属性的值
- `-webkit-overflow-scrolling:touch` 的元素

<EditInfo time="2017-02-07 15:23" title="阅读(1759)  评论(0)" />
