# Monorepo 初体验：将现有的 NG CLI 工程改造成 Monorepo 方式

![image](https://user-images.githubusercontent.com/9566362/201514698-38e1c5b7-71c1-4e1f-bb7c-bef102f172f3.png)

## 前言

Monorepo 能够优雅地解决代码复用的问题，统一工作流，并且不影响构建、部署的效率。

目前开源社区已经有不少开源项目都是采用 Monorepo 的方式管理源码的，比如：Vue3，以下是它的部分源码结构：

```
vue-next
├── CHANGELOG.md
├── LICENSE
├── README.md
├── api-extractor.json
├── jest.config.js
├── package.json
├── packages // 每一个包在一个文件夹下，独立测试、独立构建、独立部署
|  ├── compiler-core
|  ├── compiler-dom
|  ├── compiler-sfc
|  ├── compiler-ssr
|  ├── global.d.ts
|  ├── reactivity
|  ├── runtime-core
|  ├── runtime-dom
|  ├── runtime-test
|  ├── server-renderer
|  ├── shared
|  ├── size-check
|  ├── template-explorer
|  └── vue
|     ├── README.md
|     ├── __tests__
|     ├── api-extractor.json
|     ├── examples
|     ├── index.js
|     ├── package.json
|     └── src
├── rollup.config.js
├── ...
```

我们一起来看看如何将一个现有的NG CLI工程切换成Monorepo，并在Monorepo的工作空间里不断扩展新项目吧！

## 创建一个 NG CLI 项目

我们先来创建一个CLI工程，并将其启动起来。

```
ng n my-portal --style=scss

cd my-portal

npm start
```

访问以下链接就能将项目启动起来：

`http://localhost:4200/`

![初始工程.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1a6089df77834691b0aff1843c4b7785~tplv-k3u1fbpfcp-watermark.image)

## 升级成 Monorepo

我们已经有了一个 NG CLI，将其变成 Monorepo 工作空间非常简单，只需要一个命令：
```
ng add @nrwl/workspace
```

执行该命令后，我们的项目结构发生了一些改变，以下是主要的变化：

```
DELETE .browserslistrc
DELETE tsconfig.app.json
DELETE tsconfig.spec.json
DELETE tsconfig.json
RENAME src/app/app-routing.module.ts => apps/my-portal/src/app/app-routing.module.ts
RENAME src/app/app.component.html => apps/my-portal/src/app/app.component.html
RENAME src/app/app.component.scss => apps/my-portal/src/app/app.component.scss
RENAME src/app/app.component.spec.ts => apps/my-portal/src/app/app.component.spec.ts
RENAME src/app/app.component.ts => apps/my-portal/src/app/app.component.ts
RENAME src/app/app.module.ts => apps/my-portal/src/app/app.module.ts
RENAME src/assets/.gitkeep => apps/my-portal/src/assets/.gitkeep
RENAME src/environments/environment.prod.ts => apps/my-portal/src/environments/environment.prod.ts
RENAME src/environments/environment.ts => apps/my-portal/src/environments/environment.ts
RENAME src/favicon.ico => apps/my-portal/src/favicon.ico
RENAME src/index.html => apps/my-portal/src/index.html
RENAME src/main.ts => apps/my-portal/src/main.ts
RENAME src/polyfills.ts => apps/my-portal/src/polyfills.ts
RENAME src/styles.scss => apps/my-portal/src/styles.scss
RENAME src/test.ts => apps/my-portal/src/test.ts
RENAME e2e/src/app.e2e-spec.ts => apps/my-portal-e2e/src/app.e2e-spec.ts
RENAME e2e/src/app.po.ts => apps/my-portal-e2e/src/app.po.ts
RENAME e2e/protractor.conf.js => apps/my-portal-e2e/protractor.conf.js
RENAME e2e/tsconfig.json => apps/my-portal-e2e/tsconfig.json
CREATE apps/my-portal/.browserslistrc (703 bytes)
CREATE apps/my-portal/tsconfig.app.json (223 bytes)
CREATE apps/my-portal/karma.conf.js (1013 bytes)
CREATE apps/my-portal/tsconfig.spec.json (268 bytes)
CREATE tools/schematics/.gitkeep (0 bytes)
CREATE tools/tsconfig.tools.json (251 bytes)
CREATE nx.json (433 bytes)
CREATE libs/.gitkeep (0 bytes)
CREATE .vscode/extensions.json (144 bytes)
CREATE .prettierrc (26 bytes)
CREATE tsconfig.base.json (416 bytes)
CREATE decorate-angular-cli.js (2628 bytes)
UPDATE karma.conf.js (1016 bytes)
UPDATE package.json (2035 bytes)
UPDATE angular.json (4659 bytes)
UPDATE tslint.json (3491 bytes)
```

比较明显的改变就是：
- 将src和tsconfig的代码迁移到apps中
- 增加了nx.json配置文件

这时我们重新执行`npm start`启动项目，并通过链接`http://localhost:4200/`访问页面。

> 看起来和之前没有任何的不同，不过实质已发生巨大的变化。就像变成白袍巫师的甘道夫，穿上灰袍，看着还是以前的“灰袍巫师甘道夫”，不过早已经历了蜕变。


![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18dc5a6ecde04cb58b5d1bae7db79357~tplv-k3u1fbpfcp-watermark.image)

## 增加一个 Angular 项目

升级成 Monorepo 的 NG CLI 工程就像`变成白袍后的甘道夫`，拥有平行扩展的能力，可以增加任意的子项目，而不增加构建的成本。

比如我们想增加一个 Angular 项目，只需要执行以下命令：

```
npx nx g @nrwl/angular:app projectman-portal
```

这时apps目录下会新增一个projectman-portal目录：
```
├── apps
|  ├── my-portal
|  ├── projectman-portal // 新增的
```

新增加的子项目和之前的项目是完全独立的，不影响之前项目的本地启动、测试、构建、部署等。

启动子项目：

```
npx nx serve projectman-portal --port 4100
```

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b4b46dcd28a4b7c9580c6eb44691a0a~tplv-k3u1fbpfcp-watermark.image)

