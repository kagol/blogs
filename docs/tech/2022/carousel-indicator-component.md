# CarouseIndicator 组件应用：0行JS代码实现好看的手风琴式折叠卡片效果

前两天写了一篇[前端积木理论](https://juejin.cn/post/7047503485054484516)的实战文章，以[DevUI](https://devui.design/)组件库的`Carousel`走马灯组件为例，详细地阐述了如何将`积木理论`运用到组件开发中，里面提到`抽象`和`分层`的思想，通过`抽象`的思想将Carousel组件最核心的交互抽象成`usePage`这个`Composable`，通过`分层`的思想将Carousel组件划分成`CarouselIndicator`/`CarouselPagination`两个子组件。

## 为什么CarouselIndicator组件要单独定义v-model呢？

当提到`CarouselIndicator`的具体实现原理时，[贪财庸俗之人](https://juejin.cn/user/641770523472567)同学提了一个问题：

> 为什么CarouselIndicator组件不直接用Carousel组件的pageIndex，而是自己定义一个v-model双向绑定？

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8ad6c205ca349338a9ab7326ce97aff~tplv-k3u1fbpfcp-watermark.image?)

这个问题我觉得问得非常好！

说明这位同学确实认真看了这篇文章，并且有自己的思考，我当时回复得很简单：

> 为了避免CarouselIndicator与Carousel组件产生耦合。

下午吃完晚饭一边散步一边刷掘金的时候，突然刷到[battleKing](https://juejin.cn/user/3677241439685368)同学去年8月份写的一篇文章：

[手风琴式折叠卡片展示效果](https://juejin.cn/post/6991752974896726052)

[battleKing](https://juejin.cn/user/3677241439685368)同学的文章写得非常不错，代码清晰易懂，点赞！

我想了下，这不就是一个`CarouselIndicator`吗？

所以为了更清楚地解释[贪财庸俗之人](https://juejin.cn/user/641770523472567)小伙伴提出的那个问题：

> 为什么CarouselIndicator组件不直接用Carousel组件的pageIndex，而是自己定义一个v-model双向绑定？

我打算用`CarouselIndicator`组件实现一下`手风琴式折叠卡片`的效果。

## 单独使用`CarouselIndicator`组件实现`手风琴式折叠卡片`效果

由于`CarouselIndicator`组件其实是一个独立的组件，并不与Carousel组件有任何耦合，因此可以单独使用。

还是在`App.vue`文件中

```
// 引入DCarouselIndicator组件和usePage
<script setup lang="ts">
import { DCarouselIndicator, usePage } from './components/carousel'
const { pageIndex, setPageIndex } = usePage(1)
</script>

<template>
<DCarouselIndicator>
  // 中间的dom元素直接从battleKing同学的文章中拷贝即可
  // 《手风琴式折叠卡片展示效果》：https://juejin.cn/user/3677241439685368
  <div class="box">
    <div :class="['panel', pageIndex === 1 ? 'active' : '']" @click="setPageIndex(1)">
      <h3>Explore The World</h3>
    </div>
    <div :class="['panel', pageIndex === 2 ? 'active' : '']" @click="setPageIndex(2)">
      <h3>Wild Forest</h3>
    </div>
    <div :class="['panel', pageIndex === 3 ? 'active' : '']" @click="setPageIndex(3)">
      <h3>Sunny Beach</h3>
    </div>
    <div :class="['panel', pageIndex === 4 ? 'active' : '']" @click="setPageIndex(4)">
      <h3>City on Winter</h3>
    </div>
    <div :class="['panel', pageIndex === 5 ? 'active' : '']" @click="setPageIndex(5)">
      <h3>Mountains - Clouds</h3>
    </div>
  </div>
</DCarouselIndicator>
</template>

<style>
// 样式也直接从battleKing同学的文章中直接拷贝，啥也不用改
.box {
  display: flex;
  width: 90vw;
}

.panel {
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  height: 40vh;
  border-radius: 50px;
  color: #fff;
  cursor: pointer;
  flex: 0.5;
  margin: 10px;
  position: relative;
  -webkit-transition: all 700ms ease-in;
  transition: all 700ms ease-in;
}
.panel:nth-child(1){
  background-image: url("https://picsum.photos/1350/900?random=1");
}
.panel:nth-child(2){
  background-image: url("https://picsum.photos/1350/900?random=2");
}
.panel:nth-child(3){
  background-image: url("https://picsum.photos/1350/900?random=3");
}
.panel:nth-child(4){
  background-image: url("https://picsum.photos/1350/900?random=4");
}
.panel:nth-child(5){
  background-image: url("https://picsum.photos/1350/900?random=5");
}

.panel h3 {
  font-size: 24px;
  position: absolute;
  bottom: 20px;
  left: 20px;
  margin: 0;
  opacity: 0;
}

.panel.active {
  flex: 5;
}

.panel.active h3 {
  opacity: 1;
  transition: opacity 0.3s ease-in 0.4s;
}
</style>
```

## 手风琴式折叠卡片实现效果

最终效果如下：

![2022-01-11 22.35.37.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e97ea67fa4d4edaaafcd7822fad8f94~tplv-k3u1fbpfcp-watermark.image?)

是不是非常简单，几乎不用写什么逻辑代码，就实现了手风琴式折叠卡片的效果，希望[贪财庸俗之人](https://juejin.cn/user/641770523472567)同学能理解为什么`CarouselIndicator`要和`Carousel`解耦。

积木理论最核心的思想就是：

> 让每一个组件都像积木一样可以随意拼接和组合使用，组件之间是独立和内聚的，不与其他组件有任何耦合。

这样我们开发前端页面，就像搭积木一样简单，只需要把组件拼起来就可以啦。

觉得有用就给我点个赞吧，你的点赞是对我最大的鼓励，后续我也会持续输出更多[DevUI](https://github.com/DevCloudFE/vue-devui)组件设计干货文章，尽情期待！

## 优化思路

目前的做法在写法上不够简洁，引入了`usePage`，其实这部分逻辑可以放在`CarouselIndicator`组件里面，使用起来大致是这样：

```vue
<DCarouselIndicator>
  <div class="panel">
    <h3>Explore The World</h3>
  </div>
  <div class="panel">
    <h3>Wild Forest</h3>
  </div>
  <div class="panel">
    <h3>Sunny Beach</h3>
  </div>
  <div class="panel">
    <h3>City on Winter</h3>
  </div>
  <div class="panel">
    <h3>Mountains - Clouds</h3>
  </div>
</DCarouselIndicator>
```

<EditInfo time="2022年01月12日 08:30" title="阅读 2673 ·  点赞 13 ·  评论 8 ·  收藏 3" />
