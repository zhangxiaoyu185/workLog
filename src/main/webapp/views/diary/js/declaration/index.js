// JavaScript Document
var myDate = new Date();

//获取当年的年、月份份,并显示在列表中
var date_array = getDayofWeek(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate()).split('|');
//var date_array = [myDate.Format('yyyy'),myDate.Format('MM'),myDate.Format('dd')];
$(function () {
	
	
	//显示左侧菜单列表
    showMenuList();
    //显示左侧日期
    showYearMonth();
    //公用弹框
    addNewDialogBox();
    
    //按年月查询
    $('.yearMonth_search').on("click",function(){
    	if($('#yearSearch').val().length != 4){
    		alert("请正确输入年份，如'2015'!");
    		return false;
    	}
    	if($('#monthSearch').val().length == 0){
    		alert("请输入月份(1~12)，如'1'或'01'!");
    		return false;
    	}
    	if(parseInt($('#monthSearch').val())>12 || parseInt($('#monthSearch').val())<1){
    		alert("请正确输入月份(1~12)，如'1'或'01'!");
    		return false;
    	}
    	var year = $('#yearSearch').val();
    	var month = $('#monthSearch').val();
    	if(parseInt($('#monthSearch').val())<10){
    		month = "0"+$('#monthSearch').val();
    	}
    	//清除左侧月份选中样式
    	$('.nav-middle-li').each(function(){
			$(this).css("background","#e7e4e4");
		  });
    	$('#monthTask').html(month+'月工作任务：');
    	getMonthTaskList(year,month);
    	getWeekAndDayTaskList(year,month,5,0);
    });
    
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (date_array[0]+'年') && $(this).text() == (date_array[1]+'月')){
			$(this).css("background","#ccc");
		}
	 });
	if(date_array[1]<10){
		date_array[1]='0'+date_array[1];
	}
	$('#monthTask').html(date_array[1]+'月工作任务：');
	$('#weekTask').html('第'+date_array[2]+'周工作任务：');
	getMonthTaskList(date_array[0],date_array[1]);
    getWeekAndDayTaskList(date_array[0],date_array[1],date_array[2],0);
   
	//获取当年的年、月份份,并显示在列表中
