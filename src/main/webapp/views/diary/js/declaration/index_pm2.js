// JavaScript Document

var myDate = new Date();
	
//获取当年的年、月份份,并显示在列表中
//var date_array = [myDate.Format('yyyy'),myDate.Format('MM'),myDate.Format('dd')];
var date_array = getDayofWeek(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate()).split('|');

$(function(){
	// JavaScript Document
	
	//显示左侧菜单列表
    showMenuList();
    //显示左侧日期
    showYearMonth();
    //公用弹框
    addNewDialogBox();
    
  //按年月查询
    $('.yearMonth_search').on("click",function(){
    	if($('#yearSearch').val().length != 4){
    		alert("请正确输入年份，如'2015'!");
    		return false;
    	}
    	if($('#monthSearch').val().length == 0){
    		alert("请输入月份(1~12)，如'1'或'01'!");
    		return false;
    	}
    	if(parseInt($('#monthSearch').val())>12 || parseInt($('#monthSearch').val())<1){
    		alert("请正确输入月份(1~12)，如'1'或'01'!");
    		return false;
    	}
    	var year = $('#yearSearch').val();
    	var month = $('#monthSearch').val();
    	if(parseInt($('#monthSearch').val())<10){
    		month = "0"+$('#monthSearch').val();
    	}
    	//清除左侧月份选中样式
    	$('.nav-middle-li').each(function(){
			$(this).css("background","#e7e4e4");
		  });
    	
    	getMonthTaskList('','',year,month);
    });
    
	findGroupList();
	
	
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (date_array[0]+'年') && $(this).text() == (date_array[1]+'月')){
			$(this).css("background","#ccc");
		}
	  });
	
	//点击人员获取月任务、周任务、日报
	$("body").delegate(".spn_user","click",function(){
		//console.log($(this).find('.spn_usercode').attr("data-id"));
		//console.log($(this).find('.spn_usercode').text());
		if($(this).hasClass('showbtn') == false){
			$('.horizontal-nav-li').each(function(){
				if($(this).hasClass('showbtn')){
					$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
				}
		    	$(this).css('background','#f3f3f3');
				$(this).css('color','#000000');
		    	$(this).attr('data-clicked','false');
			});
		
			$(this).css('background','#ffffff');
			$(this).css('color','#ff0000');
			$(this).attr('data-clicked','true');
		}
		getMonthTaskList($(this).find('.spn_usercode').attr("data-id"),$(this).find('.spn_usercode').text(),date_array[0],date_array[1]);
	});
	
	//点击所选年份，隐藏或显示月份
    $('.p-year').on("click", function() {
		//console.log($(this).attr("showtype"));
		if($(this).attr("showtype") == 'true'){
			$(this).parent(".nav-li").find(".nav-middle").hide();
			$(this).attr('showtype','false');
		}
		else{
			$(this).parent(".nav-li").find(".nav-middle").show();
			$(this).attr('showtype','true');
		}
	});  
	
  //鼠标拂过表格显示备注内容
    $('body').delegate(".tr-showRemarks","mouseover", function() {
		var remarks = $(this).find(".reply-btn").attr("data-strRemarks");
		showremark(remarks,$(this));
	});
	$('body').delegate(".tr-showRemarks","mouseout", function() {
		removeremark($(this));
	});
