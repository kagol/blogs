import{_ as a,B as e,o as n,c as l,G as p,Q as t}from"./chunks/framework.1fee3549.js";const v=JSON.parse('{"title":"从0到1搭建Vue组件库04：使用 Vite 搭建一个支持 TypeScript / JSX 的 Vue3 组件库工程","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/0-to-1-build-vue-component-library-4.md","filePath":"tech/2021/0-to-1-build-vue-component-library-4.md"}'),o={name:"tech/2021/0-to-1-build-vue-component-library-4.md"},c=t(`<h1 id="从0到1搭建vue组件库04-使用-vite-搭建一个支持-typescript-jsx-的-vue3-组件库工程" tabindex="-1">从0到1搭建Vue组件库04：使用 Vite 搭建一个支持 TypeScript / JSX 的 Vue3 组件库工程 <a class="header-anchor" href="#从0到1搭建vue组件库04-使用-vite-搭建一个支持-typescript-jsx-的-vue3-组件库工程" aria-label="Permalink to &quot;从0到1搭建Vue组件库04：使用 Vite 搭建一个支持 TypeScript / JSX 的 Vue3 组件库工程&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png" alt="image"></p><p>最近在与<a href="https://space.bilibili.com/480140591" target="_blank" rel="noreferrer">村长</a>老师一起做<a href="https://www.bilibili.com/video/BV1Z64y187dR" target="_blank" rel="noreferrer">直播</a>，给大家分享<a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">vue devui</a>开源组件库的建设，前面三期以 tree 组件为栗子🌰，介绍了如何设计和开发Vue组件：</p><ol><li><a href="https://juejin.cn/post/7009273646884028430" target="_blank" rel="noreferrer">Vue DevUI开源指南01：提交我的第一次pr</a></li><li><a href="https://juejin.cn/post/7011535488171376671" target="_blank" rel="noreferrer">Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件</a></li><li><a href="https://juejin.cn/post/7015023354847428645" target="_blank" rel="noreferrer">Vue DevUI开源指南03：如何给 tree 组件增加展开/收起功能</a></li></ol><p>这次给大家分享组件库工程化相关的内容。</p><p>后续的直播也会分成两条线：</p><ol><li>一条是组件的设计和实现</li><li>另一条是组件库的工程化</li></ol><p>欢迎大家持续关注～</p><h2 id="上一次直播内容回顾" tabindex="-1">上一次直播内容回顾 <a class="header-anchor" href="#上一次直播内容回顾" aria-label="Permalink to &quot;上一次直播内容回顾&quot;">​</a></h2><ul><li>先是停下来，给上上次的tree组件（渲染嵌套的多层节点）增加单元测试</li><li>然后完善tree组件，实现展开/收起功能</li><li>并使用vue3的组合式API，对该功能进行重构，实现useToggle方法，将该功能从setup中抽离出来</li></ul><p>最终实现的效果：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc92cb2779bb4089a00ba7b0d2fc5ae9~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="_1-创建基础项目工程" tabindex="-1">1 创建基础项目工程 <a class="header-anchor" href="#_1-创建基础项目工程" aria-label="Permalink to &quot;1 创建基础项目工程&quot;">​</a></h2><p>使用yarn创建一个vite工程，并使用<code>vue-ts</code>（Vue3+TypeScript）模板。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn create vite vite-demo --template vue-ts</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"># or</span></span>
<span class="line"><span style="color:#babed8;"># npm init vite@latest vite-demo -- --template vue-ts</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ yarn create vite vite-demo --template vue-ts</span></span>
<span class="line"><span style="color:#babed8;">yarn create v1.22.10</span></span>
<span class="line"><span style="color:#babed8;">[1/4] 🔍  Resolving packages...</span></span>
<span class="line"><span style="color:#babed8;">[2/4] 🚚  Fetching packages...</span></span>
<span class="line"><span style="color:#babed8;">[3/4] 🔗  Linking dependencies...</span></span>
<span class="line"><span style="color:#babed8;">[4/4] 🔨  Building fresh packages...</span></span>
<span class="line"><span style="color:#babed8;">success Installed &quot;create-vite@2.6.6&quot; with binaries:</span></span>
<span class="line"><span style="color:#babed8;">      - create-vite</span></span>
<span class="line"><span style="color:#babed8;">      - cva</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Scaffolding project in /kagol/vite-demo...</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Done. Now run:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  cd vite-demo</span></span>
<span class="line"><span style="color:#babed8;">  yarn</span></span>
<span class="line"><span style="color:#babed8;">  yarn dev</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">✨  Done in 5.46s.</span></span></code></pre></div><p>创建完成之后，非常友好地提示了下一步要做什么：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">cd vite-demo</span></span>
<span class="line"><span style="color:#babed8;">  yarn</span></span>
<span class="line"><span style="color:#babed8;">  yarn dev</span></span></code></pre></div><p>我们按照提示的步骤一步一步把项目先启动起来。</p><h3 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ yarn</span></span>
<span class="line"><span style="color:#babed8;">yarn install v1.22.10</span></span>
<span class="line"><span style="color:#babed8;">warning package.json: No license field</span></span>
<span class="line"><span style="color:#babed8;">info No lockfile found.</span></span>
<span class="line"><span style="color:#babed8;">warning vite-demo@0.0.0: No license field</span></span>
<span class="line"><span style="color:#babed8;">[1/4] 🔍  Resolving packages...</span></span>
<span class="line"><span style="color:#babed8;">[2/4] 🚚  Fetching packages...</span></span>
<span class="line"><span style="color:#babed8;">[3/4] 🔗  Linking dependencies...</span></span>
<span class="line"><span style="color:#babed8;">[4/4] 🔨  Building fresh packages...</span></span>
<span class="line"><span style="color:#babed8;">success Saved lockfile.</span></span>
<span class="line"><span style="color:#babed8;">✨  Done in 7.33s.</span></span></code></pre></div><h3 id="本地启动" tabindex="-1">本地启动 <a class="header-anchor" href="#本地启动" aria-label="Permalink to &quot;本地启动&quot;">​</a></h3><p>本地启动直接执行的是不带任何参数的<code>vite</code>命令</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;dev&quot;: &quot;vite&quot;,</span></span></code></pre></div><p>启动速度非常快，只花了402ms</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ yarn dev</span></span>
<span class="line"><span style="color:#babed8;">yarn run v1.22.10</span></span>
<span class="line"><span style="color:#babed8;">warning package.json: No license field</span></span>
<span class="line"><span style="color:#babed8;">$ vite</span></span>
<span class="line"><span style="color:#babed8;">Pre-bundling dependencies:</span></span>
<span class="line"><span style="color:#babed8;">  vue</span></span>
<span class="line"><span style="color:#babed8;">(this will be run only when your dependencies or config have changed)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  vite v2.6.5 dev server running at:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  &gt; Local: http://localhost:3000/</span></span>
<span class="line"><span style="color:#babed8;">  &gt; Network: use \`--host\` to expose</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  ready in 402ms.</span></span></code></pre></div><h3 id="浏览器看效果" tabindex="-1">浏览器看效果 <a class="header-anchor" href="#浏览器看效果" aria-label="Permalink to &quot;浏览器看效果&quot;">​</a></h3><p>在浏览器地址栏输入以下链接查看效果：</p><p><code>http://localhost:3000/</code></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e96beb1cf3274b92bb883cb0a30f8d33~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h3 id="构建生产包" tabindex="-1">构建生产包 <a class="header-anchor" href="#构建生产包" aria-label="Permalink to &quot;构建生产包&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;build&quot;: &quot;vue-tsc --noEmit &amp;&amp; vite build&quot;,</span></span></code></pre></div><p>生产构建的脚本，<code>vue-ts</code>模板和<code>vue</code>模板不一样的地方是，<code>vue-ts</code>模板增加了类型检查的命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">vue-tsc --noEmit</span></span></code></pre></div><p>在构建的过程中，会检查有没有类型错误，并提示出来。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ yarn build</span></span>
<span class="line"><span style="color:#babed8;">yarn run v1.22.10</span></span>
<span class="line"><span style="color:#babed8;">warning package.json: No license field</span></span>
<span class="line"><span style="color:#babed8;">$ vue-tsc --noEmit &amp;&amp; vite build</span></span>
<span class="line"><span style="color:#babed8;">vite v2.6.5 building for production...</span></span>
<span class="line"><span style="color:#babed8;">✓ 14 modules transformed.</span></span>
<span class="line"><span style="color:#babed8;">dist/assets/logo.03d6d6da.png    6.69 KiB</span></span>
<span class="line"><span style="color:#babed8;">dist/index.html                  0.48 KiB</span></span>
<span class="line"><span style="color:#babed8;">dist/assets/index.31b3d229.js    1.95 KiB / gzip: 1.03 KiB</span></span>
<span class="line"><span style="color:#babed8;">dist/assets/index.459f8680.css   0.34 KiB / gzip: 0.24 KiB</span></span>
<span class="line"><span style="color:#babed8;">dist/assets/vendor.2acfe60d.js   49.61 KiB / gzip: 19.93 KiB</span></span>
<span class="line"><span style="color:#babed8;">✨  Done in 11.09s.</span></span></code></pre></div><h2 id="_2-一些关键文件" tabindex="-1">2 一些关键文件 <a class="header-anchor" href="#_2-一些关键文件" aria-label="Permalink to &quot;2 一些关键文件&quot;">​</a></h2><p>使用<code>tree</code>命令看下目录结构</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$ tree -l 3</span></span>
<span class="line"><span style="color:#babed8;">/kagol/vite-demo</span></span>
<span class="line"><span style="color:#babed8;">├── README.md</span></span>
<span class="line"><span style="color:#babed8;">├── index.html</span></span>
<span class="line"><span style="color:#babed8;">├── package.json</span></span>
<span class="line"><span style="color:#babed8;">├── public</span></span>
<span class="line"><span style="color:#babed8;">|  └── favicon.ico</span></span>
<span class="line"><span style="color:#babed8;">├── src</span></span>
<span class="line"><span style="color:#babed8;">|  ├── App.vue</span></span>
<span class="line"><span style="color:#babed8;">|  ├── assets</span></span>
<span class="line"><span style="color:#babed8;">|  |  └── logo.png</span></span>
<span class="line"><span style="color:#babed8;">|  ├── components</span></span>
<span class="line"><span style="color:#babed8;">|  |  └── HelloWorld.vue</span></span>
<span class="line"><span style="color:#babed8;">|  ├── env.d.ts // vue-ts模板</span></span>
<span class="line"><span style="color:#babed8;">|  └── main.ts</span></span>
<span class="line"><span style="color:#babed8;">├── tsconfig.json // vue-ts模板</span></span>
<span class="line"><span style="color:#babed8;">└── vite.config.ts</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">directory: 4 file: 11</span></span></code></pre></div><h3 id="package-json" tabindex="-1">package.json <a class="header-anchor" href="#package-json" aria-label="Permalink to &quot;package.json&quot;">​</a></h3><p>一个开源项目，首先关注的是它的<code>package.json</code>文件，里面有该项目的基本信息、脚本命令和依赖库等信息。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;name&quot;: &quot;vite-demo&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;version&quot;: &quot;0.0.0&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;dev&quot;: &quot;vite&quot;, // 本地启动</span></span>
<span class="line"><span style="color:#babed8;">    &quot;build&quot;: &quot;vue-tsc --noEmit &amp;&amp; vite build&quot;, // 构建生产包，增加了vue-tsc类型检查 vue模板为 vite build</span></span>
<span class="line"><span style="color:#babed8;">    &quot;serve&quot;: &quot;vite preview&quot; // 预览生产包效果</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  &quot;dependencies&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;vue&quot;: &quot;^3.2.16&quot;</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  &quot;devDependencies&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;@vitejs/plugin-vue&quot;: &quot;^1.9.3&quot;, // 提供 Vue 3 单文件组件支持</span></span>
<span class="line"><span style="color:#babed8;">    &quot;typescript&quot;: &quot;^4.4.3&quot;, // vue-ts模板</span></span>
<span class="line"><span style="color:#babed8;">    &quot;vite&quot;: &quot;^2.6.4&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;vue-tsc&quot;: &quot;^0.3.0&quot; // volar的子包，vue3的ts类型检查工具（可选） vue-ts模板</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>一共有5个依赖</p><p>运行态依赖：vue</p><p>开发态依赖：</p><ul><li>vite</li><li>@vitejs/plugin-vue 提供 Vue 3 单文件组件支持的vite插件</li><li>typescript</li><li>vue-tsc vue3的类型检查工具，可选</li></ul><h3 id="vite-config-ts" tabindex="-1">vite.config.ts <a class="header-anchor" href="#vite-config-ts" aria-label="Permalink to &quot;vite.config.ts&quot;">​</a></h3><p>这个是vite的配置文件，里面主要引入了一个<code>@vitejs/plugin-vue</code>插件，用来为vue3单文件组件提供支持。</p><p>后续我们要支持<code>jsx</code>等其他功能，都可以通过配置相应的插件来提供支持。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span style="color:#babed8;">import vue from &#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// https://vitejs.dev/config/</span></span>
<span class="line"><span style="color:#babed8;">export default defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">  plugins: [vue()]</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><h3 id="tsconfig-json" tabindex="-1">tsconfig.json <a class="header-anchor" href="#tsconfig-json" aria-label="Permalink to &quot;tsconfig.json&quot;">​</a></h3><p>这个文件是<code>vue-ts</code>模板才有的，用来提供TypeScript支持。主要指定了一些ts的编译选项和需要编译的文件/文件夹。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  // 编译选项 https://www.tslang.cn/docs/handbook/compiler-options.html</span></span>
<span class="line"><span style="color:#babed8;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;target&quot;: &quot;esnext&quot;,              // 目标语言的版本</span></span>
<span class="line"><span style="color:#babed8;">    &quot;useDefineForClassFields&quot;: true, // https://www.typescriptlang.org/docs/handbook/release-notes/typescript-3-7.html#the-usedefineforclassfields-flag-and-the-declare-property-modifier</span></span>
<span class="line"><span style="color:#babed8;">    &quot;module&quot;: &quot;esnext&quot;,              // 指定生成代码的模块标准</span></span>
<span class="line"><span style="color:#babed8;">    &quot;moduleResolution&quot;: &quot;node&quot;,      // 决定如何处理模块</span></span>
<span class="line"><span style="color:#babed8;">    &quot;strict&quot;: true,                  // 启用所有严格类型检查选项</span></span>
<span class="line"><span style="color:#babed8;">    &quot;jsx&quot;: &quot;preserve&quot;,               // 在.tsx文件里支持JSX https://www.tslang.cn/docs/handbook/jsx.html</span></span>
<span class="line"><span style="color:#babed8;">    &quot;sourceMap&quot;: true,               // 生成目标文件的sourceMap文件</span></span>
<span class="line"><span style="color:#babed8;">    &quot;resolveJsonModule&quot;: true,       // 为了import json文件方便</span></span>
<span class="line"><span style="color:#babed8;">    &quot;esModuleInterop&quot;: true,         // 为了import cjs文件方便 https://zhuanlan.zhihu.com/p/148081795</span></span>
<span class="line"><span style="color:#babed8;">    &quot;lib&quot;: [&quot;esnext&quot;, &quot;dom&quot;]         // 编译过程中需要引入的库文件的列表</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 指定编译器需要编译的文件或文件夹</span></span>
<span class="line"><span style="color:#babed8;">  &quot;include&quot;: [&quot;src/**/*.ts&quot;, &quot;src/**/*.d.ts&quot;, &quot;src/**/*.tsx&quot;, &quot;src/**/*.vue&quot;]</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="index-html" tabindex="-1">index.html <a class="header-anchor" href="#index-html" aria-label="Permalink to &quot;index.html&quot;">​</a></h3><p>index.html是网站的入口文件，它和一般的html文件不太一样，引入<code>main.ts</code>文件入口ts文件的<code>&lt;script&gt;</code>标签是带有<code>type=&quot;module&quot;</code>属性的，用来支持ES6模块。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;html lang=&quot;en&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;head&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;meta charset=&quot;UTF-8&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;link rel=&quot;icon&quot; href=&quot;/favicon.ico&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;title&gt;Vite App&lt;/title&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;/head&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;body&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div id=&quot;app&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;script type=&quot;module&quot; src=&quot;/src/main.ts&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;/body&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/html&gt;</span></span></code></pre></div><p>没有加<code>type=&quot;module&quot;</code>的话，浏览器控制台会报错：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Uncaught SyntaxError: Cannot use import statement outside a module</span></span></code></pre></div><h3 id="main-ts" tabindex="-1">main.ts <a class="header-anchor" href="#main-ts" aria-label="Permalink to &quot;main.ts&quot;">​</a></h3><p>main.ts是vue的入口文件，主要创建了一个vue实例，并挂载到dom中。</p><p>这里可以用来安装vue插件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { createApp } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import App from &#39;./App.vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">createApp(App).mount(&#39;#app&#39;)</span></span></code></pre></div><h3 id="app-vue" tabindex="-1">App.vue <a class="header-anchor" href="#app-vue" aria-label="Permalink to &quot;App.vue&quot;">​</a></h3><p>这个是Vue应用的根组件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">// This starter template is using Vue 3 &lt;script setup&gt; SFCs</span></span>
<span class="line"><span style="color:#babed8;">// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup</span></span>
<span class="line"><span style="color:#babed8;">import HelloWorld from &#39;./components/HelloWorld.vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;img alt=&quot;Vue logo&quot; src=&quot;./assets/logo.png&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;HelloWorld msg=&quot;Hello Vue 3 + TypeScript + Vite&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;style&gt;</span></span>
<span class="line"><span style="color:#babed8;">#app {</span></span>
<span class="line"><span style="color:#babed8;">  font-family: Avenir, Helvetica, Arial, sans-serif;</span></span>
<span class="line"><span style="color:#babed8;">  -webkit-font-smoothing: antialiased;</span></span>
<span class="line"><span style="color:#babed8;">  -moz-osx-font-smoothing: grayscale;</span></span>
<span class="line"><span style="color:#babed8;">  text-align: center;</span></span>
<span class="line"><span style="color:#babed8;">  color: #2c3e50;</span></span>
<span class="line"><span style="color:#babed8;">  margin-top: 60px;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">&lt;/style&gt;</span></span></code></pre></div><h3 id="env-d-ts" tabindex="-1">env.d.ts <a class="header-anchor" href="#env-d-ts" aria-label="Permalink to &quot;env.d.ts&quot;">​</a></h3><p>vue组件的类型声明，不添加该文件会提示：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">找不到模块“./App.vue”或其相应的类型声明。</span></span></code></pre></div><h2 id="_3-添加-jsx-支持" tabindex="-1">3 添加 jsx 支持 <a class="header-anchor" href="#_3-添加-jsx-支持" aria-label="Permalink to &quot;3 添加 jsx 支持&quot;">​</a></h2><p>我们希望能在项目中使用jsx编写的组件，先编写一个最简单的jsx函数式组件：<code>HelloWorld.tsx</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">export const HelloWorld = () =&gt; &lt;div&gt;Hello World jsx&lt;/div&gt;</span></span></code></pre></div><p>然后在<code>App.vue</code>中引入该组件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { HelloWorld } from &#39;./components/HelloWorld&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;HelloWorld /&gt;</span></span></code></pre></div><h3 id="报错-uncaught-referenceerror-react-is-not-defined" tabindex="-1">报错：Uncaught ReferenceError: React is not defined <a class="header-anchor" href="#报错-uncaught-referenceerror-react-is-not-defined" aria-label="Permalink to &quot;报错：Uncaught ReferenceError: React is not defined&quot;">​</a></h3><p>由于没有引入jsx的支持，意料之中的报错了</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Uncaught ReferenceError: React is not defined</span></span>
<span class="line"><span style="color:#babed8;">    at HelloWorld (HelloWorld.tsx:1)</span></span></code></pre></div><p>报这个错的原因，村长老师已经在直播间讲得很清楚了，一句话解释：</p><blockquote><p>Babel解析xx.tsx文件时，会把它当成React组件，而咱们项目中又没有引入React，所以报错了</p></blockquote><p>解决的方式就是引入一个<code>@vitejs/plugin-vue-jsx</code>插件。</p><h3 id="引入vite插件-vitejs-plugin-vue-jsx" tabindex="-1">引入vite插件：@vitejs/plugin-vue-jsx <a class="header-anchor" href="#引入vite插件-vitejs-plugin-vue-jsx" aria-label="Permalink to &quot;引入vite插件：@vitejs/plugin-vue-jsx&quot;">​</a></h3><p>安装插件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D @vitejs/plugin-vue-jsx</span></span></code></pre></div><p>引入插件</p><p>在<code>vite.config.ts</code>的<code>plugins</code>中引入vueJsx插件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import vueJsx from &#39;@vitejs/plugin-vue-jsx&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">plugins: [vue(), vueJsx()]</span></span></code></pre></div><h3 id="接第一次直播的-tree-组件" tabindex="-1">接第一次直播的 tree 组件 <a class="header-anchor" href="#接第一次直播的-tree-组件" aria-label="Permalink to &quot;接第一次直播的 tree 组件&quot;">​</a></h3><p>在第一次直播中，我和村长一起给大家分享了如何参与开源项目，并给Vue DevUI组件库添加了一个基础版的Tree组件：</p><p><a href="https://www.bilibili.com/video/BV1GU4y1N7eC" target="_blank" rel="noreferrer">Vue DevUI开源指南01：提交我的第一次pr</a></p><p>这个tree组件就是用jsx的方式写的，我们一起来回顾下：</p><p>新建一个<code>tree.tsx</code>文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { defineComponent, ExtractPropTypes, PropType } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 定义类型和组件的props，这部分一般会放在一个单独的文件中</span></span>
<span class="line"><span style="color:#babed8;">interface TreeItem {</span></span>
<span class="line"><span style="color:#babed8;">  label: string</span></span>
<span class="line"><span style="color:#babed8;">  children?: TreeData</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">type TreeData = Array&lt;TreeItem&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const treeProps = {</span></span>
<span class="line"><span style="color:#babed8;">  data: {</span></span>
<span class="line"><span style="color:#babed8;">    type: Array as PropType&lt;TreeData&gt;,</span></span>
<span class="line"><span style="color:#babed8;">    default: () =&gt; [],</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">type TreeProps = ExtractPropTypes&lt;typeof treeProps&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// vue组件定义，和\`.vue\`组件中的\`&lt;script&gt;\`标签中的一样，只是不再需要写\`&lt;template&gt;\`，setup中可以直接使用</span></span>
<span class="line"><span style="color:#babed8;">export default defineComponent({</span></span>
<span class="line"><span style="color:#babed8;">  name: &#39;DTree&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  props: treeProps,</span></span>
<span class="line"><span style="color:#babed8;">  setup(props: TreeProps) {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;props:&#39;, props, props.data)</span></span>
<span class="line"><span style="color:#babed8;">    return () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      return &lt;div class=&quot;devui-tree&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">        { props.data.map(item =&gt; &lt;div&gt;{ item.label }&lt;/div&gt;) }</span></span>
<span class="line"><span style="color:#babed8;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><p>然后在<code>App.vue</code>中使用 tree 组件，传入<code>data</code>参数。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">import DTree from &#39;./components/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const data = ref([{</span></span>
<span class="line"><span style="color:#babed8;">  label: &#39;一级 1&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  children: [{</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;二级 1-1&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;三级 1-1-1&#39;</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }]</span></span>
<span class="line"><span style="color:#babed8;">}, ...])</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;d-tree :data=&quot;data&quot;&gt;&lt;/d-tree&gt;</span></span></code></pre></div><p>也欢迎我们之前的几期<a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">Vue DevUI</a>组件库建设的内容：</p><ul><li><a href="https://juejin.cn/post/7015023354847428645" target="_blank" rel="noreferrer">如何给 tree 组件增加展开/收起功能</a></li><li><a href="https://juejin.cn/post/7011535488171376671" target="_blank" rel="noreferrer">Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件</a></li><li><a href="https://juejin.cn/post/7009273646884028430" target="_blank" rel="noreferrer">Vue DevUI开源指南01：提交我的第一次pr</a></li></ul><h1 id="欢迎参与devui开源项目" tabindex="-1">欢迎参与devui开源项目 <a class="header-anchor" href="#欢迎参与devui开源项目" aria-label="Permalink to &quot;欢迎参与devui开源项目&quot;">​</a></h1><p>我们 <code>DevUI</code> 团队有多个开源项目，现在都在招募<code>contributor</code>，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加<code>DevUI</code>小助手的微信：<code>devui-official</code>，将你拉到我们的核心开发群)</p><ul><li>Ng DevUI: <a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui</a></li><li>Vue DevUI: <a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">https://gitee.com/devui/vue-devui</a></li><li>DevUI Admin <a href="https://github.com/DevCloudFE/ng-devui-admin" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui-admin</a></li></ul><p><code>DevUI</code>官网：<a href="https://devui.design/" target="_blank" rel="noreferrer">https://devui.design/</a></p>`,99);function i(r,d,b,u,y,g){const s=e("EditInfo");return n(),l("div",null,[c,p(s,{time:"2021年10月10日 00:25",title:"阅读 4651 ·  点赞 29 ·  评论 10 ·  收藏 24"})])}const m=a(o,[["render",i]]);export{v as __pageData,m as default};
