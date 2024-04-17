# [BUGCASE]CI框架的post方法对url做了防xss攻击的处理引发的文件编码错误


## 一、问题描述
出现问题的链接：
http://adm.apply.wechat.com/admin/index.php/order/detail?country=others&st=1&order_id=59de1481875cb2430
进入以上页面，点击"Download"按钮

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164939376-1976741991.png)




页面报错，没法下载

![](https://img2018.cnblogs.com/blog/296720/201901/296720-20190117164946879-1297096158.png)



## 二、问题分析

### 1.初步分析
通过查看相关代码可以了解到文件下载的过程如下：

  - 取到下载链接中的mid参数
  - 对mid先后进行url解码和base64解码
  - 将解码后的字符串按"|"进行分隔
  - 判断得到的数组是否存在第二个元素，不存在会返回404，存在则会利用分隔得到的两个值进行下载

其中分隔得到的两个值分别是mid和filename

报错下载链接：
```
http://adm.apply.wechat.com/admin/index.php/updown/download_file/?mid=YjBhNDZlNDVhMjk+MGY1ZTFjYTE4ZjI0MDYwNDMyMWN80JjQn1%2FQlNCy0L7RgNC90LjQul%2FQ
```
mid：
```
YjBhNDZlNDVhMjk+MGY1ZTFjYTE4ZjI0MDYwNDMyMWN80JjQn1%2FQlNCy0L7RgNC90LjQul%2FQ
```

对报错链接进行上述步骤，发现解码后的字符是一堆乱码，并不包含"|"：
url解码：
```
YjBhNDZlNDVhMjk MGY1ZTFjYTE4ZjI0MDYwNDMyMWN80JjQn1/QlNCy0L7RgNC90LjQul/Q
```
base64解码：
```
b0a46e45a29YLX،N

̌Xߴ&4'״%4,/`4/t.4.
```
因此报错，无法下载

为什么其他用户上传的文件可以下载，这个却不能下载？
这是一个什么文件？下载链接中的mid为什么会错？

### 2.报错的文件是什么

要找到用户上传的文件，需要收集一些信息

OA注册邮箱：XXX@gmail.com
申请时间：2017-10-11
注册IP：XX.XX.XX.XX

查看2017.10.11的日志发现用户上传的文件目录：
```
"\/data\/XXX\/upload_files\/\u0418\u041f_\u0414\u0432\u043e\u0440\u043d\u0438\u043a_\u0420\u0435\u043a\u0432\u0438\u0437\u0438\u0442\u044b.docx"
```

文件名经过unicode编码，转码之后：
```
ИП_Дворник_Реквизиты.docx
```

还有一个是一样的文件：
```
ИП_Дворник_Реквизиты1.docx
```

果然是很奇葩的文件名

这个文件名是怎么编码成mid的呢？
为什么mid会错？

### 3.mid为什么会错

通过分析，了解到mid的值来自mongodb数据库中的company_attach和proposal_attach两个字段，也就是说mid在存入数据库时出错

这时需要了解下mid是怎么存入数据库的

用同样的两个文件，重新申请一个OA，在上传(updown/upload_file)的时候会对文件名做处理，具体过程：

  - 将得到的mid和filename用"|"拼接起来
  - 对拼接得到的字符串做一次base64编码
  - 在对base64编码后的字符串做一次url编码

在最后一步提交(register2/do_apply)时会操作数据库

通过分析日志发现，在执行insert之前，这两个字段就已经是错误的

取值方式是：
```
$this->input->post('company_attach', TRUE);
$this->input->post('proposal_attach', TRUE);
```

在调用do_apply接口时，打开Chrome的Network观察到接口的参数是：
```
company_attach:N2ZmODMyOWZhOWQ0MzIwNDI1OTZmMTBiOTBhZTUzOTh80JjQn1%2FQlNCy0L7RgNC90LjQul%2FQoNC10LrQstC40LfQuNGC0YsuZG9jeA%3D%3D

proposal_attach:NzU3ZGVjOTg0NWJkNzkwZDEyYjQwNDU3MGZjMjdlN2F80JjQn1%2FQlNCy0L7RgNC90LjQul%2FQoNC10LrQstC40LfQuNGC0YsxLmRvY3g%3D
```
这个参数经过urldecode-&gt;base64_decode两次解码之后得到：
```
7ff8329fa9d432042596f10b90ae5398|ИП_Дворник_Реквизиты.docx
757dec9845bd790d12b404570fc27e7a|ИП_Дворник_Реквизиты1.docx
```

说明`$this->input->post('proposal_attach', TRUE);`这种取值方式可能会对取到的参数值进行处理，导致得到的不是我们想要的结果

做了什么处理呢？

### 4.CI框架的input-&gt;post()方法对取到的值做了什么处理

项目中用的CI框架版本是v2.1.4

对CodeIgniter的源码进行分析

system/core/Input.php中的post()调用了_fetch_from_array()

该方法会对post()的第二个参数$xss_clean进行判断，如果为TRUE，则执行：

system/core/Security.php中的xss_clean()方法

```

	/**
	 * XSS Clean
	 *
	 * Sanitizes data so that Cross Site Scripting Hacks can be
	 * prevented.  This function does a fair amount of work but
	 * it is extremely thorough, designed to prevent even the
	 * most obscure XSS attempts.  Nothing is ever 100% foolproof,
	 * of course, but I haven't been able to get anything passed
	 * the filter.
	 *
	 * Note: This function should only be used to deal with data
	 * upon submission.  It's not something that should
	 * be used for general runtime processing.
	 *
	 * This function was based in part on some code and ideas I
	 * got from Bitflux: http://channel.bitflux.ch/wiki/XSS_Prevention
	 *
	 * To help develop this script I used this great list of
	 * vulnerabilities along with a few other hacks I've
	 * harvested from examining vulnerabilities in other programs:
	 * http://ha.ckers.org/xss.html
	 *
	 * @param	mixed	string or array
	 * @param 	bool
	 * @return	string
	 */
	public function xss_clean($str, $is_image = FALSE)
	{
		...
	}
```

这个函数很复杂，一共202行代码，做了将近20次处理，一个一个看太浪费时间，于是打了很多log，进一步缩小影响范围，最后定位到是下面的处理有问题：
```
	// Remove evil attributes such as style, onclick and xmlns
	$str = $this->_remove_evil_attributes($str, $is_image);
```

_remove_evil_attributes这个函数大概就是去除比较危险的字符，源码如下：
```
	/*
	 * Remove Evil HTML Attributes (like evenhandlers and style)
	 *
	 * It removes the evil attribute and either:
	 * 	- Everything up until a space
	 *		For example, everything between the pipes:
	 *		<a |style=document.write('hello');alert('world');| class=link>
	 * 	- Everything inside the quotes
	 *		For example, everything between the pipes:
	 *		<a |style="document.write('hello'); alert('world');"| class="link">
	 *
	 * @param string $str The string to check
	 * @param boolean $is_image TRUE if this is an image
	 * @return string The string with the evil attributes removed
	 */
	protected function _remove_evil_attributes($str, $is_image)
	{
		// All javascript event handlers (e.g. onload, onclick, onmouseover), style, and xmlns
		$evil_attributes = array('on\w*', 'style', 'xmlns', 'formaction');

		if ($is_image === TRUE)
		{
			/*
			 * Adobe Photoshop puts XML metadata into JFIF images, 
			 * including namespacing, so we have to allow this for images.
			 */
			unset($evil_attributes[array_search('xmlns', $evil_attributes)]);
		}

		do {
			$count = 0;
			$attribs = array();

			// find occurrences of illegal attribute strings with quotes (042 and 047 are octal quotes)
			preg_match_all('/('.implode('|', $evil_attributes).')\s*=\s*(\042|\047)([^\\2]*?)(\\2)/is', $str, $matches, PREG_SET_ORDER);

			foreach ($matches as $attr)
			{
				$attribs[] = preg_quote($attr[0], '/');
			}

			// find occurrences of illegal attribute strings without quotes
			preg_match_all('/('.implode('|', $evil_attributes).')\s*=\s*([^\s>]*)/is', $str, $matches, PREG_SET_ORDER);

			foreach ($matches as $attr)
			{
				$attribs[] = preg_quote($attr[0], '/');
			}

			// replace illegal attribute strings that are inside an html tag
			if (count($attribs) > 0)
			{
				$str = preg_replace('/(<?)(\/?[^><]+?)([^A-Za-z<>\-])(.*?)('.implode('|', $attribs).')(.*?)([\s><]?)([><]*)/i', '$1$2 $4$6$7$8', $str, -1, $count);
			}

		} while ($count);

		return $str;
	}
```

进一步定位发现是以下正则表达式的锅：
```
$str = preg_replace('/(<?)(\/?[^><]+?)([^A-Za-z<>\-])(.*?)('.implode('|', $attribs).')(.*?)([\s><]?)([><]*)/i', '$1$2 $4$6$7$8', $str, -1, $count);
```

正常的情况下是不会执行这一行代码的，因为$attribs是空的

所以本质上还是以下的正则有问题：
```
preg_match_all('/('.implode('|', $evil_attributes).')\s*=\s*([^\s>]*)/is', $str, $matches, PREG_SET_ORDER);
```

其中$evil_attributes为：
```
		// All javascript event handlers (e.g. onload, onclick, onmouseover), style, and xmlns
		$evil_attributes = array('on\w*', 'style', 'xmlns', 'formaction');

```

这个正则有什么问题呢？

### 5.正则的锅


将里面的$evil_attributes和$str两个变量替换掉，得到正则pattern：

```

/(on\w*|style|xmlns|formaction)\s*=\s*([^\s>]*)/is

```
出错的字符串：
```
N2ZmODMyOWZhOWQ0MzIwNDI1OTZmMTBiOTBhZTUzOTh80JjQn1/QlNCy0L7RgNC90LjQul/QoNC10LrQstC40LfQuNGC0YsuZG9jeA==
```

经过正则之后得到的$matches：

```
[["oNC10LrQstC40LfQuNGC0YsuZG9jeA==","oNC10LrQstC40LfQuNGC0YsuZG9jeA","="]]
```

得到的$attribs：
```
["oNC10LrQstC40LfQuNGC0YsuZG9jeA\\=\\="]
```

最后得到的$str：
```
N ZmODMyOWZhOWQ0MzIwNDI1OTZmMTBiOTBhZTUzOTh80JjQn1/QlNCy0L7RgNC90LjQul/Q
```

这个错误的字符就这样被错误地存入数据库里，导致文件无法下载。

问题终于找到了，一句话解释该问题：

> 如果CI框架的post()方法的第二个参数设为TRUE（用来防止xss攻击），那么CI框架内部会把获取到的字符串进行一系列安全处理，其中有一步是为了防止JavaScript中的事件处理方法（如：onclick、onload等）而做的处理，而在本次出现的个案中，用户上传的俄罗斯语命名的文件（ИП_Дворник_Реквизиты.docx），经过转码之后的字符串（N2ZmODMyOWZhOWQ0MzIwNDI1OTZmMTBiOTBhZTUzOTh80JjQn1/QlNCy0L7RgNC90LjQul/QoNC10LrQstC40LfQuNGC0YsuZG9jeA==）正好命中这条正则表达式，被错误地处理，所以导致文件无法下载。


<EditInfo time="2019-01-17 16:53" title="阅读(562) 评论(0) 推荐(0)" />
