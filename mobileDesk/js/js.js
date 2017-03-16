(function(){
	var jiesuo=document.getElementById("gjiesuo");
	var small=document.getElementById("gsmall");
	var img=small.getElementsByTagName("img")[0];
	var hua=document.getElementById("ghua");
	var disX=0;
	var l=0;
	small.addEventListener("touchstart",function(e){
		var touches=e.touches[0];
		disX=touches.clientX;
		document.addEventListener("touchmove",function(e){e.preventDefault()},false)
	})
	small.addEventListener("touchmove",fnMove);
	function fnMove(e){
		var touches=e.touches[0];
		l=touches.clientX-disX;
		if(l<0 ){
			l=0
		}else if(l>=jiesuo.offsetWidth-small.offsetWidth-20){
			l=jiesuo.offsetWidth-small.offsetWidth-20;
			img.src="img/jiesuo.png";
			hua.style.display="none";
			setTimeout(function(){
				gwrap.style.display="none";
			},600)
		}
		small.style.left=l+"px";
	};
	small.addEventListener("touchend",fnEnd);
	function fnEnd(e){
		if(l<jiesuo.offsetWidth-small.offsetWidth-20){
			l=15;
		}
		small.style.left=l+"px";		
	};
})()

