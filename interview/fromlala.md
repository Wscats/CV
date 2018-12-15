# 常见问题收集

### 1.跨域问题的解决办法：

1.jsonp

既然它叫jsonp，很明显目的还是json，而且是跨域获取。根据上面的分析，很容易想到：利用js构造一个script标签，把json的url赋给script的scr属性，把这个script插入到dom里，让浏览器去获取

服务器端集成Script tags返回至客户端，通过javascript callback的形式实现跨域访问（这仅仅是JSONP简单的实现形式）。

![1544073777933](C:\Users\sue\AppData\Local\Temp\1544073777933.png)

JSONP
JSONP 是JSON with padding（填充式JSON 或参数式JSON）的简写。
JSONP是一种可以绕过浏览器的安全限制，从不同的域请求数据的方法。
JSONP请求不是ajax请求，是利用script标签能加载其他域名的js文件的原理，来实现跨域数据的请求 
​	特点：
​	1.只能为get请求

​	2.接口必须有回调函数的执行

​	3.支持所有浏览器，因为它是script标签

2.服务器代理，由于**浏览器有同源策略限制**，（同源策略即协议域名端口相同），所以想要跨域访问其他域下的资源，需要绕开浏览器的这个限制，**可以在服务器端设置一个代理，由服务器端向跨域下的网站发出请求，再将请求结果返回给前端，**成功避免同源策略的限制。

此时前端相当于不跨域，和正常请求一致，无需额外配置。

灵活性：不同环境服务域名可能不一致，因此nginx配置也不相同，不便于移植。



3.CORS，

CORS是跨源资源分享（Cross-Origin Resource Sharing）的缩写，它为Web服务器定义了一种方式，允许网页从不同的域访问其资源。

优点

1、 JSONP只能实现GET请求，而CORS支持所有类型的HTTP请求。

2、 使用CORS，开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理。 

3.CORS不支持IE8以下浏览器，但是绝大多数现代浏览器都已经支持了CORS。

4.灵活性，只需要在代码或者配置中心进行黑白名单配置即可，方便一直和拓展。



总结：

1.CORS与JSONP相比，更为先进，方便和可靠

2.开发者可以使用普通的XMLHttpRequest发起请求和获得数据，比起JSONP有更好的错误处理

3.公共即相互，涉及到对接的前端项目比较多，开发部署环境比较多，整体来将我个人推荐使用cors的方案，而对于一些对立性强的小项目，使用服务器代理可以降低成本，结合工作实际，按需使用，使用服务器代理方案是，最好使用内部域名/ip作为接口。



### 2.瀑布流的实现

1.多栏布局实现Multi-columns

column-count（分多少列）、column-gap（规定列表间隔）配合

break-inside（）来实现瀑布流布局。

2.JS实现

原理是先找到第一排最矮的，然后将下一排的第一个放在这个位置，然后将这个看作一个整体，再进行比较，找出新形成的一排的最矮的，将下一个放置于此，以此类推。

每一行每列元素摆放时候，遍历数组，拿到数组中top值最小的那一列，将元素摆放进去，同时对该列的top值进行更新，追加该元素的高度和gap。

```js
var cols = parseInt（window.innerWidth/item.offsetWidth）
var gap = （window.innerWidth%item.offerWidth）/（cols+1）

var pos = [{
    left:gap,//0
    top:gap//原来的值+gap+item.offsetHeight
},{
    left:2gap+item.offsetWidth,
    top:gap
},{
    left:3gap+item.offsetWidth,
    top:gap
}]

parseInt（window.innerWidth/item.offsetWidth）
var pos = [],
VAR obj  = {},
for(var i=0;i<cols;i++){
    obj.left = gap*(i+1)+item.offsetWidth*i；
    obj.top = gap；
    pos.push（obj)；
}
var minIdx = 0；
var minTop = pos[i].top；
minIdx = i；
```

### 3.什么是闭包及其作用域和原理

闭包就是函数嵌套函数，将函数作为函数的返回值返回出来，从而使全局拿到函数的变量，即f2作为f1的返回值返回出来，从而使全局能拿到f1的变量。

闭包出现的原因主要是因为，函数内部是可以拿到全局变量，但是全局是拿不到函数内部的函数的，为了解决这个问题，因为链式作用域的原因，函数嵌套的内层函数是可以拿到他父级函数的变量，所以将函数2作为函数1的返回值返回出去，从而使全局能够拿到函数1的变量。且该变量是不能被回收机制回收的，因为f1使f2的父函数，f2被赋予了一个全局变量，所以f2是始终在内存中，而f2依赖于f1存在，所以f1也始终在内存中，所以他们在调用结束不会被垃圾回收机制回收，

优点： 

1.可以在全局访问到函数内部的变量

2.变量始终在内存之中，不会在函数被调用后被清除

缺点：

1.占内存，因为所有闭包都是存在内存中的

2.在ie浏览器中国可能会导致内存泄漏，所以在函数推出前需要将没必要的函数删除。

### 4.什么叫原型以及原型链

##### 原型

​      是一个可以被克隆的类，通过复制原型可以创建一个一模一样的新对象。

其实原型就相当于一个模板，它包含如下

1.它所有的引用类型都包括一个_ proto _(隐式原型)的属性，属性是一个普通的对象

2.所有构造函数都是有一个prototype（原型）属性，属性是一个普通的对象

3所有引用类型的_ proto _属性指向它的构造函数的prototype，即a为一个数组，a._ _ proto_ === Array.prototype 

##### 原型链

​	当访问一个对象的某个属性时，会先从该函数本身属性上找，如果没有找到，则会在他的 _ proto _隐式属性（即构造函数的prototype）上去找，如果还没有找到的话，则就会再去prototyep的 _ proto _ 中去找，这样一层一层向上查找就会形成一个链式结构，就称之为原型链。



构造器的实例“-proto-”属性指像的是构造器原型，所以构造原型上的属性和方法都能被实例访问到，加入A构造器的原型是B构造器的实例，B构造的原型是C构造器的实例，这样的话实例之间就形成一条由_“-proto-”_属性连接的原型链。

在原型链低端的实例可以使用原型链高端的属性和方法。



### 5.vue的双向绑定的底层原理是什么

Vue.js 最核心的功能有两个，一是响应式的数据绑定系统，二是组件系统。

采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。

### 6.解释单向数据绑定和双向数据绑定以及他们之前的区别

单向数据绑定：

是先把模板写好，然后把数据和模板整合一起形成html，然后把html代码插入文档流里面。

缺点：Html代码一旦生成完以后，就没有办法再变了，如果有新的数据来了的话，只能去掉原来的HTML代码，再重新的数据和模板一起整合到文档流中。简单来说就是dom操作直接改变。

双向数据绑定:

数据模型（Module）和视图（view）之间的双向绑定，视图改变，数据也会改变，数据改变，视图也会改变。

优点：

无需进行和单向数据绑定的那CRUD（Create，Retrieve，Update，Delete）

操作双向数据绑定最经常的应用场景就是表单了，这样当用户在前端页面完成输入后，不用任何操作，我们就已经拿到了用户的数据存放到数据模型中了。

在react中是单向数据绑定，而在vue和augular中的特色是双向数据绑定。

### 7.promise可以解决回调地狱的底层原理是什么

回调地狱是因为异步回调函数嵌套太多。

​	Promise的内部也有一个 `defers` 队列存放事件，而 `.then` 方法的作用和发布订阅模式的on方法一样是用来订阅事件的，每次调用 `.then` 方法就会往defers队列中放入一个事件，当异步操作完成时， `resolve方法标示前一个异步过程完成并从defers队列中取出第一个事件执行并返回当前对象保证链式调用，以此类推，就完成了所有异步过程的队列执行。`



### 8.vue和react的共同点和不同点

区别：

1.vue是双向数据绑定和react是单向数据绑定：

2.vue有指令，是指令编程，react没有指令，是函数式编程，以切皆函数。

3.vue是面向对象的高度体现，而react是利用es6的class类。

共同点：

1.都支持组件化

2.都是数据驱动视图

3.都是用虚拟dom实现快速渲染

react和vue的优缺点：

vue的优点：

1.简单

 2.异步处理方式更新DOM 

3.耦合度不高，可以组件组合 

 4.对模块化友好，可以通过NPM等等安装，不强迫你所有的代码都遵循，使用场景更加灵活。

5.声明式渲染

缺点

不支持IE8

------

react的优点：

1.速度快，在UI渲染过程中，React通过在虚拟DOM中的微操作来实现对实际DOM的局部更新。

2.跨浏览器兼容，兼容IE8

缺点：

只是一个V层框架，开发大型项目，需要react-router+redux完成。



### 9.vue的生命周期，react的生命周期，微信小程序的生命周期。

##### vue的生命周期（10个）

开始创建、初始化数据、编译模板、挂载Dom、渲染→更新→渲染、卸载

