<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>php输出</title>
</head>
<body>
	<?php
		//输出语句：echo print
		echo "<h2>输出</h2>";
		echo '<h4>hello php</h4>','hello 1612<br>';
		// print 'print输出';


		// 语法
		// 变量
		echo "<br><br><h2>变量</h2>";
		$num = 10;
		$x = 'h5_1612';

		echo $num + 20 . '<br>';

		//全局变量与局部变量
		function sum(){
			//在函数内部不能直接访问全局变量
			//* 通过$GLOBALS数组访问
			//* 通过global关键字
			$num = 20;
			echo '<br>局部变量：' . $num;
			echo '<br>全局变量：' . $GLOBALS['num'],'<br>';

			global $x;
			echo $x , '<br><br>';

		}
		sum();


		// 在php中的字符串拼接用(并置)：.


		// static
		function myTest(){
		    static $x=0;
		    // $x = 0;
		    echo $x , '<br><br>';
		    $x++;
		}

		myTest();
		myTest();
		myTest();


		//常量
		define('NAME','laoxie');
		echo NAME , '<br>';

		// 三元运算符简写
		$num = $num ?: 10;


		// 数据类型
		// Number(整数，小数),String,Boolean
		// Array,Object,Symbol()

		// $str = '你是我的小呀小苹果';
		$str = 'you are my little ya little apple';

		// 获取字符串的长度
		// strlen()
		echo strlen($str), '<br>';
 
	?>
</body>
</html>
