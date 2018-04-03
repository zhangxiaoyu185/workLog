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
    	getProjectsByTime(year,month);
    });
    
	getProjectsByTime(date_array[0],getDate(date_array[0]+'-'+date_array[1].toString()+'-01').Format('MM'));
	
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (date_array[0]+'年') && $(this).text() == (date_array[1]+'月')){
			$(this).css("background","#ccc");
		}
	  });
		
	//点击项目获取项目下信息
	$("body").delegate(".horizontal-nav-li1","click",function(){
		//console.log($(this).attr("data-id"));
		if($(this).hasClass('showbtn') == false){
			$('.horizontal-nav-li').each(function(){
				if($(this).hasClass('showbtn')){
					$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
				}
		    	$(this).css('background','#f3f3f3');
				$(this).css('color','#000000');
		    	$(this).attr('data-clicked','false');
			});
		
			$(this).css('background','#ffffff');
			$(this).css('color','#ff0000');
			$(this).attr('data-clicked','true');
		}
		//获取项目信息
		getJSProjectInfo($(this).attr("data-id"));
	});
	
	//点击所选年份，隐藏或显示月份
    $('.p-year').on("click", function() {
		//console.log($(this).attr("showtype"));
		if($(this).attr("showtype") == 'true'){
			$(this).parent(".nav-li").find(".nav-middle").hide();
			$(this).attr('showtype','false');
		}
		else{
			$(this).parent(".nav-li").find(".nav-middle").show();
			$(this).attr('showtype','true');
		}
	});  
  //点击人名显示该人员在该项目中的工作汇总
	$(".pinkBox").delegate(".userShowLog","click",function(){
		getdayTaskSummaryByProject($(this).attr("data-proId"),$(this).attr("data-proName"),$(this).attr("data-userId"),$(this).text());
		//document.getElementById('gotop').scrollIntoView();
		goToTop();
	});
	//模块员工已完成或者已作废任务点击事件
    $("body").delegate(".p-isfinish","click",function(){
    	var r=confirm("是否确认？");
    	if (r==true){
    		var operateType=$(this).attr("operateType");
			//默认是已完成操作
			var param="FINISH_TYPE=4&ID="+$(this).attr("data-id");
			if("invalid"==operateType){//已作废处理
				param="FINISH_TYPE=4&ID="+$(this).attr("data-id")+"&MODELTYPE="+operateType;
			}
			$.ajax({
				data:param,
				type : "post",  
		    	url : urlfile + "main/finishTaskOrProject",
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
						getModelVOListByPId(sessionStorage.getItem("project_id_session"));
					} else {
						alert('修改完成状态失败！');
					}
				}		
			});		
    	}
		
	}); 
	
  //项目已完成任务点击事件
    $("body").delegate(".p-isfinish-project","click",function(){
		//console.log($(this).attr("data-id"));
    	var r=confirm("是否确认完成？");
		if (r==true){
		$.ajax({
			data:"FINISH_TYPE=1&ID="+$(this).attr("data-id"),
			type : "post",  
		    url : urlfile + "main/finishTaskOrProject",
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
					getJSProjectInfo(sessionStorage.getItem("project_id_session"));
				} else {
					alert('修改完成状态失败！');
				}
			}		
		});	
		}
	}); 
  //模块人员点击事件
    $("body").delegate(".showUserInfo","click",function(){
    	searchUserByCode($(this).attr("data-usercode"));	
	}); 
    //更多事件，显示更多一天的日报
	$(".reportBox").delegate(".more","click",function(){
		getdayTaskList($(this).attr("data-proId"),$(this).attr("data-proName"),$(this).attr("data-date"));
		$(this).remove();
	});
	
	//鼠标拂过表格显示备注内容
	$('.reportBox').delegate(".tr-showRemarks","mouseover", function() {
		var remarks = $(this).find(".reply-btn").attr("data-strRemarks");
		showremark(remarks,$(this));
	});
	$('.reportBox').delegate(".tr-showRemarks","mouseout", function() {
		removeremark($(this));
	});
	
	//月份点击事件
	$('.nav-middle-li').on("click",function(){
		$('.nav-middle-li').each(function(){
			$(this).css("background","#e7e4e4");
		  });
		$(this).css("background","#ccc");
		var cur_year = $(this).parent().prev().text().replace("年", "");
		var cur_month = $(this).find('p').text().replace("月", "");
		getProjectsByTime(cur_year, cur_month);
	});	
	
	$("body").delegate(".schedule-btn","click",function(){
		location.href = "../declaration/index_pm.html";
		cleardraw();
	});
	$("body").delegate(".people-btn","click",function(){
		location.href = "../declaration/index_pm2.html";
	});
	$(".horizontal-nav").delegate(".horizontal-nav-li","mouseover",function(){
		if($(this).hasClass('showbtn')){
			$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro2.png) no-repeat center"});
		}
			$(this).css('background','#ffffff');
			$(this).css('color','#ff0000');
	});
	//横向导航条鼠标离开
	$(".horizontal-nav").delegate(".horizontal-nav-li","mouseleave",function(){
		if($(this).attr('data-clicked') == "false"){
			if($(this).hasClass('showbtn')){
				$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
			}
			$(this).css('background','#f3f3f3');
			$(this).css('color','#000000');
		}
	});
		
});


