# VitePress 博客按月份分组功能文档

## 功能介绍

本功能为VitePress博客项目增加了按日期分组的能力。文章会自动按照发布月份进行分组，并按照从近到远的顺序显示在侧边栏中。

## 文件说明

### 1. `/docs/.vitepress/utils/article-grouping.ts`
核心工具文件，包含以下主要函数：

- **`extractTitleFromMarkdown(filePath: string)`**: 从markdown文件中提取文章标题（从第一个H1标题）
- **`extractDateFromPath(filePath: string)`**: 从文件路径中提取年月信息
  - 支持年份目录格式：`/docs/category/YYYY/filename.md`
  - 月份识别规则：
    - 文件名包含 `mid` → 6月（中旬）
    - 文件名包含 `year` 或 `end` → 12月（年底）
    - 文件名包含两位数字 → 作为月份解析（01-12）
    - 默认 → 1月

- **`scanArticlesInDirectory(dirPath, docsRoot, relativePath)`**: 扫描指定目录的所有markdown文章，递归处理年份子目录

- **`groupArticlesByMonth(articles)`**: 将文章按年月分组，返回按照从近到远排序的分组对象

- **`generateMonthlyGroupedSidebar(articles)`**: 生成VitePress侧边栏配置，每个月份作为一个可折叠的分组

### 2. `/docs/.vitepress/sidebar.ts`
侧边栏配置文件，提供两套方案：

**原始方案（按分类）：**
- `sidebarTech()` - 按分类返回技术文章侧边栏
- `sidebarOpenSource()` - 按分类返回开源文章侧边栏

**新方案（按月份分组）：**
- `sidebarTechMonthly()` - 动态扫描并按月份分组技术文章
- `sidebarOpenSourceMonthly()` - 动态扫描并按月份分组开源文章

### 3. `/docs/.vitepress/config.ts`
VitePress配置文件。已更新为使用新的按月份分组的侧边栏：

```typescript
sidebar: {
  '/tech/': sidebarTechMonthly(),
  '/open-source/': sidebarOpenSourceMonthly()
}
```

## 如何使用

### 方案1：使用按月份分组的侧边栏（推荐）

在 `config.ts` 中：
```typescript
import { sidebarTechMonthly, sidebarOpenSourceMonthly } from './sidebar'

sidebar: {
  '/tech/': sidebarTechMonthly(),
  '/open-source/': sidebarOpenSourceMonthly()
}
```

### 方案2：恢复按分类的侧边栏

在 `config.ts` 中：
```typescript
import { sidebarTech, sidebarOpenSource } from './sidebar'

sidebar: {
  '/tech/': sidebarTech(),
  '/open-source/': sidebarOpenSource()
}
```

## 文章月份识别说明

系统会根据以下规则自动识别文章的发布月份：

1. **文件路径解析**：文件必须在年份目录下，如 `/tech/2024/filename.md`

2. **文件名月份识别**：
   - 如果文件名中包含 `mid`（如 `summary-2024-mid.md`）→ 识别为6月
   - 如果文件名中包含 `year` 或 `end`（如 `summary-2024.md`）→ 识别为12月
   - 如果文件名中包含两位数字（如 `03-article.md`）→ 识别为该月份（03 = 三月）
   - 其他情况 → 默认为1月

## 示例

### 文件结构：
```
docs/
├── tech/
│   ├── 2024/
│   │   ├── typescript-guide.md (默认1月)
│   │   ├── summary-2024-mid.md (识别为6月)
│   │   └── summary-2024.md (识别为12月)
│   └── 2023/
│       └── vue-tips.md
└── open-source/
    └── 2025/
        └── summary-2025-mid.md
```

### 生成的侧边栏效果：
```
按月份分组侧边栏 (按从近到远排序)
├── 2025年1月
│   └── (articles from 2025-01)
├── 2024年12月
│   └── summary-2024
├── 2024年6月
│   └── summary-2024-mid
├── 2024年1月
│   └── typescript-guide
└── 2023年1月
    └── vue-tips
```

## 自定义月份识别

如果需要修改月份识别规则，编辑 `utils/article-grouping.ts` 中的 `extractDateFromPath` 函数：

```typescript
export function extractDateFromPath(filePath: string): ... {
  // 修改月份识别逻辑
}
```

## 备份说明

原始的 `sidebar.ts` 已备份为 `sidebar-original.ts`，如需恢复可以：

```bash
mv sidebar-original.ts sidebar.ts
```

## 故障排除

### 问题：文章未出现在侧边栏中

**可能原因：**
1. 文件不在年份目录下（需要 `/YYYY/filename.md` 格式）
2. 文件名为 `index.md`（被系统忽略）
3. 目录结构有误

**解决方案：**
- 确保文件在年份目录下
- 检查文件扩展名是否为 `.md`
- 查看控制台是否有错误信息

### 问题：月份识别错误

1. 检查文件名是否符合识别规则
2. 修改 `extractDateFromPath` 函数来定制识别规则
3. 可以显式地在文件名中添加月份标识（如 `05-article.md` 表示5月）

## 性能说明

- 侧边栏在构建时生成，不会影响运行时性能
- 文章扫描仅在VitePress构建时执行一次
- 按月份分组无额外的网络请求开销

## 后续改进

可能的后续改进方向：

1. **支持Frontmatter日期**：直接从markdown的frontmatter中读取日期
2. **按年份分组**：提供按年份分组的选项
3. **自定义排序**：支持自定义排序方式（升序/降序）
4. **日期格式支持**：支持更多的日期格式识别
5. **文章统计**：显示每个月份的文章数量
