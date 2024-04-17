import{_ as a,B as n,o as l,c as e,G as p,Q as o}from"./chunks/framework.1fee3549.js";const t="/blogs/assets/opentiny-support-vue2-and-vue3-1.png",c="/blogs/assets/opentiny-support-vue2-and-vue3-2.png",r="/blogs/assets/opentiny-support-vue2-and-vue3-3.png",i="/blogs/assets/opentiny-support-vue2-and-vue3-4.png",y="/blogs/assets/opentiny-support-vue2-and-vue3-5.png",V=JSON.parse('{"title":"一个 OpenTiny，Vue2 Vue3 都支持！","description":"","frontmatter":{},"headers":[],"relativePath":"open-source/2023/opentiny-support-vue2-and-vue3.md","filePath":"open-source/2023/opentiny-support-vue2-and-vue3.md"}'),u={name:"open-source/2023/opentiny-support-vue2-and-vue3.md"},D=o('<h1 id="一个-opentiny-vue2-vue3-都支持" tabindex="-1">一个 OpenTiny，Vue2 Vue3 都支持！ <a class="header-anchor" href="#一个-opentiny-vue2-vue3-都支持" aria-label="Permalink to &quot;一个 OpenTiny，Vue2 Vue3 都支持！&quot;">​</a></h1><p>大家好，我是 Kagol，<a href="https://opentiny.design/" target="_blank" rel="noreferrer">OpenTiny</a> 开源社区运营，<a href="https://github.com/opentiny/tiny-vue" target="_blank" rel="noreferrer">TinyVue</a> 跨端、跨框架组件库核心贡献者，专注于前端组件库建设和开源社区运营。</p><p>今天给大家介绍如何同时在 Vue2 和 Vue3 项目中使用 <a href="https://opentiny.design/tiny-vue" target="_blank" rel="noreferrer">TinyVue</a>。</p><p>TinyVue 是一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端。</p><p>🌈 特性：</p><ul><li>📦 包含 80 多个简洁、易用、功能强大的组件</li><li>🖖 一套代码同时支持 Vue 2 和 Vue 3</li><li>🖥️ 一套代码同时支持 PC 端和移动端</li><li>🌍 支持国际化</li><li>🎨 支持主题定制</li><li>📊 组件内部支持配置式开发，可支持低代码平台可视化组件配置</li><li>💡 采用模板、样式、逻辑分离的跨端、跨框架架构，保障灵活性和可移植性</li></ul><p><img src="'+t+`" alt="image.png"></p><h2 id="在-vue2-项目中使用" tabindex="-1">在 Vue2 项目中使用 <a class="header-anchor" href="#在-vue2-项目中使用" aria-label="Permalink to &quot;在 Vue2 项目中使用&quot;">​</a></h2><h3 id="创建-vue2-项目" tabindex="-1">创建 Vue2 项目 <a class="header-anchor" href="#创建-vue2-项目" aria-label="Permalink to &quot;创建 Vue2 项目&quot;">​</a></h3><p>先用 Vue CLI 创建一个 Vue2 项目。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 安装 Vue CLI</span></span>
<span class="line"><span style="color:#babed8;">npm install -g @vue/cli</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 创建 Vue2 项目</span></span>
<span class="line"><span style="color:#babed8;">vue create vue2-demo</span></span></code></pre></div><p>输出以下信息说明项目创建成功</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">🎉  Successfully created project vue2-demo.</span></span>
<span class="line"><span style="color:#babed8;">👉  Get started with the following commands:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"> $ cd vue2-demo</span></span>
<span class="line"><span style="color:#babed8;"> $ yarn serve</span></span></code></pre></div><p>创建好之后可以执行以下命令启动项目</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn serve</span></span></code></pre></div><p>输出以下命令说明启动成功</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">App running at:</span></span>
<span class="line"><span style="color:#babed8;">  - Local:   http://localhost:8080/ </span></span>
<span class="line"><span style="color:#babed8;">  - Network: http://192.168.1.102:8080/</span></span></code></pre></div><p>效果如下</p><p><img src="`+c+`" alt="image.png"></p><h3 id="安装和使用-tinyvue" tabindex="-1">安装和使用 TinyVue <a class="header-anchor" href="#安装和使用-tinyvue" aria-label="Permalink to &quot;安装和使用 TinyVue&quot;">​</a></h3><p>安装 TinyVue</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm i @opentiny/vue@2</span></span></code></pre></div><p>在 src/views/Home.vue 中使用 TinyVue 组件</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">class</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">home</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#676E95;font-style:italic;">&lt;!-- 3. 使用 TinyVue 组件 --&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">OpenTiny</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">Button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Alert</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">description</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello OpenTiny</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">Alert</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1. 引入 TinyVue 组件</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Button</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Alert</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@opentiny/vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">@</span><span style="color:#82AAFF;">Component</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#89DDFF;">    </span><span style="color:#676E95;font-style:italic;">// 2. 注册 TinyVue 组件</span></span>
<span class="line"><span style="color:#BABED8;">    Button</span><span style="color:#89DDFF;">,</span><span style="color:#BABED8;"> Alert</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#89DDFF;">}</span><span style="color:#BABED8;">)</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>效果如下</p><p><img src="`+r+`" alt="image.png"></p><h2 id="在-vue3-项目中使用" tabindex="-1">在 Vue3 项目中使用 <a class="header-anchor" href="#在-vue3-项目中使用" aria-label="Permalink to &quot;在 Vue3 项目中使用&quot;">​</a></h2><h3 id="创建-vue3-项目" tabindex="-1">创建 Vue3 项目 <a class="header-anchor" href="#创建-vue3-项目" aria-label="Permalink to &quot;创建 Vue3 项目&quot;">​</a></h3><p>使用 Vite 创建一个 Vue3 项目</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm create vite vue3-demo</span></span></code></pre></div><p>输出以下信息说明项目创建成功</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Done. Now run:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  cd vue3-demo</span></span>
<span class="line"><span style="color:#babed8;">  npm install</span></span>
<span class="line"><span style="color:#babed8;">  npm run dev</span></span></code></pre></div><p>创建好之后可以执行以下命令启动项目</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm i</span></span>
<span class="line"><span style="color:#babed8;">npm run dev</span></span></code></pre></div><p>输出以下命令说明启动成功</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">VITE v3.2.5  ready in 391 ms</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  ➜  Local:   http://localhost:5173/</span></span>
<span class="line"><span style="color:#babed8;">  ➜  Network: use --host to expose</span></span></code></pre></div><p>效果如下</p><p><img src="`+i+`" alt="image.png"></p><h3 id="安装和使用-tinyvue-1" tabindex="-1">安装和使用 TinyVue <a class="header-anchor" href="#安装和使用-tinyvue-1" aria-label="Permalink to &quot;安装和使用 TinyVue&quot;">​</a></h3><p>安装 TinyVue</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm i @opentiny/vue@3</span></span></code></pre></div><p>在 src/App.vue 中使用 TinyVue 组件</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">setup</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#676E95;font-style:italic;">// 1. 引入 TinyVue 组件</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Button</span><span style="color:#89DDFF;">,</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">Alert</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@opentiny/vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#676E95;font-style:italic;">&lt;!-- 2. 使用 TinyVue 组件 --&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Button</span><span style="color:#89DDFF;">&gt;</span><span style="color:#BABED8;">OpenTiny</span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">Button</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">Alert</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">description</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">Hello OpenTiny</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">Alert</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>效果如下</p><p><img src="`+y+'" alt="image.png"></p><h2 id="总结" tabindex="-1">总结 <a class="header-anchor" href="#总结" aria-label="Permalink to &quot;总结&quot;">​</a></h2><p>可以看到在 Vue2 和 Vue3 项目中组件的使用方式完全一样，这也就意味着，使用 TinyVue 的 Vue2 项目可以无缝迁移到 Vue3 项目中。</p><ul><li>无需修改 API</li><li>无需担心组件功能不一致</li><li>无需担心业务出现不连续</li></ul><p>更多 TinyVue 组件，欢迎体验：<a href="https://opentiny.design/tiny-vue" target="_blank" rel="noreferrer">https://opentiny.design/tiny-vue</a></p>',49);function F(d,g,b,h,v,m){const s=n("EditInfo");return l(),e("div",null,[D,p(s,{time:"2023-04-07 07:28",title:"32622展现 · 1153阅读 · 22点赞 · 15评论 · 24收藏"})])}const E=a(u,[["render",F]]);export{V as __pageData,E as default};