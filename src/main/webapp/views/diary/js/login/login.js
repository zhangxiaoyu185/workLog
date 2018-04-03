// JavaScript Document
$(function() {
	if ($.cookie("rmbUser") == "true") {
		$("#ck_rmbUser").prop("checked", true);
		$("#name").val($.cookie("username"));
	}
	$(".input-text").each(function(){
		if($(this).val() == "工号" || $(this).val() == "密码"){
			$(this).css("color","#ccc");
		}
		else{
			$(this).css("color","#000");
		}
	});
	$(".input-text").on("focus",function(){
		$(this).css("color","#000");
	});
	$(".input-text").on("blur",function(){
		if($(this).val() == "工号" || $(this).val() == "密码"){
			$(this).css("color","#ccc");
		}
		else{
			$(this).css("color","#000");
		}
		
	});
	$("body").keypress(function(e) {
        if (e.which == "13") {//keyCode=13是回车键
        	login();
        }
    });
}); 

//记住用户名密码 
function save() {
	if ($("#ck_rmbUser").prop("checked")) {
		$.cookie("rmbUser", "true", {
			expires : 7
		}); // 存储一个带7天期限的cookie
		$.cookie("username", $("#name").val(), {
			expires : 7
		});
		$.cookie("password", $("#password").val(), {
			expires : 7
		});
	} else {
		$.cookie("rmbUser", "false", {
			expire : -1
		});
		$.cookie("username", "", {
			expires : -1
		});
		$.cookie("password", "", {
			expires : -1
		});
	}
}

function login(){
		var username = $("#name").val(); 
		var password = $("#password").val(); 
		if(username == "" || username == "工号"){ 
			alert('请输入工号!');
			$("#name").focus(); 
			return; 
		}
		if(password == "" || password == "密码"){
			alert('请输入密码!');
			$("#password").focus();
			return;
		}
		save();
		$.ajax({
			data:"&USERCODE="+username+"&PWD="+password,
			type : "post",
		    url : urlfile + "main/login",
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
					//console.log(data);
					sessionStorage.setItem("code", data.data.code); //设置缓存键的值
					sessionStorage.setItem("name", data.data.name);
					sessionStorage.setItem("pwd", data.data.pwd);
					sessionStorage.setItem("roles", data.data.roles);
					sessionStorage.setItem("menuMap", JSON.stringify(data.data.menuMap));
					if(data.data.roles == '0'){
						location.href = "../declaration/index_admin.html";
					}else{
						location.href = "../declaration/welcome.html";
					}

				}
				else {
					alert(data.errMsg);
				}
			}		
		});
	}
function psdfocus(){
	var thisbox = $("#password").parent();
	thisbox.html('<i class="img-pass"></i><input type="password" id="password" name="password" class="input-text" onfocus="this.style.imeMode=\'disabled\';" onblur="psdblur()"/>');
	$("#password").focus();
	$("#password").css("color","#000");
}
function psdblur(){
	if($("#password").val() == ""){
		var thisbox = $("#password").parent();
		thisbox.html('<i class="img-pass"></i><input type="text" id="password" name="password" value="密码" class="input-text" onfocus="psdfocus();"/>');
		$("#password").css("color","#ccc");
	}
}