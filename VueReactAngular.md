### React Vue Angular

|-|Angular|Vue|React|
|-|-|-|-|
|维护团队|Google|国人 Even You|Facebook|
|类型|MVP MVC MVVM|MVVM|MVVM|
|初始化|双向数据绑定|双向数据绑定|单项数据绑定|
|实现方案|利用脏值检测实现双向数据绑定|数据劫持 利用ES5的Object.defineProperty的get和set属性值来实现双向数据绑定 2.0版本增加虚拟DOM|虚拟DOM|
|性能|最差 功能最多|最轻 内置功能较少|比较轻 性能最少|
|ajax|$http|vue-resource/jQuery|jQuery|
|自定义服务|app.service()构造器/app.factory工厂函数/app.constant()/app.value()|无|无|
|服务|有服务 需要依赖注入|没有服务|没有服务|
|自定义过滤器|app.directive()来实现|Vue.directive()来实现|无|
|内置过滤器|currency,uppercase,lowercase,json,number,filter,orderBy,limitTo...|filterBy...|无|
|自定义指令|有指令 ng-xxx 使用app.directive()去定义|有指令 v-xxx 使用Vue.directive()去定义|无|
|内置指令|ng-app,ng-controller,ng-model,ng-bind,ng-style,ng-class,ng-bind-html,ng-if,ng-show...|v-model,@click,:src|没有|
|jQ工具包|jQlite|引入jQ|引入jQ|
|绑定数据|{{xxx}}/ng-bind|{{xxx}}/v-text|{xxx}|
|绑定函数|通过$scope和ng-click等指令完成|通过methods和@click等指令完成|通过定义函数和onClick={}等方法完成|
|语法|JS/ES6|JS/ES6|JSX|


## 初始化
angular
```javascript
var app = angular.module("app",[]);
		app.controller("indexCtrl",function($scope){
			$scope.text = "Hello World"
		})
```
vue
```javascript
new Vue({
			el:"#demo",
			data:{
				//code
				text:"Hello World"
			},
			template:"<p>{{text}}</p>"
		})
```
react
```javascript
var text = "Hello WorldD";
		ReactDOM.render(
			<p>{text}</p>
		,document.getElementById("demo"))
```

## MVVM MVC MVP
1. mvp的全称为Model-View-Presenter，Model提供数据，View负责显示，Controller/Presenter负责逻辑的处理。MVP与MVC有着一个重大的区别：在MVP中View并不直接使用Model，它们之间的通信是通过Presenter (MVC中的Controller)来进行的，所有的交互都发生在Presenter内部，而在MVC中View会直接从Model中读取数据而不是通过 Controller
2. MVVM是Model-View-ViewModel的简写。微软的WPF带来了新的技术体验，如Silverlight、音频、视频、3D、动画……，这导致了软件UI层更加细节化、可定制化。同时，在技术层面，WPF也带来了 诸如Binding、Dependency Property、Routed Events、Command、DataTemplate、ControlTemplate等新特性。MVVM（Model-View-ViewModel）框架的由来便是MVP（Model-View-Presenter）模式与WPF结合的应用方式时发展演变过来的一种新型架构框架。它立足于原有MVP框架并且把WPF的新特性糅合进去，以应对客户日益复杂的需求变化
3. MVC全名是Model View Controller，是模型(model)－视图(view)－控制器(controller)的缩写，一种软件设计典范，用一种业务逻辑、数据、界面显示分离的方法组织代码，将业务逻辑聚集到一个部件里面，在改进和个性化定制界面及用户交互的同时，不需要重新编写业务逻辑。MVC被独特的发展起来用于映射传统的输入、处理和输出功能在一个逻辑的图形化用户界面的结构中

## 虚拟DOM
其实就是类似jQ的字符串拼接，然后再把拼接好的完整的html结构插入到对应的节点，我们就不会再对html结构实现增删查改，以后要重新操作DOM，只要重新修改新的html结构再插入即可