function getProjectsByTime(year,month) { 
	$.ajax({
		data:"&USERCODE="+sessionStorage.getItem("code")+"&YEAR="+year+"&MONTH="+month,
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
				$('.nav-middle-li').each(function(){
					if($(this).parent().parent().find(".p-year").text() == (year+'年') && $(this).text() == (month+'月')){
						$(this).css("background","#ccc");
					}
					else{
						$(this).css("background","#e7e4e4");
					}
				  });
				$('.pinkBox').css("display","none");
				cleardraw();
				$(".functionBox").html("");
				$(".reportBox").html("");
				var commonMT= '';
				$.each(data.data, function(i, item) {	
					commonMT += "<li class='horizontal-nav-li horizontal-nav-li1' data-clicked='false' data-id='"+
                        item.id+"'> <span class='limit' title='"+item.name+"'>"+item.name+"</span></li>";					
		        });
				commonMT += "<li class='horizontal-nav-li showbtn addpro-btn'>" +
                "<span class='img-addpro'></span><span>新增项目</span></li>";
				$("#projectList").html(commonMT);
				$(".limit").each(function(){
					var thistext = $(this);
					limitShow(8,thistext);
				});
				$('.horizontal-nav-li').each(function(){
					if($(this).hasClass('showbtn')){
						$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
					}
			    	$(this).css('background','#f3f3f3');
					$(this).css('color','#000000');
			    	$(this).attr('data-clicked','false');
				});
				if($(".horizontal-nav-li:first").hasClass('showbtn')){
					$(".horizontal-nav-li:first").find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
					$(".horizontal-nav-li:first").css('background','#f3f3f3');
					$(".horizontal-nav-li:first").css('color','#000000');
					$(".horizontal-nav-li:first").attr('data-clicked','false');
				}
				else{
					$(".horizontal-nav-li:first").css('background','#ffffff');
					$(".horizontal-nav-li:first").css('color','#ff0000');
					$(".horizontal-nav-li:first").attr('data-clicked','true');
				}
				if(data.data[0] != undefined) {
					getmodelUserVOListByPId(data.data[0]);//绘制项目汇总
					drawSchedule(data.data[0]);//绘制进度条
					getModelVOListByPId(data.data[0].id);//绘制模块列表
					getdayTaskList(data.data[0].id,data.data[0].name,"");
				}
				//console.log(data.data[0]);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//获取项目信息
function getJSProjectInfo(proID) {	
	$.ajax({
		data:"&PROJECT_ID="+proID,
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
				//console.log(data.data);
				getmodelUserVOListByPId(data.data);//绘制项目汇总
				drawSchedule(data.data);//绘制进度条
				getModelVOListByPId(data.data.id);//绘制模块列表
				getdayTaskList(data.data.id,data.data.name,"");
				$('.memberworkBox').html("");
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//根据项目id获取模块相关信息 
function getModelVOListByPId(proID) {
	//存储项目ID
	sessionStorage.setItem("project_id_session", proID);
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
				var strhtml_functionBox = '';
				//console.log(data.data);
				for(var i = 0; i <data.data.modelVOList.length; i++ ){
					strhtml_functionBox += '<table class="tb margin-tb">'
				                        +'<thead class="tb-head align-left">'
										+'<tr>'
										+'<th colspan="6" class="align-left">'
										+'<span>'+data.data.modelVOList[i].name+'&nbsp;(&nbsp;'+data.data.modelVOList[i].startTime+'&nbsp;至 &nbsp;'+data.data.modelVOList[i].endTime+'&nbsp;)</span>'
										+'<span class="float-right showbtn p-function addfunction-btn" data-module="'+data.data.modelVOList[i].id+'" data-project="'+proID+'" data-startTime="'+data.data.modelVOList[i].startTime+'" data-endTime="'+data.data.modelVOList[i].endTime+'">新增</span>'
										+'<span class="float-right showbtn p-function remark-btn functionRemarks" data-id="'+data.data.modelVOList[i].id+'" data-remarks="'+data.data.modelVOList[i].remarks+'">备注</span>'
										+'</th>'
										+'</tr>'
										+'</thead>'
										+'<tbody class="tb-body">'
										+'<tr>'
				                        +'<td width="5%">序号</td>' 
				                        +'<td width="10%">姓名</td>'
				                        +'<td width="50%">内容</td>'
				                        +'<td width="10%">开始时间</td>'
				                        +'<td width="10%">结束时间</td>'
				                        +'<td width="15%">操作</td>'
			                        	+'</tr>';
					for(var j = 0 ; j<data.data.modelVOList[i].list.length ; j++){
						strhtml_functionBox += '<tr>'
					                        +'<td>'+(j+1)+'</td>'
					                        +'<td><span class="p-edit showUserInfo" data-usercode="'+data.data.modelVOList[i].list[j].usercode+'">'+data.data.modelVOList[i].list[j].userName+'</span></td>'
											+'<td>'+data.data.modelVOList[i].list[j].content.replace(/[\r\n]/g,"<br>")+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].startTime+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].endTime+'</td>'
					                        +'<td>';
											if(data.data.modelVOList[i].list[j].status == 1) {
												strhtml_functionBox += '<span class="p-finish">√已完成</span>';
											}else if(data.data.modelVOList[i].list[j].status == 2){
												strhtml_functionBox += '<span class="p-finish">√已作废</span>';
											}else {
												strhtml_functionBox += '<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="finish">完成</span>'
														+'<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="invalid">作废</span>'
														+'<span class="p-edit showbtn modify-btn function" data-name="'+data.data.modelVOList[i].list[j].userName+'" data-id="'+data.data.modelVOList[i].list[j].id+'" data-startTime="'+data.data.modelVOList[i].startTime+'" data-endTime="'+data.data.modelVOList[i].endTime+'">修改</span>';
											}
//											if(data.data.modelVOList[i].list[j].invalid == 1) {
//												strhtml_functionBox += '<span class="p-finish">√已作废</span>';
//											}
//											else {
//												strhtml_functionBox += '<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="invalid">作废</span>';
//											}
											strhtml_functionBox += '<span class="p-edit showbtn remark-btn modeluserRemarks"  data-id="'+data.data.modelVOList[i].list[j].id+'" data-remarks="'+data.data.modelVOList[i].list[j].remarks+'">备注</span>'
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
				
				$('.pinkBox').css("display","block");
				var count_usedtime = 0;
				for(var i = 0 ; i<data.data.modelUserVOList.length ; i++){
					count_usedtime += data.data.modelUserVOList[i].usedTimes;
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
                if(oData.status == 1) {
                	strhtml_pinkBox += '<span class="p-finish">√已完成</span>';
				}
				else {
					strhtml_pinkBox += '<span class="p-edit p-isfinish-project" data-id="'+proID+'">完成</span>';
					
				}
                //strhtml_pinkBox += '<span class="p-edit showbtn remark-btn proRemarks" data-id="'+proID+'" data-remarks="'+oData.remarks+'">备注</span>';
                strhtml_pinkBox += '<span class="p-edit showbtn explanation-btn" data-id="'+proID+'" data-explanation="'+oData.explanation+'">说明</span>';
                strhtml_pinkBox += '<span class="p-edit showbtn modifypro-btn" data-id="'+proID+'">修改项目</span>';
                strhtml_pinkBox += '<span class="p-edit showbtn addproplan-btn" data-id="'+proID+'" data-startTime="'+oData.startTime+'" data-endTime="'+oData.endTime+'">新增项目计划</span>';
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
					var strhtml_functionBox = '';
					//console.log(data.data);
					for(var i = 0; i <data.data.modelVOList.length; i++ ){
						strhtml_functionBox += '<table class="tb margin-tb">'
					                        +'<thead class="tb-head align-left">'
											+'<tr>'
											+'<th colspan="6" class="align-left">'
											+'<span>'+data.data.modelVOList[i].name+'&nbsp;(&nbsp;'+data.data.modelVOList[i].startTime+'&nbsp;至 &nbsp;'+data.data.modelVOList[i].endTime+'&nbsp;)</span>'
											+'<span class="float-right showbtn p-function addfunction-btn" data-module="'+data.data.modelVOList[i].id+'" data-project="'+proID+'" data-startTime="'+data.data.modelVOList[i].startTime+'" data-endTime="'+data.data.modelVOList[i].endTime+'">新增</span>'
											+'<span class="float-right showbtn p-function remark-btn functionRemarks" data-id="'+data.data.modelVOList[i].id+'" data-remarks="'+data.data.modelVOList[i].remarks+'">备注</span>'
											+'</th>'
											+'</tr>'
											+'</thead>'
											+'<tbody class="tb-body">'
											+'<tr>'
					                        +'<td width="5%">序号</td>' 
					                        +'<td width="10%">姓名</td>'
					                        +'<td width="50%">内容</td>'
					                        +'<td width="10%">开始时间</td>'
					                        +'<td width="10%">结束时间</td>'
					                        +'<td width="15%">操作</td>'
				                        	+'</tr>';
						for(var j = 0 ; j<data.data.modelVOList[i].list.length ; j++){
							strhtml_functionBox += '<tr>'
						                        +'<td>'+(j+1)+'</td>'
						                        +'<td><span class="p-edit showUserInfo" data-usercode="'+data.data.modelVOList[i].list[j].usercode+'">'+data.data.modelVOList[i].list[j].userName+'</span></td>'
												+'<td>'+data.data.modelVOList[i].list[j].content.replace(/[\r\n]/g,"<br>")+'</td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].startTime+'</td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].endTime+'</td>'
						                        +'<td>';
												if(data.data.modelVOList[i].list[j].status == 1) {
													strhtml_functionBox += '<span class="p-finish">√已完成</span>';
												}else if(data.data.modelVOList[i].list[j].status == 2){
													strhtml_functionBox += '<span class="p-finish">√已作废</span>';
												}else {
													strhtml_functionBox += '<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="finish">完成</span>'
															+'<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="invalid">作废</span>'
															+'<span class="p-edit showbtn modify-btn function" data-name="'+data.data.modelVOList[i].list[j].userName+'" data-id="'+data.data.modelVOList[i].list[j].id+'" data-startTime="'+data.data.modelVOList[i].startTime+'" data-endTime="'+data.data.modelVOList[i].endTime+'">修改</span>';
												}
//												if(data.data.modelVOList[i].list[j].invalid == 1) {
//													strhtml_functionBox += '<span class="p-finish">√已作废</span>';
//												}
//												else {
//													strhtml_functionBox += '<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="invalid">作废</span>';
//												}
												strhtml_functionBox += '<span class="p-edit showbtn remark-btn modeluserRemarks"  data-id="'+data.data.modelVOList[i].list[j].id+'" data-remarks="'+data.data.modelVOList[i].list[j].remarks+'">备注</span>'
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

//经理未完成.已完成.作废的筛选
function filterModels(type){
	var status="";
	$('input:checkbox').each(function() {
		if ($(this).attr('checked') =='checked') {
			//console.log("checkbox:"+$(this).val());
			status+=$(this).val()+"|";
		}
	});
	if(status==''){
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
					var strhtml_functionBox = '';
					//console.log(data.data);
					for(var i = 0; i <data.data.modelVOList.length; i++ ){
						strhtml_functionBox += '<table class="tb margin-tb">'
					                        +'<thead class="tb-head align-left">'
											+'<tr>'
											+'<th colspan="6" class="align-left">'
											+'<span>'+data.data.modelVOList[i].name+'&nbsp;(&nbsp;'+data.data.modelVOList[i].startTime+'&nbsp;至 &nbsp;'+data.data.modelVOList[i].endTime+'&nbsp;)</span>'
											+'<span class="float-right showbtn p-function addfunction-btn" data-module="'+data.data.modelVOList[i].id+'" data-project="'+proID+'" data-startTime="'+data.data.modelVOList[i].startTime+'" data-endTime="'+data.data.modelVOList[i].endTime+'">新增</span>'
											+'<span class="float-right showbtn p-function remark-btn functionRemarks" data-id="'+data.data.modelVOList[i].id+'" data-remarks="'+data.data.modelVOList[i].remarks+'">备注</span>'
											+'</th>'
											+'</tr>'
											+'</thead>'
											+'<tbody class="tb-body">'
											+'<tr>'
					                        +'<td width="5%">序号</td>' 
					                        +'<td width="10%">姓名</td>'
					                        +'<td width="50%">内容</td>'
					                        +'<td width="10%">开始时间</td>'
					                        +'<td width="10%">结束时间</td>'
					                        +'<td width="15%">操作</td>'
				                        	+'</tr>';
						for(var j = 0 ; j<data.data.modelVOList[i].list.length ; j++){
							strhtml_functionBox += '<tr>'
						                        +'<td>'+(j+1)+'</td>'
						                        +'<td><span class="p-edit showUserInfo" data-usercode="'+data.data.modelVOList[i].list[j].usercode+'">'+data.data.modelVOList[i].list[j].userName+'</span></td>'
												+'<td>'+data.data.modelVOList[i].list[j].content.replace(/[\r\n]/g,"<br>")+'</td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].startTime+'</td>'
						                        +'<td>'+data.data.modelVOList[i].list[j].endTime+'</td>'
						                        +'<td>';
												if(data.data.modelVOList[i].list[j].status == 1) {
													strhtml_functionBox += '<span class="p-finish">√已完成</span>';
												}else if(data.data.modelVOList[i].list[j].status == 2){
													strhtml_functionBox += '<span class="p-finish">√已作废</span>';
												}else {
													strhtml_functionBox += '<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="finish">完成</span>'
															+'<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="invalid">作废</span>'
															+'<span class="p-edit showbtn modify-btn function" data-name="'+data.data.modelVOList[i].list[j].userName+'" data-id="'+data.data.modelVOList[i].list[j].id+'" data-startTime="'+data.data.modelVOList[i].startTime+'" data-endTime="'+data.data.modelVOList[i].endTime+'">修改</span>';
												}
//												if(data.data.modelVOList[i].list[j].invalid == 1) {
//													strhtml_functionBox += '<span class="p-finish">√已作废</span>';
//												}
//												else {
//													strhtml_functionBox += '<span class="p-edit p-isfinish" data-id="'+data.data.modelVOList[i].list[j].id+'" operateType="invalid">作废</span>';
//												}
												strhtml_functionBox += '<span class="p-edit showbtn remark-btn modeluserRemarks"  data-id="'+data.data.modelVOList[i].list[j].id+'" data-remarks="'+data.data.modelVOList[i].list[j].remarks+'">备注</span>'
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
	                        +'<td width="8%">序号</td>'
                            +'<td width="30%">内容</td>'
                            +'<td width="12%">姓名</td>'
                            +'<td width="10%">上传/确认用时</td>'
                            +'<td width="14%">上传日期</td>'
                            +'<td width="10%">确认</td>'
                            +'<td width="16%">操作</td>'
	                        +'</tr>';
					var j = 0;
					for(var i = 0 ; i < data.data.voList.length ; i++){
						if(data.data.voList[i].status == 1){
							j++;
							strhtml_tableBox += '<tr class="tr-showRemarks">'
	                            +'<td>'+j+'</td>'
	                            +'<td>'+data.data.voList[i].content+'</td>'
	                            +'<td><span class="userShowLog" data-userId="'+data.data.voList[i].usercode
	                        	+'" data-proId="'+PId+'" data-proName="'+PName+'">'+data.data.voList[i].username+'</span></td>'
	                        	+'<td>'+data.data.voList[i].usedtimes+'/<span class="p-red">'+data.data.voList[i].confirmtimes+'</span>小时</td>'
	                            +'<td>'+data.data.voList[i].adddate+'</td>';
							if(data.data.voList[i].isconfirm == 1){
								strhtml_tableBox += '<td><span class="p-purple">未确认</span></td>';
							}else if(data.data.voList[i].isconfirm == 2){
								strhtml_tableBox += '<td><span class="p-red">已确认</span></td>';
							}else{
								strhtml_tableBox += '<td></td>';
							}   
							strhtml_tableBox += '<td><button class="btn-blue showbtn reply-btn" data-userId="'+data.data.voList[i].usercode+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-dayTaskId="'+data.data.voList[i].id+'">回复</button></td>'
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
	                            +'<td width="8%">序号</td>'
                                +'<td width="30%">内容</td>'
                                +'<td width="12%">姓名</td>'
                                +'<td width="10%">上传/确认用时</td>'
                                +'<td width="14%">上传日期</td>'
                                +'<td width="10%">确认</td>'
                                +'<td width="16%">操作</td>'
	                            +'</tr>';
					j = 0;
					for(var i = 0 ; i < data.data.voList.length ; i++){
						if(data.data.voList[i].status == 0){
							j++;
							strhtml_tableBox += '<tr class="tr-showRemarks">'
	                            +'<td>'+j+'</td>'
	                            +'<td>'+data.data.voList[i].content+'</td>'
	                            +'<td><span class="userShowLog" data-userId="'+data.data.voList[i].usercode
	                        	+'" data-proId="'+PId+'" data-proName="'+PName+'">'+data.data.voList[i].username+'</span></td>'
	                            +'<td>'+data.data.voList[i].usedtimes+'/<span class="p-red">'+data.data.voList[i].confirmtimes+'</span>小时</td>'
	                            +'<td>'+data.data.voList[i].adddate+'</td>';
							if(data.data.voList[i].isconfirm == 1){
								strhtml_tableBox += '<td><span class="p-purple">未确认</span></td>';
							}else if(data.data.voList[i].isconfirm == 2){
								strhtml_tableBox += '<td><span class="p-red">已确认</span></td>';
							}else{
								strhtml_tableBox += '<td></td>';
							}   
							strhtml_tableBox += '<td><button class="btn-blue showbtn reply-btn" data-userId="'+data.data.voList[i].usercode+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-dayTaskId="'+data.data.voList[i].id+'">回复</button></td>'
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
function searchUserByCode(usercode){
	$.ajax({
		data:"USERCODE="+sessionStorage.getItem("code"),
		type : "post",  
	    url : urlfile + "main/userListByCode",
    	processData:false,
	    //async: false,
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
				var isbelong = false;
				for(var i = 0;i<data.data.length;i++){
					if(data.data[i].usercode == usercode){
						isbelong = true;
					}
				}
				if(isbelong){
					//location.href = "/workLog/views/diary/declaration/index_pm2.html?usercode="+usercode;
					window.open("index_pm2.html?usercode="+usercode);
				}
				else{
					alert('不是本组成员，不可以查看哦');
				}
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//根据项目号及用户号，获取该人员在该项目的工作汇总
function getdayTaskSummaryByProject(PId,PName,userCode,userName){
	var strhtml_memberworkBox = "";
	$('.memberworkBox').html(strhtml_memberworkBox);
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
				for(var i = 0 ; i < data.data.length ; i++){
					count_usedtimes += data.data[i].usedtimes;
				}
				strhtml_memberworkBox = '<p class="p-blue font-big">'+userName+'</p>'
											+'<table class="tb">'
											+'<thead class="tb-head">'
											+'<tr>'
											+'<th colspan="5">'+userName+PName+'工作汇总</th>'
											+'</tr>'
											+'</thead>'
											+'<tbody class="tb-body">'
											+'<tr>'
											+'<td width="10%">序号</td>'
											+'<td width="40%">内容</td>'
											+'<td width="15">状态</td>'
											+'<td width="15%">用时（<span class="p-red">'+count_usedtimes+'</span>小时）</td>'
											+'<td width="20%">上传日期</td>'
											+'</tr>';
				for(var i = 0 ; i < data.data.length ; i++){
					var status = '已完成';
					if(data.data[i].status == 0){
						status = '未完成';
					}
					strhtml_memberworkBox += '<tr>'
					                     +'<td>'+(i+1)+'</td>'
					                     +'<td>'+data.data[i].content+'</td>'
					                     +'<td>'+status+'</td>'
					                     +'<td>'+data.data[i].usedtimes+'</td>'
					                     +'<td>'+data.data[i].adddate+'</td>'
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

//清除画布
function cleardraw(){
	var c=document.getElementById("myCanvas");
	var cxt=c.getContext("2d");
	cxt.clearRect(0,0,650,80);
}