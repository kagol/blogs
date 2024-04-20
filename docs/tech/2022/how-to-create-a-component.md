# 如何在1分钟之内创建一个符合规范的组件

![image](https://user-images.githubusercontent.com/9566362/201380843-331e7438-966b-4f91-b31d-ed0ce5d83623.png)


[Vue DevUI](https://github.com/DevCloudFE/vue-devui)是一个社区共建的Vue3开源组件库，目前包含
- 185名贡献者(github+gitee)，田主群里有70位
- 73个组件，开放出去的有48个

目前`vue-devui`已经处于rc阶段，最新版本是`v1.0.0-rc.9`。

那么多人一起开发，如何确保一致性和避免冲突呢？

答案就是：
- 完善的`CLI命令行工具`
- 详细的贡献指南和`开发规范文档`
- 开放的、鼓励沟通和讨论的`社区氛围`

![开放.jpg](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8ed745dae7a34c1dba87afbff569d56c~tplv-k3u1fbpfcp-watermark.image?)

本文给大家介绍下我们的`DevUI CLI`命令行工具，如何在1分钟之内创建一个符合规范的DevUI组件。

# 一行命令创建组件目录结构

在`Vue DevUI`源码根目录下执行以下命令：
```shell
cd packages/devui-vue && pnpm cli:create
```

进入创建组件的交互式界面：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56ea394e2fcb49028bf841a2b915d40e~tplv-k3u1fbpfcp-watermark.image?)

第一个需要填写的是组件的名字(英文名)，比如我们想要创建一个Steps步骤条组件，就输入`steps`，这个名字会用于常见组件目录和相应的文件。

输入完按Enter进入下一个问题：输入组件的中文名，比如就叫`步骤条`，这个名字会用在组件的文档中。

输入完按Enter进入下一个问题，这次不是输入，而是选择一个组件的分类：
- 通用
- 导航
- 反馈
- 数据录入
- 数据展示
- 布局

通过键盘的方向键可以进行选择，比如选择`数据展示`。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92ed125920c34533b814af7f928fd200~tplv-k3u1fbpfcp-watermark.image?)

选择完按Enter进入选择组件包含的部件的界面，这是一个多选，选择步骤如下：
- 还是通过方向键选择
- 通过按空格键确认选择该选项（还可以按`a`多选、按`i`反选）
- 最后通过按Enter最终确认选择哪几项

我们只选择`component(组件)`即可。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cbea27751d2a40d3a15e0fcfd097bc3f~tplv-k3u1fbpfcp-watermark.image?)

选完按Enter，顺利的话，会提示Steps组件创建成功！

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4762051127c54723ad6001807c0ff464~tplv-k3u1fbpfcp-watermark.image?)

# 看看都创建了哪些文件

通过`git diff`命令，我们可以看到创建了两个目录，分别是组件源码和文档目录：
```shell
packages/devui-vue/devui/steps/          # 组件源码
packages/devui-vue/docs/components/steps # 组件文档
```

创建好的目录结构如下：
```shell
   ├── docs
   |  ├── components
   |  |  ├── steps
   |  |  |  └── index.md       # 组件文档
   ├── devui
   |  ├── steps
   |  |  ├── index.ts          # 组件入口文件
   |  |  ├── src               # 组件源码
   |  |  |  ├── steps-types.ts # 组件类型文件
   |  |  |  ├── steps.scss     # 组件样式文件
   |  |  |  └── steps.tsx      # 组件文件
   |  |  └── __tests__         # 组件单元测试
   |  |     └── steps.spec.tsx # 组件单元测试文件
```

组件目录和文件的组织、每个文件的命名、文件里面代码的组织等都遵循统一的开发规范，负责该组件的田主只需要基于这个目录结构进行组件功能和api的完善即可。

# 保障项目一致性的“秘密”

便捷的CLI命令行工具只是保障一致性的第一步，Vue DevUI 组件库还集成了`eslint`/`lslint`/`commitlint`等大量一致性检查的工具，最大限度保障从组件的api/demo设计、组件编码、组件文档、组件单元测试、代码提交等开发流程的一致性，并形成相应的配置文件和开发规范文档。

当然工具是死的，人才是最关键的，我们的田主来自全国各地，背景、经历各不相同，相同的是大家都是一群热爱开源、热爱学习、乐于讨论和协作的年轻人，大家都愿意为了让项目变得更好而使用工具和遵循规范，而且我们的工具和规范本身也是田主们一起讨论和实现出来的。

<EditInfo time="2022年06月07日 11:43" title="阅读 1080 ·  点赞 8 ·  评论 9 ·  收藏 6" />
