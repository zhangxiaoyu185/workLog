// JavaScript Document

//var urlfile = "http://127.0.0.1:8080/workLog/";
var urlfile = "http://worklog.hzlingdian.com/workLog/";
/*if(window.location.pathname != '/workLog/views/diary/login/login.html'){
	var cur_urlfile=(window.location.pathname.replace("/workLog/views/diary/declaration/","")).replace(".html","");
	if(sessionStorage.getItem("code")== null){
		location.href = "/workLog/views/diary/login/login.html";
	}
	else{
//		if(cur_urlfile =='index'){
//			if(parseInt(sessionStorage.getItem("roleId")) < 3){
//				alert("很抱歉，没有权限访问！");
//				location.href = "/workLog/views/diary/login/login.html";
//			}
//		}else if(cur_urlfile =='index_pm' || cur_urlfile =='index_pm2'){
//			if(parseInt(sessionStorage.getItem("roleId")) != 2){
//				alert("很抱歉，没有权限访问！");
//				location.href = "/workLog/views/diary/login/login.html";
//			}
//		}else if(cur_urlfile =='index_director' || cur_urlfile =='index_director2'){
//			if(parseInt(sessionStorage.getItem("roleId")) != 1){
//				alert("很抱歉，没有权限访问！");
//				location.href = "/workLog/views/diary/login/login.html";
//			}
//		}else if(cur_urlfile =='index_admin'){
//			if(parseInt(sessionStorage.getItem("roleId")) != 0){
//				alert("很抱歉，没有权限访问！");
//				location.href = "/workLog/views/diary/login/login.html";
//			}
//		}
	
	}
}*/

if(window.location.pathname != '/workLog/views/diary/login/login.html'){
	var cur_urlfile=(window.location.pathname.replace("/workLog/views/diary/declaration/","")).replace(".html","");
	if(sessionStorage.getItem("code")== null){
		location.href = "../login/login.html";
	}
	else {
		if(cur_urlfile =='index_admin'){
			if(parseInt(sessionStorage.getItem("roles")) != 0){
				alert("很抱歉，没有权限访问！");
				location.href = "../login/login.html";
			}
		}
	}
}
function getDate(strDate) {
    var date = eval('new Date(' + strDate.replace(/\d+(?=-[^-]+$)/,
     function (a) { return parseInt(a, 10) - 1; }).match(/\d+/g) + ')');
    return date;
}

//计算两个日期之间的差
function DateDiff(sDate1, sDate2) {  //sDate1和sDate2是yyyy-MM-dd格式
	var aDate, oDate1, oDate2, iDays;
	aDate = sDate1.split("-");
	oDate1 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);  //转换为yyyy/MM/dd格式
	aDate = sDate2.split("-");
	oDate2 = new Date(aDate[1] + '/' + aDate[2] + '/' + aDate[0]);
	if(oDate2<oDate1)
		iDays = 0;
	else
		iDays = parseInt(Math.abs(oDate1 - oDate2) / 1000 / 60 / 60 / 24)+1; //把相差的毫秒数转换为天数
 
	return iDays;  //返回相差天数
}
/*限制输入字数
 * @maxwidth :最大字数;
 * @thistext :所选的输入框；
*/
function limitInput(maxwidth,thistext){
	if(thistext.val().length>maxwidth){
		thistext.val(thistext.val().substring(0,maxwidth));
		alert("字数不能超过"+maxwidth+"个！");
	}
}
/*限制显示字数
 * @maxwidth :最大字数;
 * @thistext :所显示的标签区域；
*/
function limitShow(maxwidth,thistext){
	if(thistext.text().length>maxwidth){
		thistext.text(thistext.text().substring(0,maxwidth));
		thistext.html(thistext.html()+'…');
	}else if(thistext.val().length>maxwidth){
		thistext.val(thistext.val().substring(0,maxwidth)+'…');
	}
}
/*显示备注
 * @remarks :备注内容;
 * @thistr :所选的tr；
*/
function showremark(remarks,thistr){
	if(remarks != "" && remarks !=undefined){
		$('.showremark').html(remarks.replace(/[\r\n]/g,"<br>"));
		$('.showremark').css("width", "auto");
		if($(".showremark").width() >= thistr.width()){
			$(".showremark").width(thistr.width());
		}
		else{
			$('.showremark').css("width", "auto");
		}
		var top = document.body.clientHeight-(thistr.offset().top+thistr.height()+$(".showremark").height());
		var top_arrow;
		if(top<0){
			top = thistr.offset().top-$(".showremark").height();
			top_arrow = thistr.offset().top;
			$('.showarrow').css("display","block"); 
			$('.showarrow').css("border-left", "5px solid transparent"); 
			$('.showarrow').css("border-right", "5px solid transparent"); 
			$('.showarrow').css("border-top", "20px solid #FF9"); 
			$('.showarrow').css("border-bottom", "none"); 
			$('.showarrow').css("left", thistr.offset().left+20+"px"); 
			$('.showarrow').css("top", top_arrow+"px");
		}
		else{
			top = thistr.offset().top+thistr.height();
			top_arrow = top-20;
			$('.showarrow').css("display","block"); 
			$('.showarrow').css("border-left", "5px solid transparent"); 
			$('.showarrow').css("border-right", "5px solid transparent"); 
			$('.showarrow').css("border-bottom", "20px solid #FF9"); 
			$('.showarrow').css("border-top", "none"); 
			$('.showarrow').css("left", thistr.offset().left+2.5+"px"); 
			$('.showarrow').css("top", top_arrow+"px");
			
		}
		thistr.css('cursor','pointer');
		$('.showremark').css("display","block"); 
		$('.showremark').css("left", thistr.offset().left); 
		$('.showremark').css("top", top); 
	}else{
		$('.showremark').html("");
	}
}

