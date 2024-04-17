import{_ as a,B as n,o as e,c as l,G as p,Q as o}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"Node使用Mongoose操作MongoDB数据库——增删改查的实现","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2016/nodejs-mongoose.md","filePath":"tech/2016/nodejs-mongoose.md"}'),t={name:"tech/2016/nodejs-mongoose.md"},c=o(`<h1 id="node使用mongoose操作mongodb数据库——增删改查的实现" tabindex="-1">Node使用Mongoose操作MongoDB数据库——增删改查的实现 <a class="header-anchor" href="#node使用mongoose操作mongodb数据库——增删改查的实现" aria-label="Permalink to &quot;Node使用Mongoose操作MongoDB数据库——增删改查的实现&quot;">​</a></h1><p>当初刚出社会时就规划了下自己的职业生涯：先成为一名优秀的前端工程师，再成为一名全栈工程师(精通前端开发、后台开发和客户端开发)，最后成为一名优秀的系统架构师。转眼间已经工作快三年，是时候迈出关键性的一步了，开始涉足后端领域。于是最近在研究Node和Express，并研究了如何使用Express这个基于Node的Web开发框架开发RESTful API，以及Node如何连接MongoDB数据库，先总结如下：</p><p>(一)安装Node和MongoDB 　　1)到Node官网<a href="https://nodejs.org/en/" target="_blank" rel="noreferrer">https://nodejs.org/</a>下载最新版Node，或者直接点击<a href="https://nodejs.org/dist/v4.4.4/node-v4.4.4-x64.msi" target="_blank" rel="noreferrer">这里</a>下载。下载下来是一个后缀为msi的文件，直接双击运行即可。安装完在控制台输入：node -v，如果输出版本号则说明安装成功。</p><p>2)到MongoDB官网<a href="https://www.mongodb.com/" target="_blank" rel="noreferrer">https://www.mongodb.com/</a>下载最新版MongoDB，或者直接点击<a href="https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.6-signed.msi/download" target="_blank" rel="noreferrer">这里</a>下载。下载下来也是一个msi文件，直接双击运行即可。</p><p>(二)配置和开启MongoDB数据库 　　1)在D盘新建一个mongodb文件夹，并新建两个子文件夹mongodb/bin和mongodb/db。</p><p>2)在C盘找到MongoDB的安装目录，将C:\\Program Files\\MongoDB\\Server\\3.2\\bin路径下的所有文件拷贝到D:/mongodb/bin下。</p><p>3)打开控制台，切换到D:/mongodb/bin目录，输入：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">D:\\mongodb\\bin&gt;D:/mongodb/bin/mongod --dbpath=D:/mongodb/db</span></span></code></pre></div><p>4)另外再打开一个控制台窗口，切换到D:/mongodb/bin目录，输入：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">D:\\mongodb\\bin&gt;D:/mongodb/bin/mongo</span></span></code></pre></div><p>运行MongoDB。</p><p>这时会进入MongoDB的交互模式，输入：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&gt; use test</span></span>
<span class="line"><span style="color:#babed8;">switched to db test</span></span></code></pre></div><p>新建了一个test数据库。</p><p>(三)一个CRUD的栗子 　　为了简单起见，我就没有写那些表单、输入框什么的，数据直接在代码里改。</p><p>1.目录结构</p><p><img src="https://user-images.githubusercontent.com/9566362/227754172-c618c374-795b-45b3-b10b-26e703b14539.png" alt="image"></p><p>2.入口文件app.js</p><p>1)我们需要安装一些外部模块：express、express3-handlebars、mongoose、body-parser、supervisor(非必需)</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">Administrator@kagolzeng-PC1 MINGW64 /d/Code/FullStack/mongoose</span></span>
<span class="line"><span style="color:#babed8;">$ npm install --save express express3-handlebars mongoose body-parser</span></span>
<span class="line"><span style="color:#babed8;">Administrator@kagolzeng-PC1 MINGW64 /d/Code/FullStack/mongoose</span></span>
<span class="line"><span style="color:#babed8;">$ npm install -g supervisor</span></span></code></pre></div><p>2)引入express、body-parser和movie.js</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 var express = require(&#39;express&#39;);</span></span>
<span class="line"><span style="color:#babed8;">2 var bodyParser = require(&#39;body-parser&#39;);</span></span>
<span class="line"><span style="color:#babed8;">3 //数据操作对象</span></span>
<span class="line"><span style="color:#babed8;">4 var Movie = require(&#39;./public/server/js/movie&#39;);</span></span></code></pre></div><p>其中movie.js是为了方便数据操作，避免重复代码，抽出来的一个模块。</p><p>3)定义express对象app和设置静态文件路径等</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 var app = express();</span></span>
<span class="line"><span style="color:#babed8;">2 app.use(express.static(__dirname + &#39;/public&#39;));//设置静态文件路径</span></span>
<span class="line"><span style="color:#babed8;">3 app.use(bodyParser());//用来解析req.body参数的</span></span></code></pre></div><p>4)设置模板引擎</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 //设置模板引擎，这里用的是handlebars模板</span></span>
<span class="line"><span style="color:#babed8;">2 var handlebars = require(&#39;express3-handlebars&#39;).create({</span></span>
<span class="line"><span style="color:#babed8;">3     defaultLayout: &#39;main&#39;//默认布局(母版页)，默认从views/layouts/main.handlebars中找文件</span></span>
<span class="line"><span style="color:#babed8;">4 });</span></span>
<span class="line"><span style="color:#babed8;">5 app.engine(&#39;handlebars&#39;, handlebars.engine);</span></span>
<span class="line"><span style="color:#babed8;">6 app.set(&#39;view engine&#39;, &#39;handlebars&#39;);</span></span></code></pre></div><p>5)定义路由</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 //定义路由</span></span>
<span class="line"><span style="color:#babed8;"> 2 app.get(&#39;/&#39;, function(req, res){</span></span>
<span class="line"><span style="color:#babed8;"> 3     Movie.find(function(err, docs){</span></span>
<span class="line"><span style="color:#babed8;"> 4         res.render(&#39;home&#39;, {//渲染视图，默认从views/home.handlebars中找文件</span></span>
<span class="line"><span style="color:#babed8;"> 5             movies: docs</span></span>
<span class="line"><span style="color:#babed8;"> 6         });//向home页面传入了movies变量</span></span>
<span class="line"><span style="color:#babed8;"> 7     });</span></span>
<span class="line"><span style="color:#babed8;"> 8 });</span></span>
<span class="line"><span style="color:#babed8;"> 9 app.get(&#39;/about&#39;, function(req, res){</span></span>
<span class="line"><span style="color:#babed8;">10     res.render(&#39;about&#39;);</span></span>
<span class="line"><span style="color:#babed8;">11 });</span></span></code></pre></div><p></p><p>6)定义API接口</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 //定义API接口</span></span>
<span class="line"><span style="color:#babed8;"> 2 //新增接口</span></span>
<span class="line"><span style="color:#babed8;"> 3 app.post(&#39;/add&#39;, function(req, res){</span></span>
<span class="line"><span style="color:#babed8;"> 4     var movie = new Movie({//定义一个模块实例</span></span>
<span class="line"><span style="color:#babed8;"> 5         title: req.body.title,</span></span>
<span class="line"><span style="color:#babed8;"> 6         doctor: req.body.doctor,</span></span>
<span class="line"><span style="color:#babed8;"> 7         year: req.body.year,</span></span>
<span class="line"><span style="color:#babed8;"> 8         country: req.body.country,</span></span>
<span class="line"><span style="color:#babed8;"> 9         language: req.body.language,</span></span>
<span class="line"><span style="color:#babed8;">10         summary: req.body.summary</span></span>
<span class="line"><span style="color:#babed8;">11     });</span></span>
<span class="line"><span style="color:#babed8;">12     movie.save(function(err){</span></span>
<span class="line"><span style="color:#babed8;">13         if(err){</span></span>
<span class="line"><span style="color:#babed8;">14             console.log(&#39;保存失败&#39;);</span></span>
<span class="line"><span style="color:#babed8;">15         }</span></span>
<span class="line"><span style="color:#babed8;">16         console.log(&#39;保存成功&#39;);</span></span>
<span class="line"><span style="color:#babed8;">17         res.json({ ret: 0, msg: &#39;succeed&#39; });</span></span>
<span class="line"><span style="color:#babed8;">18     });</span></span>
<span class="line"><span style="color:#babed8;">19 });</span></span>
<span class="line"><span style="color:#babed8;">20 //更新接口</span></span>
<span class="line"><span style="color:#babed8;">21 app.post(&#39;/update&#39;, function(req, res){</span></span>
<span class="line"><span style="color:#babed8;">22     var id = req.body.id;</span></span>
<span class="line"><span style="color:#babed8;">23     if(id){</span></span>
<span class="line"><span style="color:#babed8;">24         Movie.update({</span></span>
<span class="line"><span style="color:#babed8;">25             _id: id</span></span>
<span class="line"><span style="color:#babed8;">26         }, {</span></span>
<span class="line"><span style="color:#babed8;">27             $set: {</span></span>
<span class="line"><span style="color:#babed8;">28                 title: req.body.title,</span></span>
<span class="line"><span style="color:#babed8;">29                 doctor: req.body.doctor,</span></span>
<span class="line"><span style="color:#babed8;">30                 year: req.body.year,</span></span>
<span class="line"><span style="color:#babed8;">31                 country: req.body.country,</span></span>
<span class="line"><span style="color:#babed8;">32                 language: req.body.language,</span></span>
<span class="line"><span style="color:#babed8;">33                 summary: req.body.summary</span></span>
<span class="line"><span style="color:#babed8;">34             }</span></span>
<span class="line"><span style="color:#babed8;">35         }, function(err){</span></span>
<span class="line"><span style="color:#babed8;">36             if(err){</span></span>
<span class="line"><span style="color:#babed8;">37                 console.log(err);</span></span>
<span class="line"><span style="color:#babed8;">38                 return;</span></span>
<span class="line"><span style="color:#babed8;">39             }</span></span>
<span class="line"><span style="color:#babed8;">40             console.log(&#39;更新成功&#39;);</span></span>
<span class="line"><span style="color:#babed8;">41             res.json({ ret: 0, msg: &#39;succeed&#39; });</span></span>
<span class="line"><span style="color:#babed8;">42         });</span></span>
<span class="line"><span style="color:#babed8;">43     }</span></span>
<span class="line"><span style="color:#babed8;">44 });</span></span>
<span class="line"><span style="color:#babed8;">45 //删除接口</span></span>
<span class="line"><span style="color:#babed8;">46 app.post(&#39;/delete&#39;, function(req, res){</span></span>
<span class="line"><span style="color:#babed8;">47     var id = req.body.id;</span></span>
<span class="line"><span style="color:#babed8;">48     if(id){</span></span>
<span class="line"><span style="color:#babed8;">49         Movie.remove({</span></span>
<span class="line"><span style="color:#babed8;">50             _id: id</span></span>
<span class="line"><span style="color:#babed8;">51         },function(err){</span></span>
<span class="line"><span style="color:#babed8;">52             if(err){</span></span>
<span class="line"><span style="color:#babed8;">53                 console.log(err);</span></span>
<span class="line"><span style="color:#babed8;">54                 return;</span></span>
<span class="line"><span style="color:#babed8;">55             }</span></span>
<span class="line"><span style="color:#babed8;">56             console.log(&#39;删除成功&#39;);</span></span>
<span class="line"><span style="color:#babed8;">57             res.json({ ret: 0, msg: &#39;succeed&#39; });</span></span>
<span class="line"><span style="color:#babed8;">58         });</span></span>
<span class="line"><span style="color:#babed8;">59     }</span></span>
<span class="line"><span style="color:#babed8;">60 });</span></span>
<span class="line"><span style="color:#babed8;">61 //根据ID获取单条数据的接口</span></span>
<span class="line"><span style="color:#babed8;">62 app.post(&#39;/getMovieById&#39;, function(req, res){</span></span>
<span class="line"><span style="color:#babed8;">63     Movie.findById(req.body.id, function(err, doc){</span></span>
<span class="line"><span style="color:#babed8;">64         res.json(doc);</span></span>
<span class="line"><span style="color:#babed8;">65     });</span></span>
<span class="line"><span style="color:#babed8;">66 });</span></span></code></pre></div><p></p><p>7)错误页</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 //以下两个中间价是用来展示错误页的</span></span>
<span class="line"><span style="color:#babed8;">2 app.use(function(req, res, next){</span></span>
<span class="line"><span style="color:#babed8;">3     res.status(404);</span></span>
<span class="line"><span style="color:#babed8;">4     res.render(&#39;404&#39;);</span></span>
<span class="line"><span style="color:#babed8;">5 });</span></span>
<span class="line"><span style="color:#babed8;">6 app.use(function(err, req, res, next){</span></span>
<span class="line"><span style="color:#babed8;">7     res.status(505);</span></span>
<span class="line"><span style="color:#babed8;">8     res.render(&#39;505&#39;);</span></span>
<span class="line"><span style="color:#babed8;">9 });</span></span></code></pre></div><p></p><p>8)监听端口</p><p>1 //监听3000端口 2 app.listen(3000); 3 console.log(&#39;在浏览器中输入localhost:3000访问系统首页&#39;);</p><p>3.movie.js数据操作模块</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 var mongoose = require(&#39;mongoose&#39;);</span></span>
<span class="line"><span style="color:#babed8;"> 2 mongoose.connect(&#39;mongodb://localhost/test&#39;);//连接到test数据库</span></span>
<span class="line"><span style="color:#babed8;"> 3 var Schema = mongoose.Schema;</span></span>
<span class="line"><span style="color:#babed8;"> 4 var movieSchema = new Schema({//定义框架</span></span>
<span class="line"><span style="color:#babed8;"> 5     title: String,</span></span>
<span class="line"><span style="color:#babed8;"> 6     doctor: String,</span></span>
<span class="line"><span style="color:#babed8;"> 7     year: Number,</span></span>
<span class="line"><span style="color:#babed8;"> 8     country: String,</span></span>
<span class="line"><span style="color:#babed8;"> 9     language: String,</span></span>
<span class="line"><span style="color:#babed8;">10     summary: String</span></span>
<span class="line"><span style="color:#babed8;">11 });</span></span>
<span class="line"><span style="color:#babed8;">12 var Movie = mongoose.model(&#39;Movie&#39;, movieSchema);//定义模块</span></span>
<span class="line"><span style="color:#babed8;">13 module.exports = Movie;//导出模块，使外部可以调用</span></span></code></pre></div><p>这里要注意的是定义模块的第一个参数并不是数据库的名称，这里对应的数据库名称是：movies。</p><p>4.布局(母版页)main.handlebars</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 &lt;!DOCTYPE html&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 2 &lt;html&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 3 &lt;head&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 4     &lt;meta charset=&quot;utf-8&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 5     &lt;title&gt;Home&lt;/title&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 6     &lt;script src=&quot;http://code.jquery.com/jquery.min.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 7     &lt;link rel=&quot;stylesheet&quot; href=&quot;http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 8 &lt;/head&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 9 &lt;body&gt;</span></span>
<span class="line"><span style="color:#babed8;">10     {{{body}}}</span></span>
<span class="line"><span style="color:#babed8;">11     &lt;script src=&quot;/client/js/index.js&quot;&gt;&lt;/script&gt;</span></span>
<span class="line"><span style="color:#babed8;">12 &lt;/body&gt;</span></span>
<span class="line"><span style="color:#babed8;">13 &lt;/html&gt;</span></span></code></pre></div><p></p><p>5.各个视图文件</p><p>1)home.handlebars</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 &lt;h1&gt;Welcome to Meadowlark Travel&lt;/h1&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 2 &lt;div&gt;&lt;a href=&quot;javascript:;&quot; id=&quot;btn_add&quot; class=&quot;btn btn-primary&quot;&gt;Add&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 3 &lt;div&gt;&lt;a href=&quot;javascript:;&quot; id=&quot;btn_update&quot; class=&quot;btn btn-primary&quot;&gt;Update&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 4 &lt;div&gt;&lt;a href=&quot;javascript:;&quot; id=&quot;btn_delete&quot; class=&quot;btn btn-primary&quot;&gt;Delete&lt;/a&gt;&lt;/div&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 5 &lt;table class=&quot;table&quot;&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 6     &lt;tr&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 7         &lt;th&gt;ID&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 8         &lt;th&gt;Title&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;"> 9         &lt;th&gt;Doctor&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;">10         &lt;th&gt;Year&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;">11         &lt;th&gt;Country&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;">12         &lt;th&gt;Language&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;">13         &lt;th&gt;Summary&lt;/th&gt;</span></span>
<span class="line"><span style="color:#babed8;">14     &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#babed8;">15     {{#each movies}}</span></span>
<span class="line"><span style="color:#babed8;">16         &lt;tr&gt;</span></span>
<span class="line"><span style="color:#babed8;">17             &lt;td&gt;{{_id}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">18             &lt;td&gt;{{title}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">19             &lt;td&gt;{{doctor}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">20             &lt;td&gt;{{year}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">21             &lt;td&gt;{{country}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">22             &lt;td&gt;{{language}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">23             &lt;td&gt;{{summary}}&lt;/td&gt;</span></span>
<span class="line"><span style="color:#babed8;">24         &lt;/tr&gt;</span></span>
<span class="line"><span style="color:#babed8;">25     {{/each}}</span></span>
<span class="line"><span style="color:#babed8;">26 &lt;/table&gt;</span></span></code></pre></div><p>2)about.handlebars</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;h1&gt;About Meadowlark Travel&lt;/h1&gt;</span></span></code></pre></div><p>3)404.handlebars</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;h1&gt;404 - Not Found&lt;/h1&gt;</span></span></code></pre></div><p>4)505.handlebars</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;h1&gt;505 - Internal Error&lt;/h1&gt;</span></span></code></pre></div><p></p><p>6.jQuery风格的Ajax请求文件index.js</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 $(&#39;#btn_add&#39;).on(&#39;click&#39;, function(){</span></span>
<span class="line"><span style="color:#babed8;"> 2     $.ajax({</span></span>
<span class="line"><span style="color:#babed8;"> 3         url: &#39;/add&#39;,</span></span>
<span class="line"><span style="color:#babed8;"> 4         type: &#39;post&#39;,</span></span>
<span class="line"><span style="color:#babed8;"> 5         data: {</span></span>
<span class="line"><span style="color:#babed8;"> 6             title: &#39;Sudu7&#39;,</span></span>
<span class="line"><span style="color:#babed8;"> 7             doctor: &#39;Jack&#39;,</span></span>
<span class="line"><span style="color:#babed8;"> 8             year: &#39;2015&#39;,</span></span>
<span class="line"><span style="color:#babed8;"> 9             country: &#39;America&#39;,</span></span>
<span class="line"><span style="color:#babed8;">10             language: &#39;English&#39;,</span></span>
<span class="line"><span style="color:#babed8;">11             summary: &#39;Great&#39;</span></span>
<span class="line"><span style="color:#babed8;">12         },</span></span>
<span class="line"><span style="color:#babed8;">13         success: function(data){</span></span>
<span class="line"><span style="color:#babed8;">14             console.log(JSON.stringify(data));</span></span>
<span class="line"><span style="color:#babed8;">15         }</span></span>
<span class="line"><span style="color:#babed8;">16     });</span></span>
<span class="line"><span style="color:#babed8;">17 });</span></span>
<span class="line"><span style="color:#babed8;">18 $(&#39;#btn_update&#39;).on(&#39;click&#39;, function(){</span></span>
<span class="line"><span style="color:#babed8;">19     $.ajax({</span></span>
<span class="line"><span style="color:#babed8;">20         url: &#39;/update&#39;,</span></span>
<span class="line"><span style="color:#babed8;">21         type: &#39;post&#39;,</span></span>
<span class="line"><span style="color:#babed8;">22         data: {</span></span>
<span class="line"><span style="color:#babed8;">23             id: &#39;5731af54a2b840a83f2f26d3 &#39;,</span></span>
<span class="line"><span style="color:#babed8;">24             title: &#39;极盗者&#39;,</span></span>
<span class="line"><span style="color:#babed8;">25             doctor: &#39;罗杰斯&#39;,</span></span>
<span class="line"><span style="color:#babed8;">26             year: &#39;2015&#39;,</span></span>
<span class="line"><span style="color:#babed8;">27             country: &#39;America&#39;,</span></span>
<span class="line"><span style="color:#babed8;">28             language: &#39;English&#39;,</span></span>
<span class="line"><span style="color:#babed8;">29             summary: &#39;极限运动&#39;</span></span>
<span class="line"><span style="color:#babed8;">30         },</span></span>
<span class="line"><span style="color:#babed8;">31         success: function(data){</span></span>
<span class="line"><span style="color:#babed8;">32             console.log(JSON.stringify(data));</span></span>
<span class="line"><span style="color:#babed8;">33         }</span></span>
<span class="line"><span style="color:#babed8;">34     });</span></span>
<span class="line"><span style="color:#babed8;">35 });</span></span>
<span class="line"><span style="color:#babed8;">36 $(&#39;#btn_delete&#39;).on(&#39;click&#39;, function(){</span></span>
<span class="line"><span style="color:#babed8;">37     $.ajax({</span></span>
<span class="line"><span style="color:#babed8;">38         url: &#39;/delete&#39;,</span></span>
<span class="line"><span style="color:#babed8;">39         type: &#39;post&#39;,</span></span>
<span class="line"><span style="color:#babed8;">40         data: {</span></span>
<span class="line"><span style="color:#babed8;">41             id: &#39;5731ad259ad2c8882ecb87c2&#39;</span></span>
<span class="line"><span style="color:#babed8;">42         },</span></span>
<span class="line"><span style="color:#babed8;">43         success: function(data){</span></span>
<span class="line"><span style="color:#babed8;">44             console.log(JSON.stringify(data));</span></span>
<span class="line"><span style="color:#babed8;">45         }</span></span>
<span class="line"><span style="color:#babed8;">46     });</span></span>
<span class="line"><span style="color:#babed8;">47 });</span></span>
<span class="line"><span style="color:#babed8;">48 $.ajax({</span></span>
<span class="line"><span style="color:#babed8;">49     url: &#39;/getMovieById&#39;,</span></span>
<span class="line"><span style="color:#babed8;">50     type: &#39;post&#39;,</span></span>
<span class="line"><span style="color:#babed8;">51     data: {</span></span>
<span class="line"><span style="color:#babed8;">52         id: &#39;57328a0101c4095818fb1724&#39;</span></span>
<span class="line"><span style="color:#babed8;">53     },</span></span>
<span class="line"><span style="color:#babed8;">54     success: function(data){</span></span>
<span class="line"><span style="color:#babed8;">55         console.log(JSON.stringify(data));</span></span>
<span class="line"><span style="color:#babed8;">56     }</span></span>
<span class="line"><span style="color:#babed8;">57 });</span></span></code></pre></div><p>(四)总结 　　至此，就实现了从数据库到后台，再到前端的整个编码过程。</p>`,57);function b(r,d,i,y,g,u){const s=n("EditInfo");return e(),l("div",null,[c,p(s,{time:"2016-05-11 09:42",title:"阅读(857)  评论(0)"})])}const v=a(t,[["render",b]]);export{h as __pageData,v as default};
