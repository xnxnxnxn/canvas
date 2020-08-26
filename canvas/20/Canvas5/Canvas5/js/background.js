/*
	图片加载方法

	bgURL: 背景图片的url

	bgCanvas: 将图片加载到画布上.
			  加载两张
	completeCallback: 加载好背景图片之后的回调函数
 */

 function loadBackground(bgURL,canvas,completeCallback){
 	// 首先获取画笔
 	var context = canvas.getContext('2d');

 	var width = canvas.width;
 	var height = canvas.height;

 	// 创建image图片对象
 	var image = new Image();

 	// 图片加载完
 	image.onload = function(){
 		// 先绘制第一张图片
 		context.drawImage(image,0,0,width,height);

 		// 绘制第二张图片,用来向下滚动
 		context.drawImage(image,0,-height,width,height);

 		// 如果外界提供了回调,那么调用回调函数,并将具体的值回传回去
 		if (completeCallback) {
 			completeCallback(image);
 		}
 	}
 	// 为图片对象指定数据源
 	image.src = bgURL;
 }

/*
	背景函数
	1.canvas: 画布对象,通过画布对象可以获取到画笔
	2.image:  背景图片对象 -> 画两张图片
	3.v 	: 用来控制背景图片滚动的速度
 */
// 用于表示背景滚动的偏移量
var backgroundOffset = 0;
function drawBackground(canvas,image,v){
	// 创建画笔
	var context = canvas.getContext('2d');
	var width = canvas.width;
	var height = canvas.height;

	// 为了内存考虑,先清除画布
	context.clearRect(0,0,width,height);

	// 保存状态值
	context.save();
	// 更新坐标
    backgroundOffset += v;
    if (backgroundOffset >= height) {
    	backgroundOffset = 0;
    }
    // 移动偏移量
    context.translate(0,backgroundOffset);

	// 绘制
	context.drawImage(image,0,0,width,height);
	context.drawImage(image,0,-height,width,height);

	// 获取状态值
	context.restore();
}
