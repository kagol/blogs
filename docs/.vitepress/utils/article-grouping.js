"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.extractTitleFromMarkdown = extractTitleFromMarkdown;
exports.extractDateFromPath = extractDateFromPath;
exports.scanArticlesInDirectory = scanArticlesInDirectory;
exports.groupArticlesByMonth = groupArticlesByMonth;
exports.generateMonthlyGroupedSidebar = generateMonthlyGroupedSidebar;
var fs_1 = require("fs");
var path_1 = require("path");
/**
 * 从markdown文件中提取标题
 */
function extractTitleFromMarkdown(filePath) {
    try {
        var content = fs_1.default.readFileSync(filePath, 'utf-8');
        var match = content.match(/^#\s+(.+)$/m);
        return match ? match[1].trim() : path_1.default.basename(filePath, '.md');
    }
    catch (_a) {
        return path_1.default.basename(filePath, '.md');
    }
}
/**
 * 从目录路径和文件名提取日期信息
 * 假设结构为: /docs/category/year/filename.md
 */
function extractDateFromPath(filePath) {
    var parts = filePath.split(path_1.default.sep);
    // 查找年份部分
    var yearIndex = parts.findIndex(function (p) { return /^\d{4}$/.test(p); });
    if (yearIndex === -1) {
        return null;
    }
    var year = parseInt(parts[yearIndex], 10);
    // 尝试从文件名中提取月份 (格式: filename-YY.md 或其他格式)
    var fileName = parts[parts.length - 1];
    // 常见的月份相关模式：month, mid (中旬，假设为06月)，end/year (年底，假设为12月)
    var month = 1; // 默认一月
    if (fileName.includes('mid')) {
        month = 6; // 中旬默认为6月
    }
    else if (fileName.includes('year') || fileName.includes('summary') && fileName.includes('end')) {
        month = 12; // 年底默认为12月
    }
    else if (fileName.includes('-mid')) {
        month = 6;
    }
    else {
        // 尝试从文件名提取数字作为月份
        var monthMatch = fileName.match(/(\d{2})/);
        if (monthMatch) {
            var extractedMonth = parseInt(monthMatch[1], 10);
            if (extractedMonth >= 1 && extractedMonth <= 12) {
                month = extractedMonth;
            }
        }
    }
    var date = new Date(year, month - 1, 1);
    return { year: year, month: month, date: date };
}
/**
 * 扫描指定目录的markdown文件并返回文章信息
 */
function scanArticlesInDirectory(dirPath, docsRoot, relativePath) {
    if (relativePath === void 0) { relativePath = ''; }
    var articles = [];
    try {
        var entries = fs_1.default.readdirSync(dirPath, { withFileTypes: true });
        for (var _i = 0, entries_1 = entries; _i < entries_1.length; _i++) {
            var entry = entries_1[_i];
            var fullPath = path_1.default.join(dirPath, entry.name);
            var docRelativePath = path_1.default.join(relativePath, entry.name);
            if (entry.isDirectory() && /^\d{4}$/.test(entry.name)) {
                // 递归处理年份目录
                articles.push.apply(articles, scanArticlesInDirectory(fullPath, docsRoot, docRelativePath));
            }
            else if (entry.isFile() && entry.name.endsWith('.md') && entry.name !== 'index.md') {
                var dateInfo = extractDateFromPath(fullPath);
                if (dateInfo) {
                    var docLinkPath = docRelativePath
                        .replace(/\\/g, '/')
                        .replace(/\.md$/, '');
                    articles.push({
                        title: extractTitleFromMarkdown(fullPath),
                        path: docLinkPath,
                        year: dateInfo.year,
                        month: dateInfo.month,
                        date: dateInfo.date
                    });
                }
            }
        }
    }
    catch (error) {
        console.error("Error scanning directory ".concat(dirPath, ":"), error);
    }
    return articles;
}
/**
 * 按年月分组文章，按从近到远的顺序排序
 */
function groupArticlesByMonth(articles) {
    var grouped = {};
    // 按日期排序（从近到远）
    var sorted = __spreadArray([], articles, true).sort(function (a, b) { return b.date.getTime() - a.date.getTime(); });
    // 按年月进行分组
    for (var _i = 0, sorted_1 = sorted; _i < sorted_1.length; _i++) {
        var article = sorted_1[_i];
        var key = "".concat(article.year, "-").concat(String(article.month).padStart(2, '0'));
        if (!grouped[key]) {
            grouped[key] = [];
        }
        grouped[key].push(article);
    }
    return grouped;
}
/**
 * 生成按月份分组的侧边栏项目，按从近到远的顺序
 */
function generateMonthlyGroupedSidebar(articles) {
    var grouped = groupArticlesByMonth(articles);
    // 获取所有的年月key并按从近到远排序
    var sortedKeys = Object.keys(grouped).sort().reverse();
    // 将月份转换为更友好的显示格式
    var monthNames = [
        '1月', '2月', '3月', '4月', '5月', '6月',
        '7月', '8月', '9月', '10月', '11月', '12月'
    ];
    return sortedKeys.map(function (key) {
        var _a = key.split('-'), year = _a[0], month = _a[1];
        var monthNum = parseInt(month, 10);
        var displayText = "".concat(year, "\u5E74").concat(monthNames[monthNum - 1]);
        return {
            text: displayText,
            collapsed: true,
            items: grouped[key].map(function (article) { return ({
                text: article.title,
                link: "/".concat(article.path)
            }); })
        };
    });
}
