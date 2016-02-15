##说说你对闭包的理解
##Talk about your understanding of closures

使用闭包主要是为了设计私有的方法和变量。闭包的优点是可以避免全局变量的污染，缺点是闭包会常驻内存，会增大内存使用量，使用不当很容易造成内存泄露。

Using closures designed primarily to private methods and variables. Closure advantage of global variables are avoided contamination, the disadvantage is the closure will be permanent memory, the memory usage increases, improper use is likely to cause a memory leak.



闭包有三个特性:

Closures have three characteristics:

>1.函数嵌套函数
>2.函数内部可以引用外部的参数和变量
>3.参数和变量不会被垃圾回收机制回收

1. Function 
2. The internal function nested function can refer to external parameters and variables 
3. The parameters and variables will not be garbage collection mechanism Recycling

 
请你谈谈Cookie的弊端

You talk about the shortcomings of Cookie
-----------------

`cookie`虽然在持久保存客户端数据提供了方便，分担了服务器存储的负担，但还是有很多局限性的。
第一：每个特定的域名下最多生成20个`cookie`

    1.IE6或更低版本最多20个cookie
    2.IE7和之后的版本最后可以有50个cookie。
    3.Firefox最多50个cookie
    4.chrome和Safari没有做硬性限制
    
    1.IE6 or earlier up to 20 cookie 
    2.IE7 later version and last may have 50 cookie. 
    3.Firefox up to 50 cookie 
    4.chrome and Safari does not do hard limit. IE and Opera will clean up the least recently used cookie , Firefox will randomly to clean cookie .

`IE`和`Opera` 会清理近期最少使用的`cookie`，`Firefox`会随机清理`cookie`。

`cookie`的最大大约为`4096`字节，为了兼容性，一般不能超过`4095`字节。

IE 提供了一种存储可以持久化用户数据，叫做`userdata`，从`IE5.0`就开始支持。每个数据最多128K，每个域名下最多1M。这个持久化数据放在缓存中，如果缓存没有清理，那么会一直存在。

IE can provide a way to store persistent user data, called UserData , from IE5.0 has supported. Each data up to 128K, under each domain up to 1M. The persistent data in the cache, if not cleaned the cache, it will always exist.


###优点：极高的扩展性和可用性
###Advantages: high scalability and availability

    1.通过良好的编程，控制保存在cookie中的session对象的大小。
    2.通过加密和安全传输技术（SSL），减少cookie被破解的可能性。
    3.只在cookie中存放不敏感数据，即使被盗也不会有重大损失。
    4.控制cookie的生命期，使之不会永远有效。偷盗者很可能拿到一个过期的cookie。
    
    1. Good programming, control the size of the session cookie stored in the object. 
    2. encryption and secure transmission technology (SSL), to reduce the possibility of cookie to crack. 
    3. Only non-sensitive data is stored in a cookie, even if stolen will not have significant losses. 
    4. Control cookie lifetime, so it will not always be effective. Theft are likely to get an expired cookie.

###缺点：
###Disadvantages:

    1.`Cookie`数量和长度的限制。每个domain最多只能有20条cookie，每个cookie长度不能超过4KB，否则会被截掉。
    
    2.安全性问题。如果cookie被人拦截了，那人就可以取得所有的session信息。即使加密也与事无补，因为拦截者并不需要知道cookie的意义，他只要原样转发cookie就可以达到目的了。
    
    3.有些状态不可能保存在客户端。例如，为了防止重复提交表单，我们需要在服务器端保存一个计数器。如果我们把这个计数器保存在客户端，那么它起不到任何作用。
    
    1.`Cookie` limit the number and length. Each domain can have a maximum of 20 cookie, each cookie length can not exceed 4KB, otherwise it will be truncated. 

    2. The security issues. If the cookie is intercepted, that person can get all the session information. Even if encryption is also unhelpful, because Interceptor does not need to know the meaning of the cookie, cookie forwarding as long as he can achieve their goals. 

    3. Some state can not be stored in the client. For example, in order to prevent duplicate submission form, we need to save a counter on the server side. If we put this counter is stored in the client, then it will not achieve any effect.
Browser local storage

浏览器本地存储
---------
在较高版本的浏览器中，`js`提供了`sessionStorage`和`globalStorage`。在`HTML5`中提供了`localStorage`来取代`globalStorage`。

In later versions of the browser, JS provides sessionStorage and globalStorage . In HTML5 provides in localStorage to replace globalStorage.

`html5`中的`Web Storage`包括了两种存储方式：`sessionStorage`和`localStorage`。

html5 The Web Storage includes two storage methods: sessionStorage and localStorage .

`sessionStorage`用于本地存储一个会话（session）中的数据，这些数据只有在同一个会话中的页面才能访问并且当会话结束后数据也随之销毁。因此`sessionStorage`不是一种持久化的本地存储，仅仅是会话级别的存储。

sessionStorage data stored locally for a session (session) in which the data only in the same session of the page to access data, and when the end of the session also will be destroyed. So sessionStorage not a persistent local storage, just session-level storage.

而`localStorage`用于持久化的本地存储，除非主动删除数据，否则数据是永远不会过期的。

And localStorage for persistent local storage, unless the initiative to remove the data, or the data is never out of date.

###web storage和cookie的区别
###the difference between web storage and a cookie


`Web Storage`的概念和`cookie`相似，区别是它是为了更大容量存储设计的。`Cookie`的大小是受限的，并且每次你请求一个新的页面的时候`Cookie`都会被发送过去，这样无形中浪费了带宽，另外`cookie`还需要指定作用域，不可以跨域调用。

Web Storage concept and cookie similar, except that it is designed for higher-capacity storage. Cookie size is limited, and every time you request a new page when the Cookie will be sent in the past, so that virtually waste bandwidth, another cookie also need to specify the scope, not cross-domain calls.

除此之外，`Web Storage`拥有`setItem,getItem,removeItem,clear`等方法，不像`cookie`需要前端开发者自己封装`setCookie，getCookie`。

In addition, Web Storage has setItem, getItem, removeItem, clear methods, unlike the cookie front-end developers need their own package setCookie, getCookie.

但是`cookie`也是不可以或缺的：`cookie`的作用是与服务器进行交互，作为`HTTP`规范的一部分而存在 ，而`Web Storage`仅仅是为了在本地“存储”数据而生

But the cookie is not indispensable: cookie 's role is to interact with the server as HTTP part of the specification exists, and Web Storage simply to the local "store" raw data

浏览器的支持除了`IE７`及以下不支持外，其他标准浏览器都完全支持(ie及FF需在web服务器里运行)，值得一提的是IE总是办好事，例如IE7、IE6中的`userData`其实就是`javascript`本地存储的解决方案。通过简单的代码封装可以统一到所有的浏览器都支持`web storage`。

Browser support in addition to IE7 and below are not supported, other standard browsers fully support (ie and FF need to run a web server in), it is worth mentioning that IE always good things, such as IE7, IE6 in the userData fact is javascript local storage solutions. By simple code package can be unified to all the browsers support Web storage.

`localStorage`和`sessionStorage`都具有相同的操作方法，例如`setItem、getItem`和`removeItem`等

localStorage and sessionStorage have the same method of operation, for example setItem, getItem and removeItem etc.

###cookie 和session 的区别：
###cookie and session distinction:
 
     1、cookie数据存放在客户的浏览器上，session数据放在服务器上。
     2、cookie不是很安全，别人可以分析存放在本地的COOKIE并进行COOKIE欺骗
        考虑到安全应当使用session。
     3、session会在一定时间内保存在服务器上。当访问增多，会比较占用你服务器的性能
         考虑到减轻服务器性能方面，应当使用COOKIE。
     4、单个cookie保存的数据不能超过4K，很多浏览器都限制一个站点最多保存20个cookie。
     5、所以个人建议：
        将登陆信息等重要信息存放为SESSION
        其他信息如果需要保留，可以放在COOKIE中
        
     1, cookie data is stored on the customer's browser, session data on the server. 
     2, cookie is not very safe, others can be analyzed at a local store and COOKIE COOKIE cheat should be used taking into account the security session. 
     3, session will be within a certain time saved on the server. When accessing the increase, it would be more occupy the performance of your server consider to reduce server performance, you should use COOKIE. 
     4, the data stored in a single cookie can not exceed 4K, many browsers are limited to a maximum of one site to save 20 cookie. 
     5, so personal recommendations: the login information and other important information is stored as SESSION additional information, if necessary, it can be placed in COOKIE

CSS 相关问题

CSS-related issues
--------

###display:none和visibility:hidden的区别？
###display: none and visibility: hidden difference?
 

    display:none  隐藏对应的元素，在文档布局中不再给它分配空间，它各边的元素会合拢，
    就当他从来不存在。
    
    visibility:hidden  隐藏对应的元素，但是在文档布局中仍保留原来的空间。
    
    display: none to hide the corresponding elements in the document layout is no longer space allocated to it, it is the element of each side will be closed, on when he never existed. 

    visibility: hidden hides the corresponding elements, but still retain the original layout of the space in the document. The difference in the link andimport CSS is?

