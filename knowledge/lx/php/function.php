<?php
	// 全局变量
	$a = 100;

	// 参数默认值
	function add($x,$y=5){
		// 局部获取全局变量
	    $total = $x + $y + $GLOBALS['a'];


	    // 返回值
	    return $total;
	}

	echo add(10,10);
?>