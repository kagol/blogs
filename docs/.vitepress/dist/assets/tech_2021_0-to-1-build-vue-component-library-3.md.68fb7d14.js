import{_ as s,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const m=JSON.parse('{"title":"从0到1搭建Vue组件库03：如何给 tree 组件增加展开/收起功能","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/0-to-1-build-vue-component-library-3.md","filePath":"tech/2021/0-to-1-build-vue-component-library-3.md"}'),t={name:"tech/2021/0-to-1-build-vue-component-library-3.md"},c=o(`<h1 id="从0到1搭建vue组件库03-如何给-tree-组件增加展开-收起功能" tabindex="-1">从0到1搭建Vue组件库03：如何给 tree 组件增加展开/收起功能 <a class="header-anchor" href="#从0到1搭建vue组件库03-如何给-tree-组件增加展开-收起功能" aria-label="Permalink to &quot;从0到1搭建Vue组件库03：如何给 tree 组件增加展开/收起功能&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png" alt="image"></p><p>最近在与<a href="https://space.bilibili.com/480140591" target="_blank" rel="noreferrer">村长</a>老师一起做<a href="https://www.bilibili.com/video/BV1Z64y187dR" target="_blank" rel="noreferrer">直播</a>，给大家分享<a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">vue devui</a>开源组件库的建设，前面两期以从 0 开始开发一个 tree 组件为栗子🌰，介绍了如何实现一个能渲染多层节点的 tree 组件。</p><p><a href="https://juejin.cn/post/7009273646884028430" target="_blank" rel="noreferrer">实现能渲染一层节点的 tree 组件</a></p><p><a href="https://juejin.cn/post/7011535488171376671" target="_blank" rel="noreferrer">实现能渲染多层节点并带展开图标的 tree 组件</a></p><p>最终实现的效果如下： <img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5ab34e2d95174074ba88a97cd3dace34~tplv-k3u1fbpfcp-watermark.image" alt="多层tree"></p><p>这只是实现了渲染的逻辑，tree 节点前面的减号图标是无法点击的，节点是无法收起的。</p><p>这次就将带大家一起实现点击图标展开/收起树节点的功能。</p><h2 id="最终效果" tabindex="-1">最终效果 <a class="header-anchor" href="#最终效果" aria-label="Permalink to &quot;最终效果&quot;">​</a></h2><p>我们需要实现的最终效果如下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c250b0bb6ada402c81db7d647a40f12b~tplv-k3u1fbpfcp-watermark.image?" alt="图片.png"></p><h2 id="增加open标识" tabindex="-1">增加open标识 <a class="header-anchor" href="#增加open标识" aria-label="Permalink to &quot;增加open标识&quot;">​</a></h2><p>之前传入 tree 组件的 data 大致结构是这样的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;一级 1&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;二级 1-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  ...</span></span>
<span class="line"><span style="color:#babed8;">]</span></span></code></pre></div><p>这样我并不知道哪些节点需要展开，哪些需要收起，所以第一步应该给需要展开的节点增加open字段。</p><p>比如我们希望让以下节点展开，其他都收起：</p><ul><li>一级 2</li><li>一级 3</li><li>二级 3-2</li></ul><p>改造后的数据结构如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;一级 1&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    children: [...]</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;一级 2&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">    children: [...]</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;一级 3&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">      children: [...]</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;一级 4&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">]</span></span></code></pre></div><h2 id="渲染展开-收起图标" tabindex="-1">渲染展开/收起图标 <a class="header-anchor" href="#渲染展开-收起图标" aria-label="Permalink to &quot;渲染展开/收起图标&quot;">​</a></h2><p>没有open字段的情况下，节点默认是全部展开的，节点前面的图标全部都是标识展开的减号图标。</p><p>现在有了open字段，我们可以根据该字段渲染展开（减号） or 收起（加号）图标，因此我们需要改造下<code>renderNode</code>方法。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const renderNode = (item) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div</span></span>
<span class="line"><span style="color:#babed8;">      class=&quot;devui-tree-node&quot;</span></span>
<span class="line"><span style="color:#babed8;">      style={{ paddingLeft: \`\${24 * (item.level - 1)}px\` }}</span></span>
<span class="line"><span style="color:#babed8;">    &gt;</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        item.children</span></span>
<span class="line"><span style="color:#babed8;">          </span></span>
<span class="line"><span style="color:#babed8;">          // Before</span></span>
<span class="line"><span style="color:#babed8;">          // ? &lt;IconOpen class=&quot;mr-xs&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">          </span></span>
<span class="line"><span style="color:#babed8;">          // After</span></span>
<span class="line"><span style="color:#babed8;">          ? item.open</span></span>
<span class="line"><span style="color:#babed8;">            ? &lt;IconOpen class=&quot;mr-xs&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">            : &lt;IconClose class=&quot;mr-xs&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">          </span></span>
<span class="line"><span style="color:#babed8;">          : &lt;Indent /&gt;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">      { item.label }</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="基本渲染逻辑" tabindex="-1">基本渲染逻辑 <a class="header-anchor" href="#基本渲染逻辑" aria-label="Permalink to &quot;基本渲染逻辑&quot;">​</a></h2><ol><li>如果当前节点没有子节点，则直接渲染，节点无图标，根据当前层级显示相应数量的占位元素 Indent</li><li>如果当前节点有子节点，open 属性不为 true，则直接渲染（不渲染子节点），前面的图标为 IconClose</li><li>如果当前节点有子节点，open 属性为 true，则渲染当前节点+它的第一层子节点，前面的图标为 IconOpen</li><li>如果子节点中又包含 open 为 true 的节点，则以此类推</li></ol><h2 id="只渲染展开的节点" tabindex="-1">只渲染展开的节点 <a class="header-anchor" href="#只渲染展开的节点" aria-label="Permalink to &quot;只渲染展开的节点&quot;">​</a></h2><p>为了方便渲染制定的节点，我们对之前的嵌套数据结构进行一些转换：</p><ul><li>将数据拍平</li><li>过滤出 open 为 true 的节点数据</li></ul><p>转换的基本思路是：</p><ul><li>通过 reduce 方法进行递归，初始值为空数组<code>[]</code></li><li>然后判断 item 数据是否有 open 属性</li><li>有的话将该数据+子数据都拼接起来</li><li>没有的话就只将该数据进行拼接</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// 获取需要展开的节点数据（无嵌套结构的一维数组）</span></span>
<span class="line"><span style="color:#babed8;">const openedTree = (tree) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return tree.reduce((acc, item) =&gt; (</span></span>
<span class="line"><span style="color:#babed8;">    item.open</span></span>
<span class="line"><span style="color:#babed8;">      ? acc.concat(item, openedTree(item.children))</span></span>
<span class="line"><span style="color:#babed8;">      : acc.concat(item)</span></span>
<span class="line"><span style="color:#babed8;">  ), [])</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const openedData = openedTree(data)</span></span></code></pre></div><p>到这一步效果就已经有了，只是还不能交互。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c250b0bb6ada402c81db7d647a40f12b~tplv-k3u1fbpfcp-watermark.image?" alt="图片.png"></p><h2 id="给节点绑定点击事件" tabindex="-1">给节点绑定点击事件 <a class="header-anchor" href="#给节点绑定点击事件" aria-label="Permalink to &quot;给节点绑定点击事件&quot;">​</a></h2><p>要实现点击图标展开/收起节点功能，就需要给节点图标绑定点击事件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const renderNode = (item) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div</span></span>
<span class="line"><span style="color:#babed8;">      class=&quot;devui-tree-node&quot;</span></span>
<span class="line"><span style="color:#babed8;">      style={{ paddingLeft: \`\${24 * (item.level - 1)}px\` }}</span></span>
<span class="line"><span style="color:#babed8;">    &gt;</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        item.children</span></span>
<span class="line"><span style="color:#babed8;">          ? item.open</span></span>
<span class="line"><span style="color:#babed8;">            ? &lt;IconOpen class=&quot;mr-xs&quot; onClick={() =&gt; toggle(item)} /&gt; // 给节点绑定点击事件</span></span>
<span class="line"><span style="color:#babed8;">            : &lt;IconClose class=&quot;mr-xs&quot; onClick={() =&gt; toggle(item)} /&gt; // 给节点绑定点击事件</span></span>
<span class="line"><span style="color:#babed8;">          : &lt;Indent /&gt;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">      { item.label }</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const toggle = (item) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  // 展开/收起逻辑</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="处理展开-收起的逻辑" tabindex="-1">处理展开/收起的逻辑 <a class="header-anchor" href="#处理展开-收起的逻辑" aria-label="Permalink to &quot;处理展开/收起的逻辑&quot;">​</a></h2><p>展开/收起功能，本质上就是改变当前节点数据的 open 字段：</p><ul><li>如果当前 open 字段为 true，说明节点是展开的，点击图标时，应该将其设置为 false</li><li>如果当前没有 open 字段或者 open 字段为 false，说明节点是收起的，点击图标时，应该将其设置为 true</li></ul><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const toggle = (item) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  item.open = !item.open // 改变当前节点的open字段</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>这样我们的目标就完成了：</p><blockquote><p>实现能展开/收起的 tree</p></blockquote><p>不过目前代码都写在 tree 组件的 setup 方法里，加上之前的 renderNode 等方法，setup 方法已经有60+行代码，后续如果继续增加其他功能，setup 代码量会越来越大，也越来越不可读和难以维护，也就越容易出 bug。</p><p>因此需要对它进行重构，使用 vue3 的 <a href="https://v3.cn.vuejs.org/guide/composition-api-introduction.html" target="_blank" rel="noreferrer">composition api</a>，将节点展开/收起相关的变量和逻辑抽离到一个单独的<code>use-toggle.ts</code>文件中。</p><p>composables/use-toggle.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default function useToggle(data: unknown): any {</span></span>
<span class="line"><span style="color:#babed8;">  const openedTree = (tree) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return tree.reduce((acc, item) =&gt; (</span></span>
<span class="line"><span style="color:#babed8;">      item.open</span></span>
<span class="line"><span style="color:#babed8;">        ? acc.concat(item, openedTree(item.children))</span></span>
<span class="line"><span style="color:#babed8;">        : acc.concat(item)</span></span>
<span class="line"><span style="color:#babed8;">    ), [])</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  const openedData = ref(openedTree(data)) // 响应式对象</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  const toggle = (item) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;toggle&#39;, item, item.id, item.open);</span></span>
<span class="line"><span style="color:#babed8;">    item.open = !item.open</span></span>
<span class="line"><span style="color:#babed8;">    openedData.value = openedTree(data)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return {</span></span>
<span class="line"><span style="color:#babed8;">    openedData,</span></span>
<span class="line"><span style="color:#babed8;">    toggle,</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>tree.tsx 中只需要引入需要的变量和方法即可。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import useToggle from &#39;./composables/use-toggle&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">setup(props) {</span></span>
<span class="line"><span style="color:#babed8;">  // 其他逻辑</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 从 useToggle 中引入需要的变量和方法</span></span>
<span class="line"><span style="color:#babed8;">  const { openedData, toggle } = useToggle(data.value)</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 其他逻辑</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本文主要讲述如何一步步给 tree 组件增加展开/收起功能，并使用vue3的组合式api对这个功能从setup 中抽离。</p><h2 id="欢迎参与devui开源项目" tabindex="-1">欢迎参与devui开源项目 <a class="header-anchor" href="#欢迎参与devui开源项目" aria-label="Permalink to &quot;欢迎参与devui开源项目&quot;">​</a></h2><p>我们 <code>DevUI</code> 团队有多个开源项目，现在都在招募<code>contributor</code>，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加<code>DevUI</code>小助手的微信：<code>devui-official</code>，将你拉到我们的核心开发群)</p><ul><li>Ng DevUI: <a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui</a></li><li>Vue DevUI: <a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">https://gitee.com/devui/vue-devui</a></li><li>DevUI Admin <a href="https://github.com/DevCloudFE/ng-devui-admin" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui-admin</a></li></ul><p><code>DevUI</code>官网：<a href="https://devui.design/" target="_blank" rel="noreferrer">https://devui.design/</a></p>`,55);function i(r,b,d,u,y,g){const a=n("EditInfo");return e(),l("div",null,[c,p(a,{time:"2021年10月04日 09:55",title:"阅读 2775 ·  点赞 25 ·  评论 12 ·  收藏 5"})])}const v=s(t,[["render",i]]);export{m as __pageData,v as default};
