# 前端 Vuer，请收下这份《Vue3 中使用 JSX 简明语法》

这份《Vue3中使用JSX简明语法》宝典汇集了所有你在写 Vue3 项目可能会用到的常用 JSX 语法。

## 1 文本插值

Vue里面文本插值默认是用双大括号:

```vue
<h1>{{ msg }}</h1>
```

在JSX中变成了单大括号：

```jsx
const name = 'Vue DevUI'
const element = <h1>Hello, { name }</h1>
```

和Vue模板语法中的文本插值一样，大括号内支持任何有效的 [JavaScript 表达式](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Expressions_and_Operators#Expressions)，比如：`2 + 2`，`user.firstName`，`formatName(user)`等。

## 2 条件渲染

jsx本身也是一个条件表达式，不再需要使用`v-if`指令。

### 2.1 使用 if/else

```tsx
const element = (name) => {
  if (name) {
    return <h1>Hello, { name }</h1>
  } else {
    return <h1>Hello, Stranger</h1>
  }
}
```

以上代码等效于：

```tsx
const element = (name) => <h1>Hello, { name || 'Stranger' }</h1>
```

### 2.2 使用三目运算符

```tsx
const element = icon ? <span class="icon"></span> : null;
```

以上代码等效于：

```tsx
const element = icon && <span class="icon"></span>;
```

## 3 列表渲染

列表渲染直接使用JS数组的map方法即可，不需要使用`v-for`指令。

```jsx
const data = [{
  id: 1,
  title: '通用'
}, {
  id: 2,
  title: '导航'
}]

const element = data.map(item => {
  return <div>{ item.title }</div>
})
```

## 4 标签属性绑定

属性绑定也是使用大括号包裹，不需要使用`v-bind`指令。

```jsx
const href = 'https://devui.design/'

const element = <a href={href}>DevUI Design</a>
```

## 5 class 类名绑定

直接使用JS模板字符串即可。

```jsx
const element = <div className={`devui-accordion-item-title ${ disabled ? 'disabled' : '' }`}></div>
```

也可以使用数组：

```jsx
const element = <div class={
    [
      'devui-accordion-item-title',
      disabled && 'disabled'
    ]
  }
>Item</div>
```

## 6 style 样式绑定

样式绑定需要使用双大括号。

```jsx
const width = '100px'

const element = <button style={{ width, fontSize: '16px' }}></button>
```

## 7 事件绑定

绑定事件也是用大括号，注意事件名前面要加上`on`前缀，比如click事件要写成`onClick`，mouseenter事件要写成`onMouseenter`。

```jsx
const confirm = () => {
  // 确认提交
}

<button onClick={confirm}>确定</button>
```

如果要带参数，需要使用箭头函数进行包裹：

```jsx
const confirm = (name) => {
  // 确认提交
}

<button onClick={() => confirm('devui')}>确定</button>
```

### 7.1 事件修饰符

jsx中给事件增加修饰符需要借助`withModifiers`方法。

```jsx
import { withModifiers, defineComponent, ref } from 'vue'

const App = defineComponent({
  setup() {
    const count = ref(0);

    const inc = () => {
      count.value++;
    };

    return () => (
      <div onClick={ withModifiers(inc, ['self']) }>{ count.value }</div>
    );
  },
})
```

> 注意：Vue模板中ref变量是可以直接解构的，但是在jsx中不行，需要记得添加`.value`，比如上面的`{ count.value }`。

## 8 v-model 双向绑定

1. 绑定`modelValue`

这种情况比较简单。

`JSX`写法：

```jsx
<d-flexible-overlay v-model={ menuShow.value }></d-flexible-overlay>
```

`SFC`写法：

```jsx
<d-flexible-overlay v-model="menuShow"></d-flexible-overlay>
```

2. 绑定自定义名称

比如绑定`visible`，JSX中不能直接用`v-model:visible`的语法，需要传入一个数组`[menuShow.value, 'visible']`，数组的第二个参数就是要绑定的自定义名称。

`JSX`写法：

```jsx
<d-flexible-overlay v-model={[menuShow.value, 'visible']}></d-flexible-overlay>
```

`SFC`写法：

```jsx
<d-flexible-overlay v-model:visible="menuShow"></d-flexible-overlay>
```

## 9 slot 插槽

jsx中没有`<slot>`标签，定义插槽需要使用双大括号。

如果是具名插槽，则将`default`改成具名插槽的名称，比如`mySlot`，则使用`ctx.slots.mySlot?.()`。

插槽从setup的第二个参数`ctx`中获取，不需要加`$`前缀。

```jsx
import { defineComponent } from 'vue'

export default defineComponent({
  setup(props, { slots }) { // 逻辑
    return () => {
      return <button>{ slots.default?.() }</button>
    }
  },
})
```

还可以使用`renderSlot`方法：

```jsx
import { renderSlot } from 'vue'

<button>
  { renderSlot(slots, 'default') }
</button>
```

### 9.1 Scoped Slots 作用域插槽

使用作用域插槽可以实现插槽传参，以下是具体的示例。

`JSX`和`SFC`中插槽使用的写法对比。

`JSX`写法：

```tsx
<d-tree data={data}>
  {{
    mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />),
  }}
</d-tree>
```

还可以通过`v-slots`的方式使用：

```tsx
<d-tree data={data} v-slots={{
  mySlot: (item) => (item.open ? <IconOpen /> : <IconClose />)
}}>
</d-tree>
```

`SFC`写法：

```jsx
<d-tree :data="data">
  <template #mySlot="item">
    <IconOpen v-if="item.open" />
    <IconClose v-else />
  </template>
</d-tree>
```

其中的`item`是插槽的参数，通过

```ts
ctx.slots.mySlot(item)
```

的方式给插槽传入参数。

或者使用`renderSlot`方法，第三个参数就是要传给插槽的参数：

```jsx
import { renderSlot, useSlots } from 'vue'

<button>
  { renderSlot(useSlots(), 'mySlot', item) }
</button>
```

---

补充：

1. 属性绑定

```ts
const properties = {a: 1, b: 2}
```

SFC中`<div v-bind="properties"></div>`批量绑定标签属性。

在JSX中的替换方案是`<div {...properties}></div>`。

2. class绑定

使用`CSS Modules`，引入局部样式，相当于SFC中的`scoped`。

```jsx
import styles from './index.module.scss'

<div class={styles.wrap}></div>
```

感谢 [@momo11](https://juejin.cn/user/1011206428033261) 同学提供的两个实用的 jsx 用法。

## 10 小结

本文是一个小册子，主要介绍在 Vue3 中使用 JSX 的语法和实践，包含了文本插值、属性绑定、事件绑定、双向绑定、条件渲染、列表渲染、插槽等几乎所有的 Vue3 语法，如果你也在 Vue3 中写 JSX，这份指南或许能提供一点参考。

![](/assets/jsx-concise-syntax-in-vue3-2.png)

<EditInfo time="2022年06月28日 07:24" title="阅读 22986 ·  点赞 281 ·  评论 85 ·  收藏 487" />
