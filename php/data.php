<?php
	require "conn.php";
	//3.执行sql语句，产生结果
	$query="select * from shoplist";
	$result=mysql_query($query);
	
	$datapic=array();//新建一个数组
	for($i=0;$i<mysql_num_rows($result);$i++){
		$datapic[$i]=mysql_fetch_array($result,MYSQL_ASSOC);
	}
	
	echo json_encode($datapic,true);
?>