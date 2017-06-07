<?php
	//CORS获取跨域数据的原理
	header('Access-Control-Allow-Origin:*');

	$res = array(
		'type'=>'CORS',
		'description'=>'我是远程数据，我为CORS代言'
	);
	echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>