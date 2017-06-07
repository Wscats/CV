

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





