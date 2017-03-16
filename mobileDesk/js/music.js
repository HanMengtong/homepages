(function(){
	var ms=["music/1.mp3",
					 "music/2.mp3",
					 "music/3.mp3",
					 "music/4.mp3",
					 "music/5.mp3",
					"music/6.mp3",
					 "music/7.mp3",
					 "music/8.mp3",
					 "music/9.mp3",
					 "music/10.mp3",
					 "music/11.mp3",
					 "music/12.mp3"
				];
			var mi=[
					"imgs/1.jpg",
					"imgs/2.jpg",
					"imgs/3.jpg",
					"imgs/4.jpg",
					"imgs/5.jpg",
					"imgs/6.jpg",
					"imgs/7.jpg",
					"imgs/8.jpg",
					"imgs/9.jpg",
					"imgs/10.jpg",
					"imgs/11.jpg",
					"imgs/12.jpg"
				];
			var title=[
					{
						name:"Just A Kiss",
						player:"Lady Antebellum"
					},
					{
						name:"Uptown Funk",
						player:"Bruno Mars"
					},
					{
						name:"Animals",
						player:"Maroon 5"
					},
					{
						name:"Feelings",
						player:"Maroon 5"
					},
					{
						name:"Maps",
						player:"Maroon 5"
					},
					{
						name:"Now You See Me",
						player:"周杰伦"
					},
					{
						name:"爱情废柴",
						player:"周杰伦"
					},
					{
						name:"半兽人",
						player:"周杰伦"
					},
					{
						name:"不该",
						player:"张惠妹"
					},
					{
						name:"床边故事",
						player:"周杰伦"
					},
					{
						name:"告白气球",
						player:"周杰伦"
					},
					{
						name:"回到过去",
						player:"周杰伦"
					}
			]
			var music=document.getElementById("music");
			var paly=document.getElementById("play");
			var timer=null;
			var drag1=document.getElementById("drag1");
			var progress1=document.getElementById("progress1");
			var bottom=document.getElementById("bottom");
			var drag=document.getElementById("drag");
			var progress=document.getElementById("progress");
			var topa=document.getElementById("top");
			var next=document.querySelector("#bar .next");
			var prev=document.querySelector("#bar .prev");
			var oName=document.querySelector("#title .name");
			var player=document.querySelector("#title .player");
			var img=document.querySelector("#cover img");
			var bg=document.querySelector("#xwrap .bg");
			var list=document.querySelector("#xlist");
			console.log(list)
			var lis=document.querySelectorAll("#xlist>div>ul>li");
			var isTab=false;			
			var n=0;
			var rem=parseFloat(document.querySelector("html").style.fontSize);
			list.onclick=function(e){
				if(!isTab){
					mTween(list.children[0],{left:-7.25*rem,opacity:100},500,"backBoth")
				}else{
					mTween(list.children[0],{left:12*rem,opacity:0},500,"backBoth")
				}
				isTab=!isTab;
				e.cancelBubble=true;
			}
			for(var i=0;i<lis.length;i++){
				lis[i].index=i;
				lis[i].onclick=function(e){
					n=this.index;
					for(var i=0;i<lis.length;i++){
						lis[i].className="";
					}
					this.className="active";
					music.src=ms[n];
					music.autoplay="autoplay";
					oName.innerHTML=title[n].name;
					player.innerHTML=title[n].player;
					img.src=mi[n];
					bg.src=mi[n];
					mTween(list.children[0],{left:12*rem,opacity:0},500,"backBoth");
					isTab=false;
					e.cancelBubble=true;					
				}
			}
			music.volume=.5;
			progress.style.width=parseFloat(getComputedStyle(topa).width)/2+"px";
			drag.style.left=(parseFloat(getComputedStyle(topa).width)-parseFloat(getComputedStyle(drag).width))/2 +"px";
			console.log(getComputedStyle(topa).width)
			setInterval(function(){
				if(music.paused){
					img.parentNode.className="";
					img.parentNode.style.transform="rotateZ(0deg)";
					play.className="bo";
				}else{
					img.parentNode.style.transform="";
					play.className="ting";
					img.parentNode.className="animation"
				};
				drag1.style.left=(css(bottom,"width")-drag1.offsetWidth)*(music.currentTime/music.duration)+"px";
				progress1.style.width=css(bottom,"width")*(music.currentTime/music.duration)+"px";
				var sec=Math.ceil(music.currentTime%60);
				var Dsec=Math.ceil(music.duration%60);
				if(sec<10){
					sec="0"+sec
				}else{
					sec=sec
				}
				if(Dsec<10){
					Dsec="0"+Dsec
				}else{
					Dsec=Dsec
				}
				bottom.children[0].innerHTML="0"+Math.floor(music.currentTime/60)+":"+sec;
				bottom.children[2].innerHTML="0"+Math.floor(music.duration/60)+":"+Dsec;
				if(music.currentTime==music.duration){
					lis[n].className="";
					n++;
					if(n>ms.length-1){
						n=ms.length-1;
						return;
					}
					music.src=ms[n];
					music.autoplay="autoplay";
					oName.innerHTML=title[n].name;
					player.innerHTML=title[n].player;
					img.src=mi[n];
					bg.src=mi[n];
					lis[n].className="active";
				}
			},1000)
			play.onclick=function(){
				if(music.paused){
					music.play();
					play.className="ting";
				}else{
					music.pause();
					play.className="bo";
				}
				
			}
			next.onclick=function(){
				lis[n].className="";
				n++;
				if(n>ms.length-1){
					n=ms.length-1;
					return;
				}
				music.src=ms[n];
				music.autoplay="autoplay";
				oName.innerHTML=title[n].name;
				player.innerHTML=title[n].player;
				img.src=mi[n];
				bg.src=mi[n];
				lis[n].className="active";
			}
			prev.onclick=function(){
				lis[n].className="";
				n--;
				if(n<0){
					n=0;
					return;
				}
				music.src=ms[n];
				music.autoplay="autoplay";
				oName.innerHTML=title[n].name;
				player.innerHTML=title[n].player;
				img.src=mi[n];
				bg.src=mi[n];
				lis[n].className="active";
			}
			
			//进度条的拖拽
			drag1.addEventListener("touchstart",function(e){
				var touches = e.touches[0];
   				oW = touches.clientX - drag1.offsetLeft;
   				document.addEventListener("touchmove",defaultEvent,false);
			},false)
			drag1.addEventListener("touchmove", function(e) {
			   var touches = e.touches[0];
			   var oLeft = touches.clientX - oW;
			   if(oLeft < 0) {
			    oLeft = 0;
			   }else if(oLeft > bottom.offsetWidth - drag1.offsetWidth) {
			    oLeft =bottom.offsetWidth - drag1.offsetWidth;
			   }
			   drag1.style.left = oLeft + "px";
				var x=oLeft/(bottom.offsetWidth - drag1.offsetWidth);
				progress1.style.width=bottom.offsetWidth*x +"px";
				music.currentTime=x*music.duration;
			  },false);
			   
			  drag1.addEventListener("touchend",function() {
			   document.removeEventListener("touchmove",defaultEvent,false);
			  },false);
			  function defaultEvent(e) {
			   e.preventDefault();
			  }
			  
			  //音量条的拖拽；
			  drag.addEventListener("touchstart",function(e){
				var touches = e.touches[0];
   				oW = touches.clientX - drag.offsetLeft;
   				document.addEventListener("touchmove",defaultEvent,false);
			},false)
			drag.addEventListener("touchmove", function(e) {
			   var touches = e.touches[0];
			   var oLeft = touches.clientX - oW;
			   if(oLeft < 0) {
			    oLeft = 0;
			   }else if(oLeft > topa.offsetWidth - drag.offsetWidth) {
			    oLeft =topa.offsetWidth - drag.offsetWidth;
			   }
			   drag.style.left = oLeft + "px";
				var x=oLeft/(topa.offsetWidth - drag.offsetWidth);
				progress.style.width=topa.offsetWidth*x +"px";
				music.volume=x;
			  },false);
			   
			  drag.addEventListener("touchend",function() {
			   document.removeEventListener("touchmove",defaultEvent,false);
			  },false);
			  function defaultEvent(e) {
			   e.preventDefault();
			  }



var listUl=document.querySelector("#xwrap #div2 ul");
   listUl.addEventListener("touchstart",function(e){
	var touches = e.touches[0];
	oH = touches.clientY - listUl.getBoundingClientRect().top;
	document.addEventListener("touchmove",defaultEvent,false);
},false)
listUl.addEventListener("touchmove", function(e) {
   var touches = e.touches[0];
   var oTop = touches.clientY-oH-listUl.parentNode.getBoundingClientRect().top ;
   if(oTop > 0) {
    oTop = 0;
   }else if(oTop < listUl.parentNode.offsetHeight-listUl.offsetHeight ) {
    oTop = listUl.parentNode.offsetHeight-listUl.offsetHeight;
   }
 listUl.style.top = oTop + "px";
   },false);
   
listUl.addEventListener("touchend",function() {
   document.removeEventListener("touchmove",defaultEvent,false);
   },false);
  
			  
//var AudioContext=AudioContext||webkitAudioContext;
//var context=new AudioContext;
////从元素创建媒体节点
//var media=context.createMediaElementSource(music);
////创建脚本处理节点
//var processor=context.createScriptProcessor(4096,1,1);
////Canvas初始化
//var width=canvas.width,height=canvas.height;
//var g=canvas.getContext("2d");
//g.translate(0.5,height/2+0.5);
////连接：媒体节点→控制节点→输出源
//media.connect(processor);
//processor.connect(context.destination);
////控制节点的过程处理
//processor.onaudioprocess=function(e){
////获取输入和输出的数据缓冲区
//var input=e.inputBuffer.getChannelData(0);
//var output=e.outputBuffer.getChannelData(0);
////将输入数缓冲复制到输出缓冲上
//for(var i=0;i<input.length;i++)output[i]=input[i];
////将缓冲区的数据绘制到Canvas上
//g.clearRect(-0.5,-height/2-0.5,width,height);
//g.beginPath();
//for(var i=0;i<width;i++)
//  g.lineTo(i,height/2*output[output.length*i/width|0]);
//g.stroke();
//};	



var html = document.querySelector("html");
var rem = parseFloat(html.style.fontSize);




var arr=[
				{	width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(30deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(60deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(90deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(120deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(150deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(180deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(210deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(240deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(270deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(300deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(330deg)'
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: 'rotateY(360deg)'
				}
		]
		var arr1=[
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: "translateZ("+2.5*rem+"px) rotateY(0deg)"
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform:"translateX("+2.5*rem+"px) rotateY(90deg)"
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform: "translateZ(-"+2.5*rem+"px) rotateY(0deg)"
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform:"translateX(-"+2.5*rem+"px) rotateY(-90deg)"
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform:"translateY(-"+2.5*rem+"px) rotateX(90deg)"
				},
				{
					width:5*rem+"px",
					height:5*rem+"px",
					transform:"translateY("+2.5*rem+"px) rotateX(270deg)"
				},
				{
					width:7.5*rem+"px",
					height:7.55*rem+"px",
					transform: "translateZ("+3.75*rem+"px) rotateY(0deg)"
				},
				{
					width:7.5*rem+"px",
					height:7.55*rem+"px",
					transform: "translateZ(-"+3.75*rem+"px) rotateY(0deg)"
				},
				{
					width:7.5*rem+"px",
					height:7.55*rem+"px",
					transform:"translateX("+3.75*rem+"px) rotateY(90deg)"
				},
				{
					width:7.5*rem+"px",
					height:7.55*rem+"px",
					transform:"translateX(-"+3.75*rem+"px) rotateY(-90deg)"
				},
				{
					width:7.5*rem+"px",
					height:7.55*rem+"px",
					transform:"translateY(-"+3.75*rem+"px) rotateX(90deg)"
				},
				{
					width:7.5*rem+"px",
					height:7.55*rem+"px",
					transform:"translateY("+3.75*rem+"px) rotateX(270deg)"
				}
		]
		var imgs=document.querySelectorAll("#wrapBox img");
		var btn1=document.querySelector("#goback");
		var wrap=document.getElementById("wrapBox")
		var isTab1=false;
		var a="center center -"+9.325*rem+"px";
		var b="center center center";
for(var i=0;i<imgs.length;i++){
//					imgs[i].hs="play";
					if(i<6){
						imgs[i].className="inner"
					}else{
						imgs[i].className="outer"
					}
					wrap.style.transformOrigin="";
					imgs[i].style.transformOrigin="";
					imgs[i].style.width=arr1[i].width;
					imgs[i].style.height=arr1[i].height;
					imgs[i].style.transform=arr1[i].transform;
					wrap.style.animation="mymove1 20s linear infinite"
				}
document.onclick=function(){
	if(document.getElementById("musicplay").style.display=="block"){
		if(!isTab1){
		for(var i=0;i<imgs.length;i++){			        
					imgs[i].className="";
					wrap.style.transformOrigin=a;
					imgs[i].style.transformOrigin=a;
					imgs[i].style.width=arr[i].width;
					imgs[i].style.height=arr[i].height;
					imgs[i].style.transform=arr[i].transform;
					wrap.style.animation="";
					wrap.style.WebKitAnimation="";
				}
		btn1.className="on";
		isTab1=true;
	}
	}
	
	if(list.children[0].style.opacity==1){
					mTween(list.children[0],{left:12*rem,opacity:0},500,"backBoth");
					isTab=false;
					
	}
}
//var hx=window.location.hash;
for(var i=0;i<imgs.length;i++){
	imgs[i].index=i;
	imgs[i].onclick=function(){		
		if(isTab1){
			mTween(document.getElementById("div1"),{left:-640,opacity:0},500,"linear",function(){
			mTween(document.getElementById("xwrap"),{left:0,opacity:100},500,"linear")
		})
			lis[n].className="";
			n=this.index;
			music.src=ms[n];
			music.autoplay="autoplay";
			oName.innerHTML=title[n].name;
			player.innerHTML=title[n].player;
			img.src=mi[n];
			bg.src=mi[n];
			lis[n].className="active";
		}
	}
}
var oBack=document.querySelector("#xwrap .back");
oBack.onclick=function(){
mTween(document.getElementById("xwrap"),{left:640,opacity:0},500,"linear",function(){
			mTween(document.getElementById("div1"),{left:0,opacity:100},500,"linear")
		})
}
btn1.onclick=function(e){
	if(!isTab1){
		for(var i=0;i<imgs.length;i++){			        
					imgs[i].className="";
					wrap.style.transformOrigin=a;
					imgs[i].style.transformOrigin=a;
					imgs[i].style.width=arr[i].width;
					imgs[i].style.height=arr[i].height;
					imgs[i].style.transform=arr[i].transform;
					wrap.style.animation="";
					wrap.style.WebKitAnimation="";
				}
		this.className="on"
	}else{
			for(var i=0;i<imgs.length;i++){
					if(i<6){
						imgs[i].className="inner"
					}else{
						imgs[i].className="outer"
					}
					wrap.style.transformOrigin="";
					imgs[i].style.transformOrigin="";
					imgs[i].style.width=arr1[i].width;
					imgs[i].style.height=arr1[i].height;
					imgs[i].style.transform=arr1[i].transform;
					wrap.style.animation="mymove1 20s linear infinite";
					wrap.style.WebKitAnimation="mymove1 20s linear infinite";
				}
			this.className="off"
	}
	isTab1=!isTab1;
	e.cancelBubble=true;

}
var startX=0;
var endX=0;
var speed=0;
var xx=0;
document.addEventListener("touchstart",function(e){
	xx=0
	var touches = e.touches[0];
   	startX = touches.clientX;
   	document.addEventListener("touchmove",defaultEvent,false);
})
document.addEventListener("touchmove",function(e){
	var touches = e.touches[0];
 	endX = touches.clientX;
 	xx=endX-startX;
})
document.addEventListener("touchend",function(e){
   	document.removeEventListener("touchmove",defaultEvent,false);  
   	if(xx<0){
   		speed-=30;
   		wrap.style.transform="rotateY("+speed+"deg)"
   	}
   	if(xx>0){
   		speed+=30;
   		wrap.style.transform="rotateY("+speed+"deg)"
   	}
})
function defaultEvent(e) {
	 e.preventDefault();
	}
})()
