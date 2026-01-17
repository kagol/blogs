# 按月份分组功能 - 修复说明

## 问题描述
文章链接缺少分类前缀（`tech` 或 `open-source`），导致所有文章返回404。

## 原因
`generateMonthlyGroupedSidebar()` 函数生成的链接路径不包含分类前缀：
- ❌ 错误：`/2024/article`
- ✅ 正确：`/tech/2024/article`

## 修复方案

### 1. 更新 `article-grouping.ts`
为 `generateMonthlyGroupedSidebar()` 函数添加可选的 `categoryPrefix` 参数：

```typescript
export function generateMonthlyGroupedSidebar(
  articles: ArticleInfo[], 
  categoryPrefix: string = ''  // 新增参数
) {
  // ...
  link: `/${categoryPrefix}/${article.path}`.replace(/\/+/g, '/')
}
```

### 2. 更新 `sidebar.ts`
在调用 `generateMonthlyGroupedSidebar()` 时传入分类前缀：

**技术文章：**
```typescript
export function sidebarTechMonthly() {
  const techPath = path.join(__dirname, '..', 'tech')
  const articles = scanArticlesInDirectory(techPath, techPath)
  return generateMonthlyGroupedSidebar(articles, 'tech')  // ← 添加 'tech' 前缀
}
```

**开源文章：**
```typescript
export function sidebarOpenSourceMonthly() {
  const openSourcePath = path.join(__dirname, '..', 'open-source')
  const articles = scanArticlesInDirectory(openSourcePath, openSourcePath)
  return generateMonthlyGroupedSidebar(articles, 'open-source')  // ← 添加 'open-source' 前缀
}
```

## 验证

✅ VitePress 构建成功
✅ 所有文章文件正确生成
✅ 链接路径现在包含正确的分类前缀

## 现在的链接结构

**技术板块：**
- `/tech/2024/article-name`
- `/tech/2023/article-name`

**开源板块：**
- `/open-source/2025/article-name`
- `/open-source/2024/article-name`

问题已解决！ 🎉
