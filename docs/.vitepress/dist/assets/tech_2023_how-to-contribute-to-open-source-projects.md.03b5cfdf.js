import{_ as s,B as n,o as p,c as t,G as l,Q as a}from"./chunks/framework.1fee3549.js";const d=JSON.parse('{"title":"如何为开源项目做贡献","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2023/how-to-contribute-to-open-source-projects.md","filePath":"tech/2023/how-to-contribute-to-open-source-projects.md"}'),o={name:"tech/2023/how-to-contribute-to-open-source-projects.md"},r=a(`<h1 id="如何为开源项目做贡献" tabindex="-1">如何为开源项目做贡献 <a class="header-anchor" href="#如何为开源项目做贡献" aria-label="Permalink to &quot;如何为开源项目做贡献&quot;">​</a></h1><p>大家好，我是 Kagol，个人公众号：前端开源星球。</p><p>随着开源在国内的热度逐年上升，越来越多开发者投入开源的怀抱。</p><p>为了给开源入门者提供一个快速的指引，我与前端杨村长在B站做了一个系列的直播，带大家走进开源的世界，这是一个开放、自由、充满无限可能的世界，你能在其中：</p><ul><li>学习新技术</li><li>磨练编程技能</li><li>结识优秀开发者</li><li>天马行空地编码创作</li><li>收获知识、友谊、荣誉、自信和尊敬</li></ul><p>在开源的世界里，并不看你的出身，要想获得发言权、赢得人们的尊敬，只有通过贡献，通过持续不断地创造价值才可以。</p><h2 id="第一步-选择一个适合自己的开源项目" tabindex="-1">第一步：选择一个适合自己的开源项目 <a class="header-anchor" href="#第一步-选择一个适合自己的开源项目" aria-label="Permalink to &quot;第一步：选择一个适合自己的开源项目&quot;">​</a></h2><p>当我们决定迈出参与开源的第一步，而不是停留在使用开源阶段，首先要做的就是选择一个适合自己的开源项目。</p><p>每个开源项目有自己的特点、技术栈、发展阶段，能和我们的个人发展匹配上的、符合我们口味的、我们能参与进去的，才是我们应该选择的开源项目，而不能只看 Star 数和知名度。</p><p>根据 GitHub Topic 来寻找开源项目是一个好的选择。</p><p><a href="https://github.com/topics" target="_blank" rel="noreferrer">https://github.com/topics</a></p><p>比如我喜欢 Vue，想选一个 Vue 相关的开源项目，就可以在 Vue 话题下找。</p><p><a href="https://github.com/topics/vue" target="_blank" rel="noreferrer">https://github.com/topics/vue</a></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ffe532286e744e4b1a2b6d8a95bed70~tplv-k3u1fbpfcp-watermark.image?" alt="Vue Topic.png"></p><p>这个项目卡片里面有项目描述，可以让我们快速了解这个项目是干什么的，从而决定是否做进一步的了解。</p><p>比如我们选择了 TinyVue 项目，它的描述信息如下</p><blockquote><p>一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端。</p></blockquote><p>我想知道怎么实现一套同时支持 Vue2 和 Vue3 的组件库，就可以进入它的项目仓库：</p><p><a href="https://github.com/opentiny/tiny-vue" target="_blank" rel="noreferrer">https://github.com/opentiny/tiny-vue</a></p><p>一般看以下信息：</p><ul><li>Issues 问题</li><li>Pull requests 拉取请求</li><li>Insights Pulse 洞察项目活跃度</li></ul><p>现有的 Issues 列表是参与贡献的好机会，一般先选择带 <code>good-first-issue</code> 或者 <code>welcome-pr</code> 标签的 Issue。</p><p><a href="https://github.com/opentiny/tiny-vue/labels/good%20first%20issue" target="_blank" rel="noreferrer">good-first-issue</a></p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5a8d309579d44c43ab324515a561cefb~tplv-k3u1fbpfcp-watermark.image?" alt="good-first-issue.png"></p><p>Pull requests 列表可以历史 PR 被检视和合入的情况，也可以预测未来你提交的 PR 被检视和合入的可能性。</p><p>Insights Pulse 一般用来洞察项目的活跃度，主要显示近一周该项目的 Issue、PR、Contributor、Commit 等数据。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/201f645f3d7d418db16fe7caed0d1ad6~tplv-k3u1fbpfcp-watermark.image?" alt="TinyVue Pulse 活跃度.png"></p><p>比如 TinyVue 项目，近一周有：</p><ul><li>17 位贡献者</li><li>17 个 PR</li><li>10 个 Issue</li></ul><p>是一个非常活跃和新兴的开源项目，也很适合参与进来。</p><h2 id="第二步-初步了解这个开源项目" tabindex="-1">第二步：初步了解这个开源项目 <a class="header-anchor" href="#第二步-初步了解这个开源项目" aria-label="Permalink to &quot;第二步：初步了解这个开源项目&quot;">​</a></h2><p>一旦我们凭感觉选择了一个开源项目，就要开始了解这个开源项目，一般有以下途径：</p><ul><li>GitHub 仓库：README、贡献指南、源代码等</li><li>官网</li><li>社区和社群</li></ul><p>以 TinyVue 组件库项目为例，通过阅读 REAME，我们能知道：</p><ul><li>它是什么：一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端。</li><li>有什么特点：一套代码同时支持 Vue2 / Vue3，组件支持配置式开发、适合低代码平台。</li><li>怎么安装和使用</li><li>如何本地启动项目</li><li>如何加入社群、参与贡献</li><li>开源协议是 MIT</li></ul><p>看完 README，我们对 TinyVue 就有了一个初步的印象。</p><p>想要进一步了解，可以添加小助手微信：opentiny-official，加入技术交流群，不错过它的最新资讯。</p><p>也可以访问官网：<a href="https://opentiny.design/tiny-vue" target="_blank" rel="noreferrer">https://opentiny.design/tiny-vue</a></p><p>做更加全面的了解，包括：</p><ul><li>它有哪些组件</li><li>组件有哪些能力</li><li>每个组件怎么使用</li></ul><h2 id="第三步-尝试使用和体验下这个开源项目" tabindex="-1">第三步：尝试使用和体验下这个开源项目 <a class="header-anchor" href="#第三步-尝试使用和体验下这个开源项目" aria-label="Permalink to &quot;第三步：尝试使用和体验下这个开源项目&quot;">​</a></h2><p>只是看文档只能形成表面的理解，要想深入了解这个开源项目，还得亲自用用看。</p><p>通过前面的了解，我们已经知道如何使用，接下来就是亲自实操。</p><p>三步即可在你的项目中使用 TinyVue：</p><ul><li>安装依赖：<code>npm i @opentiny/vue</code></li><li>引入组件：<code>import { Button as TinyButton } from &#39;@opentiny/vue&#39;</code></li><li>使用组件：<code>&lt;tiny-button&gt;OpenTiny&lt;/tiny-button&gt;</code></li></ul><p>值得一提的是，我们的组件 Demo 是可以直接编辑生效的。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b5343672a78e44e9b1d8569e7f52cfa9~tplv-k3u1fbpfcp-watermark.image?" alt="demo实时编辑.png"></p><p>Button 比较简单，我们再来看一个复杂一点的组件：<a href="https://opentiny.design/tiny-vue/zh-CN/os-theme/components/date-picker" target="_blank" rel="noreferrer">DatePicker</a></p><div class="language-vue"><button title="Copy Code" class="copy"></button><span class="lang">vue</span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">style</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">width: 270px</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">tiny-date-picker</span><span style="color:#89DDFF;"> </span><span style="color:#C792EA;">v-model</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">value</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;&lt;/</span><span style="color:#F07178;">tiny-date-picker</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">div</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">template</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;">&lt;</span><span style="color:#F07178;">script</span><span style="color:#BABED8;"> </span><span style="color:#C792EA;">lang</span><span style="color:#89DDFF;">=</span><span style="color:#89DDFF;">&quot;</span><span style="color:#C3E88D;">jsx</span><span style="color:#89DDFF;">&quot;</span><span style="color:#89DDFF;">&gt;</span></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">import</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span><span style="color:#F07178;"> </span><span style="color:#BABED8;">DatePicker</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">}</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">from</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">&#39;</span><span style="color:#C3E88D;">@opentiny/vue</span><span style="color:#89DDFF;">&#39;</span></span>
<span class="line"></span>
<span class="line"><span style="color:#89DDFF;font-style:italic;">export</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;font-style:italic;">default</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">components</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#BABED8;">    </span><span style="color:#F07178;">TinyDatePicker</span><span style="color:#89DDFF;">:</span><span style="color:#BABED8;"> DatePicker</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#89DDFF;">},</span></span>
<span class="line"><span style="color:#BABED8;">  </span><span style="color:#F07178;">data</span><span style="color:#89DDFF;">()</span><span style="color:#BABED8;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;font-style:italic;">return</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">{</span></span>
<span class="line"><span style="color:#F07178;">      value</span><span style="color:#89DDFF;">:</span><span style="color:#F07178;"> </span><span style="color:#89DDFF;">&#39;&#39;</span></span>
<span class="line"><span style="color:#F07178;">    </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#F07178;">  </span><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">}</span></span>
<span class="line"><span style="color:#89DDFF;">&lt;/</span><span style="color:#F07178;">script</span><span style="color:#89DDFF;">&gt;</span></span></code></pre></div><p>直接把 Demo 代码拷贝过来就能用，效果如下</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2615c4d53086479fbb1a15978f8ebcd4~tplv-k3u1fbpfcp-watermark.image?" alt="DatePicker.png"></p><h2 id="第四步-给开源项目反馈问题也是一种贡献" tabindex="-1">第四步：给开源项目反馈问题也是一种贡献 <a class="header-anchor" href="#第四步-给开源项目反馈问题也是一种贡献" aria-label="Permalink to &quot;第四步：给开源项目反馈问题也是一种贡献&quot;">​</a></h2><p>从这一步是一个分界线，界定了开源项目的用户和贡献者。</p><p>如果你在使用开源项目过程中，遇到了问题，并且你将自己发现的问题反馈给社区，你就成为了广义上的贡献者。</p><p>一般会通过 Issue 来反馈项目问题，这里有几个需要注意的：</p><ul><li>取一个清晰易懂的标题</li><li>在描述中补充更多信息</li><li>详细的复现步骤或需求说明</li></ul><p>如果项目配置了 Issue 模板，你在创建 Issue 时会需要选择是报告一个问题还是提出一个需求。</p><p><img src="https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a273f74f0ce04c43b57d522e897a2a60~tplv-k3u1fbpfcp-watermark.image?" alt="issue模板.png"></p><p>如果是报告问题，标题会自动带上 <code>🐛 [Bug]: </code> 前缀；如果是新需求，则会带上 <code>✨ [Feature]: </code> 前缀。</p><p>报告问题时，标题格式为：</p><ul><li>在什么场景下</li><li>什么组件或模块</li><li>出了什么问题</li></ul><p>比如：<a href="https://github.com/opentiny/tiny-vue/issues/129" target="_blank" rel="noreferrer">🐛 [Bug]: 表格组件，设置 列左右冻结固定 时，会出现 行数据错位的情况</a></p><p>Issue 描述里需要详细描述：</p><ul><li>这个问题的表现是什么</li><li>按照什么样的步骤能复现这个问题</li><li>相应的截图和示例代码</li></ul><p>如果是提出一个新需求，标题格式为：</p><ul><li>我希望给哪个组件或模块</li><li>提供一个什么功能</li></ul><p>比如：<a href="https://github.com/opentiny/tiny-vue/issues/127" target="_blank" rel="noreferrer">✨ [Feature]: tabs 添加按钮希望挨着tab标签，在大屏幕上，如果放到右侧，移动距离太远</a></p><h2 id="第五步-参与实际的代码贡献" tabindex="-1">第五步：参与实际的代码贡献 <a class="header-anchor" href="#第五步-参与实际的代码贡献" aria-label="Permalink to &quot;第五步：参与实际的代码贡献&quot;">​</a></h2><p>随着你频繁地使用一个开源项目，你会发现它的更多问题，而开源项目有自己的规划和版本节奏，不一定能及时响应你提出的问题和需求，这时你会希望能参与共建，参与实际的代码贡献。</p><p>这时你一般需要仔细看一遍<a href="https://github.com/opentiny/tiny-vue/blob/dev/CONTRIBUTING.zh-CN.md" target="_blank" rel="noreferrer">贡献指南</a>文档。</p><p>比如 TinyVue 的贡献指南就非常详细地介绍了如何参与贡献：</p><ol><li>点击 <a href="https://github.com/opentiny/tiny-vue" target="_blank" rel="noreferrer">TinyVue</a> 代码仓库右上角的 Fork 按钮，将上游仓库 Fork 到个人仓库</li><li>Clone 个人仓库到本地</li><li>关联上游仓库，方便同步上游仓库最新代码</li><li>在 Tiny Vue 根目录下运行 <code>pnpm i</code>, 安装 node 依赖</li><li>运行 <code>pnpm dev</code>，启动组件库网站</li><li>打开浏览器访问：<a href="http://127.0.0.1:6175/" target="_blank" rel="noreferrer">http://127.0.0.1:6175/</a></li><li>请确保你已经完成本地启动中的步骤，并能正常访问：<a href="http://127.0.0.1:6175/" target="_blank" rel="noreferrer">http://127.0.0.1:6175/</a></li><li>同步上游仓库 dev 分支最新代码：git pull upstream dev</li><li>从上游仓库 dev 分支创建新分支 <code>git checkout -b username/feature1 upstream/dev</code>，分支名字建议为 <code>username/feat-xxx</code> / <code>username/fix-xxx</code></li><li>本地编码</li><li>遵循 <a href="https://www.conventionalcommits.org/zh-hans/v1.0.0/" target="_blank" rel="noreferrer">Commit Message Format</a> 规范进行提交，不符合提交规范的 PR 将不会被合并</li><li>提交到远程仓库：git push origin branchName</li><li>打开 TinyVue 代码仓库的 <a href="https://github.com/opentiny/tiny-vue/pulls" target="_blank" rel="noreferrer">Pull requests</a> 链接，点击 New pull request 按钮提交 PR</li><li>项目 Committer 进行 Code Review，并提出意见</li><li>PR 作者根据意见调整代码，请注意一个分支发起了 PR 后，后续的 commit 会自动同步，无需重新提交 PR</li><li>项目管理员合并 PR</li></ol><p>总结起来就是：</p><ul><li>先 Fork 项目，并将项目代码克隆到本地</li><li>本地启动项目</li><li>编码开发，修复问题或实现特性</li><li>提交 PR</li></ul><p>贡献的步骤其实很简单，但是要参与贡献却是要付出大量时间和精力的，非常感谢为开源项目作出贡献的所有开发者们，也希望你们在开源世界里收获自己想要的，并享受这个过程。</p><p>最后给大家推荐一个 GitHub 官方出品的开源软件指南：</p><p><a href="https://opensource.guide/zh-hans/" target="_blank" rel="noreferrer">https://opensource.guide/zh-hans/</a></p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf82c900d6c34b75b57216b72ead53e3~tplv-k3u1fbpfcp-watermark.image?" alt="GitHub开源指南.png"></p><hr><p>欢迎加入 OpenTiny 开源社区。</p><p>添加微信小助手：opentiny-official，一起参与共建！</p><p><a href="https://opentiny.design/" target="_blank" rel="noreferrer">OpenTiny</a> 官网：<a href="https://opentiny.design/" target="_blank" rel="noreferrer">https://opentiny.design/</a></p><p><a href="https://opentiny.design/tiny-vue" target="_blank" rel="noreferrer">Vue组件库</a>：<a href="https://opentiny.design/tiny-vue" target="_blank" rel="noreferrer">https://opentiny.design/tiny-vue</a></p><p><a href="https://opentiny.design/tiny-ng" target="_blank" rel="noreferrer">Angular组件库</a>：<a href="https://opentiny.design/tiny-ng" target="_blank" rel="noreferrer">https://opentiny.design/tiny-ng</a></p><p>OpenTiny 代码仓库：<a href="https://github.com/opentiny/" target="_blank" rel="noreferrer">https://github.com/opentiny/</a> （欢迎 Star ⭐）</p>`,85);function i(c,u,y,h,D,F){const e=n("EditInfo");return p(),t("div",null,[r,l(e,{time:"2023-04-22 15:09",title:"6219展现 · 801阅读 · 6点赞 · 0评论 · 1收藏"})])}const g=s(o,[["render",i]]);export{d as __pageData,g as default};
