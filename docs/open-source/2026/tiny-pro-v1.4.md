# 🎉TinyPro v1.4.0 正式发布：支持 Spring Boot、移动端适配、新增卡片列表和高级表单页面

你好，我是 Kagol，个人公众号：`前端开源星球`。

TinyPro 是一个基于 TinyVue 打造的前后端分离的后台管理系统，支持在线配置菜单、路由、国际化，支持页签模式、多级菜单，支持丰富的模板类型，支持多种构建工具，功能强大、开箱即用！

*   源码：<https://github.com/opentiny/tiny-pro/>（欢迎 Star ⭐）
*   官网：<https://opentiny.design/vue-pro/>

我们很高兴地宣布，2026年1月10日，TinyPro 正式发布 v1.4.0 版本，本次发布集中在扩展后端模板、增强移动端体验以及对 NestJS 后端功能的实用增强。

本次 v1.4.0 版本主要有以下重大变更：

*   增加 Spring Boot 后端
*   增强移动端适配
*   增加卡片列表和高级表单页面
*   支持多设备登录
*   支持配置预览模式

你可以更新 `@opentiny/tiny-toolkit-pro@1.4.0` 进行体验！

```bash
tiny install @opentiny/tiny-toolkit-pro@1.4.0
```

详细的 Release Notes 请参考：<https://github.com/opentiny/tiny-pro/releases/tag/v1.4.0>

## 1 支持 Spring Boot 后端

之前只有 NestJS 后端，有不少开发者提出需要 Java 版本后端，大家的需求必须安排，所以本次版本新增对 Spring Boot 的支持，使得偏 Java / Spring 的团队可以更快速地用熟悉的后端框架搭建 TinyPro 全栈样板。

该支持包括 Docker 化示例、配置覆盖示例（application.yaml 覆写示例）以及针对 deploy 的说明，便于在容器化环境中直接部署或做二次开发。

如果你或团队偏向 Java 技术栈，这次更新显著降低了启动成本与集成难度。

详细使用指南请参考文档：[Spring Boot 后端开发指南](https://opentiny.design/vue-pro/docs/advanced/back-end-guide-spring-boot)

## 2 移动端响应式与布局优化

本次引入移动端适配方案，包含布局调整、样式优化和若干移动交互逻辑改进。配套增加了端到端测试（E2E），保证常见移动场景（小屏导航、侧边栏收起、页签/页面切换）行为稳定。

适配覆盖了常见断点，页面在手机端的易用性和可读性有明显提升，适合需要同时兼顾桌面与移动管理后台的项目。

效果如下：

![移动端效果.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/13e4cf8e70244938a17acfc8753a504d~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240653&x-orig-sign=cVKGfmYthIuhM3YoJePrDZ%2Bqw7c%3D)

详细介绍请参考文档：[TinyPro 响应式适配指南](https://opentiny.design/vue-pro/docs/advanced/responsive-adaptation-guide)

## 3 增加卡片列表页面

之前列表页仅提供单一的查询表格形式，功能相对有限，难以满足日益多样化、复杂化的业务需求。为了提升用户体验、增强系统的灵活性，我们在原有基础上新增了一个卡片列表页面，以更直观、灵活的方式展示数据，满足不同场景下的使用需求。

体验地址：<https://opentiny.design/vue-pro/pages/list/card>

效果如下：

![卡片列表.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/16c758ee5fb44328854c01948cddd28e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240653&x-orig-sign=ihgrkWL6cgoFWtfiOhKs1uCR4AA%3D)

## 4 增加高级表单页面

表单页增加了高级表单，在普通表单基础上增加了表格整行输入功能。

体验地址：<https://opentiny.design/vue-pro/pages/form/advance>

效果如下：

![高级表单.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a86fcc8f660d445f8ebf35e2e30d46a1~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240653&x-orig-sign=sXie9n%2F8hW4d1ik3uUZJrPNCygg%3D)

## 5 支持多设备登录

之前只能同时一个设备登录，后面登录的用户会“挤”掉前面登录的用户，本次版本为账号登录引入设备限制（Device Limit）策略，可限制单账号并发活跃设备数，有助于减少滥用和提高安全性，适配企业安全合规需求。

可通过 `nestJs/.env` 中的 `DEVICE_LIMIT` 进行配置。

比如配置最多 2 人登录：

```bash
DEVICE_LIMIT=2
```

如果不想限制登录设备数，可以设置为 -1：

```bash
DEVICE_LIMIT=-1
```

## 6 演示模式

由于配置了 RejectRequestGuard，默认情况下，所有接口都只能读，不能写，要修改 NestJS 后端代码才能改成可写的模式（`nestJs/src/app.module.ts`）。

本次版本增加了演示模式的配置，可通过 `nestJs/.env` 中的 `PREVIEW_MODE` 进行配置。

`PREVIEW_MODE` 默认为 true, 会拒绝所有的增加、修改、删除操作，设置为 false，则变成可写模式。

```bash
PREVIEW_MODE=false
```

## 7 Redis 引入应用安装锁（redis app install lock）

主要用于避免重复安装或初始化时的竞态问题。

默认情况下，第一次运行 NestJS 后端，会生成 Redis 锁，后续重新运行 NestJS 后端，不会再更新 MySQL 数据库的数据。

如果你修改了默认的菜单配置（`nestJs/src/menu/init/menuData.ts`）或者国际化词条（`nestJs/locales.json`），希望重新初始化数据库，可以在开发机器 Redis 中运行 `FLUSHDB` 进行解锁，这样重新运行 NestJS 后端时，会重新初始化 MySQL 数据库的数据。

更多更新，请参考 Release Notes：<https://github.com/opentiny/tiny-pro/releases/tag/v1.4.0>

## 8 社区贡献

感谢所有为 v1.4.0 做出贡献的开发者！你们的辛勤付出让 TinyPro 变得更好！

*   [GaoNeng-wWw](https://github.com/GaoNeng-wWw)
*   [zhaoxiaofeng876](https://github.com/zhaoxiaofeng876)
*   [WangWant7](https://github.com/WangWant7)
*   [zzl12222](https://github.com/zzl12222)
*   [discreted66](https://github.com/discreted66)

> 注：排名不分先后。

<EditInfo time="2026-01-12 09:24" title="13968展现 · 281阅读 · 3点赞 · 0评论 · 1收藏" />