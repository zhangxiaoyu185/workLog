// JavaScript Document

$(function () {

//任务模块字段
	var assignment_html = '<p class="p-dialog-left">本月主要任务：</p>'
						+'<ul class="dialog-list">'+'<li class="dialog-list-li">'
						+'<span class="p-num"></span>'
						+'<font color="red">*</font>'
						+'<div class="select-box text-pro">'+'<input class="select-item" data-id="" type="text" value="请选择所属项目" readonly="readonly">'
						+'<ul class="select-ul">'
						+'</ul>'
						+'</div>'
						+'<div class="newAssignment-module-group">'
						+'<span><font color="red">*</font>开始日期：</span><input type="text" readonly class="dialog-select text-datepicker start"/>'
						+'<span><font color="red">*</font>结束日期：</span><input type="text" readonly class="dialog-select text-datepicker end"/>'
						+'<div><font color="red" style="display:inline-block;vertical-align:top;margin-top:50px;">*</font><textarea class="dialog-textarea newAssignment-textarea">本周需完成的任务</textarea></div>'
						+'</div>'
						+'</li>' + '</ul>';
						
	//设置输入框中初始的文字	
	var pre_str = '';
						
	//点击按钮触发遮罩弹框事件
	$("body").delegate(".showbtn","click",function(){
    //$(".showbtn").click(function () {
		closeDialogBox();
        $(".dialog-bg").css({
            display: "block", height: $(window).height()
        });
        var $box = $('.dialog-box');
		$box.css('display','block');
		var boxTop = 0;
		
		//判断是哪个弹窗模块，并显示
		boxTop=publishDialogModel($(this),boxTop);
		
		//这是新增月任务模块
		if($(this).hasClass('monthAssignment-btn')){
			$(".monthAssignment-box").show(); 
			$(".monthAssignment-box").find('.dialog-module-content').html(assignment_html);
			$(".monthAssignment-box").find('.text-pro').find('.select-ul').html(findAllProjectList());		
			$(".monthAssignment-box").find('.p-dialog-left').text('本月主要任务：'); 
			$(".monthAssignment-box").find('.newAssignment-textarea').text('本月需完成的任务');			
			//日期选择
			$(".text-datepicker").datepicker();
			var thisbox=$(".monthAssignment-box");
			setlimitMonthDate(thisbox);
			$(".monthAssignment-box").find('.start').val('开始日期'); 
			$(".monthAssignment-box").find('.end').val('结束日期');
			$(".monthAssignment-box").unbind().delegate(".dialog-btn","click",function(){				
				var USERCODE = sessionStorage.getItem("select_usercode");
				var TYPE = 0;
				var PROJECT_ID,CONTENT,STARTTIME,ENDTIME;
				if($.trim($(".monthAssignment-box").find('.select-item').val()) == "请选择所属项目"){
					alert("项目不能为空，请选择后提交！");
					$(".monthAssignment-box").find('.select-item').click();
					return false;
				} else {
					PROJECT_ID = $(".monthAssignment-box").find('.select-item').attr("data-id");
				}
				//开始日期
				if($.trim($(".monthAssignment-box").find('.start').val()) == "开始日期"){
					alert("开始日期不能为空，请输入开始日期后提交！");
					$(".monthAssignment-box").find('.start').focus();
					return false;
				} else {
					STARTTIME = $(".monthAssignment-box").find('.start').val();
				}
				//结束日期
				if($.trim($(".monthAssignment-box").find('.end').val()) == "结束日期"){
					alert("结束日期不能为空，请输入结束日期后提交！");
					$(".monthAssignment-box").find('.end').focus();
					return false;
				} else {
					ENDTIME = $(".monthAssignment-box").find('.end').val();
				}
				//月任务内容
				if($.trim($(".monthAssignment-box").find('.newAssignment-textarea').val()) == "本月需完成的任务"){
					alert("任务不能为空，请输入任务后提交！");
					$(".monthAssignment-box").find('.newAssignment-textarea').focus();
					return false;
				} else {
					CONTENT = $(".monthAssignment-box").find('.newAssignment-textarea').val();
				}
				var TASKGRID = CONTENT+"|"+PROJECT_ID+"|"+STARTTIME+"|"+ENDTIME;//内容|项目ID|开始|结束
				addMonthTask(USERCODE,TYPE,TASKGRID);
			});			
			boxTop = ($(window).height() - $('.monthAssignment-box').height()) / 2 + $(window).scrollTop();
		}
		//这是回复模块
		else if($(this).hasClass('reply-btn')){
			$(".reply-box").show();
			var thisbtn = $(this);
			$(".reply-box").find(".dialog-textarea").val("请输入回复内容");  
			if($(".reply-box").find(".dialog-textarea").val() != "请输入回复内容"){
				$(".reply-box").find(".dialog-textarea").css("color","#000");
			}
			else{
				$(".reply-box").find(".dialog-textarea").css("color","#ccc");
			}

			$(".reply-box").unbind().delegate(".dialog-btn","click",function(){
				if($.trim($(".reply-box").find(".dialog-textarea").val()) == '请输入回复内容' || $.trim($(".reply-box").find(".dialog-textarea").val()) == ''){
					alert("请输入内容后再提交!");
					$(".reply-box").find(".dialog-textarea").focus();
				}
				else{
					setAddReply($(".reply-box").find('.remark-textarea').val(),thisbtn.attr("data-dayTaskId"),thisbtn);
					
				}
			});
			boxTop = ($(window).height() - $('.reply-box').height()) / 2 + $(window).scrollTop();
		}
		//这是修改模块
		else if($(this).hasClass('modify-btn')){
			$(".modify-box").show();
			//判断是周任务修改还是日志修改
			if($(this).hasClass('p-edit')){			
				if($(this).hasClass('monthAssignment')){
					$(".modify-box").find('.dialog-module-content').html(assignment_html); 
					//$(".modify-box").find('.select-item').val($(this).parent().find('.month-proname').text());
					//$(".modify-box").find('.p-dialog-left').text('本月主要任务:');
					//$('.text-pro').attr("value",$(this).parent('.mList-p-note').find('.week-proname').text());
					//$(".modify-box").find('.start').val($(this).parent().find('.month-start').text());
					//$(".modify-box").find('.end').val($(this).parent().find('.month-end').text());
					//$(".modify-box").find('.newAssignment-textarea').text($(this).parent().find('.month-content').text());
					$(".modify-box").find('.select-ul').html(findAllProjectList());
					var monthTaskId = $(this).attr("data-id");
					var strUsercode = "";
					$.ajax({
						data:"ID="+monthTaskId,
						type : "post",  
					    url : urlfile + "worklog/getMonthTask",
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
								$(".modify-box").find('.select-item').val(data.data.projectName);
								$(".modify-box").find('.select-item').attr("data-id", data.data.projectId);
								$(".modify-box").find('.start').val(data.data.startTime);
								$(".modify-box").find('.end').val(data.data.endTime);
								$(".modify-box").find('.newAssignment-textarea').val(data.data.content);
								strUsercode = data.data.usercode;
							} else {
								alert(data.errMsg);
							}
						}		
					});
					$(".text-datepicker").datepicker();
					var thisbox = $(".modify-box");
					setlimitMonthDate(thisbox);
					$(".modify-box").unbind().delegate(".dialog-btn","click",function(){						
						var PROJECT_ID,CONTENT,STARTTIME,ENDTIME;
						if($.trim($(".modify-box").find('.select-item').val()) == "请选择所属项目"){
							alert("项目不能为空，请选择后提交！");
							$(".modify-box").find('.select-item').click();
							return false;
						} else {
							PROJECT_ID = $(".modify-box").find('.select-item').attr("data-id");
						}						
						//开始日期
						if($.trim($(".modify-box").find('.start').val()) == "开始日期"){
							alert("开始日期不能为空，请输入开始日期后提交！");
							$(".modify-box").find('.start').focus();
							return false;
						} else {
							STARTTIME = $(".modify-box").find('.start').val();
						}
						//结束日期
						if($.trim($(".modify-box").find('.end').val()) == "结束日期"){
							alert("结束日期不能为空，请输入结束日期后提交！");
							$(".modify-box").find('.end').focus();
							return false;
						} else {
							ENDTIME = $(".modify-box").find('.end').val();
						}
						//月任务内容
						if($.trim($(".modify-box").find('.newAssignment-textarea').val()) == "本月需完成的任务"){
							alert("任务不能为空，请输入任务后提交！");
							$(".modify-box").find('.newAssignment-textarea').focus();
							return false;
						} else {
							CONTENT = $(".modify-box").find('.newAssignment-textarea').val();
						}
						updateMonthTask (monthTaskId,strUsercode,CONTENT,PROJECT_ID,STARTTIME,ENDTIME);		
					});
				}
			}
					
			boxTop = ($(window).height() - $('.modify-box').height()) / 2 + $(window).scrollTop();
		}
		//这是确认工时模块
		else if($(this).hasClass('sureTime-btn')){
			var thisbtn = $(this);
			var thisbox = $(".sureTime-box");
			thisbox.show();
			thisbox.find('.dialog-text').css('color','#000');
			thisbox.find("input[name='surefinish']").removeAttr("checked");
			thisbox.find('.suretime').val(thisbtn.attr("data-confirmtime"));
			if(thisbtn.attr("data-status")=="0"){
				$("input[name=surefinish][value=0]").attr("checked",true);
			}else if(thisbtn.attr("data-status")=="1"){
				$("input[name=surefinish][value=1]").attr("checked",true);
			}
			thisbox.find('.dialog-text').keydown(function (e) {
		          numberformat(this);
		      });
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_obj = {};
				json_obj.Id = thisbtn.attr("data-id");
				json_obj.confirmtime = thisbox.find('.suretime').val();
				json_obj.status = thisbox.find('input[name="surefinish"]:checked').val();
				json_obj.year = thisbtn.attr("data-year");
				json_obj.month = thisbtn.attr("data-month");
				json_obj.week = thisbtn.attr("data-week");
				if($.trim(thisbox.find('.suretime').val()) == ""){
					alert("不能为空，请输入确认工时");
					thisbox.find('.suretime').focus();
					return false;
				}
				//alert(json_obj.status);
				setSureTime(json_obj);
			});
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
		} 
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });
		
		//日期选择
