<?php
	// 实现CORS请求
	header('Access-Control-Allow-Origin:*');


	$res = array(
		'type'=>'CORS',
		'description'=>'我是远程数据，我为CORS代言。。'
	);

	echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>