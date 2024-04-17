# 从0到1搭建Vue组件库06：手把手带你开发一个脚手架

![image](https://user-images.githubusercontent.com/9566362/201511144-b05b690e-7294-4d9f-ad8c-d5c707fc43fd.png)

本文作者：[iel](https://juejin.cn/user/1538972011203662)

原文链接：[https://juejin.cn/post/7021870182855344142](https://juejin.cn/post/7021870182855344142)

最近在与[村长](https://space.bilibili.com/480140591)老师一起做[直播](https://www.bilibili.com/video/BV1Z64y187dR)，给大家分享[vue devui](https://gitee.com/devui/vue-devui)开源组件库的建设，1-3期以 tree 组件为栗子🌰，介绍了如何设计和开发Vue组件：
1. [Vue DevUI开源指南01：提交我的第一次pr](https://juejin.cn/post/7009273646884028430)
1. [Vue DevUI开源指南02：实现一个能渲染多层节点的Tree组件](https://juejin.cn/post/7011535488171376671)
1. [Vue DevUI开源指南03：如何给 tree 组件增加展开/收起功能](https://juejin.cn/post/7015023354847428645)

从第4期开始给大家分享组件库工程化相关的内容：
1. [【我要做开源】Vue DevUI开源指南04：使用Vite搭建一个支持TypeScript/JSX的Vue3组件库工程 ](https://juejin.cn/post/7017101147865350158)
1. [【我要做开源】Vue DevUI开源指南05：给Vue3组件库添加VitePress文档系统 ](https://juejin.cn/post/7019314307682795534)

后续的直播也会分成两条线：
1. 一条是组件的设计和实现
1. 另一条是组件库的工程化

欢迎大家持续关注～

我们 `DevUI` 团队有多个开源项目，现在都在招募`contributor`，欢迎大家一起参与开源中来！(感兴趣的小伙伴可以添加`DevUI`小助手的微信：`devui-official`，将你拉到我们的核心开发群)

- Ng DevUI: [https://github.com/DevCloudFE/ng-devui](https://github.com/DevCloudFE/ng-devui)
- Vue DevUI: [https://gitee.com/devui/vue-devui](https://gitee.com/devui/vue-devui)
- DevUI Admin [https://github.com/DevCloudFE/ng-devui-admin](https://github.com/DevCloudFE/ng-devui-admin)

`DevUI`官网：[https://devui.design/](https://devui.design/)

## 上一期内容回顾

上一期主要给大家分享了两部分内容：
- 使用vitepress搭建组件库的文档系统
- 给文档系统增加demo展开/收起功能

本期邀请了`Vue DevUI`团队的[雷同学](https://juejin.cn/user/1538972011203662)给大家分享`DevUI CLI`工具的实现原理。

雷同学是我们Vue DevUI的早期贡献者，也是Toast组件的田主，早期Vue DevUI组件库还很不完善，组件的文件和组件库的入口文件都是手动添加的，每次新增一个组件，都非常麻烦，需要
1. 先在`devui`目录下创建一堆文件`index.ts`/`src/xx.tsx`等
2. 在`devui/vue-devui.ts`组件库入口文件中添加相应的组件导出
3. 在`sidebar.ts`左侧组件菜单中添加相应的组件配置

而且像`vue-devui.ts`/`sidebar.ts`等公共文件，经常多个田主一起修改，经常导致冲突。

雷同学敏锐得发现了这个问题，并主动提出创建一个`DevUI CLI`工具来解决这个问题，本期直播雷同学就给大家分享了`DevUI CLI`的实现原理。

这只是`DevUI CLI`工具系列的[第一期](https://juejin.cn/post/7021870182855344142)，后续还会继续深入如何使用`DevUI CLI`：
- 为组件库生成入口文件
- 创建组件目录结构
- 自动生成左侧组件菜单文件

以下是原文：

> 脚手架是为了保证各施工过程顺利进行而搭设的工作平台。按搭设的位置分为外脚手架、里脚手架；按材料不同可分为木脚手架、竹脚手架、钢管脚手架；按构造形式分为立杆式脚手架、桥式脚手架、门式脚手架、悬吊式脚手架、挂式脚手架、挑式脚手架、爬式脚手架。 ——百度百科

本质上就是一个便利工具，为一些比较特殊或繁琐的工作提供辅助，我们这里需要开发的是一个基于命令行的工具，后文以 `cli` 代替。

## 为什么需要开发一个脚手架？

以下为初期组件库协同开发时遇到的问题：

- 组件目录结构不一致
  + 扁平化目录
  + `src` 型目录
- 组件产出命名不一致
  + 前缀 `D` 命名
  + 无前缀 `D` 命名
  + 小写驼峰命名
  + 大写驼峰命名
  + `xxxService` 命名
  + `useXxxService` 命名
- 组件入口文件经常冲突

为了解决上述问题，本着为开源社区做贡献，发光发热的时候到了，和项目组织人 `kagol` 沟通了脚手架方案顺利通过，`Prefect` ！

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fde0c795e07146a382691507c2fb646b~tplv-k3u1fbpfcp-watermark.awebp)

## TODO

- [x] 创建统一组件结构
- [x] 创建组件库入口文件

## 技术选型

脚手架 = 命令 + 交互 + 逻辑处理

- 命令
  + `commander` 插件提供命令注册、参数解析、执行回调
- 交互
  + `inquirer` 插件用于命令行的交互（问答）
- 逻辑处理
  + `fs-extra` 插件是对 `nodejs` 文件 `Api` 的进一步封装，便于使用
  + `kolorist` 插件用于输出颜色信息进行友好提示

## 初始化 cli

### step1 创建 cli 目录

```shell
mkdir devui-cli // 创建脚手架目录
cd devui-cli // 进入脚手架目录
// 初始化一个 node 项目
npm init
// or
yarn init
```

第一步先创建一个目录来存放我们即将开发的脚手架，作为一个 `nodejs` 包，需要我们通过 `npm` 或者 `yarn` 初始化包的信息，一律回车即可通过，生成后的目录结构如下图。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9336fb2a081a43ed8b9a245926e0bc9d~tplv-k3u1fbpfcp-watermark.image?)

### step2 创建入口文件

```shell
mkdir src
echo 'console.log("hello devui-cli")' > src/index.js
```

### step3 安装所需依赖

```shell
npm i -D commander inquirer fs-extra kolorist
// or
yarn add -D commander inquirer fs-extra kolorist
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb0c9c878e1b45209b91690ef5e4488f~tplv-k3u1fbpfcp-watermark.image?)

## 开发命令脚本

这里先给大家梳理下 `cli` 的执行流程：命令行输入 `devui-cli` --> 命令行交互 --> 根据不同参数进行不同操作。

这里大家可能要问了，命令行如何识别 `devui-cli` 的？又是如何执行交互操作的？

> 这里简单给大家解答一下，命令行里面输入 `devui-cli` 本质上是执行某一个可执行脚本，那么对应我们 `node` 包来说就是入口文件 `src/index.js` 了，所以可以看成是 `node src/index.js` ，效果是一样的，只不过第一种更为方便与友好一点。那么我们直接执行是否就可以了呢？答案肯定不是的，需要在 `package.json` 里面配置 `bin` 属性来标明脚本的一个入口。

准备工作结束，接下来开始正式的 `cli` 脚本编写。

### 配置环境解释器

```shell
#!/usr/bin/env node
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11c52f6ad08b487d8c8a68ce6e80ca23~tplv-k3u1fbpfcp-watermark.image?)

部分看官可能会疑惑这句话有什么用呢？

> 答案在这里，若是有使用过 `Linux` 或者 `Unix` 的小伙伴们，对于 `Shebang` 应该不陌生，它是一个符号的名称 `#!` 。这个符号通常在 `Unix` 系统的基本中第一行开头中出现，用于指明这个脚本文件的解释程序， `#!/usr/bin/env node` 目的就是告诉操作系统执行这个脚本的时候，在 `/usr/bin` 的环配置里找到 `node` 解释器并执行。

### 注册命令

配置好环境解释器之后就可以编写我们的命令逻辑了。

首先，先注册下我们需要执行的一些命令以及一些命令参数。

```js
#!/usr/bin/env node
import { Command } from 'commander'
import { onCreate } from './commands/create'

// 创建命令对象
const program = new Command()

// 注册命令、参数、回调
program
  // 注册 create 命令
  .command('create')
  // 添加命令描述
  .description('创建一个组件模板或配置文件')
  // 添加命令参数 -t | --type <type> ，<type> 表示该参数必填，[type] 表示选填
  .option('-t --type <type>', `创建类型，可选值：component, lib-entry`)
  // 注册命令回调
  .action(onCreate)

// 执行命令行参数解析
program.parse()

```

创建具体命令目录，方便统一管理。

```shell
mkdir src/commands // 命令存放目录
echo 'export function onCreate() { }' > src/commands/create.js // 创建 create 命令文件并导出回调函数
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cb8c7b0fc1e44feb5fe2ee0a661896b~tplv-k3u1fbpfcp-watermark.image?)


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d3e02f989f1c4f388deb03bb0190649c~tplv-k3u1fbpfcp-watermark.image?)

### 测试脚本命令

我们可以先在 `onCreate` 里面打印一下我们接受到的参数。

```js
export function onCreate (cmd) {
  console.log(cmd)
}
```

执行一下脚本。

```shell
node src/index.js
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fc59305ae79e4e638c2f363aef6c7144~tplv-k3u1fbpfcp-watermark.image?)

报错了！！！我们才刚开始就报错了，是否已经开始崩溃？

稳住别慌，一切在我们的意料之中。这是因为我们编写的是 `node` 程序，本应该使用 `commonjs` 简称 `CJS` 格式，也就是用 `require` 和 `exports` 等语法才能正常使用 `node xxx.js` 进行启动，但是我们使用了新一代的 `esmodule` 简称 `ESM` 格式，所以 `node` 脸盲了！那么有什么办法呢？

解决办法一：将 `.js` 改成 `.mjs` 。why? 很明显因为 `ESM` 和 CJS 的加载方式不同，为了更好区分这两种不同的加载方式，所以创建了 `.mjs` 的文件类型，旨在 `Module javascript`。`.mjs` 就是表示当前文件用 `ESM` 的方式进行加载，如果是普通的 `.js` 文件，则采用 `CJS` 的方式加载。

解决办法二：通过一些模块打包器进行转换为 `node` 熟悉的 `cjs` 格式，然后再进行开发。

这里选择第二种方式，原因是采用打包器我们可以对代码进行其他操作，例如：压缩、转换等。

模块打包器的话这里采用 `esbuild` ，理由就是：快捷、方便。

```shell
npm i -D esbuild
// or
yarn add -D esbuild
```

安装好后先看下命令行帮助文档。

```shell
npx esbuild -h
// or
yarn esbuild -h
```

执行完后会看到以下帮助信息。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e56f4e6744e644719afd5d129abdb17b~tplv-k3u1fbpfcp-watermark.image?)

看过帮助信息后我们加入如下命令：

```js
{
    // --bundle 标识打包的入口文件
    // --format 转换为目标格式代码
    // --platform 目标平台，默认 browser
    // --outdir 输出目录
    // 开发时实时编译
    "dev": "esbuild --bundle ./src/index.js --format=cjs --platform=node --outdir=./lib --watch",
    // 打包命令
    "build": "esbuild --bundle ./src/index.js --format=cjs --platform=node --outdir=./lib",
    // 执行 create 命令，如果有多个命令，可以去掉 create ，使用时再传入
    "cli": "node ./lib/index.js create"
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4773585bca143498bed754dd4befa9e~tplv-k3u1fbpfcp-watermark.image?)

执行下 `dev` 命令，然后重新开一个 `shell` 再执行 `cli` 命令。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a7cd9b391b1641689ec6f18f8ebe9335~tplv-k3u1fbpfcp-watermark.image?)

```shell
yarn cli
// or
npm run cli
```

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62651e3132504cf1a56be0410ad4ecf3~tplv-k3u1fbpfcp-watermark.image?)

输出了一个 `{}` ，这是我们打印的 `cmd` 入参，我们并没有填入任何参数，所以解析后是一个空对象，接下来传入 `type` 参数再看看。

```shell
yarn cli -t component // -t 是 --type 的别名
// or
npm run cli -- -t component // -- 是 npm run 脚本传参时需要加的，类似于参数透传给脚本
```

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c6889f4f665f42c3a2a93d6eb9ad7388~tplv-k3u1fbpfcp-watermark.image?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cf584b4258064ceea5056afb8aba2168~tplv-k3u1fbpfcp-watermark.image?)

现在已经能够正常获取到命令参数了，证明命令注册成功，后面可以继续实现我们的交互逻辑。

### 完善 create 命令

接下来就是进一步完善我们的命令交互了，以 `component` 为例，代码如下：

```js
import inquirer from 'inquirer'
import { red } from 'kolorist'

// create type 支持项
const CREATE_TYPES = ['component', 'lib-entry']
// 文档分类
const DOCS_CATEGORIES = ['通用', '导航', '反馈', '数据录入', '数据展示', '布局']

export async function onCreate(cmd = {}) {
  let { type } = cmd

  // 如果没有在命令参数里带入 type 那么就询问一次
  if (!type) {
    const result = await inquirer.prompt([
      {
        // 用于获取后的属性名
        name: 'type',
        // 交互方式为列表单选
        type: 'list',
        // 提示信息
        message: '（必填）请选择创建类型：',
        // 选项列表
        choices: CREATE_TYPES,
        // 默认值，这里是索引下标
        default: 0
      }
    ])
    // 赋值 type
    type = result.type
  }

  // 如果获取的类型不在我们支持范围内，那么输出错误提示并重新选择
  if (CREATE_TYPES.every((t) => type !== t)) {
    console.log(
      red(`当前类型仅支持：${CREATE_TYPES.join(', ')}，收到不在支持范围内的 "${type}"，请重新选择！`)
    )
    return onCreate()
  }

  try {
    switch (type) {
      case 'component':
        // 如果是组件，我们还需要收集一些信息
        const info = await inquirer.prompt([
          {
            name: 'name',
            type: 'input',
            message: '（必填）请输入组件 name ，将用作目录及文件名：',
            validate: (value) => {
              if (value.trim() === '') {
                return '组件 name 是必填项！'
              }
              return true
            }
          },
          {
            name: 'title',
            type: 'input',
            message: '（必填）请输入组件中文名称，将用作文档列表显示：',
            validate: (value) => {
              if (value.trim() === '') {
                return '组件名称是必填项！'
              }
              return true
            }
          },
          {
            name: 'category',
            type: 'list',
            message: '（必填）请选择组件分类，将用作文档列表分类：',
            choices: DOCS_CATEGORIES,
            default: 0
          }
        ])

        createComponent(info)
        break
      case 'lib-entry':
        createLibEntry()
        break
      default:
        break
    }
  } catch (e) {
    console.log(red('✖') + e.toString())
    process.exit(1)
  }
}

function createComponent(info) {
  // 输出收集到的组件信息
  console.log(info)
}

function createLibEntry() {
  console.log('create lib-entry file.')
}
```

ok，接下来尝试运行一下我们的脚本。

先尝试错误的类型：

```shell
yarn cli -t error
// or
npm run cli -- -t error
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/381660784c474a28b19a98b4a5fe0626~tplv-k3u1fbpfcp-watermark.image?)

按照我们的预想提示了错误信息并让我们重新选择类型。

接下来尝试正确的类型：

```shell
yarn cli -t component
// or
npm run cli -- -t component
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3044548a7c79467eb34e71f385a63be3~tplv-k3u1fbpfcp-watermark.image?)

因为指定了类型为组件，所以现在需要收集一下即将创建的组件信息。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5908508caddb40359d654595c48aef85~tplv-k3u1fbpfcp-watermark.image?)

按照提示信息一步一步完成输入最终获取到了我们需要的数据，接下来就是模板的生成了。

## 未完待续

尽情期待后续更精彩的分享！



<EditInfo time="2021年10月22日 23:41" title="阅读 2012 ·  点赞 22 ·  评论 10 ·  收藏 13" />