//		$('.text-datepicker').on('click',function(){
//			$(this).datepicker();
//		});
		//只能输入浮点数
		$(".dialog-list").delegate(".dialog-text","click",function(){
		//$('.dialog-text').on('click',function(){
			$(this).numeral(true);
		});
		
		//下拉选择框
		$(".dialog-box").children().not('.logReport-box').find(".text-pro").find(".select-item").unbind().click(function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find(".searchit").focus();
				thisul.find('.searchit').on('keyup',function(){
					var searchText=$(this).val();
					thisul.find("li").each(function(){
						if($(this).text().indexOf(searchText)>-1){
							$(this).show();
						}
						else{
							$(this).hide();
						}
					});
				});
				thisul.find("li").unbind().click(function(){
					thisinput.val($(this).text());
					limitShow(8,thisinput);
					thisinput.css("color","#000");
					thisinput.attr("data-id",$(this).attr("data-id"));
					thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
		
		//下拉选择框
//		$(".dialog-box").children().not('.logReport-box').find(".text-position").find(".select-item").unbind().click(function(){
//			var thisinput=$(this);
//			var thisul=$(this).parent().find("ul");
//			if(thisul.css("display")=="none"){
//				if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" })};
//				thisul.fadeIn("100");
//				thisul.hover(function(){},function(){thisul.fadeOut("100");})
//				thisul.find("li").click(function(){
//					thisinput.val($(this).text());
//					limitShow(8,thisinput);
//					thisinput.css("color","#000");
//					thisinput.attr("data-id",$(this).attr("data-id"));
//					thisul.fadeOut("100");
//				}).hover(function(){$(this).addClass("select-hover");},
//				function(){$(this).removeClass("select-hover");});
//			}
//			else{
//				thisul.fadeOut("fast");
//			}
//		});
		
		
		$(".dialog-box").children().not('.logReport-box').delegate(".dialog-textarea","focus",function(){
			// 文本框得到鼠标焦点 
			if($(this).val() == "本周需完成的任务"){
				$(this).val(""); 
				pre_str = '本周需完成的任务';
			}
			else if($(this).val() == "本月需完成的任务"){
				$(this).val("");     
				pre_str = '本月需完成的任务';
			}
			else if($(this).val() == "请输入今日已完成任务"){
				$(this).val("");           
				pre_str = '请输入今日已完成任务';
			}
			else if($(this).val() == "请输入今日未完成任务"){
				$(this).val("");           
				pre_str = '请输入今日未完成任务';
			}
			else if($(this).val() == "需要补充的内容"){
				$(this).val("");           
				pre_str = '需要补充的内容';
			}
			else if($(this).val() == "输入备注内容"){
				$(this).val("");           
				pre_str = '输入备注内容';
			}
			else if($(this).val() == "输入工作内容"){
				$(this).val("");           
				pre_str = '输入工作内容';
			}
			$(this).css("color","#000");
		}).delegate(".dialog-textarea","blur",function(){
			// 文本框失去鼠标焦点
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css("color","#ccc");
			}
		}).delegate(".dialog-text","focus",function(){   
			// 数字输入框得到鼠标焦点
			if($(this).val() == "请输入用时"){
				$(this).val("");           
				pre_str = '请输入用时';
			}
			else if($(this).val() == "请输入预计工时"){
				$(this).val("");           
				pre_str = '请输入预计工时';
			}
			$(this).css("color","#000");
		}).delegate(".dialog-text","blur",function(){ 
			// 数字输入框失去鼠标焦点 
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css("color","#ccc");
			}
		}).delegate(".dialog-input","focus",function(){   
			// 输入框得到鼠标焦点
			if($(this).val() == "请输入工号"){
				$(this).val("");           
				pre_str = '请输入工号';
			}else if($(this).val() == "请输入姓名"){
				$(this).val("");           
				pre_str = '请输入姓名';
			}else if($(this).val() == "请输入密码"){
				$(this).val("");           
				pre_str = '请输入密码';
			}else if($(this).val() == "请输入旧密码"){
				$(this).val("");           
				pre_str = '请输入旧密码';
			}else if($(this).val() == "请输入新密码"){
				$(this).val("");           
				pre_str = '请输入新密码';
			}else if($(this).val() == "请输入确认密码"){
				$(this).val("");           
				pre_str = '请输入确认密码';
			}else{
				if($(this).hasClass('workID')){
					pre_str = '请输入工号';
				}else if($(this).hasClass('fullname')){
					pre_str = '请输入姓名';
				}else if($(this).hasClass('password')){
					pre_str = '请输入密码';
				}else if($(this).hasClass('oldpwd')){
					pre_str = '请输入旧密码';
				}else if($(this).hasClass('newpwd')){
					pre_str = '请输入新密码';
				}else if($(this).hasClass('repwd')){
					pre_str = '请输入确认密码';
				}
			}
			$(this).css("color","#000");
		}).delegate(".dialog-input","blur",function(){   
			// 输入框失去鼠标焦点 
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

//添加回复
function setAddReply(strRemarks,dayTaskId,thisbtn){
	/*alert("USERCODE="+userId+",CONTENT="+strRemarks+",DAYTASK_ID="+dayTaskId);*/
	$.ajax({
		data:"USERCODE="+sessionStorage.getItem("code")+"&CONTENT="+encodeURIComponent(strRemarks)+"&DAYTASK_ID="+dayTaskId,
		type : "post",  
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
                alert("添加回复成功！");
                closeDialogBox();
				refreshReplyTaskList(thisbtn);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//更新添加回复后的日报列表(带回复)
function refreshReplyTaskList(thisbtn){
	var strdata="DAYTASK_ID="+thisbtn.attr("data-dayTaskId");
	$.ajax({
		data:strdata,
		type : "post",  
	    url : urlfile + "worklog/getDayTask",
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
				thisbtn.attr("data-strRemarks",data.data.strRemarks);
			} else {
				alert(data.errMsg);
			}
		}		
	});
	
}
//新增月任务
function addMonthTask(USERCODE,TYPE,TASKGRID) {
	var strData = "USERCODE="+USERCODE+"&TYPE="+TYPE+"&TASKGRID="+TASKGRID;
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "worklog/addMonthTask",
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
                alert(data.errMsg);
                closeDialogBox();
                var date = new Date();
                if(date.getDate()<=10){
                	getMonthTaskList('','',date.getFullYear(),(date.getMonth()+1));
                }else if(date.getDate()>=20 && (date.getMonth()+1)==12){
                	getMonthTaskList('','',(date.getFullYear()+1),'01');
                }else if(date.getDate()>=20 && (date.getMonth()+1)!=12){
                	getMonthTaskList('','',date.getFullYear(),(date.getMonth()+2));
                }
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//新增人员
function addGroupUser(USERCODE,NAME,PWD,ROLE_ID,GROUP_ID) {
	var strData = "USERCODE="+USERCODE+"&NAME="+encodeURIComponent(NAME)+"&PWD="+encodeURIComponent(PWD)+"&ROLE_ID="+ROLE_ID+"&GROUP_ID="+GROUP_ID;
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "main/addGroupUser",
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
                alert(data.errMsg);
                closeDialogBox();
                groupUser($(".text-group").find('.select-item').attr("data-id"));
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改月任务
function updateMonthTask (ID,USERCODE,CONTENT,PROJECT_ID,STARTTIME,ENDTIME) {
	var strData = "ID="+ID+"&USERCODE="+USERCODE+"&CONTENT="+encodeURIComponent(CONTENT)+"&PROJECT_ID="+PROJECT_ID+"&START_TIME="+STARTTIME+"&END_TIME="+ENDTIME;
	//console.log(strData);
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "worklog/updateMonthTask",
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
                alert(data.errMsg);
                closeDialogBox();
                var date = new Date();
                if(date.getDate()<=10){
                	getMonthTaskList('','',date.getFullYear(),(date.getMonth()+1));
                }else if(date.getDate()>=20 && (date.getMonth()+1)==12){
                	getMonthTaskList('','',(date.getFullYear()+1),'01');
                }else if(date.getDate()>=20 && (date.getMonth()+1)!=12){
                	getMonthTaskList('','',date.getFullYear(),(date.getMonth()+2));
                }
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//项目下拉框
function findAllProjectList(){
	var select_li = "";
	$.ajax({
		type : "post",  
	    url : urlfile + "project/getProjects ",
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
			//console.log(data);
			if(data.code == 1) {
				select_li += '<input type="text" style="width:200px;" class="searchit"></input>';
				//select_li += "<li data-id='0'>综合项目</li>";
				$.each(data.data, function(i, item) {
					select_li += "<li data-id='"+item.id+"'>"+item.name+"</li>";
				});				
			} else {
				alert(data.errMsg);
			}
		}		
	});
	return select_li;
}
//职位下拉框
function findRoleList(){
	var select_li = "";
	$.ajax({
		data:"USERCODE="+sessionStorage.getItem("code"),
		type : "post",  
	    url : urlfile + "main/findRoleList ",
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
					select_li += "<li data-id='"+item.id+"'>"+item.name+"</li>";
				});				
			} else {
				alert(data.errMsg);
			}
		}		
	});
	return select_li;
}
//设置限制月
function setlimitMonthDate(thisbox){
	//开始时间
	var date = new Date();
	
	var mindate,maxdate;
	if(date.getDate()<=10){
		var date2 = new Date(date.getFullYear(),date.getMonth()+1,0);
		mindate= getDate(date.getFullYear()+"-"+(date.getMonth()+1)+"-01");
		maxdate = getDate(date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date2.getDate());
	}else if(date.getDate()>=20){
		if((date.getMonth()+1) == 12){
			var date2 = new Date((date.getFullYear()+1),1,0);
			mindate= getDate((date.getFullYear()+1)+"-01-01");
			maxdate = getDate((date.getFullYear()+1)+"-01-"+date2.getDate());
		}else{
			var date2 = new Date(date.getFullYear(),date.getMonth()+2,0);
			mindate= getDate(date.getFullYear()+"-"+(date.getMonth()+2)+"-01");
			maxdate = getDate(date.getFullYear()+"-"+(date.getMonth()+2)+"-"+date2.getDate());
		}
	}else{
		return false;
	}
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

//确认工时
function setSureTime(json_obj){
	$.ajax({
		data:"ID="+json_obj.Id+"&CONFIRMTIMES="+json_obj.confirmtime+"&STATUS="+json_obj.status,
		type : "post",  
	    url : urlfile + "worklog/confirm/time ",
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
				alert("确认工时成功");
				closeDialogBox();
				getWeekAndDayTaskList(json_obj.year,json_obj.month,json_obj.week,0);
			} else {
				alert(data.errMsg);
			}
		}		
	});
}