


//子弹: 类(构造函数)
function Bullet() {
	//属性:
	this.ele = document.createElement("div");
	
	//当前子弹所在gameEngine.bullets对象中的id
	this.id = parseInt(Math.random()*100000) + ""; 
	
	//方法:
	//初始化方法init
	this.init = function() {
		this.ele.className = "bullet";
		gameEngine.ele.appendChild(this.ele); //添加到游戏界面main上
		gameEngine.bullets[this.id] = this; //添加子弹对象到gameEngine.bullets对象中
		//console.log(gameEngine.bullets);
		
		//位置
		var left = myPlane.ele.offsetLeft + myPlane.ele.offsetWidth/2 - this.ele.offsetWidth/2;
		this.ele.style.left =  left + "px";
		this.ele.style.top = myPlane.ele.offsetTop - this.ele.offsetHeight + "px";
		return this;
	},
	
	//移动
	this.move = function() {
		var self = this;
		//让子弹向上移动
		this.timer = setInterval(function(){
			//当子弹超出游戏区域的最上方, 则移除,并关闭定时器
			if (self.ele.offsetTop < -18) {
				clearInterval(self.timer); //关闭定时器
				gameEngine.ele.removeChild(self.ele); //移除子弹
				delete gameEngine.bullets[self.id]; //从gameEngine.bullets中移除子弹对象
			}
			else {
				self.ele.style.top = self.ele.offsetTop - 10 + "px";
			}
		}, 30);
	}
	
	//爆炸
	this.boom = function() {
		//先关闭move中的定时器, 让子弹停止移动
		clearInterval(this.timer);
		this.ele.className = "bullet-die"; 
		
		//爆炸动画
		var self = this;
		var index = 0;
		var dieImgs = ["images/die1.png", "images/die2.png"];
		var dieTimer = setInterval(function(){
			if (index >= 2) {
 				clearInterval(dieTimer); //关闭定时器
 				gameEngine.ele.removeChild(self.ele); //移除子弹
			}
			else {
				self.ele.style.background = "url("+ dieImgs[index] +") no-repeat";
				index++;
			}
		}, 50);
		
	}
}












/*
 * 碰撞检测
 */
function isCrash(obj1, obj2){
	if(obj1 && obj2){
		var leftSide = obj2.offsetLeft-obj1.offsetWidth/2;
		var rightSide = obj2.offsetLeft+obj2.offsetWidth+obj1.offsetWidth/2;
		var upSide = obj2.offsetTop - obj1.offsetHeight/2;
		var downSide = obj2.offsetTop + obj2.offsetHeight + obj1.offsetHeight/2;
		var x = obj1.offsetLeft+obj1.offsetWidth/2;
		var y = obj1.offsetTop + obj1.offsetHeight/2;
		if(x > leftSide && x < rightSide && y > upSide && y < downSide){
			return true;
		} 
	}
	return false;
}




















