# 2016腾讯"创益24小时"互联网公益创新大赛总结


上周末参加了腾讯的"创益24小时"互联网公益大赛，和两个小伙伴(设计师Beryl和产品经理Benny)浴血奋战两天一夜，完成了一个叫"彩虹桥"的公益项目。

 

(一)项目背景和设计目的

　　设计该项目的目的是为了让父母更好地了解年轻人，从而促进父母与子女之间的沟通。随着孩子慢慢地长大，离开父母去外地读书、工作，与父母的距离越来越远，沟通越来越少，每次与父母通电话，他们总是有问不完的问题：”你每天都在做什么工作啊？”，”你周末都怎么度过啊？”于是我们就想要建立起父母与年轻人之间沟通的桥梁，让父母更多地了解、认识年轻人的工作、生活、思想。

 

(二)项目基本流程

　　我们借助微信的平台，以服务号的形式构建该项目。之所以采用服务号和聊天的形式，是保证跟微信聊天类似的体验；初次提问会有指引和示范；这都是为了把父母的使用门槛降到最低。系统分两种角色：父母和子女。

 

1.父母端

　　父母进入系统，看到的是一个提问的界面：

 
![image](https://user-images.githubusercontent.com/9566362/227754109-09857c8c-fa88-423d-ae76-38da5e29bfd5.png)


　　在这里，父母能够提出任何关于子女他们想要了解的东西，每一个问题都会随机发送给子女们答复，虽然不是他自己的子女，但也许从事一样的职业，有着一样的文化，过着类似的生活，因此足够提供他们需要的帮助。

 

2.子女端

　　子女进入系统，会收到一条来自父母的问题，并进行回答，不好回答可以点击”换一个”：

 
![image](https://user-images.githubusercontent.com/9566362/227754114-093b187a-c3f4-4012-abd9-850773df85e8.png)


　　在这里，我们子女们能够告诉父辈他们想了解的东西，当我们开始使用的时候，能随机收到任何来自父母的疑问，虽然不是我们自己的父母，但他们跟我们的父母一样，希望跟我们了解更多，话题更多。

　　子女回答了父母的问题之后，父母可以表示感谢。

![image](https://user-images.githubusercontent.com/9566362/227754116-09470da8-961b-4edf-80fa-af023800af05.png)


　　而子女可以点击头像进入”个人中心”查看自己获得的感谢数，这些记录，都会成为我们的公益数据。在主页里，同时也可以查看朋友的公益数据，大家一起做公益。后续也可以跟关爱老人基金会之类的机构合作，捐出感谢就可以让父母得到更多生活上的帮助，这里我们参考了微信运动。

![image](https://user-images.githubusercontent.com/9566362/227754123-e4f9afc7-6b5b-44a5-9270-4e5eaf4b7e0f.png)


　　公益不单单是我们去到灾区，捐钱捐款，公益也可以是我们在碎片化的时间，解答关于父母的一点一滴的疑惑。

　　我们做这个项目的愿景，是希望提供父母了解子女的一座桥梁，了解更多，就可以话题越多，理解也就更多：老吾老，以及人之老！

 

(三)项目实现

1.项目结构

 
![image](https://user-images.githubusercontent.com/9566362/227754129-001a74f0-901a-4822-a46e-c040ce3477c4.png)

 

2.安装Node.js和Express

　　到[Node.js官网](https://nodejs.org/en/)下载最新版Node.js(v4.4.3 LTS)，或者直接[点击这里](https://nodejs.org/dist/v4.4.3/node-v4.4.3-x64.msi)进行下载，下载下来是一个msi文件(node-v4.4.3-x64.msi)，双击该文件即可安装Node.js，傻瓜式安装，不必赘述。安装完之后在windows命令行窗口输入：node -v，若出现node.js的版本号：v4.4.3，则说明node.js安装成功。

　　Express的安装要用到Node.js的npm包管理工具，具体安装步骤如下：

打开windows命令行工具(Win+R，输入cmd，按确定按钮)；
切换到server.js文件所在目录(先切换盘符，我的在F盘，所以输入F:，按Enter键，然后切换目录：cd Code/Bridge)；
安装Express(输入命令：npm install express)；
　　安装完成之后F:/Code/Bridge目录会多一个node_modules文件夹，里面就是express模块。

 

3.Node.js路由机制

　　为了能在手机上浏览，我利用Node.js和express搭建了一个Web服务器，并引入了Node.js的路由机制，以下是server.js文件：

```
 1 var express = require('express');
 2 var fs = require('fs');
 3 var app = express();
 4 app.use(express.static(__dirname + '/static'));//设置静态文件的路径
 5 app.get('/', function(request, response){
 6     fs.readFile('./views/index.html', 'utf-8' , function(err, data){
 7         if(err) response.send(err);
 8         response.send(data);
 9     });
10 });
11 app.get('/parents', function(request, response){
12     fs.readFile('./views/parents/index.html', 'utf-8' , function(err, data){
13         if(err) response.send(err);
14         response.send(data);
15     });
16 });
17 app.get('/children', function(request, response){
18     fs.readFile('./views/children/index.html', 'utf-8' , function(err, data){
19         if(err) response.send(err);
20         response.send(data);
21     });
22 });
23 app.get('/center', function(request, response){
24     fs.readFile('./views/children/personal_center.html', 'utf-8' , function(err, data){
25         if(err) response.send(err);
26         response.send(data);
27     });
28 });
29 app.listen(8000);//设置访问的端口号
```
　　要访问系统页面，需要运行server.js文件，在命令行窗口切换到F:/Code/Bridge路径，输入：node server.js，即可启动Web服务器，此时可在浏览器地址栏输入：`http://localhost:8000/` or `http://127.0.0.1:8000/`，即可访问系统首页。若要在其他机器上或手机端访问，则需输入127域名对应的IPv4地址，在命令行窗口输入：ipconfig，即可获得IPv4地址，如下所示：

![image](https://user-images.githubusercontent.com/9566362/227754143-7dd7e971-0bec-44fc-81fc-7b46679d0fca.png)


　　这时可在手机浏览器或者在微信里输入：`192.168.1.101:8000`，访问系统首页。

 

4.首页index.html

```
 1 <!DOCTYPE html>
 2 <html>
 3 <head>
 4     <title>彩虹桥</title>
 5     <meta charset="utf-8">
 6     <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=0, minimum-scale=1.0, maximum-scale=1.0">
 7     <script src="https://code.jquery.com/jquery-2.2.3.min.js"></script>
 8     <script src="/js/index.js"></script>
 9     <link rel="stylesheet" href="/css/index.css">
10 </head>
11 <body>
12     <header class="header"></header>
13     <section class="wrap">
14         <div class="sample"></div>
15         <ul class="dialogList">
16         </ul>
17     </section>
18     <div class="bar">
19         <span class="switch"></span>
20         <span class="touchArea"></span>
21     </div>
22     <footer class="footer"></footer>
23 </body>
24 </html>
```
　　需要注意的是静态资源的引用。

 

(四)总结

　　通过这次比赛，最大的收获是了解了一个创业项目从无到有的整个过程：从头脑风暴讨论创意，确定主题和项目的宗旨，到构想创意，再到设计方案和需求点，接着是设计师设计交互稿和视觉稿，开发人员进行项目Demo的开发，再到精细的开发和测试，最后项目上线。当然中间会经历多次需求完善和功能迭代。另外，通过这次比赛，对公益有了更多的思考，了解了别人是怎么做公益的。做公益有时可以很简单，可以是身边的事，也可以很有趣，公益不在于少数人做很多事情，而在于很多人贡献一点点力量。


<EditInfo time="2016-04-26 12:16" title="阅读(917)  评论(0)" />
