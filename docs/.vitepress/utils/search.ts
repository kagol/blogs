import fs from 'fs'
import path from 'path'

export interface SearchItem {
  id: string
  title: string
  path: string
  content: string
  category: string
}

/**
 * 提取markdown文件中的纯文本内容（移除markdown语法）
 */
function extractPlainText(content: string): string {
  return content
    // 移除HTML标签和markdown特殊标记
    .replace(/<[^>]+>/g, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/#{1,6}\s+/g, '')
    .replace(/\*\*|__/g, '')
    .replace(/\*|_/g, '')
    .replace(/`+/g, '')
    .replace(/[-*+]\s+/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/**
 * 从markdown文件中提取标题
 */
function extractTitleFromMarkdown(content: string, fileName: string): string {
  const match = content.match(/^#\s+(.+?)$/m)
  return match ? match[1].trim() : fileName.replace(/\.md$/, '')
}

/**
 * 递归扫描目录中的markdown文件
 */
function scanMarkdownFiles(dirPath: string, baseDocsPath: string, category = ''): SearchItem[] {
  const items: SearchItem[] = []

  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })

    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      
      if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== '.vitepress') {
        // 确定分类
        const relativePath = path.relative(baseDocsPath, fullPath)
        const pathParts = relativePath.split(path.sep)
        const newCategory = pathParts[0] || category

        items.push(...scanMarkdownFiles(fullPath, baseDocsPath, newCategory))
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const relativePath = path.relative(baseDocsPath, fullPath)
          const docPath = relativePath.replace(/\\/g, '/').replace(/\.md$/, '')
          const title = extractTitleFromMarkdown(content, entry.name)
          const plainText = extractPlainText(content)

          items.push({
            id: docPath,
            title,
            path: `/${docPath}`,
            content: plainText.substring(0, 500),
            category: category || 'uncategorized'
          })
        } catch (error) {
          console.warn(`Error reading file ${fullPath}:`, error)
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error)
  }

  return items
}

/**
 * 生成搜索索引
 */
export function generateSearchIndex(docsPath: string): SearchItem[] {
  const items = scanMarkdownFiles(docsPath, docsPath)
  return items.sort((a, b) => a.title.localeCompare(b.title))
}
