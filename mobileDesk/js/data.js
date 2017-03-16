(function(){
var h4=document.querySelector("#g_box h4");
var selects=document.querySelectorAll(".g_sel select");


//设置日期内容
var d=new Date();
h4.innerHTML=''+d.getFullYear()+'年'+format(d.getMonth()+1)+'月'+format(d.getDate())+'日 星期'+formatWeek(d.getDay())+'';


//生成年份（复制以前的）
var yearHtml='';
for(var i=2030;i>=1970;i--){
	//如果这个条件成立，说明循环的的i与现在的年份是相等的，我们要让它选中，不成立就不选中
	if(i==d.getFullYear()){
		yearHtml+='<option selected>'+i+'</option>';
	}else{
		yearHtml+='<option>'+i+'</option>';
	}
}

selects[0].innerHTML=yearHtml;
selects[0].onchange=function(){
	calendar(this.value,selects[1].value-1);
}


//生成月份（复制以前的）
var monthHtml='';
for(var i=12;i>=1;i--){
	if(i==d.getMonth()+1){
		monthHtml+='<option selected>'+format(i)+'</option>';
	}else{
		monthHtml+='<option>'+format(i)+'</option>';
	}
	
}
selects[1].innerHTML=monthHtml;
selects[1].onchange=function(){
	calendar(selects[0].value,this.value-1);
};


//生成日历（复制以前的）
calendar(selects[0].value,selects[1].value-1);
function calendar(year,month){
	var div=document.querySelector("#g_date div");
	var d=new Date();
	function getTottalDays(year,month){
		return new Date(year,month+1,0).getDate();
	}
	
	function getWeek(year,month){
		return new Date(year,month,1).getDay();
	}
	
	function getLastDay(year,month){
		return new Date(year,month,0).getDate();
	}
	
	var totalDays=getTottalDays(year,month);
	var week=getWeek(year,month);
	var rows=Math.ceil((totalDays+week)/7);
	
	var str='';
	
	var lastDay=getLastDay(year,month);
	var nextDay=0;
	console.log(lastDay);
	for(var i=0;i<42;i++){
		if(i<week){
		/*
		 * 这个条件成立的话，代表要显示上个月的时间，让它为灰色
		 * 当月时间开始的位置，是由这个月第一天的星期决定的，如果在星期之前就是上个月的日期
		 * 上个月的时间要倒着显示，所以把str加在字符串的后面
		 */
		//前面的灰色部分
			str='<span style="color:#ccc">'+lastDay--+'</span>'+str;
		}else if(i>=totalDays+week){
			/*
			 * totalDays+week表示，上个月的日期加上当月的日期表示一共占了多少日期，如果i的值还大于它们的话，表示要显示下个月的日期了，下个月的日期都是从1开始，所以声明了一个变量从1开始加，剩多少加多少
			 */
			nextDay++;
			str+='<span style="color:#ccc">'+nextDay+'</span>';
		//后面灰色的部分
		
		}else{
			/*
			 * 除去上面的两个条件，剩下的就是当月日期，当月日期从哪里开始，由它的第一天的星期决定的，所以在开始的位置要减去上个月的时间，因为i是从0开始循环的，所以要加个1
			 */
		//中间的当月日期部分
		var cl=(i+1-week)==d.getDate()?'active':'';
			str+='<span class="'+cl+'">'+(i+1-week)+'</span>';
		}
	}
	
	
	div.innerHTML=str;
}


function format(v){
	return v<10?'0'+v:''+v;
}
function formatWeek(v){
	return ['日','一','二','三','四','五','六'][v]
				}
			
})()
