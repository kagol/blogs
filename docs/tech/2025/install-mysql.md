# macOS 和 Windows 操作系统下如何安装和启动 MySQL / Redis 数据库

你好，我是 Kagol，个人公众号：`前端开源星球`（欢迎关注我，分享更多前端开源知识）。

[TinyPro](https://github.com/opentiny/tiny-pro) 后台管理系统的 NestJS 后端依赖 MySQL 和 Redis 数据库，本文主要带大家安装和启动 MySQL 和 Redis 数据库。

## macOS

如果你使用的是 macOS 操作系统，安装 MySQL 和 Redis 数据库将变得非常简单，只需要一行命令即可。

### MySQL

安装 MySQL：

```bash
$ brew install mysql
```

查看是否安装成功：

```bash
$ mysql --version
mysql  Ver 9.2.0 for macos13.7 on x86_64 (Homebrew)
```

启动 MySQL：

```bash
$ brew services start mysql
==> Successfully started `mysql` (label: homebrew.mxcl.mysql)
```

连接 MySQL 数据库：

```bash
$ mysql -u root -p
```

退出 MySQL 终端：

```bash
mysql> exit
Bye
```

停止数据库：

```bash
$ brew services stop mysql
Stopping `mysql`... (might take a while)
==> Successfully stopped `mysql` (label: homebrew.mxcl.mysql)
```

### Redis

得益于 macOS 的 Homebrew 软件包管理器，Redis 数据库的安装和启动和 MySQL 一样简单。

安装 Redis：

```bash
$ brew install redis
```

查看 Redis 是否安装成功：

```bash
$ redis-cli --version
redis-cli 7.2.7
```

启动 Redis：

```bash
$ brew services start redis
==> Successfully started `redis` (label: homebrew.mxcl.redis)
```

验证是否启动成功：

```bash
$ redis-cli
127.0.0.1:6379> ping
PONG
127.0.0.1:6379>
```

退出 Redis 终端：

    127.0.0.1:6379> exit

停止 Redis：

```bash
$ brew services stop redis
Stopping `redis`... (might take a while)
==> Successfully stopped `redis` (label: homebrew.mxcl.redis)
```

## Windows

如果你使用的是 Windows 操作系统，你需要先下载 MySQL 和 Redis 对应的软件包。

### MySQL

下载软件包：<https://downloads.mysql.com/archives/installer/>

![mysql下载.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/e17f002b0674402888de8477dbff775e~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239976&x-orig-sign=0PMJReIqd106XfB2T8OO1EtVZZI%3D)

点击文件：`mysql-installer-community-8.0.40.0.msi` 进行安装。

安装完成之后，在终端中执行以下命令连接数据库。

```bash
$ mysql -u root -p
```

### Redis

下载软件包：<https://github.com/redis-windows/redis-windows/releases>

![redis下载.png](https://p0-xtjj-private.juejin.cn/tos-cn-i-73owjymdk6/cc32b5af9287430bbd5cbe2a4347b5fa~tplv-73owjymdk6-jj-mark-v1:0:0:0:0:5o6Y6YeR5oqA5pyv56S-5Yy6IEAg5YmN56uv5byA5rqQ5pif55CD:q75.awebp?policy=eyJ2bSI6MywidWlkIjoiMTUwNDU5OTAyNjQ0NTE1MCJ9&rk3s=f64ab15b&x-orig-authkey=f32326d3454f2ac7e96d3d06cdbb035152127018&x-orig-expires=1769239976&x-orig-sign=qcAJc40oQCHcSF20LaNWelV6aYc%3D)

将文件：`Redis-7.4.2-Windows-x64-cygwin.zip` 进行解压。

点击文件：`redis-server.exe` 即可启动 Redis，不需要安装。

## 往期文章

*   [OpenTiny 开源社区招募贡献者啦！](https://juejin.cn/post/7485572202701799464)
*   [TinyPro Vue v1.1.0 正式发布：增加细粒度权限管理、页签模式、多级菜单，支持 Webpack/Vite/Rspack/Farm 多种构建工具](https://juejin.cn/post/7441231659394433039)
*   [优化永不止步：TinyVue v3.20.0 正式发布，更美观的官网UI，更友好的文档搜索，更强大的主题配置能力](https://juejin.cn/post/7445930510021656613)
*   [TinyEditor v3.25.0 正式发布！2025年第一个版本，增加标题列表导航、分隔线、多图多文件上传等实用特性](https://juejin.cn/post/7455243039655067657)

## 联系我们

GitHub：<https://github.com/opentiny/tiny-pro>（欢迎 Star ⭐）

官网：<https://opentiny.design/vue-pro>

个人博客：<https://kagol.github.io/blogs>

小助手微信：opentiny-official

公众号：OpenTiny

## 附录：MySQL 数据库基本操作

显示所有数据库：

```bash
mysql> show databases;
+--------------------+
| Database           |
+--------------------+
| demo_tiny_pro      |
| information_schema |
| mysql              |
| order_sys          |
| performance_schema |
| sys                |
+--------------------+
6 rows in set (0.09 sec)
```

创建数据库：

```bash
mysql> create database order_sys;
Query OK, 1 row affected (0.01 sec)
```

删除数据库：

```bash
mysql> drop database order_sys;
Query OK, 0 rows affected (0.01 sec)
```

使用数据库：

```bash
mysql> use order_sys;
Reading table information for completion of table and column names
You can turn off this feature to get a quicker startup with -A

Database changed
```

显示当前数据库下的所有数据表：

```bash
mysql> show tables;
+---------------------+
| Tables_in_order_sys |
+---------------------+
| lang                |
| menu                |
| order               |
| permission          |
| role                |
| role_menu           |
| role_permission     |
| user                |
| user_role           |
+---------------------+
9 rows in set (0.00 sec)
```

从数据表中查询数据：

```bash
mysql> select id,name from menu;
+----+---------------+
| id | name          |
+----+---------------+
|  1 | Board         |
|  2 | Home          |
|  3 | Work          |
|  4 | List          |
|  5 | Table         |
|  6 | Form          |
|  7 | Base          |
|  8 | Step          |
|  9 | Profile       |
| 10 | Detail        |
+----+---------------+
10 rows in set (0.00 sec)
```


<EditInfo time="2025-04-04 15:02" title="4584展现 · 209阅读 · 2点赞 · 0评论 · 1收藏" />