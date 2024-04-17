import{_ as s,B as n,o as e,c as t,G as l,Q as p}from"./chunks/framework.1fee3549.js";const m=JSON.parse('{"title":"实现复杂状态机的一种思路","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2019/a-way-to-realize-complex-state-machine.md","filePath":"tech/2019/a-way-to-realize-complex-state-machine.md"}'),o={name:"tech/2019/a-way-to-realize-complex-state-machine.md"},c=p(`<h1 id="实现复杂状态机的一种思路" tabindex="-1">实现复杂状态机的一种思路 <a class="header-anchor" href="#实现复杂状态机的一种思路" aria-label="Permalink to &quot;实现复杂状态机的一种思路&quot;">​</a></h1><h2 id="一、问题" tabindex="-1">一、问题 <a class="header-anchor" href="#一、问题" aria-label="Permalink to &quot;一、问题&quot;">​</a></h2><p>近期做广告平台，涉及到广告状态转换的问题，将需求抽象之后，发现其实就是要实现一个复杂的广告状态机，状态图如下： <img src="https://img2018.cnblogs.com/blog/296720/201901/296720-20190116164650377-1585504866.png" alt="状态跃迁图"></p><p>广告一个有7种状态（如上图），其中”Not delivering”包含4种子状态。</p><p>10种状态（state），理论上最多可能有90种跃迁（transition），状态之间的转化极其复杂，如果只是用条件分支的方式来展示广告的状态，不够优雅。</p><h2 id="二、解决方案" tabindex="-1">二、解决方案 <a class="header-anchor" href="#二、解决方案" aria-label="Permalink to &quot;二、解决方案&quot;">​</a></h2><p>于是将整个状态转换逻辑进行抽象和简化，具体做法如下：</p><h3 id="_1-后台将广告状态进行拆分" tabindex="-1">1.后台将广告状态进行拆分 <a class="header-anchor" href="#_1-后台将广告状态进行拆分" aria-label="Permalink to &quot;1.后台将广告状态进行拆分&quot;">​</a></h3><p>将推广计划和广告的状态拆分成系统状态（system_status）和用户状态（configure_status），用户状态是广告主可以手动开启和关闭的，账户余额状态放在账户层级。 后台不做状态的联动，这意味着：后台所有状态的改变互不影响，例如推广计划被暂停了，广告并不会跟着暂停；账户余额不足，广告的系统状态也不会受到影响。</p><p>具体拆分逻辑见下表：</p><table><thead><tr><th></th><th>财务状态（fund_status）</th><th>系统状态（system_status）</th><th>用户配置状态（configured_status）</th></tr></thead><tbody><tr><td>账户层级</td><td>余额情况</td><td>--</td><td>--</td></tr><tr><td>推广计划层级</td><td>--</td><td>是否达到日限额</td><td>是否开启</td></tr><tr><td>广告层级</td><td>--</td><td>是否达到日限额 审核状态</td><td>是否开启</td></tr></tbody></table><h3 id="_2-前端设计广告状态流转的映射表" tabindex="-1">2.前端设计广告状态流转的映射表 <a class="header-anchor" href="#_2-前端设计广告状态流转的映射表" aria-label="Permalink to &quot;2.前端设计广告状态流转的映射表&quot;">​</a></h3><p>用状态映射表将前端展示状态和后台状态关联起来，这样如果增加新状态或状态转换逻辑改变，都只需要改状态映射表就好，修改成本非常低。</p><p>这样广告的前端展示状态由以下6个后台状态共同决定：</p><ul><li>(1)账户余额状态</li><li>(2)推广计划系统状态</li><li>(3)推广计划用户状态</li><li>(4)广告系统状态</li><li>(5)广告用户状态</li><li>(6)广告投放时间</li></ul><h2 id="三、具体实现" tabindex="-1">三、具体实现 <a class="header-anchor" href="#三、具体实现" aria-label="Permalink to &quot;三、具体实现&quot;">​</a></h2><h3 id="_1-状态映射表的设计" tabindex="-1">1.状态映射表的设计 <a class="header-anchor" href="#_1-状态映射表的设计" aria-label="Permalink to &quot;1.状态映射表的设计&quot;">​</a></h3><p>状态映射表就是一个JSON结构，其设计非常简单：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{//ad configure status</span></span>
<span class="line"><span style="color:#babed8;">    &quot;STATUS_SUSPEND&quot;: &#39;Paused&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    &quot;STATUS_NORMAL&quot;: {//ad system status</span></span>
<span class="line"><span style="color:#babed8;">        &quot;STATUS_PENDING&quot;: &#39;Pending for review&#39;,//待审核</span></span>
<span class="line"><span style="color:#babed8;">        &quot;STATUS_DENIED&quot;: &#39;Denied&#39;,//审核不通过</span></span>
<span class="line"><span style="color:#babed8;">        &quot;STATUS_DAILY_LIMIT&quot;: &#39;Not delivering,Reach ad limit&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        &quot;STATUS_NORMAL&quot;: {//date range</span></span>
<span class="line"><span style="color:#babed8;">            &quot;BEFORE_DATE_RANGE&quot;: &#39;Prepare for delivery&#39;,</span></span>
<span class="line"><span style="color:#babed8;">            &quot;AFTER_DATE_RANGE&quot;: &#39;End of delivery&#39;,//超过投放时间</span></span>
<span class="line"><span style="color:#babed8;">            &quot;BETWEEN_DATE_RANGE&quot;: {//campaign configure status</span></span>
<span class="line"><span style="color:#babed8;">                &quot;STATUS_SUSPEND&quot;: &#39;Not delivering,Campaign is paused&#39;,</span></span>
<span class="line"><span style="color:#babed8;">                &quot;STATUS_NORMAL&quot;: {//campaign system status</span></span>
<span class="line"><span style="color:#babed8;">                    &quot;STATUS_DAILY_LIMIT&quot;: &#39;Not delivering,Reach campaign daily limit&#39;,</span></span>
<span class="line"><span style="color:#babed8;">                    &quot;STATUS_NORMAL&quot;: {//account system status</span></span>
<span class="line"><span style="color:#babed8;">                        &quot;FUND_STATUS_NOT_ENOUGH&quot;: &#39;Not delivering,Low balance&#39;,</span></span>
<span class="line"><span style="color:#babed8;">                        &quot;FUND_STATUS_NORMAL&quot;: &#39;In delivery&#39;</span></span>
<span class="line"><span style="color:#babed8;">                    }</span></span>
<span class="line"><span style="color:#babed8;">                }</span></span>
<span class="line"><span style="color:#babed8;">            }</span></span>
<span class="line"><span style="color:#babed8;">        }</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>JSON中的key是后台各个层级状态的值，value是前端广告的展示状态。</p><p>需要注意的是投放时间需要手动转换好才能进行映射，转换的逻辑抽离成一个工具函数getDateStatus，后面谈具体实现时会提及。</p><h3 id="_2-映射广告状态" tabindex="-1">2.映射广告状态 <a class="header-anchor" href="#_2-映射广告状态" aria-label="Permalink to &quot;2.映射广告状态&quot;">​</a></h3><p>为了将广告状态映射表与后台字段关联起来，写了一个工具函数：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var getEffectStatus = function({</span></span>
<span class="line"><span style="color:#babed8;">    first_level_status, </span></span>
<span class="line"><span style="color:#babed8;">    second_level_status, </span></span>
<span class="line"><span style="color:#babed8;">    third_level_status, </span></span>
<span class="line"><span style="color:#babed8;">    fourth_level_status, </span></span>
<span class="line"><span style="color:#babed8;">    fifth_level_status, </span></span>
<span class="line"><span style="color:#babed8;">    sixth_level_status}) {</span></span>
<span class="line"><span style="color:#babed8;">    var firstLevel = status_map[first_level_status];</span></span>
<span class="line"><span style="color:#babed8;">    var secondLevel = firstLevel &amp;&amp; firstLevel[second_level_status];</span></span>
<span class="line"><span style="color:#babed8;">    var thirdLevel = secondLevel &amp;&amp; secondLevel[third_level_status];</span></span>
<span class="line"><span style="color:#babed8;">    var fourthLevel = thirdLevel &amp;&amp; thirdLevel[fourth_level_status];</span></span>
<span class="line"><span style="color:#babed8;">    var fifthLevel = fourthLevel &amp;&amp; fourthLevel[fifth_level_status];</span></span>
<span class="line"><span style="color:#babed8;">    var sixthLevel = fifthLevel &amp;&amp; fifthLevel[sixth_level_status];</span></span>
<span class="line"><span style="color:#babed8;">    var effect_status = (isString(firstLevel) &amp;&amp; firstLevel) </span></span>
<span class="line"><span style="color:#babed8;">                     || (isString(secondLevel) &amp;&amp; secondLevel) </span></span>
<span class="line"><span style="color:#babed8;">                     || (isString(thirdLevel) &amp;&amp; thirdLevel)</span></span>
<span class="line"><span style="color:#babed8;">                     || (isString(fourthLevel) &amp;&amp; fourthLevel)</span></span>
<span class="line"><span style="color:#babed8;">                     || (isString(fifthLevel) &amp;&amp; fifthLevel)</span></span>
<span class="line"><span style="color:#babed8;">                     || (isString(sixthLevel) &amp;&amp; sixthLevel)</span></span>
<span class="line"><span style="color:#babed8;">                     || &#39;&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    return effect_status;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>层级代表各种状态的优先级，浅层的状态会覆盖深层的状态。 具体哪一层是哪个状态，由调用者自己决定，保证了灵活性和可扩展性。</p><h3 id="_3-测试" tabindex="-1">3.测试 <a class="header-anchor" href="#_3-测试" aria-label="Permalink to &quot;3.测试&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var ad_configure_status = &#39;STATUS_NORMAL&#39;;//STATUS_SUSPEND STATUS_NORMAL</span></span>
<span class="line"><span style="color:#babed8;">var ad_system_status = &#39;STATUS_NORMAL&#39;;//STATUS_PENDING STATUS_DENIED STATUS_DAILY_LIMIT STATUS_NORMAL</span></span>
<span class="line"><span style="color:#babed8;">var date_range = {</span></span>
<span class="line"><span style="color:#babed8;">    start: &#39;2018-01-02&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    end: &#39;2018-01-07&#39;</span></span>
<span class="line"><span style="color:#babed8;">};</span></span>
<span class="line"><span style="color:#babed8;">var campaign_configure_status = &#39;STATUS_NORMAL&#39;;//STATUS_SUSPEND STATUS_NORMAL</span></span>
<span class="line"><span style="color:#babed8;">var campaign_system_status = &#39;STATUS_NORMAL&#39;;//STATUS_DAILY_LIMIT STATUS_NORMAL</span></span>
<span class="line"><span style="color:#babed8;">var account_fund_status = &#39;FUND_STATUS_NORMAL&#39;;//FUND_STATUS_NOT_ENOUGH FUND_STATUS_NORMAL</span></span>
<span class="line"><span style="color:#babed8;">var effect_status = getEffectStatus({</span></span>
<span class="line"><span style="color:#babed8;">    first_level_status: ad_configure_status,</span></span>
<span class="line"><span style="color:#babed8;">    second_level_status: ad_system_status,</span></span>
<span class="line"><span style="color:#babed8;">    third_level_status: getDateStatus(date_range),</span></span>
<span class="line"><span style="color:#babed8;">    fourth_level_status: campaign_configure_status,</span></span>
<span class="line"><span style="color:#babed8;">    fifth_level_status: campaign_system_status,</span></span>
<span class="line"><span style="color:#babed8;">    sixth_level_status: account_fund_status</span></span>
<span class="line"><span style="color:#babed8;">});</span></span>
<span class="line"><span style="color:#babed8;">console.log(&#39;effect status:&#39;, effect_status);</span></span></code></pre></div><p>用到的转换投放时间状态的工具函数（引入了moment.js日期处理库）：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">var getDateStatus = function(date_range){</span></span>
<span class="line"><span style="color:#babed8;">    var today = moment().format(&#39;YYYY-MM-DD&#39;);</span></span>
<span class="line"><span style="color:#babed8;">    var start = date_range[&#39;start&#39;];</span></span>
<span class="line"><span style="color:#babed8;">    var end = date_range[&#39;end&#39;];</span></span>
<span class="line"><span style="color:#babed8;">    let date_status = &#39;&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    if(moment(today).isBefore(start)){</span></span>
<span class="line"><span style="color:#babed8;">        date_status = &#39;BEFORE_DATE_RANGE&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    if(moment(today).isAfter(end)){</span></span>
<span class="line"><span style="color:#babed8;">        date_status = &#39;AFTER_DATE_RANGE&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    if(moment(today).isSame(start) || moment(today).isBetween(start, end) || moment(today).isSame(end)){</span></span>
<span class="line"><span style="color:#babed8;">        date_status = &#39;BETWEEN_DATE_RANGE&#39;;</span></span>
<span class="line"><span style="color:#babed8;">    }</span></span>
<span class="line"><span style="color:#babed8;">    return date_status;</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>后续如果要修改状态转换逻辑，只需修改状态映射表就好。</p><h2 id="四、总结" tabindex="-1">四、总结 <a class="header-anchor" href="#四、总结" aria-label="Permalink to &quot;四、总结&quot;">​</a></h2><p>通过前后台配合实现复杂状态机是一种思路，并不囿于具体的业务：</p><p>通过将状态按照变化的原因进行拆分，将状态的变化进行解耦，这样后台就不需要管状态的具体呈现，只需要关注状态更改的唯一原因，这个原因触发了，就更改这一个状态，其他状态不受影响。具体状态的呈现，由前端通过映射表呈现，映射表将后台状态和前端呈现的状态进行映射，并通过层级对每个状态呈现的优先级进行管理，这样可以大大降低维护成本，无论状态转换的逻辑如何变，只需要修改映射表即可。</p>`,33);function i(r,d,b,_,u,h){const a=n("EditInfo");return e(),t("div",null,[c,l(a,{time:"2019-01-16 16:57",title:"阅读(1935) 评论(0) 推荐(1)"})])}const f=s(o,[["render",i]]);export{m as __pageData,f as default};
