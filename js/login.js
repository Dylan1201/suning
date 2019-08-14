var oUsername = document.querySelector('input[name=username]');
var oPassword = document.querySelector('input[name=password]');
var oBtn = document.getElementById("btn");
var oSpan = document.getElementById("err");

oBtn.onclick = function() {
	//js校验
	//直接调用登录的接口
	myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
		status: 'login',
		username: oUsername.value,
		password: oPassword.value
	}, function(error, responseText) {
		var json = JSON.parse(responseText);
		localStorage.token = json.data.token;
		localStorage.username = json.data.username;
		oSpan.innerText = json.message;
		if (json.code === 0) {
			oSpan.className = "right";
			
			
			setTimeout(tiao, 500)
			
			function tiao() {
				self.location = '../index.html';
			}
		} else {
			oSpan.className = "error";
		}
	});
}
	
//	oBtn.addEventListener("keyup",function(event){
//	
//		event = event || window.event;
//		console.log(event.keyCode);
//		if (event.keyCode === 13) {
//			myajax.post('http://h6.duchengjiu.top/shop/api_user.php', {
//			status: 'login',
//			username: oUsername.value,
//			password: oPassword.value
//		}, function(error, responseText) {
//			var json = JSON.parse(responseText);
//			localStorage.token = json.data.token;
//			localStorage.username = json.data.username;
//			oSpan.innerText = json.message;
//			if (json.code === 0) {
//				oSpan.className = "right";
//				setTimeout(tiao, 500)
//
//				function tiao() {
//					self.location = '../index.html';
//				}
//			} else {
//				oSpan.className = "error";
//			}
//		});
//		}
//
//	})
//		
//	
	
	