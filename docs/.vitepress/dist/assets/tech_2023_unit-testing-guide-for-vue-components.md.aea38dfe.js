import{_ as a,B as n,o as l,c as p,G as e,Q as o}from"./chunks/framework.1fee3549.js";const B=JSON.parse('{"title":"前端 Vuer，请收好这份《Vue组件单元测试》宝典，给自己多一些安全感","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2023/unit-testing-guide-for-vue-components.md","filePath":"tech/2023/unit-testing-guide-for-vue-components.md"}'),t={name:"tech/2023/unit-testing-guide-for-vue-components.md"},c=o(`<h1 id="前端-vuer-请收好这份《vue组件单元测试》宝典-给自己多一些安全感" tabindex="-1">前端 Vuer，请收好这份《Vue组件单元测试》宝典，给自己多一些安全感 <a class="header-anchor" href="#前端-vuer-请收好这份《vue组件单元测试》宝典-给自己多一些安全感" aria-label="Permalink to &quot;前端 Vuer，请收好这份《Vue组件单元测试》宝典，给自己多一些安全感&quot;">​</a></h1><p>作为一名前端，在做业务开发的过程中，你是否曾经：</p><ul><li>因为担心上线之后出bug，而反复手工验证自己负责的模块</li><li>不敢修改现有的“屎山”（别人写的或者是自己1年前写的）代码，从而不断地编写if/else</li><li>发现业务中有很多重复的代码，每次一改好多地方都要改，但又不敢重构，担心重构之后出bug</li><li>战战兢兢地修复一个陈年bug，就怕引起N个新bug</li></ul><p>如果你中了以上任何一条，说明你现在缺乏安全感，你担心、你害怕、你不敢、你战战兢兢、你如履薄冰。</p><p>每天写代码都处在担惊受怕当中，程序员的尊严何在！</p><p>程序员的安全感要自己给自己，是时候改变现状了！</p><p>我们有很多方法可以给自己安全感，比如：</p><ul><li>配置代码检测工具 ESLint</li><li>安装拼写检查插件 Code Spell Checker</li><li>代码评审 Code Review</li><li>结对编程 Pair programming</li><li>编写单元测试 Unit Test</li></ul><p>本文主要给大家介绍如何在 Vue 项目中编写单元测试。</p><h2 id="_1-搭环境" tabindex="-1">1 搭环境 <a class="header-anchor" href="#_1-搭环境" aria-label="Permalink to &quot;1 搭环境&quot;">​</a></h2><p>我们的单元测试环境基于 <code>vitest</code> + <code>@vue/test-utils</code>。</p><p>前提：你需要有一个 Vue 项目，没有的话可以参考 <a href="https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project" target="_blank" rel="noreferrer">Vite</a> 官网进行创建。</p><p>第一步，在你的 Vue 项目中安装必要的依赖包。</p><div class="language-shell"><button title="Copy Code" class="copy"></button><span class="lang">shell</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#FFCB6B;">npm</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">i</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">-D</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">vitest</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">@vue/test-utils</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">happy-dom</span><span style="color:#BABED8;"> </span><span style="color:#C3E88D;">@vitest/coverage-v8</span></span></code></pre></div><p>在 <code>vite.config.ts</code> 文件中增加以下配置。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">defineConfig</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitest/config</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> vue </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vitejs/plugin-vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">defineConfig</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">plugins</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> [</span><span style="color:#82AAFF;">vue</span><span style="color:#BABED8;">()]</span><span style="color:#89DDFF;">,</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 新增</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">test</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">environment</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">happy-dom</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>在 <code>package.json</code> 文件中增加相应的脚本命令</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;dev&quot;: &quot;vite&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;build&quot;: &quot;vue-tsc &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;preview&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 新增</span></span>
<span class="line"><span style="color:#babed8;">    &quot;test&quot;: &quot;vitest&quot;</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span></code></pre></div><p>我们尝试执行以下命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm test</span></span></code></pre></div><p>会发现控制台会打印以下日志：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ npm test</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&gt; vue3-vite@0.0.0 test</span></span>
<span class="line"><span style="color:#babed8;">&gt; vitest</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"> DEV  v0.33.0 /vue3-vite-demo</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">include: **/*.{test,spec}.?(c|m)[jt]s?(x)</span></span>
<span class="line"><span style="color:#babed8;">exclude:  **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*</span></span>
<span class="line"><span style="color:#babed8;">watch exclude:  **/node_modules/**, **/dist/**</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">No test files found, exiting with code 1</span></span></code></pre></div><p>意思是：没有找到单元测试文件。</p><p>除此之外，我们还能获取一些额外的信息，比如 include 表明了单元测试文件的命令格式：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">**/*.{test,spec}.?(c|m)[jt]s?(x)</span></span></code></pre></div><p>我们在 <code>src/components</code> 目录下创建一个 <code>HelloWorld.spec.ts</code> 文件。</p><div class="language-ts"><button title="Copy Code" class="copy"></button><span class="lang">ts</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">mount</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@vue/test-utils</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">describe</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">it</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">expect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitest</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> HelloWorld </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">./HelloWorld.vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">describe</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试 HelloWorld 组件</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">it</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试基本功能</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">async</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">wrapper</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">mount</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">HelloWorld</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">wrapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">exists</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBeTruthy</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>再次执行 <code>npm test</code> 命令</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ npm test</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"> ✓ src/components/HelloWorld.spec.ts (1)</span></span>
<span class="line"><span style="color:#babed8;">   ✓ 测试 HelloWorld 组件 (1)</span></span>
<span class="line"><span style="color:#babed8;">     ✓ 测试基本功能</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"> Test Files  1 passed (1)</span></span>
<span class="line"><span style="color:#babed8;">      Tests  1 passed (1)</span></span>
<span class="line"><span style="color:#babed8;">   Start at  23:34:49</span></span>
<span class="line"><span style="color:#babed8;">   Duration  126ms</span></span></code></pre></div><p>会提示：有一个单元测试用例通过。</p><p>这样我们的 Vue 项目单元测试环境就搭建成功，并且完成了第一个 Vue 单元测试用例🎉🎉</p><h2 id="_2-测什么" tabindex="-1">2 测什么 <a class="header-anchor" href="#_2-测什么" aria-label="Permalink to &quot;2 测什么&quot;">​</a></h2><p>有了单元测试环境，我们可以在其中任意发挥，给自己满满的安全感。</p><p>那么我们应该如何给 Vue 组件编写单元测试呢？</p><p>我们以 OpenTiny Vue 的 <a href="https://opentiny.design/tiny-vue/zh-CN/os-theme/components/date-picker" target="_blank" rel="noreferrer">DatePicker</a> 组件为例。</p><p>效果图：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9bb12522aab4a99a967926d6c77129f~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>我们可以按照以下步骤编写单元测试用例：</p><h3 id="step-1-测试默认行为" tabindex="-1">Step 1：测试默认行为 <a class="header-anchor" href="#step-1-测试默认行为" aria-label="Permalink to &quot;Step 1：测试默认行为&quot;">​</a></h3><ul><li>测试基本功能：点击日期输入框，应该弹出日期选择面板，点击日期选择面板中的日期，面板消失，并在输入框中显示选中的日期</li><li>测试清除日期：鼠标移到已经选择日期的输入框中，应该出现清除日期的图标按钮，点击清除日期图标，输入框中的日期被清除</li><li>...</li></ul><h3 id="step-2-测试每一个单独的-api" tabindex="-1">Step 2：测试每一个单独的 API <a class="header-anchor" href="#step-2-测试每一个单独的-api" aria-label="Permalink to &quot;Step 2：测试每一个单独的 API&quot;">​</a></h3><ul><li>测试 disabled 属性：设置 disabled 属性之后，日期输入框应该变成禁用状态，点击输入框，不会弹出日期选择面板</li><li>测试 clearable 属性：设置 clearable 为 false 之后，鼠标移到输入框上，不显示清除日期的图标</li><li>...</li></ul><h3 id="steps-3-测试-api-的边界值" tabindex="-1">Steps 3：测试 API 的边界值 <a class="header-anchor" href="#steps-3-测试-api-的边界值" aria-label="Permalink to &quot;Steps 3：测试 API 的边界值&quot;">​</a></h3><ul><li>测试日期越界：设置 v-model 的值为 <code>&quot;2023-07-32&quot;</code>，应该不显示日期</li><li>测试错误格式的日期：设置 v-model 的值为数值 <code>20230713</code>，应该不显示日期</li><li>...</li></ul><h3 id="steps-4-测试-api-之间的组合" tabindex="-1">Steps 4：测试 API 之间的组合 <a class="header-anchor" href="#steps-4-测试-api-之间的组合" aria-label="Permalink to &quot;Steps 4：测试 API 之间的组合&quot;">​</a></h3><ul><li>测试 type/format 三个属性之间的组合：设置 <code>type=&quot;week&quot;</code> 和 <code>format=&quot;yyyy 年第 WW 周&quot;</code>，日期选择面板应该变成选择周，选择5月7日到13日这周之后，输入框中显示的内容应该是 <code>2023 年第19周</code></li><li>...</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;tiny-date-picker</span></span>
<span class="line"><span style="color:#babed8;">  v-model=&quot;value&quot;</span></span>
<span class="line"><span style="color:#babed8;">  type=&quot;week&quot;</span></span>
<span class="line"><span style="color:#babed8;">  format=&quot;yyyy 年第 WW 周&quot;</span></span>
<span class="line"><span style="color:#babed8;">&gt;&lt;/tiny-date-picker&gt;</span></span></code></pre></div><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b2e17c19df74c88b663834387b8a5c4~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><h2 id="_3-怎么测" tabindex="-1">3 怎么测 <a class="header-anchor" href="#_3-怎么测" aria-label="Permalink to &quot;3 怎么测&quot;">​</a></h2><h3 id="单测三大件-describe-test-expect" tabindex="-1">单测三大件：describe / test / expect <a class="header-anchor" href="#单测三大件-describe-test-expect" aria-label="Permalink to &quot;单测三大件：describe / test / expect&quot;">​</a></h3><p>一个单元测试包含三个部分：</p><ul><li>describe 测试套，里面可以包含多个测试用例，</li><li>it(test) 测试用例</li><li>expect 断言语句</li></ul><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">describe</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">it</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">expect</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vitest</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#82AAFF;">describe</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试 HelloWorld 组件</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">it</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试基本功能</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">async</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">wrapper</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">mount</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">HelloWorld</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#BABED8;">wrapper</span><span style="color:#89DDFF;">.</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">wrapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">exists</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBeTruthy</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">wrapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">find</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.card</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">exists</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBeTruthy</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">it</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试 msg 属性</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">...</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><h3 id="模拟-vue-组件挂载-mount-和-wrapper" tabindex="-1">模拟 Vue 组件挂载：mount 和 wrapper <a class="header-anchor" href="#模拟-vue-组件挂载-mount-和-wrapper" aria-label="Permalink to &quot;模拟 Vue 组件挂载：mount 和 wrapper&quot;">​</a></h3><p>每个单元测试里面测试 Vue 组件的表现是否正常，需要借助 <code>@vue/test-utils</code> 的 mount 方法，模拟组件的挂载。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { mount } from &#39;@vue/test-utils&#39;</span></span>
<span class="line"><span style="color:#babed8;">import HelloWorld from &#39;./HelloWorld.vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const wrapper = mount(HelloWorld, {</span></span>
<span class="line"><span style="color:#babed8;">  props: {</span></span>
<span class="line"><span style="color:#babed8;">    msg: &#39;OpenTiny&#39;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><p>用 mount 函数包裹组件，得到的是一个挂载好的组件对象，该对象包含了一系列实用的方法可以用于组件的测试。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0481e075139643cca71f711a212f2f28~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>比较常用的有：</p><ul><li>find：寻找组件内部的 DOM 节点</li><li>findComponent：寻找子组件</li><li>exists：判断组件或元素是否存在</li><li>attributes：获取 DOM 节点的属性</li><li>classes：获取 DOM 节点的 class</li><li>...</li></ul><p>更多 wrapper 方法请参考：<a href="https://test-utils.vuejs.org/api/#wrapper-methods" target="_blank" rel="noreferrer">Vue Test Utils 官网文档</a></p><h3 id="写单测就是写断言" tabindex="-1">写单测就是写断言 <a class="header-anchor" href="#写单测就是写断言" aria-label="Permalink to &quot;写单测就是写断言&quot;">​</a></h3><p>有了 wrapper，就可以对 Vue 组件做断言。</p><p>比如以下断言用于判断 DOM 节点 <code>.card</code> 是否存在，<code>toBeTruthy()</code>用于断言一个值是否为 true。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">expect(wrapper.find(&#39;.card&#39;).exists()).toBeTruthy()</span></span></code></pre></div><p>常见的断言类型有：</p><ul><li>toBe：用于断言原始类型是否相等，比如：<code>expect(1+1).toBe(2)</code></li><li>toBeTruthy：用于断言一个值是否为 true</li><li>not：用于否定断言，比如：<code>expect(1+1).toBe(3)</code></li><li>toBeGreaterThan：断言实际值是否大于接收到的值</li><li>toEqual：断言实际值是否等于接收到的值或具有相同的结构（如果是对象，则递归比较它们），注意和 <code>toBe</code> 的区别</li><li>toContain：断言实际值是否在数组中</li><li>toMatch：断言字符串是否与正则表达式或字符串匹配</li><li>toHaveBeenCalled：用于测试函数是否已被调用</li><li>...</li></ul><p>更多断言类型请参考：<a href="https://cn.vitest.dev/api/expect.html" target="_blank" rel="noreferrer">Vitest 官网</a></p><h3 id="一个-datepicker-组件的小例子" tabindex="-1">一个 DatePicker 组件的小例子 <a class="header-anchor" href="#一个-datepicker-组件的小例子" aria-label="Permalink to &quot;一个 DatePicker 组件的小例子&quot;">​</a></h3><p>测试 DatePicker 组件的基本功能：点击日期输入框，应该弹出日期选择面板。</p><div class="language-js"><button title="Copy Code" class="copy"></button><span class="lang">js</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#82AAFF;">it</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">测试 DatePicker 组件的基本功能</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">async</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">value</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#C792EA;">const</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">wrapper</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">=</span><span style="color:#F07178;"> </span><span style="color:#82AAFF;">mount</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">()</span><span style="color:#F07178;"> </span><span style="color:#C792EA;">=&gt;</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&lt;</span><span style="color:#FFCB6B;">DatePicker</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">={</span><span style="color:#BABED8;">value</span><span style="color:#89DDFF;">}&gt;&lt;/</span><span style="color:#FFCB6B;">DatePicker</span><span style="color:#89DDFF;">&gt;</span><span style="color:#F07178;">)</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">wrapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">exists</span><span style="color:#F07178;">())</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBe</span><span style="color:#F07178;">(</span><span style="color:#FF9CAC;">true</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 没有点击日期输入框之前，没有日期选择面板</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.tiny-date-picker</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">.</span><span style="color:#BABED8;">not</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBeTruthy</span><span style="color:#F07178;">()</span></span>
<span class="line"></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;font-style:italic;">await</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">wrapper</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">find</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">input</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">trigger</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">focus</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">)</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">  </span><span style="color:#676E95;font-style:italic;">// 点击日期输入框之后，出现日期选择面板</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#82AAFF;">expect</span><span style="color:#F07178;">(</span><span style="color:#BABED8;">document</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">querySelector</span><span style="color:#F07178;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">.tiny-date-picker</span><span style="color:#89DDFF;">&#39;</span><span style="color:#F07178;">))</span><span style="color:#89DDFF;">.</span><span style="color:#82AAFF;">toBeTruthy</span><span style="color:#F07178;">()</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span></code></pre></div><p>参考：</p><ul><li><a href="https://cn.vitest.dev/guide/" target="_blank" rel="noreferrer">Vitest 官网</a></li><li><a href="https://test-utils.vuejs.org/guide/" target="_blank" rel="noreferrer">Vue Test Utils 官网</a></li></ul>`,73);function r(i,y,F,D,d,u){const s=n("EditInfo");return l(),p("div",null,[c,e(s,{time:"2023-07-14 07:44",title:"10295展现 · 366阅读 · 6点赞 · 0评论 · 14收藏"})])}const A=a(t,[["render",r]]);export{B as __pageData,A as default};
