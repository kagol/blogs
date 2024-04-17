# 一个 OpenTiny，Vue2 Vue3 都支持！

大家好，我是 Kagol，[OpenTiny](https://opentiny.design/) 开源社区运营，[TinyVue](https://github.com/opentiny/tiny-vue) 跨端、跨框架组件库核心贡献者，专注于前端组件库建设和开源社区运营。

今天给大家介绍如何同时在 Vue2 和 Vue3 项目中使用 [TinyVue](https://opentiny.design/tiny-vue)。

TinyVue 是一套跨端、跨框架的企业级 UI 组件库，支持 Vue 2 和 Vue 3，支持 PC 端和移动端。

🌈 特性：

-   📦 包含 80 多个简洁、易用、功能强大的组件
-   🖖 一套代码同时支持 Vue 2 和 Vue 3
-   🖥️ 一套代码同时支持 PC 端和移动端
-   🌍 支持国际化
-   🎨 支持主题定制
-   📊 组件内部支持配置式开发，可支持低代码平台可视化组件配置
-   💡 采用模板、样式、逻辑分离的跨端、跨框架架构，保障灵活性和可移植性


![image.png](/assets/opentiny-support-vue2-and-vue3-1.png)

## 在 Vue2 项目中使用

### 创建 Vue2 项目

先用 Vue CLI 创建一个 Vue2 项目。

```
// 安装 Vue CLI
npm install -g @vue/cli

// 创建 Vue2 项目
vue create vue2-demo
```

输出以下信息说明项目创建成功

```
🎉  Successfully created project vue2-demo.
👉  Get started with the following commands:

 $ cd vue2-demo
 $ yarn serve
```

创建好之后可以执行以下命令启动项目

```
yarn serve
```

输出以下命令说明启动成功

```
  App running at:
  - Local:   http://localhost:8080/ 
  - Network: http://192.168.1.102:8080/
```

效果如下

![image.png](/assets/opentiny-support-vue2-and-vue3-2.png)

### 安装和使用 TinyVue

安装 TinyVue

```
npm i @opentiny/vue@2
```

在 src/views/Home.vue 中使用 TinyVue 组件

```vue
<template>
  <div class="home">
    <!-- 3. 使用 TinyVue 组件 -->
    <Button>OpenTiny</Button>
    <Alert description="Hello OpenTiny"></Alert>
  </div>
</template>

<script lang="ts">
// 1. 引入 TinyVue 组件
import { Button, Alert } from '@opentiny/vue'

@Component({
  components: {
    // 2. 注册 TinyVue 组件
    Button, Alert
  },
})
</script>
```

效果如下


![image.png](/assets/opentiny-support-vue2-and-vue3-3.png)

## 在 Vue3 项目中使用

### 创建 Vue3 项目

使用 Vite 创建一个 Vue3 项目

```
npm create vite vue3-demo
```

输出以下信息说明项目创建成功

```
Done. Now run:

  cd vue3-demo
  npm install
  npm run dev
```

创建好之后可以执行以下命令启动项目

```
npm i
npm run dev
```

输出以下命令说明启动成功

```
  VITE v3.2.5  ready in 391 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

效果如下


![image.png](/assets/opentiny-support-vue2-and-vue3-4.png)

### 安装和使用 TinyVue

安装 TinyVue

```
npm i @opentiny/vue@3
```

在 src/App.vue 中使用 TinyVue 组件

```vue
<script setup lang="ts">
// 1. 引入 TinyVue 组件
import { Button, Alert } from '@opentiny/vue'
</script>
<template>
  <!-- 2. 使用 TinyVue 组件 -->
  <Button>OpenTiny</Button>
  <Alert description="Hello OpenTiny"></Alert>
</template>
```

效果如下


![image.png](/assets/opentiny-support-vue2-and-vue3-5.png)


## 总结

可以看到在 Vue2 和 Vue3 项目中组件的使用方式完全一样，这也就意味着，使用 TinyVue 的 Vue2 项目可以无缝迁移到 Vue3 项目中。

- 无需修改 API
- 无需担心组件功能不一致
- 无需担心业务出现不连续

更多 TinyVue 组件，欢迎体验：[https://opentiny.design/tiny-vue](https://opentiny.design/tiny-vue)

<EditInfo time="2023-04-07 07:28" title="32622展现 · 1153阅读 · 22点赞 · 15评论 · 24收藏" />