###CSS中 link 和@import 的区别是？
###The difference in the link andimport CSS is?
 

    (1) link属于HTML标签，而@import是CSS提供的; 
    (2) 页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;
    (3) import只在IE5以上才能识别，而link是HTML标签，无兼容问题; 
    (4) link方式的样式的权重 高于@import的权重.
    
    (1) link belong to HTML tags, and CSSimport is provided; 
    (2) the page is loaded, link will also be loaded, but referencesimport CSS will wait until the page is finished loading reloading; 
    (3) Import only to recognize in IE5 or more, while link is HTML tag, no compatibility issues; style right 
    (4) linkimport way of weight above the weight of heavy. Similarities and Differences between absolute and float attributes: position
    
###position:absolute和float属性的异同  
###Similarities and Differences between absolute and float attributes: position
    
    A：共同点：
    对内联元素设置`float`和`absolute`属性，可以让元素脱离文档流，并且可以设置其宽高。
    
    B：不同点：
    float仍会占据位置，position会覆盖文档流中的其他元素。
    
    A: common: 
    inline element set `float` and` absolute` property allows elements from the document flow, and can set its width and height. 

    B: Different point: 
    float will still occupy the position, position overrides other elements in the document flow.

###介绍一下box-sizing属性？
###Introduce the box-sizing property?

`box-sizing`属性主要用来控制元素的盒模型的解析模式。默认值是`content-box`。
 box-sizing property is primarily used to control element analytical model box model. The default value is content-Box.

- `content-box`：让元素维持W3C的标准盒模型。元素的宽度/高度由border + padding + content的宽度/高度决定，设置width/height属性指的是content部分的宽/高
-  content-Box : Let element to maintain the standard W3C box model. Width / height of the element / height is determined by the border + padding + content width, set width / height attribute refers to the content portion of the width / height

- `border-box`：让元素维持IE传统盒模型（IE6以下版本和IE6~7的怪异模式）。设置width/height属性指的是border + padding + content
-  border-Box : Let element to maintain the traditional box model IE (IE6 and IE6 ~ 7 the following versions of quirks mode). Set width / height attribute refers to the border + padding + content


标准浏览器下，按照W3C规范对盒模型解析，一旦修改了元素的边框或内距，就会影响元素的盒子尺寸，就不得不重新计算元素的盒子尺寸，从而影响整个页面的布局。   

Under standard browser, according to W3C box model specification analysis, once the border or modify the elements within distance, it will affect the size of the box element, you have to recalculate the box the size of the elements, thus affecting the layout of the entire page.


