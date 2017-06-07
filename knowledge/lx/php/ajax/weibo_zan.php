<?php
	
	// 修改点赞的数量
	// 1.打开文件并获取文件内容
	// 2.把内容转换成数组
	// 3.修改对应id的点赞数量
	// 4.重写文件内容

	$id = $_GET['id'];

	$url = '../data/weibo.json';

	// 1.打开文件
	$file = fopen($url,'r');

	//读取文件内容
	$content = fread($file, filesize($url));

	// 2.把内容转换成数组
	$arr = json_decode($content);
	$res;
	for($i=0;$i<count($arr);$i++){
		if($arr[$i]->id == $id){
			$arr[$i]->likecnt++;
			$res = $arr[$i];
		}
	}

	echo json_encode($res,JSON_UNESCAPED_UNICODE);


	// 4.重写文件内容
	$file = fopen($url, 'w');
	fwrite($file, json_encode($arr,JSON_UNESCAPED_UNICODE));



	// 关闭文件，避免资源浪费
	fclose($file);


	// echo $content;
?>