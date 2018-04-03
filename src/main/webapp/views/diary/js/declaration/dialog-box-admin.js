// JavaScript Document

$(function () {
	//设置输入框中初始的文字	
	var pre_str = '';
						
	//点击按钮触发遮罩弹框事件
	$("body").delegate(".showbtn","click",function(){
		closeDialogBox();
        $(".dialog-bg").css({
            display: "block", height: $(window).height()
        });
        var $box = $('.dialog-box');
		$box.css('display','block');
		var boxTop = 0;
		
		//判断是哪个弹窗模块，并显示
		//这是添加角色模块
		if($(this).hasClass("addrole")){
			var thisbtn = $(this);
			var thisbox = $(".role-box");
			thisbox.show();
			thisbox.find('.dialog-title-p').html('添加角色');
			thisbox.find('.dialog-textarea').css('color','#ccc');
			thisbox.find('.dialog-input').css('color','#ccc');
			thisbox.find('.roleName').val('请输入角色名');
			thisbox.find('.remark-textarea').val('请输入备注内容');
			
			getAllFunctionList('');
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var remarks='';
				var meauIds = $.trim(thisbox.find('.text-meau').find('.select-item').attr("data-ids"));
				if($.trim(thisbox.find('.roleName').val()) == "请输入角色名"){
					alert("不能为空，请输入角色名");
					thisbox.find('.roleName').focus();
					return false;
				}
				
				if(meauIds=='请选择权限'){
					alert("不能为空，请选择权限");
					thisbox.find('.text-meau').find('.select-item').click();
					return false;
				}
				if($.trim(thisbox.find('.remark-textarea').val()) == "请输入备注内容"){
					remarks='';
				}
				else if($.trim(thisbox.find('.remark-textarea').val()) != "请输入备注内容"){
					remarks=thisbox.find('.remark-textarea').val();
				}
				
				setAddRole(thisbox.find('.roleName').val(),remarks,meauIds);
			});
		} 
		//这是修改角色模块
		else if($(this).hasClass("modifyRole-btn")){
			var thisbtn = $(this);
			var thisbox = $(".role-box");
			thisbox.show();
			thisbox.find('.dialog-title-p').html('修改角色');
			thisbox.find('.dialog-input').css('color','#000');
			thisbox.find('.roleName').attr('data-id',thisbtn.attr('data-id'));;
			thisbox.find('.roleName').val(thisbtn.attr('data-name'));
			thisbox.find('.text-meau').find('.select-item').attr('data-ids',thisbtn.attr('data-functionunids'));
			thisbox.find('.text-meau').find('.select-item').attr('value',thisbtn.attr('data-functionnames'));
			thisbox.find('.remark-textarea').val(thisbtn.attr('data-remarks'));
			if(thisbox.find('.remark-textarea').val() == ''){
				thisbox.find('.remark-textarea').val('请输入备注内容');
				thisbox.find('.dialog-textarea').css('color','#ccc');
			}
			else{
				thisbox.find('.dialog-textarea').css('color','#000');
			}
			
			var functionunids=$.trim(thisbtn.attr('data-functionunids'));
			getAllFunctionList(functionunids);
			
			
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var remarks='';
				var meauIds = $.trim(thisbox.find('.text-meau').find('.select-item').attr("data-ids"));
				if($.trim(thisbox.find('.roleName').val()) == "请输入角色名"){
					alert("不能为空，请输入角色名");
					thisbox.find('.roleName').focus();
					return false;
				}
				if($.trim(thisbox.find('.remark-textarea').val()) == "请输入备注内容"){
					remarks='';
				}
				else if($.trim(thisbox.find('.remark-textarea').val()) != "请输入备注内容"){
					remarks=thisbox.find('.remark-textarea').val();
				}
				if(meauIds=='请选择权限'){
					alert("不能为空，请选择权限");
					thisbox.find('.text-meau').find('.select-item').click();
					return false;
				}
//				console.log("meauIds:"+meauIds);
				setModifyRole(thisbox.find('.roleName').attr('data-id'),thisbox.find('.roleName').val(),remarks,meauIds);
			});
		}
		//这是新增组别模块
		else if($(this).hasClass("addgroup")){
			var thisbtn = $(this);
			var thisbox = $(".group-box");
			thisbox.show();
			thisbox.find('.dialog-title-p').html('添加组别');
			thisbox.find('.text-pm').find('.select-item').css('color','#ccc');
			thisbox.find('.dialog-input').css('color','#ccc');
			thisbox.find('.text-pm').find('.select-item').attr('data-id',"");
			thisbox.find('.text-pm').find('.select-item').attr('data-value',"");
			thisbox.find('.text-pm').find('.select-item').val('请选择项目经理');
			thisbox.find('.groupName').val('请输入组别名称');
			getAllPMList();
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				if($.trim(thisbox.find('.groupName').val()) == "请输入组别名称"){
					alert("不能为空，请输入组别名称");
					thisbox.find('.groupName').focus();
				}
//				else if($.trim(thisbox.find('.select-item').val()) == "请选择项目经理"){
//					alert("不能为空，请选择项目经理");
//					thisbox.find('.select-item').click();
//				}
				else{
					setAddGroup(thisbox.find('.groupName').val(),thisbox.find('.select-item').attr("data-id"));
				}
			});
		} 
		//这是修改组别模块
		else if($(this).hasClass("modifyGroup-btn")){
			var thisbtn = $(this);
			var thisbox = $(".group-box");
			thisbox.show();
			thisbox.find('.dialog-title-p').html('修改组别');
			thisbox.find('.text-pm').find('.select-item').css('color','#000');
			thisbox.find('.dialog-input').css('color','#000');
			thisbox.find('.groupName').val(thisbtn.attr('data-name'));
			if(thisbtn.attr('data-username') == 'undefined' || thisbtn.attr('data-usercode') == ''){
				thisbox.find('.text-pm').find('.select-item').attr('data-id',"");
				thisbox.find('.text-pm').find('.select-item').attr('data-value',"");
				thisbox.find('.text-pm').find('.select-item').val('请选择项目经理');
				thisbox.find('.text-pm').find('.select-item').css('color','#ccc');
			}else{
				thisbox.find('.text-pm').find('.select-item').val(thisbtn.attr('data-username'));
				thisbox.find('.text-pm').find('.select-item').attr('data-value',thisbtn.attr('data-username'));
				thisbox.find('.text-pm').find('.select-item').attr('data-id',thisbtn.attr('data-usercode'));
			}
			getAllUserList(thisbox.find('.text-pm').find('.select-ul'));
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				if($.trim(thisbox.find('.groupName').val()) == "请输入组别名称"){
					alert("不能为空，请输入组别名称");
					thisbox.find('.groupName').focus();
				}
//				else if($.trim(thisbox.find('.select-item').val()) == "请选择项目经理"){
//					alert("不能为空，请选择项目经理");
//					thisbox.find('.select-item').click();
//				}
				else{
					setModifyGroup(thisbtn.attr('data-id'),thisbox.find('.groupName').val(),thisbox.find('.select-item').attr("data-id"));	
				}
			});
		}
		//这是成员管理模块
		else if($(this).hasClass("groupMember-btn")){
			var thisbtn = $(this);
			var thisbox = $(".groupMember-box");
			thisbox.show();
			thisbox.find('.groupName').text(thisbtn.attr('data-name'));
			thisbox.find('.text-groupMember').find('.select-item').attr("data-ids",thisbtn.attr('data-usercode'));
			thisbox.find('.text-groupMember').find('.select-item').attr("data-names",thisbtn.attr('data-username'));
			thisbox.find('.text-groupMember').find('.select-item').val(thisbtn.attr('data-username'));
			getAllPersonList(thisbtn.attr('data-usercode'),thisbox.find('.text-groupMember').find(".select-ul"));
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var json_obj = {};
				json_obj.groupId = thisbtn.attr('data-id');
				json_obj.usercodes = thisbox.find('.text-groupMember').find('.select-item').attr("data-ids");
				json_obj.usernames = thisbox.find('.text-groupMember').find('.select-item').attr("data-values");
				addGroupUser(json_obj);
			});
		}
		//这是修改项目模块
		else if($(this).hasClass("modifyProject-btn")){
			var thisbtn = $(this);
			var thisbox = $(".project-box");
			thisbox.show();
			thisbox.find('.text-pm').find('.select-item').css('color','#000');
			thisbox.find('.text-pm').find('.select-item').val(thisbtn.attr('data-username'));
			thisbox.find('.text-pm').find('.select-item').attr('data-id',thisbtn.attr('data-usercode'));
			getAllPMList();
			if('1'==thisbtn.attr('data-status')){
				$("input[type=radio][name=projectStatus][value=1]").attr("checked",'checked');
			}else{
				$("input[type=radio][name=projectStatus][value=0]").attr("checked",'checked');
			}
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var projectId,projectName,startTime,endTime,remarks,usercode,pagenum;
				projectId = thisbtn.attr('data-id');
				projectName = thisbtn.attr('data-name');
				startTime = thisbtn.attr('data-startTime');
				endTime = thisbtn.attr('data-endTime');
				remarks = thisbtn.attr('data-remarks');
				pagenum = thisbtn.attr("data-pagenum");
				usercode = thisbox.find('.select-item').attr("data-id");
				var projectStatus=$.trim($('input:radio[name="projectStatus"]:checked').val());
				if($.trim(thisbox.find('.select-item').val()) == "请选择项目经理"){
					alert("不能为空，请选择项目经理");
					thisbox.find('.select-item').click();
					return false;
				}
				setModifyProject(projectId,projectName,startTime,endTime,remarks,usercode,projectStatus,pagenum);
			});
		}
