# 2024年终总结：5000 Star，10w 下载量，这是我交出的开源答卷

你好，我是 Kagol，个人公众号：`前端开源星球`。

2024年，我做前端开发工作满[10年](https://juejin.cn/post/7361700765763780643)啦！

这10年我一直在开发前线，做过电商项目、广告平台、项目管理系统等业务，目前主要专注于前端组件库建设和开源社区运营，OpenTiny 开源社区运营，Fluent Editor 和 Vue DevUI 作者，前端开源星球公众号运营者，热爱开源和写作，活跃于掘金、知乎、B站等社区，发表100多篇技术文章，有4个 Star 超千的开源项目。

我的 GitHub 主页（欢迎 Follow）：[https://github.com/kagol](https://github.com/kagol)

![](/assets/summary-2024-1.png)

2024年的三个关键字：`开源运营`、`创作分享`、`健康生活`。

## 关键字1：开源运营

我在2014年就开始在 GitHub 创建开源项目，从早期的使用开源、做一些玩具项目，到后面的参与开源，给开源项目提交 Issue、提交 PR，真正做开源运营是在2020年，到现在也有5年的经验了，先后运营过10多个开源项目，其中有4个 Star 数超过1000。也做过多次开源社区运营的分享，写过几篇开源运营的经验文章。

从2023年开始负责 OpenTiny 开源社区运营，打造了 TinyVue、TinyEngine 两款明星项目，其中 TinyEngine Star 数超过2000，TinyVue 的下载量超过8W，吸引了100多位社区共建者。

截止到2024年12月29日，[OpenTiny](https://github.com/opentiny) 开源社区累计 Star 数突破 `5000`🎉，陆续孵化了 [TinyVue](https://github.com/opentiny/tiny-vue)、[TinyEngine](https://github.com/opentiny/tiny-engine)、[TinyPro](https://github.com/opentiny/tiny-cli)、[TinyCharts](https://github.com/opentiny/tiny-charts)、[Fluent Editor](https://github.com/opentiny/fluent-editor) 等多个开源项目。

![](/assets/summary-2024-2.png)

[TinyCharts](https://opentiny.design/tiny-charts/) 是今年新开源的图表组件库，除了支持 ECharts 基础图表，还增加了[关系图引擎](https://opentiny.design/tiny-charts/FrameworkLifeCycle)，实现了跨框架节点、父子节点展开、拓扑布局、局部刷新等丰富的特性。关系图引擎主要用于实现复杂的关系图表，比如：思维导图、网格图、环形图、弧线图等。

[Fluent Editor](https://opentiny.github.io/fluent-editor/) 是今年新开源的富文本编辑器，基于 Quill 2.0，在 Quill 基础上扩展了表格、图片、文件上传、@提醒等丰富的模块和格式，功能强大、开箱即用。除了富文本常用功能之外，我们还支持截屏、可编辑公式、标题列表等 Fluent Editor 特有但实用的特性。

![](/assets/summary-2024-3.png)

除了新开源项目，我们也对 OpenTiny 的其他项目进行了大量的更新。

- [TinyVue](https://opentiny.design/tiny-vue/) 组件库提供了一套更符合现代审美的UI设计规范，并增加了 MindMap、FluentEditor、Sticky、Statistic、TreeSelect、VirtualScrollBox 等多个新组件，对文档也做了升级优化。
- [TinyEngine](https://opentiny.design/tiny-engine) 低代码引擎发布 v2.0 版本，优化开发体验的包引入与 CLI 工具，开创性的“洛书架构”，提供灵活的布局、画布切换，支持第三方组件库和任意语言出码等丰富的特性。
- [TinyPro Vue](https://opentiny.design/vue-pro/docs/quick-start) 后台管理模板发布 v1.1.0 版本，增加页签模式、多级菜单、NestJS 后端、细粒度权限管理和 Webpack/Vite/Rspack/Farm 多种构建工具支持等丰富的特性。由于增加了系统管理功能，之前配置路由和菜单需要修改代码，现在只需要在页面上点点点就能创建，非常便捷。

除了 OpenTiny 自身项目的持续更新和打磨，我们还与 [common-intellisense](https://github.com/Simon-He95/common-intellisense) 合作，通过 VSCode 插件方式扩展了 TinyVue 组件库的组件 API 提示功能，大大提升了 TinyVue 组件的使用体验，降低了小白用户的上手成本。

- [优化永不止步：TinyVue v3.20.0 正式发布，更美观的官网UI，更友好的文档搜索](https://juejin.cn/post/7445930510021656613)
- [TinyEngine低代码引擎2.0新特性介绍](https://juejin.cn/post/7441750518556426250)
- [OpenTiny HUICharts 正式开源发布，一个简单、易上手的图表组件库](https://juejin.cn/post/7399478677397225507)
- [Fluent Editor：一个基于 Quill 2.0 的富文本编辑器，功能强大、开箱即用！](https://juejin.cn/post/7403618336952418314)
- [TinyPro Vue v1.1.0 正式发布：增加细粒度权限管理、页签模式、多级菜单](https://juejin.cn/post/7441231659394433039)
- [common-intellisense：让你的 TinyVue 组件书写体验如德芙般丝滑！](https://juejin.cn/post/7394406366436753447)

开源数据（截止到2024年12月29日）：

| 指标 | TinyVue | TinyEngine | TinyCharts | FluentEditor |
| -- | -- | -- | -- | -- |
| PV/UV | 6768 / 1079  | 5808 / 659 | 348 / 67 | 2747 / 456 |
| Star | `1784` | `2099` | 73 | 187 |
| Fork | 273 | 318 | 24 | 29 |
| Clone | 207 / 44 | 154 / 27 | 5 / 5 | 205 / 46 |
| Download | `87277` | 984 | 3682 | `19875` |
| Issue | 165 / 388 | 55 / 194 | 2 / 0 | 20 / 39 |
| PR | 13 / 2121 | 36 / 600 | 1 / 104 | 3 / 111|
| Contributor | 79 | 32 | 11 | 8 |

## 关键字2：创作分享

做开源项目和在公司开发项目有很多不同，其中有一个很大的区别就是在公司开发项目，我们是不用操心运营的事情的，项目开发出来就行，有没有人用，谁在用，我们是不用关注的。

做开源项目，我们不仅要负责项目开发，还需要考虑开源项目的运营推广，毕竟如果只是我们自己用，就没必要开源了，开源还是希望有更多人用起来，有更多人参与进来一起共建的。

为了把 OpenTiny 的开源项目推广出去，今年我也参加了不少大会，认识了开源大佬，自己也做了一些演讲分享和直播，写了一些文章、录了几个视频教程。

印象最深的就是和 TinyVue 的小伙伴一起参加 VueConf 大会，见到了偶像尤大，还拍了合影、一起参加了晚宴。

另外就是参加体验技术大会，我自己做了一次线下分享：《创新引领，设计赋能，焕然一新的 TinyVue 组件库》，和小夕、狼叔等多位大佬面基和交流。

![](/assets/summary-2024-4.jpg)

并且还在 HDC 大会、OpenTiny 茶话会跟我们OpenTiny的贡献者、用户朋友们一起面基和交流，了解大家在使用和参与OpenTiny过程中的痛点，吸纳大家给我们提的建议，这不仅增进了我们之间的友谊，我为后续进一步的合作打下坚实的基础，也希望后续有更多机会与大家面对面交流和碰撞。

要把开源项目推广出去，一个最简单有效的方式就是写篇文章介绍下你的项目，它是做什么的，有什么优势，怎么快速使用等，今年一共发布了30篇技术和推广文章，主要发布在掘金和公众号，掘金大概有 6.5W 阅读，公众号大概 4.8W 阅读。

![](/assets/summary-2024-5.png)

除了文章，今年也尝试录了几个视频，发布到[B站](https://space.bilibili.com/397616336)了，欢迎大家关注，后续也会持续更新的。目前主要还是录制一些开源项目的使用教程，方便大家快速上手，后续大家有其他想看的技术内容，也可以在评论区留言。

![](/assets/summary-2024-6.png)

演讲分享和直播：

- 趣谈前端专访：[专访华为 OpenTiny 开源项目负责人 Kagol](https://mp.weixin.qq.com/s/FzcRjKclvZQ9V-xBSUMtmg)
- CSDN 直播：[《我的开源社区运营经验》](https://live.csdn.net/room/CSDNedu/gmu0WSvx/)
- Vue ShenZhen Meetup：[《OpenTiny 跨框架组件库实现原理解析》](https://www.bilibili.com/video/BV1Ys421T7Ns)
- 三层部门体验改进分享：《组件设计的艺术：易用和灵活的平衡》
- 体验技术大会线下分享：《创新引领，设计赋能，焕然一新的 TinyVue 组件库》
- CCF开源创新大赛直播

文章：

- 12k🔖123👍[重回铁王座！时隔5年！Quill 2.0 终于发布啦](https://juejin.cn/post/7361284455535755299)
- 8k🔖166👍[我可以写代码写到退休吗？记录我的10年前端技术之旅](https://juejin.cn/post/7361700765763780643)
- [手把手带你开发一个易用又灵活的 Carousel 组件](https://juejin.cn/post/7365813532469084212)
- 4.6k🔖36👍[Vue Vine：带给你全新的 Vue 书写体验！](https://juejin.cn/post/7399273700102635570)
- 6.8k🔖103👍[Monorepo：让你的项目脱胎换骨，既能代码复用，又能独立部署！](https://juejin.cn/post/7404777192704868362)
- 3.2k🔖35👍[Fluent Editor：一个基于 Quill 2.0 的富文本编辑器，功能强大、开箱即用！](https://juejin.cn/post/7403618336952418314)

深入浅出 Quill 富文本系列文章：
- [深入浅出 Quill 系列之使用篇1：Quill 基本使用和配置](https://juejin.cn/post/7325705832070021120)
- [深入浅出 Quill 系列之使用篇2：通过 Quill API 实现对编辑器内容的完全控制](https://juejin.cn/post/7325979519478218752)
- [深入浅出 Quill 系列之原理篇1：现代富文本编辑器 Quill 的模块化机制](https://juejin.cn/post/7326814224330604544)
- [深入浅出 Quill 系列之原理篇2：现代富文本编辑器 Quill 的内容渲染机制](https://juejin.cn/post/7326978201006555173)
- [深入浅出 Quill 系列之实践篇1：如何将龙插入到编辑器中？](https://juejin.cn/post/7327467832866455578)
- [深入浅出 Quill 系列之实践篇2：整个贪吃蛇游戏到编辑器里玩儿吧](https://juejin.cn/post/7328292293915344946)
- [深入浅出 Quill 系列之选型篇：Quill 富文本编辑器的实践](https://juejin.cn/post/7332665033798762496)

视频：

- 2.5k🔖35👍[TinyPro Vue：一行命令创建一个美观大气的中后台系统，项目初始化和前后端启动指南](https://www.bilibili.com/video/BV1SUBRYGECg/)
- [Fluent Editor：一个基于 Quill 2.0 的富文本编辑器，功能强大，开箱即用！](https://www.bilibili.com/video/BV1HUWMe1ECA)
- [common-intellisense：拥有这款 VSCode 插件，让你的 TinyVue 组件书写体验更丝滑！](https://www.bilibili.com/video/BV1sDvDeeE3m/)

## 关键字3：健康生活

大家都追求幸福美好的生活，其中很关键的一点是保持身心健康，距离得新冠已经过了2年了，我依然记得当时卧床不起，啥事也做不了的情形，感叹疾病对人的影响。

早睡早起，坚持锻炼，保持健康的生活方式，提升免疫力，尽可能远离疾病，这才是长远之计。

去年主要是跑步，锻炼心肺能力，今年开始在健身房撸铁，锻炼核心和下肢力量。

另外还和小伙伴们一起参加了深圳鲲鹏径 200KM 徒步活动，一共20段，目前已经完成了14段，并拿到了奖牌。

![](/assets/summary-2024-7.png)

除了锻炼，今年还读了几本书，书籍凝聚了大量前人和专业人士的经验，不仅能拓宽我们的视野，也能促进我们反思自我，让我们少走一些弯路。

我觉得不一定要从头到尾把书看完，也不一定看完就一定要记住书里的全部内容，书中有一部分观点对自己有触动，让自己有收获就行。

《福格行为模型》这本书里面讲了很多内容，我就记住了行为发生一个要素，就是要有提醒，最好是自然的提醒，比如我每次中午热饭的时候，就会想到要去锻炼5-10分钟，不需要人、不需要闹钟提醒，热饭这种动作本身就是最好的提醒。这个观点对我很有触动，我照着这个去实践，养成了健身的习惯。

<EditInfo time="2024-12-30 07:41" title="275689展现 · 6541阅读 · 64点赞 · 22评论 · 46收藏" />
