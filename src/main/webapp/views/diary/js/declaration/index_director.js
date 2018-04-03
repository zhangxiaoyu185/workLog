// JavaScript Document

var myDate = new Date();
//获取当年的年、月份份,并显示在列表中
//var date_array = getDayofWeek(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate()).split('|');
var date_array = [myDate.Format('yyyy'),myDate.Format('MM'),myDate.Format('dd')];

$(function(){
	
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
    	getMonthProjectList(year,month);
    });
    
	getMonthProjectList(date_array[0],date_array[1]);
	
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (date_array[0]+'年') && $(this).text() == (date_array[1]+'月')){
			$(this).css("background","#ccc");
		}
	  });
	
	//点击所选年份，隐藏或显示月份
    $('.p-year').on("click", function() {
		if($(this).attr("showtype") == 'true'){
			$(this).parent(".nav-li").find(".nav-middle").hide();
			$(this).attr('showtype','false');
		}
		else{
			$(this).parent(".nav-li").find(".nav-middle").show();
			$(this).attr('showtype','true');
		}
	}); 
    
	//月份点击事件
	$('.nav-middle-li').on("click",function(){
		var cur_year = $(this).parent().prev().text().replace("年", "");
		var cur_month = $(this).find('p').text().replace("月", "");
		getMonthProjectList(cur_year,cur_month);
		$(".memberworkBox").html('');
	});	
	
	$(".horizontal-nav").delegate(".horizontal-nav-li","mouseover",function(){
		//$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro2.png) no-repeat center"});
		$(this).css('background','#ffffff');
		$(this).css('color','#ff0000');
	});
	//横向导航条鼠标离开
	$(".horizontal-nav").delegate(".horizontal-nav-li","mouseleave",function(){
		if($(this).attr('data-clicked') == "false"){
			$(this).css('background','#f3f3f3');
			$(this).css('color','#000000');
		}
	});
	//横向导航条单元点击事件
	$(".horizontal-nav").delegate(".horizontal-nav-li","click",function(){
		$('.horizontal-nav-li').each(function(){
			$(this).css('background','#f3f3f3');
			$(this).css('color','#000000');
			$(this).attr('data-clicked','false');
		  });
		$(this).css('background','#ffffff');
		$(this).css('color','#ff0000');
		$(this).attr('data-clicked','true');
		//获取项目信息
		$.ajax({
			data:"&PROJECT_ID="+$(this).attr("data-id"),
			type : "post",  
		    url : urlfile + "project/getProject",
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
					cleardraw();clearDiagram();
					getmodelUserVOListByPId(data.data);//绘制项目汇总
					drawSchedule(data.data);//绘制进度条
					getModelVOListByPId(data.data);//绘制模块列表
					getdayTaskList(data.data.id,data.data.name,"");
					$(".memberworkBox").html('');
				} else {
					alert(data.errMsg);
				}
			}		
		});
		
	});
	//更多事件，显示更多一天的日报
	$(".reportBox").delegate(".more","click",function(){
		getdayTaskList($(this).attr("data-proId"),$(this).attr("data-proName"),$(this).attr("data-date"));
		$(this).remove();
	});
	//点击人名显示该人员在该项目中的工作汇总
	$(".projectSummary").delegate(".userShowLog","click",function(){
		getdayTaskSummaryByProject($(this).attr("data-proId"),$(this).attr("data-proName"),$(this).attr("data-userId"),$(this).text());
		//document.getElementById('gotop').scrollIntoView();
		goToTop();
	});
	
	//鼠标拂过表格显示备注内容
	$('.reportBox').delegate(".tr-showRemarks","mouseover", function() {
		var remarks = $(this).find(".reply-btn").attr("data-strRemarks");
		showremark(remarks,$(this));
		/*if($(this).find(".reply-btn").attr("data-strRemarks") != ""){
			
			$('.showremark').html($(this).find(".reply-btn").attr("data-strRemarks"));
			var top = document.body.clientHeight-($(this).offset().top+$(this).height()+$(".showremark").height());
			var top_arrow;
			if(top<0){
				top = $(this).offset().top-$(".showremark").height();
				top_arrow = $(this).offset().top;
				$('.showarrow').css("display","block"); 
				$('.showarrow').css("border-left", "5px solid transparent"); 
				$('.showarrow').css("border-right", "5px solid transparent"); 
				$('.showarrow').css("border-top", "20px solid #FF9"); 
				$('.showarrow').css("border-bottom", "none"); 
				$('.showarrow').css("left", $(this).offset().left+20+"px"); 
				$('.showarrow').css("top", top_arrow+"px");
			}
			else{
				top = $(this).offset().top+$(this).height();
				top_arrow = top-20;
				$('.showarrow').css("display","block"); 
				$('.showarrow').css("border-left", "5px solid transparent"); 
				$('.showarrow').css("border-right", "5px solid transparent"); 
				$('.showarrow').css("border-bottom", "20px solid #FF9"); 
				$('.showarrow').css("border-top", "none"); 
				$('.showarrow').css("left", $(this).offset().left+20+"px"); 
				$('.showarrow').css("top", top_arrow+"px");
				
			}
			$(this).css('cursor','pointer');
			$('.showremark').css("display","block"); 
			$('.showremark').css("left", $(this).offset().left); 
			$('.showremark').css("top", top); 
		}*/
		
	}); 
	$('.reportBox').delegate(".tr-showRemarks","mouseout", function() {
		removeremark($(this));
		/*$(this).css('cursor','auto');
		$('.showremark').css("display","none"); 
		$('.showarrow').css("display","none"); */
	}); 
	
});	


