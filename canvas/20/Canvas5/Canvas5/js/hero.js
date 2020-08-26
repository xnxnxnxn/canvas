/*
	创建主角的函数,最终返回创建好的主角.

	w: 主角的宽度
	h: 主角的高度
	canvas:主角所在的画布
	imageURL:主角使用的图片
	completeCallback: 图片加载玩之后,回调方法
 */
 function createHero(w,h,canvas,imageURL,completeCallback){
 	var context = canvas.getContext('2d');
 	var canvasWidth = canvas.width;
 	var canvasHeight = canvas.height;

 	var x = canvasWidth / 2 - w / 2;
 	var y = canvasHeight - h - 20; // 底部靠上20的位置

 	var hero = new Hero(x,y,w,h,imageURL,completeCallback);

 	// 通过上下左右控制飞机方向
 	document.onkeydown = function(event){
 		var event = event || window.event;

 		switch(event.keyCode){
 			case 37:{
 				hero.left = true;
 				break;
 			}
 			case 38:{
 				hero.up = true;
 				break;
 			}
 			case 39:{
 				hero.right = true;
 				break;
 			}
 			case 40:{
 				hero.down = true;
 				break;
 			}
 		}
 		// 阻止默认事件
 		event.preventDefault();
 	}

 	document.onkeyup = function(event){
 		var event = event || window.event;
 		switch(event.keyCode){
 			case 37:{
 				hero.left = false;
 				break;
 			}
 			case 38:{
 				hero.up = false;
 				break;
 			}
 			case 39:{
 				hero.right = false;
 				break;
 			}
 			case 40:{
 				hero.down = false;
 				break;
 			}
 		}
 	}

 	var timer = setInterval(function(){
 		if (hero.left == true) {
 			hero.x -= 2;
 		}

 		if (hero.up == true) {
 			hero.y -= 2;
 		}

 		if (hero.right == true) {
 			hero.x += 2;
 		}

 		if (hero.down == true) {
 			hero.y += 2;
 		}
 	},10);

 	// 手机触摸事件
 	canvas.addEventListener("touchstart",function(){
 		if (event.touches.length == 1) {
 			// 获取一个手指的坐标
 			var x = event.touches[0].clientX;
 			var y = event.touches[0].clientY;
 			// console.log(x + " " + y);

 			// 判断是否点到飞机
 			if (x > hero.x && x <= hero.x + hero.w 
 				&& y > hero.y && y <= hero.y + hero.h) {
 				// console.log("手指在飞机上");
 				// 在确定点到飞机的时候,获取飞机左边和上边的距离
 				var disX = x - hero.x;
 				var disY = y - hero.y;

 				// 添加touch移动事件
 				document.addEventListener("touchmove",function(){
 					// 获取touch移动时,最新的x和y值,并赋值给this.x & this.y
 					var newX = event.touches[0].clientX - disX;
 					var newY = event.touches[0].clientY - disY;

 					hero.x = newX;
 					hero.y = newY;

 					// 阻止默认事件(防止拖拽时底部出现bug)
 					event.preventDefault();

 					// bug 键盘移动后,在使用触摸事件飞机会伴随
 				},false);
 			}
 		}
 	},false);

 	return hero;
 }

 function Hero(x,y,w,h,imageURL,completeCallback){
 	this.x = x;
 	this.y = y;
 	this.w = w;
 	this.h = h;

 	// 加载图片
 	this.image = new Image();
 	// 先存储hero对象的this关键字
 	// var _this = this;
 	this.image.onload = function(){
 		// _this.image = image;
 		if (completeCallback) {
 			completeCallback(this);
 		}
 	}
 	this.image.src = imageURL;
 	// 用来切换飞机飞行的两张图片
 	this.bool = 1;
 }

// 绘制主角的方法
Hero.prototype.draw = function(canvas){
	// 画笔
	var context = canvas.getContext('2d');
	var x = this.w * this.bool;
	var y = this.y;
	var w = this.w;
	var h = this.h;
	// 画主角
	context.drawImage(this.image,x,0,w,h,this.x,y,w,h);
	this.bool = !this.bool;
}

/*
	创建子弹
*/

function createBullet(hero,w,h,imageURL){
	var x = hero.w / 2 - w / 2 + hero.x;
	var y = hero.y - h;

	// 创建子弹的构造函数
	var bullet = new Bullet(x,y,w,h,imageURL);

	// 当子弹创建出来时,要伴随发子弹的声音
	var bSound = new Audio("audio/bullet.mp3");
	bSound.play();

	return bullet;
}
// 创建子弹的构造函数
function Bullet(x,y,w,h,imageURL){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	var image = new Image();
	image.src = imageURL;
	this.Image = image;
}

// 画子弹
Bullet.prototype.draw = function(canvas){
	var context = canvas.getContext('2d');
	context.drawImage(this.Image,this.x,this.y,this.w,this.h);
}

// 子弹移动的方法
Bullet.prototype.move = function(){
	this.y -= 10;
}

Bullet.prototype.isOutScreen = function(){
	if (this.y <= -this.h) {
		return true;
	}else{
		return false;
	}
}

