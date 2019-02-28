<?php
	//引入数据库连接
	require "regconn.php";
	//二.后端获取手机号码和数据库进行匹配 --sql语句
	if(isset($_POST['telephone'])){
		$telphone=$_POST['telephone'];
		$result=mysql_query("select * from user where telephone=$telphone");//如果存在，返回结果。
		//如果$result存在值，tel已经存在
		if(mysql_fetch_array($result)){//存在
			echo true;
		}else{//不存在
			echo false;
		}
	}
	
	
	
	//一.确认点击的是提交按钮
	if(isset($_POST['submit'])){
		//1.接收前端表单提交过来的数据,加入数据库。
		$tel=$_POST['telephone'];
		$pass=$_POST['password'];
		//2.将数据通过insert语句插入数据库中
		$query="insert user values('$tel','$pass')";
		mysql_query($query);
		header('location:http://10.31.162.36/beibeiwang/src/login.html');
	}
	

?>