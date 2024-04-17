import{_ as a,B as n,o as l,c as e,G as p,Q as o}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"从0到1搭建Vue组件库02：实现一个能渲染多层节点的 Tree 组件","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/0-to-1-build-vue-component-library-2.md","filePath":"tech/2021/0-to-1-build-vue-component-library-2.md"}'),t={name:"tech/2021/0-to-1-build-vue-component-library-2.md"},c=o(`<h1 id="从0到1搭建vue组件库02-实现一个能渲染多层节点的-tree-组件" tabindex="-1">从0到1搭建Vue组件库02：实现一个能渲染多层节点的 Tree 组件 <a class="header-anchor" href="#从0到1搭建vue组件库02-实现一个能渲染多层节点的-tree-组件" aria-label="Permalink to &quot;从0到1搭建Vue组件库02：实现一个能渲染多层节点的 Tree 组件&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png" alt="image"></p><p>欢迎大家围观Kagol和村长的直播，手把手带你一起为Vue DevUI开源组件库提交PR。</p><p>也欢迎大家参与到Vue DevUI的建设中来，可以加小助手微信 devui-official</p><p>Vue DevUI代码仓库：</p><p><a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">https://gitee.com/devui/vue-devui</a></p><p>B站直播链接：</p><p><a href="https://www.bilibili.com/video/BV1GU4y1N7eC" target="_blank" rel="noreferrer">https://www.bilibili.com/video/BV1GU4y1N7eC</a></p><p>以下是正文：</p><h2 id="渲染一层树节点" tabindex="-1">渲染一层树节点 <a class="header-anchor" href="#渲染一层树节点" aria-label="Permalink to &quot;渲染一层树节点&quot;">​</a></h2><p><a href="https://juejin.cn/post/7009273646884028430" target="_blank" rel="noreferrer">上一期</a>直播我们给大家分享了如何给Vue DevUI开源组件库提交第一个PR，并以tree组件为例子，介绍如何给Vue DevUI贡献组件，上次只开了个头，写了一个渲染一层树节点的非常简单的tree组件，并且只有data这一个api。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-tree :data=&quot;[{ label: &#39;中国菜&#39; }]&quot;&gt;&lt;/d-tree&gt;</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { defineComponent, toRefs } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import { treeProps, TreeProps } from &#39;./tree-types&#39;</span></span>
<span class="line"><span style="color:#babed8;">import &#39;./tree.scss&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default defineComponent({</span></span>
<span class="line"><span style="color:#babed8;">  name: &#39;DTree&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  props: treeProps,</span></span>
<span class="line"><span style="color:#babed8;">  emits: [],</span></span>
<span class="line"><span style="color:#babed8;">  setup(props: TreeProps,) {</span></span>
<span class="line"><span style="color:#babed8;">    return () =&gt; (</span></span>
<span class="line"><span style="color:#babed8;">      &lt;div class=&quot;devui-tree&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">      	{ props.data.map(item =&gt; &lt;div&gt;{item.label}&lt;/div&gt;) }</span></span>
<span class="line"><span style="color:#babed8;">  		&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    )</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bbf2ab546e064bbaaf8c7a1bf1527bec~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="整体设计思路" tabindex="-1">整体设计思路 <a class="header-anchor" href="#整体设计思路" aria-label="Permalink to &quot;整体设计思路&quot;">​</a></h2><p>实现一个tree组件，我们的第一直觉就是一层一层嵌套渲染子节点的dom结构，这么做会有一个问题，就是如果一棵树有非常多节点，并且嵌套层级非常深，我们很难用虚拟滚动的方式去进行优化，因此不可避免地导致性能问题。</p><p>我测试了ElementPlus组件库，使用Tree组件渲染5万个树节点，耗时6s左右，同样的数据量，AntDesign组件库的Tree组件耗时10s左右，但是AntDesign的Tree组件提供了虚拟滚动功能，开启虚拟滚动，加载时间瞬间降到1s以内，而且不会因为节点数的增加而影响性能。</p><p>而要使用虚拟滚动，就需要将嵌套结构变成平铺结构。</p><p>为了方便用户使用，我们设计的data属性依然使用嵌套结构，但是组件内部需要将其拍平，并用平铺的方式将树节点渲染到dom中。</p><p>data结构：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">data: [</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;node-1&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    children: [</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">      	label: &#39;node-11&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        children: [</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-111&#39; },</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-112&#39; },</span></span>
<span class="line"><span style="color:#babed8;">        ],</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">      	label: &#39;node-12&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        children: [</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-121&#39; },</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-122&#39; },</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-123&#39; },</span></span>
<span class="line"><span style="color:#babed8;">        ],</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">    ],</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">  	label: &#39;node-2&#39;</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">]</span></span></code></pre></div><p>DOM结构：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-1&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;div class=&quot;node-11&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div class=&quot;node-111&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div class=&quot;node-112&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">	&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;div class=&quot;node-12&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div class=&quot;node-121&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div class=&quot;node-122&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div class=&quot;node-123&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">	&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-2&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">-&gt;</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-1&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-11&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-111&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-112&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-12&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-121&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-122&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-123&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;div class=&quot;node-2&quot;&gt;&lt;/div&gt;</span></span></code></pre></div><h2 id="引入svg" tabindex="-1">引入SVG <a class="header-anchor" href="#引入svg" aria-label="Permalink to &quot;引入SVG&quot;">​</a></h2><p>由于tree组件节点前面一般会有一个小图标，为了方便使用svg图标，我们可以借助vite-svg-plugin插件。</p><p>安装vite-svg-loader插件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D vite-svg-loader</span></span></code></pre></div><p>docs/vite.config.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import path from &#39;path&#39;</span></span>
<span class="line"><span style="color:#babed8;">import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span style="color:#babed8;">import vueJsx from &#39;@vitejs/plugin-vue-jsx&#39;</span></span>
<span class="line"><span style="color:#babed8;">import svgLoader from &#39;vite-svg-loader&#39; // 引入vite-svg-loader插件</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">  resolve: {</span></span>
<span class="line"><span style="color:#babed8;">    alias: [</span></span>
<span class="line"><span style="color:#babed8;">      { find: &#39;@devui&#39;, replacement: path.resolve(__dirname, &#39;../devui&#39;) },</span></span>
<span class="line"><span style="color:#babed8;">    ]</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  plugins: [</span></span>
<span class="line"><span style="color:#babed8;">    vueJsx({}),</span></span>
<span class="line"><span style="color:#babed8;">    svgLoader(), // 使用vite-svg-loader插件</span></span>
<span class="line"><span style="color:#babed8;">  ],</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><p>导入svg</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import IconOpen from &#39;./assets/open.svg&#39;</span></span></code></pre></div><p>open.svg</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;svg</span></span>
<span class="line"><span style="color:#babed8;">  width=&quot;16px&quot;</span></span>
<span class="line"><span style="color:#babed8;">  height=&quot;16px&quot;</span></span>
<span class="line"><span style="color:#babed8;">  viewBox=&quot;0 0 16 16&quot;</span></span>
<span class="line"><span style="color:#babed8;">  version=&quot;1.1&quot;</span></span>
<span class="line"><span style="color:#babed8;">  xmlns=&quot;http://www.w3.org/2000/svg&quot;</span></span>
<span class="line"><span style="color:#babed8;">  xmlns:xlink=&quot;http://www.w3.org/1999/xlink&quot;</span></span>
<span class="line"><span style="color:#babed8;">  class=&quot;svg-icon svg-icon-close&quot;</span></span>
<span class="line"><span style="color:#babed8;">&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;g stroke-width=&quot;1&quot; fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;rect x=&quot;0.5&quot; y=&quot;0.5&quot; width=&quot;15&quot; height=&quot;15&quot; rx=&quot;2&quot; stroke=&quot;#5e7ce0&quot;&gt;&lt;/rect&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;rect x=&quot;4&quot; y=&quot;7&quot; width=&quot;8&quot; height=&quot;2&quot; fill=&quot;#5e7ce0&quot;&gt;&lt;/rect&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;/g&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/svg&gt;</span></span></code></pre></div><p>使用svg</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;IconOpen /&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">or</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">setup() {</span></span>
<span class="line"><span style="color:#babed8;">  return () =&gt; &lt;IconOpen /&gt;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="给节点增加一个层级的标识level" tabindex="-1">给节点增加一个层级的标识level <a class="header-anchor" href="#给节点增加一个层级的标识level" aria-label="Permalink to &quot;给节点增加一个层级的标识level&quot;">​</a></h2><p>不同层级节点的缩进是不一样的，我们需要一个level属性来标识当前节点的层级。</p><p>第一层的level是1，第二层是2，以此类推。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">data: [</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;node-1&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    children: [</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">      	label: &#39;node-11&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    	level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-111&#39;, level: 3, },</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-112&#39;, level: 3, },</span></span>
<span class="line"><span style="color:#babed8;">        ],</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">      	label: &#39;node-12&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    	level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-121&#39;, level: 3, },</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-122&#39;, level: 3, },</span></span>
<span class="line"><span style="color:#babed8;">          { label: &#39;node-123&#39;, level: 3, },</span></span>
<span class="line"><span style="color:#babed8;">        ],</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">    ],</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;node-2&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    level: 1,</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">]</span></span></code></pre></div><h2 id="渲染多层树节点-重点" tabindex="-1">渲染多层树节点（重点） <a class="header-anchor" href="#渲染多层树节点-重点" aria-label="Permalink to &quot;渲染多层树节点（重点）&quot;">​</a></h2><p>渲染一层节点非常简单：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;div class=&quot;devui-tree&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">  { props.data.map(item =&gt; &lt;div&gt;{item.label}&lt;/div&gt;) }</span></span>
<span class="line"><span style="color:#babed8;">&lt;/div&gt;</span></span></code></pre></div><p>渲染多层则需要定义一个渲染函数，在函数中做一次递归操作。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 增加缩进的展位元素</span></span>
<span class="line"><span style="color:#babed8;">const Indent = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return &lt;span style=&quot;display: inline-block; width: 16px; height: 16px;&quot;&gt;&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const renderNode = (item) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div class=&quot;devui-tree-node&quot; style={{ paddingLeft: \`\${24 * (item.level - 1)}px\` }}&gt;</span></span>
<span class="line"><span style="color:#babed8;">      { item.children ? &lt;IconOpen class=&quot;mr-xs&quot; /&gt; : &lt;Indent /&gt; }</span></span>
<span class="line"><span style="color:#babed8;">      { item.label }</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const renderTree = (tree) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return tree.map(item =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    if (!item.children) {</span></span>
<span class="line"><span style="color:#babed8;">      return renderNode(item)</span></span>
<span class="line"><span style="color:#babed8;">    } else {</span></span>
<span class="line"><span style="color:#babed8;">      return (</span></span>
<span class="line"><span style="color:#babed8;">        &lt;&gt;</span></span>
<span class="line"><span style="color:#babed8;">          {renderNode(item)}</span></span>
<span class="line"><span style="color:#babed8;">          {renderTree(item.children)}</span></span>
<span class="line"><span style="color:#babed8;">        &lt;/&gt;</span></span>
<span class="line"><span style="color:#babed8;">      )</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  })</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;div class=&quot;devui-tree&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">  { renderTree(props.data) }</span></span>
<span class="line"><span style="color:#babed8;">&lt;/div&gt;</span></span></code></pre></div><h2 id="实现的效果" tabindex="-1">实现的效果 <a class="header-anchor" href="#实现的效果" aria-label="Permalink to &quot;实现的效果&quot;">​</a></h2><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab34e2d95174074ba88a97cd3dace34~tplv-k3u1fbpfcp-zoom-1.image" alt=""></p><h2 id="demo文档" tabindex="-1">demo文档 <a class="header-anchor" href="#demo文档" aria-label="Permalink to &quot;demo文档&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">## Tree 树</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">一种表现嵌套结构的组件。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">#### 何时使用</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">文件夹、组织架构、生物分类、国家地区等等，世间万物的大多数结构都是树形结构。使用树控件可以完整展现其中的层级关系，并具有展开收起选择等交互功能。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">#### 基础用法</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;d-tree :data=&quot;data&quot;&gt;&lt;/d-tree&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">import { defineComponent, ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default defineComponent({</span></span>
<span class="line"><span style="color:#babed8;">  setup() {</span></span>
<span class="line"><span style="color:#babed8;">    const data = ref([{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 1&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 1-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 1-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 2&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 2-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 2-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 2-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 2-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 3&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 4&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    }])</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return {</span></span>
<span class="line"><span style="color:#babed8;">      data,</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`vue</span></span>
<span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;d-tree :data=&quot;data&quot;&gt;&lt;/d-tree&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/template&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;script lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">import { defineComponent, ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default defineComponent({</span></span>
<span class="line"><span style="color:#babed8;">  setup() {</span></span>
<span class="line"><span style="color:#babed8;">    const data = ref([{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 1&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 1-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 1-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 2&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 2-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 2-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 2-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 2-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 3&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 4&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    }])</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return {</span></span>
<span class="line"><span style="color:#babed8;">      data,</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;">\`\`\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">#### Props</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">| 参数         | 类型    | 默认  | 说明                                     | 跳转 Demo |</span></span>
<span class="line"><span style="color:#babed8;">| ------------ | ------- | ----- | ---------------------------------------- | --------- |</span></span>
<span class="line"><span style="color:#babed8;">| data  | \`TreeData\`  | \`[]\`    | 必选，数据源                 |           |</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">#### TreeData 数据结构</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">| 参数        | 类型      | 默认值  | 说明                                                                     |</span></span>
<span class="line"><span style="color:#babed8;">| ----------- | --------- | ------- | ------------------------------------------------------------------------ |</span></span>
<span class="line"><span style="color:#babed8;">| label        | \`string\`  |  \`-\` | 文本内容 |</span></span>
<span class="line"><span style="color:#babed8;">| children     | \`TreeData\`  | \`-\`     | 子节点                                               |</span></span></code></pre></div>`,49);function b(i,d,r,y,u,g){const s=n("EditInfo");return l(),e("div",null,[c,p(s,{time:"2021年09月25日 00:22",title:"阅读 3041 ·  点赞 27 ·  评论 2 ·  收藏 11"})])}const m=a(t,[["render",b]]);export{h as __pageData,m as default};