主要是4个部分，每个部分包括一个before和一个过去，

beforeCreate和created，

beforeMount和Mounted

beforeupdate和updated

beforeDestroy和Destoryed

以及keep-alive的状态的两个钩子函数

activated和deactivated

| 生命周期钩子  | 详细                                                         |
| ------------- | ------------------------------------------------------------ |
| beforeCreate  | 在实例初始化之后，数据观测(data observer) 和 event/watcher 事件配置之前被调用。**创建前状态，数据和元素都没有初始化** |
| created       | 实例已经创建完成之后被调用。在这一步，实例已完成以下的配置：数据观测(data observer)，属性和方法的运算， watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。**创建完毕状态，实例的数据对象data已经配置好了，但元素还没有初始化** |
| beforeMount   | 在挂载开始之前被调用： **data和el均已经初始化，但是还没有渲染数据** |
| mounted       | el 被新创建的 vm.el替换，并挂载到实例上去之后调用该钩子。如果root实例挂载了一个文档内元素，当mounted被调用时vm.el 也在文档内。**元素已经渲染，并且挂载到了实例上面** |
| beforeUpdate  | 数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。你可以在这个钩子中进一步地更改状态，这不会触发附加的重渲染过程。**修改数据的时候会触发，** |
| updated       | 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，**组件 DOM 已经更新，所以你现在可以操作dom节点** |
| activated     | keep-alive 组件激活时调用。                                  |
| deactivated   | keep-alive 组件停用时调用。                                  |
| beforeDestroy | **实例销毁之前调用。在这一步，实例仍然完全可用**， 调用app.$destroy()方法即可将销毁实例， |
| destroyed     | Vue 实例销毁后调用。调用后**Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除，所有的子实例也会被销毁。** |

（除了beforeCreate和created钩子之外，其他钩子均在服务器端渲染期间不被调用。）

1.如果Vue实例对象中有template参数选项，则将其作为模板编译成render函数

2.如果没有template参数选项，则将外部的HTML作为模板编译（template），也就是说，template参数选项的优先级要比外部的HTML高

3.如果1,2条件都不具备，则报错



##### react的生命周期

| react生命周期钩子                           | 阶段   | 详细                                                         |
| ------------------------------------------- | ------ | ------------------------------------------------------------ |
| getDefaultProps                             | 初始化 | **设置默认的props**，也可以用dufaultProps设置组件的默认属性. |
| getInitialState                             | 初始化 | 在使用es6的class语法时是没有这个钩子函数的，可以直接在constructor中定义this.state。此时可以访问this.props，**这里是设置了初始化状态** |
| componentWillMount                          | 初始化 | 组件初始化时只调用，以后组件更新不调用，**整个生命周期只调用一次，此时可以修改state。** |
| render                                      | 初始化 | react最重要的步骤，**创建虚拟dom，进行diff算法，更新dom树**都在此进行。此时就不能更改state了。 |
| componentDidMount                           | 初始化 | 组件渲染之后调用，只调用一次。                               |
| componentWillReceiveProps（nextprops）      | 运行中 | 组件初始化时不调用，**组件接受新的props时调用。**            |
| shouldComponentUpdate(nextProps, nextState) | 运行中 | **react性能优化非常重要的一环。**组件接受新的state或者props时调用，我们可以设置在此对比前后两个props和state是否相同，如果相同则返回false阻止更新，因为相同的属性状态一定会生成相同的dom树，这样就不需要创造新的dom树和旧的dom树进行diff算法对比，**节省大量性能，尤其是在dom结构复杂的时候** |
| componentWillUpdata(nextProps, nextState)   | 运行中 | 组件初始化时不调用**，只有在组件将要更新时才调用，此时可以修改state** |
| render                                      | 运行中 | 组件渲染                                                     |
| componentDidUpdate                          | 运行中 | 组件初始化时不调用，**组件更新完成后调用，此时可以获取dom节点。** |
| componentWillUnmount                        | 卸载   | **组件将要卸载时调用**，一些事件监听和定时器需要在此时清除。 |



##### 小程序生命周期

在page页面中定义的生命周期方法

onLoad 生命周期函数--监听页面加载

onReady 生命周期函数--监听页面初次渲染完成，只调用一次

onShow 生命周期函数--监听页面显示

onHide 生命周期函数--监听页面隐藏

onUnload 生命周期函数--监听页面卸载

##### 小程序组件的生命周期

created 组件实例化，但节点树还未导入，因此这时不能用setData

attached 节点树完成，可以用setData渲染节点，但无法操作节点

ready 组件布局完成，这时可以获取节点信息，也可以操作节点

moved 组件实例被移动到树的另一个位置

detached 组件实例从节点树中移除



### 10.axios和ajax的区别

ajax：

1.AJAX不是新的编程语言，而是一种使用现有标准的新方法

2.最大优点是在不加载整个页面，可以与服务器交换数据并局部刷新网页内容。

3.不需要任何浏览器插件，但需要用户允许js在浏览器执行

axios：

axios是通过promise实现对ajax技术的一种封装

1.用于浏览器和node.js的基于promise的HTTP的客户端

2.从浏览器制作XMLHttoRequests

3.让HTTP从node.js请求

4.支持promise API

5.拦截请求和相应（Interceptors拦截器）

6.转换请求和响应数据

7.取消请求

8.自动转换为JSON数据

9.客户端支持防止CSRF/XSRF（跨站请求伪造）

[1.验证HTTP referer字段     2.使用验证码，对用户不友好    3.在请求地址中添加token并验证     4.在HTTP头中自定义属性并验证]	

安卓4.43以下的手机还是不支持promise的，所以会报错，需要引入npm install babel-polyfill和npm    install babel-runtime，在入口文件上加上即可。

import ‘babel-polyfill’



### 11.h5+css3新特性有哪些

h5的新特性：

1.增加了语义化内容的元素，如header，footer，artical，section，nav

2.增加了用于绘画的canvas元素以及svg元素等

3.增加了用于多媒体的video和audio元素

4.增加了localstorage和secssionStorage

5.HTML5拥有更有效的服务器推送技术，Server-Sent Event和WebSockets就是其中的两个特性，这两个特性能够帮助我们实现服务器将数据“推送”到客户端的功能



CSS3的新特性:

1.新增属性选择器，伪元素选择器

2.新增边框圆角，边框阴影，文字阴影，2d，3d转换，渐变，动画等效果



### 12.localStorage、sessionStorage、Cookie的区别及用法

共同点：sessionStorage、localStorage和cookie都由浏览器存储在本地的数据，且同源的。

区别：

首先webstorage是本地存储，存储在客户端，包括localStorage和sessionStorage。

1.localStorage生命周期是永久，sessionStorage仅在当前会话下有效，关闭页面或浏览器后被清除，生命期为只在设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭。

2.localStorage存放数据大小为一般为5MB,sessionStorage存放数据大小为一般为5MB，存放数据大小为4K左右，有个数限制（各浏览器不同），一般不能超过20个。



### 13.vue-router和react-router有什么不同

1.最基本的初衷就是实现前端路由，当浏览器的url产生变化时候，不向服务器进行请求，而是直接控制前端页面产生变化

2.vue-router是全局配置方式，react-router是全局组件方式

3.vue-router仅支持对象形式的配置，react-router支持对象形式和JSX语法的组件形式配置。

4.vue-router任何路由组件都会被渲染到<router-view/>位置，react-router子组件作为children被传入父组件，而根组件被渲染到<Router/>



### 15.axios的二次封装

在vue和react中均可以使用，axios的二次封装的过程：

​	定义一个对象，对象里面有方法，接受一个对象，返回一个promise对象，在里边进行axios的使用。

响应拦截器做了判断error.response.status的值的处理，判断状态码，封装一个方法，方法接受一个参数，根据不同的状态码返回不同的error说明。



### 16.为什么要html语义化

语义化HTML就是写出的HTML代码，符合内容的结构化（内容语义化），选择合适的标签（代码语义化），能够便于开发者阅读同时让浏览器的爬虫机器很好地解析。

1.有利于seo，提升网站的权重

2.在没有css的时候能够清晰看出网页的结构，增强可读性

3.便于团队开发和维护

4.支持多种端设备的浏览器渲染



### 17.为什么要准从w3c的标准

网页主要由三部分组成：结构 （Structure）、表现（Presentation）和行为（Behavior）。

对应的标准也分三方面：结构化标准语言主要包括 XHTML和XML；表现标准语言主要包括CSS；行为标准主要包括对象模型（如W3C DOM）、ECMAScript等。

1.增强兼容性

2.网页代码非常简洁干净，页面共用css，大大提高网页加载速度

3.有利于搜索引擎友好的





### 18.为什么闭包不会被垃圾机制回收

