(function(){
	var music=document.getElementById("musicplay");
	var gallery=document.getElementById("gallery");
	var main=document.getElementById("main");
	var hjWrap=document.getElementById("hj_wrap");
	var duanxin=document.getElementById("duanxin");
	window.onhashchange=function(){
		if(window.location.hash=="#music"){
			music.style.display="block";
			gallery.style.display="none";
			main.style.display="none";
			hjWrap.style.display="none";
			hjWrap.style.display="none";
			
		}
		if(window.location.hash=="#home"){
			music.style.display="none";
			gallery.style.display="none";
			main.style.display="block";
			hjWrap.style.display="none";
			duanxin.style.display="none";
		}
		if(window.location.hash=="#pic"){
			music.style.display="none";
			gallery.style.display="block";
			main.style.display="none";
			duanxin.style.display="none";
			hjWrap.style.display="none";
		}
		if(window.location.hash=="#message"){
			music.style.display="none";
			gallery.style.display="none";
			main.style.display="none";
			duanxin.style.display="block";
			hjWrap.style.display="none";
		}
		if(window.location.hash=="#tel"){
			music.style.display="none";
			gallery.style.display="none";
			main.style.display="none";
			duanxin.style.display="none";
			hjWrap.style.display="block";
		}
	}
})()
