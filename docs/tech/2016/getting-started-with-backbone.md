# Backbone 入门

## 1 Backbone 简介

Backbone是一个轻量级的JavaScript MVC框架，压缩后只有23kb，不过它依赖于Underscore.js和jQuery这两个JS库。Backbone是由Jeremy Ashkenas创建的，Underscore.js也是他创建的，他还创建了CoffeeScript这门优雅的JS转译语言。

模型(Model)是Backbone中的一个关键组件，Model用来存储应用的所有数据，以及直接和数据操作相关的逻辑，包括数据存储，数据验证，以及数据发生变动时触发相关动作。无论何时一个UI动作导致了模型属性的变化，模型都会触发change事件，这时用来展示模型状态的视图(View)会收到反馈，并做出相应的响应，重绘UI。你不用写那些胶水代码去更新你的DOM，比如通过元素id去找到某个元素，然后对其进行操作。只要模型改变了，视图就会更新。

视图(View)是用来把模型中的数据显示到页面上的，同时也可以监听DOM上的事件然后做出响应。

集合(Collection)是model对象的一个有序的集合。

## 2 模型(Model)

使用Backbone之前要引入以下三个JS文件：

```html
<script src="https://code.jquery.com/jquery-2.2.0.min.js"></script>

<script src="http://underscorejs.org/underscore-min.js"></script>

<script src="http://backbonejs.org/backbone-min.js"></script>
```

### 2.1 创建一个model

```js
1 var Person = Backbone.Model.extend({
2      initialize: function(){
3           alert('Hello world!');
4      }
5 });
6 var person = new Person;
```

创建了一个Model对象Person，并在初始化的时候输出“Hello world!”,接着定义了一个Person对象的实例person，执行以上代码会在页面弹出“Hello world!”的框。

### 2.2 设置model属性

```js
 1 var Person = Backbone.Model.extend({
 2      initialize: function(){//实例化时会执行这里的代码
 3           alert('Hello world!');
 4      }
 5 });
 6 //在实例化model时设置
 7 var person = new Person({
 8      name: 'Jack',
 9      age: 20
10 });
11 //也可以在model实例化后，通过set方法进行设置
12 var person = new Person;
13 person.set({
14      name: 'Elizabeth',
15      age: 18
16 });
17 person.set('age', 22);//设置单个属性
```
 

这里提供了设置model指的三种方式：实例化时设置、通过set方法设置多个属性、通过set方法设置单个属性。

### 2.3 获取model属性

```js
 1 var Person = Backbone.Model.extend({
 2      initialize: function(){
 3           console.log('Hello world!');
 4      },
 5      aboutMe: function(){
 6           return 'I\'m ' + this.get('name') + ', i live in ' + this.get('address').street;
 7      }
 8 });
 9 var person = new Person({
10      name: 'Asan',
11      address: {
12           street: 'Mongo Street'
13      }
14 });
15 console.log(person.aboutMe());
16 console.log(person.get('name'));
```

在model中定义了一个aboutMe方法，在里面通过this.get方法可以获取到model属性的值，并返回。Person的实例可以调用aboutMe方法，输出model属性的值。

 

### 2.4 设置model默认属性

```js
 1 var Person = Backbone.Model.extend({
 2     defaults: { //设置默认属性
 3         name: 'Kagol Antony',
 4         address: {
 5             street: '1st Street',
 6             city: 'Shenzhen',
 7             State: 'TX',
 8             zipCode: 78701
 9         }
10     },
11     initialize: function(){//初始化，首先执行
12         console.log('hello world!')
13     },
14     aboutMe: function(){
15         return 'I\'m ' + this.get('name') + ', i live in ' + this.get('address').street;
16     }
17 });
18 var person = new Person({
19      name: 'Asan'
20 });
21 console.log(person.get('name'));//Asan
22 console.log(person.get('address').city);//Shenzhen
```
 
可以通过设置model的defaults属性为model设置默认属性。

### 2.5 使用model属性

```js
 1 var Person = Backbone.Model.extend({
 2     defaults: {
 3         name: 'Kagol Antony',
 4         hobby: 'basketball'
 5     },
 6     initialize: function(){
 7         console.log('hello world!')
 8     },
 9     like: function(hobbyName){
10         this.set({
11              hobby: hobbyName
12         });
13     }
14 });
15 var person = new Person;
16 person.like('coding');
17 console.log(person.get('hobby'));
```
 
在model中定义了一个like方法，接受一个参数，为爱好的名称(hobbyName)，用于设置hobby属性。

### 2.6 监听model属性的变化

```js
 1 var Person = Backbone.Model.extend({
 2     defaults: {
 3         name: 'Elizabeth',
 4         age: 18
 5     },
 6     initialize: function(){
 7         console.log('hello world');
 8         this.on('change:name', function(model){
 9             var name = model.get('name');
10             console.log('Changed my name for ' + name);
11         })
12     }
13 });
14 var person = new Person ({
15     name: 'Jack',
16     age: 20
17 }); //实例化的时候改变name属性不会触发change事件
18 person.set({name: 'Kagol'});//触发change事件，输出：'Changed my name for Kagol'
19 console.log(person.hasChanged());//true
20 console.log(person.changedAttributes());// Object {name: "Kagol"}
```

在初始化时通过this.on方法绑定change事件，可以监听model中某个属性的变化，例子中是监听name属性，只要name属性一改变就在控制台输出改变后的name。

### 2.7 数据验证

