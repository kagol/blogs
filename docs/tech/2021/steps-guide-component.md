# StepsGuide：一个像跟屁虫一样的组件

![image](https://user-images.githubusercontent.com/9566362/201514784-eadaf631-f45e-4070-a2b2-12329d6952aa.png)

## 引言

近期对 ProjectMan 业务的工作项搜索/过滤功能做了优化，用 DevUI 组件库新推出的 [CategorySearch](https://devui.design/components/zh-cn/category-search/) 组件替换了之前复杂繁琐的交互方式，实现了搜索、过滤、过滤条件显示3个功能的整合，能够有效提升用户的操作效率和体验。

以下是新旧过滤器的效果对比：

旧版过滤器

![before-search-module.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1d99174850d04582990b2727616ca241~tplv-k3u1fbpfcp-watermark.image)

新版过滤器

![after-category-search2.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/afa23663c0dd46c19392189f2f7bc683~tplv-k3u1fbpfcp-watermark.image)

从新旧过滤器的对比可以看出，两者相差很大，这个旧版的过滤器已经在线上运行多年，用户已经习惯了这种交互方式，如果贸然上一个几乎是全新的东西，势必会挑战用户的使用习惯，即使新版过滤器拥有简单易用、操作效率高、体验好等众多优点。

由于要改变用户习惯，前期很可能还是会受到部分用户的排斥和抵触，为了尽可能让用户平滑过渡到新版过滤器，需要增加一个简单的用户指引，让用户通过几个简单的步骤，快速了解新版过滤器的使用方式。

## 1 单步骤用户指引

用户指引应该是一个比较通用的场景，先到组件库里找下有没有可以直接用的组件。

### 1.1 寻找合适的组件

打开DevUI官网的组件总览页面：

[https://devui.design/components/zh-cn/overview](https://devui.design/components/zh-cn/overview)

先尝试搜索🔍关键字`指引`，找到一个操作指引组件：

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/875fcb1ea9ff41debfc5892767877e7a~tplv-k3u1fbpfcp-watermark.image)

点击进入`StepsGuide`组件的详情页面：

![图片.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4213d2bc5f5549129a41ea99029bf863~tplv-k3u1fbpfcp-watermark.image)

`何时使用`里写了该组件的使用场景：

> 业务推出新特性，或复杂的业务逻辑需要指引用户时使用。

和我们的场景是一样的，直接拿来用吧。

### 1.2 看组件Demo，了解组件基本用法

先看下第一个基本用法的Demo：

```
<d-button
  bsStyle="common"
  dStepsGuide
  [pageName]="'step-basic-demo'"
  [steps]="steps"
  [stepIndex]="0"
  [dStepsGuidePosition]="'top'"
  (operateChange)="operateChange($event)"
  (click)="reset(0)"
>
  Step 1
</d-button>
```

从这个Demo，我们大致可以一窥其使用方式：
- 以指令（`dStepsGuide`）的方式使用
- 指令放在哪个元素上，就在它上面展示一个指引框
- `dStepsGuidePosition`属性应该是控制指引框的位置
- `steps`应该是配置指引步骤数据源
- `stepIndex`应该是表示当前的元素是第几个步骤
- `pageName`暂时还不知道有什么用
- `operateChange`是一个事件，还不知道有什么用

看完HTML文件，再看下TS文件：

```
export class BasicComponent implements OnInit {
  ...
  steps = [
      {
        title: 'Step 1',
        content: 'Guide Content',
      },
      {
        title: 'Step 2',
        content: 'Guide Content',
      },
      {
        title: 'Step 3',
        content: 'Guide Content',
      },
  ];
  constructor(private stepService: StepsGuideService) {}

  ngOnInit() {
    this.stepService.currentIndex.subscribe((index) => (this.currentStep = index));
    /* 由于整个demo是在一个页面内显示多个操作指引序列，因此需要在初始化时重置显示状态 */
    localStorage.setItem('devui_guide_step-position-demo', '0');
    localStorage.setItem('devui_guide_step-custom-demo', '0'); /* 设置第二个序列为不显示状态 */
    localStorage.removeItem('devui_guide_step-basic-demo'); /* 设置第一个序列为显示状态 */
    this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */
    this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */
  }
  ...
}
```

从TS文件里可以看到steps步骤数据源的结构，steps是一个对象数组，每一个数组项表示一个指引步骤，里面包含该步骤的标题和内容。

组件初始化事件里面写了一些逻辑，有点复杂，我们先不看。

根据现有的知识，应该能先用起来。

### 1.3 先用起来再说

比如我想给下面的搜索框元素加一个指引：

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/66a6b4dee16a4b18a1e120aa1997aac0~tplv-k3u1fbpfcp-watermark.image)

大致效果如下：

![图片.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce6bc5b9f9b94f2bac383142faf34ee2~tplv-k3u1fbpfcp-watermark.image)

#### 1.3.1 第一步是先引入组件模块

```
import { StepsGuideModule } from 'ng-devui';

@NgModule({
  ...
  imports: [
    ...
    StepsGuideModule,
  ],
  ...
})
export class MainContentHeadModule { }
```

#### 1.3.2 然后加上dStepsGuide指令和相应的属性

先只加一个steps试试看：

```
<d-search 
  dStepsGuide
  [steps]="steps"
></d-search>
```

```
steps = [
  {
    title: '新功能介绍：搜索框',
    content: `
      <p>1、过滤功能迁移至搜索框中啦</p>
      <p>2、在搜索框中，您可输入关键词或添加筛选条件查询所需要的工作项</p>
    `,
  },
];
```

发现什么效果都没有。

#### 1.3.3 调整参数，达到我们想要的效果

回过头来看组件Demo，组件初始化时做了一些事情：

```
  ngOnInit() {
    this.stepService.currentIndex.subscribe((index) => (this.currentStep = index));
    /* 由于整个demo是在一个页面内显示多个操作指引序列，因此需要在初始化时重置显示状态 */
    localStorage.setItem('devui_guide_step-position-demo', '0');
    localStorage.setItem('devui_guide_step-custom-demo', '0'); /* 设置第二个序列为不显示状态 */
    localStorage.removeItem('devui_guide_step-basic-demo'); /* 设置第一个序列为显示状态 */
    this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */
    this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */
  }
```

最后一行代码似乎是用来控制显示哪一个步骤指引的：

```
this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */
```

我们加上这一行试试看。

```
import { StepsGuideService } from 'ng-devui';

constructor(
  private stepService: StepsGuideService,
) {}

ngOnInit(): void {
  this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */
}
```

发现还是没效果。

再加上调用setSteps方法那一行试试：

```
ngOnInit(): void {
  this.stepService.setSteps(this.steps); /* 将步骤数据设置为第一个序列的内容 */
  this.stepService.setCurrentIndex(0); /* 设置当前序列显示步骤为第一个步骤 */
}
```

还是不行，再试试加上stepIndex属性：

```
    <d-search 
      dStepsGuide
      [steps]="steps"
      [stepIndex]="0" // 新增的
    ></d-search>
```

终于有效果了：

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/208f99da6f2d407c9eb7b87e818e5673~tplv-k3u1fbpfcp-watermark.image)

