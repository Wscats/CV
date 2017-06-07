/*
	获取min到max的随机数
 */
function randomNum(min,max){
	return parseInt(Math.random()*(max-min + 1)) + min;
}

/**
 * [获取随机颜色]
 * @return [返回16进制的颜色]
 */
function randomColor(){
	var str = '0123456789abcdef';
	var res = '#';
	for(var i=0;i<6;i++){
		var idx = parseInt(Math.random()*str.length);
		res += str[idx];
	}

	return res;
}

// 封装一个兼容所有浏览器的方法getStyle
// 用于获取css样式
function getStyle(ele,attr){
	// 支持getComputedStyle的浏览器
	if(window.getComputedStyle){
		return getComputedStyle(ele)[attr];
	}
	// 支持currentStyle的浏览器
	else if(ele.currentStyle){
		return ele.currentStyle[attr];
	}else{
		return ele.style[attr];
	}
}
// var ele = document.getElementById('box')
// getStyle(ele,'width');//'200px';

/**
 * [给元素添加事件，兼容IE8-]
 * @param ele    [元素节点]
 * @param type   [事件类型]
 * @param handle [事件处理函数]
 * @param capture [是否捕获]
 */
function addEvent(ele,type,handle,capture){
	if(ele.addEventListener){
		ele.addEventListener(type,handle,capture);
	}else if(ele.attachEvent){
		ele.attachEvent('on' + type,handle);
	}else{
		ele['on' + type] = handle;
	}
}
// addEvent(ele,type,fn)
// addEvent(pop,'click',function(){
// })


/*
	cookie的增删改查
 */

function getCookie(name){
	var cookie = document.cookie.split('; ');
	var res;

	for(var i=0;i<cookie.length;i++){
		var arr = cookie[i].split('=');
		if(arr[0] === name){
			res = arr[1];
			break;
		}
	}

	return res;
}
//getCookie('carlist');//=>[]

/**
 * [设置cookie]
 * @param name    [cookie名]
 * @param val     [cookie值]
 * @param expires [有效期]
 * @param path    [cookie保存的路径]
 */
function setCookie(name,val,expires,path){
	var cookieStr = name + '=' + val;

	if(expires){
		cookieStr += ';expires=' + expires;
	}

	if(path){
		cookieStr += ';path=' + path;
	}

	// 写入cookie
	document.cookie = cookieStr;//'name=laoxie'
}
//setCookie('name','laoxie',expires,path)
//setCookie('carlist',[{}])

function removeCookie(name){
	var now = new Date();
	now.setDate(now.getDate()-1);
	// document.cookie = name + '=null;expires='+ now
	setCookie(name,'null',now);
}


/*
	去除首尾空格
	'   abc' ==>'abc'
	'   abc123  ' =>'abc123'
	'abc d  '=>'abc d'
 */
function trim(str){
	str = str.replace(/^\s+/g,'').replace(/\s+$/g,'');
	return str;
}
// trim('   abc')

/**
 * [动画函数]
 * @param  ele    [执行动画的元素节点]
 * @param  attr   [执行动画的属性]
 * @param  target [属性改变的目标值]
 */
/*function animate(ele,attr,target){
	ele[attr+'timer'] = setInterval(()=>{
		var current = getStyle(ele,attr);//10px,30deg,15,0.3;

		// 提取单位
		var unit = current.match(/[a-z]+$/i);
		unit = unit ? unit[0] : '';

		current = parseFloat(current);

		// 计算速度
		var speed = (target - current)/10;

		if(attr === 'opacity'){
			speed = speed>0 ? 0.05 : -0.05;
		}else{
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);//0.1=>1,-0.1=>-1
		}


		console.log(current,target,speed);

		// 当current达到target值时，停止定时器
		if(current == target){
			clearInterval(ele[attr + 'timer']);
			current = target - speed;
		}

		ele.style[attr] = current + speed + unit;
	},50);
}*/
//animate(ele,'left',100)
//aninmate(ele,{left:100,width:300,opacity:0.5})

/**
 * [动画函数]
 * @param  ele    [执行动画的元素节点]
 * @param  opt   [执行动画的属性和目标值]
 * @param  callback [回调函数]
 */
function animate(ele,opt,callback){
	// 设置一个属性timerLen，用于记录属性动画的数量
	ele.timerLen = 0;
	
	// 遍历对象，找出每一个属性和对应的目标值
	for(let attr in opt){
		ele.timerLen++;

		// 目标值
		let target = opt[attr];
		let timerName = attr+'timer';

		// 开启定时器前，先清除之前的定时器
		clearInterval(ele[timerName]);
		ele[timerName] = setInterval(()=>{
			// 获取当前值
			var current = getStyle(ele,attr);

			// 提取单位
			var unit = current.match(/[a-z]+$/i);//['px']/null
			unit = unit ? unit[0] : '';

			current = parseFloat(current);

			// 计算缓动速度
			var speed = (target - current)/8;//0.003

			// 取整（整数/负数）
			speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);//0.1=>1,-0.1=>-1

			// 如果是opacity
			if(attr == 'opacity'){
				speed = speed>0 ? 0.05 : -0.05;
			}

			// 当达到目标值时，清除定时器
			if(current == target){
				clearInterval(ele[timerName]);
				current = target - speed;

				// 清除后更新timerLen的数量
				ele.timerLen--;

				// 在所有动画完成后才执行callback()
				// 判断是否是最后一个属性动画执行完毕
				if(ele.timerLen === 0){
					typeof callback === 'function' && callback();
				}
			}

			// 修改DOM节点的属性
			ele.style[attr] = current + speed + unit;

		},50);
	}
	
}


