// JavaScript Document

var myDate = new Date();
//获取当年的年、月份份,并显示在列表中
//var date_array = getDayofWeek(myDate.getFullYear(),myDate.getMonth()+1,myDate.getDate()).split('|');
var date_array = [myDate.Format('yyyy'),myDate.Format('MM'),myDate.Format('dd')];

$(function(){
	//显示左侧菜单列表
    showMenuList();
    //显示左侧日期
    //showYearMonth();
    //公用弹框
    addNewDialogBox();
	
	$('.nav-middle-li').each(function(){
		if($(this).parent().parent().find(".p-year").text() == (date_array[0]+'年') && $(this).text() == (date_array[1]+'月')){
			$(this).css("background","#ccc");
		}
	  });
	
	//点击所选年份，隐藏或显示月份
    $('.p-year').on("click", function() {
		if($(this).attr("showtype") == 'true'){
			$(this).parent(".nav-li").find(".nav-middle").hide();
			$(this).attr('showtype','false');
		}
		else{
			$(this).parent(".nav-li").find(".nav-middle").show();
			$(this).attr('showtype','true');
		}
	}); 
    
	
	
});	

$(function () {
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