## Ajax
angular
注意使用之前一定要注入$http服务,只有angular才有服务的概念，服务其实就是封装好一大堆可服用的方法,jQ来扩展react和vue的功能
```javascript
$http({
				url:"test.json",
				methods:"GET",
				params:{
					name:"test"
				}
			}).then(function(data){
				console.log(data)
			})
```
vue
实现ajax,要不写原生ajax,要不引入jQ,vue-resource,this.$http().then
```
getData:function(){
					$.ajax({
						type:"get",
						url:"test.json",
						async:true,
						data:{
							skill:"PS"
						},
						success:function(data){
							console.log(data)
						}.bind(this)
					});
				}
```
react
需要引入jQ,也可以用原生，也可以用第三方库
```
var getData = function(){
			console.log("H")
			$.ajax({
				url:"test.json",
				type:"GET",
				success:function(data){
					console.log(data)
				}
			})
		}
```

## 绑定数据
angular
双向数据绑定,$scope的属性值绑定对应的值，然后通过ng-bind或者{{}}实现渲染
```javascript
//HTML VIEW
<p>{{text}}</p>
//JS MODEL
$scope.text = "xxxx"
```

vue
双向数据绑定,通过在data里面定义属性值，然后通过v-text或者{{}}实现渲染
```javascript
//HTML VIEW
<p>{{text}}</p>
//MODEL
data:{
	text:"Hello World"
},
```

react
单向数据绑定,通过定义一个变量，然后使用{}进行绑定
```javascript
//JS MODEL
var text = "Hello WorldD";
//HTML VIEW
<p>{text}</p>
```

## 绑定函数
angular
通过在$scope里面定义一个函数，然后通过指令(ng-click)绑定到对应的标签上
```javascript
//HTML
<button ng-click="getData">GET</button>
//MODEL
$scope.getData = function() {}
```

vue
通过在methods里面定义方法，然后通过指令(@click)绑定到对应的标签上
@click === v-on:click
```
<button @Click="getData">Get</button>
methods:{
	getData:function(){}
}
```

react
定义函数,配合{}来绑定,jsx=>{}左右是没有双引号
```
//定义一个函数
var getData = function(){}
//
<button onClick={getData}>Ok</button>
<button onClick={function(){}}>Ok</button>
```

## 自定义指令
其实就是把相同类型的DOM操作封装在一起，然后实现复用
angular
```
<ng-color>组件</ng-color>
<div ng-color="">指令</div>
```
```
//使用
<p ng-color="blue">{{text}}</p>
//定义指令
app.directive("ngColor",function(){
	return {
			link:function(scope,ele,attr){
			ele.css("color",attr.ngColor)
		}
	}
})
```
vue
全局和局部的directive有单数复数的区分
```
Vue.directive()//全局定义
				directives:{//局部定义
					color:{
						bind:function(){
							this.vm//scope
							this.el.style.color = "red"//ele
						}
					}
				}
```
react
没有指令，要自己去实现DOM的复用就要封装类指令来实现

## 内置指令(遍历数组)
angular
ng-show ng-if
```
<ul>
	<li ng-repeat="a in arr">{{a}}</li>
</ul>
```
vue
```
<ul>
	<li v-for="a in arr">{{a}}</li>
</ul>
```
react
```
{arr.map(function(item){
	return <li>{item}</li>
})}
```

## 过滤器
angular
过滤器其实是一种特殊的服务，封装一个处理相同类型数据的方法,使用的时候用管道字符+过滤器名字
```javascript
//HTML
<div ng-bind-html="html|html">
//JS
app.filter("html",function($sce){
			return function(input){
				console.log(input)
				return $sce.trustAsHtml(input)
			}
		})
```
vue
```javascript
<p>{{text|ed}}</p>
Vue.filter("过滤器的名字",function(){})
			filters:{//局部定义
				ed:function(input){
					return input+"ed";
				}
			}
```
react
实现一个类过滤器的方法
```
var ed = function(input){
	return input+"ed"
}
<p>{ed(text)}</p>
```
