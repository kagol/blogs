import{_ as r,B as a,o as t,c as o,G as l,Q as i}from"./chunks/framework.1fee3549.js";const p="/blogs/assets/summary-2021-1.png",n="/blogs/assets/summary-2021-2.png",c="/blogs/assets/summary-2021-3.png",s="/blogs/assets/summary-2021-4.png",d="/blogs/assets/summary-2021-5.png",u="/blogs/assets/summary-2021-6.png",h="/blogs/assets/summary-2021-7.png",g="/blogs/assets/summary-2021-8.png",q=JSON.parse('{"title":"2021年终总结：建设一个温暖的开源社区","description":"","frontmatter":{},"headers":[],"relativePath":"open-source/2021/summary-2021.md","filePath":"open-source/2021/summary-2021.md"}'),f={name:"open-source/2021/summary-2021.md"},b=i('<h1 id="_2021年终总结-建设一个温暖的开源社区" tabindex="-1">2021年终总结：建设一个温暖的开源社区 <a class="header-anchor" href="#_2021年终总结-建设一个温暖的开源社区" aria-label="Permalink to &quot;2021年终总结：建设一个温暖的开源社区&quot;">​</a></h1><p><img src="'+p+'" alt="image"></p><p>以前，我理解的开源就是一群不同地域的开发者给开源项目提PR，然后项目的管理员检视并合入PR，然后再没有其他的。那时我并不理解：为什么一群互不相识的网友，会主动利用自己宝贵的业余时间，去给一个不认识的网友做的开源项目贡献代码？</p><p>直到我自己做了<a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">Vue DevUI</a>开源项目，我才对开源有了更多的认识。</p><h2 id="_1-星星之火" tabindex="-1">1 星星之火 <a class="header-anchor" href="#_1-星星之火" aria-label="Permalink to &quot;1 星星之火&quot;">​</a></h2><p>我叫<code>Kagol</code>，是公司的一名普通开发，在公司有自己的工作要忙，同时我也在负责<a href="https://devui.design/" target="_blank" rel="noreferrer">DevUI</a>组件库的开源运营。</p><p>在做这件事之前，我也不知道自己对开源有如此大的热情。</p><p><a href="https://juejin.cn/post/7029092585452863525" target="_blank" rel="noreferrer">DevUI开源的故事</a>里面提到，DevUI组件库2019年6月就已经在<a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">Github</a>开源，当时大家都没做过开源，想着好酒不怕巷子深（毕竟是经过华为云众多商用业务捶打过的组件库，还获得到德国红点设计奖），怎么着也会有人喜欢吧。</p><p>结果就像<a href="https://juejin.cn/post/7029092585452863525" target="_blank" rel="noreferrer">DevUI开源的故事</a>里提到的：</p><blockquote><p>2019年6月在Github开源之后，<a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">Ng DevUI</a>在半年之内都没有太大的动静，虽然我们每个月都从不停止发布新版本，但是关注我们的开发者一直不多，star数也半年之内始终没有突破100，其中有很大一部分还是DevUI团队成员自己点的。</p></blockquote><p>不过我们并没有灰心和放弃，可能是我比较热爱分享和写作，2020年3月，领导想让我牵头在掘金开个<code>DevUI团队</code>的技术专栏，好好宣传下DevUI开源。</p><blockquote><p>我们不希望通过打广告以及其他任何功利性的方式运营DevUI，这不是我们开源的初衷，我们希望能触达开发者，让他们主动认识、了解进而使用、熟悉DevUI。<br> 所以掘金运营的初期，我们从不发软文，全部都是技术干货，这些文章是DevUI团队所有成员集体的智慧结晶和工作经验，后续我们依然会不断地输出DevUI团队的实践和干货内容。</p></blockquote><p>对这段经历感兴趣的掘友，可以看下我去年写的总结：</p><p><a href="https://juejin.cn/post/6904264934515802126" target="_blank" rel="noreferrer">🏆 DevUI × 掘金 | 技术人的2020</a></p><p>从2020年2月26日发布<a href="https://juejin.cn/post/6844904073620094990" target="_blank" rel="noreferrer">第一篇技术文章</a>以来，我对开源的热情就如烈火燎原之势迅速蔓延开来，截止到目前为止，已经发布了93篇文章。</p><p><img src="'+n+'" alt="图片.png"></p><p>2020年是DevUI开源的元年，因为从这一年开始，社区开发者开始关注到DevUI，在掘金技术圈儿的群里也有人主动聊到DevUI，一些公众号也在转载我们的文章，我们的star数也翻了10倍。</p><p>这一年我对开源的认识也发生了一些变化，我慢慢感受到社区巨大的能量，以及社区开发者对开源的巨大热情，我也有一股巨大的冲动，想要投入到开源生态中来，加入这群积极活跃、对技术对生活充满热情的开发者圈子。</p><h2 id="_2-拥抱开源" tabindex="-1">2 拥抱开源 <a class="header-anchor" href="#_2-拥抱开源" aria-label="Permalink to &quot;2 拥抱开源&quot;">​</a></h2><p>2020年底开始，在<a href="https://github.com/devcloudfe/ng-devui" target="_blank" rel="noreferrer">Ng DevUI</a>开源组件库之外，我又做了好几个开源项目。</p><blockquote><p>2020年11月3日，我做了一个<a href="https://github.com/kagol/calendar-graph" target="_blank" rel="noreferrer">Calendar Graph</a>项目，可以快速生成一个Github提交图，支持组件方式使用，支持自定义日期区间、显示文本、提交次数，，并提供了灵活的主题定制方式以及提交日程打印等实用功能。这个开源项目持续维护了2个半月，本来还想继续丰富，支持可视化操作，不过这个项目似乎并不是一个通用场景，没人用也没有人参与，无奈只能放弃，一共收获了6颗Star🌟。</p></blockquote><blockquote><p>在做Calendar Graph项目时，我发现经常需要处理和转换颜色、以及处理数组，这些是通用方法，但我又不想引入Lodash这些比较重的三方依赖库，所以又创建了一个<a href="https://github.com/kagol/ktools" target="_blank" rel="noreferrer">KTools</a>的工具库。这个库是从Calendar Graph项目孵化🐣出来的，Calendar Graph项目的停滞会导致KTools也暂时没有业务场景，不过这个库其实是可以做成一个通用工具库的，也欢迎大家多提供些场景或者积极参与进来，打造一个轻量的却非常实用的工具库。KTools目前一共收获了7个Star🌟。</p></blockquote><blockquote><p>2020年11月底，一位朋友找到我，说想做一个功能，能够一键将Excel中的英文翻译成中文，这个Excel中的数据量可能达到10万级别。之前由于数据量小，他都是自己手动一条一条复制出来，手动用翻译软件翻译的，随着数据量的增长，手动翻译会非常低效，所以希望我能帮帮忙。于是我又做了一个<a href="https://github.com/kagol/excel-translate" target="_blank" rel="noreferrer">Excel Translate</a>的开源项目，这是一个Nodejs项目，会读取一个Excel文件，将单元格中的英文提取出来，调用Google Translate API将其翻译成中文，然后生成一个和英文Excel格式一样的中文Excel文档。这个由于也是特定场景的项目，并没有持续维护，目前一共收获了4颗Star🌟。</p></blockquote><p>这些开源项目虽然都没有火起来，不过也在我心中埋下了一颗开源的种子，也让我认识到要做一个受欢迎的成功的开源开源项目：</p><ol><li>开源项目需要有使用场景和实际的用户，这是非常关键的，没有人用，这个项目就没有价值，没有价值，也就不会有人一起来参与贡献，自己也没有持续的动力维护下去。所以做开源项目，价值和用户是第一位的。</li><li>其次就是技术栈，如果你想做一个受欢迎的开源项目，让社区的开发者都参与进来一起贡献，你就需要选择受大家喜爱的技术栈，比如前端项目，如果你选择用jQuery，我想是没有什么人愿意参与进来的。</li><li>还有就是持续的活跃度，像vue3/vite这些开源项目，几乎每天都在更新，如果一个开源项目半年一年甚至更久都不更新，那肯定不会有人愿意使用和参与贡献的。</li></ol><p>我对开源项目的理解也是逐步提升的，如果大家有别的想法💡，欢迎在评论区讨论。</p><h2 id="_3-vue-devui" tabindex="-1">3 Vue DevUI <a class="header-anchor" href="#_3-vue-devui" aria-label="Permalink to &quot;3 Vue DevUI&quot;">​</a></h2><p>2021年1月9日，我又创建了一个<a href="https://gitee.com/devui/vue-devui" target="_blank" rel="noreferrer">Vue DevUI</a>的开源项目，这是一个基于<a href="https://devui.design/design-cn/start" target="_blank" rel="noreferrer">DevUI Design</a>设计体系的 Vue3组件库，使用最新的<code>Vite</code> + <code>Vue3</code> + <code>TypeScript</code> + <code>JSX</code>搭建，包含60多个简洁、易用、灵活的组件。</p><p>这个开源项目运营得比较成功，因此想给大家分享下<code>Vue DevUI</code>开源项目从0到1的整个发展历程。</p><h3 id="_3-1-初创" tabindex="-1">3.1 初创 <a class="header-anchor" href="#_3-1-初创" aria-label="Permalink to &quot;3.1 初创&quot;">​</a></h3><p>我先是使用<code>Vite</code>创建了一个基础工程，然后照着<a href="https://devui.design" target="_blank" rel="noreferrer">DevUI</a>官网把初步的文档系统搭建起来，增加了<code>CommitLint</code>规范了基本的Git提交信息，在<code>DevUI官方交流群</code>里发了一个内部招募：</p><blockquote><p>基本的组件库开发流程和组件文档系统完成，希望大家能一起参与进来开发一个基于Vue3版本的DevUI组件库，使用最新的<code>Vite</code>+<code>Vue3</code>+<code>TypeScript</code>技术栈。</p></blockquote><p>很快就有小伙伴响应，我们的老朋友<code>Zcating</code>同学在2021年2月22日提交了第一个<code>TSX</code>方式编写的<code>Button</code>组件，这也是<code>Vue DevUI</code>组件库的第一个组件。</p><p>第二天<code>to0simple</code>同学也加入贡献者队伍，将<code>shims.d.ts</code>文件移除，由于<code>Vue DevUI</code>组件库的所有组件都是使用TSX的方式编写，所以为<code>.vue</code>文件准备的<code>shims.d.ts</code>类型声明文件也就没必要了。</p><p>当时Vue DevUI的文档系统还是仿照Ng DevUI组件库手写的，有很多不完善的地方，后续<code>to0simple</code>同学完善了用来展示和高亮组件demo代码的<code>CodeBox</code>和<code>Highlight</code>两个组件。</p><p>3月6日，<code>flxy1028</code>同学加入进来，并添加了<code>Tabs</code>组件。</p><p>从3月10日开始，<code>to0simple</code>同学在不到一周时间内贡献了<code>Panel</code>/<code>Alert</code>/<code>Avatar</code>三个组件。</p><p>本来Vue DevUI其实已经看到了希望的曙光，不过由于我当时刚接了ProjectMan业务的担子（这段经历在<a href="https://juejin.cn/post/6985751821369212935" target="_blank" rel="noreferrer">烧不死的鸟🐦是凤凰｜2021年中总结</a>中有做总结，感兴趣的话可以去看看），没有时间维护开源项目，可能大家没方向没信心，慢慢地就没人继续贡献了。</p><h3 id="_3-2-重启" tabindex="-1">3.2 重启 <a class="header-anchor" href="#_3-2-重启" aria-label="Permalink to &quot;3.2 重启&quot;">​</a></h3><p>直到2021年5月份，我开始稍微能从ProjectMan业务里喘口气，决定重启Vue DevUI项目。</p><p>于是在劳动节假期第一天，正式在掘金社区给Vue DevUI开源组件库招募贡献者：</p><p><a href="https://juejin.cn/post/6956988395016945701" target="_blank" rel="noreferrer">让我们一起建设 Vue DevUI 项目吧！🥳</a></p><p>其实当时我是非常没有底的，内部招募都只招募到3位贡献者，外部开发者又不了解DevUI，又不认识你Kagol，为什么要参与贡献呢？</p><p>不出预料，招募文章发完，并没有什么人响应。</p><p>直到2021年6月，终于有一位社区的小伙伴开始强势贡献，先是完善了单元测试环境和<code>eslint</code>/<code>stylelint</code>/<code>ls-lint</code>代码规范，然后几乎每周贡献一个新的组件，从6月27日贡献Radio单选框组件开始，到7月24日贡献Input输入框组件，一共贡献了5个组件。</p><p>这给了我巨大的信心！</p><p>而这时我刚好也从ProjectMan业务抽身出来，我想是时候重振Vue DevUI项目啦！</p><p>于是在2021年8月3日，我在掘金同步了Vue DevUI的最新进展：</p><p><a href="https://juejin.cn/post/6992233443585163300" target="_blank" rel="noreferrer">Vue DevUI 已经有10个组件成员啦～🥳😋</a></p><h3 id="_3-3-迅速成长" tabindex="-1">3.3 迅速成长 <a class="header-anchor" href="#_3-3-迅速成长" aria-label="Permalink to &quot;3.3 迅速成长&quot;">​</a></h3><p>这篇文章的效果大大出乎我的预料，文章刚发完就有大量小伙伴加小助手的微信，以至于小助手的微信都加不上人，提示：</p><p><img src="'+c+'" alt="image.png"></p><p>文章发完的第二天就有新的PR提交，就是现在DevUI开源组织的PMC成员<code>Lucky</code>，Lucky同学现在依然Vue DevUI最积极活跃的贡献者。</p><ul><li><code>3天之内</code>就有超过<code>100+</code>社区的小伙伴通过添加小助手微信联系到我们，并加入到我们的核心开发群</li><li><code>5天之内</code>所有<code>61</code>个组件田都被认领完，共有<code>40+</code>小伙伴成为<code>Vue DevUI</code>组件库田主</li><li><code>10天之内</code>大家就给<code>Vue DevUI</code>新添了<code>11</code>名新组件成员</li></ul><p>到目前为止，<code>Vue DevUI</code>已经有<code>77</code>位贡献者，<code>61</code>个组件，经过了<code>359</code>个PR、<code>1598</code>次提交。</p><h3 id="_3-4-只是开始" tabindex="-1">3.4 只是开始 <a class="header-anchor" href="#_3-4-只是开始" aria-label="Permalink to &quot;3.4 只是开始&quot;">​</a></h3><p>Vue DevUI近期也在筹划发布1.0版本，相信很快（当然是在确保质量的前提下）就能与大家见面，尽情期待！</p><p>Vue DevUI并不是DevUI团队做开源的结束，而只是一个开始，后续我们也会不断完善DevUI的开源生态，这会是一个漫长的过程，但我们不会放弃。</p><p>欢迎大家一起参与到DevUI的开源生态建设中！（添加小助手微信：<code>devui-official</code>）</p><p><img src="'+s+'" alt="开源时间轴.png"></p><h2 id="_4-开源感悟" tabindex="-1">4 开源感悟 <a class="header-anchor" href="#_4-开源感悟" aria-label="Permalink to &quot;4 开源感悟&quot;">​</a></h2><p>由于有大量社区的小伙伴参与到<code>Vue DevUI</code>开源组件库的建设中来，我也有机会与优秀的开发者们有更多的沟通，这也加深了我对开源的理解。</p><h3 id="_4-1-什么是开源贡献" tabindex="-1">4.1 什么是开源贡献 <a class="header-anchor" href="#_4-1-什么是开源贡献" aria-label="Permalink to &quot;4.1 什么是开源贡献&quot;">​</a></h3><p>首先是对开源贡献有了更深的理解。</p><p>以前我认为开源贡献就是给开源项目提PR、编写代码。</p><p>其实这不完全正确。</p><p>一个开源项目和一个普通的公司项目并没有太多的不同，都是为了用户提供某种价值，可能是解决用户的痛点问题、也可能是提升用户做某些事情的效率。</p><p>一个开源项目可能包含很多组成部分，初始可能只有一个基础的框架，比如<code>Vue DevUI</code>项目就包含：</p><ol><li>一个基于vite的基础工程，这个基础框架工程会集成vue3+TypeScript+JSX+单元测试+各种Lint工具</li><li>从这个基础框架出发，包含一个组件库，这是对外提供的最核心的部分</li><li>一个用于演示组件库功能的文档系统</li><li>一个<code>CLI</code>工具，用来做一些自动化的事情，比如自动生成组件模板、构建组件库产物等</li></ol><p>从以上组成部分可以看出，贡献可能包括：</p><ol><li>编写一个新组件，成为这个组件的田主</li><li>每个组件需要配套的中英文文档</li><li>保障组件质量的单元测试</li><li>工程化配套工具的完善（需要深度参与进来才能识别到我们需要什么工具，从而不断完善）</li><li>组件会出bug，文档会出bug，修复这些缺陷也是一种贡献</li><li>再继续推演，发现组件或文档的bug，顺手提个issue，也是一种贡献</li><li>组件的第一个版本不一定是最完美的，它的api、它的源码可能需要完善和重构，对组件的优化也是一种贡献</li><li>当有社区开发者给开源项目提了一个issue，没有选择一个标签，你发现了，顺手给issue加了个标签，这样其他刚加入这个开源项目的开发者看到标签，能一眼就知道这个issue，自己是否感兴趣，有没有能力解决</li><li>如果有人提了一个pr，看到pr的标题，你觉得他做的这个功能你很感兴趣，想了解下别人是怎么实现的，这时就可以去检视代码（检视代码的过程你可以理解成一个与pr作者交流的机会，如果你理解了他的代码，觉得写的很妙，可以在评论里给他写一句鼓励的话；如果你觉得写的不好，可以友善地评论一句可以优化的地方，pr作者一定会感谢你的友善行为，并给你一个友善的回馈；如果你没看懂他写的代码，你也可以积极地询问不理解的地方，与pr作者进行友善的探讨，在这个互动和讨论的过程中，相信你一定能有所收获），检视代码也是一种贡献，也许一行代码也没写</li><li>随着开源项目的不断演进，会有更多的小伙伴加入进来，刚进来的小伙伴对这个社区是很陌生的，比如vue devui有一个微信群，新成员加入都会加入到群里，这时你给新成员打个招呼，欢迎下新加入的小伙伴，我觉得这也是对开源项目的一种贡献，因为你在无形之中让这个社区变得更温暖</li><li>继续推演，开源社区里面每个成员的背景、经验、能力都不一样，刚加入的小伙伴可能会有很多疑问，并在群里求助，你发现他提出的问题，你正好知道，并给出了自己的思路，让提问者豁然开朗，更快地找到问题的答案，并有所收获，这也是一种贡献</li><li>由于经常遇到相同的问题，你识别到了，将这些共性的问题整理成文档，放到开源项目的wiki里，后来者看到了能快速开始，这也是一种贡献</li><li>如果继续推演，我想也许会有更多形式的贡献，每一个让社区和开源项目变得更好的行为、语言、文字等都是一种贡献</li></ol><p>而你与开源社区的每一次互动，都会让你对社区有更深入的了解，进而也让自己有所成长，也许只是一句友善的话、或者一个中肯的建议，都能让我们觉得温暖，我想这也许是开源项目与公司项目的不同。</p><h3 id="_4-2-贡献者" tabindex="-1">4.2 贡献者 <a class="header-anchor" href="#_4-2-贡献者" aria-label="Permalink to &quot;4.2 贡献者&quot;">​</a></h3><p>其次就是对贡献者的理解。</p><p>以前我觉得一定要大牛才能参与开源贡献，成为开源贡献者，其实并不是的，恰恰相反，正是无数普普通通的开发者们一起参与开源，才让整个开源生态不断地繁荣壮大。</p><p>我跟<code>DevUI</code>的很多田主都有过沟通，他们：</p><ol><li>有些是学校的学生，想通过参与开源项目积累一些实战经验，为以后找工作做准备</li><li>有些是自己在搭建公司的组件库，想通过深度参与开源组件库，汲取一些灵感</li><li>还有些是第一次接触开源，想尝试下开源贡献是什么感觉</li><li>也有些是正在找工作的朋友，他们想通过参与开源项目给自己的简历增加一些亮点</li><li>有些观看了我和村长的B站直播，有点跃跃欲试，想尝试一把开源的滋味</li><li>有些是朋友同事推荐过来的：“XD，DevUI这个开源项目不错，要不要一起来试试？”</li><li>也有些是想学习最新的<code>Vue3</code>+<code>Vite</code>+<code>TypeScript</code>技术，觉得光学习太枯燥，想通过一个开源项目来实战一把</li><li>...</li></ol><p>尽管每一位田主参与Vue DevUI开源项目的初衷可能都不一样，但有一样是相同的，就是参与开源的田主都是非常热爱开源、热爱分享、热爱技术、热爱生活的一群人。</p><p>通过与他们沟通，检视他们的代码，我能清楚得感受到这一点。</p><p>这也让我自己的心态有了一些转变，以前觉得做开源就是发布一个开源项目到Github或Gitee，就不管了，隔三差五地想到就去仓库看下有没有Issue/PR，有人来贡献就检视和合入下代码。</p><p>随着参与Vue DevUI的贡献者越来越多，我慢慢油然而生了一种责任感和使命感：</p><blockquote><p>大家都这样努力地参与贡献，不管是开发组件、完善文档、补充单元测试，还是提交Issue、提供使用上的反馈意见，我不能辜负大家的努力和热情，一定要把这个组件库做好，不一定是业界第一，但一定是通过我自己这一关的。</p></blockquote><p>而且我会去想办法让整个社区运作和管理更加高效，避免田主之间的重复工作，并且不断地去完善规范文档、Wiki文档，让新加入的成员能够快速融入DevUI，早期只要有新成员入群，我都会让小助手欢迎下大家。</p><p>每一个issue我都会认真阅读，仔细给issue打tag，有些简单的就标记下<code>good-first-issue</code>，这样新来的人就知道这个任务不会太难，是我可以认领的任务，有些确定要做的我会打上<code>welcome-contribution</code>的tag，还不确定的会打上<code>need-more-info</code>等等。</p><p>每一个PR我都会收到微信公众号的提醒，我一般看到都会第一时间处理，几乎每一行代码都会认真检视：</p><ol><li>对于写得好的，我会评论一句鼓励的话</li><li>还有优化空间的，我也会友善地评论，哪里写得不好，可能有哪些改进的方向</li><li>有些我看不懂的地方，或者担心理解错误的地方，我也会像PR的作者咨询和确认</li></ol><blockquote><p>我把每一次代码检视都当成与田主们交流的机会，很多时间我觉得这是一种双赢的事情，你在帮助别人的同时，往往自己也能学到很多，至少我是这样的。</p></blockquote><p>所以也欢迎大家一起参与代码检视，你一定会有收获的！</p><h3 id="_4-3-开源社区" tabindex="-1">4.3 开源社区 <a class="header-anchor" href="#_4-3-开源社区" aria-label="Permalink to &quot;4.3 开源社区&quot;">​</a></h3><p>我觉得开源项目和公司项目最大的不同就是：开源项目是在一个看不见的社区中演进的。</p><p>公司项目大家都在同一个公司，团队里每个人都有自己的工位，同事之间随时可以面对面沟通，对彼此也非常熟悉。</p><p>但开源项目不一样，参与开源项目的贡献者可能在地理位置上分布非常广，而且极具多样性。</p><p>以前我没有意识到这一点，我觉得参与开源项目的人之间互不相识，因此是没有沟通的，大家在一个仓库里提交代码，提交完管理员一合入就完事了。</p><p>在做<code>Vue DevUI</code>的过程中，我逐步感受到社区的存在。</p><blockquote><p>大家参与开源项目更像是一起在给一个果园的果树浇水，参与了这个开源项目的人都是属于这个果园的。不同之处在于有些田主负责这一片果树，另一些田主负责那一片果树，有时我没时间，你可能会给我的果树浇浇水，我同样也会帮助你，这样大家一起维护一片果园。果树结了果实，大家也是一起收获和分享的。</p></blockquote><p>新加入的成员，一开始对社区是陌生的，他其实需要一种归属感，比如他不知道如何开始贡献，如果有早就加入的小伙伴告诉指导他怎么做，或者告诉他应该看什么文档，这时他就会感觉和这个社区产生了联系，从而形成一种归属感，觉得我是属于这个社区的。</p><p>就像我们来到一家新公司、进入一个新学校，如果有一个导师或学长给你介绍公司或学校的情况，我想你一定会很开心，如果没有一个人和你说话和交流，你一定会觉得没有归属感，觉得自己不属于这里。</p><p>所以一有新成员入群，或者有小伙伴第一次提PR，我都会欢迎他、给他点个赞鼓励下，让他感觉这个社区是有温度的社区，我也鼓励其他田主也这么做，让新人感觉到是受欢迎的，这样整个生态才会更加繁荣和壮大。</p><h2 id="_5-ng-devui-1000-star" tabindex="-1">5 Ng DevUI 1000 Star <a class="header-anchor" href="#_5-ng-devui-1000-star" aria-label="Permalink to &quot;5 Ng DevUI 1000 Star&quot;">​</a></h2><p><a href="https://github.com/DevCloudFE/ng-devui" target="_blank" rel="noreferrer">Ng DevUI</a>在2019年6月份就在Github开源了，经过1年多的时间，终于在2021年8月30日达到了<code>1000 Star</code>，非常不容易！</p><p><a href="https://juejin.cn/post/7002222940448260133" target="_blank" rel="noreferrer">喜大普奔！DevUI 1000 star 啦！</a></p><p>我们当时还专门定制了一个蛋糕用来庆祝和纪念这个里程碑时刻。</p><p><img src="'+d+'" alt="image.png"></p><p>社区的小伙伴给我们提了很多非常宝贵的建议和PR，这里尤其感谢<code>xiejay</code>同学，他给我们Ng DevUI开源组件库提了很多建设性的意见和PR，因此也被大家推荐成为DevUI开源组织的PMC成员。</p><p><code>xiejay</code>同学也是我们的<a href="https://github.com/xiejay97/react-devui" target="_blank" rel="noreferrer">React DevUI</a>项目的发起人，目前<a href="https://react-devui.com/" target="_blank" rel="noreferrer">React DevUI</a>已经有10+个组件啦！欢迎大家一起参与共建！</p><h2 id="_6-ng-devui-admin-2-0" tabindex="-1">6 Ng DevUI Admin 2.0 <a class="header-anchor" href="#_6-ng-devui-admin-2-0" aria-label="Permalink to &quot;6 Ng DevUI Admin 2.0&quot;">​</a></h2><p><a href="https://github.com/DevCloudFE/ng-devui-admin" target="_blank" rel="noreferrer">Ng DevUI Admin</a>也是应社区需求诞生的一个开源项目，2019年就有社区的小伙伴提出能不能出一个Admin方便快速搭建后台系统，经过半年多的内部孵化，终于在2021年4月28日与大家见面，发布了1.0版本。</p><p><a href="https://juejin.cn/post/6956155033410863134" target="_blank" rel="noreferrer">号外号外！DevUI Admin V1.0 发布啦！</a></p><p>这个项目也是我们的重点项目，1.0发布不到半年时间，我们又发布了DevUI Admin 2.0，将<code>区块</code>从<code>Admin</code>中抽离了出来，并且推出了一套对应的<code>Angular CLI</code>去帮助开发者使用我们的区块，可以更快更方便地搭建一个基于<a href="https://devui.design/admin-page/home" target="_blank" rel="noreferrer">DevUI Admin</a>的后台管理系统。</p><p><a href="https://juejin.cn/post/6996923383355015205" target="_blank" rel="noreferrer">DevUI Admin 2.0 重磅发布！🥳</a></p><p>欢迎大家使用<a href="https://devui.design/admin-page/home" target="_blank" rel="noreferrer">DevUI Admin</a>，并给我们反馈，我们也会持续完善的！</p><h2 id="_7-devui田主的开源故事" tabindex="-1">7 DevUI田主的开源故事 <a class="header-anchor" href="#_7-devui田主的开源故事" aria-label="Permalink to &quot;7 DevUI田主的开源故事&quot;">​</a></h2><p><a href="https://gitee.com/TinsFox" target="_blank" rel="noreferrer">TinsFox</a>：开源贵在坚持、贵在追求完美。</p><ul><li><a href="https://juejin.cn/post/7033195730277761054" target="_blank" rel="noreferrer">聊聊开源的那些事</a></li></ul><p><a href="https://juejin.cn/user/4441682708019591" target="_blank" rel="noreferrer">duqingyu</a>：与其插肩而过，不如拥抱开源。</p><ul><li><a href="https://juejin.cn/post/7031495257946587149" target="_blank" rel="noreferrer">我与开源不再擦肩而过！【DevUI】</a></li></ul><p><a href="https://gitee.com/JsHai" target="_blank" rel="noreferrer">CatsAndMice</a>：让开源成为一种习惯，让提issue &amp; PR成为一种习惯。</p><ul><li><a href="https://juejin.cn/post/7031054513632968734" target="_blank" rel="noreferrer">开源初衷</a></li></ul><p><a href="https://gitee.com/httpxiaobocom" target="_blank" rel="noreferrer">Bob</a>：不是等你有能力再去做事，而是在做事中获得能力。</p><ul><li><a href="https://juejin.cn/post/7030414733295484935" target="_blank" rel="noreferrer">我与DevUI的开源故事</a></li></ul><p><a href="https://gitee.com/AlanLee97" target="_blank" rel="noreferrer">AlanLee</a>：努力提升自己，比仰望别人更有意义。</p><ul><li><a href="https://juejin.cn/post/7030089845917614117" target="_blank" rel="noreferrer">参与Vue DevUI开源项目的小故事</a></li></ul><p><a href="https://gitee.com/laiweilun" target="_blank" rel="noreferrer">Wailen</a>：伸手摘星，即使一无所获，也不至于满手污泥。</p><ul><li><a href="https://juejin.cn/post/7029854750858280974" target="_blank" rel="noreferrer">参与华为Devui开源组件库的感受</a></li></ul><p><a href="https://gitee.com/micd" target="_blank" rel="noreferrer">MICD</a>：很多时候不是因为你看到希望了才要努力，而是你努力了才会有相应的回报。</p><ul><li><a href="https://juejin.cn/post/7028879902048780295" target="_blank" rel="noreferrer">我与vue-Devui开源组件库的故事 </a></li></ul><p><a href="https://gitee.com/ivestszheng" target="_blank" rel="noreferrer">无声</a></p><ul><li><a href="https://juejin.cn/post/7020981377638072356" target="_blank" rel="noreferrer">记录我的第一个开源组件</a></li></ul><p><a href="https://gitee.com/RootWater" target="_blank" rel="noreferrer">iel</a></p><ul><li><a href="https://juejin.cn/post/7021870182855344142" target="_blank" rel="noreferrer">手把手带你开发一个脚手架（上）</a></li><li><a href="https://juejin.cn/post/6995181489960779806" target="_blank" rel="noreferrer">我为 Devui 开发的脚手架</a></li></ul><p><a href="https://gitee.com/mrundef" target="_blank" rel="noreferrer">JS老狗</a></p><ul><li><a href="https://juejin.cn/column/7000670606760869918" target="_blank" rel="noreferrer">我与DevUI专栏</a></li><li><a href="https://juejin.cn/post/6999260884631552037" target="_blank" rel="noreferrer">DevUI中VUE的TSX函数式组件实践</a></li><li><a href="https://juejin.cn/post/7000688749017317407" target="_blank" rel="noreferrer">再聊Vue的TSX函数式组件</a></li></ul><p><a href="https://space.bilibili.com/480140591" target="_blank" rel="noreferrer">村长</a></p><ul><li><a href="https://juejin.cn/post/7020678344219820068" target="_blank" rel="noreferrer">跟村长老师做【Vue DevUI 开源指南】直播一个月的感受</a></li><li><a href="https://space.bilibili.com/480140591/channel/seriesdetail?sid=411659" target="_blank" rel="noreferrer">Vue DevUI开源指南系列直播</a></li></ul><h2 id="_8-b站直播" tabindex="-1">8 B站直播 <a class="header-anchor" href="#_8-b站直播" aria-label="Permalink to &quot;8 B站直播&quot;">​</a></h2><p>B站直播的经历在之前的文章中已经总结过了，不再赘述。</p><p><a href="https://juejin.cn/post/7020678344219820068" target="_blank" rel="noreferrer">跟村长老师做【Vue DevUI 开源指南】直播一个月的感受</a></p><h2 id="_9-回馈" tabindex="-1">9 回馈 <a class="header-anchor" href="#_9-回馈" aria-label="Permalink to &quot;9 回馈&quot;">​</a></h2><p>为了回馈田主们的辛勤努力，我们在2021年11月份策划了一次回馈活动，给DevUI的贡献者们制作了专属的DevUI优秀贡献者奖杯、DevUI定制抱枕和笔记本。</p><p>感兴趣可以阅读我们的<a href="https://juejin.cn/post/7029092585452863525#heading-17" target="_blank" rel="noreferrer">《DevUI开源故事》</a></p><p><img src="'+u+'" alt=""></p><p><img src="'+h+'" alt=""></p><p><img src="'+g+'" alt=""></p>',143);function v(_,m,k,D,I,U){const e=a("EditInfo");return t(),o("div",null,[b,l(e,{time:"2021年12月06日 22:29",title:"阅读 3815 · 点赞 46 · 评论 24 · 收藏 8"})])}const V=r(f,[["render",v]]);export{q as __pageData,V as default};
