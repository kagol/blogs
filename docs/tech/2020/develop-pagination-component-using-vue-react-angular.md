# 手把手教你使用 Vue/React/Angular 三大框架开发 Pagination 分页组件

![](/assets/develop-pagination-component-using-vue-react-angular-1.png)

引言

> “他在正午、黄昏，在一天里的许多时刻去感受它、记录它，结果也就让我们看到了那么多的不同。他描绘它的角度没变，但它的面目却极大地改变了。”

19世纪著名的印象派画家莫奈，喜欢对着同一处景物，分别画出对象在不同时间，不同光线下的色彩变化。

比如不同季节的三株白杨：

![](/assets/develop-pagination-component-using-vue-react-angular-2.png)

比如一天中不同时刻的浮翁大教堂：

![](/assets/develop-pagination-component-using-vue-react-angular-3.png)

如果同一个组件，用不同的框架实现，会有什么不同呢？

带着这个想法，我分别选用目前最火的Vue/React/Angular三大框架，去实现一个简单的Pagination分页组件。

# 1 组件需求

我们要实现的分页组件大致效果如下：

![](/assets/develop-pagination-component-using-vue-react-angular-4.png)

主要包含以下功能：

1. 点击左右分页按钮可以跳转到上一页/下一页；
2. 点击中间的页码按钮可能跳转到相应的页码；
3. 首页尾页需要始终显示出来（如果只有1页则不显示尾页）；
4. 除首尾页之外，当前页码左右最多只显示2页（共5页）；
5. 页码太多时显示更多页码按钮，点击更多页码按钮跳转5页。

# 2 模块设计

从设计稿可以看出，Pagination组件主要由2个模块组成：

1. Button - 左右分页按钮
2. Pager - 中间的分页器

![](/assets/develop-pagination-component-using-vue-react-angular-5.png)

# 3 空的Pagination组件

我们采用自上而下的方式创建组件，先创建一个空的Pagination组件。

> 注意⚠️
> 我使用的框架版本号如下：
> node@10.15.1
> vue-cli@3.7.0
> vue@2.6.10
> create-react-app@3.0.1
> react@16.8.6
> angular-cli@7.3.9
> angular@7.2.0

## 3.1 Vue版本

