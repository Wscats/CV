<?php
	$callback = $_GET['callback'];

	//获取服务器数据
	$data = '{"name":"laoxie","age":18,"gender":"男"}';

	// 
	echo $callback.'('.$data.')';//getData({"name":"laoxie","age":18,"gender":"男"})

?>