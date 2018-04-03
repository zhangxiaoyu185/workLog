// JavaScript Document

$(function () {
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
		//这是备注模块
		if($(this).hasClass('remark-btn')){
			$(".remark-box").show();
			$(".remark-box").find('.remark-textarea').val($(this).attr("data-remarks"));
//			console.log($(".remark-box").find(".dialog-textarea").val());
			if($(".remark-box").find(".dialog-textarea").val() != "请输入备注内容"){
				$(".remark-box").find(".dialog-textarea").css("color","#000");
			}
			else{
				$(".remark-box").find(".dialog-textarea").css("color","#ccc");
			}
			var id = $(this).attr("data-Id");
			var thisbtn = $(this);
			$(".remark-box").unbind().delegate(".dialog-btn","click",function(){
				var remarks = $(".remark-box").find('.remark-textarea').val();
				setUpdateRemarks(3,id,remarks,thisbtn);
			});
			boxTop = ($(window).height() - $('.remark-box').height()) / 2 + $(window).scrollTop();
		}
		//这是回复模块
		else if($(this).hasClass('reply-btn')){
			$(".reply-box").show();
			
			var thisbtn = $(this);
			$(".reply-box").find(".dialog-textarea").val("请输入回复内容"); 
			$(".reply-box").find(".dialog-textarea").css("color","#ccc");
			$(".reply-box").unbind().delegate(".dialog-btn","click",function(){
				if($.trim($(".reply-box").find(".dialog-textarea").val()) == '请输入回复内容' || $.trim($(".reply-box").find(".dialog-textarea").val()) == ''){
					alert("请输入内容后再提交!");
					$(".reply-box").find(".dialog-textarea").focus();
				}
				else{
					setAddReply(thisbtn.attr("data-userId"),$(".reply-box").find('.remark-textarea').val(),thisbtn.attr("data-dayTaskId"),thisbtn);
				}
				
			});
			boxTop = ($(window).height() - $('.reply-box').height()) / 2 + $(window).scrollTop();
		}
		
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });
		
		
		
		// 文本框得到鼠标焦点
        $(".dialog-box").children().not('.logReport-box').delegate(".dialog-textarea","focus",function(){   
		// 得到当前文本框的值    
			var txt_value =  ($(this).val());   
			if(($(this).val()) == "请输入备注内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入备注内容';
			}
			else if(($(this).val()) == "请输入回复内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入回复内容';
			}
			$(this).css('color','#000');
			
		}).delegate(".dialog-textarea","blur",function(){
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css('color','#ccc');
			}
			
		}).delegate(".dialog-textarea","keyup",function(){
			var thistext = $(this);
			limitInput(256,thistext);
			
		}).delegate(".dialog-input","focus",function(){   
		// 得到当前文本框的值    
			var txt_value =  $(this).val();   
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
			$(this).css('color','#000');
			
		}).delegate(".dialog-input","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css('color','#ccc');
			}
		});													
		
    });
	//点击关闭按钮的时候，遮罩层关闭
	$(".close").click(function () {
    	closeDialogBox();
    });
});

//添加回复
function setAddReply(userId,strRemarks,dayTaskId,thisbtn){
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
//设置备注
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
                alert("备注修改成功！");
                closeDialogBox();
				thisbtn.attr("data-remarks",remarks);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}