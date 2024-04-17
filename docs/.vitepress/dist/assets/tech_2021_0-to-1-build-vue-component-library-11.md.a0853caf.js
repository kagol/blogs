import{_ as a,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const m=JSON.parse('{"title":"从0到1搭建Vue组件库11：实现tree组件禁止展开/收起、点选高亮和节点禁用功能","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/0-to-1-build-vue-component-library-11.md","filePath":"tech/2021/0-to-1-build-vue-component-library-11.md"}'),t={name:"tech/2021/0-to-1-build-vue-component-library-11.md"},c=o(`<h1 id="从0到1搭建vue组件库11-实现tree组件禁止展开-收起、点选高亮和节点禁用功能" tabindex="-1">从0到1搭建Vue组件库11：实现tree组件禁止展开/收起、点选高亮和节点禁用功能 <a class="header-anchor" href="#从0到1搭建vue组件库11-实现tree组件禁止展开-收起、点选高亮和节点禁用功能" aria-label="Permalink to &quot;从0到1搭建Vue组件库11：实现tree组件禁止展开/收起、点选高亮和节点禁用功能&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201511062-dd623b76-b0bc-408c-adbb-45f7f176ab90.png" alt="image"></p><h2 id="_0-tree组件的现状回顾" tabindex="-1">0 tree组件的现状回顾 <a class="header-anchor" href="#_0-tree组件的现状回顾" aria-label="Permalink to &quot;0 tree组件的现状回顾&quot;">​</a></h2><p>我要做开源系列直播到目前已经做了8期：</p><ul><li>1-3期分享tree组件的设计和实现</li><li>4-8期分享组件库工程化，并实现一个五脏六腑俱全的<a href="https://github.com/57code/mini-vue-devui" target="_blank" rel="noreferrer">mini-vue-devui</a>组件库</li></ul><p>到第8期为止，组件库的基础框架搭建（基于Vite+Vue3+TypeScript+JSX，并完成monorepo改造）、文档系统、单元测试、按需构建和发布流程已经全部打通，意味着我们可以基于此不断完善组件，也意味着我们可以暂时将组件库工程化的事务放一旁，继续开发tree组件。</p><p>我们先来看下之前的tree组件进展：</p><ul><li><a href="https://juejin.cn/post/7009273646884028430" target="_blank" rel="noreferrer">渲染一层节点</a></li><li><a href="https://juejin.cn/post/7011535488171376671" target="_blank" rel="noreferrer">渲染多层节点</a></li><li><a href="https://juejin.cn/post/7015023354847428645" target="_blank" rel="noreferrer">增加展开/收起功能</a></li></ul><p>本期主要完善tree组件的以下功能：</p><ol><li>完善tree组件样式</li><li>禁止展开/收起</li><li>点选高亮</li><li>节点禁选</li></ol><h2 id="_1-完善tree组件样式" tabindex="-1">1 完善tree组件样式 <a class="header-anchor" href="#_1-完善tree组件样式" aria-label="Permalink to &quot;1 完善tree组件样式&quot;">​</a></h2><p><code>tree.scss</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$devui-text-weak: var(--devui-text-weak, #575d6c);</span></span>
<span class="line"><span style="color:#babed8;">$devui-font-size: var(--devui-font-size, 12px);</span></span>
<span class="line"><span style="color:#babed8;">$devui-list-item-selected-bg: var(--devui-list-item-selected-bg, #e9edfa);</span></span>
<span class="line"><span style="color:#babed8;">$devui-list-item-hover-bg: var(--devui-list-item-hover-bg, #f2f5fc);</span></span>
<span class="line"><span style="color:#babed8;">$devui-border-radius: var(--devui-border-radius, 2px);</span></span>
<span class="line"><span style="color:#babed8;">$devui-animation-duration-fast: var(--devui-animation-duration-fast, 100ms);</span></span>
<span class="line"><span style="color:#babed8;">$devui-animation-ease-in-smooth: var(--devui-animation-ease-in-smooth, cubic-bezier(0.645, 0.045, 0.355, 1));</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.devui-text-ellipsis {</span></span>
<span class="line"><span style="color:#babed8;">  text-overflow: ellipsis;</span></span>
<span class="line"><span style="color:#babed8;">  overflow: hidden;</span></span>
<span class="line"><span style="color:#babed8;">  white-space: nowrap;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.devui-tree-node {</span></span>
<span class="line"><span style="color:#babed8;">  color: $devui-text-weak;</span></span>
<span class="line"><span style="color:#babed8;">  line-height: 1.5;</span></span>
<span class="line"><span style="color:#babed8;">  white-space: nowrap;</span></span>
<span class="line"><span style="color:#babed8;">  position: relative;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  .devui-tree-node__content {</span></span>
<span class="line"><span style="color:#babed8;">    display: inline-flex;</span></span>
<span class="line"><span style="color:#babed8;">    align-items: center;</span></span>
<span class="line"><span style="color:#babed8;">    font-size: $devui-font-size;</span></span>
<span class="line"><span style="color:#babed8;">    padding-right: 10px;</span></span>
<span class="line"><span style="color:#babed8;">    width: 100%;</span></span>
<span class="line"><span style="color:#babed8;">    border-radius: $devui-border-radius;</span></span>
<span class="line"><span style="color:#babed8;">    padding-left: 6px;</span></span>
<span class="line"><span style="color:#babed8;">    transition: color $devui-animation-duration-fast $devui-animation-ease-in-smooth, background-color $devui-animation-duration-fast $devui-animation-ease-in-smooth;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    &amp;.active {</span></span>
<span class="line"><span style="color:#babed8;">      background-color: $devui-list-item-selected-bg;</span></span>
<span class="line"><span style="color:#babed8;">      text-decoration: none;</span></span>
<span class="line"><span style="color:#babed8;">      border-color: transparent;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    &amp;:not(.active):hover {</span></span>
<span class="line"><span style="color:#babed8;">      background-color: $devui-list-item-hover-bg;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  .devui-tree-node__content--value-wrapper {</span></span>
<span class="line"><span style="color:#babed8;">    display: inline-flex;</span></span>
<span class="line"><span style="color:#babed8;">    align-items: center;</span></span>
<span class="line"><span style="color:#babed8;">    height: 30px;</span></span>
<span class="line"><span style="color:#babed8;">    width: 100%;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  .devui-tree-node__title {</span></span>
<span class="line"><span style="color:#babed8;">    @extend .devui-text-ellipsis;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    margin-left: 5px;</span></span>
<span class="line"><span style="color:#babed8;">    display: inline-block;</span></span>
<span class="line"><span style="color:#babed8;">    border: 1px dashed transparent;</span></span>
<span class="line"><span style="color:#babed8;">    border-radius: $devui-border-radius;</span></span>
<span class="line"><span style="color:#babed8;">    max-width: 100%;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    &amp;:not(.disabled) {</span></span>
<span class="line"><span style="color:#babed8;">      cursor: pointer;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="_2-禁止展开-收起" tabindex="-1">2 禁止展开/收起 <a class="header-anchor" href="#_2-禁止展开-收起" aria-label="Permalink to &quot;2 禁止展开/收起&quot;">​</a></h2><h3 id="_2-1-增加禁止展开-收起的功能" tabindex="-1">2.1 增加禁止展开/收起的功能 <a class="header-anchor" href="#_2-1-增加禁止展开-收起的功能" aria-label="Permalink to &quot;2.1 增加禁止展开/收起的功能&quot;">​</a></h3><p><code>packages/devui-vue/devui/tree/src/composables/use-toggle.ts</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const toggle = (item: TreeItem) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  if (!item.children) return</span></span>
<span class="line"><span style="color:#babed8;">  if (item.disableToggle) return // 新增</span></span>
<span class="line"><span style="color:#babed8;">  item.open = !item.open</span></span>
<span class="line"><span style="color:#babed8;">  openedData.value = openedTree(data)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>在传入tree组件的data数据中增加<code>disableToggle</code>数据</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[{</span></span>
<span class="line"><span style="color:#babed8;">  label: &#39;一级 1&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">  children: [{</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;二级 1-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;三级 1-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }]</span></span>
<span class="line"><span style="color:#babed8;">}, {</span></span>
<span class="line"><span style="color:#babed8;">  label: &#39;一级 2&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">  open: true,</span></span>
<span class="line"><span style="color:#babed8;">  children: [{</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;二级 2-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;三级 2-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }, {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;二级 2-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">    disableToggle: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;三级 2-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }]</span></span>
<span class="line"><span style="color:#babed8;">}, {</span></span>
<span class="line"><span style="color:#babed8;">  label: &#39;一级 3&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">  open: true,</span></span>
<span class="line"><span style="color:#babed8;">  children: [{</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;二级 3-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;三级 3-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }, {</span></span>
<span class="line"><span style="color:#babed8;">    label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">    open: true,</span></span>
<span class="line"><span style="color:#babed8;">    children: [{</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;三级 3-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }]</span></span>
<span class="line"><span style="color:#babed8;">}, {</span></span>
<span class="line"><span style="color:#babed8;">  label: &#39;一级 4&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">}]</span></span></code></pre></div><p>测试功能正常！</p><h3 id="_2-2-增加禁止展开-收起的样式" tabindex="-1">2.2 增加禁止展开/收起的样式 <a class="header-anchor" href="#_2-2-增加禁止展开-收起的样式" aria-label="Permalink to &quot;2.2 增加禁止展开/收起的样式&quot;">​</a></h3><p><code>packages/devui-vue/devui/tree/src/tree.ts</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const renderNode = (item: TreeItem) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div</span></span>
<span class="line"><span style="color:#babed8;">      class={[&#39;devui-tree-node&#39;, item.open &amp;&amp; &#39;devui-tree-node__open&#39;]}</span></span>
<span class="line"><span style="color:#babed8;">      style={{ paddingLeft: \`\${24 * (item.level - 1)}px\` }}</span></span>
<span class="line"><span style="color:#babed8;">    &gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;div class=&quot;devui-tree-node__content&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;div class=&quot;devui-tree-node__content--value-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">          {</span></span>
<span class="line"><span style="color:#babed8;">            item.children</span></span>
<span class="line"><span style="color:#babed8;">              ? &lt;span class={item.disableToggle &amp;&amp; &#39;toggle-disabled&#39;}&gt; // 增加</span></span>
<span class="line"><span style="color:#babed8;">                  {</span></span>
<span class="line"><span style="color:#babed8;">                    item.open</span></span>
<span class="line"><span style="color:#babed8;">                      ? &lt;IconOpen class=&#39;mr-xs&#39; onClick={() =&gt; toggle(item)} /&gt;</span></span>
<span class="line"><span style="color:#babed8;">                      : &lt;IconClose class=&#39;mr-xs&#39; onClick={() =&gt; toggle(item)} /&gt;</span></span>
<span class="line"><span style="color:#babed8;">                  }</span></span>
<span class="line"><span style="color:#babed8;">                &lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">              : &lt;Indent /&gt;</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">          &lt;span class=&quot;devui-tree-node__title&quot;&gt;{item.label}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>增加样式</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">$devui-disabled-text: var(--devui-disabled-text, #adb0b8);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">.toggle-disabled {</span></span>
<span class="line"><span style="color:#babed8;">  cursor: not-allowed;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  svg.svg-icon rect {</span></span>
<span class="line"><span style="color:#babed8;">    stroke: $devui-disabled-text;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  svg.svg-icon path {</span></span>
<span class="line"><span style="color:#babed8;">    fill: $devui-disabled-text;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>效果如下：</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0f91aaf8ece4de2bfb902106408e284~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>完成！</p><h3 id="_2-3-代码重构" tabindex="-1">2.3 代码重构 <a class="header-anchor" href="#_2-3-代码重构" aria-label="Permalink to &quot;2.3 代码重构&quot;">​</a></h3><p>抽离渲染节点前面的图标的逻辑：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const renderIcon = (item: TreeItem) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return item.children</span></span>
<span class="line"><span style="color:#babed8;">    ? &lt;span class={item.disableToggle &amp;&amp; &#39;toggle-disabled&#39;}&gt;</span></span>
<span class="line"><span style="color:#babed8;">        {</span></span>
<span class="line"><span style="color:#babed8;">          item.open</span></span>
<span class="line"><span style="color:#babed8;">            ? &lt;IconOpen class=&#39;mr-xs&#39; onClick={() =&gt; toggle(item)} /&gt;</span></span>
<span class="line"><span style="color:#babed8;">            : &lt;IconClose class=&#39;mr-xs&#39; onClick={() =&gt; toggle(item)} /&gt;</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">      &lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">    : &lt;Indent /&gt;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p><code>renderNode</code>方法中用<code>renderIcon</code>替换相应的代码：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;div class=&quot;devui-tree-node__content--value-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">  { renderIcon(item) }</span></span>
<span class="line"><span style="color:#babed8;">  &lt;span class=&quot;devui-tree-node__title&quot;&gt;{item.label}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/div&gt;</span></span></code></pre></div><p>别忘了在<code>tree-types.ts</code>中增加类型：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">export interface TreeItem {</span></span>
<span class="line"><span style="color:#babed8;">  label: string</span></span>
<span class="line"><span style="color:#babed8;">  children?: TreeData</span></span>
<span class="line"><span style="color:#babed8;">  disableToggle?: boolean // 新增</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="_3-点选高亮" tabindex="-1">3 点选高亮 <a class="header-anchor" href="#_3-点选高亮" aria-label="Permalink to &quot;3 点选高亮&quot;">​</a></h2><h3 id="_3-1-实现-usehighlightnode-这个-composable" tabindex="-1">3.1 实现 useHighlightNode 这个 composable <a class="header-anchor" href="#_3-1-实现-usehighlightnode-这个-composable" aria-label="Permalink to &quot;3.1 实现 useHighlightNode 这个 composable&quot;">​</a></h3><p>增加<code>use-highlight.ts</code>文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { ref, Ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">interface TypeHighlightClass {</span></span>
<span class="line"><span style="color:#babed8;">  [key: string]: &#39;active&#39; | &#39;&#39; | &#39;devui-tree_isDisabledNode&#39;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">type TypeUseHighlightNode = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  nodeClassNameReflect: Ref&lt;TypeHighlightClass&gt;</span></span>
<span class="line"><span style="color:#babed8;">  handleClickOnNode: (index: string) =&gt; void</span></span>
<span class="line"><span style="color:#babed8;">  handleInitNodeClassNameReflect: (isDisabled: boolean, ...keys: Array&lt;string&gt;) =&gt; string</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const HIGHLIGHT_CLASS = &#39;active&#39;</span></span>
<span class="line"><span style="color:#babed8;">const IS_DISABLED_FLAG = &#39;devui-tree_isDisabledNode&#39;</span></span>
<span class="line"><span style="color:#babed8;">const useHighlightNode: TypeUseHighlightNode = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  const nodeClassNameReflectRef = ref&lt;TypeHighlightClass&gt;({})</span></span>
<span class="line"><span style="color:#babed8;">  const handleInit = (isDisabled = false, ...keys) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    const key = keys.join(&#39;-&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    nodeClassNameReflectRef.value[key] = isDisabled ? IS_DISABLED_FLAG : (nodeClassNameReflectRef.value[key] || &#39;&#39;)</span></span>
<span class="line"><span style="color:#babed8;">    return key</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  const handleClick = (key) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    if (nodeClassNameReflectRef.value[key] === IS_DISABLED_FLAG) {</span></span>
<span class="line"><span style="color:#babed8;">      return</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    nodeClassNameReflectRef.value =</span></span>
<span class="line"><span style="color:#babed8;">      Object.fromEntries(</span></span>
<span class="line"><span style="color:#babed8;">        Object</span></span>
<span class="line"><span style="color:#babed8;">          .entries(nodeClassNameReflectRef.value)</span></span>
<span class="line"><span style="color:#babed8;">          .map(([k]) =&gt; [k, k === key ? HIGHLIGHT_CLASS : &#39;&#39;])</span></span>
<span class="line"><span style="color:#babed8;">      )</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  return {</span></span>
<span class="line"><span style="color:#babed8;">    nodeClassNameReflect: nodeClassNameReflectRef,</span></span>
<span class="line"><span style="color:#babed8;">    handleClickOnNode: handleClick,</span></span>
<span class="line"><span style="color:#babed8;">    handleInitNodeClassNameReflect: handleInit,</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">export default useHighlightNode</span></span></code></pre></div><h3 id="_3-2-在-setup-中使用-usehighlightnode" tabindex="-1">3.2 在 setup 中使用 useHighlightNode <a class="header-anchor" href="#_3-2-在-setup-中使用-usehighlightnode" aria-label="Permalink to &quot;3.2 在 setup 中使用 useHighlightNode&quot;">​</a></h3><p>在<code>tree.tsx</code>中使用<code>use-highlight.ts</code>这个<code>composable</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const { nodeClassNameReflect, handleInitNodeClassNameReflect, handleClickOnNode } = useHighlightNode()</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const renderNode = (item: TreeItem) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  const { key = &#39;&#39;, label, disabled, open, level, children } = item</span></span>
<span class="line"><span style="color:#babed8;">  const nodeId = handleInitNodeClassNameReflect(disabled, key, label) // 获取nodeId</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div</span></span>
<span class="line"><span style="color:#babed8;">      class={[&#39;devui-tree-node&#39;, open &amp;&amp; &#39;devui-tree-node__open&#39;]}</span></span>
<span class="line"><span style="color:#babed8;">      style={{ paddingLeft: \`\${24 * (level - 1)}px\` }}</span></span>
<span class="line"><span style="color:#babed8;">    &gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;div</span></span>
<span class="line"><span style="color:#babed8;">        class={\`devui-tree-node__content \${nodeClassNameReflect.value[nodeId]}\`} // 增加高亮样式</span></span>
<span class="line"><span style="color:#babed8;">        onClick={() =&gt; handleClickOnNode(nodeId)} // 增加节点的点击事件</span></span>
<span class="line"><span style="color:#babed8;">      &gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;div class=&quot;devui-tree-node__content--value-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">          { renderIcon(item) }</span></span>
<span class="line"><span style="color:#babed8;">          &lt;span class=&quot;devui-tree-node__title&quot;&gt;{item.label}&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h2 id="_4-节点禁选" tabindex="-1">4 节点禁选 <a class="header-anchor" href="#_4-节点禁选" aria-label="Permalink to &quot;4 节点禁选&quot;">​</a></h2><p>和禁止展开/收起功能类似，分成两步：</p><ol><li>增加禁止逻辑</li><li>增加禁止样式</li></ol><h3 id="_4-1-增加禁止逻辑" tabindex="-1">4.1 增加禁止逻辑 <a class="header-anchor" href="#_4-1-增加禁止逻辑" aria-label="Permalink to &quot;4.1 增加禁止逻辑&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const handleClick = (key) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  // 新增</span></span>
<span class="line"><span style="color:#babed8;">  if (nodeClassNameReflectRef.value[key] === IS_DISABLED_FLAG) {</span></span>
<span class="line"><span style="color:#babed8;">    return</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  nodeClassNameReflectRef.value =</span></span>
<span class="line"><span style="color:#babed8;">    Object.fromEntries(</span></span>
<span class="line"><span style="color:#babed8;">      Object</span></span>
<span class="line"><span style="color:#babed8;">        .entries(nodeClassNameReflectRef.value)</span></span>
<span class="line"><span style="color:#babed8;">        .map(([k]) =&gt; [k, k === key ? HIGHLIGHT_CLASS : &#39;&#39;])</span></span>
<span class="line"><span style="color:#babed8;">    )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="_4-2-增加禁止样式" tabindex="-1">4.2 增加禁止样式 <a class="header-anchor" href="#_4-2-增加禁止样式" aria-label="Permalink to &quot;4.2 增加禁止样式&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;div class=&quot;devui-tree-node__content--value-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">  { renderIcon(item) }</span></span>
<span class="line"><span style="color:#babed8;">  &lt;span class={[&#39;devui-tree-node__title&#39;, item.disabled &amp;&amp; &#39;select-disabled&#39;]}&gt; // 新增</span></span>
<span class="line"><span style="color:#babed8;">    { label }</span></span>
<span class="line"><span style="color:#babed8;">  &lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/div&gt;</span></span></code></pre></div>`,50);function i(d,b,r,y,u,g){const s=n("EditInfo");return e(),l("div",null,[c,p(s,{time:"2021年11月26日 17:54",title:"阅读 1240 ·  点赞 19 ·  评论 2 ·  收藏 3"})])}const v=a(t,[["render",i]]);export{m as __pageData,v as default};
