(function(){
	(function(){
		document.addEventListener("touchstart",fnStart);
		function fnStart(ev){
			document.addEventListener("touchmove",fnMove);
			function fnMove(ev){
				var touch = ev.targetTouches[0];
				if(ev.targetTouches.length > 1 || ev.scale && ev.scale !== 1) return;
				//如果接触的点多于一个或缩放开启，跳出函数
				ev.preventDefault();
			}
			this.addEventListener("touchend",fnEnd);
			function fnEnd(){
				this.removeEventListener("touchmove",fnMove);
				this.removeEventListener("touchend",fnEnd);
			}
		}
	})();
	/*禁止拖动效果*/
	toRight(document);
	function toRight(D){
		var wrap = D.getElementById("hj_wrap");
		var secLeft = D.getElementById("hj_section");
		var text = secLeft.querySelector("input");
		var right = D.getElementById("hj_right");
		var add = D.getElementById("hj_add");
		// var secRight = right.querySelector("section");
		// var ulRight = right.querySelector("ul");
		var bgd = right.querySelector("img");
		var header = D.getElementById("hj_header");

		var name = secLeft.getElementsByClassName("name")[0];
		var as = name.getElementsByTagName("a");
		var back = right.getElementsByClassName("back")[0];
		var options = right.querySelector(".options");
		var dl = right.querySelector("dl");
		var hDl = dl.offsetHeight;
		var dlWrap = right.querySelector(".dlWrap");
		var close = right.querySelector(".close");
		var pName = right.querySelector("section").querySelector("p");
		var phNum = right.querySelector("ul").querySelector(".phone").querySelector("span");
		var left = -right.offsetWidth;
		var addBtn = D.querySelector("#hj_addBtn");
		
		secLeft.style.height = name.offsetHeight+name.offsetTop+"px";
		text.placeholder = `搜索${as.length}位联系人`;
		as = [...as];
		as.forEach(function(item,i,arr){
			//item.href = `index.html#name=${i}`;	
			item.addEventListener("touchstart",fnTouchstart);
			function fnTouchstart(){
				var time = new Date();
				item.addEventListener("touchend",fnEnd);
				function fnEnd(){
					var timeEnd = new Date();
					var T = timeEnd - time;
					if (T < 300) {
						mTween(wrap,{left:left},400,"linear");
						mTween(header,{left:left},400,"linear");
						bgd.src = data[i].bgd;
						pName.innerHTML = data[i].name;
						phNum.innerHTML = data[i].phoneNum;
						right.style.zIndex = 4;
						add.style.zIndex = 1;
					}
				}
				
			}
		})

		back.addEventListener("touchstart",fnBack);
		function fnBack(){
			mTween(wrap,{left:0},400,"linear");
			mTween(header,{left:0},400,"linear");
		}
		options.addEventListener("touchstart",fnOptions);
		function fnOptions(){
			mTween(dlWrap,{height:hDl},400,"linear",function(){
				css(back,"opacity",0);
				css(options,"opacity",0);
			});
		}
		close.addEventListener("touchstart",fnClose);
		right.addEventListener("touchstart",fnClose,true);
		function fnClose(){
			mTween(dlWrap,{height:0},400,"linear",function(){
				css(back,"opacity",100);
				css(options,"opacity",100);
			});
		}
		addBtn.addEventListener("touchstart",fnAdd);
		function fnAdd(){
			mTween(wrap,{left:left},400,"linear");
			mTween(header,{left:left},400,"linear");
			right.style.zIndex = 1;
			add.style.zIndex = 4;
		}
	};

	(function(){
		var wrap = document.getElementById("hj_wrap");
		var header = document.getElementById("hj_header");
		var add = document.getElementById("hj_add");
		var section = document.getElementById("hj_section");
		var name = section.getElementsByClassName("name")[0];

		var cancel = add.querySelector(".hj_cancel");
		var comfirm = add.querySelector(".hj_comfirm");
		var inputs = add.querySelectorAll("input");
		var as = name.getElementsByTagName("a");
		inputs = [...inputs];
		inputs[0].value = "这不是人";
		inputs[3].value = "也不是数字";

		cancel.addEventListener("touchstart",fnCancel);
		function fnCancel(){
			mTween(wrap,{left:0},400,"linear");
			mTween(header,{left:0},400,"linear",function(){
				inputs.forEach(function(item,i){
					item.value = "";			
				})
			});
		}
		comfirm.addEventListener("touchstart",fnComfirm);
		function fnComfirm(){
			if (!inputs[0].value) {
				alert("内容不可为空");
				return;
			}
			if (inputs[0].value == "这不是人") {
				alert("这不是一个名字");
				return;
			}
			if (!inputs[3].value) {
				alert("电话号码不可为空");
				return;
			}
			//console.log(isNaN((Number(inputs[3].value))));
			if(isNaN((Number(inputs[3].value)))){
				alert("请输入纯数字");
				return;
			}
			section.style.height = section.offsetHeight+(3*60)+"px";
			var ul = document.createElement("ul");
			ul.className = "fNameN";
			var li1 = document.createElement("li");
			li1.innerHTML = "New Tag";
			var li2 = document.createElement("li");
			var a = document.createElement("a");

			a.innerHTML = inputs[0].value;
			li2.appendChild(a);
			ul.appendChild(li1);
			ul.appendChild(li2);
			name.appendChild(ul);
			var newData = {
						name:inputs[0].value,
						phoneNum: inputs[3].value,
						bgd: `hj_img/background${as.length%4+1}.png`
					}
			data.push(newData);
			toRight(document);
			mTween(wrap,{left:0},400,"linear");
			mTween(header,{left:0},400,"linear",function(){
				inputs.forEach(function(item,i){
					item.value = "";			
				})
			});
		}
	})();
	(function(){
		var header = document.getElementById("hj_header");
		var sec = document.getElementById("hj_section");
		//var secTop2 = css(sec,"top");
		sec.addEventListener("touchstart",fnStart,false);
		function fnStart(ev){
			
			var touch = ev.targetTouches[0];
			var startPos = {
						x: touch.pageX - sec.offsetLeft,
						y: touch.pageY - sec.offsetTop
					}

			sec.addEventListener("touchmove",fnMove,false);
			function fnMove(ev){
				var touch = ev.targetTouches[0];
				var movePos = {
						x: touch.pageX,
						y: touch.pageY 
					}
				var secTop = movePos.y - startPos.y;
		
				if(secTop>-30){
					secTop = -30;
				}
				if (secTop<document.documentElement.clientHeight-sec.offsetHeight-30) {
					secTop = document.documentElement.clientHeight-sec.offsetHeight-30
					console.log(sec.offsetHeight);
				}
				sec.style.top = secTop + "px";

			}
			
		}
	})();
})();