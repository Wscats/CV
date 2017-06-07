<?php
	session_start();

	$action = isset($_GET['action']) ? $_GET['action'] : '';
	$username = isset($_GET['username']) ? $_GET['username'] : '';
	$gender = isset($_GET['gender']) ? $_GET['gender'] : '';

	if($action == 'login'){
		$_SESSION['username'] = $username;
		$_SESSION['gender'] = $gender;
		$_SESSION['logintime'] = time();

		echo "login";
	}else if($action == 'logout'){
		session_destroy();
		echo 'logout';
	}else{

		$username = isset($_SESSION['username']) ? $_SESSION['username'] : '';
		$gender = isset($_SESSION['gender']) ? $_SESSION['gender'] : '';

		if($username && $gender){
			// 从session中获取登录信息
			$res = array(
				'username'=>$_SESSION['username'],
				'gender'=>$_SESSION['gender']
			);

			echo json_encode($res,JSON_UNESCAPED_UNICODE);
		}else{
			echo '';
		}
	}

?>