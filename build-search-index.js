import { generateSearchIndex } from './docs/.vitepress/utils/search.ts'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const docsPath = path.join(__dirname, 'docs')
const distPath = path.join(__dirname, 'docs/.vitepress/dist')

// 确保输出目录存在
if (!fs.existsSync(distPath)) {
  fs.mkdirSync(distPath, { recursive: true })
}

try {
  console.log('Generating search index...')
  const searchItems = generateSearchIndex(docsPath)
  
  // 生成 JSON 文件
  const jsonPath = path.join(distPath, 'search-index.json')
  fs.writeFileSync(jsonPath, JSON.stringify(searchItems, null, 2))
  const jsonSize = (fs.statSync(jsonPath).size / 1024).toFixed(2)
  console.log(`✓ Generated search-index.json (${jsonSize} KB)`)
  
  // 生成 JS 文件（可直接在浏览器中加载）
  const jsContent = `window.__SEARCH_INDEX__ = ${JSON.stringify(searchItems)};`
  const jsPath = path.join(distPath, 'search-index.js')
  fs.writeFileSync(jsPath, jsContent)
  const jsSize = (fs.statSync(jsPath).size / 1024).toFixed(2)
  console.log(`✓ Generated search-index.js (${jsSize} KB)`)
  
  console.log(`✓ Search index generated successfully with ${searchItems.length} articles`)
} catch (error) {
  console.error('Error generating search index:', error)
  process.exit(1)
}
