<?php

	function getClientIP(){  
	    $host_name = exec("hostname");  
		$host_ip = gethostbyname($host_name); //获取本机的局域网IP  
		
		if(empty($host_ip)){
		    return "fail get host ip";
		}else{
		    return $host_ip;
		}
	}

	echo getClientIp();
?>