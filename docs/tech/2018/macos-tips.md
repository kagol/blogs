# macOS tips


1.设置常用linux命令的快捷键

打开terminal

command+space，搜索"terminal"关键字

进入"~/"目录

cd ~/
touch .bash_profile
vi .bash_profile
代码如下：

alias ll='ls -alF'
alias la='ls -A'
alias l='ls -CF'
这时就可以愉快地使用"ll"等常用的linux命令啦

 

2.使用`sketch-measure`将设计稿导出成标注图

打开Sketch

在菜单栏中找到`Plugins->Manage Plugins...->Get Plugins...`并打开

输入`sketch measure`关键字找到sketch-measure插件，下载压缩包，解压，解压后的文件中打开Sketch Measure.sketchplugin文件

使用：

Plugins->Sketch Measure->Spec Export

附上插件的下载链接：https://github.com/utom/sketch-measure

 

3.使用iTerm上传下载文件

在macOS下可以使用iTerm代替Xshell，不过用不了rz/sz命令，必要借助一些工具，具体方法如下：

(1)下载iterm2-zmodem工具

git clone https://github.com/mmastrac/iterm2-zmodem.git

下载iterm2-zmodem之后会有以下两个文件：

iterm2-send-zmodem.sh

iterm2-recv-zmodem.sh

(2)配置iTerm

Profiles -> 选择一个profile进行编辑->Advanced->Triggers->Edit



Regular Expression | Action | Parameters
-- | -- | --
rz waiting to receive.\*\*B0100 | Run Silent Coprocess... | ~/Documents/code/github/iterm2-zmodem/iterm2-send-zmodem.sh
\*\*B00000000000000 | Run Silent Coprocess... | ~/Documents/code/github/iterm2-zmodem/iterm2-recv-zmodem.sh




这时就可以使用 rz/sz 进行文件的上传和下载啦

 

4.git自动补全

macOS下要使用Git分支名称自动补全，需要编写脚本，具体如下：

(1)下载Git自动补全脚本

curl https://raw.githubusercontent.com/git/git/master/contrib/completion/git-completion.bash -o ~/.git-completion.bash

 

(2)配置bash

 

vi ~/.bash_profile

if [ -f ~/.git-completion.bash ]; then
  . ~/.git-completion.bash
fi
这样就可以愉快地使用Git补全功能啦

 

5.Chrome设置跨域

在`/Users/iroot`目录下新建一个文件夹`MyChromeDevUserData`：`mkdir MyChromeDevUserData`

在控制台中输入以下命令：

`open -n /Applications/Google\ Chrome.app/ --args --disable-web-security  --user-data-dir=/Users/iroot/MyChromeDevUserData/`


<EditInfo time="2018-04-10 10:15" title="阅读(131) 评论(0) 推荐(0)" />
