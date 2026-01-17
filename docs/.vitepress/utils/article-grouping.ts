import fs from 'fs'
import path from 'path'

export interface ArticleInfo {
  title: string
  path: string
  year: number
  month: number
  date: Date
}

export interface GroupedArticles {
  [key: string]: ArticleInfo[]
}

/**
 * 从markdown文件中提取标题
 */
export function extractTitleFromMarkdown(filePath: string): string {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const match = content.match(/^#\s+(.+)$/m)
    return match ? match[1].trim() : path.basename(filePath, '.md')
  } catch {
    return path.basename(filePath, '.md')
  }
}

/**
 * 从markdown文件中提取EditInfo标签中的日期信息
 * 格式: <EditInfo time="YYYY-MM-DD HH:mm" ... />
 */
export function extractDateFromEditInfo(filePath: string): { year: number; month: number; date: Date } | null {
  try {
    const content = fs.readFileSync(filePath, 'utf-8')
    const editInfoMatch = content.match(/<EditInfo\s+time="(\d{4})-(\d{2})-(\d{2})\s+\d{2}:\d{2}"/)
    
    if (editInfoMatch) {
      const year = parseInt(editInfoMatch[1], 10)
      const month = parseInt(editInfoMatch[2], 10)
      const date = new Date(year, month - 1, 1)
      return { year, month, date }
    }
  } catch (error) {
    console.warn(`Error reading file ${filePath}:`, error)
  }
  
  return null
}

/**
 * 从目录路径和文件名提取日期信息
 * 优先从文件中的EditInfo标签提取，若无则从路径提取
 * 假设结构为: /docs/category/year/filename.md
 */
export function extractDateFromPath(
  filePath: string
): { year: number; month: number; date: Date } | null {
  // 首先尝试从EditInfo标签提取日期
  const editInfoDate = extractDateFromEditInfo(filePath)
  if (editInfoDate) {
    return editInfoDate
  }
  
  // 若未找到EditInfo，则从路径提取
  const parts = filePath.split(path.sep)
  
  // 查找年份部分
  const yearIndex = parts.findIndex(p => /^\d{4}$/.test(p))
  
  if (yearIndex === -1) {
    return null
  }
  
  const year = parseInt(parts[yearIndex], 10)
  
  // 尝试从文件名中提取月份 (格式: filename-YY.md 或其他格式)
  const fileName = parts[parts.length - 1]
  
  // 常见的月份相关模式：month, mid (中旬，假设为06月)，end/year (年底，假设为12月)
  let month = 1 // 默认一月
  
  if (fileName.includes('mid')) {
    month = 6 // 中旬默认为6月
  } else if (fileName.includes('year') || fileName.includes('summary') && fileName.includes('end')) {
    month = 12 // 年底默认为12月
  } else if (fileName.includes('-mid')) {
    month = 6
  } else {
    // 尝试从文件名提取数字作为月份
    const monthMatch = fileName.match(/(\d{2})/)
    if (monthMatch) {
      const extractedMonth = parseInt(monthMatch[1], 10)
      if (extractedMonth >= 1 && extractedMonth <= 12) {
        month = extractedMonth
      }
    }
  }
  
  const date = new Date(year, month - 1, 1)
  return { year, month, date }
}

/**
 * 扫描指定目录的markdown文件并返回文章信息
 */
export function scanArticlesInDirectory(
  dirPath: string,
  docsRoot: string,
  relativePath: string = ''
): ArticleInfo[] {
  const articles: ArticleInfo[] = []
  
  try {
    const entries = fs.readdirSync(dirPath, { withFileTypes: true })
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name)
      const docRelativePath = path.join(relativePath, entry.name)
      
      if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
        // 递归处理年份目录
        articles.push(...scanArticlesInDirectory(fullPath, docsRoot, docRelativePath))
      } else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
        const dateInfo = extractDateFromPath(fullPath)
        if (dateInfo) {
          const docLinkPath = docRelativePath
            .replace(/\\/g, '/')
            .replace(/\.md$/, '')
          
          articles.push({
            title: extractTitleFromMarkdown(fullPath),
            path: docLinkPath,
            year: dateInfo.year,
            month: dateInfo.month,
            date: dateInfo.date
          })
        }
      }
    }
  } catch (error) {
    console.error(`Error scanning directory ${dirPath}:`, error)
  }
  
  return articles
}

/**
 * 按年月分组文章，按从近到远的顺序排序
 */
export function groupArticlesByMonth(articles: ArticleInfo[]): GroupedArticles {
  const grouped: GroupedArticles = {}
  
  // 按日期排序（从近到远）
  const sorted = [...articles].sort((a, b) => b.date.getTime() - a.date.getTime())
  
  // 按年月进行分组
  for (const article of sorted) {
    const key = `${article.year}-${String(article.month).padStart(2, '0')}`
    
    if (!grouped[key]) {
      grouped[key] = []
    }
    grouped[key].push(article)
  }
  
  return grouped
}

/**
 * 生成按月份分组的侧边栏项目，按从近到远的顺序
 */
export function generateMonthlyGroupedSidebar(articles: ArticleInfo[], categoryPrefix: string = '') {
  const grouped = groupArticlesByMonth(articles)
  
  // 获取所有的年月key并按从近到远排序
  const sortedKeys = Object.keys(grouped).sort().reverse()
  
  // 将月份转换为更友好的显示格式
  const monthNames = [
    '1月', '2月', '3月', '4月', '5月', '6月',
    '7月', '8月', '9月', '10月', '11月', '12月'
  ]
  
  return sortedKeys.map(key => {
    const [year, month] = key.split('-')
    const monthNum = parseInt(month, 10)
    const displayText = `${year}年${monthNames[monthNum - 1]}`
    
    return {
      text: displayText,
      collapsed: true,
      items: grouped[key].map(article => ({
        text: article.title,
        link: `/${categoryPrefix}/${article.path}`.replace(/\/+/g, '/')
      }))
    }
  })
}
