# 大厂是如何用DevCloud流水线实现自动化部署Web应用的？

![image](https://user-images.githubusercontent.com/9566362/201151592-deb82a8c-e74b-448c-93a3-431e1c86ba08.png)

## 前言

本文以[DevUI组件库](https://github.com/devcloudfe/ng-devui)网站为例，介绍如何用DevCloud流水线自动化部署一个前端应用。

本文可以认为是[《手把手教你搭建自己的Angular组件库》](https://juejin.im/post/6844904158391173128)的续集，当我们搭建好组件库之后，如何将其网站部署到服务器。

## 1 搭建服务器环境

本机开发完代码，并push到远程代码仓库，还需要部署到服务器上，用户才能访问到。

因此为了部署你的应用，第一步需要购买一台服务器，为了节省成本，一般都会购买按需使用的云服务器，如何申请云服务器就不介绍了，下面介绍如何在Linux服务器搭建Nginx服务。

### 1.1 安装Nginx

Web应用通常都会使用Nginx作为反向代理。

为了让用户可以访问我们的应用，需要在服务器安装Nginx应用。

我们使用源码编译方式安装最新版本的Nginx，主要分成以下步骤：
- 下载
- 解压
- 配置
- 编译
- 安装

#### 1.1.1 下载Nginx源码

先在[Nginx官网下载页](http://nginx.org/en/download.html)找到Linux版本的Nginx源码包地址，然后使用wget命令下载Nginx源码安装包。
```
wget http://nginx.org/download/nginx-1.18.0.tar.gz
```

#### 1.1.2 解压

使用tar命令进行解压。
```
tar -zxvf nginx-1.18.0.tar.gz
```

#### 1.1.3 配置

先进入nginx源码的根目录，然后执行configure配置脚本，这里只配置了nginx的安装目录。
```
cd nginx-1.18.0
./configure --prefix=/usr/local/nginx
```

执行完发现报错了，原来是缺少依赖库。

```
[root@ecs-kagol nginx-1.18.0]## ./configure --prefix=/usr/local/nginx
checking for OS
 + Linux 3.10.0-862.14.1.5.h428.eulerosv2r7.x86_64 x86_64
checking for C compiler ... found
 + using GNU C compiler
 + gcc version: 4.8.5 20150623 (EulerOS 4.8.5-28) (GCC)
checking for gcc -pipe switch ... found
...
checking for PCRE library in /usr/local/ ... not found
checking for PCRE library in /usr/include/pcre/ ... not found
checking for PCRE library in /usr/pkg/ ... not found
checking for PCRE library in /opt/local/ ... not found

./configure: error: the HTTP rewrite module requires the PCRE library.
You can either disable the module by using --without-http_rewrite_module
option, or install the PCRE library into the system, or build the PCRE library
statically from the source with nginx by using --with-pcre=<path> option.
```

主要需要安装`pcre`/`zlib`/`openssl`三个依赖库，我们使用yum包管理工具（类似Node的npm包管理工具）来安装。

```
yum -y install pcre-devel zlib-devel openssl-devel
```

安装完依赖库之后再次执行configure脚本，Nginx配置成功，配置结果如下：

```
...
checking for getaddrinfo() ... found
checking for PCRE library ... found
checking for PCRE JIT support ... found
checking for zlib library ... found
creating objs/Makefile

Configuration summary
  + using system PCRE library
  + OpenSSL library is not used
  + using system zlib library

  nginx path prefix: "/usr/local/nginx"
  nginx binary file: "/usr/local/nginx/sbin/nginx"
  nginx modules path: "/usr/local/nginx/modules"
  nginx configuration prefix: "/usr/local/nginx/conf"
  nginx configuration file: "/usr/local/nginx/conf/nginx.conf"
  nginx pid file: "/usr/local/nginx/logs/nginx.pid"
  nginx error log file: "/usr/local/nginx/logs/error.log"
  nginx http access log file: "/usr/local/nginx/logs/access.log"
  nginx http client request body temporary files: "client_body_temp"
  nginx http proxy temporary files: "proxy_temp"
  nginx http fastcgi temporary files: "fastcgi_temp"
  nginx http uwsgi temporary files: "uwsgi_temp"
  nginx http scgi temporary files: "scgi_temp"
```

我们注意到执行完configure配置脚本之后，生成了一个Makefile文件，该文件就是用来编译Nginx源码的。

#### 1.1.4 编译

相比配置，编译的步骤就简单多了，只需要执行make命令即可。

```
make
```

#### 1.1.5 安装
编译完之后就是安装了，这一步才会真正在/usr/local/nginx目录下生成相应的文件。
```
make install
```

安装完之后，在/usr/local/nginx目录下已经生成了运行Nginx应用需要的所有文件。

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/abdbbe97b390424682b6bab0771bbce1~tplv-k3u1fbpfcp-watermark.image)

#### 1.1.6 运行启动Nginx

执行nginx目录下的sbin/nginx就可以直接启动Nginx啦。

```
/usr/local/nginx/sbin/nginx
```

#### 1.1.7 验证是否启动成功

在本机浏览器中输入服务器的公网IP地址，即可访问Nginx应用。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/650d33ebc16e4fb8981949f1fbacd765~tplv-k3u1fbpfcp-watermark.image)

这里显示了Nginx的欢迎页面，等我们部署好自己的Web应用之后，这个网页将显示我们自己的网站首页。

## 2 手工部署流程

我们在本机开发完DevUI网站的代码之后，执行npn run build，这时将在dist目录得到DevUI网站的所有静态资源文件，可以先在本地用[anywhere](https://github.com/JacksonTian/anywhere)看下效果。

为了将其部署到服务器，并通过Nginx服务器访问，我们需要将这些文件上传到服务器的nginx目录，一个一个文件传肯定不现实，需要将其压缩打包，然后上传到服务器，最后解压到nginx的html目录就算部署完成。

Step 1: 压缩打包 tar

Step 2: 解压部署 deploy


### 2.1 压缩打包

npm run build构建出来的静态资源都存放在dist目录下，只需要执行以下命令即可生成tar压缩包：
```
tar czvf devui.tar.gz ./dist
```

### 2.2 解压部署

登录服务器，使用rz命令将上一步生成的tar包上传到Linux服务器，然后使用tar命令解压到nginx的html目录即可完成部署。
```
tar zxvf devui.tar.gz
```

如果每次开发完都需要手动执行以上步骤，将会非常麻烦，并且很容易出错。

为什么不将其自动化呢？

## 3 使用DevCloud流水线实现自动部署

[DevCloud](https://www.huaweicloud.com/devcloud/)是集华为研发实践、前沿研发理念、先进研发工具为一体的软件开发平台，为了实现Web应用的自动化部署，我们主要需要使用DevCloud的`流水线`/`编译构建`/`发布`/`部署`4个服务。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/68df4639a64c44e493c5b4ce484fe708~tplv-k3u1fbpfcp-watermark.image)

主要分成以下4个步骤：
1. 创建DevCloud项目
2. 创建流水线
3. 创建构建任务
4. 创建部署任务

### 3.1 创建DevCloud项目

由于DevCloud所有服务都是通过项目承载的，因此需要先创建下项目，这里创建一个看板项目。

先进入[DevCloud首页](https://devcloud.huaweicloud.com)，按以下步骤即可创建一个看板项目：
1. 点击右上角的创建项目
2. 选择看板项目
3. 输入项目名称
4. 确定

项目创建成功之后直接进入该项目首页，点击头部菜单`构建&发布`下的`流水线`按钮即可进行流水线首页。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/807655c573c84e2c9493099c6d52e648~tplv-k3u1fbpfcp-watermark.image)

### 3.2 创建流水线

在流水线首页的右上角有一个创建流水线的按钮，点击即可进入流水线的创建流程。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3a0b4990f79f45f1a5a7dbd7c5c2f476~tplv-k3u1fbpfcp-watermark.image)

创建一条流水线主要分成以下步骤：
- 输入流水线名称
- 选择模板，这里我们选择空模板
- 选择代码源，直接只用Github代码仓库即可
- 自定义工作流

#### 选择代码源

为了选择Github代码仓库的源，我们需要新增一个服务扩展点，获得Github的授权，这样DevCloud流水线这边才可以拉取Github的代码，进行构建、部署等步骤。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d23fbaa054a462783d6e767cd54b6fd~tplv-k3u1fbpfcp-watermark.image)

新增扩展点的步骤也很简单：
- 输入扩展点名称
- 进行OAuth授权

有了扩展点，就可以选择你的Github仓库作为代码源啦。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ab202d07fe1e42b3b21c710997890e1e~tplv-k3u1fbpfcp-watermark.image)

选完代码源就可以创建你的流水线啦。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/deedf6682dd7479ab7e74e1ced839254~tplv-k3u1fbpfcp-watermark.image)

