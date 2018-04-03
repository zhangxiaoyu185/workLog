// JavaScript Document
$(function(){
	
	$("#username").html("你好："+sessionStorage.getItem("name"));
    $("#usercode").html("工号："+sessionStorage.getItem("code"));
    $("#userjob").html("岗位："+sessionStorage.getItem("roleName"));
    
    showSearchItem();
	showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),'','','',99,1);
	
  //项目汇总点击事件
	$("body").delegate(".projectSummary-btn","click",function(){
		location.href = "../declaration/index_director.html";
	});
	//人员汇总点击事件
	$("body").delegate(".peopleSummary-btn","click",function(){
		location.href = "../declaration/index_director2.html";
	});
	//人员汇总点击事件
	$("body").delegate(".bug-btn","click",function(){
		location.href = "../declaration/index_director3.html";
	});
	//退出登录
	$("body").delegate(".exit-btn","click",function(){
		location.href = "../login/login.html";
		sessionStorage.clear();
	});
	//查询bug
	$("body").delegate(".searchBug-btn","click",function(){
		var proName = $(".searchBugProName").val();
		var assigned = $(".searchBugAssigned").val();
		var title = $(".searchBugTitle").val();
		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,1);
	});
	//上一页
	$('.manageBox').delegate(".backpage","click", function() {
	//$(document).delegate("input[class=backpage]","click", function() {
		var proName = $(".searchBugProName").val();
		var assigned = $(".searchBugAssigned").val();
		var title = $(".searchBugTitle").val();
		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		var pagenum = parseInt($(this).attr("data-pagenum"))-1;
		showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,pagenum);
	}); 
	//下一页
	$('.manageBox').delegate(".nextpage","click", function() {
	//$(document).delegate("input[class=nextpage]","click", function() {
		var proName = $(".searchBugProName").val();
		var assigned = $(".searchBugAssigned").val();
		var title = $(".searchBugTitle").val();
		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		var pagenum = parseInt($(this).attr("data-pagenum"))+1;
		showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,pagenum);
	}); 
	//首页
	$('.manageBox').delegate(".firstpage","click", function() {
	//$(document).delegate("input[class=firstpage]","click", function() {
		var proName = $(".searchBugProName").val();
		var assigned = $(".searchBugAssigned").val();
		var title = $(".searchBugTitle").val();
		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,1);
	}); 
	//末页
	$('.manageBox').delegate(".lastpage","click", function() {
	//$(document).delegate("input[class=lastpage]","click", function() {
		var proName = $(".searchBugProName").val();
		var assigned = $(".searchBugAssigned").val();
		var title = $(".searchBugTitle").val();
		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,$(this).attr("data-pagenum"));
	}); 
	//跳转至
	$('.manageBox').delegate(".jumppage","click", function() {
	//$(document).delegate("input[class=jumppage]","click", function() {
		var proName = $(".searchBugProName").val();
		var assigned = $(".searchBugAssigned").val();
		var title = $(".searchBugTitle").val();
		var status = $(".searchBugStatus").find(".select-item").attr("data-id");
		var pagenum = parseInt($('.jumppagetext').val());
		if(pagenum>0 && pagenum <=parseInt($(this).attr("data-pagemax"))){
			showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,pagenum);
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
//显示bug管理列表
function showBugList(roleId,usercode,projectName,assignedName,title,status,pagenum){
	var strHtml_bugList = "";
	$('.bugList').html(strHtml_bugList);
	//console.log("ROLE_ID="+roleId+"&USERCODE="+usercode+"&PROJECT_NAME="+projectName+"&ASSIGNED_NAME="+assignedName+"&TITLE="+title+"&STATUS="+status+"&PAGENUM="+pagenum+"&PAGESIZE="+14);
	$.ajax({
		data : "ROLE_ID="+roleId+"&USERCODE="+usercode+"&PROJECT_NAME="+projectName+"&ASSIGNED_NAME="+assignedName+"&TITLE="+title+"&STATUS="+status+"&PAGENUM="+pagenum+"&PAGESIZE="+14,
		type : "post",  
	    url : urlfile + "bug/getBugsByConditions",
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
				if(data.data.list.length>0){
					
					strHtml_bugList += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="4%">序号</td>'
									+'<td width="4%">级别</td>'
									+'<td width="6%">严重程度</td>'
									+'<td width="24%">标题</td>'
									+'<td width="6%">状态</td>'
									+'<td width="6%">bug类型</td>'
									+'<td width="15%">所属项目</td>'
									+'<td width="7%">创建者</td>'
									+'<td width="12%">创建时间</td>'
									+'<td width="6%">责任人</td>'
									+'<td width="10%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.list.length;i++){
						if(data.data.list[i].status == 9 || data.data.list[i].status == 10){
							strHtml_bugList += '<tr style="color:#ccc;">';
						}else{
							strHtml_bugList += '<tr style="color:#000;">';
						}
						var status_value = "";
						if(data.data.list[i].status == "0"){
							status_value = "Unsolved";
						}else if(data.data.list[i].status == "1"){
							status_value = "Solving";
						}else if(data.data.list[i].status == "2"){
							status_value = "ByDesign";
						}else if(data.data.list[i].status == "3"){
							status_value = "Duplicate";
						}else if(data.data.list[i].status == "4"){
							status_value = "NotRepro";
						}else if(data.data.list[i].status == "5"){
							status_value = "Fixed";
						}else if(data.data.list[i].status == "6"){
							status_value = "External";
						}else if(data.data.list[i].status == "7"){
							status_value = "Postponed";
						}else if(data.data.list[i].status == "8"){
							status_value = "WonotFix";
						}else if(data.data.list[i].status == "9"){
							status_value = "Solved";
						}else if(data.data.list[i].status == "10"){
							status_value = "Processed";
						}
						var bugType_value = "";
						if(data.data.list[i].bugType == 0){
							bugType_value = "代码错误";
						}else if(data.data.list[i].bugType == 1){
							bugType_value = "界面优化";
						}else if(data.data.list[i].bugType == 2){
							bugType_value = "设计缺陷";
						}else if(data.data.list[i].bugType == 3){
							bugType_value = "配置相关";
						}else if(data.data.list[i].bugType == 4){
							bugType_value = "安装部署";
						}else if(data.data.list[i].bugType == 5){
							bugType_value = "安全相关";
						}else if(data.data.list[i].bugType == 6){
							bugType_value = "性能问题";
						}else if(data.data.list[i].bugType == 7){
							bugType_value = "标准规范";
						}else if(data.data.list[i].bugType == 8){
							bugType_value = "测试脚本";
						}else if(data.data.list[i].bugType == 9){
							bugType_value = "其他";
						}
						strHtml_bugList += '<td>'+(14*(parseInt(pagenum)-1)+(i+1))+'</td>'
										+'<td>'+data.data.list[i].level+'</td>'
					                    +'<td>'+data.data.list[i].severity+'</td>'
					                    +'<td><span class="limit20" title="'+data.data.list[i].title+'">'+data.data.list[i].title+'</td>'
					                    +'<td>'+status_value+'</td>'
					                    +'<td>'+bugType_value+'</td>'
					                    +'<td><span class="limit10" title="'+data.data.list[i].projectName+'">'+data.data.list[i].projectName+'</span></td>'
					                    +'<td>'+data.data.list[i].name+'</td>'
					                    +'<td>'+new Date(data.data.list[i].addTime).Format("yyyy-MM-dd hh:mm:ss")+'</td>'
					                    +'<td>'+data.data.list[i].assignedName+'</td>'
					                    +'<td>';
						if(data.data.list[i].status == 9 || data.data.list[i].status == 10){
							strHtml_bugList += '';
						}else{
							strHtml_bugList += '<span class="p-edit showbtn modifyBug-btn" data-id="'+data.data.list[i].id+'">修改</span>';
						}
						strHtml_bugList += '<span class="p-edit showbtn detailBug-btn" data-id="'+data.data.list[i].id+'">详情</span>'
					                    +'</td>'
					                    +'</tr>';
					}
					strHtml_bugList += '<tr class="tb-head">'
										+'<td colspan="11">'
										+'<span>共有 </span>'+data.data.count+'<span> 条记录，&nbsp;&nbsp;</span>'
										+'<span>当前第 </span>'+pagenum+'/'+Math.ceil(data.data.count/14)+'<span> 页&nbsp;</span>'
										+'<span class="float-right align-middle">'
										+'<input type="button" class="firstpage" value="首页"/>&nbsp;&nbsp;'
										+'<input type="button" class="backpage" data-pagenum="'+pagenum+'" value="上一页"/>&nbsp;&nbsp;'
										+'<input type="button" class="nextpage" data-pagenum="'+pagenum+'" data-pagemax="'+Math.ceil(data.data.count/14)+'" value="下一页"/>&nbsp;&nbsp;'
										+'<input type="button" class="lastpage" data-pagenum="'+Math.ceil(data.data.count/14)+'" value="末页"/>&nbsp;&nbsp;'
										+'<span> 转至第</span>'
										+'<input type="text" class="jumppagetext" style="width:30px;"/>'
										+'<span>页</span>&nbsp;&nbsp;'
										+'<input type="button" class="jumppage" data-pagemax="'+Math.ceil(data.data.count/14)+'" value="跳转"/>'
										+'</span>'
										+'</td>'
										+'</tr>';
					strHtml_bugList += '</tbody>';
					strHtml_bugList += '</table>';
				}
				else{
					strHtml_bugList += '暂无信息……';
				}
				$('.bugList').html(strHtml_bugList);
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

	
