# VitePress 博客按月份分组功能 - 使用示例

## 功能概述

已为您的VitePress博客项目成功添加了**按月份分组**的功能。现在文章会自动按照发布月份进行分组，并按照从近到远的月份顺序在侧边栏中显示。

## ✨ 核心改进

### 原来的结构（按分类）
```
前端
├── 文章1
├── 文章2
└── ...
Vue
├── 文章3
├── 文章4
└── ...
```

### 现在的结构（按月份）
```
2025年1月
├── 文章A
└── 文章B
2024年12月
├── 文章C
├── 文章D
└── ...
2024年6月
└── 文章E
...
```

## 📁 新增文件说明

### 1. **`/docs/.vitepress/utils/article-grouping.ts`** （核心工具库）
包含所有的文章扫描、日期提取、分组逻辑的函数库。

**主要功能：**
- 扫描目录中的markdown文件
- 从文件名和路径提取发布日期
- 按月份对文章进行分组
- 生成VitePress侧边栏配置

### 2. **更新的 `/docs/.vitepress/sidebar.ts`**
添加了两个新的函数：
- `sidebarTechMonthly()` - 技术板块的月份分组侧边栏
- `sidebarOpenSourceMonthly()` - 开源板块的月份分组侧边栏

同时保留了原来的分类函数以供备份和切换。

### 3. **更新的 `/docs/.vitepress/config.ts`**
已修改为使用新的月份分组侧边栏：
```typescript
sidebar: {
  '/tech/': sidebarTechMonthly(),
  '/open-source/': sidebarOpenSourceMonthly()
}
```

### 4. **`/docs/.vitepress/sidebar-original.ts`** （备份文件）
原始的sidebar.ts文件的完整备份。

## 📅 月份识别规则

系统会自动识别文章的发布月份：

| 文件名特征 | 识别月份 | 示例 |
|-----------|--------|------|
| 包含 `mid` | 6月（中旬） | `summary-2024-mid.md` |
| 包含 `year` 或 `end` | 12月（年底） | `summary-2024.md` |
| 包含两位数字 MM | MM月 | `03-typescript-guide.md` |
| 无特征标记 | 1月（默认） | `normal-article.md` |

## 🔄 如何切换显示方式

### 使用按月份分组（当前方案）
```typescript
// 在 config.ts 中
import { sidebarTechMonthly, sidebarOpenSourceMonthly } from './sidebar'

sidebar: {
  '/tech/': sidebarTechMonthly(),
  '/open-source/': sidebarOpenSourceMonthly()
}
```

### 恢复按分类方式
```typescript
// 在 config.ts 中
import { sidebarTech, sidebarOpenSource } from './sidebar'

sidebar: {
  '/tech/': sidebarTech(),
  '/open-source/': sidebarOpenSource()
}
```

## 🚀 使用示例

### 现在您的侧边栏效果如下：

**技术板块（/tech/）：**
```
2025年1月
├── (新发布的文章)
2024年12月
├── (2024年终总结)
2024年6月
├── (2024年中文章)
2023年1月
├── (2023年的文章)
...（按月份从近到远排序）
```

**开源板块（/open-source/）：**
```
2025年1月
├── 2025年中总结：...
2024年12月
├── 2024年终：...
2024年6月
├── 2024年中：...
...（按月份从近到远排序）
```

## 📊 建议的文件命名规范

为了让系统正确识别文章月份，建议采用以下命名规范：

```
按中旬发布：
├── summary-2024-mid.md （识别为6月）
├── progress-2024-mid.md

按月末/年底发布：
├── summary-2024.md （识别为12月）
├── summary-2023.md
├── annual-report-2024.md

按特定月份发布：
├── 01-january-article.md （识别为1月）
├── 05-may-update.md （识别为5月）
├── 12-december-summary.md （识别为12月）

不携带月份信息：
├── generic-article.md （默认识别为1月）
└── technical-guide.md （默认识别为1月）
```

## ✅ 已验证的功能

- ✅ 文章自动按月份分组
- ✅ 月份按从近到远排序
- ✅ 自动提取markdown文件标题
- ✅ 递归扫描年份目录
- ✅ TypeScript编译通过
- ✅ VitePress构建成功

## 🔧 如何自定义月份识别

如果您需要修改月份识别规则，可以编辑：

文件：`/docs/.vitepress/utils/article-grouping.ts`

函数：`extractDateFromPath()`

例如，修改文件名模式识别：
```typescript
// 原来识别"mid"为6月，可以改为识别"spring"为3月
if (fileName.includes('spring')) {
  month = 3
}
```

## 💡 扩展建议

可以进一步扩展的功能：

1. **Frontmatter支持**：直接从markdown的frontmatter中读取日期
2. **自定义排序**：支持升序/降序选择
3. **按年份分组**：除了月份分组外，也支持按年份分组
4. **统计显示**：在侧边栏中显示每月的文章数量
5. **标签系统**：为文章添加标签，支持多维度分类

## 📝 备份和恢复

如果需要恢复原始的侧边栏配置：

```bash
# 查看备份
ls -la /docs/.vitepress/sidebar-original.ts

# 恢复
cp /docs/.vitepress/sidebar-original.ts /docs/.vitepress/sidebar.ts

# 修改config.ts中的导入和使用
```

## 🎯 总结

现在您的VitePress博客具有以下特点：

- 📅 **按月份自动分组**：无需手动维护分类
- ⬆️ **时间顺序排列**：最新的文章显示在最前面
- 🔄 **动态生成**：添加新文章时自动识别并分组
- 🎨 **保持原有风格**：完全兼容现有的主题和样式
- 💾 **易于切换**：可随时恢复原始的分类方式

祝您使用愉快！ 🎉