//敌机: 类(构造函数)
function Enemy(type) {
	//属性:
	this.ele = document.createElement("div");
	this.hp = 0; //血量
	this.speed = 0; //速度
	this.dieImgs = []; //爆炸时的图片数组
	
	//当前敌机所在gameEngine.enemys对象中的id
	this.id = parseInt(Math.random()*100000) + "";
	this.score = 0; //分数
	
	//方法:
	this.init = function() {
		switch(type) {
			//大型飞机
			case this.Enemy_Type_Large: 
				this.ele.className = "enemy-large"; //css样式
				this.hp = this.Enemy_HP_Large; //血量
				this.speed = this.Enemy_Speed_Large; //速度
				this.dieImgs = ["images/plane3_die1.png", "images/plane3_die2.png", "images/plane3_die3.png", "images/plane3_die4.png", "images/plane3_die5.png", "images/plane3_die6.png"];
				this.score = 30;
				break;
			//中型飞机
			case this.Enemy_Type_Middle: 
				this.ele.className = "enemy-middle"; //css样式
				this.hp = this.Enemy_HP_Middle; //血量
				this.speed = this.Enemy_Speed_Middle; //速度
				this.dieImgs = ["images/plane2_die1.png", "images/plane2_die2.png", "images/plane2_die3.png", "images/plane2_die4.png"];
				this.score = 20;
				break;
			//小型飞机
			case this.Enemy_Type_Small: 
				this.ele.className = "enemy-small"; //css样式
				this.hp = this.Enemy_HP_Small; //血量
				this.speed = this.Enemy_Speed_Small; //速度
				this.dieImgs = ["images/plane1_die1.png", "images/plane1_die2.png", "images/plane1_die3.png"];
				this.score = 10;
				break;
		}
		//添加敌机到游戏界面上
		gameEngine.ele.appendChild(this.ele);
		gameEngine.enemys[this.id] = this; //添加敌机对象到gameEngine.enemys对象中
		//console.log(gameEngine.enemys);
		
		//位置
		var left = Math.random() * (gameEngine.ele.offsetWidth - this.ele.offsetWidth);
		this.ele.style.left = left + "px";
		this.ele.style.top = -this.ele.offsetHeight + "px";
		return this;
	}
	
	//移动
	this.move = function() {
		var self = this;
		//开启定时器, 让敌机向下移动
		this.timer = setInterval(function() {
			
			//如果敌机超出下边界, 则关闭定时器,且移除敌机
			if (self.ele.offsetTop > gameEngine.ele.offsetHeight) {
				clearInterval(self.timer); //关闭定时器
				gameEngine.ele.removeChild(self.ele); //移除敌机
				delete gameEngine.enemys[self.id]; //从gameEngine.enemys对象中移除当前敌机对象
				
			}
			else {
				//移动
				self.ele.style.top = self.ele.offsetTop + self.speed + "px";
			}
		}, 30);
	}
	
	//受到一点伤害
	this.hurt = function() {
		this.hp--; //掉一点血
		if (this.hp == 0) { //当血量为0时
			this.boom(); //爆炸
			//把分数添加
			gameEngine.scoreNode.innerHTML = (gameEngine.scoreNode.innerHTML-0) + this.score;
		}
	}
	
	//爆炸
	this.boom = function() {
		clearInterval(this.timer); //关闭move中的定时器, 让敌机停止移动
		
		//爆炸动画
		var self = this;
		var index = 0;
		var dieTimer = setInterval(function(){
			
			if (index >= self.dieImgs.length) {
				clearInterval(dieTimer); //关闭定时器
				gameEngine.ele.removeChild(self.ele); //移除敌机
				delete gameEngine.enemys[self.id]; //将当前的敌机对象从gameEngine.enemys对象中移除
			}
			else {
				self.ele.style.background = "url(" + self.dieImgs[index++] + ") no-repeat";
			}
		}, 50);
		
	}
	
}

Enemy.prototype = {
	Enemy_Type_Large: 1, //表示大型飞机
	Enemy_Type_Middle: 2, //表示中型飞机
	Enemy_Type_Small: 3, //表示小型飞机
	
	Enemy_HP_Large: 8, //大型飞机的血量
	Enemy_HP_Middle: 4, //中型飞机的血量
	Enemy_HP_Small: 1, //小型飞机的血量
	
	Enemy_Speed_Large: 2, //大型飞机的速度
	Enemy_Speed_Middle: 4, //中型飞机的速度
	Enemy_Speed_Small: 8 //小型飞机的速度

}







//游戏引擎(对象)
/*
 * 开始游戏, 加载游戏, 进入游戏主界面
 * 创建敌机, 控制移动我的飞机, 碰撞检测...
 */
