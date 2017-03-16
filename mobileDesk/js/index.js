(function(){
	var data = [];
for(var i = 0;i < 24; i++){
	data.push("img/"+(i+1)+".jpg");
}
//console.log(data)
var arr = [];
var nub = 0;
var num=0;
var list = document.getElementById('list');
var wrap = document.getElementById('wrap'); 
//var imgs = wrap.getElementsByTagName('img');
var show = document.getElementById('show');
var picX = show.getElementsByTagName('img');
var rem=parseFloat(document.getElementsByTagName("html")[0].style.fontSize)
wrap.addEventListener("touchstart",function(e){
	console.log(css(wrap,"height"))
	var touches=e.touches[0];
	var disY=touches.clientY-wrap.offsetTop;
	document.addEventListener("touchmove",function(e){
		var touches=e.touches[0];
		var t =touches.clientY-disY;
		if(t>1.88*rem){
			t=1.88*rem
		}
		if(t<window.innerHeight-css(wrap,"height")){
			t=window.innerHeight-css(wrap,"height")
		}
		wrap.style.top=t+"px";
	})
})

var	oDelete = document.querySelector('.header .delete');
var header = document.querySelector('.header');
var sureHeader = document.querySelector('.sureHeader');
var cancel = document.querySelector('.sureHeader .cancel');
var ensure = document.querySelector('.sureHeader .ensure');
var aLi = wrap.getElementsByTagName('li')
oDelete.openTab = false;
var arrIndex = [];

for(var i=0;i<aLi.length;i++){
		var obj={};
		obj.l=aLi[i].offsetLeft;
		obj.t=aLi[i].offsetTop;
		arr.push(obj);
	}

	for(var i=0;i<aLi.length;i++){
		aLi[i].style.margin = '0';
		aLi[i].style.position = 'absolute';
		aLi[i].style.left = arr[i].l + 'px';
		aLi[i].style.top = arr[i].t + 'px'
	}
create();
function create(){
	for(var i = 0;i <data.length;i ++){
		var lis = document.createElement('li');	
		lis.className = 'box';
		var div1=document.createElement("div");
		var div2=document.createElement("div");
		var div3=document.createElement("div");
		var div4=document.createElement("div");
		var div5=document.createElement("div");
		var div6=document.createElement("div");
		var div7=document.createElement("div");
		var div8=document.createElement("div");
		var div9=document.createElement("div");
		var div10=document.createElement("div");
		div9.appendChild(div10);
		div8.appendChild(div9);
		div7.appendChild(div8);
		div6.appendChild(div7);
		div5.appendChild(div6);
		div4.appendChild(div5);
		div3.appendChild(div4);
		div2.appendChild(div3);
		div1.appendChild(div2);
		lis.appendChild(div1);
		lis.style.float="left";
		wrap.appendChild(lis);
	}
	var aLi = document.querySelectorAll('#wrap li')

//	for(var i=0;i<aLi.length;i++){
//		var obj={};
//		obj.l=aLi[i].offsetLeft;
//		obj.t=aLi[i].offsetTop;
//		arr.push(obj);
//		aLi[i].style.left = arr[i].l + 'px';
//		aLi[i].style.top = arr[i].t + 'px'
//	}

	for(var i=0;i<aLi.length;i++){
		
		aLi[i].style.margin = '0';
		aLi[i].style.position = 'absolute';
		aLi[i].index=i;
		aLi[i].style.left = i % 3 * 5 + 'rem';
		aLi[i].style.top = Math.floor(i/3) * 5 + 'rem';
		
	}
	
	for(var i=0;i<aLi.length;i++){
		var divs = aLi[i].getElementsByTagName('div');
		for(var j=0; j<divs.length; j++){
			divs[j].style.background = 'url('+data[i]+') no-repeat';
			divs[j].style.backgroundSize="120px 120px";
			divs[j].style.backgroundPosition = `${-12*j}px 0`;
		}
	}	
	
	oDelete.onclick = function(){
		oDelete.openTab = true;
		header.style.display = 'none';
		sureHeader.style.display = 'block';
	}
	
	for(var i=0;i<aLi.length;i++){
		aLi[i].index = i;
		aLi[i].tab = false;
		arrIndex.length = 0;
		aLi[i].onclick=function(){	
			//console.log(7)
			if(oDelete.openTab){
//				
				if (this.tab) {
					var div = this.getElementsByTagName('div');
					for (var i = 0; i < div.length; i++) {
					    div[i].style.transition = '.5s';
					    div[i].className = '';
					}
					if (arrIndex.indexOf(this.index) != -1) {
						arrIndex.splice(arrIndex.indexOf(this.index),1)
					} 
				} else{
					var div = this.getElementsByTagName('div');
					for (var i = 0; i < div.length; i++) {
					    div[i].style.transition = '.5s';
					    div[i].className = 'show';
					}
					arrIndex.push(this.index);
					console.log(arrIndex)
					
				}
				this.tab = !this.tab;
ensure.onclick=function(){
	header.style.display = 'block';
	sureHeader.style.display = 'none';	
	if (arrIndex.length != 0) {
	    arrIndex = arrIndex.sort(function(a,b){
			return a-b;
		})
		while (arrIndex.length){
			var num1 = arrIndex.pop();
			(function(num){
				wrap.removeChild(aLi[num]);
				data.splice(num,1)
			})(num1)
			console.log(data)
			aLi = wrap.getElementsByTagName('li');
			for(var i=0;i<aLi.length;i++){
				aLi[i].index=i;
				aLi[i].style.left = i % 3 * 5 + 'rem';
				aLi[i].style.top = Math.floor(i/3) * 5 + 'rem';
			}
		}	
	} 
     oDelete.openTab=false;
}
	cancel.onclick = function(){
		header.style.display = 'block';
		sureHeader.style.display = 'none';
	    var div = document.querySelectorAll('.box div');
	    for (var i = 0; i < div.length; i++) {
		    div[i].style.transition = '.5s';
		    div[i].className = '';
		}
	    oDelete.openTab=false
	}
		}else{
				num=this.index;
				show.style.display = 'block';
				list.style.display = 'none';
				var as = document.createElement('a');
				var inner = document.createElement('div');
				inner.className = 'inner';
				var pic = document.createElement('img');
				var pics = document.createElement('img');
				 inner.style.opacity = 0;
				 
				as.innerHTML = '<';
				pic.src = data[num];
				pic.style.transition="2s";
				pics.src = data[num];
				inner.appendChild(pic);
				inner.appendChild(pics);
				show.appendChild(as);
				show.appendChild(inner);
				mTween(inner,{opacity:100},400,"linear",function(){
					pic.style.transform="rotate(360deg)"
				});
				huadong();
				as.onclick = function(){
					
					mTween(inner,{opacity:0},400,"linear",function(){
						show.removeChild(inner);
						show.removeChild(as);
						show.style.display = 'none';
						list.style.display = 'block';
					})
					
					
					document.removeEventListener("touchstart",start);
					document.removeEventListener('touchmove',move);
					document.removeEventListener('touchend',end);
					num=0;
				}
			}
		}
//		aLi[i].addEventListener("click",clickImg);
		function clickImg(e){
			if (oDelete.openTab) {					
				for (var i = 0; i < aLi.length; i++) {
						
					    	if (this.tab) {
								var div = this.getElementsByTagName('div');
								for (var i = 0; i < div.length; i++) {
								    div[i].style.transition = '.5s';
								    div[i].className = '';
								}
								if (arrIndex.indexOf(this.index) != -1) {
									arrIndex.splice(arrIndex.indexOf(this.index),1)
								} 
							} else{
								var div = this.getElementsByTagName('div');
								for (var i = 0; i < div.length; i++) {
								    div[i].style.transition = '.5s';
								    div[i].className = 'show';
								}
								arrIndex.push(this.index);
							}
							this.tab = !this.tab;
					}
				
//					ensure.addEventListener('touchend',fnEnsure)
//					function fnEnsure(e){
//						header.style.display = 'block';
//						sureHeader.style.display = 'none';
//						
//						if (arrIndex.length != 0) {
//						    arrIndex = arrIndex.sort(function(a,b){
//								return a-b;
//							})
//							while (arrIndex.length){
//								var num1 = arrIndex.pop();
//								(function(num){
//									wrap.removeChild(aLi[num]);
//								})(num1)
//								
//								aLi = document.getElementsByClassName('box')
//								for(var i=0;i<aLi.length;i++){
//									aLi[i].style.left = i % 3 * 5 + 'rem';
//									aLi[i].style.top = Math.floor(i/3) * 5 + 'rem';
//								}
//							}	
//						} 
//						for (var i = 0; i < aLi.length; i++) {
//						    aLi[i].onclick = null;
//						}
//					}
ensure.onclick=function(){
	header.style.display = 'block';
	sureHeader.style.display = 'none';	
	if (arrIndex.length != 0) {
	    arrIndex = arrIndex.sort(function(a,b){
			return a-b;
		})
		while (arrIndex.length){
			var num1 = arrIndex.pop();
			(function(num){
				wrap.removeChild(aLi[num]);
			})(num1)
			
			aLi = document.getElementsByClassName('box')
			for(var i=0;i<aLi.length;i++){
				aLi[i].style.left = i % 3 * 5 + 'rem';
				aLi[i].style.top = Math.floor(i/3) * 5 + 'rem';
			}
		}	
	} 
	for (var i = 0; i < aLi.length; i++) {
	    aLi[i].onclick = null;
	}
}
					cancel.onclick = function(){
						header.style.display = 'block';
						sureHeader.style.display = 'none';
					    var div = document.querySelectorAll('.box div');
					    for (var i = 0; i < div.length; i++) {
						    div[i].style.transition = '.5s';
						    div[i].className = '';
						}
					}
				//}
			} else{
				nub = this.index+1;
				num=this.index;
				show.style.display = 'block';
				list.style.display = 'none';
				var as = document.createElement('a');
				var inner = document.createElement('div');
				inner.className = 'inner';
				var pic = document.createElement('img');
				var pics = document.createElement('img');
				 inner.style.opacity = 0;
				 
				as.innerHTML = '<';
				pic.src = 'img/'+nub+'.jpg';
				pic.style.transition="2s";
				pics.src = 'img/'+(nub+1)+'.jpg';
				inner.appendChild(pic);
				inner.appendChild(pics);
				show.appendChild(as);
				show.appendChild(inner);
				mTween(inner,{opacity:100},400,"linear",function(){
					pic.style.transform="rotate(720deg)"
				});
				huadong();
				as.onclick = function(){
					
					mTween(inner,{opacity:0},400,"linear",function(){
						show.removeChild(inner);
						show.removeChild(as);
						show.style.display = 'none';
						list.style.display = 'block';
					})
					
					
					document.removeEventListener("touchstart",start);
					document.removeEventListener('touchmove',move);
					document.removeEventListener('touchend',end);
					num=0;
				}
			}
		}
	}


	
}
function huadong(){
	var startX = 0;
	var endX = 0;
	var xx = 0;
	document.addEventListener("touchstart",start)
	document.addEventListener('touchmove',move)
	document.addEventListener('touchend',end)
	
}
function start(e){
	xx = 0;
	var touches = e.touches[0];
	startX = touches.clientX;
	document.addEventListener('touchmove',defaultEvent,false);
}
function move(e){
	var touches = e.touches[0];
	endX = touches.clientX;
	xx = endX - startX;
}
function end(e){
	document.removeEventListener('touchmove',defaultEvent,false);
	if(xx>0){
		
		var inners = show.getElementsByTagName('div')[0];
		picX[1].src = data[num];
		inners.style.left = -css(show,"width") + 'px';
		picX[0].src = data[num=num>0? --num:data.length-1];
		mTween(inners,{left:0},500,"linear");

	}
	if(xx<0){
		var inners = show.getElementsByTagName('div')[0];
		picX[0].src = data[num];
		inners.style.left = 0 + 'px';
		picX[1].src = data[num=num<data.length-1? ++num:0];
		mTween(inners,{left:-css(show,"width")},500,"linear");
	}
}
function defaultEvent(e){
	e.preventDefault();
}
	
})()






