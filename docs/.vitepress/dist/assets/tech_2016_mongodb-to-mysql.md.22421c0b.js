import{_ as a,B as n,o as e,c as l,G as o,Q as p}from"./chunks/framework.1fee3549.js";const h=JSON.parse('{"title":"如何将MongoDB数据库的数据迁移到MySQL数据库中","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2016/mongodb-to-mysql.md","filePath":"tech/2016/mongodb-to-mysql.md"}'),c={name:"tech/2016/mongodb-to-mysql.md"},t=p(`<h1 id="如何将mongodb数据库的数据迁移到mysql数据库中" tabindex="-1">如何将MongoDB数据库的数据迁移到MySQL数据库中 <a class="header-anchor" href="#如何将mongodb数据库的数据迁移到mysql数据库中" aria-label="Permalink to &quot;如何将MongoDB数据库的数据迁移到MySQL数据库中&quot;">​</a></h1><p>FAQ v2.0终于上线了，断断续续忙了有2个多月。这个项目是我实践的第一个全栈的项目，从需求（后期有产品经理介入）到架构，再到设计（有征询设计师的意见）、构建（前端、后台、数据库、服务器部署），也是第一次独立负责一个项目，所以意义很不一般，后面还会写一篇总结的文章。闲言少叙，进入正题：</p><p>其中有一个自动定时发访问记录列表和反馈问题列表的邮件的功能，本来打算自己写的，不过后来了解到团队有现成的平台可以做这个事，所以就用现成的喽。但有一个问题，该平台配置的数据源必须是MySQL数据库，而FAQ平台用的是MongoDB数据库。有两个办法：一是把现有的MongoDB数据库换成MySQL，这样的话要改动比较大；二是把MongoDB里的数据迁移到MySQL数据库。我采用的是第二种方法，可是怎么迁移呢？不能直接迁移，在网上搜了下，有一个办法是先把MongoDB里的数据导出到csv文件或者txt文件中，再把csv/txt文件中的数据导入到MySQL数据库中，感觉挺靠谱的。</p><p>分两步走：</p><p><img src="https://user-images.githubusercontent.com/9566362/227754465-c25158bf-d461-49b9-b43f-0ee032bb0a26.png" alt="image"></p><p>PS：昨天用windows自带的画图工具画的那个图有点丑，今天一个设计师朋友用sketch给我画了个好看点的图，附上。（2016.10.26更新）</p><p>第一步：将MongoDB里的数据导出到csv文件，有一个mongo自带的工具mongoexport就可以实现。</p><p>/usr/local/mongodb/bin/mongoexport -h ip(192.168.0.102) -u mongo数据库登录帐号 -p mongo数据库登录密码 -d mongo数据库名称 -c mongo数据库集合名 -f _id,字段1,字段2 --type=csv -o 保存路径(/data/kagol/records.csv) 　　导出的csv文件格式是一条mongo记录占一行，字段之间用逗号(,)分割。</p><p>第二步：将csv文件导入到MySQL数据库中，可以用MySQL的load命令。</p><p>SQL语句如下(load_csv_data.sql）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 load data local infile &#39;/data/kagol/records.csv&#39;</span></span>
<span class="line"><span style="color:#babed8;">2 into table \`records\` character set utf8</span></span>
<span class="line"><span style="color:#babed8;">3 fields terminated by &#39;,&#39; optionally enclosed by &#39;&quot;&#39;</span></span>
<span class="line"><span style="color:#babed8;">4 lines terminated by &#39;\\n&#39;</span></span>
<span class="line"><span style="color:#babed8;">5 ignore 1 lines;</span></span></code></pre></div><p>写成shell脚本(load_csv_data.sh)：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">mysql -hip(192.168.0.105) -umysql登录用户名 -pmysql登录密码 mysql数据库名 --default-character-set=utf8 --local-infile=1 &lt; /data/kagol/load_csv_data.sql</span></span></code></pre></div><p>要注意的是：</p><p>(1)-h和ip之间不需要空格（-u，-p同理）；</p><p>(2)MySQL数据库的格式必须和csv格式一致（字段数、顺序等）。</p><p>这样就顺利地完成了MongoDB数据库到MySQL数据库的迁移，but！！这个方法导出来的数据中文是乱码的！！花了那么多时间居然是乱码，此刻我的内心是奔溃的！（此处不配图，自己脑补画面）</p><p></p><p>于是，有了现在的方案，写代码(Node)迁移。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 //mongo对象</span></span>
<span class="line"><span style="color:#babed8;"> 2 var Record     = require(&#39;./record&#39;);</span></span>
<span class="line"><span style="color:#babed8;"> 3 </span></span>
<span class="line"><span style="color:#babed8;"> 4 //mysql对象</span></span>
<span class="line"><span style="color:#babed8;"> 5 var mysql      = require(&#39;mysql&#39;);</span></span>
<span class="line"><span style="color:#babed8;"> 6 var connection = mysql.createConnection({</span></span>
<span class="line"><span style="color:#babed8;"> 7     host     : &#39;192.168.0.104&#39;,//mysql服务器ip</span></span>
<span class="line"><span style="color:#babed8;"> 8     user     : &#39;XXX&#39;,//mysql登录名</span></span>
<span class="line"><span style="color:#babed8;"> 9     password : &#39;XXX&#39;,//mysql登录密码</span></span>
<span class="line"><span style="color:#babed8;">10     database : &#39;XXX&#39;//mysql数据库名</span></span>
<span class="line"><span style="color:#babed8;">11 });</span></span>
<span class="line"><span style="color:#babed8;">12 </span></span>
<span class="line"><span style="color:#babed8;">13 connection.query(&#39;set names latin1&#39;);//这句很关键，确保中文不乱码</span></span>
<span class="line"><span style="color:#babed8;">14 </span></span>
<span class="line"><span style="color:#babed8;">15 var addZero = function(num){</span></span>
<span class="line"><span style="color:#babed8;">16     return num &lt; 10 ? &#39;0&#39; + num : num;</span></span>
<span class="line"><span style="color:#babed8;">17 }</span></span>
<span class="line"><span style="color:#babed8;">18 </span></span>
<span class="line"><span style="color:#babed8;">19 var getYesterday = function(){</span></span>
<span class="line"><span style="color:#babed8;">20     var now = new Date();</span></span>
<span class="line"><span style="color:#babed8;">21     var year = now.getFullYear();</span></span>
<span class="line"><span style="color:#babed8;">22     var month = now.getMonth() + 1;</span></span>
<span class="line"><span style="color:#babed8;">23     now.setTime(now.getTime() - 1000*60*60*24);</span></span>
<span class="line"><span style="color:#babed8;">24     var day = now.getDate();</span></span>
<span class="line"><span style="color:#babed8;">25     var result = year + &#39;-&#39; + addZero(month) + &#39;-&#39; + addZero(day);</span></span>
<span class="line"><span style="color:#babed8;">26     return result;</span></span>
<span class="line"><span style="color:#babed8;">27 }</span></span>
<span class="line"><span style="color:#babed8;">28 </span></span>
<span class="line"><span style="color:#babed8;">29 var yesterday = getYesterday();</span></span>
<span class="line"><span style="color:#babed8;">30 </span></span>
<span class="line"><span style="color:#babed8;">31 //导入昨天的数据</span></span>
<span class="line"><span style="color:#babed8;">32 Record.find({time:{&#39;$gt&#39;:yesterday + &#39; 00:00:00&#39;,&#39;$lt&#39;:yesterday + &#39; 23:59:59&#39;}},function(err, docs){</span></span>
<span class="line"><span style="color:#babed8;">33     if(err){</span></span>
<span class="line"><span style="color:#babed8;">34         console.log(&#39;error&#39;);</span></span>
<span class="line"><span style="color:#babed8;">35     }else{</span></span>
<span class="line"><span style="color:#babed8;">36         for(var i=0;i&lt;docs.length;i++){</span></span>
<span class="line"><span style="color:#babed8;">37                 var 字段1 = docs[i].字段1;</span></span>
<span class="line"><span style="color:#babed8;">38                 var 字段2 = docs[i].字段2;</span></span>
<span class="line"><span style="color:#babed8;">39                 var sql = &#39;insert into faq_records (字段1, 字段2) values(&quot;&#39;+字段1+&#39;&quot;,&quot;&#39;+字段2+&#39;);&#39;;</span></span>
<span class="line"><span style="color:#babed8;">40                 connection.query(sql, function(err, rows) {</span></span>
<span class="line"><span style="color:#babed8;">41                     return;</span></span>
<span class="line"><span style="color:#babed8;">42                 });</span></span>
<span class="line"><span style="color:#babed8;">43         }</span></span>
<span class="line"><span style="color:#babed8;">44         console.log(&#39;succeed!&#39;);</span></span>
<span class="line"><span style="color:#babed8;">45     }</span></span>
<span class="line"><span style="color:#babed8;">46 })</span></span></code></pre></div><p>record.js文件是封装了对mongo数据库的操作：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">1 var mongoose = require(&#39;mongoose&#39;);</span></span>
<span class="line"><span style="color:#babed8;">2 var connectionRecord = mongoose.createConnection(&#39;mongodb://mongo登录帐号:mongo登录密码@ip:mongo服务端口(默认是27017)/数据库名&#39;);</span></span>
<span class="line"><span style="color:#babed8;">3 var Schema = mongoose.Schema;</span></span>
<span class="line"><span style="color:#babed8;">4 var recordSchema = new Schema({</span></span>
<span class="line"><span style="color:#babed8;">5         字段1: String,</span></span>
<span class="line"><span style="color:#babed8;">6         字段2: String</span></span>
<span class="line"><span style="color:#babed8;">7 });</span></span>
<span class="line"><span style="color:#babed8;">8 var Record = connectionRecord.model(&#39;Record&#39;, recordSchema);</span></span>
<span class="line"><span style="color:#babed8;">9 module.exports = Record;</span></span></code></pre></div><p></p><p>这个方案完美地解决了中文乱码问题！</p><p>大家有别的方法可以一起讨论哈~~</p><p>PS：一直没搞明白为什么第一种方案会乱码，mongo里的数据确实是没有乱码的，csv文件里的数据也没有乱码，就是到了MySQL里就是乱码，怀疑是load data那一步有问题，但是我加了&quot;character set utf8&quot;和&quot;--default-character-set=utf8&quot;啊~~</p>`,26);function r(d,i,b,y,m,g){const s=n("EditInfo");return e(),l("div",null,[t,o(s,{time:"2016-10-10 17:07",title:"阅读(19236)  评论(9)"})])}const v=a(c,[["render",r]]);export{h as __pageData,v as default};
