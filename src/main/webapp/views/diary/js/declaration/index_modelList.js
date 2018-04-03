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
    
    getProjectInfoById(getQueryString("id"));
    getModelVOListByPId(getQueryString("id"),getQueryString("name"));
    
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
});	
function getQueryString(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
	var r = window.location.search.substr(1).match(reg); 
	if (r != null) return decodeURI(r[2]); return null; 
}
//显示项目列表
function getProjectInfoById(proID){
	$.ajax({
		data:"&PROJECT_ID="+proID,
		type : "post",  
	    url : urlfile + "project/getProject",
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
				var strHtml_manageBox = "";
				strHtml_manageBox += '<div><span class="p-blue font-big">'+data.data.name+'( '+data.data.startTime+' 至 '+data.data.endTime+' )</span>&nbsp;&nbsp;&nbsp;&nbsp;';
				if(data.data.status == 0){
					strHtml_manageBox += '<span class="p-purple">未完成</span>';
				}else if(data.data.status == 1){
					strHtml_manageBox += '<span class="p-red">已完成</span>';
				}else if(data.data.status == 2){
					strHtml_manageBox += '<span class="p-grey">作废</span>';
				}
				strHtml_manageBox += '</div>';
				strHtml_manageBox += '<div>备注：'+data.data.remarks+'</div>';
				if(data.data.explanation == undefined){
					strHtml_manageBox += '<div>说明：</div>';
				}else{
					strHtml_manageBox += '<div>说明：'+data.data.explanation+'</div>';
				}
				strHtml_manageBox += '<div class="functionBox"></div>';
				$('.manageBox').html(strHtml_manageBox);
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
			
//根据项目id获取模块相关信息 
function getModelVOListByPId(proID,proName) { 
	$.ajax({
		data:"PROJECT_ID="+proID,
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
				var strhtml_functionBox = '';
				for(var i = 0; i <data.data.modelVOList.length; i++ ){
					strhtml_functionBox += '<table class="tb margin-tb">'
				                        +'<thead class="tb-head align-left">'
										+'<tr>'
										+'<th colspan="6" class="align-left">'
										+'<span title="'+data.data.modelVOList[i].remarks+'">'+data.data.modelVOList[i].name+'&nbsp;(&nbsp;'+data.data.modelVOList[i].startTime+'&nbsp;至 &nbsp;'+data.data.modelVOList[i].endTime+'&nbsp;)</span>'
										+'</th>'
										+'</tr>'
										+'</thead>'
										+'<tbody class="tb-body">'
										+'<tr>'
				                        +'<td width="4%">序号</td>' 
				                        +'<td width="8%">姓名</td>'
				                        +'<td width="62%">内容</td>'
				                        +'<td width="10%">开始时间</td>'
				                        +'<td width="10%">结束时间</td>'
				                        +'<td width="6%">状态</td>'
			                        	+'</tr>';
					for(var j = 0 ; j<data.data.modelVOList[i].list.length ; j++){
						strhtml_functionBox += '<tr class="tr-showRemarks" data-remarks="'+data.data.modelVOList[i].list[j].remarks+'">'
					                        +'<td>'+(j+1)+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].userName+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].content.replace(/[\r\n]/g,"<br>")+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].startTime+'</td>'
					                        +'<td>'+data.data.modelVOList[i].list[j].endTime+'</td>';
						if(data.data.modelVOList[i].list[j].status == 0){
                        	strhtml_functionBox += '<td><span class="p-purple">未完成</span></td>';
						}                    
						else if(data.data.modelVOList[i].list[j].status == 1){
                        	strhtml_functionBox += '<td><span class="p-red">已完成</span></td>';
						}else if(data.data.modelVOList[i].list[j].status == 2){
							strhtml_functionBox += '<td><span class="p-grey">已作废</span></td>';
						} else{
							strhtml_functionBox += '<td></td>';
						}
					   strhtml_functionBox += '</tr>';
					}
					strhtml_functionBox += '</tbody></table>';
				}
				$('.functionBox').html(strhtml_functionBox);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}