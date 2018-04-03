// JavaScript Document

$(function () {
	var function_html = '<ul class="dialog-list">'
		+'<li class="dialog-list-li">'
            +'<span class="align-left align-top inline-block85"><font color="red">*</font>选择组员</span>'
            +'<div class="select-box text-menber">'
               +'<input class="select-item" type="text" data-id="" value="选择组员" readonly="readonly">'
                +'<ul class="select-ul">'
                +'</ul>'
            +'</div> ' 
        +'</li>'
        +'<li class="dialog-list-li">'
            +'<span class="align-left inline-block85"></span>'
            +'<span><font color="red">*</font>开始日期：</span><input type="text" readonly="readonly" class="dialog-select text-datepicker start"/>'
    		+'<span><font color="red">*</font>结束日期：</span><input type="text" readonly="readonly" class="dialog-select text-datepicker end"/>'   
        +'</li>'
        +'<li class="dialog-list-li">'
            +'<span class="align-left inline-block85"><font color="red">*</font>预计工时</span>'
            +'<input type="text" class="dialog-text preworktime-text" value="请输入预计工时" /><span class="p-dialog-right">小时</span>'   
        +'</li>'
        +'<li class="dialog-list-li">'
            +'<span class="align-left align-top inline-block85"><font color="red">*</font>工作内容</span>'
            +'<textarea class="dialog-textarea work-textarea">输入工作内容</textarea>'   
        +'</li>'
        +'<li class="dialog-list-li">'
            +'<span class="align-left align-top inline-block85">备注</span>'
            +'<textarea class="dialog-textarea remark-textarea">输入备注内容</textarea>'   
        +'</li>'
    +'</ul>';
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
		//这是备注模块
		if($(this).hasClass('remark-btn')){
			$(".remark-box").show();
			if($.trim($(this).attr("data-remarks")) == ''){
				$(".remark-box").find('.remark-textarea').val('输入备注内容');
				$(".remark-box").find('.remark-textarea').css("color","#ccc");
			}
			else{
				$(".remark-box").find('.remark-textarea').val($(this).attr("data-remarks"));
				$(".remark-box").find('.remark-textarea').css("color","#000");
			}
			var id = $(this).attr("data-id");
			var thisbtn = $(this);
			$(".remark-box").unbind().delegate(".dialog-btn","click",function(){
				var remarks = '';
				if($.trim($(".remark-box").find('.remark-textarea').val()) == '输入备注内容'){
					remarks = '';
				}
				else{
					remarks = $(".remark-box").find('.remark-textarea').val();
				}
				//项目备注
				if(thisbtn.hasClass('proRemarks')){
					setUpdateRemarks(3,id,remarks,thisbtn);
				}
				//项目模块人员备注
				else if(thisbtn.hasClass('modeluserRemarks')){
					setUpdateRemarks(4,id,remarks,thisbtn);
				}
				//项目模块备注
				else if(thisbtn.hasClass('functionRemarks')){
					setUpdateRemarks(5,id,remarks,thisbtn);
				}
				
			});
			
			boxTop = ($(window).height() - $('.remark-box').height()) / 2 + $(window).scrollTop();
		}
		//这是说明模块
		else if($(this).hasClass('explanation-btn')){
			var thisbtn = $(this);
			var thisbox = $(".explanation-box");
			thisbox.show();
			
			getProjectInfoById(thisbtn.attr("data-id"),thisbox);
			if($.trim(thisbox.find('.explanation-textarea')) == '' || $.trim(thisbox.find('.explanation-textarea')) == 'undefined'){
				thisbox.find('.explanation-textarea').val('记录测试、正式的账号，地址等信息');
				thisbox.find('.explanation-textarea').css("color","#ccc");
			}
			else{
				thisbox.find('.explanation-textarea').val(thisbox.find('.explanation-textarea'));
				thisbox.find('.explanation-textarea').css("color","#000");
			}
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_obj={};
				json_obj.id = thisbtn.attr("data-id");
				json_obj.name = $(this).attr('data-name');
				json_obj.startTime = $(this).attr('data-startTime');
				json_obj.endTime = $(this).attr('data-endTime');
				json_obj.usercode = $(this).attr("data-usercode");
				if($.trim(thisbox.find('.explanation-textarea').val()) == '记录测试、正式的账号，地址等信息'){
					json_obj.explanation = '';
				}
				else{
					json_obj.explanation = thisbox.find('.explanation-textarea').val();
				}
				//console.log(json_obj);
				updateExplanation(json_obj,thisbtn);
			});
			
			boxTop = ($(window).height() - $('.remark-box').height()) / 2 + $(window).scrollTop();
		}
		//这是回复模块
		else if($(this).hasClass('reply-btn')){
			$(".reply-box").show();
			var thisbtn = $(this);
			$(".reply-box").find(".dialog-textarea").val("输入回复内容");
			if($(".reply-box").find(".dialog-textarea").val() != "输入回复内容"){
				$(".reply-box").find(".dialog-textarea").css("color","#000");
			}
			else{
				$(".reply-box").find(".dialog-textarea").css("color","#ccc");
			}

			$(".reply-box").unbind().delegate(".dialog-btn","click",function(){
				if($.trim($(".reply-box").find(".dialog-textarea").val()) == '输入回复内容' || $.trim($(".reply-box").find(".dialog-textarea").val()) == ''){
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
			var thisbtn = $(this);
			var thisbox = $(".modify-box");
			//模块员工修改
			if($(this).hasClass('p-edit')){
				$(".modify-box").find('.dialog-module-content').html(function_html); 
				$(".modify-box").find("input").css("color","#000");
				$(".modify-box").find("textarea").css("color","#000");
				$(".modify-box").find(".text-datepicker").datepicker();
				
				if($(this).hasClass('function')){ //修改
					$(".modify-box").find('.select-ul').html(userListByCode());
					var name = $(this).attr("data-name");
					var modUserid = $(this).attr("data-id");
					var pid = "";
					$.ajax({
						data:"ID="+modUserid,
						type : "post",  
					    url : urlfile + "project/getModelUser",
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
								pid = data.data.projectId;
								$(".modify-box").find('.select-item').val(name);
								$(".modify-box").find('.select-item').attr("data-id", data.data.usercode);
								$(".modify-box").find('.start').val(data.data.startTime);
								$(".modify-box").find('.end').val(data.data.endTime);
								$(".modify-box").find('.preworktime-text').val(data.data.workTime);
								$(".modify-box").find('.work-textarea').val(data.data.content);
								$(".modify-box").find('.remark-textarea').val(data.data.remarks);			
							} else {
								alert(data.errMsg);
							}
						}		
					});
					setlimitDate(thisbtn,thisbox);
					if($(".modify-box").find(".remark-textarea").val() == ""){
						$(".modify-box").find(".remark-textarea").val("输入备注内容");
						$(".modify-box").find(".remark-textarea").css("color","#ccc");
					}
					$(".modify-box").unbind().delegate(".dialog-btn","click",function(){
						var MODELUSER_ID,CONTENT,PROJECT_ID,STARTTIME,ENDTIME,USERCODE,WORKTIME,REMARKS;
						//组员
						if($.trim($(".modify-box").find('.select-item').val()) == "-"){
							alert("没有成员，赶紧去添加吧！");
							return false;
						} else {
							if($.trim($(".modify-box").find('.select-item').val()) == "选择组员"){
								alert("组员不能为空，请选择后提交！");
								$(".modify-box").find('.select-item').click();
								return false;
							} else {
								USERCODE = $(".modify-box").find('.select-item').attr("data-id");
							}
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
						//预计工时
						if($.trim($(".modify-box").find('.preworktime-text').val()) == "请输入预计工时"){
							alert("预计工时不能为空，请输入预计工时后提交！");
							$(".modify-box").find('.preworktime-text').focus();
							return false;
						} else {
							WORKTIME = $(".modify-box").find('.preworktime-text').val();
						}
						//工作内容
						if($.trim($(".modify-box").find('.work-textarea').val()) == "输入工作内容"){
							alert("不能为空，请输入工作内容后提交！");
							$(".modify-box").find('.work-textarea').focus();
							return false;
						} else {
							CONTENT = $(".modify-box").find('.work-textarea').val();
						}
						MODELUSER_ID = modUserid;
						PROJECT_ID = pid;
						//备注
						if($(".modify-box").find(".remark-textarea").val() == "输入备注内容"){
							REMARKS = "";
						}
						else{
							REMARKS = $(".modify-box").find('.remark-textarea').val();
						}
						
						updateModelUser(MODELUSER_ID,CONTENT,PROJECT_ID,STARTTIME,ENDTIME,USERCODE,WORKTIME,REMARKS);		
					});
					
				}
			}
			boxTop = ($(window).height() - $('.modify-box').height()) / 2 + $(window).scrollTop();
		}
		//这是修改项目模块
		else if($(this).hasClass('modifypro-btn')){
			$(".modifypro-box").show();
			var thisbtn = $(this);
			var thisbox = $(".modifypro-box");
			thisbox.find(".text-datepicker").datepicker();
			thisbox.find(".start").datepicker("option",{
				onSelect: function(dateText,inst){
					thisbox.find(".end").datepicker("option",{ 
						minDate: dateText, 
					});
					thisbox.find(".start").css("color","#000");
					if(thisbox.find(".end").val() ==""){
						thisbox.find('.end').val('结束日期');
						thisbox.find(".end").css("color","#ccc");
					}
				}
			});
			thisbox.find(".end").datepicker("option",{
				onSelect: function(dateText,inst){
					thisbox.find(".start").datepicker("option",{ 
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
			getProjectInfoById(thisbtn.attr("data-id"),thisbox);
			thisbox.find("input").css("color","#000");
			thisbox.find("textarea").css("color","#000");
			//提交
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_obj={};
				json_obj.id = thisbtn.attr("data-id");
				json_obj.name = thisbox.find(".pro-name").val();
				json_obj.startTime = thisbox.find(".start").val();
				json_obj.endTime = thisbox.find(".end").val();
				json_obj.usercode = $(this).attr("data-usercode");
				json_obj.remarks = thisbox.find(".remark-textarea").val();
				if($.trim(json_obj.name) == ""){
					alert("项目名称不能为空,请输入后再提交！");
					thisbox.find(".pro-name").focus();
					return false;
				}
				if($.trim(json_obj.startTime) == ""){
					alert("开始日期不能为空,请选择后再提交！");
					return false;
				}
				if($.trim(json_obj.endTime) == ""){
					alert("结束日期不能为空,请选择后再提交！");
					return false;
				}
				updateProject(json_obj);
			});
			boxTop = ($(window).height() - $('.modify-box').height()) / 2 + $(window).scrollTop();
		}
		//这是新增项目模块
		else if($(this).hasClass('addpro-btn')){
			$(".addpro-box").show();
			var thisbtn = $(this);
			var thisbox = $(".addpro-box");
			thisbox.find('.pro-name').val('请输入项目名称');
			thisbox.find('.remark-textarea').val('输入备注内容');
			thisbox.find('.explanation-textarea').val('记录测试、正式的账号，地址等信息');
			thisbox.find(".text-datepicker").datepicker();
			thisbox.find(".start").datepicker("option",{
				onSelect: function(dateText,inst){
					thisbox.find(".end").datepicker("option",{ 
						minDate: dateText, 
					});
					thisbox.find(".start").css("color","#000");
					if(thisbox.find(".end").val() ==""){
						thisbox.find('.end').val('结束日期');
						thisbox.find(".end").css("color","#ccc");
					}
				}
			});
			thisbox.find(".end").datepicker("option",{
				onSelect: function(dateText,inst){
					thisbox.find(".start").datepicker("option",{ 
						maxDate: dateText, 
					});
					thisbox.find(".end").css("color","#000");
					if(thisbox.find(".start").val() ==""){
						thisbox.find('.start').val('开始日期');
						thisbox.find(".start").css("color","#ccc");
					}
				}
			});
			thisbox.find('.start').val('开始日期');
			thisbox.find('.end').val('结束日期');
			$("#ui-datepicker-div").css("display","none");
			thisbox.find("input").css("color","#ccc");
			thisbox.find("textarea").css("color","#ccc");
			//提交
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_obj = {};
				//项目名称
				if($.trim(thisbox.find('.pro-name').val()) == "请输入项目名称"){
					alert("项目名称不能为空，请输入项目名称后提交！");
					thisbox.find('.pro-name').focus();
					return false;
				} else {
					json_obj.name = thisbox.find('.pro-name').val();
				}
				//开始日期
				if($.trim(thisbox.find('.start').val()) == "开始日期"){
					alert("开始日期不能为空，请输入开始日期后提交！");
					thisbox.find('.start').focus();
					return false;
				} else {
					json_obj.startTime = thisbox.find('.start').val();
				}
				//结束日期
				if($.trim(thisbox.find('.end').val()) == "结束日期"){
					alert("结束日期不能为空，请输入结束日期后提交！");
					thisbox.find('.end').focus();
					return false;
				} else {
					json_obj.endTime = thisbox.find('.end').val();
				}
				//备注
				if($.trim(thisbox.find('.remark-textarea').val()) == "输入备注内容"){
					json_obj.remarks = "";
				} else {
					json_obj.remarks = thisbox.find('.remark-textarea').val();
				}
				//说明记录测试、正式的账号，地址等信息
				if($.trim(thisbox.find('.explanation-textarea').val()) == "输入备注内容"){
					json_obj.explanation = "";
				} else {
					json_obj.explanation = thisbox.find('.explanation-textarea').val();
				}
				insertProject(json_obj);
			});
			boxTop = ($(window).height() - $('.addpro-box').height()) / 2 + $(window).scrollTop();
		}
		//这是新增项目计划模块
		else if($(this).hasClass('addproplan-btn')){
			$(".addproplan-box").show();
			var thisbtn = $(this);
			var thisbox = $(".addproplan-box");
			thisbox.find('.function-name').val('请输入事项名称');
			thisbox.find('.remark-textarea').val('输入备注内容');
			thisbox.find(".text-datepicker").datepicker();
			setlimitDate(thisbtn,thisbox);
			thisbox.find('.start').val('开始日期');
			thisbox.find('.end').val('结束日期');
			thisbox.find("input").css("color","#ccc");
			thisbox.find("textarea").css("color","#ccc");
			//提交
			$(".addproplan-box").unbind().delegate(".dialog-btn","click",function(){
				var MODEL_NAME,PROJECT_ID,STARTTIME,ENDTIME,REMARKS;
				//模块名称
				if($.trim(thisbox.find('.function-name').val()) == "请输入事项名称"){
					alert("事项名称不能为空，请输入事项名称后提交！");
					thisbox.find('.function-name').focus();
					return false;
				} else {
					MODEL_NAME = thisbox.find('.function-name').val();
				}
				//开始日期
				if($.trim(thisbox.find('.start').val()) == "开始日期"){
					alert("开始日期不能为空，请输入开始日期后提交！");
					thisbox.find('.start').focus();
					return false;
				} else {
					STARTTIME = thisbox.find('.start').val();
				}
				//结束日期
				if($.trim(thisbox.find('.end').val()) == "结束日期"){
					alert("结束日期不能为空，请输入结束日期后提交！");
					thisbox.find('.end').focus();
					return false;
				} else {
					ENDTIME = thisbox.find('.end').val();
				}
				//备注
				if($.trim(thisbox.find('.remark-textarea').val()) == "输入备注内容"){
					REMARKS = "";
				} else {
					REMARKS = thisbox.find('.remark-textarea').val();
				}
				PROJECT_ID = thisbtn.attr("data-id");
				insertModel(MODEL_NAME,PROJECT_ID,STARTTIME,ENDTIME,REMARKS);
			});		
			boxTop = ($(window).height() - $('.addproplan-box').height()) / 2 + $(window).scrollTop();
		}
		//这是新增事项模块
		else if($(this).hasClass('addfunction-btn')){
			$(".addfunction-box").show();//
			var thisbtn = $(this);
			var thisbox = $(".addfunction-box");
			thisbox.find('.text-menber').find('.select-item').val('选择组员');
			thisbox.find('.text-menber').find('.select-ul').html(userListByCode());
			thisbox.find('.preworktime-text').val('请输入预计工时');
			thisbox.find('.work-textarea').val('输入工作内容');
			thisbox.find('.remark-textarea').val('输入备注内容');
			thisbox.find(".text-datepicker").datepicker();
			thisbox.find("input").css("color","#ccc");
			thisbox.find("textarea").css("color","#ccc");
			
			setlimitDate(thisbtn,thisbox);
			thisbox.find('.start').val('开始日期');
			thisbox.find('.end').val('结束日期');
			//提交
			$(".addfunction-box").unbind().delegate(".dialog-btn","click",function(){
				var CONTENT,PROJECT_ID,MODEL_ID,STARTTIME,ENDTIME,USERCODE,WORKTIME,REMARKS;
				//组员
				if($.trim($(".addfunction-box").find('.select-item').val()) == "-"){
					alert("没有成员，赶紧去添加吧！");
					return false;
				} else {
					if($.trim($(".addfunction-box").find('.select-item').val()) == "选择组员"){
						alert("组员不能为空，请选择后提交！");
						$(".addfunction-box").find('.select-item').click();
						return false;
					} else {
						USERCODE = $(".addfunction-box").find('.select-item').attr("data-id");
					}
				}
				//开始日期
				if($.trim($(".addfunction-box").find('.start').val()) == "开始日期"){
					alert("开始日期不能为空，请输入开始日期后提交！");
					$(".addfunction-box").find('.start').focus();
					return false;
				} else {
					STARTTIME = $(".addfunction-box").find('.start').val();
				}
				//结束日期
				if($.trim($(".addfunction-box").find('.end').val()) == "结束日期"){
					alert("结束日期不能为空，请输入结束日期后提交！");
					$(".addfunction-box").find('.end').focus();
					return false;
				} else {
					ENDTIME = $(".addfunction-box").find('.end').val();
				}
				//预计工时
				if($.trim($(".addfunction-box").find('.preworktime-text').val()) == "请输入预计工时"){
					alert("预计工时不能为空，请输入预计工时后提交！");
					$(".addfunction-box").find('.preworktime-text').focus();
					return false;
				} else {
					WORKTIME = $(".addfunction-box").find('.preworktime-text').val();
				}
				//工作内容
				if($.trim($(".addfunction-box").find('.work-textarea').val()) == "输入工作内容"){
					alert("不能为空，请输入工作内容后提交！");
					$(".addfunction-box").find('.work-textarea').focus();
					return false;
				} else {
					CONTENT = $(".addfunction-box").find('.work-textarea').val();
				}
				//备注
				if($.trim($(".addfunction-box").find('.remark-textarea').val()) == "输入备注内容"){
					REMARKS = "";
				} else {
					REMARKS = $(".addfunction-box").find('.remark-textarea').val();
				}
				PROJECT_ID = thisbtn.attr("data-project");			
				MODEL_ID = thisbtn.attr("data-module");
				insertModelUser(CONTENT,PROJECT_ID,MODEL_ID,STARTTIME,ENDTIME,USERCODE,WORKTIME,REMARKS);		
			});
			
			boxTop = ($(window).height() - $('.addfunction-box').height()) / 2 + $(window).scrollTop();
		}
		//这是修改密码模块
		else if($(this).hasClass("modifyPwd-btn")){
			var thisbtn = $(this);
			var thisbox = $(".modifyPwd-box");
			thisbox.show();
			thisbox.find('.dialog-input').css('color','#ccc');
			thisbox.find('.code').html(sessionStorage.getItem("code"));
			thisbox.find('.name').html(sessionStorage.getItem("name"));
			thisbox.find('.oldpwd').val('请输入旧密码');
			thisbox.find('.newpwd').val('请输入新密码');
			thisbox.find('.repwd').val('请输入确认密码');
			thisbox.find('.oldpwd').on("keyup",function(){$(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''));});
			thisbox.find('.newpwd').on("keyup",function(){$(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''));});
			thisbox.find('.repwd').on("keyup",function(){$(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''));});
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var code,oldpwd,newpwd,repwd;
				code = sessionStorage.getItem("code");
				oldpwd = sessionStorage.getItem("pwd");
				newpwd = thisbox.find('.newpwd').val();
				repwd = thisbox.find('.repwd').val();
				if($.trim(thisbox.find('.oldpwd').val()) == "请输入旧密码"){
					alert("不能为空，请输入旧密码");
					thisbox.find('.oldpwd').focus();
					return false;
				}
				if(thisbox.find('.oldpwd').val() != oldpwd ){
					alert("旧密码错误，请重新输入");
					thisbox.find('.oldpwd').focus();
					return false;
				}
				if($.trim(thisbox.find('.newpwd').val()) == "请输入新密码"){
					alert("不能为空，请输入新密码");
					thisbox.find('.newpwd').focus();
					return false;
				}
				if($.trim(thisbox.find('.repwd').val()) == "请输入确认密码"){
					alert("不能为空，请输入确认密码");
					thisbox.find('.repwd').focus();
					return false;
				}
				if(thisbox.find('.newpwd').val() != thisbox.find('.repwd').val()){
					alert("两次密码输入不一致，请重新输入确认密码");
					thisbox.find('.repwd').focus();
					return false;
				}
				setModifyPwd(code,oldpwd,newpwd,repwd);
			});
		} 
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });
		
		//只能输入浮点数
		$(".dialog-list").delegate(".dialog-text","focus",function(){
			$(this).float();
			/*$(this).numeral(true);*/
		});
		
		//下拉选择框
		$(".dialog-box").children().not('.logReport-box').delegate(".select-item","click",function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find(".select-ul");
			if(thisul.css("display")=="none"){
				if(thisinput.parent().hasClass('text-menber')){
					if(thisul.height()>300){thisul.css({height:"300"+"px","overflow-y":"scroll" });};
				}else{
					if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });};
				}
				
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find(".searchit").focus();
				thisul.find(".searchit").css("color","#000");
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
		}).delegate(".dialog-textarea","focus",function(){
		//$(".dialog-textarea").focus(function(){     
		// 得到当前文本框的值    
			var txt_value =  $(this).val();   
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
			else if($(this).val() == "输入回复内容"){
				$(this).val("");           
				pre_str = '输入回复内容';
			}
			else if($(this).val() == "记录测试、正式的账号，地址等信息"){
				$(this).val(""); 
				pre_str = '记录测试、正式的账号，地址等信息';
			}
			else{
				if($(this).hasClass("work-textarea")){
					pre_str = '输入工作内容';
				}
				else if($(this).hasClass("remarktext")){
					pre_str = '输入备注内容';
				}
				else if($(this).hasClass("replytext")){
					pre_str = '输入回复内容';
				}
				else if($(this).hasClass("explanation-textarea")){
					pre_str = '记录测试、正式的账号，地址等信息';
				}
			}
			$(this).css("color","#000");
		}).delegate(".dialog-textarea","blur",function(){
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css("color","#ccc");
			}
		}).delegate(".dialog-text","focus",function(){   
		// 得到当前文本框的值    
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
			else{
				if($(this).hasClass("preworktime-text")){
					pre_str = '请输入预计工时';
				}
				else{
					pre_str = '请输入用时';
				}
			}
			$(this).css("color","#000");
		}).delegate(".dialog-text","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		}).delegate(".dialog-input","focus",function(){   
		// 得到当前文本框的值    
			var txt_value =  $(this).val();   
			if($(this).val() == "请输入项目名称"){
				$(this).val("");           
				pre_str = '请输入项目名称';
			}else if($(this).val() == "请输入事项名称"){
				$(this).val("");           
				pre_str = '请输入事项名称';
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
				if($(this).hasClass("pro-name")){
					pre_str = '请输入项目名称';
				}else if($(this).hasClass("function-name")){
					pre_str = '请输入事项名称';
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
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		});
		//文本框限制字数
		$(".dialog-list").not(".explanation-textarea").delegate(".dialog-textarea","keypress",function(e){
			var thistext = $(this);
			limitInput(256,thistext);
		});
		//日志上报模块，任务删除一条
//		$(".dialog-list").delegate(".p-del","click",function(){
//			$(this).parent().remove();	
//		});															
		
    });
	
  //点击关闭按钮的时候，遮罩层关闭
    $(".close").click(function () {
    	closeDialogBox();
    });
	
	
	
	
});

