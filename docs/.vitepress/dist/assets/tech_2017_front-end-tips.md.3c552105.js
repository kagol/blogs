import{_ as a,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const g=JSON.parse('{"title":"前端实用小技巧总结","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2017/front-end-tips.md","filePath":"tech/2017/front-end-tips.md"}'),t={name:"tech/2017/front-end-tips.md"},c=o(`<h1 id="前端实用小技巧总结" tabindex="-1">前端实用小技巧总结 <a class="header-anchor" href="#前端实用小技巧总结" aria-label="Permalink to &quot;前端实用小技巧总结&quot;">​</a></h1><p>1.指定文件兼容性模式</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;meta http-equiv=&quot;X-UA-Compatible&quot; content=&quot;IE=edge,chrome=1&quot;&gt;</span></span></code></pre></div><p>在html页面的<code>&lt;head&gt;</code>元素里加入以上代码，用来声明：如果安装了GCF(Google Chrome Frame)，则当前页面使用chrome内核来渲染；如果未安装GCF，则使用IE的Edge版本来渲染。</p><p>2.改变input/textarea的placeholder字体的样式</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {/*webkit内核的浏览器*/</span></span>
<span class="line"><span style="color:#babed8;">    color: #666;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">input:-moz-placeholder, textarea:-moz-placeholder {/*Firefox版本4-18*/</span></span>
<span class="line"><span style="color:#babed8;">    color:#666;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">input::-moz-placeholder, textarea::-moz-placeholder {/*Firefox版本19+*/</span></span>
<span class="line"><span style="color:#babed8;">    color:#666;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">input:-ms-input-placeholder, textarea:-ms-input-placeholder {/*IE浏览器*/</span></span>
<span class="line"><span style="color:#babed8;">    color:#666;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>3.输出带样式的文本到浏览器控制台</p><p>console.log(&#39;%c\\nHello World&#39;, &#39;color:red;font-size:24px;&#39;)</p><p>4.单行文本过长用&quot;...&quot;代替</p><p>div { width:100px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }</p><p>5.多行文本过长用&quot;...&quot;代替</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">.link-name {</span></span>
<span class="line"><span style="color:#babed8;">    width: 100%;</span></span>
<span class="line"><span style="color:#babed8;">    word-break: break-word;</span></span>
<span class="line"><span style="color:#babed8;">    overflow: hidden;</span></span>
<span class="line"><span style="color:#babed8;">    text-overflow: ellipsis;</span></span>
<span class="line"><span style="color:#babed8;">    display: -webkit-box;</span></span>
<span class="line"><span style="color:#babed8;">    -webkit-line-clamp: 2;</span></span>
<span class="line"><span style="color:#babed8;">    -webkit-box-orient: vertical;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>6.去掉input元素focus时的边框</p><p>input{ outline:none; }</p><p>7.回到顶部和回到底部</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;a href=&quot;javascript:void(0);&quot; onclick=&quot;javascript:document.getElementsByTagName(&#39;BODY&#39;)[0].scrollTop=0;&quot;&gt;回到顶部&lt;/a&gt;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&lt;a onclick=&quot;javascript:document.getElementsByTagName(&#39;BODY&#39;)[0].scrollTop=document.getElementsByTagName(&#39;BODY&#39;)[0].scrollHeight;&quot; </span></span>
<span class="line"><span style="color:#babed8;">　　href=&quot;javascript:void(0);&quot;&gt;回到底部&lt;/a&gt;</span></span></code></pre></div><p>8.将页面变成黑白的</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">with(document.body.style) {</span></span>
<span class="line"><span style="color:#babed8;">    var vFilter = &quot;grayscale(100%)&quot;;</span></span>
<span class="line"><span style="color:#babed8;">    if (typeof webkitFilter !== &quot;undefined&quot;) {webkitFilter = vFilter}</span></span>
<span class="line"><span style="color:#babed8;">    else if (typeof MozFilter !== &quot;undefined&quot;) {MozFilter = vFilter}</span></span>
<span class="line"><span style="color:#babed8;">    else if (typeof msFilter !== &quot;undefined&quot;) {msFilter = vFilter}</span></span>
<span class="line"><span style="color:#babed8;">    else if (typeof oFilter !== &quot;undefined&quot;) {oFilter = vFilter}</span></span>
<span class="line"><span style="color:#babed8;">    else if (typeof filter !== &quot;undefined&quot;) {filter = vFilter}</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>在浏览器的控制台中运行以上代码即可。</p><p>9.目前为止见过的最简洁的求阶乘 n! 的方法</p><p>(function (n) {return n &gt; 1 ? n * arguments.callee (n - 1): n} ) (7)</p><p>10.目前为止见过的最简洁的数组去重的方法</p><p>Array.prototype.unique = function () { return this.filter(function (v, i, m) { return i &lt;= m.indexOf(v);}); }; console.log(&#39;result:&#39;, [1,2,3,12,3,2,1,2,30].unique());</p><p>11.文本框只能输入数字</p><p>HTML:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;input type=&quot;text&quot; onkeyup=&quot;this.value=this.value.replace(/[^0-9]/g,&#39;&#39;)&quot; /&gt;</span></span></code></pre></div><p>React:</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;input type=&quot;text&quot; onKeyUp={ (e) =&gt; { e.target.value=e.target.value.replace(/[^0-9]/g,&#39;&#39;) } } /&gt;</span></span></code></pre></div><p>12.修改浏览器默认滚动条样式</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">/* 设置滚动条的样式 */</span></span>
<span class="line"><span style="color:#babed8;">::-webkit-scrollbar {</span></span>
<span class="line"><span style="color:#babed8;">  width:8px;</span></span>
<span class="line"><span style="color:#babed8;">  height:8px;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">/* 滚动槽 */</span></span>
<span class="line"><span style="color:#babed8;">::-webkit-scrollbar-track {</span></span>
<span class="line"><span style="color:#babed8;">  border-radius:5px;</span></span>
<span class="line"><span style="color:#babed8;">  background:rgba(0,0,0,0.05);</span></span>
<span class="line"><span style="color:#babed8;">  -webkit-box-shadow: rgba(0,0,0,0.1);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">/* 滚动条滑块 */</span></span>
<span class="line"><span style="color:#babed8;">::-webkit-scrollbar-thumb {</span></span>
<span class="line"><span style="color:#babed8;">  border-radius:10px;</span></span>
<span class="line"><span style="color:#babed8;">  background:rgba(0,0,0,0.1);</span></span>
<span class="line"><span style="color:#babed8;">  -webkit-box-shadow:rgba(0,0,0,0.2);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">/*当焦点不在当前区域滑块的状态*/</span></span>
<span class="line"><span style="color:#babed8;">::-webkit-scrollbar-thumb:window-inactive {</span></span>
<span class="line"><span style="color:#babed8;">  background:rgba(0,0,0,0.06);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span>
<span class="line"><span style="color:#babed8;">/*当鼠标在水平滚动条的状态*/</span></span>
<span class="line"><span style="color:#babed8;">::-webkit-scrollbar-thumb:hover {</span></span>
<span class="line"><span style="color:#babed8;">  background:rgba(0,0,0,0.2);</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>13.可计算CSS</p><p>.container-widescreen{ max-width: calc(100% - 170px - 20px); } 需要注意的是运算符两边都需要有空格，否则不生效，即：<code>calc(100%-170px)</code>不生效，而<code>calc(100% - 170px)</code>生效</p><p>14.修改ng cli默认端口</p><p>在angular.json中修改</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;projects&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;your-project-name&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">      &quot;architect&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">        &quot;serve&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">          &quot;options&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">            &quot;browserTarget&quot;: &quot;ngx-editor:build&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;port&quot;: 4260</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">        },</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    },</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span></code></pre></div><p>15.修改vue cli默认端口</p><p>新增vue.config.js文件</p><p>module.exports = { devServer: { port: 4260, // 端口 }, lintOnSave: false // 取消 eslint 验证 };</p><p>附：</p><p>一、设备分辨率总结</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">PC:</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1024X768 - 老机器</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1280X800 - MacBook Pro(13寸)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1366X768 - 笔记本</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1440X900 - MacBook Air(13)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1920X1080 - 台式机、iMac(21寸)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">2304X1440 - MacBook(12)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">2560X1440 - iMac(27寸)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">2560X1600 - rMBP(13)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">2880X1800 - rMBP(15)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">5120X2880 - 5K iMac</span></span></code></pre></div><p>Pad:(横屏)</p><p>1024X768 - iPad1/2/mini</p><p>2048X1536 - iPad3/4/mini2</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Mobile:(竖屏)(太多了，只总结了iOS的手机)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">640X960 - iPhone4/4s</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">640X1136 - iPhone5/5c/5s/se</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">750X1334 - iPhone6/6s/7/8</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1080X1920 - iPhone6/6s/7/8 plus</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1125X2436 - iPhone X</span></span></code></pre></div><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Mobile:(竖屏)(Android手机)</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">480X854 - 小米1</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">720X280 - 小米2</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1080X1920 - 华为</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1080X1800 - 魅族3</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1152X1920 - 魅族4</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1536X2560 - 魅族4 pro</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">1440X2560 - 乐视max/三星S6</span></span></code></pre></div><p>二、判断浏览器类型</p><p>stackoverflow中的方法：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">// Opera 8.0+</span></span>
<span class="line"><span style="color:#babed8;">var isOpera = (!!window.opr &amp;&amp; !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(&#39; OPR/&#39;) &gt;= 0;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// Firefox 1.0+</span></span>
<span class="line"><span style="color:#babed8;">var isFirefox = typeof InstallTrigger !== &#39;undefined&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// Safari 3.0+ &quot;[object HTMLElementConstructor]&quot; </span></span>
<span class="line"><span style="color:#babed8;">var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === &quot;[object SafariRemoteNotification]&quot;; })(!window[&#39;safari&#39;] || safari.pushNotification);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// Internet Explorer 6-11</span></span>
<span class="line"><span style="color:#babed8;">var isIE = false || !!document.documentMode;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// Edge 20+</span></span>
<span class="line"><span style="color:#babed8;">var isEdge = !isIE &amp;&amp; !!window.StyleMedia;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// Chrome 1+</span></span>
<span class="line"><span style="color:#babed8;">var isChrome = !!window.chrome &amp;&amp; !!window.chrome.webstore;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">// Blink engine detection</span></span>
<span class="line"><span style="color:#babed8;">var isBlink = (isChrome || isOpera) &amp;&amp; !!window.CSS;</span></span></code></pre></div><p>利用正则表达式判断userAgent：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[ &#39;edge&#39;, /Edge\\/([0-9\\._]+)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;yandexbrowser&#39;, /YaBrowser\\/([0-9\\._]+)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;chrome&#39;, /(?!Chrom.*OPR)Chrom(?:e|ium)\\/([0-9\\.]+)(:?\\s|$)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;crios&#39;, /CriOS\\/([0-9\\.]+)(:?\\s|$)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;firefox&#39;, /Firefox\\/([0-9\\.]+)(?:\\s|$)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;opera&#39;, /Opera\\/([0-9\\.]+)(?:\\s|$)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;opera&#39;, /OPR\\/([0-9\\.]+)(:?\\s|$)$/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;ie&#39;, /Trident\\/7\\.0.*rv\\:([0-9\\.]+)\\).*Gecko$/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;ie&#39;, /MSIE\\s([0-9\\.]+);.*Trident\\/[4-7].0/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;ie&#39;, /MSIE\\s(7\\.0)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;bb10&#39;, /BB10;\\sTouch.*Version\\/([0-9\\.]+)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;android&#39;, /Android\\s([0-9\\.]+)/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;ios&#39;, /Version\\/([0-9\\._]+).*Mobile.*Safari.*/ ],</span></span>
<span class="line"><span style="color:#babed8;">    [ &#39;safari&#39;, /Version\\/([0-9\\._]+).*Safari/ ]</span></span></code></pre></div><p>Opera(OPR)、QQ浏览器(QQBrowser)、360浏览器()、百度浏览器(BIDUBrowser)、猎豹浏览器(LBBROWSER)、搜狗浏览器(SE)、遨游浏览器(Maxthon)、2345浏览器(2345Explorer)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">[ &quot;Chrome&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36&quot;&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;Safari&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2&quot;&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;Firefox&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0&quot;&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;Opera&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812&quot;&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;2345&quot;, &quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.108 Safari/537.36 2345Explorer/8.6.1.15524&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;猎豹&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 LBBROWSER&quot;&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;UC&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.1.2107.204 Safari/537.36&quot;&quot; ],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;搜狗&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0&quot;&quot;],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;百度&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.7 Safari/537.36&quot;&quot;],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;遨游&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/5.0.4.2000 Chrome/47.0.2526.73 Safari/537.36&quot;&quot;],</span></span>
<span class="line"><span style="color:#babed8;">[ &quot;QQ浏览器&quot;, &quot;&quot;Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.2658.400 QQBrowser/9.6.11018.400&quot;&quot;]</span></span></code></pre></div>`,53);function i(r,b,d,u,y,h){const s=n("EditInfo");return e(),l("div",null,[c,p(s,{time:"2017-02-07 15:25",title:"阅读(439)  评论(0)"})])}const m=a(t,[["render",i]]);export{g as __pageData,m as default};
