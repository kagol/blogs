import{_ as s,B as n,o as e,c as l,G as p,Q as t}from"./chunks/framework.1fee3549.js";const g=JSON.parse('{"title":"Angular 路由：懒加载、守卫、动态参数","description":"","frontmatter":{},"headers":[],"relativePath":"tech/2021/angular-routing-lazy-loading.md","filePath":"tech/2021/angular-routing-lazy-loading.md"}'),o={name:"tech/2021/angular-routing-lazy-loading.md"},c=t(`<h1 id="angular-路由-懒加载、守卫、动态参数" tabindex="-1">Angular 路由：懒加载、守卫、动态参数 <a class="header-anchor" href="#angular-路由-懒加载、守卫、动态参数" aria-label="Permalink to &quot;Angular 路由：懒加载、守卫、动态参数&quot;">​</a></h1><p><img src="https://user-images.githubusercontent.com/9566362/201514708-f3f8124d-0967-42b6-b100-6ecb6dcf7d94.png" alt="image"></p><h2 id="引言" tabindex="-1">引言 <a class="header-anchor" href="#引言" aria-label="Permalink to &quot;引言&quot;">​</a></h2><p>路由是将URL请求映射到具体代码的一种机制，在网站的模块划分、信息架构中扮演了重要的角色，而Angular的路由能力非常强大，我们一起来看看吧。</p><h2 id="路由懒加载" tabindex="-1">路由懒加载 <a class="header-anchor" href="#路由懒加载" aria-label="Permalink to &quot;路由懒加载&quot;">​</a></h2><p>Angular可以根据路由，动态加载相应的模块代码，这个功能是性能优化的利器。</p><p>为了加快首页的渲染速度，我们可以设计如下的路由，让首页尽量保持简洁、清爽：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">const routes: Routes = [</span></span>
<span class="line"><span style="color:#babed8;">  {</span></span>
<span class="line"><span style="color:#babed8;">    path: &#39;&#39;,</span></span>
<span class="line"><span style="color:#babed8;">    children: [</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        path: &#39;list&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        loadChildren: () =&gt; import(&#39;./components/list/list.module&#39;).then(m =&gt; m.ListModule),</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      {</span></span>
<span class="line"><span style="color:#babed8;">        path: &#39;detail&#39;,</span></span>
<span class="line"><span style="color:#babed8;">        loadChildren: () =&gt; import(&#39;./components/detail/detail.module&#39;).then(m =&gt; m.DetailModule),</span></span>
<span class="line"><span style="color:#babed8;">      },</span></span>
<span class="line"><span style="color:#babed8;">      ...</span></span>
<span class="line"><span style="color:#babed8;">    ],</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">];</span></span></code></pre></div><p>首页只有一些简单的静态元素，而其他页面，比如列表、详情、配置等模块都用<code>loadChildren</code>动态加载。</p><p>效果如下：</p><p><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60318b1dcc7345d385103108a1608ba4~tplv-k3u1fbpfcp-watermark.image" alt="路由懒加载.gif"></p><p>其中的<code>components-list-list-module-ngfactory.js</code>文件，只有当访问<code>/list</code>路由时才会加载。</p><h2 id="路由守卫" tabindex="-1">路由守卫 <a class="header-anchor" href="#路由守卫" aria-label="Permalink to &quot;路由守卫&quot;">​</a></h2><p>当我们访问或切换路由时，会加载相应的模块和组件，路由守卫可以理解为在路由加载前后的钩子，最常见的是进入路由的守卫和离开路由的守卫：</p><ul><li>canActivate 进入守卫</li><li>canDeactivate 离开守卫</li></ul><p>比如我们想在用户进入详情页之前，判断他是否有权限，就可以使用<code>canActivate</code>守卫。</p><h3 id="增加路由守卫" tabindex="-1">增加路由守卫 <a class="header-anchor" href="#增加路由守卫" aria-label="Permalink to &quot;增加路由守卫&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  path: &#39;detail&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  loadChildren: () =&gt; import(&#39;./components/detail/detail.module&#39;).then(m =&gt; m.DetailModule),</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 路由守卫</span></span>
<span class="line"><span style="color:#babed8;">  canActivate: [AuthGuard],</span></span>
<span class="line"><span style="color:#babed8;">},</span></span></code></pre></div><h3 id="编写守卫逻辑" tabindex="-1">编写守卫逻辑 <a class="header-anchor" href="#编写守卫逻辑" aria-label="Permalink to &quot;编写守卫逻辑&quot;">​</a></h3><p>使用CLI命令创建路由守卫模块：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ng g guard auth</span></span></code></pre></div><p>auth.guard.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { Injectable } from &#39;@angular/core&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from &#39;@angular/router&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { Observable } from &#39;rxjs&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { DetailService } from &#39;./detail.service&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">@Injectable({</span></span>
<span class="line"><span style="color:#babed8;">  providedIn: &#39;root&#39;</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">export class AuthGuard implements CanActivate {</span></span>
<span class="line"><span style="color:#babed8;">  constructor(</span></span>
<span class="line"><span style="color:#babed8;">    private detailService: DetailService,</span></span>
<span class="line"><span style="color:#babed8;">  ) {}</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  canActivate(</span></span>
<span class="line"><span style="color:#babed8;">    route: ActivatedRouteSnapshot,</span></span>
<span class="line"><span style="color:#babed8;">    state: RouterStateSnapshot): Observable&lt;boolean | UrlTree&gt; | Promise&lt;boolean | UrlTree&gt; | boolean | UrlTree {</span></span>
<span class="line"><span style="color:#babed8;">    return new Observable(observer =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">      // 鉴权数据从后台接口异步获取</span></span>
<span class="line"><span style="color:#babed8;">      this.detailService.getDetailAuth().subscribe((hasPermission: boolean) =&gt; {</span></span>
<span class="line"><span style="color:#babed8;">        observer.next(hasPermission);</span></span>
<span class="line"><span style="color:#babed8;">        observer.complete();</span></span>
<span class="line"><span style="color:#babed8;">      });</span></span>
<span class="line"><span style="color:#babed8;">    });</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h3 id="获取权限service" tabindex="-1">获取权限service <a class="header-anchor" href="#获取权限service" aria-label="Permalink to &quot;获取权限service&quot;">​</a></h3><p>获取权限的service：</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ng g s detail</span></span></code></pre></div><p>detail.service.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import {Injectable} from &#39;@angular/core&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { HttpClient } from &#39;@angular/common/http&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">@Injectable({ providedIn: &#39;root&#39; })</span></span>
<span class="line"><span style="color:#babed8;">export class DetailService {</span></span>
<span class="line"><span style="color:#babed8;">  constructor(</span></span>
<span class="line"><span style="color:#babed8;">    private http: HttpClient,</span></span>
<span class="line"><span style="color:#babed8;">  ) { }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  getDetailAuth(): any {</span></span>
<span class="line"><span style="color:#babed8;">    return this.http.get(&#39;/detail/auth&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><p>效果如下：</p><p><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4a75592577f456783988c5db717feb3~tplv-k3u1fbpfcp-watermark.image" alt="路由守卫.gif"></p><p>由于我们对<code>/detail</code>路由增加了守卫，不管是从别的路由切换到<code>/detail</code>路由，还是直接访问<code>/detail</code>路由，都无法进入该页面。</p><h2 id="动态路由参数" tabindex="-1">动态路由参数 <a class="header-anchor" href="#动态路由参数" aria-label="Permalink to &quot;动态路由参数&quot;">​</a></h2><p>在路由中带参数有很多中方法：</p><ul><li>在path中带参数</li><li>在queryString中带参数</li><li>不通过链接带参数</li></ul><h3 id="在path中带参" tabindex="-1">在path中带参 <a class="header-anchor" href="#在path中带参" aria-label="Permalink to &quot;在path中带参&quot;">​</a></h3><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  path: &#39;user/:id&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  loadChildren: () =&gt; import(&#39;./components/user/user.module&#39;).then(m =&gt; m.UserModule),</span></span>
<span class="line"><span style="color:#babed8;">},</span></span></code></pre></div><h3 id="在querystring中带参数" tabindex="-1">在queryString中带参数 <a class="header-anchor" href="#在querystring中带参数" aria-label="Permalink to &quot;在queryString中带参数&quot;">​</a></h3><p>html传参</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">&lt;a [routerLink]=&quot;[&#39;/list&#39;]&quot; [queryParams]=&quot;{id: &#39;1&#39;}&quot;&gt;...&lt;/a&gt;</span></span></code></pre></div><p>ts传参</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">this.router.navigate([&#39;/list&#39;],{ queryParams: { id: &#39;1&#39; });</span></span></code></pre></div><h3 id="通过data传递静态参数" tabindex="-1">通过data传递静态参数 <a class="header-anchor" href="#通过data传递静态参数" aria-label="Permalink to &quot;通过data传递静态参数&quot;">​</a></h3><blockquote><p>注意：通过data传递的路由参数只能是静态的</p></blockquote><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  path: &#39;detail&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  loadChildren: () =&gt; import(&#39;./components/detail/detail.module&#39;).then(m =&gt; m.DetailModule),</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 静态参数</span></span>
<span class="line"><span style="color:#babed8;">  data: {</span></span>
<span class="line"><span style="color:#babed8;">    title: &#39;详情&#39;</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">},</span></span></code></pre></div><h3 id="通过resolve传递动态参数" tabindex="-1">通过resolve传递动态参数 <a class="header-anchor" href="#通过resolve传递动态参数" aria-label="Permalink to &quot;通过resolve传递动态参数&quot;">​</a></h3><p>data只能传递静态参数，那我想通过路由传递从后台接口获取到的动态参数，该怎么办呢？</p><p>答案是通过<code>resolve</code>配置。</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">{</span></span>
<span class="line"><span style="color:#babed8;">  path: &#39;detail&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  loadChildren: () =&gt; import(&#39;./components/detail/detail.module&#39;).then(m =&gt; m.DetailModule),</span></span>
<span class="line"><span style="color:#babed8;">  </span></span>
<span class="line"><span style="color:#babed8;">  // 动态路由参数</span></span>
<span class="line"><span style="color:#babed8;">  resolve: {</span></span>
<span class="line"><span style="color:#babed8;">    detail: DetailResolver</span></span>
<span class="line"><span style="color:#babed8;">  },</span></span>
<span class="line"><span style="color:#babed8;">},</span></span></code></pre></div><h4 id="创建resolver" tabindex="-1">创建Resolver <a class="header-anchor" href="#创建resolver" aria-label="Permalink to &quot;创建Resolver&quot;">​</a></h4><p>detail.resolver.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { Injectable } from &#39;@angular/core&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from &#39;@angular/router&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { DetailService } from &#39;./detail.service&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">@Injectable({ providedIn: &#39;root&#39; })</span></span>
<span class="line"><span style="color:#babed8;">export class DetailResolver implements Resolve&lt;any&gt; {</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  constructor(private detailService: DetailService) { }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {</span></span>
<span class="line"><span style="color:#babed8;">    return this.detailService.getDetail();</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="在服务中增加获取详情数据的方法" tabindex="-1">在服务中增加获取详情数据的方法 <a class="header-anchor" href="#在服务中增加获取详情数据的方法" aria-label="Permalink to &quot;在服务中增加获取详情数据的方法&quot;">​</a></h4><p>detail.service.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import {Injectable} from &#39;@angular/core&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { HttpClient } from &#39;@angular/common/http&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">@Injectable({ providedIn: &#39;root&#39; })</span></span>
<span class="line"><span style="color:#babed8;">export class DetailService {</span></span>
<span class="line"><span style="color:#babed8;">  constructor(</span></span>
<span class="line"><span style="color:#babed8;">    private http: HttpClient,</span></span>
<span class="line"><span style="color:#babed8;">  ) { }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  getDetailAuth(): any {</span></span>
<span class="line"><span style="color:#babed8;">    return this.http.get(&#39;/detail/auth&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  // 增加的</span></span>
<span class="line"><span style="color:#babed8;">  getDetail(): any {</span></span>
<span class="line"><span style="color:#babed8;">    return this.http.get(&#39;/detail&#39;);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div><h4 id="获取动态参数" tabindex="-1">获取动态参数 <a class="header-anchor" href="#获取动态参数" aria-label="Permalink to &quot;获取动态参数&quot;">​</a></h4><p>创建组件</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">ng g c detial</span></span></code></pre></div><p>detail.component.ts</p><div class="language-"><button title="Copy Code" class="copy"></button><span class="lang"></span><pre class="shiki material-theme-palenight"><code><span class="line"><span style="color:#babed8;">import { Component, OnInit } from &#39;@angular/core&#39;;</span></span>
<span class="line"><span style="color:#babed8;">import { ActivatedRoute } from &#39;@angular/router&#39;;</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">@Component({</span></span>
<span class="line"><span style="color:#babed8;">  selector: &#39;app-detail&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  templateUrl: &#39;./detail.component.html&#39;,</span></span>
<span class="line"><span style="color:#babed8;">  styleUrls: [&#39;./detail.component.scss&#39;]</span></span>
<span class="line"><span style="color:#babed8;">})</span></span>
<span class="line"><span style="color:#babed8;">export class DetailComponent implements OnInit {</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  constructor(</span></span>
<span class="line"><span style="color:#babed8;">    private route: ActivatedRoute,</span></span>
<span class="line"><span style="color:#babed8;">  ) { }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">  ngOnInit(): void {</span></span>
<span class="line"><span style="color:#babed8;">    // 和获取静态参数的方式是一样的</span></span>
<span class="line"><span style="color:#babed8;">    const detail = this.route.snapshot.data.detail;</span></span>
<span class="line"><span style="color:#babed8;">    console.log(&#39;detail:&#39;, detail);</span></span>
<span class="line"><span style="color:#babed8;">  }</span></span>
<span class="line"><span style="color:#babed8;"></span></span>
<span class="line"><span style="color:#babed8;">}</span></span></code></pre></div>`,59);function i(r,d,b,h,u,y){const a=n("EditInfo");return e(),l("div",null,[c,p(a,{time:"2021年06月05日 08:36",title:"阅读 1949 ·  点赞 20 ·  评论 10 ·  收藏 15"})])}const v=s(o,[["render",i]]);export{g as __pageData,v as default};