/*显示备注
 * @thistr :所选的tr；
*/
function removeremark(thistr){
	thistr.css('cursor','auto');
	$('.showremark').css("display","none"); 
	$('.showarrow').css("display","none"); 
}

Date.prototype.Format = function(fmt){ //日期规范化处理   
	var o = {   
		"M+" : this.getMonth()+1,                 //月份   
		"d+" : this.getDate(),                    //日   
		"h+" : this.getHours(),                   //小时   
		"m+" : this.getMinutes(),                 //分   
		"s+" : this.getSeconds(),                 //秒   
		"q+" : Math.floor((this.getMonth()+3)/3), //季度   
		"S"  : this.getMilliseconds()             //毫秒   
	};   
	if(/(y+)/.test(fmt))   
		fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));   
	for(var k in o)   
		if(new RegExp("("+ k +")").test(fmt))   
	  		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));   
	return fmt;   
}; 

$.fn.float=function(){
	$(this).keyup(function(){      
		 if('' != $(this).val().replace(/\d{1,}\.{0,1}\d{0,}/,''))
		    {
			 	$(this).val($(this).val().match(/\d{1,}\.{0,1}\d{0,}/) == null ? '' :$(this).val().match(/\d{1,}\.{0,1}\d{0,}/));
		    };      
    });
};
$.fn.numeral=function(bl){//只允许数字及小数点输入、兼容浏览器、屏蔽粘贴拖拽等
      $(this).keypress(function(e){
          var keyCode=e.keyCode?e.keyCode:e.which;
        if(bl){//浮点数
          if((this.value.length==0 || this.value.indexOf(".")!=-1) && keyCode==46) return false;
          return keyCode>=48&&keyCode<=57||keyCode==46||keyCode==8;
        }else{//整数
          return  keyCode>=48&&keyCode<=57||keyCode==8;
        }
      });
      $(this).bind("copy cut paste", function (e) { // 通过空格连续添加复制、剪切、粘贴事件
          if (window.clipboardData)//clipboardData.setData('text', clipboardData.getData('text').replace(/\D/g, ''));
              return !clipboardData.getData('text').match(/\D/);
          else
              event.preventDefault();
       });
      $(this).bind("dragenter",function(){return false;});
      $(this).css("ime-mode","disabled");
      $(this).bind("focus", function() {  
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {  
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {  
            this.value = "";  
        }  
    });  
};
function numberformat(domInput) {
    $(domInput).css("ime-mode", "disabled");
    $(domInput).bind("keypress", function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE   
        if (!$.browser.msie && (e.keyCode == 0x8))  //火狐下 不能使用退格键  
        {
            return;
        }
        return code >= 48 && code <= 57 || code == 46;
    });
    $(domInput).bind("blur", function () {
        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {
            this.value = this.value.substr(0, this.value.length - 1);
        } else if (isNaN(this.value)) {
            this.value = " ";
        }
    });
    $(domInput).bind("paste", function () {
        var s = clipboardData.getData('text');
        if (!/\D/.test(s));
        value = s.replace(/^0*/, '');
        return false;
    });
    $(domInput).bind("dragenter", function () {
        return false;
    });
    $(domInput).bind("keyup", function () {
        this.value = this.value.replace(/[^\d.]/g, "");
        //必须保证第一个为数字而不是.
        this.value = this.value.replace(/^\./g, "");
        //保证只有出现一个.而没有多个.
        this.value = this.value.replace(/\.{2,}/g, ".");
        //保证.只出现一次，而不能出现两次以上
        this.value = this.value.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    });
}
//获取当前年|月|日
function getDayofWeek(year, month, day) {
	var dayofweek = '';
	var d = new Date();
	d.setFullYear(year, month-1, 1);
	var w1 = d.getDay();
	if (w1 == 0) w1 = 7;
	d.setFullYear(year, month, 0);
	var dd = d.getDate();

	// first Monday
	if (w1 != 1) d1 = 7 - w1 + 2;
	else d1 = 1;
	week_count = Math.ceil((dd-d1+1)/7);
    var pre_monday = d1-1;
     //alert(pre_monday);
    if(day>pre_monday ){
	    for (var i = 0; i <week_count ; i++) {
			var monday = d1+i*7;
			var sunday = monday + 6;
			if(day>=monday && day<=sunday ) {
				//alert(year+"-"+month+"-"+day+":"+year+"年"+month+"月第"+(i+1)+"周");
				dayofweek = year+'|'+month+'|'+(i+1);
			}
	    }
    }
    else{ 
        if(month>1){
	        d.setFullYear(year, month-2, 1);
	        var w2 = d.getDay();
			if (w2 == 0) w2 = 7;
			d.setFullYear(year, month-1, 0);
			var dd2 = d.getDate();
	        // first Monday
	        if (w2 != 1) d = 7 - w2 + 2;
	        else d = 1;
	        week_count2 = Math.ceil((dd2-d+1)/7);
            //alert(year+"-"+month+"-"+day+":"+year+"年"+(month-1)+"月第"+week_count2+"周");
	        dayofweek = year+'|'+(month-1)+'|'+week_count2;
        }
        else{
	        var d = new Date();
	        // what day is first day
	       	d.setFullYear(year-1, 11, 1);
	       	var w2 = d.getDay();
	       	if (w2 == 0) w2 = 7;
	        // first Monday
	        if (w2 != 1) d = 7 - w2 + 2;
	        else d = 1;
	        week_count2 = Math.ceil((dd-d+1)/7);
           // alert(year+"-"+month+"-"+day+":"+(year-1)+"年12月第"+week_count2+"周");
            dayofweek = (year-1)+'|'+12+'|'+week_count2;
        }
    }
    return dayofweek;
}