首先JS垃圾回收机制中，如果一个对象不再被引用，那么这个对象就会被垃圾机制回收，如果两个对象相互引用，而不在被第三方引用，那么这两个对象就会被垃圾回收机制回收。

因为闭包中，父函数被子函数引用，子函数又被外部所引用，这就是父函数不被回收的原因。



### 19.对象的复制

##### 浅复制：

浅复制只会依次复制对象的每一个属性，不会对这些属性进行递归复制。

只是对复制对象的引用，栈和堆的关系，像number与string，boolean，null是堆的，直接可以用。

##### 深复制：

深复制需要层层递归，复制对象的所有属性，包括对象属性的属性的属性...

1.for循环/遍历实现对象的深拷贝

2.转换成json再转换成对象实现对象的深拷贝

（json.parse（Json.strinify（arr）））

##### 总结：

object与Array存在占中，只用一个指针来引用值，拷贝之后的对象发生变化，原对象也会变化，只有真正的深拷贝才是真正的拷贝对象。



### 22.数组去重的方法

1.最基本的去重方法

思路：定义一个新数组，并存放原数组的第一个元素，然后将元素组一一和新数组的元素对比，若不同则存放在新数组中。

2.先排序在去重

思路：先将原数组排序，在与相邻的进行比较，如果不同则存入新数组

3.利用对象的属性去重（推荐）

思路：每次取出原数组的元素，然后在对象中访问这个属性，如果存在就说明重复

```
function unique(arr){
　　var res =[];
　　var json = {};
　　for(var i=0;i<arr.length;i++){
　　　　if(!json[arr[i]]){
　　　　　　res.push(arr[i]);
　　　　　　json[arr[i]] = 1;
　　　　}
　　}
　　return res;
}
```

4.利用下标查询

```
 function unique(arr){
   　　var newArr = [arr[0]];
  　　 for(var i=1;i<arr.length;i++){
　　　　if(newArr.indexOf(arr[i]) == -1){
          　　 newArr.push(arr[i]);
    　　  }
        }
        return newArr;
   }
```



### 21.数组排序

##### 冒泡排序

- 遍历元素，跟其下一个元素对比
- 把最大的逐个往后排列

```
var arr = [12,3,44,343,55,1,23];
for(var i=0;i<arr.length-1;i++){
    for(var j=0;j<arr.length-i-1;j++){
        if(arr[j]>arr[j+1]){
            var current = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = current;
        }
    }
}
console.log(arr);
```

##### 选择排序法

- 把当前元素分别跟后面所有的元素对比
- 把最小的逐个往前排列

```
var arr = [12,3,44,343,55,1,23];
for(var i=0;i<arr.length;i++){
    for(var j=i+1;j<arr.length;j++){
        if(arr[i]>arr[j]){
            var current = arr[i];
            arr[i] = arr[j];
            arr[j] = current;
        }
        console.log("666");
    }
}
console.log(arr);
```

##### 快速排序法

```
/*
* 利用递归函数实现排序
* 每次获取数组中间元素cItem
* 把大于和小于cItem的元素分别放置在arrGt和arrLt两个数组中,
* 利用concat组合递归调用函数返回的值
* 直到数组的长度等于1时，直接返回元素调出递归
*/
var arr = [10, 8, 20, 5, 6, 30, 11, 9]；
function fastSort(arr){
    //6. 递归退出条件
    if(arr.length<=1){
    	return arr;
    }
    //1. 找出数组中间位置元素
    var cIdx = parseInt(arr.length/2);

    //2.删除中间元素，避免与自己本身进行对比而造成死循环
    var cItem = arr.splice(cIdx,1);//[6],arr=[10, 8, 20, 5, 30, 11, 9]

    //3. 创建两个空数组用于保存大于或小于cItem的数字
    var arrLt = [];//[5]
    var arrGt = [];//[10,8,20,30,11,9]

    // 4.遍历数组，分别与cItem进行对比
    // 把小于cItem的数写入arrLt
    // 把大于cItem的数写入arrGt
    for(var i=0;i<arr.length;i++){
        if(arr[i]<cItem[0]){
        	arrLt.push(arr[i])
        }else{
        	arrGt.push(arr[i]);
        }
    }
    // 5.组合排序后的数组
    return fastSort([5]).concat(cItem,fastSort(arrGt));
}
console.log(fastSort(arr));
```

##### sort排序

```
arr.sort(function(a,b){
    // 在函数内通过返回值告诉sort方法如何排序
    return a-b;
});
```



### 22混合开发，打包成安卓的流程

1.混合开发:

​	利用一些工具来实现，整个应用中所有的界面都有web页面来实现，最终利用工具来调用设备原生功能，并且打包成原生安装包.

​	将H5页面嵌入到native应用中实现部分功能，需要和安卓，ios交互。

​	ios安卓交互，我们得先判断用户式什么操作系统，window对象上有一个navigator的一个对象，这个对象上有userAgent的属性，这个属性上就拥有页面运行环境的信息，利用正则判断就可以操作信息，然后安卓ios，在我们的window下挂载一个对象，我们直接调用它挂载的api就好了。

2.打包流程：

需要对manifest.json文件进行配置，可以配置是否全屏等等，然后选择发行为原生安装包



### 23.为什么axios在vue可以直接使用，而vuex要使用vue.use的使用场景

因为axios没有install，开发者在封装axios的时候，没有install这一步。

vue.use使用场景：vuex，vue-router，Mint-ui

install是默认的方法，当外界在use这个组件的时候就会调用本身的方法，同时传一个vue这个类的参数。



### 24.vue.mixin

分发组件，可复用特别灵活的方式，汇入对象可以包含任意组件选项，所以当组件混入对象时，所有混入对象的选项将被混入该组件本身的选项。

简单来说，Vue.mixin()可以把你创建的自定义方法混入**所有的** Vue的实例。



### 25.前后端遇到最大的问题是什么









### 26.开发流程，人员配比

1.需求评审（时间线，开发计划书，功能列表，部署方案）

2.UI出设计图

3.前端开发用户界面逻辑+后端开发服务器逻辑

4.提交到测试服务器，出测试报告

5.改bug-提测-改bug

6.产品验收

7.提交到预发布服务器

8.上线







### 27.搭建项目需要注意什么

1.首先需要选择合适的vue模板

一般使用较多的是webpack（适合大项目），

webpack-simple（适合一般项目）

2.在使用vue框架搭建项目的时候，在下载依赖的时候，最好加上--save-dev这样在其他人拉下项目之后，不需要下载依赖就可以使用，一般比较核心的依赖--save比较合适。

3.将webpack和loader配合好使用，在很多情况下，很多引入的文件都需要loader去编译。



### 28.DNS是什么，解析域名的原理，过程是什么？

DNS( Domain Name System)是“域名系统”

DNS通过域名解析系统解析找到了对应的IP地址，

域

具体过程如下：

①用户主机上运行着DNS的客户端，就是我们的PC机或者手机客户端运行着DNS客户端了

②浏览器将接收到的url中抽取出域名字段，就是访问的主机名，比如

```
http://www.baidu.com/
```

③DNS客户机端向DNS服务器端发送一份查询报文，报文中包含着要访问的主机名字段（中间包括一些列缓存查询以及分布式DNS集群的工作）

④该DNS客户机最终会收到一份回答报文，其中包含有该主机名对应的IP地址

 ⑤一旦该浏览器收到来自DNS的IP地址，就可以向该IP地址定位的HTTP服务器发起TCP连接





### 29.http是什么

HTTP:超文本传输协议(Hypertext Transfer Protocol)

### 30.git分支，开发分支，测试分支，分支合并？



### 31.es6有哪些新特性？说说除了then跟catch，还用过哪些方法？

try..catch,try正确执行，catch错误执行。

es6特性：

1.const，let，用于定义变量

2.箭头函数，减少代码，函数

3.for ...of 遍历数组

4.class，类继承

5.解构，减少代码量

6.剩余展开符，得到剩余遍历

7.字符串模板，不用字符串拼接那么麻烦

acync await 等待一个异步方法执行完毕，放回结果。





### 32.前后端分离，有没有遇到样式冲突的问题

1.二次修改，前端修改好页面，后端工程师需要再修改一次

2.尽量让写出来的页面，后端是直接可用的。



### 33.websocket

websocket--http协议的一个补丁，支持长久连接。http协议的服务器被动性，只有服务器不断发送请求，服务器才会返回response；而websocket协议的服务器具有主动性，只要客服端发起一次请求，就会一直连接，而服务器只要有response就可以主动给返回。

缺点：网络通信问题，若是中间网络信号等问题，互动通信的信息没有抵达接受方，由于是长连接，所以无法判断是否数据丢失。

gulp是工具链，构建工具，可以配合各种插件做js压缩，css压缩，less编译替代手工实现自动化工作。

1.构建工具 2.自动化  3.提高效率用

优点：