//	var date_array = getDayofWeek(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate()).split('|');
	
	
	//点击所选年份，隐藏或显示月份
    $('.p-year').on("click", function() {
//		console.log($(this).attr("showtype"));
		if($(this).attr("showtype") == 'true'){
			$(this).parent(".nav-li").find(".nav-middle").hide();
			$(this).attr('showtype','false');
		}
		else{
			$(this).parent(".nav-li").find(".nav-middle").show();
			$(this).attr('showtype','true');
		}
	});  
	
  //已完成任务点击事件
    $("body").delegate(".p-isfinish","click",function(){
    	var thisbtn = $(this);
		//var uOrR='u';
		var taskType=$(this).attr("taskType");
		var mwId=$(this).attr("data_id");
		var finish_type=2;//默认月任务的完成
		//var remarks_type=1;//默认月任务的完成
		
		if(taskType=="w"){//周任务
			finish_type=3;
			//remarks_type=2;
		}
//		if(uOrR=="u"){
		var r=confirm("是否确认完成？");
		if (r==true){
			$.ajax({
				data:"&ID="+mwId+"&FINISH_TYPE="+finish_type,
				type : "post",  
			    url : urlfile+"main/finishTaskOrProject",
			    processData:false,
			    error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
		            var errorno = XMLHttpRequest.readyState;
		            var oMessage = {
		                "timeout": errorno+"请求超时",
		                "error": errorno+"请求超时",
		                "notmodified": errorno+"请求超时",
		                "parsererror": errorno+"数据格式出错"
		            };
		            if(fnErr){
		                fnErr();
		                return;
		            }
		            if(!textStatus && errorThrown){
		                alert(errorThrown);
		            }
		            if(textStatus){
		                switch (textStatus) {
		                    case "timeout":
		                        alert(oMessage.timeout);
		                        break;
		                    case "parsererror":
		                        alert(oMessage.parsererror);
		                        break;
		                    default:
		                        break;
		                }
		            }
		        },
				success:function(data){
					if(data.code == 1) {
						alert('修改任务完成状态成功!');
						thisbtn.text('√已完成');
						thisbtn.removeClass('p-edit p-isfinish');
						thisbtn.addClass('p-finish');
						thisbtn.parent().find(".modify-btn").remove();
//						thisbtn.parent('.mList-p-note').find('.p-normal').addClass('p-finish2');
					} else {
						alert('修改任务完成状态失败！');
					}
				}		
			}); 
		}
//		}	
	});
    
    //显示上一周的日报
	$(".rightContent").delegate(".pageUp","click",function(){
//		console.log('点击上一周触发:');
		var weekIndex=$(this).attr("week");
		if(weekIndex<=1){return;}
//		console.log('weekIndex:'+$(this).attr("week"));
		getWeekAndDayTaskList($(this).attr("year"),$(this).attr("month"),weekIndex,-1);
	});
	
    //显示下一周的日报
	$(".rightContent").delegate(".pageDown","click",function(){
//		console.log('点击下一周触发:');
		var weekIndex=$(this).attr("week");
		if(weekIndex>5){return;}
		if(date_array[0]==$(this).attr("year")&& date_array[1]==$(this).attr("month") && date_array[2]==weekIndex){//判断当前周时，点击下一周不请求后台数据
			alert('本周未过完-下周未到来!');
			return;
		}
//		console.log('weekIndex:'+$(this).attr("week"));
		getWeekAndDayTaskList($(this).attr("year"),$(this).attr("month"),weekIndex,1);
	});
	
	//鼠标拂过表格显示备注内容
	$('body').delegate(".tr-showRemarks","mouseover", function(e) {
		var remarks=$(this).find(".reply-btn").attr("data-strRemarks");
		showremark(remarks,$(this));

	});
	$('body').delegate(".tr-showRemarks","mouseout", function(e) {
		removeremark($(this));
	});
	
	//删除按钮点击事件
	$('body').delegate(".del-btn","click", function() {
		var bool = confirm("您确定要删除吗?");
        if(!bool){
            return false;
        }
        var thisbtn = $(this);
        var dayTaskId=thisbtn.attr('dayTaskId');
        $.ajax({
    		data:"&DAYTASK_ID="+dayTaskId,
    		type : "post", 
    		async: false,
    	    url : urlfile+"worklog/deleteDayTask",
    	    processData:false,
    	    error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
                var errorno = XMLHttpRequest.readyState;
                var oMessage = {
                    "timeout": errorno+"请求超时",
                    "error": errorno+"请求超时",
                    "notmodified": errorno+"请求超时",
                    "parsererror": errorno+"数据格式出错"
                };
                if(fnErr){
                    fnErr();
                    return;
                }
                if(!textStatus && errorThrown){
                    alert(errorThrown);
                }
                if(textStatus){
                    switch (textStatus) {
                        case "timeout":
                            alert(oMessage.timeout);
                            break;
                        case "parsererror":
                            alert(oMessage.parsererror);
                            break;
                        default:
                            break;
                    }
                }
            },
    		success:function(data){
    			if(data.code == 1) {
    				alert('删除成功!');
    				window.location.reload();
    			} else {
    				alert('删除失败!');
    			}
    		}		
    	});
		
	}); 
	
	//下拉选择框
	$(".select-item").unbind().click(function(){
		var thisinput=$(this);
		var thisul=$(this).parent().find("ul");
		if(thisul.css("display")=="none"){
			if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });}
			thisul.fadeIn("100");
			thisul.hover(function(){},function(){thisul.fadeOut("100");});
			thisul.find("li").unbind().click(function(){thisinput.val($(this).text());
			thisul.fadeOut("100");}).hover(function(){$(this).addClass("select-hover");},		
			function(){$(this).removeClass("select-hover");});
		}
		else{
			thisul.fadeOut("fast");
		}
	});
	
	//月份点击事件
	$('.nav-middle-li').on("click",function(){
		$('.nav-middle-li').each(function(){
			$(this).css("background","#e7e4e4");
		  });
		$(this).css("background","#ccc");
		var cur_year = $(this).parent().prev().text().replace("年", "");
		var cur_month = $(this).find('p').text().replace("月", "");
		$('#monthTask').html(cur_month+'月工作任务：');
		//获取月、周任务
		getMonthTaskList(cur_year,cur_month);
		
		if(cur_year==date_array[0] && cur_month==parseInt(date_array[1])){
//			var week=getDayofWeek(cur_year,cur_month,myDate.getDate()).split('|');
			getWeekAndDayTaskList(cur_year,cur_month,date_array[2],0);
		}else {
			getWeekAndDayTaskList(cur_year,cur_month,5,0);
		}
	});
});