//	$('body').delegate(".tr-showRemarks","mouseover", function(e) {
//		e = e || window.event;
//		$(this).css('cursor','pointer');
//		$('.showremark').css("display","block"); 
//		$('.showremark').css("left", e.clientX); 
//		$('.showremark').css("top", e.clientY + 5); 
//		$('.showremark').html($(this).find(".reply-btn").attr("data-strRemarks"));
//	});
//	$('body').delegate(".tr-showRemarks","mouseout", function(e) {
//		$(this).css('cursor','auto');
//		$('.showremark').css("display","none"); 
//	});
	
	//删除按钮点击事件
	$("body").delegate(".del-btn","click",function(){
		var r=confirm('确认删除？');
		if (r==true)
		{
			deleteMonthTask($(this).attr("data-id"));
		}
		else
		{}
	}); 
	
	//下拉选择框
	$(".text-group").find(".select-item").unbind().click(function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>200){thisul.css({height:"200"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find("li").unbind().click(function(){
					thisinput.val($(this).text());
					limitShow(8,thisinput);
					thisinput.css("color","#000");
					thisinput.attr("data-id",$(this).attr("data-id"));
					thisul.fadeOut("100");
					groupUser($(this).attr("data-id"));
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
	
	//月份点击事件
	$('.nav-middle-li').on("click",function(){
		$('.nav-middle-li').each(function(){
			$(this).css("background","#e7e4e4");
		  });
		$(this).css("background","#ccc");
		var cur_year = $(this).parent().prev().text().replace("年", "");
		var cur_month = $(this).find('p').text().replace("月", "");
		getMonthTaskList('','',cur_year,cur_month);
	});	
	
	$("body").delegate(".schedule-btn","click",function(){
		location.href = "../declaration/index_pm.html";
	});
	$("body").delegate(".people-btn","click",function(){
		location.href = "../declaration/index_pm2.html";
	});
	$(".horizontal-nav").delegate(".horizontal-nav-li","mouseover",function(){
		if($(this).hasClass('showbtn')){
			$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro2.png) no-repeat center"});
		}
			$(this).css('background','#ffffff');
			$(this).css('color','#ff0000');
	});
	//横向导航条鼠标离开
	$(".horizontal-nav").delegate(".horizontal-nav-li","mouseleave",function(){
		if($(this).attr('data-clicked') == "false"){
			if($(this).hasClass('showbtn')){
				$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
			}
			$(this).css('background','#f3f3f3');
			$(this).css('color','#000000');
		}
	});
	
	//显示上一周的日报
	$(".peopleMangement").delegate(".pageUp","click",function(){
		var weekIndex=$(this).attr("week");
		if(weekIndex<=1){return;}
//		console.log('weekIndex:'+$(this).attr("week"));
		getWeekAndDayTaskList($(this).attr("year"),$(this).attr("month"),weekIndex,-1);
	});
	
    //显示下一周的日报
	$(".peopleMangement").delegate(".pageDown","click",function(){
		var weekIndex=$(this).attr("week");
		if(weekIndex>5){return;}
		if(date_array[0]==$(this).attr("year")&& date_array[1]==$(this).attr("month") && date_array[2]==weekIndex){//判断当前周时，点击下一周不请求后台数据
			alert('本周未过完-下周未到来!');
			return;
		}
//		console.log('weekIndex:'+$(this).attr("week"));
		getWeekAndDayTaskList($(this).attr("year"),$(this).attr("month"),weekIndex,1);
	});
		
});

function infoByUsercode(usercode){
	$.ajax({
		data:"USERCODE="+usercode,
		type : "post",  
	    url : urlfile + "admin/getUser",
	    //async: false,
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
				$(".text-group").find('.select-item').val(data.data.groupName);
				$(".text-group").find('.select-item').attr("data-id", data.data.groupId);
				groupUser(data.data.groupId);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//初始化组别下拉框
function findGroupList() { 
	var select_li = "";
	$.ajax({
		data:"USERCODE="+sessionStorage.getItem("code"),
		type : "post",  
	    url : urlfile + "main/findGroupList",
	    //async: false,
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
				for(var i = 0; i <data.data.length; i++ ){
					select_li += "<li data-id='"+data.data[i].id+"'>"+data.data[i].name+"</li>";
					/*if(i==0) {
						select_li += "<li data-group data-id='"+data.data[i].id+"'>"+data.data[i].name+"</li>";	
					}else {
						select_li += "<li data-id='"+data.data[i].id+"'>"+data.data[i].name+"</li>";
					}*/	
				}
				$(".text-group").find('.select-ul').html(select_li);
				if(data.data.length > 0){
					if(window.location.search.length > 0){
						var post_usercode = window.location.search.replace('?usercode=','');
						infoByUsercode(post_usercode);
					}else{
						$(".text-group").find('.select-item').val(data.data[0].name);
						$(".text-group").find('.select-item').attr("data-id", data.data[0].id);
						//groupUser($(".text-group").find('.select-item').attr("data-id"));
						groupUser(data.data[0].id);
					}
				}
				
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//获取组别下人员
function groupUser(GROUP_ID) {
	//console.log(GROUP_ID);
	var select_li = "";
	$.ajax({
		data:"GROUP_ID="+GROUP_ID,
		type : "post",  
	    url : urlfile + "main/groupUser",
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
			var post_username = undefined;
			if(data.code == 1) {
				//console.log(data.data);
				var post_usercode = '';
				for(var i = 0; i <data.data.length; i++ ){
					if(window.location.search.length > 0){
						post_usercode = window.location.search.replace('?usercode=','');
						if( post_usercode == data.data[i].usercode){
							post_username = data.data[i].name;
						}
					}
					select_li += "<li class='horizontal-nav-li spn_user' data-clicked='false'><span class='spn_usercode' data-id='"+data.data[i].usercode+"'>"+data.data[i].name+"</span></li>";
				}
				//select_li += "<li class='horizontal-nav-li showbtn addpeople-btn' data-id='"+GROUP_ID+"'><span class='img-addpro'></span><span>新增</span></li>";
				$(".people-group").find('.margin-tb').html(select_li);
				$('.horizontal-nav-li').each(function(){
					if($(this).hasClass('showbtn')){
						$(this).find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
					}
					if(post_username != undefined){
						if($(this).find('.spn_usercode').attr('data-id') == post_usercode){
							$(this).css('background','#ffffff');
							$(this).css('color','#ff0000');
							$(this).attr('data-clicked','true');
						}else{
					    	$(this).css('background','#f3f3f3');
							$(this).css('color','#000000');
					    	$(this).attr('data-clicked','false');
						}
					}else{
						$(this).css('background','#f3f3f3');
						$(this).css('color','#000000');
				    	$(this).attr('data-clicked','false');
					}
			    	
				});
				if($(".horizontal-nav-li:first").hasClass('showbtn')){
					$(".horizontal-nav-li:first").find('.img-addpro').css({background:"url(../images/declaration/addpro.png) no-repeat center"});
					$(".horizontal-nav-li:first").css('background','#f3f3f3');
					$(".horizontal-nav-li:first").css('color','#000000');
					$(".horizontal-nav-li:first").attr('data-clicked','false');
				}
				else{
					if(post_username == undefined){
						$(".horizontal-nav-li:first").css('background','#ffffff');
						$(".horizontal-nav-li:first").css('color','#ff0000');
						$(".horizontal-nav-li:first").attr('data-clicked','true');
					}
				}
				if(data.data.length > 0){
					$('.peopleMangement').css("display","block");
					if(post_username != undefined){
						getMonthTaskList(post_usercode,post_username,date_array[0],date_array[1]);
					}else{
						getMonthTaskList(data.data[0].usercode,data.data[0].name,date_array[0],date_array[1]);
					}
					
				}else {
					$('.peopleMangement').css("display","none");
				}
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取人员下的月任务
function getMonthTaskList(usercode,username,year,month) {
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (year+'年') && $(this).text() == (month+'月')){
			$(this).css("background","#ccc");
		}
		else{
			$(this).css("background","#e7e4e4");
		}
	  });
	var date = new Date();
	var yearNow = date.getFullYear();
	var monthNow = date.getMonth()+1;
	var dayNow = date.getDate();
	
	if(year == yearNow && month== monthNow && dayNow<=10) {
		$('.monthAssignment-btn').css("display","block");
	}else if(year == yearNow && (parseInt(month)-1)== parseInt(monthNow) && dayNow>=20){
		$('.monthAssignment-btn').css("display","block");
	}else if((parseInt(year)-1) == yearNow && parseInt(month)==1 && parseInt(monthNow)==12 && dayNow>=20){
		$('.monthAssignment-btn').css("display","block");
	}else{
		$('.monthAssignment-btn').css("display","none");
	}
	if(usercode == '') {
		usercode = sessionStorage.getItem("select_usercode");
		username = sessionStorage.getItem("select_username");
	}else {
		sessionStorage.setItem("select_usercode", usercode);
		sessionStorage.setItem("select_username", username);
	}
	$(".margin-tb").find('.font-big').text(username);
	var commonMT="";
	$.ajax({
		data:"&USERCODE="+usercode+"&YEAR="+year+"&MONTH="+month,
		type : "post",  
	    url : urlfile+"worklog/monthTaskList",
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
				var y = 1;
				$.each(data.data, function(i, item) {	
					commonMT+="<li class='mList-li'>"+
                        "<p class='mList-p-note'>"+
                    	"<span class='p-normal'>";
                    	if(item.type=='0'){
							commonMT+='<span style="color:red">*</span>';
						}
                        else{
                        	commonMT+='<span>&nbsp;&nbsp;</span>';
						}
                    	commonMT+="<span>"+y+"、</span>"+
							"<span class='month-start'>"+item.startTime+"</span>"+
							"<span> - </span>"+
							"<span class='month-end'>"+item.endTime+"</span>"+
							"<span>&nbsp;</span>"+
							"<span class='month-proname' title='"+item.projectName+"'>"+item.projectName + "</span>"+
							"<span>，</span>"+
							"<span class='month-content' title='"+item.content+"'>"+item.content + "</span>"+
						"</span>";
					if(year == yearNow && month== monthNow && dayNow<=10) {
						commonMT+="<span class='p-edt'>";
						commonMT+="<span class='p-edit del-btn' data-id='"+item.id+"'>删除</span>";
						commonMT+="<span class='p-edit showbtn modify-btn monthAssignment' data-id='"+item.id+"'>修改</span>";
						commonMT+="</span>";
					}else if(year == yearNow && (parseInt(month)-1)== parseInt(monthNow) && dayNow>=20){
						commonMT+="<span class='p-edt'>";
						commonMT+="<span class='p-edit del-btn' data-id='"+item.id+"'>删除</span>";
						commonMT+="<span class='p-edit showbtn modify-btn monthAssignment' data-id='"+item.id+"'>修改</span>";
						commonMT+="</span>";
					}else if((parseInt(year)-1) == yearNow && parseInt(month)==1 && parseInt(monthNow)==12 && dayNow>=20){
						commonMT+="<span class='p-edt'>";
						commonMT+="<span class='p-edit del-btn' data-id='"+item.id+"'>删除</span>";
						commonMT+="<span class='p-edit showbtn modify-btn monthAssignment' data-id='"+item.id+"'>修改</span>";
						commonMT+="</span>";
					}
					commonMT+="</p></li>";
					y++;
		        });
				$("#mList_1").html(commonMT);
				//限制文字显示，省略号
				$(".month-proname").each(function(){
			    	var thistext=$(this);
			    	limitShow(8,thistext);
				});
				$(".month-content").each(function(){
			    	var thistext=$(this);
			    	limitShow(20,thistext);
				});
				if(year==yearNow && month==parseInt(monthNow)){
					var week=getDayofWeek(year,month,myDate.getDate()).split('|');
					getWeekAndDayTaskList(year,month,week[2],0);
				}else {
					getWeekAndDayTaskList(year,month,5,0);
				}
//				getWeekAndDayTaskList(year,month,'');
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

function getWeekAndDayTaskList(year,month,week,type) {
//	if(week ==''){var strdata="&USERCODE="+sessionStorage.getItem("select_usercode")+"&YEAR="+year+"&MONTH="+month+"&TYPE=0";}
//	else{
		var strdata="&USERCODE="+sessionStorage.getItem("select_usercode")+"&YEAR="+year+"&MONTH="+month+"&TYPE="+type+"&WEEK="+week+"&NOW_WEEK="+date_array[2];
//		}
		//console.log(strdata);
	var commonWT = "";
	$.ajax({
		data:strdata,
		type : "post",
	    url : urlfile+"worklog/weekAndDayTaskList",
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
			var pageHtml='';
			if(data.code == 2){
				pageHtml='';
//				console.log(date_array[0]+'=='+year +';'+ date_array[1]+'=='+month+';'+date_array[2]+'=='+week);
//				if(date_array[0]==year && date_array[1]==parseInt(month) && date_array[2]==parseInt(data.data.week)){
//					$(".newAssignment-btn").attr("disabled",false);
//					$(".newAssignment-btn").css("background-color","#fba014");
//				}else{
//					$(".newAssignment-btn").attr("disabled","disabled");
//					$(".newAssignment-btn").css("background-color","#cccccc");
//				}
//				if(date_array[0]==year && week==5 && data.data.week==0){
				if(week==5 && data.data.week==0){
//					$(".rightContent").html('');
					$("#mList_2").html('');
					$(".weekBox").css("display","none");
					$(".cls_reportBox").html('');
					$('.pageUp').remove();
					$('.pageDown').remove();
				}
//				$("#wList").html('');
//				$(".dayGroup").html('');
				/*if(type == -1){
					alert('上周无工作任务');
				}else if(type == 0){
					alert('本周无工作任务');
				}else if(type == 1){
					alert('下周无工作任务');
				}*/
			}else if(data.code == 1) {
				$('.pageUp').remove();
				$('.pageDown').remove();
				$(".weekBox").css("display","block");
				var w=1;
				$.each(data.data.weekTaskVOList, function(i, item) {
					commonWT+="<li class='mList-li'><p class='mList-p-note'>"+
										"<span class='p-normal'>"+
											"<span>"+w+"、</span>"+
											"<span class='week-start'>"+item.startTime+"</span>"+
											"<span> - </span>"+
											"<span class='week-end'>"+item.endTime+"</span>"+
											"<span>&nbsp;</span>"+
											"<span class='week-proname' pId='"+item.projectId+"' title='"+item.projectName+"'>"+item.projectName+"</span>"+
											"<span>，</span>"+
											"<span class='week-content' title='"+item.content+"'>"+item.content + "</span>"+
										"</span></p></li>";					
				 	w++;
		        });
		        $("#mList_2").html(commonWT);
				$(".weekBox").find(".p-note").html("第"+data.data.week+"周工作任务：");
				//限制文字显示，省略号
				$(".week-proname").each(function(){
			    	var thistext=$(this);
			    	limitShow(8,thistext);
				});
				$(".week-content").each(function(){
			    	var thistext=$(this);
			    	limitShow(20,thistext);
				});
				//console.log(data.data.dayTaskVOList);
				if(data.data.dayTaskVOList.length>0){				
					var strhtml_tableBox = '';
					for(var i = 0 ; i < data.data.dayTaskVOList.length ; i++){
						//console.log(data.data.dayTaskVOList[i].workdate);
						if(data.data.dayTaskVOList[i].workdate != undefined ) 
						{
							var strhtml_ywc = '';
							var strhtml_wwc = '';
							strhtml_ywc += '<div class="reportBox margin-tb"><p class="p-blue">'+data.data.dayTaskVOList[i].workdate+'</p>'
							+'<div class="tableBox clear"><table class="tb-half float-left">'
			                    +'<thead class="tb-head">'
			                        +'<tr>'
			                          +'<th colspan="7">今日已完成</th>'
			                        +'</tr>'
			                    +'</thead>'
			                    +'<tbody class="tb-body">'
			                        +'<tr>'
			                            +'<td width="8%">序号</td>'
			                            +'<td width="30%">内容</td>'
			                            +'<td width="12%">姓名</td>'
			                            +'<td width="10%">上传/确认用时</td>'
			                            +'<td width="14%">上传日期</td>'
			                            +'<td width="10%">确认</td>'
			                            +'<td width="16%">操作</td>'
			                        +'</tr>';
							strhtml_wwc += '<table class="tb-half float-left">'
		                        +'<thead class="tb-head">'
		                            +'<tr>'
		                              +'<th colspan="7">今日未完成</th>'
		                            +'</tr>'
		                        +'</thead>'
		                        +'<tbody class="tb-body">'
		                            +'<tr>'
		                                +'<td width="8%">序号</td>'
		                                +'<td width="30%">内容</td>'
		                                +'<td width="12%">姓名</td>'
		                                +'<td width="10%">上传/确认用时</td>'
		                                +'<td width="14%">上传日期</td>'
		                                +'<td width="10%">确认</td>'
		                                +'<td width="16%">操作</td>'
		                            +'</tr>';
							var ywc = 1;
							var wwc = 1;
							for(var j = 0 ; j < data.data.dayTaskVOList[i].voList.length ; j++){
								if(data.data.dayTaskVOList[i].voList[j].status == 1){								
									strhtml_ywc += '<tr class="tr-showRemarks">'
			                            +'<td>'+ywc+'</td>'
			                            +'<td>'+data.data.dayTaskVOList[i].voList[j].content+'</td>'
			                            +'<td><span class="userShowLog" data-userId="'+data.data.dayTaskVOList[i].voList[j].usercode
			                        	+'">'+data.data.dayTaskVOList[i].voList[j].username+'</span></td>'
			                            +'<td>'+data.data.dayTaskVOList[i].voList[j].usedtimes+'/<span class="p-red">'+data.data.dayTaskVOList[i].voList[j].confirmtimes+'</span>小时</td>'
			                            +'<td>'+data.data.dayTaskVOList[i].voList[j].adddate+'</td>';
									if(data.data.dayTaskVOList[i].voList[j].isconfirm == 1){
										strhtml_ywc += '<td><span class="p-purple">未确认</span></td>';
									}else if(data.data.dayTaskVOList[i].voList[j].isconfirm == 2){
										strhtml_ywc += '<td><span class="p-red">已确认</span></td>';
									}else{
										strhtml_ywc += '<td></td>';
									}
		                            strhtml_ywc += '<td>'
		                            	+'<button class="btn-blue showbtn reply-btn" data-year="'+data.data.dayTaskVOList[i].voList[j].year+'" data-month="'+data.data.dayTaskVOList[i].voList[j].month+'" data-week="'+data.data.dayTaskVOList[i].voList[j].week+'" data-userId="'+data.data.dayTaskVOList[i].voList[j].usercode+'" data-strRemarks="'+data.data.dayTaskVOList[i].voList[j].strRemarks+'" data-dayTaskId="'+data.data.dayTaskVOList[i].voList[j].id+'">回复</button>'
		                            	+'<button class="btn-blue showbtn sureTime-btn" data-year="'+data.data.dayTaskVOList[i].voList[j].year+'" data-month="'+data.data.dayTaskVOList[i].voList[j].month+'" data-week="'+data.data.dayTaskVOList[i].voList[j].week+'" data-id="'+data.data.dayTaskVOList[i].voList[j].id+'" data-confirmtime="'+data.data.dayTaskVOList[i].voList[j].confirmtimes+'" data-status="'+data.data.dayTaskVOList[i].voList[j].status+'">确认</button>'
										+'</td>'
			                            +'</tr>';
									ywc = ywc+1;
								}
								if(data.data.dayTaskVOList[i].voList[j].status == 0){								
									strhtml_wwc += '<tr class="tr-showRemarks">'
			                            +'<td>'+wwc+'</td>'
			                            +'<td>'+data.data.dayTaskVOList[i].voList[j].content+'</td>'
			                            +'<td><span class="userShowLog" data-userId="'+data.data.dayTaskVOList[i].voList[j].usercode
			                        	+'">'+data.data.dayTaskVOList[i].voList[j].username+'</span></td>'
			                            +'<td>'+data.data.dayTaskVOList[i].voList[j].usedtimes+'/<span class="p-red">'+data.data.dayTaskVOList[i].voList[j].confirmtimes+'</span>小时</td>'
			                            +'<td>'+data.data.dayTaskVOList[i].voList[j].adddate+'</td>';
									if(data.data.dayTaskVOList[i].voList[j].isconfirm == 1){
										strhtml_wwc += '<td><span class="p-purple">未确认</span></td>';
									}else if(data.data.dayTaskVOList[i].voList[j].isconfirm == 2){
										strhtml_wwc += '<td><span class="p-red">已确认</span></td>';
									}else{
										strhtml_wwc += '<td></td>';
									}
									strhtml_wwc += '<td>'
										+'<button class="btn-blue showbtn reply-btn" data-year="'+data.data.dayTaskVOList[i].voList[j].year+'" data-month="'+data.data.dayTaskVOList[i].voList[j].month+'" data-week="'+data.data.dayTaskVOList[i].voList[j].week+'" data-userId="'+data.data.dayTaskVOList[i].voList[j].usercode+'" data-strRemarks="'+data.data.dayTaskVOList[i].voList[j].strRemarks+'" data-dayTaskId="'+data.data.dayTaskVOList[i].voList[j].id+'">回复</button>'
										+'<button class="btn-blue showbtn sureTime-btn" data-year="'+data.data.dayTaskVOList[i].voList[j].year+'" data-month="'+data.data.dayTaskVOList[i].voList[j].month+'" data-week="'+data.data.dayTaskVOList[i].voList[j].week+'" data-id="'+data.data.dayTaskVOList[i].voList[j].id+'" data-confirmtime="'+data.data.dayTaskVOList[i].voList[j].confirmtimes+'" data-status="'+data.data.dayTaskVOList[i].voList[j].status+'">确认</button>'
										+'</td>'
			                            +'</tr>';
									wwc = wwc+1;
								}
							}
							strhtml_tableBox += strhtml_ywc + '</tbody></table>' + strhtml_wwc + '</tbody></table></div></div>';
						}
					}
	                $('.cls_reportBox').html(strhtml_tableBox);
				}
				else{
					$('.cls_reportBox').html('');
				}
				if(date_array[0]==year && date_array[1]==month && week==5 && data.data.week==0){
					pageHtml = "";
				}else if(data.data.week==1){
					pageHtml = '<span class="p-edit margin-tb pageDown" year="'+year+'" month="'+month+'"  week="'+data.data.week+'">下一周</span>';
				}else{//当周任务和日报任意有数据，上下周都显示
					pageHtml = '<span class="p-edit margin-tb  pageUp" year="'+year+'" month="'+month+'"  week="'+data.data.week+'">上一周</span>'+'&nbsp;&nbsp;&nbsp;&nbsp;'+
					'<span class="p-edit margin-tb pageDown" year="'+year+'" month="'+month+'"  week="'+data.data.week+'">下一周</span>';
				}
				$('.lastnext_weekBox').html(pageHtml);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//删除月任务
function deleteMonthTask(ID){
	//console.log(ID);
	var strData = "ID="+ID;
	$.ajax({
		data : strData,
		type : "post",  
	    url : urlfile + "worklog/deleteMonthTask",
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
                var date = new Date();
                if(date.getDate()<=10){
                	getMonthTaskList('','',date.getFullYear(),(date.getMonth()+1));
                }else if(date.getDate()>=20 && (date.getMonth()+1)==12){
                	getMonthTaskList('','',(date.getFullYear()+1),'01');
                }else if(date.getDate()>=20 && (date.getMonth()+1)!=12){
                	getMonthTaskList('','',date.getFullYear(),(date.getMonth()+2));
                }
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}