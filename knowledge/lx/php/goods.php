<?php

	// 获取传过来的guid
	$guid = $_GET['id'];


	// 当前商品数据
	$currentGoods;


	// 商品数据
	$goodslist = array();

	for($i=1;$i<=5;$i++){
		$goods = array(
			'guid'=>'g'.$i,
			'title'=>'苹果iphone'.$i,
			'price'=>998,
			'color'=>'白色',
			'imgurl'=>'img/g'.$i.'.jpg'
		);

		if($goods['guid'] == $guid){
			$currentGoods = $goods;
		}

		// 网数组添加商品
		$goodslist[$i-1] = $goods;
	}


?>
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>商品列表</title>
</head>
<body>
	<div class="goods">
		<h1><?php

		 echo $currentGoods['title']; 

		 ?></h1>
		<div class="bigImg">
			<img src="<?= $currentGoods['imgurl']; ?>">
		</div>
		<p>价格：<?= $currentGoods['price']; ?></p>
		<p>颜色：<?= $currentGoods['color']; ?></p>
	</div>
</body>
</html>