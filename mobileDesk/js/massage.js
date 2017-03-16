(function(){
	var mass = document.getElementById('Xx');
	var Dxs = document.getElementById('Dxs');
	var lis = Dxs.getElementsByTagName('li');
	var Dhk = document.getElementById('Dhk');
	var textArea = document.querySelector('.Bright textarea');
	
	var nub = 0;
	
	var sec_One = document.getElementById('sec_One');
	var sec_Two = document.getElementById('sec_Two');
	var back = document.querySelectorAll('#sec_Two a')[0];
	var fs = document.querySelector('.Bright .fs');
	console.log(name)
	create();
	create();
	create();
	create();
	var lis = Dxs.getElementsByTagName('li');
	
	mass.onclick = function(){
		create();
		edit();
		
	};
	
	function create(){
		nub++;
		var li = document.createElement('li');
		li.className = 'Dx clearFix';
		li.onclick = function(){
			sec_One.style.display = 'none';
			sec_Two.style.display = 'block';
			Dhk.innerHTML = '';
		}
		var chose = document.createElement('div');
		chose.className = 'chose';
		var section = document.createElement('section');
		section.className = 'sections';
		var strong = document.createElement('strong');
		strong.innerHTML = 10086 + nub;
		
		
		var span1 = document.createElement('span');
		span1.innerHTML = '上午    11：08〉';
		var span2 = document.createElement('span');
		span2.innerHTML = '[百度] 亲爱的，您有一张9.88元现金红包，还有一天过期，充10元话费享立减';
		var span3 = document.createElement('span');
		span3.className = 'photo';
		
		section.appendChild(strong);
		section.appendChild(span1);
		section.appendChild(span2);
		
		li.appendChild(chose);
		li.appendChild(section);
		li.appendChild(span3);
		
		Dxs.appendChild(li);
		
	}
	
	function edit(){
		var left = document.getElementById('left');
		var edit = left.children;
		var lis = Dxs.children;
		var chose =Dxs.getElementsByTagName('div');
		var del = document.querySelector('.del');
		var add = document.querySelector('.add');
		var isTab = true;
		var colorTab = false;
		arrL = Array.from(lis);
		
		left.addEventListener('click',fnClick);
		
		function fnClick(){
			if (isTab) {
				for(var i=0; i<chose.length; i++){
					chose[i].style.background = '';
					
				}
				
				edit[0].style.display = 'none';
				edit[1].style.display = 'block';
				add.style.display = 'none';
				del.style.display = 'block';
				
				for(var i=0; i<chose.length; i++){
					chose[i].index = i;
					chose[i].style.display = 'block';
					chose[i].onclick = function(e){
						if (this.style.background == '') {
								this.style.background = 'orangered';
								this.setAttribute('mark',1)
							} else{
								this.style.background = '';
								this.removeAttribute('mark')
						}
						e.cancelBubble = true
					}
					
				}
				
				del.onclick = function(){
					for(var i=0; i<chose.length; i++){
						if (chose[i].getAttribute('mark') == 1) {
							Dxs.removeChild(lis[i]);
							i -= 1;
						}
					}
				};
				
			}else{
				edit[0].style.display = 'block';
				edit[1].style.display = 'none';
				add.style.display = 'block';
				del.style.display = 'none';
				
				for(var i=0; i<chose.length; i++){
					chose[i].style.display = 'none';
					//chose[i].addEventListener('click',choseClick)
					
				}
			}
			isTab = !isTab;
		};
			
	};
	
	back.onclick = function(){
		sec_One.style.display = 'block';
		sec_Two.style.display = 'none';
	};
	
	fs.onclick=function(){
		
		var Dhk = document.getElementById('Dhk');
		var textArea = document.querySelector('.Bright textarea');
		var name = document.querySelector('#sec_Two #header span');
		var listName = document.querySelector('strong');
		var val = textArea.value;
		var div1 = document.createElement('div');
		var div2 = document.createElement('div');
		var p = document.createElement('p');
		var span = document.createElement('span');
		name.innerHTML = listName.innerHTML;
		
		div1.className = 'clear';
		div2.className = 'Right';
		span.className = 'wbt';
		p.innerHTML = val;
		div2.appendChild(p);
		div2.appendChild(span);
		div1.appendChild(div2);
		Dhk.appendChild(div1);
		textArea.value = '';
	}
	
})()
	



