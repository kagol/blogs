# Webpack 入门：使用 Webpack 打包 Angular 项目的一个例子

2016.1.22，对大多数人来说，这是一个非常平常的日子，但这却是我决定在博客园写博客的日子。虽然注册博客园的博客已有4年8个月，却一直没有动手写过一篇博客，原因是觉得自己水平不行，写不出好东西，所以干脆就不写。现在我觉得这样想是不对的，每个人都有一个成长的过程，从学徒到能独立完成任务，再到师傅，再到专家。我想记录这个过程，并且通过写博客养成总结的好习惯，构建自己的知识体系，同时锻炼自己的写作能力。

真正接触编程是在大一下学期(2010年初)学的C语言，而接触前端则是在大一结束后的暑假(2010年中旬)，也是在那个时候我进了学院的腾杰工作室，我编程的启蒙也是从这里开始的，当时的前端和美工是不分的，而我那时对前端的理解就是给网页写一些CSS样式，用JS写一些特效，仅此而已。当时我们是用.NET平台开发一些政府网站(如项目申报评审系统)和学校网站(人事系统)，所以对面向对象的编程思想接触的比较多，现在想来这对我之后的编程生涯还是很有帮助的。

后来工作了，放弃了.NET的开发，转向前端，最开始接触的JS库是jQuery(2006由John Resig发布)，选择jQuery是因为这是当时最流行的JS库，很多企业也要求要会使用jQuery进行开发，这段时间接触了很多jQuery的思想，jQuery主要的特点就是丰富的DOM选择器、事件操作、动画、Ajax支持、链式调用、可扩展性等，接触了很多jQuery的库，同时也加深了对原生JS的理解。jQuery对于中小型的项目确实可以做到快速开发，不过项目一大的话维护起来会比较麻烦。后来决定用Angular(2009年由Misko Hevery等人创建)，从做出基本的Demo开始，慢慢地边学边用，基本上能用上Angular开发简单的CRUD应用，不过还不能完全脱离jQuery，也没有去系统地学习Angular，后来买了一本《精通AngularJS》，打算系统地学习Angular，慢慢地了解了Angular的核心特性有：MVVM、模块化、双向数据绑定、依赖注入、指令等，并开始脱离jQuery，完全用Angular开发项目。学习Angular期间还学习了一段时间的HTML5 Canvas和Node.js(2009年由Ryan Dahl发布)，最近又在折腾Webpack前端模块加载工具，打算把这把前端利器应用到目前的项目中。所以人生中的第一篇博客就以Webpack为主题吧，闲言少述，进入正题。

---------------------------------- 华丽的分割线 -----------------------------------

## 1 什么是 Webpack

Webpack是一个前端的模块管理工具(module bundler)，以下是webpack的官网：http://webpack.github.io/，一进入官网可以看到下面这张大图：

