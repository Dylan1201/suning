var ozhuce = document.getElementsByClassName("zhuce")[0];
var oLogout = document.getElementById("loginout");
var oUsername = document.querySelectorAll(".login_name");
oLogout.style.display = "none";
// console.log(oUsername);
for (var i = 0; i < oUsername.length; i++) {
	console.log(oUsername[i].innerHTML);
	if (localStorage.username) {
		oUsername[i].innerHTML = localStorage.username;
		ozhuce.style.display = "none";
		oLogout.style.display = "block";
	}
}
	//判断是否有Username，没有的话返回登录界面
	if (!localStorage.username) {
		location.href = "../web/login.html";
	}
