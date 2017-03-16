(function(){
	//获取元素
	var time=document.querySelectorAll(".d_time");
	var date=document.querySelectorAll(".d_date");
	var ul=document.querySelector(".d_ul");
	var lis=document.querySelectorAll(".d_pic2>li");
	var imgs=document.getElementsByTagName("img");
	var wrap=document.getElementById("d_wrap");
	var sx=0;//开始位置
	var d=0;//旋转角度
	var l = 0;//滑动的距离
	var zIndex = 1;
	var a=0;
	//添加时间到页面
	t();
	setInterval(t,1000);
function t(){
		for(var i=0;i<time.length;i++){
		time[i].innerHTML=setTime().substring(0,5);
	 	date[i].innerHTML=setTime().substring(5);
	}
	}
//这里是获取时间的函数==============================================
	function setTime(){
		var week=["日","一","二","三","四","五","六"];
		var newDate=new Date();
		var day=add0(newDate.getDate());//日
		var month=add0(newDate.getMonth()+1);//月
		var h=add0(newDate.getHours());//时
		var m=add0(newDate.getMinutes());//分
		var w=week[newDate.getDay()];//星期
		var time2=month+"月"+day+"日"+" "+"星期"+w;//月日周
		var time1=h+":"+m;//时分
		return time1+time2;//返回值
	}
	function add0(nub){//数字加零函数
		return nub>=10?""+nub:"0"+nub;
	}
//滑屏事件==========================================================
ul.addEventListener("touchstart",fnStart);
function fnStart(e){
	var touches=e.touches[0];
	sx=touches.clientX;
	document.addEventListener("touchmove",fnMove);
	document.addEventListener("touchend", fnEnd);
}
function fnMove(e){
	var touches=e.touches[0];
	l=touches.clientX-sx;
	e.preventDefault();
};
function fnEnd(e){
	if(l<0){
		roll2()
	}
	if(l>0){
		roll1()
	}
	l=0;
}
function roll1(){
	d+=90;
	if(d>0){
		d=0
		return;
		
	}
	wrap.style.transform="rotateY("+d+"deg)";
}
function roll2(){
	d-=90;
	if(d<-180){
		d=-180;
	return;
	}
	wrap.style.transform="rotateY("+d+"deg)";
}
//=====转换布局========         
var arr=[];
 for(var i=0;i<lis.length;i++){
		arr[i] = {
			left:lis[i].offsetLeft,
			top:lis[i].offsetTop
		}
		
	lis[i].style.zIndex = 1;
	lis[i].style.left = lis[i].offsetLeft + 'px';
	lis[i].style.top = lis[i].offsetTop+ 'px';
}
for(var i=0;i<lis.length;i++){
	lis[i].style.position = 'absolute';
	lis[i].style.margin = 0;
	lis[i].index = i;
	drag(lis[i]);
}
//=====拖拽=================
/*
 1 当你拖拽图标的时候 如果不小心扔出去了=====限定一下范围
2 第一次拖拽覆盖到另一个上面以后没有交换----会覆盖

 * */
function drag(obj){
	var disX=0;
	var disY=0;
	var arr2=[];
	var objIndex = null;
	obj.addEventListener("touchstart",function(e){
	var ev=e.touches[0];
	for(var i=0;i<lis.length;i++){
		lis[i].style.transition = '';//动画清空
	}
	obj.style.zIndex = ++zIndex;//提升层级
	 disX = ev.pageX - obj.offsetLeft;
	 disY = ev.pageY - obj.offsetTop;
	
	obj.addEventListener("touchmove",dragMove,false);
	obj.addEventListener("touchend", dragEnd);
	e.preventDefault();//清空默认样式

})
function dragMove(e){
	var ev=e.touches[0];
	var max = Infinity;//无穷大
	var objIndex2 = null;
	var xx=ev.pageX - disX;
	var yy=ev.pageY - disY;
	if(xx<0){
		xx=0;
	}
	if(xx>window.innerWidth-obj.clientWidth){
		xx=window.innerWidth-obj.clientWidth;
	}
	if(yy<15){
		yy=15;
	}
	if(yy>window.innerHeight-obj.clientHeight-250){
		yy=window.innerHeight-obj.clientHeight-250;
	}
	obj.style.left = xx+ 'px'; //移动的位置
	obj.style.top = yy+ 'px';//移动的位置
	arr2.length = 0;//清空数组
	for(var i=0;i<lis.length;i++){//遍历一下所有的li，看看是不是有碰撞发生
		if(duang(obj,lis[i])){//如果发生了碰撞
			if(obj != lis[i]){//并且排除了它自己
				arr2.push(lis[i]);//把和它碰撞的写在arr中
			}
		}
	}
	arr2.forEach(function(item,i){//循环遍历所有的碰撞li
		var a = item.offsetTop - obj.offsetTop;//竖着的距离
		var b = item.offsetLeft - obj.offsetLeft;//横着的距离
		var sqrt = Math.sqrt(Math.pow(a,2)+Math.pow(b,2));//勾股定理
		if(max > sqrt){
			max = sqrt;//找到最小的
			objIndex2 = item;//index2记录这个最小的
		}
	});
	objIndex = objIndex2;
};
function dragEnd(e){
	e.preventDefault();
	e.cancelBubble = true;
	if(objIndex){
		//把当前拖拽的这个元素和被碰撞的元素加上transition
		obj.style.transition = objIndex.style.transition = '.5s';
		//互换位置
		obj.style.left = arr[objIndex.index ].left + 'px';
		objIndex.style.left = arr[obj.index].left + 'px';
		
		obj.style.top = arr[objIndex.index].top + 'px';
		objIndex.style.top = arr[obj.index].top + 'px';
		
		//交换完位置之后还要把索引值调换。
		var newIndex = objIndex.index;
		objIndex.index = obj.index;
		obj.index = newIndex;
	}
	document.removeEventListener('touchmove',dragMove);
	document.removeEventListener('touchend',dragEnd);
	}	
}
//=====碰撞检测==========
function duang(obj,obj2){
	var l1 = obj.offsetLeft;
	var t1 = obj.offsetTop;
	var r1 = l1 + obj.offsetWidth;
	var b1 = t1 + obj.offsetHeight;
	
	var l2 = obj2.offsetLeft;
	var t2 = obj2.offsetTop;
	var r2 = l2 + obj2.offsetWidth;
	var b2 = t2 + obj2.offsetHeight;
	
	if(r1 < l2 || t1 > b2 || l1 > r2 || b1 < t2){
		return false;
	}else{
		return true;
	}
}
	
	
	

})();
