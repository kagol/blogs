import{_ as a,B as e,o as p,c as l,G as o,Q as n}from"./chunks/framework.1fee3549.js";const m=JSON.parse('{"title":"请收下这份《Vue DevUI 公开测试参考指南》","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2022/component-library-testing-guide.md","filePath":"tech/2022/component-library-testing-guide.md"}'),t={name:"tech/2022/component-library-testing-guide.md"},c=n(`<h1 id="请收下这份《vue-devui-公开测试参考指南》" tabindex="-1">请收下这份《Vue DevUI 公开测试参考指南》 <a class="header-anchor" href="#请收下这份《vue-devui-公开测试参考指南》" aria-label="Permalink to &quot;请收下这份《Vue DevUI 公开测试参考指南》&quot;">​</a></h1><p>为了方便大家参与 Vue DevUI 1.0 版本的公测，我们特意准备了一份《Vue DevUI 公开测试参考指南》。</p><ul><li>官网：<a href="https://vue-devui.github.io/" target="_blank" rel="noreferrer">https://vue-devui.github.io/</a></li><li>官网(Gitee，国内用户访问该网站速度会快一些)：<a href="https://vue-devui.gitee.io/" target="_blank" rel="noreferrer">https://vue-devui.gitee.io/</a></li><li>报告bug/提交建议：<a href="https://github.com/DevCloudFE/vue-devui/issues" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/vue-devui/issues</a></li></ul><h2 id="快速开始" tabindex="-1">快速开始 <a class="header-anchor" href="#快速开始" aria-label="Permalink to &quot;快速开始&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;"># 安装 vue-devui</span></span>
<span class="line"><span style="color:#babed8;">npm i vue-devui @devui-design/icons</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"># 引入组件库插件</span></span>
<span class="line"><span style="color:#babed8;">import DevUI from &#39;vue-devui&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import &#39;vue-devui/style.css&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import &#39;@devui-design/icons/icomoon/devui-icon.css&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">createApp(App).use(DevUI).mount(&#39;#app&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"># 使用</span></span>
<span class="line"><span style="color:#babed8;">&lt;d-button&gt;确定&lt;/d-button&gt;</span></span></code></pre></div><p>参考官网快速开始文档：<a href="https://vue-devui.github.io/quick-start/" target="_blank" rel="noreferrer">https://vue-devui.github.io/quick-start/</a></p><h2 id="测试内容" tabindex="-1">测试内容 <a class="header-anchor" href="#测试内容" aria-label="Permalink to &quot;测试内容&quot;">​</a></h2><p>主要测试组件功能、样式是否正常，建议按照以下顺序进行测试：</p><ul><li>Step 1: 测试组件<code>默认行为</code>(基础功能/样式)</li><li>Step 2: 测试组件各个<code>单独的api</code>对应的功能是否正常</li><li>Step 3: 测试<code>api之间的组合</code>使用时功能是否正常</li><li>Step 4: 测试多组件组合使用的复杂场景下功能是否正常</li><li>Step 5: 测试<code>api边界值</code>的情况表现是否正合理</li><li>Step 6: 测试不同设备/操作系统/浏览器/分辨率下组件是否表现良好</li></ul><p>比如 <a href="https://vue-devui.github.io/components/date-picker-pro/" target="_blank" rel="noreferrer">DatePickerPro</a> 这个组件</p><h3 id="step-1-测试组件默认行为" tabindex="-1">Step 1: 测试组件默认行为 <a class="header-anchor" href="#step-1-测试组件默认行为" aria-label="Permalink to &quot;Step 1: 测试组件默认行为&quot;">​</a></h3><p>默认情况下，只有一个必选项：<code>v-model</code>，所以我们先测试只传入<code>v-model</code>属性的情况下，组件功能和样式是否正常。</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">setup</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> datePickerProValue </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">d-date-picker-pro</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">datePickerProValue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>先看组件渲染是否正常，正常情况下，应该渲染一个如下的日期选择框，包含以下部分：</p><ul><li>一个输入框</li><li>输入框里面包含图标和可输入区域</li><li>可输入区域显示<code>请输入日期</code>的占位文本</li></ul><p>观察元素之间的间距是否合理，颜色是否合理。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cecbd0a32ac48deaa310da569cafedf~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>再尝试把鼠标移到日期输入框上面，正常输入框的边框颜色应该变深，呈现高亮状态：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/811a173af39b4e639af0ca63e7e4ffd3~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>接着尝试点击一下这个日期输入框，正常应该</p><ul><li>弹出一个日期选择下拉框</li><li>输入框高亮(边框颜色变成蓝色)</li><li>输入框聚焦(出现光标)，并可直接输入日期内容</li></ul><p>日期下拉框包含以下部分：</p><ul><li>下拉框面板整体出现阴影效果</li><li>左侧时月份选择列表，按年份进行分组，默认高亮当前月份(背景颜色是白色，未高亮的月份背景颜色是浅灰色)</li><li>右侧是主体日历面板，顶部是周标题，下面是按月份分组的日历，默认高亮当前日期(文本颜色是蓝色，未高亮的文本颜色是灰色)</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e55767350ec4d339d5c599525f3858f~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>尝试将鼠标移到左侧的月份列表中，鼠标移入的月份会出现一个浅蓝的底色，点击可切换相应的月份日历，滚动鼠标滚轮可以快速定位到其他年月。</p><p>尝试将鼠标移到右侧的日历面板中，鼠标移入的日期会出现浅蓝底色，点击可以选中相应的日期，滚动鼠标滚轮可以快速定位到其他月份的日历面板。</p><p>选择日期之后：</p><ul><li>日期选择下拉框关闭</li><li>输入框中的占位文本被当前选中的日期代替，格式是<code>YYYY/MM/DD</code></li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4059f10169384cd6aad945b1342fb9b3~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>已经选择日期的输入框：</p><ul><li>鼠标hover上去除了边框颜色变深之后，还会显示一个清除日期的小图标，点击该图标可以清除选中的日期</li><li>点击输入框，弹出来的下拉面板中高亮的是当前日期</li></ul><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cd9b4ee2ce149fcbfd2868629454214~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c147fcd242f4436eb071520b84397e60~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>完成以上测试，该组件的默认行为就算测试完成了，中间发现任何问题都可以给我们提交issue。</p><h3 id="step-2-测试单独api功能" tabindex="-1">Step 2: 测试单独api功能 <a class="header-anchor" href="#step-2-测试单独api功能" aria-label="Permalink to &quot;Step 2: 测试单独api功能&quot;">​</a></h3><p>测试完默认行为，就可以逐个给组件增加api，看组件的表现是否和api文档描述的一样。</p><p>DatePickerPro组件api文档：<a href="https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-%E5%8F%82%E6%95%B0" target="_blank" rel="noreferrer">https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-参数</a></p><p>我们先尝试增加一个<code>format</code>参数。</p><p>看文档可以了解到<code>format</code>支持哪些类型： <a href="https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-%E7%B1%BB%E5%9E%8B%E5%AE%9A%E4%B9%89" target="_blank" rel="noreferrer">https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-类型定义</a></p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">d-date-picker-pro</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">datePickerProValue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">format</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">YYYY-MM-DD</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><p>默认格式是<code>YYYY/MM/DD</code>，加上<code>format=&quot;YYYY-MM-DD&quot;</code>之后确实变成了<code>2022-08-01</code>，可以多尝试几个<code>format</code>的值，看是否显示正常。</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9c3f664d1454c5fb4639c2185184514~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>再尝试增加一个<code>placeholder</code>属性：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-date-picker-pro v-model=&quot;datePickerProValue&quot; placeholder=&quot;请输入您的出生日期&quot; /&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1cbe16f445444fd88461d1d6668d9ba~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>这个步骤需要做的就是一个api一个api进行测试，看表现是否正常。</p><h3 id="step-3-测试api组合使用" tabindex="-1">Step 3: 测试api组合使用 <a class="header-anchor" href="#step-3-测试api组合使用" aria-label="Permalink to &quot;Step 3: 测试api组合使用&quot;">​</a></h3><p>上一个步骤是测试单个的api，这次我们需要测试多个api组合使用的场景，比如前面测试的<code>format</code>/<code>placeholder</code>组合在一起使用。</p><div class="language-html"><button title="Copy Code" class="copy"></button><span class="lang">html</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">d-date-picker-pro</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">datePickerProValue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">format</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">YYYY-MM-DD</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">placeholder</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">请输入您的出生日期</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span></code></pre></div><p>正常应该两个功能一起生效。</p><p>api的组合可能会非常多，这个测试步骤对测试者是一个很大的考验。</p><h3 id="step-4-测试多组件组合场景" tabindex="-1">Step 4: 测试多组件组合场景 <a class="header-anchor" href="#step-4-测试多组件组合场景" aria-label="Permalink to &quot;Step 4: 测试多组件组合场景&quot;">​</a></h3><p>测试完 DatePickerPro 本身的功能，还需要测试它与其他组件一起使用时功能是否依然正常，比如和<a href="https://vue-devui.github.io/components/modal/" target="_blank" rel="noreferrer">Modal</a>弹窗组件一起使用。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;script setup lang=&quot;ts&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">import { ref } from &#39;vue&#39;;</span></span>
<span class="line"><span style="color:#babed8;">const datePickerProValue = ref(&#39;&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const visible = ref(false);</span></span>
<span class="line"><span style="color:#babed8;">const handleClick = () =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  visible.value = true;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span>
<span class="line"><span style="color:#babed8;">&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;template&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;d-button @click=&quot;handleClick&quot;&gt;打开详情侧滑&lt;/d-button&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;d-drawer v-model=&quot;visible&quot; style=&quot;width: 50%;&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;div&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;span&gt;选择出生日期&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">      &lt;d-date-picker-pro v-model=&quot;datePickerProValue&quot; format=&quot;YYYY-MM-DD&quot; placeholder=&quot;请输入您的出生日期&quot; /&gt;</span></span>
<span class="line"><span style="color:#babed8;">    &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">  &lt;/d-drawer&gt;</span></span>
<span class="line"><span style="color:#babed8;">&lt;/template&gt;</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10eda0fd59624f4bbc63778c2a648ba3~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>正常情况下，多个组件一起使用，每个组件都应该表现正常。</p><h3 id="step-5-测试api边界值情况" tabindex="-1">Step 5: 测试api边界值情况 <a class="header-anchor" href="#step-5-测试api边界值情况" aria-label="Permalink to &quot;Step 5: 测试api边界值情况&quot;">​</a></h3><p>前面四个步骤基本上已经能保证组件在业务中使用不出明显的问题，但有时业务场景是非常复杂的，传入组件的数据也可能是预料之外的。</p><p>比如之前<code>DatePickerPro</code>的<code>v-model</code>属性，比如不按照文档要求的传入，而是传入一些非法内容，这时组件是否依然能够进行容错，并表现正常呢？</p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">setup</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">ts</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">ref</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">vue</span><span style="color:#89DDFF;">&#39;</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#C792EA;">const</span><span style="color:#BABED8;"> datePickerProValue </span><span style="color:#89DDFF;">=</span><span style="color:#BABED8;"> </span><span style="color:#82AAFF;">ref</span><span style="color:#BABED8;">(</span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">2022/08/01</span><span style="color:#89DDFF;">&#39;</span><span style="color:#BABED8;">)</span><span style="color:#89DDFF;">;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">d-date-picker-pro</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">datePickerProValue</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;"> /&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>以上是传入合法值的情况，组件渲染了正确的内容：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf596eec9464cc2a1b0e4b7003c4bea~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>如果改成非法内容：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const datePickerProValue = ref(&#39;2022年8月1日&#39;);</span></span></code></pre></div><p>这时组件应该使用默认值，即输入框只有占位内容，没有选中日期</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3f1fe2367954857a277c78dc06ce0b1~tplv-k3u1fbpfcp-zoom-1.image" alt="image"></p><p>同样的，如果<code>format</code>传入非法内容：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;d-date-picker-pro v-model=&quot;datePickerProValue&quot; format=&quot;非法格式&quot; /&gt;</span></span></code></pre></div><p>这是应该使用<code>format</code>的默认值：<code>YYYY/MM/DD</code></p><p>由于边界场景非常多，非常难以预料，这个步骤也非常考验测试人员的能力。</p><h3 id="step-6-测试兼容性" tabindex="-1">Step 6: 测试兼容性 <a class="header-anchor" href="#step-6-测试兼容性" aria-label="Permalink to &quot;Step 6: 测试兼容性&quot;">​</a></h3><p>最后一个步骤是测试设备、操作系统、浏览器、分辨率等兼容性：</p><ul><li>组件在不同设备，比如：Windows机器、iMac、iPad、不同型号的手机上是否正常工作</li><li>组件在不同的操作系统下，比如：<code>Windows</code>、<code>macOS</code>、<code>Linux</code>下是否正常工作，甚至在同样操作系统下的不同版本下是否正常</li><li>组件在不同的浏览器下，比如：<code>Chrome</code>、<code>Firefox</code>、<code>Safari</code>下是否功能正常，以及同一浏览器下的不同版本</li><li>组件在不同设备分辨率下是否正常，比如：<code>1366X768</code>的笔记本电脑上，<code>1920X1080</code>的台式机上，<code>2048X1536</code>的iPad横屏和竖屏上，是否表现都正常</li></ul><p>这个步骤对设备的要求很高，当然也可以用一些技术手段进行模拟测试。</p><h2 id="还可以测试什么" tabindex="-1">还可以测试什么 <a class="header-anchor" href="#还可以测试什么" aria-label="Permalink to &quot;还可以测试什么&quot;">​</a></h2><p>除了组件本身，还可以对我们的官网进行测试，看是否有页面无法加载、样式错乱、逻辑错误、书写错误等，如果发现问题，也欢迎给我们提交<a href="https://github.com/DevCloudFE/vue-devui/issues" target="_blank" rel="noreferrer">issue</a></p>`,76);function r(i,d,u,D,y,b){const s=e("EditInfo");return p(),l("div",null,[c,o(s,{time:"2022年08月02日 12:02",title:"阅读 961 ·  点赞 10·  评论 8 ·  收藏 2"})])}const g=a(t,[["render",r]]);export{m as __pageData,g as default};