不过默认位置显示在元素上方，被挡住了，可以设置下dStepsGuidePosition属性，调整下指引的位置：

```
    <d-search 
      dStepsGuide
      [steps]="steps"
      [stepIndex]="0"
      dStepsGuidePosition="bottom" // 新增的
    ></d-search>
```

这回正常了。

效果和我们想要的一模一样：

![图片.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7431285d2ca44124a07e1b089b9e881c~tplv-k3u1fbpfcp-watermark.image)

#### 1.3.4 小结

回顾一下，为了实现单步骤用户指引，我们使用了`dStepsGuide`指令的三个参数：
- steps 步骤数组，是一个对象数组，里面包含步骤的标题（title）和内容（content）
- stepIndex 显示第几个步骤
- dStepsGuidePosition 显示位置（一共有8个方位）

为了设置当前步骤为第一个步骤，我们调用了stepService的两个方法：
- setSteps(this.steps) 将步骤数据设置为第一个序列的内容
- setCurrentIndex(0) 设置当前步骤为第一个步骤

这就是实现单步骤用户指引所需要知道的全部知识。

## 2 多步骤指引

这时产品说一个步骤不够，要加一个，主要有两个要求：
- 第一个步骤里面点击下一步，可以跳到下一个步骤
- 第二个步骤有一个返回上一步的按钮

为了实现多步骤指引，我们不需要学习任何多余的API，只需要简单地在steps中增加一个步骤，并设置第二个步骤的stepIndex为1即可。

```
<d-search 
  dStepsGuide
  dStepsGuidePosition="bottom"
  [steps]="steps"
  [stepIndex]="0"
></d-search>
<!--新增的步骤-->
<d-button
  dStepsGuide
  dStepsGuidePosition="bottom"
  [steps]="steps"
  [stepIndex]="1"
>新建项目</d-button>
```

