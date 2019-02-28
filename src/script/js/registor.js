;
(function() {
	var aInput = document.querySelectorAll('input');
	var notice = document.querySelectorAll('.notice');
	var oForm = document.querySelector('form');
	var telflag = true;
	var passwordflag = true;
	//手机号码验证
	aInput[0].focus();
	aInput[0].onfocus = function() {
		if(this.value == '') {
			notice[0].innerHTML = '请输入正确的手机号码';
			notice[0].style.color = '#ccc'
		}
	};
	aInput[0].onblur = function() {
		if(this.value != '') { //填写内容
			var tel = /^1[3578]\d{9}$/; //正则表达式
			if(tel.test(this.value)) { //通过
				notice[0].innerHTML = '√';
				notice[0].style.color = '#00ff00';
				telflag = true;
			} else { //不通过
				notice[0].innerHTML = '手机号码格式错误';
				telflag = false;
			}

		} else { //为空
			notice[0].innerHTML = '手机号码不能为空';
			notice[0].style.color = '#ff0000';
			telflag = false;
		}
		ajax({
					type:'post',
					url:'../php/register.php',
					data:{
						telephone:aInput[0].value,
						password:aInput[1].value
					},
					success:function(data){//后端返回的值
						if(!data){
							notice[0].innerHTML='√';
							notice[0].style.color='green';
							telflag=true;
						}else{
							notice[0].innerHTML='该手机号码已被占用';
							notice[0].style.color='red';
							telflag=false;
						}
					}
				});
		
	}
	//密码验证
	aInput[1].onfocus = function() {
		if(this.value == '') {
			notice[1].innerHTML = '请输入6-16位由数字字母及其他字符组成密码';
			notice[1].style.color = '#ccc'
		}
	};
	aInput[1].onblur = function() {
		if(this.value != '') {
			if(passwordflag) {
				notice[1].innerHTML = '√';
				notice[1].style.color = '#00ff00';
				passwordflag = true;
			} else {
				notice[1].innerHTML = '密码太简单了';
				notice[1].style.color = '#ff0000';
				passwordflag = false;
			}
		} else {
			notice[1].innerHTML = '密码不能为空';
			notice[1].style.color = '#ff0000';
			passwordflag = false;
		}
	}

	aInput[1].oninput = function() { //改变即触发
		var regnum = /\d+/; //数字
		var reglowercase = /[a-z]+/; //小写
		var reguppercase = /[A-Z]+/; //大写
		var other = /[^0-9a-zA-Z]+/; //其他字符
		var num = 0;
		if(this.value.length >= 6 && this.value.length <= 16) {
			if(regnum.test(this.value)) {
				num++;
			}
			if(reglowercase.test(this.value)) {
				num++;
			}
			if(reguppercase.test(this.value)) {
				num++;
			}
			if(other.test(this.value)) {
				num++;
			}
			switch(num) {
				case 1:
					notice[1].innerHTML = '弱';
					notice[1].style.color = '#FF0000';
					passwordflag = false;
					break;
				case 2:
				case 3:
					notice[1].innerHTML = '中';
					notice[1].style.color = 'orange';
					passwordflag = true;
					break;
				case 4:
					notice[1].innerHTML = '强';
					notice[1].style.color = 'green';
					passwordflag = true;
					break;
			}
		} else {
			notice[1].innerHTML = '密码长度在6-16个字符之间';
			notice[1].style.color = '#ff0000';
			passwordflag = false;
		}
	}
	//表单提交事件
	oForm.onsubmit = function() {
		
		if(aInput[0].value == '') {
			notice[0].innerHTML = '手机号码不能为空';
			telflag = false;
		}
		if(aInput[1].value == '') {
			notice[1].innerHTML = '密码不能为空';
			passwordflag = false;
		}
		if(!telflag || !passwordflag) {
			return false;
		}
	}

	
})();