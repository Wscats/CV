<?php

	/*
		分页获取数据：
	    * pageNo=1    
	    该地址请求多条微博信息，分页获取，pageNo指定获取第几页的数据

	    json_encode():把数组转成json字符串
	    * php5.4+ 使用JSON_UNESCAPED_UNICODE防止中文转义
	 */
	// 判断分页参数是否传递到后端，如果没有，默认为第一页
	$page_no = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	$file_url = '../data/football.json';

	// 打开文件
	$myfile = fopen($file_url, 'r');

	// 读取打开的文件
	$content = fread($myfile, filesize($file_url));

	// 把读取到的内容转成数组
	$arr_data = json_decode($content);

	// 根据分页截取数据
	$arr_res = array_slice($arr_data, ($page_no-1)*10,10);

	// 输出json字符串
	echo json_encode($arr_res,JSON_UNESCAPED_UNICODE);

	fclose($myfile);
?>