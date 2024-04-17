# 立完flag，你可能需要对flag进行量化

![image](https://user-images.githubusercontent.com/9566362/201154182-6214a691-a122-4170-8fb6-46ce8c1661f4.png)

## 引言

当你的能力足够，并且获得领导的信任之后，很自然地就会去承担更大、更重要的责任，比如成为大中型业务的Owner。

大中型业务指的是该业务足够大，足够复杂，仅凭一己之力无法按要求交付版本，需要团队协作。

我们假设该业务一共12个人，其中角色分布如下（按产品研发流程排序）：

|角色|职责|成员数|
|---|---|---|
|产品经理|对接用户，是需求的来源|1|
|项目经理|管理项目进度，有节奏地进行版本交付|1|
|设计|负责UI交互和视觉，是用户体验的设计者|1|
|前端|前端用户界面和交互效果开发|3|
|后台|后台数据存储和接口开发|4|
|测试|负责版本质量|1|
|运维|负责现网部署|1|

如果你被分到该业务，成为前端Owner，你可能需要做些什么，以高效率、高质量地实现版本交付呢？

## 1 明确目标和职责

首先要了解组织和领导对你的期望，假设组织希望你能够改善该业务的交付质量，赢得用户口碑。

目标非常明确，就是提升`交付质量`，这个目标将牵引你未来一年的方向和行为，也是你超预期完成目标的前提。

有了目标之后，我们还需要去衡量它，这样才知道有没有提升，尽量寻找可以量化的指标。

这一块可以参考我们以前的文章：[《如何度量前端项目研发效率与质量》](https://juejin.cn/post/6844904095908626445)

## 2 交付质量的组成

质量代表的是好不好，问题越少就越好。

从产品侧来看，`缺陷率`和`JS错误率`都是非常不错的衡量指标。

从开发侧来看也有很多很好的衡量指标，比如：
- `重复率`
- `圈复杂度`
- `ESLint问题数`
- `巨石文件/方法数`

## 3 计算缺陷率

> 缺陷率=缺陷数/代码规模

缺陷也就是BUG，当我们开发完产品特性后，需要部署到测试环境，并提测，测试人员测试完，会提一堆BUG单，这些BUG的数量就是缺陷数。

代码规模可以用代码行数来表示，一般源码都放在工程根目录下的src目录中，可以使用[cloc](https://github.com/AlDanial/cloc)工具统计代码行数：

```
cloc src
```

如果要排除里面的某些目录，比如`__tests__`，可以加上`--exclude-dir`参数

```
cloc src --exclude-dir=__tests__
```

比如`html2canvas`库的代码行数：

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/97c93aa2e9724d58830b171b795f2525~tplv-k3u1fbpfcp-watermark.image)

有了缺陷数和代码规模，就可以计算缺陷率啦。

可以先统计下历史迭代的缺陷率，缺陷数可以通过查看`测试报告`获得，该版本增加的代码行数可以通过`Git提交记录`获得。

比如上一个`迭代1.2.6`，从`2020.12.14-2020.12.25`。

我们可以使用以下命令统计到新增的代码行数：

```

git log --after="2020-12-14 00:00:00" --before="2020-12-25 23:59:59" --pretty=tformat: --numstat | grep -v 'static' | awk '{ add += $1 ; subs += $2 ; loc += $1 - $2 } END { printf "增加行数:%s 删除行数:%s 变化总行数:%s\n",add,subs,loc }'
```

还是以html2canvas举栗子🌰

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/96eebc2e4eb7463fb1e387b244600ac4~tplv-k3u1fbpfcp-watermark.image)

假设通过查看测试报告，这段时间一共出了3个BUG，那么缺陷率就是：
> 缺陷率=缺陷数/代码规模=3/130=2.3%

也就是上个迭代的缺陷率为`2.3%`，我们可以多计算几个迭代，然后算个平均数，这样我们就知道以前这个业务的缺陷率水平大致如何。

这样你作为业务Owner，后续通过一系列举措，最后降低了这个指标，假设降低到`1.8%`，那么可以认为质量提升了：
> (2.3-1.8)/2.3=21.7%

## 4 监控JS错误率

第二个是JS错误率，就是监控现网用户访问页面时，是否有JS报错，如果有JS报错，很可能某些功能就可用。

我们没法在用户的现场，我们不知道用户使用我们产品的体验如何，他是否在使用过程中遇到了困难，这些我们没法直接知道。

但是JS报错给我们提供了一些了解这些信息的线索，假设某个时刻，现网出现了JS报错，我们或许就能复现这个报错，找到报错的原因，并在用户投诉之前及时修复这个缺陷。

可以说:
> 降低现网JS错误率就是在排除地雷，地雷越少，炸到的用户就越少，这对产品的用户口碑意义重大

这个指标需要通过前端监控平台采集，比如我们DevUI内部的Furion平台，它的计算公式如下：
> JS错误率=JS错误数/PV

也是先看下以往的现网JS错误率水平，假设是`6.2%`，你通过努力将这个指标降到`0.1%`，那么质量提升就是`98%`。

## 5 统计重复率

除了产品层面的质量衡量指标，我们还可以设定一些开发侧的质量指标。

重复率就是一个很不错的指标，如果项目里面重复的代码太多
- 一来我们的维护成本提高，一处变更，要改很多地方；
- 二来容易漏该某些地方，从来导致BUG。

> 重复代码是万恶之源

我们可以用[jscpd](https://github.com/kucherenko/jscpd)工具来统计前端代码的重复率：

```
jscpd src
```

以html2canvas为🌰

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18949f9409fb4d47a0e0448d71b64c18~tplv-k3u1fbpfcp-watermark.image)

它一共有14处重复代码，重复率为`1.71%`（算比较低的），jscpd命令还会列出每一处重复所在的文件以及所在的行/列。

我们要做的就是照着重复率报告，一处一处改掉即可，当然修改重复代码也要考虑可读性，不能为了消除重复，降低了代码的可读性。

假设改完之后，重复率降到`1.16%`，那么质量提升了`32%`。

## 6 计算圈复杂度

圈复杂度可以参考下我们之前的文章：[浅谈前端中的圈复杂度 ](https://juejin.cn/post/6844904161809580045)，这里就不赘述。


## 7 ESLint问题数清零

[ESLint](https://github.com/eslint/eslint)通过一些最佳实践的规范，来约束我们的代码，从而保障代码质量。

下图清晰地展示了ESLint的价值：

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/18ef0655bc654b62bd285d4d6bf9f1c1~tplv-k3u1fbpfcp-watermark.image)

- 如果你不使用ESLint，你的代码只能靠人工来检查，格式乱七八糟，运行起来bug丛生，你的合作者或用户会怒气冲冲；
- 如果你使用了ESLint，你的代码有可靠的机器进行检查，格式规则，运行起来问题会少很多，大家都会很满意。

如果项目中的代码没有遵循ESLint规则，那么就会产生一条ESLint错误或者提示，将这些ESLint问题修复，在一定程度上是可以提升代码质量的。

假设ESLint问题清零了，那么质量提升就是`100%`。

## 8 统计巨石文件/方法数

大而复杂的事物，我们理解起来一般更费劲，简洁的事物往往易于理解。

代码也是一样，简单的代码，我们一眼就知道它是做什么的，这样修改它就不容易出错。

如果一个文件包含几千行代码，或者一个方法包含几百行代码，里面分支众多，嵌套又深，那么我们就很难读懂它，修改它的时候总不免战战兢兢、如履薄冰，还容易出bug。

统计所有文件的代码行数，并按代码行数从大到小排序，可以使用之前提到的cloc工具：
```
cloc src --by-file
```

还是以html2canvas为🌰（只截取了代码行数大于100行的文件）

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3fe0c9ce4aea4b77a52725f54dff8bd3~tplv-k3u1fbpfcp-watermark.image)

一般一个文件的代码行数不要超过`300行`，超过300可能就需要进行适当的模块拆分，以增强代码的可读性和可维护性。

另外也要权衡下文件的嵌套深度，从根路径开始往下，一般不超过`7层`。

我目前没想到比较好的统计巨石方法的办法，只能去巨石文件里面找，找到超过`50行`的方法，我就会考虑重构。

大家有更好的办法欢迎推荐。

## 小结

我们做一个简单的小结，从产品侧来看，可以通过
- 缺陷率
- JS错误率
来衡量质量。

从开发侧来看，可以通过
- 重复率
- 圈复杂度
- ESLint问题数
- 巨石文件/方法
来衡量质量。

这些质量指标可以根据自己团队的特点和偏好，设定相应的权重，并最终计算出一个总的质量提升比率。

对目标进行量化之后，我们就可以撸起袖子开干了。

> 经过一段时间的努力，我们超预期完成了组织的目标，就可以拿着这些质量提升的量化指标去跟组织要年终奖和加薪啦！

## 加入我们

我们是DevUI团队，欢迎来这里和我们一起打造优雅高效的人机设计/研发体系。招聘邮箱：muyang2@huawei.com。

文/DevUI Kagol

往期文章推荐

[《如何度量前端项目研发效率与质量》](https://juejin.cn/post/6844904095908626445)

[《现在开始为你的Angular应用编写测试（二）》](https://juejin.cn/post/6909510287880093704)

[《🏆 DevUI × 掘金 | 技术人的2020》](https://juejin.cn/post/6904264934515802126)



<EditInfo time="2020年12月31日 13:00" title="阅读 1692 ·  点赞 26 ·  评论 1 ·  收藏 14" />