```js
 1 var Person = Backbone.Model.extend({
 2     validate: function(attributes){
 3         if(attributes.age < 0){
 4             return 'You can\'t be negative years old';
 5         }
 6     },
 7     initialize: function(){
 8         console.log('hello, world!');
 9         this.on('invalid', function(model, error){
10             console.log(error);
11         })
12     }
13 });
14 var person = new Person;
15 person.set({name: 'Mary Poppins', age: -21}, {validate: true});// 会验证，输出"You can't be negative years old"
16 person.set({name: 'Mary Poppins', age: 20}, {validate: true});//不会验证
17 person.set({name: 'Mary Poppins', age: -21}, {validate: false});//不会验证
18 person.set({name: 'Mary Poppins', age: -21});//不会验证
```

在model的validate方法中可以定义验证的逻辑，它接受一个参数attributes，代表model的属性，这里是验证了model的age属性，当其小雨0时，返回一段提示文字。在初始化时要通过this.on绑定invalid方法。在通过set方法设置model属性的时候，必须带上第二个参数{validate: true}，才会验证。

## 3 视图(View)

### 3.1 加载模板

```html
1 <script type="text/template" id="search_template">
2     <label>My Search: </label>
3     <input type="text" id="search_input">
4     <input type="button" id="search_button" value="Search">
5 </script>
6 <div id="search_contailer"></div>
```

```js
 1 var SearchView = Backbone.View.extend({
 2     initialize: function(){
 3         this.render();
 4     },
 5     render: function(){
 6         var template = _.template($('#search_template').html(), {});
 7         this.$el.html(template);
 8     }
 9 });
10 var search_view = new SearchView({
11     el: $('#search_contailer')
12 });
```


这里需要用到Underscore.js的模板库_.template，模板可以写在View的外面，通过type为"text/template"的script标签包裹，还要定义一个容器(这里是一个div)用于容纳模板的内容。

定义一个视图(View)和定义一个model非常类似，它也有一个initialize方法，用于初始化，render方法(在初始化时被调用)用于渲染模板。

### 3.2 添加监听事件

```js
 1 var SearchView = Backbone.View.extend({
 2     initialize: function(){
 3         this.render();
 4     },
 5     render: function(){
 6         var template = _.template($('#search_template').html(), {});
 7         this.$el.html(template);
 8     },
 9     events: {//添加事件
10         'click #search_button': 'doSearch'
11     },
12     doSearch: function(){
13         console.log('Search for ' + $('#search_input').val());
14     }
15 });
16 var search_view = new SearchView({
17     el: $('#search_contailer')
18 });
```

添加监听事件只要在view的events属性中配置就可以了，可以配置多个事件。

### 3.3 向模板中传递参数

```html
1 <script type="text/template" id="search_template">
2     <label><%= search_label %></label>
3     <input type="text" id="search_input">
4     <input type="button" id="search_button" value="Search">
5 </script>
6 <div id="search_contailer"></div>
```

```js
 1 var SearchView = Backbone.View.extend({
 2     el: $('#search_contailer'),//可以将el直接写在这里
 3     initialize: function(){
 4         this.render();
 5     },
 6     render: function(){
 7         var variables = {//使用模版变量
 8             search_label: 'Kagol Search: ' // 可以传递多个参数
 9         };
10         var template = _.template($('#search_template').html());
11         this.$el.html(template(variables));
12     },
13     events: {//添加事件
14         'click #search_button': 'doSearch'
15     },
16     doSearch: function(){
17         console.log('Search for ' + $('#search_input').val());
18     }
19 });
20 var search_view = new SearchView;
```

要在模板中传递参数，只需要在把一个对象传递给_.template()()即可。

## 4 集合(Collection)

```html
1 <script type="text/template" id="artist_template">
2     <% _.each(artists, function(artist){ %>
3         <tr>
4             <td><%= artist.get('name') %></td>
5             <td><%= artist.get('hometown') %></td>
6         </tr>
7     <% }); %>
8 </script>
9 <table id="table"></table>
```

```js
 1 var Artist = Backbone.Model.extend({
 2     defaults: {
 3         name: 'Jack',
 4         hometown: 'American'
 5     },
 6     initialize: function(){}
 7 });
 8 var Artists = Backbone.Collection.extend({
 9     model: Artist
10 });
11 var artist1 = new Artist;
12 var artist2 = new Artist({
13     name: 'Kagol',
14     hometown: 'China'
15 });
16 var artist3 = new Artist({
17     name: 'Elizabeth',
18     hometown: 'England'
19 });
20 var artists = new Artists([artist1, artist2, artist3]);
21 var ArtistView = Backbone.View.extend({
22     el: $('#table'),
23     template: _.template($('#artist_template').html()),
24     initialize: function(){
25         this.render();
26     },
27     render: function(){
28         this.$el.html(this.template({
29             artists: artists.models
30         }));
31     }
32 });
33 var artistView = new ArtistView;
```

这个例子中，先创建了一个model，叫Artist，然后定义了一个Artist的Collection，名为Artists。接着定义了三个Artist的实例和一个Artists的实例，并用那三个Artist的实例初始化artists。接着定义了一个View，在render方法中定义了一个参数叫artists，它是一个数组，也就是那个Artist的实例。

值得注意的是模板中使用了Underscore.js的_.each，用于循环遍历，第一个参数就是参数artists，第二个参数是回调函数。

## 5 总结

Backbone 最适合的应用场景是单页面应用(SPA)，并且页面上有大量数据模型，模型之间需要进行复杂的信息沟通。Backbone 在这种场景下，能很好地实现模块间松耦合和事件驱动。Backbone 不像 Angular 一样帮你做好了很多事，你只能在它限定的规则下写代码，而是可定制性很高，使用 Backbone 提供的工具，你可以做任何你想做的事。

<EditInfo time="2016-02-28 00:23" title="阅读(405)  评论(6)" />
