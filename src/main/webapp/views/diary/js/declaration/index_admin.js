// JavaScript Document

$(function(){

	$("#username").html("你好："+sessionStorage.getItem("name"));
    $("#usercode").html("工号："+sessionStorage.getItem("code"));
    //$("#userjob").html("岗位："+sessionStorage.getItem("roleName"));
    
    initList('group');
	showGroupList();
    //角色管理点击事件
	$(".role-btn").on("click",function(){
		initList('role');
		showRoleList();
		
	});
	//组别管理点击事件
	$(".group-btn").on("click",function(){
		initList('group');
		showGroupList();
	});
	
	//项目管理点击事件
	$(".project-btn").on("click",function(){
		initList('project');
		showProjectList(1,'','');
	});
//	//项目经理点击事件
//	$(".pm-btn").on("click",function(){
//		initList('pm');
//		showPMList();
//	});
	//普通员工点击事件
	$(".staff-btn").on("click",function(){
		initList('staff');
		showStaffList(1,'');
	});
	//权限管理点击事件
	$(".meau-btn").on("click",function(){
		initList('meau');
//		showSearchItem();
		showFunctionList();
	});
	//退出登录
	$("body").delegate(".exit-btn","click",function(){
		location.href = "../login/login.html";
		sessionStorage.clear();
	});
	//删除角色
	$("body").delegate(".delRole-btn","click",function(){
		var r=confirm("是否确认删除？");
		if (r==true){
			delRole($(this).attr("data-id"));
		}
	});
	//删除组别
	$("body").delegate(".delGroup-btn","click",function(){
		var r=confirm("是否确认删除？");
		if (r==true){
			delGroup($(this).attr("data-id"));
		}
	});
	//删除组别
	$("body").delegate(".delPM-btn","click",function(){
		var r=confirm("是否确认删除？");
		if (r==true){
			delPM($(this).attr("data-usercode"));
		}
	});
	//禁用员工
	$("body").delegate(".delStaff-btn","click",function(){
		var r=confirm("是否确认禁用？");
		if (r==true){
			var page = $(this).attr("data-page");
			if($(this).attr("data-item") == '0'){
				page = page - 1;
			}
			//console.log(page);
			delStaff($(this).attr("data-usercode"),page);
		}
	});
	//重置密码
	$("body").delegate(".resetPwd-btn","click",function(){
		var thisbtn = $(this);
		var code = thisbtn.attr('data-usercode');
		var page = thisbtn.attr('data-page');
		var r=confirm("是否确认重置密码[123456]？");
		if(r==true){
			resetModifyPwd(code,page);
		}
	});
	//删除权限菜单
	$("body").delegate(".delMeau-btn","click",function(){
		var r=confirm("是否确认删除？");
		if (r==true){
			delMeau($(this).attr("data-id"));
		}
	});
	//删除项目
	$("body").delegate(".delProject-btn","click",function(){
		var r=confirm("是否确认删除？");
		if (r==true){
			delProject($(this).attr("data-id"),$(this).attr("data-pagenum"));
		}
	});
	
//	//查询bug
//	$("body").delegate(".searchBug-btn","click",function(){
//		var proName = $(".searchBugProName").val();
//		var assigned = $(".searchBugAssigned").val();
//		var title = $(".searchBugTitle").val();
//		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
//		showFunctionList();
//	});
	
	//查询员工
	$("body").delegate(".searchUser-btn","click",function(){
		var userName = $.trim($(".searchUserName").val());
//		var assigned = $(".searchBugAssigned").val();
//		var title = $(".searchBugTitle").val();
//		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		showStaffList('1',userName);
	});
	//鼠标拂过表格显示备注内容 
	$('.manageBox').delegate(".tr-showRemarks","mouseover", function() {
		var remarks = $(this).attr("data-remarks");
		showremark(remarks,$(this));
	}); 
	$('.manageBox').delegate(".tr-showRemarks","mouseout", function() {
		removeremark($(this));
	}); 
	//上一页
	$('.manageBox').delegate(".backpage","click", function() {
		var userName = $.trim($(".searchUserName").val());
		var pagenum = parseInt($(this).attr("data-pagenum"))-1;
		showStaffList(pagenum,userName);
	}); 
	//下一页
	$('.manageBox').delegate(".nextpage","click", function() {
		var userName = $.trim($(".searchUserName").val());
		var pagenum = parseInt($(this).attr("data-pagenum"))+1;
		showStaffList(pagenum,userName);
	}); 
	//首页
	$('.manageBox').delegate(".firstpage","click", function() {
		var userName = $.trim($(".searchUserName").val());
		showStaffList(1,userName);
	}); 
	//末页
	$('.manageBox').delegate(".lastpage","click", function() {
		var userName = $.trim($(".searchUserName").val());
		var pagenum = parseInt($(this).attr("data-pagenum"));
		showStaffList(pagenum,userName);
	}); 
	//跳转至
	$('.manageBox').delegate(".jumppage","click", function() {
		var userName = $.trim($(".searchUserName").val());
		var pagenum = parseInt($('.jumppagetext').val());
		if(pagenum>0 && pagenum <=parseInt($(this).attr("data-pagemax"))){
			showStaffList(pagenum,userName);
		}else{
			alert("查无此页！");
		}
	}); 
	
	//查询项目页面
	$("body").delegate(".searchPro-btn","click",function(){
		var proName = $.trim($(".searchProName").val());
		var username = $.trim($(".searchPicName").val());
//		var assigned = $(".searchBugAssigned").val();
//		var title = $(".searchBugTitle").val();
//		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		showProjectList(1,proName,username);
	});
	//上一页
	$('.manageBox').delegate(".probackpage","click", function() {
		var proName = $.trim($(".searchProName").val());
		var username = $.trim($(".searchPicName").val());
		var pagenum = parseInt($(this).attr("data-pagenum"))-1;
		showProjectList(pagenum,proName,username);
	}); 
	//下一页
	$('.manageBox').delegate(".pronextpage","click", function() {
		var proName = $.trim($(".searchProName").val());
		var username = $.trim($(".searchPicName").val());
		var pagenum = parseInt($(this).attr("data-pagenum"))+1;
		showProjectList(pagenum,proName,username);
	}); 
	//首页
	$('.manageBox').delegate(".profirstpage","click", function() {
		var username = $.trim($(".searchPicName").val());
		var proName = $.trim($(".searchProName").val());
		showProjectList(1,proName,username);
	}); 
	//末页
	$('.manageBox').delegate(".prolastpage","click", function() {
		var proName = $.trim($(".searchProName").val());
		var username = $.trim($(".searchPicName").val());
		var pagenum = parseInt($(this).attr("data-pagenum"));
		showProjectList(pagenum,proName,username);
	}); 
	//跳转至
	$('.manageBox').delegate(".projumppage","click", function() {
		var proName = $.trim($(".searchProName").val());
		var username = $.trim($(".searchPicName").val());
		var pagenum = parseInt($('.jumppagetext').val());
		if(pagenum>0 && pagenum <=parseInt($(this).attr("data-pagemax"))){
			showProjectList(pagenum,proName,username);
		}else{
			alert("查无此页！");
		}
	});
	//下拉框
	$(".manageBox").delegate(".select-item","click",function(){
		var thisinput=$(this);
		var thisul=$(this).parent().find(".select-ul");
		if(thisul.css("display")=="none"){
			if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });}
			thisul.fadeIn("100");
			thisul.hover(function(){},function(){thisul.fadeOut("100");});
			thisul.find("input").focus();
			thisul.find("li").unbind().click(function(){
				
				thisinput.attr("data-id",$(this).attr("data-id"));
				thisinput.attr("data-value",$(this).attr("data-value"));
				thisinput.val($(this).text());
				
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
});	
//位置
function initList(str){
	var strHtml_rightTop2 = '';
	if(str == 'role'){
		strHtml_rightTop2 += '<span>首页 > 角色管理</span>'
            			+ '<input type="button" class="addBtn showbtn addrole" value="新增"></input>';
	}else if(str == 'group'){
		strHtml_rightTop2 += '<span>首页 > 组别管理</span>'
			+ '<input type="button" class="addBtn showbtn addgroup" value="新增"></input>';
	}else if(str == 'project'){
		strHtml_rightTop2 += '<span>首页 > 项目管理</span>';
	}else if(str == 'pm'){
		strHtml_rightTop2 += '<span>首页 > 项目经理</span>'
			+ '<input type="button" class="addBtn showbtn addpm" value="新增"></input>';
	}else if(str == 'staff'){
		strHtml_rightTop2 += '<span>首页 > 普通员工</span>'
			+ '<input type="button" class="addBtn showbtn addstaff" value="新增"></input>';
	}else if(str == 'meau'){
		strHtml_rightTop2 += '<span>首页 > 权限管理</span>'
			+ '<input type="button" class="addBtn showbtn addmeau" value="新增"></input>';
	}
	$('.rightTop2').html(strHtml_rightTop2);
}
//显示角色列表
function showRoleList(){
	var strHtml_manageBox = "";
	$('.manageBox').html(strHtml_manageBox);
	$.ajax({
		type : "post",  
	    url : urlfile + "admin/roleList",
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
				if(data.data.length>0){
					strHtml_manageBox += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="10%">ID</td> '
									+'<td width="15%">角色名</td>'
									+'<td width="35%">权限</td>'
									+'<td width="25%">备注</td>'
									+'<td width="15%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.length;i++){
						strHtml_manageBox += '<tr>'
					                    +'<td>'+data.data[i].id+'</td>'
					                    +'<td>'+data.data[i].name+'</td>'
					                    +'<td>'+data.data[i].functionNames+'</td>';
						if(data.data[i].remarks != undefined){
							strHtml_manageBox += '<td>'+data.data[i].remarks+'</td>';
						}
						else{
							strHtml_manageBox += '<td></td>';
						}
						strHtml_manageBox += '<td>'
					                    +'<span class="p-edit showbtn modifyRole-btn" data-id="'+data.data[i].id+'" data-name="'+data.data[i].name+'" data-remarks="'+data.data[i].remarks+'" data-functionunids="'+data.data[i].functionUnids+'" data-functionnames="'+data.data[i].functionNames+'" >修改</span>'
					                    +'<span class="p-edit delRole-btn" data-id="'+data.data[i].id+'">删除</span>'
					                    +'</td>'
					                    +'</tr>';
					}
					strHtml_manageBox += '</tbody></table>';
				}
				else{
					strHtml_manageBox += '暂无角色信息，请添加……';
				}
				$('.manageBox').html(strHtml_manageBox);
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//删除角色
function delRole(roleId){
	$.ajax({
		data:"ID="+roleId,
		type : "post",  
	    url : urlfile + "admin/deleteRole",
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
				alert("删除成功！");
				showRoleList();
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//显示组别列表
function showGroupList(){
	var strHtml_manageBox = "";
	$('.manageBox').html(strHtml_manageBox);
	$.ajax({
		type : "post",  
	    url : urlfile + "admin/findGroupListAll",
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
				if(data.data.length>0){
					strHtml_manageBox += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="20%">ID</td> '
									+'<td width="20%">组别名</td>'
									+'<td width="10%">主管工号</td>'
									+'<td width="10%">主管姓名</td>'
									+'<td width="30%">成员</td>'
									+'<td width="10%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.length;i++){
						strHtml_manageBox += '<tr>'
					                    +'<td>'+data.data[i].id+'</td>'
					                    +'<td>'+data.data[i].name+'</td>'
					                    +'<td>'+data.data[i].usercode+'</td>';
						if(data.data[i].manageName == undefined){
							strHtml_manageBox += '<td></td>';
						}else{
							strHtml_manageBox += '<td>'+data.data[i].manageName+'</td>';
						}
						var groupMemberIds="";
						var groupMemberNames="";
						if(data.data[i].groupUserList.length == 0){
							strHtml_manageBox += '<td></td>';
						}else{
							strHtml_manageBox += '<td>';
							
							for(var j = 0 ; j < data.data[i].groupUserList.length ; j++ ){
								groupMemberIds += data.data[i].groupUserList[j].usercode+"|";
								groupMemberNames += data.data[i].groupUserList[j].name+"|";
								if(j != (data.data[i].groupUserList.length-1)){
									strHtml_manageBox += data.data[i].groupUserList[j].name+'、';
								}else{
									strHtml_manageBox += data.data[i].groupUserList[j].name;
								}
							}
							strHtml_manageBox += '</td>';
						}
						strHtml_manageBox += '<td>'
					                    +'<span class="p-edit showbtn modifyGroup-btn" data-id="'+data.data[i].id+'" data-name="'+data.data[i].name+'" data-usercode="'+data.data[i].usercode+'" data-username="'+data.data[i].manageName+'">修改</span>'
					                    +'<span class="p-edit showbtn groupMember-btn" data-id="'+data.data[i].id+'" data-name="'+data.data[i].name+'" data-usercode="'+groupMemberIds+'" data-username="'+groupMemberNames+'">成员管理</span>'
					                    +'<span class="p-edit delGroup-btn" data-id="'+data.data[i].id+'">删除</span>'
					                    +'</td>'
					                    +'</tr>';
					}
					strHtml_manageBox += '</tbody></table>';
				}
				else{
					strHtml_manageBox += '暂无组别信息，请添加……';
				}
				$('.manageBox').html(strHtml_manageBox);
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//删除组别
function delGroup(groupId){
	$.ajax({
		data:"ID="+groupId,
		type : "post",  
	    url : urlfile + "admin/deleteGroup",
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
				alert("删除成功！");
				showGroupList();
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//显示项目列表
function showProjectList(pagenum,projectname,username){
	var strHtml_manageBox = "";
	$('.manageBox').html(strHtml_manageBox);
	strHtml_manageBox += '<div class="align-left align-middle margin-tb">'
		+'<span class="align-center align-middle inline-block85">项目名称:</span>'
		+ '<input type="text" class="dialog-input width150 searchProName" value="'+projectname+'"/>'
		+'<span class="align-center align-middle inline-block85">负责人姓名:</span>'
		+ '<input type="text" class="dialog-input width150 searchPicName" value="'+username+'"/>'
		+ '<input type="button" class="searchBtn searchPro-btn margin-lr" value="查询"></input>'
		+'</div>';
	$.ajax({
		data:"PAGENUM="+pagenum+"&PAGESIZE=14"+"&NAME="+projectname+"&USERNAME="+username,
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
				if(data.data.list.length>0){
					strHtml_manageBox += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="5%">项目ID</td> '
									+'<td width="20%">项目名称</td>'
									+'<td width="10%">总工时(单位:h)</td>'
									+'<td width="12%">开始时间</td>'
									+'<td width="12%">结束时间</td> '
									+'<td width="5%">状态</td>'
									+'<td width="8%">负责人工号</td>'
									+'<td width="8%">负责人姓名</td>'
									+'<td width="10%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.list.length;i++){
						strHtml_manageBox += '<tr class="tr-showRemarks" data-remarks="'+data.data.list[i].remarks+'">'
					                    +'<td>'+data.data.list[i].id+'</td>'
					                    +'<td>'+data.data.list[i].name+'</td>'
					                    +'<td>'+data.data.list[i].allTime+'</td>'
					                    +'<td>'+data.data.list[i].startTime+'</td>'
					                    +'<td>'+data.data.list[i].endTime+'</td>'
					                    +'<td>';
						if(data.data.list[i].status == 1){
							strHtml_manageBox += '<span class="p-red">已完成</span>';
						}
						else{
							strHtml_manageBox += '<span class="p-purple">未完成</span>';
						}  
						strHtml_manageBox += '</td>'
	                    				+'<td>'+data.data.list[i].usercode+'</td>'
					                    +'<td>'+data.data.list[i].username+'</td>'
					                    +'<td>'
					                    +'<span class="p-edit showbtn modifyProject-btn" data-id="'+data.data.list[i].id +'" data-name="'+data.data.list[i].name
					                    +'" data-startTime="'+data.data.list[i].startTime +'" data-endTime="'+data.data.list[i].endTime +'" data-remarks="'+data.data.list[i].remarks
					                    +'" data-usercode="'+data.data.list[i].usercode+'" data-username="'+data.data.list[i].username+'" data-pagenum="'+pagenum+'" data-status="'+data.data.list[i].status+'">修改</span>'
					                    +'<span class="p-edit delProject-btn" data-pagenum="'+pagenum+'" data-id="'+data.data.list[i].id+'">删除</span>';
					                    +'</td>'
					                    +'</tr>';
					}
					strHtml_manageBox += '<tr class="tb-head">'
						+'<td colspan="11">'
						+'<span>共有 </span>'+data.data.count+'<span> 条记录，&nbsp;&nbsp;</span>'
						+'<span>当前第 </span>'+pagenum+'/'+Math.ceil(data.data.count/14)+'<span> 页&nbsp;</span>'
						+'<span class="float-right align-middle">'
						+'<input type="button" class="profirstpage" value="首页"/>&nbsp;&nbsp;'
						+'<input type="button" class="probackpage" data-pagenum="'+pagenum+'" value="上一页"/>&nbsp;&nbsp;'
						+'<input type="button" class="pronextpage" data-pagenum="'+pagenum+'" data-pagemax="'+Math.ceil(data.data.count/14)+'" value="下一页"/>&nbsp;&nbsp;'
						+'<input type="button" class="prolastpage" data-pagenum="'+Math.ceil(data.data.count/14)+'" value="末页"/>&nbsp;&nbsp;'
						+'<span> 转至第</span>'
						+'<input type="text" class="jumppagetext projumppagetext" style="width:30px;" value="'+pagenum+'"/>'
						+'<span>页</span>&nbsp;&nbsp;'
						+'<input type="button" class="jumppage projumppage" data-pagemax="'+Math.ceil(data.data.count/14)+'" value="跳转"/>'
						+'</span>'
						+'</td>'
						+'</tr>';
					strHtml_manageBox += '</tbody></table>';
				}
				else{
					strHtml_manageBox += '暂无项目信息……';
				}
				$('.manageBox').html(strHtml_manageBox);
				$('.searchProName').css('color','#000');
				$('.searchPicName').css("color","#000");
				$(".limit20").each(function(){
					var thistext = $(this);
					limitShow(20,thistext);
				});
				$(".limit10").each(function(){
					var thistext = $(this);
					limitShow(10,thistext);
				});
				if(pagenum == 1){
					$(".probackpage").attr("disabled","disabled");
				}
				if(pagenum == Math.ceil(data.data.count/14)){
					$(".pronextpage").attr("disabled","disabled");
				}
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//显示项目经理列表
//function showPMList(){
//	var strHtml_manageBox = "";
//	$('.manageBox').html(strHtml_manageBox);
//	$.ajax({
//		type : "post",  
//	    url : urlfile + "main/allProjectManager",
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
//				if(data.data.length>0){
//					strHtml_manageBox += '<table class="tb">'
//									+'<tbody class="tb-body">'
//									+'<tr class="tb-head">'
//									+'<td width="20%">工号</td>'
//									+'<td width="20%">姓名</td>'
//									+'<td width="20%">角色名</td>'
//									+'<td width="20%">管理组别</td>'
//									+'<td width="20%">操作</td>'
//									+'</tr>';
//					for(var i=0;i<data.data.length;i++){
//						strHtml_manageBox += '<tr>'
//					                    +'<td>'+data.data[i].usercode+'</td>'
//					                    +'<td>'+data.data[i].name+'</td>'
//					                    +'<td>'+data.data[i].roleName+'</td>'
//					                    +'<td>'+data.data[i].groupName.replace(/[|]/g,'<br>')+'</td>'
//					                    +'<td>'
//					                    +'<span class="p-edit showbtn resetPwd-btn" data-usercode="'+data.data[i].usercode+'" data-username="'+data.data[i].name+'" data-oldPwd="'+data.data[i].pwd+'">重置密码</span>'
//					                    +'<span class="p-edit showbtn modifyPM-btn" data-usercode="'+data.data[i].usercode+'" data-username="'+data.data[i].name+'" data-pwd="'+data.data[i].pwd+'" data-groupIds="'+data.data[i].groupIds+'" data-groupName="'+data.data[i].groupName+'" >修改</span>'
//					                    +'<span class="p-edit delPM-btn" data-usercode="'+data.data[i].usercode+'">删除</span>'
//					                    +'</td>'
//					                    +'</tr>';
//					}
//					strHtml_manageBox += '</tbody></table>';
//				}
//				else{
//					strHtml_manageBox += '暂无项目经理信息……'
//				}
//				$('.manageBox').html(strHtml_manageBox);
//			} else {
//				alert(data.errMsg);
//			}
//		}		
//	});
//}
////删除项目经理
//function delPM(usercode){
//	$.ajax({
//		data:"USERCODE="+usercode,
//		type : "post",  
//	    url : urlfile + "admin/delManager",
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
//				alert("删除成功！");
//				showPMList();
//			} else {
//				alert(data.errMsg);
//			}
//		}		
//	});
//}


//显示普通员工列表
function showStaffList(pagenum,usermame){
	var strHtml_manageBox = "";
	$('.manageBox').html(strHtml_manageBox);
	strHtml_manageBox += '<div class="align-left align-middle margin-tb">'
		+'<span class="align-center align-middle inline-block85">员工名称:</span>'
		+ '<input type="text" class="dialog-input width150 searchUserName" value="'+usermame+'"/>'
		+ '<input type="button" class="searchBtn searchUser-btn margin-lr" value="查询"></input>'
		+'</div>';
	$.ajax({
		data : "PAGENUM="+pagenum+"&PAGESIZE=14"+"&USERNAME="+usermame,
		type : "post",  
	    url : urlfile + "admin/pageUserList",
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
				if(data.data.list.length>0){
					strHtml_manageBox += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="10%">工号</td>'
									+'<td width="10%">姓名</td>'
									+'<td width="10%">状态</td>'
									+'<td width="15%">联系方式</td>'
									+'<td width="15%">邮箱</td>'
									+'<td width="20%">角色</td>'
									+'<td width="20%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.list.length;i++){
						strHtml_manageBox += '<tr>'
										+'<td>'+data.data.list[i].code+'</td>'
					                    +'<td>'+data.data.list[i].name+'</td>';
						if('1'==data.data.list[i].status){
							strHtml_manageBox +='<td>启用</td>';
						}else{
							strHtml_manageBox +='<td>禁用</td>';
						}
						strHtml_manageBox +='<td>'+(data.data.list[i].mobile==null?'':data.data.list[i].mobile)+'</td>'
					                    +'<td>'+(data.data.list[i].email==null?'':data.data.list[i].email)+'</td>'
					                    +'<td>'+(data.data.list[i].roleNames==null?'':data.data.list[i].roleNames)+'</td>'
					                    +'<td>'
					                    +'<span class="p-edit resetPwd-btn" data-page="'+pagenum+'" data-usercode="'+data.data.list[i].code+'" data-username="'+data.data.list[i].name+'" data-oldPwd="'+data.data.list[i].pwd+'">重置密码</span>'
					                    +'<span class="p-edit showbtn modifyStaff-btn" data-page="'+pagenum+'" data-usercode="'+data.data.list[i].code+'"data-username="'+data.data.list[i].name+'"'
					                    +'data-status="'+data.data.list[i].status+'" data-email="'+data.data.list[i].email+'" data-mobile="'+data.data.list[i].mobile+'" data-roles="'+data.data.list[i].roles+'" data-roleNames="'+data.data.list[i].roleNames+'"'
					                    +'>修改</span>';
						if('1'==data.data.list[i].status){
							strHtml_manageBox +='<span class="p-edit delStaff-btn" data-page="'+pagenum+'" data-usercode="'+data.data.list[i].code+'">禁用</span>';
						}
						strHtml_manageBox +='</td>'
					                    +'</tr>';
					}
					strHtml_manageBox += '<tr class="tb-head">'
							+'<td colspan="11">'
							+'<span>共有 </span>'+data.data.count+'<span> 条记录，&nbsp;&nbsp;</span>'
							+'<span>当前第 </span>'+pagenum+'/'+Math.ceil(data.data.count/14)+'<span> 页&nbsp;</span>'
							+'<span class="float-right align-middle">'
							+'<input type="button" class="firstpage" value="首页"/>&nbsp;&nbsp;'
							+'<input type="button" class="backpage" data-pagenum="'+pagenum+'" value="上一页"/>&nbsp;&nbsp;'
							+'<input type="button" class="nextpage" data-pagenum="'+pagenum+'" data-pagemax="'+Math.ceil(data.data.count/14)+'" value="下一页"/>&nbsp;&nbsp;'
							+'<input type="button" class="lastpage" data-pagenum="'+Math.ceil(data.data.count/14)+'" value="末页"/>&nbsp;&nbsp;'
							+'<span> 转至第</span>'
							+'<input type="text" class="jumppagetext" style="width:30px;" value="'+pagenum+'"/>'
							+'<span>页</span>&nbsp;&nbsp;'
							+'<input type="button" class="jumppage" data-pagemax="'+Math.ceil(data.data.count/14)+'" value="跳转"/>'
							+'</span>'
							+'</td>'
							+'</tr>';
					strHtml_manageBox += '</tbody></table>';
				}
				else{
					strHtml_manageBox += '暂无普通员工信息……';
				}
//				if(pagenum == 1){
//					strHtml_manageBox += '<span class="p-edit margin-tb float-right next" onclick="showStaffList('+(parseInt(pagenum)+1)+',\'\')">下一页</span>';
//				}
//				else{
//					strHtml_manageBox += '<span class="p-edit margin-tb float-left back" onclick="showStaffList('+(parseInt(pagenum)-1)+',\'\')">上一页</span>'
//					+'<span class="p-edit margin-tb float-right next" onclick="showStaffList('+(parseInt(pagenum)+1)+',\'\')">下一页</span>';
//				}
				$('.manageBox').html(strHtml_manageBox);
				$('.searchUserName').css("color","#000");
				$(".limit20").each(function(){
					var thistext = $(this);
					limitShow(20,thistext);
				});
				$(".limit10").each(function(){
					var thistext = $(this);
					limitShow(10,thistext);
				});
				if(pagenum == 1){
					$(".backpage").attr("disabled","disabled");
				}
				if(pagenum == Math.ceil(data.data.count/14)){
					$(".nextpage").attr("disabled","disabled");
				}
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//删除员工
function delStaff(usercode,pagenum){
	$.ajax({
		data:"USERCODE="+usercode,
		type : "post",  
	    url : urlfile + "admin/delUser",
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
				alert("禁用成功！");
				showStaffList(pagenum,'');
			} else {
				alert(data.errMsg);
			}
		}		
	});
}

//删除菜单
function delMeau(meauUNID){
	$.ajax({
		data:"ID="+meauUNID,
		type : "post",  
	    url : urlfile + "admin/deleteMenu",
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
				alert("删除成功！");
				showFunctionList();
			} else {
				alert(data.errMsg);
			}
		}		
	});
}

function delProject(pId,pagenum){
	$.ajax({
		data:"PROJECT_ID="+pId,
		type : "post",  
	    url : urlfile + "project/deleteProject",
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
				alert("删除成功！");
				showProjectList(pagenum,'','');
			} else {
				alert(data.errMsg);
			}
		}		
	});
}

//显示查询模块
function showSearchItem(){
	var strHtml_manageBox = "";
	strHtml_manageBox += '<div class="align-center align-middle margin-tb">'
		+ '<span class="align-center align-middle inline-block85">标题:</span>'
		+ '<input type="text" class="dialog-input width150 searchBugTitle"/>'
		+ '<span class="align-center align-middle inline-block85">项目名称:</span>'
		+ '<input type="text" class="dialog-input width150 searchBugProName"/>'
		+ '<span class="align-center align-middle inline-block85">指派人:</span>'
		+ '<input type="text" class="dialog-input width150 searchBugAssigned"/>'
		+ '<span class="align-center align-middle inline-block85">状态</span>'
        + '<div class="select-box searchBugStatus">'
            +'<input class="select-item" data-id="99" type="text" value="All" readonly="readonly"/>'
            +'<ul class="select-ul">'
            	+'<li data-id="99">All</li>'
                +'<li data-id="0">Unsolved</li>'
				+'<li data-id="1">Solving</li>'
				+'<li data-id="2">ByDesign</li>'
				+'<li data-id="3">Duplicate</li>'
				+'<li data-id="4">NotRepro</li>'
				+'<li data-id="5">Fixed</li>'
				+'<li data-id="6">External</li>'
				+'<li data-id="7">Postponed</li>'
				+'<li data-id="8">WonotFix</li>'
				+'<li data-id="9">Solved</li>'
				+'<li data-id="10">Processed</li>'
           +'</ul>'
        +'</div>' 
		+ '<input type="button" class="searchBtn searchBug-btn margin-lr" value="查询"></input>'
		+ '</div>'
		+'<div class="bugList margin-tb">'
		+'</div>';
	$('.manageBox').html(strHtml_manageBox);
	$(".searchBugTitle").css("color","#000");
	$(".searchBugProName").css("color","#000");
	$(".searchBugAssigned").css("color","#000");
}
//显示权限管理列表
function showFunctionList(){
	var strHtml_menuList = "";
//	$('.bugList').html(strHtml_menuList);
	$('.manageBox').html(strHtml_menuList);
	$.ajax({
//		data : "ROLE_ID="+roleId+"&USERCODE="+usercode+"&PROJECT_NAME="+projectName+"&ASSIGNED_NAME="+assignedName+"&TITLE="+title+"&STATUS="+status+"&PAGENUM="+pagenum+"&PAGESIZE="+14,
		type : "post",  
	    url : urlfile + "admin/menuList",
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
				if(data.data.length>0){
					strHtml_menuList += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="10%">ID</td>'
									+'<td width="10%">功能名称</td>'
									+'<td width="20%">资源地址</td>'
									+'<td width="10%">状态</td>'
									+'<td width="12%">创建日期</td>'
									+'<td width="18%">更新日期</td>'
									+'<td width="20%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.length;i++){
//						strHtml_menuList+='';
						strHtml_menuList += '<tr>'
		                        +'<td>'+data.data[i].crfntUnid+'</td>'
		                        +'<td>'+data.data[i].crfntFunName+'</td>'
		                        +'<td>'+data.data[i].crfntResource+'</td>';
						if('1'==data.data[i].crfntStatus){
							strHtml_menuList+='<td>启用</td>';
						}else{
							strHtml_menuList+='<td>禁用</td>';
						}
						strHtml_menuList +='<td>'+data.data[i].crfntCdate+'</td>'
		                        +'<td>'+data.data[i].crfntUdate+'</td>'
		                        +'<td>'
	                        		+'<span class="p-edit showbtn modifyMeau-btn" data-id="'+data.data[i].crfntUnid+'" data-name="'+data.data[i].crfntFunName+'" data-url="'+data.data[i].crfntResource+'" data-status="'+data.data[i].crfntStatus+'" >修改</span>'
	                        		+'<span class="p-edit delMeau-btn" data-id="'+data.data[i].crfntUnid+'" >删除</span>'
	                        	+'</td></tr>';
					}
					strHtml_menuList += '</tbody>';
					strHtml_menuList += '</table>';
				}
				else{
					strHtml_menuList += '暂无信息……';
				}
				$('.manageBox').html(strHtml_menuList);
				$(".limit20").each(function(){
					var thistext = $(this);
					limitShow(20,thistext);
				});
				$(".limit10").each(function(){
					var thistext = $(this);
					limitShow(10,thistext);
				});
			} else {
				alert(data.errMsg);
			}
		}		
	});
}