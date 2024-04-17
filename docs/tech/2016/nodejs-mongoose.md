# Node使用Mongoose操作MongoDB数据库——增删改查的实现


当初刚出社会时就规划了下自己的职业生涯：先成为一名优秀的前端工程师，再成为一名全栈工程师(精通前端开发、后台开发和客户端开发)，最后成为一名优秀的系统架构师。转眼间已经工作快三年，是时候迈出关键性的一步了，开始涉足后端领域。于是最近在研究Node和Express，并研究了如何使用Express这个基于Node的Web开发框架开发RESTful API，以及Node如何连接MongoDB数据库，先总结如下：

 

(一)安装Node和MongoDB
　　1)到Node官网[https://nodejs.org/](https://nodejs.org/en/)下载最新版Node，或者直接点击[这里](https://nodejs.org/dist/v4.4.4/node-v4.4.4-x64.msi)下载。下载下来是一个后缀为msi的文件，直接双击运行即可。安装完在控制台输入：node -v，如果输出版本号则说明安装成功。

　　2)到MongoDB官网[https://www.mongodb.com/](https://www.mongodb.com/)下载最新版MongoDB，或者直接点击[这里](https://www.mongodb.com/dr/fastdl.mongodb.org/win32/mongodb-win32-x86_64-2008plus-ssl-3.2.6-signed.msi/download)下载。下载下来也是一个msi文件，直接双击运行即可。

 

(二)配置和开启MongoDB数据库
　　1)在D盘新建一个mongodb文件夹，并新建两个子文件夹mongodb/bin和mongodb/db。

 

　　2)在C盘找到MongoDB的安装目录，将C:\Program Files\MongoDB\Server\3.2\bin路径下的所有文件拷贝到D:/mongodb/bin下。

 

　　3)打开控制台，切换到D:/mongodb/bin目录，输入：
```
D:\mongodb\bin>D:/mongodb/bin/mongod --dbpath=D:/mongodb/db
```
　　4)另外再打开一个控制台窗口，切换到D:/mongodb/bin目录，输入：
```
D:\mongodb\bin>D:/mongodb/bin/mongo
```
　　运行MongoDB。

　　这时会进入MongoDB的交互模式，输入：
```
> use test
switched to db test
```
　　新建了一个test数据库。

 

(三)一个CRUD的栗子
　　为了简单起见，我就没有写那些表单、输入框什么的，数据直接在代码里改。

 

　　1.目录结构

　　
![image](https://user-images.githubusercontent.com/9566362/227754172-c618c374-795b-45b3-b10b-26e703b14539.png)

 

　　2.入口文件app.js

　　1)我们需要安装一些外部模块：express、express3-handlebars、mongoose、body-parser、supervisor(非必需)
```
Administrator@kagolzeng-PC1 MINGW64 /d/Code/FullStack/mongoose
$ npm install --save express express3-handlebars mongoose body-parser
Administrator@kagolzeng-PC1 MINGW64 /d/Code/FullStack/mongoose
$ npm install -g supervisor
```

　　2)引入express、body-parser和movie.js
```
1 var express = require('express');
2 var bodyParser = require('body-parser');
3 //数据操作对象
4 var Movie = require('./public/server/js/movie');
```
　　其中movie.js是为了方便数据操作，避免重复代码，抽出来的一个模块。

 

　　3)定义express对象app和设置静态文件路径等
```
1 var app = express();
2 app.use(express.static(__dirname + '/public'));//设置静态文件路径
3 app.use(bodyParser());//用来解析req.body参数的
```

　　4)设置模板引擎
```
1 //设置模板引擎，这里用的是handlebars模板
2 var handlebars = require('express3-handlebars').create({
3     defaultLayout: 'main'//默认布局(母版页)，默认从views/layouts/main.handlebars中找文件
4 });
5 app.engine('handlebars', handlebars.engine);
6 app.set('view engine', 'handlebars');
```

　　5)定义路由

```
 1 //定义路由
 2 app.get('/', function(req, res){
 3     Movie.find(function(err, docs){
 4         res.render('home', {//渲染视图，默认从views/home.handlebars中找文件
 5             movies: docs
 6         });//向home页面传入了movies变量
 7     });
 8 });
 9 app.get('/about', function(req, res){
10     res.render('about');
11 });
```
　　

　　6)定义API接口

```
 1 //定义API接口
 2 //新增接口
 3 app.post('/add', function(req, res){
 4     var movie = new Movie({//定义一个模块实例
 5         title: req.body.title,
 6         doctor: req.body.doctor,
 7         year: req.body.year,
 8         country: req.body.country,
 9         language: req.body.language,
10         summary: req.body.summary
11     });
12     movie.save(function(err){
13         if(err){
14             console.log('保存失败');
15         }
16         console.log('保存成功');
17         res.json({ ret: 0, msg: 'succeed' });
18     });
19 });
20 //更新接口
21 app.post('/update', function(req, res){
22     var id = req.body.id;
23     if(id){
24         Movie.update({
25             _id: id
26         }, {
27             $set: {
28                 title: req.body.title,
29                 doctor: req.body.doctor,
30                 year: req.body.year,
31                 country: req.body.country,
32                 language: req.body.language,
33                 summary: req.body.summary
34             }
35         }, function(err){
36             if(err){
37                 console.log(err);
38                 return;
39             }
40             console.log('更新成功');
41             res.json({ ret: 0, msg: 'succeed' });
42         });
43     }
44 });
45 //删除接口
46 app.post('/delete', function(req, res){
47     var id = req.body.id;
48     if(id){
49         Movie.remove({
50             _id: id
51         },function(err){
52             if(err){
53                 console.log(err);
54                 return;
55             }
56             console.log('删除成功');
57             res.json({ ret: 0, msg: 'succeed' });
58         });
59     }
60 });
61 //根据ID获取单条数据的接口
62 app.post('/getMovieById', function(req, res){
63     Movie.findById(req.body.id, function(err, doc){
64         res.json(doc);
65     });
66 });
```
　　

