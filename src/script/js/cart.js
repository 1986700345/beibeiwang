!function(){
	//渲染商品列表，传入两个参数，id和数量
	function goodslist(id,count){
		$.ajax({
			url:"../php/data.php",
			dataType:'json'
		}).done(function(data){
			$.each(data, function(index,value) {
				if(id==value.sid){//遍历判断sid和传入的sid是否相同，方便将那条数据设置到渲染的商品列表中。
					var $clonebox=$('.view-cartlist:hidden').clone(true,true);
					$clonebox.find('.image').find('img').attr('src',value.url);
					$clonebox.find('.image').find('img').attr('sid',value.sid);
					$clonebox.find('.title').html(value.title);
					$clonebox.find('.b-price').html(value.price);
					$clonebox.find('.count span').html(value.price);
					$clonebox.find('.oldprice').html(value.oldprice);
					$clonebox.find('.quantity-form2').find('input').val(count);
					//计算每个商品的价格
					$clonebox.find('.b-sum').html((value.price*count).toFixed(2));
					$clonebox.css('display','block');
					$('.cartbox').append($clonebox);
					priceall();//计算总价
				}
			});
		});
	}
	//获取cookie，执行渲染列表的函数
	if(getcookie('cookiesid') && getcookie('cookienum')){
		var s=getcookie('cookiesid').split(',');//数组sid
		var n=getcookie('cookienum').split(',');//数组num
		$.each(s,function(i,value){
			goodslist(s[i],n[i]);
		});
	}
	//如果购物车为空，显示cart-empty盒子
	kong();
	function kong(){
		if(getcookie('cookiesid') && getcookie('cookienum')){
			$('.cart-list').show();//cookie存在，购物车有商品，隐藏盒子。
			$('.cart-empty').hide()
		}else{
			$('.cart-empty').show();
			$(".cart-list").hide();
		}
	}
	//计算总价和总的商品件数，必须是选中的商品。
	function priceall(){
		var $sum=0;
		var $count=0;
		$('.view-cartlist:visible').each(function(index,element){
			if($(element).find('.cart-checkbox input').prop('checked')){
				$sum+=parseInt($(element).find('.quantity-form2').find('input').val());
				$count+=parseFloat($(element).find('.b-sum').html());
			}
		});
		$('.count-num').find('span').html($sum);
		$('.count-pay').html('￥'+$count.toFixed(2));
	}
	//全选操作
	$('#quanxuan').on('change',function(){
		$('.view-cartlist:visible').find(':checkbox').prop('checked',$(this).prop('checked'));
		$('#quanxuan').prop('checked',$(this).prop('checked'));
		priceall();//取消选项，重算总和。
	});
	var $inputs=$('.view-cartlist:visible').find(':checkbox');
	$('.cart-list').on('change',$inputs,function(){//事件的委托的this指向被委托的元素
		if($('.view-cartlist:visible').find('input:checkbox').length==$('.view-cartlist:visible').find('input:checked').size()){
			$('#quanxuan').prop('checked',true);
		}else{
			$('#quanxuan').prop('checked',false);
		}
		priceall();//取消选项，重算总和。
	});
	//数量的改变
    //改变商品数量++
    $('.add-num').on('click',function(){
    	var $count=$(this).parents('.view-cartlist').find('.quantity-form2 input').val();
    	$count++;
    	if($count>=10){
    		$count=10;
    	}
    	$(this).parents('.view-cartlist').find('.quantity-form2 input').val($count);
    	$(this).parents('.view-cartlist').find('.b-sum').html(singlegoodsprice($(this)));//改变后的价格
    	$(this).parents('.view-cartlist').find('.count span').html(singlegoodsprice($(this)));
    	priceall();
    	setcookie($(this));
    });
    //改变数量--
    $('.del-num').on('click',function(){
    	var $count=$(this).parents('.view-cartlist').find('.quantity-form2 input').val();
    	$count--;
    	if($count<=1){
    		$count=1;
    	}
    	$(this).parents('.view-cartlist').find('.quantity-form2 input').val($count);
    	$(this).parents('.view-cartlist').find('.b-sum').html(singlegoodsprice($(this)));//改变后的价格
    	$(this).parents('.view-cartlist').find('.count span').html(singlegoodsprice($(this)));
    	priceall();
    	setcookie($(this));
    });
    //直接改变数量
    $('.quantity-form2 input').on('input',function(){
    	var $reg=/^\d+$/g;//只输入数字
    	var $value=parseInt($(this).val());
    	if($reg.test($value)){
    		if($value>=10){
    			$(this).val(10);
    		}else if($value<=0){
    			$(this).val(1);
    		}else{
    			$(this).val($value);
    		}
    	}else{
    		$(this).val(1);
    	}
    	$(this).parents('.view-cartlist').find('.b-sum').html(singlegoodsprice($(this)));
    	$(this).parents('.view-cartlist').find('.count span').html(singlegoodsprice($(this)));
    	priceall();
    	setcookie($(this));
    });
    //计算数量改变后的价格
    function singlegoodsprice(obj) { //obj:当前元素
    	var $dj=parseFloat(obj.parents('.view-cartlist').find('.b-price').html());
    	var $cnum=parseInt(obj.parents('.view-cartlist').find('.quantity-form2 input').val())
    	return ($dj*$cnum).toFixed(2);
    }
    //将改变后的数量存放到cookie
    var arrsid=[];//商品的id
    var arrnum=[];//商品的数量
    //提前获取cookie里面的id和num
    function cookietoarray(){
		if(getcookie('cookiesid') && getcookie('cookienum')){
			arrsid=getcookie('cookiesid').split(',');//cookie商品的sid  
			arrnum=getcookie('cookienum').split(',');//cookie商品的num
		}
	}
    function setcookie(obj){
    	cookietoarray();//得到数组
    	var $index=obj.parents('.view-cartlist').find('img').attr('sid');
    	arrnum[$.inArray($index,arrsid)]=obj.parents('.view-cartlist').find('.quantity-form2 input').val();
    	addcookie('cookienum',arrnum.toString(),7);
    }
    //删除操作
    //删除cookie
    function delgoodslist(sid,arrsid){//sid：当前删除的sid，arrsid:cookie的sid的值
    	var $index=-1;
    	$.each(arrsid, function(index,value) {//删除的sid对应的索引位置。 index:数组项的索引
    		if(sid==value){
    			$index=index;//如果传入的值和数组的值相同，返回值对应的索引。
    		}
    	});
    	arrsid.splice($index, 1);//删除数组对应的值
	    arrnum.splice($index, 1);//删除数组对应的值
	    addcookie('cookiesid', arrsid.toString(), 7);//添加cookie
	    addcookie('cookienum', arrnum.toString(), 7);//添加cookie
	    
    }
    //删除单个商品的函数（委托）
    $('.cart-list').on('click','.del',function(ev){
    	cookietoarray();//得到数组,上面的删除cookie需要。
    	 if(confirm('你确定要删除吗？')){
	     	$(this).first().parents('.view-cartlist').remove();//通过当前点击的元素找到整个一行列表，删除
	    }
	    delgoodslist($(this).first().parents('.view-cartlist').find('img').attr('sid'), arrsid);
	    priceall();
    });
    //删除全部商品的函数
    $('.del-shop a').on('click',function(){
    	cookietoarray();//得到数组,上面的删除cookie需要。
		if(confirm('你确定要全部删除吗？')){
		    $('.view-cartlist:visible').each(function() {
		        if ($(this).find('input:checkbox').is(':checked')) {//复选框一定是选中的
		            $(this).remove();
		            delgoodslist($(this).find('img').attr('sid'), arrsid);
		        }
		        
		    });
		    priceall();
		    $('.cart-empty').show();
			$(".cart-list").hide();
		}
    });
}();
