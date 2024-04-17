import{_ as t,B as l,o as i,c as n,G as o,Q as a}from"./chunks/framework.1fee3549.js";const d="/blogs/assets/quill-api-1.png",r="/blogs/assets/quill-api-2.gif",c="/blogs/assets/quill-api-3.gif",s="/blogs/assets/quill-api-4.png",p="/blogs/assets/quill-api-5.gif",h="/blogs/assets/quill-api-6.gif",u="/blogs/assets/quill-api-7.gif",g="/blogs/assets/quill-api-8.png",x="/blogs/assets/quill-api-9.gif",v=JSON.parse('{"title":"深入浅出Quill：通过 Quill API 实现对编辑器内容的完全控制","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/quill-api.md","filePath":"tech/2021/quill-api.md"}'),q={name:"tech/2021/quill-api.md"},m=a(`<h1 id="深入浅出quill-通过-quill-api-实现对编辑器内容的完全控制" tabindex="-1">深入浅出Quill：通过 Quill API 实现对编辑器内容的完全控制 <a class="header-anchor" href="#深入浅出quill-通过-quill-api-实现对编辑器内容的完全控制" aria-label="Permalink to &quot;深入浅出Quill：通过 Quill API 实现对编辑器内容的完全控制&quot;">​</a></h1><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>这是深入浅出 Quill 系列的第2篇。</p><p><a href="https://juejin.cn/post/6976023288753586184" target="_blank" rel="noreferrer">上一篇</a>我们介绍了 Quill 的基本使用和配置，相信大家能够使用 Quill 搭建一个简单的富文本编辑器啦。</p><p>不过实际的业务场景可能更复杂，有更多定制的需求，Quill 能否满足呢？</p><p>Quill 是一款 API 驱动的富文本编辑器，它的内容可以通过API实现完全的掌控，我们一起来看看吧。</p><h2 id="_1-对内容的控制" tabindex="-1">1 对内容的控制 <a class="header-anchor" href="#_1-对内容的控制" aria-label="Permalink to &quot;1 对内容的控制&quot;">​</a></h2><p>富文本编辑器最基本的操作就是对内容的<code>增</code>/<code>删</code>/<code>改</code>/<code>查</code>，比如：</p><ul><li>在编辑器某处增加一些文本</li><li>选中编辑器中的一部分内容，将其删除</li><li>选中一部分文本，给它添加某种格式</li><li>获取其中一部分内容，对其进行转换</li></ul><p>以上操作直接通过键盘和鼠标很容易操作，但是通过 API 如何实现呢？</p><h3 id="_1-1-删" tabindex="-1">1.1 删 <a class="header-anchor" href="#_1-1-删" aria-label="Permalink to &quot;1.1 删&quot;">​</a></h3><p>先看<code>删</code>的部分，通过<code>deleteText()</code>方法实现，该方法主要有两个入参：</p><ul><li>index 从哪儿删除</li><li>length 删除多少内容</li></ul><p>比如我想把下面的<code>上一篇</code>删除：</p><pre><code>this.quill.deleteText(0, 3);
</code></pre><p><img src="`+d+`" alt="删除文本.png"></p><p>又比如我想删除编辑器里的所有内容，但我们不知道里面一共有多少内容，是不是需要一个一个数一下呢？</p><p>其实是不需要的，Quill 提供了一个查询编辑器总字符数的方法<code>getLength()</code>（后面介绍<code>查</code>的部分也会讲到）。</p><p>所以删除所有内容也很简单：</p><pre><code>this.quill.deleteText(0, this.quill.getLength());
</code></pre><p>还有一种常见的情况，就是我们想删除编辑器中选中的内容，这要如何实现呢？</p><p>Quill 提供了一个获取编辑器选区的方法<code>getSelection()</code>（后面介绍<code>对选区的控制</code>时会讲到）可以轻松实现：</p><pre><code>// 获取选区内容所在的index和length
const { index, length } = this.quill.getSelection();

this.quill.deleteText(index, length);
</code></pre><p><img src="`+r+`" alt="2024-01-20 12.04.09.gif"></p><p>是不是非常方便呢？</p><h3 id="_1-2-查" tabindex="-1">1.2 查 <a class="header-anchor" href="#_1-2-查" aria-label="Permalink to &quot;1.2 查&quot;">​</a></h3><p>再来看<code>查</code>的部分，Quill 托管了编辑器里所有的内容，因此它对里面的内容了如指掌，Quill 知道：</p><ul><li>指定位置有什么内容</li><li>有多少内容</li><li>它的格式是什么</li></ul><p>可以使用<code>getText()</code>方法获取纯文本内容，它的使用方式和前面介绍过的<code>deleteText()</code>类似：</p><pre><code>// 获取指定位置的文本
this.quill.getText(0, 6);

// 不传入任何参数，可以获取全部文本
this.quill.getText();

// 获取选中文本
const { index, length } = this.quill.getSelection();
this.quill.getText(index, length);
</code></pre><p>都知道有什么内容了，拿到内容的长度就很简单了：</p><pre><code>const length = this.quill.getText().length;
</code></pre><p>Quill 提供了一个简便的方法<code>getLength()</code>，可以直接拿到全部文本的长度：</p><pre><code>const length = this.quill.getLength();
</code></pre><p>要获取选中文本的长度，可以使用之前介绍过的<code>getSelection()</code>方法：</p><pre><code>const length = this.quill.getSelection().length;
</code></pre><h3 id="_1-3-增" tabindex="-1">1.3 增 <a class="header-anchor" href="#_1-3-增" aria-label="Permalink to &quot;1.3 增&quot;">​</a></h3><h4 id="_1-3-1-插入文本" tabindex="-1">1.3.1 插入文本 <a class="header-anchor" href="#_1-3-1-插入文本" aria-label="Permalink to &quot;1.3.1 插入文本&quot;">​</a></h4><p>往编辑器里增加格式化的内容是最常见的需求，Quill 针对该场景提供了非常丰富的 API，最基础的就是<code>insertText()</code>方法。</p><p>该方法既可以增加纯文本，又可以增加带格式的文本。</p><p>插入纯文本需要传入两个参数：</p><ul><li>index 从哪个位置插入文本</li><li>text 插入什么文本</li></ul><pre><code>this.quill.insertText(0, &#39;Quill 是一款 API 驱动的富文本编辑器&#39;);
</code></pre><p>插入带格式的文本需要额外传入两个参数：</p><ul><li>format 格式的名字</li><li>value 格式的值</li></ul><p>比如我想在当前光标后面插入一个带超链接的<code>Quill</code>：</p><pre><code>const range = this.quill.getSelection();
if (range) {
  this.quill.insertText(range.index, &#39;Quill&#39;, &#39;link&#39;, &#39;https://quilljs.com/&#39;);
}
</code></pre><p><img src="`+c+`" alt="2024-01-20 12.09.37.gif"></p><h4 id="_1-3-2-插入嵌入内容" tabindex="-1">1.3.2 插入嵌入内容 <a class="header-anchor" href="#_1-3-2-插入嵌入内容" aria-label="Permalink to &quot;1.3.2 插入嵌入内容&quot;">​</a></h4><p>插入嵌入内容的方法<code>insertEmbed()</code>，这个方法很强大，后续我会给大家分享如何使用这个方法在编辑器中插入龙、插入贪吃蛇游戏等好玩的内容。</p><p>这个方法和<code>insertText()</code>的区别在于没有第二个参数，因为它不需要插入文本。</p><p>比如插入B站风格的分割线：</p><pre><code>const index = this.quill.getSelection().index;
this.quill.insertEmbed(index, &#39;divider&#39;, {
  url: &#39;assets/images/divider.png&#39;,
  width: &#39;660px&#39;,
});
</code></pre><p><img src="`+s+`" alt="B站风格的分割线.png"></p><p>比如插入龙：</p><pre><code>const index = this.quill.getSelection().index;
this.quill.insertEmbed(index, &#39;dragon&#39;, {
  id: &#39;canvas-dragon&#39;,
});
</code></pre><p><img src="`+p+`" alt="2024-01-20 12.16.21.gif"></p><p>比如插入贪吃蛇小游戏：</p><pre><code>const index = this.quill.getSelection().index;
this.quill.insertEmbed(index, &#39;snake&#39;, {
  id: &#39;canvas-snake&#39;,
});
</code></pre><p><img src="`+h+`" alt="2024-01-20 12.41.58.gif"></p><h4 id="_1-3-3-用纯文本替换现有内容" tabindex="-1">1.3.3 用纯文本替换现有内容 <a class="header-anchor" href="#_1-3-3-用纯文本替换现有内容" aria-label="Permalink to &quot;1.3.3 用纯文本替换现有内容&quot;">​</a></h4><p>这两个方法都是在现有内容的基础上新增文本。</p><p>如果要直接用新的内容替换现有文本，要怎么做呢？</p><p>使用以下两个<code>set</code>方法即可：</p><ul><li>setText 设置纯文本</li><li>setContents 设置带格式的文本</li></ul><p><code>setText()</code>方法只有一个参数：</p><ul><li>text 需要插入的纯文本</li></ul><pre><code>this.quill.setText(&#39;Hello Quill!&#39;);
</code></pre><p>如果<code>text</code>参数传入空字符串，则会清空编辑器内容：</p><pre><code>this.quill.setText(&#39;&#39;);
</code></pre><h4 id="_1-3-4-用-delta-数据替换现有内容" tabindex="-1">1.3.4 用 delta 数据替换现有内容 <a class="header-anchor" href="#_1-3-4-用-delta-数据替换现有内容" aria-label="Permalink to &quot;1.3.4 用 delta 数据替换现有内容&quot;">​</a></h4><p><code>setContents()</code>方法非常强大，可以使用指定的 delta 数据来渲染编辑器的内容。</p><p>比如我们想要将当前富文本的内容变成一个贪吃蛇游戏：</p><pre><code>this.quill.setContents([
  { insert: { snake: { id: &#39;snake&#39; } } }
]);
</code></pre><p>一般 delta 数据会存储在数据库中，使用 delta 来初始化编辑器内容时，可以使用该方法。</p><h3 id="_1-4-改" tabindex="-1">1.4 改 <a class="header-anchor" href="#_1-4-改" aria-label="Permalink to &quot;1.4 改&quot;">​</a></h3><p><code>setContents()</code>方法还有一个兄弟叫<code>updateContents()</code>，这俩兄弟本领都非常强。</p><p><code>updateContents()</code>方法可以使用 delta 更新编辑器中的指定内容。</p><p>比如我想把选中的<code>Quill</code>内容变成<code>QuillJS</code>，并加上超链接，不使用<code>updateContents()</code>方法的情况下，我们需要调用多个方法：</p><pre><code>const { index, length } = this.quill.getSelection();
this.quill.deleteText(index, length);
this.quill.insertText(index, &#39;QuillJS&#39;, &#39;link&#39;, &#39;https://quilljs.com/&#39;);
</code></pre><p>我们再来看看使用<code>updateContents()</code>方法如何实现：</p><pre><code>this.quill.updateContents([
  { retain: index },
  { delete: length },
  { insert: &#39;QuillJS&#39;, attributes: { link: &#39;https://quilljs.com/&#39; } }
]);
</code></pre><p>两种方法的效果一样，但是后者只需要调用一个方法。</p><blockquote><p><code>updateContents()</code>方法可以赋予我们通过操作 delta 这个 JSON 数据来操作编辑器内容，而不用手动调用 API 去改变内容，在某些场景下这将是一个极大的便利。</p></blockquote><h2 id="_2-对格式的控制" tabindex="-1">2 对格式的控制 <a class="header-anchor" href="#_2-对格式的控制" aria-label="Permalink to &quot;2 对格式的控制&quot;">​</a></h2><h3 id="_2-1-删" tabindex="-1">2.1 删 <a class="header-anchor" href="#_2-1-删" aria-label="Permalink to &quot;2.1 删&quot;">​</a></h3><p>除了可以删除编辑器内容外，我们可能还需要清除某部分内容的格式，清除格式可以使用<code>removeFormat()</code>方法，该方法的使用方式和<code>deleteText()</code>几乎是一样的，不再赘述。</p><pre><code>// 清除指定位置和长度的文本的格式
this.quill.removeFormat(0, 6);

// 清除全部文本的格式
this.quill.removeFormat(0, this.quill.getLength());

// 清除选中文本的格式
const { index, length } = this.quill.getSelection();
this.quill.removeFormat(index, length);
</code></pre><h3 id="_2-2-查" tabindex="-1">2.2 查 <a class="header-anchor" href="#_2-2-查" aria-label="Permalink to &quot;2.2 查&quot;">​</a></h3><h4 id="获取单一格式" tabindex="-1">获取单一格式 <a class="header-anchor" href="#获取单一格式" aria-label="Permalink to &quot;获取单一格式&quot;">​</a></h4><p><code>getText()</code>方法只能拿到纯文本，并不知道里面有什么格式，要想获取指定文本的格式，可以使用<code>getFormat()</code>方法，使用方式都一样。</p><pre><code>// 获取选中文本的格式
const { index, length } = this.quill.getSelection();
const format = this.quill.getFormat(index, length);
</code></pre><p>比如粗体的格式：</p><pre><code>{ bold: true }
</code></pre><p>超链接的格式：</p><pre><code>{ link: &quot;https://juejin.cn/post/6976023288753586184&quot; }
</code></pre><p><img src="`+u+'" alt="获取格式.gif"></p><h4 id="获取-delta-格式" tabindex="-1">获取 Delta 格式 <a class="header-anchor" href="#获取-delta-格式" aria-label="Permalink to &quot;获取 Delta 格式&quot;">​</a></h4><p>不过<code>getFormat()</code>方法只能拿到单一的格式，如果想知道指定内容的全部格式信息，需要使用一个更加强大的API：<code>getContents()</code>，这个方法能获取内容的 delta 形式，而 delta 格式不仅描述了有什么内容，还描述了这些内容的格式是什么。</p><p>比如以下选中的内容，我们看看它的内容和格式是什么。</p><p><img src="'+g+`" alt="delta格式.png"></p><p>调用<code>getContents()</code>方法：</p><pre><code>const { index, length } = this.quill.getSelection();
const contents = this.quill.getContents(index, length);
console.log(&#39;contents:&#39;, contents);
</code></pre><p>打印了以下信息：</p><pre><code>{
  ops: [
    { insert: &#39;删除内容&#39; },
    { attributes: { header: 2 }, insert: &#39;\\n&#39; }, // 标题二格式
    { insert: &#39;先看&#39; },
    { attributes: { code: true }, insert: &#39;删&#39; }, // 行内代码格式
    { insert: &#39;的部分，通过&#39; },
    { attributes: { code: true }, insert: &#39;deleteText()&#39; }, // 行内代码格式
    { insert: &#39;方法实现，该方法主要有两个入参：\\nindex 从哪儿删除&#39; },
    { attributes: { list: &#39;bullet&#39; }, insert: &#39;\\n&#39; }, // 无序列表格式
    { insert: &#39;length 删除多少内容&#39; },
    { attributes: { list: &#39;bullet&#39; }, insert: &#39;\\n&#39; }, // 无序列表格式
    { insert: &#39;比如我想把下面的&#39; },
    { attributes: { code: true }, insert: &#39;Hello &#39; }, // 行内代码格式
    { insert: &#39;删除：\\nthis.quill.deleteText(0, 6);&#39; },
    { attributes: { &#39;code-block&#39;: true }, insert: &#39;\\n&#39; }, // 代码块格式
    { insert: &#39;\\n&#39; }
  ]
}
</code></pre><p>从以上 delta 结构我们很容易得出编辑器内容的格式信息：</p><ul><li><code>删除内容</code>是标题二格式</li><li><code>删</code>/<code>deleteText()</code>/<code>Hello </code>是行内代码格式</li><li><code>index 从哪儿删除</code>和<code>length 删除多少内容</code>是无序列表格式</li><li><code>this.quill.deleteText(0, 6);</code>是代码块格式</li><li>其他内容都是纯文本格式</li></ul><p>是不是一目了然呢？</p><h3 id="_2-3-增" tabindex="-1">2.3 增 <a class="header-anchor" href="#_2-3-增" aria-label="Permalink to &quot;2.3 增&quot;">​</a></h3><p>除了删除和查找格式之外，还可以设置格式，Quill提供了3个设置格式的方法：</p><ul><li>format(format, value) 设置选中文本的格式</li><li>formatLine(index, length, format, value) 设置行（块级）格式</li><li>formatText(index, length, format, value) 设置指定位置的文本格式</li></ul><pre><code>// 设置选中文本为粉色
this.quill.format(&#39;color&#39;, &#39;pink&#39;);

// 设置第10-20个字符为粉色
this.quill.formatText(10, 10, &#39;color&#39;, &#39;pink&#39;);

// 设置第一行为有序列表
this.quill.formatLine(0, 1, &#39;list&#39;, &#39;ordered&#39;);
</code></pre><h2 id="_3-对选区的控制" tabindex="-1">3 对选区的控制 <a class="header-anchor" href="#_3-对选区的控制" aria-label="Permalink to &quot;3 对选区的控制&quot;">​</a></h2><h3 id="_3-1-查" tabindex="-1">3.1 查 <a class="header-anchor" href="#_3-1-查" aria-label="Permalink to &quot;3.1 查&quot;">​</a></h3><h4 id="_3-1-1-查询选区信息" tabindex="-1">3.1.1 查询选区信息 <a class="header-anchor" href="#_3-1-1-查询选区信息" aria-label="Permalink to &quot;3.1.1 查询选区信息&quot;">​</a></h4><p>获取当前选区或光标的方法<code>getSelection()</code>，我们在前面已经使用过多次，说明这个方法是一个非常实用的高频方法。</p><p>该方法不需要传入参数，返回当前选区信息：</p><ul><li>index 选区开始位置</li><li>length 选区长度</li></ul><pre><code>{
  index: 0,
  length: 3
}
</code></pre><p>如果只有光标，没有选择任何内容，则返回的<code>length</code>为<code>0</code>。</p><p>如果编辑器没有光标，则返回<code>null</code>。</p><h4 id="_3-1-2-查询文本相对定位位置" tabindex="-1">3.1.2 查询文本相对定位位置 <a class="header-anchor" href="#_3-1-2-查询文本相对定位位置" aria-label="Permalink to &quot;3.1.2 查询文本相对定位位置&quot;">​</a></h4><p>除了查询选区位置和长度，还可以使用<code>getBounds()</code>方法查询指定位置的文本在编辑器容器中的相对定位位置，该方法有两个入参：</p><ul><li>index 选区开始位置</li><li>length 选区长度</li></ul><p>比如我想看下编辑器开头的三个字符的位置：</p><pre><code>const bounds = this.quill.getBounds(0, 3);
</code></pre><p>返回结果：</p><pre><code>{
  bottom: 49.100006103515625
  height: 22.5
  left: 18
  right: 66
  top: 26.600006103515625
  width: 48
}
</code></pre><h3 id="_3-2-增" tabindex="-1">3.2 增 <a class="header-anchor" href="#_3-2-增" aria-label="Permalink to &quot;3.2 增&quot;">​</a></h3><p>除了查看当前选区信息，我们还可以使用<code>setSelection()</code>方法手动设置选区和光标位置，该方法有两个参数：</p><ul><li>index 选区开始位置</li><li>length 选区长度</li></ul><p>如果只设置第一个参数，将只设置光标位置，不选中文本：</p><pre><code>// 将光标定位到第10个字符后面
this.quill.setSelection(10);
</code></pre><p>两个参数同时设置将选中文本：</p><pre><code>// 选中第1到10个字符
this.quill.setSelection(0, 10);
</code></pre><p>选区和光标是后续操作的基础，所以该方法和<code>getSelection()</code>方法一样，是一个非常常用的方法。</p><h2 id="_4-小结" tabindex="-1">4 小结 <a class="header-anchor" href="#_4-小结" aria-label="Permalink to &quot;4 小结&quot;">​</a></h2><p>我们做一个简单的小结：</p><ul><li>对内容的控制 <ul><li>删除内容 deleteText(index, length)</li><li>查找内容 getText(index, length)</li><li>获取编辑器内容长度 getLength()</li><li>插入文本内容 insertText(index, text, format, value)</li><li>插入嵌入内容 insertEmbed(index, format, value)</li><li>使用纯文本替换内容 setText(text)</li><li>用 delta 数据替换现有内容 setContents(delta)</li><li>用 delta 更新内容 updateContents(delta)</li></ul></li><li>对格式的控制 <ul><li>删除格式 removeFormat(index, length)</li><li>查找单一格式 getFormat(index, length)</li><li>获取 Delta 格式 getContents(index, length)</li><li>设置选中文本的格式 format(format, value)</li><li>设置行格式 formatLine(index, length, format, value)</li><li>设置文本格式 formatText(index, length, format, value)</li></ul></li><li>对选区的控制 <ul><li>获取选区/光标信息 getSelection()</li><li>获取指定文本的相对定位 getBounds(index, range)</li><li>设置选区/光标 setSelection(index, range)</li></ul></li></ul><h2 id="_5-案例-查找替换功能" tabindex="-1">5 案例：查找替换功能 <a class="header-anchor" href="#_5-案例-查找替换功能" aria-label="Permalink to &quot;5 案例：查找替换功能&quot;">​</a></h2><p>最后我们用一个查找替换的案例来温故下之前介绍过的 API。</p><pre><code>// 待查找文本
const str = &#39;Quill&#39;;
const length = str.length;

// 匹配目标文本的正则
const reg = new RegExp(str, &#39;g&#39;);

let match;
while ((match = reg.exec(this.quill.getText())) !== null) {
  // 目标文本在文档中的位置
  const index = match.index;
  
  // 匹配到目标文本之后，我们可以对该文本做高亮或替换的处理
  
  // 高亮
  this.quill.formatText(index, length, &#39;background&#39;, &#39;#ef0fff&#39;);
  
  // 替换
  this.quill.deleteText(index, length);
  this.quill.insertText(index, &#39;QuillJS&#39;, &#39;link&#39;, &#39;https://quilljs.com/&#39;);
}
</code></pre><p><code>查找替换</code>动画演示效果：</p><p><img src="`+x+'" alt="2024-01-20 13.13.57.gif"></p><p>深入浅出 Quill 系列之使用篇到此结束，相信你已经能够灵活使用 Quill 搭建自己的富文本编辑器，为了帮助大家更深入地理解 Quill，接下来我将会开始解析 Quill 的实现原理，敬请期待！</p>',145);function _(b,f,T,k,P,Q){const e=l("EditInfo");return i(),n("div",null,[m,o(e,{time:"2021年07月08日 07:39",title:"阅读 3703 ·  点赞 37 ·  评论 20 ·  收藏 43"})])}const C=t(q,[["render",_]]);export{v as __pageData,C as default};
