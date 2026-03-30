'use strict';



/*
 * 碰撞检测
 */
function isCrash(obj1, obj2){
	if(obj1 && obj2){
		const leftSide = obj2.offsetLeft-obj1.offsetWidth/2;
		const rightSide = obj2.offsetLeft+obj2.offsetWidth+obj1.offsetWidth/2;
		const upSide = obj2.offsetTop - obj1.offsetHeight/2;
		const downSide = obj2.offsetTop + obj2.offsetHeight + obj1.offsetHeight/2;
		const x = obj1.offsetLeft+obj1.offsetWidth/2;
		const y = obj1.offsetTop + obj1.offsetHeight/2;
		if(x > leftSide && x < rightSide && y > upSide && y < downSide){
			return true;
		} 
	}
	return false;
}

















