var picsid=location.search.substring(1).split('=')[1];
var oBox=document.querySelector('.box');
ajax({
	url:'http://10.31.162.36/1810/Day%2024/detail/php/details.php',
	data:{
		sid:picsid
	},
	success:function(data){
		//console.log(JSON.parse(data));
		var dataobj=JSON.parse(data);
		oBox.innerHTML=`
			<div class="box_left"><img src="${dataobj.url}" alt="" sid="${dataobj.sid}" /></div>
			<div class="box_right">
				<h3>${dataobj.title}</h3>
				<span>¥${dataobj.price}</span>
				<button>加入购物车</button>
			</div>
		`;
	}
});