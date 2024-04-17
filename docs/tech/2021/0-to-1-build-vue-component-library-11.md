# 从0到1搭建Vue组件库11：实现tree组件禁止展开/收起、点选高亮和节点禁用功能

![image](https://user-images.githubusercontent.com/9566362/201511062-dd623b76-b0bc-408c-adbb-45f7f176ab90.png)

## 0 tree组件的现状回顾

我要做开源系列直播到目前已经做了8期：
- 1-3期分享tree组件的设计和实现
- 4-8期分享组件库工程化，并实现一个五脏六腑俱全的[mini-vue-devui](https://github.com/57code/mini-vue-devui)组件库

到第8期为止，组件库的基础框架搭建（基于Vite+Vue3+TypeScript+JSX，并完成monorepo改造）、文档系统、单元测试、按需构建和发布流程已经全部打通，意味着我们可以基于此不断完善组件，也意味着我们可以暂时将组件库工程化的事务放一旁，继续开发tree组件。

我们先来看下之前的tree组件进展：
- [渲染一层节点](https://juejin.cn/post/7009273646884028430)
- [渲染多层节点](https://juejin.cn/post/7011535488171376671)
- [增加展开/收起功能](https://juejin.cn/post/7015023354847428645)

本期主要完善tree组件的以下功能：
1. 完善tree组件样式
2. 禁止展开/收起
3. 点选高亮
4. 节点禁选

## 1 完善tree组件样式

`tree.scss`
```
$devui-text-weak: var(--devui-text-weak, #575d6c);
$devui-font-size: var(--devui-font-size, 12px);
$devui-list-item-selected-bg: var(--devui-list-item-selected-bg, #e9edfa);
$devui-list-item-hover-bg: var(--devui-list-item-hover-bg, #f2f5fc);
$devui-border-radius: var(--devui-border-radius, 2px);
$devui-animation-duration-fast: var(--devui-animation-duration-fast, 100ms);
$devui-animation-ease-in-smooth: var(--devui-animation-ease-in-smooth, cubic-bezier(0.645, 0.045, 0.355, 1));

.devui-text-ellipsis {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.devui-tree-node {
  color: $devui-text-weak;
  line-height: 1.5;
  white-space: nowrap;
  position: relative;

  .devui-tree-node__content {
    display: inline-flex;
    align-items: center;
    font-size: $devui-font-size;
    padding-right: 10px;
    width: 100%;
    border-radius: $devui-border-radius;
    padding-left: 6px;
    transition: color $devui-animation-duration-fast $devui-animation-ease-in-smooth, background-color $devui-animation-duration-fast $devui-animation-ease-in-smooth;

    &.active {
      background-color: $devui-list-item-selected-bg;
      text-decoration: none;
      border-color: transparent;
    }

    &:not(.active):hover {
      background-color: $devui-list-item-hover-bg;
    }
  }

  .devui-tree-node__content--value-wrapper {
    display: inline-flex;
    align-items: center;
    height: 30px;
    width: 100%;
  }

  .devui-tree-node__title {
    @extend .devui-text-ellipsis;

    margin-left: 5px;
    display: inline-block;
    border: 1px dashed transparent;
    border-radius: $devui-border-radius;
    max-width: 100%;

    &:not(.disabled) {
      cursor: pointer;
    }
  }
}
```

## 2 禁止展开/收起

### 2.1 增加禁止展开/收起的功能

`packages/devui-vue/devui/tree/src/composables/use-toggle.ts`
```
const toggle = (item: TreeItem) => {
  if (!item.children) return
  if (item.disableToggle) return // 新增
  item.open = !item.open
  openedData.value = openedTree(data)
}
```

在传入tree组件的data数据中增加`disableToggle`数据
```
[{
  label: '一级 1', level: 1,
  children: [{
    label: '二级 1-1', level: 2,
    children: [{
      label: '三级 1-1-1', level: 3,
    }]
  }]
}, {
  label: '一级 2', level: 1,
  open: true,
  children: [{
    label: '二级 2-1', level: 2,
    children: [{
      label: '三级 2-1-1', level: 3,
    }]
  }, {
    label: '二级 2-2', level: 2,
    disableToggle: true, // 新增
    children: [{
      label: '三级 2-2-1', level: 3,
    }]
  }]
}, {
  label: '一级 3', level: 1,
  open: true,
  children: [{
    label: '二级 3-1', level: 2,
    children: [{
      label: '三级 3-1-1', level: 3,
    }]
  }, {
    label: '二级 3-2', level: 2,
    open: true,
    children: [{
      label: '三级 3-2-1', level: 3,
    }]
  }]
}, {
  label: '一级 4', level: 1,
}]
```

测试功能正常！

### 2.2 增加禁止展开/收起的样式

`packages/devui-vue/devui/tree/src/tree.ts`
```
const renderNode = (item: TreeItem) => {
  return (
    <div
      class={['devui-tree-node', item.open && 'devui-tree-node__open']}
      style={{ paddingLeft: `${24 * (item.level - 1)}px` }}
    >
      <div class="devui-tree-node__content">
        <div class="devui-tree-node__content--value-wrapper">
          {
            item.children
              ? <span class={item.disableToggle && 'toggle-disabled'}> // 增加
                  {
                    item.open
                      ? <IconOpen class='mr-xs' onClick={() => toggle(item)} />
                      : <IconClose class='mr-xs' onClick={() => toggle(item)} />
                  }
                </span>
              : <Indent />
          }
          <span class="devui-tree-node__title">{item.label}</span>
        </div>
      </div>
    </div>
  )
}
```

增加样式

```
$devui-disabled-text: var(--devui-disabled-text, #adb0b8);

.toggle-disabled {
  cursor: not-allowed;

  svg.svg-icon rect {
    stroke: $devui-disabled-text;
  }

  svg.svg-icon path {
    fill: $devui-disabled-text;
  }
}
```

效果如下：


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c0f91aaf8ece4de2bfb902106408e284~tplv-k3u1fbpfcp-watermark.image?)

完成！

### 2.3 代码重构

抽离渲染节点前面的图标的逻辑：

```
const renderIcon = (item: TreeItem) => {
  return item.children
    ? <span class={item.disableToggle && 'toggle-disabled'}>
        {
          item.open
            ? <IconOpen class='mr-xs' onClick={() => toggle(item)} />
            : <IconClose class='mr-xs' onClick={() => toggle(item)} />
        }
      </span>
    : <Indent />
}
```

`renderNode`方法中用`renderIcon`替换相应的代码：

```
<div class="devui-tree-node__content--value-wrapper">
  { renderIcon(item) }
  <span class="devui-tree-node__title">{item.label}</span>
</div>
```

别忘了在`tree-types.ts`中增加类型：

```
export interface TreeItem {
  label: string
  children?: TreeData
  disableToggle?: boolean // 新增
}
```

## 3 点选高亮

### 3.1 实现 useHighlightNode 这个 composable

增加`use-highlight.ts`文件：

```
import { ref, Ref } from 'vue'

interface TypeHighlightClass {
  [key: string]: 'active' | '' | 'devui-tree_isDisabledNode'
}
type TypeUseHighlightNode = () => {
  nodeClassNameReflect: Ref<TypeHighlightClass>
  handleClickOnNode: (index: string) => void
  handleInitNodeClassNameReflect: (isDisabled: boolean, ...keys: Array<string>) => string
}

const HIGHLIGHT_CLASS = 'active'
const IS_DISABLED_FLAG = 'devui-tree_isDisabledNode'
const useHighlightNode: TypeUseHighlightNode = () => {
  const nodeClassNameReflectRef = ref<TypeHighlightClass>({})
  const handleInit = (isDisabled = false, ...keys) => {
    const key = keys.join('-')
    nodeClassNameReflectRef.value[key] = isDisabled ? IS_DISABLED_FLAG : (nodeClassNameReflectRef.value[key] || '')
    return key
  }
  const handleClick = (key) => {
    if (nodeClassNameReflectRef.value[key] === IS_DISABLED_FLAG) {
      return
    }
    nodeClassNameReflectRef.value =
      Object.fromEntries(
        Object
          .entries(nodeClassNameReflectRef.value)
          .map(([k]) => [k, k === key ? HIGHLIGHT_CLASS : ''])
      )
  }
  return {
    nodeClassNameReflect: nodeClassNameReflectRef,
    handleClickOnNode: handleClick,
    handleInitNodeClassNameReflect: handleInit,
  }
}
export default useHighlightNode
```

### 3.2 在 setup 中使用 useHighlightNode

在`tree.tsx`中使用`use-highlight.ts`这个`composable`

```
const { nodeClassNameReflect, handleInitNodeClassNameReflect, handleClickOnNode } = useHighlightNode()
```

```
const renderNode = (item: TreeItem) => {
  const { key = '', label, disabled, open, level, children } = item
  const nodeId = handleInitNodeClassNameReflect(disabled, key, label) // 获取nodeId

  return (
    <div
      class={['devui-tree-node', open && 'devui-tree-node__open']}
      style={{ paddingLeft: `${24 * (level - 1)}px` }}
    >
      <div
        class={`devui-tree-node__content ${nodeClassNameReflect.value[nodeId]}`} // 增加高亮样式
        onClick={() => handleClickOnNode(nodeId)} // 增加节点的点击事件
      >
        <div class="devui-tree-node__content--value-wrapper">
          { renderIcon(item) }
          <span class="devui-tree-node__title">{item.label}</span>
        </div>
      </div>
    </div>
  )
}
```

## 4 节点禁选

和禁止展开/收起功能类似，分成两步：
1. 增加禁止逻辑
2. 增加禁止样式

### 4.1 增加禁止逻辑

```
const handleClick = (key) => {
  // 新增
  if (nodeClassNameReflectRef.value[key] === IS_DISABLED_FLAG) {
    return
  }
  
  nodeClassNameReflectRef.value =
    Object.fromEntries(
      Object
        .entries(nodeClassNameReflectRef.value)
        .map(([k]) => [k, k === key ? HIGHLIGHT_CLASS : ''])
    )
}
```

### 4.2 增加禁止样式

```
<div class="devui-tree-node__content--value-wrapper">
  { renderIcon(item) }
  <span class={['devui-tree-node__title', item.disabled && 'select-disabled']}> // 新增
    { label }
  </span>
</div>
```


<EditInfo time="2021年11月26日 17:54" title="阅读 1240 ·  点赞 19 ·  评论 2 ·  收藏 3" />

