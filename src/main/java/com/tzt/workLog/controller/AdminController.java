package com.tzt.workLog.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.CoreTlog;
import com.tzt.workLog.entity.GzrzCoreFunction;
import com.tzt.workLog.entity.GzrzGroup;
import com.tzt.workLog.entity.GzrzGroupUser;
import com.tzt.workLog.entity.GzrzRole;
import com.tzt.workLog.entity.GzrzUser;
import com.tzt.workLog.service.CoreTlogService;
import com.tzt.workLog.service.GzrzCoreFunctionService;
import com.tzt.workLog.service.GzrzGroupService;
import com.tzt.workLog.service.GzrzGroupUserService;
import com.tzt.workLog.service.GzrzRoleService;
import com.tzt.workLog.service.GzrzUserService;
import com.tzt.workLog.tool.StringUtil;
import com.tzt.workLog.tool.out.ResultMessageBuilder;
import com.tzt.workLog.vo.CoreTlogListVO;
import com.tzt.workLog.vo.CoreTlogVO;
import com.tzt.workLog.vo.GroupUserVO;
import com.tzt.workLog.vo.GzrzCoreFunctionVO;
import com.tzt.workLog.vo.RoleVO;
import com.tzt.workLog.vo.UserListVO;
import com.tzt.workLog.vo.UserVO;

@Controller
@RequestMapping(value = "/admin")
public class AdminController extends BaseController {

	/**
	 * 员工表
	 */
	@Autowired
	private GzrzUserService gzrzUserService;

	/**
	 * 角色表
	 */
	@Autowired
	private GzrzRoleService gzrzRoleService;

	/**
	 * 组别表
	 */
	@Autowired
	private GzrzGroupService gzrzGroupService;

	/**
	 * 组别用户表
	 */
	@Autowired
	private GzrzGroupUserService gzrzGroupUserService;

	/**
	 * 功能菜单表
	 */
	@Autowired
	private GzrzCoreFunctionService gzrzCoreFunctionService;
	
	/**
	 * 操作日志表
	 */
	@Autowired
	private CoreTlogService coreTlogService;
	
