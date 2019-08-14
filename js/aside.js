var oBox = document.getElementsByClassName("box")
var oShopping_cart = document.getElementsByClassName("shopping_cart")[0]
var oShopping_cart_box = document.getElementsByClassName("shopping_cart_box")[0]
var oUsers = document.querySelector(".users")
var oUsers_box = document.querySelector(".users_box")
var oTable = document.querySelector('table');
var oSum = document.querySelector('#sum');
	oUsers.onclick = function(){
		if(oUsers_box.style.left === "-164px"){
				if (oUsers_box.isAnimated) return;
				animate(oUsers_box,{"left":0},500)
		}else{
				animate(oUsers_box,{"left":-164},500)
			}
		}
	oShopping_cart.onclick = function(){
		if(oShopping_cart_box.style.left === "-224px"){
				if (oShopping_cart_box.isAnimated) return;
				animate(oShopping_cart_box,{"left":0},500)
	}else{
				animate(oShopping_cart_box,{"left":-224},500)
			}
	}

	oBox[0].addEventListener("mouseenter",
		function(){
			if (oBox[1].isAnimated) return;
			animate(oBox[1],{"left":-45},500)
		},false)
	oBox[0].addEventListener("mouseleave",
		function(){
			animate(oBox[1],{"left":0},500)
		},false)
	oBox[2].addEventListener("mouseenter",
		function(){
			if (oBox[3].isAnimated) return;
			animate(oBox[3],{"left":-45},500)
		},false)
	oBox[2].addEventListener("mouseleave",
		function(){
			animate(oBox[3],{"left":0},500)
		},false)
	oBox[4].addEventListener("mouseenter",
		function(){
			if (oBox[5].isAnimated) return;
			animate(oBox[5],{"left":-45},500)
		},false)
	oBox[4].addEventListener("mouseleave",
		function(){
			animate(oBox[5],{"left":0},500)
		},false)
	oBox[6].addEventListener("mouseenter",
		function(){
			if (oBox[7].isAnimated) return;
			animate(oBox[7],{"left":-45},500)
		},false)
	oBox[6].addEventListener("mouseleave",
		function(){
			animate(oBox[7],{"left":0},500)
		},false)
	oBox[8].addEventListener("mouseenter",
		function(){
			if (oBox[9].isAnimated) return;
			animate(oBox[9],{"left":-70},500)
		},false)
	oBox[8].addEventListener("mouseleave",
		function(){
			animate(oBox[9],{"left":0},500)
		},false)
	oBox[10].addEventListener("mouseenter",
		function(){
			if (oBox[11].isAnimated) return;
			animate(oBox[11],{"left":-70},500)
		},false)
	oBox[10].addEventListener("mouseleave",
		function(){
			animate(oBox[11],{"left":0},500)
		},false)
	oBox[12].addEventListener("mouseenter",
		function(){
			if (oBox[13].isAnimated) return;
			animate(oBox[13],{"left":-130},500)
		},false)
	oBox[12].addEventListener("mouseleave",
		function(){
			animate(oBox[13],{"left":0},500)
		},false)
	oBox[14].addEventListener("mouseenter",
		function(){
			if (oBox[15].isAnimated) return;
			animate(oBox[15],{"left":-70},500)
		},false)
	oBox[14].addEventListener("mouseleave",
		function(){
			animate(oBox[15],{"left":0},500)
		},false)
	
	
	
	oBox[15].onclick = function() {
      scrollAnimate(0, 1000);
      // document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
	oBox[14].onclick = function() {
      scrollAnimate(0, 1000);
      // document.body.scrollTop = document.documentElement.scrollTop = 0;
    }

    function scrollAnimate(target, timer) {
      var interval = 20;
      var frame = 0;
      var frames = timer / interval;
      var start = document.body.scrollTop || document.documentElement.scrollTop;
      var distance = target - start;
      var timer;
      clearInterval(timer);
      timer = setInterval(function(){
        frame++;
        if (frame >= frames) {
          clearInterval(timer);
        }
        //第一个参数t表示当前帧
        //第二个b表示起始位置
        //第三个c表示变化量
        //第四个d表示总帧数
        document.body.scrollTop = document.documentElement.scrollTop = CubicEaseInOut(frame, start, distance, frames);
      }, interval);

      function CubicEaseInOut(t,b,c,d){
    		if ((t/=d/2) < 1) return c/2*t*t*t + b;
    		return c/2*((t-=2)*t*t + 2) + b;
    	}
    }
    myajax.get('http://h6.duchengjiu.top/shop/api_cart.php', 
    {token: localStorage.token},
    function(err, responseText){
      var json = JSON.parse(responseText);
      console.log(json);
      var data = json.data;
      var sum = 0;
      for (var i = 0; i < data.length; i++) {
        var obj = data[i];
        sum += obj.goods_price * obj.goods_number;
        oTable.innerHTML += `
                          <tr>
                            <td>${obj.goods_id}</td>
                            <td><img src="${obj.goods_thumb}" ></td>
                            <td>${obj.goods_name}</td>
                            <td><input data-id="${obj.goods_id}" type="number" name="number" value="${obj.goods_number}" /></td>
                            <td>${obj.goods_price}</td>
                            <td name="sum">${obj.goods_price*obj.goods_number}</td>
                          </tr>
                          `;
      }
      getSum();
    });
    oTable.onchange = function(event) {
      event = event || window.event;
      var target = event.target || event.srcElement;
      if (target.name === 'number') {
        console.log(target.value, target.dataset.id);
        var goods_id = target.dataset.id;
        var number = target.value;
        myajax.post('http://h6.duchengjiu.top/shop/api_cart.php?token='+localStorage.token,
        {goods_id, number},
        function(err, responseText) {
          var json = JSON.parse(responseText);
          console.log(json);
          if (json.code === 0) {
            // alert('更新购物车成功');
            //修改总价和小计
            var goods_price = parseInt(target.parentNode.nextElementSibling.innerText);
            target.parentNode.nextElementSibling.nextElementSibling.innerText = parseInt(target.value) * goods_price;
            getSum();
          }
        })
      }
    }
    function getSum() {
      var oSums = document.querySelectorAll('td[name=sum]');
      var sum = 0;
      for (var i = 0; i < oSums.length; i++) {
        sum += parseInt(oSums[i].innerText);
      }
      oSum.innerText = sum;
    }