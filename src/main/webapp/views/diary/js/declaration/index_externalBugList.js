// JavaScript Document

var myDate = new Date();
//获取当年的年、月份份,并显示在列表中
//var date_array = getDayofWeek(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate()).split('|');
var date_array = [myDate.Format('yyyy'),myDate.Format('MM'),myDate.Format('dd')];
$(function(){
	
	//显示左侧菜单列表
    showMenuList();
    //公用弹框
    addNewDialogBox();
    showSearchItem();
    var obj = {};
	obj.startTime = $(".startTime").val();
	obj.endTime = $(".endTime").val();
	obj.softwareName = $(".softwareName").val();
	obj.errorName = $(".errorName").val();
	obj.softwareId = $(".softwareId").val();
    showexternalBugList(obj,1);
    
    
  //查看详情
	$("body").delegate(".externalBugDetail-btn","click",function(){
		//window.open("index_modelList.html?id="+$(this).attr("data-id")+"&name="+$(this).attr("data-name")); 
		window.open(encodeURI("index_externalBugDetail.html?id="+$(this).attr("data-id")));    
	});
	
	//清空日期
	$("body").delegate(".clearDate-btn","click",function(){
		$(".manageBox").find(".text-datepicker").val("");
	});
	
	//查询
	$("body").delegate(".searchExternalBug-btn","click",function(){
		var obj = {};
		obj.startTime = $(".startTime").val();
		obj.endTime = $(".endTime").val();
		obj.softwareName = $(".softwareName").val();
		obj.errorName = $(".errorName").val();
		obj.softwareId = $(".softwareId").val();
		showexternalBugList(obj,1);
	});
	//鼠标拂过表格显示备注内容 
	$('.manageBox').delegate(".tr-showRemarks","mouseover", function() {
		var remarks = $(this).attr("data-remarks");
		showremark(remarks,$(this));
	}); 
	$('.manageBox').delegate(".tr-showRemarks","mouseout", function() {
		removeremark($(this));
	}); 
	
	//点击按钮触发遮罩弹框事件
	$("body").delegate(".showbtn","click",function(){
		closeDialogBox();
        $(".dialog-bg").css({
            display: "block", height: $(window).height()
        });
        var $box = $('.dialog-box');
		$box.css('display','block');
		var boxTop = 0;
		
		boxTop=publishDialogModel($(this),boxTop);
		
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });												
		
    });
	
  //点击关闭按钮的时候，遮罩层关闭
    $(".close").click(function () {
    	closeDialogBox();
    });
	
	//上一页
	$('.manageBox').delegate(".backpage","click", function() {
		var obj = {};
		obj.startTime = $(".startTime").val();
		obj.endTime = $(".endTime").val();
		obj.softwareName = $(".softwareName").val();
		obj.errorName = $(".errorName").val();
		obj.softwareId = $(".softwareId").val();
		pagenum = parseInt($(this).attr("data-pagenum"))-1;
		showexternalBugList(obj,pagenum);
	}); 
	//下一页
	$('.manageBox').delegate(".nextpage","click", function() {
		var obj = {};
		obj.startTime = $(".startTime").val();
		obj.endTime = $(".endTime").val();
		obj.softwareName = $(".softwareName").val();
		obj.errorName = $(".errorName").val();
		obj.softwareId = $(".softwareId").val();
		var pagenum = parseInt($(this).attr("data-pagenum"))+1;
		showexternalBugList(obj,pagenum);
	}); 
	//首页
	$('.manageBox').delegate(".firstpage","click", function() {
		var obj = {};
		obj.startTime = $(".startTime").val();
		obj.endTime = $(".endTime").val();
		obj.softwareName = $(".softwareName").val();
		obj.errorName = $(".errorName").val();
		obj.softwareId = $(".softwareId").val();
		showexternalBugList(obj,1);
	}); 
	//末页
	$('.manageBox').delegate(".lastpage","click", function() {
		var obj = {};
		obj.startTime = $(".startTime").val();
		obj.endTime = $(".endTime").val();
		obj.softwareName = $(".softwareName").val();
		obj.errorName = $(".errorName").val();
		obj.softwareId = $(".softwareId").val();
		showexternalBugList(obj,$(this).attr("data-pagenum"));
	}); 
	//跳转至
	$('.manageBox').delegate(".jumppage","click", function() {
		var obj = {};
		obj.startTime = $(".startTime").val();
		obj.endTime = $(".endTime").val();
		obj.softwareName = $(".softwareName").val();
		obj.errorName = $(".errorName").val();
		obj.softwareId = $(".softwareId").val();
		var pagenum = parseInt($('.jumppagetext').val());
		if(pagenum>0 && pagenum <=parseInt($(this).attr("data-pagemax"))){
			showexternalBugList(obj,pagenum);
		}else{
			alert("查无此页！");
		}
	}); 
	
});	
//显示查询模块
function showSearchItem(){
	var strHtml_manageBox = "";
	strHtml_manageBox += '<div class="align-left align-middle margin-tb">'
		+ '<div class="margin-tb">'
		+ '<span class="align-center align-middle inline-block85">日期:</span>'
		+ '<input type="text" readonly="readonly" class="dialog-select text-datepicker startTime"/>'
		+ '<span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>'
		+ '<input type="text" readonly="readonly" class="dialog-select text-datepicker endTime"/>' 
		+ '<input type="button" class="searchBtn clearDate-btn margin-lr" value="清空日期"></input>'
		+ '</div>'
		+ '<div class="margin-tb">'
		+ '<span class="align-center align-middle inline-block85">软件名称:</span>'
		+ '<input type="text" class="dialog-input width200 softwareName"/>'
		+ '<span class="align-center align-middle inline-block85">错误名称:</span>'
		+ '<input type="text" class="dialog-input width200 errorName"/>'
		+ '<span class="align-center align-middle inline-block85">软件ID:</span>'
		+ '<input type="text" class="dialog-input width200 softwareId "/>'
		+ '<input type="button" class="searchBtn searchExternalBug-btn margin-lr" value="查询"></input>'
		+ '</div>'
		+ '</div>'
		+'<div class="externalBugList margin-tb">'
		+'</div>';
	$(".manageBox").html(strHtml_manageBox);
	$(".manageBox").find(".text-datepicker").datepicker();
	$(".manageBox").find(".startTime").datepicker("option",{
		onSelect: function(dateText,inst){
			$(".manageBox").find(".endTime").datepicker("option",{ 
				minDate: dateText, 
			});
			$(".manageBox").find(".startTime").css("color","#000");
			if($(".manageBox").find(".endTime").val() ==""){
				$(".manageBox").find('.endTime').val('');
			}
		}
	});
	$(".manageBox").find(".endTime").datepicker("option",{
		onSelect: function(dateText,inst){
			$(".manageBox").find(".startTime").datepicker("option",{ 
				maxDate: dateText, 
			});
			$(".manageBox").find(".endTime").css("color","#000");
			if($(".manageBox").find(".startTime").val() ==""){
				$(".manageBox").find('.startTime').val('');
			}
		}
	});
	$("#ui-datepicker-div").css("display","none");
	$(".manageBox").find(".dialog-input").css("color","#000");
	$(".manageBox").find(".text-datepicker").css("color","#000");
}

