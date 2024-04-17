import{_ as a,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"从0到1搭建Vue组件库10：如何实现组件的按需打包📦","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/0-to-1-build-vue-component-library-10.md","filePath":"tech/2021/0-to-1-build-vue-component-library-10.md"}'),c={name:"tech/2021/0-to-1-build-vue-component-library-10.md"},t=o(`<h1 id="从0到1搭建vue组件库10-如何实现组件的按需打包📦" tabindex="-1">从0到1搭建Vue组件库10：如何实现组件的按需打包📦 <a class="header-anchor" href="#从0到1搭建vue组件库10-如何实现组件的按需打包📦" aria-label="Permalink to &quot;从0到1搭建Vue组件库10：如何实现组件的按需打包📦&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png" alt="image"></p><h2 id="_0-上期直播回顾" tabindex="-1">0 上期直播回顾 <a class="header-anchor" href="#_0-上期直播回顾" aria-label="Permalink to &quot;0 上期直播回顾&quot;">​</a></h2><p>上一次带着大家将【Vue DevUI开源指南】系列直播1-6期的所有内容串起来了，并诞生了<a href="https://github.com/57code/mini-vue-devui" target="_blank" rel="noreferrer">mini-vue-devui</a>项目，<code>mini-vue-devui</code>是一个迷你版的组件库产品，目前包含：</p><ol><li><code>vite</code>+<code>vue3</code>+<code>ts</code>+<code>jsx</code>+<code>sass</code>的基础工程</li><li>基于<code>vitepress</code>+<code>vitepress-theme-demoblock</code>的文档系统</li><li><code>jest</code>+<code>@vue/test-utils</code>的单元测试环境</li><li>一个用<code>jsx</code>编写的初版Tree组件</li><li>一个初版<code>devui-cli</code>脚手架</li></ol><p>直播的最后，我们快速过了一下单元测试环境搭建的流程，但并没有手把手教，而是留了一个作业，这个作业最后由<a href="https://github.com/57code/mini-vue-devui/pull/1" target="_blank" rel="noreferrer">QbjGKNick</a>同学率先提交。</p><p>最终的 效果如下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f9d7006e8fd145de91e9dde7b7bd02b5~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>上一次直播的文章：</p><ol><li><a href="https://juejin.cn/post/7024443197854056456" target="_blank" rel="noreferrer">手把手带你从0到1搭建一个vue3组件库：mini-vue-devui</a></li><li><a href="https://juejin.cn/post/7023409900239716382" target="_blank" rel="noreferrer">【我要做开源】给 vue devui 组件库项目增加单元测试</a></li></ol><p>但这就是一个组件库的全部了吗？</p><p>这只是冰山一角而已。</p><p>这一期我们将继续之前的直播，完善<code>mini-vue-devui</code>项目，打通组件库按需构建的流程，并增加<code>Monorepo</code>支持。</p><h2 id="_1-组件库入口文件" tabindex="-1">1 组件库入口文件 <a class="header-anchor" href="#_1-组件库入口文件" aria-label="Permalink to &quot;1 组件库入口文件&quot;">​</a></h2><p><code>devui/vue-devui.ts</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import type { App } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import TreeInstall, { Tree } from &#39;./tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const installs = [</span></span>
<span class="line"><span style="color:#babed8;">  TreeInstall,</span></span>
<span class="line"><span style="color:#babed8;">]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export {</span></span>
<span class="line"><span style="color:#babed8;">  Tree,</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default {</span></span>
<span class="line"><span style="color:#babed8;">  version: &#39;0.0.1&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  install(app: App): void {</span></span>
<span class="line"><span style="color:#babed8;">    installs.forEach((p) =&gt; app.use(p as any))</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="_2-增加全量构建脚本" tabindex="-1">2 增加全量构建脚本 <a class="header-anchor" href="#_2-增加全量构建脚本" aria-label="Permalink to &quot;2 增加全量构建脚本&quot;">​</a></h2><p>新增<code>devui-cli/commands/build.js</code>文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const path = require(&#39;path&#39;)</span></span>
<span class="line"><span style="color:#babed8;">const fs = require(&#39;fs&#39;)</span></span>
<span class="line"><span style="color:#babed8;">const { defineConfig, build } = require(&#39;vite&#39;)</span></span>
<span class="line"><span style="color:#babed8;">const vue = require(&#39;@vitejs/plugin-vue&#39;)</span></span>
<span class="line"><span style="color:#babed8;">const vueJsx = require(&#39;@vitejs/plugin-vue-jsx&#39;)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const entryDir = path.resolve(__dirname, &#39;devui-vue/devui&#39;)</span></span>
<span class="line"><span style="color:#babed8;">const outputDir = path.resolve(__dirname, &#39;devui-vue/build&#39;)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const baseConfig = defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">  configFile: false,</span></span>
<span class="line"><span style="color:#babed8;">  publicDir: false,</span></span>
<span class="line"><span style="color:#babed8;">  plugins: [ vue(), vueJsx() ]</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const rollupOptions = {</span></span>
<span class="line"><span style="color:#babed8;">  external: [&#39;vue&#39;, &#39;vue-router&#39;],</span></span>
<span class="line"><span style="color:#babed8;">  output: {</span></span>
<span class="line"><span style="color:#babed8;">    globals: {</span></span>
<span class="line"><span style="color:#babed8;">      vue: &#39;Vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">//全量构建</span></span>
<span class="line"><span style="color:#babed8;">const buildAll = async () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  await build(defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">    ...baseConfig,</span></span>
<span class="line"><span style="color:#babed8;">    build: {</span></span>
<span class="line"><span style="color:#babed8;">      rollupOptions,</span></span>
<span class="line"><span style="color:#babed8;">      lib: {</span></span>
<span class="line"><span style="color:#babed8;">        entry: path.resolve(entryDir, &#39;vue-devui.ts&#39;),</span></span>
<span class="line"><span style="color:#babed8;">        name: &#39;vue-devui&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        fileName: &#39;vue-devui&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        formats: [&#39;es&#39;, &#39;umd&#39;]</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      outDir: outputDir</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }))</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const buildLib = async () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  await buildAll()</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">buildLib()</span></span></code></pre></div><h2 id="_3-修改package-json" tabindex="-1">3 修改<code>package.json</code> <a class="header-anchor" href="#_3-修改package-json" aria-label="Permalink to &quot;3 修改\`package.json\`&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;main&quot;: &quot;vue-devui.umd.js&quot;,</span></span>
<span class="line"><span style="color:#babed8;">&quot;module&quot;: &quot;vue-devui.es.js&quot;,</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&quot;build:components&quot;: &quot;node ./devui-cli/commands/build.js&quot;,</span></span>
<span class="line"><span style="color:#babed8;">&quot;build:lib&quot;: &quot;yarn predev &amp;&amp; yarn build:components &amp;&amp; cp package.json build &amp;&amp; cp README.md build&quot;,</span></span></code></pre></div><p>测试全量组件库构建</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn build:lib</span></span></code></pre></div><p>使用组件库</p><p><code>src/main.ts</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import App from &#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// import Tree from &#39;../devui/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;">import MiniVueDevUI from &#39;../build&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">createApp(App)</span></span>
<span class="line"><span style="color:#babed8;">// .use(Tree)</span></span>
<span class="line"><span style="color:#babed8;"> .use(MiniVueDevUI)</span></span>
<span class="line"><span style="color:#babed8;">.mount(&#39;#app&#39;)</span></span></code></pre></div><p>启动</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn dev</span></span></code></pre></div><h2 id="_4-增加按需构建脚本" tabindex="-1">4 增加按需构建脚本 <a class="header-anchor" href="#_4-增加按需构建脚本" aria-label="Permalink to &quot;4 增加按需构建脚本&quot;">​</a></h2><p>修改<code>devui-cli/commands/build.js</code>文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const fsExtra = require(&#39;fs-extra&#39;)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 单组件按需构建</span></span>
<span class="line"><span style="color:#babed8;">const buildSingle = async (name) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  await build(defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">    ...baseConfig,</span></span>
<span class="line"><span style="color:#babed8;">    build: {</span></span>
<span class="line"><span style="color:#babed8;">      rollupOptions,</span></span>
<span class="line"><span style="color:#babed8;">      lib: {</span></span>
<span class="line"><span style="color:#babed8;">        entry: path.resolve(entryDir, name),</span></span>
<span class="line"><span style="color:#babed8;">        name: &#39;index&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        fileName: &#39;index&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        formats: [&#39;es&#39;, &#39;umd&#39;]</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      outDir: path.resolve(outputDir, name)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }))</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 生成组件的 package.json 文件</span></span>
<span class="line"><span style="color:#babed8;">const createPackageJson = (name) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  const fileStr = \`{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;name&quot;: &quot;\${name}&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;version&quot;: &quot;0.0.0&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;main&quot;: &quot;index.umd.js&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;module&quot;: &quot;index.es.js&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;style&quot;: &quot;style.css&quot;</span></span>
<span class="line"><span style="color:#babed8;">}\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  fsExtra.outputFile(</span></span>
<span class="line"><span style="color:#babed8;">    path.resolve(outputDir, \`\${name}/package.json\`),</span></span>
<span class="line"><span style="color:#babed8;">    fileStr,</span></span>
<span class="line"><span style="color:#babed8;">    &#39;utf-8&#39;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const buildLib = async () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  await buildAll()</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 获取组件名称组成的数组</span></span>
<span class="line"><span style="color:#babed8;">  const components = fs.readdirSync(entryDir).filter(name =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    const componentDir = path.resolve(entryDir, name)</span></span>
<span class="line"><span style="color:#babed8;">    const isDir = fs.lstatSync(componentDir).isDirectory()</span></span>
<span class="line"><span style="color:#babed8;">    return isDir &amp;&amp; fs.readdirSync(componentDir).includes(&#39;index.ts&#39;)</span></span>
<span class="line"><span style="color:#babed8;">  })</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 循环一个一个组件构建</span></span>
<span class="line"><span style="color:#babed8;">  for(const name of components) {</span></span>
<span class="line"><span style="color:#babed8;">    // 构建单组件</span></span>
<span class="line"><span style="color:#babed8;">    await buildSingle(name)</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 生成组件的 package.json 文件</span></span>
<span class="line"><span style="color:#babed8;">    createPackageJson(name)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">buildLib()</span></span></code></pre></div><p>测试按需构建</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn build:lib</span></span></code></pre></div><p>使用组件库</p><p><code>src/main.ts</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import App from &#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// import Tree from &#39;../devui/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;">// import MiniVueDevUI from &#39;../build&#39;</span></span>
<span class="line"><span style="color:#babed8;">import Tree from &#39;../build/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">createApp(App)</span></span>
<span class="line"><span style="color:#babed8;">// .use(Tree)</span></span>
<span class="line"><span style="color:#babed8;">// .use(MiniVueDevUI)</span></span>
<span class="line"><span style="color:#babed8;">.use(Tree)</span></span>
<span class="line"><span style="color:#babed8;">.mount(&#39;#app&#39;)</span></span></code></pre></div><p>启动</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn dev</span></span></code></pre></div><p>正常！</p><p>参考：</p><ul><li><a href="https://gitee.com/devui/vue-devui/pulls/93" target="_blank" rel="noreferrer">build: 增加按需打包脚本</a></li><li><a href="https://cn.vitejs.dev/guide/build.html#library-mode" target="_blank" rel="noreferrer">vite库模式构建生产版本</a></li></ul><h2 id="devui-开源招募" tabindex="-1">DevUI 开源招募 <a class="header-anchor" href="#devui-开源招募" aria-label="Permalink to &quot;DevUI 开源招募&quot;">​</a></h2><p>加入<a href="https://devui.design/" target="_blank" rel="noreferrer">DevUI</a>开源生态建设你将收获什么？</p><p>直接的价值：</p><ol><li>通过打造一个实际的<a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">vue3组件库项目</a>，学习最新的<code>Vite</code>+<code>Vue3</code>+<code>TypeScript</code>+<code>JSX</code>技术</li><li>学习从0到1搭建一个自己的组件库的整套流程和方法论，包括组件库工程化、组件的设计和开发等</li><li>为自己的简历和职业生涯添彩，参与过优秀的开源项目，这本身就是受面试官青睐的亮点</li><li>结识一群优秀的、热爱学习、热爱开源的小伙伴，大家一起打造一个伟大的产品</li></ol><p>长远的价值：</p><ol><li>打造个人品牌，提升个人影响力</li><li>培养良好的编码习惯</li><li>获得华为云DevUI团队的荣誉&amp;认可和定制小礼物</li><li>成为PMC&amp;Committer之后还能参与DevUI整个开源生态的决策和长远规划，培养自己的管理和规划能力</li><li>未来有更多机会和可能</li></ol><p>DevUI开源，未来可期！</p><p>添加DevUI小助手微信：<code>devui-official</code>，拉你到我们的官方交流群。</p><p>这是我们的开源故事：</p><p><a href="https://juejin.cn/post/7029092585452863525" target="_blank" rel="noreferrer">DevUI开源的故事</a></p>`,51);function i(r,b,d,u,y,m){const s=n("EditInfo");return e(),l("div",null,[t,p(s,{time:"2021年11月11日 20:46",title:"阅读 4017 ·  点赞 26 ·  评论 6 ·  收藏 21"})])}const g=a(c,[["render",i]]);export{h as __pageData,g as default};
