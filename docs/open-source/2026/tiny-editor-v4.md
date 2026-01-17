# 🎉历时1年，TinyEditor v4.0 正式发布！

你好，我是 Kagol，个人公众号：`前端开源星球`。

[TinyEditor](https://opentiny.github.io/tiny-editor/) 是一个基于 Quill 2.0 的富文本编辑器，在 Quill 基础上扩展了丰富的模块和格式，框架无关、功能强大、开箱即用。

*   源码：<https://github.com/opentiny/tiny-editor/>
*   官网：<https://opentiny.github.io/tiny-editor/>

去年1月2日，我们发布了 v3.25 版本，功能基本已经完备，之后 v3.x 版本进入了维护期，同时开启了漫长的 v4.0 版本的开发，v4.0 的核心目标是体验优化和稳定性提升，并支持多人协同编辑。

在长达1年的开发和打磨后，我们荣幸地宣布 **TinyEditor v4.0** 正式发布！这个版本汇聚了团队的心血，带来了激动人心多人协同编辑新功能、以及大量体验优化和稳定性改进。

重点特性：

*   支持多人协同编辑：一起在编辑器写（玩）文档（贪吃蛇游戏摸鱼）🐶
*   基于 [quill-table-up](https://github.com/quill-modules/quill-table-up) 的新表格方案：表格操作体验++⚡️
*   基于 `emoji-mart` 的 Emoji 表情：表情党最爱😍
*   支持斜杆菜单和丰富的快捷键：键盘流的福音😄
*   图片/视频/文件上传体验优化🌄

详细的 Release Notes 请参考：<https://github.com/opentiny/tiny-editor/releases/tag/v4.0.0>

欢迎安装 v4.0 版本体验：

```shell
npm i @opentiny/fluent-editor@4.0.0
```

## 1 亮点特性

### 1.1 多人协作编辑

v4.0 最重磅的功能之一是引入了**完整的协作编辑能力**。我们集成了 quill-cursor 模块，支持多人实时协作编辑，并提供了独立的 npm 包供开发者集成。无论是需要离线支持还是云端协作，TinyEditor 都能胜任。

你可以在我们的演示项目中进行体验：<https://opentiny.github.io/tiny-editor/projects/>

效果如下：

![TinyEditor 协同编辑效果](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/5f5877094758471cae8f5098e8a82052~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240623&x-orig-sign=NnkEzydYO%2BqcxTqZk8kOFA06Da0%3D)

关于协同编辑更详细的介绍，参考：[如何使用 TinyEditor 快速部署一个多人协同富文本编辑器？](https://juejin.cn/post/7565940210149064756)

### 1.2 表格能力升级

之前的表格模块基于 quill-better-table 实现，现在这个项目已经不维护了，为了让 TinyEditor 的表格功能更好地演进下去，TinyEditor 项目核心贡献者 [zzxming](https://github.com/zzxming) 对表格模块进行了重构，使用了 quill-table-up 作为底层实现，替换了不维护的 quill-better-table。

[quill-table-up](https://github.com/zzxming/quill-table-up) 是 zzxming 设计和实现的，基于 Quill 2.0，拥有更好的模块化设,、更强的功能、更优的体验，而且一直在持续维护中。

quill-table-up 支持 quill-better-table 所有的功能，并且做了大量增强：

*   支持单元格中插入块级元素，比如：标题、引用、代码块等
*   支持自定义单元格背景色、边框颜色
*   拖拽改变行高/列宽，调整表格整体宽高
*   除了右键工具栏菜单，还支持常驻显示工具栏
*   支持斜线快捷菜单插入表格，支持上下左右方向键选择表格行/列大小

quill-table-up 做了很好的模块化设计，每个特性是一个单独的文件，支持按需引入和使用，这一点对于富文本这边的大型组件来说非常友好，可能每个业务只需要其中一部分功能，就可以不需要引入，打包时也不会包含这个特性的代码，能有效地减少包体积。

感谢 [zzxming](https://github.com/zzxming) 在表格模块重构和优化中付出的努力，提升了 TinyEditor 富文本编辑器的表格操作体验。

欢迎朋友们给 quill-table-up 开源项目点个 Star 支持下！

源码：<https://github.com/zzxming/quill-table-up>（欢迎 Star）

使用起来非常简单。

```typescript
import FluentEditor, { generateTableUp } from '@opentiny/fluent-editor'
// 按需导入 quill-table-up 特性模块
import { defaultCustomSelect, TableMenuSelect, TableSelection, TableUp } from 'quill-table-up'
// 引入样式文件
import 'quill-table-up/index.css'
import 'quill-table-up/table-creator.css'

// 注册 table-up 模块
FluentEditor.register({ 'modules/table-up': generateTableUp(TableUp) }, true)

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  // 配置工具栏菜单项
  [{ 'table-up': [] }],
]

new FluentEditor(element, {
  theme: 'snow',
  modules: {
    'toolbar': TOOLBAR_CONFIG,
    // 配置 table-up 模块
    'table-up': {
      // 配置工具栏中选择表格行/列数量
      customSelect: defaultCustomSelect,
      
      // 配置拖选多个单元格，进行后续操作，比如：合并单元格、设置单元格背景色等
      selection: TableSelection,
      selectionOptions: {
        // 配置工具栏菜单的显示方式，支持点击右键显示、选择单元格后常驻显示两种形式
        tableMenu: TableMenuSelect,
      },
    },
  },
})
```

效果如下：

![表格单元格菜单效果.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/0dbc39ec97f244b9b259517aacb4d683~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240537&x-orig-sign=wYdOmLvr1U6T3unEdK6mTg1b6Kw%3D)

更多特性欢迎大家使用和体验。

体验地址：<https://opentiny.github.io/tiny-editor/docs/demo/table-up>

### 1.3 更丰富的 Emoji 表情😘

在富文本中插入表情，虽然不是一个必须的功能，但却能让富文本内容更加有趣，比如我用富文本编辑器写一篇文章，如果能再文章中插入可可爱爱的 Emoji 表情，将是一件多么美妙的事情。

之前的 TinyEditor 支持的表情数量有限，而且没有做分类，不支持搜索，想要找一个想要的表情太难了。[vaebe](https://github.com/vaebe) 基于 emoji-mart 实现了一个新的 Emoji 模块，不仅支持更多表情，而且做了分类，支持表情的搜索、预览、最近实用的表情等实用的功能。

使用之前需要先安装对应的依赖：

```bash
npm i @floating-ui/dom @emoji-mart/data emoji-mart
```

然后分别在工具栏和模块开启 emoji 即可。

```typescript
import FluentEditor from '@opentiny/fluent-editor'

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  // 配置 Emoji
  ['emoji'],
]

new FluentEditor(element, {
  theme: 'snow',
  modules: {
    'toolbar': TOOLBAR_CONFIG,
    // 配置 emoji 模块
    'emoji': true,
  },
})
```

效果如下：

![emoji表情效果.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a7b7f590ed114d46b5fb1185f6537854~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240537&x-orig-sign=Y8haJPMwXXpJxlTJCNyBplwq1M0%3D)

对比下之前的表情面板：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/62d9990a8edc46f08e02a86208f69a72~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240537&x-orig-sign=keof6wALLzEe7jvEaYs2XwCibns%3D)

新版的表情功能，UI 和体验都比之前的好太多了，感谢 [vaebe](https://github.com/vaebe) 给我们提供了一个这么好用的表情功能。

更多特性欢迎大家使用和体验。

体验地址：<https://opentiny.github.io/tiny-editor/docs/demo/emoji>

### 1.4 快捷键和快速菜单

新增了强大的快捷键系统和快速菜单功能，让高级用户能够更高效地操作编辑器。

体验地址：<https://opentiny.github.io/tiny-editor/projects/>

效果如下：

![快捷键.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/addf8f3ab20b4b74b371eb45300968e3~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240623&x-orig-sign=jrfkTT55SUTHTQ4H%2BF3e%2BfHajFc%3D)

### 1.5 颜色选择器升级

自定义颜色选择器现在能保存当前选择，并支持添加更多颜色。

效果如下：

![image.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/a40da4b35d2543c6bff39fbf1a61c66a~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240623&x-orig-sign=qrrcJn0Sv%2Fm%2Bth04s0ENkNGw%2FeM%3D)

### 1.6 文本模板与国际化

*   支持 i18n 文本模板替换
*   完善了国际化翻译（header、picker 等组件）
*   更好的多语言支持体验

### 1.7 体验更好的图片/视频/文件上传功能

*   **图片工具栏**：选中图片时显示专门的操作工具栏
*   **自定义上传**：增加 `allowInvalidUrl` 选项，支持 Electron 等特定场景
*   **改进的上传逻辑**：优化了失败状态的处理

“富文本”意味着不仅仅是文字，还包含图片、视频等更丰富的内容，之前的图片、视频、文件上传是独立的三个模块，这就导致很多功能上的重复，比如校验文件格式、大小，多图、多文件上传，调整图片、视频宽高，图片、文件的下载等功能，每个模块都要实现一遍。

[zzxming](https://github.com/zzxming) 敏锐地识别到了这个问题，并将图片、视频、文件模块合并成一个模块，默认会处理视频与图片格式，其他格式统一被处理为文件显示。

*   图片可以拉伸放大缩小，可以左中右对齐，可以复制、下载
*   视频可以播放、暂停、下载、全屏、调整声音
*   文件可以查看大小、下载、删除

使用起来非常简单，只需要在工具栏配置中配置即可。

```typescript
import FluentEditor from '@opentiny/fluent-editor'

const TOOLBAR_CONFIG = [
  [{ header: [] }],
  ['bold', 'italic', 'underline', 'link'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  ['clean'],
  // 配置图片、视频、文件上传功能
  ['file', 'image', 'video'],
]

new FluentEditor(element, {
  theme: 'snow',
  modules: {
    'toolbar': TOOLBAR_CONFIG,
  },
})
```

效果如下：

![文件上传效果.gif](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/2aaa8f0b3354470bb520ac12053618cd~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769240537&x-orig-sign=cQj6iuMwhmiZCSFESsAUikIUSJo%3D)

更多特性欢迎大家使用和体验。

体验地址：<https://opentiny.github.io/tiny-editor/docs/demo/file-upload>

## 2 技术改进

### 2.1 构建和工程化

*   修复了 SSR 构建问题
*   优化了 Vite 配置，解决了 PostCSS 和 Tailwind 的兼容性问题
*   改进了 SCSS 文件引入方式
*   输出文件名称优化

### 2.2 依赖管理

*   外部化 emoji-mart 和 floating-ui 依赖，减少包体积
*   移除了 better-table 和 lodash-es，优化依赖树

### 2.3 代码质量

*   完整的测试覆盖率提升
*   重构优化：移除冗余代码
*   API 标准化：`scrollIntoView` → `scrollSelectionIntoView`
*   示例代码 `async/await` 改造，代码现代化

### 2.4 类型安全

*   修复了因 TypeScript 类型导致的编译错误
*   改进了类型定义

### 2.5 API 导出增强

v4.0 导出了工具栏配置常量，方便开发者定制：

*   `DEFAULT_TOOLBAR`：默认工具栏配置
*   `FULL_TOOLBAR`：完整工具栏配置

### 2.6 增加自动发包工作流

*   增加 auto-publish / auto-deploy 等自动化工作流，支持打 tag 之后自动发版本、生成 Release Notes
*   PR 门禁在单元测试基础上增加 npm 包和网站构建，确保合入 PR 之前，npm 包构建和网站构建是正常的，通过自动化方式保障版本质量。

## 3 问题修复

v4.0 修复了大量已知问题，包括：

*   工具栏选择器不跟随光标变化的问题
*   行高作用域问题
*   列表样式显示不正确
*   背景色 SVG 图标问题
*   VitePress 默认样式影响的问题
*   自定义上传失败时表格数据结构破坏的问题
*   多项文档和国际化翻译问题

## 4 社区贡献

感谢所有为 v4.0 做出贡献的开发者！你们的辛勤付出让 TinyEditor 变得更好！

*   [@chenxi-20](https://github.com/chenxi-20)
*   [@GaoNeng-wWw](https://github.com/GaoNeng-wWw)
*   [@jany55555](https://github.com/jany55555)
*   [@qwangry](https://github.com/qwangry)
*   [@shenyaofeng](https://github.com/shenyaofeng)
*   [@vaebe](https://github.com/vaebe)
*   [@wuyiping0628](https://github.com/wuyiping0628)
*   [@Yinlin124](https://github.com/Yinlin124)
*   [@zzxming](https://github.com/zzxming)

> 注：排名不分先后，按名字首字母排序。

<EditInfo time="2026-01-07 10:28" title="22790展现 · 1364阅读 · 19点赞 · 0评论 · 14收藏" />