可以新创建的流水线包含3个阶段，第一个阶段关联了一个Github的代码仓，第二个阶段是一个空的构建阶段，里面什么任务也没有，第三个阶段是一个不可编辑的发布仓库阶段。

这个流水线目前什么都做不了，我们需要往里面添加任务才能完成网站的自动化部署。

### 3.3 创建构建任务

回顾下之前的手工部署步骤：
1. 构建源代码
2. 压缩源代码
3. 上传软件包到服务器
4. 解压软件包到Nginx目录

因此我们首先需要在流水线中添加一个构建任务：
1. 在构建阶段添加一个构建类型的任务
2. 创建一个构建任务
3. 在流水线选择上一步创建好的流水线

#### 3.3.1 在构建阶段添加一个构建类型的任务

在构建阶段添加一个任务，然后在侧滑中选择构建类型，这时该类型下是没有构建任务的，因此没法选择，需要先创建构建任务。

#### 3.3.2 创建一个构建任务

在选择需要调度的任务中点击创建按钮，进入新建构建任务的页面，按照指引创建一个构建任务：
1. 输入构建任务名称
2. 选择我们之前创建的Entpoint实例，以及该示例下的Github仓库
3. 不使用模板，直接创建
4. 添加Npm构建和上传软件包道发布库这两个构建步骤（关键）
5. 配置构建参数