my-portal和projectman-portal启动时，会使用不同的端口号，本地开发互不影响。

## 公共部分 shared

现在我们有一个主应用my-portal和一个子应用projectman-portal，如果这两个项目中有一个公共的模块：成员管理，我们要怎么实现模块复用呢？

### 新建公共模块

可以在`apps`下新建一个`shared`文件夹，由于是Angular项目，再建一个`angular`子文件夹。
```
├── apps
|  ├── my-portal
|  |  ├── karma.conf.js
|  |  ├── src
|  |  ├── tsconfig.app.json
|  |  └── tsconfig.spec.json
|  ├── projectman-portal
|  |  ├── jest.config.js
|  |  ├── src
|  |  ├── tsconfig.app.json
|  |  ├── tsconfig.editor.json
|  |  ├── tsconfig.json
|  |  └── tsconfig.spec.json
|  └── shared
|     └── angular
```

然后在angular下新建一个component文件夹，并使用 NG CLI 命令快速创建一个member模块：

```
cd apps/shared/angular/component

// 新建模块
ng g m member-list

// 在模块下新建组件
ng g c member-list
```

```
├── apps
|  └── shared
|     └── angular
|        └── component
|           └── member-list
|              ├── member-list.component.html
|              ├── member-list.component.scss
|              ├── member-list.component.spec.ts
|              ├── member-list.component.ts
|              └── member-list.module.ts
```

### 在业务中使用

我们在my-portal和projectman-portal两个业务中都使用menber-list组件。

#### 导入member模块

apps/my-portal/src/app/app.module.ts

apps/projectman-portal/src/app/app.module.ts

```
import { MemberListModule } from '@component/member-list/member-list.module';

  imports: [
    MemberListModule,
  ],
```

#### 使用member组件

apps/my-portal/src/app/app.component.html

apps/projectman-portal/src/app/app.component.html


```
<app-member-list></app-member-list>
```

由于有热加载，保存后马上就能实时看到页面效果


![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a2af27e7e2bc43129ba9edc9285a84e0~tplv-k3u1fbpfcp-watermark.image)


![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97a340b1617f4d96b2460dc46290d2d5~tplv-k3u1fbpfcp-watermark.image)

### 配置tsconfig

为了引入方便，我们在tsconfig中配置了`@component`路径别名。

tsconfig.base.json

```
    "paths": {
      "@shared/*": ["apps/shared/*"],
      "@component/*": ["apps/shared/angular/component/*"]
    },
```

这样在业务中使用公共组件，就不用写很长的`../../`，直接使用`@component`别名即可：
```
import { MemberListModule } from '@component/member-list/member-list.module';
```

## 增加一个 React 项目

除了Angular项目，我们还可以在 Monorepo 工作空间中增加别的框架的项目，比如：React。

增加React项目的方式和Angular类似，只是需要增加一个`@nrwl/react`依赖：
```
npm i -D @nrwl/react

npx nx g @nrwl/react:app workitem-portal
```

要不然会报以下错误：
```
Unable to resolve @nrwl/react:app.
Cannot find module '@nrwl/react/package.json'
```

创建完会在apps目录下新增一个`workitem-portal`：

```
├── apps
|  ├── my-portal
|  ├── projectman-portal
|  ├── workitem-portal // 新增的
```

启动方式也是一样的：
```
npx nx serve workitem-portal --port 4200
```

我们注意到启动时报了一个错：

```
ERROR in /Users/kagol/Documents/Kagol/code/devcloud-portal/apps/workitem-portal/src/app/app.tsx(10,5):
TS17004: Cannot use JSX unless the '--jsx' flag is provided.
```

需要在`workitem-portal/tsconfig.json`中作相应的配置：

```
{
  "compileOnSave": false,
  "compilerOptions": {
    ...
    "jsx": "preserve", // "jsx": "react-jsx"
    ...
  }
}
```
访问链接：

`http://localhost:4200/`

可以看到我们的React项目也能正常启动：

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/481720b5df074220adcce4ff9a431c35~tplv-k3u1fbpfcp-watermark.image)

按照同样的步骤，我们可以扩展出很多子项目，它们之间共同同样的工作流，同样的公共代码，非常方便和高效，赶紧试试吧！

### 增加启动和构建脚本

为了方便地启动和管理多个项目，可以在`package.json`中增加启动和构建的脚本：

```
"start": "npx nx serve devcloud-portal --port 4200 --open",
"start:projectman-portal": "npx nx serve projectman-portal --port 4210",
"start:workitem-portal": "npx nx serve workitem-portal --port 4220",

"build:devcloud-portal": "npx nx build devcloud-portal --prod",
"build:projectman-portal": "npx nx build projectman-portal --prod",
"build:workitem-portal": "npx nx build workitem-portal --prod",
```

## 小结

本文先是与大家分享如何将一个现有的 Angular CLI 工程变成 Monorepo 工作空间，然后对其进行扩展，比如：增加 Angular 项目、增加 React 项目，增加公共模块等，有了 Monorepo，我们就可以将自己组织的所有项目代码统一到一个仓库里，共享同一套工作流，同一套规范，同一套公共基础库，大大地提升了团队协作和开发的效率。

如果觉得好用，不妨在你的组织尝试下吧！

<EditInfo time="2021年06月07日 08:23" title="阅读 1823 ·  点赞 17 ·  评论 1 ·  收藏9" />