	/**
	 * 组别列表(包括组别内人员)
	 * 
	 * @param response
	 */
	@RequestMapping(value = "/findGroupListAll", method = RequestMethod.POST)
	public void findGroupListAll(HttpServletResponse response) {
		logger.info("findGroupListAll start");
		List<GzrzGroup> list = gzrzGroupService.findGzrzGroup(null);
		List<GroupUserVO> voList = new ArrayList<>();
		GroupUserVO vo;
		for (GzrzGroup gzrzGroup : list) {
			vo = new GroupUserVO();
			vo.setId(gzrzGroup.getId());
			vo.setName(gzrzGroup.getName());
			vo.setUsercode(gzrzGroup.getUsercode());
			vo.setManageName(gzrzGroup.getUsername());
			List<GzrzGroupUser> userList = gzrzGroupUserService.findGzrzGroupUser(gzrzGroup.getId());
			vo.setGroupUserList(userList);
			voList.add(vo);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询组别列表成功！", voList), response);
		logger.info("findGroupListAll end");
	}

	/**
	 * 添加组别
	 * 
	 * @param NAME
	 * @param USERCODE
	 * @param response
	 */
	@RequestMapping(value = "/addGroup", method = RequestMethod.POST)
	public void addGroup(String NAME, String USERCODE,
			HttpServletResponse response) {
		logger.info("addGroup start");
		if (StringUtil.isEmpty(NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少NAME参数！"), response);
			return;
		}
		GzrzGroup gzrzGroup = new GzrzGroup();
		gzrzGroup.setName(NAME);
		gzrzGroup.setUsercode(USERCODE);
		gzrzGroupService.insertGzrzGroup(gzrzGroup);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin添加了组别" + NAME);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("组别管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加组别成功！", gzrzGroup), response);
		logger.info("addGroup end");
	}

	/**
	 * 修改组别
	 * 
	 * @param ID
	 * @param NAME
	 * @param USERCODE
	 * @param response
	 */
	@RequestMapping(value = "/updateGroup", method = RequestMethod.POST)
	public void updateGroup(Integer ID, String NAME, String USERCODE,
			HttpServletResponse response) {
		logger.info("updateGroup start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少ID参数！"), response);
			return;
		}
		if (StringUtil.isEmpty(NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少name参数！"), response);
			return;
		}
		GzrzGroup gzrzGroup = new GzrzGroup();
		gzrzGroup.setId(ID);
		gzrzGroup.setName(NAME);
		gzrzGroup.setUsercode(USERCODE);
		gzrzGroupService.updateGzrzGroup(gzrzGroup);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin修改了组别ID:"+ID+",名称:"+ NAME);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("组别管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改组别成功！"), response);
		logger.info("updateGroup end");
	}

	/**
	 * 删除组别
	 * 
	 * @param ID
	 * @param response
	 */
	@RequestMapping(value = "/deleteGroup", method = RequestMethod.POST)
	public void deleteGroup(Integer ID, HttpServletResponse response) {
		logger.info("deleteGroup start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少ID参数！"), response);
			return;
		}
		GzrzGroup gzrzGroup = new GzrzGroup();
		gzrzGroup.setId(ID);
		gzrzGroupService.deleteGzrzGroup(gzrzGroup);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin删除了组别ID:" + ID);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("组别管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "删除组别成功！"), response);
		logger.info("deleteGroup end");
	}

	/**
	 * 添加修改选择组别下的人员
	 * 
	 * @param USERCODES 工号,使用|隔开
	 * @param NAMES 姓名,使用|隔开
	 * @param GROUP_ID 组别ID
	 * @param response
	 */
	@RequestMapping(value = "/addGroupUser", method = RequestMethod.POST)
	public void addGroupUser(String USERCODES, String NAMES, Integer GROUP_ID, HttpServletResponse response) {
		logger.info("addGroupUser start");
		if (StringUtil.isEmpty(USERCODES)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "请选择组别下人员!"), response);
			return;
		}
		if (StringUtil.isEmpty(NAMES)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "请选择组别下人员!"), response);
			return;
		}
		if (GROUP_ID == null || GROUP_ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[GROUP_ID]不能为空!"), response);
			return;
		}
		//删除原有组别下的人员关系
		GzrzGroupUser groupUser = new GzrzGroupUser();
		groupUser.setGroupId(GROUP_ID);
		gzrzGroupUserService.deleteGzrzGroupUser(groupUser);
		//添加组别员工表
		GzrzGroupUser gzrzGroupUser = new GzrzGroupUser();
		String[] codes = USERCODES.split("\\|");
		String[] names = NAMES.split("\\|");
		for (int i = 0; i < codes.length; i++) {
			gzrzGroupUser = new GzrzGroupUser();
			gzrzGroupUser.setGroupId(GROUP_ID);
			gzrzGroupUser.setName(names[i]);
			gzrzGroupUser.setUsercode(codes[i]);
			gzrzGroupUserService.insertGzrzGroupUser(gzrzGroupUser);
		}
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin添加了组别" + GROUP_ID +"下人员:"+NAMES);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("组别管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加组别下的人员成功！"), response);
		logger.info("addGroupUser end");
	}
	
	/**
	 * 重置密码
	 * @param CODE
	 * @param RESETPWD
	 */
	@RequestMapping(value = "/resetPwd", method = RequestMethod.POST)
	public void resetPwd(String CODE, HttpServletResponse response) {
		logger.info("resetPwd start");
		if (StringUtil.isEmpty(CODE)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "缺少CODE参数！"),
					response);
			return;
		}
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(CODE);
		gzrzUser.setPwd("123456");
		gzrzUserService.updateGzrzUser(gzrzUser);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin重置了工号" + CODE +"的密码");
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("人员管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "重置密码成功！"),
				response);
		logger.info("resetPwd start");
	}
	
	/**
	 * 修改密码
	 * 
	 * @param CODE
	 * @param OLDPWD
	 * @param NEWPWD
	 * @param CONFIRMPWD
	 * @param response
	 */
	@RequestMapping(value = "/updatePwd", method = RequestMethod.POST)
	public void updatePwd(String CODE, String OLDPWD, String NEWPWD,
			String CONFIRMPWD, HttpServletResponse response) {
		logger.info("updatePwd start");
		if (StringUtil.isEmpty(CODE)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "缺少CODE参数！"),
					response);
			return;
		}
		if (StringUtil.isEmpty(OLDPWD)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "缺少OLDPWD参数！"),
					response);
			return;
		}
		if (StringUtil.isEmpty(NEWPWD)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "缺少NEWPWD参数！"),
					response);
			return;
		}
		if (StringUtil.isEmpty(CONFIRMPWD)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "缺少CONFIRMPWD参数！"),
					response);
			return;
		}
		if (!NEWPWD.equals(CONFIRMPWD)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "确认密码错误！"), response);
			return;
		}
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(CODE);
		gzrzUser.setPwd(NEWPWD);
		GzrzUser user = gzrzUserService.getGzrzUser(gzrzUser);
		if (user == null || !(OLDPWD).equals(user.getPwd())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "原密码错误！"), response);
			return;
		}
		gzrzUserService.updateGzrzUser(gzrzUser);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("");
		coreTlog.setCrtogDesc("修改了工号" + CODE +"的密码");
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("人员管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改密码成功！"),
				response);
		logger.info("updatePwd end");
	}

	/**
	 * 员工列表（需要分页）--在MainController中已有，因需要分页，重写一个
	 * 
	 * @param pageNum
	 * @param pageSize
	 * @param response
	 */
	@RequestMapping(value = "/pageUserList", method = RequestMethod.POST)
	public void pageUserList(String USERCODE, String USERNAME, Integer PAGENUM, Integer PAGESIZE,
			HttpServletResponse response) {
		logger.info("pageUserList start");
		if (PAGENUM == null || PAGENUM == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageNum]不能为空！"), response);
			return;
		}
		if (PAGESIZE == null || PAGESIZE == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageSize]不能为空！"), response);
			return;
		}
		Page<GzrzUser> list = gzrzUserService.findUserListForPage(USERCODE, USERNAME, PAGENUM, PAGESIZE);
		UserListVO userVo = new UserListVO();
		userVo.setCount(list.getTotalCount());
		List<UserVO> voList = new ArrayList<UserVO>();
		UserVO vo;
		for (GzrzUser user : list) {				
			vo = new UserVO();
			vo.convertPOToVO(user);			
			//获取角色
			List<String> rolesList = new ArrayList<>();
			String[] roles = user.getRoles().split("\\|");
			for (int i = 0; i < roles.length; i++) {
				rolesList.add(roles[i]);
			}
			String roleNames = "";
			List<GzrzRole> gzrzRoles = gzrzRoleService.findGzrzRoleByIds(rolesList);
			for (GzrzRole gzrzRole : gzrzRoles) {
				roleNames += gzrzRole.getName() + "|";
			}
			vo.setRoleNames(roleNames);
			voList.add(vo);
		}
		userVo.setList(voList);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "分页查询人员列表成功！", userVo), response);
		logger.info("pageUserList end");
	}

	/**
	 * 获取员工信息
	 * 
	 * @param USERCODE
	 * @param response
	 */
	@RequestMapping(value = "/getUser", method = RequestMethod.POST)
	public void getUser(String USERCODE, HttpServletResponse response) {
		logger.info("getUser start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		GzrzUser user = new GzrzUser();
		user.setCode(USERCODE);
		user = gzrzUserService.getGzrzUser(user);
		UserVO vo = new UserVO();
		if (user != null) {
			vo.convertPOToVO(user);
			//获取角色
			List<String> rolesList = new ArrayList<>();
			String[] roles = user.getRoles().split("\\|");
			for (int i = 0; i < roles.length; i++) {
				rolesList.add(roles[i]);
			}
			String roleNames = "";
			List<GzrzRole> gzrzRoles = gzrzRoleService.findGzrzRoleByIds(rolesList);
			for (GzrzRole gzrzRole : gzrzRoles) {
				roleNames += gzrzRole.getName() + "|";
			}
			vo.setRoleNames(roleNames);			
		}
						
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取员工信息成功！", vo), response);
		logger.info("getUser end");
	}
	
	/**
	 * 更新员工信息(角色用"|"隔开)
	 * 
	 * @param USERCODE
	 * @param USERNAME
	 * @param ROLES
	 * @param MOBILE
	 * @param EMAIL
	 * @param SATUS
	 * @param response
	 */
	@RequestMapping(value = "/updateUser", method = RequestMethod.POST)
	public void updateUser(String USERCODE, String USERNAME, String ROLES, String MOBILE, String EMAIL, String STATUS, HttpServletResponse response) {
		logger.info("updateUser start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(USERNAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERNAME]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(ROLES)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "请选择角色!"), response);
			return;
		}
		//修改人员
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(USERCODE);
		gzrzUser.setName(USERNAME);
		gzrzUser.setEmail(EMAIL);
		gzrzUser.setMobile(MOBILE);
		gzrzUser.setRoles(ROLES);
		gzrzUser.setStatus(STATUS);
		gzrzUserService.updateGzrzUser(gzrzUser);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin修改了工号" + USERCODE +",姓名"+USERNAME+"的信息");
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("人员管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "更新人员信息成功！"), response);
		logger.info("updateUser end");
	}

	/**
	 * 添加人员(角色用"|"隔开)
	 * 
	 * @param USERCODE 工号
	 * @param USERNAME 姓名
	 * @param PWD 密码
	 * @param MOBILE 手机号
	 * @param EMAIL 邮箱
	 * @param ROLES 角色ID集合
	 * @param response
	 */
	@RequestMapping(value = "/addUser", method = RequestMethod.POST)
	public void addUser(String USERCODE, String USERNAME, String PWD, String MOBILE, String EMAIL, String ROLES, HttpServletResponse response) {
		logger.info("addUser start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(USERNAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERNAME]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(PWD)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PWD]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(ROLES)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "请选择角色!"), response);
			return;
		}
		//添加人员
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(USERCODE);
		gzrzUser.setName(USERNAME);
		gzrzUser.setPwd(PWD);
		gzrzUser.setEmail(EMAIL);
		gzrzUser.setMobile(MOBILE);
		gzrzUser.setRoles(ROLES);
		if (gzrzUserService.getGzrzUser(gzrzUser) != null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "该工号已存在！"), response);
			return;
		}
		gzrzUserService.insertGzrzUser(gzrzUser);		
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin添加了工号" + USERCODE +",姓名"+USERNAME+"的信息");
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("人员管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加人员信息成功！"), response);
		logger.info("addUser end");
	}

	/**
	 * 删除员工（禁用,软删除）
	 * 
	 * @param USERCODE
	 * @param response
	 */
	@RequestMapping(value = "/delUser", method = RequestMethod.POST)
	public void delUser(String USERCODE, HttpServletResponse response) {
		logger.info("delUser start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(USERCODE);
		gzrzUser.setStatus("0");
		Boolean delBool = gzrzUserService.updateGzrzUser(gzrzUser);
		if (delBool) {
			GzrzGroupUser gzrzGroupUser = new GzrzGroupUser();
			gzrzGroupUser.setUsercode(USERCODE);
			gzrzGroupUserService.deleteGzrzGroupUser(gzrzGroupUser);
			CoreTlog coreTlog = new CoreTlog();
			coreTlog.setCrtogCode("admin");
			coreTlog.setCrtogDesc("admin删除了工号" + USERCODE + "的信息");
			coreTlog.setCrtogOdate(new Date());
			coreTlog.setCrtogType("人员管理");
			coreTlogService.insertCoreTlog(coreTlog);
			
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "删除员工信息成功！"), response);
		} else {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "删除员工信息失败！"), response);
		}
		logger.info("delUser end");
	}

	/**
	 * 角色列表
	 * 
	 * @param response
	 */
	@RequestMapping(value = "/roleList", method = RequestMethod.POST)
	public void roleList(HttpServletResponse response) {
		logger.info("roleList start");
		List<GzrzRole> list = gzrzRoleService.findGzrzRoleAll();	
		List<RoleVO> voList = new ArrayList<RoleVO>();
		RoleVO vo;
		for (GzrzRole role : list) {				
			vo = new RoleVO();
			vo.convertPOToVO(role);			
			//获取权限
			List<String> menuList = new ArrayList<>();
			String[] roles = role.getPermissions().split("\\|");
			for (int i = 0; i < roles.length; i++) {
				menuList.add(roles[i]);
			}
			String functionNames = "";
			List<GzrzCoreFunction> gzrzRoles = gzrzCoreFunctionService.findGzrzFunctionsByIds(menuList);
			for (GzrzCoreFunction gzrzCoreFunction : gzrzRoles) {
				functionNames += gzrzCoreFunction.getCrfntFunName() + "|";
			}
			vo.setFunctionNames(functionNames);
			voList.add(vo);
		}
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取角色列表成功！", voList), response);
		logger.info("roleList end");
	}

	/**
	 * 添加角色(功能菜单用"|"隔开)
	 * 
	 * @param NAME
	 * @param PERMISSIONS
	 * @param REMARKS
	 * @param response
	 */
	@RequestMapping(value = "/addRole", method = RequestMethod.POST)
	public void addRole(String NAME, String PERMISSIONS, String REMARKS, HttpServletResponse response) {
		logger.info("addRole start");
		if (StringUtil.isEmpty(NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少NAME参数！"), response);
			return;
		}
		if (StringUtil.isEmpty(PERMISSIONS)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少PERMISSIONS参数！"), response);
			return;
		}
		GzrzRole gzrzRole = new GzrzRole();
		gzrzRole.setName(NAME);
		gzrzRole.setPermissions(PERMISSIONS);
		gzrzRole.setRemarks(REMARKS);
		gzrzRoleService.insertGzrzRole(gzrzRole);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin添加了角色" + NAME + ",权限集合为:" + PERMISSIONS);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("角色管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加角色成功！", gzrzRole), response);
		logger.info("addRole end");
	}

	/**
	 * 修改角色(功能菜单用"|"隔开)
	 * 
	 * @param ID
	 * @param NAEM
	 * @param PERMISSIONS
	 * @param REMARKS
	 * @param response
	 */
	@RequestMapping(value = "/updateRole", method = RequestMethod.POST)
	public void updateRole(Integer ID, String NAME, String PERMISSIONS, String REMARKS, HttpServletResponse response) {
		logger.info("updateRole start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少ID参数！"), response);
			return;
		}
		if (StringUtil.isEmpty(NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少NAEM参数！"), response);
			return;
		}
		if (StringUtil.isEmpty(PERMISSIONS)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少PERMISSIONS参数！"), response);
			return;
		}
		GzrzRole gzrzRole = new GzrzRole();
		gzrzRole.setId(ID);
		gzrzRole.setName(NAME);
		gzrzRole.setPermissions(PERMISSIONS);
		gzrzRole.setRemarks(REMARKS);
		gzrzRoleService.updateGzrzRole(gzrzRole);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin修改了角色" + NAME + ",权限集合为:" + PERMISSIONS);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("角色管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改角色成功！"), response);
		logger.info("updateRole end");
	}

	/**
	 * 删除角色
	 * 
	 * @param ID
	 * @param response
	 */
	@RequestMapping(value = "/deleteRole", method = RequestMethod.POST)
	public void deleteRole(Integer ID, HttpServletResponse response) {
		logger.info("deleteRole start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少ID参数！"), response);
			return;
		}
		GzrzRole gzrzRole = new GzrzRole();
		gzrzRole.setId(ID);
		gzrzRoleService.deleteGzrzRole(gzrzRole);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin删除了角色" + ID + "的信息");
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("角色管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "删除角色成功！"), response);
		logger.info("deleteRole end");
	}
	
	/**
	 * 功能菜单列表
	 * 
	 * @param response
	 */
	@RequestMapping(value = "/menuList", method = RequestMethod.POST)
	public void menuList(HttpServletResponse response) {
		logger.info("menuList start");
		List<GzrzCoreFunction> list = gzrzCoreFunctionService.getGzrzCoreFunctions();
		List<GzrzCoreFunctionVO> functionVOs=new ArrayList<GzrzCoreFunctionVO>();
		GzrzCoreFunctionVO functionVO;
		for (GzrzCoreFunction gzrzCoreFunction : list) {
			functionVO=new GzrzCoreFunctionVO();
			functionVO.convertPOToVO(gzrzCoreFunction);
			functionVOs.add(functionVO);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取功能菜单列表成功！", functionVOs), response);
		logger.info("menuList end");
	}
	
	/**
	 * 添加功能菜单
	 * 
	 * @param CRFNT_FUN_NAME 功能项名称
	 * @param CRFNT_RESOURCE 资源请求地址
	 * @param response
	 */
	@RequestMapping(value = "/addMenu", method = RequestMethod.POST)
	public void addMenu(String CRFNT_FUN_NAME, String CRFNT_RESOURCE, Integer CRFNT_STATUS, HttpServletResponse response) {
		logger.info("addMenu start");
		if (StringUtil.isEmpty(CRFNT_FUN_NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "功能项名称不能为空!"), response);
			return;
		}
		GzrzCoreFunction gzrzCoreFunction = new GzrzCoreFunction();
		gzrzCoreFunction.setCrfntFunName(CRFNT_FUN_NAME);
		gzrzCoreFunction.setCrfntResource(CRFNT_RESOURCE);
		gzrzCoreFunction.setCrfntCdate(new Date());
		gzrzCoreFunction.setCrfntUdate(new Date());
		gzrzCoreFunction.setCrfntStatus(CRFNT_STATUS);
		Boolean boolAdd = gzrzCoreFunctionService.insertGzrzCoreFunction(gzrzCoreFunction);
		if (boolAdd) {
			CoreTlog coreTlog = new CoreTlog();
			coreTlog.setCrtogCode("admin");
			coreTlog.setCrtogDesc("admin添加功能菜单" + CRFNT_FUN_NAME + "的信息,资源地址为" + CRFNT_RESOURCE);
			coreTlog.setCrtogOdate(new Date());
			coreTlog.setCrtogType("菜单管理");
			coreTlogService.insertCoreTlog(coreTlog);
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "功能项添加成功！"), response);
		} else {
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, -1, "功能项添加失败！"), response);
			return;
		}
		logger.info("addMenu end");
	}

	/**
	 * 删除功能菜单
	 * 
	 * @param ID
	 * @param response
	 */
	@RequestMapping(value = "/deleteMenu", method = RequestMethod.POST)
	public void deleteMenu(Integer ID, HttpServletResponse response) {
		logger.info("deleteMenu start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "缺少ID参数！"), response);
			return;
		}
		GzrzCoreFunction gzrzCoreFunction = new GzrzCoreFunction();
		gzrzCoreFunction.setCrfntUnid(ID);
		gzrzCoreFunctionService.deleteGzrzCoreFunction(gzrzCoreFunction);
		CoreTlog coreTlog = new CoreTlog();
		coreTlog.setCrtogCode("admin");
		coreTlog.setCrtogDesc("admin删除功能菜单" + ID);
		coreTlog.setCrtogOdate(new Date());
		coreTlog.setCrtogType("菜单管理");
		coreTlogService.insertCoreTlog(coreTlog);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "删除功能菜单成功！"), response);
		logger.info("deleteMenu end");
	}
	
	/**
	 * 修改功能菜单
	 * 
	 * @param CRFNT_UNID  功能标识UNID
	 * @param CRFNT_FUN_NAME 功能名称
	 * @param CRFNT_RESOURCE 资源请求地址
	 * @param CRFNT_STATUS 状态（0：不启用；1：启用）
	 * @param response
	 */
	@RequestMapping(value = "/updateMenu", method = RequestMethod.POST)
	public void updateMenu(Integer CRFNT_UNID, String CRFNT_FUN_NAME,
			String CRFNT_RESOURCE, Integer CRFNT_STATUS, HttpServletResponse response) {
		logger.info("updateMenu start");
		if (CRFNT_UNID == null || CRFNT_UNID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "功能标识UNID不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(CRFNT_FUN_NAME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "功能名称不能为空!"),
					response);
			return;
		}
		if (CRFNT_STATUS==null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "功能状态不能为空!"),
					response);
			return;
		}
		GzrzCoreFunction gzrzCoreFunction = new GzrzCoreFunction();
		gzrzCoreFunction.setCrfntUnid(CRFNT_UNID);
		gzrzCoreFunction.setCrfntFunName(CRFNT_FUN_NAME);
		gzrzCoreFunction.setCrfntResource(CRFNT_RESOURCE);
		gzrzCoreFunction.setCrfntStatus(CRFNT_STATUS);
		gzrzCoreFunction.setCrfntUdate(new Date());
		Boolean booUpd=gzrzCoreFunctionService.updateGzrzCoreFunction(gzrzCoreFunction);
		if (booUpd) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(true, 1, "功能项修改成功！"), response);
			CoreTlog coreTlog = new CoreTlog();
			coreTlog.setCrtogCode("admin");
			coreTlog.setCrtogDesc("admin修改功能菜单" + CRFNT_FUN_NAME + "的信息,资源地址为" + CRFNT_RESOURCE);
			coreTlog.setCrtogOdate(new Date());
			coreTlog.setCrtogType("菜单管理");
			coreTlogService.insertCoreTlog(coreTlog);
		} else {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(true, -1, "功能项修改失败！"), response);
			return;
		}
		logger.info("updateMenu end");
	}
	
	/**
	 * 操作日志列表（需要分页）,USERNAME和TYPE为查询条件
	 * 
	 * @param USERNAME
	 * @param TYPE
	 * @param pageNum
	 * @param pageSize
	 * @param response
	 */
	@RequestMapping(value = "/tlogList", method = RequestMethod.POST)
	public void tlogList(String USERNAME, String TYPE, Integer PAGENUM, Integer PAGESIZE,
			HttpServletResponse response) {
		logger.info("tlogList start");
		if (PAGENUM == null || PAGENUM == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageNum]不能为空！"), response);
			return;
		}
		if (PAGESIZE == null || PAGESIZE == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageSize]不能为空！"), response);
			return;
		}
		Page<CoreTlog> list = coreTlogService.getAllCoreTlog(USERNAME, TYPE, PAGENUM, PAGESIZE);
		CoreTlogListVO coreTlogListVO = new CoreTlogListVO();
		coreTlogListVO.setCount(list.getTotalCount());
		List<CoreTlogVO> voList = new ArrayList<CoreTlogVO>();
		CoreTlogVO vo;
		for (CoreTlog log : list) {				
			vo = new CoreTlogVO();
			vo.convertPOToVO(log);			
			voList.add(vo);
		}
		coreTlogListVO.setList(voList);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "分页查询操作日志列表成功！", coreTlogListVO), response);
		logger.info("tlogList end");
	}
	
}