![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c7e4902ffd674830a9df2e290eed337d~tplv-k3u1fbpfcp-watermark.image)

##### Npm构建

该步骤直接使用默认的构建脚本命令，只需要增加打tar包的命令即可：
```
...

npm install ## 安装依赖库

npm run build ## 普通的NG CLI生产包构建命令

npm run tar ## 新增
```

tar命令：
```
"tar": "node scripts/tar.js",
```

tar.js 

```
const fs = require('fs');
const tar = require('tar');

fs.stat('./result', (error, stats) => {
  if (error) {
    fs.mkdirSync('./result'); // 不存在result目录则创建一个空的
  }

  tar.c({ gzip: true }, ['dist']) // 将dist目录下的文件全部打包
  .pipe(fs.createWriteStream('./result/devui.tar.gz')); // 将生成的tar包（devui.tar.gz）放到result目录下
});

```

##### 上传软件包到发布库

上一个Npm构建步骤已经将压缩包创建好了，这个任务的目的是将这个tar包上传到发布库，也就是之前流水线中的第3个阶段，方便部署时下载tar包到目标服务器。

该步骤主要需要填写构建包路径：
```
./result/devui.tar.gz
```

发布版本号和包名不要写死，从部署参数里拿，格式如下：
```
${releaseVersion}
```

其中`releaseVersion`就是下一步需要配置的构建参数。

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8dabed31d7bc43a2a44efa8920f135ee~tplv-k3u1fbpfcp-watermark.image)

##### 配置构建参数

codeBranch是默认的参数，我们需要增加releaseVersion和serviceName两个构建参数，一个用于每次构建时的版本号，另一个就是服务名。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3d796299d81b45888a879a4064c06896~tplv-k3u1fbpfcp-watermark.image)


#### 3.3.3 在流水线选择上一步创建好的流水线

回到流水线，就可以选择上一步创建好的流水线，保存即可。

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6022494d4f404448be102b4c1ce9e8d7~tplv-k3u1fbpfcp-watermark.image)

至此构建的步骤已经搞定了，我们可以跑一下试试。

跑完流水线我们就能在发布仓库看到我们的tar构建包：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4ac83c733bcf467b973ee8f886114816~tplv-k3u1fbpfcp-watermark.image)

