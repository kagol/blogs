import{_ as a,B as n,o as p,c as e,G as l,Q as o}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"Monorepo 初体验：将现有的 NG CLI 工程改造成 Monorepo 方式","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/monorepo-angular.md","filePath":"tech/2021/monorepo-angular.md"}'),t={name:"tech/2021/monorepo-angular.md"},c=o(`<h1 id="monorepo-初体验-将现有的-ng-cli-工程改造成-monorepo-方式" tabindex="-1">Monorepo 初体验：将现有的 NG CLI 工程改造成 Monorepo 方式 <a class="header-anchor" href="#monorepo-初体验-将现有的-ng-cli-工程改造成-monorepo-方式" aria-label="Permalink to &quot;Monorepo 初体验：将现有的 NG CLI 工程改造成 Monorepo 方式&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201514698-38e1c5b7-71c1-4e1f-bb7c-bef102f172f3.png" alt="image"></p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>Monorepo 能够优雅地解决代码复用的问题，统一工作流，并且不影响构建、部署的效率。</p><p>目前开源社区已经有不少开源项目都是采用 Monorepo 的方式管理源码的，比如：Vue3，以下是它的部分源码结构：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">vue-next</span></span>
<span class="line"><span style="color:#babed8;">├── CHANGELOG.md</span></span>
<span class="line"><span style="color:#babed8;">├── LICENSE</span></span>
<span class="line"><span style="color:#babed8;">├── README.md</span></span>
<span class="line"><span style="color:#babed8;">├── api-extractor.json</span></span>
<span class="line"><span style="color:#babed8;">├── jest.config.js</span></span>
<span class="line"><span style="color:#babed8;">├── package.json</span></span>
<span class="line"><span style="color:#babed8;">├── packages // 每一个包在一个文件夹下，独立测试、独立构建、独立部署</span></span>
<span class="line"><span style="color:#babed8;">|  ├── compiler-core</span></span>
<span class="line"><span style="color:#babed8;">|  ├── compiler-dom</span></span>
<span class="line"><span style="color:#babed8;">|  ├── compiler-sfc</span></span>
<span class="line"><span style="color:#babed8;">|  ├── compiler-ssr</span></span>
<span class="line"><span style="color:#babed8;">|  ├── global.d.ts</span></span>
<span class="line"><span style="color:#babed8;">|  ├── reactivity</span></span>
<span class="line"><span style="color:#babed8;">|  ├── runtime-core</span></span>
<span class="line"><span style="color:#babed8;">|  ├── runtime-dom</span></span>
<span class="line"><span style="color:#babed8;">|  ├── runtime-test</span></span>
<span class="line"><span style="color:#babed8;">|  ├── server-renderer</span></span>
<span class="line"><span style="color:#babed8;">|  ├── shared</span></span>
<span class="line"><span style="color:#babed8;">|  ├── size-check</span></span>
<span class="line"><span style="color:#babed8;">|  ├── template-explorer</span></span>
<span class="line"><span style="color:#babed8;">|  └── vue</span></span>
<span class="line"><span style="color:#babed8;">|     ├── README.md</span></span>
<span class="line"><span style="color:#babed8;">|     ├── __tests__</span></span>
<span class="line"><span style="color:#babed8;">|     ├── api-extractor.json</span></span>
<span class="line"><span style="color:#babed8;">|     ├── examples</span></span>
<span class="line"><span style="color:#babed8;">|     ├── index.js</span></span>
<span class="line"><span style="color:#babed8;">|     ├── package.json</span></span>
<span class="line"><span style="color:#babed8;">|     └── src</span></span>
<span class="line"><span style="color:#babed8;">├── rollup.config.js</span></span>
<span class="line"><span style="color:#babed8;">├── ...</span></span></code></pre></div><p>我们一起来看看如何将一个现有的NG CLI工程切换成Monorepo，并在Monorepo的工作空间里不断扩展新项目吧！</p><h2 id="创建一个-ng-cli-项目" tabindex="-1">创建一个 NG CLI 项目 <a class="header-anchor" href="#创建一个-ng-cli-项目" aria-label="Permalink to &quot;创建一个 NG CLI 项目&quot;">​</a></h2><p>我们先来创建一个CLI工程，并将其启动起来。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ng n my-portal --style=scss</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">cd my-portal</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">npm start</span></span></code></pre></div><p>访问以下链接就能将项目启动起来：</p><p><code>http://localhost:4200/</code></p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a6089df77834691b0aff1843c4b7785~tplv-k3u1fbpfcp-watermark.image" alt="初始工程.png"></p><h2 id="升级成-monorepo" tabindex="-1">升级成 Monorepo <a class="header-anchor" href="#升级成-monorepo" aria-label="Permalink to &quot;升级成 Monorepo&quot;">​</a></h2><p>我们已经有了一个 NG CLI，将其变成 Monorepo 工作空间非常简单，只需要一个命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ng add @nrwl/workspace</span></span></code></pre></div><p>执行该命令后，我们的项目结构发生了一些改变，以下是主要的变化：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">DELETE .browserslistrc</span></span>
<span class="line"><span style="color:#babed8;">DELETE tsconfig.app.json</span></span>
<span class="line"><span style="color:#babed8;">DELETE tsconfig.spec.json</span></span>
<span class="line"><span style="color:#babed8;">DELETE tsconfig.json</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/app/app-routing.module.ts =&gt; apps/my-portal/src/app/app-routing.module.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/app/app.component.html =&gt; apps/my-portal/src/app/app.component.html</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/app/app.component.scss =&gt; apps/my-portal/src/app/app.component.scss</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/app/app.component.spec.ts =&gt; apps/my-portal/src/app/app.component.spec.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/app/app.component.ts =&gt; apps/my-portal/src/app/app.component.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/app/app.module.ts =&gt; apps/my-portal/src/app/app.module.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/assets/.gitkeep =&gt; apps/my-portal/src/assets/.gitkeep</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/environments/environment.prod.ts =&gt; apps/my-portal/src/environments/environment.prod.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/environments/environment.ts =&gt; apps/my-portal/src/environments/environment.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/favicon.ico =&gt; apps/my-portal/src/favicon.ico</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/index.html =&gt; apps/my-portal/src/index.html</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/main.ts =&gt; apps/my-portal/src/main.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/polyfills.ts =&gt; apps/my-portal/src/polyfills.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/styles.scss =&gt; apps/my-portal/src/styles.scss</span></span>
<span class="line"><span style="color:#babed8;">RENAME src/test.ts =&gt; apps/my-portal/src/test.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME e2e/src/app.e2e-spec.ts =&gt; apps/my-portal-e2e/src/app.e2e-spec.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME e2e/src/app.po.ts =&gt; apps/my-portal-e2e/src/app.po.ts</span></span>
<span class="line"><span style="color:#babed8;">RENAME e2e/protractor.conf.js =&gt; apps/my-portal-e2e/protractor.conf.js</span></span>
<span class="line"><span style="color:#babed8;">RENAME e2e/tsconfig.json =&gt; apps/my-portal-e2e/tsconfig.json</span></span>
<span class="line"><span style="color:#babed8;">CREATE apps/my-portal/.browserslistrc (703 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE apps/my-portal/tsconfig.app.json (223 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE apps/my-portal/karma.conf.js (1013 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE apps/my-portal/tsconfig.spec.json (268 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE tools/schematics/.gitkeep (0 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE tools/tsconfig.tools.json (251 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE nx.json (433 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE libs/.gitkeep (0 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE .vscode/extensions.json (144 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE .prettierrc (26 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE tsconfig.base.json (416 bytes)</span></span>
<span class="line"><span style="color:#babed8;">CREATE decorate-angular-cli.js (2628 bytes)</span></span>
<span class="line"><span style="color:#babed8;">UPDATE karma.conf.js (1016 bytes)</span></span>
<span class="line"><span style="color:#babed8;">UPDATE package.json (2035 bytes)</span></span>
<span class="line"><span style="color:#babed8;">UPDATE angular.json (4659 bytes)</span></span>
<span class="line"><span style="color:#babed8;">UPDATE tslint.json (3491 bytes)</span></span></code></pre></div><p>比较明显的改变就是：</p><ul><li>将src和tsconfig的代码迁移到apps中</li><li>增加了nx.json配置文件</li></ul><p>这时我们重新执行<code>npm start</code>启动项目，并通过链接<code>http://localhost:4200/</code>访问页面。</p><blockquote><p>看起来和之前没有任何的不同，不过实质已发生巨大的变化。就像变成白袍巫师的甘道夫，穿上灰袍，看着还是以前的“灰袍巫师甘道夫”，不过早已经历了蜕变。</p></blockquote><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18dc5a6ecde04cb58b5d1bae7db79357~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><h2 id="增加一个-angular-项目" tabindex="-1">增加一个 Angular 项目 <a class="header-anchor" href="#增加一个-angular-项目" aria-label="Permalink to &quot;增加一个 Angular 项目&quot;">​</a></h2><p>升级成 Monorepo 的 NG CLI 工程就像<code>变成白袍后的甘道夫</code>，拥有平行扩展的能力，可以增加任意的子项目，而不增加构建的成本。</p><p>比如我们想增加一个 Angular 项目，只需要执行以下命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npx nx g @nrwl/angular:app projectman-portal</span></span></code></pre></div><p>这时apps目录下会新增一个projectman-portal目录：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">├── apps</span></span>
<span class="line"><span style="color:#babed8;">|  ├── my-portal</span></span>
<span class="line"><span style="color:#babed8;">|  ├── projectman-portal // 新增的</span></span></code></pre></div><p>新增加的子项目和之前的项目是完全独立的，不影响之前项目的本地启动、测试、构建、部署等。</p><p>启动子项目：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npx nx serve projectman-portal --port 4100</span></span></code></pre></div><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b4b46dcd28a4b7c9580c6eb44691a0a~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p>my-portal和projectman-portal启动时，会使用不同的端口号，本地开发互不影响。</p><h2 id="公共部分-shared" tabindex="-1">公共部分 shared <a class="header-anchor" href="#公共部分-shared" aria-label="Permalink to &quot;公共部分 shared&quot;">​</a></h2><p>现在我们有一个主应用my-portal和一个子应用projectman-portal，如果这两个项目中有一个公共的模块：成员管理，我们要怎么实现模块复用呢？</p><h3 id="新建公共模块" tabindex="-1">新建公共模块 <a class="header-anchor" href="#新建公共模块" aria-label="Permalink to &quot;新建公共模块&quot;">​</a></h3><p>可以在<code>apps</code>下新建一个<code>shared</code>文件夹，由于是Angular项目，再建一个<code>angular</code>子文件夹。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">├── apps</span></span>
<span class="line"><span style="color:#babed8;">|  ├── my-portal</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── karma.conf.js</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── src</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── tsconfig.app.json</span></span>
<span class="line"><span style="color:#babed8;">|  |  └── tsconfig.spec.json</span></span>
<span class="line"><span style="color:#babed8;">|  ├── projectman-portal</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── jest.config.js</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── src</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── tsconfig.app.json</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── tsconfig.editor.json</span></span>
<span class="line"><span style="color:#babed8;">|  |  ├── tsconfig.json</span></span>
<span class="line"><span style="color:#babed8;">|  |  └── tsconfig.spec.json</span></span>
<span class="line"><span style="color:#babed8;">|  └── shared</span></span>
<span class="line"><span style="color:#babed8;">|     └── angular</span></span></code></pre></div><p>然后在angular下新建一个component文件夹，并使用 NG CLI 命令快速创建一个member模块：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">cd apps/shared/angular/component</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 新建模块</span></span>
<span class="line"><span style="color:#babed8;">ng g m member-list</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 在模块下新建组件</span></span>
<span class="line"><span style="color:#babed8;">ng g c member-list</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">├── apps</span></span>
<span class="line"><span style="color:#babed8;">|  └── shared</span></span>
<span class="line"><span style="color:#babed8;">|     └── angular</span></span>
<span class="line"><span style="color:#babed8;">|        └── component</span></span>
<span class="line"><span style="color:#babed8;">|           └── member-list</span></span>
<span class="line"><span style="color:#babed8;">|              ├── member-list.component.html</span></span>
<span class="line"><span style="color:#babed8;">|              ├── member-list.component.scss</span></span>
<span class="line"><span style="color:#babed8;">|              ├── member-list.component.spec.ts</span></span>
<span class="line"><span style="color:#babed8;">|              ├── member-list.component.ts</span></span>
<span class="line"><span style="color:#babed8;">|              └── member-list.module.ts</span></span></code></pre></div><h3 id="在业务中使用" tabindex="-1">在业务中使用 <a class="header-anchor" href="#在业务中使用" aria-label="Permalink to &quot;在业务中使用&quot;">​</a></h3><p>我们在my-portal和projectman-portal两个业务中都使用menber-list组件。</p><h4 id="导入member模块" tabindex="-1">导入member模块 <a class="header-anchor" href="#导入member模块" aria-label="Permalink to &quot;导入member模块&quot;">​</a></h4><p>apps/my-portal/src/app/app.module.ts</p><p>apps/projectman-portal/src/app/app.module.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { MemberListModule } from &#39;@component/member-list/member-list.module&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  imports: [</span></span>
<span class="line"><span style="color:#babed8;">    MemberListModule,</span></span>
<span class="line"><span style="color:#babed8;">  ],</span></span></code></pre></div><h4 id="使用member组件" tabindex="-1">使用member组件 <a class="header-anchor" href="#使用member组件" aria-label="Permalink to &quot;使用member组件&quot;">​</a></h4><p>apps/my-portal/src/app/app.component.html</p><p>apps/projectman-portal/src/app/app.component.html</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;app-member-list&gt;&lt;/app-member-list&gt;</span></span></code></pre></div><p>由于有热加载，保存后马上就能实时看到页面效果</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2af27e7e2bc43129ba9edc9285a84e0~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97a340b1617f4d96b2460dc46290d2d5~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><h3 id="配置tsconfig" tabindex="-1">配置tsconfig <a class="header-anchor" href="#配置tsconfig" aria-label="Permalink to &quot;配置tsconfig&quot;">​</a></h3><p>为了引入方便，我们在tsconfig中配置了<code>@component</code>路径别名。</p><p>tsconfig.base.json</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;paths&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">      &quot;@shared/*&quot;: [&quot;apps/shared/*&quot;],</span></span>
<span class="line"><span style="color:#babed8;">      &quot;@component/*&quot;: [&quot;apps/shared/angular/component/*&quot;]</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span></code></pre></div><p>这样在业务中使用公共组件，就不用写很长的<code>../../</code>，直接使用<code>@component</code>别名即可：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { MemberListModule } from &#39;@component/member-list/member-list.module&#39;;</span></span></code></pre></div><h2 id="增加一个-react-项目" tabindex="-1">增加一个 React 项目 <a class="header-anchor" href="#增加一个-react-项目" aria-label="Permalink to &quot;增加一个 React 项目&quot;">​</a></h2><p>除了Angular项目，我们还可以在 Monorepo 工作空间中增加别的框架的项目，比如：React。</p><p>增加React项目的方式和Angular类似，只是需要增加一个<code>@nrwl/react</code>依赖：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm i -D @nrwl/react</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">npx nx g @nrwl/react:app workitem-portal</span></span></code></pre></div><p>要不然会报以下错误：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Unable to resolve @nrwl/react:app.</span></span>
<span class="line"><span style="color:#babed8;">Cannot find module &#39;@nrwl/react/package.json&#39;</span></span></code></pre></div><p>创建完会在apps目录下新增一个<code>workitem-portal</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">├── apps</span></span>
<span class="line"><span style="color:#babed8;">|  ├── my-portal</span></span>
<span class="line"><span style="color:#babed8;">|  ├── projectman-portal</span></span>
<span class="line"><span style="color:#babed8;">|  ├── workitem-portal // 新增的</span></span></code></pre></div><p>启动方式也是一样的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npx nx serve workitem-portal --port 4200</span></span></code></pre></div><p>我们注意到启动时报了一个错：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ERROR in /Users/kagol/Documents/Kagol/code/devcloud-portal/apps/workitem-portal/src/app/app.tsx(10,5):</span></span>
<span class="line"><span style="color:#babed8;">TS17004: Cannot use JSX unless the &#39;--jsx&#39; flag is provided.</span></span></code></pre></div><p>需要在<code>workitem-portal/tsconfig.json</code>中作相应的配置：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;compileOnSave&quot;: false,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;compilerOptions&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    ...</span></span>
<span class="line"><span style="color:#babed8;">    &quot;jsx&quot;: &quot;preserve&quot;, // &quot;jsx&quot;: &quot;react-jsx&quot;</span></span>
<span class="line"><span style="color:#babed8;">    ...</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>访问链接：</p><p><code>http://localhost:4200/</code></p><p>可以看到我们的React项目也能正常启动：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/481720b5df074220adcce4ff9a431c35~tplv-k3u1fbpfcp-watermark.image" alt="图片.png"></p><p>按照同样的步骤，我们可以扩展出很多子项目，它们之间共同同样的工作流，同样的公共代码，非常方便和高效，赶紧试试吧！</p><h3 id="增加启动和构建脚本" tabindex="-1">增加启动和构建脚本 <a class="header-anchor" href="#增加启动和构建脚本" aria-label="Permalink to &quot;增加启动和构建脚本&quot;">​</a></h3><p>为了方便地启动和管理多个项目，可以在<code>package.json</code>中增加启动和构建的脚本：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;start&quot;: &quot;npx nx serve devcloud-portal --port 4200 --open&quot;,</span></span>
<span class="line"><span style="color:#babed8;">&quot;start:projectman-portal&quot;: &quot;npx nx serve projectman-portal --port 4210&quot;,</span></span>
<span class="line"><span style="color:#babed8;">&quot;start:workitem-portal&quot;: &quot;npx nx serve workitem-portal --port 4220&quot;,</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&quot;build:devcloud-portal&quot;: &quot;npx nx build devcloud-portal --prod&quot;,</span></span>
<span class="line"><span style="color:#babed8;">&quot;build:projectman-portal&quot;: &quot;npx nx build projectman-portal --prod&quot;,</span></span>
<span class="line"><span style="color:#babed8;">&quot;build:workitem-portal&quot;: &quot;npx nx build workitem-portal --prod&quot;,</span></span></code></pre></div><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本文先是与大家分享如何将一个现有的 Angular CLI 工程变成 Monorepo 工作空间，然后对其进行扩展，比如：增加 Angular 项目、增加 React 项目，增加公共模块等，有了 Monorepo，我们就可以将自己组织的所有项目代码统一到一个仓库里，共享同一套工作流，同一套规范，同一套公共基础库，大大地提升了团队协作和开发的效率。</p><p>如果觉得好用，不妨在你的组织尝试下吧！</p>`,86);function r(i,b,d,m,y,u){const s=n("EditInfo");return p(),e("div",null,[c,l(s,{time:"2021年06月07日 08:23",title:"阅读 1823 ·  点赞 17 ·  评论 1 ·  收藏9"})])}const f=a(t,[["render",r]]);export{h as __pageData,f as default};
