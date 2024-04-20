# 用积木理论设计的 Carousel 组件都有哪些有趣的玩法？

![](/assets/carousel-component-0.png)

之前给大家介绍了[DevUI](https://devui.design/)组件设计的基本思想，并以`Carousel`走马灯组件为例，给大家分享如何将积木理论的思想运用到组件设计上。

这个组件是[Vue DevUI](https://github.com/DevCloudFE/vue-devui)组件库中`Carousel`组件的简化版，虽然很简单，只有300行代码，但是非常灵活，可以基于该组件拼出形形色色的走马灯组件来。

我把它发布到npm仓库中啦，欢迎大家体验！

[https://www.npmjs.com/package/vue-devui-carousel](https://www.npmjs.com/package/vue-devui-carousel)

效果预览地址：

[https://kagol.gitee.io/vue-carousel/](https://kagol.gitee.io/vue-carousel/)

推荐阅读：

[前端开发的积木理论——像搭积木一样做前端开发](https://juejin.cn/post/7047503485054484516)

[用积木理论设计一个灵活好用的Carousel走马灯组件](https://juejin.cn/post/7051370356585529357)

[通过一个手风琴式折叠卡片的例子解释：为什么DCarouseIndicator不直接用DCarousel上的pageIndex？](https://juejin.cn/post/7052107147496128549)

## 1 快速开始

有两种方式使用`vue-devui-carousel`组件：
- 直接在html页面中引入使用
- 在vite等脚手架工程中安装使用

### 1.1 直接在html页面中使用

创建一个`index.html`：

```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <script src="https://unpkg.com/vue@next"></script>
  <script src="https://unpkg.com/vue-devui-carousel"></script>
  <link rel="stylesheet" href="https://unpkg.com/vue-devui-carousel/dist/style.css">
  <style>
    .carousel-item {
      text-align: center;
      line-height: 200px;
      background: #f3f6f8;
    }
  </style>
  <title>Vue DevUI Carousel</title>
</head>
<body>
  <div id="app"></div>
  <script>
    Vue.createApp({
      template: `
        <DCarousel>
          <div class="carousel-item">page 1</div>
          <div class="carousel-item">page 2</div>
          <div class="carousel-item">page 3</div>
        </DCarousel>
      `
    })
    .use(VueCarousel.default)
    .mount('#app')
  </script>
</body>
</html>
```

然后直接用浏览器打开就可以看到效果啦！

![](/assets/carousel-component-1.png)

`vue-devui-carousel`组件的基本用法是直接在`DCarousel`标签里面添加需要轮播的元素即可：

```html
<DCarousel>
  <div class="carousel-item">page 1</div>
  <div class="carousel-item">page 2</div>
  <div class="carousel-item">page 3</div>
</DCarousel>
```

也可以添加图片，一个[掘金活动](https://juejin.cn/events)页面的效果就出来了：

```html
<DCarousel style="width: 470px; height: 280px;">
  <img height="280" src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a4dda7abf534e098f04fe0e968b1e0c~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:940:560.awebp?" />
  <img height="280" src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e5b0b404fcb44ac9fb1359334186b46~tplv-k3u1fbpfcp-zoom-mark-crop-v2:0:0:940:560.awebp?" />
</DCarousel>
```

![](/assets/carousel-component-2.png)

### 1.2 在vite工程中使用

一般我们做项目都会创建一个vite工程，然后在里面搭积木、做页面、写业务逻辑，我们来看下在vite工程中如何使用`vue-devui-carousel`组件。

先创建一个vite工程：

```shell
yarn create vite vite-demo --template vue-ts
```

然后安装`Carousel`：
```shell
yarn add vue-devui-carousel
```

在`main.ts`中引入`Carousel`：
```ts
import Carousel from 'vue-devui-carousel'
import 'vue-devui-carousel/dist/style.css'

createApp(App)
.use(Carousel)
.mount('#app')
```

在`App.vue`中使用：

```html
<DCarousel>
  <div class="carousel-item">page 1</div>
  <div class="carousel-item">page 2</div>
  <div class="carousel-item">page 3</div>
</DCarousel>
```

效果和直接在html中使用是一样

![](/assets/carousel-component-3.png)

## 2 Carousel组成部分概览

`Carousel`向外暴露了4个组件1个Composable：
1. `DCarousel`轮播组件
2. `DCarouselIndicator`指示器子组件
3. `DCarouselPrev`上一页子组件
4. `DCarouselNext`下一页子组件
5. `usePage`分页Composable

`DCarousel`是主轮播组件，其他几个可以和`DCarousel`组合使用，也可以单独使用，不与`DCarousel`耦合。

前面我们就单独使用`DCarouselIndicator`组件实现了一个手风琴式折叠卡片的效果：

[单独使用DCarouseIndicator子组件实现手风琴式折叠卡片效果](https://juejin.cn/post/7052107147496128549)

## 3 DCarousel：主轮播组件

这是主组件，支持少量定制，不需要太多定制的业务直接使用这个组件就可以啦。

### 3.1 API

这个组件的API非常简单，只有3个props：
1. `v-model`：双向绑定当前页码，`Number`类型，默认显示第一页
2. `autoplay`：是否自动播放，默认值为`true`
3. `interval`：自动播放的间隔时间，单位为毫秒，默认值为`3000`

支持3种插槽：
1. `default`：轮播内容
2. `indicator`：自定义指示器
3. `pagination`：自定义分页器

### 3.2 玩法

#### 3.2.1 玩法1: 使用`v-model`实现自定义初始页码

默认情况下（什么属性都不设置），初始页码是第一页，使用`v-model`可以改变初始页码。

```
const pageIndex = ref(2)

<DCarousel v-model="pageIndex">
  <div class="carousel-item">page 1</div>
  <div class="carousel-item">page 2</div>
  <div class="carousel-item">page 3</div>
</DCarousel>
```

#### 3.2.2 玩法2: 使用`v-model`实现跳转到任意页码

默认情况下`DCarousel`组件有上一页、下一页的按钮以及底部的指示器，可以用于切换轮播图。

如果我们不想点组件内部的这些元素，有没有办法切换轮播图呢？

答案就是使用`v-model`，比如我们想切换到上一张轮播图，直接设置`v-model`绑定的`pageIndex`即可：

```
<button @click="pageIndex = pageIndex - 1">上一张</button>
```

下一张、第一张等也可以通过同样的方式实现：

```
const pageIndex = ref(2)

<button @click="pageIndex = pageIndex - 1">上一张</button>
<button @click="pageIndex = pageIndex + 1">下一张</button>
<button @click="pageIndex = 1">第一张</button>

<DCarousel v-model="pageIndex">
  <div class="carousel-item">page 1</div>
  <div class="carousel-item">page 2</div>
  <div class="carousel-item">page 3</div>
</DCarousel>
```

#### 3.2.3 玩法3: 使用`autoplay`取消自动轮播

默认情况下，DCarousel组件会每隔3秒自动切换到下一章轮播图，这是轮播图的基本特性。

不过也有用户不想要自动轮播，这是可以通过设置`autoplay`为`false`取消。

```
<DCarousel :autoplay="false">
  <div class="carousel-item">page 1</div>
  <div class="carousel-item">page 2</div>
  <div class="carousel-item">page 3</div>
</DCarousel>
```

#### 3.2.4 玩法4: 使用`interval`设置自动轮播的间隔时间

除了取消自动轮播，还可以通过`interval`设置自动轮播的间隔时间（单位是ms），默认是3000ms，我们觉得太慢了，想轮播得快一些，比如1s自动轮播一次。

```
<DCarousel :interval="1000">
  <div class="carousel-item">page 1</div>
  <div class="carousel-item">page 2</div>
  <div class="carousel-item">page 3</div>
</DCarousel>
```

#### 3.2.5 玩法5: 使用默认插槽`default`实现QQ音乐官网首页轮播图效果

DCarousel组件一共有3个插槽：
- `default`：默认插槽
- `indicator`：指示器插槽
- `pagination`：分页器插槽

默认插槽用于设置需要轮播的内容，可以轮播任何内容，比如放上歌曲封面和信息就是QQ音乐的效果。

```vue
<script setup lang="ts">
import { DCarousel } from 'vue-devui-carousel'
</script>

<template>
<div>
  <DCarousel>
    <!-- 以下 html 片段拷贝自QQ音乐官网 -->
    <div class="mod_playlist">
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/7759293603"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/ibO7y1R5gAqKsKKDaUxchyzkEBvN9tMHxMGhxaDsveRImUCyTiboVWrQ/300?n=1" alt="旋律说唱:一起感受粉色恋爱泡泡" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/7759293603">旋律说唱:一起感受粉色恋爱泡泡</a></span></h4><div class="playlist__other">播放量：297.2万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/7871303692"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/bp55dcibXqUjaQjwt6gP1iaibEdjVJvp7vNbVQMjepC2ZTDNx1M3MkLnw/300?n=1" alt="鬼畜打败恐惧｜整点阳间的东西" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/7871303692">鬼畜打败恐惧｜整点阳间的东西</a></span></h4><div class="playlist__other">播放量：140.7万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/8249092627"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/BibN36PYLliczibicnsXMuTzLUZaErDuDop6moxSnrfAuWnAKrqDUnibMlQ/300?n=1" alt="上班族必备:枯燥无味听点歌解闷" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/8249092627">上班族必备:枯燥无味听点歌解闷</a></span></h4><div class="playlist__other">播放量：685.5万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/8175037786"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/W43yJLl09jro4gLJXBxMR1PKp3oH0yfqaWZsCjgJEFCxCAMhx5XdGA/300?n=1" alt="追星名场面 | 一人一首偶像曲" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/8175037786">追星名场面 | 一人一首偶像曲</a></span></h4><div class="playlist__other">播放量：35.2万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/7845656497"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/tzTIee65HohmgERhaae4MdXH1NnSAicACibx3A81TpOj14Qheibiajcic0O13hk2qnCd3/300?n=1" alt="『甜度100%』我瞒着所有人在想你" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/7845656497">『甜度100%』我瞒着所有人在想你</a></span></h4><div class="playlist__other">播放量：136.3万</div></div>
      </div>
    </div>
    <div class="mod_playlist">
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/7683199209"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/Eoo44uQyI5ubcwbQbs6E0V8261fic2HA7jsGO6p5oAcsUJ5KxOdU84w/300?n=1" alt="伤感片段丨不过是南柯一梦" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/7683199209">伤感片段丨不过是南柯一梦</a></span></h4><div class="playlist__other">播放量：4921.6万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/1169459292"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/Ej7F4g676QjYgica7iamaB8vD7Dp1Bgiaicia2V0jNunmKNT5uSFLaZ6r2w/300?n=1" alt="「90后」承载着青春回忆的歌谣" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/1169459292">「90后」承载着青春回忆的歌谣</a></span></h4><div class="playlist__other">播放量：9941.1万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/7382629476"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/Z89aLA93LOSOicz0QOnMboqgLaiaFohjweglHh6JSoL8hrjOfFOC6DXw/300?n=1" alt="精选 | 好听到单曲循环的热歌" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/7382629476">精选 | 好听到单曲循环的热歌</a></span></h4><div class="playlist__other">播放量：14.4亿</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/4276472710"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/ic88Gx52icY2Txiaiao5n2tlPibPEGUKydonCia8mKhpetTbZnjHhBtMBkbA/300?n=1" alt="欧美节奏控 | 触碰你的听觉神经" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/4276472710">欧美节奏控 | 触碰你的听觉神经</a></span></h4><div class="playlist__other">播放量：236.9万</div></div>
      </div>
      <div class="playlist__item">
        <div class="playlist__item_box"><div class="playlist__cover mod_cover"><a href="/n/ryqq/playlist/8037914794"><img class="playlist__pic" loading="lazy" src="//qpic.y.qq.com/music_cover/t3ZMFYNfykL5iaia5MjecOXibibjic2UzATaTkHnCvb5zQNQgicf1w4j0yeQ/300?n=1" alt="粉墨登场~坠入人间的星屑少女" data-qar-def="//y.qq.com/mediastyle/global/img/playlist_300.png?max_age=2592000"><i class="mod_cover__mask"></i><i class="mod_cover__icon_play"></i></a></div><h4 class="playlist__title"><span class="playlist__title_txt"><a href="/n/ryqq/playlist/8037914794">粉墨登场~坠入人间的星屑少女</a></span></h4><div class="playlist__other">播放量：762.9万</div></div>
      </div>
    </div>
  </DCarousel>
</div>
</template>

<style>
/* 以下 css 样式片段拷贝自QQ音乐官网 */
.playlist__item {
    position: relative;
    padding-bottom: 0;
    display: inline-block;
    width: 224px;
    padding-bottom: 44px;
    overflow: hidden;
    font-size: 14px;
    vertical-align: top;
}

a:hover {
    color: #31c27c;
}
a, a:hover {
    text-decoration: none;
}
a {
    color: #000;
    cursor: pointer;
}

.playlist__item_box {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
}

.playlist__item_box {
    position: relative;
    margin-right: 20px;
}

.playlist__item:nth-child(5) .playlist__item_box {
    margin-right: 0;
}

.playlist__cover {
    position: relative;
    display: block;
    overflow: hidden;
    padding-top: 100%;
    margin-bottom: 15px;
}

.playlist__pic {
    height: 100%;
    -o-object-fit: cover;
    object-fit: cover;
}

.playlist__pic {
    transform: scale(1) translateZ(0);
    transition: transform .75s;
}

.playlist__pic {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    -webkit-transform: scale(1) translateZ(0);
    -webkit-transition: -webkit-transform .75s;
}

.playlist__cover:hover .playlist__pic {
    transform: scale(1.07) translateZ(0);
    transition: transform .75s cubic-bezier(0,1,.75,1);
}

.playlist__title_txt {
    white-space: normal;
}

.playlist__title {
    overflow: hidden;
    margin: 0;
    padding: 0;
}

.playlist__title_txt {
    float: left;
    max-width: 100%;
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 22px;
    max-height: 44px;
}

.playlist__author, .playlist__author a, .playlist__other {
    color: #999;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    height: 22px;
    font-size: 14px;
}
</style>
```

![](/assets/carousel-component-4.gif)

QQ音乐官网效果：

![](/assets/carousel-component-5.png)

`default`默认插槽中如果放上图书信息，就能很方便地实现豆瓣图书资讯的轮播效果。

![](/assets/carousel-component-6.png)

## 4 DCarouselIndicator：指示器子组件

### 4.1 API

`DCarouselIndicator`组件的API非常简单，只有2个属性1个插槽：
- `v-model`：双向绑定当前页码
- `count`：指示器中小圆点的数量
- `default`：默认插槽，用于自定义指示器

### 4.2 玩法

#### 4.2.1 玩法1: DCarouselIndicator的默认效果

`DCarouselIndicator`组件可以单独使用，不依赖`DCarousel`，如果什么都不配置，默认效果是一个高亮的点。

```html
<DCarouselIndicator></DCarouselIndicator>
```

![](/assets/carousel-component-7.png)

这似乎没什么用。

#### 4.2.2 玩法2: 使用`count`属性渲染指定数量的指示器圆点

可以使用`count`属性渲染多个点。

```html
<DCarouselIndicator :count="3"></DCarouselIndicator>
```

![](/assets/carousel-component-8.gif)

看着还是没什么用。

#### 4.2.3 玩法3: 使用`v-model`指定初始高亮的小圆点，并动态改变高亮小圆点

和`DCarousel`组件类似，`DCarouselIndicator`也有`v-model`属性，可以设置初始值，可以动态改变高亮点。

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { DCarouselIndicator } from 'vue-devui-carousel'

const pageIndex = ref(2)
</script>

<template>
<div>
  <button @click="pageIndex = pageIndex - 1">上一张</button>
  <button @click="pageIndex = pageIndex + 1">下一张</button>
  <button @click="pageIndex = 1">第一张</button>
  <DCarouselIndicator :count="3" v-model="pageIndex"></DCarouselIndicator>
</div>
</template>
```

![](/assets/carousel-component-9.gif)

单独使用`DCarouselIndicator`组件似乎没有什么用，其实不是的，仅仅是单独使用`DCarouselIndicator`有时也能实现非常炫酷和实用的效果，比如实现一个手风琴式折叠卡片。

![](/assets/carousel-component-10.gif)

#### 4.2.4 玩法4: 使用`default`默认插槽实现手风琴式折叠卡片效果

这个效果是我在[battleKing](https://juejin.cn/user/3677241439685368 "https://juejin.cn/user/3677241439685368")同学去年8月份写的一篇文章中看到的。

[手风琴式折叠卡片展示效果](https://juejin.cn/post/6991752974896726052 "https://juejin.cn/post/6991752974896726052")

初看起来这个效果和`DCarouselIndicator`组件没关系，不过仔细思考下就会发现：

> 这其实就是一个美化版的`DCarouselIndicator`组件。

而且用`DCarouselIndicator`实现不需要写任何JS代码：

```vue
<script setup lang="ts">
import { DCarouselIndicator } from 'vue-devui-carousel'
</script>

<template>
<div>
  <DCarouselIndicator>
    <template #default="page">
    <!-- 以下 html 片段拷贝自 battleKing 同学的掘金文章：https://juejin.cn/post/6991752974896726052 -->
    <div class="box">
      <div :class="['panel', page.pageIndex === 1 ? 'active' : '']" @click="page.setPageIndex(1)">
        <h3>Explore The World</h3>
      </div>
      <div :class="['panel', page.pageIndex === 2 ? 'active' : '']" @click="page.setPageIndex(2)">
        <h3>Wild Forest</h3>
      </div>
      <div :class="['panel', page.pageIndex === 3 ? 'active' : '']" @click="page.setPageIndex(3)">
        <h3>Sunny Beach</h3>
      </div>
      <div :class="['panel', page.pageIndex === 4 ? 'active' : '']" @click="page.setPageIndex(4)">
        <h3>City on Winter</h3>
      </div>
      <div :class="['panel', page.pageIndex === 5 ? 'active' : '']" @click="page.setPageIndex(5)">
        <h3>Mountains - Clouds</h3>
      </div>
    </div>
    </template>
  </DCarouselIndicator>
</div>
</template>

<style>
/* 以下 html 片段拷贝自 battleKing 同学的掘金文章：https://juejin.cn/post/6991752974896726052 */
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

效果如下：

![](/assets/carousel-component-11.gif)

## 综合案例：实现B站首页轮播图效果

除了单独使用，`DCarouselIndicator`还可以配合`DCarousel`使用，其实`DCarousel`的内置指示器就是使用`DCarouselIndicator`来实现的。

`DCarousel`默认的指示器是在底部居中位置的，如果我想把它放在左边，类似B站首页轮播图的效果。

![](/assets/carousel-component-12.png)

```vue
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import { DCarousel, DCarouselIndicator } from 'vue-devui-carousel'
</script>

<template>
<DCarousel class="carousel-demo-bilibili">
  <div>
    <div class="carousel-demo-item-bilibili">
      <img src = 'https://s3.bmp.ovh/imgs/2022/01/40f0a4406ac09295.png' />
      <div class="carousel-mask" style="background-color: rgb(22, 29, 38);"></div>
      <div class="carousel-tool not-gray" data-gray="74" style="color:white;">
        <a href="https://www.bilibili.com/blackboard/activity-gamereview2021.html" rel="noopener" target="_blank" data-target-url="https://www.bilibili.com/blackboard/activity-gamereview2021.html"><span>谁是游戏区播放TOP1？</span></a></div>
    </div>
  </div>
  <div>
    <div class="carousel-demo-item-bilibili">
      <img src = 'https://s3.bmp.ovh/imgs/2022/01/5d3503df424141a1.jpg' />
      <div class="carousel-mask" style="background-color: rgb(83, 73, 57);"></div>
      <div class="carousel-tool not-gray" data-gray="74" style="color:white;"><a href="https://www.bilibili.com/blackboard/activity-gamereview2021.html" rel="noopener" target="_blank" data-target-url="https://www.bilibili.com/blackboard/activity-gamereview2021.html"><span>谁能拒绝可爱小狗呢？</span></a></div>
    </div>
  </div>
  <div>
    <div class="carousel-demo-item-bilibili">
      <img src = 'https://s3.bmp.ovh/imgs/2022/01/5ed9080ff718b46b.jpg' />
      <div class="carousel-mask" style="background-color: rgb(40, 36, 55);"></div>
      <div class="carousel-tool not-gray" data-gray="74" style="color:white;">
        <a href="https://www.bilibili.com/blackboard/activity-gamereview2021.html" rel="noopener" target="_blank" data-target-url="https://www.bilibili.com/blackboard/activity-gamereview2021.html"><span>守护解放西3热血归来！正义之魂，燃起来了！</span></a></div>
    </div>
  </div>
  <div>
    <div class="carousel-demo-item-bilibili">
      <img src = 'https://s3.bmp.ovh/imgs/2022/01/1e952454566546f3.png' />
      <div class="carousel-mask" style="background-color: rgb(61, 66, 63);"></div>
      <div class="carousel-tool not-gray" data-gray="74" style="color:white;">
        <a href="https://www.bilibili.com/blackboard/activity-gamereview2021.html" rel="noopener" target="_blank" data-target-url="https://www.bilibili.com/blackboard/activity-gamereview2021.html"><span>必听！TVB经典26首金曲回忆杀</span></a></div>
    </div>
  </div>
  <div>
    <div class="carousel-demo-item-bilibili">
      <img src = 'https://s3.bmp.ovh/imgs/2022/01/17420d5be0805551.png' />
      <div class="carousel-mask" style="background-color: rgb(77, 79, 74);"></div>
      <div class="carousel-tool not-gray" data-gray="77" style="color:white;"><a href="https://www.bilibili.com/blackboard/activity-gamereview2021.html" rel="noopener" target="_blank" data-target-url="https://www.bilibili.com/blackboard/activity-gamereview2021.html"><span>原神2.4：云堇唱给你听</span></a></div>
    </div>
  </div>
  <div>
    <div class="carousel-demo-item-bilibili">
      <img src = 'https://s3.bmp.ovh/imgs/2022/01/721ba44e91795ffb.png' />
      <div class="carousel-mask" style="background-color: rgb(213, 89, 57);"></div>
      <div class="carousel-tool not-gray" data-gray="122" style="color:white;"><a href="https://www.bilibili.com/blackboard/activity-gamereview2021.html" rel="noopener" target="_blank" data-target-url="https://www.bilibili.com/blackboard/activity-gamereview2021.html"><span>用视频的方式，记录新年！</span></a></div>
    </div>
  </div>
  <template #indicator="page">
    <div class="carousel-demo-bilibili-indicator-wrapper">
      <DCarouselIndicator style="justify-content: flex-start;">
        <div class="carousel-demo-bilibili-indicator-item-wrapper">
          <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 1 && 'active']" @click="page.setPageIndex(1)"></div>
          <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 2 && 'active']" @click="page.setPageIndex(2)"></div>
          <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 3 && 'active']" @click="page.setPageIndex(3)"></div>
          <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 4 && 'active']" @click="page.setPageIndex(4)"></div>
          <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 5 && 'active']" @click="page.setPageIndex(5)"></div>
          <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 6 && 'active']" @click="page.setPageIndex(6)"></div>
        </div>
      </DCarouselIndicator>
    </div>
  </template>
  <template #pagination="page">
    <div class="carousel-demo-bilibili-pagination-wrapper">
      <div class="btn-page" @click="page.prevPage">
        <svg width="18px" height="18px" viewBox="0 0 16 16" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon fill="#293040" fill-rule="nonzero" points="10.7071068 12.2928932 9.29289322 13.7071068 3.58578644 8 9.29289322 2.29289322 10.7071068 3.70710678 6.41421356 8"></polygon></g></svg>
      </div>
      <div class="btn-page" @click="page.nextPage">
        <svg width="18px" height="18px" viewBox="0 0 16 16" version="1.1"><g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd"><polygon fill="#293040" fill-rule="nonzero" transform="translate(8.146447, 8.000000) scale(-1, 1) translate(-8.146447, -8.000000) " points="11.7071068 12.2928932 10.2928932 13.7071068 4.58578644 8 10.2928932 2.29289322 11.7071068 3.70710678 7.41421356 8"></polygon></g></svg>
      </div>
    </div>
  </template>
</DCarousel>
</template>

<style scoped>
img {
    max-width: 100%;
}

.carousel-demo-bilibili {
  width: 600px;
}

.carousel-demo-item-bilibili {
  position: relative;
}

.carousel-demo-item-bilibili .carousel-mask {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1;
  user-select: none;
  pointer-events: none;
  -webkit-mask-image: linear-gradient(0,#2f3238 11%,transparent 20%);
}

.carousel-demo-item-bilibili .carousel-tool {
  position: absolute;
  margin-top: 0;
  flex-grow: 1;
  z-index: 2;
  transition: filter .3s cubic-bezier(.645,.045,.355,1);
  bottom: 60px;
  left: 15px;
  color: #fff;
}

.carousel-demo-item-bilibili .carousel-tool a {
  color: inherit;
  font-size: 18px;
}

.carousel-demo-item-bilibili .carousel-tool a:hover {
  text-decoration: none;
}

.carousel-demo-bilibili-indicator-wrapper {
  z-index: 1;
  position: absolute;
  bottom: 20px;
  padding-left: 15px;
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.carousel-demo-bilibili-indicator-item {
  position: relative;
  display: inline-block;
  width: 8px;
  height: 8px;
  margin: 4px;
  border-radius: 50%;
  background-color: rgba(255,255,255,.4);
  overflow: hidden;
  cursor: pointer;
}

.carousel-demo-bilibili-indicator-item.active {
  width: 14px;
  height: 14px;
  margin: 1px;
  border-radius: 50%;
  background-color: #fff;
}

.carousel-demo-bilibili-pagination-wrapper {
  position: absolute;
  bottom: 50px;
  right: 8px;
  z-index: 2;
}

.carousel-demo-bilibili-pagination-wrapper .btn-page {
  align-items: center;
  justify-content: center;
  display: inline-flex;
  width: 28px;
  height: 28px;
  margin-right: 12px;
  border-radius: 8px;
  background-color: rgba(255,255,255,.1);
  cursor: pointer;
  color: #fff;
}

.carousel-demo-bilibili-pagination-wrapper .btn-page:hover {
  background-color: rgba(255,255,255,.2);
}
</style>
```

效果如下：

![](/assets/carousel-component-13.gif)

看着是不是和B站的效果一样啦！

这个例子稍微复杂一些，用到了`DCarousel`、`DCarouselIndicator`、`usePage`多个组件和Composable。

我们抛开无关的HTML和样式，只关注最核心的`DCarousel`的使用部分。

首先引入了`DCarousel`、`DCarouselIndicator`。

```vue
<script setup lang="ts">
import { DCarousel, DCarouselIndicator } from 'vue-devui-carousel'
</script>
```

然后自定义了`DCarousel`的3个插槽部分的HTML，在`indicator`插槽区域使用了`DCarouselIndicator`组件，我们发现`indicator`插槽导出了`page`参数，这样`DCarouselIndicator`可以不依赖外部的`usePage`，为了使`DCarouselIndicator`能够居左，我们只需要给它加一行css样式`style="justify-content: flex-start;"`即可，非常方便，也不需要增加`indicator-position`之类的api。

```html
<DCarousel>
  <!-- 轮播内容区域 -->
  <div class="carousel-bilibili">xxx</div>
  ...
  
  <!-- indicator 自定义指示器插槽区域 -->
  <template #indicator="page">
      <DCarouselIndicator style="justify-content: flex-start;">
        <div :class="['carousel-demo-bilibili-indicator-item', page.pageIndex === 1 && 'active']" @click="page.setPageIndex(1)"></div>
        ...
      </DCarouselIndicator>
  </template>
  
  <!-- pagination 自定义分页器插槽区域 -->
  <template #pagination="page">
      <div class="btn-page" @click="page.prevPage"></div>
      <div class="btn-page" @click="page.nextPage"></div>
    </div>
  </template>
</DCarousel>
```

`DCarouselPrev`和`DCarouselNext`组件由于比较简单，我就不多做介绍，大家可以自行探索有趣的玩法。

## usePage抽象了UI无关的分页逻辑

值得一提的是`usePage`这个`Composable`，它其实并不是为`Carousel`准备的，而是为`Pagination`分页组件准备的，不过这两个组件都有一个通用的与UI无关的逻辑，那就是分页，而这个分页的能力就通过`usePage`来承载，除了它俩，还有`ImagePreview`的分页能力也是`usePage`提供的。

前端积木理论系列分享：
- [前端开发的积木理论——像搭积木一样做前端开发](https://juejin.cn/post/7047503485054484516)
- [用积木理论设计一个灵活好用的Carousel走马灯组件](https://juejin.cn/post/7051370356585529357)
- [CarouseIndicator 组件应用：0行JS代码实现好看的手风琴式折叠卡片效果](https://juejin.cn/post/7052107147496128549)
- [用积木理论设计的Carousel组件都有哪些有趣的玩法？](https://juejin.cn/post/7056193763810476063)

<EditInfo time="2022年01月23日 08:41" title="阅读 1991 ·  点赞 21 ·  评论 20 ·  收藏 19" />
