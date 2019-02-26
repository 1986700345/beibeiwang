$(function(){
			var $btnbox=$(".btn-box");
			var $box=$(".btn-cat")
			var $btns=$('.bt-cate li');
			var $contents=$('.bn-con');
			$btnbox.hover(function(){
				$box.removeClass("hide").addClass("show");
			},function(){
				$box.removeClass("show").addClass("hide");
			});
			$box.hover(function(){
				$(this).removeClass("hide").addClass("show");
			},function(){
				$(this).removeClass("show").addClass("hide");
			});
			$btns.on('mouseover',function(){
				$(this).addClass('current').siblings('li').removeClass('current');//链式操作的核心是最开始的元素对象
				$contents.eq($(this).index()).removeClass("hide").addClass('show').siblings('div').removeClass('show').addClass("hide");
			});
		});
