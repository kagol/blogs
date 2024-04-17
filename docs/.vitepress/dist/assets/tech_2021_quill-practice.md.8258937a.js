import{_ as e,B as i,o as t,c as a,G as o,Q as r}from"./chunks/framework.1fee3549.js";const n="/blogs/assets/quill-practice-1.png",s="/blogs/assets/quill-practice-2.png",u="/blogs/assets/quill-practice-3.png",p="/blogs/assets/quill-practice-4.png",c="/blogs/assets/quill-practice-5.png",h="/blogs/assets/quill-practice-6.png",d="/blogs/assets/quill-practice-7.png",q="/blogs/assets/quill-practice-8.png",m="/blogs/assets/quill-practice-9.png",_="/blogs/assets/quill-practice-10.png",g="/blogs/assets/quill-practice-11.png",b="/blogs/assets/quill-practice-12.png",f="/blogs/assets/quill-practice-13.png",Q="/blogs/assets/quill-practice-14.png",P="/blogs/assets/quill-practice-15.png",k="/blogs/assets/quill-practice-16.png",j="/blogs/assets/quill-practice-17.png",x="/blogs/assets/quill-practice-18.png",B="/blogs/assets/quill-practice-19.png",E="/blogs/assets/quill-practice-20.png",y=JSON.parse('{"title":"Quill 富文本编辑器的实践","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/quill-practice.md","filePath":"tech/2021/quill-practice.md"}'),A={name:"tech/2021/quill-practice.md"},D=r('<h1 id="quill-富文本编辑器的实践" tabindex="-1">Quill 富文本编辑器的实践 <a class="header-anchor" href="#quill-富文本编辑器的实践" aria-label="Permalink to &quot;Quill 富文本编辑器的实践&quot;">​</a></h1><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>这是深入浅出 Quill 系列的最后1篇，本系列一共有7篇，以下是之前的6篇。</p><ul><li><a href="https://juejin.cn/post/7325705832070021120" target="_blank" rel="noreferrer">深入浅出 Quill 系列之使用篇1：Quill 基本使用和配置</a></li><li><a href="https://juejin.cn/post/7325979519478218752" target="_blank" rel="noreferrer">深入浅出 Quill 系列之使用篇2：通过 Quill API 实现对编辑器内容的完全控制</a></li><li><a href="https://juejin.cn/post/7326814224330604544" target="_blank" rel="noreferrer">深入浅出 Quill 系列之原理篇1：现代富文本编辑器 Quill 的模块化机制</a></li><li><a href="https://juejin.cn/post/7326978201006555173" target="_blank" rel="noreferrer">深入浅出 Quill 系列之原理篇2：现代富文本编辑器 Quill 的内容渲染机制</a></li><li><a href="https://juejin.cn/post/7327467832866455578" target="_blank" rel="noreferrer">深入浅出 Quill 系列之实践篇1：如何将龙插入到编辑器中？</a></li><li><a href="https://juejin.cn/post/7328292293915344946" target="_blank" rel="noreferrer">深入浅出 Quill 系列之实践篇2：整个贪吃蛇游戏到编辑器里玩儿吧</a></li></ul><p>富文本编辑器大概是最复杂、使用场景却极广的组件了。</p><p>可以说富文本编辑器让 Web 数据录入充满了无限的想象空间，如果只有文本框、下拉框这些纯文本的数据录入组件，那么Web的数据录入能力将极大地受限。我们将无法在网页上插入图片、视频这些富文本内容，更无法插入自定义的内容。</p><p>富文本编辑器让 Web 内容编辑变得更轻松、更高效，我们几乎可以在富文本编辑器中插入任何你想插入的内容，图片、视频、超链接、公式、代码块，都不在话下，甚至还可以插入表格、PPT、思维导图，甚至3D模型这种超复杂的自定义内容。</p><p>富文本编辑器的场景在 Web 上也是随处可见，写文章、写评论、意见反馈、录需求单，都需要使用到富文本。</p><p>本文从富文本编辑器的使用场景、技术选型，再到对 Quill 的扩展，以及 Quill 的基本原理，跟大家分享 Quill 富文本编辑器的那些事儿。</p><p>本文主要由以下部分组成：</p><ol><li>富文本编辑器的使用场景</li><li>技术选型</li><li>我们为什么选择 Quill</li><li>如何扩展 Quill</li><li>Quill 基本原理</li></ol><p>以下内容来自 <code>Kagol</code> 在 <code>华为 HWEB 大前端技术分享会</code> 上的演讲（2021年5月28日）。</p><h2 id="_1-富文本编辑器的使用场景" tabindex="-1">1 富文本编辑器的使用场景 <a class="header-anchor" href="#_1-富文本编辑器的使用场景" aria-label="Permalink to &quot;1 富文本编辑器的使用场景&quot;">​</a></h2><ul><li>博客文章</li><li>Wiki 词条</li><li>工作项描述</li><li>测试用例步骤</li><li>反馈意见</li><li>评论</li><li>…</li></ul><p><img src="'+n+'" alt="1.png"></p><p><img src="'+s+'" alt="2.png"></p><p><img src="'+u+'" alt="3.png"></p><h2 id="_2-技术选型" tabindex="-1">2 技术选型 <a class="header-anchor" href="#_2-技术选型" aria-label="Permalink to &quot;2 技术选型&quot;">​</a></h2><p>我们的需求：</p><ul><li>开源协议友好</li><li>Angular 框架或框架无关</li><li>灵活可扩展</li><li>支持插入/编辑表格和图片</li><li>插件丰富，生态好</li></ul><p><img src="'+p+'" alt="4.png"></p><p><img src="'+c+'" alt="5.png"></p><h3 id="_2-1-选型分析" tabindex="-1">2.1 选型分析 <a class="header-anchor" href="#_2-1-选型分析" aria-label="Permalink to &quot;2.1 选型分析&quot;">​</a></h3><ul><li>首先排除官方不维护的<code>UEditor</code></li><li>然后排除 React 框架专属的<code>Draft.js</code>和<code>Slate</code></li><li>接着排除开源协议不友好的<code>CKEditor</code></li><li>由于我们的业务场景丰富，需要富文本插入/编辑表格的功能，所以还需要排除不支持表格的<code>Trix</code>，弱支持表格的<code>Etherpad</code>和<code>Prosemirror</code>，以及表格功能收费的<code>TinyMCE</code></li><li>最后只剩下<code>Quill</code>和<code>wangEditor</code>两款编辑器可选，<code>wangEditor</code>的扩展性和生态不如<code>Quill</code>，所以最终选择<code>Quill</code>作为富文本组件的基座</li></ul><h2 id="_3-为什么选择-quill" tabindex="-1">3 为什么选择 Quill？ <a class="header-anchor" href="#_3-为什么选择-quill" aria-label="Permalink to &quot;3 为什么选择 Quill？&quot;">​</a></h2><ul><li>BSD 协议，商业友好</li><li>文档详细，上手快</li><li>API 驱动，扩展性好</li><li>插件丰富，生态好</li></ul><h3 id="_3-1-文档详细" tabindex="-1">3.1 文档详细 <a class="header-anchor" href="#_3-1-文档详细" aria-label="Permalink to &quot;3.1 文档详细&quot;">​</a></h3><p>Document：<a href="https://quilljs.com/" target="_blank" rel="noreferrer">https://quilljs.com/</a></p><p>介绍 Quill 的 API：</p><p><img src="'+h+'" alt="1622088667748.png"></p><p>介绍如何扩展 Quill：</p><p><img src="'+d+'" alt="7.png"></p><h3 id="_3-2-上手快" tabindex="-1">3.2 上手快 <a class="header-anchor" href="#_3-2-上手快" aria-label="Permalink to &quot;3.2 上手快&quot;">​</a></h3><ul><li>安装 Quill：<code>npm i quill</code></li><li>引入样式：<code>@import &#39;quill/dist/quill.snow.css&#39;;</code></li><li>引入 Quill：<code>import Quill from &#39;quill&#39;;</code></li><li>初始化 Quill：<code>new Quill(&#39;#editor&#39;, { theme: &#39;snow&#39; });</code></li></ul><p>效果图：</p><p><img src="'+q+'" alt="8.png"></p><h3 id="_3-3-api-驱动-扩展性好" tabindex="-1">3.3 API 驱动，扩展性好 <a class="header-anchor" href="#_3-3-api-驱动-扩展性好" aria-label="Permalink to &quot;3.3 API 驱动，扩展性好&quot;">​</a></h3><p><img src="'+m+'" alt="9.png"></p><p><img src="'+_+'" alt="10.png"></p><h3 id="_3-4-插件丰富-生态好" tabindex="-1">3.4 插件丰富，生态好 <a class="header-anchor" href="#_3-4-插件丰富-生态好" aria-label="Permalink to &quot;3.4 插件丰富，生态好&quot;">​</a></h3><p><img src="'+g+'" alt="11.png"></p><h2 id="_4-扩展-quill" tabindex="-1">4 扩展 Quill <a class="header-anchor" href="#_4-扩展-quill" aria-label="Permalink to &quot;4 扩展 Quill&quot;">​</a></h2><h3 id="_4-1-插入标签" tabindex="-1">4.1 插入标签 <a class="header-anchor" href="#_4-1-插入标签" aria-label="Permalink to &quot;4.1 插入标签&quot;">​</a></h3><p>比如我想在编辑器里插入标签</p><p><img src="'+b+'" alt="12.png"></p><h3 id="_4-2-上传附件" tabindex="-1">4.2 上传附件 <a class="header-anchor" href="#_4-2-上传附件" aria-label="Permalink to &quot;4.2 上传附件&quot;">​</a></h3><p>比如我想在编辑器里插入附件</p><p><img src="'+f+'" alt="13.png"></p><h3 id="_4-3-插入表情" tabindex="-1">4.3 插入表情 <a class="header-anchor" href="#_4-3-插入表情" aria-label="Permalink to &quot;4.3 插入表情&quot;">​</a></h3><p>比如我想在编辑器中插入表情</p><p>类似语雀的评论：<a href="https://www.yuque.com/yuque/blog/sguhed" target="_blank" rel="noreferrer">https://www.yuque.com/yuque/blog/sguhed</a></p><p><img src="'+Q+'" alt="14.png"></p><h3 id="_4-4-个性分割线" tabindex="-1">4.4 个性分割线 <a class="header-anchor" href="#_4-4-个性分割线" aria-label="Permalink to &quot;4.4 个性分割线&quot;">​</a></h3><p>比如我想插入B站这种个性化的分割线</p><p><img src="'+P+'" alt="15.png"></p><h3 id="_4-5-超链接卡片" tabindex="-1">4.5 超链接卡片 <a class="header-anchor" href="#_4-5-超链接卡片" aria-label="Permalink to &quot;4.5 超链接卡片&quot;">​</a></h3><p>比如我想插入知乎这样的超链接卡片</p><p><img src="'+k+`" alt="16.png"></p><h3 id="_4-6-如何插入表情" tabindex="-1">4.6 如何插入表情？ <a class="header-anchor" href="#_4-6-如何插入表情" aria-label="Permalink to &quot;4.6 如何插入表情？&quot;">​</a></h3><p>我们从如何插入表情入手，一起看看怎么在 Quill 中插入自定义的内容。</p><p>要在 Quill 中插入表情，只需要以下四步：</p><ul><li>第一步：自定义工具栏按钮</li><li>第二步：自定义 Blot 内容 EmojiBlot</li><li>第三步：在 Quill 注册 EmojiBlot</li><li>第四步：调用 Quill 的 API 插入表情</li></ul><h4 id="_4-6-1-第一步-自定义工具栏按钮" tabindex="-1">4.6.1 第一步：自定义工具栏按钮 <a class="header-anchor" href="#_4-6-1-第一步-自定义工具栏按钮" aria-label="Permalink to &quot;4.6.1 第一步：自定义工具栏按钮&quot;">​</a></h4><pre><code>const quill = new Quill(&#39;#editor&#39;, {
  theme: &#39;snow&#39;,
  modules: {
    // 配置工具栏模块
    toolbar: {
      container: [ …, [ &#39;emoji&#39; ] ], // 增加一个按钮
      handlers: {
        // 添加按钮的处理逻辑
        emoji() {
          console.log(&#39;插入表情&#39;);
        }
      }
    },
  }
});
</code></pre><h4 id="_4-6-2-给工具栏按钮增加图标" tabindex="-1">4.6.2 给工具栏按钮增加图标 <a class="header-anchor" href="#_4-6-2-给工具栏按钮增加图标" aria-label="Permalink to &quot;4.6.2 给工具栏按钮增加图标&quot;">​</a></h4><pre><code>// 扩展 Quill 内置的 icons 配置
const icons = Quill.import(&#39;ui/icons&#39;);
icons.emoji = ‘&lt;svg&gt;…&lt;/svg&gt;’; // 图标的 svg 可以从 iconfont 网站复制
</code></pre><p>效果如下：</p><p><img src="`+j+`" alt="17.png"></p><p>工具栏上已经多了一个表情的按钮，并且能够响应鼠标点击事件，下一步就是要编写插入表情的具体逻辑，这涉及到 Quill 的自定义内容相关的知识。</p><h4 id="_4-6-3-第二步-自定义-blot-内容-emojiblot" tabindex="-1">4.6.3 第二步：自定义 Blot 内容 EmojiBlot <a class="header-anchor" href="#_4-6-3-第二步-自定义-blot-内容-emojiblot" aria-label="Permalink to &quot;4.6.3 第二步：自定义 Blot 内容 EmojiBlot&quot;">​</a></h4><p>Quill 中的 Blot 就是一个普通的 ES6 Class，由于表情和图片的差别就在于：</p><p>Quill 内置的图片格式不支持自定义宽高，而我们要插入的表情是需要特定的宽高的。</p><p>因此我们可以基于 Quill 内置的 image 格式来扩展。</p><p>emoji.ts</p><pre><code>import Quill from &#39;quill&#39;;

const ImageBlot = Quill.import(&#39;formats/image&#39;);

// 扩展 Quill内置的 image 格式
class EmojiBlot extends ImageBlot {
  static blotName = &#39;emoji&#39;; // 定义自定义 Blot 的名字（必须全局唯一）
  static tagName = &#39;img&#39;; // 自定义内容的标签名

  // 创建自定义内容的 DOM 节点
  static create(value): any {
    const node = super.create(value);
    node.setAttribute(&#39;src&#39;, ImageBlot.sanitize(value.url));
    if (value.width !== undefined) {
      node.setAttribute(&#39;width&#39;, value.width);
    }
    if (value.height !== undefined) {
      node.setAttribute(&#39;height&#39;, value.height);
    }
    return node;
  }
  
  // 返回 options 数据
  static value(node): any {
    return {
      url: node.getAttribute(&#39;src&#39;),
      width: node.getAttribute(&#39;width&#39;),
      height: node.getAttribute(&#39;height&#39;)
    };
  }
}

export default EmojiBlot;
</code></pre><h4 id="_4-6-4-第三步-在-quill-注册-emojiblot" tabindex="-1">4.6.4 第三步：在 Quill 注册 EmojiBlot <a class="header-anchor" href="#_4-6-4-第三步-在-quill-注册-emojiblot" aria-label="Permalink to &quot;4.6.4 第三步：在 Quill 注册 EmojiBlot&quot;">​</a></h4><p>有了 EmojiBlot，要将其插入 Quill 编辑器中，还需要将这个 ES6 类注册到 Quill 中。</p><pre><code>import EmojiBlot from &#39;./formats/emoji&#39;;
Quill.register(&#39;formats/emoji&#39;, EmojiBlot);
</code></pre><h4 id="_4-6-5-第四步-调用-quill-的-api-插入表情" tabindex="-1">4.6.5 第四步：调用 Quill 的 API 插入表情 <a class="header-anchor" href="#_4-6-5-第四步-调用-quill-的-api-插入表情" aria-label="Permalink to &quot;4.6.5 第四步：调用 Quill 的 API 插入表情&quot;">​</a></h4><p>EmojiBlot 注册到 Quill 中之后，Quill 就能认识它了，也就可以调用 Quill 的 API 将其插入到编辑器中。</p><pre><code>emoji(): void {
  console.log(&#39;插入表情&#39;);
  // 获取当前光标位置
  const index = this.quill.getSelection().index;
  // 在当前光标处插入 emoji（blotName）
  this.quill.insertEmbed(index, &#39;emoji&#39;, {
    url: &#39;assets/emoji/good.png&#39;,
    width: &#39;64px&#39;,
  });
},
</code></pre><h3 id="_4-7-效果图" tabindex="-1">4.7 效果图 <a class="header-anchor" href="#_4-7-效果图" aria-label="Permalink to &quot;4.7 效果图&quot;">​</a></h3><p><img src="`+x+'" alt="图片.png"></p><h3 id="_4-8-demo-源码" tabindex="-1">4.8 Demo 源码 <a class="header-anchor" href="#_4-8-demo-源码" aria-label="Permalink to &quot;4.8 Demo 源码&quot;">​</a></h3><p>源码链接：<a href="https://gitee.com/kagol/quill-practice" target="_blank" rel="noreferrer">https://gitee.com/kagol/quill-practice</a></p><h2 id="_5-quill-基本原理" tabindex="-1">5 Quill 基本原理 <a class="header-anchor" href="#_5-quill-基本原理" aria-label="Permalink to &quot;5 Quill 基本原理&quot;">​</a></h2><p>最后讲一讲 Quill 的基本原理。</p><h3 id="_5-1-基本原理" tabindex="-1">5.1 基本原理 <a class="header-anchor" href="#_5-1-基本原理" aria-label="Permalink to &quot;5.1 基本原理&quot;">​</a></h3><ul><li>使用 Delta 数据模型描述富文本内容及其变化，以保证行为的可预测</li><li>通过 Parchment 对 DOM 进行抽象，以保证平台一致性</li><li>通过 Mutation Observe 监听 DOM 节点的变化，将 DOM 的更改同步到 Delta 数据模型中</li></ul><p><img src="'+B+'" alt="19.png"></p><h3 id="_5-2-quill-如何表达编辑器内容" tabindex="-1">5.2 Quill 如何表达编辑器内容？ <a class="header-anchor" href="#_5-2-quill-如何表达编辑器内容" aria-label="Permalink to &quot;5.2 Quill 如何表达编辑器内容？&quot;">​</a></h3><h4 id="_5-2-1-delta-数据模型" tabindex="-1">5.2.1 Delta 数据模型 <a class="header-anchor" href="#_5-2-1-delta-数据模型" aria-label="Permalink to &quot;5.2.1 Delta 数据模型&quot;">​</a></h4><p>通过 Delta 数据模型来描述富文本内容及其变化</p><p><img src="'+E+`" alt="20.png"></p><p>Delta 是 JSON 的一个子集，只包含一个 ops 属性，它的值是一个对象数组，每个数组项代表对编辑器的一个操作（以编辑器初始状态为空为基准）。</p><pre><code>{
  &quot;ops&quot;: [
    { &quot;insert&quot;: &quot;Hello &quot; },
    { &quot;insert&quot;: &quot;World&quot;, &quot;attributes&quot;: { &quot;bold&quot;: true } },
    { &quot;insert&quot;: &quot;\\n&quot; }
  ]
}
</code></pre><h4 id="_5-2-2-修改编辑器内容" tabindex="-1">5.2.2 修改编辑器内容 <a class="header-anchor" href="#_5-2-2-修改编辑器内容" aria-label="Permalink to &quot;5.2.2 修改编辑器内容&quot;">​</a></h4><p>比如我们把加粗的&quot;World&quot;改成红色的文字&quot;World&quot;，这个动作用 Delta 描述如下：</p><pre><code>{
  &quot;ops&quot;: [
    { &quot;retain&quot;: 6 },
    { &quot;retain&quot;: 5, &quot;attributes&quot;: { &quot;color&quot;: &quot;#ff0000&quot; } }
  ]
}
</code></pre><p>意思是：保留编辑器最前面的6个字符，即保留&quot;Hello &quot;不动，保留之后的5个字符&quot;World&quot;，并将这些字符设置为字体颜色为&quot;#ff0000&quot;。</p><h4 id="_5-2-3-删除编辑器内容" tabindex="-1">5.2.3 删除编辑器内容 <a class="header-anchor" href="#_5-2-3-删除编辑器内容" aria-label="Permalink to &quot;5.2.3 删除编辑器内容&quot;">​</a></h4><p>如果要删除&quot;World&quot;呢？</p><pre><code>{
  &quot;ops&quot;: [
    { &quot;retain&quot;: 6 },
    { &quot;delete&quot;: 5 }
  ]
}
</code></pre><p>即：保留前面6个字符（&#39;Hello &#39;），删除之后的5个字符（&#39;World&#39;）</p><h3 id="_5-3-quill-如何渲染内容" tabindex="-1">5.3 Quill 如何渲染内容？ <a class="header-anchor" href="#_5-3-quill-如何渲染内容" aria-label="Permalink to &quot;5.3 Quill 如何渲染内容？&quot;">​</a></h3><p>渲染富文本内容的基本原理：遍历 Delta 数组，将其中描述的内容一个一个应用（插入/格式化/删除）到编辑器中。</p><p>详情可参考以下文章：</p><p><a href="https://juejin.cn/post/7326978201006555173" target="_blank" rel="noreferrer">《Quill 的内容渲染机制》</a></p><h3 id="_5-4-quill-如何扩展编辑器的能力" tabindex="-1">5.4 Quill 如何扩展编辑器的能力？ <a class="header-anchor" href="#_5-4-quill-如何扩展编辑器的能力" aria-label="Permalink to &quot;5.4 Quill 如何扩展编辑器的能力？&quot;">​</a></h3><p>扩展 Quill 的方式：</p><ul><li>通过自定义 Blot 格式来扩展编辑器的内容</li><li>通过自定义模块来扩展编辑器的功能</li></ul><p>详情可参考以下文章：</p><p><a href="https://juejin.cn/post/7326814224330604544" target="_blank" rel="noreferrer">《现代富文本编辑器 Quill 的模块化机制》</a></p><p>THANK YOU！</p>`,114);function w(v,I,W,S,T,N){const l=i("EditInfo");return t(),a("div",null,[D,o(l,{time:"2021年05月27日 23:36",title:"阅读 8984 ·  点赞 129 ·  评论 72 ·  收藏 142"})])}const C=e(A,[["render",w]]);export{y as __pageData,C as default};
