<?php

	$url = 'http://news.baidu.com/';

	$content = file_get_contents($url);

	echo $content;
?>