//显示项目列表
function showexternalBugList(obj,pagenum){
	var strHtml_externalBugList = "";
	$('.externalBugList').html(strHtml_externalBugList);
	$.ajax({
		data :"STARTTIME="+obj.startTime+"&ENDTIME="+obj.endTime+"&SOFTWAREID="+obj.softwareId+"&SOFTWARENAME="+encodeURIComponent(obj.softwareName)+"&ERRORNAME="+encodeURIComponent(obj.errorName)+"&PAGENUM="+pagenum+"&PAGESIZE=10",
		type : "post",  
	    url : urlfile + "errorLog/getErrorlogsByParams",
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
			//console.log(data);
			if(data.code == 1) {
				if(data.data.list.length>0){
					strHtml_externalBugList += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="5%">序号</td>'
									+'<td width="7%">时间</td>'
									+'<td width="10%">软件名称</td>'
									+'<td width="10%">软件ID</td>'
									+'<td width="8%">软件版本</td> '
									+'<td width="8%">升级版本号</td>'
									+'<td width="10%">设备信息</td>'
									+'<td width="17%">错误名称</td>'
									+'<td width="20%">错误原因</td>'
									+'<td width="5%">错误详情</td>'
									+'</tr>';
					for(var i=0;i<data.data.list.length;i++){
						strHtml_externalBugList += '<tr>'
					                    +'<td>'+((pagenum-1)*10+i+1)+'</td>'
					                    +'<td>'+data.data.list[i].addtime+'</td>'
					                    +'<td>'+data.data.list[i].softwarename+'</td>'
					                    +'<td>'+data.data.list[i].softwareid+'</td>'
					                    +'<td>'+data.data.list[i].softwareversion+'</td>'
					                    +'<td>'+data.data.list[i].upgradeversionnum+'</td>'
										+'<td>'+data.data.list[i].deviceinfo+'</td>'
										+'<td>'+data.data.list[i].errorname+'</td>'
										+'<td>'+data.data.list[i].errorcause+'</td>'
					                    +'<td>'
					                    +'<span class="p-edit externalBugDetail-btn" data-id="'+data.data.list[i].id+'">详情</span>'
					                    +'</td>'
					                    +'</tr>';
					}
					strHtml_externalBugList += '<tr class="tb-head">'
						+'<td colspan="10">'
						+'<span>共有 </span>'+data.data.count+'<span> 条记录，&nbsp;&nbsp;</span>'
						+'<span>当前第 </span>'+pagenum+'/'+Math.ceil(data.data.count/10)+'<span> 页&nbsp;</span>'
						+'<span class="float-right align-middle">'
						+'<input type="button" class="firstpage" value="首页"/>&nbsp;&nbsp;'
						+'<input type="button" class="backpage" data-pagenum="'+pagenum+'" value="上一页"/>&nbsp;&nbsp;'
						+'<input type="button" class="nextpage" data-pagenum="'+pagenum+'" data-pagemax="'+Math.ceil(data.data.count/10)+'" value="下一页"/>&nbsp;&nbsp;'
						+'<input type="button" class="lastpage" data-pagenum="'+Math.ceil(data.data.count/10)+'" value="末页"/>&nbsp;&nbsp;'
						+'<span> 转至第</span>'
						+'<input type="text" class="jumppagetext" style="width:30px;"/>'
						+'<span>页</span>&nbsp;&nbsp;'
						+'<input type="button" class="jumppage" data-pagemax="'+Math.ceil(data.data.count/10)+'" value="跳转"/>'
						+'</span>'
						+'</td>'
						+'</tr>';
					strHtml_externalBugList += '</tbody></table>';
				}
				else{
					strHtml_externalBugList += '暂无错误信息……';
				}
				$('.externalBugList').html(strHtml_externalBugList);
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