###CSS 选择符有哪些？哪些属性可以继承？优先级算法如何计算？ CSS3新增伪类有那些？
###CSS selectors are there? Which attributes can be inherited? Priority algorithm calculated? Added CSS3 pseudo-classes are those?

   
    1.id选择器（ # myid）
    2.类选择器（.myclassname）
    3.标签选择器（div, h1, p）
    4.相邻选择器（h1 + p）
    5.子选择器（ul > li）
    6.后代选择器（li a）
    7.通配符选择器（ * ）
    8.属性选择器（a[rel = "external"]）
    9.伪类选择器（a: hover, li:nth-child）
    
    1.id selector (# myid) 
    2. Class selector (.myclassname) 
    3. Tag selectors (div, h1, P) 
    4. adjacent selector (h1 + P) 
    5. child selector (ul> li ) 
    6. descendant selectors (li a) 
    7. wildcard selector (*) 
    8. attribute selector (a [rel = "external"]) 
    9. pseudo-class selectors (a: hover, li: nth-child)
          
  *   可继承的样式： font-size font-family color, text-indent;
          
  *   不可继承的样式：border padding margin width height ;
          
  *   优先级就近原则，同权重情况下样式定义最近者为准;
          
  *   载入样式以最后载入的定位为准;


  *   Inheritable style: font-size font-family color, text-indent;

  *   Non Inherited Styles: border padding margin width height;

  *   Priority under the principle of proximity, with weights whichever the case recently defined style;

  *   Loading last loaded positioning styles to prevail;
      
>优先级为:

Priority:
      
      
    !important >  id > class > tag  
      
    important 比 内联优先级高,但内联比 id 要高
    
>CSS3新增伪类举例：
       
    p:first-of-type 选择属于其父元素的首个 <p> 元素的每个 <p> 元素。
    p:last-of-type  选择属于其父元素的最后 <p> 元素的每个 <p> 元素。
    p:only-of-type  选择属于其父元素唯一的 <p> 元素的每个 <p> 元素。
    p:only-child    选择属于其父元素的唯一子元素的每个 <p> 元素。
    p:nth-child(2)  选择属于其父元素的第二个子元素的每个 <p> 元素。
    :enabled  :disabled 控制表单控件的禁用状态。
    :checked        单选框或复选框被选中。
 

###position的值， relative和absolute分别是相对于谁进行定位的？
###position values, relative and absolute are positioned with respect to whom?
    absolute 
            生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。

    fixed （老IE不支持）
        生成绝对定位的元素，相对于浏览器窗口进行定位。 

    relative 
        生成相对定位的元素，相对于其在普通流中的位置进行定位。 

    static  默认值。没有定位，元素出现在正常的流中
    
    absolute 
        generate absolute element positioned relative to the recent level is not static positioned parent element to be positioned. 

    fixed (old IE does not support) 
        to generate absolute element positioned relative to the browser window positioning. 

    relative 
        generating element relative positioning, relative to its position in the general stream positioning. 

    static default. No positioning element occurs in the normal stream

###CSS3有哪些新特性？
###CSS3 What's new?

    CSS3实现圆角（border-radius），阴影（box-shadow），
    对文字加特效（text-shadow、），线性渐变（gradient），旋转（transform）
    transform:rotate(9deg) scale(0.85,0.90) translate(0px,-30px) skew(-9deg,0deg);//旋转,缩放,定位,倾斜
    增加了更多的CSS选择器  多背景 rgba 
    在CSS3中唯一引入的伪元素是::selection.
    媒体查询，多栏布局
    border-image
    
    CSS3 rounded corners (border-radius), shadow (box-shadow), 
    add special effects to the text (text-shadow,), a linear gradient (gradient), rotation (transform) 
    transform: Rotate (9deg) Scale (0.85,0.90) translate (0px, -30px) skew (-9deg, 0deg); // rotation, scaling, positioning, tilt 
    adds more CSS selectors more background rgba 
    unique introduced in CSS3 pseudo-elements :: selection. 
    Media queries , multi-column layout 
    border-image
      
###XML和JSON的区别？
###XML and JSON difference?


    (1).数据体积方面。
    JSON相对于XML来讲，数据的体积小，传递的速度更快些。
    (2).数据交互方面。
    JSON与JavaScript的交互更加方便，更容易解析处理，更好的数据交互。
    (3).数据描述方面。
    JSON对数据的描述性比XML较差。
    (4).传输速度方面。
    JSON的速度要远远快于XML。
    
    (1) The data volume terms. 
    XML JSON relative terms, the volume of data is small, the speed of delivery faster. 
    (2) aspects of data exchange. 
    JSON and JavaScript interaction more convenient and easier to parse processing, better data interaction. 
    (3) The data described aspects. 
    JSON description of data than XML poor. 
    (4) The transmission speed. 
    JSON's speed is much faster than XML.



###对BFC规范的理解？
###BFC norms of understanding?
          BFC，块级格式化上下文，一个创建了新的BFC的盒子是独立布局的，盒子里面的子元素的样式不会影响到外面的元素。在同一个BFC中的两个毗邻的块级盒在垂直方向（和布局方向有关系）的margin会发生折叠。
        （W3C CSS 2.1 规范中的一个概念，它决定了元素如何对其内容进行布局，以及与其他元素的关系和相互作用。）
        BFC, block-level formatting context, a BFC created a new box is an independent layout, style, child elements inside the box will not affect the outside elements. In the same BFC two adjoining block-level box in the vertical direction (the direction of a relationship and layout) of margin will collapse from happening. 
        (A concept W3C CSS 2.1 specification, which determines how the elements in the layout of its contents, and its relationship with other elements and interactions.)


###解释下 CSS sprites，以及你要如何在页面或网站中使用它。
###Talk about your understanding of the semantic?

    CSS Sprites其实就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位，background-position可以用数字能精确的定位出背景图片的位置。这样可以减少很多图片请求的开销，因为请求耗时比较长；请求虽然可以并发，但是也有限制，一般浏览器都是6个。对于未来而言，就不需要这样做了，因为有了`http2`。
    CSS Sprites in fact, the number of pages in the background image into an image file, and then use the CSS "background-image", "background- repeat", "background-position" a combination of background positioning, background-position can be used Digital can accurately locate the position of the background image. This can reduce the cost of many pictures request because the request takes a relatively long; although requests can be complicated, but there are limits, are six general browser. For the future, there is no need to do so, and because of `http2`.



html部分
------

html part
------

###说说你对语义化的理解？
###Talk about your understanding of the semantic?

    1，去掉或者丢失样式的时候能够让页面呈现出清晰的结构
    2，有利于SEO：和搜索引擎建立良好沟通，有助于爬虫抓取更多的有效信息：爬虫依赖于标签来确定上下文和各个关键字的权重；
    3，方便其他设备解析（如屏幕阅读器、盲人阅读器、移动设备）以意义的方式来渲染网页；
    4，便于团队开发和维护，语义化更具可读性，是下一步吧网页的重要动向，遵循W3C标准的团队都遵循这个标准，可以减少差异化。
    
    1, removed or lost when allowing page style showing clear structure 
    2, is conducive to SEO: search engines and to establish good communication helps crawlers to crawl more useful information: reptiles rely on labels to determine the context and the individual right keyword weight; 
    3, easy to resolve other devices (such as a screen reader, blind readers, mobile devices) in meaningful ways to render web pages;     4, easy to team development and maintenance, more readable semantic, is under Important Trends step right of the page, follow the W3C standards team follow this standard, the difference can be reduced.
    
###Doctype作用? 严格模式与混杂模式如何区分？它们有何意义?  
###Doctype role? Strict mode and mixed mode how to distinguish? They mean?

    （1）、<!DOCTYPE> 声明位于文档中的最前面，处于 <html> 标签之前。告知浏览器以何种模式来渲染文档。 
    
    （2）、严格模式的排版和 JS 运作模式是  以该浏览器支持的最高标准运行。
    
    （3）、在混杂模式中，页面以宽松的向后兼容的方式显示。模拟老式浏览器的行为以防止站点无法工作。
    
    （4）、DOCTYPE不存在或格式不正确会导致文档以混杂模式呈现。  
    
    (1), <! DOCTYPE> declaration in the document in the front, in the <html> tag before. Tells the browser to render the document in which mode. 

    (2) strict mode layout and JS mode of operation is based on the highest standards of the browser supports running. 

    (3), in promiscuous mode, page backward compatible with liberal display. Simulate the behavior of older browsers do not work to prevent the site. 

    (4), DOCTYPE does not exist or incorrectly formatted document will lead to promiscuous mode rendering.   

###你知道多少种Doctype文档类型？
###Do you know how many document types Doctype?

     该标签可声明三种 DTD 类型，分别表示严格版本、过渡版本以及基于框架的 HTML 文档。
     HTML 4.01 规定了三种文档类型：Strict、Transitional 以及 Frameset。
     XHTML 1.0 规定了三种 XML 文档类型：Strict、Transitional 以及 Frameset。
    Standards （标准）模式（也就是严格呈现模式）用于呈现遵循最新标准的网页，而 Quirks
     （包容）模式（也就是松散呈现模式或者兼容模式）用于呈现为传统浏览器而设计的网页。
     
     The label can be declared DTD three types, respectively strict version, interim version and an HTML-based documentation framework. 
     HTML 4.01 specifies three document types: Strict, Transitional, and Frameset. 
     XHTML 1.0 specifies three XML document types: Strict, Transitional, and Frameset. 
     Standards (standard) mode (that is, in strict rendering mode) complies with the latest standards for rendering Web pages, while Quirks 
 (inclusive) mode (that is, loose rendering mode or compatibility mode) is used to render conventional web browser designed.

HTML与XHTML——二者有什么区别
-------------------

HTML and XHTML-- What is the difference
-------------------

    区别：
    1.所有的标记都必须要有一个相应的结束标记
    2.所有标签的元素和属性的名字都必须使用小写
    3.所有的XML标记都必须合理嵌套
    4.所有的属性必须用引号""括起来
    5.把所有<和&特殊符号用编码表示
    6.给所有属性赋一个值
    7.不要在注释内容中使“--”
    8.图片必须有说明文字
    
    Difference: 
    1. All tags must have a corresponding end tag element and attribute names 
    2. All tags must be lowercase 
    3. All the XML tags must be properly nested 
    4. All attributes must be quoted. " "enclosed 
    5. Put all the <and & special symbols with the coded representation 
    6. assign a value to all of the properties in the comment 7. Do not manipulation "-" 
    8. The image must have caption


常见兼容性问题？
--------

Common compatibility problems?
--------

    * png24位的图片在iE6浏览器上出现背景，解决方案是做成PNG8.也可以引用一段脚本处理.
    
    * 浏览器默认的margin和padding不同。解决方案是加一个全局的*{margin:0;padding:0;}来统一。
    
    * IE6双边距bug:块属性标签float后，又有横行的margin情况下，在ie6显示margin比设置的大。 
    
    * 浮动ie产生的双倍距离（IE6双边距问题：在IE6下，如果对元素设置了浮动，同时又设置了margin-left或margin-right，margin值会加倍。）
      #box{ float:left; width:10px; margin:0 0 0 100px;} 
    
     这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)
    
    *  渐进识别的方式，从总体中逐渐排除局部。 
    
    * Png24 bit image appears on iE6 browser background, the solution is made ​​PNG8. It can refer to a script processing. 

    * The browser's default margin and padding. The solution is to add a global * {margin: 0; padding: 0;} to unify. 

    * IE6 bilateral Distance bug: After the block attribute labels float, there are rampant margin circumstances, in ie6 show larger margin than the settings. 

    * Double ie generated from the float (IE6 bilateral distance problem: In IE6, if the element is set to float, while setting the margin-left or margin-right, margin value will double.) 
  #box {float: left; width: 10px; margin: 0 0 0 100px;} 

 Under such circumstances IE will produce 20px distance, the solution is to add --_ display in the label style float control: inline; be converted to inline property. (_ This symbol identifies only ie6) 

    * gradual recognition of the way from the local population gradually excluded. 
    
      首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来。 
      接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别。
      
      First, the clever use of "\ 9" This marks the IE's browser separated out from all the circumstances. 
      Then, again using the "+" to IE8 and IE7, IE6 separated, so that IE8 has been independently identified. 
    
      css
          .bb{
           background-color:#f1ee18;/*所有识别*/
          .background-color:#00deff\9; /*IE6、7、8识别*/
          +background-color:#a200ff;/*IE6、7识别*/
          _background-color:#1e0bd1;/*IE6识别*/ 
          } 
    
    *  IE下,可以使用获取常规属性的方法来获取自定义属性,
       也可以使用getAttribute()获取自定义属性;
       Firefox下,只能使用getAttribute()获取自定义属性. 
       解决方法:统一通过getAttribute()获取自定义属性.
    
    * IE下,event对象有x,y属性,但是没有pageX,pageY属性; 
      Firefox下,event对象有pageX,pageY属性,但是没有x,y属性.
    
    * 解决方法：（条件注释）缺点是在IE浏览器下可能会增加额外的HTTP请求数。
    
    * Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 
      可通过加入 CSS 属性 -webkit-text-size-adjust: none; 解决.
    
    * 超链接访问过后hover样式就不出现了 被点击访问过的超链接样式不在具有hover和active了解决方法是改变CSS属性的排列顺序:
    L-V-H-A :  a:link {} a:visited {} a:hover {} a:active {}
    
    * 怪异模式问题：漏写DTD声明，Firefox仍然会按照标准模式来解析网页，但在IE中会触发怪异模式。为避免怪异模式给我们带来不必要的麻烦，最好养成书写DTD声明的好习惯。现在可以使用[html5](http://www.w3.org/TR/html5/single-page.html)推荐的写法：`<doctype html>`
    
    * 上下margin重合问题
    ie和ff都存在，相邻的两个div的margin-left和margin-right不会重合，但是margin-top和margin-bottom却会发生重合。
    解决方法，养成良好的代码编写习惯，同时采用margin-top或者同时采用margin-bottom。
    * ie6对png图片格式支持不好(引用一段脚本处理)
    
    * under IE, you can use the method to get the general properties for custom properties, 
   you can also use getAttribute () Gets the custom attributes; 
   under Firefox, only Use getAttribute () Gets custom attributes. 
   Workaround: Uniform for custom properties through getAttribute (). 

    * Under IE, event object has x, y attributes, but no pageX, pageY property; 
  under Firefox, event object has pageX, pageY property, but there is no x, y properties. 

    * Solution :( conditional comments) drawback is that in IE browser may add additional HTTP requests. 

    * Under Chrome Chinese interface will be smaller than default to force the 12px 12px text display, 
  by the addition of CSS properties -webkit-text-size-adjust: none; resolved. 

    * After hover style is not accessible by hyperlink is clicked appears visited The Hyperlink style does not have hover and active the solution is to change the order of CSS properties: 
LVHA: a: link {} a: visited {} a: hover {} a: Active {} 

    * weird modalities: Leakage write DTD statement, Firefox will still be in accordance with the standard model to resolve the page, but IE will trigger quirks mode. To avoid quirks mode gives us unnecessary trouble, it is best to develop the good habit of writing DTD declaration. You can now use [html5] (http://www.w3.org/TR/html5/single-page.html) recommended notation: `<DOCTYPE html>` 

    * top and bottom margin overlap problem 
ie and ff are present, adjacent both margin-left and margin-right does not coincide div, but margin-top and margin-bottom but it will coincide occur. 
Solution, to develop good coding habits, while using margin-top or while using margin-bottom. 
    * Ie6 png image format support is not good for (quote a script processing)


    
###解释下浮动和它的工作原理？清除浮动的技巧
###Floating and explain how it works? Clear float tips

    浮动元素脱离文档流，不占据空间。浮动元素碰到包含它的边框或者浮动元素的边框停留。
    Floating elements from the document flow, does not occupy space. Floats across the border to stay its borders contain or floating elements. 
    
    1.使用空标签清除浮动。
       这种方法是在所有浮动标签后面添加一个空标签 定义css clear:both. 弊端就是增加了无意义标签。
    2.使用overflow。
       给包含浮动元素的父标签添加css属性 overflow:auto; zoom:1; zoom:1用于兼容IE6。
    3.使用after伪对象清除浮动。
       该方法只适用于非IE浏览器。具体写法可参照以下示例。使用中需注意以下几点。一、该方法中必须为需要清除浮动元素的伪对象中设置 height:0，否则该元素会比实际高出若干像素；
       
    1. Clear float with an empty label. This method is to add an empty label definition css clear in all floating behind the label: both the disadvantages is to increase the meaningless labels. 
    2. Use the overflow. To a parent tag contains floating elements add css property overflow: auto; zoom: 1; zoom: 1 for compatibility with IE6. 
    3. Use after pseudo remove floating objects. This method applies only to non-IE browsers. Specific wording may refer to the following examples. Use should pay attention to the following points. First, the method must be set to clear the height of the floating element's pseudo-objects: 0, otherwise the element will be much higher than the actual number of pixels;

###浮动元素引起的问题和解决办法？
###Problems caused by floating elements and solutions?

    浮动元素引起的问题：
    
    Problems caused by the floating elements: 

    （1）父元素的高度无法被撑开，影响与父元素同级的元素
    （2）与浮动元素同级的非浮动元素（内联元素）会跟随其后
    （3）若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构
    
    (1) height of the parent element can not be softened, peer influence and elements of the parent element 
    (2) and non-floating elements floating element siblings (inline elements) will follow thereafter 
    (3) if not the first element of float, then that element is also required before the float, otherwise it will affect the structure of the page displayed


解决方法：
使用`CSS`中的`clear:both`;属性来清除元素的浮动可解决2、3问题，对于问题1，添加如下样式，给父元素添加`clearfix`样式：

Workaround: use CSS in Clear: Both ; attribute to clear floating elements 2,3 resolve the problem, the problem 1, add the following styles to parent element Add clearfix style:

    .clearfix:after{content: ".";display: block;height: 0;clear: both;visibility: hidden;}
    .clearfix{display: inline-block;} /* for IE/Mac */

**清除浮动的几种方法：**

    1，额外标签法，<div style="clear:both;"></div>（缺点：不过这个办法会增加额外的标签使HTML结构看起来不够简洁。）
    2，使用after伪类
    
Clear float several ways:

    1, additional labeling, <div style = "clear: both;"> </ div> (disadvantage: But this approach would cause additional HTML tag structure looks simple enough) 
    2, use after pseudo-class 

    #parent:after{
        content:".";
        height:0;
        visibility:hidden;
        display:block;
        clear:both;
        }
    
    3,浮动外部元素
    4,设置`overflow`为`hidden`或者auto
    
    3, floating external element 
    4, is set to `hidden`` overflow` or auto

###IE 8以下版本的浏览器中的盒模型有什么不同
###IE 8 the following versions of the browser box model What is the difference

    IE8以下浏览器的盒模型中定义的元素的宽高不包括内边距和边框
    
    The following box model IE8 browser's width and height defined elements does not include padding and border

###DOM操作——怎样添加、移除、移动、复制、创建和查找节点。 
###DOM manipulation - how to add, remove, move, copy, create, and find nodes.

    （1）创建新节点
    
          createDocumentFragment()    //创建一个DOM片段
    
          createElement()   //创建一个具体的元素
    
          createTextNode()   //创建一个文本节点
    
    （2）添加、移除、替换、插入
    
          appendChild()
    
          removeChild()
    
          replaceChild()
    
          insertBefore() //在已有的子节点前插入一个新的子节点
    
    （3）查找
    
          getElementsByTagName()    //通过标签名称
    
          getElementsByName()    //通过元素的Name属性的值(IE容错能力较强，会得到一个数组，其中包括id等于name值的)
    
          getElementById()    //通过元素Id，唯一性
          
     (1) Create a new node 

          createDocumentFragment () // Create a DOM fragment 

          createElement () // create a specific element 

          createTextNode () // Create a text node 

     (2) to add, remove, replace, insert 

          appendChild () 

          removeChild ( ) 

          replaceChild () 

          insertBefore () // before the existing child node into a new child node 

(3) Find 

          getElementsByTagName () // by tag name 

          getElementsByName () // by the value of the Name property of the element (IE fault tolerance Strong, will be an array, including name id equal value) 

          getElementById () // by elemental Id, uniqueness

###html5有哪些新特性、移除了那些元素？如何处理HTML5新标签的浏览器兼容问题？如何区分 HTML 和 HTML5？
###What's new html5, removing those elements? How to deal with a new label HTML5 browser compatibility problems? How to distinguish between HTML and HTML5?

    * HTML5 现在已经不是 SGML 的子集，主要是关于图像，位置，存储，多任务等功能的增加。
    
    * 拖拽释放(Drag and drop) API 
      语义化更好的内容标签（header,nav,footer,aside,article,section）
      音频、视频API(audio,video)
      画布(Canvas) API
      地理(Geolocation) API
      本地离线存储 localStorage 长期存储数据，浏览器关闭后数据不丢失；
      sessionStorage 的数据在浏览器关闭后自动删除
    
      表单控件，calendar、date、time、email、url、search  
      新的技术webworker, websocket, Geolocation
    
    * 移除的元素
    
    纯表现的元素：basefont，big，center，font, s，strike，tt，u；
    
    对可用性产生负面影响的元素：frame，frameset，noframes；
    
    支持HTML5新标签：
    
    * IE8/IE7/IE6支持通过document.createElement方法产生的标签，
      可以利用这一特性让这些浏览器支持HTML5新标签，
    
      浏览器支持新标签后，还需要添加标签默认的样式：
    
    * 当然最好的方式是直接使用成熟的框架、使用最多的是html5shim框架
       <!--[if lt IE 9]> 
       <script> src="http://html5shim.googlecode.com/svn/trunk/html5.js"</script> 
       <![endif]--> 
       
    * HTML5 now is not a subset of SGML, mainly to increase with respect to the image, location, storage, multi-tasking and other        features. 

    * Drag release (Drag and drop) API 
    semantic content better label (header, nav, footer, aside, article, section) 
    audio, video, API (audio, video) 
    canvas (Canvas) API 
    geography (Geolocation) API 
    Local localStorage offline storage for long term storage of data, the browser is closed after data is not lost; 
    sessionStorage of data after the browser is closed automatically delete 

    form controls, calendar, date, time, email, url, search   
    WebWorker new technologies, websocket, Geolocation 

    * Remove The elements of 

the element of pure performance: basefont, big, center, font, s, strike, tt, u; 

adversely affect the availability of the elements of: frame, frameset, noframes; 

support HTML5 new label: 

    * IE8 / IE7 / IE6 support through document.createElement method of producing labels, 
  can use this feature to allow these browsers support HTML5 new label, 

  after the browser to support the new label, you also need to add tags default style: 

    * Of course, the best way is the direct use of mature framework, use the most is html5shim framework 
    
       
    如何区分： DOCTYPE声明\新增的结构元素\功能元素
    
    How to distinguish: DOCTYPE declaration \ new structural elements \ functional elements iframe advantages and disadvantages?

iframe的优缺点？
------------

    1.`<iframe>`优点：
    
        解决加载缓慢的第三方内容如图标和广告等的加载问题
        Security sandbox
        并行加载脚本
        
        solve slow to load third-party content such as icons and advertisements of loading problems 
        Security sandbox 
        parallel load script 
    
    2.`<iframe>`的缺点：
     
    
        *iframe会阻塞主页面的Onload事件；
        
        *即时内容为空，加载也需要时间
        *没有语意 
        
        * iframes clog Onload event of the main page; 

        * Instant content is empty, it takes time to load 
        * no semantics

如何实现浏览器内多个标签页之间的通信?
-------------------

How to communicate within the browser between multiple tabs?
-------------------


    调用localstorge、cookies等本地存储方式
    
    Call localstorge, cookies and other local storage
    

    

线程与进程的区别
--------

The difference between threads and processes
--------

    一个程序至少有一个进程,一个进程至少有一个线程. 
    线程的划分尺度小于进程，使得多线程程序的并发性高。 
    另外，进程在执行过程中拥有独立的内存单元，而多个线程共享内存，从而极大地提高了程序的运行效率。 
    线程在执行过程中与进程还是有区别的。每个独立的线程有一个程序运行的入口、顺序执行序列和程序的出口。但是线程不能够独立执行，必须依存在应用程序中，由应用程序提供多个线程执行控制。 
    从逻辑角度来看，多线程的意义在于一个应用程序中，有多个执行部分可以同时执行。但操作系统并没有将多个线程看做多个独立的应用，来实现进程的调度和管理以及资源分配。这就是进程和线程的重要区别。
    
    A program has at least one process, a process has at least one thread. 
    divided scale smaller than the thread process, making multi-threaded program concurrency high. 
    In addition, the process has a separate memory unit in the implementation process, and multiple threads shared memory, thereby       greatly enhancing the operational efficiency of the program. 
    Threads in the implementation process and the process is still a difference. Each has a separate thread running entry, exit          sequence and procedure execution order. But the thread is not able to perform independent, it must exist according to the            application, providing multiple threads of execution is controlled by the application. 
    From a logical point of view, the significance of a multi-threaded application, there are a plurality of the operative part can      execute simultaneously. But the operating system is not seen as multiple threads multiple independent applications to achieve        scheduling and management and resource allocation process. This is an important distinction between processes and threads.


你如何对网站的文件和资源进行优化？
-----------------

How do you document and optimize resource site?
-----------------

    期待的解决方案包括：
     文件合并
     文件最小化/文件压缩
     使用 CDN 托管
     缓存的使用（多个域名来提供缓存）
     其他
     
     Expect solutions include: 
     file merge 
     file Minimize / file compression 
     using CDN hosted 
     cache usage (multiple domain names to provide caching) 
     Other

请说出三种减少页面加载时间的方法。
-----------------

Please name three reduce page load time.
-----------------

     1.优化图片 
     2.图像格式的选择（GIF：提供的颜色较少，可用在一些对颜色要求不高的地方） 
     3.优化CSS（压缩合并css，如margin-top,margin-left...) 
     4.网址后加斜杠（如www.campr.com/目录，会判断这个“目录是什么文件类型，或者是目录。） 
     5.标明高度和宽度（如果浏览器没有找到这两个参数，它需要一边下载图片一边计算大小，如果图片很多，浏览器需要不断地调整页面。这不但影响速度，也影响浏览体验。 
    当浏览器知道了高度和宽度参数后，即使图片暂时无法显示，页面上也会腾出图片的空位，然后继续加载后面的内容。从而加载时间快了，浏览体验也更好了。） 
    
    6.减少http请求（合并文件，合并图片）。
    
    1. Optimize image 
    2. Select the image format (GIF: color offered fewer colors used in some of the less demanding areas) 
    3. Optimize CSS (compression merge css, such as margin-top, margin-left ... ) 
    4. slash site (eg www.campr.com/ directory, will determine the "directory what file type or directory.) 
    5. indicate the height and width (if the browser does not find these two parameters, It needs to calculate the size of one side         while downloading pictures, if the picture a lot, browsers need to constantly adjust the page. This will not only affect the         speed, but also affect browsing experience. 
       When the browser know the height and width parameters, even if the picture is temporarily unable to display the page will make        pictures of space, and then continue to load the contents back thus loading time faster browsing experience is better.) 
    6. To reduce http requests (merge files, merge pictures).


你都使用哪些工具来测试代码的性能？
-----------------

Which tools you use to test the performance of the code?
-----------------

    Profiler, JSPerf（http://jsperf.com/nexttick-vs-setzerotimeout-vs-settimeout）, Dromaeo


什么是 FOUC（无样式内容闪烁）？你如何来避免 FOUC？
------------------------------

What is FOUC (free style content flicker)? How do you avoid FOUC?
------------------------------

     FOUC - Flash Of Unstyled Content 文档样式闪烁
     <style type="text/css" media="all">@import "../fouc.css";</style> 
    而引用CSS文件的@import就是造成这个问题的罪魁祸首。IE会先加载整个HTML文档的DOM，然后再去导入外部的CSS文件，因此，在页面DOM加载完成到CSS导入完成中间会有一段时间页面上的内容是没有样式的，这段时间的长短跟网速，电脑速度都有关系。
     解决方法简单的出奇，只要在<head>之间加入一个<link>或者<script>元素就可以了。
     
     import CSS file and references that is causing the problem the culprit. IE will first load the DOM entire HTML document, and then go to import external CSS files, so the page DOM has finished loading content into CSS import is completed there will be a time in the middle on the page is not the style, the length of this period of time with network speed, computer speed have a relationship.      
     Workaround surprisingly simple, as long as between the <head> add a <link> or <script> element on it.

null和undefined的区别？
------------------

null and undefined difference?
------------------

`null`是一个表示"无"的对象，转为数值时为0；`undefined`是一个表示"无"的原始值，转为数值时为`NaN`。  

null is a "no," the object representation when converted to a value of 0; undefined is a indicating "no," the original value when converted value NaN .
  
当声明的变量还未被初始化时，变量的默认值为`undefined`。
`null`用来表示尚未存在的对象，常用来表示函数企图返回一个不存在的对象。 

When the variable declaration has not been initialized, the default variable is undefined . null object has not been used to indicate the presence, used to represent the function attempts to return an object that does not exist.

`undefined`表示"缺少值"，就是此处应该有一个值，但是还没有定义。典型用法是：

undefined means "missing value", that is where it should have a value, but not yet defined. Typical usage is:

    （1）变量被声明了，但没有赋值时，就等于undefined。

    （2) 调用函数时，应该提供的参数没有提供，该参数等于undefined。

    （3）对象没有赋值的属性，该属性的值为undefined。

    （4）函数没有返回值时，默认返回undefined。
    
    (1) variable is declared, but no assignment, it means undefined. 

    (2) When you call the function, the parameters should be provided not provided, this parameter is equal to undefined. 

    (3) The object has no assignment of property, which is undefined. 

    (4) function does not return a value, the default returns undefined.