var gameEngine = {
	//属性ele:是游戏的主界面(游戏区域) 
	ele: null,
	
	bullets: {}, //保存所有在游戏区域显示的子弹
	enemys:{}, //保存所有在游戏区域显示的敌机
	isCrashMyPlane: false, //是否碰撞到了我的飞机
	scoreNode: null, //分数的节点对象
	
	//方法:
	//初始化方法init
	init: function(){
		this.ele = document.getElementById("main_body");
		return this;
	},
	
	//开始游戏start
	start: function(){
		
		//加载游戏
		gameEngine.loading(function(){
			//现在已经加载游戏完毕
			//现在可以正式游戏了
			console.log("开始正式游戏");
			
			//1, 显示我的飞机, 并发射子弹
			myPlane.init().fire();
			
			//2, 开启键盘监听
			gameEngine.keyListening();
			
			//3, 创建敌机
			gameEngine.createEnemy();
			
			//4, 碰撞检测
			gameEngine.crashListening();
			
			//5, 显示分数
			gameEngine.showScore();
			
			//6, 让背景图移动
			gameEngine.move();
		});
		
	},
	
	//加载游戏
	loading: function(loadCallBack) {
		
		//显示logo
		var logo = document.createElement("div");
		logo.className = "logo";
		gameEngine.ele.appendChild(logo);
		
		//显示加载动画的图片
		var load = document.createElement("div");
		load.className = "loading";
		gameEngine.ele.appendChild(load);
		
		//开始加载动画
		var index = 0;
		var loadImgs = ["images/loading1.png", "images/loading2.png", "images/loading3.png"];
		var timer = setInterval(function(){
			
			//当运动到index==5时, 则游戏加载结束
			if (index >= 2) {
				clearInterval(timer); //关闭定时器
				//移除图片(logo,load)
				gameEngine.ele.removeChild(logo);
				gameEngine.ele.removeChild(load);
				
				//回调
				loadCallBack(); 
			}
			else {
				//切换图片
				index++;
				load.style.background = "url(" + loadImgs[index%3] + ") no-repeat";
			}
		}, 500);
		
	},
	
	//开启键盘监听
	keyListening: function(){
		
		var speed = 0; //速度
		
		//监听键盘
		window.onkeydown = function(evt){
			var oEvent = evt || event;
			var keycode = oEvent.keyCode; //键码
			console.log(keycode);
			
			//使用键盘按下不松开的持续触发来移动
			/*
			//向左
			if (keycode == 37) {
				myPlane.ele.style.left = myPlane.ele.offsetLeft - 10 + "px";
			}
			//向右
			else if (keycode == 39) {
				myPlane.ele.style.left = myPlane.ele.offsetLeft + 10 + "px";
			}
			*/
			//向左
			if (keycode == 37) {
				speed = -10;
			}
			//向右
			else if (keycode == 39){
				speed = 10;
			}
		}
		//松开按键
		window.onkeyup = function() {
			speed = 0;
		}
		
		//通过速度speed来匀速移动飞机
		setInterval(function(){
			var x = myPlane.ele.offsetLeft + speed;
			if (x < 0) { //如果超出左边界, 则最多在左边界的位置
				x = 0;
			}
			//如果超出右边界, 则最多在右边界的位置
			else if (x > gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth) {
				x = gameEngine.ele.offsetWidth-myPlane.ele.offsetWidth;
			}
			myPlane.ele.style.left = x + "px";			
		}, 30);
	},
	
	//创建敌机
	createEnemy: function() {
		
		//随机创建大型敌机
		setInterval(createBig, 6000);
		function createBig() {
			var flag = Math.random() > 0.5 ? true : false; //30%的几率创建敌机
			if (flag) {
				var bigEnemy = new Enemy(Enemy.prototype.Enemy_Type_Large); //创建大型敌机对象
				bigEnemy.init().move(); //初始化,并开始向下移动
			}
		}
		
		//随机创建中型飞机
		setInterval(createMiddle, 1000);
		function createMiddle() {
			var flag = Math.random() > 0.7 ? true : false; //30%的几率创建敌机
			if (flag) {
				var middleEnemy = new Enemy(Enemy.prototype.Enemy_Type_Middle); //创建中型敌机对象 
				middleEnemy.init().move(); //初始化,并开始向下移动
			}
		}
		
		//随机创建小型飞机
		setInterval(createSmall, 500);
		function createSmall() {
			var flag = Math.random() > 0.5 ? true : false; //50%的几率创建敌机
			if (flag) {
				var smallEnemy = new Enemy(Enemy.prototype.Enemy_Type_Small); //创建小型敌机对象 
				smallEnemy.init().move(); //初始化,并开始向下移动
			}
		}
	}, 
	
	//碰撞检测
	crashListening: function() {
		/*
		var a = [1,2,3,4,5]
		var b = ["d",4,"g","t"]
		for (var i=0; i<a.length; i++) {
			var m = a[i];
			for (var j=0; j<b.length; j++) {
				if (m == b[j]) {
					
				}
			}
		}
		*/
		
		//开启定时器, 每隔30毫秒检测是否有碰撞
		setInterval(function(){
			
			//遍历所有敌机对象和所有子弹对象, 判断每两个之间是否有碰撞(是否有交集)
			for (var i in gameEngine.enemys) { //遍历所有敌机
				
				for (var j in gameEngine.bullets) { //遍历所有子弹
					
					//如果有碰撞
					if (isCrash(gameEngine.enemys[i].ele, gameEngine.bullets[j].ele)) {
						console.log("检测到碰撞");
						
						//让子弹爆炸, 并从gameEngine.bullets移除该子弹
						gameEngine.bullets[j].boom();
						delete gameEngine.bullets[j];
						
						//让敌机受到一点伤害
						gameEngine.enemys[i].hurt();
					}
				}
				
				//检测我的飞机是否和敌机碰撞
				if (!self.isCrashMyPlane && isCrash(gameEngine.enemys[i].ele, myPlane.ele)) {
					self.isCrashMyPlane = true; //将isCrashMyPlane改变成true
					
					//让我的飞机爆炸
					myPlane.boom(function(){
						console.log("Game Over!");
						alert("Game Over!");
						location.reload();
					});
				}
				
			}
			
		}, 30);
	},
	
	//显示分数
	showScore: function() {
		this.scoreNode = document.createElement("div");
		this.scoreNode.className = "score";
		this.scoreNode.innerHTML = "0";
		gameEngine.ele.appendChild(this.scoreNode);
	},
	
	//让背景图移动
	move: function() {
		var y = 0;
		setInterval(function(){
			gameEngine.ele.style.backgroundPositionY = y++ + "px";
		}, 30);
		
	}
	
}