1.能够优化前端工作流程，大大提高效率

2.比如自动刷新页面，雪碧图，压缩css，js，编译less，检查语法等

3.简单来说就是使用gulp，然后配置你需要的插件，就可以把以前需要手工做的事情让它帮你做了。



webpack是文件打包工具，可以把项目的各种js文件打包合并成一个或多个文件，主要用于模块化方案，预编译模块的方案。

1.打包工具 2.模块化识别  3.编译模块代码方案用



所以定义和用法上来说都不是一种东西，没有可比性，更不冲突【但具有相似的功能，比如合并，区分，但各有各的优势】、

### 34.清除浮动

hack1：给父元素设置固定width，height

hack2：给父元素添加声明overflow：hidden；（触发------>zoom：1；）

heck3：在浮动元素下方添加空div，并给该元素添加上cleat：both；height：0；overflow：hidden；

hack4：万能清除法

：after{

​	content:".";

​	clear:both;	

​	display:block;

​	height:0;

​	overflow:hidden;

​	visibility:hidden;

}

heck boss:拉轰清除浮动法

给浮动元素添加class = “clearfix”，自动生成

clear：before；clear：after；

.clearfix{overflow：auto；_height：1%}

.clearfix{overflow:hidden;_zoom:1;}



### 35.call,apply,bind分别是

apply和call都是为了改变某个函数运行时的上下文而存在的（就是为了改变函数内部this的指向）

如果使用apply或call方法，那么this指向他们的第一个参数，apply的第二个参数是一个参数数组，call的第二个及其以后的参数都是数组里面的元素，就是说要全部列举出来。

bind（） 也是改变函数体内this的指向

bind会创建一个新函数，称为绑定函数，当调用这个函数的时候。绑定函数会以创建它时传入bind（）方法的第一个参数作为this，传入bind（）方法的第二个及以后的参数加上绑定函数运行时本身的参数按照顺序作为原函数的参数来调用原函数；

bind与apply，call最大的区别就是：bind不会立即调用，其他两个会立即调用。

如果多次调用bind，那么多出来的次数是无效的



### 36.call,apply,bind的区别

都是用来改变函数的this对象的指向的；

第一个参数都是this要指向的对象；

都可以利用后续参数传参

bind是返回对应函数，便于稍后调用，apply，call是立即调用。



### 37.简述一下你对HTML语义化的理解

用正确的标签做正确的事情。

html语义化让页面的内容结构化，结构更清晰，便于对浏览器，搜索引擎解析；

即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的；

搜索引擎的爬虫也依赖于HTML标记来确定上下文和哥哥关键词的权重，利于SEO；

使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。



### 38.如何区分HTML5：DOCTYPE声明\新增的结构元素\功能元素



### 39.iframe有那些缺点

iframe会阻塞主页面的onload事件；

搜索引擎的检查程序无法解读这种页面，不利于SEO

iframe和主页面共享连接池，而浏览器对相同域的连接有限制，所以会影响页面的并行加载。

使用iframe之前需要考虑这两个缺点，如果需要iframe，最好是通过javascript动态给iframe添加src属性值，这样可以绕开以上两个问题。



### 40.vue的组件通信

**1.父组件传递数据给子组件**  

父组件数据如何传递给子组件呢？

可以通过props属性来实现

```
<parent>
    <child :child-msg="msg"></child>
    //这里必须要用 - 代替驼峰
</parent>

data(){
    return {
        msg: [1,2,3]
    };
}
```

子组件通过props来接收数据: 

方式1：

```
props: ['childMsg']
```

方式2 :

```
props: {
    childMsg: Array //这样可以指定传入的类型，如果类型不对，会警告
}
```

方式3：

```
props: {
    childMsg: {
        type: Array,
        default: [0,0,0] //这样可以指定默认的值
    }
}
```

##### 这样呢，就实现了父组件向子组件传递数据。

##### 2.子组件与父组件通信

如果子组件想改变数据呢，在vue是不允许的，因为vue只允许单向数据传递，这时候我们可以触发事件来通知父组件改变数据，从而改变子组件数据的目的。

```
子组件:
<template>
    <div @click="up"></div>
</template>

methods: {
    up() {
        this.$emit('upup','hehe'); //主动触发upup方法，'hehe'为向父组件传递的数据
    }
}
```

父组件:

```
<div>
    <child @upup="change" :msg="msg"></child> //监听子组件触发的upup事件,然后调用change方法
</div>
methods: {
    change(msg) {
        this.msg = msg;
    }
}
```

##### 3.非父子组件通信

如果2个组件不是父子组件那么如何通信呢？这时可以通过eventHub来实现通信. 

所谓eventHub就是创建一个事件中心，相当于中转站，可以用它来传递事件和接收事件.

```
let Hub = new Vue(); //创建事件中心
```

组件1触发：

```
<div @click="eve"></div>
methods: {
    eve() {
        Hub.$emit('change','hehe'); //Hub触发事件
    }
}
```

组件2接收：

```
<div></div>
created() {
    Hub.$on('change', () => { //Hub接收事件
        this.msg = 'hehe';
    });
}
```

这样就实现了非父子组件之间的通信了.原理就是把Hub当作一个中转站！

1.子组件传值父组件

2.父组件调用子组件方法

父组件html：加属性ref = “childMethod”

```
示例：
<date-range ref="effectDate"
    :readonly="readonly"
    :init-data="ruleForm.effectDateRange"
    @change="getEffectDate" >
</date-range>
```

父组件js： 加属性this.$refs.childMethod.funtionName()调用

```
this.$refs.childMethod.funtionName()调用
```

子组件正常些方法在methods中即可。

```
event.js
import Vue from 'vue';
export default new Vue();
```

### 父组件调用子组件方法

子组件：

```
import event from '../../services/event';
created() {
    event.$on('hotelInfo/openDisclaimers', () => {
        this.visible = true;
        this.read = false;
    });
}
```

父组件：

```bash
import event from '../../services/event';

event.$emit('hotelInfo/openDisclaimers');
```



### 41.react的组件通信

### 1.父组件向子组件通信

父组件通过向子组件传递 props，子组件得到 props 后进行相应的处理。

### 2.子组件向父组件通信

利用回调函数，可以实现子组件向父组件通信，父组件将一个函数作为props传递给子组件，子组件调用该回调函数，便可以向父组件通信。

```js
import React from "react";

const Sub = (props) => {
    const cb = (msg) => {
        return () => {
            props.callback(msg)
        }
    }
    return(
        <div>
            <button onClick = { cb("我们通信把") }>点击我</button>
        </div>
    )
}
export default Sub;
```

App.js：

```js
import React,{ Component } from "react";
import Sub from "./SubComponent.js";
import "./App.css";

export default class App extends Component{
    callback(msg){
        console.log(msg);
    }
    render(){
        return(
            <div>
                <Sub callback = { this.callback.bind(this) } />
            </div>
        )
    }
}
```

### 3.跨级组件通信

所谓跨组件通信。就是父组件向子组件的子组件通信，向更深层的子组件通信，跨级组件通信可以采用下面两种方式：

1.中间组件层层传递props（3层以内可以考虑，多了的话会增加复杂度，不适合）

2.使用context对象。

context相当于一个全局变量，是一个大容器，我们可以把要通信的内容放在这个容器中，这样一来，不管嵌套有多深，都可以随意取用。使用context也简单，

需要满足两个条件：

1.上级组件要声明自己支持context，并提供一个函数来返回相应的context对象

2.子组件要声明自己需要使用context

下面以代码说明，我们新建 3 个文件：父组件 App.js，子组件 Sub.js，子组件的子组件 SubSub.js。

```js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Sub from "./Sub";
import "./App.css";

export default class App extends Component{
    // 父组件声明自己支持 context
    static childContextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }

    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext(){
        return{
            color:"red",
            callback:this.callback.bind(this)
        }
    }

    callback(msg){
        console.log(msg)
    }

    render(){
        return(
            <div>
                <Sub></Sub>
            </div>
        );
    }
} 
```

Sub.js：

```js
import React from "react";
import SubSub from "./SubSub";

const Sub = (props) =>{
    return(
        <div>
            <SubSub />
        </div>
    );
}

export default Sub;
```

SubSub.js：

```js
import React,{ Component } from "react";
import PropTypes from "prop-types";

export default class SubSub extends Component{
    // 子组件声明自己需要使用 context
    static contextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }
    render(){
        const style = { color:this.context.color }
        const cb = (msg) => {
            return () => {
                this.context.callback(msg);
            }
        }
        return(
            <div style = { style }>
                SUBSUB
                <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
            </div>
        );
    }
}
```

 如果是父组件向子组件单向通信，可以使用变量，如果子组件想向父组件通信，同样可以由父组件提供一个回调函数，供子组件调用，回调参数。

在使用context时，有两点需要注意

