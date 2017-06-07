<?php
	include 'connect.php';

	$page = 1;

	// 查询数据
	$sql = 'select * from user order by age desc limit '. ($page-1)*2 .',2';

	//查询前设置编码，放置输出乱码
	$result = $conn->query('set names utf8');

	// 查询数据库获取数据
	$result = $conn->query($sql);



	//使用查询结果集
	$row = $result->fetch_all(MYSQLI_ASSOC);


	echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>