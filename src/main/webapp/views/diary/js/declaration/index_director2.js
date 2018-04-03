// JavaScript Document
var myDate = new Date();
//获取当年的年、月份份,并显示在列表中
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
    	
    	getAllProjectByManager(sessionStorage.getItem("mangercode"),sessionStorage.getItem("mangername"),year,month);
		$(".reportBox").html('');
    });
    
	getallProjectManagerList();
	
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
		getAllProjectByManager(sessionStorage.getItem("mangercode"),sessionStorage.getItem("mangername"),cur_year,cur_month);
		$(".reportBox").html('');
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
	//横向导航条单元点击事件
	$(".horizontal-nav").delegate(".horizontal-nav-li","click",function(){
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
		if($(this).find('.img-addpro').size() == 0){
			sessionStorage.setItem("mangercode", $(this).attr("data-id")); //设置缓存键的值
			sessionStorage.setItem("mangername", $(this).text());
			getAllProjectByManager($(this).attr("data-id"),$(this).text(),date_array[0],date_array[1]);
			$(".reportBox").html('');
		}
		
		
	});
	//更多事件，显示更多一天的日报
	$(".reportBox").delegate(".more","click",function(){
		getdayTaskList($(this).attr("data-proId"),$(this).attr("data-proName"),$(this).attr("data-date"));
		$(this).remove();
	});
	//点击人名显示该人员在该项目中的工作汇总
	$(".peopleSummary").delegate(".userShowLog","click",function(){
		getdayTaskSummaryByUser($(this).attr("data-proId"),$(this).attr("data-usercode"),$(this).text());
		goToTop();
		//document.getElementById('gotop').scrollIntoView();
	});
	
	//鼠标拂过表格显示备注内容
	$('.reportBox').delegate(".tr-showRemarks","mouseover", function() {
		var remarks = $(this).find(".reply-btn").attr("data-strRemarks");
		showremark(remarks,$(this));
	}); 
	$('.reportBox').delegate(".tr-showRemarks","mouseout", function() {
		removeremark($(this));
	}); 
	
});	

