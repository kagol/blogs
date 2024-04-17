import{_ as a,o as n,c as p,a as e,Q as s}from"./chunks/framework.1fee3549.js";const u=JSON.parse('{"title":"[BUGCASE]Webpack打包报JavaScript堆内存泄漏的错误","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2019/webpack-heap-memory-leak.md","filePath":"tech/2019/webpack-heap-memory-leak.md"}'),l={name:"tech/2019/webpack-heap-memory-leak.md"},o=s('<h1 id="bugcase-webpack打包报javascript堆内存泄漏的错误" tabindex="-1">[BUGCASE]Webpack打包报JavaScript堆内存泄漏的错误 <a class="header-anchor" href="#bugcase-webpack打包报javascript堆内存泄漏的错误" aria-label="Permalink to &quot;[BUGCASE]Webpack打包报JavaScript堆内存泄漏的错误&quot;">​</a></h1><h2 id="一、问题描述" tabindex="-1">一、问题描述 <a class="header-anchor" href="#一、问题描述" aria-label="Permalink to &quot;一、问题描述&quot;">​</a></h2><p>执行<code>npm run build</code>之后报错： <br></p><p><img src="https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164433365-430750281.jpg" alt=""></p><br><p>报错信息：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory</span></span></code></pre></div><br>',8),c=s(`<div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">2.webpack.config.common.js中加了一个entry</span></span></code></pre></div><p>entry: { ..., &quot;report.phantom.zeus&quot;:[ path.resolve(PATHS.app, &#39;./views/effect/zeus/report-view/report.phantom.js&#39;) ] }</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">3.webpack.config.prod.js中加了一个plugins</span></span></code></pre></div><p>plugins: [ ..., new HtmlwebpackPlugin({ chunks:[&#39;report.phantom.zeus&#39;, &#39;vendor&#39;], hash:true, template:&#39;build/report-zeus.html&#39;, filename: &#39;report-zeus.html&#39; }) ]</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;">\`npm run build\`命令实际执行的一串命令集：</span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span></code></pre></div><p>npm run clean:dist &amp; npm run build:config &amp; cross-env BABEL_ENV=production webpack -p --config ./build/webpack.config.prod.js --progress &amp; npm run zip</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">## 二、原因分析</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">将\`npm run build\`命令集进行拆分，可分成四步：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">- npm run clean:dist</span></span>
<span class="line"><span style="color:#babed8;">- npm run build:config</span></span>
<span class="line"><span style="color:#babed8;">- cross-env BABEL_ENV=production webpack -p --config ./build/webpack.config.prod.js --progress</span></span>
<span class="line"><span style="color:#babed8;">- npm run zip</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">看报错信息是在第三步报错的。</span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;">报错之前和之后的变化，共三处代码发生变化，经过测试发现是在 webpack.config.common.js 文件中加的 entry 的影响：</span></span></code></pre></div><p>entry: { ..., &quot;report.phantom.zeus&quot;:[ path.resolve(PATHS.app, &#39;./views/effect/zeus/report-view/report.phantom.js&#39;) ] }</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">增加一个 entry 意味着 webpack 编译的成本加大，看报错信息：</span></span></code></pre></div><p>FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">也是JavaScript堆内存溢出，\`CALL_AND_RETRY_LAST\`这个模块分配失败</span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;">查看下内存使用情况，执行\`npm run build\`之前内存占用7.87GB，执行之后一直上升直到大概10GB：</span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164457655-1324565848.png)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164506958-1799457014.png)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">看起来机器的内存似乎并没有撑爆，那为什么会内存溢出呢？</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">Google搜索报错信息：</span></span></code></pre></div><p>FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">搜索到以下比较有用的文章：</span></span>
<span class="line"><span style="color:#babed8;">https://itbilu.com/nodejs/core/Ey_SnYXnx.html</span></span>
<span class="line"><span style="color:#babed8;">https://github.com/npm/npm/issues/12741</span></span>
<span class="line"><span style="color:#babed8;">https://github.com/nodejs/node/issues/10137</span></span>
<span class="line"><span style="color:#babed8;">https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory</span></span>
<span class="line"><span style="color:#babed8;">https://github.com/webpack/webpack/issues/1914</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">提到的解决方案都是在\`node\`命令后面加\`--max-old-space-size=4096\`这个参数：</span></span>
<span class="line"><span style="color:#babed8;">\`node --max-old-space-size=4096\`</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">解决方案截图：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164522085-1513529120.jpg)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164728388-1805966913.jpg)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164530665-2122299789.jpg)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164538370-979479307.jpg)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">可是\`npm run build\`命令集里并没有\`node\`命令，怎么加呢？</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">在前端大神warpig的指点下，了解到\`npm\`、\`webpack\`等命令其实缩写命令，实际的命令前面是要加\`node\`命令的。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">所以\`npm run build\`命令中出错的命令：</span></span></code></pre></div><p>cross-env BABEL_ENV=production webpack -p --config ./build/webpack.config.prod.js --progress</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">其实应该是：</span></span></code></pre></div><p>cross-env BABEL_ENV=production node webpack -p --config ./build/webpack.config.prod.js --progress</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">但直接运行这个命令会报错，提示\`cross-env\`这个命令不存在，经查询发现\`cross-env\`只是为了解决node环境变量的问题。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">运行\`node webpack -p --config ./build/webpack.config.prod.js --progress\`，还是报错：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164611940-895429283.jpg)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">当前路径下找不到webpack模块，改成：</span></span></code></pre></div><p>node node_modules/webpack/bin/webpack.js -p --config ./build/webpack.config.prod.js --progress</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">就可以。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">加上指定V8引擎所占用的内存空间的参数\`--max-old-space-size=4096\`：</span></span></code></pre></div><p>node --max-old-space-size=4096 node_modules/webpack/bin/webpack.js -p --config ./build/webpack.config.prod.js --progress</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">编译成功。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">在package.json中也加上这个参数，重新执行\`npm run build\`，打包成功。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">一句话总结：</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&gt; webpack打包时，由于要编译的内容太多，占用了过多内存（大概10GB-7.86GB=\`2.14GB\`），而在64位操作系统下，V8引擎（node运行环境）默认内存只有大约\`1.43GB\`（1.4G新生代内存+32MB老生代内存），\`2.14GB&gt;1.43GB\`，导致内存溢出。</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">## 三、解决方案</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">\`webpack\` &amp;nbsp;改成 &amp;nbsp;\`node --max-old-space-size=4096 node_modules/webpack/bin/webpack.js\`</span></span>
<span class="line"><span style="color:#babed8;">&lt;br  /&gt;</span></span>
<span class="line"><span style="color:#babed8;">所以\`npm run build\`执行的是以下命令集：</span></span></code></pre></div><p>npm run clean:dist &amp; npm run build:config &amp; cross-env BABEL_ENV=production node --max-old-space-size=4096 node_modules/webpack/bin/webpack.js -p --config ./build/webpack.config.prod.js --progress &amp; npm run zip</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">## 四、参考资料</span></span>
<span class="line"><span style="color:#babed8;">https://itbilu.com/nodejs/core/Ey_SnYXnx.html</span></span>
<span class="line"><span style="color:#babed8;">https://github.com/webpack/webpack/issues/1914</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;EditInfo time=&quot;2019-01-17 16:48&quot; title=&quot;阅读(2093) 评论(0) 推荐(0)&quot; /&gt;</span></span></code></pre></div>`,23);function t(b,i,r,d,y,g){return n(),p("div",null,[o,e(" 之前一直是好的，加了以下代码之后出错： 1.dev_server.js中加了一个entry ``` entry: { ..., \"report.phantom.zeus\":[ HOT_MIDDLEWARE_ENTRY, path.resolve(PATHS.app, './views/effect/zeus/report-view/report.phantom.js') ] } "),c])}const h=a(l,[["render",t]]);export{u as __pageData,h as default};
