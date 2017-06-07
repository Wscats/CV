<?php
	// header("Content-type:text/html;charset=utf-8");


	// 百度下拉搜索
	$keyword = isset($_GET['key']) ? $_GET['key'] : '';
	$url = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=' . $keyword.'&json=1&cb=getJson';

	$res = file_get_contents($url);

	// 解决乱码问题
	$res = mb_convert_encoding( $res, 'UTF-8', 'UTF-8,GBK,GB2312,BIG5');

	$res = str_replace(array('getJson(',');'), '', $res);

	echo $res;
    
?>