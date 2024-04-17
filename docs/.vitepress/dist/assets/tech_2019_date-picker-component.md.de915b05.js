import{_ as a,B as t,o,c as r,G as c,Q as n}from"./chunks/framework.1fee3549.js";const s="/blogs/assets/date-picker-component-1.png",p="/blogs/assets/date-picker-component-2.png",d="/blogs/assets/date-picker-component-3.png",i="/blogs/assets/date-picker-component-4.png",l="/blogs/assets/date-picker-component-5.png",_="/blogs/assets/date-picker-component-6.png",h="/blogs/assets/date-picker-component-7.png",D=JSON.parse('{"title":"DatePicker 日期选择组件的实现","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2019/date-picker-component.md","filePath":"tech/2019/date-picker-component.md"}'),m={name:"tech/2019/date-picker-component.md"},k=n('<h1 id="datepicker-日期选择组件的实现" tabindex="-1">DatePicker 日期选择组件的实现 <a class="header-anchor" href="#datepicker-日期选择组件的实现" aria-label="Permalink to &quot;DatePicker 日期选择组件的实现&quot;">​</a></h1><h2 id="_1-效果图" tabindex="-1">1 效果图 <a class="header-anchor" href="#_1-效果图" aria-label="Permalink to &quot;1 效果图&quot;">​</a></h2><p>日期选择组件大概长这样：</p><p><img src="'+s+'" alt="日期选择组件"></p><p>从效果图可以看出，日期选择组件由两部分组成：日历表格和顶部操作栏。</p><h2 id="_2-日历表格" tabindex="-1">2 日历表格 <a class="header-anchor" href="#_2-日历表格" aria-label="Permalink to &quot;2 日历表格&quot;">​</a></h2><p>日期选择组件的核心主体是日历表格： <img src="'+p+'" alt="日历表格"></p><p>可以将日历表格表示成一个7✖️*的二维数组，数组中的每一项为一个日期。 一个月有28/29/30/31天，一个星期有7天，最极端的情况，日历数组是一个7✖️4的二维数组，大部分月份都是7✖️5或者7✖️6的二维数组。 不妨假设数组的列是6，非当月的日期用上一月/下一月的日期代替。 从今天出发，获取今天所在月的日历数组。</p><h3 id="_2-1-获取指定日期所在月的日历数组" tabindex="-1">2.1 获取指定日期所在月的日历数组 <a class="header-anchor" href="#_2-1-获取指定日期所在月的日历数组" aria-label="Permalink to &quot;2.1 获取指定日期所在月的日历数组&quot;">​</a></h3><p>1.要获取当前月的日历数组，只需要获取每一周的周数组，按照之前的假设一共6周，循环6次，将每一周的周数组合在一起就是月数组。 2.获取第一周的周数组，需要先获取今天所在月的第一天firstDayOfMonth，这样就可以知道第一周的第一天，一周7天，循环7次，就得到第一周的周数组。 3.同理可得之后6周的周数组。 4.最终得到当月的日历数组，具体算法如下： <img src="'+d+'" alt="获取指定日期所在月份的日历数组"></p><p>通过以上方法，给定任意一个日期，可以得到当月的日历数组。 比如：<code>getCalendarArr(‘2018-09-27’)</code>得到的是<code>[[‘2018-08-26’, ‘2018-08-27’, …, ‘2018-09-01’], …, [‘2018-09-30’, …, ‘2018-10-06’]]</code></p><p>其中用到的获取周数组的代码如下： <img src="'+i+'" alt="获取周数组"></p><p>给定任意日期，可以获取其第num周（对于月日历来说一共6周）的周数组。 比如：<code>getWeekArr(‘2018-09-27’, 0)</code>得到的是<code>[‘2018-09-23’, ‘2018-09-24’, …, ‘2018-09-29’]</code> 而<code>getWeekArr(‘2018-09-27’, 1)</code>得到的是<code>[‘2018-09-30’, ‘2018-10-01’, …, ‘2018-10-06’]</code></p><h3 id="_2-2-由日历数组生成日历表格" tabindex="-1">2.2 由日历数组生成日历表格 <a class="header-anchor" href="#_2-2-由日历数组生成日历表格" aria-label="Permalink to &quot;2.2 由日历数组生成日历表格&quot;">​</a></h3><p>得到了日历数组，要生成日历表格就是轻而易举的事情。 <img src="'+l+'" alt="由日历数组生成日历表格"></p><p>具体效果如下： <img src="'+_+'" alt="日历表格效果图"></p><h3 id="_2-3-增加日期点击操作" tabindex="-1">2.3 增加日期点击操作 <a class="header-anchor" href="#_2-3-增加日期点击操作" aria-label="Permalink to &quot;2.3 增加日期点击操作&quot;">​</a></h3><p><img src="'+h+'" alt="增加日期点击操作"></p><p>点击某个日期可以输出该日期。</p><h2 id="_3-顶部操作栏" tabindex="-1">3 顶部操作栏 <a class="header-anchor" href="#_3-顶部操作栏" aria-label="Permalink to &quot;3 顶部操作栏&quot;">​</a></h2><p>主要包括切换上一年/上一月/下一月/下一年这几个操作和当前年月的展示。</p><h3 id="_3-1-获取下一月的日历数组" tabindex="-1">3.1 获取下一月的日历数组 <a class="header-anchor" href="#_3-1-获取下一月的日历数组" aria-label="Permalink to &quot;3.1 获取下一月的日历数组&quot;">​</a></h3><p>只需要把getCalendarArr中的date参数变成下个月的日期就好，moment中有一个函数可以实现： <code>date.add(1, ‘months’)</code> 同理上一月的就是：<code>date.add(-1, ‘months’)</code> 同理下一年的就是：<code>date.add(1, ‘years’)</code></p><p>组件源码链接： <a href="https://github.com/kagol/react-components/tree/master/src/components/DatePicker" title="日期选择组件" target="_blank" rel="noreferrer">日期选择组件</a></p>',24);function g(b,u,f,P,q,x){const e=t("EditInfo");return o(),r("div",null,[k,c(e,{time:"2019-01-16 16:43",title:"阅读(5648) 评论(0) 推荐(0)"})])}const C=a(m,[["render",g]]);export{D as __pageData,C as default};
