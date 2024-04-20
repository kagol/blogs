# 利用好 git bisect 这把利器，帮助你快速定位疑难 bug

![](/assets/git-bisect-1.png)

使用git bisect二分法定位问题的基本步骤：
1. git bisect start [最近的出错的commitid] [较远的正确的commitid]
2. 测试相应的功能
3. git bisect good 标记正确
4. 直到出现问题则 标记错误 git bisect bad
5. 提示的commitid就是导致问题的那次提交

## 问题描述

我们以[Vue DevUI](https://github.com/DevCloudFE/vue-devui)组件库的一个bug举例子🌰

`5d14c34b`这一次commit，执行`yarn build`报错，报错信息如下：

```
✓ building client + server bundles...
✖ rendering pages...
build error:
 ReferenceError: document is not defined
```

我可以确定的是上一次发版本（[d577ce4](https://github.com/DevCloudFE/vue-devui/commit/d577ce405bdf1a6bdd10ff9a44be3497aaea1911)）是可以build成功的。

## git bisect 简介

`git bisect`命令使用二分搜索算法来查找提交历史中的哪一次提交引入了错误。它几乎能让你闭着眼睛快速定位任何源码导致的问题，非常实用。

你只需要告诉这个命令一个包含该bug的坏`commit ID`和一个引入该bug之前的好`commit ID`，这个命令会用二分法在这两个提交之间选择一个中间的`commit ID`，切换到那个`commit ID`的代码，然后询问你这是好的`commit ID`还是坏的`commit ID`，你告诉它是好还是坏，然后它会不断缩小范围，直到找到那次引入bug的凶手`commit ID`。

这样我们就只需要分析那一次提交的代码，就能快速定位和解决这个bug（具体定位的时间取决于该次提交的代码量和你的经验），所以我们提交代码时一定要养成小批量提交的习惯，每次只提交一个小的独立功能，这样出问题了，定位起来会非常快。

接下来我就以[Vue DevUI](https://github.com/DevCloudFE/vue-devui)之前出现过的一个bug为例，详细介绍下如何使用`git bisect`这把利器。

## 定位过程

```
git bisect start 5d14c34b d577ce4
or
git bisect start HEAD d577ce4
```

其中`5d14c34b`这次是最近出现的有bug的提交，`d577ce4`这个是上一次发版本没问题的提交。

执行完启动`bisect`之后，马上就切到中间的一次提交啦，以下是打印结果：
```
kagol:vue-devui kagol$ git bisect start 5d14c34b d577ce4
Bisecting: 11 revisions left to test after this (roughly 4 steps)
[1cfafaaa58e03850e0c9ddc4246ae40d18b03d71] fix: read-tip icon样式泄露 (#54)
```

可以看到已经切到以下提交：
```
[1cfafaaa] fix: read-tip icon样式泄露 (#54)
```

执行命令：
```
yarn build
```

构建成功，所以标记下`good`：
```
git bisect good
```

```
kagol:vue-devui kagol$ git bisect good
Bisecting: 5 revisions left to test after this (roughly 3 steps)
[c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0] feat(drawer): add service model (#27)
```

标记万`good`，马上又通过二分法，切到了一次新的提交：
```
[c0c4cc1a] feat(drawer): add service model (#27)
```

再次执行`build`命令：
```
yarn build
```

build失败了，出现了我们最早遇到的报错：
```
✓ building client + server bundles...
✖ rendering pages...
build error:
 ReferenceError: document is not defined
```

标记下`bad`，再一次切到中间的提交：
```
kagol:vue-devui kagol$ git bisect bad
Bisecting: 2 revisions left to test after this (roughly 2 steps)
[86634fd8efd2b808811835e7cb7ca80bc2904795] feat: add scss preprocessor in docs && fix:(Toast)  single lifeMode bug in Toast 
```

以此类推，不断地验证、标记、验证、标记...最终会提示我们那一次提交导致了这次的bug，提交者、提交时间、提交message等信息。

```
kagol:vue-devui kagol$ git bisect good
c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0 is the first bad commit
commit c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0
Author: nif <lnzhangsong@163.com>
Date:   Sun Dec 26 21:37:05 2021 +0800

    feat(drawer): add service model (#27)
    
    * feat(drawer): add service model
    
    * docs(drawer): add service model demo
    
    * fix(drawer): remove 'console.log()'

 packages/devui-vue/devui/drawer/index.ts           |  7 +++--
 .../devui-vue/devui/drawer/src/drawer-service.ts   | 33 ++++++++++++++++++++++
 packages/devui-vue/devui/drawer/src/drawer.tsx     |  3 ++
 packages/devui-vue/docs/components/drawer/index.md | 29 +++++++++++++++++++
 4 files changed, 69 insertions(+), 3 deletions(-)
 create mode 100644 packages/devui-vue/devui/drawer/src/drawer-service.ts
```

最终定位到出问题的commit：
```
c0c4cc1a is the first bad commit
```

[https://github.com/DevCloudFE/vue-devui/commit/c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0](https://github.com/DevCloudFE/vue-devui/commit/c0c4cc1a25c5c6967b85100ee8ac636d90eff4b0)

整个定位过程几乎是机械的操作，不需要了解项目源码，不需要了解最近谁提交了什么内容，只需要无脑地：验证、标记、验证、标记，最后git会告诉我们那一次提交出错。

这么香的工具，赶紧来试试吧！

## 问题分析

直到哪个commit出问题了，定位起来范围就小了很多。

如果平时提交代码又能很好地遵循小颗粒提交的话，bug呼之欲出。

这里必须表扬下我们DevUI的田主（Contributor）们，他们都养成了小颗粒提交的习惯，这次导致bug的提交`c0c4cc1a`，只提交了4个文件，涉及70多行代码。

![](/assets/git-bisect-2.png)

我们在其中搜索下`document`关键字，发现了两处，都在`drawer-service.ts`整个文件中：

一处是12行的：
```ts
static $body: HTMLElement | null = document.body
```

另一处是17行的：
```ts
this.$div = document.createElement('div')
```

![](/assets/git-bisect-3.png)

最终发现罪魁祸首就是12行的代码！

破案！

此处@lnzhangsong我们的田主，有空麻烦修下这个bug。


![](/assets/git-bisect-4.png)


<EditInfo time="2021年12月27日 23:49" title="阅读 4606 ·  点赞 84 ·  评论 24 ·  收藏 66" />
