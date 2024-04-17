# 前端开发的积木理论——像搭积木一样做前端开发

## 一、概述
用户界面是由一系列组件组合而成，组件将数据和交互封装在内，仅保留必要的接口与其他组件进行通信。

## 二、界面的基本元素
从抽象的角度来看，任何用户界面都是由`组件`、`数据`和`交互`组成的。
### 1.组件
组件是一个具有一定功能的独立单元，不同的组件可以组合在一起，构成功能更强大的组件，`组件是网页的器官`。
组件的概念要和HTML标签的概念区分开来，HTML标签是网页的基本单元，而组件是基于HTML标签的、包含特定功能的独立单元，可以简单理解为组件是HTML标签的一个超集。
组件内部封装的是数据和交互，对外暴露必要的接口，以与其他组件进行通信。
### 2.数据
用户界面中包含很多数据，有不变的静态数据，也有随时间和交互改变的动态数据，它们大多来自于后台数据库。
组件内部包含数据，组件之间传递的也是数据，`数据是网页的核心`。
在前端开发中，数据主要以JSON格式进行存储和传递。
### 3.交互
交互是用户的操作，主要通过鼠标和键盘等计算机外设触发，点击一次按钮、在文本框中输入一些字符、按下回车键等都是交互。
在网页中，所有的交互都是通过事件的方式进行响应的。
`交互是网页的灵魂`，不能进行交互的网页就像干涸的河流，了无生气。

## 三、组件的特性
一个设计良好的组件应该包含以下特性：
`复用性（Reuseability）`、`组合性（Composability）`和`扩展性（Scalability）`。

### 1.复用性
组件作为一个独立的单元，除了自身的特定功能之外，不应该包含任何业务相关的数据。
组件应该能够复用到任何业务中，只要该业务需要用到组件所包含的功能。
组件应该是资源独立的，以增强组件的复用能力。

### 2.组合性
组件与组件之间可以像积木一样进行组合，组合之后的组件拥有子组件的所有功能，变得更强大。
组合的方式可以是包裹别的组件，也可以是作为参数传入别的组件中。

### 3.扩展性
可以基于现有的组件进行扩展，开发功能更加定制化的组件，以满足业务需求。
组件的可扩展能力依赖于接口的设计，接口要尽可能的灵活，以应对不断变化的需求。

## 四、组件间通信

### 1.从外向内通信
通过`props`将数据传递到组件内部，以供组件自身或其子组件使用。
props是不可变的，这意味着我们无法在组件内部修改props的原始值，也意味着只有外部传入了props，才能在组件内部获取和使用它。

### 2.从内向外通信
可以通过两种方式将组件内部的数据传递到组件外，一是通过`ref`属性（组件实例的引用），二是通过`事件回调`（比如：onClick）
 - 通过组件的ref属性，可以获取到组件实例的引用，进而获取组件内部的数据和方法；
 - 通过事件回调的方式，可以通过props将一个回调函数传递到组件内部，并将组件内部的数据通过回调传递到外部。
 
### 3.双向通信
可以通过全局`context`的方式进行双向通信。
父组件声明context对象，那么其下所有的子组件，不管嵌套多深，都可以使用该对象的数据，并且可以通过回调函数的方式将子组件的数据传递出来供父组件使用。

### 4.多端通信
通过事件订阅的方式可以实现多个组件之间互相通信。
通过`自定义事件（Custom Event）`，任何组件都可以与其他组件进行通讯，采用的是发布/订阅模式，通过向事件对象上添加监听和触发事件来实现组件间通信。

## 五、案例
接下来通过广告详情页面的开发来演示如何用积木理论来构建网页。
设计图如下：

![Ad detail](/assets/building-block-theory-1.png)


### 第一步：拆积木
将设计图拆分成有层次的积木结构。
#### 1.顶层
最顶层拆分成四个大积木：
 - Header（头部组件）
 - ChartBlock（图表块组件）
 - DetailBlock（详情块组件）
 - TableBlock（表格块组件）
 

![Ad detail - high](/assets/building-block-theory-2.png)

