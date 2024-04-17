import{_ as a,B as e,o as n,c as p,G as t,Q as l}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"2016腾讯\\"创益24小时\\"互联网公益创新大赛总结","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2016/summary-create-public-welfare-24-hour.md","filePath":"tech/2016/summary-create-public-welfare-24-hour.md"}'),o={name:"tech/2016/summary-create-public-welfare-24-hour.md"},r=l(`<h1 id="_2016腾讯-创益24小时-互联网公益创新大赛总结" tabindex="-1">2016腾讯&quot;创益24小时&quot;互联网公益创新大赛总结 <a class="header-anchor" href="#_2016腾讯-创益24小时-互联网公益创新大赛总结" aria-label="Permalink to &quot;2016腾讯&quot;创益24小时&quot;互联网公益创新大赛总结&quot;">​</a></h1><p>上周末参加了腾讯的&quot;创益24小时&quot;互联网公益大赛，和两个小伙伴(设计师Beryl和产品经理Benny)浴血奋战两天一夜，完成了一个叫&quot;彩虹桥&quot;的公益项目。</p><p>(一)项目背景和设计目的</p><p>设计该项目的目的是为了让父母更好地了解年轻人，从而促进父母与子女之间的沟通。随着孩子慢慢地长大，离开父母去外地读书、工作，与父母的距离越来越远，沟通越来越少，每次与父母通电话，他们总是有问不完的问题：”你每天都在做什么工作啊？”，”你周末都怎么度过啊？”于是我们就想要建立起父母与年轻人之间沟通的桥梁，让父母更多地了解、认识年轻人的工作、生活、思想。</p><p>(二)项目基本流程</p><p>我们借助微信的平台，以服务号的形式构建该项目。之所以采用服务号和聊天的形式，是保证跟微信聊天类似的体验；初次提问会有指引和示范；这都是为了把父母的使用门槛降到最低。系统分两种角色：父母和子女。</p><p>1.父母端</p><p>父母进入系统，看到的是一个提问的界面：</p><p><img src="https://user-images.githubusercontent.com/9566362/227754109-09857c8c-fa88-423d-ae76-38da5e29bfd5.png" alt="image"></p><p>在这里，父母能够提出任何关于子女他们想要了解的东西，每一个问题都会随机发送给子女们答复，虽然不是他自己的子女，但也许从事一样的职业，有着一样的文化，过着类似的生活，因此足够提供他们需要的帮助。</p><p>2.子女端</p><p>子女进入系统，会收到一条来自父母的问题，并进行回答，不好回答可以点击”换一个”：</p><p><img src="https://user-images.githubusercontent.com/9566362/227754114-093b187a-c3f4-4012-abd9-850773df85e8.png" alt="image"></p><p>在这里，我们子女们能够告诉父辈他们想了解的东西，当我们开始使用的时候，能随机收到任何来自父母的疑问，虽然不是我们自己的父母，但他们跟我们的父母一样，希望跟我们了解更多，话题更多。</p><p>子女回答了父母的问题之后，父母可以表示感谢。</p><p><img src="https://user-images.githubusercontent.com/9566362/227754116-09470da8-961b-4edf-80fa-af023800af05.png" alt="image"></p><p>而子女可以点击头像进入”个人中心”查看自己获得的感谢数，这些记录，都会成为我们的公益数据。在主页里，同时也可以查看朋友的公益数据，大家一起做公益。后续也可以跟关爱老人基金会之类的机构合作，捐出感谢就可以让父母得到更多生活上的帮助，这里我们参考了微信运动。</p><p><img src="https://user-images.githubusercontent.com/9566362/227754123-e4f9afc7-6b5b-44a5-9270-4e5eaf4b7e0f.png" alt="image"></p><p>公益不单单是我们去到灾区，捐钱捐款，公益也可以是我们在碎片化的时间，解答关于父母的一点一滴的疑惑。</p><p>我们做这个项目的愿景，是希望提供父母了解子女的一座桥梁，了解更多，就可以话题越多，理解也就更多：老吾老，以及人之老！</p><p>(三)项目实现</p><p>1.项目结构</p><p><img src="https://user-images.githubusercontent.com/9566362/227754129-001a74f0-901a-4822-a46e-c040ce3477c4.png" alt="image"></p><p>2.安装Node.js和Express</p><p>到<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">Node.js官网</a>下载最新版Node.js(v4.4.3 LTS)，或者直接<a href="https://nodejs.org/dist/v4.4.3/node-v4.4.3-x64.msi" target="_blank" rel="noreferrer">点击这里</a>进行下载，下载下来是一个msi文件(node-v4.4.3-x64.msi)，双击该文件即可安装Node.js，傻瓜式安装，不必赘述。安装完之后在windows命令行窗口输入：node -v，若出现node.js的版本号：v4.4.3，则说明node.js安装成功。</p><p>Express的安装要用到Node.js的npm包管理工具，具体安装步骤如下：</p><p>打开windows命令行工具(Win+R，输入cmd，按确定按钮)； 切换到server.js文件所在目录(先切换盘符，我的在F盘，所以输入F:，按Enter键，然后切换目录：cd Code/Bridge)； 安装Express(输入命令：npm install express)； 　　安装完成之后F:/Code/Bridge目录会多一个node_modules文件夹，里面就是express模块。</p><p>3.Node.js路由机制</p><p>为了能在手机上浏览，我利用Node.js和express搭建了一个Web服务器，并引入了Node.js的路由机制，以下是server.js文件：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 var express = require(&#39;express&#39;);</span></span>
<span class="line"><span style="color:#babed8;"> 2 var fs = require(&#39;fs&#39;);</span></span>
<span class="line"><span style="color:#babed8;"> 3 var app = express();</span></span>
<span class="line"><span style="color:#babed8;"> 4 app.use(express.static(__dirname + &#39;/static&#39;));//设置静态文件的路径</span></span>
<span class="line"><span style="color:#babed8;"> 5 app.get(&#39;/&#39;, function(request, response){</span></span>
<span class="line"><span style="color:#babed8;"> 6     fs.readFile(&#39;./views/index.html&#39;, &#39;utf-8&#39; , function(err, data){</span></span>
<span class="line"><span style="color:#babed8;"> 7         if(err) response.send(err);</span></span>
<span class="line"><span style="color:#babed8;"> 8         response.send(data);</span></span>
<span class="line"><span style="color:#babed8;"> 9     });</span></span>
<span class="line"><span style="color:#babed8;">10 });</span></span>
<span class="line"><span style="color:#babed8;">11 app.get(&#39;/parents&#39;, function(request, response){</span></span>
<span class="line"><span style="color:#babed8;">12     fs.readFile(&#39;./views/parents/index.html&#39;, &#39;utf-8&#39; , function(err, data){</span></span>
<span class="line"><span style="color:#babed8;">13         if(err) response.send(err);</span></span>
<span class="line"><span style="color:#babed8;">14         response.send(data);</span></span>
<span class="line"><span style="color:#babed8;">15     });</span></span>
<span class="line"><span style="color:#babed8;">16 });</span></span>
<span class="line"><span style="color:#babed8;">17 app.get(&#39;/children&#39;, function(request, response){</span></span>
<span class="line"><span style="color:#babed8;">18     fs.readFile(&#39;./views/children/index.html&#39;, &#39;utf-8&#39; , function(err, data){</span></span>
<span class="line"><span style="color:#babed8;">19         if(err) response.send(err);</span></span>
<span class="line"><span style="color:#babed8;">20         response.send(data);</span></span>
<span class="line"><span style="color:#babed8;">21     });</span></span>
<span class="line"><span style="color:#babed8;">22 });</span></span>
<span class="line"><span style="color:#babed8;">23 app.get(&#39;/center&#39;, function(request, response){</span></span>
<span class="line"><span style="color:#babed8;">24     fs.readFile(&#39;./views/children/personal_center.html&#39;, &#39;utf-8&#39; , function(err, data){</span></span>
<span class="line"><span style="color:#babed8;">25         if(err) response.send(err);</span></span>
<span class="line"><span style="color:#babed8;">26         response.send(data);</span></span>
<span class="line"><span style="color:#babed8;">27     });</span></span>
<span class="line"><span style="color:#babed8;">28 });</span></span>
<span class="line"><span style="color:#babed8;">29 app.listen(8000);//设置访问的端口号</span></span></code></pre></div><p>要访问系统页面，需要运行server.js文件，在命令行窗口切换到F:/Code/Bridge路径，输入：node server.js，即可启动Web服务器，此时可在浏览器地址栏输入：<code>http://localhost:8000/</code> or <code>http://127.0.0.1:8000/</code>，即可访问系统首页。若要在其他机器上或手机端访问，则需输入127域名对应的IPv4地址，在命令行窗口输入：ipconfig，即可获得IPv4地址，如下所示：</p><p><img src="https://user-images.githubusercontent.com/9566362/227754143-7dd7e971-0bec-44fc-81fc-7b46679d0fca.png" alt="image"></p><p>这时可在手机浏览器或者在微信里输入：<code>192.168.1.101:8000</code>，访问系统首页。</p><p>4.首页index.html</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 2 &lt;html&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 3 &lt;head&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 4     &lt;title&gt;彩虹桥&lt;/title&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 5     &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 6     &lt;meta name=&quot;viewport&quot; content=&quot;width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 7     &lt;script src=&quot;https://code.jquery.com/jquery-2.2.3.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 8     &lt;script src=&quot;/js/index.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 9     &lt;link rel=&quot;stylesheet&quot; href=&quot;/css/index.css&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">10 &lt;/head&gt;</span></span>
<span class="line"><span style="color:#babed8;">11 &lt;body&gt;</span></span>
<span class="line"><span style="color:#babed8;">12     &lt;header class=&quot;header&quot;&gt;&lt;/header&gt;</span></span>
<span class="line"><span style="color:#babed8;">13     &lt;section class=&quot;wrap&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">14         &lt;div class=&quot;sample&quot;&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">15         &lt;ul class=&quot;dialogList&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">16         &lt;/ul&gt;</span></span>
<span class="line"><span style="color:#babed8;">17     &lt;/section&gt;</span></span>
<span class="line"><span style="color:#babed8;">18     &lt;div class=&quot;bar&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;">19         &lt;span class=&quot;switch&quot;&gt;&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">20         &lt;span class=&quot;touchArea&quot;&gt;&lt;/span&gt;</span></span>
<span class="line"><span style="color:#babed8;">21     &lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;">22     &lt;footer class=&quot;footer&quot;&gt;&lt;/footer&gt;</span></span>
<span class="line"><span style="color:#babed8;">23 &lt;/body&gt;</span></span>
<span class="line"><span style="color:#babed8;">24 &lt;/html&gt;</span></span></code></pre></div><p>需要注意的是静态资源的引用。</p><p>(四)总结</p><p>通过这次比赛，最大的收获是了解了一个创业项目从无到有的整个过程：从头脑风暴讨论创意，确定主题和项目的宗旨，到构想创意，再到设计方案和需求点，接着是设计师设计交互稿和视觉稿，开发人员进行项目Demo的开发，再到精细的开发和测试，最后项目上线。当然中间会经历多次需求完善和功能迭代。另外，通过这次比赛，对公益有了更多的思考，了解了别人是怎么做公益的。做公益有时可以很简单，可以是身边的事，也可以很有趣，公益不在于少数人做很多事情，而在于很多人贡献一点点力量。</p>`,38);function c(i,d,b,u,g,m){const s=e("EditInfo");return n(),p("div",null,[r,t(s,{time:"2016-04-26 12:16",title:"阅读(917)  评论(0)"})])}const f=a(o,[["render",c]]);export{h as __pageData,f as default};
