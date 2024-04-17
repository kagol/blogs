import{_ as a,B as s,o as n,c,G as t,Q as l}from"./chunks/framework.1fee3549.js";const v=JSON.parse('{"title":"利用好 git bisect 这把利器，帮助你快速定位疑难 bug","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/git-bisect.md","filePath":"tech/2021/git-bisect.md"}'),p={name:"tech/2021/git-bisect.md"},o=l(`<h1 id="利用好-git-bisect-这把利器-帮助你快速定位疑难-bug" tabindex="-1">利用好 git bisect 这把利器，帮助你快速定位疑难 bug <a class="header-anchor" href="#利用好-git-bisect-这把利器-帮助你快速定位疑难-bug" aria-label="Permalink to &quot;利用好 git bisect 这把利器，帮助你快速定位疑难 bug&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201500735-2f9a62ff-38af-49b4-9d88-67f1c0e12494.png" alt="image"></p><p>使用git bisect二分法定位问题的基本步骤：</p><ol><li>git bisect start [最近的出错的commitid] [较远的正确的commitid]</li><li>测试相应的功能</li><li>git bisect good 标记正确</li><li>直到出现问题则 标记错误 git bisect bad</li><li>提示的commitid就是导致问题的那次提交</li></ol><h2 id="问题描述" tabindex="-1">问题描述 <a class="header-anchor" href="#问题描述" aria-label="Permalink to &quot;问题描述&quot;">​</a></h2><p>我们以<a href="https://github.com/DevCloudFE/vue-devui" target="_blank" rel="noreferrer">Vue DevUI</a>组件库的一个bug举例子🌰</p><p><code>5d14c34b</code>这一次commit，执行<code>yarn build</code>报错，报错信息如下：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">✓ building client + server bundles...</span></span>
<span class="line"><span style="color:#babed8;">✖ rendering pages...</span></span>
<span class="line"><span style="color:#babed8;">build error:</span></span>
<span class="line"><span style="color:#babed8;"> ReferenceError: document is not defined</span></span></code></pre></div><p>我可以确定的是上一次发版本（<a href="https://github.com/DevCloudFE/vue-devui/commit/d577ce405bdf1a6bdd10ff9a44be3497aaea1911" target="_blank" rel="noreferrer">d577ce4</a>）是可以build成功的。</p><h2 id="git-bisect-简介" tabindex="-1">git bisect 简介 <a class="header-anchor" href="#git-bisect-简介" aria-label="Permalink to &quot;git bisect 简介&quot;">​</a></h2><p><code>git bisect</code>命令使用二分搜索算法来查找提交历史中的哪一次提交引入了错误。它几乎能让你闭着眼睛快速定位任何源码导致的问题，非常实用。</p><p>你只需要告诉这个命令一个包含该bug的坏<code>commit ID</code>和一个引入该bug之前的好<code>commit ID</code>，这个命令会用二分法在这两个提交之间选择一个中间的<code>commit ID</code>，切换到那个<code>commit ID</code>的代码，然后询问你这是好的<code>commit ID</code>还是坏的<code>commit ID</code>，你告诉它是好还是坏，然后它会不断缩小范围，直到找到那次引入bug的凶手<code>commit ID</code>。</p><p>这样我们就只需要分析那一次提交的代码，就能快速定位和解决这个bug（具体定位的时间取决于该次提交的代码量和你的经验），所以我们提交代码时一定要养成小批量提交的习惯，每次只提交一个小的独立功能，这样出问题了，定位起来会非常快。</p><p>接下来我就以<a href="https://github.com/DevCloudFE/vue-devui" target="_blank" rel="noreferrer">Vue DevUI</a>之前出现过的一个bug为例，详细介绍下如何使用<code>git bisect</code>这把利器。</p><h2 id="定位过程" tabindex="-1">定位过程 <a class="header-anchor" href="#定位过程" aria-label="Permalink to &quot;定位过程&quot;">​</a></h2><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">git bisect start 5d14c34b d577ce4</span></span>
<span class="line"><span style="color:#babed8;">or</span></span>
<span class="line"><span style="color:#babed8;">git bisect start HEAD d577ce4</span></span></code></pre></div><p>其中<code>5d14c34b</code>这次是最近出现的有bug的提交，<code>d577ce4</code>这个是上一次发版本没问题的提交。</p><p>执行完启动<code>bisect</code>之后，马上就切到中间的一次提交啦，以下是打印结果：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">kagol:vue-devui kagol$ git bisect start 5d14c34b d577ce4</span></span>
<span class="line"><span style="color:#babed8;">Bisecting: 11 revisions left to test after this (roughly 4 steps)</span></span>
<span class="line"><span style="color:#babed8;">[1cfafaaa58e03850e0c9ddc4246ae40d18b03d71] fix: read-tip icon样式泄露 (#54)</span></span></code></pre></div><p>可以看到已经切到以下提交：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[1cfafaaa] fix: read-tip icon样式泄露 (#54)</span></span></code></pre></div><p>执行命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn build</span></span></code></pre></div><p>构建成功，所以标记下<code>good</code>：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">git bisect good</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">kagol:vue-devui kagol$ git bisect good</span></span>
<span class="line"><span style="color:#babed8;">Bisecting: 5 revisions left to test after this (roughly 3 steps)</span></span>
<span class="line"><span style="color:#babed8;">[c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0] feat(drawer): add service model (#27)</span></span></code></pre></div><p>标记万<code>good</code>，马上又通过二分法，切到了一次新的提交：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[c0c4cc1a] feat(drawer): add service model (#27)</span></span></code></pre></div><p>再次执行<code>build</code>命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">yarn build</span></span></code></pre></div><p>build失败了，出现了我们最早遇到的报错：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">✓ building client + server bundles...</span></span>
<span class="line"><span style="color:#babed8;">✖ rendering pages...</span></span>
<span class="line"><span style="color:#babed8;">build error:</span></span>
<span class="line"><span style="color:#babed8;"> ReferenceError: document is not defined</span></span></code></pre></div><p>标记下<code>bad</code>，再一次切到中间的提交：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">kagol:vue-devui kagol$ git bisect bad</span></span>
<span class="line"><span style="color:#babed8;">Bisecting: 2 revisions left to test after this (roughly 2 steps)</span></span>
<span class="line"><span style="color:#babed8;">[86634fd8efd2b808811835e7cb7ca80bc2904795] feat: add scss preprocessor in docs &amp;&amp; fix:(Toast)  single lifeMode bug in Toast</span></span></code></pre></div><p>以此类推，不断地验证、标记、验证、标记...最终会提示我们那一次提交导致了这次的bug，提交者、提交时间、提交message等信息。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">kagol:vue-devui kagol$ git bisect good</span></span>
<span class="line"><span style="color:#babed8;">c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0 is the first bad commit</span></span>
<span class="line"><span style="color:#babed8;">commit c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0</span></span>
<span class="line"><span style="color:#babed8;">Author: nif &lt;lnzhangsong@163.com&gt;</span></span>
<span class="line"><span style="color:#babed8;">Date:   Sun Dec 26 21:37:05 2021 +0800</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">    feat(drawer): add service model (#27)</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    * feat(drawer): add service model</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    * docs(drawer): add service model demo</span></span>
<span class="line"><span style="color:#babed8;">    </span></span>
<span class="line"><span style="color:#babed8;">    * fix(drawer): remove &#39;console.log()&#39;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"> packages/devui-vue/devui/drawer/index.ts           |  7 +++--</span></span>
<span class="line"><span style="color:#babed8;"> .../devui-vue/devui/drawer/src/drawer-service.ts   | 33 ++++++++++++++++++++++</span></span>
<span class="line"><span style="color:#babed8;"> packages/devui-vue/devui/drawer/src/drawer.tsx     |  3 ++</span></span>
<span class="line"><span style="color:#babed8;"> packages/devui-vue/docs/components/drawer/index.md | 29 +++++++++++++++++++</span></span>
<span class="line"><span style="color:#babed8;"> 4 files changed, 69 insertions(+), 3 deletions(-)</span></span>
<span class="line"><span style="color:#babed8;"> create mode 100644 packages/devui-vue/devui/drawer/src/drawer-service.ts</span></span></code></pre></div><p>最终定位到出问题的commit：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">c0c4cc1a is the first bad commit</span></span></code></pre></div><p><a href="https://github.com/DevCloudFE/vue-devui/commit/c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/vue-devui/commit/c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0</a></p><p>整个定位过程几乎是机械的操作，不需要了解项目源码，不需要了解最近谁提交了什么内容，只需要无脑地：验证、标记、验证、标记，最后git会告诉我们那一次提交出错。</p><p>这么香的工具，赶紧来试试吧！</p><h2 id="问题分析" tabindex="-1">问题分析 <a class="header-anchor" href="#问题分析" aria-label="Permalink to &quot;问题分析&quot;">​</a></h2><p>直到哪个commit出问题了，定位起来范围就小了很多。</p><p>如果平时提交代码又能很好地遵循小颗粒提交的话，bug呼之欲出。</p><p>这里必须表扬下我们DevUI的田主（Contributor）们，他们都养成了小颗粒提交的习惯，这次导致bug的提交<code>c0c4cc1a</code>，只提交了4个文件，涉及70多行代码。</p><p><img src="https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20e682407cfe4cafb6a5360f4c36537c~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>我们在其中搜索下<code>document</code>关键字，发现了两处，都在<code>drawer-service.ts</code>整个文件中：</p><p>一处是12行的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">static $body: HTMLElement | null = document.body</span></span></code></pre></div><p>另一处是17行的：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">this.$div = document.createElement(&#39;div&#39;)</span></span></code></pre></div><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b7e5478cc5e84a10989052ee8c2d3f76~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p><p>最终发现罪魁祸首就是12行的代码！</p><p>破案！</p><p>此处@lnzhangsong我们的田主，有空麻烦修下这个bug。</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fe8aa9b5b1a4a3a970a745d259f9953~tplv-k3u1fbpfcp-watermark.image?" alt="image.png"></p>`,56);function i(d,r,b,g,u,m){const e=s("EditInfo");return n(),c("div",null,[o,t(e,{time:"2021年12月27日 23:49",title:"阅读 4606 ·  点赞 84 ·  评论 24 ·  收藏 66"})])}const f=a(p,[["render",i]]);export{v as __pageData,f as default};
