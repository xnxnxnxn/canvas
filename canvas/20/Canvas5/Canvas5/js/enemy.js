
//返回一个[min,max]随机数
function getIntInRange(min, max){
	return Math.round(Math.random()*(max-min)) + min;
}

//定义敌机
function Enemy(w,h,imageURL,canvas){
	var canvasWith = canvas.width;
	var canvasHeight = canvas.height;
	var x = getIntInRange(0,canvasWith-w);
	this.x = x;
	this.y = -h;
	this.w = w;
	this.h = h;
	var image = new Image();
	image.src = imageURL;
	this.v = getIntInRange(3,10);//速度随机2~6
	this.image = image;
}

Enemy.prototype.draw = function(canvas){
	var context = canvas.getContext("2d");
	context.drawImage(this.image, 0, 0, 
		this.w,this.h, this.x, this.y,this.w,this.h);
}

Enemy.prototype.move = function(){
	this.y += this.v;
}

Enemy.prototype.isOutScreen = function(canvas){
	if(this.y >= canvas.height){
		return true;
	}else{
		return false;
	}
}

Enemy.prototype.crash = function(){
	var eSound = new Audio("audio/enemy1_down.mp3");
	eSound.play();
}

function createEnemy(w,h,imageURL,canvas){

	var enemy = new Enemy(w,h,imageURL,canvas);
	return enemy;
}

//判断对象是否相交（有交集），obj1和obj2必须要有x,y,w,h属性
function isObjInsect(obj1,obj2){
	//分别获取2个矩形的最值
		var minX1 = obj1.x;
		var maxX1 = obj1.x + obj1.w;

		var minY1 = obj1.y;
		var maxY1 = obj1.y + obj1.h;

		var minX2 = obj2.x;
		var maxX2 = obj2.x + obj2.w;

		var minY2 = obj2.y;
		var maxY2 = obj2.y + obj2.h;

		//相交矩形的最值
		var minX = Math.max(minX1,minX2);
		var maxX = Math.min(maxX1,maxX2);
		var minY = Math.max(minY1,minY2);
		var maxY = Math.min(maxY1,maxY2);

		if (minX < maxX && minY < maxY) {
			return true;
		}else{
			return false;
		}
}



