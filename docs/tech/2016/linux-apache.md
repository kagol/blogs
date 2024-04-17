# Linux下服务器环境的搭建和配置之一——Apache篇



最近一个多月(2016-06-20开始至今)，一直在忙海外广告平台FAQ系统的开发，既要负责服务器环境的搭建，又要写前端，还要写后台和数据库，甚至还要考虑产品需求和设计。所以是一个很大的挑战，对自身也是一个很好的锻炼机会，必须全力以赴，这一个多月几乎每天加班到晚上9点多才回家，有时周末也会来加班。陪女票的时间就少了，Sorry~My Dear~，等忙完这一阵子，闲下来打算陪亲去四川九寨沟玩个十天八天的，放松下心情~

　　闲言少叙，这一系列的文章主要聊聊自己这段时间搭建服务器环境的经验和踩过的坑，这一块也是我的薄弱项，估计写得内容不深，主要是给初学者看的，大神勿喷哈~

------------------------------------------------------------------- 华丽的分割线 ---------------------------------------------------------------------------

我的Linux系统版本是：
```
# cat /etc/redhat-release
CentOS Linux release 6.2 (Final)
```
 

 
![image](https://user-images.githubusercontent.com/9566362/227754261-1e7d4bac-0246-4105-b502-2982f9cea32b.png)



 

 

(一)下载Apache
　　Apache官网：http://httpd.apache.org/，下载地址：http://httpd.apache.org/download.cgi，或者直接点击[这里](http://mirrors.cnnic.cn/apache//httpd/httpd-2.4.23.tar.gz)下载。

　　下载下来是一个源码的压缩包：httpd-2.4.23.tar.gz。

(二)安装Apache
　　1.解压

```
tar zxvf httpd-2.4.23.tar.gz
cd httpd-2.4.23
```
　　2.检查环境，生成 Makefile 文件

```
./configure --prefix=/usr/local/apache --sysconfdir=/usr/local/apache/conf --with-apr=/usr/local/apr-1.4.5 --with-apr-util=/usr/local/apr-util-1.3.12  --with-pcre=/usr/local/pcre  --enable-module=so
```
　　3.编译

```
make
```
　　4.安装

```
make install
```
　　安装完之后，可以使用

```
# httpd -v
Server version: Apache/2.4.12 (Unix)
Server built:   Jul 23 2016 16:18:26
```
　　查看 Apache 的版本号，当然也可以验证 Apache 是否成功安装。

　　5.注意

　　Apache的安装依赖于以下三个模块：

　　(1)[apr-1.4.5.tar.gz](http://archive.apache.org/dist/apr/apr-1.4.5.tar.gz)

　　(2)[apr-util-1.3.12.tar.gz](http://archive.apache.org/dist/apr/apr-util-1.3.12.tar.gz)

　　(3)[pcre-8.10.zip](http://jaist.dl.sourceforge.net/project/pcre/pcre/8.10/pcre-8.10.zip)

　　需要先下载并解压。

(三)Apache服务器的配置
　　默认 Apache 的配置文件在安装目录下的：/usr/local/apache/conf/httpd.conf。

　　主要配置以下字段，其他的默认就好：

```
Listen ip:8080

Include conf/vhosts/*.conf

LoadModule unixd_module modules/mod_unixd.so
LoadModule access_compat_module modules/mod_access_compat.so
LoadModule authz_host_module modules/mod_authz_host.so
LoadModule authz_core_module modules/mod_authz_core.so
LoadModule dir_module modules/mod_dir.so
LoadModule log_config_module modules/mod_log_config.so
LoadModule mime_module modules/mod_mime.so
#支持PHP
LoadModule php5_module modules/libphp5.so
AddType application/x-httpd-php .php

ServerName 127.0.0.1:8080

DocumentRoot "/usr/local/apache/htdocs"

<Directory "/usr/local/apache/htdocs">
    Options Indexes FollowSymLinks
    AllowOverride All
    Require all granted
</Directory>

<IfModule dir_module>
    DirectoryIndex index.php index.html
</IfModule>
```
 

　　下面是 httpd-vhosts.conf 文件：

```
<VirtualHost *:8080>

        ServerName XXX.XXX.com
        DocumentRoot "/usr/local/apache/htdocs"

        <Directory "/usr/local/apache/htdocs">
            Options Indexes FollowSymLinks
            AllowOverride none
            Order allow,deny
            Allow from all
            DirectoryIndex index.php index.html
        </Directory>

        ProxyPass /feedback http://ip:8000/feedback
        ProxyPassReverse /feedback http://ip:8000/feedback

</VirtualHost>
```
　　其中 ProxyPass 这两行是配置代理和反向代理，用于访问其他域的资源。

(四)Apache服务器的启动、停止和重启
　　启动：apachectl start

　　停止：apachectl stop

　　重启：apachectl restart

　　使用 apachectl 命令之前要把 Apache 的 bin 目录配置到环境变量里：

　　在 /etc/profile 的最后一行加上：

export PATH="/usr/local/apache/bin:$PATH"
　　保存后，输入：

source /etc/profile
　　使更改生效。

　　启动之后，可以使用：

```
# ps -ef | grep httpd
root      2827     1  0 Jul27 ?        00:00:08 /usr/local/apache/bin/httpd --version
daemon    2828  2827  0 Jul27 ?        00:00:00 /usr/local/apache/bin/httpd --version
daemon    2829  2827  0 Jul27 ?        00:00:00 /usr/local/apache/bin/httpd --version
daemon    2830  2827  0 Jul27 ?        00:00:00 /usr/local/apache/bin/httpd --version
root     23135 19779  0 12:09 pts/0    00:00:00 grep httpd
daemon   28164  2827  0 Jul27 ?        00:00:00 /usr/local/apache/bin/httpd --version
```
　　查看 Apache 服务启动了没有，或者也可以使用：

# netstat -lntp
Active Internet connections (only servers)
Proto Recv-Q Send-Q Local Address               Foreign Address             State       PID/Program name           
tcp        0      0 ip:8080           0.0.0.0:*                   LISTEN      2827/httpd
 

(五)可以遇到的问题和相应的解决方案
　　问题1：

AH00557: httpd: apr_sockaddr_info_get() failed for AD
AH00558: httpd: Could not reliably determine the server's fully qualified domain name, using 127.0.0.1. Set the 'ServerName' directive globally to suppress this message
　　解决方案：

　　上面报了两个错误，分别解决：

　　(1)AH00557: httpd: apr_sockaddr_info_get() failed for AD

echo ip > /etc/hostname
/bin/hostname -F /etc/hostname
apachectl restart
　　(2)AH00558: httpd: Could not reliably determine the server's fully qualified domain name...

 　　/usr/local/apache/conf/httpd.conf 中：

ServerName localhost
 

　　问题2：

libc.so.6: version `GLIBC_2.14' not found
　　解决方案：

　　这时因为缺少glibc依赖模块，需要安装glibc。

　　(1)下载 [glibc-2.14.tar.gz](http://mirrors.ustc.edu.cn/gnu/libc/glibc-2.14.tar.gz)

　　(2)解压

tar zxvf glibc-2.14.tar.gz
cd glibc-2.14
　　(3)新建 build 目录

mkdir build
cd build
　　(4)运行 configure，并编译、安装

../configure --prefix=/usr/local/glibc
make -j4
make install

<EditInfo time="2016-07-08 22:34" title="阅读(1103)  评论(0)" />