```
steps = [
  {
    title: '新功能介绍：搜索框',
    content: `
      <p>1、过滤功能迁移至搜索框中啦</p>
      <p>2、在搜索框中，您可输入关键词或添加筛选条件查询所需要的工作项</p>
    `,
  },
  // 新增的步骤
  {
    title: '新功能介绍：新建项目',
    content: `
      <p>点击“新建项目”按钮，即可跳转到新建项目页面</p>
    `,
  },
];
```

效果如下：

![多步骤用户指引.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/321de82b64224eb1955c24cd36f42e29~tplv-k3u1fbpfcp-watermark.image)

是不是非常简单？

## 3 跟随效果

以上实现会有一个问题：

> 如果步骤的目标元素是动态变化的，比如它的位置变了，宽高变了，指引不会跟着变。

效果如下：

![不跟随的情况.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/89614834bb0d4047974c6f4dabd197cd~tplv-k3u1fbpfcp-watermark.image)

这时需要用到StepsGuide组件的另一个API：`observerDom`

这个API会让指引步骤秒变跟屁虫：

> 目标元素在哪儿，指引步骤就跟到哪儿。

API文档用了大段文字来描述这个`observerDom`的用途，其实就是把指引步骤的浮框变成“跟屁虫”😄

![图片.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ac9bfbe4b2c14ca68adc5140719e9009~tplv-k3u1fbpfcp-watermark.image)

```
<d-search 
  dStepsGuide
  dStepsGuidePosition="bottom"
  [steps]="steps"
  [stepIndex]="0"
  [observerDom]="observerDom" // 新增的
></d-search>
```

```
observerDom;

ngOnInit(): void {
  // 新增的，把搜索框的外层元素设置成observerDom，这样只要它里面的任何元素发生变化，导致了搜索框位置发生变化，步骤指引的浮框都会跟着变化
  this.observerDom = document.querySelector('.main-content');
  
  this.stepService.setSteps(this.steps);
  this.stepService.setCurrentIndex(0);
}
```

效果如下：

![跟随的情况.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/26ce78b9a09243ec8962e5837649bce7~tplv-k3u1fbpfcp-watermark.image)

不仅仅是搜索框宽度变化，其他变化导致的搜索框位置的变化也会触发步骤指引的跟随：

![响应其他变化.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/be33878dc4064b8d94b1908fad4f136c~tplv-k3u1fbpfcp-watermark.image)

是不是非常有意思？

接下来我们就来看看这个简单却很有意思的“跟屁虫”组件还有哪些能力。

## 4 StepsGuide组件的其他API

关注StepsGuide组件的介绍，没有比它的[API文档](https://devui.design/components/zh-cn/steps-guide/api)写得更清楚的了。

它一共有12个属性API，一个事件API。

属性API：
- steps 步骤数组
- stepIndex 当前步骤索引
- dStepsGuidePosition 指引步骤的位置
- observerDom 跟随效果
- pageName 用来标识操作指引，跨页面（或路由）时会用到
- leftFix 位置修复
- topFix 位置修复
- zIndex 指引步骤的层级
- targetElement 指定目标元素，当需要为动态生成的元素添加指引时会用到
- scrollElement 指引信息跟随滚动定位的容器元素
- scrollToTargetSwitch 是否自动滚动页面至指引信息显示的位置
- extraConfig 扩展配置，用于隐藏上一步按钮和步骤圆点图标

事件API：
- operateChange 指引步骤中的按钮事件，需要自定义下一步的动作时会用到

这些API的具体用法详见StepsGuide组件的Demo：

[https://devui.design/components/zh-cn/steps-guide/demo](https://devui.design/components/zh-cn/steps-guide/demo)

如果你的业务中也有新特性要发布，需要增加用户指引，不妨试试这个有趣的跟屁虫组件吧😜！

也欢迎使用DevUI新发布的[DevUI Admin](https://devui.design/admin-page/home)系统，开箱即用，10分钟搭建一个美观大气的后台管理系统！

## 加入我们

我们是DevUI团队，欢迎来这里和我们一起打造优雅高效的人机设计/研发体系。招聘邮箱：muyang2@huawei.com。

文/DevUI Kagol

往期文章推荐

[《Quill富文本编辑器的实践》](https://juejin.cn/post/6966993945973194765)

[《如何解决异步接口请求快慢不均导致的数据错误问题？》](https://juejin.cn/post/6959700988882059271)

[《号外号外！DevUI Admin V1.0 发布啦！》](https://juejin.cn/post/6956155033410863134)

[《CategorySearch分类搜索组件初体验》](https://juejin.cn/post/6956612556710477860)

[《让我们一起建设 Vue DevUI 项目吧！》](https://juejin.cn/post/6956988395016945701)



<EditInfo time="2021年05月30日 12:21" title="阅读 2200 ·  点赞 22 ·  评论 2 ·  收藏 3" />