//我的飞机:(对象)
var myPlane = {
	//属性ele: 我的飞机div节点
	ele: null,
	fireInterval: 80, //发射子弹的频率
	
	//方法:
	//初始化方法init:
	init: function() {
		this.ele = document.createElement("div");
		this.ele.className = "myplane"; 
		gameEngine.ele.appendChild(this.ele); //添加到游戏界面main上
		//位置
		var left = (gameEngine.ele.offsetWidth - this.ele.offsetWidth) / 2; 
		this.ele.style.left = left + "px"; 
		this.ele.style.bottom = 0;
		
		//现在可以开始拖拽飞机了
		this.startDrag();
		
		return this;
	}, 
	
	//发射子弹
	fire: function(){
		//开启定时器, 创建并发射子弹
		this.timer = setInterval(function(){
			//创建子弹,并让子弹移动
			var bullet = new Bullet(); //创建子弹对象
			bullet.init().move(); //初始化并发射子弹
		}, this.fireInterval);
	},
	
	//可以拖拽
	startDrag: function() {
		//onmousedown
		this.ele.onmousedown = function(evt) {
			var oEvent = evt || event;
			var disX = oEvent.offsetX;
			var disY = oEvent.offsetY;
			
			//onmousemove
			document.onmousemove = function(evt) {
				var oEvent = evt || event;
				
				var x = oEvent.clientX - gameEngine.ele.offsetLeft - disX;
				var y = oEvent.clientY - disY;
				
				if (x < 0) { //如果超出左边界, 则最多在左边界的位置
					x = 0;
				}
				//如果超出右边界, 则最多显示在右边界的位置
				else if (x > gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth) {
					x = gameEngine.ele.offsetWidth - myPlane.ele.offsetWidth;
				}
				myPlane.ele.style.left = x + "px";
				myPlane.ele.style.top = y + "px";
			}
			//onmouseup
			document.onmouseup = function(){
				document.onmousemove = null;
				document.onmouseup = null;
			}
		}
	},
	
	//爆炸
	boom: function(callBack) {
		
		clearInterval(this.timer); //关闭定时器, 不发射子弹
		
		var dieImgs = ["images/me_die1.png", "images/me_die2.png", "images/me_die3.png", "images/me_die4.png"]
		var index = 0;
		
		var dieTimer = setInterval(function(){
			
			if (index >= dieImgs.length) {
				clearInterval(dieTimer); //关闭定时器
				gameEngine.ele.removeChild(myPlane.ele); //移除我的飞机
				callBack(); //回调
			}
			else  {
				myPlane.ele.style.background = "url(" + dieImgs[index++] + ") no-repeat";
			}
		}, 50);
	}
	
}





