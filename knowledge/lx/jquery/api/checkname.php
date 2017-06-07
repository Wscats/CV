<?php
	include 'charset.php';

	/*
		判断用户名是否已被注册
	    该地址用于验证所提交的用户名是否存在，如果存在，返回字符串fasle，不存在返回true)
	    已经存在的名字：'张三','李四','王尼玛','奥巴马'
	 */
	$regname = $_GET['regname'];

	$already = array(
		'张三',
		'李四',
		'王尼玛',
		'奥巴马'
	);

	if(in_array($username,$already)){
		echo 'no';
	}else{
		echo "yes";
	}
?>