`null`表示"没有对象"，即该处不应该有值。典型用法是：

null means "no object", ie where there should be no value. Typical usage is:



    （1） 作为函数的参数，表示该函数的参数不是对象。

    （2） 作为对象原型链的终点。
    
     (1) as a function of the parameters, it indicates that the function of the parameter is not an object. 

     (2) as the end point of the object's prototype chain.



new操作符具体干了什么呢?
--------------

What specific new operator did it?
--------------


       1、创建一个空对象，并且 this 变量引用该对象，同时还继承了该函数的原型。
       2、属性和方法被加入到 this 引用的对象中。
       3、新创建的对象由 this 所引用，并且最后隐式的返回 this 。
       
       1. Create an empty object, and this variable refers to the object, but also inherited the prototype of the function. 
       2, attributes and methods are added to this reference object. 
       3, the newly created object referenced by this, and the last implicit return this. 
    
    var obj  = {};
    obj.__proto__ = Base.prototype;
    Base.call(obj); 
    
    var obj = {}; 
    obj .__ proto__ = Base.prototype; 
    Base.call (obj);



js延迟加载的方式有哪些？
-------------

js lazy loading options?

    defer和async、动态创建DOM方式（创建script，插入到DOM中，加载完毕后callBack）、按需异步载入js
    
    defer and async, dynamically created DOM mode (create script, is inserted into the DOM, after loading is completed callBack), asynchronous load demand js

