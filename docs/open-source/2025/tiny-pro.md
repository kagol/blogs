# TinyPro 后台管理系统从启动 ➡️ 使用 ➡️ 二开，看这一篇就够了！点赞、收藏⭐，不迷路！

你好，我是 Kagol，个人公众号：`前端开源星球`。

[TinyPro](https://github.com/opentiny/tiny-pro) 是一个基于 [TinyVue](https://github.com/opentiny/tiny-vue) 打造的前后端分离的后台管理系统，支持在线配置菜单、路由、国际化，支持页签模式、多级菜单，支持丰富的模板类型，支持多种构建工具，功能强大、开箱即用。

*   源码：<https://github.com/opentiny/tiny-pro>
*   官网：<https://opentiny.design/vue-pro>

## 1 项目优势

如果将开发 Web 应用比作建造房子，那么 TinyVue 组件库中的组件就是建造房子的砖、瓦、沙石等材料，你可以用 TinyVue 组件快速搭建前端项目。

而 TinyPro 则是用 TinyVue 组件库搭建起来的“样板房”，这是一个已经搭建好的完整的后台管理系统，包含前后端。

市面上有很多后台管理模板，为什么要选择 TinyPro 呢？

我总结了下，TinyPro 主要有以下优势：

1.  **上手成本低**：一行命令即可创建一个后台管理系统
2.  **支持前后端**：前端基于 `Vue3` + `TypeScript` + `TinyVue`，后端基于 `NestJS`
3.  **强大的功能**：支持组件粒度的权限管理、页签模式、多级菜单、多种布局方式、个性化主题、国际化、Mock 数据等丰富的特性，开箱即用
4.  **使用成本低**：支持在线方式快速配置角色、用户、菜单、权限、国际化词条，无需写代码，用户使用成本低，没有开发基础的设计师、产品经理也能操作
5.  **开发者友好**：支持 `Vite`、`Webpack`、`Rspack`、`Farm` 等多种构建工具

TinyPro 提供了 NestJS 后端，将菜单、路由、国际化词条、角色、用户、权限等内容都放到了后端，用户可以通过在线的方式配置菜单、路由、国际化词条等内容，这样做有以下好处：

*   前端工程师只需要专注于构建前端页面，配置菜单、国际化词条等工作可以交给管理员
*   管理员对系统有更多的控制权，功能模块的上线不需要依赖于前端开发

![TinyPro优势.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/213720ea9723492589313056986e2014~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240023&x-orig-sign=mWctLoNL2Ew8bIzhzpUom%2FwoQ5I%3D)

## 2 项目生成

TinyPro 这个后台管理模板这么好，我要怎么才能“得到”它呢？

只需要使用 `tiny init pro` 这一行命令就可以初始化一个！

```bash
# 安装 TinyCLI 脚手架
npm install @opentiny/cli -g

# 初始化 TinyPro 项目
tiny init pro
```

按照以下方式进行选择：

```bash
* 请输入项目名称： demo-tiny-pro
* 请输入项目描述： 基于TinyPro套件创建的中后台系统
* 请选择您希望使用的客户端技术栈： vue
* 请选择您希望使用的服务端技术栈： Nest.js
* 请选择你想要的构建工具:  Vite
* 请确保已安装数据库服务（参考文档 https://www.opentiny.design/tiny-cli/docs/toolkits/pro#database）： 已完成数据库服务安装，开始配置
* 请输入Redis地址： localhost
* 请输入Redis端口： 6379
* 请选择数据库类型： MySql
* 请输入数据库地址： localhost
* 请输入数据库端口： 3306
* 请输入数据库名称： order_sys
* 请输入登录用户名： root
* 请输入密码： [input is hidden] 
```

需要注意的是：

*   MySQL 地址是 localhost，端口是 3306（默认），数据库名称是 order\_sys
*   Redis 地址是 localhost，端口是 6379（默认）

最后输入的密码是 MySQL 数据库 root 用户的密码。

![TinyPro启动.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/068f88cbbddf401c85608f22e59f4279~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240023&x-orig-sign=U5HcX9bVZQzNIJ8Bouo%2B0vFmM4A%3D)

## 3 本地启动

初始化之后的项目主要包含两个目录：nestJs 和 web。

nestJs 是后端代码，web 是前端代码。

### 3.1 启动后端

我们先来启动后端。

后端使用的是 NestJS，数据库使用的是 MySQL 和 Redis，在启动 NestJS 服务之前，需要先安装和启动 MySQL 和 Redis 数据库。

*   [macOS 和 Windows 操作系统下如何安装和启动 MySQL / Redis 数据库](https://juejin.cn/spost/7488905111479451688)

启动后端之前

*   确保 MySQL 和 Redis 数据库均已启动。
*   连接数据库，并使用 `create database order_sys;` 命令创建一个空数据库。
*   修改 nestJs/.env 文件中的 `DATABASE_SYNCHRONIZE = true`。

```bash
# 进入 nestJs 目录
cd nestJs

# 安装依赖
npm i

# 启动后端
npm start
```

```bash
$ npm start
> nest start

webpack 5.87.0 compiled successfully in 5780 ms
[Nest] 84481  - 2025/04/04 15:10:48     LOG [NestApplication] Nest application successfully started +2ms
Application is running on: http://[::1]:3000
```

后端启动成功！

### 3.2 启动前端

启动前端之前，请确保后端已经成功启动。

启动前端和启动后端的步骤基本上是一样的。

```bash
# 进入 web 目录
cd web

# 安装依赖
npm i

# 启动前端
npm start
```

```bash
$ npm start
> vite --config ./config/vite.config.dev.ts --port 3031


  VITE v4.5.5  ready in 2051 ms

  ➜  Local:   http://localhost:3031/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

前端启动成功！

前后端都成功启动之后，就可以访问：<http://localhost:3031/>

体验 TinyPro 后台管理系统的使用啦！

TinyPro 后台管理系统的效果如下：

![TinyPro.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/3d855dce54d84a84ba7e9f8e2af40e68~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240023&x-orig-sign=IXMJRn8bLgJPp5Zz0HktQ3uY7iw%3D)

## 4 如何使用

前面我们已经启动了 TinyPro，接下来就带大家一起体验下如何使用。

使用之前需要先将 `nestJs/src/app.module.ts` 文件中的以下代码删掉。

```diff
@Module({
  ...,
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
-   {
-     provide: APP_GUARD,
-      useClass: RejectRequestGuard,
-   },
    {
      provide: APP_GUARD,
      useClass: PermissionGuard,
    },
  ],
})
export class AppModule implements OnModuleInit {
  // ...
}
```

接下来将由 TinyPro 核心贡献者 [GaoNeng-wWw](https://github.com/GaoNeng-wWw) 带大家使用以下功能。

1.  如何增加用户
2.  如何增加菜单
3.  如何进行权限管理
    1.  创建权限
        1.  组件级权限管理
        2.  页面级权限管理
    2.  创建用户
    3.  分配权限给用户
4.  如何为角色绑定菜单
5.  创建好的国际化词条如何在前端中使用

具体演示请看以下视频（从 10:30 开始）：[TinyPro 使用指南：手把手带你本地启动 TinyPro，在线创建菜单、国际化，实现组件级权限管理](https://www.bilibili.com/video/BV1PuZBYeEGb/)

## 5 二次开发

项目初始化之后，我们可以看下它的目录结构。

![4TinyPro目录结构.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5cc92325798e4fa5914b6be43edf4611~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240023&x-orig-sign=bz%2BYVl7818gSvl3asgSPB13CBBY%3D)

接下来我将以新增订单管理模块前后端为例，给大家演示如何基于 TinyPro 进行二次开发。

![订单管理模块前后端规划.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cfd3daf6072f48db85079badaade6f79~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240023&x-orig-sign=y3ODIpl8njUqOzeX7e0voF2dQ3w%3D)

具体演示请看以下视频（从 0:12:24 开始）：[TinyPro 二次开发教程：手把手带你基于 TinyPro 搭建订单管理模块前后端](https://www.bilibili.com/video/BV1aAZYYAEYb/)

本文对应的 [视频1](https://www.bilibili.com/video/BV1PuZBYeEGb/) | [视频2](https://www.bilibili.com/video/BV1aAZYYAEYb/) | [PPT](https://kagol.github.io/ppt-tiny-pro)，欢迎大家观看视频和 PPT。

<EditInfo time="2025-04-04 15:02" title="4584展现 · 209阅读 · 2点赞 · 0评论 · 1收藏" />