//修改密码
function setModifyPwd(code,oldpwd,newpwd,repwd){
	$.ajax({
		data : "CODE="+code+"&OLDPWD="+oldpwd+"&NEWPWD="+ encodeURIComponent(newpwd)+"&CONFIRMPWD="+ encodeURIComponent(repwd),
		type : "post",  
	    url : urlfile + "admin/updatePwd",
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
                alert("修改成功,请重新登录！");
                closeDialogBox();
                location.href = "/workLog/views/diary/login/login.html";
                sessionStorage.clear();
			} else {
				alert(data.errMsg);
			}
		}	
	});
}

/*页面内部跳转*/
function goToTop(){
    var _targetTop = $('#gotop').offset().top;//获取位置
    $('.rightContent2').animate({scrollTop:_targetTop},300);//跳转
  }



/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------左侧公用部分---------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
//显示左侧菜单列表
function showMenuList(){
	var menu_obj = jQuery.parseJSON(sessionStorage.getItem("menuMap"));
	var menulist = "";
	menulist += '<li class="nav-top-li">'
			+ '<p class="p-text">你好，'+sessionStorage.getItem("name")+'</p>'
			+ '</li>'
			+ '<li class="nav-top-li">'
			+ '<p class="p-text">工号：'+sessionStorage.getItem("code")+'</p>'
			+ '</li>';
	//console.log(menu_obj);
	for(var menuName in menu_obj){
			menulist += '<li class="nav-top-li">';
			if(menu_obj[menuName] == "index_projectList.html"){
				menulist += '<button class="btn-nav" onclick="window.open(\''+menu_obj[menuName]+'\');">'+menuName+'</button>';
			}else if(menu_obj[menuName] == "index.html"){
				menulist += '<button class="btn-nav" onclick="location.href = \''+menu_obj[menuName]+'\';">'+menuName+'</button>';
				menulist += '</li>';
				menulist += '<li class="nav-top-li">';
				menulist += '<button class="btn-nav showbtn logReport-btn">上报工作日志</button>';
			}else{
				menulist += '<button class="btn-nav" onclick="location.href = \''+menu_obj[menuName]+'\';">'+menuName+'</button>';
			}
			menulist += '</li>';
		//console.log(menuName+"="+menu_obj[menuName]);
	}
	
	menulist += '<li class="nav-top-li">'
          + '<button class="btn-nav showbtn modifyPwd-btn">修改密码</button>'
          + '</li>'
          + '<li class="nav-top-li">'
          + '<button class="btn-nav" onclick="location.href = \'../login/login.html\';">退出登录</button>'
          + '</li>';
	$(".nav-top").html(menulist);
}
//左侧菜单显示前一年，当前年，下一年的月份
function showYearMonth(){
	//获取前一年的年、月份,并显示在列表中
	$('.nextYear').text((parseInt(date_array[0])+1)+"年");
	$('.nextYear').parent(".nav-li").find(".nav-middle").hide();
	var nextMonth_html = '';
	for(var next_month=12;next_month>0;next_month--){
		var next_month_str = getDate(date_array[0]+'-'+next_month.toString()+'-01').Format('MM');
		nextMonth_html += '<li class="nav-middle-li">'
                        	+'<p>'+next_month_str+'月</p>'
                        +'</li>';
	}
	$('.nextMonth').html(nextMonth_html);
	
	$('.currentYear').text(date_array[0]+"年");
	var currentMonth_html = '';
	for(var current_month=12;current_month>0;current_month--){
		var current_month_str = getDate(date_array[0]+'-'+current_month.toString()+'-01').Format('MM');
		currentMonth_html += '<li class="nav-middle-li">'
                        	+'<p>'+current_month_str+'月</p>'
                        +'</li>';	
	}
	$('.currentMonth').html(currentMonth_html);
	
	//获取前一年的年、月份,并显示在列表中
	$('.lastYear').text((date_array[0]-1)+"年");
	$('.lastYear').parent(".nav-li").find(".nav-middle").hide();
	var lastMonth_html = '';
	for(var last_month=12;last_month>0;last_month--){
		var last_month_str = getDate(date_array[0]+'-'+last_month.toString()+'-01').Format('MM');
		lastMonth_html += '<li class="nav-middle-li">'
                        	+'<p>'+last_month_str+'月</p>'
                        +'</li>';
	}
	$('.lastMonth').html(lastMonth_html);
}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*---------------------------------------------------------------左侧公用部分---------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- --------页面弹框公用部分--------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------*/

