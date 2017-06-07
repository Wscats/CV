<?php
	$url = isset($_GET['url']) ? $_GET['url'] : '';
	//$reg = isset($_GET['reg']) ? $_GET['reg'] : '';

	$content = file_get_contents($url);
	//echo $reg;
	

	preg_match_all('|<a[^>]*href="([^"]+?)"[^>]*>(.+?)</a>|',$content,$res);

	echo json_encode($res,JSON_UNESCAPED_UNICODE);

?>