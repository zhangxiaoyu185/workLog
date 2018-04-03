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
    
    getErrorlogById(getQueryString("id"));
    

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
function getErrorlogById(proID){
	$.ajax({
		data:"EID="+proID,
		type : "post",  
	    url : urlfile + "errorLog/getErrorlogById",
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
				
				strHtml_manageBox += '<table  class="tb">'
					+'<tbody class="tb-body">'
					+'<tr>'
						+'<td width="10%">时间</td>'
						+'<td width="90%">'+new Date(data.data.addtime).Format("yyyy-MM-dd hh:mm:ss")+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>软件名称</td>'
						+'<td>'+data.data.softwarename+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>软件ID</td>'
						+'<td>'+data.data.softwareid+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>软件版本</td>'
						+'<td>'+data.data.softwareversion+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>升级版本号</td>'
						+'<td>'+data.data.upgradeversionnum+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>设备信息</td>'
						+'<td>'+data.data.deviceinfo+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>错误名称</td>'
						+'<td>'+data.data.errorname+'</td>'
					+'</tr>'
					+'<tr>'
						+'<td>错误原因</td>'
						+'<td>'+data.data.errorcause+'</td>'
					+'</tr>'
					+'<tr>'
					+'<td>错误详情</td>'
					+'<td>'+data.data.errordetails+'</td>'
				+'</tr>'
				+'</tbody>'
				+'</table>';
				$('.manageBox').html(strHtml_manageBox);
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
			