如何解决跨域问题?
---------

How to solve cross-border issues?
---------

        jsonp、 document.domain+iframe、window.name、window.postMessage、服务器上设置代理页面
        
    jsonp的原理是动态插入script标签
    
        jsonp, document.domain + iframe, window.name, window.postMessage proxy server settings on the page, 
    
    
具体参见：[详解js跨域问题][2]


documen.write和 innerHTML的区别
---------------------------

    document.write只能重绘整个页面
    
    innerHTML可以重绘页面的一部分

.call() 和 .apply() 的区别和作用？
-----------------------
作用：动态改变某个类的某个方法的运行环境。
区别参见：[JavaScript学习总结（四）function函数部分][3]

哪些操作会造成内存泄漏？
------------

    内存泄漏指任何对象在您不再拥有或需要它之后仍然存在。
    垃圾回收器定期扫描对象，并计算引用了每个对象的其他对象的数量。如果一个对象的引用数量为 0（没有其他对象引用过该对象），或对该对象的惟一引用是循环的，那么该对象的内存即可回收。
    
    setTimeout 的第一个参数使用字符串而非函数的话，会引发内存泄漏。
    闭包、控制台日志、循环（在两个对象彼此引用且彼此保留时，就会产生一个循环）

详见：[详解js变量、作用域及内存][4]

JavaScript中的作用域与变量声明提升？
-----------------------

详见：[详解JavaScript函数模式][5]

如何判断当前脚本运行在浏览器还是node环境中？
------------------------

    通过判断Global对象是否为window，如果不为window，当前脚本没有运行在浏览器中
    

其他问题？
-----
###你遇到过比较难的技术问题是？你是如何解决的？


###列举IE 与其他浏览器不一样的特性？



###什么叫优雅降级和渐进增强？

    优雅降级：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会检查以确认它们是否能正常工作。由于IE独特的盒模型布局问题，针对不同版本的IE的hack实践过优雅降级了,为那些无法支持功能的浏览器增加候选方案，使之在旧式浏览器上以某种形式降级体验却不至于完全失效.
    
    渐进增强：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新式浏览器才支持的功能,向页面增加无害于基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。

详见：[css学习归纳总结（一）][6]

###WEB应用从服务器主动推送Data到客户端有那些方式？

Javascript数据推送

>Commet：基于HTTP长连接的服务器推送技术

>基于WebSocket的推送方案

>SSE（Server-Send Event）：服务器推送数据新方式




###对前端界面工程师这个职位是怎么样理解的？它的前景会怎么样？

    前端是最贴近用户的程序员，比后端、数据库、产品经理、运营、安全都近。
        1、实现界面交互
        2、提升用户体验
        3、有了Node.js，前端可以实现服务端的一些事情
    
    
    前端是最贴近用户的程序员，前端的能力就是能让产品从 90分进化到 100 分，甚至更好，
    
     参与项目，快速高质量完成实现效果图，精确到1px；
    
     与团队成员，UI设计，产品经理的沟通；
    
     做好的页面结构，页面重构和用户体验；
    
     处理hack，兼容、写出优美的代码格式；
    
     针对服务器的优化、拥抱最新前端技术。



