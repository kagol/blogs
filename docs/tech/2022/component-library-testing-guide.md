# 请收下这份《Vue DevUI 公开测试参考指南》


为了方便大家参与 Vue DevUI 1.0 版本的公测，我们特意准备了一份《Vue DevUI 公开测试参考指南》。

- 官网：[https://vue-devui.github.io/](https://vue-devui.github.io/)
- 官网(Gitee，国内用户访问该网站速度会快一些)：[https://vue-devui.gitee.io/](https://vue-devui.gitee.io/)
- 报告bug/提交建议：[https://github.com/DevCloudFE/vue-devui/issues](https://github.com/DevCloudFE/vue-devui/issues)

## 快速开始

```
# 安装 vue-devui
npm i vue-devui @devui-design/icons

# 引入组件库插件
import DevUI from 'vue-devui';
import 'vue-devui/style.css';
import '@devui-design/icons/icomoon/devui-icon.css';

createApp(App).use(DevUI).mount('#app');

# 使用
<d-button>确定</d-button>
```

参考官网快速开始文档：[https://vue-devui.github.io/quick-start/](https://vue-devui.github.io/quick-start/)

## 测试内容

主要测试组件功能、样式是否正常，建议按照以下顺序进行测试：
- Step 1: 测试组件`默认行为`(基础功能/样式)
- Step 2: 测试组件各个`单独的api`对应的功能是否正常
- Step 3: 测试`api之间的组合`使用时功能是否正常
- Step 4: 测试多组件组合使用的复杂场景下功能是否正常
- Step 5: 测试`api边界值`的情况表现是否正合理
- Step 6: 测试不同设备/操作系统/浏览器/分辨率下组件是否表现良好

比如 [DatePickerPro](https://vue-devui.github.io/components/date-picker-pro/) 这个组件

### Step 1: 测试组件默认行为

默认情况下，只有一个必选项：`v-model`，所以我们先测试只传入`v-model`属性的情况下，组件功能和样式是否正常。

```vue
<script setup lang="ts">
import { ref } from 'vue';
const datePickerProValue = ref('');
</script>

<template>
  <d-date-picker-pro v-model="datePickerProValue" />
</template>
```

先看组件渲染是否正常，正常情况下，应该渲染一个如下的日期选择框，包含以下部分：
- 一个输入框
- 输入框里面包含图标和可输入区域
- 可输入区域显示`请输入日期`的占位文本

观察元素之间的间距是否合理，颜色是否合理。

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3cecbd0a32ac48deaa310da569cafedf~tplv-k3u1fbpfcp-zoom-1.image)

再尝试把鼠标移到日期输入框上面，正常输入框的边框颜色应该变深，呈现高亮状态：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/811a173af39b4e639af0ca63e7e4ffd3~tplv-k3u1fbpfcp-zoom-1.image)

接着尝试点击一下这个日期输入框，正常应该
- 弹出一个日期选择下拉框
- 输入框高亮(边框颜色变成蓝色)
- 输入框聚焦(出现光标)，并可直接输入日期内容

日期下拉框包含以下部分：
- 下拉框面板整体出现阴影效果
- 左侧时月份选择列表，按年份进行分组，默认高亮当前月份(背景颜色是白色，未高亮的月份背景颜色是浅灰色)
- 右侧是主体日历面板，顶部是周标题，下面是按月份分组的日历，默认高亮当前日期(文本颜色是蓝色，未高亮的文本颜色是灰色)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1e55767350ec4d339d5c599525f3858f~tplv-k3u1fbpfcp-zoom-1.image)

尝试将鼠标移到左侧的月份列表中，鼠标移入的月份会出现一个浅蓝的底色，点击可切换相应的月份日历，滚动鼠标滚轮可以快速定位到其他年月。

尝试将鼠标移到右侧的日历面板中，鼠标移入的日期会出现浅蓝底色，点击可以选中相应的日期，滚动鼠标滚轮可以快速定位到其他月份的日历面板。

选择日期之后：
- 日期选择下拉框关闭
- 输入框中的占位文本被当前选中的日期代替，格式是`YYYY/MM/DD`

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4059f10169384cd6aad945b1342fb9b3~tplv-k3u1fbpfcp-zoom-1.image)

已经选择日期的输入框：
- 鼠标hover上去除了边框颜色变深之后，还会显示一个清除日期的小图标，点击该图标可以清除选中的日期
- 点击输入框，弹出来的下拉面板中高亮的是当前日期

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cd9b4ee2ce149fcbfd2868629454214~tplv-k3u1fbpfcp-zoom-1.image)

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c147fcd242f4436eb071520b84397e60~tplv-k3u1fbpfcp-zoom-1.image)

完成以上测试，该组件的默认行为就算测试完成了，中间发现任何问题都可以给我们提交issue。

### Step 2: 测试单独api功能

测试完默认行为，就可以逐个给组件增加api，看组件的表现是否和api文档描述的一样。

DatePickerPro组件api文档：[https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-参数](https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-%E5%8F%82%E6%95%B0)