//function closeDialogBox(){
//	$(".dialog-bg,.dialog-box").css("display", "none");
//	$(".logReport-box").hide();
//	$(".remark-box").hide();
//	$(".reply-box").hide();
//	$(".modify-box").hide();
//	$(".addpro-box").hide();
//	$(".addproplan-box").hide();
//	$(".addfunction-box").hide();
//	$(".modifyPwd-box").hide();
//	$(".modifypro-box").hide();
//	$(".explanation-box").hide();
//	/*$(".text-datepicker").datepicker("option" , {
//		 minDate: null,
//		 maxDate: null,
//	});*/
//}

//新增项目
function insertProject(json_obj){	
	var strData = "STATUS=0&USERCODE="+sessionStorage.getItem("code")+"&PROJECT_NAME="+encodeURIComponent(json_obj.name)+"&STARTTIME="+json_obj.startTime+"&ENDTIME="+json_obj.endTime+"&REMARKS="+encodeURIComponent(json_obj.remarks)+"&EXPLANATION="+encodeURIComponent(json_obj.explanation);
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "project/insertProject",
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
                getProjectsByTime(date_array[0],getDate(date_array[0]+'-'+date_array[1].toString()+'-01').Format('MM'));
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取项目信息
function getProjectInfoById(proID,thisbox){
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
				if(thisbox.hasClass("modifypro-box")){
					thisbox.find(".pro-name").val(data.data.name);
					thisbox.find(".start").val(data.data.startTime);
					thisbox.find(".end").val(data.data.endTime);
					thisbox.find(".dialog-btn").attr("data-usercode",data.data.usercode);
					thisbox.find(".remark-textarea").val(data.data.remarks);
				}else if(thisbox.hasClass("explanation-box")){
					thisbox.find(".dialog-btn").attr("data-name",data.data.name);
					thisbox.find(".dialog-btn").attr("data-startTime",data.data.startTime);
					thisbox.find(".dialog-btn").attr("data-endTime",data.data.endTime);
					thisbox.find(".dialog-btn").attr("data-usercode",data.data.usercode);
					thisbox.find(".explanation-textarea").val(data.data.explanation);
				}
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//修改说明
function updateExplanation(json_obj,thisbtn){
	var strData = "PROJECT_ID="+json_obj.id+"&USERCODE="+sessionStorage.getItem("code")+"&PROJECT_NAME="+encodeURIComponent(json_obj.name)+"&STARTTIME="+json_obj.startTime+"&ENDTIME="+json_obj.endTime+"&EXPLANATION="+encodeURIComponent(json_obj.explanation);
	//console.log(strData);
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "project/updateProject",
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
                thisbtn.attr("data-explanation",json_obj.explanation);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改项目
function updateProject(json_obj){
	var strData = "PROJECT_ID="+json_obj.id+"&USERCODE="+json_obj.usercode+"&PROJECT_NAME="+encodeURIComponent(json_obj.name)+"&STARTTIME="+json_obj.startTime+"&ENDTIME="+json_obj.endTime+"&REMARKS="+encodeURIComponent(json_obj.remarks);
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "project/updateProject",
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
                getProjectsByTime(date_array[0],getDate(date_array[0]+'-'+date_array[1].toString()+'-01').Format('MM'));
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//新增项目计划
function insertModel(MODEL_NAME,PROJECT_ID,STARTTIME,ENDTIME,REMARKS){	
	var strData = "MODEL_NAME="+encodeURIComponent(MODEL_NAME)+"&PROJECT_ID="+PROJECT_ID+"&STARTTIME="+STARTTIME+"&ENDTIME="+ENDTIME+"&REMARKS="+encodeURIComponent(REMARKS);
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "project/insertModel",
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
                getJSProjectInfo(PROJECT_ID);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//新增模块员工
function insertModelUser(CONTENT,PROJECT_ID,MODEL_ID,STARTTIME,ENDTIME,USERCODE,WORKTIME,REMARKS){	
	var strData = "CONTENT="+encodeURIComponent(CONTENT)+"&PROJECT_ID="+PROJECT_ID+"&MODEL_ID="+MODEL_ID+"&STARTTIME="+STARTTIME+"&ENDTIME="+ENDTIME+"&REMARKS="+encodeURIComponent(REMARKS)+"&USERCODE="+USERCODE+"&WORKTIME="+WORKTIME+"&STATUS=0";
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "project/insertModelUser",
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
                getJSProjectInfo(PROJECT_ID);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
	
//更新模块员工
function updateModelUser(MODELUSER_ID,CONTENT,PROJECT_ID,STARTTIME,ENDTIME,USERCODE,WORKTIME,REMARKS){	
	var strData = "MODELUSER_ID="+MODELUSER_ID+"&CONTENT="+encodeURIComponent(CONTENT)+"&PROJECT_ID="+PROJECT_ID+"&STARTTIME="+STARTTIME+"&ENDTIME="+ENDTIME+"&REMARKS="+encodeURIComponent(REMARKS)+"&USERCODE="+USERCODE+"&WORKTIME="+WORKTIME;
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "project/updateModelUser",
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
                getJSProjectInfo(PROJECT_ID);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//项目和模块员工添加备注
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
//添加回复setAddReply(thisbtn.attr("data-userId"),$(".reply-box").find('.remark-textarea').val(),thisbtn.attr("data-dayTaskId"));
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

//组员下拉框
function userListByCode(){
	var select_li = "";
	$.ajax({
		type : "post",  
	    url : urlfile + "main/userListAfterManage",
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
//			console.log(data);
			if(data.code == 1) {
				if(data.data.length>0){
					select_li += '<input type="text" style="width:200px;" class="searchit"></input>';
					$.each(data.data, function(i, item) {
						select_li += "<li data-id='"+item.code+"'>"+item.name+"</li>";
					});	
				} else {
					select_li = "<li> - </li>";
				}
			} else {
				alert(data.errMsg);
			}
		}		
	});
	return select_li;
}
//设置限制日期
function setlimitDate(thisbtn,thisbox){
	//开始时间
	var mindate= getDate(thisbtn.attr("data-startTime"));
	var maxdate = getDate(thisbtn.attr("data-endTime"));
	thisbox.find(".start").datepicker("option",{  
		minDate: mindate,  
		maxDate: maxdate, 
		onSelect: function(dateText,inst){
			thisbox.find(".end").datepicker("option",{  
				minDate: dateText,  
				maxDate: getDate(thisbtn.attr("data-endTime")), 
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
				minDate: getDate(thisbtn.attr("data-startTime")),  
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