//获取经理列表
function getallProjectManagerList(){
	$.ajax({
		type : "post",  
	    url : urlfile + "main/allProjectManager",
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
					alert('没有项目经理！');
					return;
				}
				else{
					var strhtml="";
					for(var i = 0 ; i<data.data.length ; i++ ) {	
						strhtml +='<li class="horizontal-nav-li" data-clicked="false" data-id="'+data.data[i].usercode+'"><span>'+data.data[i].manageName+'</span></li>';
			        }
                    //strhtml += '<li class="horizontal-nav-li showbtn addmanager-btn"><span class="img-addpro"></span><span>新增</span></li>';
					$('.horizontal-nav').html(strhtml);
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
					sessionStorage.setItem("mangercode", data.data[0].usercode); //设置缓存键的值
					sessionStorage.setItem("mangername", data.data[0].manageName);
					getAllProjectByManager(data.data[0].usercode,data.data[0].manageName,date_array[0],date_array[1]);//获取该项目经理所选月下的所有信息
				}			
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}	
//获取该项目经理所选月下的所有信息
function getAllProjectByManager(usercode,username,year,month){
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (year+'年') && $(this).text() == (month+'月')){
			$(this).css("background","#ccc");
		}
		else{
			$(this).css("background","#e7e4e4");
		}
	  });
	$.ajax({
		data :"USERCODE="+usercode+"&YEAR="+year+"&MONTH="+month,
		type : "post",  
	    url : urlfile + "main/allProjectByManager",
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
				if(data.data[0] == undefined) {
					/*alert(username+':'+year+'年'+month+'月没有任务！');*/
					$('.managerBox').html("暂无任务...");
					return;
				}
				else{
					var strhtml_managerBox = "";
					strhtml_managerBox += '<table class="tb">'
                    +'<thead class="tb-head align-left">'
                        +'<tr>'
                          +'<th colspan="7" class="align-left"> '+username+'（项目经理）</th>'
                        +'</tr>'
                    +'</thead>'
                    +'<tbody class="tb-body">'
                        +'<tr>' 
                            +'<td width="20%">项目</td>'
                            +'<td width="10%">状态</td>'
                            +'<td width="30%">参与人员</td>'
                            +'<td width="10%">总用时</td>'
                            +'<td width="10%">开始时间</td>'
                            +'<td width="10%">结束时间</td>'
                            +'<td width="10%">操作</td>'
                        +'</tr>';
					for(var i = 0; i < data.data.length ; i++){
						strhtml_managerBox += '<tr>'
							+'<td>'+data.data[i].name+'</td>'
                            +'<td>';
						if(data.data[i].status == 1){
							strhtml_managerBox += '<span class="p-red">已完成</span>';
						}
						else{
							strhtml_managerBox += '<span class="p-purple">未完成</span>';
						}    
                        strhtml_managerBox += '</td>'+'<td>';
                        for(var j = 0;j<data.data[i].userList.length;j++){
                        	strhtml_managerBox += '<a class="p-edit userShowLog" data-usercode="'+data.data[i].userList[j].usercode+'" data-proId="'+data.data[i].id+'">'+data.data[i].userList[j].userName+'</a>';
                        } 
                        strhtml_managerBox += '</td>'
                            +'<td>'+data.data[i].allTime+'小时</td>'
                            +'<td>'+data.data[i].startTime+'</td>'
                            +'<td>'+data.data[i].endTime+'</td>'
                            +'<td>'
                                +'<button class="btn-blue showbtn remark-btn" data-Id="'+data.data[i].id+'" data-remarks="'+data.data[i].remarks+'">备注</button>'
                            +'</td>'
                        +'</tr>';
					}   
					strhtml_managerBox +='</tbody>'
				                    +'<tfoot class="tb-foot">'
				                    +'</tfoot>'
				                    +'</table>';
					$('.managerBox').html(strhtml_managerBox);
				}			
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//根据项目号、人员号显示其在该项目下的任务列表，按日期分
function getdayTaskSummaryByUser(proId,usercode,username){
	$.ajax({
		data:"PROJECT_ID="+proId+"&USERCODE="+usercode,
		type : "post",  
	    url : urlfile + "worklog/dayTaskSummaryByUser",
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
//				console.log(data.data[0].voList.length);
				if(data.data.length > 0){
					if(data.data[0].voList.length == 0){
						alert(username+"暂无日报！");
					}
					else{
						var strhtml_reportBox = "";
						strhtml_reportBox += '<p class="p-blue font-big">'+username+'工作日报</p>';
						for(var i = 0 ; i < data.data.length ; i++){
							strhtml_reportBox += '<div class="margin-tb">'
	                        +'<p class="p-blue">'+data.data[i].workdate+'</p>'
	                        +'<div class="tableBox clear">'
	                            +'<table class="tb-half float-left">'
	                                +'<thead class="tb-head">'
	                                    +'<tr>'
	                                      +'<th colspan="6">今日已完成</th>'
	                                    +'</tr>'
	                                +'</thead>'
	                                +'<tbody class="tb-body">'
	                                    +'<tr>'
	                                        +'<td width="5%">序号</td>'
	                                        +'<td width="40%">内容</td>'
	                                        +'<td width="16%">上传/确认用时</td>'
	                                        +'<td width="14%">上传日期</td>'
	                                        +'<td width="10%">确认</td>'
	                                        +'<td width="15%">操作</td>'
	                                    +'</tr>';
							for(var j = 0; j <data.data[i].voList.length ; j++){
								var count = 0;
								if(data.data[i].voList[j].status == 1){
									count++;
									strhtml_reportBox += '<tr class="tr-showRemarks">'
		                                +'<td>'+count+'</td>'
		                                +'<td>'+data.data[i].voList[j].content+'</td>'
		                                +'<td>'+data.data[i].voList[j].usedtimes+'/<span class="p-red">'+data.data[i].voList[j].confirmtimes+'</span>小时</td>'
		                                +'<td>'+data.data[i].voList[j].adddate+'</td>';
									if(data.data[i].voList[j].isconfirm == 1){
										strhtml_reportBox += '<td><span class="p-purple">未确认</span></td>';
									}else if(data.data[i].voList[j].isconfirm == 2){
										strhtml_reportBox += '<td><span class="p-red">已确认</span></td>';
									}else{
										strhtml_reportBox += '<td></td>';
									}
	                                strhtml_reportBox += '<td><button class="btn-blue showbtn reply-btn" data-day="'+data.data[i].workdate+'" data-proId="'+proId+'" data-userId="'+data.data[i].voList[j].usercode+'" data-strRemarks="'+data.data[i].voList[j].strRemarks+'" data-dayTaskId="'+data.data[i].voList[j].id+'">回复</button></td>'
		                            	+'</tr>';
								}
							}
							strhtml_reportBox += '</tbody></table>';
							
							strhtml_reportBox += '<table class="tb-half float-left">'
		                                +'<thead class="tb-head">'
		                                    +'<tr>'
		                                      +'<th colspan="6">今日未完成</th>'
		                                    +'</tr>'
		                                +'</thead>'
		                                +'<tbody class="tb-body">'
		                                    +'<tr>'
		                                        +'<td width="5%">序号</td>'
		                                        +'<td width="40%">内容</td>'
		                                        +'<td width="16%">上传/确认用时</td>'
		                                        +'<td width="14%">上传日期</td>'
		                                        +'<td width="10%">确认</td>'
		                                        +'<td width="15%">操作</td>'
		                                    +'</tr>';
								for(var j = 0; j <data.data[i].voList.length ; j++){
									var count = 0;
									if(data.data[i].voList[j].status == 0){
										count++;
										strhtml_reportBox += '<tr class="tr-showRemarks">'
			                                +'<td>'+count+'</td>'
			                                +'<td>'+data.data[i].voList[j].content+'</td>'
			                                +'<td>'+data.data[i].voList[j].usedtimes+'/<span class="p-red">'+data.data[i].voList[j].confirmtimes+'</span>小时</td>'
			                                +'<td>'+data.data[i].voList[j].adddate+'</td>';
										if(data.data[i].voList[j].isconfirm == 1){
											strhtml_reportBox += '<td><span class="p-purple">未确认</span></td>';
										}else if(data.data[i].voList[j].isconfirm == 2){
											strhtml_reportBox += '<td><span class="p-red">已确认</span></td>';
										}else{
											strhtml_reportBox += '<td></td>';
										}
		                                strhtml_reportBox += '<td><button class="btn-blue showbtn reply-btn" data-day="'+data.data[i].workdate+'" data-proId="'+proId+'" data-userId="'+data.data[i].voList[j].usercode+'" data-strRemarks="'+data.data[i].voList[j].strRemarks+'" data-dayTaskId="'+data.data[i].voList[j].id+'">回复</button></td>'
			                            	+'</tr>';
									}
								}
								strhtml_reportBox += '</tbody></table>';
								strhtml_reportBox += '</div></div>';
						}
						$('.reportBox').html(strhtml_reportBox);
					}
					
				}
				else{
					alert(username+"暂无任务");
				}				
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
