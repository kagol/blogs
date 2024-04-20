# Angular 路由：懒加载、守卫、动态参数

![image](https://user-images.githubusercontent.com/9566362/201514708-f3f8124d-0967-42b6-b100-6ecb6dcf7d94.png)

## 引言

路由是将URL请求映射到具体代码的一种机制，在网站的模块划分、信息架构中扮演了重要的角色，而Angular的路由能力非常强大，我们一起来看看吧。

## 路由懒加载

Angular可以根据路由，动态加载相应的模块代码，这个功能是性能优化的利器。

为了加快首页的渲染速度，我们可以设计如下的路由，让首页尽量保持简洁、清爽：

```ts
const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'list',
        loadChildren: () => import('./components/list/list.module').then(m => m.ListModule),
      },
      {
        path: 'detail',
        loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule),
      },
      ...
    ],
  },
];
```

首页只有一些简单的静态元素，而其他页面，比如列表、详情、配置等模块都用`loadChildren`动态加载。

效果如下：

![路由懒加载.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/60318b1dcc7345d385103108a1608ba4~tplv-k3u1fbpfcp-watermark.image)

其中的`components-list-list-module-ngfactory.js`文件，只有当访问`/list`路由时才会加载。

## 路由守卫

当我们访问或切换路由时，会加载相应的模块和组件，路由守卫可以理解为在路由加载前后的钩子，最常见的是进入路由的守卫和离开路由的守卫：
- canActivate 进入守卫
- canDeactivate 离开守卫

比如我们想在用户进入详情页之前，判断他是否有权限，就可以使用`canActivate`守卫。

### 增加路由守卫

```ts
{
  path: 'detail',
  loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule),

  // 路由守卫
  canActivate: [AuthGuard],
},
```

### 编写守卫逻辑

使用CLI命令创建路由守卫模块：
```shell
ng g guard auth
```

auth.guard.ts
```ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DetailService } from './detail.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private detailService: DetailService,
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable(observer => {
      // 鉴权数据从后台接口异步获取
      this.detailService.getDetailAuth().subscribe((hasPermission: boolean) => {
        observer.next(hasPermission);
        observer.complete();
      });
    });
  }
}
```

### 获取权限service

获取权限的service：
```shell
ng g s detail
```

detail.service.ts
```ts
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DetailService {
  constructor(
    private http: HttpClient,
  ) { }

  getDetailAuth(): any {
    return this.http.get('/detail/auth');
  }
}
```

效果如下：

![路由守卫.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c4a75592577f456783988c5db717feb3~tplv-k3u1fbpfcp-watermark.image)

由于我们对`/detail`路由增加了守卫，不管是从别的路由切换到`/detail`路由，还是直接访问`/detail`路由，都无法进入该页面。

## 动态路由参数

在路由中带参数有很多中方法：
- 在path中带参数
- 在queryString中带参数
- 不通过链接带参数

### 在path中带参

```ts
{
  path: 'user/:id',
  loadChildren: () => import('./components/user/user.module').then(m => m.UserModule),
},
```

### 在queryString中带参数

html传参

```html
<a [routerLink]="['/list']" [queryParams]="{id: '1'}">...</a>
```

ts传参

```ts
this.router.navigate(['/list'],{ queryParams: { id: '1' });
```

### 通过data传递静态参数

> 注意：通过data传递的路由参数只能是静态的

```ts
{
  path: 'detail',
  loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule),
  
  // 静态参数
  data: {
    title: '详情'
  }
},
```

### 通过resolve传递动态参数

data只能传递静态参数，那我想通过路由传递从后台接口获取到的动态参数，该怎么办呢？

答案是通过`resolve`配置。

```ts
{
  path: 'detail',
  loadChildren: () => import('./components/detail/detail.module').then(m => m.DetailModule),
  
  // 动态路由参数
  resolve: {
    detail: DetailResolver
  },
},
```

#### 创建Resolver

detail.resolver.ts
```ts
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DetailService } from './detail.service';

@Injectable({ providedIn: 'root' })
export class DetailResolver implements Resolve<any> {

  constructor(private detailService: DetailService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
    return this.detailService.getDetail();
  }
}
```

#### 在服务中增加获取详情数据的方法

detail.service.ts
```ts
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class DetailService {
  constructor(
    private http: HttpClient,
  ) { }

  getDetailAuth(): any {
    return this.http.get('/detail/auth');
  }

  // 增加的
  getDetail(): any {
    return this.http.get('/detail');
  }
}
```

#### 获取动态参数

创建组件

```shell
ng g c detial
```

detail.component.ts
```ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    // 和获取静态参数的方式是一样的
    const detail = this.route.snapshot.data.detail;
    console.log('detail:', detail);
  }

}
```

<EditInfo time="2021年06月05日 08:36" title="阅读 1949 ·  点赞 20 ·  评论 10 ·  收藏 15" />
