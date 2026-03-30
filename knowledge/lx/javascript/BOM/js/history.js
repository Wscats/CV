'use strict';

window.onload = function(){
	const btnBack = document.getElementById('btnBack');
	const btnForward = document.getElementById('btnForward');

	// 点击后退
	btnBack.onclick = function(){
		history.back();
	}

	// 点击前进
	btnForward.onclick = function(){
		history.forward();
	}
}