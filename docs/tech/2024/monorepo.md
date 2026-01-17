# Monorepo：让你的项目脱胎换骨，既能代码复用，又能独立部署！

你好，我是 Kagol，个人公众号：`前端开源星球`。

你的项目是不是正在不断膨胀，构建速度越来越慢，包体积越来越大，性能越来越慢了？

想拆分到不同的仓库中分开维护，又担心代码不方便复用？

你可能需要将项目改造成 Monorepo 啦！

我将带大家把一个现有项目改造成 Monorepo 方式，便于扩展和多项目复用。

如果你也有类似的需求，可以点赞、收藏下本文，关键时刻也许能帮上忙。

## 1 为什么需要做 Monorepo 改造

使用 monorepo 方式组织代码的前提是：

> 你有多个项目，并且需要在多个项目中复用组件和逻辑。

如果每个项目都是完全独立的，没有什么共用的代码（几乎不太可能），那也许你就不需要用 monorepo 啦。

### 1.1 Monorepo 的好处

使用 Monorepo 方式组织项目代码，至少有以下好处：

1.  `便于代码复用`：多个仓库都会用到的组件、工具函数、类型声明、样式等，可以放到 common 子包中，需要的仓库直接 npm install 这个子包就行，就跟 npm install 一个 npm 包一样容易。
2.  `独立构建和部署`：每个子包都是一个独立的项目，有自己的 package.json 文件，独立安装依赖、独立端口和本地启动、独立测试、独立构建和部署，互不影响。
3.  `降低切换成本`：由于只有单一仓库，clone 代码、切换分支、安装依赖比较方便，不用在不同文件夹之间切换。
4.  `节约磁盘空间`：pnpm 天然具备 monorepo 能力，支持全局依赖管理，所有子包之间共享依赖，节约磁盘空间。
5.  `方便提交PR`：由于是单仓库，增加新组件或给组件增加新特性，只需要提交一个 MR、编写一次 MR 描述、关联一次需求/缺陷单。
6.  `方便代码检视`：一个完整的特性只需要统一在一个 MR 中检视，不用在多个仓库/多个 MR 之间切换。
7.  `灵活便于扩展`：后续增加新的工程只需要在 packages 下增加一个子包，不需要申请新的代码仓库，也降低后续仓库维护成本，比如：配置保护分支 / GitHub Actions / 仓库标签等。

### 1.2 如果不用 Monorepo 会怎么样？

*   方式一：把所有项目放到一个仓库里，创建很多文件夹，分别存放不同的项目，通过路由进行项目隔离。

这样做的好处是所有代码都在一起，代码复用方便，直接 `../` 就行；而且不用创建和维护仓库，不用配置一堆流水线。

坏处也显而易见，就是项目会不断膨胀，本地启动调试会越来越慢、构建打包越来越慢，包体积越来越大，项目越来越卡，最后用户受不了纷纷弃坑。

*   方式二：将项目拆分到不同的代码仓库进行维护。

好处是项目之间相互独立，不容易耦合，维护起来方便。

坏处就是增加了仓库维护成本、流水线创建成本，并且不方便项目之间复用代码。

不管是以上哪种方式，后续项目的演进都是麻烦不断，要么代码量膨胀、性能下降，要么重复劳动、一堆重复代码。

Monorepo 可以你帮助减少麻烦，快乐工作！

我们一起来看看具体怎么改造吧！

## 2 现有工程改造成 Monorepo 的步骤

假如我们已经有了一个 Vite + Vue3 工程，可以通过 npm run dev 本地启动，npm run build 进行构建。

基本步骤：

1.  增加 packages 目录用于存放子包，增加 portal 子包
2.  把现有工程的 src / public / package.json / vite.config.ts / tsconfig.xx.json / index.html / README.md 等项目启动和构建相关的目录和文件全部剪切到 packages/portal 目录中
3.  增加 pnpm-workspace.yaml 文件配置多包路径
4.  根目录增加 package.json 文件
5.  执行 pnpm i 安装依赖，执行 pnpm -F portal dev 本地启动
6.  将本地启动命令放到根目录的 packages.json scripts中，方便启动

### 2.1 创建子包

第一步就是在根目录创建 packages 目录，增加项目子包，比如项目叫：portal

    root
    ├── packages
    |  └── portal
    |     ├── ... // 项目文件和目录

### 2.2 现有项目文件放进子包里

把现有工程的 src / public / package.json / vite.config.ts / tsconfig.xx.json / index.html / README.md 等项目启动和构建相关的目录和文件全部剪切到 packages/portal 目录中

    root
    ├── packages
    |  └── portal
    |     ├── index.html
    |     ├── package-lock.json
    |     ├── package.json
    |     ├── public
    |     ├── README.md
    |     ├── src
    |     ├── tsconfig.app.json
    |     ├── tsconfig.json
    |     ├── tsconfig.node.json
    |     └── vite.config.ts