//封装兼容IE8-浏览器的ajax请求
//如果支持jsonp请求
function ajax(opt){
	// 默认值
	var defaults = {
		type:'get',
		async:true,
		// data:{}
	}

	// 兼容浏览器写法
	var req = null;
	try{
	    req = new XMLHttpRequest();
	}catch(err){
		// 如果不支持XMLHttpRequest，则执行这里的代码：
		try{
	        req = new ActiveXObject("Msxml2.XMLHTTP");
	    }catch(err){
	    	try{
	            req = new ActiveXObject("Microsoft.XMLHTTP");
	        }catch(err){
	        	alert('救不了你了，赶紧换电脑');
	        }
	    }
	}

	// 覆盖默认参数
	for(var attr in opt){
		defaults[attr] = opt[attr];
	}
	var df = defaults;

	// 传递数据处理
	var dataStr = '';//'name=xxx&age=18'
	if(df.data){
		for(var attr in df.data){
			dataStr += attr + '=' + df.data[attr] + '&';
		}

		// 去除最后一个&
		dataStr = dataStr.slice(0,-1);

		// 根据请求类型，生成不同的数据字符串
		// get:df.url + ? + dataStr
		// post:send(dataStr)
		if(df.type === 'get'){
			df.url += '?' + dataStr;
			dataStr = null;
		}
	}

	// 返回数据处理
	req.onreadystatechange = function(){
		if(req.readyState === 4 && (req.status === 200 || req.status === 304)){
			// 判断返回数据是否为json字符串格式
			var res;
			try{
				if(JSON.parse){
					res = JSON.parse(req.responseText);
				}else{
					res = eval('('+req.responseText+')');
				}
			}catch(err){
				res = req.responseText;
			}

			typeof df.callback === 'function' && df.callback(res);
		}
	}

	req.open(df.type,df.url,df.async);

	// 让后台的post方法可以请求到
	if(df.type === 'post'){
		req.setRequestHeader('Content-Type','Application/x-www-form-urlencoded');
	}
	req.send(dataStr);
}


/**
 * [判断数据类型]
 * @data [需要判断的数据类型]
 * @return [返回表示类型的字符串]
 */
function type(data){
	//data.toString();
	var res = Object.prototype.toString.call(data);
	res = res.slice(8,-1).toLowerCase();

	return res;
}


function GetEle(selector){
	this.selector = selector;

	this.init();
}

// 获取元素
GetEle.prototype.init = function(){
	var selector = this.selector;

	var res;

	try{
		// 高级浏览器用法
		res = document.querySelectorAll(selector);
	}catch(err){
		// 如果传进来的是ID
		if(/^#[\w\-]+/i.test(selector)){
			res = document.getElementById(selector.substring(1));
		}else if(/^\.[\w\-]+/i.test(selector)){
			res = document.getElementsByClassName(selector.substring(1));
		}else if(/^[a-z][\da-z]*/i.test(selector)){
			res = document.getElementsByTagName(selector);
		}
	}

	this.ele = res;

	// 添加数量
	this.len = res.length;

	// 为了链式调用
	return this;
}

// 隐藏元素
GetEle.prototype.hide = function(){
	for(var i=0;i<this.len;i++){
		this.ele[i].style.display = 'none'
	}

	return this;
}

// 显示元素
GetEle.prototype.show = function(){
	for(var i=0;i<this.len;i++){
		this.ele[i].style.display = 'block'
	}

	return this;
}

// 绑定事件
GetEle.prototype.on = function(type,handle){
	// 给谁绑定事件
	for(var i=0;i<this.len;i++){
		this.ele[i]['on' + type] = handle;
	}

	return this;
}

/*
	要求：
	1、添加css()方法
		$('#box').css('color','#f00');
		$('#box').css('color');//获取color样式
	2、append()
		插入元素
		$('#box').append('<div>添加的内容</div>');
		<div id="box"><h1>111</h1><div>添加的内容</div></div>
 */
GetEle.prototype.css = function(attr,val){
	// 获取样式
	// 如果存在多个元素，只返回第一个元素的css
	if(val === undefined){
		return getStyle(this.ele[0],attr);
	}

	// 设置样式
	else{
		for(var i=0;i<this.len;i++){
			this.ele[i].style[attr] = val;
		}
	}
	
	return this;
}


// 添加元素
// $('#box').append('<div>aaa</div>');
// var box2 = document.querySelector('#box2');
// $('#box').append(box2);
GetEle.prototype.append = function(content){
	for(var i=0;i<this.len;i++){
		if(typeof content === 'string'){
			this.ele[i].innerHTML += content;
		}else{
			this.ele[i].appendChild(content);
		}
	}
	
	return this;
}


// 删除元素
// $('#box').remove();
// $('a').remove();
GetEle.prototype.remove = function(){
	for(var i=0;i<this.len;i++){
		this.ele[i].parentNode.removeChild(this.ele[i]);
	}
}



// 简化生成实例的过程
// 工厂函数
function $(selector){
	return new GetEle(selector);
}