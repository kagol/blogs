# [BUGCASE]Webpack打包报JavaScript堆内存泄漏的错误


## 一、问题描述
执行`npm run build`之后报错：
<br  />

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164433365-430750281.jpg)




<br  />

报错信息：
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```
<br  />
之前一直是好的，加了以下代码之后出错：
1.dev_server.js中加了一个entry
```
entry: {
    ...,
    "report.phantom.zeus":[
      HOT_MIDDLEWARE_ENTRY,
      path.resolve(PATHS.app, './views/effect/zeus/report-view/report.phantom.js')
    ]
}

```

2.webpack.config.common.js中加了一个entry
```
  entry: {
    ...,
    "report.phantom.zeus":[
      path.resolve(PATHS.app, './views/effect/zeus/report-view/report.phantom.js')
    ]
  }
```

3.webpack.config.prod.js中加了一个plugins
```
  plugins: [
    ...,
    new HtmlwebpackPlugin({
      chunks:['report.phantom.zeus', 'vendor'],
      hash:true,
      template:'build/report-zeus.html',
      filename: 'report-zeus.html'
    })
  ]
```
<br  />
`npm run build`命令实际执行的一串命令集：
<br  />
```
npm run clean:dist & npm run build:config  & cross-env BABEL_ENV=production webpack -p --config ./build/webpack.config.prod.js --progress & npm run zip
```

## 二、原因分析

将`npm run build`命令集进行拆分，可分成四步：


- npm run clean:dist
- npm run build:config
- cross-env BABEL_ENV=production webpack -p --config ./build/webpack.config.prod.js --progress
- npm run zip


看报错信息是在第三步报错的。
<br  />
报错之前和之后的变化，共三处代码发生变化，经过测试发现是在 webpack.config.common.js 文件中加的 entry 的影响：

```
  entry: {
    ...,
    "report.phantom.zeus":[
      path.resolve(PATHS.app, './views/effect/zeus/report-view/report.phantom.js')
    ]
  }
```

增加一个 entry 意味着 webpack 编译的成本加大，看报错信息：
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```
也是JavaScript堆内存溢出，`CALL_AND_RETRY_LAST`这个模块分配失败
<br  />
查看下内存使用情况，执行`npm run build`之前内存占用7.87GB，执行之后一直上升直到大概10GB：
<br  />


![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164457655-1324565848.png)



<br  />


![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164506958-1799457014.png)



<br  />

看起来机器的内存似乎并没有撑爆，那为什么会内存溢出呢？

<br  />

Google搜索报错信息：
```
FATAL ERROR: CALL_AND_RETRY_LAST Allocation failed - JavaScript heap out of memory
```

<br  />

搜索到以下比较有用的文章：
https://itbilu.com/nodejs/core/Ey_SnYXnx.html
https://github.com/npm/npm/issues/12741
https://github.com/nodejs/node/issues/10137
https://stackoverflow.com/questions/38558989/node-js-heap-out-of-memory
https://github.com/webpack/webpack/issues/1914

<br  />

提到的解决方案都是在`node`命令后面加`--max-old-space-size=4096`这个参数：
`node --max-old-space-size=4096`

<br  />

解决方案截图：

<br  />

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164522085-1513529120.jpg)

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164728388-1805966913.jpg)



![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164530665-2122299789.jpg)



![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164538370-979479307.jpg)





<br  />

可是`npm run build`命令集里并没有`node`命令，怎么加呢？

<br  />

在前端大神warpig的指点下，了解到`npm`、`webpack`等命令其实缩写命令，实际的命令前面是要加`node`命令的。

<br  />

所以`npm run build`命令中出错的命令：
```
cross-env BABEL_ENV=production webpack -p --config ./build/webpack.config.prod.js --progress
```
其实应该是：
```
cross-env BABEL_ENV=production node webpack -p --config ./build/webpack.config.prod.js --progress
```

<br  />

但直接运行这个命令会报错，提示`cross-env`这个命令不存在，经查询发现`cross-env`只是为了解决node环境变量的问题。

<br  />

运行`node webpack -p --config ./build/webpack.config.prod.js --progress`，还是报错：

<br  />

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164611940-895429283.jpg)



<br  />

当前路径下找不到webpack模块，改成：
```
node node_modules/webpack/bin/webpack.js -p --config ./build/webpack.config.prod.js --progress
```
就可以。

<br  />

加上指定V8引擎所占用的内存空间的参数`--max-old-space-size=4096`：
```
node --max-old-space-size=4096 node_modules/webpack/bin/webpack.js -p --config ./build/webpack.config.prod.js --progress
```
编译成功。

<br  />

在package.json中也加上这个参数，重新执行`npm run build`，打包成功。

<br  />

一句话总结：

> webpack打包时，由于要编译的内容太多，占用了过多内存（大概10GB-7.86GB=`2.14GB`），而在64位操作系统下，V8引擎（node运行环境）默认内存只有大约`1.43GB`（1.4G新生代内存+32MB老生代内存），`2.14GB>1.43GB`，导致内存溢出。



## 三、解决方案

`webpack` &nbsp;改成 &nbsp;`node --max-old-space-size=4096 node_modules/webpack/bin/webpack.js`
<br  />
所以`npm run build`执行的是以下命令集：
```
npm run clean:dist & npm run build:config  & cross-env BABEL_ENV=production node --max-old-space-size=4096 node_modules/webpack/bin/webpack.js -p --config ./build/webpack.config.prod.js --progress & npm run zip
```

## 四、参考资料
https://itbilu.com/nodejs/core/Ey_SnYXnx.html
https://github.com/webpack/webpack/issues/1914

<EditInfo time="2019-01-17 16:48" title="阅读(2093) 评论(0) 推荐(0)" />
