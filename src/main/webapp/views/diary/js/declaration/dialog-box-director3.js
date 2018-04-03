// JavaScript Document

$(function () {				
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
		//这是修改密码模块
		if($(this).hasClass("modifyPwd-btn")){
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
		//这是添加bug管理模块
		else if($(this).hasClass("addbug")){
			var thisbtn = $(this);
			var thisbox = $(".bug-box");
			thisbox.show();
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.find("input").css('color','#000');
			thisbox.find(".select-item").attr("data-id","");
			thisbox.find("input").not(".btn-grey").val("");
			thisbox.find("textarea").val("");
			CKEDITOR.instances.bugContent.setData("");
			//项目下拉框
			getAllProjectList();
			
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_data = {};
				json_data.bugLevel = thisbox.find(".text-bugLevel").find(".select-item").attr("data-id");
				json_data.bugSeverity = thisbox.find(".text-bugSeverity").find(".select-item").attr("data-id");
				json_data.bugTitle = thisbox.find(".bugTitle").val();
				json_data.bugPro = thisbox.find(".text-bugPro").find(".select-item").attr("data-id");
				json_data.bugPro_val = thisbox.find(".text-bugPro").find(".select-item").attr("data-value");
				json_data.usercode = sessionStorage.getItem("code");
				json_data.username =sessionStorage.getItem("name");
				json_data.bugModel = thisbox.find(".text-bugModel").find(".select-item").attr("data-id");
				json_data.bugAffectVersion = thisbox.find(".bugAffectVersion").val();
				json_data.bugSystemType = thisbox.find(".text-bugSystemType").find(".select-item").attr("data-id");
				json_data.bugBrowser = thisbox.find(".text-bugBrowser").find(".select-item").attr("data-id");
				json_data.bugType = thisbox.find(".text-bugType").find(".select-item").attr("data-id");
				json_data.bugStatus = 0;
				json_data.bugAssigned = thisbox.find(".text-bugAssigned").find(".select-item").attr("data-id");
				json_data.bugAssigned_val = thisbox.find(".text-bugAssigned").find(".select-item").val();
				json_data.bugContent = encodeURIComponent(CKEDITOR.instances.bugContent.getData());
				json_data.bugRemarks = thisbox.find(".bugRemarks").val();
				
				if(json_data.bugLevel == ""){
					alert("不能为空，请选择级别！");
					return false;
				}
				if(json_data.bugSeverity == ""){
					alert("不能为空，请选择严重程度！");
					return false;
				}
				if(json_data.bugTitle == ""){
					alert("不能为空，请输入标题！");
					return false;
				}
				if(json_data.bugPro == ""){
					alert("不能为空，请选择所属项目！");
					return false;
				}
				if(json_data.bugModel == ""){
					alert("不能为空，请选择所属模块！");
					return false;
				}
				if(json_data.bugAssigned == ""){
					alert("不能为空，请选择被指派的人！");
					return false;
				}
				if(json_data.bugContent == ""){
					alert("不能为空，请输入内容！");
					return false;
				}
				insertbugs(json_data);
			});
		} 
		//这是修改bug模块
		else if($(this).hasClass("modifyBug-btn")){
			var thisbtn = $(this);
			var thisbox = $(".modifyBug-box");
			thisbox.show();
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.find("input").css('color','#000');
			thisbox.find("textarea").css('color','#000');
			showBugDetail(thisbtn.attr("data-id"),thisbox);
			//项目下拉框
			getAllProjectList();
			
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_obj={};
				json_obj.oldStatus = sessionStorage.getItem("oldStatus");
				json_obj.oldAssignedcode = sessionStorage.getItem("oldAssignedcode");
				json_obj.username = sessionStorage.getItem("name");
				json_obj.bugId = $(this).attr("data-id");
				json_obj.bugLevel = thisbox.find(".text-bugLevel").find(".select-item").attr("data-id");
				json_obj.bugTitle = thisbox.find(".bugTitle").val();
				json_obj.bugStatus = thisbox.find(".text-bugStatus").find(".select-item").attr("data-id");
				json_obj.bugSeverity = thisbox.find(".text-bugSeverity").find(".select-item").attr("data-id");
				json_obj.bugPro = thisbox.find(".text-bugPro").find(".select-item").attr("data-id");
				json_obj.bugPro_val = thisbox.find(".text-bugPro").find(".select-item").attr("data-value");
				json_obj.bugModel = thisbox.find(".text-bugModel").find(".select-item").attr("data-id");
				json_obj.bugModifyContent = encodeURIComponent(CKEDITOR.instances.bugModifyContent.getData());
				json_obj.bugAssigned = thisbox.find(".text-bugAssigned").find(".select-item").attr("data-id");
				json_obj.bugAssigned_val = thisbox.find(".text-bugAssigned").find(".select-item").val();
				//json_obj.bugAssigned_val = thisbox.find(".text-bugAssigned").find(".select-item").attr("value");
				json_obj.bugType = thisbox.find(".text-bugType").find(".select-item").attr("data-id");
				json_obj.bugAffectVersion = thisbox.find(".bugAffectVersion").val();
				json_obj.bugSystemType = thisbox.find(".text-bugSystemType").find(".select-item").attr("data-id");
				json_obj.bugBrowser = thisbox.find(".text-bugBrowser").find(".select-item").attr("data-id");
				json_obj.bugRemarks = thisbox.find(".bugRemarks").val();
				
				if(json_obj.bugLevel == ""){
					alert("不能为空，请选择级别！");
					return false;
				}
				if(json_obj.bugSeverity == ""){
					alert("不能为空，请选择严重程度！");
					return false;
				}
				if(json_obj.bugTitle == ""){
					alert("不能为空，请输入标题！");
					return false;
				}
				if(json_obj.bugPro == ""){
					alert("不能为空，请选择所属项目！");
					return false;
				}
				if(json_obj.bugModel == ""){
					alert("不能为空，请选择所属模块！");
					return false;
				}
				if(json_obj.bugStatus == ""){
					alert("不能为空，请选择状态！");
					return false;
				}
				if(json_obj.bugAssigned == ""){
					alert("不能为空，请选择被指派的人！");
					return false;
				}
				if(json_obj.bugModifyContent == ""){
					alert("不能为空，请输入内容！");
					return false;
				}
				updatebugs(json_obj);
				
			});
		} 
		//这是bug详情模块
		else if($(this).hasClass("detailBug-btn")){
			var thisbtn = $(this);
			var thisbox = $(".detailBug-box");
			thisbox.show();
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.find(".text-bugLevel").html("");
			thisbox.find(".text-bugSeverity").html("");
			thisbox.find(".bugTitle").html("");
			thisbox.find(".text-bugPro").html("");
			thisbox.find(".text-bugModel").html("");
			thisbox.find(".bugAffectVersion").html("");
			thisbox.find(".text-bugSystemType").html("");
			thisbox.find(".text-bugBrowser").html("");
			thisbox.find(".text-bugType").html("");
			thisbox.find(".text-bugStatus").html("");
			thisbox.find(".text-bugAssigned").html("");
			thisbox.find(".text-bugCreator").html("");
			thisbox.find(".text-bugCreatTime").html("");
			thisbox.find(".bugContents").html("");
			thisbox.find(".bugRemarks").html("");
			thisbox.find(".bugAssignedRecord").html("");
			thisbox.find(".bugStatusRecord").html("");
			showBugDetailList(thisbtn.attr("data-id"),thisbox);
			
		} 
		
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });
		
      //下拉选择框
        $(".dialog-box").find(".select-item").unbind().on('click',function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find(".select-ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find("input").focus();
				thisul.find("li").click(function(){
					var isChanged = false;
					if(thisinput.parent().hasClass("text-bugPro") && ($(this).attr("data-id") != thisinput.attr("data-id"))){
						isChanged = true;
					}
					thisinput.attr("data-id",$(this).attr("data-id"));
					thisinput.attr("data-value",$(this).attr("data-value"));
					thisinput.val($(this).text());
					//thisinput.attr("value",$(this).text());
					if(isChanged){
						bugProChange(thisinput.parents(".dialog-content").parent().attr("class"));
					}
					//存在汉字
					if(/.*[\u4e00-\u9fa5]+.*$/.test(thisinput.val())){
						limitShow(8,thisinput);
					}else{
						limitShow(16,thisinput);
					}
					thisinput.css("color","#000");
					thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
        
     
		
     // 输入框得到鼠标焦点
		$(".dialog-list").delegate(".dialog-input","focus",function(){   
		// 得到当前文本框的值      
			if($(this).val() == "请输入旧密码"){
				$(this).val("");           
				pre_str = '请输入旧密码';
			}else if($(this).val() == "请输入新密码"){
				$(this).val("");           
				pre_str = '请输入新密码';
			}else if($(this).val() == "请输入确认密码"){
				$(this).val("");           
				pre_str = '请输入确认密码';
			}else{
				if($(this).hasClass('oldpwd')){
					pre_str = '请输入旧密码';
				}else if($(this).hasClass('newpwd')){
					pre_str = '请输入新密码';
				}else if($(this).hasClass('repwd')){
					pre_str = '请输入确认密码';
				}
			}
			$(this).css('color','#000');
		});
		
		// 输入框失去鼠标焦点 
		$(".dialog-list").delegate(".dialog-input","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css('color','#ccc');
			}
		});
		
		// 文本框得到鼠标焦点
		$(".dialog-list").delegate(".dialog-textarea","focus",function(){
		// 得到当前文本框的值    
			var txt_value =  $(this).val();   
			if($(this).val() == "请输入备注内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入备注内容';
			}
			else if($(this).val() == "请输入回复内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入回复内容';
			}
			$(this).css('color','#000');
		});
		
		// 文本框失去鼠标焦点
		$(".dialog-list").delegate(".dialog-textarea","blur",function(){
			if($(this).val() == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str);  
				$(this).css('color','#ccc');
			}
		});			
		
		//文本框限制字数
		$(".dialog-list").delegate(".dialog-textarea","keyup",function(){
			var thistext = $(this);
			limitInput(256,thistext);
		});
    });
	
  //点击关闭按钮的时候，遮罩层关闭
    $(".close").click(function () {
    	closeDialogBox();
    });  
	
});
function closeDialogBox(){
    $(".dialog-bg,.dialog-box").css("display", "none");
    $(".modifyPwd-box").hide();
	$(".bug-box").hide();
    $(".modifyBug-box").hide();
    $(".detailBug-box").hide();
}