### 2.3 配置 pnpm-workspace.yaml

根目录创建 `pnpm-workspace.yaml` 文件。

    packages:
      - packages/**

### 2.4 配置 package.json

项目原来的 package.json 属于子包，需要放到 portal 子包中。

项目根目录需要创建一个新的 package.json 文件。

    {
      "name": "root",
      "private": true
    }

### 2.5 改造前后目录结构对比

![前后目录结构对比.PNG](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e96cfa0fbf654f538922ca33d73e8fdf~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239388&x-orig-sign=U6DdTnjNA6CCQ68BsAoNSz3xUUM%3D)

### 2.6 验证本地启动和构建命令

执行 pnpm i 安装依赖

执行 pnpm -F portal dev 本地启动

执行 pnpm -F portal build 项目构建

如果以上命令都正常，说明本次 Monorepo 改造成功！

### 2.7 增加便捷命令

将本地启动命令放到根目录的 packages.json scripts 中，方便启动。

```diff
{
  "name": "root",
  "private": true,
+  "scripts": {
+    "dev": "pnpm -F portal dev",
+    "build": "pnpm -F portal build",
+    "preview": "pnpm -F portal preview"
+  }
}
```

后续启动项目：pnpm dev

构建项目：pnpm build

## 3 增加一个新项目 admin

在 packages 目录下执行 npm create vite admin，选择 React 框架。

![2.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/ac24fb9685f54b2fa6e5e03416f39eb4~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239388&x-orig-sign=IEVfBlWiyU%2BhmzWW2g7OrabgzAU%3D)

执行 pnpm i 安装依赖

执行 pnpm -F admin dev 本地启动 admin 新项目

执行 pnpm -F admin build 构建 admin 新项目

两个项目同时启动了。

![3.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/7d1e695bced34bd1bf906b6ac2799780~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239388&x-orig-sign=btkLjQlVJErTIlM6k%2F6dLvW%2FKyQ%3D)

实现了 portal / admin 两个项目`分开启动`、`分开构建`、`分开管理依赖`、`分开测试`，互不影响，而且 portal 是 Vue 技术栈，admin 是 React 技术栈。

可以在根目录的 package.json scripts 增加对应的便捷命令。

```diff
{
  "name": "root",
  "private": true,
  "scripts": {
    "dev": "pnpm -F portal dev",
    "build": "pnpm -F portal build",
    "preview": "pnpm -F portal preview",
+    "dev:admin": "pnpm -F portal dev",
+    "build:admin": "pnpm -F portal build",
+    "preview:admin": "pnpm -F portal preview"
  }
}
```

改造后的 Monorepo 项目目录结构，看起来和原来差异不大，就是包了一层 packages，其实整个项目已经脱胎换骨，变成了一个更加让人“省心”的项目，项目之间的代码复用更加方便，后续维护和扩展也是非常轻松。

    tiny-vue-demo
    ├── package.json
    ├── packages
    |  ├── admin
    |  |  ├── eslint.config.js
    |  |  ├── index.html
    |  |  ├── package.json
    |  |  ├── public
    |  |  ├── README.md
    |  |  ├── src
    |  |  ├── tsconfig.app.json
    |  |  ├── tsconfig.json
    |  |  ├── tsconfig.node.json
    |  |  └── vite.config.ts
    |  └── portal
    |     ├── index.html
    |     ├── package-lock.json
    |     ├── package.json
    |     ├── public
    |     ├── README.md
    |     ├── src
    |     ├── tsconfig.app.json
    |     ├── tsconfig.json
    |     ├── tsconfig.node.json
    |     └── vite.config.ts
    ├── pnpm-lock.yaml
    └── pnpm-workspace.yaml

如果有些逻辑 portal / admin 都用到了，我们可以新加一个子包：common

然后在 portal / admin 中引入 common。

    pnpm -F portal i common
    pnpm -F admin i common

安装之后直接 import 进行使用即可。

## 4 总结

本文主要给大家分析了 Monorepo 方式组织项目代码的好处，以及不使用 Monorepo 可能带来的麻烦；

然后以一个 Vite + Vue3 项目为例，手把手带大家一起将它改造成 Monorepo 项目；

在此基础上，如何扩展一个新项目，并且新项目技术栈用的是 React，却可以和原来的 Vue 项目共同代码逻辑。

别犹豫了，动手实践起来吧！

<EditInfo time="2024-08-20 08:21" title="346220展现 · 14199阅读 · 193点赞 · 55评论 · 347收藏" />