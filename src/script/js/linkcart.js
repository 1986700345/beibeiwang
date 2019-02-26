$(function(){
	var $cartbox=$(".cart-box");
	var $link=$(".top-cart");
	$link.hover(function(){
		$cartbox.css("display","block");
	},function(){
		$cartbox.css("display","none");
	});
	$cartbox.hover(function(){
		$(this).css("display","block");
	},function(){
		$(this).css("display","none");
	});
});
