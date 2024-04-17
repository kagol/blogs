# [BUGCASE]FixedDataTable表格数据渲染错误

## 一、问题描述
广告配置中绑定第三方规格ID表格数据，有一部分展示错乱，具体如下：
![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117170658822-362910136.png)



表格组件使用 Facebook 的 （[fixed-data-table](https://github.com/facebookarchive/fixed-data-table)） 组件

## 二、原因分析
### 1.检查props
先查看下传入组件中的props是否正确，结果如下图：


![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117170708443-607227924.png)




发现传入EditableCell组件的data数据是没有问题的（和后台数据一致），但为什么渲染到页面中就不对呢？

### 2.单元格中的值currentValue出错
这样就直接将错误范围缩小到EditableCell组件，该组件渲染时出错，通过查看该组件源码，发现单元格中的值来自一个内部state: `this.state.currentValue`，该值在组件初始化时（`constructor`）设置了一次，在`componentWillReceiveProps`事件中也设置了一次，具体代码如下：

```
  constructor(props) {
    super(props);
    console.log('props:', props);
    this.state = { editable: false, errorTips: '', currentValue: this.formatValue(props) };
  }
```

```
  componentWillReceiveProps(nextProps) {
    if(this.props.data !== nextProps.data) {
      this.setState({currentValue: this.formatValue(nextProps)});
    }
  }
```
发现currentValue的值都被设置为：`this.formatValue(props)`

由于其值直接从render中取`this.state.currentValue`，于是将其打印出来，发现是错的；
再将`this.formatValue(this.props)`打印出来，值是对的：
![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117170957095-2080970133.png)





### 3.原来是componentWillReceiveProps没执行
前面已经分析过，`this.state.currentValue`只在两个地方设置了值，于是在这两个地方分别打印下currentValue的值，结果是：

  - constructor执行了21次，打印了前21条数据的currentValue
  - componentWillReceiveProps 中设置currentValue的语句没有执行

当鼠标滚动到第22条数据的位置时，componentWillReceiveProps事件执行了，但是设置currentValue的语句没执行，因为` if(this.props.data !== nextProps.data)`返回`false`，试着将判断条件去掉，发现一切正常。

## 三、解决方案
将componentWillReceiveProps事件中的` if(this.props.data !== nextProps.data)`判断条件去掉


## 四、深入思考

问题是解决了，可还是总觉得有些地方不是很清楚，比如：

  - 为什么明明有25条数据，constructor却只执行了21次？
  - 为什么当鼠标滚动到第22条数据的位置时，componentWillReceiveProps事件会执行？

于是继续深入研究：

### 1.fixed-data-table数据渲染原理
通过观察react组件层次结构，发现只有21行数据：
![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117170945384-345423080.png)




另外4条数据哪去了？于是鼠标往下滚，滚到最后，发现DOM中还是只有21行数据，不过发现一个有趣的现象，最后一个DOM节点指向的并不是最后一条数据，而是第21条数据：

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117170736605-420575784.png)

其他数据去哪儿了？
通过使用React元素检查器发现，最后4个数据居然跑到最前面去了：
![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117170749082-1461094800.png)



于是猜想：
 > fixed-data-table并不是一次性将所有数据渲染到页面上，而是只渲染其中一部分（这里是21条数据），随着鼠标滚动动态渲染。

可是为什么是`21`行数据（21个DOM节点 FixedDataTableRow）？

### 2.源码研究：DOM节点数量的计算
通过研究fixed-data-table的源码`FixedDataTableRowBuffer.js`发现：
`21`这个数字的计算公式如下：
```
var MIN_BUFFER_ROWS = 3;
var MAX_BUFFER_ROWS = 6;
this._maxVisibleRowCount = Math.ceil(viewportHeight / defaultRowHeight) + 1;//ceil(437/48) = 11
    this._bufferRowsCount = clamp(Math.floor(this._maxVisibleRowCount / 2), MIN_BUFFER_ROWS, MAX_BUFFER_ROWS);//clamp方法用于将value限制在[min, max]区间内，这里是[3, 6]
//floor(11/2)=5 clamp(5, 3, 6)=5

//关键代码
var viewportRowsCount = lastViewportRowIndex - firstViewportRowIndex + 1;//可视区域行数
var allowedRowsCount = viewportRowsCount + this._bufferRowsCount * 2;//DOM节点数量
// allowedRowsCount = 11 + 5*2 = 21
```


## 五、经验沉淀

  - 1.保持谨慎，并及时响应。不忽视小问题，因为小问题有可能会引发更大的问题，对问题及时响应和解决 
  - 2.开发过程中，善于发现隐患，并及时解决 
  - 3.充分自测，自己负责的项目要随时检查是否出故障，最好是能写单元测试，保证质量 
  - 4.多向别人学习，了解不同的思维方式，提高自身解决问题的能力 
  - 5.多总结反思，从问题和错误中学习

## 六、致谢&参考资料
  - 感谢在问题排查过程中提供协助的`haowei` 、`afei`、`yuiffy`
  - https://github.com/facebookarchive/fixed-data-table
  - fixed-data-table源码

## 结论

一句话总结：

 > 表格单元格中的数据来源于一个内部state currentValue, 该值只在组件首次渲染时设置了一次，并且只设置了前21条数据的值（FixedDataTable`动态数据加载机制`的原因），而业务中由于一个`if逻辑的错误`，导致滚动鼠标时，剩余4条本应设置的currentValue没有被设置，从而组件使用了21条数据中的前4条数据的值，导致数据展示错误。

<EditInfo time="2019-01-17 17:12" title="阅读(533) 评论(0) 推荐(1)" />