//根据月份获取项目列表，并显示第一个项目的进度条和模块进度统计图
function getMonthProjectList(year,month) { 
    	$.ajax({
			data:"YEAR="+year+"&MONTH="+month,
			type : "post",  
		    url : urlfile + "project/getProjectsByTime",
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
					if(data.data[0] == undefined) {
						//alert('本月无项目！');
						$('.horizontal-nav').html(year+" 年 "+month+" 月 没有项目……");
						$('.proMangement').hide();
						return;
					}
					else{
						$('.proMangement').show();
						$('.nav-middle-li').each(function(){
							if($(this).parent().parent().find(".p-year").text() == (year+'年') && $(this).text() == (month+'月')){
								$(this).css("background","#ccc");
							}
							else{
								$(this).css("background","#e7e4e4");
							}
						  });
						var strhtml="";
						for(var i = 0 ; i<data.data.length ; i++ ) {	
							strhtml +='<li class="horizontal-nav-li" data-clicked="false" data-id="'+data.data[i].id+'"><span class="limit" title="'+data.data[i].name+'">'+data.data[i].name+'</span></li>';
				        }
						$('.horizontal-nav').html(strhtml);
						$(".limit").each(function(){
							var thistext = $(this);
							limitShow(8,thistext);
						});
						$('.horizontal-nav-li').each(function(){
					    	$(this).css('background','#f3f3f3');
							$(this).css('color','#000000');
					    	$(this).attr('data-clicked','false');
						});
					    $(".horizontal-nav-li:first").css('background','#ffffff');
						$(".horizontal-nav-li:first").css('color','#ff0000');
						$(".horizontal-nav-li:first").attr('data-clicked','true');
						cleardraw();clearDiagram();
						getmodelUserVOListByPId(data.data[0]);//绘制项目汇总
						drawSchedule(data.data[0]);//绘制进度条
						getModelVOListByPId(data.data[0]);//绘制模块进度统计图及模块列表
						getdayTaskList(data.data[0].id,data.data[0].name,"");
					}	
				} else {
					alert(data.errMsg);
				}
			}		
		}); 
    }
