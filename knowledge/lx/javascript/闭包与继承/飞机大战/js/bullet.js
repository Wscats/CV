


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









