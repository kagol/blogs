# 从0到1搭建Vue组件库12：实现tree组件自定义图标和节点勾选功能

![image](https://user-images.githubusercontent.com/9566362/201510832-b75d2952-47b7-40c9-a363-f903840cc91b.png)

## 0 上一期回顾

上一期直播我们完善了tree组件的样式，并增加了点选高亮、禁止展开/收起、禁止选择等功能。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dba0ecccabd4444d87372561d387d57c~tplv-k3u1fbpfcp-watermark.image?)

当时还识别到了点选高亮功能`use-highlight`的一个小小的瑕疵点，这个瑕疵很快由[pineaple](https://gitee.com/pineaple)同学进行了优化。

改进方案：
https://gitee.com/devui/vue-devui/pulls/353

## 1 自定义图标

### 1.1 定义icon插槽

编写之前先思考下：

> 我们的插槽应该写在哪里？

`tree.tsx`中的`renderIcon`方法

```
const renderIcon = (item: TreeItem) => {
  return item.children
    ? <span class={item.disableToggle && 'toggle-disabled'} onClick={() => toggle(item)}>
        {
          // 增加插槽逻辑
          ctx.slots.icon 
            ? ctx.slots.icon(item)
            : item.open
              ? <IconOpen class='mr-xs' />
              : <IconClose class='mr-xs' />
        }
      </span>
    : <Indent />
}
```

`IconOpen.tsx`
```jsx
const IconOpen = () => {
  return (
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4160"
      width="12"
      height="12"
    >
      <path d="M64 320l448 448 448-448z" fill="#8C92A4" p-id="4161"></path>
    </svg>
  )
}

export default IconOpen
```

`IconClose.tsx`
```jsx
const IconClose = () => {
  return (
    <svg
      class="icon"
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="4361"
      width="12"
      height="12"
    >
      <path d="M256 64l448 448-448 448z" fill="#8C92A4" p-id="4362"></path>
    </svg>
  )
}

export default IconClose
```

### 1.2 使用插槽

`JSX`和`SFC`中插槽使用的写法对比。

`JSX`：

```jsx
<d-tree data={data}>
  {{
    icon: (item: TreeItem) => (item.open ? <IconOpen /> : <IconClose />),
  }}
</d-tree>
```

`SFC`：

```vue
<d-tree :data="data">
  <template #icon="item">
    <IconOpen v-if="item.open" />
    <IconClose v-else />
  </template>
</d-tree>
```

效果如下：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e3159acdf9024198a85ad0fc2b110635~tplv-k3u1fbpfcp-watermark.image?)

## 2 节点勾选

### 2.1 新增checkable和checked

`tree-types.ts`

```
export const treeProps = {
  data: {
    type: Array as PropType<TreeData>,
    default: () => [],
  },
  
  // 新增
  checkable: {
    type: Boolean,
    default: false
  },
} as const

export interface TreeItem {
  label: string
  children?: TreeData
  open?: boolean
  disableToggle?: boolean,
  checked?: boolean, // 新增
  [key: string]: any
}
```

### 2.2 添加Checkbox组件

`tree.tsx`

```
const { data, checkable } = toRefs(props)
```

`tree.tsx`中的`renderNode`方法

```
{ renderIcon(item) }

// 新增
{ checkable.value && <d-checkbox v-model={item.checked} />}

<span class={['devui-tree-node__title', disabled && 'select-disabled']}>
  { label }
</span>
```

### 2.3 配置checkable

```jsx
// 增加`checkable={true}`参数
<d-tree data={data} checkable>
  {{
    icon: (node: TreeItem) => (node.open ? <IconOpen /> : <IconClose />),
  }}
</d-tree>
```

效果如下：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea29cc8ac32e489cb7ebd47a76fb7786~tplv-k3u1fbpfcp-watermark.image?)



<EditInfo time="2021年12月09日 19:22" title="阅读 3707 ·  点赞 40 ·  评论 13 ·  收藏 19" />


