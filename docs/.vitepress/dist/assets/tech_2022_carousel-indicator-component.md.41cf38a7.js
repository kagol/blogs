import{_ as s,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const m=JSON.parse('{"title":"CarouseIndicator 组件应用：0行JS代码实现好看的手风琴式折叠卡片效果","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2022/carousel-indicator-component.md","filePath":"tech/2022/carousel-indicator-component.md"}'),t={name:"tech/2022/carousel-indicator-component.md"},c=o(`<h1 id="carouseindicator-组件应用-0行js代码实现好看的手风琴式折叠卡片效果" tabindex="-1">CarouseIndicator 组件应用：0行JS代码实现好看的手风琴式折叠卡片效果 <a class="header-anchor" href="#carouseindicator-组件应用-0行js代码实现好看的手风琴式折叠卡片效果" aria-label="Permalink to &quot;CarouseIndicator 组件应用：0行JS代码实现好看的手风琴式折叠卡片效果&quot;">​</a></h1><p>前两天写了一篇<a href="https://juejin.cn/post/7047503485054484516" target="_blank" rel="noreferrer">前端积木理论</a>的实战文章，以<a href="https://devui.design/" target="_blank" rel="noreferrer">DevUI</a>组件库的<code>Carousel</code>走马灯组件为例，详细地阐述了如何将<code>积木理论</code>运用到组件开发中，里面提到<code>抽象</code>和<code>分层</code>的思想，通过<code>抽象</code>的思想将Carousel组件最核心的交互抽象成<code>usePage</code>这个<code>Composable</code>，通过<code>分层</code>的思想将Carousel组件划分成<code>CarouselIndicator</code>/<code>CarouselPagination</code>两个子组件。</p><h2 id="为什么carouselindicator组件要单独定义v-model呢" tabindex="-1">为什么CarouselIndicator组件要单独定义v-model呢？ <a class="header-anchor" href="#为什么carouselindicator组件要单独定义v-model呢" aria-label="Permalink to &quot;为什么CarouselIndicator组件要单独定义v-model呢？&quot;">​</a></h2><p>当提到<code>CarouselIndicator</code>的具体实现原理时，<a href="https://juejin.cn/user/641770523472567" target="_blank" rel="noreferrer">贪财庸俗之人</a>同学提了一个问题：</p><blockquote><p>为什么CarouselIndicator组件不直接用Carousel组件的pageIndex，而是自己定义一个v-model双向绑定？</p></blockquote><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f8ad6c205ca349338a9ab7326ce97aff~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>这个问题我觉得问得非常好！</p><p>说明这位同学确实认真看了这篇文章，并且有自己的思考，我当时回复得很简单：</p><blockquote><p>为了避免CarouselIndicator与Carousel组件产生耦合。</p></blockquote><p>下午吃完晚饭一边散步一边刷掘金的时候，突然刷到<a href="https://juejin.cn/user/3677241439685368" target="_blank" rel="noreferrer">battleKing</a>同学去年8月份写的一篇文章：</p><p><a href="https://juejin.cn/post/6991752974896726052" target="_blank" rel="noreferrer">手风琴式折叠卡片展示效果</a></p><p><a href="https://juejin.cn/user/3677241439685368" target="_blank" rel="noreferrer">battleKing</a>同学的文章写得非常不错，代码清晰易懂，点赞！</p><p>我想了下，这不就是一个<code>CarouselIndicator</code>吗？</p><p>所以为了更清楚地解释<a href="https://juejin.cn/user/641770523472567" target="_blank" rel="noreferrer">贪财庸俗之人</a>小伙伴提出的那个问题：</p><blockquote><p>为什么CarouselIndicator组件不直接用Carousel组件的pageIndex，而是自己定义一个v-model双向绑定？</p></blockquote><p>我打算用<code>CarouselIndicator</code>组件实现一下<code>手风琴式折叠卡片</code>的效果。</p><h2 id="单独使用carouselindicator组件实现手风琴式折叠卡片效果" tabindex="-1">单独使用<code>CarouselIndicator</code>组件实现<code>手风琴式折叠卡片</code>效果 <a class="header-anchor" href="#单独使用carouselindicator组件实现手风琴式折叠卡片效果" aria-label="Permalink to &quot;单独使用\`CarouselIndicator\`组件实现\`手风琴式折叠卡片\`效果&quot;">​</a></h2><p>由于<code>CarouselIndicator</code>组件其实是一个独立的组件，并不与Carousel组件有任何耦合，因此可以单独使用。</p><p>还是在<code>App.vue</code>文件中</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 引入DCarouselIndicator组件和usePage</span></span>
<span class="line"><span style="color:#babed8;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">import { DCarouselIndicator, usePage } from &#39;./components/carousel&#39;</span></span>
<span class="line"><span style="color:#babed8;">const { pageIndex, setPageIndex } = usePage(1)</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;DCarouselIndicator&gt;</span></span>
<span class="line"><span style="color:#babed8;">  // 中间的dom元素直接从battleKing同学的文章中拷贝即可</span></span>
<span class="line"><span style="color:#babed8;">  // 《手风琴式折叠卡片展示效果》：https://juejin.cn/user/3677241439685368</span></span>
<span class="line"><span style="color:#babed8;">  &lt;div class=&quot;box&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div :class=&quot;[&#39;panel&#39;, pageIndex === 1 ? &#39;active&#39; : &#39;&#39;]&quot; @click=&quot;setPageIndex(1)&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;h3&gt;Explore The World&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div :class=&quot;[&#39;panel&#39;, pageIndex === 2 ? &#39;active&#39; : &#39;&#39;]&quot; @click=&quot;setPageIndex(2)&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;h3&gt;Wild Forest&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div :class=&quot;[&#39;panel&#39;, pageIndex === 3 ? &#39;active&#39; : &#39;&#39;]&quot; @click=&quot;setPageIndex(3)&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;h3&gt;Sunny Beach&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div :class=&quot;[&#39;panel&#39;, pageIndex === 4 ? &#39;active&#39; : &#39;&#39;]&quot; @click=&quot;setPageIndex(4)&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;h3&gt;City on Winter&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div :class=&quot;[&#39;panel&#39;, pageIndex === 5 ? &#39;active&#39; : &#39;&#39;]&quot; @click=&quot;setPageIndex(5)&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;h3&gt;Mountains - Clouds&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/DCarouselIndicator&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#babed8;">// 样式也直接从battleKing同学的文章中直接拷贝，啥也不用改</span></span>
<span class="line"><span style="color:#babed8;">.box {</span></span>
<span class="line"><span style="color:#babed8;">  display: flex;</span></span>
<span class="line"><span style="color:#babed8;">  width: 90vw;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.panel {</span></span>
<span class="line"><span style="color:#babed8;">  background-size: cover;</span></span>
<span class="line"><span style="color:#babed8;">  background-position: center;</span></span>
<span class="line"><span style="color:#babed8;">  background-repeat: no-repeat;</span></span>
<span class="line"><span style="color:#babed8;">  height: 40vh;</span></span>
<span class="line"><span style="color:#babed8;">  border-radius: 50px;</span></span>
<span class="line"><span style="color:#babed8;">  color: #fff;</span></span>
<span class="line"><span style="color:#babed8;">  cursor: pointer;</span></span>
<span class="line"><span style="color:#babed8;">  flex: 0.5;</span></span>
<span class="line"><span style="color:#babed8;">  margin: 10px;</span></span>
<span class="line"><span style="color:#babed8;">  position: relative;</span></span>
<span class="line"><span style="color:#babed8;">  -webkit-transition: all 700ms ease-in;</span></span>
<span class="line"><span style="color:#babed8;">  transition: all 700ms ease-in;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">.panel:nth-child(1){</span></span>
<span class="line"><span style="color:#babed8;">  background-image: url(&quot;https://picsum.photos/1350/900?random=1&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">.panel:nth-child(2){</span></span>
<span class="line"><span style="color:#babed8;">  background-image: url(&quot;https://picsum.photos/1350/900?random=2&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">.panel:nth-child(3){</span></span>
<span class="line"><span style="color:#babed8;">  background-image: url(&quot;https://picsum.photos/1350/900?random=3&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">.panel:nth-child(4){</span></span>
<span class="line"><span style="color:#babed8;">  background-image: url(&quot;https://picsum.photos/1350/900?random=4&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">.panel:nth-child(5){</span></span>
<span class="line"><span style="color:#babed8;">  background-image: url(&quot;https://picsum.photos/1350/900?random=5&quot;);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.panel h3 {</span></span>
<span class="line"><span style="color:#babed8;">  font-size: 24px;</span></span>
<span class="line"><span style="color:#babed8;">  position: absolute;</span></span>
<span class="line"><span style="color:#babed8;">  bottom: 20px;</span></span>
<span class="line"><span style="color:#babed8;">  left: 20px;</span></span>
<span class="line"><span style="color:#babed8;">  margin: 0;</span></span>
<span class="line"><span style="color:#babed8;">  opacity: 0;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.panel.active {</span></span>
<span class="line"><span style="color:#babed8;">  flex: 5;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.panel.active h3 {</span></span>
<span class="line"><span style="color:#babed8;">  opacity: 1;</span></span>
<span class="line"><span style="color:#babed8;">  transition: opacity 0.3s ease-in 0.4s;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">&lt;/style&gt;</span></span></code></pre></div><h2 id="手风琴式折叠卡片实现效果" tabindex="-1">手风琴式折叠卡片实现效果 <a class="header-anchor" href="#手风琴式折叠卡片实现效果" aria-label="Permalink to &quot;手风琴式折叠卡片实现效果&quot;">​</a></h2><p>最终效果如下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6e97ea67fa4d4edaaafcd7822fad8f94~tplv-k3u1fbpfcp-watermark.image?" alt="2022-01-11 22.35.37.gif"></p><p>是不是非常简单，几乎不用写什么逻辑代码，就实现了手风琴式折叠卡片的效果，希望<a href="https://juejin.cn/user/641770523472567" target="_blank" rel="noreferrer">贪财庸俗之人</a>同学能理解为什么<code>CarouselIndicator</code>要和<code>Carousel</code>解耦。</p><p>积木理论最核心的思想就是：</p><blockquote><p>让每一个组件都像积木一样可以随意拼接和组合使用，组件之间是独立和内聚的，不与其他组件有任何耦合。</p></blockquote><p>这样我们开发前端页面，就像搭积木一样简单，只需要把组件拼起来就可以啦。</p><p>觉得有用就给我点个赞吧，你的点赞是对我最大的鼓励，后续我也会持续输出更多<a href="https://github.com/DevCloudFE/vue-devui" target="_blank" rel="noreferrer">DevUI</a>组件设计干货文章，尽情期待！</p><h2 id="优化思路" tabindex="-1">优化思路 <a class="header-anchor" href="#优化思路" aria-label="Permalink to &quot;优化思路&quot;">​</a></h2><p>目前的做法在写法上不够简洁，引入了<code>usePage</code>，其实这部分逻辑可以放在<code>CarouselIndicator</code>组件里面，使用起来大致是这样：</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">DCarouselIndicator</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;div class=&quot;panel&quot;&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    &lt;h3&gt;Explore The World&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;div class=&quot;panel&quot;&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    &lt;h3&gt;Wild Forest&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;div class=&quot;panel&quot;&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    &lt;h3&gt;Sunny Beach&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;div class=&quot;panel&quot;&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    &lt;h3&gt;City on Winter&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;div class=&quot;panel&quot;&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    &lt;h3&gt;Mountains - Clouds&lt;/h3&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  &lt;/div&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">DCarouselIndicator</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div>`,31);function r(i,d,b,u,g,y){const a=n("EditInfo");return e(),l("div",null,[c,p(a,{time:"2022年01月12日 08:30",title:"阅读 2673 ·  点赞 13 ·  评论 8 ·  收藏 3"})])}const q=s(t,[["render",r]]);export{m as __pageData,q as default};