![image](https://user-images.githubusercontent.com/9566362/227753884-97560995-e1a9-48b8-9f25-4fe89785ac24.png)


这张图基本上解释了webpack是用来干嘛的，将一些相互依赖的模块(文件)，打包成一个或多个js文件，减少http请求次数，提升性能。这些相互依赖的模块可以是图片、字体、coffee文件、样式文件、less文件等。

具体怎么用呢？接下来我将用一个例子来说明：

## 2 一个 Webpack + Angular 的例子

1.先看下目录结构

![image](https://user-images.githubusercontent.com/9566362/227753875-70a8bd2c-3833-42e3-8910-2f4fc25a0ac7.png)


2.安装Webpack及其他组件

安装Webpack之前建议先安装Node.js，然后采用npm的方式来安装Webpack：
```
npm install webpack -g
```
因为要用到angular，所以要安装angular：
```
npm install angular
```
还要安装一系列加载器(loader)：
```
npm install style-loader css-loader url-loader sass-loader raw-loader
```
注意：除了webpack是全局安装之外，其他组件都是安装在app文件夹下面，会自动生成node_modules文件夹。

3.配置文件webpack.config.js
```
 1 module.exports = {
 2   context: __dirname + '/app',//上下文
 3   entry: './index.js',//入口文件
 4   output: {//输出文件
 5     path: __dirname + '/app',
 6     filename: './bundle.js'
 7   },
 8   module: {
 9     loaders: [//加载器
10       {test: /\.html$/, loader: 'raw-loader'},
11       {test: /\.css$/, loader: 'style-loader!css-loader'},
12       {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
13       {test: /\.(png|jpg|ttf)$/, loader: 'url-loader?limit=8192'}
14     ]
15   }
16 };
```
 

4.入口文件index.js

```
1 var angular = require('angular');//引入angular
2 var ngModule = angular.module('app',[]);//定义一个angular模块
3 require('./directives/hello-world/hello-world.js')(ngModule);//引入指令(directive)文件
4 require('./css/style.css');//引入样式文件
```

require用于引入外部模块(可以是对象，可以是函数，可以是css样式，可以是html页面等)

5.主页面index.html
```
 1 <!DOCTYPE html>
 2 <html ng-app="app">
 3 <head lang="en">
 4   <meta charset="UTF-8">
 5   <title>Angular with Webpack</title>
 6 </head>
 7 <body>
 8   <h1>Angular + Webpack</h1>
 9   <hello-world></hello-world>
10   <script src="bundle.js"></script>
11 </body>
12 </html>
```
 

可以看到主页面是非常干净清爽的，只引入了一个输出文件bundle.js，然后html标签里加了ng-app="app"。

6.指令文件hello-world.js
```
 1 module.exports = function(ngModule) {
 2   ngModule.directive('helloWorld', helloWorldFn);//定义指令，对应页面中的<hello-world></hello-world>
 3   require('./hello-world.scss');
 4   function helloWorldFn() {
 5     return {
 6       restrict: 'E',//元素(element)
 7       scope: {},
 8       template: require('./hello-world.html'),//模板
 9       //templateUrl: 'directives/hello-world/hello-world.html',
10       controllerAs: 'vm',// <=> $scope.vm = {greeting: '你好，我是卡哥'}
11       controller: function () {
12         var vm = this;
13         vm.greeting = '你好，我是卡哥，很高兴见到你';
14       }
15     }
16   }
17 }
```
 

module.exports用于将模块(文件)作为一个接口(一般是一个函数)暴露给外部。

7.其他文件(style.css、hello-world.html、hello-world.scss)
```
 1 @font-face{
 2     font-family: 'maozedong';
 3     src: url(../fonts/maozedong.ttf);
 4 }
 5 body{
 6     background: url(../images/longmao.jpg) yellowgreen;
 7     font-size: 24pt;
 8     color: #fff;
 9     font-family: 'maozedong';
10 }
```
 
```
1 <div class="hello-world">
2   {{vm.greeting}}
3 </div>
```
```
1 .hello-world {
2   color: red;
3   border: 1px solid green;
4 }
```

8.编译和运行
在命令行工具中输入：webpack，即可编译，这时我们会遇到第一个坑：

![image](https://user-images.githubusercontent.com/9566362/227753856-85e32497-4daf-4bba-8177-774f881ec0f6.png)


这个错误的关键行在"You may need an appropriate loader to handle the file type"，大概意思就是你的加载器(loader)不正确，可是我们明明安装上了所有的加载器啊，也在配置文件中引用了呀，我在网上找了很久都没找到问题所在，后来还是一位细心的同事帮我解决这个问题的，原来问题出在配置文件中的"module"下的"loader"应该是"loaders"，就因为少了一个"s"，浪费我一上午的时间。

修改过来之后，编译通过了，我们在浏览器中打开主页面index.html，这时遇到了第二个坑：

![image](https://user-images.githubusercontent.com/9566362/227753846-e553a501-9d8d-41dd-bc13-b5521bf2ac9e.png)


大概意思是你跨域了，不能加载hello-world.html这个文件，问题出在指令文件hello-world.js中的引用模板地址的代码：
```
templateUrl: 'directives/hello-world/hello-world.html'
```
在网上搜到一个解决办法，就是使用Node.js自带的的http-server，以下是server.js的代码：
```
1 var port = 8000,
2     express = require('express'),
3     app = express();
4 app.use('/', express.static(__dirname));
5 app.listen(port);
6 console.log('Now serving http://localhost:' + port + '/index.html');
```

使用之前要先安装express：npm install express，然后在命令行工具中输入node server.js开启服务，这时在浏览器中输入：localhost:8000/index.html即可访问主页面。

另外一个方法是用require的方式引入hello-world.html：

template: require('./hello-world.html')

## 3 补充

(1)编译的命令"webpack"后面可以加参数，如：

"webpack -p"表示对打包后的文件进行压缩

"webpack -w"表示实时进行打包更新

"webpack -d"表示提供source map，方便调试

(2)webpack-dev-server可以提供实时监视文件变化的功能，使用之前先安装webpack-dev-server：
```
npm install webpack-dev-server -g
```
然后在命令行中输入：webpack-dev-server --progress --colors，显示以下结果：

![image](https://user-images.githubusercontent.com/9566362/227753838-19a238d7-68fa-4a9f-bdba-f69313e8a689.png)

这时在浏览器中输入：localhost:8080(localhost:8080/webpack-dev-server)，你对静态资源的任何改动都会直接反映到主页面中。

---------------------------------- 华丽的分割线 -----------------------------------

总结：这是一个Webpack+Angular的典型例子，包含了最基本的打包js文件、css文件、scss文件、图片、字体的方法。通过这几天对Webpack的学习，发现有关Webpack的资料确实是非常少的，百度百科和维基百科上甚至都没有这个词条。希望这篇文章可以帮助大家入门。

---------------------------------- 2016.11.29 更新 -----------------------------------

有不少朋友表示照着教程来会报错，原因都不太一样，所以附上[示例源码](https://github.com/kagol/angular-webpack)，大家看源码就知道哪里出问题了，有不懂的地方欢迎讨论。

---------------------------------- 2017.5.18 更新 -----------------------------------

有朋友反映 webpack 的模块加载器不加后缀 "-loader" 会报错，原因是webpack官方已经把自动加"-loader"的机制去掉，为什么移除这一特性官方有做[解释](https://github.com/webpack/webpack/issues/2986)，所以更新了下 webpack.config.js 文件：

```
module: {
    loaders: [//加载器
        {test: /\.html$/, loader: 'raw-loader'},
        {test: /\.css$/, loader: 'style-loader!css-loader'},
        {test: /\.scss$/, loader: 'style-loader!css-loader!sass-loader'},
        {test: /\.(png|jpg|ttf)$/, loader: 'url-loader?limit=8192'}
    ]
}
```

报错截图：

![image](https://user-images.githubusercontent.com/9566362/227753824-d4b6beeb-9790-4b96-96b5-36860d311cf1.png)

还有一个常见的问题，就是 node-sass 模块的安装问题，直接 npm install -g node-sass 的方式安装在windows下会失败(貌似是网络问题，要FQ)，需要用淘宝的npm镜像。

<EditInfo time="2016-01-23 15:42" title="阅读(23620) 评论(33) 推荐(12)" />
