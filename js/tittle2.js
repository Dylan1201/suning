var oul=document.getElementById("ul");
    myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},
		 function(err,responseText){
			var json=JSON.parse(responseText);
			var data=json.data;
			for (var i=0;i<data.length;i++) {
				var obj=data[i];
				oul.innerHTML+=
				`
				<li id="a" class="nav_1_left">
				<a href="car.html?cat_id=${obj.cat_id}">${obj.cat_name}</a>
				</li>
				`
			}
		  })


           function getQueryString(name){
			var search=location.search.substr(1);
			var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)");
			var result=search.match(reg);
			return result===null? null:decodeURIComponent(result[2]);
			
		   }
		  var cat_id=getQueryString("cat_id");
		  
		  
		  
     var oUL=document.querySelector("#hot-goods");
	
		
		myajax.get("http://h6.duchengjiu.top/shop/api_goods.php",{cat_id,},
		function(err,responseText){
			var json=JSON.parse(responseText);
			var data=json.data;
			for (var i=0;i<data.length;i++) {
				var obj=data[i];
				oUL.innerHTML+=
				`
				<li id="commodity">
				<div><img src="${obj.goods_thumb}"></div>
				<div>${obj.goods_name}</div>
				<div id="price">${obj.price}</div>
				<div>${obj.cat_name}</div>
				<div><input type="button" id="add-to-cart" value="添加到购物车"></div>
				</li>
				`
			}
		})