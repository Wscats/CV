<?php
	$callback = $_GET['callback'];


	// 生成数据
	$goodslist = array();

	for($i=1;$i<=5;$i++){
		$goods = array(
			'guid'=>'goods'.$i,
			'title'=>'万年美少女00'.$i,
			'imgurl'=>'img/g'.$i.'.jpg',
			'price'=>998
		);
		$goodslist[$i-1] = $goods;
	}

	echo $callback . '(' . json_encode($goodslist,JSON_UNESCAPED_UNICODE) . ')';
	
?>