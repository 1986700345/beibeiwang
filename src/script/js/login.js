;(function(){
	var tel=document.querySelector('.telphone');
	var pass=document.querySelector('.password');
	var btn=document.querySelector('.login-btn');
	btn.onclick=function(){
		ajax({
					type:'post',
					url:'../php/login.php',
					data:{
						telephone:tel.value,
						password:pass.value
					},
					success:function(data){
						if(!data){
							alert('登陆失败');
							pass.value='';
						}else{
							location.href='index.html';
							addcookie('telephone',tel.value);
						}
					}
				});
	}
})();
