# Nginx配置HTTPS


## 1 Nginx配置HTTP
在服务器端，用Nginx配置一个静态文件很容易，只需要在nginx.conf文件中加上：
```
server {
    listen ip:80;
    server_name XX.XX.com;
    server_name_in_redirect off;
    charset UTF-8;

    location / {
        root /data/apache_htdocs/apply/;
        index index.html index.htm;
        expires 1d;
    }
}
```
## 2 获取HTTPS证书
1.生成密钥key(server.key)
```
$ openssl genrsa -des3 -out server.key 2048
```
以上命令会生成一个server.key文件

使用以下命令可以跳过输入密码的步骤：
```
$ openssl rsa -in server.key -out server.key
```
2.创建服务器证书的申请文件(server.csr)
```
$ openssl req -new -key server.key -out server.csr
```
其中Country Name填CN，Common Name填主机名（https://XX.XX.com/...，这里的主机名为XX.XX.com），其他都可不填。

3.创建CA证书(ca.crt/ca.srl)
```
$ openssl req -new -x509 -key server.key -out ca.crt -days 3650
```
这个证书用来给自己的服务器证书签名

4.创建服务器证书(server.crt)
$ openssl x509 -req -days 3650 -in server.csr -CA ca.crt -CAkey server.key -CAcreateserial -out server.crt
经过以上步骤，一共生成了5个文件：

ca.crt ca.srl server.crt server.csr server.key
其中server.crt和server.key就是Nginx需要的证书文件

## 3 配置Nginx
Nignx配置文件nginx.conf中加入：
```
server {
    listen       ip:443 ssl;
    server_name  XX.XX.com;

    ssl_certificate      /data/XX/keys/server.crt;
    ssl_certificate_key  /data/XX/keys/server.key;

    ssl_session_cache    shared:SSL:1m;
    ssl_session_timeout  5m;

    ssl_ciphers  HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers  on;

    location / {
        root   /data/apache_htdocs/admin/;
        index  index.html index.htm;
        expires 1d;
    }
}
```
配置好之后运行 nginx -t 检查配置是否有语法错误

没问题的话运行 nginx -s reload 重新加载配置文件

运行 netstat -lntp 可以查看新增了一个443端口的nginx服务：
```
tcp        0      0 ip:443            0.0.0.0:*                   LISTEN      pid/nginx
```

## 4 遇到的问题及解决方案
1.问题一：缺少ngx_http_ssl_module模块
nginx -t 时报错如下：
```
nginx: [emerg] the "ssl" parameter requires ngx_http_ssl_module
```
解决方案：

利用Nginx源码编译一个带ngx_http_ssl_module模块的nginx，替换掉现有的nginx，具体步骤如下

（1）查看现在的nginx编译参数
```
$ /usr/local/nginx/sbin/nginx -V
nginx version: nginx/1.8.0
built by gcc 4.4.6 20110731 (Red Hat 4.4.6-4) (GCC)
built with OpenSSL 1.0.1m 19 Mar 2015
TLS SNI support enabled
configure arguments: --prefix=/usr/local/nginx --with-pcre=/usr/local/pcre-8.10
```
（2）利用源码重新编译nginx
```
$ cd /usr/local/nginx-1.8.0
$ ./configure --prefix=/usr/local/nginx --with-pcre=/usr/local/pcre-8.10 --with-http_ssl_module
```
其中--with-http_ssl_module是新加的参数

配置完运行make进行编译，注意不需要运行make install命令

（3）将新编译生成的nginx替换现有的nginx

覆盖之前先备份现有的nginx：
```
$ cp /usr/local/nginx/sbin/nginx /usr/local/nginx/sbin/nginx.bak
```
停止nginx服务：
```
$ /usr/local/nginx/sbin/nginx -s stop
```
替换现有的nginx：
```
$ cp ./objs/nginx /usr/local/nginx/sbin/
```
启动nginx：
```
$ /usr/local/nginx/sbin/nginx
```

2.问题二：缺少OPENSSL或PCRE模块
./configure或make Nginx时报错：
```
./configure: error: the HTTP rewrite module requires the PCRE library.
```
解决方案：

源码安装openssl和pcre

源码下载地址

openssl: https://www.openssl.org/（直接下载：https://www.openssl.org/source/openssl-1.1.1.tar.gz）

pcre: https://www.pcre.org/（直接下载：ftp://ftp.csx.cam.ac.uk/pub/software/programming/pcre/）

源码安装：

（1）解压
```
$ tar zxvf pcre-8.42.tar.gz
$ cd pcre-8.42
```
（2）配置
```
$ ./configure --prefix=/usr/local/pcre
```
（3）编译
```
$ make
```
（4）安装
```
$ make install
```
编译和安装可以合成一步：make && make install

openssl的安装同理

<EditInfo time="2018-09-12 15:54" title="阅读(314) 评论(0) 推荐(0)" />