有了构建包我们就可以拿它去服务器部署啦，当然我们肯定不会选择手工的方式部署，而是在流水线中创建一个部署任务，让所有过程自动化进行。

### 3.4 创建部署任务

在流水线中添加部署任务和添加构建任务差不多，只需要以下3步即可：
1. 添加一个新的阶段
2. 在该阶段中添加一个部署类型的任务
3. 创建一个部署任务（关键）
4. 在步骤2中选择步骤3中创建的部署任务

#### 创建一个部署任务

和创建构建任务类似：
1. 输入部署任务名称
2. 选择空白模板，直接创建
4. 添加选择部署来源和执行shell命令这两个构建步骤（关键）
5. 配置部署参数

##### 选择部署来源

关键是需要选择`主机组`，填写`软件包`和`部署目录`。

软件包就是之前发布仓库的软件包，直接从`/devui/${releaseVersion}`取即可，其中`${releaseVersion}`是部署参数，和之前的构建参数类似。

部署目录是要将tar压缩包上传到目标机器中的目录，我们传到`/devui`目录中。

主机组需要新建，选择主机组旁边的`新建`按钮，进入创建主机组页面，只需要以下步骤即可创建一个主机组：
1. 填写主机组名称
2. 添加主机（之前申请的ECS弹性云主机）

![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b0656480be848d7a2a01eda028b9b5d~tplv-k3u1fbpfcp-watermark.image)

添加主机需要填写的信息：
1. 主机名
2. 主机IP地址
3. 用户名（root）
4. 密码
5. 端口号（22）

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b52b9a32e9dd40c2a93198b54f14fb93~tplv-k3u1fbpfcp-watermark.image)

##### 执行shell命令

执行shell命令是当你已经把tar软件包上传到目标服务器之后，希望执行的shell命令，我们当然是希望将tar包解压出来喽。

执行以下shell即可：
```
rm -rf /usr/local/nginx/html/* ## 删除之前部署过的静态资源
tar zxvf /devui/${serviceName}.tar.gz -C /usr/local/nginx/html ## 解压tar包到nginx的html目录
mv /usr/local/nginx/html/dist/* /usr/local/nginx/html/
```

##### 配置部署参数

这里的部署参数和构建参数的配置方式是一样的，不再赘述。

添加好部署任务我们就可以跑下流水线，看下效果。

流水线跑完之后，四个阶段都会显示绿色：

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a33097307dbc468b8eccc5a1f5f9937b~tplv-k3u1fbpfcp-watermark.image)

部署完之后访问咱们的主机IP地址即可看到网站效果，和[DevUI官网](https://devui.design/)是一样的。

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c39367672cca41109561b150963bee87~tplv-k3u1fbpfcp-watermark.image)

### 3.5 定时任务

搭建完流水线，我们可以配置一个定时任务，每天或每周自动用指定分支跑流水线，完全不用人工干预。

为了保障版本质量，我们也可以在配置灰度部署策略，添加拨测任务，保障每一次部署现网都不出问题。

限于篇幅就不一一介绍了，感兴趣的小伙伴可以关注[DevCloud官网](https://www.huaweicloud.com/devcloud/)，里面详细地介绍了从需求规划到研发、测试、运维整套DevOps流程的玩法。

## 4 小结

本文详细地介绍如何将一个网站的Github仓库源码自动化部署到服务器。

先介绍申请服务器和搭建服务器环境，重点介绍在Linux服务器搭建Nginx服务的步骤；

然后简单介绍了手动部署流程；

最后详细介绍了如何利用DevCloud流水线工具，实现自动化部署。

## 加入我们
我们是DevUI团队，欢迎来这里和我们一起打造优雅高效的人机设计/研发体系。招聘邮箱：muyang2@huawei.com。

文/DevUI Kagol


往期文章推荐

[《现在开始为你的Angular应用编写测试 》](https://juejin.im/post/6885134113964523528)

[《Web界面深色模式和主题化开发》](https://juejin.im/post/6844904167761248263)

[《手把手教你搭建一个灰度发布环境》](https://juejin.im/post/6844904110601273357)



<EditInfo time="2020年10月27日 00:12" title="阅读 7931 ·  点赞 83 ·  评论 24 ·  收藏 99" />