1.父组件需要声明自己支持context，并提供context中属性的propTypes

2.子组件需要声明自己需要使用context，并提供其需要使用的context属性的propTypes。

3.父组件提供一个getChildContext函数，以返回一个初始的context对象。

 **如果组件中使用构造函数（constructor），还需要在构造函数中传入第二个参数 context，并在 super 调用父类构造函数是传入 context，否则会造成组件中无法使用 context**。

改变 context 对象

我们不应该也不能直接改变 context 对象中的属性，要想改变 context 对象，**只有让其和父组件的 state 或者 props 进行关联，在父组件的 state 或 props 变化时，会自动调用 getChildContext 方法，返回新的 context 对象**，而后子组件进行相应的渲染。
 修改 App.js，让 context 对象可变：

```js
import React, { Component } from 'react';
import PropTypes from "prop-types";
import Sub from "./Sub";
import "./App.css";

export default class App extends Component{
    constructor(props) {
        super(props);
        this.state = {
            color:"red"
        };
    }
    // 父组件声明自己支持 context
    static childContextTypes = {
        color:PropTypes.string,
        callback:PropTypes.func,
    }

    // 父组件提供一个函数，用来返回相应的 context 对象
    getChildContext(){
        return{
            color:this.state.color,
            callback:this.callback.bind(this)
        }
    }

    // 在此回调中修改父组件的 state
    callback(color){
        this.setState({
            color,
        })
    }

    render(){
        return(
            <div>
                <Sub></Sub>
            </div>
        );
    }
} 
```

此时，在子组件的 cb 方法中，传入相应的颜色参数，就可以改变 context 对象了，进而影响到子组件：

```js
...
return(
    <div style = { style }>
        SUBSUB
        <button onClick = { cb("blue") }>点击我</button>
    </div>
);
...
```

context 同样可以应在无状态组件上，只需将 context 作为第二个参数传入：

```js
import React,{ Component } from "react";
import PropTypes from "prop-types";

const SubSub = (props,context) => {
    const style = { color:context.color }
    const cb = (msg) => {
        return () => {
            context.callback(msg);
        }
    }

    return(
        <div style = { style }>
            SUBSUB
            <button onClick = { cb("我胡汉三又回来了！") }>点击我</button>
        </div>
    );
}

SubSub.contextTypes = {
    color:PropTypes.string,
    callback:PropTypes.func,
}

export default SubSub;

```

3.状态提升

将多个组件需要共享的状态提升到它们最近的父组件上.在父组件上改变这个状态然后通过props分发给子组件.

实现原理

- 将两个输入框的`value`属性的值绑定到父类中去
- 将两个输入框的`onChange`事件交由父类进行处理

```js
import React from 'react'
class Child_1 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h1>{this.props.value+2}</h1>
            </div> 
        )
    }
}
class Child_2 extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                <h1>{this.props.value+1}</h1>
            </div> 
        )
    }
}
class Three extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            txt:"牛逼"
        }
        this.handleChange = this.handleChange.bind(this)
    }
    handleChange(e){
        this.setState({
            txt:e.target.value
        })
    }
    render(){
       return (
            <div>
                <input type="text" value={this.state.txt} onChange={this.handleChange}/>
                <p>{this.state.txt}</p>
                <Child_1 value={this.state.txt}/>
                <Child_2 value={this.state.txt}/>
            </div>
       )
    }
}
export default Three
```

### 4.非嵌套组件间通信

非嵌套组件，就是没有任何包含关系的组件，包括兄弟组件以及不在同一个父级中的非兄弟组件。对于非嵌套组件，可以采用下面两种方式：

- 利用二者共同父组件的 context 对象进行通信
- 使用自定义事件的方式

如果采用组件间共同的父级来进行中转，会增加子组件和父组件之间的耦合度，如果组件层次较深的话，找到二者公共的父组件不是一件容易的事，当然还是那句话，也不是不可以...
 这里我们采用自定义事件的方式来实现非嵌套组件间的通信。
 我们需要使用一个 events 包：

```
npm install events --save

```

新建一个 ev.js，引入 events 包，并向外提供一个事件对象，供通信时使用：

```bash
import { EventEmitter } from "events";
export default new EventEmitter();

```

App.js：

```js
import React, { Component } from 'react';

import Foo from "./Foo";
import Boo from "./Boo";

import "./App.css";

export default class App extends Component{
    render(){
        return(
            <div>
                <Foo />
                <Boo />
            </div>
        );
    }
} 

```

Foo.js：

```js
import React,{ Component } from "react";
import emitter from "./ev"

export default class Foo extends Component{
    constructor(props) {
        super(props);
        this.state = {
            msg:null,
        };
    }
    componentDidMount(){
        // 声明一个自定义事件
        // 在组件装载完成以后
        this.eventEmitter = emitter.addListener("callMe",(msg)=>{
            this.setState({
                msg
            })
        });
    }
    // 组件销毁前移除事件监听
    componentWillUnmount(){
        emitter.removeListener(this.eventEmitter);
    }
    render(){
        return(
            <div>
                { this.state.msg }
                我是非嵌套 1 号
            </div>
        );
    }
}

```

Boo.js：

```js
import React,{ Component } from "react";
import emitter from "./ev"

export default class Boo extends Component{
    render(){
        const cb = (msg) => {
            return () => {
                // 触发自定义事件
                emitter.emit("callMe","Hello")
            }
        }
        return(
            <div>
                我是非嵌套 2 号
                <button onClick = { cb("blue") }>点击我</button>
            </div>
        );
    }
}

```

自定义事件是典型的发布/订阅模式，通过向事件对象上添加监听器和触发事件来实现组件间通信。

## 总结

本文总结了 React 中组件的几种通信方式，分别是：

- 父组件向子组件通信：使用 props
- 子组件向父组件通信：使用 props 回调
- 跨级组件间通信：使用 context 对象
- 非嵌套组件间通信：使用事件订阅

事实上，在组件间进行通信时，这些通信方式都可以使用，区别只在于使用相应的通信方式的复杂程度和个人喜好，选择最合适的那一个。比如，通过事件订阅模式通信不止可以应用在非嵌套组件间，还可以用于跨级组件间，非嵌套组件间通信也可以使用 context 等。关键是选择最合适的方式。
 当然，自己实现组件间的通信还是太难以管理了，因此出现了很多状态管理工具，如 flux、redux 等，使用这些工具使得组件间的通信更容易追踪和管理。



### 发布订阅模式

#### emit和on

这一点有点像`vuex`和`redux`里面的某部分概念，也跟`$emit`和`$on`和node自带的`event`模块作用很相像，其实可以这样理解，如果单独用对象把数据存起来，数据改变的时候没有人会追踪到，所以这里在每次改变数据前都放入一个或多个回调函数形成队列去监听`on方法`，这些回调函数在队列中等待，直到触发了某些机制，这些函数才按顺序逐一回来触发`emit方法`，从而可以在这个时刻监听到新的数据变化并完成逻辑

```js
let weux = {};
// 这次换成一个对象类型的缓存列表
weux.list = {};
weux.on = function (key, fn) {
    // 如果对象中没有对应的key值
    // 也就是说明没有订阅过
    // 那就给key创建个缓存列表
    if (!this.list[key]) {
        this.list[key] = [];
    }
    // 把函数添加到对应key的缓存列表里
    this.list[key].push(fn);
};
weux.emit = function (key, param) {
    // 或者let key = [].shift.call(arguments);
    // 或者let fns = this.list[key];
    // 根据获取改函数数组队列
    let fns = this.list[key];
    // 如果缓存列表里没有函数就返回false
    if (!fns || fns.length === 0) {
        return false;
    }
    // 遍历key值对应的缓存列表
    // 依次执行函数的方法
    fns.forEach(fn => {
        // 传入参数
        fn(param);
        // 或者 fn.apply(this, arguments);
    });
};
// 测试用例
weux.on('test', (param) => {
    console.log('位置:' + param.position);
    console.log('技能:' + param.skill);
});
weux.emit('test', {
    position: '前端',
    skill: ['ps', 'css', 'js']
});
```

## 如何防止手机页面缩放
```html
<meta name="viewport" content="maximum-scale=1.0,minimum-scale=1.0,user-scalable=0,width=device-width,initial-scale=1.0"/>
```
* 作用: 在移动浏览器中，当页面宽度超出设备，浏览器内部虚拟的一个页面容器，将页面容器缩放到设备那么大展示
* 视口的宽度可以通过meta标签设置
此属性为移动端页面视口设置
* width: 视口的宽度，width=device-width: 宽度是设备的宽度
* initial-scale: 初始化缩放，- initial-scale=1.0: 不缩放
* user-scalable: 是否允许用户自行缩放，取值0或1，yes或no
* minimum-scale: 最小缩放
* maximum-scale: 最大缩放