你有哪些性能优化的方法？
------------

 （[详情请看雅虎14条性能优化原则][7]）。
    
      （1） 减少http请求次数：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器。
    
      （2） 前端模板 JS+数据，减少由于HTML标签导致的带宽浪费，前端用变量保存AJAX请求结果，每次操作本地变量，不用请求，减少请求次数
    
      （3） 用innerHTML代替DOM操作，减少DOM操作次数，优化javascript性能。
    
      （4） 当需要设置的样式很多时设置className而不是直接操作style。
    
      （5） 少用全局变量、缓存DOM节点查找的结果。减少IO读取操作。
    
      （6） 避免使用CSS Expression（css表达式)又称Dynamic properties(动态属性)。
    
      （7） 图片预加载，将样式表放在顶部，将脚本放在底部  加上时间戳。



详情：http://segmentfault.com/blog/trigkit4/1190000000691919

一个页面从输入 URL 到页面加载显示完成，这个过程中都发生了什么？
----------------------------------

     

        分为4个步骤：
        （1），当发送一个URL请求时，不管这个URL是Web页面的URL还是Web页面上每个资源的URL，浏览器都会开启一个线程来处理这个请求，同时在远程DNS服务器上启动一个DNS查询。这能使浏览器获得请求对应的IP地址。
        （2）， 浏览器与远程Web服务器通过TCP三次握手协商来建立一个TCP/IP连接。该握手包括一个同步报文，一个同步-应答报文和一个应答报文，这三个报文在 浏览器和服务器之间传递。该握手首先由客户端尝试建立起通信，而后服务器应答并接受客户端的请求，最后由客户端发出该请求已经被接受的报文。
        （3），一旦TCP/IP连接建立，浏览器会通过该连接向远程服务器发送HTTP的GET请求。远程服务器找到资源并使用HTTP响应返回该资源，值为200的HTTP响应状态表示一个正确的响应。
        （4），此时，Web服务器提供资源服务，客户端开始下载资源。
        
    请求返回后，便进入了我们关注的前端模块
    简单来说，浏览器会解析HTML生成DOM Tree，其次会根据CSS生成CSS Rule Tree，而javascript又可以根据DOM API操作DOM

详情：[从输入 URL 到浏览器接收的过程中发生了什么事情？][8]

平时如何管理你的项目？
-----------

    先期团队必须确定好全局样式（globe.css），编码模式(utf-8) 等；
    
            编写习惯必须一致（例如都是采用继承式的写法，单样式都写成一行）；
    
            标注样式编写人，各模块都及时标注（标注关键样式调用的地方）；
    
            页面进行标注（例如 页面 模块 开始和结束）；
    
            CSS跟HTML 分文件夹并行存放，命名都得统一（例如style.css）；
    
            JS 分文件夹存放 命名以该JS功能为准的英文翻译。
    
            图片采用整合的 images.png png8 格式文件使用 尽量整合在一起使用方便将来的管理 
            
说说最近最流行的一些东西吧？常去哪些网站？
--------------------------

    Node.js、Mongodb、npm、MVVM、MEAN、three.js,React 。
    网站：w3cfuns,sf,hacknews,CSDN,慕课，博客园，InfoQ,w3cplus等

javascript对象的几种创建方式
-------------------

    1，工厂模式
    2，构造函数模式
    3，原型模式
    4，混合构造函数和原型模式
    5，动态原型模式
    6，寄生构造函数模式
    7，稳妥构造函数模式

javascript继承的6种方法
-----------------

    1，原型链继承
    2，借用构造函数继承
    3，组合继承(原型+借用构造)
    4，原型式继承
    5，寄生式继承
    6，寄生组合式继承

详情：[JavaScript继承方式详解][9]
ajax过程
------

    (1)创建XMLHttpRequest对象,也就是创建一个异步调用对象.
    
    (2)创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息.
    
    (3)设置响应HTTP请求状态变化的函数.
    
    (4)发送HTTP请求.
    
    (5)获取异步调用返回的数据.
    
    (6)使用JavaScript和DOM实现局部刷新.

详情：[JavaScript学习总结（七）Ajax和Http状态字][10]

异步加载和延迟加载
---------

    1.异步加载的方案： 动态插入script标签
    2.通过ajax去获取js代码，然后通过eval执行
    3.script标签上添加defer或者async属性
    4.创建并插入iframe，让它异步执行js
    5.延迟加载：有些 js 代码并不是页面初始化的时候就立刻需要的，而稍后的某些情况才需要的。

前端安全问题？
-------
###sql注入原理

就是通过把`SQL`命令插入到`Web`表单递交或输入域名或页面请求的查询字符串，最终达到欺骗服务器执行恶意的SQL命令。

总的来说有以下几点：

    1.永远不要信任用户的输入，要对用户的输入进行校验，可以通过正则表达式，或限制长度，对单引号和双"-"进行转换等。
    2.永远不要使用动态拼装SQL，可以使用参数化的SQL或者直接使用存储过程进行数据查询存取。
    3.永远不要使用管理员权限的数据库连接，为每个应用使用单独的权限有限的数据库连接。
    4.不要把机密信息明文存放，请加密或者hash掉密码和敏感的信息。

###XSS原理及防范

`Xss(cross-site scripting)`攻击指的是攻击者往Web页面里插入恶意`html`标签或者`javascript`代码。比如：攻击者在论坛中放一个
看似安全的链接，骗取用户点击后，窃取cookie中的用户私密信息；或者攻击者在论坛中加一个恶意表单，
当用户提交表单的时候，却把信息传送到攻击者的服务器中，而不是用户原本以为的信任站点。

###XSS防范方法

1.代码里对用户输入的地方和变量都需要仔细检查长度和对`”<”,”>”,”;”,”’”`等字符做过滤；其次任何内容写到页面之前都必须加以`encode`，避免不小心把`html tag` 弄出来。这一个层面做好，至少可以堵住超过一半的`XSS` 攻击。
<br/>
2.避免直接在`cookie` 中泄露用户隐私，例如`email`、密码等等。
3.通过使cookie 和系统ip 绑定来降低`cookie` 泄露后的危险。这样攻击者得到的cookie 没有实际价值，不可能拿来重放。
<br/>
4.尽量采用POST 而非GET 提交表单

###XSS与CSRF有什么区别吗？

`XSS`是获取信息，不需要提前知道其他用户页面的代码和数据包。`CSRF`是代替用户完成指定的动作，需要知道其他用户页面的代码和数据包。

要完成一次CSRF攻击，受害者必须依次完成两个步骤：

　　1.登录受信任网站A，并在本地生成Cookie。
　　2.在不登出A的情况下，访问危险网站B。

###CSRF的防御

1.服务端的CSRF方式方法很多样，但总的思想都是一致的，就是在客户端页面增加伪随机数。
2.使用验证码

ie各版本和chrome可以并行下载多少个资源
-----------------------

    IE6 两个并发，iE7升级之后的6个并发，之后版本也是6个
    
    Firefox，chrome也是6个

javascript里面的继承怎么实现，如何避免原型链上面的对象共享
----------------------------------

    用构造函数和原型链的混合模式去实现继承，避免对象共享可以参考经典的extend()函数，很多前端框架都有封装的，就是用一个空函数当做中间变量


grunt， YUI compressor 和 google clojure用来进行代码压缩的用法。
--------------------------------------------------

    YUI Compressor 是一个用来压缩 JS 和 CSS 文件的工具，采用Java开发。
    
    使用方法：
    
    //压缩JS
    java -jar yuicompressor-2.4.2.jar --type js --charset utf-8 -v src.js > packed.js
    //压缩CSS
    java -jar yuicompressor-2.4.2.jar --type css --charset utf-8 -v src.css > packed.css

详情请见：[你需要掌握的前端代码性能优化工具][11] 

Flash、Ajax各自的优缺点，在使用中如何取舍？
--------------------------

    1、Flash ajax对比
    Flash适合处理多媒体、矢量图形、访问机器；对CSS、处理文本上不足，不容易被搜索。
    Ajax对CSS、文本支持很好，支持搜索；多媒体、矢量图形、机器访问不足。
    共同点：与服务器的无刷新传递消息、用户离线和在线状态、操作DOM


请解释一下 JavaScript 的同源策略。
-----------------------
概念:同源策略是客户端脚本（尤其是`Javascript`）的重要的安全度量标准。它最早出自`Netscape Navigator2.0`，其目的是防止某个文档或脚本从多个不同源装载。

这里的同源策略指的是：协议，域名，端口相同，同源策略是一种安全协议。
指一段脚本只能读取来自同一来源的窗口和文档的属性。

###为什么要有同源限制？
   我们举例说明：比如一个黑客程序，他利用`Iframe`把真正的银行登录页面嵌到他的页面上，当你使用真实的用户名，密码登录时，他的页面就可以通过`Javascript`读取到你的表单中`input`中的内容，这样用户名，密码就轻松到手了。



什么是 "use strict"; ? 使用它的好处和坏处分别是什么？
-----------------------------------
`ECMAscript 5`添加了第二种运行模式："严格模式"（strict mode）。顾名思义，这种模式使得`Javascript`在更严格的条件下运行。


设立"严格模式"的目的，主要有以下几个：



    - 消除Javascript语法的一些不合理、不严谨之处，减少一些怪异行为;
    - 消除代码运行的一些不安全之处，保证代码运行的安全；
    - 提高编译器效率，增加运行速度；
    - 为未来新版本的Javascript做好铺垫。

注：经过测试`IE6,7,8,9`均不支持严格模式。

缺点：
现在网站的`JS` 都会进行压缩，一些文件用了严格模式，而另一些没有。这时这些本来是严格模式的文件，被 `merge` 后，这个串就到了文件的中间，不仅没有指示严格模式，反而在压缩后浪费了字节。

