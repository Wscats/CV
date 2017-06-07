

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