使用[Vue CLI](https://cli.vuejs.org/zh/guide/)创建一个基础Vue项目，并输入npm run serve命令启动起来。

然后在components文件夹新建一个pagination文件夹，里面新建我们需要的3个组件文件：

1. 按钮组件 - Button.vue
2. 分页器组件 - Pager.vue
3. 分页组件 - Pagination.vue

![](/assets/develop-pagination-component-using-vue-react-angular-6.png)

在Pagination.vue文件中增加以下代码：

```javascript
<template>
  <div class="x-pagination">
    Pagination组件
  </div>
</template>

<script>
export default {
  name: 'Pagination',
};
</script>
```

Vue组件的特点是将HTML/CSS/JavaScript都统一放在一个.vue后缀的文件中。

对于习惯将HTML/CSS/JavaScript分开编写的前端开发者来说，显得非常自然，加上Vue的语法非常简洁，入门门槛比较低，所以2014年一经推出，很快便席卷全球。

在views/Home.vue中使用Pagination组件：

```javascript
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App by kagol"/>
    <Pagination />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue';
import Pagination from '@/components/pagination/Pagination.vue';
export default {
  name: 'home',
  components: {
    HelloWorld,
    Pagination,
  },
};
</script>
```

组件的使用方式也和普通HTML元素很类似：

```javascript
<Pagination />
```

需要注意的是使用Vue局部组件之前需要在components中声明该组件。

这只是一个空组件，只显示了“Pagination组件”文字，没有太大的意义，不过不要着急，后面我们会一步步完善该组件，实现我们想要的功能，并能不断扩展和演进。在继续开发Vue版本的Pagination组件之前，我们先来看看其他框架如何实现和使用一个组件。

以下是显示效果：

![](/assets/develop-pagination-component-using-vue-react-angular-7.png)

## 3.2 React版本

先来看看React框架，我们同样使用[Create React App](https://create-react-app.dev/)创建一个基础的React项目，并输入命令npm start命令启动。

和Vue项目一样，创建以下3个组件文件：

1. 按钮组件 - Button.js
2. 分页器组件 - Pager.js
3. 分页组件 - Pagination.js

![](/assets/develop-pagination-component-using-vue-react-angular-8.png)

在Pagination.js文件中增加以下代码：

```javascript
import React from 'react';

function Pagination() {
  return (
    <div className="x-pagination">
      Pagination组件
    </div>
  );
}

export default Pagination;
```

可以看到React开发组件的方式和Vue相差非常大，React推崇函数式编程（FP，Functional Programming），每个React组件都是一个函数，HTML/[CSS](https://styled-components.com/)/JavaScript都在函数里面，在函数里面返回模板内容。

需要注意的是在React中HTML元素的class需要写成className，原因是class是JavaScript中的保留关键字，而React使用的JSX是JavaScript的扩展，使用class会导致命名冲突。

React这种写法很特别，初学者可能会不太习惯，不过一旦用习惯了，会觉得非常爽，觉得一切都非常合理，组件就应该这样写。

在App.js中使用Pagination组件：

```javascript
import React from 'react';
import Pagination from './components/pagination/Pagination';
import './App.scss';

function App() {
  return (
    <div className="App">
      <Pagination />
    </div>
  );
}

export default App;
```

使用React组件的方式也很简单，和使用普通HTML元素类似：

```javascript
<Pagination />
```

显示的效果与Vue版本无异。

## 3.3 Angular版本

和Vue/React这种专注View视图层的轻量级框架不同，Angular是一个很重的框架，配备非常完整，Web开发过程中你需要的一切，Angular框架都给你提供好了，你只需要随手取用即可。

我们一起来看看怎么开发一个Angular组件吧。

同样是使用[Angular CLI](https://cli.angular.io/)创建一个基础的Angular项目，并输入命令npm start命令启动。

和React/Vue组件不同，Angular组件不能单独使用，需要包一层Module，因此我们需要创建1个模块文件和3个组件文件：

1. Pagination模块 - pagination.module.ts
2. 按钮组件 - button.component.ts
3. 分页器组件 - pager.component.ts
4. 分页组件 - pagination.component.ts

HTML/CSS可以放在ts文件里面，也可以放在单独的文件里。

一般而言，HTML/CSS内容较少时，会将它们放到ts文件里。

![](/assets/develop-pagination-component-using-vue-react-angular-9.png)

先创建Pagination模块，在pagination.module.ts文件中增加以下代码：

```javascript
import { NgModule } from "@angular/core";
@NgModule()
export class PaginationModule { }
```

然后是创建Pagination组件，在pagination.component.ts文件中增加以下代码：

```javascript
import { Component } from "@angular/core";
@Component({
  selector: 'x-pagination',
  template: `
    <div class="x-pagination">
      Pagination组件
    </div>
  `,
})
export class PaginationComponent { }
```

Angular和Vue/React非常明显的区别已经显示出来：

首先是组件需要依托于Module存在；

然后是不管是定义Module还是Component都需要使用装饰器；

比如定义一个Angular模块需要使用@NgModule装饰器，定义一个Angular组件需要使用@Component装饰器。

还有就是Angular推崇的是面向对象的编程范式，Angular里面的几乎一切都是类和对象，除了刚才一经介绍的模块和组件，还有服务（Service）、管道（Pipe）等，都是类（class）。

为了使用Pagination组件，我们需要先导入Pagination模块，并声明Pagination组件，在app.module.ts文件中增加以下代码：

```javascript
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { PaginationModule } from './components/pagination/pagination.module';
import { PaginationComponent } from './components/pagination/pagination.component';
@NgModule({
  declarations: [
    AppComponent,
    PaginationComponent, // 声明Pagination组件
  ],
  imports: [
    BrowserModule,
    PaginationModule, // 导入Pagination模块
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule
```

然后就能使用Pagination组件了，在app.component.ts文件中增加以下代码：

```javascript
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
  <img width="300" alt="Angular Logo" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==">
</div>
<x-pagination></x-pagination>
```

使用Angular组件的方式和普通的HTML元素类似：

```javascript
<x-pagination></x-pagination>
```

显示的效果与Vue/React一样。

# 4 List组件和假数据

在添加实际的分页功能之前我们需要先做一个List组件，用来模拟分页数据的展示。

根据我们之前介绍的3个框架实现组件的方式，然后稍微增加些额外的知识，我们就能很快做一个数据渲染组件List。

还是先看Vue框架吧。

## 4.1 Vue版本

新建List.vue组件文件，输入以下代码：

```vue
<template>
  <ul>
    <li v-for="list in lists" :key="list.id">
      {{ list.name }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'List',
  props: {
    dataSource: Array
  },
  data() {
    return {
      lists: this.dataSource
    }
  },
  watch: {
    // 对dataSource进行监听，如果发生变化则重新将新值赋给lists
    dataSource: {
      handler(newValue, oldValue) {
        this.lists = newValue;
      }
    }
  }
};
</script>
```

在template模板部分，我们使用Vue的v-for指令，在li元素中循环lists数组，并将name值显示出来。其中的:key是v-bind:key的简写形式，为元素绑定唯一的key值，用于DOM对比时的性能优化。

1) 通过props传入数据

原本我打算直接将lists的值放到props中，通过外部传进来，如下：

```vue
<template>
  <ul>
    <li v-for="list in lists" :key="list.id">
      {{ list.name }}
    </li>
  </ul>
</template>
<script>
export default {
  name: 'List',
  props: {
    lists: Array
  }
};
</script>
```

这样有一个问题，就是外部传入的lists如果发生变化，template里绑定的lists不会相应的变化。

2) 维护内部状态

为了监听props中的值的变化，我把lists放到组件内部状态中（data），外部传入的数据叫dataSource，如下：

```vue
<script>
export default {
  name: 'List',
  props: {
    dataSource: Array
  },
  data() {
    return {
      lists: this.dataSource
    }
  },
};
</script>
```

3) 监听外部props的变化

然后监听dataSource的变化，当dataSource变化时，将新值赋值给lists：

```ts
watch: {
  // 对dataSource进行监听，如果发生变化则重新将新值赋给lists
  dataSource: {
    handler(newValue, oldValue) {
      this.lists = newValue;
    }
  }
}
```

传入List组件的lists数组如下：

```ts
export const lists = [
  { id: 1, name: 'Curtis' },
  { id: 2, name: 'Cutler' },
  { id: 3, name: 'Cynthia' },
  { id: 4, name: 'Cyril' },
  { id: 5, name: 'Cyrus' },
  { id: 6, name: 'Dagmar' },
  { id: 7, name: 'Dahl' },
  { id: 8, name: 'Dahlia' },
  { id: 9, name: 'Dailey' },
  { id: 10, name: 'Daine' },
];
```

使用List组件展示数据：

```vue
<List :data-source="lists" />
```

这里需要注意的是，所有绑定的数据需要使用短横线命名法，比如上面的data-source，对应data中驼峰命名法的dataSource。

展示的效果如下：

![](/assets/develop-pagination-component-using-vue-react-angular-10.png)

## 4.2 React版本

React编写的是函数组件，props的变化会直接反映到模板中，不需要单独监听，所以写起来非常简洁：

```jsx
import React from 'react';
function List({ dataSource }) {
  return (
    <ul className="m-list">
      {
        dataSource.map(list => {
          return <li key={ list.id }>{ list.name }</li>;
        })
      }
    </ul>
  );
}
export default List
```

外部数据通过函数的props参数传入，这里将props进行了对象解构，直接取到了dataSource字段。

还有一点和Vue不太一样，就是React是函数式编程的写法，列表数据的渲染不需要v-for之类的指令，而是通过数组的map方法，直接返回相应的li元素即可，看着非常自然。其中li元素上绑定的key值与Vue中key值的作用类似。

使用方式和Vue的类似：

```html
<List dataSource={dataSource} />
```

## 4.3 Angular版本

Angular稍微麻烦些，需要同时定义Module和Component：

1. List模块 - list.module.ts
2. List组件：list.component.ts

先编写list.module.ts：

```ts
import { NgModule } from "@angular/core";
@NgModule()
export class ListModule { }
```

然后编写List组件list.component.ts：

```ts
import { Component, Input } from "@angular/core";
@Component({
  selector: 'x-list',
  template: `
    <ul>
      <li *ngFor="let list of dataSource; trackBy: trackByIndex">
        {{ list.name }}
      </li>
    </ul>
  `,
})
export class ListComponent {
  @Input() dataSource;
  trackByIndex(index, list){
    return list.id;
  }
}
```

Angular和Vue/React的差别比较大：

1. 一是外部传参方式不同，Angular使用@Input这个装饰器表示外部参数；
2. 二是Angular使用ngFor指令渲染列表数据；
3. 三是Angular优化DOM对比的方式是使用trackBy。

Angular组件的使用方式，倒是和其他框架大同小异：

```html
<x-list [dataSource]="dataSource"></x-list>
```

# 5 基本分页功能

接下来我们开始给Pagination组件添加实际的分页功能。

添加分页功能之前，我们先设计好Pagination组件的API：

1. 数据总数 - total
2. 每页数据数 - defaultPageSize
3. 当前页码 - defaultCurrent
4. 页码改变事件 - onChange

total和defaultPageSize两个参数可以合并为一个参数totalPage（总页码），不过考虑到后续的可扩展性（比如需要改变pageSize），将其拆分开来。

实现分页按钮分以下步骤：

1. 实现一个通用的按钮组件
2. 在分页组件中使用按钮组件
3. 使用Pagination组件对List进行分页

## 5.1 Vue版本

### 5.1.1 实现通用的按钮组件

通过前面编写的空的Pagination组件和List组件，相信大家对Vue组件都很熟悉了。

新建一个Button.vue组件文件，编写以下代码：

```vue
<template>
  <button type="button" @click="$emit('click')"><slot></slot></button>
</template>
<script>
  export default {
    name: 'Button',
  };
</script>
```
这里要特别注意的是：

1. Vue组件向外暴露事件的方式：使用$emit方法；
2. 还有就是Vue定义插槽的方式是使用`<slot>`标签。

其实以上的写法是一种简写形式，实际应该是这样：

```vue
<template>
  <button type="button" @click="click()"><slot></slot></button>
</template>
<script>
  export default {
    name: 'Button',
    methods: {
      click() {
        this.$emit('click');
      }
    },
  };
</script>
```

$emit是Vue组件实例的是一个方法，用于组件对外暴露事件和传递数据，后面会看到传参的例子。

### 5.1.2 在Pagination组件中使用Button组件

做了这么多准备工作，终于可以做些实际的功能。

还记得之前我们编写了一个空的Pagination组件吗？这时我们可以往里面写点功能了。

```vue
<template>
  <div class="x-pagination">
    <Button class="btn-prev" @click="setPage(current - 1)">&lt;</Button>
    {{ current }}
    <Button class="btn-next" @click="setPage(current + 1)">></Button>
  </div>
</template>
<script>
import Button from './Button.vue';
export default {
  name: 'Pagination',
  components: {
    Button,
  },
  // 接口定义 props
  props: {
    defaultCurrent: Number,
    defaultPageSize: Number,
    total: Number,
  },
  // 组件内部状态 data
  data() {
    return {
      current: this.defaultCurrent,
    }
  },
  // 计算属性
  computed: {
    totalPage: function () {
      return Math.ceil(this.total / this.defaultPageSize);
    },
  },
  // 内部方法定义
  methods: {
    setPage(page) {
      if (page < 1) return;
      if (page > this.totalPage) return;
      this.current = page;
      this.$emit('change', this.current);
    },
  }
};
</script>
```

将之前的文字“Pagination组件”删掉，加上上一页（`<`）/下一页（`>`）两个翻页按钮，另外我们也将当前页码current展示在两个翻页按钮中间，这样我们能更清楚当前处于第几页。

由于左尖括号与HTML标签的左尖括号冲突，不能直接使用，需要使用HTML实体字符&lt;代替。

之前设计的Pagination组件的API参数都放到props里面：

```ts
// 接口定义 props
props: {
  defaultCurrent: Number, // 默认当前页码
  defaultPageSize: Number, // 默认每页数据数
  total: Number, // 数据总数
}
```

我们定义了一个组件内部属性current，用于存放动态的页码：

```ts
// 组件内部状态 data
data() {
  return {
    current: this.defaultCurrent,
  }
}
```

需要注意⚠️的是，data属性使用的是函数形式，在函数内部返回一个对象，current定义在该对象里面，这样可以确保每个实例可以维护一份被返回对象的独立的拷贝，具体原因可以参考[官网的解释](https://cn.vuejs.org/v2/guide/components.html#data-%E5%BF%85%E9%A1%BB%E6%98%AF%E4%B8%80%E4%B8%AA%E5%87%BD%E6%95%B0)。

另外我们还定义了一个[计算属性](https://cn.vuejs.org/v2/guide/computed.html#%E8%AE%A1%E7%AE%97%E5%B1%9E%E6%80%A7)，用于获取总页码totalPage（限制页码边界时需要用到）：

```ts
// 计算属性
computed: {
  totalPage: function () {
    return Math.ceil(this.total / this.defaultPageSize);
  },
}
```

最后定义了一个内部方法setPage，用于改变页码：

```ts
// 内部方法定义
methods: {
  setPage(page) {
    if (page < 1) return; // 限制上一页翻页按钮的边界
    if (page > this.totalPage) return; // 限制下一页翻页按钮的边界
    this.current = page;
    this.$emit('change', this.current);
  },
}
```

当点击上一页/下一页翻页按钮时都会调用该方法，传入改变后的页码值。

如果是上一页，则传入current - 1：

```vue
<Button class="btn-prev" @click="setPage(current - 1)">&lt;</Button>
```

下一页则是current + 1：

```vue
<Button class="btn-next" @click="setPage(current + 1)">></Button>
```

setPage中除了设置当前页码之外，还将页码改变事件发射出去，并将当前页码传到组件外部。

```ts
this.$emit('change', this.current);
```

另外也增加了一些限制翻页边界的逻辑，避免翻页时超过页码的边界，导致不必要的Bug：

```ts
if (page < 1) return; // 限制上一页翻页按钮的边界
if (page > this.totalPage) return; // 限制下一页翻页按钮的边界
```

### 5.1.3 使用Pagination组件对List进行分页

有了Pagination组件和List组件，就可以使用Pagination对List进行分页展示。

在Home.vue组件中使用Pagination组件。

```vue
<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <List :data-source="dataList" />
    <Pagination :default-current="defaultCurrent" :default-page-size="defaultPageSize" :total="total" @change="onChange" />
  </div>
</template>
<script>
import Pagination from '@/components/pagination/Pagination.vue';
import List from './List.vue';
import { lists } from '@/db';
import { chunk } from '@/util';
export default {
  name: 'home',
  components: {
    Pagination,
    List,
  },
  data() {
    return {
      defaultCurrent: 1,
      defaultPageSize: 3,
      total: lists.length,
      dataList: [],
    }
  },
  created() {
    this.setList(this.defaultCurrent, this.defaultPageSize);
  },
  methods: {
    onChange(current) {
      this.setList(current, this.defaultPageSize);
    },
    setList: function(current, pageSize) {
      this.dataList = chunk(lists, pageSize)[current - 1];
    }
  }
};
</script>
```

除了defaultCurrent/defaultPageSize/total这3个Pagination组件的参数外，我们在data内部状态中还定义了一个dataList字段，用于动态传入给List组件，达到分页的效果。

在setList方法中将对lists进行分块，并根据当前的页码获取分页数据，并赋值给dataList字段，这样List组件中就会展示相应的分页数据。

```ts
setList: function(current, pageSize) {
  this.dataList = chunk(lists, pageSize)[current - 1];
}
```

setList方法在两处进行调用：created[生命周期方法](https://cn.vuejs.org/v2/guide/instance.html#%E7%94%9F%E5%91%BD%E5%91%A8%E6%9C%9F%E5%9B%BE%E7%A4%BA)和onChange页码改变事件。

created生命周期事件在Vue实例初始化之后，挂载到DOM之前执行，在created事件中我们将第1页的数据赋值给dataList：

```ts
created() {
  this.setList(this.defaultCurrent, this.defaultPageSize);
}
```

因此List组件将展示第1页的数据：

![](/assets/develop-pagination-component-using-vue-react-angular-11.png)

onChange事件是Pagination组件的页码改变事件，当点击上一个/下一页翻页按钮时执行，在该事件中可获取到当前的页码current。

我们在该事件中将当前页码的数据赋值给dataList，这样List组件将展示当前页码的数据，从而达到分页效果。

```ts
onChange(current) {
  this.setList(current, this.defaultPageSize);
}
```

setList方法调用了chunk方法（作用与Lodash中的chunk方法类似），该方法用于将一个数组分割成指定大小的多个小数组，它的源码如下：

```ts
// 将数组按指定大小分块
export function chunk(arr = [], size = 1) {
  if (arr.length === 0) return [];
  return arr.reduce((total, currentValue) => {
    if (total[total.length - 1].length === size) {
      total.push([currentValue]);
    } else {
      total[total.length - 1].push(currentValue);
    }
    return total;
  }, [[]]);
}
```

比如之前的lists数组，如果按每页3条数据进行分块chunk(lists, 3)，则得到的结果如下：

```ts
[
  [
    { "id": 1, "name": "Curtis" },
    { "id": 2, "name": "Cutler" },
    { "id": 3, "name": "Cynthia" }
  ],
  [
    { "id": 4, "name": "Cyril" },
    { "id": 5, "name": "Cyrus" },
    { "id": 6, "name": "Dagmar" }
  ],
  [
    { "id": 7, "name": "Dahl" },
    { "id": 8, "name": "Dahlia" },
    { "id": 9, "name": "Dailey" }
  ],
  [
    { "id": 10, "name": "Daine" }
  ]
]
```

最终实现的分页效果如下：

![](/assets/develop-pagination-component-using-vue-react-angular-12.png)

![](/assets/develop-pagination-component-using-vue-react-angular-13.png)

![](/assets/develop-pagination-component-using-vue-react-angular-14.png)

现在做一个小小的总结，为了实现分页功能，我们：

1. 先实现了一个通用的按钮组件；
2. 然后使用这个通用组件，在Pagination组件中增加上一页/下一页两个翻页按钮，点击可以改变当前页码current；
3. 接着使用做好的Pagination组件对List列表组件进行分页。

接下来我们看下React如何实现以上功能。

## 5.2 React版本

### 5.1.1 实现通用的按钮组件

同样也是先定义一个通用按钮组件Button.js：

```jsx
import React from 'react';
function Button({ onClick, children }) {
  return (
    <button type="button" onClick={ onClick }>{ children }</button>
  );
}
export default Button
```

通过前面开发的Pagination/List组件，相信大家对React的函数组件并不陌生了。

和Vue不同的是，React不需要对外发射事件之类的操作，传什么事件进来直接就发射出去了；

另一个不同是定义插槽的方式，React使用props.children代表组件标签中间传入的内容。

### 5.1.2 在Pagination组件中使用Button组件

然后使用通用按钮组件，在Pagination组件中增加上一页/下一页两个翻页按钮：

```jsx
import React, { useState } from 'react';
import Button from './Button';
function Pagination(props) {
  const { total, defaultCurrent, defaultPageSize, onChange } = props;
  // 声明一个叫 “current” 的 state 变量，用来保存当前的页码；
  // setPage方法是用来改变current的。
  const [current, setPage] = useState(defaultCurrent);
  const totalPage = Math.ceil(total / defaultPageSize);
  return (
    <div className="m-pagination">
      <Button className="btn-prev" onClick={() => {
        if (current < 2) return;
        setPage(current - 1);
        onChange(current - 1);
      }}>&lt;</Button>
      {{ current }}
      <Button className="btn-next" onClick={() => {
        if (current >= totalPage) return;
        setPage(current + 1);
        onChange(current + 1);
      }}>></Button>
    </div>
  );
}
export default Pagination;
```

这里引出React 16.8之后一个很重要的概念：[React Hooks](https://zh-hans.reactjs.org/docs/hooks-intro.html)。

为了在函数组件中定义组件内部状态，从react库中引入了[useState](https://zh-hans.reactjs.org/docs/hooks-state.html)这个方法：

```ts
import React, { useState } from 'react';
```

useState就是一个Hook，通过在函数组件里调用它来给组件添加一些内部state，React会在重复渲染时保留这个state。

useState会返回一对值：当前状态和一个让你更新它的函数。

useState唯一的参数就是初始state，这里是默认当前页码（defaultCurrent），这个初始 state 参数只有在第一次渲染时会被用到。

```ts
const [current, setPage] = useState(defaultCurrent);
```

当点击上一页/下一页翻页按钮时，我们调用了setPage方法，传入新的页码，从而改变current当前页码，实现分页功能。

另外也和Vue版本一样，通过调用onChange方法将页码改变事件发射出去，并将当前页码传递到组件之外。

如果是上一页：

```jsx
<Button className="btn-prev" onClick={() => {
  if (current < 2) return;
  setPage(current - 1);
  onChange(current - 1);
}}>&lt;</Button>
```

如果是下一页：

```jsx
<Button className="btn-next" onClick={() => {
  if (current >= totalPage) return;
  setPage(current + 1);
  onChange(current + 1);
}}>></Button>
```

### 5.1.3 使用Pagination组件对List进行分页

Pagination组件做好了，我们就可以使用它来给List列表组件进行分页啦。

在App.js中引入List和Pagination组件：

```jsx
import React, { useState } from 'react';
import Pagination from './components/pagination/Pagination';
import List from './components/List';
import { lists } from './db';
import { chunk } from './util';
import './App.scss';
function App() {
  const defaultCurrent = 1;
  const defaultPageSize = 3;
  // 设置List默认分页数据：第一页的数据chunk(lists, defaultPageSize)[defaultCurrent - 1]
  const [dataSource, setLists] = useState(chunk(lists, defaultPageSize)[defaultCurrent - 1]);
  return (
    <div className="App">
      <List dataSource={dataSource} />
      <Pagination total={lists.length} defaultCurrent={defaultCurrent} defaultPageSize={defaultPageSize} onChange={current => {
        // 页码改变时，重新设置当前的分页数据
        setLists(chunk(lists, defaultPageSize)[current - 1]);
      }} />
    </div>
  );
}
export default App;
```

同样也是定义了一个List组件的数据源（使用useState这个React Hook）：dataSource，默认设置为第一页的数据：

```ts
// 设置List默认分页数据：第一页的数据chunk(lists, defaultPageSize)[defaultCurrent - 1]
const [dataSource, setLists] = useState(chunk(lists, defaultPageSize)[defaultCurrent - 1]);
```

当页码改变时，Pagination的onChange事件能捕获到并执行，该事件中可以拿到当前页码current，这时我们可以通过调用useState的第2个返回值——setLists方法——来改变dataSource数据源，实现分页功能：

```jsx
<Pagination ... onChange={current => {
  // 页码改变时，重新设置当前的分页数据
  setLists(chunk(lists, defaultPageSize)[current - 1]);
}} />
```

在组件内维护状态的方式，React和Vue相差较大，这里做一个简单的对比：

| ​ | 组件内部状态存放位置 | 改变组件内部状态的方式 |
|:----|:----|:----|
| React | useState第1个返回值。const [state, setState] = useState(initialState]; | useState第2个返回值（一个方法）。const [state, setState] = useState(initialState]; |
| Vue | data方法中。data() {    return {        state: [],    }} | methods对象中。methods: {    setState: function() {        // 执行具体的代码    }} |


另外还有一个需要注意⚠️：

在Vue中，为了初始化List的数据源，没法直接在data中写，比如：

```ts
data() {
  return {
    dataList: chunk(lists, this.defaultPageSize)[this.defaultCurrent - 1],
  }
}
```

而是必须在created初始化方法中写：

```ts
created() {
  this.dataList = chunk(lists, this.defaultPageSize)[this.defaultCurrent - 1];
}
```

而在React中则显得简洁和自然许多：

```ts
// 设置List默认分页数据：第一页的数据
const [dataSource, setLists] = useState(chunk(lists, defaultPageSize)[defaultCurrent - 1];
```

不过React这种写法对初学者是不友好的，习惯之后会觉得很舒服。

## 5.3 Angular版本

### 5.1.1 实现通用的按钮组件

最后来看下Angular如何实现分页功能，思路都一样，先定义一个通用按钮组件button.component.ts：

```ts
import { Component, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'x-button',
  template: `
    <button type="button" (click)="onClick()"><ng-content></ng-content></button>
  `,
})
export class ButtonComponent {
  @Output() btnClick = new EventEmitter();
  onClick() {
    this.btnClick.emit();
  }
}
```

Angular和React/Vue的差别是很明显的：

1. 一是绑定事件的语法不同；
2. 二是定义插槽的方式不同；
3. 三是暴露外部事件和发射外部事件的方式不同。

这里也简单做一个对比：

| ​ | 绑定事件 | 定义插槽 | 外部事件 |
|:----|:----|:----|:----|
| Vue | v-on指令（简写形式：@） | `<slot>`标签 | $emit() |
| React | props传递props.onClick | props.children | props传递，无需发射 |
| Angular | 括号符()(click)="btnClick()" | `<ng-content>`标签 | @Output()+emit() |


### 5.1.2 在Pagination组件中使用Button组件

现在模板中使用通用按钮组件pagination.component.html：

```html
<div class="x-pagination">
  <x-button
    class="btn-prev"
    (btnClick)="setPage(current - 1)"
  >&lt;</x-button>
  {{ current }}
  <x-button
    class="btn-next"
    (btnClick)="setPage(current + 1)"
  >></x-button>
</div>
```

然后在pagination.component.ts中定义具体逻辑：

```ts
import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'x-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent {
  // 组件接口定义
  @Input() total: number;
  @Input() defaultCurrent = 1;
  @Input() defaultPageSize: number;
  @Output() onChange = new EventEmitter();
  // 计算属性
  @Input()
  get totalPage() {
    return Math.ceil(this.total / this.defaultPageSize);
  }
  // 组件内部状态
  current = this.defaultCurrent;
  // 组件方法
  setPage(page) {
    if (this.current < 2) return;
    if (this.current > this.totalPage - 1) return;
    this.current = page;
    this.onChange.emit(this.current);
  }
}
```

和Vue/React一样，定义组件接口/计算属性/内部状态/组件方法，只是具体的语法不同，语法上的对比前面已经说明，不再赘言。

下面直接介绍如何使用Pagination组件对List进行分页。

### 5.1.3 使用Pagination组件对List进行分页

在app.component.html中引入Pagination/List两个组件：

```html
<x-list [dataSource]="dataSource"></x-list>
<x-pagination
  [total]="total"
  [defaultCurrent]="defaultCurrent"
  [defaultPageSize]="pageSize"
  (onChange)="onChange($event)"
></x-pagination>
```

在app.component.ts中定义具体逻辑：

```ts
import { Component, OnInit } from '@angular/core';
import { lists } from './db';
import { chunk } from './util';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  defaultCurrent = 1;
  defaultPageSize = 3;
  total = lists.length;
  dataSource = [];
  ngOnInit() {
    this.setLists(this.defaultCurrent, this.defaultPageSize);
  }
  onChange(current) { // 页码改变
    this.setLists(current, this.defaultPageSize);
  }
  setLists(page, pageSize) {
    this.dataSource = chunk(lists, pageSize)[page - 1];
  }
}
```

思路也是一样的，定义一个List组件的数据源dataSource，组件初始化（ngOnInit）时给dataSource设置初始分页数据（第一页数据），然后在页码改变时重新设置dataSource的值，不再赘言。

只是有一些差异需要注意⚠️：

1. Angular的初始化方法是ngOnInit，Vue是created；
2. Angular绑定属性的方式是使用中括号[]，Vue是使用v-bind指令（或者简写方式:key）。

至此三大框架实现基本分页功能的方法及其差异都已介绍完毕，后一节将介绍本文最核心的内容：分页器的实现。

# 6 分页器组件Pager

我们再来回顾下分页组件的模块图：

![](/assets/develop-pagination-component-using-vue-react-angular-15.png)

中间显示页码的部分就是分页器，它的核心是页码显示和页码省略的逻辑。

## 6.1 页码显示策略

为了方便地跳转到任意页码，却又不至于在页面中显示太多页码，页码并不是始终全部显示出来的，而是在页码少时全部显示，页码多时只显示部分页码。这就存在显示策略问题。

我们从当前页码出发，比如模块图中当前页码是第5页：

![](/assets/develop-pagination-component-using-vue-react-angular-16.png)

那么以该页码为中心，两边显示一定的页码，比如两边各显示2页；

另外首页和尾页需要始终显示出来，方便回到首页和跳转到尾页；

首页到第3页中间的页码以及第7页到尾尾的页码都隐藏起来，并且支持点击左/右更多按钮，快捷跳转多页（比如5页）的功能。

另外需要考虑页码少的情况，如果只有8页怎么显示呢？

很简单，直接去掉右边的更多按钮就好：

![](/assets/develop-pagination-component-using-vue-react-angular-17.png)

如果当前页码在第4页呢？去掉左边的更多按钮，显示右边的更多按钮即可：

![](/assets/develop-pagination-component-using-vue-react-angular-18.png)

以上就是全部的页码显示策略。

现简述如下：

1. 首页尾页需要始终显示出来（如果只有1页则不显示尾页）；
2. 除首尾页之外，当前页码左右最多只显示2页（共5页）；
3. 其他页码折叠起来，用更多按钮代替。

接下来看看如何用三大框架实现这个逻辑。

## 6.2 Vue版本

### 6.2.1 组件接口设计

编写Pager分页器组件之前，还是设计好组件的API：

1. 总页数 - totalPage
2. 默认当前页码 - defaultCurrent
3. 页码改变事件 - onChange

### 6.2.2 基本模板框架

然后先写好模板，在Pager.vue的`<template>`中编写以下代码：

```javascript
<template>
  <ul class="x-pager">
    <li class="number">1</li>
    <li class="more left"></li>
    <li class="number"></li>
    <li class="more right"></li>
    <li class="number">{{ totalPage }}</li>
  </ul>
</template>
```

再在`<script>`中写基本的逻辑：

```javascript
<script>
import Vue from 'vue';
export default {
  name: 'Pager',
  // 组件接口定义
  props: {
    totalPage: Number, // 总页数
    defaultCurrent: Number, // 默认当前页码
  },
};
</script>
```

搭好基本框架之后，我们采取[最小可用产品](http://www.woshipm.com/pd/879821.html)（Minimum Viable Product，MVP）的思路：

![](/assets/develop-pagination-component-using-vue-react-angular-19.png)

分3步实现分页器功能：

1. 第1步 实现首尾翻页
2. 第2步 实现快捷分页
3. 第3步 实现分页按钮组

![](/assets/develop-pagination-component-using-vue-react-angular-20.png)

### 6.2.3 第1步：首/尾页翻页逻辑

先显示第1步：首页尾页的显示和跳页逻辑：

首页

```javascript
<li
  class="number"
  :class="{ active: this.current == 1 }"
  @click="setPage(1)"
>1</li>
```

尾页

```javascript
<li
  class="number"
  :class="{ active: this.current == totalPage }"
  v-if="totalPage !== 1"
  @click="setPage(totalPage)"
>{{ totalPage }}</li>
```

由于当前页码有可能从Pager组件外部改变（上一页/下一页按钮），因为需要监听defaultCurrent的变化，需要增加组件内部状态current代替defaultCurrent：

```javascript
data() {
  return {
    current: this.defaultCurrent, // 当前页码
  }
}
```

然后监听defaultCurrent，当外部传入的defaultCurrent发生变化时，将新值赋值给current：

```javascript
watch: {
  defaultCurrent: {
    handler(newValue, oldValue) {
      this.current = newValue;
    }
  }
}
```

接着定义翻页方法：

```javascript
methods: {
  setPage(page) {
    // 对页码进行限制，不能超出[1, totalPage]的范围
    let newPage = page;
    if (page < 1) newPage = 1;
    if (page > this.totalPage) newPage = this.totalPage;
    this.current = newPage; // 设置当前页码
    this.$emit('change', this.current); // 向外发射页码改变事件
  }
}
```

显示的效果如下：

![](/assets/develop-pagination-component-using-vue-react-angular-21.png)

### 6.2.4 在Pagination组件中使用Pager组件

我们可以在Pagination组件中试试初版的Pager。

在Pagination.vue中，去掉之前页码显示的那一行代码，使用Pager组件替代：

```javascript
<template>
  <div class="m-pagination">
    <Button class="btn-prev" @click="setPage(current - 1)">&lt;</Button>
    // 去掉该行 {{ current }}，替换成以下Pager组件
    <Pager :total-page="totalPage" :default-current="current" @change="onChange"></Pager>
    <Button class="btn-next" @click="setPage(current + 1)">></Button>
  </div>
</template>
```

然后增加Pager的onChange页码改变的回调事件：

```javascript
methods: {
  onChange(current) {
    this.current = current; // 设置当前页码
    this.$emit('change', this.current); // 向Pagination组件外发射页码改变事件
  }
}
```

可以试试首/尾页的翻页效果：

![](/assets/develop-pagination-component-using-vue-react-angular-22.png)

### 6.2.5 第2步：增加左/右更多按钮的翻页功能

有了首尾页的翻页还不够，还需要继续完善更多按钮的快捷翻页功能。

先梳理下更多按钮的显示逻辑：

1. 中间按钮一共5页，加上首尾按钮2页，一共7页，也就是说只有大于7页，才有可能显示更多按钮；
2. 左右更多按钮会随着当前页码的不同而显示或隐藏，以第4页和倒数第4页为界；
3. 当页码大于第4页时，应该显示左边更多按钮；
4. 当页码小于倒数第4页，都应该显示右边更多按钮。

具体实现如下：

```javascript
<!-- 左更多按钮 -->
<li
  class="more left"
  v-if="totalPage > 7 && current >= 5"
></li>
<!-- 右更多按钮 -->
<li
  class="more right"
  v-if="totalPage > 7 && current <= totalPage - 4"
></li>
```

不过我们不想写死这些数字，假设中间页码数为centerSize（这里是5），可以重构成：

```javascript
<li
  class="more left"
  v-if="totalPage > centerSize + 2 && current >= centerSize"
></li>
<li
  class="more right"
  v-if="totalPage > centerSize + 2 && current <= totalPage - centerSize + 1"
></li>
```

接着是增加快捷翻页事件：

```javascript
<li
  class="more left"
  v-if="totalPage > centerSize + 2 && current >= centerSize"
  @click="setPage(current - jumpSize)"
></li>
<li
  class="more right"
  v-if="totalPage > centerSize + 2 && current <= totalPage - centerSize + 1"
  @click="setPage(current - jumpSize)"
></li>
```

注意⚠️：为了不写死每次快捷跳转的页码，我们用jumpSize保存该值。

接下来我们可以看看快捷翻页的效果，为了清楚看出当前处于哪一页，我们暂时将中间为哦未实现的页码按钮组显示成当前页码：

```javascript
<!-- 中间页码组 -->
<li class="number">{{ current }}</li>
```

初始在第1页：         

![](/assets/develop-pagination-component-using-vue-react-angular-23.png)

点击右更多按钮之后（跳转到第6页）：         

![](/assets/develop-pagination-component-using-vue-react-angular-24.png)

再点击右更多按钮（跳转到第11页）：         

![](/assets/develop-pagination-component-using-vue-react-angular-25.png)

点击左更多按钮则又回到第6页，完美达到预期。

### 6.2.6 第3步：实现中间的页码按钮组

中间页码组centerPages是一个长度在[0, centerSize]之间的数组，它的值由总页码totalPage和当前页码current共同决定，计算规则如下：

1. 如果总页码小于等于7，则centerPages是除首尾页之外的所有页码；
2. 如果总页码大于7，则centerPages是以current为中心，左右各加两页组成的页码数组。

将centerPages定义为计算属性，具体实现如下：

```javascript
computed: {
  centerPages: function() {
    // 中间页码计算
    let centerPage = this.current;
    if (this.current > this.totalPage - 3) {
      centerPage = this.totalPage - 3;
    }
    if (this.current < 4) {
      centerPage = 4;
    }
    if (this.totalPage <= this.centerSize + 2) {
      // 总页码较小时，全部显示出来
      const centerArr = [];
      for (let i = 2; i < this.totalPage; i++) {
        centerArr.push(i);
      }
      return centerArr;
    } else {
      // 总页码较大时，只显示中间centerSize个页码
      const centerArr = [];
      for (let i = centerPage - 2; i <= centerPage + 2; i++) {
        centerArr.push(i);
      }
      return centerArr;
    }
  }
```

有了中间页码数组，就可以渲染中间页码组：

```javascript
<!-- 中间页码组 -->
<li
  class="number"
  v-for="(page, index) in centerPages"
  :key="index"
>{{ page }}</li>
```

接着为其增加active类（用于高亮）和绑定点击事件（用于跳转到相应的页码）：

```javascript
<!-- 中间页码组 -->
<li
  class="number"
  :class="{ active: current === page }"
  v-for="(page, index) in centerPages"
  :key="index"
  @click="setPage(page)"
>{{ page }}</li>
```

最终效果如下：

只有1页的情况：         

![](/assets/develop-pagination-component-using-vue-react-angular-26.png)

<=7页的情况：         

![](/assets/develop-pagination-component-using-vue-react-angular-27.png)

 >7页且当前页码<=4页的情况：         

![](/assets/develop-pagination-component-using-vue-react-angular-28.png)

>7页且当前页码>4页的情况：         

![](/assets/develop-pagination-component-using-vue-react-angular-29.png)

至此，Vue版本分页器组件已全部实现，整个Pagination组件也全部实现。

接下来看看React/Angular如何实现分页器吧。

## 6.3 React版本

同样采[MVP](http://www.woshipm.com/pd/879821.html)的思路，我们按以下步骤开发Pager分页器组件：

1. 搭建基本模板框架
2. 实现首尾页翻页
3. 实现更多按钮快捷翻页
4. 实现页码按钮组翻页

### 6.3.1 基本模板框架

我们先搭建基本模板框架，在Pager.js中编写以下代码：

```javascript
import React from 'react';
function Pager({ totalPage, defaultCurrent, onChange }) {
  return (
    <ul className="x-pager">
      <li className="number">1</li>
      <li className="more left"></li>
      <li className="number"></li>
      <li className="more right"></li>
      <li className="number">{ totalPage }</li>
    </ul>
  );
}
export default Pager;
```

这只是一个空壳子，什么都做不了，接下来我们加点实际的功能。

### 6.3.2 第1步：首/尾页翻页逻辑

增加首尾页显示条件、高亮条件和翻页功能。

```javascript
import React, { useState } from 'react';
function Pager({ totalPage, defaultCurrent, onChange }) {
  // 使用useState定义内部状态：当前页码current
  const [current, setPage] = useState(defaultCurrent);
  return (
    <ul className="x-pager">
      <li
        className={'number' + (current == 1 ? ' active' : '')}
        onClick={() => {
          setPage(1);
          onChange(1);
        }}
      >1</li>
      <li className="more left"></li>
      <li className="number"></li>
      <li className="more right"></li>
      { totalPage !== 1 && <li
        className={'number' + (current == totalPage ? ' active' : '')}
        onClick={() => {
        setPage(totalPage);
          onChange(totalPage);
        }}
      >{ totalPage }</li> }
    </ul>
  );
}
export default Pager;
```

值得注意的是条件渲染的写法，React和Vue还是有点区别的：

1. React是直接用大括号{}包裹，然后像写JS一样写分支判断
2. Vue在HTML元素中使用的是v-if指令进行分支判断

另外就是Vue中有标签class绑定的功能，而React没有类似的功能，需要通过在{}大括号中写三目运算符来判断高亮。

至此Pager已经可以直接拿去Pagination中使用了，不过只能首页和尾页翻页，接下来继续增强Pager的功能。

### 6.3.3 第2步：增加左/右更多按钮的翻页功能

更多按钮显示的逻辑和Vue版本一样：

1. 只有大于7页，才有可能显示更多按钮；
2. 左右更多按钮会随着当前页码的不同而显示或隐藏，以第4页和倒数第4页为界；
3. 当页码大于第4页时，应该显示左边更多按钮；
4. 当页码小于倒数第4页，都应该显示右边更多按钮。

左更多按钮：

```javascript
const centerSize = 5; // 中间按钮组的页码数
const jumpSize = 5; // 快捷翻页的页数
{
  totalPage > centerSize + 2 && current >= centerSize
  && <li className="more left"
    onClick={() => {
setPage(current - jumpSize); // 设置快捷翻页后的新页码
onChange(current - jumpSize); // 页码改变时的外部回调事件
    }}
  ></li>
}
```

右更多按钮：

```javascript
{
  totalPage > centerSize + 2 && current <= totalPage - centerSize + 1
  && <li className="more right"
    onClick={() => {
    setPage(current + jumpSize);
      onChange(current + jumpSize);
    }}
  ></li>
}
```

最后实现页码按钮组功能。

### 6.3.4 第3步：实现中间的页码按钮组

主要是需要计算好centerPages页码数组，计算逻辑和Vue的一样：

1. 如果总页码小于等于7，则centerPages是除首尾页之外的所有页码；
2. 如果总页码大于7，则centerPages是以current为中心，左右各加两页组成的页码数组。

先计算centerPages：

```javascript
// 计算中间页码数组
const centerPages = [];
let centerPage = current;
if (current > totalPage - 3) {
  centerPage = totalPage - 3;
}
if (current < 4) {
  centerPage = 4;
}
if (totalPage <= centerSize + 2) {
  for (let i = 2; i < totalPage; i++) {
    centerPages.push(i);
  }
} else {
  for (let i = centerPage - 2; i <= centerPage + 2; i++) {
    centerPages.push(i);
  }
}
```

然后将其显示出来：

```javascript
{
  centerPages.map((page, index) => {
    return (
      <li
        key={index}
        className={'number' + (page == current ? ' active' : '')}
        onClick={() => {
          setPage(page);
          onChange(page);
        }}
      >{ page }</li>
    );
  })
}
```

列表渲染的方式需要注意⚠️：

1. React依然使用的是大括号包裹，然后用JS的map方法进行迭代；
2. Vue是在HTML标签中使用v-for指令进行列表渲染。

由于Pager中的当前页码有可能通过外部改变（比如上一页/下一页按钮），因为在传入的defaultCurrent变化时，需要动态改变current，这需要借助另一个React Hook——useEffect——来实现，具体代码如下：

```javascript
// 外部传入的defaultCurrent变化时，需要重新设置current
useEffect(() => {
  setPage(defaultCurrent);
});
```

另外需要注意的就是更多按钮快捷翻页可能会越界，需要加以显示，为此我们编写了一个limitPage方法：

```javascript
const limitPage = (page) => {
  if (page < 1) return 1;
  if (page > totalPage) return totalPage;
  return page;
}
```

在更多按钮的事件中使用：

左更多按钮：

```javascript
{
  totalPage > centerSize + 2 && current >= centerSize
  && <li className="more left"
    onClick={() => {
    setPage(limitPage(current - jumpSize)); // 设置快捷翻页后的新页码
    onChange(limitPage(current - jumpSize)); // 页码改变时的外部回调事件
    }}
  ></li>
}
```

右更多按钮：

```javascript
{
  totalPage > centerSize + 2 && current <= totalPage - centerSize + 1
  && <li className="more right"
    onClick={() => {
      setPage(limitPage(current + jumpSize));
      onChange(limitPage(current + jumpSize));
    }}
  ></li>
}
```

这样就完成了React版本的Pager分页器组件，除了细微语法上的差异外，大部分代码逻辑都是一样的。

接下来即将介绍的Angular版本的Pager也是一样的，大部分逻辑都可以复用。

## 6.4 Angular版本

Angular实现Pager的思路和Vue/React也差不多，就是写法上的差异，同样按MVP的思路，分成以下3个步骤：

1. 第1步 实现首尾翻页
2. 第2步 实现快捷分页
3. 第3步 实现分页按钮组

先实现首/尾页翻页功能。

### 6.4.1 第1步：实现首/尾页翻页逻辑

先做模板，在pager.component.html中编写以下代码：

```javascript
<ul class="x-pager">
  <li [ngClass]="{
      number: true,
      active: 1 == current
    }"
    (click)="setPage($event, 1)"
  >1</li>
  <li class="more left"></li>
  <li class="number" ></li>
  <li class="more right"></li>
  <li *ngIf="totalPage !== 1" [ngClass]="{
      number: true,
      active: totalPage == current
    }"
    (click)="setPage($event, totalPage)"
  >{{ totalPage }}</li>
</ul>
```

然后在pager.component.ts中写具体逻辑：

```javascript
import { Component, Input, Output, EventEmitter } from "@angular/core";
@Component({
  selector: 'x-pager',
  templateUrl: './pager.component.html',
  styleUrls: ['./pager.component.scss']
})
export class PagerComponent {
  @Input() totalPage: number;
  @Input() defaultCurrent: number;
  @Output() onChange = new EventEmitter();
  current = this.defaultCurrent;
  setPage($event, page) {
    this.current = page;
    this.onChange.emit(this.current);
  }
}
```

### 6.4.2 第2步：实现左/右更多按钮的翻页功能

由于用于设置页码的方法setPage前面已经写好了，因此只需要在模板中新加左/右更多按钮即可：

```javascript
<li
  class="more left"
  *ngIf="totalPage > centerSize + 2 && current >= centerSize"
(click)="setPage($event, current - centerSize)"
></li>
<li
  class="more right"
  *ngIf="totalPage > centerSize + 2 && current <= totalPage - centerSize + 1"
(click)="setPage($event, current + centerSize)"
></li>
```

### 6.4.3 第3步：实现中间的页码按钮组

最后是实现页码按钮组，关键还是centerPages数组的计算，计算逻辑可以复用Vue/React的。具体实现如下：

```javascript
@Input()
get centerPages() {
  let centerPage = this.current;
  if (this.current > this.totalPage - 3) {
    centerPage = this.totalPage - 3;
  }
  if (this.current < 4) {
    centerPage = 4;
  }
  const centerArr = [];
  if (this.totalPage < this.centerSize + 2) {
    for (let i = 2; i < this.totalPage; i++) {
      centerArr.push(i);
    }
  } else {
    for (let i = centerPage - 2; i <= centerPage + 2; i++) {
      centerArr.push(i);
    }
  }
  return centerArr;
}
```

类似Vue中的计算属性（computed）。

然后是使用centerPages渲染页码按钮组：

```javascript
<li
  [ngClass]="{
number: true,
active: page == current
}"
  *ngFor="let page of centerPages"
  (click)="setPage($event, page)"
>{{ page }}</li>
```

至此三大框架的Pager组件都已实现，因而Pagination组件也告一段落。

最后做一个总结，大致对比下Vue/React/Angular三大框架开发组件的差别。

| 框架 | 从外向内通讯 | 从内向外通讯 | 编程范式 | 列表渲染 | 条件渲染 | 事件绑定 | 内部状态 | 插槽定义方式 | 计算属性 | 监听外部传入的参数变量 |
|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|:----|
| Vue | props | $emit() | 响应式 | v-for指令 | v-if指令 | v-bind:event（简写@event） | data | `<slot>` | computed | watch |
| React | props | props | 函数组件 | {}包裹map | {}包裹三目运算符 | onEvent | useState | props.children | 直接写 | useEffect |
| Angular | @Input() | @Output()emit() | 面向对象 | \*ngFor指令 | \*ngIf指令 | (event) | 直接写 | `<ng-content>` | @Input() get | ngOnChanges |
