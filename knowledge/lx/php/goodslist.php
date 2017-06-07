<?php

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
	<div class="goodslist">
		<ul>
			<?php

				// 遍历商品，生成li
				foreach($goodslist as $goods){
					// echo json_encode($goods,JSON_UNESCAPED_UNICODE);
					echo '<li><a href="goods.php?id='.$goods['guid'].'"><img src="'.$goods['imgurl'].'"></a><h4>'.$goods['title'].'</h4><p>颜色：'.$goods['color'].'</p><p>价格：'.$goods['price'].'</p></li>';
				}
			?>
		</ul>
	</div>
</body>
</html>