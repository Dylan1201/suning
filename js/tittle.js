 var oul=document.getElementById("ul");
    myajax.get("http://h6.duchengjiu.top/shop/api_cat.php",{},
		 function(err,responseText){
			var json=JSON.parse(responseText);
			var data=json.data;
			for (var i=0;i<data.length;i++) {
				var obj=data[i];
				oul.innerHTML +=
				`
				<li id="a" class="nav_1_left">
				<a href="web/list.html?cat_id=${obj.cat_id}">${obj.cat_name}</a>
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
		  
		  
		  
    
