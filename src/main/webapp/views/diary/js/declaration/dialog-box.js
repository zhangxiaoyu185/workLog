// JavaScript Document

$(function () {
	var projectLi="";
	var	assignment_html = '<p class="p-dialog-left">本周主要任务：</p>'
						+'<ul class="dialog-list">'+'<li class="dialog-list-li">'
						+'<span class="p-num"></span>'
						+'<div class="select-box text-pro">'+'<input class="select-item" dataId="" type="text" value="请选择所属项目" readonly="readonly">'
						+'<input class="weekId" type="hidden" value="">'
						+'<ul class="select-ul">';
	$.ajax({
		data:"USERCODE="+sessionStorage.getItem("code"),
		type : "post",  
	    url : urlfile+"project/getModelByUCode",
	    processData:false,
	    async: false,
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
				$.each(data.data, function(i, item) {
					projectLi=projectLi+"<li data_id='"+item.projectId+"'>"+item.projectName+"</li><input type='hidden' id='projectId_"+item.id+"' class='input-text' name='name' value='"+item.id+"'/>";
				});
				assignment_html=assignment_html+projectLi+"</ul>"
							+"</div>"
							+"<div class='newAssignment-module-group'>"
							+"<span><font color='red'>*</font>开始日期：</span><input type='text' readonly class='dialog-select text-datepicker start' />"
							+"<span><font color='red'>*</font>结束日期：</span><input type='text' readonly class='dialog-select text-datepicker end' />"
							+"<textarea class='dialog-textarea newAssignment-textarea' id='taskContent'>本周需完成的任务</textarea>"
							+"</div></li></ul>";
			} else {
				alert(data.errMsg);
			}
		}		
	});	
	//日志上报模块，完成任务情况模块字段
	var addlog_html1 = '<li class="dialog-list-li">',
	    addlog_html2 ='<span class="p-num">1、</span>',
	    addlog_html3 ='<textarea class="dialog-textarea log-textarea" id="taskContent"></textarea>',
	    addlog_html4 ='<div class="dialog-module-group">'
	                            +'<div class="select-box text-pro">'
	                            +'<input class="select-item" id="select-item" type="text" dataId="" taskId="" value="请选择所属项目" readonly="readonly">'
	                            +'<ul class="select-ul">'+projectLi+'<li data_id="0">综合项目</li>'
	                            +'</ul>'
	                        +'</div>'
	                            +'<div class="dialog-magintop">'
	                                +'<input type="text" class="dialog-text usetime-text" id="usedTimes" value="请输入用时" /><span class="p-dialog-right">小时</span>' 
	                            +'</div>'
	                        +'</div>',
		addlog_html5 ='<span class="p-del">删除</span>',
	    addlog_html6 ='</li>';
	var addlog_finish_count = 1 , addlog_unfinish_count = 1 ;
	
	report_html = '<div class="select-box text-status margin-l">'
					+'<input class="select-item status" statusId="" type="text" value="状态" readonly="readonly">'
				    +'<ul class="select-ul">'
				    +'<li startId="1">已完成</li>'
				    +'<li startId="0">未完成</li>'
				    +'</ul>'
				    +'</div>'
					+'<ul class="dialog-list  margin-l">'
					+'</ul>';
			//+'<p class="dialog-btn-add addlog_finish"><span class="img-add"></span><span>再增加一条</span></p>'

	//设置输入框中初始的文字	
	var pre_str = '';
						
	//点击按钮触发遮罩弹框事件
	$("body").delegate(".showbtn","click",function(){
		closeDialogBox();
        $(".dialog-bg").css({
            display: "block", height: $(window).height()
        });
        var $box = $('.dialog-box');
		$box.css('display','block');
		var boxTop = 0;
		
		//判断是哪个弹窗模块，并显示
		boxTop=publishDialogModel($(this),boxTop);
		//这是新增周任务模块
		if($(this).hasClass('newAssignment-btn')){
			$(".newAssignment-box").show();
			var thisbtn=$(this);
			var thisbox=$(".newAssignment-box");
			$(".newAssignment-box").find('.dialog-module-content').html(assignment_html); 
			/*$(".newAssignment-box").find('.start').val(date_array[0]+"-"+date_array[1]+"-"+date_array[2]);
			$(".newAssignment-box").find('.end').val(date_array[0]+"-"+date_array[1]+"-"+(parseInt(date_array[2])+1));*/
			//日期选择
			thisbox.find(".text-datepicker").datepicker();
			setlimitWeekDate(thisbox);
			thisbox.find('.start').val('开始日期');
			thisbox.find('.end').val('结束日期');
			thisbox.find('input').css("color","#ccc");
			$(".newAssignment-textarea").on("focus",function(){
				$(this).css("color","#000");
			});
			$(".newAssignment-textarea").on("blur",function(){
				if($(this).val() == "本周需完成的任务"){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
				
			});
			getModelByUCode(thisbox);
			$(".newAssignment-box").unbind().delegate(".dialog-btn","click",function(){
				if($(".newAssignment-box").find('.select-item').attr("dataId")==''){
					alert('请选择项目！');
					return false;
				}
				if($(".newAssignment-box").find('.start').val()=='开始日期' || $(".monthAssignment-box").find('.start').val()==''){
					alert('请选择开始日期！');
					return false;
				}
				if($(".newAssignment-box").find('.end').val()=='结束日期'||$(".monthAssignment-box").find('.end').val()==''){
					alert('请选择结束日期！');
					return false;
				}
				if($(".newAssignment-box").find('.newAssignment-textarea').val()=='本周需完成的任务' || $(".monthAssignment-box").find('.newAssignment-textarea').val()==''){
					alert('请输入本周任务内容！');
					return;
				}
				var dateDiff= DateDiff($(".newAssignment-box").find('.start').val(),$(".newAssignment-box").find('.end').val());
				if(dateDiff<=1){
					alert('结束日期需大于开始日期！');
					return;
				}
				var taskGrid=$(".newAssignment-box").find('.newAssignment-textarea').val()+"|"+$(".newAssignment-box").find('.select-item').attr("dataId")+"|"+$(".newAssignment-box").find('.start').val()+"|"+$(".newAssignment-box").find('.end').val()+"|";
				setAddMWTask('WT',taskGrid);
				closeDialogBox();
				refreshReplyMWTaskList('WT',date_array[0],date_array[1],function(data){
//					console.log(data);
					thisbtn.parents(".rightContent").find(".mList").html(data);
					//限制文字显示，省略号
					$(".week-proname").each(function(){
				    	var thistext=$(this);
				    	limitShow(8,thistext);
					});
					$(".week-content").each(function(){
				    	var thistext=$(this);
				    	limitShow(20,thistext);
					});
				});
			});
			
			boxTop = ($(window).height() - $('.newAssignment-box').height()) / 2 + $(window).scrollTop();
		}
		//这是新增月任务模块
		else if($(this).hasClass('monthAssignment-btn')){
			$(".monthAssignment-box").show();
			var thisbtn=$(this);
			var thisbox=$(".monthAssignment-box");
			$(".monthAssignment-box").find('.monthTitle').text('新增月任务');
			$(".monthAssignment-box").find('.dialog-module-content').html(assignment_html); 
			$(".monthAssignment-box").find('.p-dialog-left').text('本月主要任务：'); 
			$(".monthAssignment-box").find('.newAssignment-textarea').text('本月需完成的任务');
			/*$(".monthAssignment-box").find('.start').val(date_array[0]+"-"+date_array[1]+"-"+date_array[2]);
			$(".monthAssignment-box").find('.end').val(date_array[0]+"-"+date_array[1]+"-"+(parseInt(date_array[2])+1));*/
			//日期选择
			thisbox.find(".text-datepicker").datepicker();
			setlimitMonthDate(thisbox);
			thisbox.find('.start').val('开始日期');
			thisbox.find('.end').val('结束日期');
			thisbox.find('input').css("color","#ccc");
			$(".newAssignment-textarea").on("focus",function(){
				$(this).css("color","#000");
			});
			$(".newAssignment-textarea").on("blur",function(){
				if($.trim($(this).val()) == "本月需完成的任务" || $.trim($(this).val()) == ""){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
				$(this).val($.trim($(this).val()));
			});
			getModelByUCode(thisbox);
			$(".monthAssignment-box").unbind().delegate(".dialog-btn","click",function(){
				if($(".monthAssignment-box").find('.select-item').attr("dataId")==''){
					alert('请选择项目！');
					return false;
				}
				if($(".monthAssignment-box").find('.start').val()=='开始日期' || $(".monthAssignment-box").find('.start').val()==''){
					alert('请选择开始日期！');
					return false;
				}
				if($(".monthAssignment-box").find('.end').val()=='结束日期'||$(".monthAssignment-box").find('.end').val()==''){
					alert('请选择结束日期！');
					return false;
				}
				var dateDiff= DateDiff($(".monthAssignment-box").find('.start').val(),$(".monthAssignment-box").find('.end').val());
				if(dateDiff<=1){
					alert('结束日期需大于开始日期！');
					return;
				}
				if($.trim($(".monthAssignment-box").find('.newAssignment-textarea').val())=='本月需完成的任务' || $.trim($(".monthAssignment-box").find('.newAssignment-textarea').val())==''){
					alert('请输入本月任务内容！');
					return;
				}
				var taskGrid=$.trim($(".monthAssignment-box").find('.newAssignment-textarea').val())+"|"+$(".monthAssignment-box").find('.select-item').attr("dataId")+"|"+$(".monthAssignment-box").find('.start').val()+"|"+$(".monthAssignment-box").find('.end').val()+"|";
				setAddMWTask('MT',taskGrid);
				closeDialogBox();
				refreshReplyMWTaskList('MT',date_array[0],date_array[1],function(data){
					thisbtn.parents(".monthBox").find(".mList").html(data);
					$(".week-proname").each(function(){
				    	var thistext=$(this);
				    	limitShow(8,thistext);
					});
					$(".week-content").each(function(){
						var thistext=$(this);
						limitShow(20,thistext);
					});
				});
			});
			boxTop = ($(window).height() - $('.monthAssignment-box').height()) / 2 + $(window).scrollTop();
		}
		//这是备注模块(月任务和周任务)
		else if($(this).hasClass('remark-btn')){
			$(".remark-box").show();
			var thisbtn = $(this);
			$(".remark-textarea").css("color","#ccc");
			$(".remark-textarea").on("focus",function(){
				$(this).css("color","#000");
			});
			$(".remark-textarea").on("blur",function(){
				if($.trim($(this).val()) == "需要补充的内容" || $.trim($(this).val()) == ""){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
				$(this).val($.trim($(this).val()));
			});
			if($.trim(thisbtn.attr("data-remarks"))=='undefined' || $.trim(thisbtn.attr("data-remarks")) == ""){
				$(".remark-box").find('.remark-textarea').val('需要补充的内容');
			}else{
				$(".remark-box").find('.remark-textarea').val(thisbtn.attr("data-remarks"));
			}
			$(".remark-box").unbind().delegate(".dialog-btn","click",function(){
				var remarks = $.trim($(".remark-box").find('.remark-textarea').val());
				if($.trim(remarks) == '需要补充的内容' || $.trim(remarks) == ''){
					alert("请输入内容后再提交!");
					$(".remark-box").find(".remark-textarea").focus();
				}else{
					if(thisbtn.attr("remarksType")=='M'){
						setUpdateRemarks(1,thisbtn.attr("remarksId"),remarks);
					}else if(thisbtn.attr("remarksType")=='W'){
						setUpdateRemarks(2,thisbtn.attr("remarksId"),remarks);
					}
					closeDialogBox();
					thisbtn.attr("data-remarks",$.trim($(".remark-box").find('.remark-textarea').val()));
				}
			});
			boxTop = ($(window).height() - $('.remark-box').height()) / 2 + $(window).scrollTop();
		}
		//这是日报备注模块
		else if($(this).hasClass('reply-btn')){
			$(".remark-box").show();
			var thisbtn = $(this);
			$(".remark-box").find('.remark-textarea').val('需要补充的内容');
			$(".remark-box").find('.remark-textarea').css("color","#ccc");
			$(".remark-textarea").on("focus",function(){
				$(this).css("color","#000");
			});
			$(".remark-textarea").on("blur",function(){
				if($.trim($(this).val()) == "需要补充的内容" || $.trim($(this).val()) == ""){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
				$(this).val($.trim($(this).val()));
			});
			$(".remark-box").unbind().delegate(".dialog-btn","click",function(){
				if($.trim($(".remark-box").find(".remark-textarea").val()) == '需要补充的内容' || $.trim($(".remark-box").find(".remark-textarea").val()) == ''){
					alert("请输入内容后再提交!");
					$(".remark-box").find(".remark-textarea").focus();
				}else{
					setAddReply(thisbtn.attr("data-userId"),$(".remark-box").find('.remark-textarea').val(),thisbtn.attr("dayTaskId"));
					closeDialogBox();
					refreshReplyDayTaskList(thisbtn.attr('data-workdate'),thisbtn.attr('dayTaskId'),Date,function(data){
//						console.log(data);
						thisbtn.parents(".reportBox").html(data);
					});
				}
			});
			boxTop = ($(window).height() - $('.remark-box').height()) / 2 + $(window).scrollTop();
		}
		//这是修改模块
		else if($(this).hasClass('modify-btn')){
			$(".modify-box").show();
			var thisbox = $(".modify-box");
			
			//判断是周任务修改还是日志修改
			if($(this).hasClass('p-edit')){
				//修改周任务
				if($(this).hasClass('weekTask')){
					var thisbtn = $(this);
					/*$(".modify-box").find('.dialog-module-content').html(assignment_html); 	
					$(".modify-box").find('.select-item').attr("dataId",thisbtn.attr("projectId"));
					$(".modify-box").find('.select-item').val($(this).parent('.mList-p-note').find('.week-proname').text());*/
					
					/*$(".modify-box").find('.newAssignment-textarea').text($(this).parent('.mList-p-note').find('.week-content').attr('title'));*/
					$(".modify-box").find('.dialog-module-content').html(assignment_html); 	
					thisbox.find('input').css("color","#000");
					thisbox.find('textarea').css("color","#000");
					$(".modify-box").find('.dialog-btn').attr("fromType","WT");
					$(".modify-box").find('.select-item').attr("dataId",$(this).attr("projectid"));
					$(".modify-box").find('.select-item').val($(this).parents('.mList-p-note').find('.week-proname').text());
					thisbox.find(".text-datepicker").datepicker();
					setlimitWeekDate(thisbox);
					$(".modify-box").find('.start').val($(this).parents('.mList-p-note').find('.week-start').text());
					$(".modify-box").find('.end').val($(this).parents('.mList-p-note').find('.week-end').text());
					$(".modify-box").find('.newAssignment-textarea').text($(this).parents('.mList-p-note').find('.week-content').text());
					/*$(".modify-box").find('.weekId').val($(this).parent('.mList-p-note').attr("wid"));*/
					$(".newAssignment-textarea").on("focus",function(){
						$(this).css("color","#000");
					});
					$(".newAssignment-textarea").on("blur",function(){
						if($.trim($(this).val()) == "本周需完成的任务" || $.trim($(this).val()) == ""){
							$(this).css("color","#ccc");
						}
						else{
							$(this).css("color","#000");
						}
						$(this).val($.trim($(this).val()));
					});
					//日期选择
					/*$(".text-datepicker").datepicker();*/
					getModelByUCode(thisbox);
					$(".modify-box").unbind().delegate(".dialog-btn","click",function(){
						var startTime=$(".modify-box").find('.start').val();
						var endTime=$(".modify-box").find('.end').val();
						var textarea=$(".modify-box").find('.newAssignment-textarea').val();
						
						if($.trim($(".modify-box").find('.newAssignment-textarea').val()) == '本周需完成的任务' || $.trim($(".modify-box").find('.newAssignment-textarea').val()) == ''){
							alert("请输入本周任务内容后再提交!");
							$(".modify-box").find('.newAssignment-textarea').focus();
						}else{
							setUpdateReply('WT',thisbtn.attr("data_id"),$(".modify-box").find('.select-item').attr("dataId"),textarea,startTime,endTime);
							closeDialogBox();
							refreshReplyWeekTaskList(thisbtn.attr("sequence"),thisbtn.attr("data_id"),Date,function(data){
								thisbtn.parents(".mList-li").html(data);
								$(".week-content").each(function(){
									var thistext=$(this);
									limitShow(20,thistext);
								});
							});
						}
						
					});
				}
			}
			//修改日报模块
			else if($(this).hasClass('btn-blue')){
				var thisbtn=$(this);
				$(".modify-box").find('.dialog-module-content').html(report_html); 
				$(".modify-box").find('.dialog-module-content').find('.dialog-list').append(addlog_html1+addlog_html3+addlog_html4+addlog_html6);
				$(".modify-box").find('.select-item').val($(this).attr("projectName"));
				var startCH='已完成';
				if('0'==$(this).attr("status")){
					startCH='未完成';
				}
				$(".modify-box").find('.status').val(startCH);
				$(".modify-box").find('.status').attr("statusId",$(this).attr("status"));
				$(".modify-box").find('.select-item').attr("dataId",$(this).attr("projectId"));
				$(".modify-box").find('.usetime-text').val($(this).attr("usedtimes"));
				$(".usetime-text").keydown(function (e) {
		            numberformat(this);
		        });
				
				$(".usetime-text").css("color","#ccc");
				$(".usetime-text").on("focus",function(){
					$(this).css("color","#000");
				});
				$(".usetime-text").on("blur",function(){
					if($(this).val() == 0){
						$(this).css("color","#ccc");
					}
					else{
						$(this).css("color","#000");
					}
				});
				$(".modify-box").find('.log-textarea').text($(this).attr("content"));
				
				$(".log-textarea").css("color","#ccc");
				$(".log-textarea").on("focus",function(){
					$(this).css("color","#000");
				});
				$(".log-textarea").on("blur",function(){
					if($.trim($(this).val()) == "需要补充的内容" || $.trim($(this).val()) == ""){
						$(this).css("color","#ccc");
					}
					else{
						$(this).css("color","#000");
					}
					$(this).val($.trim($(this).val()));
				});
				thisbox.find('input').css("color","#000");
				thisbox.find('textarea').css("color","#000");
				getModelByUCode(thisbox);
				$(".modify-box").unbind().delegate(".dialog-btn","click",function(){
					var textarea=$.trim($(".modify-box").find('.log-textarea').val());
					var usetimeText=$.trim($(".modify-box").find('.usetime-text').val());
					if(textarea=='' || '需要补充的内容'==textarea){
						alert("请输入内容后再提交!");
						$(".modify-box").find('.log-textarea').css("color","#ccc");
						$(".modify-box").find(".log-textarea").focus();
					}else if(usetimeText=='' || '0'==usetimeText){
						alert("请输入工时后再提交!");
						$(".modify-box").find('.usetime-text').css("color","#ccc");
						$(".modify-box").find(".usetime-text").focus();
					}else{
						setUpdateReply('DT',thisbtn.attr("data_id"),$('#select-item').attr("dataId"),textarea,usetimeText,$(".modify-box").find('.status').attr("statusId"));
						closeDialogBox();
						refreshReplyDayTaskList(thisbtn.attr('data-workdate'),thisbtn.attr('dayTaskId'),Date,function(data){
							thisbtn.parents(".reportBox").html(data);
						});
					}
				});
			}
			//$(".text-datepicker").datepicker();
			boxTop = ($(window).height() - $('.modify-box').height()) / 2 + $(window).scrollTop();
		}
		
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });
		
		//只能输入浮点数
		/*$(".dialog-list").delegate(".dialog-text","click",function(){
			$(this).numeral(true);
		});*/
		
		//下拉选择框
		$(".dialog-box").children().not('.logReport-box').delegate(".select-item","click",function(){
			//$(".select-item").unbind().click(function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find("li").unbind().click(function(){
					thisinput.val($(this).text());
					limitShow(20,thisinput);
					thisinput.attr("dataId",$(this).attr("data_id"));
					thisinput.attr("statusId",$(this).attr("startId"));
					if(thisinput.val() == '请选择所属项目'){
						thisinput.css("color","#ccc");
					}else{
						thisinput.css("color","#000");
					}
					thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		}).delegate(".dialog-textarea","keyup",function(){
			//文本框限制字数
			var thistext = $(this);
			limitInput(256,thistext);
		}).not('.logReport-box').delegate(".dialog-textarea","focus",function(){  
			if($(this).val() == "本周需完成的任务"){
			// 如果符合条件，则清空文本框内容       
				$(this).val(""); 
				pre_str = '本周需完成的任务';
			}
			else if($(this).val() == "本月需完成的任务"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");     
				pre_str = '本月需完成的任务';
			}
			else if($(this).val() == "请输入今日已完成任务"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入今日已完成任务';
			}
			else if($(this).val() == "请输入今日未完成任务"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入今日未完成任务';
			}
			else if($(this).val() == "需要补充的内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '需要补充的内容';
			}
			else if($(this).val() == "输入备注内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '输入备注内容';
			}
			else if($(this).val() == "输入工作内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '输入工作内容';
			}
			$(this).css("color","#000");
		}).delegate(".dialog-textarea","blur",function(){
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		}).delegate(".dialog-text","focus",function(){   
		// 数字输入框得到鼠标焦点  
			if($(this).val() == "请输入用时"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入用时';
			}
			else if($(this).val() == "请输入预计工时"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入预计工时';
			}
			$(this).css("color","#000");
		}).delegate(".dialog-text","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		});
		

    });
	
  //点击关闭按钮的时候，遮罩层关闭
    $(".close").click(function () {
		
    	closeDialogBox();
    });
});
function setUpdateRemarks(type,Id,remarks,thisbtn){
	$.ajax({
		data:"REMARKS_TYPE="+type+"&ID="+Id+"&REMARKS="+encodeURIComponent(remarks),
		type : "post",  
	    url : urlfile + "main/updateRemarks",
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
				//thisbtn.attr("data-strRemarks",$(".remark-box").find('.remark-textarea').val());
                alert("任务备注操作成功！");
			} else {
				alert("任务备注操作失败！");
			}
		}		
	}); 
}

