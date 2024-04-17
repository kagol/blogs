import{_ as n,B as o,o as t,c,k as s,a,t as r,G as i,Q as e}from"./chunks/framework.1fee3549.js";const C=JSON.parse('{"title":"点线面 Vue3：先跑起来再说！","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/getting-started-with-vue.md","filePath":"tech/2021/getting-started-with-vue.md"}'),d={name:"tech/2021/getting-started-with-vue.md"},y=e(`<h1 id="点线面-vue3-先跑起来再说" tabindex="-1">点线面 Vue3：先跑起来再说！ <a class="header-anchor" href="#点线面-vue3-先跑起来再说" aria-label="Permalink to &quot;点线面 Vue3：先跑起来再说！&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201514022-0391871c-7af5-4885-bebb-50166743171f.png" alt="image"></p><p>一直觉得框架只是工具，工作中用不上就没必要去学，要用的时候再去学习即可。</p><p>所以对国内非常火爆的Vue框架也只有一个初浅的印象：</p><ul><li>Vue是一个渐进式的JavaScript框架</li><li>Vue2通过defineProperty拦截对象实现响应式，而Vue3则改成了Proxy实现响应式</li><li>Vue3增加了Composite API以解决代码复用和可维护性问题</li></ul><p>近期系统地学习了一遍 Vue3，趁着刚学完，从初学者的角度总结 Vue3 的关键特性（只是从我个人的角度，不一定完全按照文档来）。</p><p>本文从以下技术栈的角度进行阐述：</p><ul><li><a href="https://github.com/vitejs/vite/releases/tag/v2.4.4" target="_blank" rel="noreferrer">vite@2.4.4</a></li><li><a href="https://github.com/vuejs/vue-next/releases/tag/v3.1.5" target="_blank" rel="noreferrer">vue@3.1.5</a></li><li><a href="https://github.com/microsoft/TypeScript/releases/tag/v4.3.5" target="_blank" rel="noreferrer">typescript@4.3.5</a></li></ul><p>💡提示：截止到2021年8月7日，以上库/框架的版本都是最新版本。</p><p>文章较长，如果想直接看小结，可以跳转到以下章节： <a href="#_6-小结">6 小结</a></p><h2 id="_1-先跑起来再说" tabindex="-1">1 先跑起来再说 <a class="header-anchor" href="#_1-先跑起来再说" aria-label="Permalink to &quot;1 先跑起来再说&quot;">​</a></h2><p>对于一个小白来说，要学习一门新技术，最快的方式就是：</p><blockquote><p>先跑起来再说</p></blockquote><p>跑起来之后，我们会对这门新技术有一个直观的印象，后续看文档也会更清晰。</p><p>另外就是要多思考，带着问题去学习，记忆会更深刻，也更容易理解其中的原理。</p><p>后续我们学习过程中学到的新知识点，我都会加上官网的链接，不过这些官网资料只是一个进一步学习的参考，关键是我们自己要有思考，并带着问题去学习。</p><p>Vite是尤大大比较推荐的开发Vue3的工具，听说非常丝滑，所以第一步先建一个Vite的工程跑起来。</p><p>直接参考官网的<a href="https://cn.vitejs.dev/guide/" target="_blank" rel="noreferrer">开始</a>章节，一个命令就搞定啦：</p><div class="language-sh"><button title="Copy Code" class="copy"></button><span class="lang">sh</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">yarn</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">create</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">vite</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">learning-vue3</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">--template</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">vue-ts</span></span></code></pre></div><p><code>--template</code>这个参数是选择一个工程模板，我们选择的是<code>vue-ts</code>：<a href="https://github.com/vitejs/vite/tree/main/packages/create-vite/template-vue-ts" target="_blank" rel="noreferrer">Vue 3 + Typescript + Vite</a></p><p>Vite除了创建Vue的工程，还可以创建React/Preact/Svelte等多种框架的工程。</p><p>Vite果然非常快，不到3s就创建了一个基本的脚手架工程。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ yarn create vite learning-vue3 --template vue-ts</span></span>
<span class="line"><span style="color:#babed8;">yarn create v1.22.10</span></span>
<span class="line"><span style="color:#babed8;">[1/4] 🔍  Resolving packages...</span></span>
<span class="line"><span style="color:#babed8;">[2/4] 🚚  Fetching packages...</span></span>
<span class="line"><span style="color:#babed8;">[3/4] 🔗  Linking dependencies...</span></span>
<span class="line"><span style="color:#babed8;">[4/4] 🔨  Building fresh packages...</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">success Installed &quot;create-vite@2.5.4&quot; with binaries:</span></span>
<span class="line"><span style="color:#babed8;">      - create-vite</span></span>
<span class="line"><span style="color:#babed8;">      - cva</span></span>
<span class="line"><span style="color:#babed8;">[###########################################################################################################################################################################################################] 232/232</span></span>
<span class="line"><span style="color:#babed8;">Scaffolding project in /devui/kagol/learning-vue3...</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Done. Now run:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  cd learning-vue3</span></span>
<span class="line"><span style="color:#babed8;">  yarn</span></span>
<span class="line"><span style="color:#babed8;">  yarn dev</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">✨  Done in 2.69s.</span></span></code></pre></div><p>而且非常友好地提示我们下一步要执行的命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Done. Now run:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  cd learning-vue3</span></span>
<span class="line"><span style="color:#babed8;">  yarn</span></span>
<span class="line"><span style="color:#babed8;">  yarn dev</span></span></code></pre></div><p>按照提示操作，我们很快就能将项目跑起来了！</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/222251fe505a411f8f1c9a190f828b57~tplv-k3u1fbpfcp-watermark.image" alt="vite.png"></p><h2 id="_2-vue-组件初步印象" tabindex="-1">2 Vue 组件初步印象 <a class="header-anchor" href="#_2-vue-组件初步印象" aria-label="Permalink to &quot;2 Vue 组件初步印象&quot;">​</a></h2><p>启动画面最底下，有一个指引，让我们编辑<code>components/HelloWorld.vue</code>这个文件，测试下热更新（HMR）的功能。</p><p>我们找到这个文件<code>HelloWorld.vue</code>，不着急修改它，先来观察下它的结构。</p><p>这个文件是以<code>.vue</code>为文件后缀的，代表这是一个<code>Vue组件</code>。</p><p>一个Vue组件包含三个部分：</p><ul><li>最顶部是一个<code>&lt;template&gt;</code>标签</li><li>中间是一个<code>&lt;script lang=&quot;ts&quot;&gt;</code>标签</li><li>最下面是一个<code>&lt;style scoped&gt;</code>标签</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71aae96d8b8648a1ab1a8578330fbc6b~tplv-k3u1fbpfcp-watermark.image" alt="HelloWorld.vue.png"></p><p>这和我们最早学习前端编写html页面的结构是一样的，将<code>HTML</code>/<code>CSS</code>/<code>JavaScript</code>分成三个区块。</p><p>不过我们还是注意到一点不同：</p><ul><li>HTML部分是用<code>&lt;template&gt;</code>这个特殊的标签包裹起来的；</li><li><code>&lt;script&gt;</code>部分多了一个<code>lang=&quot;ts&quot;</code>属性，代表支持<code>TypeScript</code>；</li><li><code>&lt;style&gt;</code>部分多了一个<code>scoped</code>属性，代表局部样式，即：这里面写的样式只针对当前这个Vue组件。</li></ul><p>以上就是目前观察到的Vue组件的基本特点。</p><h2 id="_3-template-分析" tabindex="-1">3 &lt;template&gt; 分析 <a class="header-anchor" href="#_3-template-分析" aria-label="Permalink to &quot;3 \\&lt;template\\&gt; 分析&quot;">​</a></h2><p>我们把<code>&lt;template&gt;</code>/<code>&lt;script&gt;</code>/<code>&lt;style&gt;</code>三个标签展开，看下里面的结构。</p><p>先看下<code>&lt;template&gt;</code>，里面元素比较多，先都收起来，看下大致结构。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/180766c7c7e74374a4d34aaa58976b8f~tplv-k3u1fbpfcp-watermark.image" alt="template.png"></p><p>我们注意到里面就是一些html元素，似乎和写html没什么区别，不过仔细一看，还有会有些不同：</p>`,43),u=s("a",{href:"https://vue3js.cn/docs/zh/guide/template-syntax.html#%E6%96%87%E6%9C%AC",target:"_blank",rel:"noreferrer"},"文本插值",-1),D=s("code",null,"<h1>",-1),F=e(`<div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">{{ msg }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">h1</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><ul><li>第30行是一个<code>&lt;button&gt;</code>标签，我们很熟悉它是一个按钮，里面也有一个<code>文本插值</code>，绑定的是<code>count</code>变量，还有一个<code>@click</code>属性我们没见过，这是Vue<a href="https://vue3js.cn/docs/zh/guide/events.html" target="_blank" rel="noreferrer">事件绑定</a>的语法，绑定了button的点击事件。</li></ul><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">count++</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">count is: {{ count }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><h3 id="vite-热更新-template" tabindex="-1">Vite 热更新 - template <a class="header-anchor" href="#vite-热更新-template" aria-label="Permalink to &quot;Vite 热更新 - template&quot;">​</a></h3><p>我们尝试修改下<code>template</code>里面的内容，比如将最后一行的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">hot module replacement.</span></span></code></pre></div><p>改成</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">hot module replacement(HMR).</span></span></code></pre></div><p>看下页面会有什么变化。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c69ce5d853e642e8b678fceb4b57a65e~tplv-k3u1fbpfcp-watermark.image" alt="Vite热更新-template.gif"></p><p>从以上动图可以看出，修改完<code>template</code>中的内容，一保存文件，页面内容立马刷新，几乎没有任何延迟，页面也没有刷新，开发体验非常丝滑。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae4f6d311fd54fb79d1240b7c00c6766~tplv-k3u1fbpfcp-watermark.image" alt="猫猫震惊.gif"></p><h2 id="_4-script-分析" tabindex="-1">4 &lt;script&gt; 分析 <a class="header-anchor" href="#_4-script-分析" aria-label="Permalink to &quot;4 \\&lt;script\\&gt; 分析&quot;">​</a></h2><p>这部分是全文的核心部分，内容较长，如果想直接看本章节的小结，可以点击直通车链接： <a href="https://juejin.cn/post/6993676123385102373#heading-13" target="_blank" rel="noreferrer">4.9 小结</a></p><p>模板部分我们已经有了一个初步的了解，再来看看脚本部分。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b444d74ec64d4c319978642036a587a8~tplv-k3u1fbpfcp-watermark.image" alt="script.png"></p><h3 id="_4-1-导入vue方法" tabindex="-1">4.1 导入Vue方法 <a class="header-anchor" href="#_4-1-导入vue方法" aria-label="Permalink to &quot;4.1 导入Vue方法&quot;">​</a></h3><p>脚本的第一行从<code>vue</code>导入了两个方法：</p><ul><li><a href="https://vue3js.cn/docs/zh/api/refs-api.html#ref" target="_blank" rel="noreferrer">ref</a>：返回一个响应式且可变的ref对象；</li><li><a href="https://vue3js.cn/docs/zh/api/global-api.html#definecomponent" target="_blank" rel="noreferrer">defineComponent</a>：用来定义一个同步的Vue组件。</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ref</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">defineComponent</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>这两个方法是高频方法，必须牢牢记住。</p><h3 id="_4-2-导出vue组件" tabindex="-1">4.2 导出Vue组件 <a class="header-anchor" href="#_4-2-导出vue组件" aria-label="Permalink to &quot;4.2 导出Vue组件&quot;">​</a></h3><p>第39行导出了一个Vue组件。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">defineComponent</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">name</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">HelloWorld</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">props</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">msg</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">type</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> String</span><span style="color:#89DDFF;">,</span></span>
<span class="line"><span style="color:#BABED8;">      </span><span style="color:#F07178;">required</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#FF9CAC;">true</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#82AAFF;">setup</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#F07178;">(</span><span style="color:#F78C6C;">0</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">count</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>Vue组件通过<code>defineComponent</code>方法来定义，该方法的参数是一个对象，该对象有3个属性：</p><ul><li>name：一个字符串，代表组件的名字；</li><li><a href="https://vue3js.cn/docs/zh/guide/component-props.html" target="_blank" rel="noreferrer">props</a>：一个对象，代表组件的入参，也就是组件与外部进行交互的一个口子，外部使用组件时，可以通过<code>props</code>往组件内部传递数据；</li><li><a href="https://vue3js.cn/docs/zh/guide/composition-api-setup.html" target="_blank" rel="noreferrer">setup</a>：一个箭头函数，这是Vue3新推出的<code>Composite API</code>的入口，会在组件创建之前、props被解析之后执行。</li></ul><h3 id="_4-3-组件入参" tabindex="-1">4.3 组件入参 <a class="header-anchor" href="#_4-3-组件入参" aria-label="Permalink to &quot;4.3 组件入参&quot;">​</a></h3><p>第42行定义了一个msg变量，之前我们在<code>template</code>中已经见过它，可是它的值是什么呢？</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">props: {</span></span>
<span class="line"><span style="color:#babed8;">    msg: {</span></span>
<span class="line"><span style="color:#babed8;">      type: String,</span></span>
<span class="line"><span style="color:#babed8;">      required: true</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span></code></pre></div><p>我们注意到msg是嵌套在props里面的，代表它是组件的一个入参，是组件与外部交互的API，那么它的值就应该是从外部传进来的。</p><p>从哪儿传进来的呢？使用组件是通过它的名字<code>name</code>来使用的，所以我们在源代码里面搜索组件的名字：<code>HelloWorld</code>，发现是在<code>App.vue</code>中使用的：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">HelloWorld</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">msg</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello Vue 3 + TypeScript + Vite</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><h3 id="_4-4-使用vue组件" tabindex="-1">4.4 使用Vue组件 <a class="header-anchor" href="#_4-4-使用vue组件" aria-label="Permalink to &quot;4.4 使用Vue组件&quot;">​</a></h3><p>使用一个组件和使用一个普通的html标签（比如div）几乎是一样的，唯一不同的是使用组件之前需要先导入并声明该组件。</p><p>使用组件的方式很简单，只需要3步：</p><ul><li>导入组件</li><li>声明组件</li><li>使用组件</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2d825aca830c4721a6f007e56628934d~tplv-k3u1fbpfcp-watermark.image" alt="使用组件.png"></p><h3 id="_4-5-vite热更新-script" tabindex="-1">4.5 Vite热更新 - script <a class="header-anchor" href="#_4-5-vite热更新-script" aria-label="Permalink to &quot;4.5 Vite热更新 - script&quot;">​</a></h3><p>我们尝试修改下这个msg的值（比如改成：<code>Hello everyone! I&#39;m learning Vue 3 + TypeScript + Vite</code>），看下页面会有什么变化。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ae6f87201cc43d1848f796ca258dcfa~tplv-k3u1fbpfcp-watermark.image" alt="Vite热更新-script.gif"></p><p>从以上动图可以看出，与修改<code>template</code>的效果一样，修改完msg的值，一保存文件，页面内容立马刷新，之前的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Hello Vue 3 + TypeScript + Vite</span></span></code></pre></div><p>立马变成了：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Hello everyone! I&#39;m learning Vue 3 + TypeScript + Vite</span></span></code></pre></div><p>几乎没有任何延迟，页面也没有刷新，开发体验非常丝滑。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/75cb63de090f4c6caf97ebc306e61520~tplv-k3u1fbpfcp-watermark.image" alt="猫猫震惊2.gif"></p><h3 id="_4-6-响应式的ref对象" tabindex="-1">4.6 响应式的ref对象 <a class="header-anchor" href="#_4-6-响应式的ref对象" aria-label="Permalink to &quot;4.6 响应式的ref对象&quot;">​</a></h3><p>第48行定义了一个<code>count</code>变量：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">setup: () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    const count = ref(0)</span></span>
<span class="line"><span style="color:#babed8;">    return { count }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span></code></pre></div><p>之前我们在<code>template</code>中也见过这个变量，它的值就是这里定义的<code>count</code>，我们注意到这个<code>count</code>的值是调用<code>ref</code>函数之后返回的，函数的参数是数字<code>0</code>。为什么要包一层ref，而不是直接将0赋值给count变量呢？</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span></span></code></pre></div><p>直接赋值不是更简洁吗？</p><p>我们先来看下官网对ref的介绍：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">接受一个内部值并返回一个响应式且可变的 ref 对象。ref 对象具有指向内部值的单个 property \`.value\`。</span></span></code></pre></div><p>为了理解ref函数的作用，我们先尝试在页面里点击一下这个<code>count is: 0</code>的按钮。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc8004b4c6014c668f5226d629751759~tplv-k3u1fbpfcp-watermark.image" alt="button.png"></p><p>点击完发现里面的值立马变成：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">count is: 1</span></span></code></pre></div><p>这时我们将：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#BABED8;">(</span><span style="color:#F78C6C;">0</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>修改成：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> count </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span></span></code></pre></div><p>再次点击button按钮，发现值没有变。</p><p>我们大致能理解ref函数返回<code>响应式ref对象</code>的含义：</p><blockquote><p>响应式的意思就是这个变量的值是动态的，某些动作（点击按钮）改变了它的值，模板里面的文本插值立马也会跟着变化，从而页面里面的内容也会跟着刷新。</p></blockquote><p>如果count没有被ref函数包裹，那它就不是响应式的，点击按钮改变它的值之后，模板的内容不会跟着变化。</p><p>有一个需要注意的点：</p><blockquote><p>setup中定义的变量必须返回，才能在template中使用，否则插值不会被渲染，并且会在浏览器控制台警告提示这个变量没有在实例中定义。</p></blockquote><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/84253ee22b094d038969e0f3ca723aa2~tplv-k3u1fbpfcp-watermark.image" alt="warn.png"></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[Vue warn]: Property &quot;count&quot; was accessed during render but is not defined on instance.</span></span></code></pre></div><h3 id="_4-7-typescript支持" tabindex="-1">4.7 TypeScript支持 <a class="header-anchor" href="#_4-7-typescript支持" aria-label="Permalink to &quot;4.7 TypeScript支持&quot;">​</a></h3><p>前面提到<code>&lt;script&gt;</code>中的<code>lang=&quot;ts&quot;</code>属性是用来支持TypeScript的，我们来试试看吧。</p><p>先定义一个type类型：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">type</span><span style="color:#BABED8;"> </span><span style="color:#FFCB6B;">Size</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">sm</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">md</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">|</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lg</span><span style="color:#89DDFF;">&#39;</span></span></code></pre></div><p>然后在setup方法中定义一个变量用来使用这个类型：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> size </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">Size</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">md</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> size </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 记得返回哦</span></span></code></pre></div><p>最后在template通过文本插值使用该变量：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">{{ size }}</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">p</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>由于我们在<code>&lt;script&gt;</code>中加了<code>lang=&quot;ts&quot;</code>，所以页面能正常显示<code>md</code>。</p><p>这时我们把<code>lang=&quot;ts&quot;</code>去掉，保存文件并刷新页面，页面变成白页，并且浏览器控制台也报错：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Uncaught SyntaxError: unexpected token: identifier</span></span></code></pre></div><p>前面定义的<code>Size</code>类型也出现了红色的波浪下划线。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dbde8365faca418a8f78122b590f965e~tplv-k3u1fbpfcp-watermark.image" alt="Size.png"></p><p>提示type类型声明必须在TypeScript文件中使用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Type aliases can only be used in TypeScript files.</span></span></code></pre></div><h3 id="_4-8-typescript类型错误高亮提示" tabindex="-1">4.8 TypeScript类型错误高亮提示 <a class="header-anchor" href="#_4-8-typescript类型错误高亮提示" aria-label="Permalink to &quot;4.8 TypeScript类型错误高亮提示&quot;">​</a></h3><p>这样似乎看不出TypeScript的优势，我们丰富下这个demo，来看看TypeScript的好处。</p><p>我们加一个<code>addSize</code>方法，用来增加尺寸：</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> addSize </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#BABED8;">size</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">lg</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;"> </span><span style="color:#676E95;font-style:italic;">// 给size变量赋值为Size类型中定义好的值是没问题的</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#BABED8;"> addSize </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#676E95;font-style:italic;">// 记得返回哦</span></span></code></pre></div><p>在<code>template</code>中使用该方法：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">type</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">button</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">@click</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">addSize</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">Add size</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">button</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>如果将size赋值为Size类型定义的值，比如：<code>large</code>，<a href="https://vuejs.github.io/vetur/" target="_blank" rel="noreferrer">Vetur</a>类型检查马上就会提示，相应的赋值代码也会出现红色波浪下划线：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/93aa431338b74f2083cebfaa3686a293~tplv-k3u1fbpfcp-watermark.image" alt="ts.png"></p><p>这时我们能够立即警觉：</p><blockquote><p>这里的代码可能写得有问题</p></blockquote><p>💡提示：<a href="https://marketplace.visualstudio.com/items?itemName=octref.vetur" target="_blank" rel="noreferrer">Vetur</a>是一款VSCode插件，用来做<code>.vue</code>文件的语法高亮和TypeScript类型检查等。</p><p>非常感谢你能阅读到这里，还有最后5分钟就阅读完了，通过小结巩固下学到的知识，然后喝杯水放松下吧😋</p><h3 id="_4-9-小结" tabindex="-1">4.9 小结 <a class="header-anchor" href="#_4-9-小结" aria-label="Permalink to &quot;4.9 小结&quot;">​</a></h3><p><code>&lt;script&gt;</code>部分基本就是这些，我们做一个简单的小结：</p><ol><li>defineComponent方法用于定义Vue组件</li><li>Vue组件的名字通过name属性来定义，名字可以用来唯一区分一个组件</li><li>Vue组件通过props属性来与外界进行数据交互</li><li>setup方法是Vue3 Composite API的入口</li><li>使用Vue组件和使用html元素差不多，只是需要先导入、声明组件才能使用</li><li>ref用于返回一个响应式对象</li><li><code>lang=&quot;ts&quot;</code>用来支持TypeScript</li></ol><h2 id="_5-style-分析" tabindex="-1">5 &lt;style&gt; 分析 <a class="header-anchor" href="#_5-style-分析" aria-label="Permalink to &quot;5 \\&lt;style\\&gt; 分析&quot;">​</a></h2><p>最后再来看下<code>&lt;style&gt;</code>部分。</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">style</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">scoped</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#FFCB6B;">a</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">#</span><span style="color:#BABED8;">42b983</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">label</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">margin</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">0.5em</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">font-weight</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> bold</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"></span>
<span class="line"><span style="color:#FFCB6B;">code</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">background-color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">#</span><span style="color:#BABED8;">eee</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">padding</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">2px</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">4px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">border-radius</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#F78C6C;">4px</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#B2CCD6;">color</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">#</span><span style="color:#BABED8;">304455</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">style</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>看着和写CSS没什么区别，只是有一点不一样（前面也提到过），就是<code>&lt;style&gt;</code>标签中增加了一个<code>scoped</code>属性，这个属性用来定义局部样式，里面写的样式只针对当前组件生效。</p><h3 id="_5-1-局部样式" tabindex="-1">5.1 局部样式 <a class="header-anchor" href="#_5-1-局部样式" aria-label="Permalink to &quot;5.1 局部样式&quot;">​</a></h3><p>为了理解局部样式的含义，我们在其他组件中也写一个<code>&lt;code&gt;</code>标签，看下它的样式是不是和HelloWorld组件中的一样，HelloWorld组件中，code标签样式是这样的（有一个灰色的背景色）：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/33af2073ba4b4ec2b56986cc9c90d435~tplv-k3u1fbpfcp-watermark.image" alt="code.png"></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">code {</span></span>
<span class="line"><span style="color:#babed8;">  background-color: #eee;</span></span>
<span class="line"><span style="color:#babed8;">  padding: 2px 4px;</span></span>
<span class="line"><span style="color:#babed8;">  border-radius: 4px;</span></span>
<span class="line"><span style="color:#babed8;">  color: #304455;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>我们在App.vue中也写一个code标签：</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">code</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">Vue DevUI</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">code</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31adf601d7bf424cb668f4a50fcced1f~tplv-k3u1fbpfcp-watermark.image" alt="App.vue.png"></p><p>发现在HelloWorld组件的style中写的样式并不会影响App组件中的code，这就是局部样式。</p><p>通过对比两者的html元素，发现HelloWorld组件中的元素都加上了一个<code>data-v-</code>开头的特殊属性，相应的css规则也加上了这个选择器。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e63dd660150492b8dfe39225e3ee177~tplv-k3u1fbpfcp-watermark.image" alt="scoped.png"></p><p>这一点和Angular中的<code>encapsulation</code>属性非常类似。</p><h3 id="_5-2-vite-热更新-style" tabindex="-1">5.2 Vite 热更新 - style <a class="header-anchor" href="#_5-2-vite-热更新-style" aria-label="Permalink to &quot;5.2 Vite 热更新 - style&quot;">​</a></h3><p>除了<code>template</code>和<code>script</code>的热更新，Vite也支持<code>style</code>样式的热更新，一样的丝滑，就不再赘述。</p><h2 id="_6-小结" tabindex="-1">6 小结 <a class="header-anchor" href="#_6-小结" aria-label="Permalink to &quot;6 小结&quot;">​</a></h2><p>通过本文，我们使用Vite启动了一个初始的项目工程，并且对Vue组件有了一个初步的认识，现在做个简单的小结巩固下吧。</p><ol><li>先是搭建了一个Vue3+TypeScript+Vite的工程</li><li>然后了解了一下Vue组件的整体结构（<code>.vue</code>文件，template+script+style）</li><li>接着对template、script、style区块进行了单独的分析</li><li>template和html很类似，只是增加了一些Vue特有的<code>模板语法</code>，如<code>文本插值</code>、事件绑定等</li><li>script是定义组件逻辑的地方，可以通过<code>lang=&quot;ts&quot;</code>支持TypeScript</li><li><code>defineComponent</code>和<code>ref</code>是Vue提供的两个非常常用的方法，defineComponent用来定义Vue组件，ref用来生成一个响应式的ref对象</li><li>defineComponent方法的参数是一个对象，其中的<code>name</code>属性用来定义Vue组件的名字，使用组件时通过名字引用</li><li>使用Vue组件和使用html标签很类似，只是需要先导入和声明组件</li><li><code>props</code>属性用来定义组件与外部交互的API，是组件设计的关键</li><li><code>setup</code>方法是Vue3 <code>Composite API</code>的入口，它会在组件生成之前、props解析之后执行</li><li>style用来编写组件的样式，可以通过<code>scoped</code>支持只对当前组件生效的局部样式</li></ol><p>参考：</p><p><a href="https://cn.vuejs.org/" target="_blank" rel="noreferrer">Vue3 中文文档</a></p>`,122);function b(p,g,h,m,f,B){const l=o("EditInfo");return t(),c("div",null,[y,s("ul",null,[s("li",null,[a("首先就是第2行的双大括号包裹的部分"),s("code",null,r(p.msg),1),a("，这和我们之前写的html有点不一样，这是一种Vue的模板语法，叫"),u,a("，里面的msg是组件的变量，变量的值会被渲染到"),D,a("标签里面。")])]),F,i(l,{time:"2021年08月07日 21:19",title:"阅读 4177 ·  点赞 51 ·  评论 7 ·  收藏 38"})])}const k=n(d,[["render",b]]);export{C as __pageData,k as default};