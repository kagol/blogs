# 使用 Angular 构建单页面应用(SPA)

什么是SPA？

个人理解SPA就是整个应用只有一个页面，所有的交互都在一个页面完成，不需要在页面之间跳转。

单页面的好处是更快的响应速度，更流畅的用户体验，甚至和桌面应用或者原生App一样流畅。

有很多JS框架可以用来构建SPA，Ember.js、vue.js、React、Angular等等，甚至即使你用的是jQuery开发，也有相应的框架可以用来开发SPA，比如：[page.js](https://github.com/visionmedia/page.js)。

本文介绍如何用Angular构建SPA，其他的依葫芦画瓢就是了，原理都差不多。

![](/assets/angular-spa-1.png)

## 1 Demo 效果图

![](/assets/angular-spa-2.png)

## 2 代码结构

这个 Demo 使用 Angular 和 Angular Route 技术实现，相应地引入了 angular 和 angular-route 两个库，先看下代码结构，有个直观的印象：

![](/assets/angular-spa-3.png)

## 3 具体实现

### 3.1 创建不可变的布局 list.html

```html
 1 <!DOCTYPE html>
 2 <html ng-app="demoApp">
 3 <head>
 4     <meta charset="utf-8">
 5     <title>Angular SPA Demo</title>
 6     <link rel="stylesheet" href="../static/css/base.css">
 7     <link rel="stylesheet" href="../static/css/index.css">
 8 </head>
 9 <body>
10     <header class="header" ng-controller="LogoutCtrl">
11         <div class="left">Logo</div>
12         <div class="right">Hi,kagol</div>
13     </header>
14     <section class="content" ng-controller="demoListCtrl">
15         <aside class="wrap_nav">
16             <ul class="nav">
17                 <li>
18                     <div class="title relative"><i class="icon_fl"></i><span class="span_fl">Demo List</span></div>
19                     <ul>
20                         <li><a href="#/demo/list/unassign">Uncompleted</a></li>
21                         <li><a href="#/demo/completed/processed">Completed</a></li>
22                         <li><a href="#/demo/followup">Follow Up</a></li>
23                     </ul>
24                 </li>
25                 <li>
26                     <div class="title relative"><i class="icon_set"></i><span class="span_set">Setting</span></div>
27                     <ul>
28                         <li><a href="#/account">Account Info</a></li>
29                     </ul>
30                 </li>
31             </ul>
32         </aside>
33         <section class="main" ng-style="mainStyle">
34             <div class="inner_content" ng-view></div>
35         </section>
36     </section>
37     <footer class="footer">
38         <div class="copyright">Copyright © 1998-2016 Tencent. All Rights Reserved</div>
39     </footer>
40     <script src="../static/js/angular-1.4.8.min.js"></script>
41     <script src="../static/js/angular-route.min.js"></script>
42     <script src="../static/js/demo/demo_list/demoControllers.js"></script>
43     <script src="../static/js/demo/demo_list/app.js"></script>
44 </body>
45 </html>
```

ng-view 里面的内容是视图的内容，是可变的，其余部分是布局，不可变，这里需要注意的是一个页面只能有一个 ng-view。

### 3.2 创建可变的视图

```html
 1 <!-- Uncompleted - To be Assigned -->
 2 <script type="text/ng-template" id="list_unassign.html">
 3     <div>To be Assigned</div>
 4 </script>
 5 
 6 <script type="text/ng-template" id="followup.html">
 7     <div>Follow Up</div>
 8 </script>
 9 
10 <!-- 收藏 -->
11 
12 
13 <script type="text/ng-template" id="completed_processed.html">
14     <div>Completed</div>
15 </script>
16 
17 <!-- Completed demo List -->
18 
19 
20 <script type="text/ng-template" id="account.html">
21     <div>Account</div>
22 </script>
23 
24 <!-- 帐号管理（修改密码） -->
```
ng-template 指令表示这是一个ng模板，id是该模板的标识，写路由规则的时候会用到。模板里可以任意发挥，编写自己需要的html内容。

### 3.3 引入视图

将视图代码放在包含 ng-view 指令的标签前面即可。

### 3.4 创建路由规则 app.js

```js
 1 var demoApp = angular.module('demoApp', [
 2     'ngRoute',
 3     'demoControllers'
 4 ]);
 5 
 6 demoApp.config(function($routeProvider) {
 7     $routeProvider.when('/', {
 8           templateUrl: 'list_unassign.html',
 9           controller: 'demoListUnassignCtrl'
10       }).when('/demo/list/unassign', {
11           templateUrl: 'list_unassign.html',
12           controller: 'demoListUnassignCtrl'
13       }).when('/demo/completed/processed', {
14           templateUrl: 'completed_processed.html',
15           controller: 'CompletedProcessedCtrl'
16       }).when('/demo/followup', {
17           templateUrl: 'followup.html',
18           controller: 'FollowupCtrl'
19       }).when('/account', {
20           templateUrl: 'account.html',
21           controller: 'AccountCtrl'
22       }).otherwise({
23           redirectTo: '/'
24       });
25 });
```

要使用 Angular 的路由服务，需要先引入 ngRoute 模块，然后使用 $routeProvider 服务配置路由。

### 3.5 创建 Angular 控制器 demoControllers.js

```js
 1 var demoControllers = angular.module('demoControllers', []);
 2 
 3 // Logout
 4 demoControllers.controller('LogoutCtrl', function($scope){
 5     console.log('this is logout');
 6 });
 7 
 8 // Account Info
 9 demoControllers.controller('AccountCtrl', function($scope, $routeParams){
10     console.log('this is account');
11 });
12 
13 // Follow Up
14 demoControllers.controller('FollowupCtrl', function($scope, $http, $routeParams){
15     console.log('this is followup');
16 });
17 
18 // Completed - My Processed
19 demoControllers.controller('CompletedProcessedCtrl', function($scope, $http, $routeParams){
20     console.log('this is completed');
21 });
22 
23 // Uncompleted - To be Assigned
24 demoControllers.controller('demoListUnassignCtrl', function($scope, $http){
25     console.log('this is uncompleted');
26 });
27 
28 demoControllers.controller('demoListCtrl', function($scope, $http){
29     console.log('this is demolist');
30 });
```

控制器里可以任意发挥，编写自己需要的代码。

## 4 进一步思考

这个 Demo 里左侧导航点击之后并没有高亮，大家可以想想怎么实现。

<EditInfo time="2016-03-31 22:49" title="阅读(1146)  评论(2)" />
