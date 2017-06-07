<?php
	

	$type = $_GET['type'];

	$fileurl = './data/chat.json';

	// 获取数据
	if($type=='query'){
		$file = fopen($fileurl, 'r');
		$content = fread($file, filesize($fileurl));
		fclose($file);

		echo $content;
	}else if($type=='send'){
		$msg = $_GET['msg'];
		$sender = $_GET['sender'];
		$gender = $_GET['gender'];

		// $ip = file_get_contents('getip.php');
		ob_start();  
		require_once('getip.php');  
		$ip = ob_get_contents();  
		ob_end_clean();    

		// 创建一个关联数组
		$item = array(
			'name'=>$sender,
			'gender'=>$gender,
			'content'=>$msg,
			'ipfrom'=>$ip,
			'createtime'=>time()
		);

		// 读取文件内容
		$file = fopen($fileurl, 'r');
		$content = fread($file, filesize($fileurl));

		$arr = json_decode($content,true);

		// 追加内容
		array_unshift($arr,$item);


		// 从新写入内容
		$file = fopen($fileurl, 'w');
		fwrite($file, json_encode($arr,JSON_UNESCAPED_UNICODE));

		echo json_encode($item,JSON_UNESCAPED_UNICODE);

		
		fclose($file);
	}
?>