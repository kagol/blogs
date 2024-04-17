import{_ as a,B as n,o as e,c as p,G as l,Q as o}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"前端有了这两样神器，再也不用追着后台要接口啦","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2020/front-end-mock-data.md","filePath":"tech/2020/front-end-mock-data.md"}'),t={name:"tech/2020/front-end-mock-data.md"},c=o(`<h1 id="前端有了这两样神器-再也不用追着后台要接口啦" tabindex="-1">前端有了这两样神器，再也不用追着后台要接口啦 <a class="header-anchor" href="#前端有了这两样神器-再也不用追着后台要接口啦" aria-label="Permalink to &quot;前端有了这两样神器，再也不用追着后台要接口啦&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201150454-a97cc0cb-f685-4eaf-a9bc-a2363d3a0ac4.png" alt="image"></p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>之前发过一篇沸点，聊到前端为了提升业务交付效率，有必要去除对上游的依赖，这次想给大家分享下我自己在去后台依赖方面的一些实践，欢迎大家一起讨论！</p><p><img src="https://user-images.githubusercontent.com/9566362/201150853-3aa5f9a9-c081-41d1-a587-eedfbf0b1339.png" alt="image"></p><p>沸点传送门：<a href="https://juejin.im/pin/6862313304141135885" target="_blank" rel="noreferrer">juejin.im/pin/6862313…</a></p><p>前端依赖后台什么？</p><p>在整个研发链路上，后台的定位是给前端提供高效、稳定的API接口，前端通过这些API去获取需要的数据，并展示给用户。</p><p>所以要去除对后台的依赖，前端就需要自己模拟这些接口，并构造相应的测试数据。</p><h2 id="怎么模拟后台接口" tabindex="-1">怎么模拟后台接口？ <a class="header-anchor" href="#怎么模拟后台接口" aria-label="Permalink to &quot;怎么模拟后台接口？&quot;">​</a></h2><p>为了在前端模拟后台接口，我给大家介绍第一件神器：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fjson-server" target="_blank" rel="noreferrer">JSON Server</a>。</p><p>以下是JSON Server官方对自己的定位：</p><p>Get a full fake REST API with zero coding in less than 30 seconds (seriously) 无需写代码，在30秒内获得完整的REST API。</p><p>以我现在负责的<a href="https://link.juejin.cn/?target=https%3A%2F%2Fwww.huaweicloud.com%2Fdevcloud%2F" target="_blank" rel="noreferrer">DevCloud</a>业务——<a href="https://link.juejin.cn/?target=https%3A%2F%2Fsupport.huaweicloud.com%2Fusermanual-projectman%2Fdevcloud_hlp_00021.html" target="_blank" rel="noreferrer">XBoard看板</a>项目——举栗子，有一个接口是获取某个看板下面的所有卡片信息（只保留关键字段），接口基本协议如下（接口协议提前跟后台协商好）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">GET /v1/[projectid]/[boardid]/cards</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;error&quot;: null,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;status&quot;: &quot;success&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;result&quot;: [</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      &quot;column_id&quot;: &quot;7c489b6746fe4329aa8c869f4c13fab5&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;card_list&quot;: [</span></span>
<span class="line"><span style="color:#babed8;">        {</span></span>
<span class="line"><span style="color:#babed8;">          &quot;id&quot;: &quot;4634045604195569664&quot;, // 卡片ID</span></span>
<span class="line"><span style="color:#babed8;">          &quot;subject&quot;: &quot;任务已ready,准备启动开发的任务&quot;, // 卡片主题</span></span>
<span class="line"><span style="color:#babed8;">          &quot;sequence&quot;: &quot;11203427&quot;, // 卡片序列号</span></span>
<span class="line"><span style="color:#babed8;">          &quot;index&quot;: &quot;12&quot;, // 序号（用于拖动排序）</span></span>
<span class="line"><span style="color:#babed8;">          &quot;archived&quot;: false, // 是否已归档</span></span>
<span class="line"><span style="color:#babed8;">          &quot;blocked&quot;: false, // 是否设置阻塞</span></span>
<span class="line"><span style="color:#babed8;">          &quot;is_parent&quot;: false, // 是否父卡片</span></span>
<span class="line"><span style="color:#babed8;">          &quot;createdOn&quot;: &quot;1598238210463&quot;, // 创建时间</span></span>
<span class="line"><span style="color:#babed8;">          &quot;updatedOn&quot;: &quot;1598238210463&quot;, // 最近更新时间</span></span>
<span class="line"><span style="color:#babed8;">          &quot;parent&quot;: { // 父卡片</span></span>
<span class="line"><span style="color:#babed8;">            &quot;subject&quot;: &quot;设计完成,正在进行开发的需求&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;4634045604190851072&quot;</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;board&quot;: { // 卡片所在的看板</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;1661625c5f72471a81979482ab148066&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;开发&quot;</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;column&quot;: { // 状态列</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;7c489b6746fe4329aa8c869f4c13fab5&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;就绪&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;type&quot;: &quot;READY&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;deleted&quot;: false</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;card_type&quot;: { // 卡片类型</span></span>
<span class="line"><span style="color:#babed8;">            &quot;color&quot;: &quot;#6CBFFF&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;任务&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;icon&quot;: &quot;icon-op-task&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;2&quot;</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;author&quot;: { // 卡片作者</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;kagolzeng&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;05329882ba000f711ffec00c21191097&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;nick_name&quot;: &quot;kagol&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;gender&quot;: &quot;male&quot;</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;updater&quot;: { // 最近更新者</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;kagolzeng&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;05329882ba000f711ffec00c21191097&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;nick_name&quot;: &quot;kagol&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;gender&quot;: &quot;male&quot;</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">        }, </span></span>
<span class="line"><span style="color:#babed8;">        ... // 其他卡片</span></span>
<span class="line"><span style="color:#babed8;">      ]</span></span>
<span class="line"><span style="color:#babed8;">    }, </span></span>
<span class="line"><span style="color:#babed8;">    ... // 其他状态列</span></span>
<span class="line"><span style="color:#babed8;">  ]</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>这个接口怎么用JSON Server模拟呢？</p><p>只需要以下4步（假设已经有项目工程，比如：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fcli.angular.io%2F" target="_blank" rel="noreferrer">NG CLI</a>工程）：</p><ol><li>第1步：安装JSON Server</li><li>第2步：配置测试数据</li><li>第3步：编写启动脚本命令</li><li>第4步：启动Mock服务</li></ol><p>我们一步一步来搭建一个Mock服务：</p><p>第1步：安装JSON Server</p><p>在项目根目录下执行以下命令：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm i -D json-server</span></span></code></pre></div><p>第2步：配置测试数据</p><p>在项目根目录下新建db.json文件，加上之前已经跟后台定好的接口数据（为避免重复，已省略部分字段）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;result&quot;: [</span></span>
<span class="line"><span style="color:#babed8;">    {</span></span>
<span class="line"><span style="color:#babed8;">      &quot;column_id&quot;: &quot;7c489b6746fe4329aa8c869f4c13fab5&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;card_list&quot;: [</span></span>
<span class="line"><span style="color:#babed8;">        {</span></span>
<span class="line"><span style="color:#babed8;">          &quot;id&quot;: &quot;4634045604195569664&quot;, // 卡片ID</span></span>
<span class="line"><span style="color:#babed8;">          &quot;subject&quot;: &quot;任务已ready,准备启动开发的任务&quot;, // 卡片主题</span></span>
<span class="line"><span style="color:#babed8;">          &quot;board&quot;: { // 卡片所在的看板</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;1661625c5f72471a81979482ab148066&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;开发&quot;</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;column&quot;: { // 状态列</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;7c489b6746fe4329aa8c869f4c13fab5&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;就绪&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;type&quot;: &quot;READY&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;deleted&quot;: false</span></span>
<span class="line"><span style="color:#babed8;">          },</span></span>
<span class="line"><span style="color:#babed8;">          &quot;card_type&quot;: { // 卡片类型</span></span>
<span class="line"><span style="color:#babed8;">            &quot;color&quot;: &quot;#6CBFFF&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;name&quot;: &quot;任务&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;icon&quot;: &quot;icon-op-task&quot;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;id&quot;: &quot;2&quot;</span></span>
<span class="line"><span style="color:#babed8;">          }</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">      ]</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  ]</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>第3步：编写启动脚本命令</p><p>只需要在package.json的scripts中编写Mock服务的启动脚本即可：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;mock&quot;: &quot;node_modules/.bin/json-server --watch db.json --port 9090&quot;</span></span></code></pre></div><p>第4步：启动Mock服务</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm run mock</span></span></code></pre></div><p>启动之后控制台显示： <img src="https://user-images.githubusercontent.com/9566362/201150960-285e0d32-305e-41b3-977d-eba77896cd8c.png" alt="image"></p><p>在浏览器地址栏输入：<a href="https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9090%2Fcards" target="_blank" rel="noreferrer">http://localhost:9090/cards</a>，即可查看该接口的返回数据 <img src="https://user-images.githubusercontent.com/9566362/201150990-8fbe5b3c-7de8-4752-8988-eefa618f53f7.png" alt="image"></p><h2 id="如何构造测试数据" tabindex="-1">如何构造测试数据？ <a class="header-anchor" href="#如何构造测试数据" aria-label="Permalink to &quot;如何构造测试数据？&quot;">​</a></h2><p>大家发现以上模拟后台接口的方式有什么问题了没？</p><p>测试数据的构造太麻烦！</p><p>如果每个接口的返回数据都需要一个一个去构造，至少会有两个问题：</p><ul><li>一是每条记录都自己手写，太累，数据也太死；</li><li>二是想要模拟大量的数据很难，且会导致项目源文件体积变大。</li></ul><p>为了解决以上问题，我要给大家介绍第二件神器：<a href="https://link.juejin.cn/?target=http%3A%2F%2Fmockjs.com%2F" target="_blank" rel="noreferrer">Mock.js</a>。 Mock.js对自己的定位是：</p><blockquote><p>生成随机数据，拦截 Ajax 请求</p></blockquote><p>Mock.js可以生成几乎任何你能想到的数据类型，比如数字、字符、布尔值、日期、颜色、图片、地址、URL、名字、标题、段落等，甚至还支持正则表达式。</p><p>将Mock.js集成进来也只需要简单的3个步骤：</p><ol><li>第1步：修改JSON Server配置</li><li>第2步：修改脚本命令</li><li>第3步：重启Mock服务</li></ol><p>第1步：修改JSON Server配置</p><p>为了集成Mock.js，我们需要将之前的db.json改成db.js，并增加routes.json文件，可以将这两个文件放到根目录下的mock文件夹下。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">mock/db.js</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">var Mock = require(&#39;mockjs&#39;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const CARDS = Mock.mock({</span></span>
<span class="line"><span style="color:#babed8;">  &quot;error&quot;: null,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;status&quot;: &quot;success&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;result|10&quot;: [{ // 生成10个状态列</span></span>
<span class="line"><span style="color:#babed8;">    &quot;column_id&quot;: &quot;@guid&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;card_list|20&quot;: [{ // 状态列下有20张卡片</span></span>
<span class="line"><span style="color:#babed8;">      &quot;id&quot;: &quot;@guid&quot;, // 卡片ID</span></span>
<span class="line"><span style="color:#babed8;">      &quot;subject&quot;: &#39;@title&#39;, // 卡片主题</span></span>
<span class="line"><span style="color:#babed8;">      &quot;sequence&quot;: /\\d{8}/, // 卡片序列号</span></span>
<span class="line"><span style="color:#babed8;">      &quot;index&quot;: &quot;@integer(1, 100)&quot;, // 序号（用于拖动排序）</span></span>
<span class="line"><span style="color:#babed8;">      &quot;archived&quot;: &quot;@boolean&quot;, // 是否已归档</span></span>
<span class="line"><span style="color:#babed8;">      &quot;blocked&quot;: &quot;@boolean&quot;, // 是否设置阻塞</span></span>
<span class="line"><span style="color:#babed8;">      &quot;is_parent&quot;: &quot;@boolean&quot;, // 是否父卡片</span></span>
<span class="line"><span style="color:#babed8;">      &quot;createdOn&quot;: &quot;@date&quot;, // 创建时间</span></span>
<span class="line"><span style="color:#babed8;">      &quot;updatedOn&quot;: &quot;@date&quot;, // 最近更新时间</span></span>
<span class="line"><span style="color:#babed8;">      &quot;parent&quot;: { // 父卡片</span></span>
<span class="line"><span style="color:#babed8;">        &quot;id&quot;: &quot;@guid&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;name&quot;: &quot;@cword(2,10)&quot;</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      &quot;board&quot;: { // 卡片所在的看板</span></span>
<span class="line"><span style="color:#babed8;">        &quot;id&quot;: &quot;@guid&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;name&quot;: &quot;@cword(2,10)&quot;</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      &quot;column&quot;: { // 状态列</span></span>
<span class="line"><span style="color:#babed8;">        &quot;id&quot;: &quot;@guid&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;name&quot;: &quot;@cword(2,10)&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;type&quot;: &quot;@string(&#39;upper&#39;, 2, 20)&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;deleted&quot;: &quot;@boolean&quot;</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      &quot;card_type&quot;: { // 卡片类型</span></span>
<span class="line"><span style="color:#babed8;">        &quot;color&quot;: &quot;@color&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;name&quot;: &quot;@cword(2,10)&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;icon&quot;: /icon-[a-z]-{1-3}/,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;id&quot;: &quot;@integer(1, 100)&quot;</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      &quot;author&quot;: { // 卡片作者</span></span>
<span class="line"><span style="color:#babed8;">        &quot;name&quot;: &quot;@name&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;id&quot;: &quot;@guid&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;nick_name&quot;: &quot;@name&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;gender&quot;: &quot;@string(&#39;lower&#39;, 4)&quot;</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      &quot;updater&quot;: { // 最近更新者</span></span>
<span class="line"><span style="color:#babed8;">        &quot;name&quot;: &quot;@name&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;id&quot;: &quot;@guid&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;nick_name&quot;: &quot;@name&quot;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;gender&quot;: &quot;@string(&#39;lower&#39;, 4)&quot;</span></span>
<span class="line"><span style="color:#babed8;">      }</span></span>
<span class="line"><span style="color:#babed8;">    }]</span></span>
<span class="line"><span style="color:#babed8;">  }]</span></span>
<span class="line"><span style="color:#babed8;">});</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const API = () =&gt; ({</span></span>
<span class="line"><span style="color:#babed8;">  &#39;cards&#39;: CARDS,</span></span>
<span class="line"><span style="color:#babed8;">});</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">module.exports = API;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">mock/routes.json</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  &quot;/cards&quot;: &quot;/cards&quot;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>第2步：修改脚本命令</p><p>脚本命令也需要做相应的修改</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&quot;mock&quot;: &quot;node_modules/.bin/json-server --watch mock/db.js --routes mock/routes.json --port 9090&quot;</span></span></code></pre></div><p>第3步：重启Mock服务</p><p>这时我们重新使用：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm run mock</span></span></code></pre></div><p>命令启动Mock服务，在浏览器中输入 <a href="https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9090%2Fcards" target="_blank" rel="noreferrer">http://localhost:9090/cards</a> 访问/cards接口： <img src="https://user-images.githubusercontent.com/9566362/201151077-e283a291-b9ed-46f8-b689-bef8526c905e.png" alt="image"></p><p>可以看到Mock.js为我们生成了非常多随机测试数据，之前构造这些数据可是要费很大的工夫。 并且为了构造这大量的测试数据，我们只是在db.js中增加了不到50行代码，不用在担心源文件体积太大的问题。 <img src="https://user-images.githubusercontent.com/9566362/201151108-c54c6262-4c54-46bc-a381-0682937b3b18.png" alt="image"></p><p>是不是非常便捷？</p><p>让我们一起来试试业务中如何使用这些Mock接口，以及如何无缝切换成真实的后台接口吧。</p><p>一起来试试看吧</p><p>假设我们已经用NG CLI创建了一个项目，为了调用Mock接口，我们需要引入Angular的HttpClientModule模块：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">src/app/app.module.ts</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">import { HttpClientModule } from &#39;@angular/common/http&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">imports: [</span></span>
<span class="line"><span style="color:#babed8;">  ...,</span></span>
<span class="line"><span style="color:#babed8;">  HttpClientModule</span></span>
<span class="line"><span style="color:#babed8;">]</span></span></code></pre></div><p>直接调用Mock服务接口 然后注入Angular的HttpClient服务，就可以向Mock服务的/cards接口发起请求：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">src/app/app.component.ts</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">import { HttpClient } from &#39;@angular/common/http&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">constructor(</span></span>
<span class="line"><span style="color:#babed8;">  private http: HttpClient</span></span>
<span class="line"><span style="color:#babed8;">) {}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">ngOnInit() {</span></span>
<span class="line"><span style="color:#babed8;">  this.http.get(&#39;http://localhost:9090/cards&#39;).subscribe(cards =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;cards:&#39;, cards);</span></span>
<span class="line"><span style="color:#babed8;">  });</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>获取到的接口数据如下： <img src="https://user-images.githubusercontent.com/9566362/201151149-651eada6-55f7-4d61-9e3f-6020a2198ee3.png" alt="image"></p><p>使用代理无缝切换后台接口</p><p>聪明的你肯定发现直接调用Mock服务的接口有问题：部署到测试环境或者现网怎么办？</p><p>因为环境上调用的肯定是相应环境的后台接口，而不是Mock服务的接口，所以在本地开发时将接口代理到Mock服务，实际调用接口时不加具体的域名信息。</p><p>实际调用接口应该是以下的方式：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">this.http.get(&#39;/v1/cards&#39;).subscribe(cards =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  console.log(&#39;cards:&#39;, cards);</span></span>
<span class="line"><span style="color:#babed8;">});</span></span></code></pre></div><p>为了做到无缝切换后台接口，即：无需修改任何代码，本地调用Mock服务接口，线上调用后台接口。</p><p>我们需要在本地开发时将接口代理到Mock服务，可以使用NG CLI提供代理配置proxyConfig：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">angular.json</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">&quot;serve&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">  &quot;builder&quot;: &quot;@angular-devkit/build-angular:dev-server&quot;,</span></span>
<span class="line"><span style="color:#babed8;">  &quot;options&quot;: {</span></span>
<span class="line"><span style="color:#babed8;">    &quot;browserTarget&quot;: &quot;ng-demo:build&quot;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;port&quot;: 4600,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;proxyConfig&quot;: &quot;proxy.config.js&quot; // 新增代理配置</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">  ...</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>代理配置文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">proxy.config.js</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">const PROXY_CONFIG = {</span></span>
<span class="line"><span style="color:#babed8;">  &#39;/v1&#39;: {</span></span>
<span class="line"><span style="color:#babed8;">    target: &#39;http://localhost:9090/v1&#39;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">};</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">module.exports = PROXY_CONFIG;</span></span></code></pre></div><p>我们的Mock服务不需要做任何改变。 其他框架配置代理 如果你使用的不是NG CLI，要怎么配置代理呢？ Vue CLI配置代理</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">vue.config.js</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">devServer: {</span></span>
<span class="line"><span style="color:#babed8;">  proxy: {</span></span>
<span class="line"><span style="color:#babed8;">    &#39;/v1&#39;: {</span></span>
<span class="line"><span style="color:#babed8;">      target: &#39;http://localhost:9090/v1&#39;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>Webpack配置代理 Webpack的写法和Vue CLI的差不多</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">webpack.config.js</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">devServer: {</span></span>
<span class="line"><span style="color:#babed8;">  proxy: {</span></span>
<span class="line"><span style="color:#babed8;">    &#39;/v1&#39;: {</span></span>
<span class="line"><span style="color:#babed8;">      target: &#39;http://localhost:9090/v1&#39;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>CreateReactApp配置代理</p><p>React稍微麻烦一点儿，需要安装http-proxy-middleware中间件。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const proxy = require(&quot;http-proxy-middleware&quot;);</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">module.exports = function(app) {</span></span>
<span class="line"><span style="color:#babed8;">  app.use(</span></span>
<span class="line"><span style="color:#babed8;">    proxy(&quot;/api/&quot;, {</span></span>
<span class="line"><span style="color:#babed8;">      target: &quot;http://localhost:9090/v1&quot;</span></span>
<span class="line"><span style="color:#babed8;">    })</span></span>
<span class="line"><span style="color:#babed8;">  );</span></span>
<span class="line"><span style="color:#babed8;">};</span></span></code></pre></div><p>增加TS类型</p><p>如果你的项目使用TypeScript的话，一般都会给接口数据增加TS类型，我给大家介绍一个根据接口自动生成TS类型文件的神器：<a href="https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fquicktype%2Fquicktype" target="_blank" rel="noreferrer">quicktype</a>。</p><p>quicktype的定位是：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Generate types and converters from JSON, Schema, and GraphQL.</span></span>
<span class="line"><span style="color:#babed8;">从JSON、Schema和GraphQL生成类型和转换器。</span></span></code></pre></div><p>刚才我们已经启动了我们的Mock服务，在浏览器地址栏输入<a href="https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9090%2Fcards" target="_blank" rel="noreferrer">http://localhost:9090/cards</a>，也可以查看/cards接口的返回数据，这时我们可以使用quicktype工具根，据接口地址生成相应的TS类型文件。 只需要2步即可：</p><ul><li>第1步：安装quicktype</li><li>第2步：生成TS类型文件</li></ul><p>第1步：安装quicktype</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">npm i -g quicktype</span></span></code></pre></div><p>第2步：生成TS类型文件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">quicktype http://localhost:9090/cards -o ./src/app/shared/types/card.interface.ts --runtime-typecheck</span></span></code></pre></div><p>使用TS类型</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { CardInterface } from &#39;./shared/types/card.interface&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">this.http.get(&#39;/v1/cards&#39;).subscribe((cards: CardInterface) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">  console.log(&#39;cards:&#39;, cards);</span></span>
<span class="line"><span style="color:#babed8;">});</span></span></code></pre></div><p>使用TS类型有两个显而易见的好处：</p><ul><li>一是类型校验和自动提示；</li><li>二是数据文档化和字段自动提醒和补齐。</li></ul><p>类型校验和自动提示： <img src="https://user-images.githubusercontent.com/9566362/201151284-bee0d59b-3232-440f-96d7-5190102e6345.png" alt="image"></p><p>数据文档化和字段自动提醒和补齐： <img src="https://user-images.githubusercontent.com/9566362/201151304-acc7306c-4875-44f5-9055-5f5f8e2bef1c.png" alt="image"></p><h2 id="小结" tabindex="-1">小结 <a class="header-anchor" href="#小结" aria-label="Permalink to &quot;小结&quot;">​</a></h2><p>本文主要介绍如何通过 JSON Server 和 Mock.js 两大神器，在前端搭建Mock服务，模拟后台接口，从而在开发阶段去除对后台的依赖，提升业务交付的效率。</p><p>欢迎大家评论交流！</p><p>源码地址：<a href="https://github.com/kagol/ng-mock-server" target="_blank" rel="noreferrer">https://github.com/kagol/ng-mock-server</a></p>`,98);function r(i,b,u,d,q,y){const s=n("EditInfo");return e(),p("div",null,[c,l(s,{time:"2020年09月12日 12:31",title:"阅读 1154 ·  点赞 17 ·  评论 3 ·  收藏 10"})])}const m=a(t,[["render",r]]);export{h as __pageData,m as default};
