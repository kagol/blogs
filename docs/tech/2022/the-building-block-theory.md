# 前端开发的积木理论——像搭积木一样做前端开发

![image](https://user-images.githubusercontent.com/9566362/201500828-637e7a68-2d19-4d50-abd9-3b4f66fb538b.png)


最早发表于 2019-01-16 16:40：[https://www.cnblogs.com/kagol/p/10277766.html](https://www.cnblogs.com/kagol/p/10277766.html)

## 1 概述

用户界面是由一系列组件组合而成，组件将数据和交互封装在内，仅保留必要的接口与其他组件进行通信。

在前端开发中，组件就像一个一个的小积木块，我们用这些积木块拼出一个一个页面，这些页面组成了一个完整的为用户提供价值的业务。

相信大部分前端工程师都使用过组件库，比如`Ant Design`、`ElementUI`，都是我们非常熟悉的组件库，以及我们团队做的[DevUI](https://devui.design/)组件库。

组件库就像一个工具箱，里面包含了各式各样奇形怪状、功能各异的组件，我们直接拿这些组件小积木来拼页面，非常方便。

## 2 界面的基本元素

从抽象的角度来看，任何用户界面都是由`组件`、`数据`和`交互`组成的。

### 2.1 组件

组件是一个具有一定功能的独立单元，不同的组件可以组合在一起，构成功能更强大的组件.

> 组件是网页的器官。

组件的概念要和HTML标签的概念区分开来，HTML标签是网页的基本单元，而组件是基于HTML标签的、包含特定功能的独立单元，可以简单理解为组件是HTML标签的一个超集。

组件内部封装的是数据和交互，对外暴露必要的接口，以与其他组件进行通信。

### 2.2 数据

用户界面中包含很多数据，有不变的静态数据，也有随时间和交互改变的动态数据，它们大多来自于后台数据库。

组件内部包含数据，组件之间传递的也是数据。

> 数据是网页的核心。

在前端开发中，数据主要以`JSON`格式进行存储和传递。

### 2.3 交互

交互是用户的操作，主要通过鼠标和键盘等计算机外设触发，点击一次按钮、在文本框中输入一些字符、按下回车键等都是交互。

在网页中，所有的交互都是通过事件的方式进行响应的。

> 交互是网页的灵魂，不能进行交互的网页就像干涸的河流，了无生气。

## 3 组件的特性

一个设计良好的组件应该包含以下特性：
- 复用性（Reuseability）
- 组合性（Composability）
- 扩展性（Scalability）

### 3.1 复用性

组件作为一个独立的单元，除了自身的特定功能之外，不应该包含任何业务相关的数据。

组件应该能够复用到任何业务中，只要该业务需要用到组件所包含的功能。

组件应该是资源独立的，以增强组件的复用能力。

### 3.2 组合性

组件与组件之间可以像积木一样进行组合，组合之后的组件拥有子组件的所有功能，变得更强大。

组合的方式可以是包裹别的组件，也可以是作为参数传入别的组件中。

### 3.3 扩展性

可以基于现有的组件进行扩展，开发功能更加定制化的组件，以满足业务需求。

组件的可扩展能力依赖于接口的设计，接口要尽可能的灵活，以应对不断变化的需求。

## 4 组件间通信

### 4.1 从外向内通信

通过`props`将数据传递到组件内部，以供组件自身或其子组件使用。

`props`是不可变的：
- 这意味着我们无法在组件内部修改`props`的原始值
- 也意味着只有外部传入了`props`，才能在组件内部获取和使用它

### 4.2 从内向外通信

可以通过两种方式将组件内部的数据传递到组件外：
- 通过`ref`属性（组件实例的引用），通过组件的`ref`属性，可以获取到组件实例的引用，进而获取组件内部的数据和方法
- 通过事件回调（比如：`click`），通过事件回调的方式，可以通过`props`将一个回调函数传递到组件内部，并将组件内部的数据通过回调传递到外部

### 4.3 双向通信

可以通过全局`context`的方式进行双向通信。

父组件声明`context`对象，那么其下所有的子组件，不管嵌套多深，都可以使用该对象的数据，并且可以通过回调函数的方式将子组件的数据传递出来供父组件使用。

### 4.4 多端通信

通过事件订阅的方式可以实现多个组件之间互相通信。

通过自定义事件（Custom Event），任何组件都可以与其他组件进行通讯，采用的是发布/订阅模式，通过向事件对象上添加监听和触发事件来实现组件间通信。

## 5 案例

接下来通过广告详情页面的开发来演示如何用积木理论来构建网页。

设计图如下：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c2546245da394feb9559143e8f7d4437~tplv-k3u1fbpfcp-watermark.image?)

### 5.1 第一步：拆积木

将设计图拆分成有层次的积木结构。

#### 5.1.1 顶层积木

最顶层拆分成四个大积木：

- Header（头部组件）
- ChartBlock（图表块组件）
- DetailBlock（详情块组件）
- TableBlock（表格块组件）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c2ed8ed54e549f59b48b33801d3b81a~tplv-k3u1fbpfcp-watermark.image?)

#### 5.1.2 中间层积木

- 每个大积木又可以拆分成若干小积木
- 中间层有些是不可拆分的原子积木，比如：`Button`、`Checkbox`
- 有些是由原子积木组合而成的复合积木，比如：`DateRangePicker`、`Table`

层次结构如下：

- Header
  - Breadcrumb
  - Button
  - DateRangePicker
- ChartBlock
  - Tabs
  - LineChart
  - BarChart
- DetailBlock
  - Button
  - List
- TableBlock
  - Checkbox
  - Select
  - Button
  - Table

#### 5.1.3 底层积木

最底层的积木都是不可拆分的原子积木。

### 5.2 第二步：造积木

已经将积木的层次结构设计出来，接下来就要考虑每个层次的积木怎么制造的问题。

这一块后面会专门写一个系列文章给大家分享如何自己制造组件。

### 5.3 第三步：搭积木

#### 5.3.1 顶层积木

对应的代码：

```html
<div class="ad-detail-container">
    <Header />
    <div class="content">
        <div class="chart-detail-block">
            <ChartBlock />
            <DetailBlock />
        </div>
        <TableBlock />
    </div>
</div>
```

其中的`<div>`标签是为了布局方便加入的。

#### 5.3.2 中间层积木

`Header`对应的代码：

```html
<div class="header">
  <div class="breadcrumb-area">
    <div class="breadcrumb-current">gary audio</div>
      <div class="breadcrumb-from">
        From: 
        <d-breadcrumb class="breadcrumb" separator="">
          <d-breadcrumb-item href="http://www.qq.com">Campaign List</d-breadcrumb-item>
          <span class="breadcrumb-seprator">> </span>
          <d-breadcrumb-item href="http://www.qq.com">gary audio test</d-breadcrumb-item>
        </d-breadcrumb>
      </div>
    </div>
  </div>
  <div class="operation-area">
    <d-button icon="mail" class="flat" (click)="sendReportEmail()">Send Report Email</d-button>
    <d-date-range-picker (change)="changeDate()" />
  </div>
</div>
```

需要注意的是：为了方便阐述积木理论的核心思想，这里的原子组件大多都是已经造好的（使用[DevUI](https://devui.design/)组件库），也可以选择自己制造，后面会专门写一个系列文章给大家分享如何自己制造组件。

`ChartBlock`对应的代码：

```html
<div class="chart-block">
    <d-tabs [defaultActiveKey]="1">
        <d-tab-item tab="Ad performance" [key]="1">
            <d-line-chart></d-line-chart>
        </d-tab-item>
        <d-tab-item tab="Audience" [key]="2">
            <d-bar-chart></d-bar-chart>
        </d-tab-item>
    </d-tabs>
</div>
```

`DetailBlock`对应的代码：

```html
<div class="detail-block">
    <div class="detail-header">
        <div class="detail-title">Ad detail</div>
        <div class="detail-operation">
            <d-button icon="edit" class="flat" (click)="edit()">Edit</d-button>
            <d-button icon="delete" class="flat" (click)="delete()">Delete</d-button>
            <d-button icon="eye" class="flat" (click)="preview">Preview</d-button>
        </div>
    </div>
    <d-list [data]="adDetail" [config]="detailConfig"></d-list>
</div>
```

`TableBlock`对应的代码：

```html
<div class="table-block">
    <div class="table-operation-bar">
        <d-checkbox (change)="changeDelivery()">Has delivery</Checkbox>
        <d-select class="select-table-column" [defaultValue]="1" 
            (change)="select()">
            <d-select-option value="1">Performance</d-select-option>
            <d-select-option value="2">Customize</d-select-option>
        </Select>
        <d-button icon="export" (click)="exportData()">Export Data</d-button>
    </div>
    <d-table [dataSource]="adsList" [columns]="columns"></d-table>
</div>
```

由于篇幅原因，这个案例并没有包含交互的部分，不过基本能够阐述清楚积木理论的核心思想。


<EditInfo time="2021年12月30日 22:37" title="阅读 6233 ·  点赞 72 ·  评论 18 ·  收藏 82" />