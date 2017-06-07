<?php
	include 'charset.php';
	include 'util.php';

	/*
		微博消息获取：
	    返回包含多条微博记录的json数据
	 */
	$file_url = './data/weibo.json';
	$myfile = fopen($file_url, 'r') or die("Unable to open file!");
	$content = fread($myfile, filesize($file_url));
	

	// 获取前端参数like&id
	$like = isset($_GET['type']) ? $_GET['type'] : '';
	$id = isset($_GET['id']) ?  $_GET['id'] : '';

	if($like == 'like'){
		$myfile = fopen($file_url, 'w');
		//$content = fread($myfile, filesize($file_url));
		//$content = file_get_contents($file_url);

		// 把读取到的内容转成数组
		$arr_data = json_decode($content);

		$res;

		foreach ($arr_data as $idx => $value) {
			if($value->id == $id){
				$arr_data[$idx]->likecnt++;
				$res = $arr_data[$idx];
			}
		}

		//重新写入文件
		fwrite($myfile, json_encode($arr_data,JSON_UNESCAPED_UNICODE));
		echo json_encode($res,JSON_UNESCAPED_UNICODE);
	}else{
		
		echo $content;
	}
	
	fclose($myfile);
?>