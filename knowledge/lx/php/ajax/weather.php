<?php
	// header("Content-type:text/html;charset=utf-8");

	$url = 'http://www.weather.com.cn/data/sk/101010100.html';

	//初始化 cURL会话
	$ch = curl_init(); 

	// 设置需要的选项
	curl_setopt($ch, CURLOPT_URL, $url); 

	//执行会话
	//获取数据
	$contents = curl_exec($ch); 

	// 解决乱码问题
	$contents = mb_convert_encoding( $contents, 'UTF-8', 'UTF-8,GBK,GB2312,BIG5');

	//关闭会话
	curl_close($ch);

	//输出内容
	echo $contents; 

?>