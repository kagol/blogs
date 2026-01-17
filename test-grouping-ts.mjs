import path from 'path';
import { fileURLToPath } from 'url';
import { scanArticlesInDirectory, generateMonthlyGroupedSidebar } from './docs/.vitepress/utils/article-grouping';
var __dirname = path.dirname(fileURLToPath(import.meta.url));
var docsPath = path.join(__dirname, 'docs');
console.log('\n========================================');
console.log('VitePress 博客按月份分组功能测试');
console.log('========================================\n');
// 测试技术文章
console.log('📚 技术文章扫描结果：');
console.log('----------------------------------------');
var techPath = path.join(docsPath, 'tech');
var techArticles = scanArticlesInDirectory(techPath, techPath);
console.log("\n\u603B\u6587\u7AE0\u6570\uFF1A".concat(techArticles.length));
console.log('\n文章列表（按时间从近到远）：');
techArticles.slice(0, 10).forEach(function (article, index) {
    console.log("".concat(index + 1, ". [").concat(article.year, "-").concat(String(article.month).padStart(2, '0'), "] ").concat(article.title));
    console.log("   \u8DEF\u5F84: /".concat(article.path));
});
if (techArticles.length > 10) {
    console.log("... \u53CA\u5176\u4ED6 ".concat(techArticles.length - 10, " \u7BC7\u6587\u7AE0"));
}
console.log('\n\n📅 按月份分组的侧边栏结构：');
console.log('----------------------------------------');
var sidebar = generateMonthlyGroupedSidebar(techArticles);
sidebar.forEach(function (group) {
    console.log("\n".concat(group.text));
    if (group.items) {
        group.items.slice(0, 3).forEach(function (item) {
            console.log("  \u251C\u2500 ".concat(item.text));
        });
        if (group.items.length > 3) {
            console.log("  \u2514\u2500 ... \u53CA\u5176\u4ED6 ".concat(group.items.length - 3, " \u7BC7"));
        }
    }
});
// 测试开源文章
console.log('\n\n\n📖 开源文章扫描结果：');
console.log('----------------------------------------');
var openSourcePath = path.join(docsPath, 'open-source');
var openSourceArticles = scanArticlesInDirectory(openSourcePath, openSourcePath);
console.log("\n\u603B\u6587\u7AE0\u6570\uFF1A".concat(openSourceArticles.length));
console.log('\n文章列表（按时间从近到远）：');
openSourceArticles.slice(0, 10).forEach(function (article, index) {
    console.log("".concat(index + 1, ". [").concat(article.year, "-").concat(String(article.month).padStart(2, '0'), "] ").concat(article.title));
    console.log("   \u8DEF\u5F84: /".concat(article.path));
});
if (openSourceArticles.length > 10) {
    console.log("... \u53CA\u5176\u4ED6 ".concat(openSourceArticles.length - 10, " \u7BC7\u6587\u7AE0"));
}
console.log('\n\n📅 按月份分组的侧边栏结构：');
console.log('----------------------------------------');
var openSourceSidebar = generateMonthlyGroupedSidebar(openSourceArticles);
openSourceSidebar.forEach(function (group) {
    console.log("\n".concat(group.text));
    if (group.items) {
        group.items.slice(0, 3).forEach(function (item) {
            console.log("  \u251C\u2500 ".concat(item.text));
        });
        if (group.items.length > 3) {
            console.log("  \u2514\u2500 ... \u53CA\u5176\u4ED6 ".concat(group.items.length - 3, " \u7BC7"));
        }
    }
});
console.log('\n\n========================================');
console.log('✅ 测试完成！');
console.log('========================================\n');
