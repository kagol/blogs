# 如何将MongoDB数据库的数据迁移到MySQL数据库中


　　FAQ v2.0终于上线了，断断续续忙了有2个多月。这个项目是我实践的第一个全栈的项目，从需求（后期有产品经理介入）到架构，再到设计（有征询设计师的意见）、构建（前端、后台、数据库、服务器部署），也是第一次独立负责一个项目，所以意义很不一般，后面还会写一篇总结的文章。闲言少叙，进入正题：

　　其中有一个自动定时发访问记录列表和反馈问题列表的邮件的功能，本来打算自己写的，不过后来了解到团队有现成的平台可以做这个事，所以就用现成的喽。但有一个问题，该平台配置的数据源必须是MySQL数据库，而FAQ平台用的是MongoDB数据库。有两个办法：一是把现有的MongoDB数据库换成MySQL，这样的话要改动比较大；二是把MongoDB里的数据迁移到MySQL数据库。我采用的是第二种方法，可是怎么迁移呢？不能直接迁移，在网上搜了下，有一个办法是先把MongoDB里的数据导出到csv文件或者txt文件中，再把csv/txt文件中的数据导入到MySQL数据库中，感觉挺靠谱的。

　　分两步走：

![](/assets/mongodb-to-mysql-1.png)


　　PS：昨天用windows自带的画图工具画的那个图有点丑，今天一个设计师朋友用sketch给我画了个好看点的图，附上。（2016.10.26更新）

　　第一步：将MongoDB里的数据导出到csv文件，有一个mongo自带的工具mongoexport就可以实现。

/usr/local/mongodb/bin/mongoexport -h ip(192.168.0.102) -u mongo数据库登录帐号 -p mongo数据库登录密码 -d mongo数据库名称 -c mongo数据库集合名 -f _id,字段1,字段2 --type=csv -o 保存路径(/data/kagol/records.csv)
 　　导出的csv文件格式是一条mongo记录占一行，字段之间用逗号(,)分割。

　　第二步：将csv文件导入到MySQL数据库中，可以用MySQL的load命令。

　　SQL语句如下(load_csv_data.sql）：
```
1 load data local infile '/data/kagol/records.csv'
2 into table `records` character set utf8
3 fields terminated by ',' optionally enclosed by '"'
4 lines terminated by '\n'
5 ignore 1 lines;
```
　　写成shell脚本(load_csv_data.sh)：
```
mysql -hip(192.168.0.105) -umysql登录用户名 -pmysql登录密码 mysql数据库名 --default-character-set=utf8 --local-infile=1 < /data/kagol/load_csv_data.sql
```
　　要注意的是：

　　(1)-h和ip之间不需要空格（-u，-p同理）；

　　(2)MySQL数据库的格式必须和csv格式一致（字段数、顺序等）。

　　这样就顺利地完成了MongoDB数据库到MySQL数据库的迁移，but！！这个方法导出来的数据中文是乱码的！！花了那么多时间居然是乱码，此刻我的内心是奔溃的！（此处不配图，自己脑补画面）

　　

　　于是，有了现在的方案，写代码(Node)迁移。

```
 1 //mongo对象
 2 var Record     = require('./record');
 3 
 4 //mysql对象
 5 var mysql      = require('mysql');
 6 var connection = mysql.createConnection({
 7     host     : '192.168.0.104',//mysql服务器ip
 8     user     : 'XXX',//mysql登录名
 9     password : 'XXX',//mysql登录密码
10     database : 'XXX'//mysql数据库名
11 });
12 
13 connection.query('set names latin1');//这句很关键，确保中文不乱码
14 
15 var addZero = function(num){
16     return num < 10 ? '0' + num : num;
17 }
18 
19 var getYesterday = function(){
20     var now = new Date();
21     var year = now.getFullYear();
22     var month = now.getMonth() + 1;
23     now.setTime(now.getTime() - 1000*60*60*24);
24     var day = now.getDate();
25     var result = year + '-' + addZero(month) + '-' + addZero(day);
26     return result;
27 }
28 
29 var yesterday = getYesterday();
30 
31 //导入昨天的数据
32 Record.find({time:{'$gt':yesterday + ' 00:00:00','$lt':yesterday + ' 23:59:59'}},function(err, docs){
33     if(err){
34         console.log('error');
35     }else{
36         for(var i=0;i<docs.length;i++){
37                 var 字段1 = docs[i].字段1;
38                 var 字段2 = docs[i].字段2;
39                 var sql = 'insert into faq_records (字段1, 字段2) values("'+字段1+'","'+字段2+');';
40                 connection.query(sql, function(err, rows) {
41                     return;
42                 });
43         }
44         console.log('succeed!');
45     }
46 })
```
　　record.js文件是封装了对mongo数据库的操作：

```
1 var mongoose = require('mongoose');
2 var connectionRecord = mongoose.createConnection('mongodb://mongo登录帐号:mongo登录密码@ip:mongo服务端口(默认是27017)/数据库名');
3 var Schema = mongoose.Schema;
4 var recordSchema = new Schema({
5         字段1: String,
6         字段2: String
7 });
8 var Record = connectionRecord.model('Record', recordSchema);
9 module.exports = Record;
```
　　

　　这个方案完美地解决了中文乱码问题！

　　大家有别的方法可以一起讨论哈~~

　　PS：一直没搞明白为什么第一种方案会乱码，mongo里的数据确实是没有乱码的，csv文件里的数据也没有乱码，就是到了MySQL里就是乱码，怀疑是load data那一步有问题，但是我加了"character set utf8"和"--default-character-set=utf8"啊~~


<EditInfo time="2016-10-10 17:07" title="阅读(19236)  评论(9)" />