//上传工作日报弹框
var worklog_dialogBox = '<div class="logReport-box">'
						+'<div class="dialog-title">'
						+'<p>日志上报</p>'
						+'<img class="close" src="../images/declaration/close.png" />'
						+'</div>'
						+'<div class="dialog-content">'
						+'<div class="dialog-module-content">'
						+'<p class="p-dialog-left">日期：</p>'
						+'<ul class="dialog-list">'
						+'<li class="dialog-list-li">'
						+'<input type="text" readonly class="dialog-select text-datepicker"/>'
						+'</li>'
						+'</ul>'
						+'</div>'
						+'<div class="dialog-module-content">'
						+'<p class="p-dialog-left">今日已完成：</p>'
						+'<ul class="dialog-list">'
						+'</ul>'
						+'<p class="dialog-btn-add addlog_finish"><span class="img-add"></span><span>再增加一条</span></p>'
						+'</div>'
						+'<div class="dialog-module-content">'
						+'<p class="p-dialog-left">今日未完成：</p>'
						+'<ul class="dialog-list">'
						+'</ul>'
						+'<p class="dialog-btn-add addlog_unfinish"><span class="img-add"></span><span>再增加一条</span></p>'
						+'</div>'
						+'<button class="dialog-btn">提交</button>'
						+'</div>'
						+'</div>';

//修改密码弹框
var modifyPsd_dialogBox = '<div class="modifyPwd-box">'
						+'<div class="dialog-title">'
						+'<p class="dialog-title-p">修改密码</p>'
						+'<img class="close" src="../images/declaration/close.png" />'
						+'</div>'
						+'<div class="dialog-content">'
						+'<div class="dialog-module-content">'
						+'<ul class="dialog-list font-big">'
						+'<li class="dialog-list-li align-center">'
						+'<span class="margin-lr"><font color="red">&nbsp;&nbsp;</font>工&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号</span>'
						+'<span class="inline-block code width200"></span>'
						+'</li>'
						+'<li class="dialog-list-li align-center">'
						+'<span class="margin-lr"><font color="red">&nbsp;&nbsp;</font>姓&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;名</span>'
						+'<span class="inline-block name width200"></span>' 
						+'</li>'
						+'<li class="dialog-list-li align-center">'
						+'<span class="margin-lr"><font color="red">*</font>旧&nbsp;&nbsp;密&nbsp;&nbsp;码</span>'
						+'<input style="ime-mode: disabled;" class="dialog-input oldpwd width200" type="password" value="请输入旧密码" onpaste="return false" onfocus="this.style.imeMode=\'disabled\'"/>'   
						+'</li>'
						+'<li class="dialog-list-li align-center">'
						+'<span class="margin-lr"><font color="red">*</font>新&nbsp;&nbsp;密&nbsp;&nbsp;码</span>'
						+'<input style="ime-mode: disabled;" class="dialog-input newpwd width200" type="password" value="请输入新密码" onpaste="return false" onfocus="this.style.imeMode=\'disabled\'"/>'  
						+'</li>'
						+'<li class="dialog-list-li align-center">'
						+'<span class="margin-lr"><font color="red">*</font>确认密码</span>'
						+'<input style="ime-mode: disabled;" class="dialog-input repwd width200" type="password" value="请输入确认密码" onpaste="return false" onfocus="this.style.imeMode=\'disabled\'"/>' 
						+'</li>'
						+'</ul>'
						+'</div>'
						+'<button class="dialog-btn">提交</button>'
						+'</div>'
						+'</div>';

//公用弹框
function addNewDialogBox(){
	$(".dialog-box").append(modifyPsd_dialogBox);
	$(".dialog-box").append(worklog_dialogBox);
	
}

