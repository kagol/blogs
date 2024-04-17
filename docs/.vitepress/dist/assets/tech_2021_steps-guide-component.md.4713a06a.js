import{_ as a,B as e,o as n,c as p,G as l,Q as t}from"./chunks/framework.1fee3549.js";const y=JSON.parse('{"title":"StepsGuide：一个像跟屁虫一样的组件","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/steps-guide-component.md","filePath":"tech/2021/steps-guide-component.md"}'),o={name:"tech/2021/steps-guide-component.md"},c=t(`<h1 id="stepsguide-一个像跟屁虫一样的组件" tabindex="-1">StepsGuide：一个像跟屁虫一样的组件 <a class="header-anchor" href="#stepsguide-一个像跟屁虫一样的组件" aria-label="Permalink to &quot;StepsGuide：一个像跟屁虫一样的组件&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201514784-eadaf631-f45e-4070-a2b2-12329d6952aa.png" alt="image"></p><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>近期对 ProjectMan 业务的工作项搜索/过滤功能做了优化，用 DevUI 组件库新推出的 <a href="https://devui.design/components/zh-cn/category-search/" target="_blank" rel="noreferrer">CategorySearch</a> 组件替换了之前复杂繁琐的交互方式，实现了搜索、过滤、过滤条件显示3个功能的整合，能够有效提升用户的操作效率和体验。</p><p>以下是新旧过滤器的效果对比：</p><p>旧版过滤器</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d99174850d04582990b2727616ca241~tplv-k3u1fbpfcp-watermark.image" alt="before-search-module.png"></p><p>新版过滤器</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afa23663c0dd46c19392189f2f7bc683~tplv-k3u1fbpfcp-watermark.image" alt="after-category-search2.png"></p><p>从新旧过滤器的对比可以看出，两者相差很大，这个旧版的过滤器已经在线上运行多年，用户已经习惯了这种交互方式，如果贸然上一个几乎是全新的东西，势必会挑战用户的使用习惯，即使新版过滤器拥有简单易用、操作效率高、体验好等众多优点。</p><p>由于要改变用户习惯，前期很可能还是会受到部分用户的排斥和抵触，为了尽可能让用户平滑过渡到新版过滤器，需要增加一个简单的用户指引，让用户通过几个简单的步骤，快速了解新版过滤器的使用方式。</p><h2 id="_1-单步骤用户指引" tabindex="-1">1 单步骤用户指引 <a class="header-anchor" href="#_1-单步骤用户指引" aria-label="Permalink to &quot;1 单步骤用户指引&quot;">​</a></h2><p>用户指引应该是一个比较通用的场景，先到组件库里找下有没有可以直接用的组件。</p><h3 id="_1-1-寻找合适的组件" tabindex="-1">1.1 寻找合适的组件 <a class="header-anchor" href="#_1-1-寻找合适的组件" aria-label="Permalink to &quot;1.1 寻找合适的组件&quot;">​</a></h3><p>打开DevUI官网的组件总览页面：</p><p><a href="https://devui.design/components/zh-cn/overview" target="_blank" rel="noreferrer">https://devui.design/components/zh-cn/overview</a></p><p>先尝试搜索🔍关键字<code>指引</code>，找到一个操作指引组件：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/875fcb1ea9ff41debfc5892767877e7a~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p>点击进入<code>StepsGuide</code>组件的详情页面：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4213d2bc5f5549129a41ea99029bf863~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p><code>何时使用</code>里写了该组件的使用场景：</p><blockquote><p>业务推出新特性，或复杂的业务逻辑需要指引用户时使用。</p></blockquote><p>和我们的场景是一样的，直接拿来用吧。</p><h3 id="_1-2-看组件demo-了解组件基本用法" tabindex="-1">1.2 看组件Demo，了解组件基本用法 <a class="header-anchor" href="#_1-2-看组件demo-了解组件基本用法" aria-label="Permalink to &quot;1.2 看组件Demo，了解组件基本用法&quot;">​</a></h3><p>先看下第一个基本用法的Demo：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-button</span></span>
<span class="line"><span style="color:#babed8;">  bsStyle=&quot;common&quot;</span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">  [pageName]=&quot;&#39;step-basic-demo&#39;&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [stepIndex]=&quot;0&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [dStepsGuidePosition]=&quot;&#39;top&#39;&quot;</span></span>
<span class="line"><span style="color:#babed8;">  (operateChange)=&quot;operateChange($event)&quot;</span></span>
<span class="line"><span style="color:#babed8;">  (click)=&quot;reset(0)&quot;</span></span>
<span class="line"><span style="color:#babed8;">&gt;</span></span>
<span class="line"><span style="color:#babed8;">  Step 1</span></span>
<span class="line"><span style="color:#babed8;">&lt;/d-button&gt;</span></span></code></pre></div><p>从这个Demo，我们大致可以一窥其使用方式：</p><ul><li>以指令（<code>dStepsGuide</code>）的方式使用</li><li>指令放在哪个元素上，就在它上面展示一个指引框</li><li><code>dStepsGuidePosition</code>属性应该是控制指引框的位置</li><li><code>steps</code>应该是配置指引步骤数据源</li><li><code>stepIndex</code>应该是表示当前的元素是第几个步骤</li><li><code>pageName</code>暂时还不知道有什么用</li><li><code>operateChange</code>是一个事件，还不知道有什么用</li></ul><p>看完HTML文件，再看下TS文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">export class BasicComponent implements OnInit {</span></span>
<span class="line"><span style="color:#babed8;">  ...</span></span>
<span class="line"><span style="color:#babed8;">  steps = [</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        title: &#39;Step 1&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        content: &#39;Guide Content&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        title: &#39;Step 2&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        content: &#39;Guide Content&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        title: &#39;Step 3&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        content: &#39;Guide Content&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">  ];</span></span>
<span class="line"><span style="color:#babed8;">  constructor(private stepService: StepsGuideService) {}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  ngOnInit() {</span></span>
<span class="line"><span style="color:#babed8;">    this.stepService.currentIndex.subscribe((index) =&gt; (this.currentStep = index));</span></span>
<span class="line"><span style="color:#babed8;">    /* 由于整个demo是在一个页面内显示多个操作指引序列，因此需要在初始化时重置显示状态 */</span></span>
<span class="line"><span style="color:#babed8;">    localStorage.setItem(&#39;devui_guide_step-position-demo&#39;, &#39;0&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    localStorage.setItem(&#39;devui_guide_step-custom-demo&#39;, &#39;0&#39;); /* 设置第二个序列为不显示状态 */</span></span>
<span class="line"><span style="color:#babed8;">    localStorage.removeItem(&#39;devui_guide_step-basic-demo&#39;); /* 设置第一个序列为显示状态 */</span></span>
<span class="line"><span style="color:#babed8;">    this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */</span></span>
<span class="line"><span style="color:#babed8;">    this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  ...</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>从TS文件里可以看到steps步骤数据源的结构，steps是一个对象数组，每一个数组项表示一个指引步骤，里面包含该步骤的标题和内容。</p><p>组件初始化事件里面写了一些逻辑，有点复杂，我们先不看。</p><p>根据现有的知识，应该能先用起来。</p><h3 id="_1-3-先用起来再说" tabindex="-1">1.3 先用起来再说 <a class="header-anchor" href="#_1-3-先用起来再说" aria-label="Permalink to &quot;1.3 先用起来再说&quot;">​</a></h3><p>比如我想给下面的搜索框元素加一个指引：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66a6b4dee16a4b18a1e120aa1997aac0~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p>大致效果如下：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6bc5b9f9b94f2bac383142faf34ee2~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><h4 id="_1-3-1-第一步是先引入组件模块" tabindex="-1">1.3.1 第一步是先引入组件模块 <a class="header-anchor" href="#_1-3-1-第一步是先引入组件模块" aria-label="Permalink to &quot;1.3.1 第一步是先引入组件模块&quot;">​</a></h4><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { StepsGuideModule } from &#39;ng-devui&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">@NgModule({</span></span>
<span class="line"><span style="color:#babed8;">  ...</span></span>
<span class="line"><span style="color:#babed8;">  imports: [</span></span>
<span class="line"><span style="color:#babed8;">    ...</span></span>
<span class="line"><span style="color:#babed8;">    StepsGuideModule,</span></span>
<span class="line"><span style="color:#babed8;">  ],</span></span>
<span class="line"><span style="color:#babed8;">  ...</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">export class MainContentHeadModule { }</span></span></code></pre></div><h4 id="_1-3-2-然后加上dstepsguide指令和相应的属性" tabindex="-1">1.3.2 然后加上dStepsGuide指令和相应的属性 <a class="header-anchor" href="#_1-3-2-然后加上dstepsguide指令和相应的属性" aria-label="Permalink to &quot;1.3.2 然后加上dStepsGuide指令和相应的属性&quot;">​</a></h4><p>先只加一个steps试试看：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-search </span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">  [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">&gt;&lt;/d-search&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">steps = [</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    title: &#39;新功能介绍：搜索框&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    content: \`</span></span>
<span class="line"><span style="color:#babed8;">      &lt;p&gt;1、过滤功能迁移至搜索框中啦&lt;/p&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;p&gt;2、在搜索框中，您可输入关键词或添加筛选条件查询所需要的工作项&lt;/p&gt;</span></span>
<span class="line"><span style="color:#babed8;">    \`,</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">];</span></span></code></pre></div><p>发现什么效果都没有。</p><h4 id="_1-3-3-调整参数-达到我们想要的效果" tabindex="-1">1.3.3 调整参数，达到我们想要的效果 <a class="header-anchor" href="#_1-3-3-调整参数-达到我们想要的效果" aria-label="Permalink to &quot;1.3.3 调整参数，达到我们想要的效果&quot;">​</a></h4><p>回过头来看组件Demo，组件初始化时做了一些事情：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ngOnInit() {</span></span>
<span class="line"><span style="color:#babed8;">    this.stepService.currentIndex.subscribe((index) =&gt; (this.currentStep = index));</span></span>
<span class="line"><span style="color:#babed8;">    /* 由于整个demo是在一个页面内显示多个操作指引序列，因此需要在初始化时重置显示状态 */</span></span>
<span class="line"><span style="color:#babed8;">    localStorage.setItem(&#39;devui_guide_step-position-demo&#39;, &#39;0&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    localStorage.setItem(&#39;devui_guide_step-custom-demo&#39;, &#39;0&#39;); /* 设置第二个序列为不显示状态 */</span></span>
<span class="line"><span style="color:#babed8;">    localStorage.removeItem(&#39;devui_guide_step-basic-demo&#39;); /* 设置第一个序列为显示状态 */</span></span>
<span class="line"><span style="color:#babed8;">    this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */</span></span>
<span class="line"><span style="color:#babed8;">    this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span></code></pre></div><p>最后一行代码似乎是用来控制显示哪一个步骤指引的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */</span></span></code></pre></div><p>我们加上这一行试试看。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { StepsGuideService } from &#39;ng-devui&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">constructor(</span></span>
<span class="line"><span style="color:#babed8;">  private stepService: StepsGuideService,</span></span>
<span class="line"><span style="color:#babed8;">) {}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">ngOnInit(): void {</span></span>
<span class="line"><span style="color:#babed8;">  this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>发现还是没效果。</p><p>再加上调用setSteps方法那一行试试：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ngOnInit(): void {</span></span>
<span class="line"><span style="color:#babed8;">  this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */</span></span>
<span class="line"><span style="color:#babed8;">  this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>还是不行，再试试加上stepIndex属性：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-search </span></span>
<span class="line"><span style="color:#babed8;">      dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">      [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">      [stepIndex]=&quot;0&quot; // 新增的</span></span>
<span class="line"><span style="color:#babed8;">    &gt;&lt;/d-search&gt;</span></span></code></pre></div><p>终于有效果了：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/208f99da6f2d407c9eb7b87e818e5673~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p>不过默认位置显示在元素上方，被挡住了，可以设置下dStepsGuidePosition属性，调整下指引的位置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-search </span></span>
<span class="line"><span style="color:#babed8;">      dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">      [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">      [stepIndex]=&quot;0&quot;</span></span>
<span class="line"><span style="color:#babed8;">      dStepsGuidePosition=&quot;bottom&quot; // 新增的</span></span>
<span class="line"><span style="color:#babed8;">    &gt;&lt;/d-search&gt;</span></span></code></pre></div><p>这回正常了。</p><p>效果和我们想要的一模一样：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7431285d2ca44124a07e1b089b9e881c~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><h4 id="_1-3-4-小结" tabindex="-1">1.3.4 小结 <a class="header-anchor" href="#_1-3-4-小结" aria-label="Permalink to &quot;1.3.4 小结&quot;">​</a></h4><p>回顾一下，为了实现单步骤用户指引，我们使用了<code>dStepsGuide</code>指令的三个参数：</p><ul><li>steps 步骤数组，是一个对象数组，里面包含步骤的标题（title）和内容（content）</li><li>stepIndex 显示第几个步骤</li><li>dStepsGuidePosition 显示位置（一共有8个方位）</li></ul><p>为了设置当前步骤为第一个步骤，我们调用了stepService的两个方法：</p><ul><li>setSteps(this.steps) 将步骤数据设置为第一个序列的内容</li><li>setCurrentIndex(0) 设置当前步骤为第一个步骤</li></ul><p>这就是实现单步骤用户指引所需要知道的全部知识。</p><h2 id="_2-多步骤指引" tabindex="-1">2 多步骤指引 <a class="header-anchor" href="#_2-多步骤指引" aria-label="Permalink to &quot;2 多步骤指引&quot;">​</a></h2><p>这时产品说一个步骤不够，要加一个，主要有两个要求：</p><ul><li>第一个步骤里面点击下一步，可以跳到下一个步骤</li><li>第二个步骤有一个返回上一步的按钮</li></ul><p>为了实现多步骤指引，我们不需要学习任何多余的API，只需要简单地在steps中增加一个步骤，并设置第二个步骤的stepIndex为1即可。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-search </span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuidePosition=&quot;bottom&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [stepIndex]=&quot;0&quot;</span></span>
<span class="line"><span style="color:#babed8;">&gt;&lt;/d-search&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;!--新增的步骤--&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;d-button</span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuidePosition=&quot;bottom&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [stepIndex]=&quot;1&quot;</span></span>
<span class="line"><span style="color:#babed8;">&gt;新建项目&lt;/d-button&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">steps = [</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    title: &#39;新功能介绍：搜索框&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    content: \`</span></span>
<span class="line"><span style="color:#babed8;">      &lt;p&gt;1、过滤功能迁移至搜索框中啦&lt;/p&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;p&gt;2、在搜索框中，您可输入关键词或添加筛选条件查询所需要的工作项&lt;/p&gt;</span></span>
<span class="line"><span style="color:#babed8;">    \`,</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  // 新增的步骤</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    title: &#39;新功能介绍：新建项目&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    content: \`</span></span>
<span class="line"><span style="color:#babed8;">      &lt;p&gt;点击“新建项目”按钮，即可跳转到新建项目页面&lt;/p&gt;</span></span>
<span class="line"><span style="color:#babed8;">    \`,</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">];</span></span></code></pre></div><p>效果如下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321de82b64224eb1955c24cd36f42e29~tplv-k3u1fbpfcp-watermark.image" alt="多步骤用户指引.gif"></p><p>是不是非常简单？</p><h2 id="_3-跟随效果" tabindex="-1">3 跟随效果 <a class="header-anchor" href="#_3-跟随效果" aria-label="Permalink to &quot;3 跟随效果&quot;">​</a></h2><p>以上实现会有一个问题：</p><blockquote><p>如果步骤的目标元素是动态变化的，比如它的位置变了，宽高变了，指引不会跟着变。</p></blockquote><p>效果如下：</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89614834bb0d4047974c6f4dabd197cd~tplv-k3u1fbpfcp-watermark.image" alt="不跟随的情况.gif"></p><p>这时需要用到StepsGuide组件的另一个API：<code>observerDom</code></p><p>这个API会让指引步骤秒变跟屁虫：</p><blockquote><p>目标元素在哪儿，指引步骤就跟到哪儿。</p></blockquote><p>API文档用了大段文字来描述这个<code>observerDom</code>的用途，其实就是把指引步骤的浮框变成“跟屁虫”😄</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac9bfbe4b2c14ca68adc5140719e9009~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-search </span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuide</span></span>
<span class="line"><span style="color:#babed8;">  dStepsGuidePosition=&quot;bottom&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [steps]=&quot;steps&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [stepIndex]=&quot;0&quot;</span></span>
<span class="line"><span style="color:#babed8;">  [observerDom]=&quot;observerDom&quot; // 新增的</span></span>
<span class="line"><span style="color:#babed8;">&gt;&lt;/d-search&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">observerDom;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">ngOnInit(): void {</span></span>
<span class="line"><span style="color:#babed8;">  // 新增的，把搜索框的外层元素设置成observerDom，这样只要它里面的任何元素发生变化，导致了搜索框位置发生变化，步骤指引的浮框都会跟着变化</span></span>
<span class="line"><span style="color:#babed8;">  this.observerDom = document.querySelector(&#39;.main-content&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  this.stepService.setSteps(this.steps);</span></span>
<span class="line"><span style="color:#babed8;">  this.stepService.setCurrentIndex(0);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26ce78b9a09243ec8962e5837649bce7~tplv-k3u1fbpfcp-watermark.image" alt="跟随的情况.gif"></p><p>不仅仅是搜索框宽度变化，其他变化导致的搜索框位置的变化也会触发步骤指引的跟随：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be33878dc4064b8d94b1908fad4f136c~tplv-k3u1fbpfcp-watermark.image" alt="响应其他变化.gif"></p><p>是不是非常有意思？</p><p>接下来我们就来看看这个简单却很有意思的“跟屁虫”组件还有哪些能力。</p><h2 id="_4-stepsguide组件的其他api" tabindex="-1">4 StepsGuide组件的其他API <a class="header-anchor" href="#_4-stepsguide组件的其他api" aria-label="Permalink to &quot;4 StepsGuide组件的其他API&quot;">​</a></h2><p>关注StepsGuide组件的介绍，没有比它的<a href="https://devui.design/components/zh-cn/steps-guide/api" target="_blank" rel="noreferrer">API文档</a>写得更清楚的了。</p><p>它一共有12个属性API，一个事件API。</p><p>属性API：</p><ul><li>steps 步骤数组</li><li>stepIndex 当前步骤索引</li><li>dStepsGuidePosition 指引步骤的位置</li><li>observerDom 跟随效果</li><li>pageName 用来标识操作指引，跨页面（或路由）时会用到</li><li>leftFix 位置修复</li><li>topFix 位置修复</li><li>zIndex 指引步骤的层级</li><li>targetElement 指定目标元素，当需要为动态生成的元素添加指引时会用到</li><li>scrollElement 指引信息跟随滚动定位的容器元素</li><li>scrollToTargetSwitch 是否自动滚动页面至指引信息显示的位置</li><li>extraConfig 扩展配置，用于隐藏上一步按钮和步骤圆点图标</li></ul><p>事件API：</p><ul><li>operateChange 指引步骤中的按钮事件，需要自定义下一步的动作时会用到</li></ul><p>这些API的具体用法详见StepsGuide组件的Demo：</p><p><a href="https://devui.design/components/zh-cn/steps-guide/demo" target="_blank" rel="noreferrer">https://devui.design/components/zh-cn/steps-guide/demo</a></p><p>如果你的业务中也有新特性要发布，需要增加用户指引，不妨试试这个有趣的跟屁虫组件吧😜！</p><p>也欢迎使用DevUI新发布的<a href="https://devui.design/admin-page/home" target="_blank" rel="noreferrer">DevUI Admin</a>系统，开箱即用，10分钟搭建一个美观大气的后台管理系统！</p><h2 id="加入我们" tabindex="-1">加入我们 <a class="header-anchor" href="#加入我们" aria-label="Permalink to &quot;加入我们&quot;">​</a></h2><p>我们是DevUI团队，欢迎来这里和我们一起打造优雅高效的人机设计/研发体系。招聘邮箱：muyang2@huawei.com。</p><p>文/DevUI Kagol</p><p>往期文章推荐</p><p><a href="https://juejin.cn/post/6966993945973194765" target="_blank" rel="noreferrer">《Quill富文本编辑器的实践》</a></p><p><a href="https://juejin.cn/post/6959700988882059271" target="_blank" rel="noreferrer">《如何解决异步接口请求快慢不均导致的数据错误问题？》</a></p><p><a href="https://juejin.cn/post/6956155033410863134" target="_blank" rel="noreferrer">《号外号外！DevUI Admin V1.0 发布啦！》</a></p><p><a href="https://juejin.cn/post/6956612556710477860" target="_blank" rel="noreferrer">《CategorySearch分类搜索组件初体验》</a></p><p><a href="https://juejin.cn/post/6956988395016945701" target="_blank" rel="noreferrer">《让我们一起建设 Vue DevUI 项目吧！》</a></p>`,117);function i(r,d,b,u,g,h){const s=e("EditInfo");return n(),p("div",null,[c,l(s,{time:"2021年05月30日 12:21",title:"阅读 2200 ·  点赞 22 ·  评论 2 ·  收藏 3"})])}const f=a(o,[["render",i]]);export{y as __pageData,f as default};
