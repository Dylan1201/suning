var oUsername = document.getElementsByTagName("input")[0];
var oPassword = document.getElementsByTagName("input")[1];
var oAffirm_password = document.getElementsByTagName("input")[2];
var oSpan = document.getElementsByClassName("hint");
var oSubmit = document.getElementsByTagName("input")[4];
var oTure = document.getElementsByClassName("ture");
var oAjax = document.getElementsByName("ajax");
var oCheckbox = document.getElementsByTagName("input")[3];
var user = false;
var pass = false;
var affirm = false;
var checked = false;
var all;
function get(){
	all = user&&pass&&affirm&&checked;
	oSubmit.disabled = !all;
	if(all){
		oSubmit.className = "submit"
		}else{
			oSubmit.className = "submit_flase"
		}
}
oCheckbox.onclick = function(){
	if(oCheckbox.checked == false){
		checked = false;
		get()
	}else{
		checked = true;
		get()
	}
}
oUsername.onfocus = function(){
	oTure[0].style.display = "none"
	user = false;
	get()
}
oPassword.onfocus = function(){
	oTure[1].style.display = "none"
	pass = false;
	get()
}
oAffirm_password.onfocus = function(){
	oTure[2].style.display = "none"
	affirm = false;
	get()
}
oUsername.onblur = function(){
	if(!(/^\w{3,20}$/).test(this.value)){
		oSpan[0].innerText = "账号请输入3-20位字母数字下滑线"
		oTure[0].style.display = "none"
		user = false;
		get()
	}else{
		oSpan[0].innerText = ""
		oTure[0].style.display = "block"
		user = true;
		get();
	}
}	

oPassword.onblur = function(){
	if(!(/^\w{6,20}$/).test(this.value)){
		oSpan[1].innerText = "密码请输入3-20位字母数字下滑线"
		oTure[1].style.display = "none"
		pass = false;
		get()
	}else{
		oSpan[1].innerText = ""
		oTure[1].style.display = "block"
		pass = true;
		get()
	}
}
oAffirm_password.onblur = function(){
	if(!(/^\w{6,20}$/).test(this.value)){
		oSpan[2].innerText = "密码为3-20为字母数字下滑线"
		oTure[2].style.display = "none"
		affirm = false;
		get()
	}else if(this.value!=oPassword.value){
		oSpan[2].innerText = "两次输入密码不一致"
		oTure[2].style.display = "none"
		affirm = false;
		get()
	}else{
		oSpan[2].innerText = ""
		oTure[2].style.display = "block"
		affirm = true;
		get()
	}
}
oSubmit.onclick = function(){
	if(!(/^\w{6,20}$/).test(oAffirm_password.value)){
		oSpan[2].innerText = "密码为3-20为字母数字下滑线"
		affirm = false;
		get()
	}else if(oAffirm_password.value!=oPassword.value){
		oSpan[2].innerText = "两次输入密码不一致"
		oTure[2].style.display = "none"
		affirm = false;
		get()
	}else{
		myajax.post('http://h6.duchengjiu.top/shop/api_user.php',
		{
			status: 'register',
		    username: oUsername.value,
		    password: oPassword.value
		},
		function(error,responseText){
			var json = JSON.parse(responseText)
			if(json.code == 2001){
				oSpan[0].innerText = json.message
				oTure[0].style.display = "none"
				pass = false;
				get()
			}else if(json.code == 1001){
				oSpan[1].innerText = json.message
				oTure[1].style.display = "none"
				pass = false;
				get()
			}else if(json.code == 0){
				self.location = ""
			}
		})
	}
}