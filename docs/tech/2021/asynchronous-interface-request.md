# 如何解决异步接口请求快慢不均导致的数据错误问题？

## 引言

搜索功能，我想很多业务都会涉及，这个功能的特点是：
- 用户可以在输入框中输入一个关键字，然后在一个列表中显示该关键字对应的数据；
- 输入框是可以随时修改/删除全部或部分关键字的；
- 如果是实时搜索🔍（即输入完关键字马上出结果，不需要额外的操作或过多的等待），接口调用将会非常频繁。

实时搜索都会面临一个通用的问题，就是：
> 浏览器请求后台接口都是异步的，如果先发起请求的接口后返回数据，列表/表格中显示的数据就很可能会是错乱的。

## 问题重现

最近测试提了一个搜索（PS：此处的搜索🔍就是用 DevUI 新推出的 [CategorySearch](https://juejin.cn/post/6956612556710477860) 组件实现的）相关的缺陷单，就涉及到了上述问题。

![](/assets/asynchronous-interface-request-1.png)

这个bug单大致意思是：
> 搜索的时候，连续快速输入或者删除关键字，搜索结果和搜索关键字不匹配。

从缺陷单的截图来看，本意是要搜索关键字`8.4.7迭代】`，表格中的实际搜索结果是`8.4.7迭代】过`关键字的数据。

缺陷单的截图还非常贴心地贴了两次请求的信息：

![](/assets/asynchronous-interface-request-2.png)

作为一名“有经验的”前端开发，一看就是一个通用的技术问题：
1. 浏览器从服务器发起的请求都是异步的；
2. 由于前一次请求服务器返回比较慢，还没等第一次请求返回结果，后一次请求就发起了，并且迅速返回了结果，这时表格肯定显示后一次的结果；
3. 过了2秒，第一次请求的结果才慢吞吞地返回了，这时表格错误地又显示了第一次请求的结果；
4. 最终导致了这个bug。

怎么解决呢？

在想解决方案之前，得想办法必现这个问题，靠后台接口是不现实的，大部分情况下后台接口都会很快返回结果。

所以要必现这个问题，得先模拟慢接口。

## 模拟慢接口

为了快速搭建一个后台服务，并模拟慢接口，我们选择 [Koa](https://koajs.com/) 这个轻量的 Node 框架。

### 快速开始

Koa 使用起来非常方便，只需要：
1. 新建项目文件夹：`mkdir koa-server`
2. 创建 package.json：`npm init -y`
3. 安装 Koa：`npm i koa`
4. 编写服务代码：`vi app.js`
5. 启动：`node app.js`
6. 访问：`http://localhost:3000/`

#### 编写服务代码

使用以下命令创建 app.js 启动文件：

```shell
vi app.js
```

在文件中输入以下 3 行代码，即可启动一个 Koa 服务：

```ts
const Koa = require('koa'); // 引入 Koa
const app = new Koa(); // 创建 Koa 实例
app.listen(3000); // 监听 3000 端口
```

#### 访问

如果没有在3000端口启动任务服务，在浏览器访问：

`http://localhost:3000/`

会显示以下页面：


![](/assets/asynchronous-interface-request-3.png)

启动了我们的 Koa Server 之后，访问：

`http://localhost:3000/`

会显示：


![](/assets/asynchronous-interface-request-4.png)

### get 请求

刚才搭建的只是一个空服务，什么路由都没有，所以显示了`Not Found`。

我们可以通过中间件的方式，让我们的 Koa Server 显示点儿东西。

由于要增加一个根路由，我们先安装路由依赖

```shell
npm i koa-router
```

然后引入 Koa Router

```ts
const router = require('koa-router')();
```

接着是编写get接口

```ts
router.get('/', async (ctx, next) => {
  ctx.response.body = '<p>Hello Koa Server!</p>';
});
```

最后别忘了使用路由中间件

```ts
app.use(router.routes());
```

改完代码需要重启 Koa 服务，为了方便重启，我们使用 pm2 这个 Node 进程管理工具来启动/重启 Koa 服务，使用起来也非常简单：
- 全局安装 pm2：npm i -g pm2
- 启动 Koa Server：pm2 start app.js
- 重启 Koa Server：pm2 restart app.js

重启完 Koa Server，再次访问

`http://localhost:3000/`

会显示以下内容：


![](/assets/asynchronous-interface-request-5.png)

### post 请求

有了以上基础，就可以写一个 post 接口，模拟慢接口啦！

编写 post 接口和 get 接口很类似：

```ts
router.post('/getList', async (ctx, next) => {
  ctx.response.body = {
    status: 200,
    msg: '这是post接口返回的测试数据',
    data: [1, 2, 3]
  };
});
```

这时我们可以使用 Postman 调用下这个 post 接口，如期返回：


![](/assets/asynchronous-interface-request-6.png)

### 允许跨域

我们尝试在 NG CLI 项目里调用这个 post 接口：
```ts
this.http.post('http://localhost:3000/getList', {
  id: 1,
}).subscribe(result => {
  console.log('result:', result);
});
```

但是在浏览器里直接调用，却得不到想要的结果：
- result 没有打印出来
- 控制台报错
- Network请求也是红色的

![](/assets/asynchronous-interface-request-7.png)

由于本地启动的项目端口号（4200）和 Koa Server 的（3000）不同，浏览器认为这个接口跨域，因此拦截了。

NG CLI 项目本地链接：

`http://localhost:4200/`

Koa Server 链接：

`http://localhost:3000/`

Koa 有一个中间件可以允许跨域：`koa2-cors`

这个中间件的使用方式，和路由中间件很类似。

先安装依赖：
```shell
npm i koa2-cors
```

然后引入：
```ts
const cors = require('koa2-cors');
```

再使用中间件：
```ts
app.use(cors());
```

这时我们再去访问：

`http://localhost:4200/`

就能得到想要的结果啦！


![](/assets/asynchronous-interface-request-8.png)

### 慢接口

post 接口已经有了，怎么模拟慢接口呢？

其实就是希望服务器延迟返回结果。

在 post 接口之前增加延迟的逻辑：

```ts
  async function delay(time) {
    return new Promise(function(resolve, reject) { 
      setTimeout(function() {
        resolve();
      }, time);
    });
  }

  await delay(5000); // 延迟 5s 返回结果

  ctx.response.body = { ... };
```

再次访问 getList 接口，发现前面接口会一直`pending`，5s 多才真正返回结果。


![](/assets/asynchronous-interface-request-9.png)

## 取消慢接口请求

能模拟慢接口，就能轻易地必现测试提的问题啦！

> 先必现这个问题，然后尝试修复这个问题，最后看下这个问题还出不出现，不出现说明我们的方案能解决这个bug，问题还有说明我们得想别的办法。

这是修复bug正确的打开方式。

最直观的方案就是再发起第二次请求之后，如果第一次请求未返回，那就直接取消这次请求，使用第二次请求的返回结果。

怎么取消一次http请求呢？

Angular 的异步事件机制是基于 RxJS 的，取消一个正在执行的 http 请求非常方便。

前面已经看到 Angular 使用 HttpClient 服务来发起 http 请求，并调用subscribe 方法来订阅后台的返回结果：

```ts
this.http.post('http://localhost:3000/getList', {
  id: 1,
}).subscribe(result => {
  console.log('result:', result);
});
```

要取消 http 请求，我们需要先把这个订阅存到组件一个变量里：

```ts
private getListSubscription: Subscription;

this.getListSubscription = this.http.post('http://localhost:3000/getList', {
  id: 1,
}).subscribe(result => {
  console.log('result:', result);
});
```

然后在重新发起 http 请求之前，取消上一次请求的订阅即可。

```ts
this.getListSubscription?.unsubscribe(); // 重新发起 http 请求之前，取消上一次请求的订阅

this.getListSubscription = this.http.post(...);
```

## 其他 http 库如何取消请求

至此这个缺陷算是解决了，其实这是一个通用的问题，不管是在什么业务，使用什么框架，都会遇到异步接口慢导致的数据错乱问题。

那么，如果使用 fetch 这种浏览器原生的 http 请求接口或者 [axios](https://axios-http.com/) 这种业界广泛使用的 http 库，怎么取消正在进行的 http 请求呢？

### fetch

先来看下 fetch，fetch 是浏览器原生提供的 AJAX 接口，使用起来也非常方便。

使用 fetch 发起一个 post 请求：

```ts
fetch('http://localhost:3000/getList', {
   method: 'POST',
　　headers: {
　　　　'Content-Type': 'application/json;charset=utf-8'
　　},
　　body: JSON.stringify({
    id: 1
　　})
}).then(result => {
  console.log('result', result);
});
```

可以使用 `AbortController` 来实现请求取消：

```ts
this.controller?.abort(); // 重新发起 http 请求之前，取消上一次请求

const controller = new AbortController(); //  创建 AbortController 实例
const signal = controller.signal;
this.controller = controller;

fetch('http://localhost:3000/getList', {
   method: 'POST',
　　headers: {
　　　　'Content-Type': 'application/json;charset=utf-8'
　　},
　　body: JSON.stringify({
    id: 1
　　}),
  signal, // 信号参数，用来控制 http 请求的执行
}).then(result => {
  console.log('result', result);
});
```

### axios

再来看看 axios，先看下如何使用 axios 发起 post 请求。

先安装：

```shell
npm i axios
```

再引入：

```ts
import axios from 'axios';
```

发起 post 请求：

```ts
axios.post('http://localhost:3000/getList', {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  data: {
    id: 1,
  },
})
.then(result => {
  console.log('result:', result);
});
```

axios 发起的请求可以通过 cancelToken 来取消。

```ts
this.source?.cancel('The request is canceled!');

this.source = axios.CancelToken.source(); // 初始化 source 对象

axios.post('http://localhost:3000/getList', {
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  },
  data: {
    id: 1,
  },
}, { // 注意是第三个参数
  cancelToken: this.source.token, // 这里声明的 cancelToken 其实相当于是一个标记或者信号
})
.then(result => {
  console.log('result:', result);
});
```

## 小结

本文通过实际项目中遇到的问题，总结缺陷分析和解决的通用方法，并对异步接口请求导致的数据错误问题进行了深入的解析。

<EditInfo time="2021年05月08日 07:56" title="阅读 4297 ·  点赞 58 ·  评论 36 ·  收藏 50" />
