<?php
	// 声明一个类
	class Person{
		var $name;
		var $age;

		// 私有属性
		private $hobby = '喝酒';

		//一个类中的构造函数
		function __construct($name,$age=50,$gender='男'){
			// echo "构造函数<br>";
			$this->name = $name;
			$this->age = $age;
			$this->gender = $gender;
		}


		// 对象方法
		// 默认是公有方法
		function pk(){
			echo '我是' . $this->name .'，我会pk<br>';

			echo 'PK完后...';

			$this->drink();

		}

		// 私有方法的创建
		private function drink(){
			echo '我是' . $this->name .'，我会喝酒<br>';
		}


		// 静态方法
		static function eat(){
			echo '我是古人，我很能吃<br>';
		}


		function __destruct(){
			echo "结束<br>";
		}

	}

	$p1 = new Person('刘备');
	$p2 = new Person('曹操');

	$p1->pk();
	// $p1->hobby;

	// 对象属性的访问
	// ->

	// echo $p1->name,$p2->name;

	// 静态方法的调用 
	// 直接通过类调用,调用静态属性/方法用符号"::"
	Person::eat();



	// 类的继承
	class Student extends Person{
		function pk(){
			echo "我是学生，我很纯洁，不PK";
		}
	}

	$s1 = new Student('xxx');
	$s1->pk();
?>

<script>
	//构造函数
	function Person(name,age,gender){
		this.name = name;
		this.age = age;
		this.gender = gender;

		// 
	}


	Person.get = function(){

	}



	Person.prototype.pk = function(){

	}
	Person.prototype.drink = function(){
		
	}

	// 静态方法
	Person.get()

	var p1 = new Person('曹操',50,'男');
	var p2 = new Person('刘备',50,'男');

	// 对象属性的访问
	console.log(p1.name);
</script>