　　7)错误页

```
1 //以下两个中间价是用来展示错误页的
2 app.use(function(req, res, next){
3     res.status(404);
4     res.render('404');
5 });
6 app.use(function(err, req, res, next){
7     res.status(505);
8     res.render('505');
9 });
```
　　

　　8)监听端口

1 //监听3000端口
2 app.listen(3000);
3 console.log('在浏览器中输入localhost:3000访问系统首页');
　　

　　3.movie.js数据操作模块

```
 1 var mongoose = require('mongoose');
 2 mongoose.connect('mongodb://localhost/test');//连接到test数据库
 3 var Schema = mongoose.Schema;
 4 var movieSchema = new Schema({//定义框架
 5     title: String,
 6     doctor: String,
 7     year: Number,
 8     country: String,
 9     language: String,
10     summary: String
11 });
12 var Movie = mongoose.model('Movie', movieSchema);//定义模块
13 module.exports = Movie;//导出模块，使外部可以调用
```
　　这里要注意的是定义模块的第一个参数并不是数据库的名称，这里对应的数据库名称是：movies。

 

　　4.布局(母版页)main.handlebars

```
 1 <!DOCTYPE html>
 2 <html>
 3 <head>
 4     <meta charset="utf-8">
 5     <title>Home</title>
 6     <script src="http://code.jquery.com/jquery.min.js"></script>
 7     <link rel="stylesheet" href="http://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.min.css">
 8 </head>
 9 <body>
10     {{{body}}}
11     <script src="/client/js/index.js"></script>
12 </body>
13 </html>
```
　　

　　5.各个视图文件

　　1)home.handlebars

```
 1 <h1>Welcome to Meadowlark Travel</h1>
 2 <div><a href="javascript:;" id="btn_add" class="btn btn-primary">Add</a></div>
 3 <div><a href="javascript:;" id="btn_update" class="btn btn-primary">Update</a></div>
 4 <div><a href="javascript:;" id="btn_delete" class="btn btn-primary">Delete</a></div>
 5 <table class="table">
 6     <tr>
 7         <th>ID</th>
 8         <th>Title</th>
 9         <th>Doctor</th>
10         <th>Year</th>
11         <th>Country</th>
12         <th>Language</th>
13         <th>Summary</th>
14     </tr>
15     {{#each movies}}
16         <tr>
17             <td>{{_id}}</td>
18             <td>{{title}}</td>
19             <td>{{doctor}}</td>
20             <td>{{year}}</td>
21             <td>{{country}}</td>
22             <td>{{language}}</td>
23             <td>{{summary}}</td>
24         </tr>
25     {{/each}}
26 </table>
```
　　2)about.handlebars
```
<h1>About Meadowlark Travel</h1>
```
　　3)404.handlebars
```
<h1>404 - Not Found</h1>
```
　　4)505.handlebars
```
<h1>505 - Internal Error</h1>
```
　　

　　6.jQuery风格的Ajax请求文件index.js

```
 1 $('#btn_add').on('click', function(){
 2     $.ajax({
 3         url: '/add',
 4         type: 'post',
 5         data: {
 6             title: 'Sudu7',
 7             doctor: 'Jack',
 8             year: '2015',
 9             country: 'America',
10             language: 'English',
11             summary: 'Great'
12         },
13         success: function(data){
14             console.log(JSON.stringify(data));
15         }
16     });
17 });
18 $('#btn_update').on('click', function(){
19     $.ajax({
20         url: '/update',
21         type: 'post',
22         data: {
23             id: '5731af54a2b840a83f2f26d3 ',
24             title: '极盗者',
25             doctor: '罗杰斯',
26             year: '2015',
27             country: 'America',
28             language: 'English',
29             summary: '极限运动'
30         },
31         success: function(data){
32             console.log(JSON.stringify(data));
33         }
34     });
35 });
36 $('#btn_delete').on('click', function(){
37     $.ajax({
38         url: '/delete',
39         type: 'post',
40         data: {
41             id: '5731ad259ad2c8882ecb87c2'
42         },
43         success: function(data){
44             console.log(JSON.stringify(data));
45         }
46     });
47 });
48 $.ajax({
49     url: '/getMovieById',
50     type: 'post',
51     data: {
52         id: '57328a0101c4095818fb1724'
53     },
54     success: function(data){
55         console.log(JSON.stringify(data));
56     }
57 });
```
 
(四)总结
　　至此，就实现了从数据库到后台，再到前端的整个编码过程。


<EditInfo time="2016-05-11 09:42" title="阅读(857)  评论(0)" />
