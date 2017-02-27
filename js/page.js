// JavaScript Document
/*****************数据改变  ul 不变*************/
//根据数据写入 li
clipInit=function (){
	$.ajax({
		type: "get",
		url: "https://api.schedule.lntu.org/room/v1/sms-log",
		dataType: 'json',
		data:{
			"cpp":7,
			"page":1
		},
		success: function (obj) {
			//console.log(obj);
			pageCon=obj.page_count;   //可更改
			liTab=obj.page_count>5?5:obj.page_count;    //可更改
			medCur=Math.ceil(liTab/2);
			var str="";
			str+="<ul>";
			str+="<li class='disbled' id='firstPage' onclick='FirstPage()'>首页</li>";
			str+="<li class='disbled' id='lastPage' onclick='LastPage()'>上一页</li>";
			str+="<div id='pageU' class='fl'>";
			if(liTab<=pageCon){
				for(var i=1;i<=liTab;i++){
					str+="<li id='clip"+i+"' onclick='pageInt(&#039;clip"+i+"&#039;,&#039;"+liTab+"&#039;,&#039;"+medCur+"&#039;)'>"+i+"</li>";
				}
			}else{
				for(var i=1;i<=pageCon;i++){
					str+="<li id='clip"+i+"' onclick='pageInt(&#039;clip"+i+"&#039;,&#039;"+pageCon+"&#039;,&#039;"+medCur+"&#039;)'>"+i+"</li>";
				}
			}
			str+="<li class='clear'></li>";
			str+="</div>";
			str+="<li class='BORDER' id='nextPage' onclick='NextPage()'>下一页</li>";
			str+="<li class='BORDER' id='endPage' onclick='EndPage()' style='border-right:1px solid #ccc'>尾页</li>";
			str+="<li class='clear'></li>";
			str+="</ul>";
			$("#clipDIV").html(str);
			pageInt('clip1',pageCon,medCur);
		},
		error: function (a) {

		}
	});
}
//设置当点击的值小于预设固定值
//单击事件  选择页数
clipPage=function (cur,page){
	var str="";
	for(var i=1;i<=page;i++){
		var liId="clip"+i;
		if(cur==i){
			$("#"+liId).attr("class","curPage");
		}else{
			$("#"+liId).attr("class","BORDER");
		}
		$("#"+liId).text(i);
	}
	pageControl(cur);
}
//设置的中转站，根据获取的值更改操作
pageInt=function (obj,page,medCur){
	var value=parseInt($("#"+obj).text());
	if(value < medCur){
		clipPage(value,page);
	}else if(value >= medCur){
		clipPageMax(value,page,medCur);
	}
}
//设置当获取的值大于预设固定值
clipPageMax=function (cur,page,medCur){
	var str="";
	var startNum=cur-medCur+1;
	var maxPage=startNum+parseInt(page)-1;
	if(maxPage<pageCon){
		for(var i=1;i<=page;i++){
			var liId="clip"+i;
			if(medCur==i){
				$("#"+liId).attr("class","curPage");
			}else{
				$("#"+liId).attr("class","BORDER");
			}
			$("#clip"+i).text(startNum);
			startNum++;
		}
	}else{
		var end = new RegExp(/\d+$/);
		var page=parseInt(end.exec(page));
		var curT=cur-pageCon+page;
		var maxP=pageCon;
		for(var i=page;i>=1;i--){
			var liId="clip"+i;
			if(curT==i){
				$("#"+liId).attr("class","curPage");
			}else{
				$("#"+liId).attr("class","BORDER");
			}
			$("#"+liId).text(maxP);
			maxP--;
		}
		
	}
	pageControl(cur);
}
//首页，尾页，上一页，下一页 的样式


function getData(page){
	$.ajax({
		type: "get",
		url: "https://api.schedule.lntu.org/room/v1/sms-log",
		dataType: 'json',
		data:{
			"cpp":7,
			"page":page
		},
		success: function (obj) {
			console.log(obj);
			for(var i = 0;i < obj.data.length;i++){
				var str="";
				str+="<tr><td>";
				str+=obj.data[i].sms_content;
				str+="</td><td>";
				str+=obj.data[i].building_name;
				str+="</td><td>";
				str+=obj.data[i].building_phone;
				str+="</td><td>";
				str+=obj.data[i].room_status.week;
				str+="</td><td>";
				str+=obj.data[i].room_status.weekday;
				str+="</td><td>";
				var m = obj.data[i].create_at.length;
				var n = obj.data[i].create_at.indexOf('T');
				var n1 = obj.data[i].create_at.substring(n,m)
				str+=obj.data[i].create_at.replace(n1,"");
				str+="</td><td style='position: relative'>";
				str+="<a style='cursor: pointer;color: #00f' onclick='$(\".rooms\").css(\"display\",\"none\");$(this).parent().find(\".rooms\").show()'>点击查看</a>";
				str+="<div class='rooms' style='z-index: 1111;width: 180px; '><ul><li onclick='$(this).parent().parent().hide()'><img align='right' style='width: 20px;margin-left:5px;margin-bottom: 3px' src='../img/close.png'></li><li style='clear:both'></li>";

				for(var j = 0;j<obj.data[i].room_status.results.length;j++){
					str+="<li>";
					str+=obj.data[i].room_status.results[j].name;
					str+=" : ";
					for(var k = 0;k<obj.data[i].room_status.results[j].status.length;k++){
						str+=obj.data[i].room_status.results[j].status[k]
					}
					str+="</li>";
				}

				str+="</ul></div>";
				str+="</td></tr>";
				$(".tContent").append(str);
			}
		},
		error: function (a) {

		}
	});
}

pageControl=function (cur){
	$(".tContent").html("");
	getData(cur);
	if(cur==1){
		$("#firstPage").attr("class","disbled");
		$("#lastPage").attr("class","disbled");
		$("#nextPage").attr("class","BORDER");
		$("#endPage").attr("class","BORDER");
	}else if(cur==pageCon){
		$("#firstPage").attr("class","BORDER");
		$("#lastPage").attr("class","BORDER");
		$("#nextPage").attr("class","disbled");
		$("#endPage").attr("class","disbled");
	}else{
		$("#firstPage").attr("class","BORDER");
		$("#lastPage").attr("class","BORDER");
		$("#nextPage").attr("class","BORDER");
		$("#endPage").attr("class","BORDER");
	}
}
//第一页 显示
FirstPage=function (){
	var forNum=parseInt(liTab);
	clipPage(1,forNum);
}
//尾页 显示
EndPage=function (){
	var maxV=parseInt(pageCon);
	clipPageMax(maxV,liTab,medCur);
}
//上一页 显示
LastPage=function (){
	var choice=$(".curPage").attr('id');
	var obj=$("#"+choice).prev().attr('id');
	pageInt(obj,liTab,medCur);
}
//下一页 显示
NextPage=function (){
	var choice=$(".curPage").attr('id');
	var obj=$("#"+choice).next().attr('id');
	pageInt(obj,liTab,medCur);
}

