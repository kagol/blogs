# 2021 年最值得推荐的 7 个 Angular 前端组件库

Angular 是一款能够跨 Web、移动 Web、移动应用、原生应用和桌面原生应用多个平台的前端框架，经过数十年的发展，已形成了一个庞大的生态，基于 Angular 的组件库也是多如牛毛。

2021年如果你想尝试 Angular 框架，以下 Angular 组件库或许是不错的选择！

## 1. Material Design for Angular

![Material.png](/assets/angular-component-libraries-1.png)

首先要推荐的，当然是 Angular 官方的 [Material](https://material.angular.io/) 组件库，[Material Design](https://www.material.io/) 是 Google 的一套设计体系。

基于这套设计体系，官方和社区都提供了各种组件库，有 Web 端（[Angular](https://material.angular.io/)/[React](https://material-ui.com/)/[Vue](https://vuematerial.io/)）的，也有移动端（Android/iOS/Flutter）的。

其中 Angular 版本的 Material 组件库，现在已经是 Angular 官方指定的组件库，所以受众特别多，不管是在 Github 的 Star/Fork 数，还是在 NPM 的周下载量都是 TOP 1 的。

以下是2021年4月19日的数据：

|指标|数值|
|--|--|
|Star|[21.4k](https://github.com/angular/components)|
|Fork|5.7k|
|NPM周下载|[891,480](https://www.npmjs.com/package/@angular/material)|

[Material Design for Angular](https://github.com/angular/components)早在2016年3月份就发布了第一个基于Angular 2的Alpha版本：`2.0.0-alpha.0`，中间演进了一年多，迟迟没有发布2.0的正式版本，直到第二年12月才发布基于Angular 5的`5.0.0`正式版本。

不过 Material Design for Angular 却不是最早的 Angular 组件库，后面我们将要介绍的 PrimeNG 比它更早诞生，但 Material 毫无疑问是最流行和最受欢迎的。

## 2. NG/NGX Bootstrap

![NG Bootstrap.png](/assets/angular-component-libraries-2.png)

[Bootstrap](https://getbootstrap.com/) 是Twitter推出的一个用于前端开发的开源工具包，也是非常受欢迎的HTML/CSS/JS框架，用于开发响应式布局、移动设备优先的Web应用。

它有多受欢迎呢？我们看一组数据就知道了。

|框架/库|Star数|
|--|--|
|Vue|182k|
|React|167k|
|Bootstrap|149k|
|Angular|72.5k|

从以上数据可以看到，Bootstrap甚至比Angular框架的Star数还多，可见Bootstrap的受欢迎程度，因此基于Bootstrap的Angular组件库也很受欢迎就不难想象了。

基于Bootstrap的Angular组件库主要有两款：
- [NG Bootstrap](https://ng-bootstrap.github.io/)
- [NGX Bootstrap](https://valor-software.com/ngx-bootstrap)

NG Bootstrap 和 NGX Bootstrap 是两个不同的项目团队的两个不同的项目，它们都可以只使用Bootstrap无需使用jQuery就可以在Angular中使用。主要区别在于它们所支持的Bootstrap版本：
- NGX Bootstrap支持Bootstrap 3和4
- NG Bootstrap支持Bootstrap 4，并且需要Angular5+

从Github Star/Fork和NPM周下载量来看，它们也是相当的，NG Bootstrap似乎略占上风：

|指标|NG Bootstrap|NGX Bootstrap|
|--|--|--|
|Star|[7.7k](https://github.com/ng-bootstrap/ng-bootstrap)|[5.3k](https://github.com/valor-software/ngx-bootstrap)|
|Fork|1.4k|1.7k|
|NPM周下载|[386,485](https://www.npmjs.com/package/@ng-bootstrap/ng-bootstrap)|[235,662](https://www.npmjs.com/package/ngx-bootstrap)|

从版本发布时间来看，NGX Bootstrap则要早一些：

|指标|NG Bootstrap|NGX Bootstrap|
|--|--|--|
|首次发布版本|1.0.0-alpha.0 2016年7月|1.0.1-beta.2 2016年1月|
|第一个正式版本|1.0.0 2018年1月|1.0.4 2016年2月|

从以上数据可以看出，不管是首次发布版本还是第一个正式版本，NGX Bootstrap都比NG Bootstrap早些，特别是第一个正式版本的发布时间，NGX Bootstrap比NG Bootstrap早了整整两年。

因此我们可以大致了解，NGX Bootstrap是一个比较早的库，并且能支持Angular 2+和Bootstrap 3+，而NG Bootstrap则比较新，需要Angular 5+和Bootstrap 4+才能使用。

如果你的项目是一个使用Angular 5+和Bootstrap 4+的新项目，建议使用NG Bootstrap，否则就使用NGX Bootstrap。

## 3. NG Zorro

![NG Zorro.png](/assets/angular-component-libraries-3.png)

第三个要重点推荐的Angular组件库是基于[Ant Design](https://ant.design)设计体系的[NG Zorro](https://ng.ant.design/)组件库。

Ant Design 是蚂蚁金服的一门设计语言，经历过多年的迭代和积累，它对UI的设计思想已经成为一套事实标准，受到众多前端开发者及企业的追捧和喜爱，也是React开发者手中的神兵利器。

作为Ant Design的Angular实现，NG Zorro不仅继承了Ant Design的独到思想和极致体验，同时也结合了Angular框架的优点和特性。组件的风格与Ant Design最新版本保持同步，组件的接口也尽量保持与Ant Design的React版本一致。

说Zorro是国内最受欢迎的Angular组件库，相信没有人会反对。

2017年8月，Zorro正式[开源](https://zhuanlan.zhihu.com/p/28541910)并发布第一个版本：`0.5.0-rc.0`，经过一年的演进，于第二年6月发布1.0版本。

从知乎来看，Zorro的社区反响非常好：[https://www.zhihu.com/question/63992236](https://www.zhihu.com/question/63992236)

以下是2021年4月19日的数据：

|指标|数值|
|--|--|
|Star|[7.4k](https://github.com/NG-ZORRO/ng-zorro-antd)|
|Fork|2.6k|
|NPM周下载|[35,941](https://www.npmjs.com/package/ng-zorro-antd)|

## 4. Nebular

![Nebular.png](/assets/angular-component-libraries-4.png)

[Nebular](https://akveo.github.io/nebular) 是一个可定制的Angular UI库，基于[Eva Design](https://eva.design/)设计规范，包含40多个UI组件，4个可视主题，认证和安全模块。

Nebular包含的组件并不多，只有40+个，不过它包含了很多实用的工具，比如：主题包、登录认证、角色鉴权管理、Admin系统等。

有这方面需求的话，还是可以尝试的。

Nebular的发布时间和Zorro的很接近，都是17年8月份发布第一个版本，第二年发布第一个正式版本，不过从Github Star/Fork和NPM周下载量来看，Nebular稍微逊色一些：

|指标|数值|
|--|--|
|Star|[7k](https://github.com/akveo/nebular)|
|Fork|2.6k|
|NPM周下载|[17,037](https://www.npmjs.com/package/@nebular/theme)|

## 5. PrimeNG

![PrimeNG.png](/assets/angular-component-libraries-5.png)

接下来给大家推荐的[PrimeNG](https://www.primefaces.org/angular)也是一款国外的Angular组件库，这是一款老牌 Angular 组件库，2016年2月就发布了第一个版本，发布时间比官方的 Material 还早一些。

PrimeNG 的组件非常丰富，一共有90+个组件，可能是目前市面上最全的Angular组件库了。

以下是 PrimeNG 的数据：

|指标|数值|
|--|--|
|Star|[6.7k](https://github.com/primefaces/primeng)|
|Fork|3.3k|
|NPM周下载|[260,712](https://www.npmjs.com/package/primeng)|

## 6. Clarity

![Clarity.png](/assets/angular-component-libraries-6.png)

[Clarity](https://github.com/vmware/clarity)也是一款有自己设计体系的Angular组件库，基于[Clarity Design](http://clarity.design/)设计语言，这和 Teambition 的[Clarity Design](https://design.teambition.com/)名字一样，但是是不同公司的不同产品，不要搞混。

|指标|数值|
|--|--|
|Star|[6.2k](http://clarity.design/)|
|Fork|701|
|NPM周下载|[18,014](https://www.npmjs.com/package/@clr/angular)|

## 7. DevUI

![DevUI.png](/assets/angular-component-libraries-7.png)

最后要推荐的是一款国内的新兴 Angular 组件库，叫 [DevUI](https://github.com/DevCloudFE/ng-devui)，基于 [DevUI Design](https://devui.design/) 设计语言。

DevUI 是一款面向企业中后台产品的开源前端解决方案，它倡导`沉浸`、`灵活`、`至简`的设计价值观，提倡设计者为真实的需求服务，为多数人的设计，拒绝哗众取宠、取悦眼球的设计。

DevUI 是从华为云 DevCloud 研发工具体系孵化出来的，最适合做 ToB 的工具类产品，因为这类产品不追求酷炫的样式，而更在意工具是否稳定、使用起来是否高效，是否能真正让用户忘记工具，在使用工具的过程中达到心流状态。

由于 DevCloud 是研发工具类的产品，场景丰富，这使得孵化于其中的 DevUI 形成了自己独特的优势，DevUI 提供了很多其他 UI 组件库没有的特色组件，比如[甘特图](https://devui.design/components/zh-cn/gantt)、[象限图](https://devui.design/components/zh-cn/quadrant-diagram)，以及新出的[分类搜索](https://devui.design/components/zh-cn/category-search)、[精灵导航](https://devui.design/components/zh-cn/nav-sprite)等。

DevUI 在 2017年初的时候就已经在 DevCloud 众多业务中使用，经过这许多年，DevUI 已经经受了 DevCloud 大量线上用户的考验，成为稳定、高效、体验流畅的 Angular 组件库。

如果你正在开发 `ToB` 的`工具类产品`，DevUI 将是一个很不错的选择！

|指标|数值|
|--|--|
|Star|[638](https://github.com/DevCloudFE/ng-devui)|
|Fork|106|

<EditInfo time="2021年04月19日 22:55" title="阅读 2006 · 点赞 12 · 评论 4 · 收藏 15" />
