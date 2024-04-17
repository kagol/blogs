# 前端实用小技巧总结



1.指定文件兼容性模式

```
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
```
在html页面的`<head>`元素里加入以上代码，用来声明：如果安装了GCF(Google Chrome Frame)，则当前页面使用chrome内核来渲染；如果未安装GCF，则使用IE的Edge版本来渲染。

 

2.改变input/textarea的placeholder字体的样式

```
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {/*webkit内核的浏览器*/
    color: #666;
}
input:-moz-placeholder, textarea:-moz-placeholder {/*Firefox版本4-18*/
    color:#666;
}
input::-moz-placeholder, textarea::-moz-placeholder {/*Firefox版本19+*/
    color:#666;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {/*IE浏览器*/
    color:#666;
}
```
 

3.输出带样式的文本到浏览器控制台

console.log('%c\nHello World', 'color:red;font-size:24px;')
 

4.单行文本过长用"..."代替

div {
    width:100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
 

5.多行文本过长用"..."代替

```
.link-name {
    width: 100%;
    word-break: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
```
 

6.去掉input元素focus时的边框

input{
    outline:none;
}
 

7.回到顶部和回到底部
```
<a href="javascript:void(0);" onclick="javascript:document.getElementsByTagName('BODY')[0].scrollTop=0;">回到顶部</a>

<a onclick="javascript:document.getElementsByTagName('BODY')[0].scrollTop=document.getElementsByTagName('BODY')[0].scrollHeight;" 
　　href="javascript:void(0);">回到底部</a>
```

8.将页面变成黑白的

```
with(document.body.style) {
    var vFilter = "grayscale(100%)";
    if (typeof webkitFilter !== "undefined") {webkitFilter = vFilter}
    else if (typeof MozFilter !== "undefined") {MozFilter = vFilter}
    else if (typeof msFilter !== "undefined") {msFilter = vFilter}
    else if (typeof oFilter !== "undefined") {oFilter = vFilter}
    else if (typeof filter !== "undefined") {filter = vFilter}
}
```
在浏览器的控制台中运行以上代码即可。

 

9.目前为止见过的最简洁的求阶乘 n! 的方法

(function (n) {return n > 1 ? n * arguments.callee (n - 1): n} ) (7)
 

10.目前为止见过的最简洁的数组去重的方法

Array.prototype.unique = function () { return this.filter(function (v, i, m) { return i <= m.indexOf(v);}); };
console.log('result:', [1,2,3,12,3,2,1,2,30].unique());
 

11.文本框只能输入数字

HTML:
```
<input type="text" onkeyup="this.value=this.value.replace(/[^0-9]/g,'')" />
```
React:
```
<input type="text" onKeyUp={ (e) => { e.target.value=e.target.value.replace(/[^0-9]/g,'') } } />
```

12.修改浏览器默认滚动条样式

```
/* 设置滚动条的样式 */
::-webkit-scrollbar {
  width:8px;
  height:8px;
}
/* 滚动槽 */
::-webkit-scrollbar-track {
  border-radius:5px;
  background:rgba(0,0,0,0.05);
  -webkit-box-shadow: rgba(0,0,0,0.1);
}
/* 滚动条滑块 */
::-webkit-scrollbar-thumb {
  border-radius:10px;
  background:rgba(0,0,0,0.1);
  -webkit-box-shadow:rgba(0,0,0,0.2);
}
/*当焦点不在当前区域滑块的状态*/
::-webkit-scrollbar-thumb:window-inactive {
  background:rgba(0,0,0,0.06);
}
/*当鼠标在水平滚动条的状态*/
::-webkit-scrollbar-thumb:hover {
  background:rgba(0,0,0,0.2);
}
```
 

13.可计算CSS

.container-widescreen{
    max-width: calc(100% - 170px - 20px);
}
需要注意的是运算符两边都需要有空格，否则不生效，即：`calc(100%-170px)`不生效，而`calc(100% - 170px)`生效

 

14.修改ng cli默认端口

在angular.json中修改

```
  "projects": {
    "your-project-name": {
      "architect": {
        "serve": {
          "options": {
            "browserTarget": "ngx-editor:build",
            "port": 4260
          },
        },
      }
    },
  }
```
 

15.修改vue cli默认端口

新增vue.config.js文件

module.exports = {
    devServer: {
        port: 4260,     // 端口
    },
    lintOnSave: false   // 取消 eslint 验证
};
 

 

 

附：

一、设备分辨率总结

```
PC:

1024X768 - 老机器

1280X800 - MacBook Pro(13寸)

1366X768 - 笔记本

1440X900 - MacBook Air(13)

1920X1080 - 台式机、iMac(21寸)

2304X1440 - MacBook(12)

2560X1440 - iMac(27寸)

2560X1600 - rMBP(13)

2880X1800 - rMBP(15)

5120X2880 - 5K iMac
```
 

Pad:(横屏)

1024X768 - iPad1/2/mini

2048X1536 - iPad3/4/mini2
 

```
Mobile:(竖屏)(太多了，只总结了iOS的手机)

640X960 - iPhone4/4s

640X1136 - iPhone5/5c/5s/se

750X1334 - iPhone6/6s/7/8

1080X1920 - iPhone6/6s/7/8 plus

1125X2436 - iPhone X
```
 

```
Mobile:(竖屏)(Android手机)

480X854 - 小米1

720X280 - 小米2

1080X1920 - 华为

1080X1800 - 魅族3

1152X1920 - 魅族4

1536X2560 - 魅族4 pro

1440X2560 - 乐视max/三星S6
```
 

二、判断浏览器类型

stackoverflow中的方法：

```
// Opera 8.0+
var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;

// Firefox 1.0+
var isFirefox = typeof InstallTrigger !== 'undefined';

// Safari 3.0+ "[object HTMLElementConstructor]" 
var isSafari = /constructor/i.test(window.HTMLElement) || (function (p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification);

// Internet Explorer 6-11
var isIE = false || !!document.documentMode;

// Edge 20+
var isEdge = !isIE && !!window.StyleMedia;

// Chrome 1+
var isChrome = !!window.chrome && !!window.chrome.webstore;

// Blink engine detection
var isBlink = (isChrome || isOpera) && !!window.CSS;
```
 

利用正则表达式判断userAgent：

```
    [ 'edge', /Edge\/([0-9\._]+)/ ],
    [ 'yandexbrowser', /YaBrowser\/([0-9\._]+)/ ],
    [ 'chrome', /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/ ],
    [ 'crios', /CriOS\/([0-9\.]+)(:?\s|$)/ ],
    [ 'firefox', /Firefox\/([0-9\.]+)(?:\s|$)/ ],
    [ 'opera', /Opera\/([0-9\.]+)(?:\s|$)/ ],
    [ 'opera', /OPR\/([0-9\.]+)(:?\s|$)$/ ],
    [ 'ie', /Trident\/7\.0.*rv\:([0-9\.]+)\).*Gecko$/ ],
    [ 'ie', /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/ ],
    [ 'ie', /MSIE\s(7\.0)/ ],
    [ 'bb10', /BB10;\sTouch.*Version\/([0-9\.]+)/ ],
    [ 'android', /Android\s([0-9\.]+)/ ],
    [ 'ios', /Version\/([0-9\._]+).*Mobile.*Safari.*/ ],
    [ 'safari', /Version\/([0-9\._]+).*Safari/ ]
```
Opera(OPR)、QQ浏览器(QQBrowser)、360浏览器()、百度浏览器(BIDUBrowser)、猎豹浏览器(LBBROWSER)、搜狗浏览器(SE)、遨游浏览器(Maxthon)、2345浏览器(2345Explorer)

```
[ "Chrome", ""Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36"" ],
[ "Safari", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/534.57.2 (KHTML, like Gecko) Version/5.1.7 Safari/534.57.2"" ],
[ "Firefox", ""Mozilla/5.0 (Windows NT 6.1; WOW64; rv:53.0) Gecko/20100101 Firefox/53.0"" ],
[ "Opera", ""Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.81 Safari/537.36 OPR/45.0.2552.812"" ],
[ "2345", "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.108 Safari/537.36 2345Explorer/8.6.1.15524" ],
[ "猎豹", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.75 Safari/537.36 LBBROWSER"" ],
[ "UC", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/50.0.2661.102 UBrowser/6.1.2107.204 Safari/537.36"" ],
[ "搜狗", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/49.0.2623.221 Safari/537.36 SE 2.X MetaSr 1.0""],
[ "百度", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/47.0.2526.106 BIDUBrowser/8.7 Safari/537.36""],
[ "遨游", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Maxthon/5.0.4.2000 Chrome/47.0.2526.73 Safari/537.36""],
[ "QQ浏览器", ""Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.104 Safari/537.36 Core/1.53.2658.400 QQBrowser/9.6.11018.400""]
```
 

<EditInfo time="2017-02-07 15:25" title="阅读(439)  评论(0)" />
