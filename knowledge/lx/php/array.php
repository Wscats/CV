<?php
	// js: arr = [1,2,3]
	
	// 创建数组
	$arr = array('广州','深圳','上海','北京');

	// 获取数组的长度
	// count()
	$len = count($arr);

	// 遍历
	for($i=0;$i<$len;$i++){
		echo $arr[$i] . '<br>';
	}


	// foreach
	foreach($arr as $idx=>$item){
		echo $idx . '=>' . $item . '<br>';
	}



	// 关联数组
	// 类似js中的对象
	// $arr2 = array('广州','深圳');//$arr[0]
	$arr2 = array('city'=>'广州','province'=>'广东');//$arr['city']
	echo $arr2['province'] . '<br>';

	// 关联数组的遍历
	foreach($arr2 as $key=>$val){
		echo $key . "=>" . $val . '<br>';
	}


	// 数组排序
	// * sort()
	// * json_encode():把数组转成json字符串
	$arr_num = array(4,6,7,10,22,19,12,3);
	$res = sort($arr_num);

	echo json_encode($arr_num);
?>