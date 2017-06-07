<?php
	
	$username = $_POST['username'];

	$users = array('张三','老王','奥尼玛','王巴马');
	
	if(in_array($username,$users)){
		echo 'no';
	}else{
		echo "yes";
	}

?>