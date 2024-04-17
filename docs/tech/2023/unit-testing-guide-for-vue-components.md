# 前端 Vuer，请收好这份《Vue组件单元测试》宝典，给自己多一些安全感

作为一名前端，在做业务开发的过程中，你是否曾经：

- 因为担心上线之后出bug，而反复手工验证自己负责的模块
- 不敢修改现有的“屎山”（别人写的或者是自己1年前写的）代码，从而不断地编写if/else
- 发现业务中有很多重复的代码，每次一改好多地方都要改，但又不敢重构，担心重构之后出bug
- 战战兢兢地修复一个陈年bug，就怕引起N个新bug

如果你中了以上任何一条，说明你现在缺乏安全感，你担心、你害怕、你不敢、你战战兢兢、你如履薄冰。

每天写代码都处在担惊受怕当中，程序员的尊严何在！

程序员的安全感要自己给自己，是时候改变现状了！

我们有很多方法可以给自己安全感，比如：

- 配置代码检测工具 ESLint
- 安装拼写检查插件 Code Spell Checker
- 代码评审 Code Review
- 结对编程 Pair programming
- 编写单元测试 Unit Test

本文主要给大家介绍如何在 Vue 项目中编写单元测试。

## 1 搭环境

我们的单元测试环境基于 `vitest` + `@vue/test-utils`。 

前提：你需要有一个 Vue 项目，没有的话可以参考 [Vite](https://cn.vitejs.dev/guide/#scaffolding-your-first-vite-project) 官网进行创建。

第一步，在你的 Vue 项目中安装必要的依赖包。

```shell
npm i -D vitest @vue/test-utils happy-dom @vitest/coverage-v8
```

在 `vite.config.ts` 文件中增加以下配置。

```ts
import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],

  // 新增
  test: {
    environment: 'happy-dom'
  }
})
```

在 `package.json` 文件中增加相应的脚本命令
```

  "scripts": {
    "dev": "vite",
    "build": "vue-tsc && vite build",
    "preview": "vite preview",
    
    // 新增
    "test": "vitest"
  },
```

我们尝试执行以下命令：

```
npm test
```

会发现控制台会打印以下日志：

```
$ npm test

> vue3-vite@0.0.0 test
> vitest


 DEV  v0.33.0 /vue3-vite-demo

include: **/*.{test,spec}.?(c|m)[jt]s?(x)
exclude:  **/node_modules/**, **/dist/**, **/cypress/**, **/.{idea,git,cache,output,temp}/**, **/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*
watch exclude:  **/node_modules/**, **/dist/**

No test files found, exiting with code 1
```

意思是：没有找到单元测试文件。

除此之外，我们还能获取一些额外的信息，比如 include 表明了单元测试文件的命令格式：

```
**/*.{test,spec}.?(c|m)[jt]s?(x)
```

我们在 `src/components` 目录下创建一个 `HelloWorld.spec.ts` 文件。

```ts
import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import HelloWorld from './HelloWorld.vue'

describe('测试 HelloWorld 组件', () => {

  it('测试基本功能', async () => {
    const wrapper = mount(HelloWorld)
    expect(wrapper.exists()).toBeTruthy()
  })
})
```

再次执行 `npm test` 命令

```
$ npm test

 ✓ src/components/HelloWorld.spec.ts (1)
   ✓ 测试 HelloWorld 组件 (1)
     ✓ 测试基本功能

 Test Files  1 passed (1)
      Tests  1 passed (1)
   Start at  23:34:49
   Duration  126ms
```

会提示：有一个单元测试用例通过。

这样我们的 Vue 项目单元测试环境就搭建成功，并且完成了第一个 Vue 单元测试用例🎉🎉

## 2 测什么

有了单元测试环境，我们可以在其中任意发挥，给自己满满的安全感。

那么我们应该如何给 Vue 组件编写单元测试呢？

我们以 OpenTiny Vue 的 [DatePicker](https://opentiny.design/tiny-vue/zh-CN/os-theme/components/date-picker) 组件为例。

效果图：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e9bb12522aab4a99a967926d6c77129f~tplv-k3u1fbpfcp-watermark.image?)

我们可以按照以下步骤编写单元测试用例：

### Step 1：测试默认行为

- 测试基本功能：点击日期输入框，应该弹出日期选择面板，点击日期选择面板中的日期，面板消失，并在输入框中显示选中的日期
- 测试清除日期：鼠标移到已经选择日期的输入框中，应该出现清除日期的图标按钮，点击清除日期图标，输入框中的日期被清除
- ...

### Step 2：测试每一个单独的 API

- 测试 disabled 属性：设置 disabled 属性之后，日期输入框应该变成禁用状态，点击输入框，不会弹出日期选择面板
- 测试 clearable 属性：设置 clearable 为 false 之后，鼠标移到输入框上，不显示清除日期的图标
- ...

### Steps 3：测试 API 的边界值

- 测试日期越界：设置 v-model 的值为 `"2023-07-32"`，应该不显示日期
- 测试错误格式的日期：设置 v-model 的值为数值 `20230713`，应该不显示日期
- ...

### Steps 4：测试 API 之间的组合

- 测试 type/format 三个属性之间的组合：设置 `type="week"` 和 `format="yyyy 年第 WW 周"`，日期选择面板应该变成选择周，选择5月7日到13日这周之后，输入框中显示的内容应该是 `2023 年第19周`
- ...

```
<tiny-date-picker
  v-model="value"
  type="week"
  format="yyyy 年第 WW 周"
></tiny-date-picker>
```

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2b2e17c19df74c88b663834387b8a5c4~tplv-k3u1fbpfcp-watermark.image?)

