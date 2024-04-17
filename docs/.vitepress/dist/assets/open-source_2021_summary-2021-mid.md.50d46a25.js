import{_ as t,B as r,o as a,c as l,G as i,Q as o}from"./chunks/framework.1fee3549.js";const p="/blogs/assets/summary-2021-mid-1.png",n="/blogs/assets/summary-2021-mid-2.png",d="/blogs/assets/summary-2021-mid-3.png",h="/blogs/assets/summary-2021-mid-4.png",q=JSON.parse('{"title":"2021年中总结：烧不死的鸟是凤凰🐦","description":"","frontmatter":{},"headers":[],"relativePath":"open-source/2021/summary-2021-mid.md","filePath":"open-source/2021/summary-2021-mid.md"}'),s={name:"open-source/2021/summary-2021-mid.md"},u=o('<h1 id="_2021年中总结-烧不死的鸟是凤凰🐦" tabindex="-1">2021年中总结：烧不死的鸟是凤凰🐦 <a class="header-anchor" href="#_2021年中总结-烧不死的鸟是凤凰🐦" aria-label="Permalink to &quot;2021年中总结：烧不死的鸟是凤凰🐦&quot;">​</a></h1><p><img src="'+p+'" alt="image"></p><h2 id="前言" tabindex="-1">前言 <a class="header-anchor" href="#前言" aria-label="Permalink to &quot;前言&quot;">​</a></h2><p>每个人都有自己的职场状态。</p><ul><li>刚开始对一切都不熟悉，需要导师带着完成任务，处于适应期；</li><li>慢慢地，开始熟悉业务和流程，并能独立完成项目，处于熟练期；</li><li>当你业务熟练到一种程度之后，你对一切都游刃有余，也总能超出预期地工作，这时处于稳定贡献期，同时也处于瓶颈期；</li><li>这时，你需要转变工作方式，扩展自己的能力边界，并主动争取机会进行转型。</li></ul><p>你现在处于哪种职场状态呢？欢迎在评论区讨论。</p><h2 id="_1-业务交付" tabindex="-1">1 业务交付 <a class="header-anchor" href="#_1-业务交付" aria-label="Permalink to &quot;1 业务交付&quot;">​</a></h2><p>2021年1月1日，<a href="https://www.huaweicloud.com/product/projectman.html" target="_blank" rel="noreferrer">ProjectMan</a>前端业务正式交棒到我这里。</p><p>从只负责一个看板项目，到负责整个ProjectMan前端业务（包含三个Portal业务和两个微前端服务）；</p><p>从只需要管好自己的事，到需要同超过50人的团队一起协作共同完成目标；</p><p>从只需要有扎实的技术能力，到需要同时具备项目管理能力、沟通协作能力、团队管理能力。</p><p>这对我来说是一个挑战，也是一个转型的好机会。</p><h3 id="_1-1-对齐目标" tabindex="-1">1.1 对齐目标 <a class="header-anchor" href="#_1-1-对齐目标" aria-label="Permalink to &quot;1.1 对齐目标&quot;">​</a></h3><p>由于岗位职责的变化，我第一时间跟业务这边的领导对齐了业务目标：</p><ul><li>高效、高质量交付核心用户需求</li><li>保障现网质量，无中等及以上现网事件</li><li>配合公共团队做架构升级，期间无现网事故</li></ul><h3 id="_1-2-制定计划" tabindex="-1">1.2 制定计划 <a class="header-anchor" href="#_1-2-制定计划" aria-label="Permalink to &quot;1.2 制定计划&quot;">​</a></h3><p>明确了目标，接着就是制定计划，上半年主要分成两个部分：</p><ul><li>1-3月：聚焦业务架构升级</li><li>4-6月：聚焦项目空间重大特性的交付</li></ul><p>而现网质量的保障需要贯穿业务交付的整个过程。</p><p>制定计划的关键是：</p><blockquote><p>我要按什么优先级顺序，做哪些事情，才能完成目标？</p></blockquote><h4 id="业务架构升级" tabindex="-1">业务架构升级 <a class="header-anchor" href="#业务架构升级" aria-label="Permalink to &quot;业务架构升级&quot;">​</a></h4><p>业务架构升级是为了保障<a href="https://www.huaweicloud.com/devcloud/" target="_blank" rel="noreferrer">DevCloud</a>整体业务的交付质量和可扩展性，是第一季度业务的重点。</p><p>这里的关键在于对整个Ops流程的理解，从DevCloud整体业务架构、部署架构，到前后台LB、流水线、构建、部署流程、各公共服务的依赖关系，再到如何搭建环境、如何演练、出现问题之后如何定界和推动解决，都必须非常清楚，才能保障整个架构升级的安全、顺利地实施。</p><p>中间经历了10+次凌晨演练和现网升级，50+次加班到22点以后，每次演练和升级之前都仔细梳理、记录和反复检查指导清单，没有出现一次中等及以上的现网事故，虽然很累，但和大家一起“战斗”的经历将弥足珍贵。</p><p>任总说过：</p><blockquote><p>烧不死的鸟🐦是凤凰，从泥坑中爬出来的才是圣人。</p></blockquote><p>我想，经历过业务的历练和洗礼，我将有更大的自信和勇气去迎接未来的挑战！</p><h4 id="高效、高质量交付特性" tabindex="-1">高效、高质量交付特性 <a class="header-anchor" href="#高效、高质量交付特性" aria-label="Permalink to &quot;高效、高质量交付特性&quot;">​</a></h4><p>高效、高质量交付特性的关键在于：</p><ul><li>对业务和流程的熟悉</li><li>项目架构的优化和代码质量的提升</li><li>充分的测试</li></ul><p>所以第一件事就是梳理业务流程和模块，对整个ProjectMan有一个全局的认识。</p><p>然后是从业务出发，识别项目在开发侧上的问题，包括：</p><ul><li>路由设计</li><li>目录结构</li><li>性能问题</li><li>大文件/复杂模块</li><li>文件/代码重复率</li><li>圈复杂度</li></ul><p>并制定重构和优化计划。</p><p>接着是配合和协助测试团队完善全量测试用例，梳理业务交付和版本迭代的流程。</p><p>除了日常的版本交付，第二季度还有幸主导了项目空间大特性从零到一的交付。</p><p>我带领的4人前端团队，整个第二季度几乎全部投入到项目空间特性的开发。</p><p>从搭建项目框架、路由设计、模块划分、组件树设计，到任务分配、核心模块开发、功能和体验验收，再到主机申请、流水线搭建、项目部署整个流程全程主导，中间大家加了不少班，不过经过这三个月，我感受到了团队小伙伴巨大的潜力，也给了我很大的信心。</p><p>我想，以后不管参加任何“攻坚战”、“突击战”，我们这只“劲旅”都能圆满而漂亮地完成。</p><p>以下是该项目的数据：</p><table><thead><tr><th>指标</th><th>数值</th></tr></thead><tbody><tr><td>高保真设计稿</td><td>200+</td></tr><tr><td>后台接口</td><td>60+</td></tr><tr><td>测试用例</td><td>900+</td></tr><tr><td>代码行数</td><td>28000+</td></tr></tbody></table><h3 id="_1-3-时间管理" tabindex="-1">1.3 时间管理 <a class="header-anchor" href="#_1-3-时间管理" aria-label="Permalink to &quot;1.3 时间管理&quot;">​</a></h3><p>在负责整个ProjectMan业务交付的过程中，我作为前端负责人的角色，除了日常开发和团队管理工作，还会频繁地收到来自外部的诉求，也需要不断地向外部求助，很多都是临时性的、琐碎的事情，经常需要同时处理很多事情。</p><p>因此做好时间管理特别重要。</p><p>首先，需要明确自己的时间具体花在哪儿？</p><p>我把自己当成一个新人，每天下班前给自己发一封【时间记录】的邮件，详细记录自己一天都做了些什么。</p><ul><li>细到每次会议收获了什么、达成了什么共识</li><li>细到协助同事解决了一个什么bug</li><li>细到编写了一份指导文档、完成了一张胶片</li></ul><p>接着，每周回顾【时间记录】邮件，看看：</p><ul><li>哪些是可以完全不做的，比如无效的需求、过度的优化、跟自己无关的会议</li><li>哪些是可以想办法授权给别人做的，如果目前团队没人能做，就需要培养团队能力</li><li>哪些是最核心和关键的事情，并对这些事情做优先级排序，要事优先</li></ul><p>时间管理的本质就是：</p><blockquote><p>聚焦最核心和关键的事情，将整块的时间、将最旺盛的精力投入到这些关键事情上，这样才能最大程度地产生有效贡献和成果。</p></blockquote><h3 id="_1-4-团队管理" tabindex="-1">1.4 团队管理 <a class="header-anchor" href="#_1-4-团队管理" aria-label="Permalink to &quot;1.4 团队管理&quot;">​</a></h3><p>时间管理属于个人管理，作为团队负责人，除了管好自己，还需要带领好团队一起完成目标。</p><p>你自己明确了目标和计划还不够，还需要让团队所有成员都明确当前的目标和计划。</p><p>并且对目标进行分解，对任务进行划分，让合适的人做合适的事。</p><p>团队管理最关键的是做好以下事情：</p><ul><li>向团队成员传递什么是最重要的事，确保大家都在做有利于实现目标的事</li><li>为团队成员争取最大的资源，为实现目标扫除障碍</li><li>鼓励团队成员扩展能力边界，时刻准备挑战更高的目标</li></ul><h2 id="_2-开源运营" tabindex="-1">2 开源运营 <a class="header-anchor" href="#_2-开源运营" aria-label="Permalink to &quot;2 开源运营&quot;">​</a></h2><p>除了参与业务交付，我也在持续做DevUI开源运营，2020年只是DevUI开源的起点，详细总结可参考：</p><p><a href="https://juejin.cn/post/6904264934515802126" target="_blank" rel="noreferrer">🏆 DevUI × 掘金 | 技术人的2020</a></p><p>2021，我们在持续努力，为社区提供更多实用又好用的组件，将内部优秀实践开放出来，让更多的开发者/企业/用户受益。</p><h3 id="_2-1-新增组件" tabindex="-1">2.1 新增组件 <a class="header-anchor" href="#_2-1-新增组件" aria-label="Permalink to &quot;2.1 新增组件&quot;">​</a></h3><p>2021上半年一共发布9个大版本，为DevUI添加了7个新成员，它们是：</p><table><thead><tr><th>组件名</th><th>中文名</th><th>发布版本</th></tr></thead><tbody><tr><td><a href="https://devui.design/components/zh-cn/datepickerPro" target="_blank" rel="noreferrer">DatePickerPro</a></td><td>📅新版日期选择器</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/11.4.0" target="_blank" rel="noreferrer">11.4.0</a></td></tr><tr><td><a href="https://devui.design/components/zh-cn/mention" target="_blank" rel="noreferrer">Mention</a></td><td>⏰提及组件</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/11.2.0" target="_blank" rel="noreferrer">11.2.0</a></td></tr><tr><td><a href="https://devui.design/components/zh-cn/category-search" target="_blank" rel="noreferrer">CategorySearch</a></td><td>🔍分类搜索</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/11.1.0" target="_blank" rel="noreferrer">11.1.0</a></td></tr><tr><td><a href="https://devui.design/components/zh-cn/nav-sprite" target="_blank" rel="noreferrer">NavSprite</a></td><td>🧚‍导航精灵</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/11.1.0" target="_blank" rel="noreferrer">11.1.0</a></td></tr><tr><td><a href="https://devui.design/components/zh-cn/read-tip" target="_blank" rel="noreferrer">ReadTip</a></td><td>💡阅读提示</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/11.0.0" target="_blank" rel="noreferrer">11.0.0</a></td></tr><tr><td><a href="https://devui.design/components/zh-cn/cascader" target="_blank" rel="noreferrer">Cascader</a></td><td>🔗级联菜单</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/10.2.0" target="_blank" rel="noreferrer">10.2.0</a></td></tr><tr><td><a href="https://devui.design/components/zh-cn/time-picker" target="_blank" rel="noreferrer">TimePicker</a></td><td>⌚️时间选择器</td><td><a href="https://github.com/DevCloudFE/ng-devui/releases/tag/10.2.0" target="_blank" rel="noreferrer">10.2.0</a></td></tr></tbody></table><p>详细的 Release Notes 参考：</p><p><a href="https://github.com/DevCloudFE/ng-devui/releases" target="_blank" rel="noreferrer">https://github.com/DevCloudFE/ng-devui/releases</a></p><h3 id="_2-2-github-star" tabindex="-1">2.2 Github Star <a class="header-anchor" href="#_2-2-github-star" aria-label="Permalink to &quot;2.2 Github Star&quot;">​</a></h3><p>对于一个开源项目来说，有人喜欢、有人使用是对作者最大的鼓励，也是开源作者持续做开源的最大动力。</p><p>Star 数是一个很好的评价开源项目受欢迎程度的指标。</p><p><a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">ng-devui</a>的star数从年初的570左右增长到年中的860左右，涨幅<code>50%</code>左右，其中</p><ul><li>4月底到5月初</li><li>6月初 有两个小的增长点，这两个增长点贡献了将近1/3的star数，这给了我们极大的信心！</li></ul><p><img src="'+n+'" alt="star.png"></p><p>数据来源： <a href="https://star-history.t9t.io/#devcloudfe/ng-devui" target="_blank" rel="noreferrer">https://star-history.t9t.io/#devcloudfe/ng-devui</a></p><p>我们对这两个增长点做了分析。</p><p>4月底，我们正式开源了<a href="https://devui.design/admin-page/home" target="_blank" rel="noreferrer">DevUI Admin 1.0</a>，为用户快速搭建中后台前端系统提供了一整套解决方案。</p><p><a href="https://juejin.cn/post/6956155033410863134" target="_blank" rel="noreferrer">号外号外！DevUI Admin V1.0 发布啦</a></p><p>6月初，我们发布了<a href="https://github.com/DevCloudFE/ng-devui/releases/tag/11.3.0" target="_blank" rel="noreferrer">DevUI 11.3.0</a>版本，并首次开放了DevUI动效。</p><p><a href="https://juejin.cn/post/6969590944681164808" target="_blank" rel="noreferrer">DevUI 11.3.0 发布：首次开放 DevUI 动效 2021.6.3</a></p><blockquote><p>持续做，做精品，不负开发者的期待！</p></blockquote><p>将是 DevUI 2021年开源的主旋律。</p><h3 id="_2-3-npm下载" tabindex="-1">2.3 npm下载 <a class="header-anchor" href="#_2-3-npm下载" aria-label="Permalink to &quot;2.3 npm下载&quot;">​</a></h3><p>star数只是代表开发者是否喜欢这个开源项目，代表的只是一种潜力，喜欢不一定会用，因为可能暂时没有使用场景。</p><p>而npm下载量则说明用户可能有使用场景，打算用用看。</p><p>npm平均周下载量同比2020年下半年涨幅大概<code>25%</code>左右，有一定的增长，不过和业界优秀的<a href="https://juejin.cn/post/6952881796442750984" target="_blank" rel="noreferrer">NG组件库</a>相比还是有很大的差距，还需要继续努力💪</p><p><img src="'+d+'" alt="npm.png"></p><p>数据来源：<a href="https://npm-stat.com/charts.html?package=ng-devui&amp;from=2020-07-01&amp;2021-06-30" target="_blank" rel="noreferrer">https://npm-stat.com/charts.html?package=ng-devui&amp;from=2020-07-01&amp;2021-06-30</a></p><h3 id="_2-4-devui官网uv" tabindex="-1">2.4 DevUI官网UV <a class="header-anchor" href="#_2-4-devui官网uv" aria-label="Permalink to &quot;2.4 DevUI官网UV&quot;">​</a></h3><p>npm下载量只是代表用户打算尝试使用，有可能安装完发现满足不了诉求就不用了，而频繁访问DevUI官网的用户才是实实在在在使用DevUI组件库。</p><p>我们统计了这半年来官网的月活数据，月UV/PV都翻倍了，UV从1月份的3000+增长到6月份的将近<code>8000</code>，而PV则突破了<code>10万</code>大关👏🎉🥳</p><blockquote><p>受用户喜爱、被开发者使用、有用户反馈，DevUI才能做的更好！欢迎大家关注和使用DevUI！</p></blockquote><p><img src="'+h+'" alt="服务流量UV.PNG"></p><h2 id="_3-殊途同归" tabindex="-1">3 殊途同归 <a class="header-anchor" href="#_3-殊途同归" aria-label="Permalink to &quot;3 殊途同归&quot;">​</a></h2><p>人生就像一场旅行，每个人的起点都不一样，走过的道路也不一样，但这一场都有一个共同的主旋律，就是成长和收获。</p><ul><li>我们为这次旅行准备了什么？</li><li>经历这一路的风景，我收获了什么？</li><li>每到达一个目的地，我是否都在成长？</li></ul><p>工作是让自己成长的绝佳场所，我们在工作中不仅需要不断学习、精进技能，为公司贡献自己的力量，更需要学会沟通和协作，磨练自己的心性。</p><blockquote><p>拼命工作是磨炼心性的最佳方法。—— 稻盛和夫</p></blockquote><h2 id="_4-未来展望" tabindex="-1">4 未来展望 <a class="header-anchor" href="#_4-未来展望" aria-label="Permalink to &quot;4 未来展望&quot;">​</a></h2><p>DevUI 在未来主要聚焦在以下方向：</p><ul><li>持续优化组件和官网体验，不仅让最终的用户用得舒服，也让开发者用得舒服</li><li>根据用户反馈丰富组件库，满足更多开发者的业务场景</li><li>开源文本编辑场景组件（如：富文本、Markdown等）</li><li>持续打磨 <a href="https://devui.design/admin-page/home" target="_blank" rel="noreferrer">DevUI Admin</a> 项目（DevUI Admin 2.0版本即将发布，尽情期待！）</li><li>孵化 <a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">Vue DevUI</a> 项目（目前已完成7个组件，并发布到npm仓库，欢迎大家一起建设Vue DevUI）</li></ul><p>欢迎您一起参与DevUI的开源，我们任何形式的贡献！</p><p>封面图来自纪录片：</p><p><a href="https://www.bilibili.com/video/BV1DV41127yv" target="_blank" rel="noreferrer">Stephen Axford：一开始我不太确定那是蘑菇，还以为是地上的一张蓝色糖纸。它真的好蓝好蓝啊！</a></p>',103);function c(m,b,g,_,f,v){const e=r("EditInfo");return a(),l("div",null,[u,i(e,{time:"2021年07月17日 12:48",title:"阅读 2393 ·点赞 27 · 评论 17 · 收藏 6"})])}const D=t(s,[["render",c]]);export{q as __pageData,D as default};
