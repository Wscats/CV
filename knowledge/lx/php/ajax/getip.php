<?php
    $host_name = exec("hostname"); //获取主机名
	$host_ip = gethostbyname($host_name); //获取本机的局域网IP  
	
	if(empty($host_ip)){
	    echo "fail get host ip";
	}else{
	    echo $host_ip;
	}
?>