//以下为bug管理模块
//添加bug中所属项目改变项目
function bugProChange(boxclass){
	var thisbox;
	if(boxclass == "bug-box"){
		thisbox = $(".bug-box");
	}else if(boxclass == "modifyBug-box"){
		thisbox = $(".modifyBug-box");
	}
	//var thisbox = $(".bug-box");
	var proId = thisbox.find(".text-bugPro").find(".select-item").attr("data-id");
	thisbox.find(".text-bugModel").find(".select-item").val("");
	thisbox.find(".text-bugModel").find(".select-item").attr("data-id","");
	//模块
	getModelByPIdList(proId);
	//人员
	thisbox.find(".text-bugAssigned").find(".select-item").val("");
	thisbox.find(".text-bugAssigned").find(".select-item").attr("data-id","");
	getUsersByPIdList(proId);
}
//获取所有项目
function getAllProjectList(){
	$.ajax({
		type : "post",  
	    url : urlfile + "main/findAllProjectList",
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
				var strhtml_selectUl = '';
				strhtml_selectUl += '<input type="text" style="width:200px;" class="searchit"></input>';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].id+'" data-value="'+data.data[i].name+'">'+data.data[i].name+'</li>';
				}
				$('.text-bugPro').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
/*function getAllProjectList(){
	$.ajax({
		type : "post",  
	    url : urlfile + "main/findAllProjectList",
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].id+'" data-value="'+data.data[i].name+'">'+data.data[i].name+'</li>';
				}
				$('.text-bugPro').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}*/
//获取项目下所有模块
function getModelByPIdList(proId){
	$.ajax({
		data : "PROJECT_ID="+proId,
		type : "post",  
	    url : urlfile + "project/getModelByPId",
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.modelVOList.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data.modelVOList[i].id+'" data-value="'+data.data.modelVOList[i].name+'">'+data.data.modelVOList[i].name+'</li>';
				}
				$('.text-bugModel').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取项目下人员信息
function getUsersByPIdList(proId){
	$.ajax({
		data : "ID="+proId,
		type : "post",  
	    url : urlfile + "main/getJoinUserByProject",
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].usercode+'">'+data.data[i].userName+'</li>';
				}
				$('.text-bugAssigned').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改bug中获得bug详情
function showBugDetail(bugId,thisbox){
	$.ajax({
		data : "BUGID="+ bugId,
		type : "post",  
	    url : urlfile + "bug/getBugsbyId",
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
				var systemType_value = "";
				if(data.data.systemType == 0){
					systemType_value = "全部";
				}else if(data.data.systemType == 1){
					systemType_value = "Windows";
				}else if(data.data.systemType == 2){
					systemType_value = "Windows 8";
				}else if(data.data.systemType == 3){
					systemType_value = "Windows 7";
				}else if(data.data.systemType == 4){
					systemType_value = "Windows Vista";
				}else if(data.data.systemType == 5){
					systemType_value = "Windows XP";
				}else if(data.data.systemType == 6){
					systemType_value = "Windows 2012";
				}else if(data.data.systemType == 7){
					systemType_value = "Windows 2008";
				}else if(data.data.systemType == 8){
					systemType_value = "Windows 2003";
				}else if(data.data.systemType == 9){
					systemType_value = "Windows 2000";
				}else if(data.data.systemType == 10){
					systemType_value = "Android";
				}else if(data.data.systemType == 11){
					systemType_value = "IOS";
				}else if(data.data.systemType == 12){
					systemType_value = "WP8";
				}else if(data.data.systemType == 13){
					systemType_value = "WP7";
				}else if(data.data.systemType == 14){
					systemType_value = "Symbian";
				}else if(data.data.systemType == 15){
					systemType_value = "Linux";
				}else if(data.data.systemType == 16){
					systemType_value = "FreeBSD";
				}else if(data.data.systemType == 17){
					systemType_value = "OS X";
				}else if(data.data.systemType == 18){
					systemType_value = "Unix";
				}else if(data.data.systemType == 19){
					systemType_value = "其他";
				}
				
				var browser_value = "";
				if(data.data.browser == 0){
					browser_value = "全部";
				}else if(data.data.browser == 1){
					browser_value = "IE系列";
				}else if(data.data.browser == 2){
					browser_value = "IE11";
				}else if(data.data.browser == 3){
					browser_value = "IE10";
				}else if(data.data.browser == 4){
					browser_value = "IE9";
				}else if(data.data.browser == 5){
					browser_value = "IE8";
				}else if(data.data.browser == 6){
					browser_value = "IE7";
				}else if(data.data.browser == 7){
					browser_value = "IE6";
				}else if(data.data.browser == 8){
					browser_value = "chrome";
				}else if(data.data.browser == 9){
					browser_value = "firefox系列";
				}else if(data.data.browser == 10){
					browser_value = "firefox4";
				}else if(data.data.browser == 11){
					browser_value = "firefox3";
				}else if(data.data.browser == 12){
					browser_value = "firefox2";
				}else if(data.data.browser == 13){
					browser_value = "opera系列";
				}else if(data.data.browser == 14){
					browser_value = "opera11";
				}else if(data.data.browser == 15){
					browser_value = "opera10";
				}else if(data.data.browser == 16){
					browser_value = "opera9";
				}else if(data.data.browser == 17){
					browser_value = "safari";
				}else if(data.data.browser == 18){
					browser_value = "傲游";
				}else if(data.data.browser == 19){
					browser_value = "UC";
				}else if(data.data.browser == 20){
					browser_value = "360";
				}else if(data.data.browser == 21){
					browser_value = "其他";
				}
				
				var bugType_value = "";
				if(data.data.bugType == 0){
					bugType_value = "代码错误";
				}else if(data.data.bugType == 1){
					bugType_value = "界面优化";
				}else if(data.data.bugType == 2){
					bugType_value = "设计缺陷";
				}else if(data.data.bugType == 3){
					bugType_value = "配置相关";
				}else if(data.data.bugType == 4){
					bugType_value = "安装部署";
				}else if(data.data.bugType == 5){
					bugType_value = "安全相关";
				}else if(data.data.bugType == 6){
					bugType_value = "性能问题";
				}else if(data.data.bugType == 7){
					bugType_value = "标准规范";
				}else if(data.data.bugType == 8){
					bugType_value = "测试脚本";
				}else if(data.data.bugType == 9){
					bugType_value = "其他";
				}
				
				var status_value = "";
				if(data.data.status == "0"){
					status_value = "Unsolved";
				}else if(data.data.status == "1"){
					status_value = "Solving";
				}else if(data.data.status == "2"){
					status_value = "ByDesign";
				}else if(data.data.status == "3"){
					status_value = "Duplicate";
				}else if(data.data.status == "4"){
					status_value = "NotRepro";
				}else if(data.data.status == "5"){
					status_value = "Fixed";
				}else if(data.data.status == "6"){
					status_value = "External";
				}else if(data.data.status == "7"){
					status_value = "Postponed";
				}else if(data.data.status == "8"){
					status_value = "WonotFix";
				}else if(data.data.status == "9"){
					status_value = "Solved";
				}else if(data.data.status == "10"){
					status_value = "Processed";
				}
              thisbox.find(".text-bugLevel").find(".select-item").attr("data-id",data.data.level);
              thisbox.find(".text-bugLevel").find(".select-item").val(data.data.level);
              //thisbox.find(".text-bugLevel").find(".select-item").attr("value",data.data.level);
				thisbox.find(".text-bugSeverity").find(".select-item").attr("data-id",data.data.severity);
				thisbox.find(".text-bugSeverity").find(".select-item").val(data.data.severity);
				//thisbox.find(".text-bugSeverity").find(".select-item").attr("value",data.data.severity);
				thisbox.find(".bugTitle").val(data.data.title);
				thisbox.find(".text-bugPro").find(".select-item").attr("data-id",data.data.projectId);
				thisbox.find(".text-bugPro").find(".select-item").attr("data-value",data.data.projectName);
				thisbox.find(".text-bugPro").find(".select-item").val(data.data.projectName);
				//thisbox.find(".text-bugPro").find(".select-item").attr("value",data.data.projectName);
				thisbox.find(".text-bugModel").find(".select-item").attr("data-id",data.data.modelId);
				thisbox.find(".text-bugModel").find(".select-item").val(data.data.modelName);
				//thisbox.find(".text-bugModel").find(".select-item").attr("value",data.data.modelName);
				thisbox.find(".bugAffectVersion").val(data.data.affectVersion);
				thisbox.find(".text-bugSystemType").find(".select-item").attr("data-id",data.data.systemType);
				thisbox.find(".text-bugSystemType").find(".select-item").val(systemType_value);
				//thisbox.find(".text-bugSystemType").find(".select-item").attr("value",systemType_value);
				thisbox.find(".text-bugBrowser").find(".select-item").attr("data-id",data.data.browser);
				thisbox.find(".text-bugBrowser").find(".select-item").val(browser_value);
				//thisbox.find(".text-bugBrowser").find(".select-item").attr("value",browser_value);
				thisbox.find(".text-bugType").find(".select-item").attr("data-id",data.data.bugType);
				thisbox.find(".text-bugType").find(".select-item").val(bugType_value);
				//thisbox.find(".text-bugType").find(".select-item").attr("value",bugType_value);
				thisbox.find(".text-bugStatus").find(".select-item").attr("data-id",data.data.status);
				thisbox.find(".text-bugStatus").find(".select-item").val(status_value);
				//thisbox.find(".text-bugStatus").find(".select-item").attr("value",status_value);
				thisbox.find(".text-bugAssigned").find(".select-item").attr("data-id",data.data.assignedCode);
				thisbox.find(".text-bugAssigned").find(".select-item").val(data.data.assignedName);
				//thisbox.find(".text-bugAssigned").find(".select-item").attr("value",data.data.assignedName);
				CKEDITOR.instances.bugModifyContent.setData(data.data.content);
				thisbox.find(".bugRemarks").val(data.data.remarks);
				thisbox.find(".bugAssignedRecord").html(data.data.assignedRecord);
				thisbox.find(".bugStatusRecord").html(data.data.statusRecord);
				thisbox.find(".dialog-btn").attr("data-id",data.data.id);
				sessionStorage.setItem("oldStatus",data.data.status);
				sessionStorage.setItem("oldAssignedcode",data.data.assignedCode);
				var proId = thisbox.find(".text-bugPro").find(".select-item").attr("data-id");
				//模块
				getModelByPIdList(proId);
				//人员
				getUsersByPIdList(proId);
				//存在汉字
				thisbox.find(".select-item").each(function(){
					if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
						limitShow(8,$(this));
					}else{
						limitShow(16,$(this));
					}
				});
				
			} else {
				alert(data.errMsg);
			}
		}	
	});
}
//获得bug详情
function showBugDetailList(bugId,thisbox){
	$.ajax({
		data : "BUGID="+ bugId,
		type : "post",  
	    url : urlfile + "bug/getBugsbyId",
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
				var systemType_value = "";
				if(data.data.systemType == 0){
					systemType_value = "全部";
				}else if(data.data.systemType == 1){
					systemType_value = "Windows";
				}else if(data.data.systemType == 2){
					systemType_value = "Windows 8";
				}else if(data.data.systemType == 3){
					systemType_value = "Windows 7";
				}else if(data.data.systemType == 4){
					systemType_value = "Windows Vista";
				}else if(data.data.systemType == 5){
					systemType_value = "Windows XP";
				}else if(data.data.systemType == 6){
					systemType_value = "Windows 2012";
				}else if(data.data.systemType == 7){
					systemType_value = "Windows 2008";
				}else if(data.data.systemType == 8){
					systemType_value = "Windows 2003";
				}else if(data.data.systemType == 9){
					systemType_value = "Windows 2000";
				}else if(data.data.systemType == 10){
					systemType_value = "Android";
				}else if(data.data.systemType == 11){
					systemType_value = "IOS";
				}else if(data.data.systemType == 12){
					systemType_value = "WP8";
				}else if(data.data.systemType == 13){
					systemType_value = "WP7";
				}else if(data.data.systemType == 14){
					systemType_value = "Symbian";
				}else if(data.data.systemType == 15){
					systemType_value = "Linux";
				}else if(data.data.systemType == 16){
					systemType_value = "FreeBSD";
				}else if(data.data.systemType == 17){
					systemType_value = "OS X";
				}else if(data.data.systemType == 18){
					systemType_value = "Unix";
				}else if(data.data.systemType == 19){
					systemType_value = "其他";
				}
				
				var browser_value = "";
				if(data.data.browser == 0){
					browser_value = "全部";
				}else if(data.data.browser == 1){
					browser_value = "IE系列";
				}else if(data.data.browser == 2){
					browser_value = "IE11";
				}else if(data.data.browser == 3){
					browser_value = "IE10";
				}else if(data.data.browser == 4){
					browser_value = "IE9";
				}else if(data.data.browser == 5){
					browser_value = "IE8";
				}else if(data.data.browser == 6){
					browser_value = "IE7";
				}else if(data.data.browser == 7){
					browser_value = "IE6";
				}else if(data.data.browser == 8){
					browser_value = "chrome";
				}else if(data.data.browser == 9){
					browser_value = "firefox系列";
				}else if(data.data.browser == 10){
					browser_value = "firefox4";
				}else if(data.data.browser == 11){
					browser_value = "firefox3";
				}else if(data.data.browser == 12){
					browser_value = "firefox2";
				}else if(data.data.browser == 13){
					browser_value = "opera系列";
				}else if(data.data.browser == 14){
					browser_value = "opera11";
				}else if(data.data.browser == 15){
					browser_value = "opera10";
				}else if(data.data.browser == 16){
					browser_value = "opera9";
				}else if(data.data.browser == 17){
					browser_value = "safari";
				}else if(data.data.browser == 18){
					browser_value = "傲游";
				}else if(data.data.browser == 19){
					browser_value = "UC";
				}else if(data.data.browser == 20){
					browser_value = "360";
				}else if(data.data.browser == 21){
					browser_value = "其他";
				}
				
				var bugType_value = "";
				if(data.data.bugType == 0){
					bugType_value = "代码错误";
				}else if(data.data.bugType == 1){
					bugType_value = "界面优化";
				}else if(data.data.bugType == 2){
					bugType_value = "设计缺陷";
				}else if(data.data.bugType == 3){
					bugType_value = "配置相关";
				}else if(data.data.bugType == 4){
					bugType_value = "安装部署";
				}else if(data.data.bugType == 5){
					bugType_value = "安全相关";
				}else if(data.data.bugType == 6){
					bugType_value = "性能问题";
				}else if(data.data.bugType == 7){
					bugType_value = "标准规范";
				}else if(data.data.bugType == 8){
					bugType_value = "测试脚本";
				}else if(data.data.bugType == 9){
					bugType_value = "其他";
				}
				
				var status_value = "";
				if(data.data.status == "0"){
					status_value = "Unsolved";
				}else if(data.data.status == "1"){
					status_value = "Solving";
				}else if(data.data.status == "2"){
					status_value = "ByDesign";
				}else if(data.data.status == "3"){
					status_value = "Duplicate";
				}else if(data.data.status == "4"){
					status_value = "NotRepro";
				}else if(data.data.status == "5"){
					status_value = "Fixed";
				}else if(data.data.status == "6"){
					status_value = "External";
				}else if(data.data.status == "7"){
					status_value = "Postponed";
				}else if(data.data.status == "8"){
					status_value = "WonotFix";
				}else if(data.data.status == "9"){
					status_value = "Solved";
				}else if(data.data.status == "10"){
					status_value = "Processed";
				}

              thisbox.find(".text-bugLevel").html(data.data.level);
				thisbox.find(".text-bugSeverity").html(data.data.severity);
				thisbox.find(".bugTitle").html(data.data.title);
				thisbox.find(".text-bugPro").html(data.data.projectName);
				thisbox.find(".text-bugModel").html(data.data.modelName);
				thisbox.find(".bugAffectVersion").html(data.data.affectVersion);
				thisbox.find(".text-bugSystemType").html(systemType_value);
				thisbox.find(".text-bugBrowser").html(browser_value);
				thisbox.find(".text-bugType").html(bugType_value);
				thisbox.find(".text-bugStatus").html(status_value);
				thisbox.find(".text-bugAssigned").html(data.data.assignedName);
				thisbox.find(".text-bugCreator").html(data.data.name);
				thisbox.find(".text-bugCreatTime").html(new Date(data.data.addTime).Format("yyyy-MM-dd hh:mm:ss"));
				thisbox.find(".bugContents").html(data.data.content);
				thisbox.find(".bugRemarks").html(data.data.remarks);
				thisbox.find(".bugAssignedRecord").html(data.data.assignedRecord);
				thisbox.find(".bugStatusRecord").html(data.data.statusRecord);
			} else {
				alert(data.errMsg);
			}
		}	
	});
}
//增加bug
function insertbugs(json_data){
	$.ajax({
		data : "LEVEL="+json_data.bugLevel+"&TITLE="+json_data.bugTitle+"&STATUS="+json_data.bugStatus+"&SEVERITY="+json_data.bugSeverity+"&PROJECTID="+json_data.bugPro
		+"&PROJECTNAME="+json_data.bugPro_val+"&MODELID="+json_data.bugModel+"&USERCODE="+json_data.usercode+"&NAME="+json_data.username+"&CONTENT="+json_data.bugContent
		+"&ASSIGNEDCODE="+json_data.bugAssigned+"&ASSIGNEDNAME="+json_data.bugAssigned_val+"&BUGTYPE="+json_data.bugType+"&AFFECTVERSION="+json_data.bugAffectVersion
		+"&SYSTEMTYPE="+json_data.bugSystemType+"&BROWSER="+json_data.bugBrowser+"&REMARKS="+json_data.bugRemarks,
		type : "post",  
	    url : urlfile + "bug/insertBug",
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
				alert("添加成功！");
				closeDialogBox();
				$(".searchBugProName").val("");
				$(".searchBugAssigned").val("");
				$(".searchBugTitle").val("");
				$(".searchBugStatus").find(".select-item").attr("data-id",99);
				$(".searchBugStatus").find(".select-item").val("All");
				showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),'','','',99,1);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改bug
function updatebugs(json_obj){
	$.ajax({
		data : "OLD_STATUS="+json_obj.oldStatus+"&OLD_ASSIGNEDCODE="+json_obj.oldAssignedcode+"&USERNAME="+json_obj.username
				+"&ID="+json_obj.bugId+"&LEVEL="+json_obj.bugLevel+"&TITLE="+json_obj.bugTitle+"&STATUS="+json_obj.bugStatus+"&SEVERITY="+json_obj.bugSeverity
				+"&PROJECTID="+json_obj.bugPro+"&PROJECTNAME="+json_obj.bugPro_val+"&MODELID="+json_obj.bugModel+"&CONTENT="+json_obj.bugModifyContent
				+"&ASSIGNEDCODE="+json_obj.bugAssigned+"&ASSIGNEDNAME="+json_obj.bugAssigned_val+"&BUGTYPE="+json_obj.bugType+"&AFFECTVERSION="+json_obj.bugAffectVersion
				+"&SYSTEMTYPE="+json_obj.bugSystemType+"&BROWSER="+json_obj.bugBrowser+"&REMARKS="+json_obj.bugRemarks,
		type : "post",  
	    url : urlfile + "bug/updateBugs",
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
				alert("修改成功！");
				closeDialogBox();
				var proName = $(".searchBugProName").val();
				var assigned = $(".searchBugAssigned").val();
				var title = $(".searchBugTitle").val();
				var status = $(".searchBugStatus").find(".select-item").attr("data-id");
				showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,$(".backpage").attr("data-pagenum"));
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}