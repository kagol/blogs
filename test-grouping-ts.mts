import path from 'path'
import { fileURLToPath } from 'url'
import { scanArticlesInDirectory, generateMonthlyGroupedSidebar } from './docs/.vitepress/utils/article-grouping'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsPath = path.join(__dirname, 'docs')

console.log('\n========================================')
console.log('VitePress 博客按月份分组功能测试')
console.log('========================================\n')

// 测试技术文章
console.log('📚 技术文章扫描结果：')
console.log('----------------------------------------')

const techPath = path.join(docsPath, 'tech')
const techArticles = scanArticlesInDirectory(techPath, techPath)

console.log(`\n总文章数：${techArticles.length}`)
console.log('\n文章列表（按时间从近到远）：')
techArticles.slice(0, 10).forEach((article, index) => {
  console.log(`${index + 1}. [${article.year}-${String(article.month).padStart(2, '0')}] ${article.title}`)
  console.log(`   路径: /${article.path}`)
})

if (techArticles.length > 10) {
  console.log(`... 及其他 ${techArticles.length - 10} 篇文章`)
}

console.log('\n\n📅 按月份分组的侧边栏结构：')
console.log('----------------------------------------')

const sidebar = generateMonthlyGroupedSidebar(techArticles)

sidebar.forEach((group) => {
  console.log(`\n${group.text}`)
  if (group.items) {
    group.items.slice(0, 3).forEach(item => {
      console.log(`  ├─ ${item.text}`)
    })
    if (group.items.length > 3) {
      console.log(`  └─ ... 及其他 ${group.items.length - 3} 篇`)
    }
  }
})

// 测试开源文章
console.log('\n\n\n📖 开源文章扫描结果：')
console.log('----------------------------------------')

const openSourcePath = path.join(docsPath, 'open-source')
const openSourceArticles = scanArticlesInDirectory(openSourcePath, openSourcePath)

console.log(`\n总文章数：${openSourceArticles.length}`)
console.log('\n文章列表（按时间从近到远）：')
openSourceArticles.slice(0, 10).forEach((article, index) => {
  console.log(`${index + 1}. [${article.year}-${String(article.month).padStart(2, '0')}] ${article.title}`)
  console.log(`   路径: /${article.path}`)
})

if (openSourceArticles.length > 10) {
  console.log(`... 及其他 ${openSourceArticles.length - 10} 篇文章`)
}

console.log('\n\n📅 按月份分组的侧边栏结构：')
console.log('----------------------------------------')

const openSourceSidebar = generateMonthlyGroupedSidebar(openSourceArticles)

openSourceSidebar.forEach((group) => {
  console.log(`\n${group.text}`)
  if (group.items) {
    group.items.slice(0, 3).forEach(item => {
      console.log(`  ├─ ${item.text}`)
    })
    if (group.items.length > 3) {
      console.log(`  └─ ... 及其他 ${group.items.length - 3} 篇`)
    }
  }
})

console.log('\n\n========================================')
console.log('✅ 测试完成！')
console.log('========================================\n')