//根据项目id获取模块相关信息 ,并且绘制模块进度统计图
function getModelVOListByPId(oData) { 
	var proID = oData.id;
	var proName = oData.name;
	var proStartTime = oData.startTime;
	var proEndTime = oData.endTime;
	$.ajax({
		data:"PROJECT_ID="+proID,
		type : "post",  
	    url : urlfile + "project/getModelByPId",
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
				drawDiagram(data.data,proStartTime,proEndTime);
				var strhtml_functionBox = '';
				for(var i = 0; i <data.data.modelVOList.length; i++ ){
					strhtml_functionBox += '<table class="tb margin-tb">'
				                        +'<thead class="tb-head align-left">'
										+'<tr>'
										+'<th colspan="7" class="align-left">'
										+'<span>'+data.data.modelVOList[i].name+'&nbsp;(&nbsp;'+data.data.modelVOList[i].startTime+'&nbsp;至 &nbsp;'+data.data.modelVOList[i].endTime+'&nbsp;)</span>'
										+'<span class="float-right showbtn p-function remark-btn functionRemarks" data-id="'+data.data.modelVOList[i].id+'" data-remarks="'+data.data.modelVOList[i].remarks+'">备注</span>'
										+'</th>'
										+'</tr>'
										+'</thead>'
										+'<tbody class="tb-body">'
										+'<tr>'
				                        +'<td width="4%">序号</td>' 
				                        +'<td width="8%">姓名</td>'
				                        +'<td width="50%">内容</td>'
				                        +'<td width="10%">开始时间</td>'
				                        +'<td width="10%">结束时间</td>'
				                        +'<td width="6%">状态</td>'
				                        +'<td width="6%">操作</td>'
			                        	+'</tr>';
					for(var j = 0 ; j<data.data.modelVOList[i].list.length ; j++){
						strhtml_functionBox += '<tr>'
					                        +'<td>'+(j+1)+'</td>'
					                        +'<td><a class="p-edit userShowLog" data-userId="'+data.data.modelVOList[i].list[j].usercode
					                    	+'" data-proId="'+proID+'" data-proName="'+proName+'">'
					                    	+data.data.modelVOList[i].list[j].userName+'</a></td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].content.replace(/[\r\n]/g,"<br>")+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].startTime+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].endTime+'</td>';
					                        if(data.data.modelVOList[i].list[j].status == 1){
					                        	strhtml_functionBox += '<td><span class="p-red">已完成</span></td>';
											}else if(data.data.modelVOList[i].list[j].status == 2){
												strhtml_functionBox += '<td><span class="p-red">已作废</span></td>';
											} else{
												strhtml_functionBox += '<td><span class="p-purple">未完成</span></td>';
											}
//					                        if(data.data.modelVOList[i].list[j].invalid == 1){
//					                        	strhtml_functionBox += '<td><span class="p-red">已作废</span></td>';
//											}
//											else{
//												strhtml_functionBox += '<td><span class="p-purple">未作废</span></td>';
//											} 
					   strhtml_functionBox += '<td>'
					                        +'<span class="p-edit showbtn remark-btn modeluserRemarks" data-Id="'+data.data.modelVOList[i].list[j].id+'" data-remarks="'+data.data.modelVOList[i].list[j].remarks+'">备注</span>'
					                        +'</td>'
					                        +'</tr>';
					}
					strhtml_functionBox += '</tbody></table>';
				}
				$('.functionBox').html(strhtml_functionBox);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//根据项目id获取模块中用户相关信息 
function getmodelUserVOListByPId(oData) { 
	var proID = oData.id;
	var proName = oData.name;
	var proallTime = oData.allTime;
	$.ajax({
		data:"PROJECT_ID="+oData.id,
		type : "post",  
	    url : urlfile + "project/getModelByPId",
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
				var count_usedtime = 0;
				for(var i = 0 ; i<data.data.modelUserVOList.length ; i++){
					count_usedtime += data.data.modelUserVOList[i].confirmTimes;
				}
				var strhtml_pinkBox='<span id="proName" data-proId="'+proID+'">'+proName+'项目汇总：</span>'
                +'<span>总用时（ </span><span class="p-red">'+count_usedtime+'</span><span>/</span><span id="allTime">'+proallTime+'</span><span> 小时） </span>';
                for(var i = 0 ; i<data.data.modelUserVOList.length ; i++){
                	strhtml_pinkBox += ',<a class="p-edit userShowLog" data-userId="'+data.data.modelUserVOList[i].usercode
                	+'" data-proId="'+proID+'" data-proName="'+proName+'">'+data.data.modelUserVOList[i].userName
                	+'</a><span> （ </span><span class="p-red">'+data.data.modelUserVOList[i].confirmTimes+'</span><span>/</span><span>'
                	+data.data.modelUserVOList[i].workTimes+'</span><span> 小时） </span>';
                }
                strhtml_pinkBox += '<span class="pink-edt">';
                strhtml_pinkBox += '<span class="p-edit showbtn remark-btn proRemarks" data-Id="'+proID+'" data-remarks="'+oData.remarks+'">备注</span>';
                strhtml_pinkBox += '<span class="p-edit showbtn explanation-btn" data-id="'+proID+'" data-explanation="'+oData.explanation+'">说明</span>';
                strhtml_pinkBox += '</span">';
                strhtml_pinkBox +='<span class="float-right">'
                		+ '<input type="checkbox" name="modelStatus" value="0" checked="checked" onclick="filterModels(this)" data-Id="'+proID+'" />未完成'
                		+ '<input type="checkbox" name="modelStatus" value="1" checked="checked" onclick="filterModels(this)" data-Id="'+proID+'" />已完成'
                		+ '<input type="checkbox" name="modelStatus" value="2" checked="checked" onclick="filterModels(this)" data-Id="'+proID+'" />作废</span>';
                $('.pinkBox').find('.pro-note').html(strhtml_pinkBox);
				
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//总监未完成.已完成.作废的筛选
function filterModels(type){
	var status="";
	$('input:checkbox').each(function() {
		if ($(this).attr('checked') =='checked') {
			//console.log("checkbox:"+$(this).val());
			status+=$(this).val()+"|";
		}
	});
	if(status==''){
//		console.log($(type).val());
		$(type).attr('checked','checked');
		alert("不能去除最后的过滤条件!");
	}else{
		var proID=$(type).attr('data-Id');
		//console.log('status:'+status);
		$.ajax({
			data:"PROJECT_ID="+proID+"&FILTER_MODELS="+status,
			type : "post",  
		    url : urlfile + "project/getModelByPId",
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
//					drawDiagram(data.data,proStartTime,proEndTime);
					//console.log(data.data.modelVOList.length+"------------");
					var strhtml_functionBox = '';
					for(var i = 0; i <data.data.modelVOList.length; i++ ){
						strhtml_functionBox += '<table class="tb margin-tb">'
					                        +'<thead class="tb-head align-left">'
											+'<tr>'
											+'<th colspan="7" class="align-left">'
											+'<span>'+data.data.modelVOList[i].name+'&nbsp;(&nbsp;'+data.data.modelVOList[i].startTime+'&nbsp;至 &nbsp;'+data.data.modelVOList[i].endTime+'&nbsp;)</span>'
											+'<span class="float-right showbtn p-function remark-btn functionRemarks" data-id="'+data.data.modelVOList[i].id+'" data-remarks="'+data.data.modelVOList[i].remarks+'">备注</span>'
											+'</th>'
											+'</tr>'
											+'</thead>'
											+'<tbody class="tb-body">'
											+'<tr>'
					                        +'<td width="4%">序号</td>' 
					                        +'<td width="8%">姓名</td>'
					                        +'<td width="50%">内容</td>'
					                        +'<td width="10%">开始时间</td>'
					                        +'<td width="10%">结束时间</td>'
					                        +'<td width="6%">状态</td>'
					                        +'<td width="6%">操作</td>'
				                        	+'</tr>';
						//console.log(data.data.modelVOList[i].list.length+"========");
						for(var j = 0 ; j<data.data.modelVOList[i].list.length ; j++){
							strhtml_functionBox += '<tr>'
						                        +'<td>'+(j+1)+'</td>'
						                        +'<td><a class="p-edit userShowLog" data-userId="'+data.data.modelVOList[i].list[j].usercode
						                    	+'" data-proId="'+proID+'" data-proName="'+proName+'">'
						                    	+data.data.modelVOList[i].list[j].userName+'</a></td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].content.replace(/[\r\n]/g,"<br>")+'</td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].startTime+'</td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].endTime+'</td>';
						                        if(data.data.modelVOList[i].list[j].status == 1){
						                        	strhtml_functionBox += '<td><span class="p-red">已完成</span></td>';
												}else if(data.data.modelVOList[i].list[j].status == 2){
													strhtml_functionBox += '<td><span class="p-red">已作废</span></td>';
												} else{
													strhtml_functionBox += '<td><span class="p-purple">未完成</span></td>';
												}
//						                        if(data.data.modelVOList[i].list[j].invalid == 1){
//						                        	strhtml_functionBox += '<td><span class="p-red">已作废</span></td>';
//												}
//												else{
//													strhtml_functionBox += '<td><span class="p-purple">未作废</span></td>';
//												} 
						   strhtml_functionBox += '<td>'
						                        +'<span class="p-edit showbtn remark-btn modeluserRemarks" data-Id="'+data.data.modelVOList[i].list[j].id+'" data-remarks="'+data.data.modelVOList[i].list[j].remarks+'">备注</span>'
						                        +'</td>'
						                        +'</tr>';
						}
						strhtml_functionBox += '</tbody></table>';
					}
					$('.functionBox').html(strhtml_functionBox);
				} else {
					alert(data.errMsg);
				}
			}		
		});
	}
}

//项目最近1天的日报列表(带回复)
function getdayTaskList(PId,PName,Date){
	var strdata='';
	if(Date ==''){strdata="PROJECT_ID="+PId;}
	else{strdata="PROJECT_ID="+PId+"&WORKDATE="+Date;}
	$.ajax({
		data:strdata,
		type : "post",  
	    url : urlfile + "worklog/dayTaskList",
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
				if(data.data.voList.length>0){
					var strhtml_tableBox = '';
					strhtml_tableBox += '<div class="tableBox margin-tb clear">'
	            	+'<p class="p-blue">'+data.data.workdate+'</p>'
	                +'<table class="tb-half float-left">'
	                    +'<thead class="tb-head">'
	                        +'<tr>'
	                          +'<th colspan="7">今日已完成</th>'
	                        +'</tr>'
	                    +'</thead>'
	                    +'<tbody class="tb-body">'
	                        +'<tr>'
	                        +'<td width="5%">序号</td>'
                            +'<td width="35%">内容</td>'
                            +'<td width="11%">姓名</td>'
                            +'<td width="15%">上传/确认用时</td>'
                            +'<td width="14%">上传日期</td>'
                            +'<td width="10%">确认</td>'
                            +'<td width="10%">操作</td>'
	                        +'</tr>';
					var j = 0;
					for(var i = 0 ; i < data.data.voList.length ; i++){
						if(data.data.voList[i].status == 1){
							j++;
							strhtml_tableBox += '<tr class="tr-showRemarks">'
	                            +'<td>'+j+'</td>'
	                            +'<td>'+data.data.voList[i].content+'</td>'
	                            +'<td><a class="p-edit userShowLog" data-userId="'+data.data.voList[i].usercode
	                        	+'" data-proId="'+PId+'" data-proName="'+PName+'">'+data.data.voList[i].username+'</a></td>'
	                            +'<td>'+data.data.voList[i].usedtimes+'/<span class="p-red">'+data.data.voList[i].confirmtimes+'</span>小时</td>'
                                +'<td>'+data.data.voList[i].adddate+'</td>';
							if(data.data.voList[i].isconfirm == 1){
								strhtml_tableBox += '<td><span class="p-purple">未确认</span></td>';
							}else if(data.data.voList[i].isconfirm == 2){
								strhtml_tableBox += '<td><span class="p-red">已确认</span></td>';
							}else{
								strhtml_tableBox += '<td></td>';
							}
							strhtml_tableBox += '<td><button class="btn-blue showbtn reply-btn" data-day="'+Date+'" data-userId="'+data.data.voList[i].usercode+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-dayTaskId="'+data.data.voList[i].id+'">回复</button></td>'
	                            +'</tr>';
						}
					}  
	                strhtml_tableBox += '</tbody>'
	                    			+'</table>';
	                
	                strhtml_tableBox += '<table class="tb-half float-left">'
	                        +'<thead class="tb-head">'
	                            +'<tr>'
	                              +'<th colspan="7">今日未完成</th>'
	                            +'</tr>'
	                        +'</thead>'
	                        +'<tbody class="tb-body">'
	                            +'<tr>'
	                                +'<td width="5%">序号</td>'
	                                +'<td width="35%">内容</td>'
	                                +'<td width="11%">姓名</td>'
	                                +'<td width="15%">上传/确认用时</td>'
	                                +'<td width="14%">上传日期</td>'
	                                +'<td width="10%">确认</td>'
	                                +'<td width="10%">操作</td>'
	                            +'</tr>';
					j = 0;
					for(var i = 0 ; i < data.data.voList.length ; i++){
						if(data.data.voList[i].status == 0){
							j++;
							strhtml_tableBox += '<tr class="tr-showRemarks">'
	                            +'<td>'+j+'</td>'
	                            +'<td>'+data.data.voList[i].content+'</td>'
	                            +'<td><a class="p-edit userShowLog" data-userId="'+data.data.voList[i].usercode
	                        	+'" data-proId="'+PId+'" data-proName="'+PName+'">'+data.data.voList[i].username+'</a></td>'
	                            +'<td>'+data.data.voList[i].usedtimes+'/<span class="p-red">'+data.data.voList[i].confirmtimes+'</span>小时</td>'
                                +'<td>'+data.data.voList[i].adddate+'</td>';
							if(data.data.voList[i].isconfirm == 1){
								strhtml_tableBox += '<td><span class="p-purple">未确认</span></td>';
							}else if(data.data.voList[i].isconfirm == 2){
								strhtml_tableBox += '<td><span class="p-red">已确认</span></td>';
							}else{
								strhtml_tableBox += '<td></td>';
							}
							strhtml_tableBox += '<td><button class="btn-blue showbtn reply-btn" data-day="'+Date+'" data-userId="'+data.data.voList[i].usercode+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-dayTaskId="'+data.data.voList[i].id+'">回复</button></td>'
	                            +'</tr>';
						}
					}  
	                strhtml_tableBox += '</tbody>'+'</table>';
	                getnextDayTaskList(PId,data.data.workdate,function(length){
	                	if(length == 0){
		                	strhtml_tableBox += '';
		                }
		                else{
		                	strhtml_tableBox += '<span class="p-edit margin-tb float-right more" data-proId="'+PId+'" data-proName="'+PName+'" data-date="'+data.data.workdate+'">更多<span>'; 
		                }
	                	strhtml_tableBox += '</div>';
		                if(Date ==''){
		                	 $('.reportBox').html(strhtml_tableBox);
		                }
		                else{
		               	 $('.reportBox').append(strhtml_tableBox);
		               }
	                });
	                
	                /*if(data.data.workdate == undefined){
	                	strhtml_tableBox = '<div>';
	                }
	                else{
	                	strhtml_tableBox += '<span class="p-edit margin-tb float-right more" data-proId="'+PId+'" data-proName="'+PName+'" data-date="'+data.data.workdate+'">更多<span>'; 
	                }*/
	                
				}
				else{
					$('.reportBox').html('');
				}
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//判断下一个日报日否存在，存在返回1；否则返回0
function getnextDayTaskList(PId,Date,fn){
	$.ajax({
		data:"PROJECT_ID="+PId+"&WORKDATE="+Date,
		type : "post",  
	    url : urlfile + "worklog/dayTaskList",
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
				var length = 0;
                if(data.data.workdate == undefined){
                	length = 0;
                }
                else{
                	length = 1;
                }
                fn && fn(length);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
	return length;
}

//根据项目号及用户号，获取该人员在该项目的工作汇总
function getdayTaskSummaryByProject(PId,PName,userCode,userName){
	//console.log(PId+','+PName+','+userCode+','+userName);
	$.ajax({
		data:"PROJECT_ID="+PId+"&USERCODE="+userCode,
		type : "post",  
	    url : urlfile + "worklog/dayTaskSummaryByProject",
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
				//console.log('data:'+data.data.length);
				var count_usedtimes = 0 ;
				var count_confirmtimes = 0;
				for(var i = 0 ; i < data.data.length ; i++){
					count_usedtimes += data.data[i].usedtimes;
					count_confirmtimes += data.data[i].confirmtimes;
				}
				var strhtml_memberworkBox = '<p class="p-blue font-big">'+userName+'</p>'
											+'<table class="tb">'
											+'<thead class="tb-head">'
											+'<tr>'
											+'<th colspan="6">'+userName+PName+'工作汇总</th>'
											+'</tr>'
											+'</thead>'
											+'<tbody class="tb-body">'
											+'<tr>'
											+'<td width="10%">序号</td>'
											+'<td width="40%">内容</td>'
											+'<td width="7">状态</td>'
											+'<td width="20%">上传/确认用时（'+count_usedtimes+'/<span class="p-red">'+count_confirmtimes+'</span>小时）</td>'
											+'<td width="8%">确认</td>'
											+'<td width="15%">上传日期</td>'
											+'</tr>';
				for(var i = 0 ; i < data.data.length ; i++){
					var status = '<span class="p-red">已完成</span>';
					if(data.data[i].status == 0){
						status = '<span class="p-purple">未完成</span>';
					}
					strhtml_memberworkBox += '<tr>'
					                     +'<td>'+(i+1)+'</td>'
					                     +'<td>'+data.data[i].content+'</td>'
					                     +'<td>'+status+'</td>'
					                     +'<td>'+data.data[i].usedtimes+'/<span class="p-red">'+data.data[i].confirmtimes+'</span>小时</td>';
					if(data.data[i].isconfirm == 1){
						strhtml_memberworkBox += '<td><span class="p-purple">未确认</span></td>';
					}else if(data.data[i].isconfirm == 2){
						strhtml_memberworkBox += '<td><span class="p-red">已确认</span></td>';
					}else{
						strhtml_memberworkBox += '<td></td>';
					}
					strhtml_memberworkBox +='<td>'+data.data[i].adddate+'</td>'
										+'</tr>';
				}
				strhtml_memberworkBox += '</tbody></table>';  
				$('.memberworkBox').html(strhtml_memberworkBox);
				
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//一个日期加上相差天数，得到新的日期
function getAddDate(startdate,datediff) {
	var date=getDate(startdate);
	date = date.valueOf();
	date = date + datediff * 24 * 60 * 60 * 1000;
	date = new Date(date);
	var month = date.getMonth() + 1;
	if(month.toString().length == 1){
		month='0'+month;
	}
	var day = date.getDate();
	if(day.toString().length == 1){
		day='0'+day;
	}
	return date.getFullYear() + "-" + month + "-" + day;
}
//绘制进度条
function drawSchedule(oData) {
	//初始日期
	var starttime = getDate(oData.startTime).Format('yyyy-MM-dd');
	//截止日期
	var endtime = getDate(oData.endTime).Format('yyyy-MM-dd');
	//当前日期
	var curtime = new Date().Format("yyyy-MM-dd");
	//已完成时间百分比
	var percent = (DateDiff(starttime,curtime)/DateDiff(starttime, endtime)).toFixed(2);
	var percent_str = percent.slice(2,4)+"%";
	if(percent >= 1) {
		percent = 1;
		percent_str ="100%";
	}
	if(percent <= 0) {
		percent = 0;
		percent_str ="0%";
	}
	//var aa=document.getElementById("aa");
	cleardraw();
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	//进度条第一根竖线
	cxt.strokeStyle="#000000";
	cxt.beginPath();
	cxt.moveTo(210,30);
	cxt.lineTo(210,20);
	cxt.stroke();
	//进度条第二根竖线
	cxt.beginPath();
	cxt.moveTo(410,30);
	cxt.lineTo(410,20);
	cxt.stroke();
	//进度条中字体
	cxt.font = "11px Microsoft YaHei";
	cxt.textBaseline="bottom";
	cxt.fillStyle = "#000000";
	cxt.textAlign="left"; 
	cxt.fillText(starttime, 10,65);
	cxt.textAlign="right"; 
	cxt.fillText(endtime, 610,65);
	cxt.textAlign="left"; 
	cxt.fillText('开始', 10,78);
	cxt.textAlign="right"; 
	cxt.fillText('完成', 610,78);
	cxt.textAlign="center"; 
	cxt.fillText(percent_str, 10+600*percent,20);
	//进度条底色
	cxt.fillStyle="#4b4b4b";
	cxt.fillRect(10,30,600,20);
	//进度条倒三角标志
	cxt.fillStyle="#f52770";
	cxt.beginPath();
	cxt.moveTo(10+600*percent,30);
	cxt.lineTo(18+600*percent,20);
	cxt.lineTo(2+600*percent,20);
	cxt.closePath();
	cxt.fill();
	//进度条填充
	var grd=cxt.createLinearGradient(0,0,600,20);
	grd.addColorStop(0,"#2eb2e9");
	grd.addColorStop(1,"#f52770");
	cxt.fillStyle=grd;
	cxt.fillRect(10,30,600*percent,20);
 
}

function drawDiagram(oData,startTime,endTime) {
	clearDiagram();
	//纵坐标字段，项目功能模块
	var moudleArray = new Array();
	for(var i = 0; i <oData.modelVOList.length;i++){
		moudleArray[i]=[oData.modelVOList[i].name,getDate(oData.modelVOList[i].startTime).Format('yyyy-MM-dd'),getDate(oData.modelVOList[i].endTime).Format('yyyy-MM-dd')];
	}
	
	//var moudleArray=[['掌厅','2015-09-01','2015-09-12'],['商城','2015-09-12','2015-09-19'],['炒股','2015-09-19','2015-09-30'],['行情','2015-09-30','2015-10-11'],['交易','2015-10-11','2015-10-20'],['资讯','2015-10-20','2015-10-30']];
	//项目初始日期
	var starttime = getDate(startTime).Format('yyyy-MM-dd');
	//项目截止日期
	var endtime = getDate(endTime).Format('yyyy-MM-dd');
	var timeunit = 310/DateDiff(starttime, endtime);
	//横坐标显示日期的个数
	var timecount = 5;
	
	var c=document.getElementById("myDiagram");
	var cxt=c.getContext("2d");
	//字体
	cxt.font = "12px 宋体";
	//图表背景色
	cxt.fillStyle="#fff9a8";
	cxt.beginPath();
	cxt.moveTo(90,0);
	cxt.lineTo(400,0);
	cxt.lineTo(400,150);
	cxt.lineTo(90,150);
	cxt.closePath();
	cxt.fill();
	
	//实线
	cxt.strokeStyle = "#b4854d";
	cxt.beginPath();
	cxt.moveTo(90,0);
	cxt.lineTo(90,150);
	cxt.lineTo(400,150);
	cxt.stroke();
	var moduledistance  = 150/moudleArray.length;
	for(var i=1;i<=moudleArray.length;i++){
		cxt.strokeStyle = "#b4854d";
		cxt.moveTo(90,150-i*moduledistance);
		cxt.lineTo(95,150-i*moduledistance);
		cxt.stroke();
		cxt.fillStyle = "#000000";
		cxt.textAlign="right"; 
		cxt.textBaseline="middle";
		var strmoudle = moudleArray[i-1][0];
		if(strmoudle.length>6){
			strmoudle = strmoudle.substring(0,6)+"…";
		}
		cxt.fillText(strmoudle, 88,150-(i-1)*moduledistance-moduledistance/2);
		if(moudleArray[i-1][1]!='1970-01-01' && moudleArray[i-1][2]!='1970-01-01'){
			cxt.fillStyle="#a3305b";
			//alert((DateDiff(starttime,moudleArray[i-1][1])-1)+','+(DateDiff(moudleArray[i-1][1],moudleArray[i-1][2])));
			cxt.fillRect(90+(DateDiff(starttime,moudleArray[i-1][1])-1)*timeunit,150-i*moduledistance,(DateDiff(moudleArray[i-1][1],moudleArray[i-1][2]))*timeunit,moduledistance);
			//alert((50+(DateDiff(starttime,moudleArray[i-1][1])-1)*timeunit)+','+(150-i*moduledistance)+','+((DateDiff(moudleArray[i-1][1],moudleArray[i-1][2]))*timeunit)+','+(moduledistance));
		}
	}
	
	//虚线
	var timedistance  = 310/(timecount-1);
	for(var i=1;i<timecount-1;i++){
		var newdate_str = getAddDate(starttime,DateDiff(starttime, endtime)/(timecount-1)*i);
		//alert(DateDiff(starttime, endtime)/(timecount-1)*i);
		cxt.strokeStyle = "#b4854d";
		dashedLineTo(90+i*timedistance, 150, 90+i*timedistance, 0, 3);
		cxt.fillStyle = "#000000";
		cxt.textAlign="center";
		cxt.fillText(getDate(newdate_str).Format("MM.dd"), 90+i*timedistance,160);
	}
	cxt.fillStyle = "#000000";
	cxt.textAlign="left";
	cxt.fillText(getDate(starttime).Format("MM.dd"), 90,160);
	cxt.textAlign="right";
	cxt.fillText(getDate(endtime).Format("MM.dd"), 400,160);
	
	function dashedLineTo(fromX, fromY, toX, toY, pattern) {
	 // default interval distance -> 5px
		if (typeof pattern === "undefined") {
			pattern = 5;
		}
		// calculate the delta x and delta y
		var dx = (toX - fromX);
		var dy = (toY - fromY);
		var distance = Math.floor(Math.sqrt(dx*dx + dy*dy));
		var dashlineInteveral = (pattern <= 0) ? distance : (distance/pattern);
		var deltay = (dy/distance) * pattern;
		var deltax = (dx/distance) * pattern;
		//alert(dx+','+dy+','+distance+','+dashlineInteveral+','+deltay+','+deltax);	
		// draw dash line
		cxt.beginPath();
		for(var dl=0; dl< dashlineInteveral; dl++) {
			if(dl%2) {
				cxt.lineTo(fromX + dl*deltax, fromY + dl*deltay);
			} else {    				 
				cxt.moveTo(fromX + dl*deltax, fromY + dl*deltay);    				
			}    			
		}
		cxt.stroke();
	}
}

//清除画布
function cleardraw(){
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	cxt.clearRect(0,0,650,80);
}
function clearDiagram(){
	var width=document.getElementById("myDiagram").clientWidth;
	var height=document.getElementById("myDiagram").clientHeight;
	var cxt = document.getElementById('myDiagram').getContext('2d');
	cxt.clearRect(0,0,width,height);
}
	

	
