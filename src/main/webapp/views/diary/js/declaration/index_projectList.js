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
    showProjectList('','',1);
    
    
  //查看模块
	$("body").delegate(".modelList-btn","click",function(){
		window.open(encodeURI("index_modelList.html?id="+$(this).attr("data-id")+"&name="+$(this).attr("data-name")));    
	});
	//查询项目
	$("body").delegate(".searchPro-btn","click",function(){
		var name = $(".searchProName").val();
		var manageName = $(".searchManager").val();
		showProjectList(name,manageName,1);
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
		var name = $(".searchProName").val();
		var manageName = $(".searchManager").val();
		var pagenum = parseInt($(this).attr("data-pagenum"))-1;
		showProjectList(name,manageName,pagenum);
	}); 
	//下一页
	$('.manageBox').delegate(".nextpage","click", function() {
		var name = $(".searchProName").val();
		var manageName = $(".searchManager").val();
		var pagenum = parseInt($(this).attr("data-pagenum"))+1;
		showProjectList(name,manageName,pagenum);
	}); 
	//首页
	$('.manageBox').delegate(".firstpage","click", function() {
		var name = $(".searchProName").val();
		var manageName = $(".searchManager").val();
		showProjectList(name,manageName,1);
	}); 
	//末页
	$('.manageBox').delegate(".lastpage","click", function() {
		var name = $(".searchProName").val();
		var manageName = $(".searchManager").val();
		showProjectList(name,manageName,$(this).attr("data-pagenum"));
	}); 
	//跳转至
	$('.manageBox').delegate(".jumppage","click", function() {
		var name = $(".searchProName").val();
		var manageName = $(".searchManager").val();
		var pagenum = parseInt($('.jumppagetext').val());
		if(pagenum>0 && pagenum <=parseInt($(this).attr("data-pagemax"))){
			showProjectList(name,manageName,pagenum);
		}else{
			alert("查无此页！");
		}
	}); 
	
});	
//显示查询模块
function showSearchItem(){
	var strHtml_manageBox = "";
	strHtml_manageBox += '<div class="align-center align-middle margin-tb">'
		+ '<span class="align-center align-middle inline-block85">项目名称:</span>'
		+ '<input type="text" class="dialog-input width200 searchProName"/>'
		+ '<span class="align-center align-middle inline-block85">负责人:</span>'
		+ '<input type="text" class="dialog-input width200 searchManager"/>'
		+ '<input type="button" class="searchBtn searchPro-btn margin-lr" value="查询"></input>'
		+ '</div>'
		+'<div class="projectList margin-tb">'
		+'</div>';
	$('.manageBox').html(strHtml_manageBox);
	$(".searchProName").css("color","#000");
	$(".searchManager").css("color","#000");
}

//显示项目列表
function showProjectList(name,manageName,pagenum){
	var strHtml_projectList = "";
	$('.projectList').html(strHtml_projectList);
	$.ajax({
		data :"NAME="+encodeURIComponent(name)+"&USERNAME="+encodeURIComponent(manageName)+"&PAGENUM="+pagenum+"&PAGESIZE=14",
		type : "post",  
	    url : urlfile + "main/findAllProjectList",
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
					strHtml_projectList += '<table class="tb">'
									+'<tbody class="tb-body">'
									+'<tr class="tb-head">'
									+'<td width="20%">项目名称</td>'
									+'<td width="10%">总工时</td>'
									+'<td width="12%">开始时间</td>'
									+'<td width="12%">结束时间</td> '
									+'<td width="5%">状态</td>'
									+'<td width="20%">说明</td>'
									+'<td width="5%">负责人</td>'
									+'<td width="6%">操作</td>'
									+'</tr>';
					for(var i=0;i<data.data.list.length;i++){
						strHtml_projectList += '<tr class="tr-showRemarks" data-remarks="'+data.data.list[i].remarks+'">'
					                    
					                    +'<td>'+data.data.list[i].name+'</td>'
					                    +'<td>'+data.data.list[i].allTime+'小时</td>'
					                    +'<td>'+data.data.list[i].startTime+'</td>'
					                    +'<td>'+data.data.list[i].endTime+'</td>'
					                    +'<td>';
						if(data.data.list[i].status == 0){
							strHtml_projectList += '<span class="p-purple">未完成</span>';
						}
						else if(data.data.list[i].status == 1){
							strHtml_projectList += '<span class="p-red">已完成</span>';
						}
						else if(data.data.list[i].status == 2){
							strHtml_projectList += '<span class="p-grey">作废</span>';
						} 
						strHtml_projectList += '</td>';
						if(data.data.list[i].explanation == undefined){
							strHtml_projectList += '<td></td>';
						}else{
							strHtml_projectList += '<td>'+data.data.list[i].explanation+'</td>';
						}
						strHtml_projectList += '<td>'+data.data.list[i].username+'</td>'
					                    +'<td>'
					                    +'<span class="p-edit modelList-btn" data-id="'+data.data.list[i].id +'" data-name="'+data.data.list[i].name +'">模块详情</span>'
					                    +'</td>'
					                    +'</tr>';
					}
					strHtml_projectList += '<tr class="tb-head">'
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
					strHtml_projectList += '</tbody></table>';
				}
				else{
					strHtml_projectList += '暂无项目信息……';
				}
				$('.projectList').html(strHtml_projectList);
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