其中的div标签是为了布局方便加入的。
#### 2.中间层
每个大积木又可以拆分成若干小积木，中间层有些是不可拆分的原子积木，比如：Button、Checkbox；有些是由原子积木组合而成的复合积木，比如：DateRangePicker、Table。层次结构如下：

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

### 3.底层
最底层的积木都是不可拆分的原子积木。
### 第二步：造积木
已经将积木的层次结构设计出来，接下来就要考虑每个层次的积木怎么制造的问题。
由于广告详情涉及的积木众多，这里仅举日期选择组件（DatePicker）的例子来说明制造积木的方法，具体见以下链接：
[日期选择组件](https://www.cnblogs.com/kagol/p/10277778.html "日期选择组件")
### 第三步：搭积木
#### 顶层积木

对应的代码：
```html
<div className="ad-detail-container">
    <Header />
    <div className="content">
        <div className="chart-detail-block">
            <ChartBlock />
            <DetailBlock />
        </div>
        <TableBlock />
    </div>
</div>
```
#### 中间层积木

Header对应的代码：
```html
<div className="header">
    <div className="breadcrumb-area">
        <div className="breadcrumb-current">gary audio</div>
        <div className="breadcrumb-from">From: <Breadcrumb className="breadcrumb" separator="">
            <BreadcrumbItem href="http://www.qq.com">Campaign List</BreadcrumbItem>
            <span className="breadcrumb-seprator">> </span>
            <BreadcrumbItem href="http://www.qq.com">gary audio test</BreadcrumbItem>
        </Breadcrumb></div>
    </div>
    <div className="operation-area">
        <Button icon="mail" className="flat" onClick={() => { console.log('You click "Send Report Email" button'); }}>Send Report Email</Button>
        <DateRangePicker onChange={(selectedDate) => { console.log('selected date:', selectedDate); }} />
    </div>
</div>
```
`需要注意的是：为了方便阐述积木理论的核心思想，这里的原子组件大多都是已经造好的（使用antd组件库），也可以选择自己制造，后面会举例如何自己制造组件。`

ChartBlock对应的代码：
```html
<div className="chart-block">
    <Tabs defaultActiveKey="1">
        <TabItem tab={<div className="tab-title">Ad performance</div>} key="1">
            <LineChart />
        </TabItem>
        <TabItem tab={<div className="tab-title">Audience</div>} key="2">
            <BarChart />
        </TabItem>
    </Tabs>
</div>
```

DetailBlock对应的代码：
```html
<div className="detail-block">
    <div className="detail-header">
        <div className="detail-title">Ad detail</div>
        <div className="detail-operation">
            <Button icon="edit" className="flat" onClick={() => { console.log('You click "Edit" button'); }}>Edit</Button>
            <Button icon="delete" className="flat" onClick={() => { console.log('You click "Delete" button'); }}>Delete</Button>
            <Button icon="eye" className="flat" onClick={() => { console.log('You click "Preview" button'); }}>Preview</Button>
        </div>
    </div>
    <List data={adDetail} config={detailConfig} />
</div>
```


TableBlock对应的代码：
```html
<div className="table-block">
    <div className="table-operation-bar">
        <Checkbox onChange={(event) => { console.log('Your checked status: ', event.target.checked); }}>Has delivery</Checkbox>
        <Select className="select-table-column" defaultValue="1" 
            onChange={(value) => { console.log('You selected: ', value); }}>
            <Option value="1">Performance</Option>
            <Option value="2">Customize</Option>
        </Select>
        <Button icon="export" onClick={() => { console.log('You click "Export Data" button'); }}>Export Data</Button>
    </div>
    <Table dataSource={adsList} columns={columns} />
</div>
```

由于篇幅原因，这个案例并没有包含交互的部分，不过基本能够阐述清楚积木理论的核心思想。

案例源码：
[前端开发积木理论案例](https://github.com/kagol/react-components/tree/master/src/views/adDetail "前端开发积木理论案例")

<EditInfo time="2019-01-16 16:40" title="阅读(953) 评论(0) 推荐(0)" />
