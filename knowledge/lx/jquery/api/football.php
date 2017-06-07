<?php
	include 'charset.php';
	include 'util.php';

	/*
		分页获取数据：
	    * pageNo=1    
	    该地址请求多条微博信息，分页获取，pageNo指定获取第几页的数据

	    json_encode():把数组转成json字符串
	    * php5.4+ 使用JSON_UNESCAPED_UNICODE防止中文转义
	 */
	$page_no = isset($_GET['pageNo']) ? $_GET['pageNo'] : 1;
	$qty = isset($_GET['qty']) ? $_GET['qty'] : 10;
	$file_url = './data/football.json';

	// 打开文件
	$myfile = fopen($file_url, 'r');

	// 读取打开的文件
	$content = fread($myfile, filesize($file_url));

	// 把读取到的内容转成数组
	$arr_data = json_decode($content);

	// 根据分页截取数据
	$res = array(
		'data'=>array_slice($arr_data, ($page_no-1)*$qty,$qty),
		'total'=>count($arr_data)
	);

	// 输出json字符串
	echo Util::json_encode($res);

	fclose($myfile);
?>