function setUpdateReply(type,Id,typeId,textarea,param1,param2){
//	console.log(type+","+Id+","+typeId+","+textarea+","+param1+","+param2);
	if(type=="WT"){
		$.ajax({
			data:"&ID="+Id+"&CONTENT="+encodeURIComponent(textarea)+"&PROJECT_ID="+typeId+"&START_TIME="+param1+"&END_TIME="+param2,
			type : "post",  
			async: false,
		    url : urlfile+"worklog/updateWeekTask",
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
					alert('修改成功!');
				} else {
					alert(data.errMsg);
				}
			}		
		});
	}else if(type=="DT"){
		$.ajax({
			data:"&STATUS="+param2+"&ID="+Id+"&CONTENT="+encodeURIComponent(textarea)+"&PROJRCT_ID="+typeId+"&USEDTIMES="+param1,
			type : "post", 
			async: false,
		    url : urlfile+"worklog/updateDayTask",
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
					alert("修改日报成功！");
				} else {
					alert(data.errMsg);
				}
			}		
		});
	}
}
//日报添加备注
function setAddReply(userId,strRemarks,dayTaskId){
	$.ajax({
		data:"USERCODE="+userId+"&CONTENT="+encodeURIComponent(strRemarks)+"&DAYTASK_ID="+dayTaskId,
		type : "post",
		async: false,
	    url : urlfile + "main/addReply",
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
                alert("添加备注成功！");
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

function setAddMWTask(type,grid){
	var urlTask=urlfile+"worklog/addMonthTask";
	if(type=='WT'){
		urlTask=urlfile+"worklog/addWeekTask";
	}
	$.ajax({
		data:"&USERCODE="+sessionStorage.getItem("code")+"&TYPE=1&TASKGRID="+grid,
		type : "post",
		async: false,
	    url : urlTask,
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
				alert("新增任务成功！");
			} else {
				alert("新增任务失败！");
			}
		}		
	});
}

function refreshReplyMWTaskList(type,year,month,fn){
	var urlStr='worklog/weekAndDayTaskList';	
	var params='&USERCODE='+sessionStorage.getItem('code')+'&YEAR='+year+'&MONTH='+month+'&WEEK='+date_array[2]+'&TYPE=0'+"&NOW_WEEK="+date_array[2];
	if(type=='MT'){
		urlStr='worklog/monthTaskList';
		params='&USERCODE='+sessionStorage.getItem('code')+'&YEAR='+year+'&MONTH='+month;
	}
	$.ajax({
		data:params,
		type : "post",  
	    url : urlfile+urlStr,
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
				var mwList='';
				
				var y = 0;
				if(type=='MT'){
					$.each(data.data, function(i, item) {
						y++;
						mwList+='<li class="mList-li">'+
	                        '<p class="mList-p-note">';
						mwList+='<span class="p-normal">';
						if(item.type=='0'){
                    		mwList+='<span style="color:red">*</span>';
						}
						else{
							mwList+='<span>&nbsp;&nbsp;</span>';
						}
						mwList+='<span>'+y+'、</span>'+
								'<span class="week-start">'+item.startTime+'</span>'+
								'<span> - </span>'+
								'<span class="week-end">'+item.endTime+'</span>'+
								'<span>&nbsp;</span>'+
								'<span class="week-proname" title="'+item.projectName+'">'+item.projectName + '</span>'+
								'<span>，</span>'+
								'<span class="week-content" title="'+item.content+'">'+item.content + '</span>'+
							'</span>';
						mwList+='<span class="p-edt">';
						if(item.status=='0'){
							mwList+='<span class="p-edit p-isfinish" taskType="m" data_id="'+item.id+'" >完成</span>';
						}else{
							mwList+='<span class="p-finish">√已完成</span>';
						}
						mwList+='<span class="p-edit showbtn remark-btn monthRemarks"  remarksId="'+item.id+'" remarksType="M"  data-remarks="'+item.remarks+'">备注</span>' +
								'</span></p></li>';
			        });
				}else if (type=='WT') {
					var w=0;
					$.each(data.data.weekTaskVOList, function(i, item) {	
						w++;
						mwList+='<li class="mList-li">'+
	                        '<p class="mList-p-note">'+
	                    	'<span class="p-normal">'+
								'<span>'+w+'、</span>'+
								'<span class="week-start">'+item.startTime+'</span>'+
								'<span> - </span>'+
								'<span class="week-end">'+item.endTime+'</span>'+
								'<span>&nbsp;</span>'+
								'<span class="week-proname" title="'+item.projectName+'">'+item.projectName + '</span>'+
								'<span>，</span>'+
								'<span class="week-content" title="'+item.content+'">'+item.content + '</span>'+
							'</span>'+
							'<span class="p-edt">';
						if(item.status=='0'){
							mwList+='<span class="p-edit p-isfinish" taskType="w" data_id="'+item.id+'">完成</span>'
							+'<span class="p-edit showbtn modify-btn weekTask" taskType="WT" data_id="'+item.id+'" projectId="'+item.projectId+'" sequence="'+w+'" >修改</span>';
						}else{
							mwList+='<span class="p-finish">√已完成</span>';
						}
						mwList+='<span class="p-edit showbtn remark-btn weekRemarks" remarksId="'+item.id+'" remarksType="W" data-remarks="'+item.remarks+'">备注</span>' +
								'</span></p></li>';
						y++;
			        });
				}
				fn && fn(mwList);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//更新添加备注后的日报列表
function refreshReplyDayTaskList(dataWorkdate,dayId,Date,fn){
//	console.log("dataWorkdate:"+dataWorkdate);
	var strdata="&WORKDATE="+dataWorkdate+"&USERCODE="+sessionStorage.getItem("code");
	var commonDT='';
	$.ajax({
		data:strdata,
		type : "post",  
		async: false,
	    url : urlfile + "worklog/dayTaskListByIUW",
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
//				console.log(data.data);
				var now = curentTime();
				var daysDiff=DateDiff(data.data.workdate,now);
				commonDT+="<div class='reportBox'><p class='p-blue'>"+data.data.workdate+"</p>"+
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
	        	for (var i = 0; i < data.data.voList.length; i++) {
	        		if(data.data.voList[i].status=='1'){
	        			c_l++;
	        			completedList+='<tr class="tr-showRemarks">'+
								        				'<td>'+c_l+'</td>'+
								        				'<td>'+data.data.voList[i].projectName+'</td>'+
								        				'<td>'+data.data.voList[i].content+'</td>'+
								        				'<td>'+data.data.voList[i].usedtimes+'/<span class="p-red">'+data.data.voList[i].confirmtimes+'</span>小时</td>'+
								        				'<td>'+data.data.voList[i].adddate+'</td>';
        				if(data.data.voList[i].isconfirm == 1){
        					completedList += '<td><span class="p-purple">未确认</span></td>';
						}else if(data.data.voList[i].isconfirm == 2){
							completedList += '<td><span class="p-red">已确认</span></td>';
						}else{
							completedList += '<td></td>';
						}
        				completedList+='<td>';
			        	if(daysDiff==1){
			        		completedList+='<button class="btn-blue showbtn modify-btn dayTask" projectId="'+data.data.voList[i].projectId+'" projectName="'+data.data.voList[i].projectName+'" content="'+data.data.voList[i].content+'" usedtimes="'+data.data.voList[i].usedtimes+'" taskType="DT" data_id="'+data.data.voList[i].id+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-workdate="'+data.data.voList[i].workdate+'" status="'+data.data.voList[i].status+'" >修改</button>'+
			        						'<button class="btn-blue del-btn" dayTaskId="'+data.data.voList[i].id+'">删除</button>';
			        	}else{
			        		completedList+='<button class="btn-blue showbtn reply-btn" projectId="'+data.data.voList[i].projectId+'" projectName="'+data.data.voList[i].projectName+'" dayTaskId="'+data.data.voList[i].id+'" data-userId="'+data.data.voList[i].usercode+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-workdate="'+data.data.voList[i].workdate+'" >备注</button>';
			        	}
			        	completedList+='</td></tr>';
	        		}else{
	        			c_r++;
	        			unfinishedList+='<tr class="tr-showRemarks">'+
									        			'<td>'+c_r+'</td>'+
									        			'<td>'+data.data.voList[i].projectName+'</td>'+
								        				'<td>'+data.data.voList[i].content+'</td>'+
								        				'<td>'+data.data.voList[i].usedtimes+'/<span class="p-red">'+data.data.voList[i].confirmtimes+'</span>小时</td>'+
								        				'<td>'+data.data.voList[i].adddate+'</td>';
        				if(data.data.voList[i].isconfirm == 1){
        					unfinishedList += '<td><span class="p-purple">未确认</span></td>';
						}else if(data.data.voList[i].isconfirm == 2){
							unfinishedList += '<td><span class="p-red">已确认</span></td>';
						}else{
							unfinishedList += '<td></td>';
						}
        				unfinishedList+='<td>';
	        			if(daysDiff==1){
	        				unfinishedList+='<button class="btn-blue showbtn modify-btn dayTask" projectId="'+data.data.voList[i].projectId+'" projectName="'+data.data.voList[i].projectName+'" content="'+data.data.voList[i].content+'" usedtimes="'+data.data.voList[i].usedtimes+'" taskType="DT" data_id="'+data.data.voList[i].id+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-workdate="'+data.data.voList[i].workdate+'" status="'+data.data.voList[i].status+'">修改</button>'+
	        								'<button class="btn-blue del-btn" dayTaskId="'+data.data.voList[i].id+'">删除</button>';
	        			}else{
			        		unfinishedList+='<button class="btn-blue showbtn reply-btn" projectId="'+data.data.voList[i].projectId+'" dayTaskId="'+data.data.voList[i].id+'" data-userId="'+data.data.voList[i].usercode+'" data-strRemarks="'+data.data.voList[i].strRemarks+'" data-workdate="'+data.data.voList[i].workdate+'">备注</button>';
			        	}
	        			unfinishedList+='</td></tr>';
	        		}
	        		
	        	}
	        	commonDT=commonDT+completedList+"</tbody></table>"+unfinishedList+"</tbody></table></div></div>";

                fn && fn(commonDT);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//更新周任务
function refreshReplyWeekTaskList(sequence,pId,Date,fn){
	var strdata="ID="+pId+"&USERCODE="+sessionStorage.getItem("code");
	$.ajax({
		data:strdata,
		type : "post",  
	    url : urlfile + "worklog/getWeekTask",
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
//				<li class="mList-li">
				var strhtml_mListLi=''+
								'<p class="mList-p-note">'+
								'<span class="p-normal">'+
									'<span>'+sequence+'、</span>'+
									'<span class="week-start">'+data.data.startTime+'</span>'+
									"<span> - </span>"+
									'<span class="week-end">'+data.data.endTime+'</span>'+
									'<span>&nbsp;</span>'+
									'<span class="week-proname">'+data.data.projectName+'</span>'+
									'<span>，</span>'+
									'<span class="week-content" title="'+data.data.content+'">'+data.data.content + '</span>'+
								'</span>'+'<span class="p-edt">';
				if(data.data.status=='0'){
					strhtml_mListLi+='<span class="p-edit p-isfinish" taskType="w" data_id="'+data.data.id+'">完成</span>'+
					'<span class="p-edit showbtn modify-btn weekTask" taskType="WT" data_id="'+data.data.id+'" projectId="'+data.data.projectId+'" sequence="'+sequence+'" >修改</span>';
				}else{
					strhtml_mListLi+='<span class="p-finish">√已完成</span>';
				}
				strhtml_mListLi+='<span class="p-edit showbtn remark-btn weekRemarks" remarksId="'+data.data.id+'" remarksType="W" data-remarks="'+data.data.remarks+'">备注</span>' +
					'</span></p>';
                fn && fn(strhtml_mListLi);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//function setaddDayTask(usercode,workdate,unfinish,finish){
//	
//	$.ajax({
//		data:"USERCODE="+usercode+"&WORKDATE="+workdate+"&UNFINISH="+encodeURIComponent(unfinish)+"&FINISH="+encodeURIComponent(finish),
//		type : "post",  
//	    url : urlfile + "worklog/addDayTask",
//	    processData:false,
//	    error:function(XMLHttpRequest, textStatus, errorThrown,fnErr) {
//            var errorno = XMLHttpRequest.readyState;
//            var oMessage = {
//                "timeout": errorno+"请求超时",
//                "error": errorno+"请求超时",
//                "notmodified": errorno+"请求超时",
//                "parsererror": errorno+"数据格式出错"
//            };
//            if(fnErr){
//                fnErr();
//                return;
//            }
//            if(!textStatus && errorThrown){
//                alert(errorThrown);
//            }
//            if(textStatus){
//                switch (textStatus) {
//                    case "timeout":
//                        alert(oMessage.timeout);
//                        break;
//                    case "parsererror":
//                        alert(oMessage.parsererror);
//                        break;
//                    default:
//                        break;
//                }
//            }
//        },
//		success:function(data){
//			if(data.code == 1) {
//                alert("上传日报成功！")
//                window.location.reload();
//			} else {
//				alert(data.errMsg);
//			}
//		}		
//	}); 
//}
//设置限制日志上报日期
//function setlimitLogDate(thisbox){
//	//开始时间
//	var maxdate = new Date();
//	thisbox.find(".text-datepicker").datepicker("option",{  
//		minDate: '-6d',  
//		maxDate: maxdate, 
//		onSelect: function(dateText,inst){
//			thisbox.find(".text-datepicker").css("color","#000");
//			if(thisbox.find(".text-datepicker").val() ==""){
//				thisbox.find(".text-datepicker").val('选择日期');
//				tthisbox.find(".text-datepicker").css("color","#ccc");
//			}
//		}
//	});
//	thisbox.find(".text-datepicker").datepicker("setDate", new Date());
//	$("#ui-datepicker-div").css("display","none");
//}
//设置限制月
function setlimitMonthDate(thisbox){
	//开始时间
	var date = new Date();
	var date2 = new Date(date.getFullYear(),date.getMonth()+1,0);
	var mindate= getDate(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
	var maxdate = getDate(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date2.getDate());
	thisbox.find(".start").datepicker("option",{  
		minDate: mindate,  
		maxDate: maxdate, 
		onSelect: function(dateText,inst){
			thisbox.find(".end").datepicker("option",{  
				minDate: dateText,  
				maxDate: maxdate, 
			});
			thisbox.find(".start").css("color","#000");
			if(thisbox.find(".end").val() ==""){
				thisbox.find('.end').val('结束日期');
				thisbox.find(".end").css("color","#ccc");
			}
		}
	});
	
	//结束时间
	thisbox.find(".end").datepicker("option",{  
		minDate: mindate,  
		maxDate: maxdate,  
		onSelect: function(dateText,inst){
			thisbox.find(".start").datepicker("option",{  
				minDate: mindate,  
				maxDate: dateText, 
			});
			thisbox.find(".end").css("color","#000");
			if(thisbox.find(".start").val() ==""){
				thisbox.find('.start').val('开始日期');
				thisbox.find(".start").css("color","#ccc");
			}
		}
	});
	
	$("#ui-datepicker-div").css("display","none");
}
//设置限制周
function setlimitWeekDate(thisbox){
	//开始时间
	var year=new Date().getFullYear();
    var month=new Date().getMonth()+1;
    var day=new Date().getDate();
	var thisWeekStart; //本周周一的时间
	var thisWeekEnd; //本周周日的时间
	if(new Date().getDay()==0){  //周天的情况；
		thisWeekStart = (new Date(year+'/'+month+'/'+day)).getTime()-((new Date().getDay())+6) * 86400000;
	}else{
		thisWeekStart = (new Date(year+'/'+month+'/'+day)).getTime()-((new Date().getDay())-1) * 86400000;
	}
	thisWeekEnd = thisWeekStart + 6 * 86400000;
	var weekStartDate=new Date(thisWeekStart);
	var weekEndDate=new Date(thisWeekEnd);
	var mindate= weekStartDate;
	var maxdate = weekEndDate;
	thisbox.find(".start").datepicker("option",{  
		minDate: mindate,  
		maxDate: maxdate, 
		onSelect: function(dateText,inst){
			thisbox.find(".end").datepicker("option",{  
				minDate: dateText,  
				maxDate: maxdate, 
			});
			thisbox.find(".start").css("color","#000");
			if(thisbox.find(".end").val() ==""){
				thisbox.find('.end').val('结束日期');
				thisbox.find(".end").css("color","#ccc");
			}
		}
	});
	
	//结束时间
	thisbox.find(".end").datepicker("option",{  
		minDate: mindate,  
		maxDate: maxdate,  
		onSelect: function(dateText,inst){
			thisbox.find(".start").datepicker("option",{  
				minDate: mindate,  
				maxDate: dateText, 
			});
			thisbox.find(".end").css("color","#000");
			if(thisbox.find(".start").val() ==""){
				thisbox.find('.start').val('开始日期');
				thisbox.find(".start").css("color","#ccc");
			}
		}
	});
	
	$("#ui-datepicker-div").css("display","none");
}