//		//这是新增项目经理模块
//		else if($(this).hasClass("addpm")){
//			var thisbtn = $(this);
//			var thisbox = $(".pm-box");
//			thisbox.show();
//			thisbox.find('.select-item').css('color','#ccc');
//			thisbox.find('.dialog-input').css('color','#ccc');
//			thisbox.find('.code').val('请输入工号');
//			thisbox.find('.name').val('请输入姓名');
//			thisbox.find('.pwd').val('请输入密码');
//			thisbox.find('.pwd').on("keyup",function(){$(this).val($(this).val().replace(/[\u4e00-\u9fa5]/g,''))});
//			thisbox.find('.text-groups').find('.select-item').val('请选择管理组别');
//			getAllGroupsList("","");
//			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
//			thisbox.unbind().delegate(".dialog-btn","click",function(){
//				var pm_code,pm_name,pm_pwd,pm_groupIds;
//				pm_code = thisbox.find('.code').val();
//				pm_name = thisbox.find('.name').val();
//				pm_pwd = thisbox.find('.pwd').val();
//				pm_groupIds = thisbox.find('.text-groups').find('.select-item').attr("data-ids");
//				if($.trim(thisbox.find('.code').val()) == "请输入工号"){
//					alert("不能为空，请输入工号");
//					thisbox.find('.code').focus();
//					return false;
//				}
//				if($.trim(thisbox.find('.name').val()) == "请输入姓名"){
//					alert("不能为空，请输入姓名");
//					thisbox.find('.name').focus();
//					return false;
//				}
//				if($.trim(thisbox.find('.pwd').val()) == "请输入密码"){
//					alert("不能为空，请输入密码");
//					thisbox.find('.pwd').focus();
//					return false;
//				}
//				if($.trim(thisbox.find('.text-groups').find('.select-item').val()) == "请选择所属组别"){
//					alert("不能为空，请选择管理组别");
//					thisbox.find('.text-groups').find('.select-item').click();
//					return false;
//				}
//				setAddExecutives(pm_code,pm_name,pm_pwd,pm_groupIds);
//			});
//		} 
//		//这是修改项目经理模块
//		else if($(this).hasClass("modifyPM-btn")){
//			var thisbtn = $(this);
//			var thisbox = $(".modifyPM-box");
//			thisbox.show();
//			thisbox.find('.select-item').css('color','#000');
//			thisbox.find('.dialog-input').css('color','#000');
//			thisbox.find('.code').html(thisbtn.attr('data-usercode'));
//			thisbox.find('.name').attr('value',thisbtn.attr('data-username'));
//			if(thisbtn.attr('data-groupIds') == ''){
//				thisbox.find('.text-groups').find('.select-item').attr('value','请选择管理组别');
//				thisbox.find('.text-groups').find('.select-item').css('color','#ccc');
//			}else{
//				thisbox.find('.text-groups').find('.select-item').attr('data-ids',thisbtn.attr('data-groupIds'));
//				thisbox.find('.text-groups').find('.select-item').attr('value',thisbtn.attr('data-groupName'));
//				limitShow(8,thisbox.find('.text-groups').find('.select-item'));
//			}
//			getAllGroupsList(thisbtn.attr('data-usercode'),thisbtn.attr('data-groupIds'));
//			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
//			thisbox.unbind().delegate(".dialog-btn","click",function(){
//				var pm_code,pm_name,pm_pwd,pm_groupIds;
//				pm_code = thisbtn.attr('data-usercode');
//				pm_name = thisbox.find('.name').val();
//				pm_pwd = thisbtn.attr('data-pwd');
//				pm_groupIds = thisbox.find('.text-groups').find('.select-item').attr("data-ids");
//				if($.trim(thisbox.find('.name').val()) == "请输入姓名"){
//					alert("不能为空，请输入姓名");
//					thisbox.find('.name').focus();
//					return false;
//				}
//				if($.trim(thisbox.find('.text-groups').find('.select-item').attr('value')) == "请选择管理组别" || $.trim(thisbox.find('.text-groups').find('.select-item').attr('value')) == ""){
//					alert("不能为空，请选择管理组别");
//					thisbox.find('text-groups').find('.select-item').click();
//					return false;
//				}
//				setAddExecutives(pm_code,pm_name,pm_pwd,pm_groupIds);
//			});
//		} 
		//这是新增员工模块
		else if($(this).hasClass("addstaff")){
			var thisbtn = $(this);
			var thisbox = $(".staff-box");
			thisbox.show();
			thisbox.find('.select-item').css('color','#ccc');
			thisbox.find('.dialog-input').css('color','#ccc');
			thisbox.find('.code').val('请输入工号');
			thisbox.find('.name').val('请输入姓名');
			thisbox.find('.pwd').val('请输入密码');
			thisbox.find('.email').val('请输入邮箱');
			thisbox.find('.mobile').val('请输入联系方式');
			thisbox.find('.text-role').find('.select-item').val('请选择角色');
//			thisbox.find('.text-group').find('.select-item').val('请选择所属组别');
			getAllRoleList('');
//			getAllGroupList();
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var staff_code = $.trim(thisbox.find('.code').val());
				var staff_name = $.trim(thisbox.find('.name').val());
				var staff_pwd = $.trim(thisbox.find('.pwd').val());
				var staff_email = $.trim(thisbox.find('.email').val());
				var staff_mobile = $.trim(thisbox.find('.mobile').val());
				var staff_roleIds = $.trim(thisbox.find('.text-role').find('.select-item').attr("data-ids"));
				if(staff_code == "请输入工号"){
					alert("不能为空，请输入工号");
					thisbox.find('.code').focus();
					return false;
				}
				if(staff_name == "请输入姓名"){
					alert("不能为空，请输入姓名");
					thisbox.find('.name').focus();
					return false;
				}
				if(staff_pwd == "请输入密码"){
					alert("不能为空，请输入密码");
					thisbox.find('.pwd').focus();
					return false;
				}
				if(staff_email == "请输入邮箱"){
//					alert("不能为空，请输入邮箱");
//					thisbox.find('.email').focus();
//					return false;
					staff_email='';
				}
				if(staff_mobile == "请输入联系方式"){
//					alert("不能为空，请输入联系方式");
//					thisbox.find('.mobile').focus();
//					return false;
					staff_mobile='';
				}
				if(staff_roleIds == "请选择角色"){
					alert("不能为空，请选择角色");
					thisbox.find('.text-role').find('.select-item').click();
					return false;
				}
				setAddStaff(staff_code,staff_name,staff_pwd,staff_email,staff_mobile,staff_roleIds);
			});
		} 
		//这是修改员工模块
		else if($(this).hasClass("modifyStaff-btn")){
			var thisbtn = $(this);
			var thisbox = $(".staffM-box");
			thisbox.show();
			thisbox.find('.select-item').css('color','#000');
			thisbox.find('.dialog-input').css('color','#000');
			thisbox.find('.code').html(thisbtn.attr('data-usercode'));
			thisbox.find('.name').attr('value',thisbtn.attr('data-username'));
			thisbox.find('.email').attr('value',(thisbtn.attr('data-email')=='undefined'?'':thisbtn.attr('data-email')));
			thisbox.find('.mobile').attr('value',(thisbtn.attr('data-mobile')=='undefined'?'':thisbtn.attr('data-mobile')));
			thisbox.find('.text-role').find('.select-item').attr('data-ids',thisbtn.attr('data-roles'));
			thisbox.find('.text-role').find('.select-item').attr('value',thisbtn.attr('data-rolenames'));
			if('1'==thisbtn.attr('data-status')){
				$("input[type=radio][name=userStatus][value=1]").attr("checked",'checked');
			}else{
				$("input[type=radio][name=userStatus][value=0]").attr("checked",'checked');
			}
			getAllRoleList(thisbtn.attr('data-roles'));
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var staff_code = $.trim(thisbox.find('.code').text());
				var staff_name = $.trim(thisbox.find('.name').val());
				var staff_email = $.trim(thisbox.find('.email').val());
				var staff_mobile = $.trim(thisbox.find('.mobile').val());
				var staff_roleIds = $.trim(thisbox.find('.text-role').find('.select-item').attr("data-ids"));
				var staff_status=$.trim($('input:radio[name="userStatus"]:checked').val());
				var pagenum = thisbtn.attr('data-page');
				if(staff_name == "请输入姓名"){
					alert("不能为空，请输入姓名");
					thisbox.find('.name').focus();
					return false;
				}
				if(staff_roleIds == "请选择角色"){
					alert("不能为空，请选择角色");
					thisbox.find('.text-role').find('.select-item').click();
					return false;
				}
				if($.trim(thisbox.find('.text-group').find('.select-item').val()) == "请选择所属组别"){
					alert("不能为空，请选择所属组别");
					thisbox.find('.text-group').find('.select-item').click();
					return false;
				}
				setModifyStaff(staff_code,staff_name,staff_email,staff_mobile,staff_roleIds,staff_status,pagenum);
			});
		}
		//这是修改密码模块
		else if($(this).hasClass("modifyPwd-btn")){
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
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
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
		} 
		//这是添加权限管理模块
		else if($(this).hasClass("addmeau")){
			var thisbtn = $(this);
			var thisbox = $(".meau-box");
			thisbox.show();
			thisbox.find("input[type=radio][name=menuStatus][value=1]").attr("checked",'checked');
			thisbox.find('.dialog-input').css('color','#ccc');
			thisbox.find('.meauname').val('请输入权限名称');
			thisbox.find('.meauurl').val('请输入资源地址');
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				var meau_name=$.trim(thisbox.find('.meauname').val());
				var meau_url=$.trim(thisbox.find('.meauurl').val());
				var meau_status=$.trim($('input:radio[name="menuStatus"]:checked').val());
//				console.log('meau_status:'+meau_status);
				if("请输入权限名称"== meau_name){
					alert("不能为空，请输入权限名称");
					thisbox.find('.meauname').focus();
					return false;
				}
				if("请输入资源地址"== meau_url){
					alert("不能为空，请输入资源地址");
					thisbox.find('.meauurl').focus();
					return false;
				}
				setAddMeau(meau_name,meau_url,meau_status);
			});
		} 
		//这是修改权限管理
		else if($(this).hasClass("modifyMeau-btn")){
			var thisbtn = $(this);
			var thisbox = $(".modifyMeau-box");
			thisbox.show();
			thisbox.find('.select-item').css('color','#000');
			thisbox.find('.dialog-input').css('color','#000');
			thisbox.find('.meaucode').html(thisbtn.attr('data-id'));
			thisbox.find('.meauname').attr('value',thisbtn.attr('data-name'));
			thisbox.find('.meauurl').attr('value',thisbtn.attr('data-url'));
			if('1'==thisbtn.attr('data-status')){
				$("input[type=radio][name=menuStatus][value=1]").attr("checked",'checked');
			}else{
				$("input[type=radio][name=menuStatus][value=0]").attr("checked",'checked');
			}
			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
			thisbox.unbind().delegate(".dialog-btn","click",function(){
				if($.trim(thisbox.find('.meauname').val()) == ""){
					alert("不能为空，请输入权限名称");
					thisbox.find('.meauname').focus();
					return false;
				}
				if($.trim(thisbox.find('.meauurl').val()) == ""){
					alert("不能为空，请输入资源地址");
					thisbox.find('.meauurl').focus();
					return false;
				}
				var meau_code=$.trim(thisbox.find('.meaucode').text());
				var meau_name=$.trim(thisbox.find('.meauname').val());
				var meau_url=$.trim(thisbox.find('.meauurl').val());
				var meau_status=$.trim($('input:radio[name="menuStatus"]:checked').val());
				setModifyMeau(meau_code,meau_name,meau_url,meau_status);
			});
		} 
		//这是bug详情模块
