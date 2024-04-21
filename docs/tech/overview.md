# 前端10年：我的前端技术之旅

2013年7月毕业至今，从事前端开发整整十年，这篇文章是对我职业生涯的一次回顾，这次回顾颇有感概，不仅回顾了之前工作的公司、同事，也看了一遍之前写的代码、写的文章，还有以前看的技术书的笔记。

本文就以技术栈为线，把这十年的前端经历串起来，一来让读者一窥这十年前端发展的历程，二来也希望通过分享我个人的经历，给技术人一点信心和方向，原来一直做技术也可以做十年，马上我也35岁了，希望我能打破程序员只能干到35岁的魔咒，40岁、50岁，我依然会写代码，这不仅仅是我的赖以谋生的手段，更是一种生活方式，通过写代码我认识了很多志同道合的朋友，在写代码的路上，我也在欣赏和探索这个世界。

## jQuery

关键词：`jQuery`、`全栈`

我的第一份前端工作，在一家电商创业公司，我主要做电商后台管理系统，使用的是 jQuery 技术，当时刚从学校出来，没有系统学习过前端知识，于是买了两本书📚。

- [《JavaScript 高级程序设计（第3版）》](https://book.douban.com/subject/10546125/)（作者：[美] Nicholas C. Zakas，豆瓣评分 9.2，这本书现在已经出了第4版）
- [《锋利的 jQuery（第2版）》](https://book.douban.com/subject/10792216/)（作者：单东林，豆瓣评分 8.3）

<img src="/assets/tech-overview-1.png" alt="JavaScript+jQuery" width="688" />

每天利用上下班坐公交时间（当时每天上下班的通勤时间长达3个小时）疯狂阅读，很快就掌握了 JavaScript + jQuery 技术，加上导师的耐心指导，很快就能在工作中运用自如。

jQuery 写出来的代码大致如下：

```js
$('input[type="button"]').eq(0).click(function() {
  // 点击事件的逻辑
}).end().eq(1).click(function() {
  $('input[type="button"]:eq(0)').trigger('click');
}).end().eq(2).toggle(function() {
  $('.menu-item').hide('slow');
}, function() {
  $('.menu-item').show('slow');
});
```

jQuery 简化了DOM操作，并且采用链式调用的语法，在众多 JS 库中脱颖而出，从2006年开始到2016年，引领了前端近十年。

除了电商后台管理系统，我还用 jQuery 开发了一个 FAQ 系统，这个系统也是我的第一个全栈项目，从产品到开发，从前端到后台，从开发和运维，都是我一个人负责的。

- 前端基于 jQuery + page.js 技术栈
- 后台基于 Express + MongoDB
- 内容管理平台基于 MediaWiki

也是在这个阶段接触了 Linux、MongoDB、Node.js 等全栈技术。

当时写了几篇总结文章：

- [如何将 MongoDB 数据库的数据迁移到 MySQL 数据库中](/tech/2016/mongodb-to-mysql)
- [Linux 下服务器环境的搭建和配置之一 —— Apache 篇](/tech/2016/linux-apache)
- [Node 使用 Mongoose 操作 MongoDB 数据库 —— 增删改查的实现](/tech/2016/nodejs-mongoose)
- [2016 腾讯"创益24小时"互联网公益创新大赛总结](/tech/2016/summary-create-public-welfare-24-hour)

## Angular.js

关键词：`Angular.js`、`MVVM`、`工程化`

大约在2015年，公司开发新的 B2B 搭配管理系统，想着有没有什么新框架可以用，就去搜索了一下，发现了 `Angular.js` 这个当时还算比较火的前端框架。

`jQuery` 是通过便捷的选择器、链式操作等简化了 DOM 操作，而 Angular.js 则是一种新的前端开发模式：`MVVM`，不直接操作 DOM，开发者写代码时操作的是数据，框架将数据绑定到视图（DOM），数据变化，视图跟着变化。

目前最流行的三大框架：`Vue`、`React`、`Angular` 都是类似的模式，其中 Angular 是最早出现的，在 2009 年就已经有了 Angular.js，对比之下，Vue 和 React 最早是 2013 年发布的。

为了系统地学习 Angular.js，我又买了一本书📖（我是有多喜欢看书😋）。

- [《精通 AngularJS》](https://book.douban.com/subject/26022847/)（作者：Pawel Kozlowski / Peter Bacon Darwin，豆瓣评分 8.6）

<img src="/assets/tech-overview-2.jpeg" alt="精通Angular.js" width="400" />

Angular.js 写出来的代码大致是这样的：

hello-world.html

```html
<div class="hello-world">
  {{vm.greeting}}
</div>
```

hello-world.js

```js
module.exports = function(ngModule) {
  ngModule.directive('helloWorld', helloWorldFn); // 定义指令，对应页面中的 <hello-world></hello-world>
  require('./hello-world.scss');
  function helloWorldFn() {
    return {
      restrict: 'E', // 元素(element)
      scope: {},
      template: require('./hello-world.html'),// 模板
      controllerAs: 'vm', // <=> $scope.vm = {greeting: '你好，我是卡哥'}
      controller: function () {
        this.greeting = '你好，我是卡哥，很高兴见到你';
      }
    }
  }
}
```

当我们修改了 greeting 这个变量，视图中对应使用了这个变量的部分也会跟着变化，Angular.js 可以理解为 Angular 1.0 版本，和我们现在用的 Angular 2+ 版本的写法有巨大的差异，后面我们会看到 Angular 2+ 版本的写法比较接近现在三大框架的写法。

除了开发 B2B 搭配管理系统，我还用 Angular.js 开发了马来支付客服系统，也是在开发这个项目的过程中，接触了 Webpack 构建工具这些前端工程化的东西。

当时是 2015 年底，我已经从原来的电商创业公司离职，来到了腾讯，当时的 Webpack 官网还是一个很简陋的 http 域名的网站：[http://webpack.github.io/](http://webpack.github.io/)（现在是：[https://webpack.js.org/](https://webpack.js.org/)），可以说是看着 Webpack 不断发展壮大的😝。

我尝试用 Webpack 打包 Angular.js 项目成功，并写了一篇总结文章。

- [Webpack 入门 —— 使用 Webpack 打包 Angular 项目的一个例子](/tech/2016/getting-started-with-webpack)（发布于 2016 年 1 月）
- [使用 Angular 构建 SPA 单页面应用](/tech/2016/angular-spa)

除了 Angular.js 这个 MVVM 框架之外，当时团队有项目使用的是 Backbone.js 项目，所以也学过几个月 Backbone.js（也是当时流行的 MVC 框架之一），写了一篇总结文章。

- [Backbone 入门](/tech/2016/getting-started-with-backbone)

除了上面提到的 jQuery、Angular.js、Backbone.js，这个阶段其实还有不少前端库和前端框架，比如：Bootstrap、Riot.js、YUI、Kissy 等，当然 React、Vue 也开始出现，只是还不是很火，大部分前端还是用 jQuery。

## React

关键词：`React`、`组件化`、`研发全流程`

2016年开始在腾讯做海外广告平台，用的是 React 技术栈，当时还是 React v0.x 的版本，后面才升级到 React 15。

这是我参与的第一个中型商用项目，从一开始负责效果数据子模块，到后面负责整体广告平台的前端。

- 使用 Redux Form 实现广告表单的管理
- 使用 React Dropzone 实现广告图片、音视频素材的上传和管理
- 使用 PhantomJS 实现广告报表的生成
- 使用 html2canvas + jspdf 实现 PDF 格式报表的生成和下载

除了深入学习了 React 这个前端框架，也学习如何与产品、设计、测试、后台等团队其他角色的同事打交道，甚至与跨部门的同事沟通，学习了如何从0到1开发一个新产品。

从 jQuery 到 Angular.js，再到 React，让我对前端开发的模式有了更全面的认识，与 Webpack 的深度结合，也加深了我对前端工程化的认识。

特别是 React 组件化的思想，以及我在海外广告平台中的实践，让我形成了自己的组件设计理论，并写了一篇总结文章。

- [前端开发的积木理论——像搭积木一样做前端开发](/tech/2019/building-block-theory)（发布于 2019 年 1月）

这也是我第一次接触前端组件库，当时团队并没有自己的组件库，用的是 Ant Design，当时市面上的 UI 组件库其实并不多，我印象比较深的就是 Material UI 和 Ant Design。

当时团队的技术大佬一直想自建组件库，只是由于领导是后台出身，对前端没有那么重视，导致没有足够的资源做这件事。

不过我们还是私下在做，而且我也为这个组件库贡献了几个组件，写了几篇组件设计的文章。

- [日期选择组件的设计](https://www.cnblogs.com/kagol/p/7608889.html)
- [DatePicker 日期选择组件的实现](/tech/2019/date-picker-component)

React 代码大致是以下样子。

```js
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Router, hashHistory as history } from 'react-router';
import { Provider } from 'react-redux';

import routes from './routes';
import configureStore from './configureStore';

import './theme.scss';

const store = configureStore();
const rootElement = document.getElementById('root');

class App extends Component {
	render() {
    return (
      <Provider store={store}>
        <Router history={history} routes={routes} />
      </Provider>
    );
  }
}

render(<App />, rootElement);
```

可以看到 React 的代码已经是组件化的写法，和我们现在用三大框架写的代码比较接近。

除了 React，当时还接触了 ECharts、Nginx、PHP 的 CI 框架等技术，总结了一些技术文章（请叫我总结大师😎）。

- [由一个 bug 引发的对层叠上下文和 z-index 属性的深度思考](/tech/2017/thinking-z-index)
- [浏览器内部工作原理](/tech/2017/how-browser-works)
- [Nginx 配置 HTTPS](/tech/2018/nginx-https)
- [实现复杂状态机的一种思路](/tech/2019/a-way-to-realize-complex-state-machine)
- [层叠上下文和 z-index 属性使用不当引发的文本被遮挡的问题](https://www.cnblogs.com/kagol/p/10283180.html)
- [CI 框架的 post 方法对 url 做了防 xss 攻击的处理引发的文件编码错误](https://www.cnblogs.com/kagol/p/10283132.html)
- [Webpack 打包报 JavaScript 堆内存泄漏的错误](https://www.cnblogs.com/kagol/p/10283070.html)
- [Phantom 服务代码不健壮导致无法发送报表邮件](https://www.cnblogs.com/kagol/p/10283226.html)
- [FixedDataTable 表格数据渲染错误](https://www.cnblogs.com/kagol/p/10283267.html)

这个阶段我疯狂看各种技术书📚，在技术广度和深度上都有长足的进步。

- [《JavaScript设计模式与开发实践》](https://book.douban.com/subject/26382780/)（作者：曾探，豆瓣评分 9.0）
- [《你不知道的JavaScript》](https://book.douban.com/subject/25768396/)（作者：[美] Kyle Simpson，豆瓣评分 9.4）
- [《HTML5 Canvas核心技术》](https://book.douban.com/subject/25768396/)（作者：[美] David Geary，豆瓣评分 8.7）
- [《深入浅出Node.js》](https://book.douban.com/subject/25768396/)（作者：朴灵，豆瓣评分 8.5）

<img src="/assets/tech-overview-3.png" alt="Node.js" width="688" />

## Angular

关键词：`Angular`、`富文本`、`组件库建设`、`大型商用项目`、`开源运营`

时间来到了 2019 年，也就是新冠疫情爆发那年，我到了华为做 `EditorX` 富文本编辑器、`Ng DevUI` 组件库和 `ProjectMan` 大型商用项目。

- 独立负责 EditorX 富文本编辑器从 0 到 1 的技术选型、开发和维护，以 API 驱动的 Quill 为底座，扩展和增强了表格、图片、超链接、附件、粘贴板、快捷键等大量自定义 Blot 和模块。期间阅读了大量 Quill 的源码，沉淀了 7 篇相关的技术文章。
- 带领 4 人前端团队负责 DevCloud 三大商用项目 ProjectMan 敏捷项目管理系统、XBoard 看板项目管理系统、Wiki 知识管理系统的交付和运维。一年多时间里，高效高质量完成看板责任人视图、项目空间等多个大特性的交付，完成多个子服务、子模块的性能优化和重构， 减少重复代码1万多行，性能分提升30%，完成 Region 合并、CloudScope 迁移、新环境开局等多个重大运维事务，没有出现过 P3 及以上的事件单。
- 独立负责 DevUI 组件库的开源运营，一年半时间内，Github star 数从不到 60 增长到 1000，组件库官网日 PV 最高达到 20000，官方微信群人数从 0 增长到 320。
- 带领社区开发者从 0 到 1 实现 Vue DevUI 开源组件库，遵循 DevUI Design 设计规范，基于 Vue3 + TypeScript + JSX + VitePress + Vite 技术栈，使用 Vite 脚手架搭建了包含 Jest 单元测试、ESLint、StyleLint、ls-lint、 CommitLint 等规范的基本框架。一年时间内，招募了 200 多位开发者，活跃贡献者 30 多位，完成 50 多个组件，收获 1200 多 Star。

Angular 代码大致以下样子。

app.module.ts

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberListModule } from '@component/member-list/member-list.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MemberListModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

app.component.html

```html
<div class="flex flex-col justify-between h-screen">
  <app-header class="sticky top-0 z-10"></app-header>

  <div class="devcloud-main flex justify-center flex-grow bg-light-gray">
    <div class="flex max-w-1640px mt-10">
      <nav class="w-316px mr-10">
        <app-bonus
          dStepsGuide
          dStepsGuidePosition="bottom"
          pageName="step-bonus"
          [steps]="steps"
          [stepIndex]="2"
          [observerDom]="observerDom"
          (operateChange)="operateChange($event)"
        ></app-bonus>
        <app-group></app-group>
        <app-custom-group></app-custom-group>
      </nav>
      <div class="main-content">
        <app-main-content-head></app-main-content-head>
        <app-operation-bar></app-operation-bar>
        <app-project-list></app-project-list>
      </div>
    </div>
  </div>

  <app-footer></app-footer>
</div>

<router-outlet></router-outlet>
```

app.component.ts

```ts
import { Component, OnInit } from '@angular/core';
import { StepsGuideService } from 'ng-devui';
import { STEPS_BONUS, STEPS_CATEGORY_SEARCH } from './shared/const';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'devcloud-portal';
  steps = STEPS_BONUS;
  observerDom;

  constructor(
    private stepService: StepsGuideService,
  ) {}

  ngOnInit(): void {
    this.observerDom = document.querySelector('.main-content');
  }

  operateChange({ clickType, currentIndex }): void {
    if (clickType === 'prev' && currentIndex === 0) {
      localStorage.removeItem('devui_guide_step-category-search');
      this.stepService.setSteps(STEPS_CATEGORY_SEARCH);
      this.stepService.setCurrentIndex(1);
      return;
    }
  }
}
```

Angular 是一款能够跨 Web、移动 Web、移动应用、原生应用和桌面原生应用多个平台的前端框架，目前经过数十年的发展，已形成了一个庞大的生态，基于 Angular 的生态项目也是多如牛毛。

它不仅仅是一个视图层，更是一个全能的前端框架，MVVM 架构、依赖注入、CLI、模块、组件、指令、服务、路由、管道、表单管理、SSR，几乎提供了前端应用开发的全套工具，这么庞大的工具，也让部分前端开发者觉得入门门槛太高，因此国内用 Angular 的前端开发者并不多，反而由于 Angular 的类和装饰器写法和 Java 比较类似，受不少后端开发着的青睐。

这个阶段看书比较少，写文章比较多。

- [《深入理解ES6》](https://book.douban.com/subject/27072230/)（作者：[美] Nicholas C. Zakas，豆瓣评分 9.3）

<img src="/assets/tech-overview-4.jpeg" alt="深入理解ES6" width="400" />

从 2020 年 3 月到 2022 年 9 月，一共写了 80 多篇文章，覆盖 `Angular`、`Vue`、`TypeScript`、`富文本编辑器`、`组件库建设`、`Git`、`Monorepo`、`DevOps`、`性能分析`、`单元测试`、`开源社区运营`等众多领域。

Vue：

- [点线面 Vue3：先跑起来再说！](/tech/2021/getting-started-with-vue)
- [点线面 Vue3：把模板语法这条线串起来！](/tech/2021/vue3-template-syntax)
- [前端 Vuer，请收下这份《Vue3 中使用JSX简明语法》](/tech/2022/jsx-concise-syntax-in-vue3)

组件库建设：

前端开发的积木理论与实践（共 5 篇）

- [前端开发的积木理论——像搭积木一样做前端开发](/tech/2019/building-block-theory)
- [用积木理论设计一个灵活好用的 Carousel 走马灯组件](/tech/2022/carousel-component)
- [CarouseIndicator 组件应用：0 行 JS 代码实现好看的手风琴式折叠卡片效果](/tech/2022/carousel-indicator-component)
- [用积木理论设计的 Carousel 组件都有哪些有趣的玩法？](/tech/2022/carousel-component)
- [DatePicker 日期选择组件的实现](/tech/2019/date-picker-component)

从0到1搭建Vue组件库（共 12 篇）

- [从0到1搭建Vue组件库01：提交我的第一次 PR](/tech/2021/0-to-1-build-vue-component-library-1)
- [从0到1搭建Vue组件库02：实现一个能渲染多层节点的 Tree 组件](/tech/2021/0-to-1-build-vue-component-library-2)
- [从0到1搭建Vue组件库03：如何给 tree 组件增加展开/收起功能](/tech/2021/0-to-1-build-vue-component-library-3)
- [从0到1搭建Vue组件库04：使用 Vite 搭建一个支持 TypeScript / JSX 的 Vue3 组件库工程](/tech/2021/0-to-1-build-vue-component-library-4)
- [从0到1搭建Vue组件库05：给 Vue3 组件库添加 VitePress 文档系统](/tech/2021/0-to-1-build-vue-component-library-5)
- [从0到1搭建Vue组件库06：手把手带你开发一个脚手架](/tech/2021/0-to-1-build-vue-component-library-6)
- [从0到1搭建Vue组件库07：给组件库项目增加单元测试](/tech/2021/0-to-1-build-vue-component-library-7)
- [从0到1搭建Vue组件库08：阶段性小结](/tech/2021/0-to-1-build-vue-component-library-8)
- [从0到1搭建Vue组件库09：Monorepo 改造](/tech/2021/0-to-1-build-vue-component-library-9)
- [从0到1搭建Vue组件库10：如何实现组件的按需打包📦](/tech/2021/0-to-1-build-vue-component-library-10)
- [从0到1搭建Vue组件库11：实现 Tree 组件禁止展开/收起、点选高亮和节点禁用功能](/tech/2021/0-to-1-build-vue-component-library-11)
- [从0到1搭建Vue组件库12：实现 Tree 组件自定义图标和节点勾选功能](/tech/2021/0-to-1-build-vue-component-library-12)

其他组件设计相关的文章：

- [手把手教你使用 Vue / React / Angular 三大框架开发 Pagination 分页组件](/tech/2020/develop-pagination-component-using-vue-react-angular)
- [从 CDK Tree 源码学习如何开发一个 UI 无关的 Tree 组件](/tech/2022/cdk-tree)

富文本编辑器：

- [现代富文本编辑器Quill的模块化机制](/tech/2020/quill-modularization-principle)
- [现代富文本编辑器Quill的内容渲染机制](/tech/2020/quill-rendering-principle)
- [Quill 富文本编辑器的实践](/tech/2021/quill-practice)
- [如何将龙插入到编辑器中？](/tech/2021/rich-text-editor-insert-dragon)
- [今天是儿童节，整个贪吃蛇到编辑器里玩儿吧](/tech/2021/rich-text-editor-insert-snake-game)
- [深入浅出Quill：Quill基本使用和配置](/tech/2021/quill-basic)
- [深入浅出Quill：通过 Quill API 实现对编辑器内容的完全控制](/tech/2021/quill-api)

也是从这个阶段开始接触开源社区运营，这是一项我非常热爱的事情，虽然是业余时间在做，但我依然付出了大量时间和精力，我觉得这是一件很有价值的事情，对我自身成长也很有益。

做开源开发和在公司做业务开发有一个很大的差别就是，我不仅要负责项目架构演进和代码开发，还要负责项目的推广和运营，为项目吸引用户，为社区吸引贡献者参与共建，这让我得以接触到一个更广阔的开发者社区，认识很多优秀和勤奋的开发者，他们和我一样，是一群热爱技术、热爱生活的人。

据 GitHub 官方统计，从2016年开始，Github 平台每年平均新增1000多万开发者、5000多万开源项目，且增幅呈现逐年递增的趋势。而中国的开发者参与开源的热情更是超过其他国家，不管是开发者还是开源项目的增长速度，中国都是名列前茅，2021年中国共有755万 GitHub 开发者，全球排名第二。

我国在“十四五”规划中首次把开源纳入顶层设计, 从国家层面体现了对开源的重视，国内的华为、腾讯、阿里等多家大厂也都将开源作为公司战略的一部分，国内外开源呈现一片繁荣的景象，我相信开源的春天马上要来了，这是大趋所势。

因此在技术之外，我专门开设了一个[开源](/open-source/overview)专栏，希望自己在开源运营领域有更多积累和沉淀。

## Vue

关键词：`Vue`、`跨框架组件库建设`、`团队管理`

2022年9月，我加入了华为云云岭团队，负责 TinyVue 跨端跨框架组件库建设和 OpenTiny 开源社区运营。

技术栈也从 Angular 转到 Vue。

相比 Angular，Vue 在国内的使用者更多，社区更加活跃，不管在掘金、知乎、思否等国内技术社区，Vue 的关注者、文章数、讨论数都比 Angular 高，Vue 相关视频在B站的播放量和评论数总体上也比 Angular 高。

我在 2021 年就已经创建过一个 Vue3 的开源组件库项目，结识了一群 Vue 开发者朋友，因此可以平滑过渡到 TinyVue，TinyVue 和一般的 Vue 组件库不同的是，它是一个跨端、跨框架的组件库，底层将组件逻辑抽离成框架无关的 renderless，基于 renderless 实现 PC / Mobile 多端适配，实现一套代码同时支持 Vue2 / Vue3，近期我们也在基于 renderless 实现 React 版本，已经取得了初步的成果。

Vue 的代码大致如下样子。

main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'
import TinyVue from '@opentiny/vue'
import './style.css'

const app = createApp(App)
app.use(TinyVue).mount('#app')
```

App.vue

```vue
<script setup lang="ts">
import { ref, getCurrentInstance, version, watch, onMounted, Ref } from 'vue'
import {
  Button as TinyButton,
  Alert as TinyAlert
} from '@opentiny/vue'
import { IconAdd } from '@opentiny/vue-icon'

const vueVersion = getCurrentInstance().appContext.app.version
const ipValue = ref('192.168.0.1')
const helloRef = ref<IMethod>()

const clickEvent = () => {
  Modal.alert('基本提示框', '标题')
}

watch(ipValue, (newVal) => {
  if (newVal === '0.5.1.2') {
    Notify({ message: '验证成功'})
  }
})

onMounted(() => {
  const str = helloRef.value?.myMethod('test', 30)
})
</script>

<template>
  <tiny-button type="primary">TinyVue</tiny-button>
  <tiny-alert size="large" description="TinyVue"></tiny-alert>

  <tiny-time-line :data="data" :active="active">
    <template #top="data">
      <div style="text-align: center">{{ data.slotScope.name }}</div>
      <div style="text-align: center">
        <tiny-tag v-for="item in data.slotScope.technical">{{ item }}</tiny-tag>
      </div>
      <div style="text-align: center">
        <tiny-tag v-for="item in data.slotScope.project">{{ item }}</tiny-tag>
      </div>
    </template>
    <template #bottom="data">
      <p>{{ data.slotScope.time }}</p>
    </template>
  </tiny-time-line>

  <tiny-tabs
    class="my-tabs"
    tab-style="card"
    :editable="false"
    :with-add="true"
    @add="handleadd"
    show-more-tabs
  >
    <tiny-tab-item
      :key="item.name"
      v-for="item in Tabs"
      :title="item.title"
      :name="item.name"
    >
      {{ item.content }}
    </tiny-tab-item>
  </tiny-tabs>
</template>

<style scoped lang="scss">
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}

.my-tabs ::v-deep .tiny-tabs__header {
  justify-content: flex-start;
}
</style>
```

这个阶段最主要的任务是打造 OpenTiny 开源项目的内外部影响力，让 OpenTiny 成为受开发者欢迎的组件库，并建设一个受开发者喜爱、让开发者有所成长的开源社区。

技术上主要是深入 TinyVue 跨端跨框架组件库，实现 React 版本，并争取出一本相关的小册。

技术书籍方面：

- [《Vue.js 设计与实现》](https://book.douban.com/subject/35768338/)（作者：霍春阳，豆瓣评分 9.4）

<img src="/assets/tech-overview-5.jpeg" alt="Vue.js设计与实现" width="400" />

技术写作方面：

- [TypeScript 基础及在 Vue 中的实践](/tech/2023/typescript-vue)
- [前端 Vuer，请收好这份《Vue 组件单元测试》宝典，给自己多一些安全感](/tech/2023/unit-testing-guide-for-vue-components)
- [老板：你为什么要选择 Vue？](/tech/2022/why-did-you-choose-vue)

## 未来

未来，前端技术将持续发展和演进，我也将不断学习和探索新技术。

- 框架层面，[Svelte](https://svelte.dev/) / [Solid.js](https://www.solidjs.com/) / [Lit](https://lit.dev/)
- 新一代前端工程化、自动化工具
- 前端智能化，AI 在前端领域的应用
- 低代码，大幅提升前端应用构建效率

<EditInfo time="2023年7月20日" />
