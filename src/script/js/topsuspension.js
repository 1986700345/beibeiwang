$(window).on("scroll",function(){
				$top=$(this).scrollTop();
				if($top>=120){
					$(".subnav").addClass("fixed");
					$(".subnav-logo").css("display","block");
					$(".oversea").css("display","block");
					$(".tuan").css("display","block");
					$(".tomorrow").css("display","none")
				}else{
					$(".subnav").removeClass("fixed");
					$(".subnav-logo").css("display","none");
					$(".oversea").css("display","none");
					$(".tuan").css("display","none");
					$(".tomorrow").css("display","block");
				}
			});