### 关于meta标签
> 定义字符编码
```html
<meta charset="utf-8">
```
> 针对搜索引擎的关键词
```html
<meta name="keywords" content="HTML, meta />
```

> 自动刷新
```html
<meta http-equiv="refresh" content="5" />
```
更多meta标签之间查看w3c官方文档--[meta标签](http://www.w3school.com.cn/html5/tag_meta.asp)

## 遍历某一元素下的子元素
jQuery版: 
```js
function each(element){// element为获取到的jquery对象
    var arr = [];
    arr.push(element[0]);
    // console.log(arr);
    if(element.children().length > 0){
        element.children().each((index, el) => {
            arr = arr.concat(...each($(el)));
        })
    }
    return arr;
}
```

原生版: 
```js
function eachJs(element){
    var arr = [];
    arr.push(element);
    if(element.children.length){
        for(let el of element.children){
            arr = arr.concat(eachJs(el));
        }
    }
    return arr;
}
```

## 页面404原因
> 未找到资源文件
### 常见http转态码: 
* **100**: 继续 客户端应当继续发送请求。客户端应当继续发送请求的剩余部分，或者如果请求已经完成，忽略这个响应。
* **101**:  转换协议 在发送完这个响应最后的空行后，将会切换到在Upgrade 消息头中定义的那些协议。只有在切换新的协议更有好处的时候才应该采取类似措施。
* **102**: 继续处理 由WebDAV（RFC 2518）扩展的状态码，代表处理将被继续执行。
* **200**: 请求成功 处理方式: 获得响应的内容，进行处理
* **201**: 请求完成，结果是创建了新资源。新创建资源的URI可在响应的实体中得到 处理方式: 爬虫中不会遇到
* **202**: 请求被接受，但处理尚未完成 处理方式: 阻塞等待
* **204**: 服务器端已经实现了请求，但是没有返回新的信 息。如果客户是用户，则无须为此更新自身的文档视图。 处理方式: 丢弃
* **300**: 该状态码不被HTTP/1.0的应用程序直接使用， 只是作为3XX类型回应的默认解释。存在多个可用的被请求资源。 处理方式: 若程序中能够处理，则进行进一步处理，如果程序中不能处理，则丢弃 
* **301**: 请求到的资源都会分配一个永久的URL，这样就可以在将来通过该URL来访问此资源 处理方式: 重定向到分配的URL
* **302**: 请求到的资源在一个不同的URL处临时保存 处理方式: 重定向到临时的URL
* **304**: 请求的资源未更新 处理方式: 丢弃
* **400**: 非法请求 处理方式: 丢弃
* **401**: 未授权 处理方式: 丢弃
* **403**: 禁止 处理方式: 丢弃
* **404**: 没有找到 处理方式: 丢弃
* **500**: 服务器内部错误 服务器遇到了一个未曾预料的状况，导致了它无法完成对请求的处理。一般来说，这个问题都会在的源代码出现错误时出现。
* **501**: 服务器无法识别 服务器不支持当前请求所需要的某个功能。当服务器无法识别请求的方法，并且无法支持其对任何资源的请求。
* **502**: 错误网关 作为网关或者工作的服务器尝试执行请求时，从上游服务器接收到无效的响应。
* **503**: 服务出错 由于临时的维护或者过载，服务器当前无法处理请求。这个状况是临时的，并且将在一段时间以后恢复。

## HTML5 新特性
### 1, 语义化标签: 

 |标签|描述|
 |--|--|
 |`<hrader></header>`|定义了文档的头部|区域
 |`<footer></footer>`|定义了文档的尾部|区域
|`<nav></nav>`|	定义文档的导航
 |`<section></section>`|定义文档中的节|（section、区段）
 |`<article></article>`|定义页面独立的|内容区域
|`<aside></aside>`|	定义页面的侧边栏内容|
|`<detailes></detailes>`|用于描述文档或文档某个部分的细节|
|`<summary></summary>`|标签包含 details 元素的标题|
|`<dialog></dialog>`|定义对话框，比如提示框|

### 2, 增强表单: 

|输入类型|描述|
|--|--|
|color|主要用于选取颜色|
|date|从一个日期选择器选择一个日期|
|datetime|选择一个日期（UTC 时间）|
|datetime-local|选择一个日期和时间 (无时区)|
|email|包含 e-mail 地址的输入域|
|month|选择一个月份|
|number|数值的输入域|
|range|一定范围内数字值的输入域|
|search|用于搜索域|
|tel|定义输入电话号码字段|
|time|选择一个时间|
|url| URL 地址的输入域|
|week|选择周和年|

### 3, 新增表单: 

|表单元素|描述|
|--|--|
|`<datalist>`|元素规定输入域的选项列表使用 `<input>` 元素的 list 属性与 `<datalist>` 元素的 id 绑定|
`<keygen>`|提供一种验证用户的可靠方法标签规定用于表单的密钥对生成器字段。|
|`<output>`|用于不同类型的输出比如计算或脚本输出|

### 4, 新增的表单属性

|属性|说明|
|--|--|
|placehoder|属性，简短的提示在用户输入值前会显示在输入域上。即我们常见的输入框默认提示，在用户输入后消失。|
|required|属性，是一个boolean 属性。要求填写的输入域不能为空|
|pattern|属性，描述了一个正则表达式用于验证`<input>` 元素的值。|
|min|和 max 属性，设置元素最小值与最大值。|
|step|属性，为输入域规定合法的数字间隔。|
|height|和 width 属性，用于 image 类型的 `<input>` 标签的图像高度和宽度。|
|autofocus|属性，是一个 boolean 属性。规定在页面加载时，域自动地|获得焦点。|
|multiple|属性 ，是一个 boolean 属性。规定`<input>` 元素中可选择多|个值。|

### 5, 音频`<video />`和视频`<audio>`

### 6, canvas标签(画布): 
> 使用JS绘制图形文本

### 7, svg标签(矢量图):
> 使用xml格式定义图片

#### canvas与svg区别<br>
> 在 SVG 中，每个被绘制的图形均被视为对象。如果 SVG 对象的属性发生变化，那么浏览器能够自动重现图形。<br>

> Canvas 是逐像素进行渲染的。在 canvas 中，一旦图形被绘制完成，它就不会继续得到浏览器的关注。如果其位置发生变化，那么整个场景也需要重新绘制，包括任何或许已被图形覆盖的对象。

* Canvas
    * 依赖分辨率, 与位图一样
    * 一个canvas标签是一体的, 没有任何子标签
    * 不支持事件处理器
    * 弱的文本渲染能力
    * 能够以 .png 或 .jpg 格式保存结果图像
    * 重绘时性能比较好, 使用于游戏(但是目前大型页游依旧使用flash)
* SVG
    * 不依赖分辨率, 与矢量图一样
    * svg标签下的内容会以节点形式渲染
    * 支持事件处理器
    * 最适合带有大型渲染区域的应用程序（比如地图）
    * 复杂度高会减慢渲染速度（任何过度使用 DOM 的应用都不快）
    * 重绘是消耗新能过大, 不适用于游戏, 可用于小图标(文字图标)
参考: [w3school](http://www.w3school.com.cn/html5/html_5_canvas_vs_svg.asp)

### 8, webStorage(存储): 

* localStorage: 永久储存, 只有主动删除或写在浏览器, 否在永远存在
* sessionStorage: 只储存在当前页面中, 离开页面后失效(删除) 

### 9, 删除的标签 
|标签|说明|
|--|--|
|basefont|规定页面上的默认字体颜色和字号|
|big|呈现大号字体效果。|
|center|对其所包括的文本进行水平居中|
|font|规定文本的字体、字体尺寸、字体颜色|
|s|标记删除线文本|
|strike|定义加删除线文本定义|
|tt|呈现类似打字机或者等宽的文本效果|
|u|为文本添加下划线|
|frame|定义 frameset 中的一个特定的窗口|
|frameset|可定义一个框架集。它被用来组织多个窗口|
|noframes |那些不支持框架的浏览器显示文本|
|acronym |标记一个首字母缩写|
|applet|嵌入一个 Java applet|
|isindex|显示一个对话框，提示用户输入单行文本|
|dir|定义目录列表|

### 10, 重新定义的标签
|标签|重新定义的作用|
|--|--|
|b|代表内联文本，通常是粗体，没有传递表示重要的意思 |
|i|代表内联文本，通常是斜体，没有传递表示重要的意思|
|dd|可以同details与figure一同使用，定义包含文本，dialog也可用 |
|dt|可以同details与figure一同使用，汇总细节，dialog也可用|
|hr|表示主题结束，而不是水平线，虽然显示相同 |
|menu|重新定义用户界面的菜单，配合commond或者menuitem使用 |
|small|表示小字体，例如打印注释或者法律条款 |
|strong|表示重要性而不是强调符号 |


## `JavaScript`中的`this`
> JavaScript中的this指代函数的当前运行环境
### 为什么会有`this`: 
> JavaScript中引用类型的赋值时把数据的地址赋给变量, 访问变量时, 会从变量中获取到内存地址, 在用这个地址从内存中获取数据<br>
> 但是JavaScript中会把函数存储在单独的内存中
> 所以当函数运行时, 就需要知道, 当前函数运行在哪一个环境(上下文)中, 所以this的出现就是指明函数当前的运行环境(上下文)

## Get 和 Post 请求的区别: 
> Get和Post都是http请求的一种方式
* 1, 传参的不同: Get请求使用URL传递参数, 而Post则使用请求体
* 2, 参数数量: Get的参数数量受URL长度限制
* 3, 参数类型: Get只能使用字符串, Post没有限制
* 4, 安全性: Post比Get更加安全
* 5, 编码格式: Get只能使用URL编码, 而Post支持多种编码格式
* 6, 请求速度: Get请求比Post请求更快, Get请求会一次性把请求头和请求体一并发送个服务器, 而Post会分两次发送, 第一次发送请求同, 等服务器返回100 continue(服务器处不处理post请求), 再发送请求体, (但是部分浏览器post请求也是只发送一次)
### http的 8 种请求方式
|请求方式|说明|
|--|--|
|GET|获取资源, 用来请求已被URI识别的资源|
|POST|传输实体, 向服务器传输数据|
|HEAD|获得报文首部, 用于确认URI的有效性及资源更新的日期时间等|
|PUT|传输文件, 用来传输文件，就像FTP协议的文件上传一样，要求在请求报文的主体中包含文件内容，然后保存在请求URI指定的位置|
|DELETE|删除文件, 服务器删除某个资源|
|OPTIONS|询问支持的方法, 查询针对请求URI指定资源支持的方法|
|TRACE|追踪路径, 让Web服务器端将之前的请求通信还给客户端的方法|
|CONNECT|要求用隧道协议连接代理, 要求在与代理服务器通信时建立隧道，实现用隧道协议进行TCP通信|

## JavaScript 继承: 
### 原型链继承: 
> 把父类的实例作用子类的原型<br>
> 只能继承到父类的函数, 不能继承到父类的属性
```js
function Father(){}
function Child(){}
Child.prototype = new Father();
```

### 借用构造函数
> 在子类的构造函数使用call()借用父类的构造函数<br>
> 只能继承到属性, 不能继承到方法

```js
function Father(){}
function Child(){
    Father.call(this,parm...);
}
```

### 原型式继承法
> 利用临时空构造函数F,把F的prototype指向父类prototype<br>
> 再把F的实例作为子类的原型<br>
> 也只能继承到函数, 无法继承属性, 但是子类少了父类的属性定义

```js
function Father(){}
function Child(){}
function inherit(p){
    function F(){}
    F.prototype = p;
    return new F();
}
Child.prototype = inherit(Father.prototype);
// 或者使用ES5 的Object.create()
Child.prototype = Object.create(Father.prototype);
```

### 组合继承
> 把原型链继承和借用构造函数结合起来, 实现属性和函数的继承<br>
> 会多次执行父类的构造函数

### 寄生组合继承
> 把原型链继承和借用构造函数结合起来, 实现属性和函数的继承<br>
> 完美解决继承问题

### ES6 class
> 使用ES6的`class`和`extends`实现继承
```js
class Father {}
class Child extends Father{}
```

## 移动端自适应方案
### 百分百布局(bootstrap栅格系统的实现)
### rem布局: 根据屏幕尺寸的大小, 同比的调整rem(根节点)的大小

## vue的路由中, history模式和hash模式的区别
> url不同
> history需要后端支持

## scrollBehavior(to, form, savePosition){}
> vue 路由的滚动行为, 定义切换路由时滚动到那个位置, 仅history模式可用<br>
> to: 跳转前的路由<br>
> from: 跳转后的路由<br>
> savePosition: 仅使用浏览器前进后退时可用, 记录上一次该路由的滚动位置<br>

## 前端页面的优化
### Vue的性能优化
* 对路由组件进行懒加载const Login = () => import('@/pages/Login’)
* 对第三方文件库引用CDN
* 对代码进行压缩打包处理

### 前端优化，页面优化JS优化 PC端 移动端使用
* 减少DOM节点操作，使用虚拟DOM vue react等
* 尽量减少ajiax 请求，多次请求同样数据可以多数据进行缓存处理 
* 标签中尽量避免出现空的 href src 连接
* 减少cookie等 本地缓存
* 减少for循环的使用次数for循环很影响性能 
* 图片的处理，使用精灵图，图片懒加载，预加载等
* 减少重定向
* 图片压缩处理
* 直接引用第三方资源库CDN

### jq优化
* jq版本问题，理论来说，版本越高，性能越好
* 选择器性能 `id > tag > class > [attr] > :伪类`
* 缓存对象
* 链式调用
* 避免频繁的操作DOM节点
* 事件代理
* 尽量用原生的方法
* 封装插件

## Vue的声明周期钩子函数
|钩子函数|说明|
|--|--|
|beforeCreate|vue实例创建(newVue())之后, 初始化完成, 创建之前调用, 无数据, 无模板, 未挂载|
|created|vue实例创建完成后调用, 有数据, 无模板, 未挂载|
|beforeMount|vue实例挂载前调用, 有数据, 有模板, 未挂载|
|mounted|vue实例挂载后调用, 有数据, 有模板, 已挂载|
|beforeUpdate|数据更新前|
|updated|数据更新后|
|activated|keep-alive 组件激活时调用|
|deactivated|keep-alive 组件停用时调用|
|beforeDestroy|实例销毁前|
|destroyed|实例销毁后|
|errorCaptured|当捕获一个来自子孙组件的错误时被调用|

## react的声明周期钩子函数
|钩子函数|说明|
|--|--|
|getDefaultProps|设置默认的props，也可以用dufaultProps设置组件的默认属性.|
|constructor|数据的实例化|
|componentWillMount|组件将要挂载|
|render|组件挂载|
|componentDidMount|组件已挂载|
|omponentWillReceiveProps|props更新, 接收一个参数: 新的props|
|shouldComponentUpdate|数据(state)更新后, 决定是否更新视图<br>返回true更新视图<br>接收两个参数:props和新的state|
|componentWillUpdate|数据已经更新但是视图未更新<br>接收两个参数:props和新的state<br>如果上一个生命周期 `shouldComponentUpdate` 返回 false, 那么这个声明周期不会被执行|
|componentDidUpdate|视图已经更新<br>接收两个参数:props和新的state|
|componentWillUnmount|组件卸载|

## cookie, sessionStorage, localStorage的区别
> cookie, sessionStorage, localStorage 都是客户端存储的方式

| |大小|数量|时效性|跟随HTTP请求|操作|
|--|--|--|--|--|--|
|cookie|4k左右|50个左右|可设置<br>默认浏览器关闭失效|是|`documnet.cookie`|
|localStorage|5M|无限制|不可设置<br>除非主动删除或卸载浏览器, 否则永远存在|否|`localStorage.[set|get|remove]`|
|sessionStorage|5M|无限制|不可设置<br>同源同窗口生效|否|`sessionStorage.[set|get|remove]`|
> 因为cookie的数据会被http请求携带到服务器, 所以cookie数据应该精简

## ajax的过程
### 创建XMLHttpRequest对象
```js
let xhr = new XMLHttpRequest();
```
### 调用open
```js
xhr.open(...);
```

### 发送请求send()
```js
xhr.send();
```
### 监听转态
```js
xhr.onreadStateChange = () => {}
```
不同的readState对应的转态: 
* `readState == 0` : 代表对象已经实例化,但是还没调用open()
* `readState == 1` : 代表对象已经调用open(),但是请求还没发送
* `readState == 2` : 代表请求已经发送,但是还没有数据返回
* `readState == 3` : 代表返回部分数据
* `readState == 4` : 代表数据已经全部返回

## 微信小程序相关问价类型
> 微信小程序的相关文件类型有: <br>
> `js, json, wxml, wxss`

* 1, js: 脚本文件, 页面的交互逻辑
* 2, json: 配置文件, 页面的配置
* 3, wxml: 结构文件, 页面的内容, 类似于网页中的html文件
* 4, wxss: 样式文件, 页面的样式, 类似于网页中的css文件

> 几个重要的文件: <br>
> `app.js, app.json, app.wxss`

* 1, app.js: 用于处理程序的生命周期等
* 2, app.json: 用于全局配置小程序的文件路径窗口表现等
* 2, app.wxss: 全局样式文件

## css选择器
|选择符|权重|
|--|--|
|ID 选择器|100|
|class 选择器|10|
|标签 选择器|1|
|伪类 选择器|10|
|属性 选择器|10|
|通配符|0|
|行内样式|1000|
|!import|10000|
|继承样式|无|
> 对于多个选择器构成的选择器, 其权重为多个选择器之和
> 例如: `#id .class tag` 权重为 100 + 10 + 1 = 111;

## 如何处理页面的兼容性
### 1, ios/安卓混合开发有哪些兼容性问题
* 1, 多图上传问题: 安卓不能上传多张图片，没有什么解决方案
* 2, 浮动问题: 尽量用盒模型布局
* 3, 音频自动播放问题，ios默认不自动播放: 在document上添加点击事件播放音频
* 4, iOS横屏幕会重置字体大小: text-size-adjust: none;
* 5, i iOS手机页面里可滚动内容滚动不流畅: 
* 6, 安卓浏览器看背景图片，有的会模糊 :  background-size: contain；
* 7, transition闪屏 transfrom-style:preserve-3d

### 2, 浏览器问题；
#### Css兼容: 
* 低版本常见问题: css 
    * 1 当图片加<a  href=”#”></a> 在 IE会出现边框；解决办法: border: 0 none；
    * 2 在div中插入图片，图片会在下边撑起三像素: 解决办法: img转换成块级元素；
    * 3 双倍浮动问题；给浮动元素添加margin会双倍显示；解决办法: 浮动元素加display: inline       
    * 4 默认高度，低版本会出现默认高度: 解决办法: font-size: 0；
    * 5表单元素行高不一致: 解决: vertical-align: middle；
    * 6 百分比BUG 50%+50%>100%，解决 给浮动元素添加标识 clear: right clear；left
    * 7 鼠标指针BUG cursor: hand 只能在IE9一下；cursor: point用于ie6以上高级版本
    * 8 透明属性opacity: 0-1 ie8: filter: alpha（opacity 0-100） ；
* Css3 要加前缀
    * 1 Chrome: -webkit-；
    * 2 safari: -webkit- ;
    * 3 opera: -o-;
    * 4 firefox:  -moz-；
    * 5 ie: -ms-
#### JS兼容问题
|问题|方法|
|--|--|
|获取样式<br>(是获取, 不是设置)|`getcomputedstyle（el）|| el.currentstyle (IE8)`|
|window事件源|`e = e || window.event (ie8)`|
|键盘键码|`e=e.which || e。Keycode`|
|浏览器默认行为|`event.preventDefault || event.returevale=false`|
|停止冒泡|`event.stoppropagation || cancecBable=true`|
|事件监听|`addEventListener || attachEventremoveEventListener || detachEvent`|

## 什么是变量提升, ES6怎么避免?
> 变量提升, 也叫声明提前<br>
> 使用`var`声明变量, 所用变量的声明都会提前到当前作用域的最开始执行
> 注意: 只有声明提前了, 赋值没有提前<br>
> ES6 中增加了`let` 和 `const`关键字用于声明变量<br>
> 使用`let`和`const`声明的变量不会出现声明提前, 并且具有块级作用域

## keep-alive组件
>  包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们<br>
> 当组件在`<keep-alive>`内被切换, 它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。
> 主要用于保留组件状态或避免重新渲染。
### keep-alive的props(属性)
> include - 字符串或正则表达式。只有名称匹配的组件会被缓存。<br>
> exclude - 字符串或正则表达式。任何名称匹配的组件都不会被缓存。<br>
> max - 数字。最多可以缓存多少组件实例。

详细参考Vue文档 -- [keep-alive官方文档](https://cn.vuejs.org/v2/api/#keep-alive)

## 数组去重的方法
### 利用`ES6` 集合和数组`from`函数
```js
let arr = [1,78,6,5,4,98,5,6,7,98];
let set = new Set(arr);
arr = Array.from(set);
console.log(arr);
```

## 使用forEach遍历
```js
let arr = [1,78,6,5,4,98,5,6,7,98];
let newArr = [];
arr = arr.forEach(item => {
    if(newArr.indexOf(item) < 0){
        newArr.push(item);
    }
});
console.log(newArr);
```

## 闭包
> 闭包就是函数内嵌套函数<br>
> 在函数中定义的变量, 被内层函数应用后, 不会被垃圾将回收机制回收<br>
> 优点: 可以使用函数内的变量, 并且不被回收
> 缺点: 过多使用, 会对内存造成压力

## dom节点的操作
### 节点的获取
```js
document.getElementById('id');
document.getElementByName('name');
node.getElementByClassName('class');
node.getElementByTagName('tag');
node.querySelect('select');
node.querySelectAll('select');
```
### 节点的创建
```js
document.createElement('tagName');
document.createTextNode('text');
document.createAttribute('name');
```

### 节点的添加
```js
node.appendChild(childNode);
node.innserBefore(childNode);
```
### 节点的删除
```js
node.removeChild(childNode);
```

### 复制节点
```js
node.cloneNode(true | false);
```

## 冒泡排序 和 选择排序
### 冒泡排序
```js
for(int i=0;i<arr.length;i++){
    for(int j=0;j<arr.length-1-i;j++){
        if(arr[j]>arr[j+1]){
            arr[j] = arr[j] + arr[j+1];
            arr[j+1] = arr[j] - arr[j+1];
            arr[j] = arr[j] - arr[j+1];
        }
    }
}
```
### 选择排序
```js
for(int i=0;i<arr.length;i++){
    for(int j=i+1;j<arr.length;j++){
        if(arr[i] < arr[j]){
            arr[i] = arr[i] + arr[j];
            arr[j] = arr[i] - arr[j];
            arr[i] = arr[i] - arr[j];
        }
    }
}
```

## JavaScript 同源策略
> 同源政策，是为了保证用户信息的安全，防止恶意的网站窃取数据的一种限时<br>
> 什么是同源: 即 **协议**, **域名**, **端口** 相同情况下, 才叫同源<br>
> 三者有一个不同即使不同源, 访问不同源的资源就会造成**跨域**

### 跨域的解决方法
* JSONP
> 利用src不受同源策略的限制, 可以访问不同源的资源<br>
> 而`script`标签期望请求到一段JS代码<br>
> 所以利用`script`标签去请求不同源的后端接口<br>
> 接口返回一段前端函数调用的JS代码, 并把数据作为参数传入
> 前端通过函数的处理逻辑获取数据
> jsonp理论上不属于ajax请求
* CORS
> 后端接口设置响应同, 为指定用户或所有用户开发访问权限
* 服务器代理
> 因为后端访问不受同源策略的影响, 所以可以使用同源的服务器去访问不同源的资源
> 在把获取到的资源返回给前端
* sorket
> sorket没有跨域问题, 可以使用sorket进行前后端数据交换

## 下面这个ul, 使用JavaScriptd点击li时console.log对应的index
```html
<ul id="ul">
    <li>1</li>
    <li>2</li>
    <li>3</li>
</ul>
```
* 使用let
```js
for(let i=0;i<ul.children.length;i++){
    ul.children[i].onclick = function(){
        console.log(i);
    }
}
```
* 使用自定义属性
```js
for(var i=0;i<ul.children.length;i++){
    ul.children[i].setAttribute('data-index', i);
    ul.children[i].onclick = function(){
        // 使用getAttribute获取自定义属性
        console.log(this.getAttribute('data-index'));
        // 使用dataset获取自定义属性(es5)
        // console.log(this.dataset.index);
    }
}
```
* 使用闭包
```js
for(var i=0;i<ul.children.length;i++){
    ul.children[i].onclick = (function(i){
        return function(){
            console.log(i);
        }
    })(i)
}
```
* 使用bind
```js
for(var i=0;i<ul.children.length;i++){
    ul.children[i].onclick = (function(i){
        console.log(i);
    }).bind(ul.children[i], i);
}
```

## 实现垂直水平居中的方式
* 定位 + margin
```css
position: absolute;/* 父节点要定位 */
top: 0;
bottom: 0;
left: 0;
right: 0;
margin: auto;
```
* 定位 + 负margin
```css
width: 100px;
height: 100px;
position: absolute;/* 父节点要定位 */
top: 50%;
bottom: 50%;
margin-top: -50px;
margin-left: -50px;
```
* 定位 + transform
```css
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
```
* 弹性盒(父盒子设置)
```css
display: flex;
justify-content: center;
align-items: center;
```

## vue的组件通信

* 使用Vuex
* 使用自定义事件
* 使用第三方实例


## ===============================================
## 未解决的题目
* Node.js 的适用场景和优缺点是什么, 以及对中间件的理解

* promise 的基本使用和**原理**

* webpack loader 是用来处理什么的， 为什么要用到plugin

* webpack 打包后的源文件运行原理? (是不是**eval**啊 >_< )

* f(1)=1, f(1)(2)=2, f(1)(2)(3)=6, 设置一个函数输出一下的值(这个题看不懂啊)

* vue-cli 中的 dev.env.js 和 prod.env.js 文件的作用