function getMonthTaskList(year,month) { 
//	console.log(date_array[0]+'=='+year +';'+ date_array[1]+'=='+month);
//	if(date_array[0]==year && date_array[1]==parseInt(month)){
	if(myDate.Format('yyyy') == year && myDate.Format('MM') == month){
		$(".monthAssignment-btn").attr("disabled",false);
		$(".monthAssignment-btn").css("background-color","#fba014");
	}else{
		$(".monthAssignment-btn").attr("disabled","disabled");
		$(".monthAssignment-btn").css("background-color","#cccccc");
	}
	$.ajax({
		data:"&USERCODE="+sessionStorage.getItem("code")+"&YEAR="+year+"&MONTH="+month,
		type : "post",  
	    url : urlfile+"worklog/monthTaskList",
	    processData:false,
	    error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
            var errorno = XMLHttpRequest.readyState;
            var oMessage = {
                "timeout": errorno+"请求超时",
                "error": errorno+"请求超时",
                "notmodified": errorno+"请求超时",
                "parsererror": errorno+"数据格式出错"
            };
            if(fnErr){
                fnErr();
                return;
            }
            if(!textStatus && errorThrown){
                alert(errorThrown);
            }
            if(textStatus){
                switch (textStatus) {
                    case "timeout":
                        alert(oMessage.timeout);
                        break;
                    case "parsererror":
                        alert(oMessage.parsererror);
                        break;
                    default:
                        break;
                }
            }
        },
		success:function(data){
			if(data.code == 1) {
				var commonMT='';
				if(data.data[0] == undefined) {
					$("#mList").html(commonMT);
					return;
				}else{
					var y = 1;
					$.each(data.data, function(i, item) {	
						commonMT+='<li class="mList-li">'+
	                        '<p class="mList-p-note">';
	                        
	                        commonMT+='<span class="p-normal">';
	                        if(item.type=='0'){
								commonMT+='<span style="color:red">*</span>';
							}
	                        else{
	                        	commonMT+='<span>&nbsp;&nbsp;</span>';
							}
	                        commonMT+='<span>'+y+'、</span>'+
								'<span class="week-start">'+item.startTime+'</span>'+
								'<span> - </span>'+
								'<span class="week-end">'+item.endTime+'</span>'+
								'<span>&nbsp;</span>'+
								'<span class="week-proname" title="'+item.projectName+'">'+item.projectName + '</span>'+
								'<span>，</span>'+
								'<span class="week-content" title="'+item.content+'">'+item.content + '</span>'+
							'</span>';
	                        commonMT+='<span class="p-edt">';
						if(item.status=='0'){
							commonMT+='<span class="p-edit p-isfinish" taskType="m" data_id="'+item.id+'" >完成</span>';
						}else{
							commonMT+='<span class="p-finish">√已完成</span>';
						}
						commonMT+='<span class="p-edit showbtn remark-btn monthRemarks"  remarksId="'+item.id+'" remarksType="M"  data-remarks="'+item.remarks+'">备注</span>';
						commonMT+='</span>';
						commonMT+='</p></li>';
						y++;
			        });
					$("#mList").html(commonMT);
					//限制文字显示，省略号
					$(".week-proname").each(function(){
				    	var thistext=$(this);
				    	limitShow(8,thistext);
					});
					$(".week-content").each(function(){
				    	var thistext=$(this);
				    	limitShow(20,thistext);
					});
				}
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

function getWeekAndDayTaskList(year,month,week,type) {
//	console.log(date_array[0]+'=='+year +';'+ date_array[1]+'=='+month+';'+date_array[2]+'=='+week);
	var pramer="&USERCODE="+sessionStorage.getItem("code")+"&YEAR="+year+"&MONTH="+month+"&TYPE="+type+"&WEEK="+week+"&NOW_WEEK="+date_array[2];
	$.ajax({
		data:pramer,
		type : "post",
	    url : urlfile+"worklog/weekAndDayTaskList",
	    processData:false,
	    error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
            var errorno = XMLHttpRequest.readyState;
            var oMessage = {
                "timeout": errorno+"请求超时",
                "error": errorno+"请求超时",
                "notmodified": errorno+"请求超时",
                "parsererror": errorno+"数据格式出错"
            };
            if(fnErr){
                fnErr();
                return;
            }
            if(!textStatus && errorThrown){
                alert(errorThrown);
            }
            if(textStatus){
                switch (textStatus) {
                    case "timeout":
                        alert(oMessage.timeout);
                        break;
                    case "parsererror":
                        alert(oMessage.parsererror);
                        break;
                    default:
                        break;
                }
            }
        },
		success:function(data){
			var pageHtml='';
//			console.log(data);
			if(data.code == 2){
				pageHtml='';
//				console.log(date_array[0]+'=='+year +';'+ date_array[1]+'=='+month+';'+date_array[2]+'=='+week);
				if(date_array[0]==year && date_array[1]==parseInt(month) && ((parseInt(date_array[2])==parseInt(data.data.week)) || (parseInt(data.data.week)==0))){
					$(".newAssignment-btn").attr("disabled",false);
					$(".newAssignment-btn").css("background-color","#fba014");
				}else{
					$(".newAssignment-btn").attr("disabled","disabled");
					$(".newAssignment-btn").css("background-color","#cccccc");
				}
				if(type==0 && week==5 && data.data.week==0){
//					$(".rightContent").html('');
					$("#wList").html('');
					$(".dayGroup").html('');
					$('.pageUp').remove();
					$('.pageDown').remove();
				}
//				$("#wList").html('');
//				$(".dayGroup").html('');
				if(type == -1){
					alert('上周无工作任务');
				}/*else if(type == 0){
					alert('本周无工作任务');
				}*/
				else if(type == 1){
					alert('下周无工作任务');
				}
			}else if(data.code == 1) {
				$('.pageUp').remove();
				$('.pageDown').remove();
				if(date_array[0]==year && date_array[1]==month && week==5 && data.data.week==0){
					pageHtml = "";
				}else if(data.data.week==1){
					pageHtml = '<span class="p-edit margin-tb pageDown" year="'+year+'" month="'+month+'"  week="'+data.data.week+'">下一周</span>';
				}else{//当周任务和日报任意有数据，上下周都显示
					pageHtml='<span class="p-edit margin-tb pageUp" year="'+year+'" month="'+month+'"  week="'+data.data.week+'">上一周</span>'+'&nbsp;&nbsp;&nbsp;&nbsp;'+
					'<span class="p-edit margin-tb pageDown" year="'+year+'" month="'+month+'"  week="'+data.data.week+'">下一周</span>';
				}
				var boolWT=true;
				var boolDT=true;
				var commonWT='';
				var w=0;//周计划序号
//				console.log("周："+data.data.week);
				if(data.data.weekTaskVOList.length>0) {
					$.each(data.data.weekTaskVOList, function(i, item) {
						w++;
						commonWT+='<li class="mList-li">'+
											'<p class="mList-p-note">'+
											'<span class="p-normal">'+
												'<span>'+w+'、</span>'+
												'<span class="week-start">'+item.startTime+'</span>'+
												"<span> - </span>"+
												'<span class="week-end">'+item.endTime+'</span>'+
												'<span>&nbsp;</span>'+
												'<span class="week-proname" title="'+item.projectName+'">'+item.projectName+'</span>'+
												'<span>，</span>'+
												'<span class="week-content" title="'+item.content+'">'+item.content + '</span>'+
											'</span>';
						commonWT+='<span class="p-edt">';
						
						if(item.status=='0'){
							commonWT+='<span class="p-edit p-isfinish" taskType="w" data_id="'+item.id+'">完成</span>';
							if(date_array[0]==year && date_array[1]==parseInt(month) && date_array[2]==parseInt(data.data.week)){
								commonWT+='<span class="p-edit showbtn modify-btn weekTask" taskType="WT" data_id="'+item.id+'" projectId="'+item.projectId+'" sequence="'+w+'" >修改</span>';
							}
						}else{
							commonWT+='<span class="p-finish">√已完成</span>';
						}
						commonWT+='<span class="p-edit showbtn remark-btn weekRemarks" remarksId="'+item.id+'" remarksType="W" data-remarks="'+item.remarks+'">备注</span>';
						commonWT+='</span>';
						commonWT+='</p></li>';
			        });
			        $("#wList").html(commonWT);
					//限制文字显示，省略号
					$(".week-proname").each(function(){
				    	var thistext=$(this);
				    	limitShow(8,thistext);
					});
					$(".week-content").each(function(){
				    	var thistext=$(this);
				    	limitShow(20,thistext);
					});
				}else{
					$("#wList").html(commonWT);
				}
				var commonDT='';
				if(data.data.dayTaskVOList[0].workdate== undefined) {
					$(".dayGroup").html(commonDT);
				}else{
					$.each(data.data.dayTaskVOList, function(i, item) {
						var now = $.trim(curentTime());
						var daysDiff=DateDiff(item.workdate,now);
//						console.log(daysDiff);
						commonDT+="<div class='reportBox'><p class='p-blue'>"+item.workdate+"</p>"+
								        	"<div class='tableBox clear'>";
			        	var completedList="<table class='tb-half float-left'>"+
									        	"<thead class='tb-head'>"+
										    		"<tr>"+
										    		  "<th colspan='7'>今日已完成</th>"+
										    		"</tr>"+
										    	"</thead>"+
										    	"<tbody class='tb-body'>"+
										    		"<tr>"+
										    			"<td width='10%'>序号</td>"+
										    			"<td width='12%'>项目</td>"+
										    			"<td width='30%'>内容</td>"+
										    			"<td width='10%'>上传/确认用时</td>"+
										    			"<td width='14%'>上传日期</td>"+
										    			"<td width='10%'>确认</td>"+
										    			"<td width='14%'>操作</td>"+
										    		"</tr>";
			        	var unfinishedList="<table class='tb-half float-left'>"+
									        	"<thead class='tb-head'>"+
										    		"<tr>"+
										    			"<th colspan='7'>今日未完成</th>"+
										    		"</tr>"+
										    	"</thead>"+
										    	"<tbody class='tb-body'>"+
											    	"<tr>"+
												    	"<td width='10%'>序号</td>"+
												    	"<td width='12%'>项目</td>"+
												    	"<td width='30%'>内容</td>"+
												    	"<td width='10%'>上传/确认用时</td>"+
										    			"<td width='14%'>上传日期</td>"+
										    			"<td width='10%'>确认</td>"+
												    	"<td width='14%'>操作</td>"+
											    	"</tr>";
				    	var c_l=0;
				        var c_r=0;
			        	for (var i = 0; i < item.voList.length; i++) {
			        		if(item.voList[i].status=='1'){
			        			c_l++;
			        			completedList+='<tr class="tr-showRemarks">'+
										        				'<td>'+c_l+'</td>'+
										        				'<td>'+item.voList[i].projectName+'</td>'+
										        				'<td>'+item.voList[i].content+'</td>'+
										        				'<td>'+item.voList[i].usedtimes+'/<span class="p-red">'+item.voList[i].confirmtimes+'</span>小时</td>'+
										        				'<td>'+item.voList[i].adddate+'</td>';
		        				if(item.voList[i].isconfirm == 1){
		        					completedList += '<td><span class="p-purple">未确认</span></td>';
								}else if(item.voList[i].isconfirm == 2){
									completedList += '<td><span class="p-red">已确认</span></td>';
								}else{
									completedList += '<td></td>';
								}
		        				completedList+='<td>';
					        	if(daysDiff==1){
					        		completedList+='<button class="btn-blue showbtn modify-btn dayTask" projectId="'+item.voList[i].projectId+'" projectName="'+item.voList[i].projectName+'" content="'+item.voList[i].content+'" usedtimes="'+item.voList[i].usedtimes+'" taskType="DT" data_id="'+item.voList[i].id+'" data-strRemarks="'+item.voList[i].strRemarks+'" status="'+item.voList[i].status+'" data-workdate="'+item.voList[i].workdate+'" dayTaskId="'+item.voList[i].id+'" >修改</button>'+
					        						'<button class="btn-blue del-btn" dayTaskId="'+item.voList[i].id+'" >删除</button>';
					        	}else{
					        		completedList+='<button class="btn-blue showbtn reply-btn" projectId="'+item.voList[i].projectId+'" projectName="'+item.voList[i].projectName+'" dayTaskId="'+item.voList[i].id+'" data-userId="'+item.voList[i].usercode+'" data-strRemarks="'+item.voList[i].strRemarks+'" data-workdate="'+item.voList[i].workdate+'" >备注</button>';
					        	}
					        	completedList+='</td></tr>';
			        		}else{
			        			c_r++;
			        			unfinishedList+='<tr class="tr-showRemarks">'+
											        			'<td>'+c_r+'</td>'+
										        				'<td>'+item.voList[i].projectName+'</td>'+
										        				'<td>'+item.voList[i].content+'</td>'+
										        				'<td>'+item.voList[i].usedtimes+'/<span class="p-red">'+item.voList[i].confirmtimes+'</span>小时</td>'+
										        				'<td>'+item.voList[i].adddate+'</td>';
		        				if(item.voList[i].isconfirm == 1){
		        					unfinishedList += '<td><span class="p-purple">未确认</span></td>';
								}else if(item.voList[i].isconfirm == 2){
									unfinishedList += '<td><span class="p-red">已确认</span></td>';
								}else{
									unfinishedList += '<td></td>';
								}
		        				unfinishedList+='<td>';
			        			if(daysDiff==1){
			        				unfinishedList+='<button class="btn-blue showbtn modify-btn dayTask" projectId="'+item.voList[i].projectId+'" projectName="'+item.voList[i].projectName+'" content="'+item.voList[i].content+'" usedtimes="'+item.voList[i].usedtimes+'" taskType="DT" data_id="'+item.voList[i].id+'" data-strRemarks="'+item.voList[i].strRemarks+'" status="'+item.voList[i].status+'" data-workdate="'+item.workdate+'" dayTaskId="'+item.voList[i].id+'" >修改</button>'+
			        								'<button class="btn-blue del-btn" dayTaskId="'+item.voList[i].id+'" >删除</button>';
			        			} else{
					        		unfinishedList+='<button class="btn-blue showbtn reply-btn" projectId="'+item.voList[i].projectId+'" dayTaskId="'+item.voList[i].id+'" data-userId="'+item.voList[i].usercode+'" data-strRemarks="'+item.voList[i].strRemarks+'" data-workdate="'+item.voList[i].workdate+'">备注</button>';
					        	}
			        			unfinishedList+='</td></tr>';
			        		}
			        		
			        	}
			        	commonDT=commonDT+completedList+"</tbody></table>"+unfinishedList+"</tbody></table>";
			        	commonDT += '</div></div>';
						
					});
//					console.log("最大周:"+data.data.week);
			        $(".dayGroup").html(commonDT);
				}
				$('#weekTask').html('第'+data.data.week+'周工作任务：');
				if(date_array[0]==year && date_array[1]==parseInt(month) && date_array[2]==parseInt(data.data.week)){
					$(".newAssignment-btn").attr("disabled",false);
					$(".newAssignment-btn").css("background-color","#fba014");
				}else{
					$(".newAssignment-btn").attr("disabled","disabled");
					$(".newAssignment-btn").css("background-color","#cccccc");
				}
				$('.lastnext_weekBox').html(pageHtml);  
				return;
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//判断下一个日报日否存在，存在返回1；否则返回0
//function getnextDayTaskList(usercode,year,month,week,fn){
////	console.log(usercode+":"+year+month+week);
//	if(week==0){
//		fn && fn(0);
//		return;
//	}
//	var params="&USERCODE="+usercode+"&YEAR="+year+"&MONTH="+month+"&WEEK="+week+"&TYPE=0";
////	if(week!=''){
////		params="";
////	}
//	$.ajax({
//		data:params,
//		type : "post",  
//	    url : urlfile + "worklog/weekAndDayTaskList",
//		processData:false,
//		error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
//		var errorno = XMLHttpRequest.readyState;
//		var oMessage = {
//		    "timeout": errorno+"请求超时",
//		    "error": errorno+"请求超时",
//		    "notmodified": errorno+"请求超时",
//		    "parsererror": errorno+"数据格式出错"
//		};
//		if(fnErr){
//		    fnErr();
//		    return;
//		}
//		if(!textStatus && errorThrown){
//		    alert(errorThrown);
//		}
//		if(textStatus){
//		    switch (textStatus) {
//		        case "timeout":
//		            alert(oMessage.timeout);
//		            break;
//		        case "parsererror":
//		            alert(oMessage.parsererror);
//		            break;
//		        default:
//		            break;
//		    }
//		}
//		},
//		success:function(data){
//			if(data.code == 1) {
//				var length = 0;
//                if(data.data.weekTaskVOList.length<=0){
//                	length = 0;
//                }
//                else{
//                	length = 1;
//                }
//                fn && fn(length);
//			} else {
//				alert(data.errMsg);
//			}
//		}		
//	}); 
//	return length;
//}

function updateOrNoteMonthTask(monthTaskId,uOrR,monOrWeek){
	var finish_type=2;//默认月任务的完成
	//var remarks_type=1;//默认月任务的完成
	
	if(monOrWeek=="w"){//周任务
		finish_type=3;
		//remarks_type=2;
	}
	if(uOrR=="u"){
		$.ajax({
			data:"&ID="+monthTaskId+"&FINISH_TYPE="+finish_type,
			type : "post",  
		    url : urlfile+"main/finishTaskOrProject",
		    processData:false,
		    error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
	            var errorno = XMLHttpRequest.readyState;
	            var oMessage = {
	                "timeout": errorno+"请求超时",
	                "error": errorno+"请求超时",
	                "notmodified": errorno+"请求超时",
	                "parsererror": errorno+"数据格式出错"
	            };
	            if(fnErr){
	                fnErr();
	                return;
	            }
	            if(!textStatus && errorThrown){
	                alert(errorThrown);
	            }
	            if(textStatus){
	                switch (textStatus) {
	                    case "timeout":
	                        alert(oMessage.timeout);
	                        break;
	                    case "parsererror":
	                        alert(oMessage.parsererror);
	                        break;
	                    default:
	                        break;
	                }
	            }
	        },
			success:function(data){
				if(data.code == 1) {
					window.location.reload();
				} else {
					alert(data.errMsg);
				}
			}		
		}); 
	}
}

//当前日期
function curentTime(){ 
    var now = new Date();
   
    var year = now.getFullYear();       //年
    var month = now.getMonth() + 1;     //月
    var day = now.getDate();            //日
   
    var clock = year + "-";
   
    if(month < 10)
        clock += "0";
   
    clock += month + "-";
   
    if(day < 10)
        clock += "0";
       
    clock += day;
   
    return(clock); 
} 

function getDaysInOneMonth(year, month){
	month = parseInt(month, 10);  
	var d= new Date(year, month, 0);  
	return d.getDate();  
} 