GET和POST的区别，何时使用POST？
-----------

        GET：一般用于信息获取，使用URL传递参数，对所发送信息的数量也有限制，一般在2000个字符
        POST：一般用于修改服务器上的资源，对所发送的信息没有限制。
        
        GET方式需要使用Request.QueryString来取得变量的值，而POST方式通过Request.Form来获取变量的值，
        也就是说Get是通过地址栏来传值，而Post是通过提交表单来传值。
    
    然而，在以下情况中，请使用 POST 请求：
    无法使用缓存文件（更新服务器上的文件或数据库）
    向服务器发送大量数据（POST 没有数据量限制）
    发送包含未知字符的用户输入时，POST 比 GET 更稳定也更可靠

哪些地方会出现css阻塞，哪些地方会出现js阻塞？
-----------------------------------

**js的阻塞特性：**所有浏览器在下载`JS`的时候，会阻止一切其他活动，比如其他资源的下载，内容的呈现等等。直到`JS`下载、解析、执行完毕后才开始继续`并行下载`其他资源并呈现内容。为了提高用户体验，新一代浏览器都支持并行下载`JS`，但是`JS`下载仍然会阻塞其它资源的下载（例如.图片，css文件等）。

由于浏览器为了防止出现`JS`修改`DOM`树，需要重新构建`DOM`树的情况，所以就会阻塞其他的下载和呈现。

嵌入`JS`会阻塞所有内容的呈现，而外部`JS`只会阻塞其后内容的显示，2种方式都会阻塞其后资源的下载。也就是说外部样式不会阻塞外部脚本的加载，但会阻塞外部脚本的执行。