我们先尝试增加一个`format`参数。

看文档可以了解到`format`支持哪些类型：
[https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-类型定义](https://vue-devui.github.io/components/date-picker-pro/#datepickerpro-%E7%B1%BB%E5%9E%8B%E5%AE%9A%E4%B9%89)

```html
<d-date-picker-pro v-model="datePickerProValue" format="YYYY-MM-DD" />
```

默认格式是`YYYY/MM/DD`，加上`format="YYYY-MM-DD"`之后确实变成了`2022-08-01`，可以多尝试几个`format`的值，看是否显示正常。

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d9c3f664d1454c5fb4639c2185184514~tplv-k3u1fbpfcp-zoom-1.image)

再尝试增加一个`placeholder`属性：

```
<d-date-picker-pro v-model="datePickerProValue" placeholder="请输入您的出生日期" />
```

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b1cbe16f445444fd88461d1d6668d9ba~tplv-k3u1fbpfcp-zoom-1.image)

这个步骤需要做的就是一个api一个api进行测试，看表现是否正常。

### Step 3: 测试api组合使用

上一个步骤是测试单个的api，这次我们需要测试多个api组合使用的场景，比如前面测试的`format`/`placeholder`组合在一起使用。

```html
<d-date-picker-pro v-model="datePickerProValue" format="YYYY-MM-DD" placeholder="请输入您的出生日期" />
```

正常应该两个功能一起生效。

api的组合可能会非常多，这个测试步骤对测试者是一个很大的考验。

### Step 4: 测试多组件组合场景

测试完 DatePickerPro 本身的功能，还需要测试它与其他组件一起使用时功能是否依然正常，比如和[Modal](https://vue-devui.github.io/components/modal/)弹窗组件一起使用。

```
<script setup lang="ts">
import { ref } from 'vue';
const datePickerProValue = ref('');

const visible = ref(false);
const handleClick = () => {
  visible.value = true;
};
</script>

<template>
  <d-button @click="handleClick">打开详情侧滑</d-button>
  <d-drawer v-model="visible" style="width: 50%;">
    <div>
      <span>选择出生日期</span>
      <d-date-picker-pro v-model="datePickerProValue" format="YYYY-MM-DD" placeholder="请输入您的出生日期" />
    </div>
  </d-drawer>
</template>
```

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/10eda0fd59624f4bbc63778c2a648ba3~tplv-k3u1fbpfcp-zoom-1.image)

正常情况下，多个组件一起使用，每个组件都应该表现正常。

### Step 5: 测试api边界值情况

前面四个步骤基本上已经能保证组件在业务中使用不出明显的问题，但有时业务场景是非常复杂的，传入组件的数据也可能是预料之外的。

比如之前`DatePickerPro`的`v-model`属性，比如不按照文档要求的传入，而是传入一些非法内容，这时组件是否依然能够进行容错，并表现正常呢？

```vue
<script setup lang="ts">
import { ref } from 'vue';
const datePickerProValue = ref('2022/08/01');
</script>

<template>
  <d-date-picker-pro v-model="datePickerProValue" />
</template>
```

以上是传入合法值的情况，组件渲染了正确的内容：

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4bf596eec9464cc2a1b0e4b7003c4bea~tplv-k3u1fbpfcp-zoom-1.image)


如果改成非法内容：

```
const datePickerProValue = ref('2022年8月1日');
```

这时组件应该使用默认值，即输入框只有占位内容，没有选中日期

![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f3f1fe2367954857a277c78dc06ce0b1~tplv-k3u1fbpfcp-zoom-1.image)

同样的，如果`format`传入非法内容：

```
<d-date-picker-pro v-model="datePickerProValue" format="非法格式" />
```


这是应该使用`format`的默认值：`YYYY/MM/DD`

由于边界场景非常多，非常难以预料，这个步骤也非常考验测试人员的能力。

### Step 6: 测试兼容性

最后一个步骤是测试设备、操作系统、浏览器、分辨率等兼容性：
- 组件在不同设备，比如：Windows机器、iMac、iPad、不同型号的手机上是否正常工作
- 组件在不同的操作系统下，比如：`Windows`、`macOS`、`Linux`下是否正常工作，甚至在同样操作系统下的不同版本下是否正常
- 组件在不同的浏览器下，比如：`Chrome`、`Firefox`、`Safari`下是否功能正常，以及同一浏览器下的不同版本
- 组件在不同设备分辨率下是否正常，比如：`1366X768`的笔记本电脑上，`1920X1080`的台式机上，`2048X1536`的iPad横屏和竖屏上，是否表现都正常

这个步骤对设备的要求很高，当然也可以用一些技术手段进行模拟测试。

## 还可以测试什么

除了组件本身，还可以对我们的官网进行测试，看是否有页面无法加载、样式错乱、逻辑错误、书写错误等，如果发现问题，也欢迎给我们提交[issue](https://github.com/DevCloudFE/vue-devui/issues)

<EditInfo time="2022年08月02日 12:02" title="阅读 961 ·  点赞 10·  评论 8 ·  收藏 2" />
