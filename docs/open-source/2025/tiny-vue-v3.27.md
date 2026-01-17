# 🎉TinyVue v3.27.0 正式发布：增加 Space 新组件，ColorPicker 组件支持线性渐变

你好，我是 Kagol，个人公众号：`前端开源星球`。

我们非常高兴地宣布 TinyVue [v3.27.0](https://github.com/opentiny/tiny-vue/releases/tag/v3.27.0) 正式发布🎉。该版本聚焦于增强可定制性与可访问性，新增若干实用组件能力，并修复了大量用户反馈的关键问题，提升了在 SaaS 主题与移动端的兼容性与稳定性。

## 主要亮点

-   **新增插槽**: `date-picker` 增加了 footer 插槽，提升自定义底部交互能力。
-   **更精细的日期控制**: `calendar-view` 与 `date-picker` 支持按天指定日期与换行显示，日历展示更灵活。
-   **选择器改进**: `select` 增加 `autoSelect` 属性并优化可搜索场景下的中断问题，提高选择体验与可靠性。
-   **组件扩展**: `steps` 支持单链环形节点图标插槽，`space` 组件被新增以方便布局间距管理。
-   **样式与主题**: `exception` 组件补充了 PC 模板与深色模式支持，并对 Saas 主题做了多项样式调整（包含 `ip-address`、`button`、`divider`、`badge` 等）。
-   **配色与面板**: `color-select-panel` 支持线性渐变，`color-select` 新增 `color-mode` 属性，色彩选择更强大。
-   **树形菜单与搜索**: `tree-menu` 优化 demo 数据并暴露搜索事件，便于构建可搜索的侧边/树型导航。
-   **Grid 功能增强**: 新增 `valid-config` 的 `highlightError`、鼠标悬停显示对齐线等多项体验改进。

## 重要修复

-   **移动端兼容**: 修复 mobile-first 场景下 `tag` 可选但不生效的问题；修复 Saas 模式下若干控件的样式显示异常。
-   **交互与显示**: 修复 `notify` 垂直偏移、`tabs` 同时使用 `overflow-title` 与 `with-close` 的渲染问题、`slider` 横竖模式切换错误、`calendar-view` 同时段多任务显示异常等。
-   **性能与稳定性**: 修复 `grid` 中 filterStore 的响应性问题、加载组件错误、分页尺寸变更导致的 body 高度错误等。
-   **兼容性与测试**: 修复 `infinite-scroll` 在同页使用两处时报错的问题；完善各组件在 E2E 和示例中的兼容处理（`dialog-select`、`input`、`notify` 等）。
-   **工具链与构建**: 修复打包后 CSS 缺失 tiny 前缀的问题，并修复发布流程相关错误。

## 升级与迁移建议

-   **安装升级**: 推荐在项目中将依赖升级到 v3.27.0，例如：

    -   `npm install @opentiny/vue@3.27.0`
    -   或使用 pnpm: `pnpm add @opentiny/vue@3.27.0`

-   **回归测试**: 升级后请重点回归以下场景：

    -   自定义 Saas 主题与样式（按钮、表单项、分隔线等视觉差异）
    -   `select` 的可搜索行为与 `autoSelect` 新属性的交互
    -   `date-picker`/`calendar-view` 的自定义槽位、日期展示（包含换行显示）
    -   使用 `grid` 的自定义校验配置与分页行为
    -   `infinite-scroll` 在页面多处实例化的稳定性

-   **样式注意**: 若项目依赖 SaaS 模板或定制 less/样式，请检查示例与主题调整（本次修复中新增/修改了若干 Saas 相关 less 文件与样式规范）。

-   **兼容 props**: 关注新增的 `popperOptions`（Picker）、`hideSaas`（示例隐藏）等属性，调整自定义逻辑以兼容新选项。

## 社区与贡献

-   本次发布汇集了大量社区贡献，特别感谢以下贡献者（部分举例）：

    -   @discreted66（多项 date-picker、calendar、exception 改进）
    -   @chenxi-20（tabs、steps、notify 修复与改进）
    -   @shenjunjian（select、input、picker 修复与增强）
    -   @gimmyhehe（grid 相关改进）
    -   @wuyiping0628、@zzcr、@James-9696、@KevinAndrewDong 等多人提交大量 PR 和修复

-   欢迎更多新贡献者加入：本版本中 @gausszhou 与 @ynnnny 完成了他们的首次贡献。

详细的更新信息请查看 [Release Notes](https://github.com/opentiny/tiny-vue/releases/tag/v3.27.0)

## 小结

v3.27.0 是一次以可定制性、体验与稳定性为核心的迭代：新增插槽、色彩/布局组件、以及大量围绕 Saas 与移动端的修复，将帮助你在实际应用中获得更一致、更可控的表现。升级后请务必执行回归测试并关注样式与交互的边缘场景。

<EditInfo time="2025-12-25 17:22" title="8786展现 · 283阅读 · 2点赞 · 0评论 · 0收藏" />