## 3 怎么测

### 单测三大件：describe / test / expect

一个单元测试包含三个部分：
- describe 测试套，里面可以包含多个测试用例，
- it(test) 测试用例
- expect 断言语句

```js
import { describe, it, expect } from 'vitest'

describe('测试 HelloWorld 组件', () => {
  it('测试基本功能', async () => {
    const wrapper = mount(HelloWorld)
    wrapper.
    expect(wrapper.exists()).toBeTruthy()
    expect(wrapper.find('.card').exists()).toBeTruthy()
  })
  
  it('测试 msg 属性', () => { ... })
})
```

### 模拟 Vue 组件挂载：mount 和 wrapper

每个单元测试里面测试 Vue 组件的表现是否正常，需要借助 `@vue/test-utils` 的 mount 方法，模拟组件的挂载。

```
import { mount } from '@vue/test-utils'
import HelloWorld from './HelloWorld.vue'

const wrapper = mount(HelloWorld, {
  props: {
    msg: 'OpenTiny'
  }
})
```

用 mount 函数包裹组件，得到的是一个挂载好的组件对象，该对象包含了一系列实用的方法可以用于组件的测试。

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0481e075139643cca71f711a212f2f28~tplv-k3u1fbpfcp-watermark.image?)

比较常用的有：

- find：寻找组件内部的 DOM 节点
- findComponent：寻找子组件
- exists：判断组件或元素是否存在
- attributes：获取 DOM 节点的属性
- classes：获取 DOM 节点的 class
- ...

更多 wrapper 方法请参考：[Vue Test Utils 官网文档](https://test-utils.vuejs.org/api/#wrapper-methods)

### 写单测就是写断言

有了 wrapper，就可以对 Vue 组件做断言。

比如以下断言用于判断 DOM 节点 `.card` 是否存在，`toBeTruthy()`用于断言一个值是否为 true。

```
expect(wrapper.find('.card').exists()).toBeTruthy()
```

常见的断言类型有：
- toBe：用于断言原始类型是否相等，比如：`expect(1+1).toBe(2)`
- toBeTruthy：用于断言一个值是否为 true
- not：用于否定断言，比如：`expect(1+1).toBe(3)`
- toBeGreaterThan：断言实际值是否大于接收到的值
- toEqual：断言实际值是否等于接收到的值或具有相同的结构（如果是对象，则递归比较它们），注意和 `toBe` 的区别
- toContain：断言实际值是否在数组中
- toMatch：断言字符串是否与正则表达式或字符串匹配
- toHaveBeenCalled：用于测试函数是否已被调用
- ...

更多断言类型请参考：[Vitest 官网](https://cn.vitest.dev/api/expect.html)

### 一个 DatePicker 组件的小例子

测试 DatePicker 组件的基本功能：点击日期输入框，应该弹出日期选择面板。

```js
it('测试 DatePicker 组件的基本功能', async () => {
  const value = ''
  const wrapper = mount(() => <DatePicker v-model={value}></DatePicker>)
  expect(wrapper.exists()).toBe(true)

  // 没有点击日期输入框之前，没有日期选择面板
  expect(document.querySelector('.tiny-date-picker')).not.toBeTruthy()

  await wrapper.find('input').trigger('focus')

  // 点击日期输入框之后，出现日期选择面板
  expect(document.querySelector('.tiny-date-picker')).toBeTruthy()
})
```

参考：
- [Vitest 官网](https://cn.vitest.dev/guide/)
- [Vue Test Utils 官网](https://test-utils.vuejs.org/guide/)

<EditInfo time="2023-07-14 07:44" title="10295展现 · 366阅读 · 6点赞 · 0评论 · 14收藏" />
