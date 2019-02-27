!function(){
	//获取sid
	var picsid=location.search.substring(1).split('=')[1];
	//将当前的id传给后端获取对应数据
	$.ajax({
		url:"../php/details.php",
		data:{
			sid:picsid
		},
		dataType:'json'
	}).done(function(data){//data:后端返回的和id对应的数据
		$("#spic img").attr('src',data.url);
		$("#bf img").attr("src",data.url);
		$("#spic img").attr("sid",data.url);
		$(".font-style .title").html(data.title);
		$(".now-price .n-price span").html(data.price);
		$(".past-price del").html(data.oldprice);
		$(".discount-price strong").html(data.discount);
		$(".btn .price-wrap span").html(data.price);
		var arr=data.urls.split(",");
		var str='';
		$.each(arr, function(index,value) {
			str+='<li><img src="'+value+'"/></li>';
		});
		$("#list ul").html(str);
	});
	//放大镜效果
	!function(){
		$("#sf").width($('#spic').width()*$("#bf").width()/$("#bf img").width());
		$("#sf").height($('#spic').height()*$("#bf").height()/$("#bf img").height());
		var bili=$('#bf img').width()/$("#spic").width();
		$("#spic").hover(function(){
			$("#sf").css('visibility','visible');
			$("#bf").css("visibility","visible");
			$(this).on('mousemove',function(ev){
				var $left=ev.pageX-$("#spic").offset().left-$("#sf").width()/2;
				var $top=ev.pageY-$("#spic").offset().top-$("#sf").height()/2;
				if($left<0){
					$left=0;
				}else if($left>=$('#spic').width()-$('#sf').width()){
					$left=$('#spic').width()-$('#sf').width();
				}
				if($top<0){
					$top=0;
				}else if($top>=$('#spic').height()-$('#sf').height()){
					$top=$('#spic').height()-$('#sf').height();
				}
				$('#sf').css('left',$left);
				$('#sf').css('top',$top);
				$('#bf img').css('left',-$left*bili);
				$('#bf img').css('top',-$top*bili);
			});
		},function(){
			$('#sf').css('visibility','hidden');
			$('#bf').css('visibility','hidden');
		});
		//点击小图切换
		$('#list ul').on('click','li',function(){
			var $imgurl=$(this).find('img').attr('src');
			$("#spic img").attr('src',$imgurl);
			$('#bf img').attr('src',$imgurl);
		});
	}();
	//提前获取cookie里面id和num
   //点击按钮将商品的数量和id存放cookie中
   var arrsid=[];//商品的sid
   var arrnum=[];//商品的数量
   function cookietoarray(){
   	if(getcookie('cookiesid') && getcookie('cookienum')){
   		arrsid=getcookie('cookiesid').split(',');//cookie商品的sid
   		arrnum=getcookie('cookienum').split(',');//cookie商品的num
   	}
   }
   $('.view-left .btn').on('click',function(){//点击加入购物车
   		var $sid=picsid
   		cookietoarray();//获取已经存在的cookie值
   		if($.inArray($sid,arrsid)!=-1){//商品存在，数量叠加
   			//先取出cookie中的对应的数量值+当前添加的数量值，添加到对应的cookie中。
   			var num=parseInt(arrnum[$.inArray($sid,arrsid)])+parseInt($("#count").val());
   			arrnum[$.inArray($sid,arrsid)]=num;
   			addcookie('cookienum',arrnum.toString(),10);//数组存入cookie
   		}else{//不存在，第一次添加。将商品的id和数量存入数组，再存入cookie.
   			arrsid.push($sid);//将当前的id存入数组
   			addcookie('cookiesid',arrsid.toString(),10);//数组存入cookie
   			arrnum.push($('#count').val());
   			addcookie('cookienum',arrnum.toString(),10);//数组存入cookie
   		}
   });
}();
