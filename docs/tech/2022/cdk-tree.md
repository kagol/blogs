# 从 CDK Tree 源码学习如何开发一个UI无关的 Tree 组件

![image](https://user-images.githubusercontent.com/9566362/201374278-cf513fd4-5596-41ba-a97e-f7c5110793f9.png)

Angular CDK 是一个 Angular 组件开发工具箱，也是 [Material UI](https://github.com/angular/components) 组件库(Angular)的底层基座，是其UI无关或弱UI的部分(tree-control是真正UI无关的核心)。

CDK 虽然是 Material UI 组件库的依赖，但它并不与 Material UI 组件库有耦合，我们可以独立使用 CDK，我们的 [Ng DevUI](https://github.com/DevCloudFE/ng-devui) 组件库就有使用到 CDK Scrolling 和 CDK Overlay 等能力。

## 1 先用起来

1. 安装 cdk：`npm i @angular/cdk`
2. 导入 cdk tree 模块`import { CdkTreeModule } from '@angular/cdk/tree'`
3. 使用`cdk-tree`组件

```html
<cdk-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <cdk-tree-node
    *cdkTreeNodeDef="let node" cdkTreeNodePadding
    [style.display]="shouldRender(node) ? 'flex' : 'none'"
    class="example-tree-node"
  >
    {{node.label}}
  </cdk-tree-node>

  <cdk-tree-node
    *cdkTreeNodeDef="let node; when hasChild" cdkTreeNodePadding
    [style.display]="shouldRender(node) ? 'flex' : 'none'"
    class="example-tree-node"
  >
    <button
      cdkTreeNodeToggle
      (click)="node.isExpanded = !node.isExpanded"
    >
      {{treeControl.isExpanded(node) ? '收起' : '展开'}}
    </button>

    {{node.label}}
  </cdk-tree-node>
</cdk-tree>
```

```js
import { Component } from '@angular/core';
import { FlatTreeControl } from '@angular/cdk/tree';

interface ExampleBaseNode {
  label: string;
  level: number;
  isExpanded?: boolean;
  isExpanded?: boolean;
}

const TREE_DATA: ExampleBaseNode[] = [
  { label: 'Fruit', expandable: true, level: 0 },
  { label: 'Apple', expandable: false, level: 1 },
  { label: 'Vegetables', expandable: false, level: 0 },
];

@Component({
  selector: 'app-tree-base-demo',
  templateUrl: './tree-base-demo.component.html',
  styleUrls: ['./tree-base-demo.component.scss']
})
export class TreeBaseDemoComponent {
  // 树控制器，必选
  treeControl = new FlatTreeControl<ExampleBaseNode>(
    node => node.level,
    node => node.expandable,
  );

  // 数据源，不传没法显示内容
  dataSource = TREE_DATA;

  // 判断是否显示展开/收起按钮
  hasChild = (_: number, node: ExampleBaseNode) => node.expandable;

  // 判断是否显示节点（折叠状态不显示）
  shouldRender(node: ExampleBaseNode) {
    let parent = this.getParentNode(node);
    while (parent) {
      if (!parent.isExpanded) {
        return false;
      }
      parent = this.getParentNode(parent);
    }
    return true;
  }

  // 工具方法，获取父节点
  getParentNode(node: ExampleBaseNode) {
    const nodeIndex = TREE_DATA.indexOf(node);

    for (let i = nodeIndex - 1; i >= 0; i--) {
      if (TREE_DATA[i].level === node.level - 1) {
        return TREE_DATA[i];
      }
    }

    return null;
  }

}
```

```css
.example-tree-node {
  display: flex;
  align-items: center;
}
```

效果如下：
![image](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c8b7d258d7c04ff2892d67eb3f3975ef~tplv-k3u1fbpfcp-zoom-1.image)


## 2 源码结构

```sh
cdk/tree
├── control // TreeControl
|  ├── base-tree-control.ts // 抽象类
|  ├── flat-tree-control.ts // 扁平树
|  ├── nested-tree-control.ts // 嵌套树
|  └── tree-control.ts // 接口
├── index.ts
├── nested-node.ts // 嵌套树节点
├── node.ts // 树节点组件
├── outlet.ts // 节点出口
├── padding.ts // 节点padding
├── public-api.ts // 对外暴露的api
├── toggle.ts // 节点展开/收起
├── tree-errors.ts // 错误日志
├── tree-module.ts // 入口模块
└── tree.ts // 树组件
```

## 3 tree 组件源码解析

`Tree`组件最核心的功能：
- 渲染层级结构
- 展开/收起子节点

`CdkTree`核心源码分析步骤：
- 先看极简`demo`的组成
- 从外到内做整体分析
- 再做关键模块分析

### 3.1 极简demo的组成

- `<cdk-tree>`组件
- `<cdk-tree-node>`组件
- `cdkTreeNodeDef`指令
- `cdkTreeNodePadding`指令
- `cdkTreeNodeToggle`指令
- `dataSource`数据结构
- `treeControl`控制器
- `shouldRender`方法
- `hasChild`方法

```html
<cdk-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <cdk-tree-node
    *cdkTreeNodeDef="let node" cdkTreeNodePadding
    [style.display]="shouldRender(node) ? 'flex' : 'none'"
    class="example-tree-node"
  >
    {{node.label}}
  </cdk-tree-node>

  <cdk-tree-node
    *cdkTreeNodeDef="let node; when hasChild" cdkTreeNodePadding
    [style.display]="shouldRender(node) ? 'flex' : 'none'"
    class="example-tree-node"
  >
    <button
      cdkTreeNodeToggle
      (click)="node.isExpanded = !node.isExpanded"
    >
      {{treeControl.isExpanded(node) ? '收起' : '展开'}}
    </button>

    {{node.label}}
  </cdk-tree-node>
</cdk-tree>
```

### 3.2 cdk-tree 组件

`cdk-tree`只是一个`节点出口的容器`，然后定义了一些
- 输入参数，如数据源`dataSource`和树控制器`treeControl`；
- 操作树节点的方法，如插入节点的`inserNode`。

```ts
@Component({
  selector: 'cdk-tree',
  template: `<ng-container cdkTreeNodeOutlet></ng-container>`,
})
export class CdkTree {
  // 数据源，可读写
  @Input()
  get dataSource() {
    return this._dataSource;
  }
  set dataSource(dataSource) {
    if (this._dataSource !== dataSource) {
      this._switchDataSource(dataSource);
    }
  }
  private _dataSource;

  // 树节点出口容器
  @ViewChild(CdkTreeNodeOutlet, {static: true}) _nodeOutlet: CdkTreeNodeOutlet;

  // 所有树节点
  @ContentChildren(CdkTreeNodeDef) _nodeDefs: QueryList<CdkTreeNodeDef<T>>;

  // 树控制器
  @Input() treeControl;

  // 插入节点
  insertNode(nodeData, index) {}
  
  // 渲染节点
  renderNodeChanges(data) {}
}
```

### 3.3 cdk-tree-node 组件

有两种类型：
- `cdk-tree-node`是基础树节点，用于扁平树
- `cdk-nested-tree-node`继承自`cdk-tree-node`，用于嵌套树

`cdk-tree-node`组件比较简单，就定义了几个属性：
- data
- isExpanded
- level

```ts
@Directive({
  selector: 'cdk-tree-node',
})
export class CdkTreeNode {
  // 节点数据，可读写
  get data() {
    return this._data;
  }
  set data(value) {
    this._data = value;
  }
  protected _data;

  // 是否展开，只读
  get isExpanded() {
    return this._tree.treeControl.isExpanded(this._data);
  }

  // 当前层级，只读
  get level() {
    return this._tree.treeControl.getLevel(this._data);
  }
```

`cdk-nested-tree-node`继承自`cdk-tree-node`，并添加了一些嵌套树的处理逻辑，如`updateChildrenNodes`方法。

```ts
@Directive({
  selector: 'cdk-nested-tree-node',
})
export class CdkNestedTreeNode extends CdkTreeNode {
  // 获取树节点出口
  @ContentChildren(CdkTreeNodeOutlet) nodeOutlet: QueryList<CdkTreeNodeOutlet>;
  
  ngAfterContentInit() {
    // 获取当前节点所有的子节点
    const childrenNodes = this._tree.treeControl.getChildren(this.data);
    
    // 更新子节点
    this.updateChildrenNodes(childrenNodes);
  }
  
  /** Add children dataNodes to the NodeOutlet */
  updateChildrenNodes(children) {}
}
```

嵌套树的demo：

```html
<cdk-tree [dataSource]="dataSource" [treeControl]="treeControl">
  <cdk-nested-tree-node
    *cdkTreeNodeDef="let node" cdkTreeNodePadding
    class="example-tree-node"
  >
    {{node.label}}
  </cdk-nested-tree-node>

  <cdk-nested-tree-node
    *cdkTreeNodeDef="let node; when hasChild" cdkTreeNodePadding
    class="example-tree-node"
  >
    <button
      cdkTreeNodeToggle
      (click)="node.isExpanded = !node.isExpanded"
    >
      {{treeControl.isExpanded(node) ? '收起' : '展开'}}
    </button>

    {{node.label}}

    <!-- 嵌套树需要增加一个节口出口容器 -->
    <div [class.example-tree-invisible]="!treeControl.isExpanded(node)">
      <ng-container cdkTreeNodeOutlet></ng-container>
    </div>
  </cdk-nested-tree-node>
</cdk-tree>
```

除了需要增加接口出口容器，嵌套树的数据结构和控制器也和扁平树不同。

```
// 数据结构
interface ExampleBaseNode {
  label: string;
  children?: ExampleBaseNode[];
}

const TREE_DATA: ExampleBaseNode[] = [
  {
    label: 'Fruit',
    children: [ { label: 'Apple' } ],
  },
  { label: 'Vegetables' },
];

// 控制器
treeControl = new NestedTreeControl<ExampleBaseNode>(node => node.children);
```

## 4 tree-control 控制器(核心)

`TreeControl`是`CdkTree`组件的UI无关的逻辑层，主要分成以下部分：
- tree-control 接口：定义控制器的成员（不包含具体实现）
- base-tree-control 抽象类：定义控制器的公共部分，给扁平树和嵌套树控制器继承（不能被直接实例化）
- flat-tree-control 扁平树控制器
- nested-tree-control 嵌套树控制器

接口和类大家可能都很熟悉，抽象类和它们有什么区别呢？

抽象类有以下特点：
- 抽象类是可以派生其他类的基类；
- 它不能被直接实例化；
- 与接口不同，一个抽象类可以包含它的成员的实现细节；
- abstract 关键字是用来定义抽象类的，同时也是定义它内部的抽象方法的。

### 4.1 tree-control 接口

```ts
export interface TreeControl<T, K = T> {
  dataNodes: T[]; // 树的节点数组
  expansionModel: SelectionModel<K>; // 选择模型
  isExpanded(dataNode: T): boolean; // 节点是否展开
  getDescendants(dataNode: T): any[]; // 获取节点的所有子节点
  toggle(dataNode: T): void; // 切换节点的展开/收起状态
  expand(dataNode: T): void; // 展开节点
  collapse(dataNode: T): void; // 收起节点
  expandAll(): void; // 展开所有节点
  collapseAll(): void; // 收起所有节点
  toggleDescendants(dataNode: T): void; // 切换所有子节点的展开/收起状态
  expandDescendants(dataNode: T): void; // 展开所有子节点
  collapseDescendants(dataNode: T): void; // 收起所有子节点
  readonly getLevel: (dataNode: T) => number; // 获取节点的层级
  readonly isExpandable: (dataNode: T) => boolean; // 判断节点是否可以展开
  readonly getChildren: (dataNode: T) => Observable<T[]> | T[] | undefined | null; // 获取子节点
}
```

### 4.2 base-tree-control 抽象类

```ts
export abstract class BaseTreeControl<T, K = T> implements TreeControl<T, K> {
  abstract getDescendants(dataNode: T): T[];
  abstract expandAll(): void;
  dataNodes: T[];
  expansionModel: SelectionModel<K> = new SelectionModel<K>(true);
  trackBy?: (dataNode: T) => K;
  getLevel: (dataNode: T) => number;
  isExpandable: (dataNode: T) => boolean;
  getChildren: (dataNode: T) => Observable<T[]> | T[] | undefined | null;

  toggle(dataNode: T): void {
    this.expansionModel.toggle(this._trackByValue(dataNode));
  }

  expand(dataNode: T): void {
    this.expansionModel.select(this._trackByValue(dataNode));
  }

  collapse(dataNode: T): void {
    this.expansionModel.deselect(this._trackByValue(dataNode));
  }

  isExpanded(dataNode: T): boolean {
    return this.expansionModel.isSelected(this._trackByValue(dataNode));
  }

  toggleDescendants(dataNode: T): void {
    this.expansionModel.isSelected(this._trackByValue(dataNode))
      ? this.collapseDescendants(dataNode)
      : this.expandDescendants(dataNode);
  }

  collapseAll(): void {
    this.expansionModel.clear();
  }

  expandDescendants(dataNode: T): void {
    let toBeProcessed = [dataNode];
    toBeProcessed.push(...this.getDescendants(dataNode));
    this.expansionModel.select(...toBeProcessed.map(value => this._trackByValue(value)));
  }

  collapseDescendants(dataNode: T): void {
    let toBeProcessed = [dataNode];
    toBeProcessed.push(...this.getDescendants(dataNode));
    this.expansionModel.deselect(...toBeProcessed.map(value => this._trackByValue(value)));
  }

  protected _trackByValue(value: T | K): K {
    return this.trackBy ? this.trackBy(value as T) : (value as K);
  }
}
```

### 4.3 flat-tree-control 扁平树控制器

```ts
export class FlatTreeControl<T, K = T> extends BaseTreeControl<T, K> {
  constructor() {}

  getDescendants(dataNode: T): T[] {
    // 扁平树的获取全部子节点的逻辑
  }

  expandAll(): void {
    // 扁平树的展开全部节点逻辑
  }
}
```

### 4.4 nested-tree-control 嵌套树控制器

```ts
export class NestedTreeControl<T, K = T> extends BaseTreeControl<T, K> {
  constructor() {}

  expandAll(): void {
    // 嵌套树的展开全部节点逻辑
  }

  getDescendants(dataNode: T): T[] {
    // 嵌套树的获取全部子节点的逻辑
  }

  protected _getDescendants(descendants: T[], dataNode: T): void {}
}
```

## 5 selection-model 选择模型

我们发现`TreeControl`的方法实际上是在调用`SelectionModel`实例的方法。

```ts
  expansionModel: SelectionModel<K> = new SelectionModel<K>(true);

  // 切换展开/收起状态
  toggle(dataNode: T): void {
    this.expansionModel.toggle(this._trackByValue(dataNode));
  }

  // 展开树节点
  expand(dataNode: T): void {
    this.expansionModel.select(this._trackByValue(dataNode));
  }

  // 收起树节点
  collapse(dataNode: T): void {
    this.expansionModel.deselect(this._trackByValue(dataNode));
  }

  // 节点是否展开
  isExpanded(dataNode: T): boolean {
    return this.expansionModel.isSelected(this._trackByValue(dataNode));
  }
```

`selection-model`维护了一个`Set`数据结构，并提供了一系列的方法来设置列表的状态，以下是它的核心实现思逻辑。

```ts
export class SelectionModel<T> {
  private _selection = new Set<T>();

  isSelected(value: T): boolean {
    return this._selection.has(value);
  }

  private _markSelected(value: T) {
    if (!this.isSelected(value)) {
      this._selection.add(value);
    }
  }

  private _unmarkSelected(value: T) {
    if (this.isSelected(value)) {
      this._selection.delete(value);
    }
  }

  // 其他方法
}
```

## 6 参考

- [https://github.com/angular/components/tree/master/src/cdk/tree](https://github.com/angular/components/tree/master/src/cdk/tree)
- [https://material.angular.io/cdk/tree/examples](https://material.angular.io/cdk/tree/examples)

<EditInfo time="2022年07月26日 08:02" title="阅读 1520 ·  点赞 11 ·  评论 2 ·  收藏 5" />
