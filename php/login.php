<?php
	//引入数据库连接
	require "regconn.php";
	//1.获取前端传入的手机号码和密码
	if(isset($_POST['telephone']) && isset($_POST['password'])){
		$tel=$_POST['telephone'];
		$pass=$_POST['password'];
		
		$result=mysql_query("select * from user where telephone='$tel' and password='$pass' ");
		if(mysql_fetch_array($result)){
			echo true;//登陆成功
		}else{
			echo false;//登陆失败
		}
	}
?>