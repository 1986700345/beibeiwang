
$(function(){
			var $btns=$(".hot-shop-content li");
			var $contents=$(".shop_list");
			$btns.on('mouseover',function(){
				$(this).addClass('active').siblings('li').removeClass('active');//链式操作的核心是最开始的元素对象
				$contents.eq($(this).index()).css("display","block").siblings('div').css("display","none");
			});
		});
