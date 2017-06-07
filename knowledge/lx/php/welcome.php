<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>欢迎界面</title>
	<style>
		h1{color:#f00;}
		p{color:#0c0;}
		p strong{color:#f60;}
	</style>
	<script>
		document.addEventListener('DOMContentLoaded',()=>{
			var btnBack = document.querySelector('#btnBack');

			btnBack.onclick = ()=>{
				// window.location.reload();
				window.history.back();
				// history.go(-1)
			}
		});
	</script>
</head>
<body>
	<?php
	// $username  = $_GET['username'];
	// $password  = $_GET['password'];
	// $username  = $_POST['username'];
	// $password  = $_POST['password'];
	$username  = $_REQUEST['username'];
	$password  = $_REQUEST['password'];

	if($username && $password == '1230'){
		echo "<p>你好 <strong>".$username . '</strong>，欢迎登录国家安全系统</p>';
	}else{
		echo "<h1>开什么玩笑，国家安全系统你也想登录？</h1><button id=\"btnBack\">回去吧</button>";
	}
?>
</body>
</html>