//增加日报
function setaddDayTask(usercode,workdate,unfinish,finish){
	$.ajax({
		data:"USERCODE="+usercode+"&WORKDATE="+workdate+"&UNFINISH="+encodeURIComponent(unfinish)+"&FINISH="+encodeURIComponent(finish),
		type : "post",  
	    url : urlfile + "worklog/addDayTask",
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
              alert("上传日报成功！");
              window.location.reload();
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//设置限制日志上报日期
function setlimitLogDate(thisbox){
	//开始时间
	var maxdate = new Date();
	thisbox.find(".text-datepicker").datepicker("option",{  
		minDate: '-6d',  
		maxDate: maxdate, 
		onSelect: function(dateText,inst){
			thisbox.find(".text-datepicker").css("color","#000");
			if(thisbox.find(".text-datepicker").val() ==""){
				thisbox.find(".text-datepicker").val('选择日期');
				tthisbox.find(".text-datepicker").css("color","#ccc");
			}
		}
	});
	thisbox.find(".text-datepicker").datepicker("setDate", new Date());
	$("#ui-datepicker-div").css("display","none");
}
//选择项目列表
function getModelByUCode(thisbox){
	$.ajax({
		data:"USERCODE="+sessionStorage.getItem("code"),
		type : "post",  
	    url : urlfile+"project/getModelByUCode",
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
				strhtml_project="";
				/*if(thisbox.hasClass('logReport-box')){
					strhtml_project += "<li data_id='0'>综合项目</li>";
				}else if(thisbox.hasClass('modify-box')){
					if(thisbox.find('.dialog-textarea').hasClass('log-textarea')){
						strhtml_project += "<li data_id='0'>综合项目</li>";
					}
				}*/
				//console.log(data);
				if(thisbox.hasClass('logReport-box')){
					strhtml_project += "<li data_id=''>请选择所属项目</li>";
				}
				strhtml_project += "<li data_id='0'>综合项目</li>";
				$.each(data.data, function(i, item) {
					strhtml_project += "<li data_id='"+item.projectId+"'>"+item.projectName+"</li>";
				});
				$('.text-pro').find('.select-ul').html(strhtml_project);
			} else {
				alert(data.errMsg);
			}
		}		
	});	
}
//上传日报和修改密码弹框事件
function publishDialogModel(thatbtn,boxTop){
	//日志上报模块，完成任务情况模块字段
	var addlog_html1 = '<li class="dialog-list-li">',
	    addlog_html2 ='<span class="p-num">1、</span>',
	    addlog_html3 ='<textarea class="dialog-textarea log-textarea" id="taskContent"></textarea>',
	    addlog_html4 ='<div class="dialog-module-group">'
	                            +'<div class="select-box text-pro">'
	                            +'<input class="select-item" id="select-item" type="text" dataId="" taskId="" value="请选择所属项目" readonly="readonly">'
	                            +'<ul class="select-ul">'+'<li data_id="0">综合项目</li>'
	                            +'</ul>'
	                        +'</div>'
	                            +'<div class="dialog-magintop">'
	                                +'<input type="text" class="dialog-text usetime-text" id="usedTimes" value="请输入用时" /><span class="p-dialog-right">小时</span>' 
	                            +'</div>'
	                        +'</div>',
		addlog_html5 ='<span class="p-del">删除</span>',
	    addlog_html6 ='</li>';
	var addlog_finish_count = 1 , addlog_unfinish_count = 1 ;

	//设置输入框中初始的文字	
	var pre_str = '';
	//判断是哪个弹窗模块，并显示
	//这是日志上报模块
	if(thatbtn.hasClass('logReport-btn')){
		$(".logReport-box").show();
		 //初始化日志上报模块，已完成任务
		addlog_finish_count = 1;
			$(".addlog_finish").parent('.dialog-module-content').find('.dialog-list').html(addlog_html1+addlog_html2+addlog_html3+addlog_html4+addlog_html6);
			$(".logReport-box").find(".text-datepicker").val(date_array[0]+'-'+date_array[1]+'-'+date_array[2]);
			$(".addlog_finish").parent('.dialog-module-content').find('.dialog-textarea').text('请输入今日已完成任务');
		$(".addlog_finish").parent('.dialog-module-content').find('.p-num').text(addlog_finish_count+'、');
		
		$(".addlog_finish").parent('.dialog-module-content').find('.dialog-textarea').on("focus",function(){
			$(this).css("color","#000");
		});
		$(".addlog_finish").parent('.dialog-module-content').find('.dialog-textarea').on("blur",function(){
			if($.trim($(this).val()) == "请输入今日已完成任务" || $.trim($(this).val()) == ""){
				$(this).css("color","#ccc");
			}
			else{
				$(this).css("color","#000");
			}
			$(this).val($.trim($(this).val()));
		});
		
		$(".addlog_finish").parent('.dialog-module-content').find(".usetime-text").keydown(function (e) {
          numberformat(this);
      });
		$(".addlog_finish").parent('.dialog-module-content').find(".usetime-text").css("color","#ccc");
		$(".addlog_finish").parent('.dialog-module-content').find(".usetime-text").on("focus",function(){
			$(this).css("color","#000");
		});
		$(".addlog_finish").parent('.dialog-module-content').find(".usetime-text").on("blur",function(){
			if($(this).val() == 0 || $(this).val() == '请输入用时'){
				$(this).css("color","#ccc");
			}
			else{
				$(this).css("color","#000");
			}
		});
		
		//初始化日志上报模块，未完成任务
		addlog_unfinish_count = 1;
			$(".addlog_unfinish").parent('.dialog-module-content').find('.dialog-list').html(addlog_html1+addlog_html2+addlog_html3+addlog_html4+addlog_html6);
		$(".addlog_unfinish").parent('.dialog-module-content').find('.dialog-textarea').text('请输入今日未完成任务');
		$(".addlog_unfinish").parent('.dialog-module-content').find('.p-num').text(addlog_unfinish_count+'、');
		$(".addlog_unfinish").parent('.dialog-module-content').find('.dialog-textarea').on("focus",function(){
			$(this).css("color","#000");
		});
		$(".addlog_unfinish").parent('.dialog-module-content').find('.dialog-textarea').on("blur",function(){
			if($.trim($(this).val()) == "请输入今日未完成任务"||$.trim($(this).val()) == ""){
				$(this).css("color","#ccc");
			}
			else{
				$(this).css("color","#000");
			}
			$(this).val($.trim($(this).val()));
		});
		
		$(".addlog_unfinish").parent('.dialog-module-content').find(".usetime-text").keydown(function (e) {
          numberformat(this);
      });
		$(".addlog_unfinish").parent('.dialog-module-content').find(".usetime-text").css("color","#ccc");
		$(".addlog_unfinish").parent('.dialog-module-content').find(".usetime-text").on("focus",function(){
			$(this).css("color","#000");
		});
		$(".addlog_unfinish").parent('.dialog-module-content').find(".usetime-text").on("blur",function(){
			if($(this).val() == 0 || $(this).val() == '请输入用时'){
				$(this).css("color","#ccc");
			}
			else{
				$(this).css("color","#000");
			}
		});
		//限制只能输入浮点数
		var thisbox = $(".logReport-box");
		thisbox.find(".text-datepicker").datepicker();
		setlimitLogDate(thisbox);
		getModelByUCode(thisbox);
		$(".logReport-box").unbind();
		//日志上报模块，已完成任务增加一条
	    $(".logReport-box").find('.addlog_finish').unbind().on("click", function() {
			/*console.log(addlog_finish_html);*/
			addlog_finish_count = $(this).parent().find(".dialog-list-li").length+1;
			addlog_html2 ='<span class="p-num">'+addlog_finish_count+'、</span>';
			addlog_html3 ='<textarea class="dialog-textarea log-textarea">请输入今日已完成任务</textarea>';
			$(this).parent('.dialog-module-content').find('.dialog-list').append(addlog_html1+addlog_html2+addlog_html3+addlog_html4+addlog_html5+addlog_html6);
			getModelByUCode(thisbox);
			$(this).parent('.dialog-module-content').find('.dialog-textarea').on("focus",function(){
				$(this).css("color","#000");
			});
			$(this).parent('.dialog-module-content').find('.dialog-textarea').on("blur",function(){
				if($(this).val() == "请输入今日已完成任务"){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
				
			});
			
			$(this).parent('.dialog-module-content').find(".usetime-text").keydown(function (e) {
	            numberformat(this);
	        });
			$(this).parent('.dialog-module-content').find(".usetime-text").on("focus",function(){
				$(this).css("color","#000");
			});
			$(this).parent('.dialog-module-content').find(".usetime-text").on("blur",function(){
				if($(this).val() == 0 || $(this).val() == '请输入用时'){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
			});
			
		});  
		
		//日志上报模块，未完成任务增加一条
		$(".logReport-box").find('.addlog_unfinish').unbind().on("click", function() {
			addlog_unfinish_count = $(this).parent().find(".dialog-list-li").length+1;
			addlog_html2 ='<span class="p-num">'+addlog_unfinish_count+'、</span>';
			addlog_html3 ='<textarea class="dialog-textarea log-textarea">请输入今日未完成任务</textarea>';
			$(this).parent('.dialog-module-content').find('.dialog-list').append(addlog_html1+addlog_html2+addlog_html3+addlog_html4+addlog_html5+addlog_html6);
			getModelByUCode(thisbox);
			$(this).parent('.dialog-module-content').find('.dialog-textarea').on("focus",function(){
				$(this).css("color","#000");
			});
			$(this).parent('.dialog-module-content').find('.dialog-textarea').on("blur",function(){
				if($(this).val() == "请输入今日未完成任务"){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
				
			});
			
			$(this).parent('.dialog-module-content').find(".usetime-text").keydown(function (e) {
	            numberformat(this);
	        });
//			$(this).parent('.dialog-module-content').find(".usetime-text").css("color","#ccc");
			$(this).parent('.dialog-module-content').find(".usetime-text").on("focus",function(){
				$(this).css("color","#000");
			});
			$(this).parent('.dialog-module-content').find(".usetime-text").on("blur",function(){
				if($(this).val() == 0 || $(this).val() == '请输入用时'){
					$(this).css("color","#ccc");
				}
				else{
					$(this).css("color","#000");
				}
			});
		}); 	
	
		//日志上报模块，任务删除一条
		$(".logReport-box").find(".dialog-list").unbind().delegate(".p-del","click",function(){
			var thisul = $(this).parent().parent();
			$(this).parent().remove();	
			thisul.find(".dialog-list-li").each(function(index){
			    $(this).find(".p-num").html(parseInt(index)+1+"、");
			});
			
		});	
		//下拉选择框
		$(".logReport-box").delegate(".select-item","click",function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>150){thisul.css({height:"150"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find("li").unbind().click(function(){
					thisinput.val($(this).text());
					limitShow(20,thisinput);
					thisinput.attr("dataId",$(this).attr("data_id"));
					thisinput.attr("startsId",$(this).attr("startId"));
					if(thisinput.val() == '请选择所属项目'){
						thisinput.css("color","#ccc");
					}else{
						thisinput.css("color","#000");
					}
					thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
		
		//文本框限制字数
		$(".logReport-box").delegate(".dialog-textarea","keyup",function(){
			var thistext = $(this);
			limitInput(256,thistext);
		});
		// 文本框得到鼠标焦点
		$(".logReport-box").delegate(".dialog-textarea","focus",function(){  
			if($(this).val() == "请输入今日已完成任务"){
				$(this).val("");           
				pre_str = '请输入今日已完成任务';
			}
			else if($(this).val() == "请输入今日未完成任务"){
				$(this).val("");           
				pre_str = '请输入今日未完成任务';
			}
			else{
				if($(this).hasClass('log-textarea')){
					if($(this).parents('.dialog-module-content').find('.dialog-btn-add').hasClass('addlog_finish')){
						pre_str = '请输入今日已完成任务';
					}else if($(this).parents('.dialog-module-content').find('.dialog-btn-add').hasClass('addlog_unfinish')){
						pre_str = '请输入今日未完成任务';
					}
				}
			}
			$(this).css("color","#000");
		});
		
		// 文本框失去鼠标焦点
		$(".logReport-box").delegate(".dialog-textarea","blur",function(){
			if($.trim($(this).val()) == $.trim("")){  
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		});
		
		// 数字输入框得到鼠标焦点
		$(".logReport-box").delegate(".dialog-text","focus",function(){   
		// 得到当前文本框的值    
			var txt_value =  $(this).val();   
			if($(this).val() == "请输入用时"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入用时';
			}else{
				if($(this).hasClass('usetime-text')){
					pre_str = '请输入用时';
				}
			}
			$(this).css("color","#000");
		});
		
		// 数字输入框失去鼠标焦点 
		$(".logReport-box").delegate(".dialog-text","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		});
		
		//提交日报
		$(".logReport-box").delegate(".dialog-btn","click",function(){
			var str_finish = "";
			var str_unfinish = "";
			var issuccess = true;
			if($(this).parents(".logReport-box").find('.text-datepicker').val() == ""){
				alert("请选择日期!");
				$(this).parents(".logReport-box").find('.text-datepicker').focus();
				return false;
			}
			$(".logReport-box").find(".addlog_finish").parent('.dialog-module-content').find('.dialog-list-li').each(function(){
				if(($.trim($(this).find('.dialog-textarea').val()) == "请输入今日已完成任务") && ((($.trim($(this).find('.dialog-text').val()) != "请输入用时")&&($.trim($(this).find('.dialog-text').val()) != "")) || ($(this).find('.select-item').val() != "请选择所属项目"))){
					alert("请输入今日已完成任务!");
					$(this).find('.dialog-textarea').focus();
					issuccess = false;
					return false;
				}
				else if(($(this).find('.select-item').val() == "请选择所属项目") && ((($.trim($(this).find('.dialog-text').val()) != "请输入用时")&&($.trim($(this).find('.dialog-text').val()) != "")) || ($.trim($(this).find('.dialog-textarea').val()) != "请输入今日已完成任务"))){
					alert("请选择所属项目!");
					$(this).find('.select-item').click();
					issuccess = false;
					return false;
				}
				else if((($.trim($(this).find('.dialog-text').val()) == "请输入用时")||($.trim($(this).find('.dialog-text').val()) == "")) && (($.trim($(this).find('.dialog-textarea').val()) != "请输入今日已完成任务") || ($(this).find('.select-item').val() != "请选择所属项目"))){
					alert("请输入用时!");
					$(this).find('.dialog-text').focus();
					issuccess = false;
					return false;
				}
				else if((($.trim($(this).find('.dialog-text').val()) == "请输入用时")||($.trim($(this).find('.dialog-text').val()) == "")) && (($.trim($(this).find('.dialog-textarea').val()) == "请输入今日已完成任务") && ($(this).find('.select-item').val() == "请选择所属项目"))){
					issuccess = true;
					str_finish += "";
				}
				else{
					issuccess = true;
					str_finish += $.trim($(this).find('.dialog-textarea').val())+"|"+$(this).find('.select-item').attr("dataid")+"|"+$(this).find('.usetime-text').val()+"\r\n";
				}
				
			});
			if(issuccess == false){
				return false;
			}
			$(".logReport-box").find(".addlog_unfinish").parent('.dialog-module-content').find('.dialog-list-li').each(function(){
				if(($.trim($(this).find('.dialog-textarea').val()) == "请输入今日未完成任务") && (($(this).find('.select-item').val() != "请选择所属项目") || (($.trim($(this).find('.dialog-text').val()) != "请输入用时")&&($.trim($(this).find('.dialog-text').val()) != "")))){
					alert("请输入今日未完成任务!");
					$(this).find('.dialog-textarea').focus();
					issuccess = false;
					return false;
				}
				else if(($(this).find('.select-item').val() == "请选择所属项目") && ( ($.trim($(this).find('.dialog-textarea').val()) != "请输入今日未完成任务") || (($.trim($(this).find('.dialog-text').val()) != "请输入用时")&&($.trim($(this).find('.dialog-text').val()) != "")))){
					alert("请选择所属项目!");
					$(this).find('.select-item').focus();
					issuccess = false;
					return false;
				}
				else if((($.trim($(this).find('.dialog-text').val()) == "请输入用时")||($.trim($(this).find('.dialog-text').val()) == "")) && (($.trim($(this).find('.dialog-textarea').val()) != "请输入今日未完成任务") || ($(this).find('.select-item').val() != "请选择所属项目"))){
					alert("请输入用时!");
					$(this).find('.dialog-text').focus();
					issuccess = false;
					return false;
				}
				else if((($.trim($(this).find('.dialog-text').val()) == "请输入用时")||($.trim($(this).find('.dialog-text').val()) == "")) && (($.trim($(this).find('.dialog-textarea').val()) == "请输入今日未完成任务") && ($(this).find('.select-item').val() == "请选择所属项目"))){
					issuccess = true;
					str_unfinish += "";
				}
				else{
					issuccess = true;
					str_unfinish += $.trim($(this).find('.dialog-textarea').val())+"|"+$(this).find('.select-item').attr("dataid")+"|"+$(this).find('.usetime-text').val()+"\r\n";
				}
			});
			if (issuccess == true){
				if((str_finish == "") && (str_unfinish == "")){
					alert("请填写完内容再提交！");
					return false;
				}
				else{
					setaddDayTask(sessionStorage.getItem('code'),$(".logReport-box").find(".text-datepicker").val(),str_unfinish,str_finish);
					closeDialogBox();
				}
			}
			else{
				return false;
			}
		});
		boxTop = ($(window).height() - $('.logReport-box').height()) / 2 + $(window).scrollTop();
	}
	//这是修改密码模块
	else if(thatbtn.hasClass("modifyPwd-btn")){
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
		
		// 输入框得到鼠标焦点
		$(".modifyPwd-box").delegate(".dialog-input","focus",function(){   
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
			$(this).css("color","#000");
		});
		// 输入框失去鼠标焦点 
		$(".modifyPwd-box").delegate(".dialog-input","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str);  
				$(this).css("color","#ccc");
			}
		});
		
		thisbox.delegate(".dialog-btn","click",function(){
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
		
		boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
	} 
	return boxTop;
	
}
function closeDialogBox(){
	$(".dialog-bg,.dialog-box").css("display", "none");
	$(".logReport-box").hide();				//上报工作日志
	$(".modifyPwd-box").hide();				//修改密码
	$(".newAssignment-box").hide();			//新增周任务
	$(".monthAssignment-box").hide();		//新增月任务
	$(".remark-box").hide();				//备注
	$(".modify-box").hide();				//修改
	$(".reply-box").hide();					//回复
	$(".addpro-box").hide();				//新增项目
	$(".addproplan-box").hide();			//新增项目计划
	$(".addfunction-box").hide();			//新增项目计划下人员安排模块
	$(".modifypro-box").hide();				//修改项目
	$(".explanation-box").hide();			//说明
	$(".sureTime-box").hide();				//确认工时
	

}
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
/*----------------------------------------------------- --------页面弹框公用部分--------------------------------------------------------------------*/
/*--------------------------------------------------------------------------------------------------------------------------------------------*/
