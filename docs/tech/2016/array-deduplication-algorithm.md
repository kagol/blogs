# 使用 JavaScript 进行数组去重：一种高效的算法

最近比较忙，没时间更新博客，等忙完这阵子会整理一篇使用 AngularJS 构建一个中型的单页面应用(SPA)的文章，敬请期待！先占个坑。

数组去重的算法有很多种，以下是一种。

思路如下：

- 定义一个空的对象obj
- 循环数组 arr，判断 obj[arr[i]] 是否为 false，如果是则将该数组元素放到 result 中，并且将 obj[arr[i]] 置为 true
- obj[arr[0]] 肯定为 false，因为 obj 为空，arr[0] 将被放到 result 中，并且 obj[arr[0]] 被置为 true
- 循环的过程中如果有哪个元素(比如第n个元素)和 arr[0] 相同，那么 obj[arr[n]] 将和 obj[arr[0]] 相同(都为 true)，因为 key 相同，value 必定也相同

如此便可去重。

代码如下：

```js
 1 function unique(arr){
 2     var obj={};
 3     var result=[];
 4     for(var i=0;i<arr.length;i++){
 5         if(!obj[arr[i]]){
 6             result.push(arr[i]);
 7             obj[arr[i]]=true;
 8         }
 9     }
10     return result;
11 }
12 var array = [32,12,4,27,12,9,20,32,12,8,44,18];
13 console.log(unique(array));
```

---------------------------------- 华丽的分割线 -----------------------------------

写完之后发现还有一种更简单的数组去重算法，使用了数组的 filter 方法，以下是代码：

```js
1 Array.prototype.unique = function(){
2     return this.filter(function (currentValue, index, arr){ // 当前元素 当前元素索引 当前元素属于的数组
3         return index <= arr.indexOf(currentValue);
4     });
5 };
6 var array = [1,2,3,12,3,2,1,2,30];
7 array.unique();
```

---------------------------------- 2019.1.17 更新 -----------------------------------

今天发现一种更简单的数组去重方法，利用了 ES6 的 Set 数据结构：

```
[...new Set(array)]
```

简直无敌，妈妈再也不用担心面试官考我数据去重算法啦！

<EditInfo time="2016-03-31 22:36" title="阅读(950)  评论(0)" />
