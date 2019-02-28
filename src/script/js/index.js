!function(){
	if(getcookie('telephone',)){
		
	}
	var $oUl=$('.content_main ul');
	$.ajax({
		url:"../php/data.php",
		dataType:"json"
	}).done(function(data){
		var $htmlstr='';
		$.each(data,function(index,value){
			$htmlstr+=`
			<li>
							<a href="http://10.31.162.36/beibeiwang/src/details.html?sid=${value.sid}" target="_blank" class="shopsale">
								<div class="items-detail">
									<img class="mark" src="img/6766c06058f86ced_174x174.png" />
									<div class="hot-product">
										<span>今日已抢</span>
										<span class="num-style">2</span>
										<span class="num-style">0</span>
										<span class="num-style">1</span>
										<span class="num-style">4</span>
										<span>件</span>
									</div>
									<img src="${value.url}" sid="${value.sid}" />
									<p class="introduction">${value.title}</p>
									<div class="price—info">
										<p class="cur-price">
											<span class="integer">￥${value.price}</span>
										</p>
										<p class="old-price"><del>￥${value.oldprice}</del></p>
										<p class="discount">${value.discount}</p>
									</div>
								</div>
							</a>
						</li>
							`;
		});
		$oUl.html($htmlstr);
	});
}();

