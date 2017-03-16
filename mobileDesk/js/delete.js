(function(){
	
	
	
	
	
	
	
	var	oDelete = document.querySelector('.header .delete');
	var header = document.querySelector('.header');
	var sureHeader = document.querySelector('.sureHeader');
	var cancel = document.querySelector('.sureHeader .cancel');
	var ensure = document.querySelector('.sureHeader .ensure');
	var wrap = document.querySelector('#wrap');
	var li = document.querySelectorAll('#wrap .box');
	var arrIndex = [];
	
	oDelete.addEventListener('touchend',fnDelete)
	function fnDelete(){
		header.style.display = 'none';
		sureHeader.style.display = 'block';
		
		for (var i = 0; i < li.length; i++) {
			li[i].tab = false;
			li[i].index = i;
		    li[i].onclick = function()
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
				//console.log(arrIndex);
		    }
		}
	
		ensure.addEventListener('touchend',fnEnsure)
		function fnEnsure(e){
			header.style.display = 'block';
			sureHeader.style.display = 'none';
			
			if (arrIndex.length != 0) {
			    arrIndex = arrIndex.sort(function(a,b){
					return a-b;
				})
				while (arrIndex.length){
					var num = arrIndex.pop();
					(function(num){
						wrap.removeChild(li[num]);
					})(num)
					
					li = document.getElementsByClassName('box')
					for(var i=0;i<li.length;i++){
						li[i].style.left = i % 3 * 5 + 'rem';
						li[i].style.top = Math.floor(i/3) * 5 + 'rem';
					}
				}	
			} 
			for (var i = 0; i < li.length; i++) {
			    li[i].onclick = null;
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
	}
})()









