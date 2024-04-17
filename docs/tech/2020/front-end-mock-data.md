# 前端有了这两样神器，再也不用追着后台要接口啦

![image](https://user-images.githubusercontent.com/9566362/201150454-a97cc0cb-f685-4eaf-a9bc-a2363d3a0ac4.png)

## 前言

之前发过一篇沸点，聊到前端为了提升业务交付效率，有必要去除对上游的依赖，这次想给大家分享下我自己在去后台依赖方面的一些实践，欢迎大家一起讨论！

![image](https://user-images.githubusercontent.com/9566362/201150853-3aa5f9a9-c081-41d1-a587-eedfbf0b1339.png)


沸点传送门：[juejin.im/pin/6862313…](https://juejin.im/pin/6862313304141135885)

前端依赖后台什么？

在整个研发链路上，后台的定位是给前端提供高效、稳定的API接口，前端通过这些API去获取需要的数据，并展示给用户。

所以要去除对后台的依赖，前端就需要自己模拟这些接口，并构造相应的测试数据。

## 怎么模拟后台接口？

为了在前端模拟后台接口，我给大家介绍第一件神器：[JSON Server](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Ftypicode%2Fjson-server)。

以下是JSON Server官方对自己的定位：

Get a full fake REST API with zero coding in less than 30 seconds (seriously)
无需写代码，在30秒内获得完整的REST API。

以我现在负责的[DevCloud](https://link.juejin.cn/?target=https%3A%2F%2Fwww.huaweicloud.com%2Fdevcloud%2F)业务——[XBoard看板](https://link.juejin.cn/?target=https%3A%2F%2Fsupport.huaweicloud.com%2Fusermanual-projectman%2Fdevcloud_hlp_00021.html)项目——举栗子，有一个接口是获取某个看板下面的所有卡片信息（只保留关键字段），接口基本协议如下（接口协议提前跟后台协商好）：

```
GET /v1/[projectid]/[boardid]/cards

{
  "error": null,
  "status": "success",
  "result": [
    {
      "column_id": "7c489b6746fe4329aa8c869f4c13fab5",
  "card_list": [
        {
          "id": "4634045604195569664", // 卡片ID
          "subject": "任务已ready,准备启动开发的任务", // 卡片主题
          "sequence": "11203427", // 卡片序列号
          "index": "12", // 序号（用于拖动排序）
          "archived": false, // 是否已归档
          "blocked": false, // 是否设置阻塞
          "is_parent": false, // 是否父卡片
          "createdOn": "1598238210463", // 创建时间
          "updatedOn": "1598238210463", // 最近更新时间
          "parent": { // 父卡片
            "subject": "设计完成,正在进行开发的需求",
            "id": "4634045604190851072"
          },
          "board": { // 卡片所在的看板
            "id": "1661625c5f72471a81979482ab148066",
            "name": "开发"
          },
          "column": { // 状态列
            "id": "7c489b6746fe4329aa8c869f4c13fab5",
            "name": "就绪",
            "type": "READY",
            "deleted": false
          },
          "card_type": { // 卡片类型
            "color": "#6CBFFF",
            "name": "任务",
            "icon": "icon-op-task",
            "id": "2"
          },
          "author": { // 卡片作者
            "name": "kagolzeng",
            "id": "05329882ba000f711ffec00c21191097",
            "nick_name": "kagol",
            "gender": "male"
          },
          "updater": { // 最近更新者
            "name": "kagolzeng",
            "id": "05329882ba000f711ffec00c21191097",
            "nick_name": "kagol",
            "gender": "male"
          }
        }, 
        ... // 其他卡片
      ]
    }, 
    ... // 其他状态列
  ]
}
```

这个接口怎么用JSON Server模拟呢？

只需要以下4步（假设已经有项目工程，比如：[NG CLI](https://link.juejin.cn/?target=https%3A%2F%2Fcli.angular.io%2F)工程）：

1. 第1步：安装JSON Server
2. 第2步：配置测试数据
3. 第3步：编写启动脚本命令
4. 第4步：启动Mock服务

我们一步一步来搭建一个Mock服务：

第1步：安装JSON Server

在项目根目录下执行以下命令：
```
npm i -D json-server
```

第2步：配置测试数据

在项目根目录下新建db.json文件，加上之前已经跟后台定好的接口数据（为避免重复，已省略部分字段）：

```
{
  "result": [
    {
      "column_id": "7c489b6746fe4329aa8c869f4c13fab5",
  "card_list": [
        {
          "id": "4634045604195569664", // 卡片ID
          "subject": "任务已ready,准备启动开发的任务", // 卡片主题
          "board": { // 卡片所在的看板
            "id": "1661625c5f72471a81979482ab148066",
            "name": "开发"
          },
          "column": { // 状态列
            "id": "7c489b6746fe4329aa8c869f4c13fab5",
            "name": "就绪",
            "type": "READY",
            "deleted": false
          },
          "card_type": { // 卡片类型
            "color": "#6CBFFF",
            "name": "任务",
            "icon": "icon-op-task",
            "id": "2"
          }
        }
      ]
    }
  ]
}
```

第3步：编写启动脚本命令

只需要在package.json的scripts中编写Mock服务的启动脚本即可：
```
"mock": "node_modules/.bin/json-server --watch db.json --port 9090"
```
第4步：启动Mock服务

```
npm run mock
```

启动之后控制台显示：
![image](https://user-images.githubusercontent.com/9566362/201150960-285e0d32-305e-41b3-977d-eba77896cd8c.png)

在浏览器地址栏输入：[http://localhost:9090/cards](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9090%2Fcards)，即可查看该接口的返回数据
![image](https://user-images.githubusercontent.com/9566362/201150990-8fbe5b3c-7de8-4752-8988-eefa618f53f7.png)

## 如何构造测试数据？

大家发现以上模拟后台接口的方式有什么问题了没？

测试数据的构造太麻烦！

如果每个接口的返回数据都需要一个一个去构造，至少会有两个问题：

- 一是每条记录都自己手写，太累，数据也太死；
- 二是想要模拟大量的数据很难，且会导致项目源文件体积变大。

为了解决以上问题，我要给大家介绍第二件神器：[Mock.js](https://link.juejin.cn/?target=http%3A%2F%2Fmockjs.com%2F)。
Mock.js对自己的定位是：

> 生成随机数据，拦截 Ajax 请求

Mock.js可以生成几乎任何你能想到的数据类型，比如数字、字符、布尔值、日期、颜色、图片、地址、URL、名字、标题、段落等，甚至还支持正则表达式。

将Mock.js集成进来也只需要简单的3个步骤：

1. 第1步：修改JSON Server配置
2. 第2步：修改脚本命令
3. 第3步：重启Mock服务

第1步：修改JSON Server配置

为了集成Mock.js，我们需要将之前的db.json改成db.js，并增加routes.json文件，可以将这两个文件放到根目录下的mock文件夹下。

```
mock/db.js

var Mock = require('mockjs');

const CARDS = Mock.mock({
  "error": null,
  "status": "success",
  "result|10": [{ // 生成10个状态列
    "column_id": "@guid",
    "card_list|20": [{ // 状态列下有20张卡片
      "id": "@guid", // 卡片ID
      "subject": '@title', // 卡片主题
      "sequence": /\d{8}/, // 卡片序列号
      "index": "@integer(1, 100)", // 序号（用于拖动排序）
      "archived": "@boolean", // 是否已归档
      "blocked": "@boolean", // 是否设置阻塞
      "is_parent": "@boolean", // 是否父卡片
      "createdOn": "@date", // 创建时间
      "updatedOn": "@date", // 最近更新时间
      "parent": { // 父卡片
        "id": "@guid",
        "name": "@cword(2,10)"
      },
      "board": { // 卡片所在的看板
        "id": "@guid",
        "name": "@cword(2,10)"
      },
      "column": { // 状态列
        "id": "@guid",
        "name": "@cword(2,10)",
        "type": "@string('upper', 2, 20)",
        "deleted": "@boolean"
      },
      "card_type": { // 卡片类型
        "color": "@color",
        "name": "@cword(2,10)",
        "icon": /icon-[a-z]-{1-3}/,
        "id": "@integer(1, 100)"
      },
      "author": { // 卡片作者
        "name": "@name",
        "id": "@guid",
        "nick_name": "@name",
        "gender": "@string('lower', 4)"
      },
      "updater": { // 最近更新者
        "name": "@name",
        "id": "@guid",
        "nick_name": "@name",
        "gender": "@string('lower', 4)"
      }
    }]
  }]
});

const API = () => ({
  'cards': CARDS,
});

module.exports = API;

mock/routes.json

{
  "/cards": "/cards"
}
```

第2步：修改脚本命令

脚本命令也需要做相应的修改

```
"mock": "node_modules/.bin/json-server --watch mock/db.js --routes mock/routes.json --port 9090"
```

第3步：重启Mock服务

这时我们重新使用：
```
npm run mock
```
命令启动Mock服务，在浏览器中输入
[http://localhost:9090/cards](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9090%2Fcards)
访问/cards接口：
![image](https://user-images.githubusercontent.com/9566362/201151077-e283a291-b9ed-46f8-b689-bef8526c905e.png)

可以看到Mock.js为我们生成了非常多随机测试数据，之前构造这些数据可是要费很大的工夫。
并且为了构造这大量的测试数据，我们只是在db.js中增加了不到50行代码，不用在担心源文件体积太大的问题。
![image](https://user-images.githubusercontent.com/9566362/201151108-c54c6262-4c54-46bc-a381-0682937b3b18.png)

是不是非常便捷？

让我们一起来试试业务中如何使用这些Mock接口，以及如何无缝切换成真实的后台接口吧。

一起来试试看吧

假设我们已经用NG CLI创建了一个项目，为了调用Mock接口，我们需要引入Angular的HttpClientModule模块：

```
src/app/app.module.ts

import { HttpClientModule } from '@angular/common/http';

imports: [
  ...,
  HttpClientModule
]
```
直接调用Mock服务接口
然后注入Angular的HttpClient服务，就可以向Mock服务的/cards接口发起请求：
```
src/app/app.component.ts

import { HttpClient } from '@angular/common/http';

constructor(
  private http: HttpClient
) {}

ngOnInit() {
  this.http.get('http://localhost:9090/cards').subscribe(cards => {
    console.log('cards:', cards);
  });
}
```
获取到的接口数据如下：
![image](https://user-images.githubusercontent.com/9566362/201151149-651eada6-55f7-4d61-9e3f-6020a2198ee3.png)

使用代理无缝切换后台接口

聪明的你肯定发现直接调用Mock服务的接口有问题：部署到测试环境或者现网怎么办？

因为环境上调用的肯定是相应环境的后台接口，而不是Mock服务的接口，所以在本地开发时将接口代理到Mock服务，实际调用接口时不加具体的域名信息。

实际调用接口应该是以下的方式：

```
this.http.get('/v1/cards').subscribe(cards => {
  console.log('cards:', cards);
});
```

为了做到无缝切换后台接口，即：无需修改任何代码，本地调用Mock服务接口，线上调用后台接口。

我们需要在本地开发时将接口代理到Mock服务，可以使用NG CLI提供代理配置proxyConfig：

```
angular.json

"serve": {
  "builder": "@angular-devkit/build-angular:dev-server",
  "options": {
    "browserTarget": "ng-demo:build",
    "port": 4600,
    "proxyConfig": "proxy.config.js" // 新增代理配置
  },
  ...
}
```

代理配置文件：
```
proxy.config.js

const PROXY_CONFIG = {
  '/v1': {
    target: 'http://localhost:9090/v1'
  }
};

module.exports = PROXY_CONFIG;
```
我们的Mock服务不需要做任何改变。
其他框架配置代理
如果你使用的不是NG CLI，要怎么配置代理呢？
Vue CLI配置代理

```
vue.config.js

devServer: {
  proxy: {
    '/v1': {
      target: 'http://localhost:9090/v1'
    }
  }
}
```

Webpack配置代理
Webpack的写法和Vue CLI的差不多

```
webpack.config.js

devServer: {
  proxy: {
    '/v1': {
      target: 'http://localhost:9090/v1'
    }
  }
}
```

CreateReactApp配置代理

React稍微麻烦一点儿，需要安装http-proxy-middleware中间件。
```
const proxy = require("http-proxy-middleware");

module.exports = function(app) {
  app.use(
    proxy("/api/", {
      target: "http://localhost:9090/v1"
    })
  );
};
```

增加TS类型

如果你的项目使用TypeScript的话，一般都会给接口数据增加TS类型，我给大家介绍一个根据接口自动生成TS类型文件的神器：[quicktype](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fquicktype%2Fquicktype)。

quicktype的定位是：

```
Generate types and converters from JSON, Schema, and GraphQL.
从JSON、Schema和GraphQL生成类型和转换器。
```

刚才我们已经启动了我们的Mock服务，在浏览器地址栏输入[http://localhost:9090/cards](https://link.juejin.cn/?target=http%3A%2F%2Flocalhost%3A9090%2Fcards)，也可以查看/cards接口的返回数据，这时我们可以使用quicktype工具根，据接口地址生成相应的TS类型文件。
只需要2步即可：

- 第1步：安装quicktype
- 第2步：生成TS类型文件

第1步：安装quicktype
```
npm i -g quicktype
```
第2步：生成TS类型文件
```
quicktype http://localhost:9090/cards -o ./src/app/shared/types/card.interface.ts --runtime-typecheck
```
使用TS类型
```
import { CardInterface } from './shared/types/card.interface';

this.http.get('/v1/cards').subscribe((cards: CardInterface) => {
  console.log('cards:', cards);
});
```
使用TS类型有两个显而易见的好处：

- 一是类型校验和自动提示；
- 二是数据文档化和字段自动提醒和补齐。

类型校验和自动提示：
![image](https://user-images.githubusercontent.com/9566362/201151284-bee0d59b-3232-440f-96d7-5190102e6345.png)

数据文档化和字段自动提醒和补齐：
![image](https://user-images.githubusercontent.com/9566362/201151304-acc7306c-4875-44f5-9055-5f5f8e2bef1c.png)

## 小结

本文主要介绍如何通过 JSON Server 和 Mock.js 两大神器，在前端搭建Mock服务，模拟后台接口，从而在开发阶段去除对后台的依赖，提升业务交付的效率。

欢迎大家评论交流！

源码地址：[https://github.com/kagol/ng-mock-server](https://github.com/kagol/ng-mock-server)

<EditInfo time="2020年09月12日 12:31" title="阅读 1154 ·  点赞 17 ·  评论 3 ·  收藏 10" />
