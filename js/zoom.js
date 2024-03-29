var oSmallPic = document.querySelector('#smallPic');
var oBigPic = document.querySelector('#bigPic');
var oZoom = document.querySelector('#zoom');

//大图800*800 大图盒子 400*400
//小图盒子350*350 放大镜175*175
//所以放大镜总行程是350-175 = 175,  大图的总行程 800 - 400 = 400
// var rate = 400 / 175;//可以用这句话代替下面的四行，下面四行是更通用的代码
var bigPicWidth = parseFloat(fetchComputedStyle(oBigPic, 'width'));
var smallPicWidth = parseFloat(fetchComputedStyle(oSmallPic, 'width'));
var zoomWidth = parseFloat(fetchComputedStyle(oZoom, 'width'));
var rate = (800 - bigPicWidth) / (smallPicWidth - zoomWidth);

oSmallPic.onmouseover = function() {
	oZoom.style.display = 'block';
	oBigPic.style.display = 'block';
	oZoom.style.cursor = "move"
}
oSmallPic.onmouseout = function() {
	oZoom.style.display = 'none';
	oBigPic.style.display = 'none';
}

oSmallPic.onmousemove = function(event) {
	event = event || window.event;

	//event.offsetX不能用
	//因为onmousemove事件冒泡，鼠标碰到zoom这个放大镜时事件将往上传播
	//会触发oSmallPic的onmousemove事件。因此event.offsetX的坐标，以zoom左上角为准
	// var x = event.offsetX;
	// var y = event.offsetY;

	var scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft;
	var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

	var x = event.clientX - (getAllLeft(oSmallPic) - scrollLeft) - oZoom.clientWidth / 2;
	var y = event.clientY - (getAllTop(oSmallPic) - scrollTop) - oZoom.clientHeight / 2;
	if (x < 0) x = 0;
	if (y < 0) y = 0;
	if (x > oSmallPic.clientWidth - oZoom.clientWidth) {
		x = oSmallPic.clientWidth - oZoom.clientWidth;
	}
	if (y > oSmallPic.clientHeight - oZoom.clientHeight) {
		y = oSmallPic.clientHeight - oZoom.clientHeight;
	}

	oZoom.style.top = y + 'px';
	oZoom.style.left = x + 'px';

	oBigPic.style.backgroundPosition = -x * rate + 'px ' + -y * rate + 'px';
}

function fetchComputedStyle(obj, property) {
	if (window.getComputedStyle) {
		property = property.replace(/[A-Z]/g, function(match) {
			return '-' + match.toLowerCase();
		});
		return window.getComputedStyle(obj)[property]; //中括号里面可以是变量
	} else {
		property = property.replace(/-([a-z])/g, function(match, $1) {
			return $1.toUpperCase();
		});
		return obj.currentStyle[property];
	}
}

function getAllTop(obj) {
	var allTop = obj.offsetTop;
	var currentObj = obj;
	while (currentObj = currentObj.offsetParent) {
		allTop += currentObj.offsetTop;
	}
	return allTop;
}

function getAllLeft(obj) {
	var allLeft = obj.offsetLeft;
	var currentObj = obj;
	while (currentObj = currentObj.offsetParent) {
		allLeft += currentObj.offsetLeft;
	}
	return allLeft;
}