`CSS`怎么会阻塞加载了？`CSS`本来是可以并行下载的，在什么情况下会出现阻塞加载了(在测试观察中，`IE6`下`CSS`都是阻塞加载）

当`CSS`后面跟着嵌入的`JS`的时候，该`CSS`就会出现阻塞后面资源下载的情况。而当把嵌入`JS`放到`CSS`前面，就不会出现阻塞的情况了。



 根本原因：因为浏览器会维持`html`中`css`和`js`的顺序，样式表必须在嵌入的JS执行前先加载、解析完。而嵌入的`JS`会阻塞后面的资源加载，所以就会出现上面`CSS`阻塞下载的情况。

嵌入`JS`应该放在什么位置？

       1、放在底部，虽然放在底部照样会阻塞所有呈现，但不会阻塞资源下载。
       
       2、如果嵌入JS放在head中，请把嵌入JS放在CSS头部。
       
       3、使用defer（只支持IE）
       
       4、不要在嵌入的JS中调用运行时间较长的函数，如果一定要用，可以用`setTimeout`来调用

###Javascript无阻塞加载具体方式

 - **将脚本放在底部。**`<link>`还是放在`head`中，用以保证在`js`加载前，能加载出正常显示的页面。`<script>`标签放在`</body>`前。
 - **成组脚本**：由于每个`<script>`标签下载时阻塞页面解析过程，所以限制页面的`<script>`总数也可以改善性能。适用于内联脚本和外部脚本。

 

 - **非阻塞脚本**：等页面完成加载后，再加载`js`代码。也就是，在`window.onload`事件发出后开始下载代码。
    （1）`defer`属性：支持IE4和`fierfox3.5`更高版本浏览器
    （2）动态脚本元素：文档对象模型（DOM）允许你使用js动态创建`HTML`的几乎全部文档内容。代码如下：
    
<br>

    <script>
    var script=document.createElement("script");
    script.type="text/javascript";
    script.src="file.js";
    document.getElementsByTagName("head")[0].appendChild(script);
    </script>

 此技术的重点在于：无论在何处启动下载，文件额下载和运行都不会阻塞其他页面处理过程。即使在head里（除了用于下载文件的http链接）。   
    

闭包相关问题？
-------
详情请见：[详解js闭包][12]
    

js事件处理程序问题？
-----------
详情请见：[JavaScript学习总结（九）事件详解][13]
    
    

eval是做什么的？
----------

    它的功能是把对应的字符串解析成JS代码并运行；
    应该避免使用eval，不安全，非常耗性能（2次，一次解析成js语句，一次执行）。

    

JavaScript原型，原型链 ? 有什么特点？
-------------------------

    *  原型对象也是普通的对象，是对象一个自带隐式的 __proto__ 属性，原型也有可能有自己的原型，如果一个原型对象的原型不为null的话，我们就称之为原型链。
    *  原型链是由一些用来继承和共享属性的对象组成的（有限的）对象链。




事件、IE与火狐的事件机制有什么区别？ 如何阻止冒泡？
---------------------------


     1. 我们在网页中的某个操作（有的操作对应多个事件）。例如：当我们点击一个按钮就会产生一个事件。是可以被 JavaScript 侦测到的行为。  
     2. 事件处理机制：IE是事件冒泡、firefox同时支持两种事件模型，也就是：捕获型事件和冒泡型事件。；
     3.  ev.stopPropagation();注意旧ie的方法 ev.cancelBubble = true;

ajax 是什么?ajax 的交互模型?同步和异步的区别?如何解决跨域问题?
--------------------------------------
详情请见：[JavaScript学习总结（七）Ajax和Http状态字][14]
    

  

    1. 通过异步模式，提升了用户体验
    
      2. 优化了浏览器和服务器之间的传输，减少不必要的数据往返，减少了带宽占用
    
      3. Ajax在客户端运行，承担了一部分本来由服务器承担的工作，减少了大用户量下的服务器负载。
    
      2. Ajax的最大的特点是什么。
    
      Ajax可以实现动态不刷新（局部刷新）
      readyState属性 状态 有5个可取值： 0=未初始化 ，1=启动 2=发送，3=接收，4=完成
    
    ajax的缺点
    
      1、ajax不支持浏览器back按钮。
    
      2、安全问题 AJAX暴露了与服务器交互的细节。
    
      3、对搜索引擎的支持比较弱。
    
      4、破坏了程序的异常机制。
    
      5、不容易调试。
    
    跨域： jsonp、 iframe、window.name、window.postMessage、服务器上设置代理页面

js对象的深度克隆
---------


      function clone(Obj) {   
            var buf;   
            if (Obj instanceof Array) {   
                buf = [];  //创建一个空的数组 
                var i = Obj.length;   
                while (i--) {   
                    buf[i] = clone(Obj[i]);   
                }   
                return buf;   
            }else if (Obj instanceof Object){   
                buf = {};  //创建一个空对象 
                for (var k in Obj) {  //为这个对象添加新的属性 
                    buf[k] = clone(Obj[k]);   
                }   
                return buf;   
            }else{   
                return Obj;   
            }   
        }  
    

AMD和CMD 规范的区别？
--------------
详情请见：[详解JavaScript模块化开发][15] 

网站重构的理解？
--------

    网站重构：在不改变外部行为的前提下，简化结构、添加可读性，而在网站前端保持一致的行为。也就是说是在不改变UI的情况下，对网站进行优化，在扩展的同时保持一致的UI。
    
    对于传统的网站来说重构通常是：
    
    表格(table)布局改为DIV+CSS
    使网站前端兼容于现代浏览器(针对于不合规范的CSS、如对IE6有效的)
    对于移动平台的优化
    针对于SEO进行优化
    深层次的网站重构应该考虑的方面
    
    减少代码间的耦合
    让代码保持弹性
    严格按规范编写代码
    设计可扩展的API
    代替旧有的框架、语言(如VB)
    增强用户体验
    通常来说对于速度的优化也包含在重构中
    
    压缩JS、CSS、image等前端资源(通常是由服务器来解决)
    程序的性能优化(如数据读写)
    采用CDN来加速资源加载
    对于JS DOM的优化
    HTTP服务器的文件缓存

如何获取UA？
-------

    <script> 
        function whatBrowser() {  
            document.Browser.Name.value=navigator.appName;  
            document.Browser.Version.value=navigator.appVersion;  
            document.Browser.Code.value=navigator.appCodeName;  
            document.Browser.Agent.value=navigator.userAgent;  
        }  
    </script>

js数组去重
------
以下是数组去重的三种方法：

    Array.prototype.unique1 = function () {
      var n = []; //一个新的临时数组
      for (var i = 0; i < this.length; i++) //遍历当前数组
      {
        //如果当前数组的第i已经保存进了临时数组，那么跳过，
        //否则把当前项push到临时数组里面
        if (n.indexOf(this[i]) == -1) n.push(this[i]);
      }
      return n;
    }
    
    Array.prototype.unique2 = function()
    {
    	var n = {},r=[]; //n为hash表，r为临时数组
    	for(var i = 0; i < this.length; i++) //遍历当前数组
    	{
    		if (!n[this[i]]) //如果hash表中没有当前项
    		{
    			n[this[i]] = true; //存入hash表
    			r.push(this[i]); //把当前数组的当前项push到临时数组里面
    		}
    	}
    	return r;
    }
    
    Array.prototype.unique3 = function()
    {
    	var n = [this[0]]; //结果数组
    	for(var i = 1; i < this.length; i++) //从第二项开始遍历
    	{
    		//如果当前数组的第i项在当前数组中第一次出现的位置不是i，
    		//那么表示第i项是重复的，忽略掉。否则存入结果数组
    		if (this.indexOf(this[i]) == i) n.push(this[i]);
    	}
    	return n;
    }
    

HTTP状态码
-------

    100  Continue  继续，一般在发送post请求时，已发送了http header之后服务端将返回此信息，表示确认，之后发送具体参数信息
    200  OK   正常返回信息
    201  Created  请求成功并且服务器创建了新的资源
    202  Accepted  服务器已接受请求，但尚未处理
    301  Moved Permanently  请求的网页已永久移动到新位置。
    302 Found  临时性重定向。
    303 See Other  临时性重定向，且总是使用 GET 请求新的 URI。
    304  Not Modified  自从上次请求后，请求的网页未修改过。
    
    400 Bad Request  服务器无法理解请求的格式，客户端不应当尝试再次使用相同的内容发起请求。
    401 Unauthorized  请求未授权。
    403 Forbidden  禁止访问。
    404 Not Found  找不到如何与 URI 相匹配的资源。
    
    500 Internal Server Error  最常见的服务器端错误。
    503 Service Unavailable 服务器端暂时无法处理请求（可能是过载或维护）。



js操作获取和设置cookie
---------------

    
    //创建cookie
    function setCookie(name, value, expires, path, domain, secure) {
    	var cookieText = encodeURIComponent(name) + '=' + encodeURIComponent(value);
    	if (expires instanceof Date) {
    		cookieText += '; expires=' + expires;
    	}
    	if (path) {
    		cookieText += '; expires=' + expires;
    	}
    	if (domain) {
    		cookieText += '; domain=' + domain;
    	}
    	if (secure) {
    		cookieText += '; secure';
    	}
    	document.cookie = cookieText;
    }
    
    //获取cookie
    function getCookie(name) {
    	var cookieName = encodeURIComponent(name) + '=';
    	var cookieStart = document.cookie.indexOf(cookieName);
    	var cookieValue = null;
    	if (cookieStart > -1) {
    		var cookieEnd = document.cookie.indexOf(';', cookieStart);
    		if (cookieEnd == -1) {
    			cookieEnd = document.cookie.length;
    		}
    		cookieValue = decodeURIComponent(document.cookie.substring(cookieStart + cookieName.length, cookieEnd));
    	}
    	return cookieValue;
    }
    
    //删除cookie
    function unsetCookie(name) {
    	document.cookie = name + "= ; expires=" + new Date(0);
    }

 
###说说TCP传输的三次握手策略

	为了准确无误地把数据送达目标处，TCP协议采用了三次握手策略。用TCP协议把数据包送出去后，TCP不会对传送  后的情况置之不理，它一定会向对方确认是否成功送达。握手过程中使用了TCP的标志：SYN和ACK。
	发送端首先发送一个带SYN标志的数据包给对方。接收端收到后，回传一个带有SYN/ACK标志的数据包以示传达确认信息。最后，发送端再回传一个带ACK标志的数据包，代表“握手”结束
	若在握手过程中某个阶段莫名中断，TCP协议会再次以相同的顺序发送相同的数据包。


###说说你对Promise的理解

依照 `Promise/A+` 的定义，`Promise` 有四种状态：

	pending: 初始状态, 非 fulfilled 或 rejected.
	fulfilled: 成功的操作.
	rejected: 失败的操作.
	settled: Promise已被fulfilled或rejected，且不是pending

另外， `fulfilled` 与 `rejected` 一起合称 `settled`。

`Promise` 对象用来进行延迟(deferred) 和异步(asynchronous ) 计算。

>Promise 的构造函数

构造一个 `Promise`，最基本的用法如下：

	var promise = new Promise(function(resolve, reject) {
	    if (...) {  // succeed
	        resolve(result);
	    } else {   // fails
	        reject(Error(errMessage));
	    }
	});

`Promise` 实例拥有 `then` 方法（具有 `then` 方法的对象，通常被称为 `thenable`）。它的使用方法如下：

	promise.then(onFulfilled, onRejected)

接收两个函数作为参数，一个在 `fulfilled` 的时候被调用，一个在 `rejected` 的时候被调用，接收参数就是 `future，onFulfilled` 对应 `resolve`, `onRejected` 对应 `reject`。


##Javascript垃圾回收方法

###标记清除（mark and sweep）


这是`JavaScript`最常见的垃圾回收方式，当变量进入执行环境的时候，比如函数中声明一个变量，垃圾回收器将其标记为“进入环境”，当变量离开环境的时候（函数执行结束）将其标记为“离开环境”。

垃圾回收器会在运行的时候给存储在内存中的所有变量加上标记，然后去掉环境中的变量以及被环境中变量所引用的变量（闭包），在这些完成之后仍存在标记的就是要删除的变量了

###引用计数(reference counting)

在低版本`IE`中经常会出现内存泄露，很多时候就是因为其采用引用计数方式进行垃圾回收。引用计数的策略是跟踪记录每个值被使用的次数，当声明了一个 变量并将一个引用类型赋值给该变量的时候这个值的引用次数就加1，如果该变量的值变成了另外一个，则这个值得引用次数减1，当这个值的引用次数变为0的时 候，说明没有变量在使用，这个值没法被访问了，因此可以将其占用的空间回收，这样垃圾回收器会在运行的时候清理掉引用次数为0的值占用的空间。

在IE中虽然`JavaScript`对象通过标记清除的方式进行垃圾回收，但BOM与DOM对象却是通过引用计数回收垃圾的，也就是说只要涉及BOM及DOM就会出现循环引用问题。

###谈谈性能优化问题

代码层面：避免使用css表达式，避免使用高级选择器，通配选择器。
缓存利用：缓存Ajax，使用CDN，使用外部js和css文件以便缓存，添加Expires头，服务端配置Etag，减少DNS查找等
请求数量：合并样式和脚本，使用css图片精灵，初始首屏之外的图片资源按需加载，静态资源延迟加载。
请求带宽：压缩文件，开启GZIP，

###移动端性能优化

>尽量使用`css3`动画，开启硬件加速。适当使用`touch`事件代替`click`事件。避免使用`css3`渐变阴影效果。
>尽可能少的使用`box-shadow`与`gradients`。`box-shadow`与`gradients`往往都是页面的性能杀手

##什么是Etag？

浏览器下载组件的时候，会将它们存储到浏览器缓存中。如果需要再次获取相同的组件，浏览器将检查组件的缓存时间，
假如已经过期，那么浏览器将发送一个条件GET请求到服务器，服务器判断缓存还有效，则发送一个304响应，
告诉浏览器可以重用缓存组件。

那么服务器是根据什么判断缓存是否还有效呢?答案有两种方式，一种是前面提到的ETag，另一种是根据`Last-Modified`

###Expires和Cache-Control

`Expires`要求客户端和服务端的时钟严格同步。HTTP1.1引入`Cache-Control`来克服Expires头的限制。如果max-age和Expires同时出现，则max-age有更高的优先级。

    Cache-Control: no-cache, private, max-age=0
    ETag: abcde
    Expires: Thu, 15 Apr 2014 20:00:00 GMT
    Pragma: private
    Last-Modified: $now // RFC1123 format

###栈和队列的区别?

    栈的插入和删除操作都是在一端进行的，而队列的操作却是在两端进行的。
    队列先进先出，栈先进后出。
    栈只允许在表尾一端进行插入和删除，而队列只允许在表尾一端进行插入，在表头一端进行删除 

###栈和堆的区别？

    栈区（stack）—   由编译器自动分配释放   ，存放函数的参数值，局部变量的值等。
    堆区（heap）   —   一般由程序员分配释放，   若程序员不释放，程序结束时可能由OS回收。
    堆（数据结构）：堆可以被看成是一棵树，如：堆排序；
    栈（数据结构）：一种先进后出的数据结构。 

###关于Http 2.0 你知道多少？

`HTTP/2`引入了“服务端推（serverpush）”的概念，它允许服务端在客户端需要数据之前就主动地将数据发送到客户端缓存中，从而提高性能。
`HTTP/2`提供更多的加密支持
`HTTP/2`使用多路技术，允许多个消息在一个连接上同时交差。 
它增加了头压缩（header compression），因此即使非常小的请求，其请求和响应的`header`都只会占用很小比例的带宽。
  
  [1]: /img/bVldFY
  [2]: http://segmentfault.com/blog/trigkit4/1190000000718840
  [3]: http://segmentfault.com/blog/trigkit4/1190000000660786#articleHeader15
  [4]: http://segmentfault.com/blog/trigkit4/1190000000687844
  [5]: http://segmentfault.com/blog/trigkit4/1190000000758184#articleHeader5
  [6]: http://segmentfault.com/blog/trigkit4/1190000000800711#articleHeader30
  [7]: http://segmentfault.com/blog/trigkit4/1190000000656717
  [8]: http://segmentfault.com/blog/trigkit4/1190000000697254
  [9]: http://segmentfault.com/blog/trigkit4/1190000002440502
  [10]: http://segmentfault.com/blog/trigkit4/1190000000691919
  [11]: http://segmentfault.com/blog/trigkit4/1190000002585760
  [12]: http://segmentfault.com/blog/trigkit4/1190000000652891
  [13]: http://segmentfault.com/blog/trigkit4/1190000002174034
  [14]: http://segmentfault.com/blog/trigkit4/1190000000691919
  [15]: http://segmentfault.com/blog/trigkit4/1190000000733959
