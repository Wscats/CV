<?php
	$content = file_get_contents('http://ip.taobao.com/service/getIpInfo.php?ip=58.248.240.46');

	echo $content;

?>