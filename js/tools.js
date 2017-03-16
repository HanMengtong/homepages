//运动框架
var Tween = {
	linear: function (t, b, c, d){
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 2.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};

//运动形式
var mTween = function (obj,attrs,times,type,fn){
	if(typeof times == 'undefined'){
		times = 400;
		type = 'linear';
	}
	if(typeof times == 'string'){
		type = times;
		times = 400;
	}
	if(typeof times == 'function'){
		fn = times;
		type = 'linear';
		times = 400;
	}
	if(typeof times == 'number'){
		if(typeof type == 'undefined'){
			type = 'linear';
		}
		if(typeof type == 'function'){
			fn = type;
			type = 'linear';
		}
	}
	var json = {};
	for(var attr in attrs){
		if(attr == 'opacity'){
			json[attr] = getComputedStyle(obj)[attr]*100;
		}else{
			json[attr] = parseInt(getComputedStyle(obj)[attr]);
		}
	}
	var start = new Date().getTime();
	var timer = setInterval(function(){
		var now = new Date().getTime();
		var t = Math.min(times,now - start);
		for(var attr in attrs){
			var value = Tween[type](t,json[attr],attrs[attr] - json[attr],times);
			if(attr == 'opacity'){
				obj.style.opacity = value/100;
			}else{
				obj.style[attr] = value + 'px';
			}
		}
		if(t == times){
			clearInterval(timer);
			if(typeof fn === 'function'){
				setTimeout(function(){
				    fn.call(obj);
				},16)
			}
		}
	},16);
};

//抖函数 元素 X/Y 回调函数
var shake = function (obj, dir, times, fn) {
	var arr = [];
	for(var i = times; i >= 0; i--) {
		arr.push(i, -i);
	}
	var n = 0;
	clearInterval(timer);
	var timer = setInterval(function() {
		obj.style.transform = `translate${dir}(${arr[n]}px)`;
		n++;
		if(n == arr.length) {
			clearInterval(timer);
			if(typeof fn == 'function') {
				setTimeout(function() {
					fn.call(obj);
				}, 16)
			}
		}
	}, 16);
}

//获取元素
function M(sele) {
	var first = sele.substr(0,1);
	var isArr = sele.split(' ');
	if(first === '#' && isArr.length == 1){
		return document.getElementById(sele.substr(1));
	}else{
		var arr = Array.from(document.querySelectorAll(sele));
		return arr.length == 1 ? arr[0] : arr;
	}
}

//获取设置css样式
function css(el,attr,val) {
	switch(attr){
		case "rotate":
		case "rotateX":
		case "rotateY":
		case "rotateZ":
		case "scale":
		case "scaleX":
		case "scaleY":
		case "skewX":
		case "skewY":
		case "translateX":
		case "translateY":
		case "translateZ":
			return cssTransform(el,attr,val)
	}
	if(arguments.length < 3) {
		var val  = 0;
		if(el.currentStyle) {
			val = el.currentStyle[attr];
		} else {
			val = getComputedStyle(el)[attr];
		}
		if(attr == "opacity") {
			val*=100;
		}
		return parseFloat(val);
	}
	if(attr == "opacity") {
		el.style.opacity = val/100;
		el.style.filter = "alpha(opacity = "+val+")";
	} else {
		el.style[attr] = val + "px";
	}
}

//动画变化
function cssTransform(el,attr,val){
	if(typeof el.transform == "undefined"){
		el.transform = {};
	}
	if(typeof val == "undefined"){
		if(!el.transform[attr]){
			switch(s){
				case "scale":
				case "scaleX":
				case "scaleY":
					el.transform[attr] = 1;
					break;
				default:
					el.transform[attr] = 0;	
			}
		}
		return el.transform[attr];
	} else {
		var value = "";
		el.transform[attr] = val;
		for(var s in el.transform){
			switch(s){
				case "rotate":
				case "rotateX":
				case "rotateY":
				case "rotateZ":
				case "skewX":
				case "skewY":
					value += " "+s+"("+el.transform[s]+"deg)";
					break;
				case "translateX":
				case "translateY":
				case "translateZ":	
					value += " "+s+"("+el.transform[s]+"px)";
					break;
				case "scale":
				case "scaleX":
				case "scaleY":	
					value += " "+s+"("+el.transform[s]+")";
					break;	
			}
			
		}
		el.style.WebkitTransform = el.style.MozTransform = el.style.transform = value;
	}
}

//滚轮事件
function MouseWheel(el,callback){
	if (window.navigator.userAgent.toLowerCase().indexOf('firefox')!=-1) {
		el.addEventListener('DOMMouseScroll',fn1);
	} else{
		el.addEventListener('mousewheel',fn1);
	}
	function fn1 (ev) {
		var down = true;
		if (ev.wheelDelta) {
			down = ev.wheelDelta > 0 ? true : false;
		} else{
			down = ev.detail < 0 ? true : false;
		}
		if (callback && typeof callback === "function") {
			callback(down);
		} 
		ev.preventDefault();
	}
	
}

//碰撞检测
function Drag(json){
	var settings = {
		id:json.id,
		id2:json.id2,
		fnDuang:json.fnDuang,
		fnNoDuang:json.fnNoDuang
	}
	var obj = document.getElementById(settings.id);
	var obj2 = document.getElementById(settings.id2);
	obj.addEventListener('mousedown',fnDown);
	function fnDown(ev){
		var disX = ev.pageX - obj.offsetLeft;
		var disY = ev.pageY - obj.offsetTop;
		
		document.addEventListener('mousemove',fnMove);
		document.addEventListener('mouseup',fnUp);
		
		function fnMove(ev){
			obj.style.left = ev.pageX - disX + 'px';
			obj.style.top = ev.pageY - disY + 'px';
			
			//如果传入一个obj2 并且 obj2要是个元素 并且 碰到了
			if(obj2 && obj2.nodeType === 1 && duang(obj,obj2)){
				//fnDuang是不是一个函数
				if(settings.fnDuang && typeof settings.fnDuang === 'function'){
					settings.fnDuang(obj,obj2);
				}
			}else{
				//要传入一个fnNoDuang为真 并且 fnNoDuang为函数
				if(settings.fnNoDuang && typeof settings.fnNoDuang === 'function'){
					settings.fnNoDuang(obj,obj2);
				}
			}
			
		}
		function fnUp(){
			document.removeEventListener('mousemove',fnMove);
			document.removeEventListener('mouseup',fnUp);
		}				
		ev.preventDefault();//阻止默认行为
	}
}
function duang(obj1,obj2){
	var l1 = obj1.offsetLeft;
	var t1 = obj1.offsetTop;
	var b1 = t1 + obj1.offsetHeight;
	var r1 = l1 + obj1.offsetWidth;
	
	var l2 = obj2.offsetLeft;
	var t2 = obj2.offsetTop;
	var b2 = t2 + obj2.offsetHeight;
	var r2 = l2 + obj2.offsetWidth;
	
	if(r1 < l2 || b1 < t2 || l1 > r2 || t1 > b2){
		//没碰到
		return false;
	}else{
		//碰到了
		return true;
	}
}