//		else if($(this).hasClass("detailBug-btn")){
//			var thisbtn = $(this);
//			var thisbox = $(".detailBug-box");
//			thisbox.show();
//			boxTop = ($(window).height() - thisbox.height()) / 2 + $(window).scrollTop();
//			thisbox.find(".text-bugLevel").html("");
//			thisbox.find(".text-bugSeverity").html("");
//			thisbox.find(".bugTitle").html("");
//			thisbox.find(".text-bugPro").html("");
//			thisbox.find(".text-bugModel").html("");
//			thisbox.find(".bugAffectVersion").html("");
//			thisbox.find(".text-bugSystemType").html("");
//			thisbox.find(".text-bugBrowser").html("");
//			thisbox.find(".text-bugType").html("");
//			thisbox.find(".text-bugStatus").html("");
//			thisbox.find(".text-bugAssigned").html("");
//			thisbox.find(".text-bugCreator").html("");
//			thisbox.find(".text-bugCreatTime").html("");
//			thisbox.find(".bugContents").html("");
//			thisbox.find(".bugRemarks").html("");
//			thisbox.find(".bugAssignedRecord").html("");
//			thisbox.find(".bugStatusRecord").html("");
//			showBugDetailList(thisbtn.attr("data-id"),thisbox);
//			
//		} 
        $box.css({
            //设置弹出层距离左边的位置
            left: ($("body").width() - $box.width()) / 2 - 20 + "px",
            //设置弹出层距离上面的位置
            top: boxTop + "px",
        });
		
		
		
		
		//下拉选择框$('.dialog-content:not(".text-groups"):not(".text-groupMember")')
        $('.dialog-content:not(".text-groups"):not(".text-groupMember")').find(".select-item").unbind().on('click',function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find(".select-ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>150){thisul.css({height:"150"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find("input").focus();
				thisul.find('.searchit').on('keyup',function(){
					var searchText=$(this).val();
					thisul.find("li").each(function(){
						if($(this).text().indexOf(searchText)>-1){
							$(this).show();
						}
						else{
							$(this).hide();
						}
					});
				});
				thisul.find("li").unbind().click(function(){
					var isChanged = false;
					if(thisinput.parent().hasClass("text-bugPro") && ($(this).attr("data-id") != thisinput.attr("data-id"))){
						isChanged = true;
					}
					thisinput.attr("data-id",$(this).attr("data-id"));
					thisinput.attr("data-value",$(this).attr("data-value"));
					thisinput.val($(this).text());
					//thisinput.attr("value",$(this).text());
					if(isChanged){
						bugProChange(thisinput.parents(".dialog-content").parent().attr("class"));
					}
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
        //所有角色下拉选择框
		$('.text-role').find(".select-item").unbind().on('click',function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			var thisdiv=$(this).parent(); 
			if(thisul.css("display")=="none"){
				if(thisul.height()>150){thisul.css({height:"150"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find(".searchit").focus();
				thisul.find('.searchit').on('keyup',function(){
					var searchText=$(this).val();
					thisul.find("li").each(function(){
						if($(this).text().indexOf(searchText)>-1){
							$(this).show();
						}
						else{
							$(this).hide();
						}
					});
				});
				thisul.find("li").unbind().click(function(){
					var ids = "";
					var str_val = "";
					if($(this).find('input').is(':checked')){
						$(this).find("input").attr("checked",'');
						$(this).find("input").removeAttr("checked");
					}
					else{
						$(this).find("input").attr("checked",'checked');
					}
					$(this).parent().find(":checkbox").each(function(i){
					    if($(this).attr("checked")) {
					    	ids += $(this).parent("li").attr("data-id")+"|";
							str_val += $(this).parent("li").text()+"|";
					   }
					});
					thisinput.attr('data-values',str_val);
					thisinput.val(str_val);
					//存在汉字
					if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).text())){
						limitShow(8,thisinput);
					}else{
						limitShow(16,thisinput);
					}
					thisinput.attr("data-ids",ids);
					thisinput.css('color','#000');
					
					
					//thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
      //所有人员下拉选择框
		$('.text-groupMember').find(".select-item").unbind().on('click',function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			var thisdiv=$(this).parent(); 
			if(thisul.css("display")=="none"){
				if(thisul.height()>150){thisul.css({height:"150"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find(".searchit").focus();
				thisul.find('.searchit').on('keyup',function(){
					var searchText=$(this).val();
					thisul.find("li").each(function(){
						if($(this).text().indexOf(searchText)>-1){
							$(this).show();
						}
						else{
							$(this).hide();
						}
					});
				});
				thisul.find("li").unbind().click(function(){
					var ids = "";
					var str_val = "";
					if($(this).find('input').is(':checked')){
						$(this).find("input").attr("checked",'false');
						$(this).find("input").removeAttr("checked");
					}
					else{
						$(this).find("input").attr("checked",'true');
					}
					$(this).parent().find(":checkbox").each(function(i){
					    if($(this).attr("checked")) {
					    	ids += $(this).parent("li").attr("data-id")+"|";
							str_val += $(this).parent("li").text()+"|";
					   }
					});
					thisinput.attr('data-values',str_val);
					thisinput.val(str_val);
					//存在汉字
					if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).text())){
						limitShow(8,thisinput);
					}else{
						limitShow(16,thisinput);
					}
					thisinput.attr("data-ids",ids);
					thisinput.css('color','#000');
					
					
					//thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
		
		//所有权限下拉选择框
		$('.text-meau').find(".select-item").unbind().on('click',function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			var thisdiv=$(this).parent(); 
			if(thisul.css("display")=="none"){
				if(thisul.height()>150){thisul.css({height:"150"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find(".searchit").focus();
				thisul.find('.searchit').on('keyup',function(){
					var searchText=$(this).val();
					thisul.find("li").each(function(){
						if($(this).text().indexOf(searchText)>-1){
							$(this).show();
						}
						else{
							$(this).hide();
						}
					});
				});
				thisul.find("li").unbind().click(function(){
					var ids = "";
					var str_val = "";
					if($(this).find('input').is(':checked')){
						$(this).find("input").attr("checked",'false');
						$(this).find("input").removeAttr("checked");
					}
					else{
						$(this).find("input").attr("checked",'true');
					}
					$(this).parent().find(":checkbox").each(function(i){
					    if($(this).attr("checked")) {
					    	ids += $(this).parent("li").attr("data-id")+"|";
							str_val += $(this).parent("li").text()+"|";
					   }
					});
					thisinput.attr('data-values',str_val);
					thisinput.val(str_val);
					//存在汉字
					if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).text())){
						limitShow(8,thisinput);
					}else{
						limitShow(16,thisinput);
					}
					thisinput.attr("data-ids",ids);
					thisinput.css('color','#000');
					
					
					//thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
		
		//组下拉选择框
		$('.text-groups').find(".select-item").unbind().on('click',function(){
			var thisinput=$(this);
			var thisul=$(this).parent().find("ul");
			if(thisul.css("display")=="none"){
				if(thisul.height()>100){thisul.css({height:"100"+"px","overflow-y":"scroll" });}
				thisul.fadeIn("100");
				thisul.hover(function(){},function(){thisul.fadeOut("100");});
				thisul.find("input").focus();
				thisul.find('.searchit').on('keyup',function(){
					var searchText=$(this).val();
					thisul.find("li").each(function(){
						if($(this).text().indexOf(searchText)>-1){
							$(this).show();
						}
						else{
							$(this).hide();
						}
					});
				});
				thisul.find("li").unbind().click(function(){
					var ids = "";
					var str_val = "";
					if($(this).find('input').is(':checked')){
						$(this).find("input").attr("checked",'false');
						$(this).find("input").removeAttr("checked");
					}
					else{
						$(this).find("input").attr("checked",'true');
					}
					$(this).parent().find(":checkbox").each(function(i){
					    if($(this).attr("checked")) {
					    	ids += $(this).parent("li").attr("data-id")+"|";
							str_val += $(this).parent("li").text()+"|";
					   }
					});
					
					if(str_val != ""){
						thisinput.attr('value',str_val);
						//存在汉字
						if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).text())){
							limitShow(8,thisinput);
						}else{
							limitShow(16,thisinput);
						}
						thisinput.attr("data-ids",ids);
						thisinput.css('color','#000');
					}
					else{
						thisinput.attr('value',"请选择管理组别");
						thisinput.css('color','#ccc');
					}
					
					//thisul.fadeOut("100");
				}).hover(function(){$(this).addClass("select-hover");},		
				function(){$(this).removeClass("select-hover");});
			}
			else{
				thisul.fadeOut("fast");
			}
		});
		// 文本框得到鼠标焦点
		$(".dialog-list").delegate(".dialog-textarea","focus",function(){
		//$(".dialog-textarea").focus(function(){     
		// 得到当前文本框的值    
			var txt_value =  ($(this).val());   
			if(($(this).val()) == "请输入备注内容"){
			// 如果符合条件，则清空文本框内容       
				$(this).val("");           
				pre_str = '请输入备注内容';
			}else{
				if($(this).hasClass('remark-textarea')){
					pre_str = '请输入备注内容';
				}else{
					pre_str = '';
				}
			}
			$(this).css('color','#000');
		});
		
		// 文本框失去鼠标焦点
		$(".dialog-list").delegate(".dialog-textarea","blur",function(){
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css('color','#ccc');
			}
		});
		
		//文本框限制字数
		$(".dialog-list").delegate(".dialog-textarea","keyup",function(){
			var thistext = $(this);
			limitInput(256,thistext);
		});
		
		// 输入框得到鼠标焦点
		$(".dialog-list").delegate(".dialog-input","focus",function(){   
		// 得到当前文本框的值      
			if($(this).val() == "请输入组别名称"){   
				$(this).val("");           
				pre_str = '请输入组别名称';
			}else if($(this).val() == "请输入角色名"){
				$(this).val("");           
				pre_str = '请输入角色名';
			}else if($(this).val() == "请输入工号"){
				$(this).val("");           
				pre_str = '请输入工号';
			}else if($(this).val() == "请输入姓名"){
				$(this).val("");           
				pre_str = '请输入姓名';
			}else if($(this).val() == "请输入密码"){
				$(this).val("");           
				pre_str = '请输入密码';
			}else if($(this).val() == "请输入旧密码"){
				$(this).val("");           
				pre_str = '请输入旧密码';
			}else if($(this).val() == "请输入新密码"){
				$(this).val("");           
				pre_str = '请输入新密码';
			}else if($(this).val() == "请输入确认密码"){
				$(this).val("");           
				pre_str = '请输入确认密码';
			}else if($(this).val() == "请输入邮箱"){
				$(this).val("");           
				pre_str = '请输入邮箱';
			}else if($(this).val() == "请输入联系方式"){
				$(this).val("");           
				pre_str = '请输入联系方式';
			}else if($(this).val() == "请输入权限名称"){
				$(this).val("");           
				pre_str = '请输入权限名称';
			}else if($(this).val() == "请输入资源地址"){
				$(this).val("");           
				pre_str = '请输入资源地址';
			}
			else{
				if($(this).hasClass('groupName')){
					pre_str = '请输入组别名称';
				}else if($(this).hasClass('roleName')){
					pre_str = '请输入角色名';
				}else if($(this).hasClass('code')){     
					pre_str = '请输入工号';
				}else if($(this).hasClass('name')){
					pre_str = '请输入姓名';
				}else if($(this).hasClass('pwd')){
					pre_str = '请输入密码';
				}else if($(this).hasClass('oldpwd')){
					pre_str = '请输入旧密码';
				}else if($(this).hasClass('newpwd')){
					pre_str = '请输入新密码';
				}else if($(this).hasClass('repwd')){
					pre_str = '请输入确认密码';
				}else if($(this).hasClass('meauname')){
					pre_str = '请输入权限名称';
				}else if($(this).hasClass('meauurl')){
					pre_str = '请输入资源地址';
				}else if($(this).hasClass('email')){
					pre_str = '请输入邮箱';
				}else if($(this).hasClass('mobile')){
					pre_str = '请输入联系方式';
				}else{
					pre_str = '';
				}
			}
			$(this).css('color','#000');
		});
		
		// 输入框失去鼠标焦点 
		$(".dialog-list").delegate(".dialog-input","blur",function(){   
			if($.trim($(this).val()) == $.trim("")){  
				// 如果符合条件，则设置内容
				$(this).val(pre_str); 
				$(this).css('color','#ccc');
			}
		});													
		
    });
	//点击关闭按钮的时候，遮罩层关闭
	$(".close").click(function () {
    	closeDialogBox();
    });
});

//遮罩层关闭
function closeDialogBox(){
	$(".dialog-bg,.dialog-box").css("display", "none");
    $(".group-box").hide();
    $(".groupMember-box").hide();
    $(".role-box").hide();
    $(".project-box").hide();
    $(".pm-box").hide();
    $(".modifyPM-box").hide();
    $(".staff-box").hide();
    $(".staffM-box").hide();
    $(".pwd-box").hide();
    $(".modifyPwd-box").hide();
    $(".meau-box").hide();
    $(".modifyMeau-box").hide();
    $(".detailBug-box").hide();
}
//获取全员（多选）
function getAllPersonList(usercodes,thisul){
	var ids = usercodes.split('|'); 
	$.ajax({
		type : "post",  
	    url : urlfile + "main/userListAfterManage",
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
//			console.log(data);
			if(data.code == 1) {
				var strhtml_selectUl = '';
				strhtml_selectUl += '<input type="text" style="width:200px;" class="searchit"></input>';
				for(var i = 0 ; i < data.data.length ; i++){
					var ischecked = false;
					for(var j=0;j<ids.length;j++){
						if(ids[j] == data.data[i].code){
							ischecked = true;
							continue;
						}
					}
					if(ischecked){
						strhtml_selectUl += '<li data-id="'+data.data[i].code+'" data-value="'+data.data[i].name+'">'+'<input type="checkbox" name="checkbox" checked="true"/>'+data.data[i].name+'</li>';
					}
					else{
						strhtml_selectUl += '<li data-id="'+data.data[i].code+'" data-value="'+data.data[i].name+'">'+'<input type="checkbox" name="checkbox"/>'+data.data[i].name+'</li>';
					}
				}
				thisul.html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取全员（单选）
function getAllUserList(thisul){
	$.ajax({
		type : "post",  
	    url : urlfile + "main/userListAfterManage",
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
//			console.log(data);
			if(data.code == 1) {
				var strhtml_selectUl = '';
				strhtml_selectUl += '<input type="text" style="width:200px;" class="searchit"></input>';
				for(var i = 0 ; i < data.data.length ; i++){
						strhtml_selectUl += '<li data-id="'+data.data[i].code+'" data-value="'+data.data[i].name+'">'+data.data[i].name+'</li>';
				}
				thisul.html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取项目经理
function getAllPMList(){
	$.ajax({
		type : "post",  
	    url : urlfile + "main/allProjectManager",
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].usercode+'">'+data.data[i].manageName+'</li>';
				}
				$('.text-pm').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//获取权限
function getAllFunctionList(fids){
	var ids=new Array(); 
	if(''!=fids){
		fids=fids.substr(0,fids.length-1);
		ids = fids.split('|'); 
	}
	$.ajax({
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
				var strhtml_selectUl = '';
				strhtml_selectUl += '<input type="text" style="width:200px;" class="searchit"></input>';
				for(var i = 0 ; i < data.data.length ; i++){
					var ischecked = false;
					for(var j=0;j<ids.length;j++){
						if(ids[j] == data.data[i].crfntUnid){
							ischecked = true;
							continue;
						}
					}
					if(ischecked){
						strhtml_selectUl += '<li data-id="'+data.data[i].crfntUnid+'" data-value="'+data.data[i].crfntFunName+'" ><input type="checkbox" name="checkbox" checked="true" />'+data.data[i].crfntFunName+'</li>';
					}else{
						strhtml_selectUl += '<li data-id="'+data.data[i].crfntUnid+'" data-value="'+data.data[i].crfntFunName+'" ><input type="checkbox" name="checkbox"/>'+data.data[i].crfntFunName+'</li>';
					}
				}
//				console.log("strhtml_selectUl:"+strhtml_selectUl);
				$('.text-meau').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	});	 
}

//获取角色
function getAllRoleList(roles){
	var ids=new Array(); 
	if(''!=roles){
		roles=roles.substr(0,roles.length-1);
		ids = roles.split('|'); 
	}
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
				var strhtml_selectUl = '';
				strhtml_selectUl += '<input type="text" style="width:200px;" class="searchit"></input>';
				for(var i = 0 ; i < data.data.length ; i++){
					var ischecked = false;
					for(var j=0;j<ids.length;j++){
						if(ids[j] == data.data[i].id){
							ischecked = true;
							continue;
						}
					}
					if(ischecked){
						strhtml_selectUl += '<li data-id="'+data.data[i].id+'" data-value="'+data.data[i].name+'" ><input type="checkbox" name="checkbox" checked="true" />'+data.data[i].name+'</li>';
					}else{
						strhtml_selectUl += '<li data-id="'+data.data[i].id+'" data-value="'+data.data[i].name+'" ><input type="checkbox" name="checkbox"/>'+data.data[i].name+'</li>';
					}
					
				}
				$('.text-role').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	});	 
}
//获取组别
function getAllGroupList(){
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].id+'">'+data.data[i].name+'</li>';
				}
				$('.text-group').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取组别
function getAllGroupsList(usercode,group_ids){
	if(usercode == ""){
		$.ajax({
			type : "post",  
		    url : urlfile + "main/findGroupList",
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
					var strhtml_selectUl = '';
					for(var i = 0 ; i < data.data.length ; i++){
						strhtml_selectUl += '<li data-id="'+data.data[i].id+'">'+'<input type="checkbox" name="checkbox"/>'+data.data[i].name+'</li>';
					}
					$('.text-groups').find('.select-ul').html(strhtml_selectUl);
				} else {
					alert(data.errMsg);
				}
			}		
		}); 
	}
	else{
		var ids = group_ids.split('|'); 
		var strdata = "USERCODE="+usercode+"&TYPE=1";
		$.ajax({
			data : strdata,
			type : "post",  
		    url : urlfile + "main/findGroupList",
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
					var strhtml_selectUl = '';
					for(var i = 0 ; i < data.data.length ; i++){
						var ischecked = false;
						for(var j=0;j<ids.length;j++){
							if(ids[j] == data.data[i].id){
								ischecked = true;
								continue;
							}
						}
						if(ischecked){
							strhtml_selectUl += '<li data-id="'+data.data[i].id+'">'+'<input type="checkbox" name="checkbox" checked="true"/>'+data.data[i].name+'</li>';
						}
						else{
							strhtml_selectUl += '<li data-id="'+data.data[i].id+'">'+'<input type="checkbox" name="checkbox"/>'+data.data[i].name+'</li>';
						}
					}
					$('.text-groups').find('.select-ul').html(strhtml_selectUl);
				} else {
					alert(data.errMsg);
				}
			}		
		}); 
	}
	
	
}
//添加角色信息
function setAddRole(roleName,remarks,meauIds){
	$.ajax({
		data:"NAME="+roleName+"&REMARKS="+remarks+"&PERMISSIONS="+meauIds,
		type : "post",  
	    url : urlfile + "admin/addRole",
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
                alert("添加角色成功！");
                closeDialogBox();
                showRoleList();
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改角色信息
function setModifyRole(roleId,roleName,remarks,meauIds){
	$.ajax({
		data:"ID="+roleId+"&NAME="+roleName+"&REMARKS="+remarks+"&PERMISSIONS="+meauIds,
		type : "post",  
	    url : urlfile + "admin/updateRole",
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
                alert("修改角色成功！");
                closeDialogBox();
                showRoleList();
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//添加组别信息
function setAddGroup(groupName,userId){
	$.ajax({
		data:"NAME="+groupName+"&USERCODE="+userId,
		type : "post",  
	    url : urlfile + "admin/addGroup",
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
                alert("添加组别成功！");
                closeDialogBox();
                showGroupList();
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改组别信息
function setModifyGroup(groupId,groupName,userId){
	$.ajax({
		data:"ID="+groupId+"&NAME="+groupName+"&USERCODE="+userId,
		type : "post",  
	    url : urlfile + "admin/updateGroup ",
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
                alert("修改组别成功！");
                closeDialogBox();
                showGroupList();
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//成员管理
function addGroupUser(json_obj){
	$.ajax({
		data:"USERCODES="+json_obj.usercodes+"&NAMES="+json_obj.usernames+"&GROUP_ID="+json_obj.groupId,
		type : "post",  
	    url : urlfile + "admin/addGroupUser ",
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
                alert("添加组别下人员成功！");
                closeDialogBox();
                showGroupList();
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//修改项目信息
function setModifyProject(projectId,projectName,startTime,endTime,remarks,usercode,projectStatus,pagenum){
//	console.log(projectId+'=='+projectName+'=='+startTime+'=='+endTime+'=='+remarks+'=='+usercode+'=='+projectStatus+'=='+pagenum);
	$.ajax({
		data:"PROJECT_ID="+ projectId+"&PROJECT_NAME="+ projectName+"&STARTTIME="+startTime+"&ENDTIME="+endTime+"&REMARKS="+remarks+"&USERCODE="+usercode+"&STATUS="+projectStatus,
		type : "post",  
	    url : urlfile + "project/updateProject",
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
                alert("修改项目成功！");
                closeDialogBox();
                showProjectList(pagenum,'','');
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//添加修改项目经理信息
//function setAddExecutives(pm_code,pm_name,pm_pwd,pm_groupIds){
//	$.ajax({
//		data : "USERCODE="+pm_code+"&NAME="+pm_name+"&PWD="+pm_pwd+"&GROUP_IDS="+ pm_groupIds,
//		type : "post",  
//	    url : urlfile + "main/addExecutives",
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
//                alert(data.errMsg);
//                closeDialogBox();
//                showPMList();
//			} else {
//				alert(data.errMsg);
//			}
//		}	
//	});
//}

//添加员工信息
function setAddStaff(staff_code,staff_name,staff_pwd,staff_email,staff_mobile,staff_roleIds){
//	console.log(staff_code+'=='+staff_name+'=='+staff_pwd+'=='+staff_email+'=='+staff_mobile+'=='+staff_roleIds);
	$.ajax({
		data : "USERCODE="+staff_code+"&USERNAME="+encodeURIComponent(staff_name)+"&PWD="+encodeURIComponent(staff_pwd)+"&MOBILE="+ encodeURIComponent(staff_mobile)+"&EMAIL="+ encodeURIComponent(staff_email)+"&ROLES="+encodeURIComponent(staff_roleIds),
		processData:false,
		type : "post",  
	    url : urlfile + "admin/addUser",
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
                alert("添加成功！");
                closeDialogBox();
                showStaffList(1,'');
			} else {
				alert(data.errMsg);
			}
		}	
	});
}
//显示最后一页普通员工列表
function getStaffMaxPage(){
	$.ajax({
		data : "PAGENUM=1&PAGESIZE=14",
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
				showStaffList(Math.ceil(data.data.count/10),'');
			} else {
				alert(data.errMsg);
			}
		}		
	});
}
//修改员工信息
function setModifyStaff(staff_code,staff_name,staff_email,staff_mobile,staff_roleIds,staff_status,pagenum){
	$.ajax({
		data : "USERCODE="+staff_code+"&USERNAME="+staff_name+"&ROLES="+ staff_roleIds+"&MOBILE="+ staff_mobile+"&EMAIL="+staff_email+"&STATUS="+staff_status,
		type : "post",  
	    url : urlfile + "admin/updateUser",
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
                alert("修改成功！");
                closeDialogBox();
                showStaffList(pagenum,'');
			} else {
				alert(data.errMsg);
			}
		}	
	});
}
//重置密码
function resetModifyPwd(code,page){
	$.ajax({
		data : "CODE="+code,
		type : "post",  
	    url : urlfile + "admin/resetPwd",
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
                alert("重置成功！");
                closeDialogBox();
//                thisbtn.attr('data-oldPwd',newpwd);
//                if(thisbtn.next().hasClass('modifyPM-btn')){
//                	thisbtn.next().attr('data-pwd',newpwd);
//                }
                showStaffList(page,'');
			} else {
				alert(data.errMsg);
			}
		}	
	});
}

//以下为bug管理模块
//添加bug中所属项目改变项目
function bugProChange(boxclass){
	var thisbox;
	if(boxclass == "bug-box"){
		thisbox = $(".bug-box");
	}else if(boxclass == "modifyMeau-box"){
		thisbox = $(".modifyMeau-box");
	}
	//var thisbox = $(".bug-box");
	var proId = thisbox.find(".text-bugPro").find(".select-item").attr("data-id");
	thisbox.find(".text-bugModel").find(".select-item").val("");
	thisbox.find(".text-bugModel").find(".select-item").attr("data-id","");
	//模块
	getModelByPIdList(proId);
	//人员
	thisbox.find(".text-bugAssigned").find(".select-item").val("");
	thisbox.find(".text-bugAssigned").find(".select-item").attr("data-id","");
	getUsersByPIdList(proId);
}
//获取所有项目
function getAllProjectList(){
	$.ajax({
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
				var strhtml_selectUl = '';
				strhtml_selectUl += '<input type="text" style="width:200px;" class="searchit"></input>';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].id+'" data-value="'+data.data[i].name+'">'+data.data[i].name+'</li>';
				}
				$('.text-bugPro').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
/*function getAllProjectList(){
	$.ajax({
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].id+'" data-value="'+data.data[i].name+'">'+data.data[i].name+'</li>';
				}
				$('.text-bugPro').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}*/
//获取项目下所有模块
function getModelByPIdList(proId){
	$.ajax({
		data : "PROJECT_ID="+proId,
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.modelVOList.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data.modelVOList[i].id+'" data-value="'+data.data.modelVOList[i].name+'">'+data.data.modelVOList[i].name+'</li>';
				}
				$('.text-bugModel').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//获取项目下人员信息
function getUsersByPIdList(proId){
	$.ajax({
		data : "ID="+proId,
		type : "post",  
	    url : urlfile + "main/getJoinUserByProject",
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
				var strhtml_selectUl = '';
				for(var i = 0 ; i < data.data.length ; i++){
					strhtml_selectUl += '<li data-id="'+data.data[i].usercode+'">'+data.data[i].userName+'</li>';
				}
				$('.text-bugAssigned').find('.select-ul').html(strhtml_selectUl);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改bug中获得bug详情
function showBugDetail(bugId,thisbox){
	$.ajax({
		data : "BUGID="+ bugId,
		type : "post",  
	    url : urlfile + "bug/getBugsbyId",
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
				var systemType_value = "";
				if(data.data.systemType == 0){
					systemType_value = "全部";
				}else if(data.data.systemType == 1){
					systemType_value = "Windows";
				}else if(data.data.systemType == 2){
					systemType_value = "Windows 8";
				}else if(data.data.systemType == 3){
					systemType_value = "Windows 7";
				}else if(data.data.systemType == 4){
					systemType_value = "Windows Vista";
				}else if(data.data.systemType == 5){
					systemType_value = "Windows XP";
				}else if(data.data.systemType == 6){
					systemType_value = "Windows 2012";
				}else if(data.data.systemType == 7){
					systemType_value = "Windows 2008";
				}else if(data.data.systemType == 8){
					systemType_value = "Windows 2003";
				}else if(data.data.systemType == 9){
					systemType_value = "Windows 2000";
				}else if(data.data.systemType == 10){
					systemType_value = "Android";
				}else if(data.data.systemType == 11){
					systemType_value = "IOS";
				}else if(data.data.systemType == 12){
					systemType_value = "WP8";
				}else if(data.data.systemType == 13){
					systemType_value = "WP7";
				}else if(data.data.systemType == 14){
					systemType_value = "Symbian";
				}else if(data.data.systemType == 15){
					systemType_value = "Linux";
				}else if(data.data.systemType == 16){
					systemType_value = "FreeBSD";
				}else if(data.data.systemType == 17){
					systemType_value = "OS X";
				}else if(data.data.systemType == 18){
					systemType_value = "Unix";
				}else if(data.data.systemType == 19){
					systemType_value = "其他";
				}
				
				var browser_value = "";
				if(data.data.browser == 0){
					browser_value = "全部";
				}else if(data.data.browser == 1){
					browser_value = "IE系列";
				}else if(data.data.browser == 2){
					browser_value = "IE11";
				}else if(data.data.browser == 3){
					browser_value = "IE10";
				}else if(data.data.browser == 4){
					browser_value = "IE9";
				}else if(data.data.browser == 5){
					browser_value = "IE8";
				}else if(data.data.browser == 6){
					browser_value = "IE7";
				}else if(data.data.browser == 7){
					browser_value = "IE6";
				}else if(data.data.browser == 8){
					browser_value = "chrome";
				}else if(data.data.browser == 9){
					browser_value = "firefox系列";
				}else if(data.data.browser == 10){
					browser_value = "firefox4";
				}else if(data.data.browser == 11){
					browser_value = "firefox3";
				}else if(data.data.browser == 12){
					browser_value = "firefox2";
				}else if(data.data.browser == 13){
					browser_value = "opera系列";
				}else if(data.data.browser == 14){
					browser_value = "opera11";
				}else if(data.data.browser == 15){
					browser_value = "opera10";
				}else if(data.data.browser == 16){
					browser_value = "opera9";
				}else if(data.data.browser == 17){
					browser_value = "safari";
				}else if(data.data.browser == 18){
					browser_value = "傲游";
				}else if(data.data.browser == 19){
					browser_value = "UC";
				}else if(data.data.browser == 20){
					browser_value = "360";
				}else if(data.data.browser == 21){
					browser_value = "其他";
				}
				
				var bugType_value = "";
				if(data.data.bugType == 0){
					bugType_value = "代码错误";
				}else if(data.data.bugType == 1){
					bugType_value = "界面优化";
				}else if(data.data.bugType == 2){
					bugType_value = "设计缺陷";
				}else if(data.data.bugType == 3){
					bugType_value = "配置相关";
				}else if(data.data.bugType == 4){
					bugType_value = "安装部署";
				}else if(data.data.bugType == 5){
					bugType_value = "安全相关";
				}else if(data.data.bugType == 6){
					bugType_value = "性能问题";
				}else if(data.data.bugType == 7){
					bugType_value = "标准规范";
				}else if(data.data.bugType == 8){
					bugType_value = "测试脚本";
				}else if(data.data.bugType == 9){
					bugType_value = "其他";
				}
				
				var status_value = "";
				if(data.data.status == "0"){
					status_value = "Unsolved";
				}else if(data.data.status == "1"){
					status_value = "Solving";
				}else if(data.data.status == "2"){
					status_value = "ByDesign";
				}else if(data.data.status == "3"){
					status_value = "Duplicate";
				}else if(data.data.status == "4"){
					status_value = "NotRepro";
				}else if(data.data.status == "5"){
					status_value = "Fixed";
				}else if(data.data.status == "6"){
					status_value = "External";
				}else if(data.data.status == "7"){
					status_value = "Postponed";
				}else if(data.data.status == "8"){
					status_value = "WonotFix";
				}else if(data.data.status == "9"){
					status_value = "Solved";
				}else if(data.data.status == "10"){
					status_value = "Processed";
				}
                thisbox.find(".text-bugLevel").find(".select-item").attr("data-id",data.data.level);
                thisbox.find(".text-bugLevel").find(".select-item").val(data.data.level);
                //thisbox.find(".text-bugLevel").find(".select-item").attr("value",data.data.level);
				thisbox.find(".text-bugSeverity").find(".select-item").attr("data-id",data.data.severity);
				thisbox.find(".text-bugSeverity").find(".select-item").val(data.data.severity);
				//thisbox.find(".text-bugSeverity").find(".select-item").attr("value",data.data.severity);
				thisbox.find(".bugTitle").val(data.data.title);
				thisbox.find(".text-bugPro").find(".select-item").attr("data-id",data.data.projectId);
				thisbox.find(".text-bugPro").find(".select-item").attr("data-value",data.data.projectName);
				thisbox.find(".text-bugPro").find(".select-item").val(data.data.projectName);
				//thisbox.find(".text-bugPro").find(".select-item").attr("value",data.data.projectName);
				thisbox.find(".text-bugModel").find(".select-item").attr("data-id",data.data.modelId);
				thisbox.find(".text-bugModel").find(".select-item").val(data.data.modelName);
				//thisbox.find(".text-bugModel").find(".select-item").attr("value",data.data.modelName);
				thisbox.find(".bugAffectVersion").val(data.data.affectVersion);
				thisbox.find(".text-bugSystemType").find(".select-item").attr("data-id",data.data.systemType);
				thisbox.find(".text-bugSystemType").find(".select-item").val(systemType_value);
				//thisbox.find(".text-bugSystemType").find(".select-item").attr("value",systemType_value);
				thisbox.find(".text-bugBrowser").find(".select-item").attr("data-id",data.data.browser);
				thisbox.find(".text-bugBrowser").find(".select-item").val(browser_value);
				//thisbox.find(".text-bugBrowser").find(".select-item").attr("value",browser_value);
				thisbox.find(".text-bugType").find(".select-item").attr("data-id",data.data.bugType);
				thisbox.find(".text-bugType").find(".select-item").val(bugType_value);
				//thisbox.find(".text-bugType").find(".select-item").attr("value",bugType_value);
				thisbox.find(".text-bugStatus").find(".select-item").attr("data-id",data.data.status);
				thisbox.find(".text-bugStatus").find(".select-item").val(status_value);
				//thisbox.find(".text-bugStatus").find(".select-item").attr("value",status_value);
				thisbox.find(".text-bugAssigned").find(".select-item").attr("data-id",data.data.assignedCode);
				thisbox.find(".text-bugAssigned").find(".select-item").val(data.data.assignedName);
				//thisbox.find(".text-bugAssigned").find(".select-item").attr("value",data.data.assignedName);
				CKEDITOR.instances.bugModifyContent.setData(data.data.content);
				thisbox.find(".bugRemarks").val(data.data.remarks);
				thisbox.find(".bugAssignedRecord").html(data.data.assignedRecord);
				thisbox.find(".bugStatusRecord").html(data.data.statusRecord);
				thisbox.find(".dialog-btn").attr("data-id",data.data.id);
				sessionStorage.setItem("oldStatus",data.data.status);
				sessionStorage.setItem("oldAssignedcode",data.data.assignedCode);
				var proId = thisbox.find(".text-bugPro").find(".select-item").attr("data-id");
				//模块
				getModelByPIdList(proId);
				//人员
				getUsersByPIdList(proId);
				//存在汉字
				thisbox.find(".select-item").each(function(){
					if(/.*[\u4e00-\u9fa5]+.*$/.test($(this).val())){
						limitShow(8,$(this));
					}else{
						limitShow(16,$(this));
					}
				});
				
			} else {
				alert(data.errMsg);
			}
		}	
	});
}
//获得bug详情
function showBugDetailList(bugId,thisbox){
	$.ajax({
		data : "BUGID="+ bugId,
		type : "post",  
	    url : urlfile + "bug/getBugsbyId",
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
				var systemType_value = "";
				if(data.data.systemType == 0){
					systemType_value = "全部";
				}else if(data.data.systemType == 1){
					systemType_value = "Windows";
				}else if(data.data.systemType == 2){
					systemType_value = "Windows 8";
				}else if(data.data.systemType == 3){
					systemType_value = "Windows 7";
				}else if(data.data.systemType == 4){
					systemType_value = "Windows Vista";
				}else if(data.data.systemType == 5){
					systemType_value = "Windows XP";
				}else if(data.data.systemType == 6){
					systemType_value = "Windows 2012";
				}else if(data.data.systemType == 7){
					systemType_value = "Windows 2008";
				}else if(data.data.systemType == 8){
					systemType_value = "Windows 2003";
				}else if(data.data.systemType == 9){
					systemType_value = "Windows 2000";
				}else if(data.data.systemType == 10){
					systemType_value = "Android";
				}else if(data.data.systemType == 11){
					systemType_value = "IOS";
				}else if(data.data.systemType == 12){
					systemType_value = "WP8";
				}else if(data.data.systemType == 13){
					systemType_value = "WP7";
				}else if(data.data.systemType == 14){
					systemType_value = "Symbian";
				}else if(data.data.systemType == 15){
					systemType_value = "Linux";
				}else if(data.data.systemType == 16){
					systemType_value = "FreeBSD";
				}else if(data.data.systemType == 17){
					systemType_value = "OS X";
				}else if(data.data.systemType == 18){
					systemType_value = "Unix";
				}else if(data.data.systemType == 19){
					systemType_value = "其他";
				}
				
				var browser_value = "";
				if(data.data.browser == 0){
					browser_value = "全部";
				}else if(data.data.browser == 1){
					browser_value = "IE系列";
				}else if(data.data.browser == 2){
					browser_value = "IE11";
				}else if(data.data.browser == 3){
					browser_value = "IE10";
				}else if(data.data.browser == 4){
					browser_value = "IE9";
				}else if(data.data.browser == 5){
					browser_value = "IE8";
				}else if(data.data.browser == 6){
					browser_value = "IE7";
				}else if(data.data.browser == 7){
					browser_value = "IE6";
				}else if(data.data.browser == 8){
					browser_value = "chrome";
				}else if(data.data.browser == 9){
					browser_value = "firefox系列";
				}else if(data.data.browser == 10){
					browser_value = "firefox4";
				}else if(data.data.browser == 11){
					browser_value = "firefox3";
				}else if(data.data.browser == 12){
					browser_value = "firefox2";
				}else if(data.data.browser == 13){
					browser_value = "opera系列";
				}else if(data.data.browser == 14){
					browser_value = "opera11";
				}else if(data.data.browser == 15){
					browser_value = "opera10";
				}else if(data.data.browser == 16){
					browser_value = "opera9";
				}else if(data.data.browser == 17){
					browser_value = "safari";
				}else if(data.data.browser == 18){
					browser_value = "傲游";
				}else if(data.data.browser == 19){
					browser_value = "UC";
				}else if(data.data.browser == 20){
					browser_value = "360";
				}else if(data.data.browser == 21){
					browser_value = "其他";
				}
				
				var bugType_value = "";
				if(data.data.bugType == 0){
					bugType_value = "代码错误";
				}else if(data.data.bugType == 1){
					bugType_value = "界面优化";
				}else if(data.data.bugType == 2){
					bugType_value = "设计缺陷";
				}else if(data.data.bugType == 3){
					bugType_value = "配置相关";
				}else if(data.data.bugType == 4){
					bugType_value = "安装部署";
				}else if(data.data.bugType == 5){
					bugType_value = "安全相关";
				}else if(data.data.bugType == 6){
					bugType_value = "性能问题";
				}else if(data.data.bugType == 7){
					bugType_value = "标准规范";
				}else if(data.data.bugType == 8){
					bugType_value = "测试脚本";
				}else if(data.data.bugType == 9){
					bugType_value = "其他";
				}
				
				var status_value = "";
				if(data.data.status == "0"){
					status_value = "Unsolved";
				}else if(data.data.status == "1"){
					status_value = "Solving";
				}else if(data.data.status == "2"){
					status_value = "ByDesign";
				}else if(data.data.status == "3"){
					status_value = "Duplicate";
				}else if(data.data.status == "4"){
					status_value = "NotRepro";
				}else if(data.data.status == "5"){
					status_value = "Fixed";
				}else if(data.data.status == "6"){
					status_value = "External";
				}else if(data.data.status == "7"){
					status_value = "Postponed";
				}else if(data.data.status == "8"){
					status_value = "WonotFix";
				}else if(data.data.status == "9"){
					status_value = "Solved";
				}else if(data.data.status == "10"){
					status_value = "Processed";
				}

                thisbox.find(".text-bugLevel").html(data.data.level);
				thisbox.find(".text-bugSeverity").html(data.data.severity);
				thisbox.find(".bugTitle").html(data.data.title);
				thisbox.find(".text-bugPro").html(data.data.projectName);
				thisbox.find(".text-bugModel").html(data.data.modelName);
				thisbox.find(".bugAffectVersion").html(data.data.affectVersion);
				thisbox.find(".text-bugSystemType").html(systemType_value);
				thisbox.find(".text-bugBrowser").html(browser_value);
				thisbox.find(".text-bugType").html(bugType_value);
				thisbox.find(".text-bugStatus").html(status_value);
				thisbox.find(".text-bugAssigned").html(data.data.assignedName);
				thisbox.find(".text-bugCreator").html(data.data.name);
				thisbox.find(".text-bugCreatTime").html(new Date(data.data.addTime).Format("yyyy-MM-dd hh:mm:ss"));
				thisbox.find(".bugContents").html(data.data.content);
				thisbox.find(".bugRemarks").html(data.data.remarks);
				thisbox.find(".bugAssignedRecord").html(data.data.assignedRecord);
				thisbox.find(".bugStatusRecord").html(data.data.statusRecord);
			} else {
				alert(data.errMsg);
			}
		}	
	});
}
//增加bug
function insertbugs(json_data){
	$.ajax({
		data : "LEVEL="+json_data.bugLevel+"&TITLE="+json_data.bugTitle+"&STATUS="+json_data.bugStatus+"&SEVERITY="+json_data.bugSeverity+"&PROJECTID="+json_data.bugPro
		+"&PROJECTNAME="+json_data.bugPro_val+"&MODELID="+json_data.bugModel+"&USERCODE="+json_data.usercode+"&NAME="+json_data.username+"&CONTENT="+json_data.bugContent
		+"&ASSIGNEDCODE="+json_data.bugAssigned+"&ASSIGNEDNAME="+json_data.bugAssigned_val+"&BUGTYPE="+json_data.bugType+"&AFFECTVERSION="+json_data.bugAffectVersion
		+"&SYSTEMTYPE="+json_data.bugSystemType+"&BROWSER="+json_data.bugBrowser+"&REMARKS="+json_data.bugRemarks,
		type : "post",  
	    url : urlfile + "bug/insertBug",
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
				alert("添加成功！");
				closeDialogBox();
				$(".searchBugProName").val("");
				$(".searchBugAssigned").val("");
				$(".searchBugTitle").val("");
				$(".searchBugStatus").find(".select-item").attr("data-id",99);
				$(".searchBugStatus").find(".select-item").val("All");
				showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),'','','',99,1);
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}
//修改bug
function updatebugs(json_obj){
	$.ajax({
		data : "OLD_STATUS="+json_obj.oldStatus+"&OLD_ASSIGNEDCODE="+json_obj.oldAssignedcode+"&USERNAME="+json_obj.username
				+"&ID="+json_obj.bugId+"&LEVEL="+json_obj.bugLevel+"&TITLE="+json_obj.bugTitle+"&STATUS="+json_obj.bugStatus+"&SEVERITY="+json_obj.bugSeverity
				+"&PROJECTID="+json_obj.bugPro+"&PROJECTNAME="+json_obj.bugPro_val+"&MODELID="+json_obj.bugModel+"&CONTENT="+json_obj.bugModifyContent
				+"&ASSIGNEDCODE="+json_obj.bugAssigned+"&ASSIGNEDNAME="+json_obj.bugAssigned_val+"&BUGTYPE="+json_obj.bugType+"&AFFECTVERSION="+json_obj.bugAffectVersion
				+"&SYSTEMTYPE="+json_obj.bugSystemType+"&BROWSER="+json_obj.bugBrowser+"&REMARKS="+json_obj.bugRemarks,
		type : "post",  
	    url : urlfile + "bug/updateBugs",
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
				alert("修改成功！");
				closeDialogBox();
				var proName = $(".searchBugProName").val();
				var assigned = $(".searchBugAssigned").val();
				var title = $(".searchBugTitle").val();
				var status = $(".searchBugStatus").find(".select-item").attr("data-id");
				showBugList(sessionStorage.getItem("roleId"),sessionStorage.getItem("code"),proName,assigned,title,status,$(".backpage").attr("data-pagenum"));
			} else {
				alert(data.errMsg);
			}
		}		
	}); 
}

//添加功能菜单
function setAddMeau(meau_name,meau_url,meau_status){
//	console.log(meau_name+'='+meau_url+'+'+meau_status);
	$.ajax({
		data : "CRFNT_FUN_NAME="+meau_name+"&CRFNT_RESOURCE="+ meau_url+"&CRFNT_STATUS="+ meau_status,
		type : "post",  
	    url : urlfile + "admin/addMenu",
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
                alert("添加成功！");
                closeDialogBox();
                showFunctionList();
			} else {
				alert(data.errMsg);
			}
		}	
	});
}

//修改功能菜单
function setModifyMeau(meau_code,meau_name,meau_url,meau_status){
//	console.log(meau_code+'-'+meau_name+'='+meau_url+'+'+meau_status);
	$.ajax({
		data : "CRFNT_UNID="+meau_code+"&CRFNT_FUN_NAME="+meau_name+"&CRFNT_RESOURCE="+ meau_url+"&CRFNT_STATUS="+ meau_status,
		type : "post",  
	    url : urlfile + "admin/updateMenu",
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
                alert("修改成功！");
                closeDialogBox();
                showFunctionList();
			} else {
				alert(data.errMsg);
			}
		}	
	});
}