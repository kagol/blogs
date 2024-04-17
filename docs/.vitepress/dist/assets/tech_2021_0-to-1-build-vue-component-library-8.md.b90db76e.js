import{_ as a,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const g=JSON.parse('{"title":"从0到1搭建Vue组件库08：阶段性小结","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/0-to-1-build-vue-component-library-8.md","filePath":"tech/2021/0-to-1-build-vue-component-library-8.md"}'),t={name:"tech/2021/0-to-1-build-vue-component-library-8.md"},c=o(`<h1 id="从0到1搭建vue组件库08-阶段性小结" tabindex="-1">从0到1搭建Vue组件库08：阶段性小结 <a class="header-anchor" href="#从0到1搭建vue组件库08-阶段性小结" aria-label="Permalink to &quot;从0到1搭建Vue组件库08：阶段性小结&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png" alt="image"></p><p>本文主要对之前的直播内容做一次阶段性的总结，将之前的内容穿起来，并搭建一个<a href="https://github.com/57code/mini-vue-devui" target="_blank" rel="noreferrer">mini-vue-devui</a>项目，后续组件开发和工程化，只需要在这个统一的仓库里进行就行，不用每一次都起一个新项目。</p><p>这个【Vue DevUI开源指南】的系列的直播本就是一个连贯的整体，我们通过它给大家分享vue3组件库的搭建流程和组件设计和开发的原理，欢迎大家持续关注呀～</p><p>整体搭建步骤：</p><ol><li>搭建一个支持<code>TypeScript</code>/<code>JSX</code>的<code>Vue3</code>组件库工程</li><li>增加能展开/收起的<code>tree</code>组件</li><li>增加<code>VitePress</code>文档系统</li><li>增加demo代码展开/收起功能</li><li>搭建<code>DevUI CLI</code>快速创建组件模板</li></ol><h2 id="_1-搭建一个支持typescript-jsx的vue3组件库工程" tabindex="-1">1 搭建一个支持TypeScript/JSX的Vue3组件库工程 <a class="header-anchor" href="#_1-搭建一个支持typescript-jsx的vue3组件库工程" aria-label="Permalink to &quot;1 搭建一个支持TypeScript/JSX的Vue3组件库工程&quot;">​</a></h2><h3 id="搭建vue-3-typescript-vite基础工程" tabindex="-1">搭建Vue 3 + Typescript + Vite基础工程 <a class="header-anchor" href="#搭建vue-3-typescript-vite基础工程" aria-label="Permalink to &quot;搭建Vue 3 + Typescript + Vite基础工程&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn create vite mini-vue-devui --template vue-ts</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">cd mini-vue-devui</span></span>
<span class="line"><span style="color:#babed8;">yarn</span></span>
<span class="line"><span style="color:#babed8;">yarn dev</span></span>
<span class="line"><span style="color:#babed8;">yarn build</span></span></code></pre></div><h3 id="引入sass" tabindex="-1">引入sass <a class="header-anchor" href="#引入sass" aria-label="Permalink to &quot;引入sass&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D sass</span></span></code></pre></div><h3 id="引入jsx" tabindex="-1">引入JSX <a class="header-anchor" href="#引入jsx" aria-label="Permalink to &quot;引入JSX&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D @vitejs/plugin-vue-jsx</span></span></code></pre></div><p>vite.config.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span style="color:#babed8;">import vue from &#39;@vitejs/plugin-vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import vueJsx from &#39;@vitejs/plugin-vue-jsx&#39; // 新增</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// https://vitejs.dev/config/</span></span>
<span class="line"><span style="color:#babed8;">export default defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">  plugins: [</span></span>
<span class="line"><span style="color:#babed8;">    vue(),</span></span>
<span class="line"><span style="color:#babed8;">    vueJsx() // 新增</span></span>
<span class="line"><span style="color:#babed8;">  ]</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><p>参考：</p><ol><li><a href="https://juejin.cn/post/7017101147865350158" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南04：使用Vite搭建一个支持TypeScript/JSX的Vue3组件库工程</a></li></ol><h2 id="_2-增加能展开-收起的tree组件" tabindex="-1">2 增加能展开/收起的tree组件 <a class="header-anchor" href="#_2-增加能展开-收起的tree组件" aria-label="Permalink to &quot;2 增加能展开/收起的tree组件&quot;">​</a></h2><h3 id="组件" tabindex="-1">组件 <a class="header-anchor" href="#组件" aria-label="Permalink to &quot;组件&quot;">​</a></h3><p>目录结构</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">├── devui</span></span>
<span class="line"><span style="color:#babed8;">|  └── tree</span></span>
<span class="line"><span style="color:#babed8;">|     ├── index.ts</span></span>
<span class="line"><span style="color:#babed8;">|     └── src</span></span>
<span class="line"><span style="color:#babed8;">|        ├── components</span></span>
<span class="line"><span style="color:#babed8;">|        |  ├── icon-close.tsx</span></span>
<span class="line"><span style="color:#babed8;">|        |  └── icon-open.tsx</span></span>
<span class="line"><span style="color:#babed8;">|        ├── composables</span></span>
<span class="line"><span style="color:#babed8;">|        |  └── use-toggle.ts</span></span>
<span class="line"><span style="color:#babed8;">|        ├── tree-types.ts</span></span>
<span class="line"><span style="color:#babed8;">|        ├── tree.scss</span></span>
<span class="line"><span style="color:#babed8;">|        └── tree.tsx</span></span></code></pre></div><h4 id="组件入口文件tree-index-ts" tabindex="-1">组件入口文件<code>tree/index.ts</code> <a class="header-anchor" href="#组件入口文件tree-index-ts" aria-label="Permalink to &quot;组件入口文件\`tree/index.ts\`&quot;">​</a></h4><p>tree/index.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import type { App } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import Tree from &#39;./src/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Tree.install = function(app: App): void {</span></span>
<span class="line"><span style="color:#babed8;">  app.component(Tree.name, Tree)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export { Tree }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default {</span></span>
<span class="line"><span style="color:#babed8;">  title: &#39;Tree 树&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  category: &#39;数据展示&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  status: &#39;20%&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  install(app: App): void {</span></span>
<span class="line"><span style="color:#babed8;">    app.use(Tree as any)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="组件源文件-tree-src-tree-tsx" tabindex="-1">组件源文件 <code>tree/src/tree.tsx</code> <a class="header-anchor" href="#组件源文件-tree-src-tree-tsx" aria-label="Permalink to &quot;组件源文件 \`tree/src/tree.tsx\`&quot;">​</a></h4><p>tree/src/tree.tsx</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { defineComponent, toRefs } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import { treeProps, TreeProps, TreeData, TreeItem } from &#39;./tree-types&#39;</span></span>
<span class="line"><span style="color:#babed8;">import IconOpen from &#39;./components/icon-open&#39;</span></span>
<span class="line"><span style="color:#babed8;">import IconClose from &#39;./components/icon-close&#39;</span></span>
<span class="line"><span style="color:#babed8;">import useToggle from &#39;./composables/use-toggle&#39;</span></span>
<span class="line"><span style="color:#babed8;">import &#39;./tree.scss&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default defineComponent({</span></span>
<span class="line"><span style="color:#babed8;">  name: &#39;DTree&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  props: treeProps,</span></span>
<span class="line"><span style="color:#babed8;">  emits: [],</span></span>
<span class="line"><span style="color:#babed8;">  setup(props: TreeProps, ctx) {</span></span>
<span class="line"><span style="color:#babed8;">    const { data } = toRefs(props)</span></span>
<span class="line"><span style="color:#babed8;">    const { openedData, toggle } = useToggle(data.value)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    // 增加缩进的展位元素</span></span>
<span class="line"><span style="color:#babed8;">    const Indent = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      return &lt;span style=&quot;display: inline-block; width: 16px; height: 16px;&quot;&gt;&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    const renderNode = (item: TreeItem) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      return (</span></span>
<span class="line"><span style="color:#babed8;">        &lt;div</span></span>
<span class="line"><span style="color:#babed8;">          class={[&#39;devui-tree-node&#39;, item.open &amp;&amp; &#39;devui-tree-node__open&#39;]}</span></span>
<span class="line"><span style="color:#babed8;">          style={{ paddingLeft: \`\${24 * (item.level - 1)}px\` }}</span></span>
<span class="line"><span style="color:#babed8;">        &gt;</span></span>
<span class="line"><span style="color:#babed8;">          &lt;div class=&quot;devui-tree-node__content&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">            &lt;div class=&quot;devui-tree-node__content--value-wrapper&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">              {</span></span>
<span class="line"><span style="color:#babed8;">                item.children</span></span>
<span class="line"><span style="color:#babed8;">                  ? item.open</span></span>
<span class="line"><span style="color:#babed8;">                    ? &lt;IconOpen class=&quot;mr-xs&quot; onClick={() =&gt; toggle(item)} /&gt; // 给节点绑定点击事件</span></span>
<span class="line"><span style="color:#babed8;">                    : &lt;IconClose class=&quot;mr-xs&quot; onClick={() =&gt; toggle(item)} /&gt; // 给节点绑定点击事件</span></span>
<span class="line"><span style="color:#babed8;">                  : &lt;Indent /&gt;</span></span>
<span class="line"><span style="color:#babed8;">              }</span></span>
<span class="line"><span style="color:#babed8;">              &lt;span class=&quot;devui-tree-node__title&quot;&gt;{ item.label }&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">            &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">          &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">      )</span></span>
<span class="line"><span style="color:#babed8;">    }    </span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    const renderTree = (tree: TreeData): JSX.Element[] =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      return tree.map(item =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        if (!item.children) {</span></span>
<span class="line"><span style="color:#babed8;">          return renderNode(item)</span></span>
<span class="line"><span style="color:#babed8;">        } else {</span></span>
<span class="line"><span style="color:#babed8;">          return (</span></span>
<span class="line"><span style="color:#babed8;">            &lt;&gt;</span></span>
<span class="line"><span style="color:#babed8;">              {renderNode(item)}</span></span>
<span class="line"><span style="color:#babed8;">              {renderTree(item.children)}</span></span>
<span class="line"><span style="color:#babed8;">            &lt;/&gt;</span></span>
<span class="line"><span style="color:#babed8;">          )</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">      })</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      return (</span></span>
<span class="line"><span style="color:#babed8;">        &lt;div class=&quot;devui-tree&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">          { openedData.value.map((item: TreeItem) =&gt; renderNode(item)) }</span></span>
<span class="line"><span style="color:#babed8;">        &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">      )</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><h4 id="组件props和类型文件tree-types-ts" tabindex="-1">组件props和类型文件<code>tree-types.ts</code> <a class="header-anchor" href="#组件props和类型文件tree-types-ts" aria-label="Permalink to &quot;组件props和类型文件\`tree-types.ts\`&quot;">​</a></h4><p>tree-types.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import type { PropType, ExtractPropTypes } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export interface TreeItem {</span></span>
<span class="line"><span style="color:#babed8;">  label: string</span></span>
<span class="line"><span style="color:#babed8;">  children: TreeData</span></span>
<span class="line"><span style="color:#babed8;">  [key: string]: any</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export type TreeData = Array&lt;TreeItem&gt;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export const treeProps = {</span></span>
<span class="line"><span style="color:#babed8;">  data: {</span></span>
<span class="line"><span style="color:#babed8;">    type: Array as PropType&lt;TreeData&gt;,</span></span>
<span class="line"><span style="color:#babed8;">    default: () =&gt; [],</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">} as const</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export type TreeProps = ExtractPropTypes&lt;typeof treeProps&gt;</span></span></code></pre></div><h4 id="展开-收起的hooks-use-toggle-ts" tabindex="-1">展开/收起的hooks <code>use-toggle.ts</code> <a class="header-anchor" href="#展开-收起的hooks-use-toggle-ts" aria-label="Permalink to &quot;展开/收起的hooks \`use-toggle.ts\`&quot;">​</a></h4><p>use-toggle.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { ref } from &#39;vue&#39;</span></span>
<span class="line"><span style="color:#babed8;">import { TreeData, TreeItem } from &#39;../tree-types&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default function useToggle(data: TreeData): any {</span></span>
<span class="line"><span style="color:#babed8;">  const openedTree = (tree: any) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    return tree.reduce((acc: TreeItem, item: TreeItem) =&gt; (</span></span>
<span class="line"><span style="color:#babed8;">      item.open</span></span>
<span class="line"><span style="color:#babed8;">        ? acc.concat(item, openedTree(item.children))</span></span>
<span class="line"><span style="color:#babed8;">        : acc.concat(item)</span></span>
<span class="line"><span style="color:#babed8;">    ), [])</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  const openedData = ref(openedTree(data)) // 响应式对象</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  const toggle = (item: TreeItem) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    if (!item.children) return</span></span>
<span class="line"><span style="color:#babed8;">    item.open = !item.open</span></span>
<span class="line"><span style="color:#babed8;">    openedData.value = openedTree(data)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  return {</span></span>
<span class="line"><span style="color:#babed8;">    openedData,</span></span>
<span class="line"><span style="color:#babed8;">    toggle,</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="图标组件" tabindex="-1">图标组件 <a class="header-anchor" href="#图标组件" aria-label="Permalink to &quot;图标组件&quot;">​</a></h4><p>icon-close.tsx</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const IconClose = (props: any) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;svg</span></span>
<span class="line"><span style="color:#babed8;">      width=&quot;16px&quot;</span></span>
<span class="line"><span style="color:#babed8;">      height=&quot;16px&quot;</span></span>
<span class="line"><span style="color:#babed8;">      viewBox=&quot;0 0 16 16&quot;</span></span>
<span class="line"><span style="color:#babed8;">      version=&quot;1.1&quot;</span></span>
<span class="line"><span style="color:#babed8;">      xmlns=&quot;http://www.w3.org/2000/svg&quot;</span></span>
<span class="line"><span style="color:#babed8;">      class={[&quot;svg-icon&quot;, props.class]}</span></span>
<span class="line"><span style="color:#babed8;">    &gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;g stroke=&quot;none&quot; stroke-width=&quot;1&quot; fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;rect x=&quot;0.5&quot; y=&quot;0.5&quot; width=&quot;15&quot; height=&quot;15&quot; rx=&quot;2&quot; stroke=&quot;#252b3a&quot;&gt;&lt;/rect&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;path</span></span>
<span class="line"><span style="color:#babed8;">          fill=&quot;#252b3a&quot;</span></span>
<span class="line"><span style="color:#babed8;">          d=&quot;M8.75,4 L8.75,7.25 L12,7.25 L12,8.75 L8.749,8.75 L8.75,12 L7.25,12 L7.249,8.75 L4,8.75 L4,7.25 L7.25,7.25 L7.25,4 L8.75,4 Z&quot;</span></span>
<span class="line"><span style="color:#babed8;">        &gt;&lt;/path&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;/g&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/svg&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default IconClose</span></span></code></pre></div><p>icon-open.tsx</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const IconOpen = (props: any) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  return (</span></span>
<span class="line"><span style="color:#babed8;">    &lt;svg</span></span>
<span class="line"><span style="color:#babed8;">      width=&quot;16px&quot;</span></span>
<span class="line"><span style="color:#babed8;">      height=&quot;16px&quot;</span></span>
<span class="line"><span style="color:#babed8;">      viewBox=&quot;0 0 16 16&quot;</span></span>
<span class="line"><span style="color:#babed8;">      version=&quot;1.1&quot;</span></span>
<span class="line"><span style="color:#babed8;">      xmlns=&quot;http://www.w3.org/2000/svg&quot;</span></span>
<span class="line"><span style="color:#babed8;">      class={[&quot;svg-icon svg-icon-close&quot;, props.class]}</span></span>
<span class="line"><span style="color:#babed8;">    &gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;g stroke-width=&quot;1&quot; fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;rect x=&quot;0.5&quot; y=&quot;0.5&quot; width=&quot;15&quot; height=&quot;15&quot; rx=&quot;2&quot; stroke=&quot;#5e7ce0&quot;&gt;&lt;/rect&gt;</span></span>
<span class="line"><span style="color:#babed8;">        &lt;rect x=&quot;4&quot; y=&quot;7&quot; width=&quot;8&quot; height=&quot;2&quot; fill=&quot;#5e7ce0&quot;&gt;&lt;/rect&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;/g&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/svg&gt;</span></span>
<span class="line"><span style="color:#babed8;">  )</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default IconOpen</span></span></code></pre></div><h3 id="文档" tabindex="-1">文档 <a class="header-anchor" href="#文档" aria-label="Permalink to &quot;文档&quot;">​</a></h3><p>目录结构</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">├── docs</span></span>
<span class="line"><span style="color:#babed8;">|  ├── components</span></span>
<span class="line"><span style="color:#babed8;">|  |  └── tree</span></span>
<span class="line"><span style="color:#babed8;">|  |     └── index.md</span></span></code></pre></div><p>tree/index.md</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;d-tree :data=&quot;data&quot;&gt;&lt;/d-tree&gt;</span></span>
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
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
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
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        open: true, // 新增</span></span>
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
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span></code></pre></div><h3 id="引入tree组件" tabindex="-1">引入tree组件 <a class="header-anchor" href="#引入tree组件" aria-label="Permalink to &quot;引入tree组件&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import Tree from &#39;../devui/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">createApp(App).use(Tree).mount(&#39;#app&#39;)</span></span></code></pre></div><p>使用</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-tree :data=&quot;data&quot;&gt;&lt;/d-tree&gt;</span></span></code></pre></div><p>参考：</p><ol><li><a href="https://juejin.cn/post/7009273646884028430" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南01：提交我的第一次pr</a></li><li><a href="https://juejin.cn/post/7011535488171376671" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件</a></li><li><a href="https://juejin.cn/post/7015023354847428645" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南03：如何给 tree 组件增加展开/收起功能</a></li></ol><h2 id="_3-增加vitepress文档系统" tabindex="-1">3 增加VitePress文档系统 <a class="header-anchor" href="#_3-增加vitepress文档系统" aria-label="Permalink to &quot;3 增加VitePress文档系统&quot;">​</a></h2><h3 id="安装vitepress依赖" tabindex="-1">安装vitepress依赖 <a class="header-anchor" href="#安装vitepress依赖" aria-label="Permalink to &quot;安装vitepress依赖&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D vitepress</span></span></code></pre></div><h3 id="编写docs-index-md文档" tabindex="-1">编写<code>docs/index.md</code>文档 <a class="header-anchor" href="#编写docs-index-md文档" aria-label="Permalink to &quot;编写\`docs/index.md\`文档&quot;">​</a></h3><p>docs/index.md</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">## Hello VitePress</span></span></code></pre></div><h3 id="编写脚本命令" tabindex="-1">编写脚本命令 <a class="header-anchor" href="#编写脚本命令" aria-label="Permalink to &quot;编写脚本命令&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;scripts&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;dev&quot;: &quot;vite&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;build&quot;: &quot;vue-tsc --noEmit &amp;&amp; vite build&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;serve&quot;: &quot;vite preview&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;docs:dev&quot;: &quot;vitepress dev docs&quot;, // 新增</span></span>
<span class="line"><span style="color:#babed8;">    &quot;docs:build&quot;: &quot;vitepress build docs&quot;, // 新增</span></span>
<span class="line"><span style="color:#babed8;">    &quot;docs:serve&quot;: &quot;vitepress serve docs&quot; // 新增</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="配置jsx" tabindex="-1">配置JSX <a class="header-anchor" href="#配置jsx" aria-label="Permalink to &quot;配置JSX&quot;">​</a></h3><p>docs/vite.config.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { defineConfig } from &#39;vite&#39;</span></span>
<span class="line"><span style="color:#babed8;">import vueJsx from &#39;@vitejs/plugin-vue-jsx&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// https://vitejs.dev/config/</span></span>
<span class="line"><span style="color:#babed8;">export default defineConfig({</span></span>
<span class="line"><span style="color:#babed8;">  plugins: [vueJsx()]</span></span>
<span class="line"><span style="color:#babed8;">})</span></span></code></pre></div><h3 id="配置左侧菜单sidebar" tabindex="-1">配置左侧菜单sidebar <a class="header-anchor" href="#配置左侧菜单sidebar" aria-label="Permalink to &quot;配置左侧菜单sidebar&quot;">​</a></h3><p>docs/.vitepress/config.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const sidebar = {</span></span>
<span class="line"><span style="color:#babed8;">  &#39;/&#39;: [</span></span>
<span class="line"><span style="color:#babed8;">    { text: &#39;快速开始&#39;, link: &#39;/&#39; },</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      text: &#39;通用&#39;</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      text: &#39;导航&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      text: &#39;反馈&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      text: &#39;数据录入&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      text: &#39;数据展示&#39;,</span></span>
<span class="line"><span style="color:#babed8;">      children: [</span></span>
<span class="line"><span style="color:#babed8;">        { text: &#39;Tree 树&#39;, link: &#39;/components/tree/&#39; },</span></span>
<span class="line"><span style="color:#babed8;">      ]</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      text: &#39;布局&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">  ]</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const config = {</span></span>
<span class="line"><span style="color:#babed8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#babed8;">    sidebar,</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default config</span></span></code></pre></div><h3 id="引入tree组件-1" tabindex="-1">引入tree组件 <a class="header-anchor" href="#引入tree组件-1" aria-label="Permalink to &quot;引入tree组件&quot;">​</a></h3><p>docs/.vitepress/theme/index.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import Theme from &#39;vitepress/dist/client/theme-default&#39;</span></span>
<span class="line"><span style="color:#babed8;">import Tree from &#39;../../../devui/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default {</span></span>
<span class="line"><span style="color:#babed8;">  ...Theme,</span></span>
<span class="line"><span style="color:#babed8;">  enhanceApp({ app }) {</span></span>
<span class="line"><span style="color:#babed8;">    app.use(Tree)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="编写tree组件的md文档" tabindex="-1">编写tree组件的md文档 <a class="header-anchor" href="#编写tree组件的md文档" aria-label="Permalink to &quot;编写tree组件的md文档&quot;">​</a></h3><p>docs/components/tree/index.md</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">## Tree 树</span></span>
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
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
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
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 4&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    }])</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return {</span></span>
<span class="line"><span style="color:#babed8;">      data</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span></code></pre></div><p>参考：</p><ol><li><a href="https://juejin.cn/post/7019314307682795534" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南05：给Vue3组件库添加VitePress文档系统</a></li></ol><h2 id="_4-增加demo代码展开-收起功能" tabindex="-1">4 增加demo代码展开/收起功能 <a class="header-anchor" href="#_4-增加demo代码展开-收起功能" aria-label="Permalink to &quot;4 增加demo代码展开/收起功能&quot;">​</a></h2><h3 id="安装vitepress-theme-demoblock依赖" tabindex="-1">安装vitepress-theme-demoblock依赖 <a class="header-anchor" href="#安装vitepress-theme-demoblock依赖" aria-label="Permalink to &quot;安装vitepress-theme-demoblock依赖&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D vitepress-theme-demoblock</span></span></code></pre></div><h3 id="配置-demoblockplugin" tabindex="-1">配置 demoBlockPlugin <a class="header-anchor" href="#配置-demoblockplugin" aria-label="Permalink to &quot;配置 demoBlockPlugin&quot;">​</a></h3><p>docs/.vitepress/config.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { demoBlockPlugin } from &#39;vitepress-theme-demoblock&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const config = {</span></span>
<span class="line"><span style="color:#babed8;">  themeConfig: {</span></span>
<span class="line"><span style="color:#babed8;">    sidebar,</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 以下是新增的</span></span>
<span class="line"><span style="color:#babed8;">  markdown: {</span></span>
<span class="line"><span style="color:#babed8;">    config: (md) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      // 这里可以使用 markdown-it 插件，vitepress-theme-demoblock就是基于此开发的</span></span>
<span class="line"><span style="color:#babed8;">      md.use(demoBlockPlugin)</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="配置-vitepress-rc-脚本命令" tabindex="-1">配置 vitepress-rc 脚本命令 <a class="header-anchor" href="#配置-vitepress-rc-脚本命令" aria-label="Permalink to &quot;配置 vitepress-rc 脚本命令&quot;">​</a></h3><p>自动生成<code>docs/.vitepress/theme/register-components.js</code></p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;register:components&quot;: &quot;vitepress-rc&quot;</span></span></code></pre></div><h3 id="注册demo-demoblock组件" tabindex="-1">注册Demo/DemoBlock组件 <a class="header-anchor" href="#注册demo-demoblock组件" aria-label="Permalink to &quot;注册Demo/DemoBlock组件&quot;">​</a></h3><p>docs/.vitepress/theme/index.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import Theme from &#39;vitepress/dist/client/theme-default&#39;</span></span>
<span class="line"><span style="color:#babed8;">import Tree from &#39;../../../devui/tree&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 新增</span></span>
<span class="line"><span style="color:#babed8;">// 主题样式</span></span>
<span class="line"><span style="color:#babed8;">import &#39;vitepress-theme-demoblock/theme/styles/index.css&#39;</span></span>
<span class="line"><span style="color:#babed8;">// 插件的组件，主要是demo组件</span></span>
<span class="line"><span style="color:#babed8;">import { registerComponents } from &#39;./register-components.js&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export default {</span></span>
<span class="line"><span style="color:#babed8;">  ...Theme,</span></span>
<span class="line"><span style="color:#babed8;">  enhanceApp({ app }) {</span></span>
<span class="line"><span style="color:#babed8;">    app.use(Tree)</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    // 新增</span></span>
<span class="line"><span style="color:#babed8;">    registerComponents(app)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="编写demo展开-收起的md文档" tabindex="-1">编写demo展开/收起的md文档 <a class="header-anchor" href="#编写demo展开-收起的md文档" aria-label="Permalink to &quot;编写demo展开/收起的md文档&quot;">​</a></h3><p>docs/components/tree/index.md</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">## Tree 树</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">:::demo 渲染一棵基本树</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`\`\`vue</span></span>
<span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;d-tree :data=&quot;data&quot;&gt;&lt;/d-tree&gt;</span></span>
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
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
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
<span class="line"><span style="color:#babed8;">      open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">      children: [{</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-1&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-1-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }, {</span></span>
<span class="line"><span style="color:#babed8;">        label: &#39;二级 3-2&#39;, level: 2,</span></span>
<span class="line"><span style="color:#babed8;">        open: true, // 新增</span></span>
<span class="line"><span style="color:#babed8;">        children: [{</span></span>
<span class="line"><span style="color:#babed8;">          label: &#39;三级 3-2-1&#39;, level: 3,</span></span>
<span class="line"><span style="color:#babed8;">        }]</span></span>
<span class="line"><span style="color:#babed8;">      }]</span></span>
<span class="line"><span style="color:#babed8;">    }, {</span></span>
<span class="line"><span style="color:#babed8;">      label: &#39;一级 4&#39;, level: 1,</span></span>
<span class="line"><span style="color:#babed8;">    }])</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    return {</span></span>
<span class="line"><span style="color:#babed8;">      data</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;">//\`\`\`</span></span>
<span class="line"><span style="color:#babed8;">:::</span></span></code></pre></div><p>参考：</p><ol><li><a href="https://juejin.cn/post/7019314307682795534#heading-13" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南05：给Vue3组件库添加VitePress文档系统</a></li></ol><h2 id="_5-搭建devui-cli快速创建组件模板" tabindex="-1">5 搭建<code>DevUI CLI</code>快速创建组件模板 <a class="header-anchor" href="#_5-搭建devui-cli快速创建组件模板" aria-label="Permalink to &quot;5 搭建\`DevUI CLI\`快速创建组件模板&quot;">​</a></h2><h3 id="安装依赖" tabindex="-1">安装依赖 <a class="header-anchor" href="#安装依赖" aria-label="Permalink to &quot;安装依赖&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn add -D commander inquirer fs-extra kolorist esbuild</span></span></code></pre></div><h3 id="开发命令脚本" tabindex="-1">开发命令脚本 <a class="header-anchor" href="#开发命令脚本" aria-label="Permalink to &quot;开发命令脚本&quot;">​</a></h3><p>devui-cli/index.js</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">#!/usr/bin/env node</span></span>
<span class="line"><span style="color:#babed8;">import { Command } from &#39;commander&#39;</span></span>
<span class="line"><span style="color:#babed8;">import { onCreate } from &#39;./commands/create&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 创建命令对象</span></span>
<span class="line"><span style="color:#babed8;">const program = new Command()</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 注册命令、参数、回调</span></span>
<span class="line"><span style="color:#babed8;">program</span></span>
<span class="line"><span style="color:#babed8;">  // 注册 create 命令</span></span>
<span class="line"><span style="color:#babed8;">  .command(&#39;create&#39;)</span></span>
<span class="line"><span style="color:#babed8;">  // 添加命令描述</span></span>
<span class="line"><span style="color:#babed8;">  .description(&#39;创建一个组件模板或配置文件&#39;)</span></span>
<span class="line"><span style="color:#babed8;">  // 添加命令参数 -t | --type &lt;type&gt; ，&lt;type&gt; 表示该参数必填，[type] 表示选填</span></span>
<span class="line"><span style="color:#babed8;">  .option(&#39;-t --type &lt;type&gt;&#39;, \`创建类型，可选值：component, lib-entry\`)</span></span>
<span class="line"><span style="color:#babed8;">  // 注册命令回调</span></span>
<span class="line"><span style="color:#babed8;">  .action(onCreate)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// 执行命令行参数解析</span></span>
<span class="line"><span style="color:#babed8;">program.parse()</span></span></code></pre></div><p>devui-cli/commands/create.js</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import inquirer from &#39;inquirer&#39;</span></span>
<span class="line"><span style="color:#babed8;">import { red } from &#39;kolorist&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// create type 支持项</span></span>
<span class="line"><span style="color:#babed8;">const CREATE_TYPES = [&#39;component&#39;, &#39;lib-entry&#39;]</span></span>
<span class="line"><span style="color:#babed8;">// 文档分类</span></span>
<span class="line"><span style="color:#babed8;">const DOCS_CATEGORIES = [&#39;通用&#39;, &#39;导航&#39;, &#39;反馈&#39;, &#39;数据录入&#39;, &#39;数据展示&#39;, &#39;布局&#39;]</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">export async function onCreate(cmd = {}) {</span></span>
<span class="line"><span style="color:#babed8;">  let { type } = cmd</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 如果没有在命令参数里带入 type 那么就询问一次</span></span>
<span class="line"><span style="color:#babed8;">  if (!type) {</span></span>
<span class="line"><span style="color:#babed8;">    const result = await inquirer.prompt([</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        // 用于获取后的属性名</span></span>
<span class="line"><span style="color:#babed8;">        name: &#39;type&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        // 交互方式为列表单选</span></span>
<span class="line"><span style="color:#babed8;">        type: &#39;list&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        // 提示信息</span></span>
<span class="line"><span style="color:#babed8;">        message: &#39;（必填）请选择创建类型：&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        // 选项列表</span></span>
<span class="line"><span style="color:#babed8;">        choices: CREATE_TYPES,</span></span>
<span class="line"><span style="color:#babed8;">        // 默认值，这里是索引下标</span></span>
<span class="line"><span style="color:#babed8;">        default: 0</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    ])</span></span>
<span class="line"><span style="color:#babed8;">    // 赋值 type</span></span>
<span class="line"><span style="color:#babed8;">    type = result.type</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 如果获取的类型不在我们支持范围内，那么输出错误提示并重新选择</span></span>
<span class="line"><span style="color:#babed8;">  if (CREATE_TYPES.every((t) =&gt; type !== t)) {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(</span></span>
<span class="line"><span style="color:#babed8;">      red(\`当前类型仅支持：\${CREATE_TYPES.join(&#39;, &#39;)}，收到不在支持范围内的 &quot;\${type}&quot;，请重新选择！\`)</span></span>
<span class="line"><span style="color:#babed8;">    )</span></span>
<span class="line"><span style="color:#babed8;">    return onCreate()</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  try {</span></span>
<span class="line"><span style="color:#babed8;">    switch (type) {</span></span>
<span class="line"><span style="color:#babed8;">      case &#39;component&#39;:</span></span>
<span class="line"><span style="color:#babed8;">        // 如果是组件，我们还需要收集一些信息</span></span>
<span class="line"><span style="color:#babed8;">        const info = await inquirer.prompt([</span></span>
<span class="line"><span style="color:#babed8;">          {</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;name&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            type: &#39;input&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            message: &#39;（必填）请输入组件 name ，将用作目录及文件名：&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            validate: (value) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">              if (value.trim() === &#39;&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">                return &#39;组件 name 是必填项！&#39;</span></span>
<span class="line"><span style="color:#babed8;">              }</span></span>
<span class="line"><span style="color:#babed8;">              return true</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          {</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;title&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            type: &#39;input&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            message: &#39;（必填）请输入组件中文名称，将用作文档列表显示：&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            validate: (value) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">              if (value.trim() === &#39;&#39;) {</span></span>
<span class="line"><span style="color:#babed8;">                return &#39;组件名称是必填项！&#39;</span></span>
<span class="line"><span style="color:#babed8;">              }</span></span>
<span class="line"><span style="color:#babed8;">              return true</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          {</span></span>
<span class="line"><span style="color:#babed8;">            name: &#39;category&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            type: &#39;list&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            message: &#39;（必填）请选择组件分类，将用作文档列表分类：&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            choices: DOCS_CATEGORIES,</span></span>
<span class="line"><span style="color:#babed8;">            default: 0</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">        ])</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">        createComponent(info)</span></span>
<span class="line"><span style="color:#babed8;">        break</span></span>
<span class="line"><span style="color:#babed8;">      case &#39;lib-entry&#39;:</span></span>
<span class="line"><span style="color:#babed8;">        createLibEntry()</span></span>
<span class="line"><span style="color:#babed8;">        break</span></span>
<span class="line"><span style="color:#babed8;">      default:</span></span>
<span class="line"><span style="color:#babed8;">        break</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  } catch (e) {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(red(&#39;✖&#39;) + e.toString())</span></span>
<span class="line"><span style="color:#babed8;">    process.exit(1)</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">function createComponent(info) {</span></span>
<span class="line"><span style="color:#babed8;">  // 输出收集到的组件信息</span></span>
<span class="line"><span style="color:#babed8;">  console.log(info)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">function createLibEntry() {</span></span>
<span class="line"><span style="color:#babed8;">  console.log(&#39;create lib-entry file.&#39;)</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="添加脚本命令" tabindex="-1">添加脚本命令 <a class="header-anchor" href="#添加脚本命令" aria-label="Permalink to &quot;添加脚本命令&quot;">​</a></h3><p>package.json</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">    // --bundle 标识打包的入口文件</span></span>
<span class="line"><span style="color:#babed8;">    // --format 转换为目标格式代码</span></span>
<span class="line"><span style="color:#babed8;">    // --platform 目标平台，默认 browser</span></span>
<span class="line"><span style="color:#babed8;">    // --outdir 输出目录</span></span>
<span class="line"><span style="color:#babed8;">    // 开发时实时编译</span></span>
<span class="line"><span style="color:#babed8;">    &quot;dev&quot;: &quot;esbuild --bundle ./src/index.js --format=cjs --platform=node --outdir=./lib --watch&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    // 打包命令</span></span>
<span class="line"><span style="color:#babed8;">    &quot;build&quot;: &quot;esbuild --bundle ./src/index.js --format=cjs --platform=node --outdir=./lib&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    // 执行 create 命令，如果有多个命令，可以去掉 create ，使用时再传入</span></span>
<span class="line"><span style="color:#babed8;">    &quot;cli&quot;: &quot;node ./lib/index.js create&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>交互模式执行：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn cli</span></span></code></pre></div><p>带参数直接执行：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn cli -t component // -t 是 --type 的别名</span></span></code></pre></div><p>参考：</p><ol><li><a href="https://juejin.cn/post/7021915468046811144" target="_blank" rel="noreferrer">【我要做开源】Vue DevUI开源指南06：手把手带你开发一个脚手架</a></li></ol><h2 id="往期b站录播地址" tabindex="-1">往期B站录播地址 <a class="header-anchor" href="#往期b站录播地址" aria-label="Permalink to &quot;往期B站录播地址&quot;">​</a></h2><ul><li><a href="https://www.bilibili.com/video/BV1GU4y1N7eC" target="_blank" rel="noreferrer">【我要做开源】华为大佬亲授，Vue DevUI开源指南01：提交我的第一次pr</a></li><li><a href="https://www.bilibili.com/video/BV1su411f7a1" target="_blank" rel="noreferrer">【我要做开源】华为大佬亲授，Vue DevUI开源指南02：做一个有模有样的Tree组件</a></li><li><a href="https://www.bilibili.com/video/BV1Z64y187dR" target="_blank" rel="noreferrer">【我要做开源】华为大佬亲授，Vue DevUI开源指南03：学会“单测”才会有安全感！完成Tree组件！</a></li><li><a href="https://www.bilibili.com/video/BV1xR4y1H7yT" target="_blank" rel="noreferrer">【我要做开源】华为大佬亲授，Vue DevUI开源指南04：组件库工程化建设之项目初始化、jsx支持</a></li><li><a href="https://www.bilibili.com/video/BV1r44y1x7sk" target="_blank" rel="noreferrer">【我要做开源】华为大佬亲授，Vue DevUI开源指南05：开源组件库中的文档建设，vitepress使用过程中的踩坑经历，克服这些困难你将收获多多！</a></li><li><a href="https://www.bilibili.com/video/BV1QQ4y1i7VV" target="_blank" rel="noreferrer">【我要做开源】华为大佬亲授，Vue DevUI开源指南06：开源组件库中的CLI脚手架建设，再也不用担心重复工作和代码风格混乱了！</a></li></ul><h2 id="欢迎参与devui开源项目" tabindex="-1">欢迎参与devui开源项目 <a class="header-anchor" href="#欢迎参与devui开源项目" aria-label="Permalink to &quot;欢迎参与devui开源项目&quot;">​</a></h2><p>我们 <code>DevUI</code> 团队有多个开源项目，现在都在招募<code>contributor</code>，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加<code>DevUI</code>小助手的微信：<code>devui-official</code>，将你拉到我们的核心开发群)</p><ul><li>Ng DevUI: <a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui</a></li><li>Vue DevUI: <a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">https://gitee.com/devui/vue-devui</a></li><li>DevUI Admin <a href="https://github.com/DevCloudFE/ng-devui-admin" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui-admin</a></li></ul><p><code>DevUI</code>官网：<a href="https://devui.design/" target="_blank" rel="noreferrer">https://devui.design/</a></p><p><code>mini-vue-devui</code>项目仓库地址：<a href="https://github.com/57code/mini-vue-devui" target="_blank" rel="noreferrer">https://github.com/57code/mini-vue-devui</a></p>`,113);function r(i,b,d,y,u,h){const s=n("EditInfo");return e(),l("div",null,[c,p(s,{time:"2021年10月29日 19:08",title:"阅读 2717 ·  点赞 28 ·  评论 7 ·  收藏 26"})])}const v=a(t,[["render",r]]);export{g as __pageData,v as default};
