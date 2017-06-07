<?php
	session_start();

	$action = isset($_GET['action']) ? $_GET['action'] : '';

	if($action == 'logout'){
		session_destroy();
		$res = 'logout';
	}else if($action == 'login'){
		$username = isset($_GET['username']) ? $_GET['username'] : '';
		$gender = isset($_GET['gender']) ? $_GET['gender'] : '';

		$_SESSION['last-access'] = time();
		$_SESSION['username'] = $username;
		$_SESSION['gender'] = $gender;

		$res = json_encode(array(
			'username'=>$username,
			'gender'=>$gender
		),JSON_UNESCAPED_UNICODE);
	}else{
		$lastAccess = isset($_SESSION['last-access']) ? $_SESSION['last-access'] : '';
		if($lastAccess && (time() - $lastAccess) > 300){
			session_destroy();
			$res = 'logout';
		}else{
			$res = json_encode(array(
				'username'=>$_SESSION['username'],
				'gender'=>$_SESSION['gender']
			),JSON_UNESCAPED_UNICODE);
		}
		
	}

	echo $res;
?>