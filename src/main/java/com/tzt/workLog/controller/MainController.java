package com.tzt.workLog.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.GzrzCoreFunction;
import com.tzt.workLog.entity.GzrzGroup;
import com.tzt.workLog.entity.GzrzGroupUser;
import com.tzt.workLog.entity.GzrzModel;
import com.tzt.workLog.entity.GzrzModelUser;
import com.tzt.workLog.entity.GzrzMonthTask;
import com.tzt.workLog.entity.GzrzProject;
import com.tzt.workLog.entity.GzrzRemarks;
import com.tzt.workLog.entity.GzrzRole;
import com.tzt.workLog.entity.GzrzUser;
import com.tzt.workLog.entity.GzrzWeekTask;
import com.tzt.workLog.service.GzrzCoreFunctionService;
import com.tzt.workLog.service.GzrzGroupService;
import com.tzt.workLog.service.GzrzGroupUserService;
import com.tzt.workLog.service.GzrzModelService;
import com.tzt.workLog.service.GzrzModelUserService;
import com.tzt.workLog.service.GzrzMonthTaskService;
import com.tzt.workLog.service.GzrzProjectService;
import com.tzt.workLog.service.GzrzRemarksService;
import com.tzt.workLog.service.GzrzRoleService;
import com.tzt.workLog.service.GzrzUserService;
import com.tzt.workLog.service.GzrzWeekTaskService;
import com.tzt.workLog.tool.DateUtil;
import com.tzt.workLog.tool.StringUtil;
import com.tzt.workLog.tool.out.ResultMessageBuilder;
import com.tzt.workLog.vo.GroupUserVO;
import com.tzt.workLog.vo.ModelUserVO;
import com.tzt.workLog.vo.ProjectListVO;
import com.tzt.workLog.vo.ProjectVO;
import com.tzt.workLog.vo.UserVO;

@Controller
@RequestMapping(value="/main")
public class MainController extends BaseController {
	
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
	 * 月任务表
	 */
	@Autowired
	private GzrzMonthTaskService gzrzMonthTaskService;

	/**
	 * 周任务表
	 */
	@Autowired
	private GzrzWeekTaskService gzrzWeekTaskService;
	
	/**
	 * 项目表
	 */
	@Autowired
	private GzrzProjectService gzrzProjectService;
	
	/**
	 * 模块表
	 */
	@Autowired
	private GzrzModelService gzrzModelService;
	
	/**
	 * 模块员工表
	 */
	@Autowired
	private GzrzModelUserService gzrzModelUserService;
	
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
	 * 备注表
	 */
	@Autowired
	private GzrzRemarksService gzrzRemarksService;
	
	/**
	 * 功能菜单表
	 */
	@Autowired
	private GzrzCoreFunctionService gzrzCoreFunctionService;
	
	/**
	 * 登录
	 * 
	 * @param USERCODE 工号或用户名
	 * @param PWD 密码
	 * @param response
	 */
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public void login(String USERCODE, String PWD, HttpServletResponse response) {
		logger.info("login start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(PWD)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PWD]不能为空!"), response);
			return;
		}
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(USERCODE);
		GzrzUser user = gzrzUserService.getGzrzUser(gzrzUser);		
		if (user == null || !(PWD).equals(user.getPwd())) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "工号或密码错误！"), response);
			logger.info("login end");
			return;
		}
		UserVO vo = new UserVO();
		vo.convertPOToVO(user);
		Map<String, Object> hashMap = new HashMap<String, Object>();
		//返回菜单
		if (user.getRoles() != null) {
			String[] roles = user.getRoles().split("\\|");
			GzrzRole gzrzRole;
			GzrzCoreFunction gzrzCoreFunction;
			for (int i = 0; i < roles.length; i++) { //获取角色
				//根据角色查询功能菜单
				gzrzRole = new GzrzRole();
				gzrzRole.setId(Integer.valueOf(roles[i]));
				gzrzRole = gzrzRoleService.getGzrzRole(gzrzRole);
				if (gzrzRole != null && gzrzRole.getPermissions() != null) {
					String[] menus = gzrzRole.getPermissions().split("\\|");
					for (int y = 0; y < menus.length; y++) { //获取权限
						gzrzCoreFunction = new GzrzCoreFunction();
						gzrzCoreFunction.setCrfntUnid(Integer.valueOf(menus[y]));
						gzrzCoreFunction = gzrzCoreFunctionService.getGzrzCoreFunction(gzrzCoreFunction);
						if (gzrzCoreFunction != null) {
							hashMap.put(gzrzCoreFunction.getCrfntFunName(), gzrzCoreFunction.getCrfntResource());
						}
					}
				}
			}
		}
		vo.setMenuMap(hashMap);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "登录成功!", vo), response);
		logger.info("login end");
	}

	/**
	 * 完成任务/项目/模块员工
	 * 
	 * @param FINISH_TYPE 1项目 2月任务 3周任务 4模块员工
	 * @param ID ID
	 * @param MODELTYPE 用于作废
	 * @param response
	 */
	@RequestMapping(value = "/finishTaskOrProject", method = RequestMethod.POST)
	public void finishTaskOrProject(Integer FINISH_TYPE, Integer ID, String MODELTYPE, HttpServletResponse response) {
		logger.info("finishTaskOrProject start");
		if (FINISH_TYPE == null || FINISH_TYPE <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[FINISH_TYPE]不能为空!"), response);
			return;
		}
		if (ID == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		if (FINISH_TYPE == 1) { //项目完成修改状态和最后更新时间
			GzrzProject gzrzProject = new GzrzProject();
			gzrzProject.setId(ID);
			gzrzProject.setStatus(1);
			gzrzProject.setLastTime(DateUtil.formatDate("yyyy-MM-dd HH:mm:ss", new Date()));
			gzrzProjectService.updateGzrzProject(gzrzProject);
		}
		if (FINISH_TYPE == 2) { //月任务完成修改状态
			GzrzMonthTask gzrzMonthTask = new GzrzMonthTask();
			gzrzMonthTask.setId(ID);
			gzrzMonthTask.setStatus(1);
			gzrzMonthTaskService.updateGzrzMonthTask(gzrzMonthTask);
		}
		if (FINISH_TYPE == 3) { //周任务完成修改状态
			GzrzWeekTask gzrzWeekTask = new GzrzWeekTask();
			gzrzWeekTask.setId(ID);
			gzrzWeekTask.setStatus(1);
			gzrzWeekTaskService.updateGzrzWeekTask(gzrzWeekTask);
		}
		if (FINISH_TYPE == 4) { //模块员工
			GzrzModelUser gzrzModelUser = new GzrzModelUser();
			gzrzModelUser.setId(ID);
			if("invalid".equals(MODELTYPE)){//作废员工模块操作
				gzrzModelUser.setStatus(2);
				gzrzModelUser.setWorkTime(Double.valueOf(0));
			}else{
				gzrzModelUser.setStatus(1);
			}
			gzrzModelUserService.updateGzrzModelUser(gzrzModelUser);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "操作成功!"), response);
		logger.info("finishTaskOrProject end");
	}

	/**
	 * 月任务/周任务/项目/模块员工修改备注
	 * 
	 * @param REMARKS_TYPE 1月任务 2周任务3项目4模块员工5模块
	 * @param ID ID
	 * @param REMARKS 备注
	 * @param response
	 */
	@RequestMapping(value = "/updateRemarks", method = RequestMethod.POST)
	public void updateRemarks(Integer REMARKS_TYPE, Integer ID, String REMARKS, HttpServletResponse response) {
		logger.info("updateRemarks start");
		if (REMARKS_TYPE == null || REMARKS_TYPE <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[REMARKS_TYPE]不能为空!"), response);
			return;
		}
		if (ID == null || ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		if (REMARKS == null) {
			REMARKS = "";
		}
		if (REMARKS_TYPE == 1) { // 月任务
			GzrzMonthTask gzrzMonthTask = new GzrzMonthTask();
			gzrzMonthTask.setId(ID);
			gzrzMonthTask.setRemarks(REMARKS);
			gzrzMonthTaskService.updateGzrzMonthTask(gzrzMonthTask);
		}
		if (REMARKS_TYPE == 2) { // 周任务
			GzrzWeekTask gzrzWeekTask = new GzrzWeekTask();
			gzrzWeekTask.setId(ID);
			gzrzWeekTask.setRemarks(REMARKS);
			gzrzWeekTaskService.updateGzrzWeekTask(gzrzWeekTask);
		}
		if (REMARKS_TYPE == 3) { // 项目
			GzrzProject gzrzProject = new GzrzProject();
			gzrzProject.setId(ID);
			gzrzProject.setRemarks(REMARKS);
			gzrzProjectService.updateGzrzProject(gzrzProject);
		}
		if (REMARKS_TYPE == 4) { // 模块员工
			GzrzModelUser modelUser = new GzrzModelUser();
			modelUser.setId(ID);
			modelUser.setRemarks(REMARKS);
			gzrzModelUserService.updateGzrzModelUser(modelUser);
		}
		if (REMARKS_TYPE == 5) { // 模块
			GzrzModel model = new GzrzModel();
			model.setId(ID);
			model.setRemarks(REMARKS);
			gzrzModelService.updateGzrzModel(model);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "操作成功!"), response);
		logger.info("updateRemarks end");
	}
	
	/**
	 * 添加日报回复内容
	 * 
	 * @param USERCODE 工号
	 * @param CONTENT 备注内容
	 * @param DAYTASK_ID 日报ID
	 * @param response
	 */
	@RequestMapping(value = "/addReply", method = RequestMethod.POST)
	public void addReply(String USERCODE, String CONTENT, Integer DAYTASK_ID, HttpServletResponse response) {
		logger.info("addReply start");		
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		String NAME = "";
		//根据工号查询姓名
		GzrzUser gzrzUser = new GzrzUser();
		gzrzUser.setCode(USERCODE);
		GzrzUser user = gzrzUserService.getGzrzUser(gzrzUser);
		if (user != null) {
			NAME = user.getName();
		}
		if (StringUtil.isEmpty(CONTENT)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[CONTENT]不能为空!"), response);
			return;
		}
		if (DAYTASK_ID == null || DAYTASK_ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[DAYTASK_ID]不能为空!"), response);
			return;
		}
		GzrzRemarks gzrzRemarks = new GzrzRemarks();
		gzrzRemarks.setName(NAME);
		gzrzRemarks.setDayTaskId(DAYTASK_ID);
		gzrzRemarks.setContent(CONTENT);
		gzrzRemarks.setUsercode(USERCODE);
		gzrzRemarksService.insertGzrzRemarks(gzrzRemarks);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加备注成功!"), response);
		logger.info("addReply end");
	}

	/**
	 * 组别列表下拉框
	 * 
	 * @param USERCODE 工号
	 * @param response
	 */
	@RequestMapping(value = "/findGroupList", method = RequestMethod.POST)
	public void findGroupList(String USERCODE, HttpServletResponse response) {
		logger.info("findGroupList start");
		//根据组别主管工号查询组别
		List<GzrzGroup> list = gzrzGroupService.findGzrzGroup(USERCODE);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询组别列表成功！", list), response);
		logger.info("findGroupList end");
	}	
	
	/**
	 * 项目经理下的人员列表（USERCODE为null即为查询所有的组别下的所有人员）
	 * 
	 * @param USERCODE 工号
	 * @param response
	 */
	@RequestMapping(value = "/userListByCode", method = RequestMethod.POST)
	public void userListByCode(String USERCODE, HttpServletResponse response) {
		logger.info("userListByCode start");
		//根据组别主管工号查询组别
		List<GzrzGroup> list = gzrzGroupService.findGzrzGroup(USERCODE);
		List<Integer> groupIds = new ArrayList<>();
		for (GzrzGroup gzrzGroup : list) {
			groupIds.add(gzrzGroup.getId());
		}
		List<GzrzGroupUser> groupUserList = gzrzGroupUserService.findGzrzGroupUserByIds(groupIds);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询项目经理下的人员列表成功！", groupUserList), response);
		logger.info("userListByCode end");
	}
	
	/**
	 * 人员下拉框(不分页)
	 * 
	 * @param response
	 */
	@RequestMapping(value = "/userListAfterManage", method = RequestMethod.POST)
	public void userListAfterManage(HttpServletResponse response) {
		logger.info("userListAfterManage start");
		List<GzrzUser> list = gzrzUserService.findUserList();		
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
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询人员列表成功！", voList), response);
		logger.info("userListAfterManage end");
	}
	
	/**
	 * 管理员下的全部项目列表,和查看所有项目信息是一个接口(负责人工号和项目名为查询条件，分页查询)
	 * 
	 * @param USERCODE
	 * @param NAME
	 * @param response
	 */
	@RequestMapping(value = "/findAllProjectList", method = RequestMethod.POST)
	public void findAllProjectList(String USERCODE, String NAME, String USERNAME, Integer PAGENUM, Integer PAGESIZE, HttpServletResponse response) {
		logger.info("findAllProjectList start");
		if (PAGENUM == null || PAGENUM == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageNum]不能为空！"), response);
			return;
		}
		if (PAGESIZE == null || PAGESIZE == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageSize]不能为空！"), response);
			return;
		}
		Page<GzrzProject> list = gzrzProjectService.findGzrzProjectsAllListByName(USERCODE, NAME, USERNAME, PAGENUM, PAGESIZE);
		ProjectListVO projectListVO = new ProjectListVO();
		projectListVO.setCount(list.getTotalCount());
		List<ProjectVO> voList = new ArrayList<>();
		ProjectVO vo;
		for (GzrzProject project : list) {
			vo = new ProjectVO();
			vo.setId(project.getId());
			vo.setName(project.getName());
			vo.setAllTime(project.getAllTime());
			vo.setEndTime(DateUtil.formatTimesTampDate(project.getEndTime()));
			vo.setRemarks(project.getRemarks());
			vo.setStartTime(DateUtil.formatTimesTampDate(project.getStartTime()));
			vo.setStatus(project.getStatus());
			vo.setUsercode(project.getUsercode());
			vo.setUsername(project.getUsername());
			vo.setExplanation(project.getExplanation());
			voList.add(vo);
		}
		projectListVO.setList(voList);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取全部项目列表成功！", projectListVO), response);
		logger.info("findAllProjectList end");
	}
	
	/**
	 * 组别下的人员列表
	 * 
	 * @param GROUP_ID 组别Id
	 * @param response
	 */
	@RequestMapping(value = "/groupUser", method = RequestMethod.POST)
	public void groupUser(Integer GROUP_ID, HttpServletResponse response) {
		logger.info("groupUser start");
		if (GROUP_ID == null || GROUP_ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[GROUP_ID]不能为空!"), response);
			return;
		}		
		List<GzrzGroupUser> list = gzrzGroupUserService.findGzrzGroupUser(GROUP_ID);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询组别下的人员列表成功！", list), response);
		logger.info("groupUser end");
	}
	
	/**
	 * 查询所有项目经理的信息(项目经理列表)
	 * 
	 * @param response
	 */
	@RequestMapping(value = "/allProjectManager", method = RequestMethod.POST)
	public void allProjectManager(HttpServletResponse response) {
		logger.info("allProjectManager start");
		List<GzrzGroup> list = gzrzGroupService.findAllProjectManage();
		List<GroupUserVO> voList = new ArrayList<>();
		GroupUserVO vo;
		for (GzrzGroup gzrzGroup : list) {
			vo = new GroupUserVO();
			vo.setId(gzrzGroup.getId());
			vo.setName(gzrzGroup.getName());
			vo.setUsercode(gzrzGroup.getUsercode());
			vo.setManageName(gzrzGroup.getUsername());
			voList.add(vo);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取所有项目经理的信息成功！", voList), response);
		logger.info("allProjectManager end");
	}
	
	/**
	 * 根据项目经理工号查询所管辖的项目信息(USERCODE为null即为全部项目信息)
	 * 
	 * @param USERCODE 工号
	 * @param YEAR 年
	 * @param MONTH 月
	 * @param response
	 */
	@RequestMapping(value = "/allProjectByManager", method = RequestMethod.POST)
	public void allProjectByManager(String USERCODE, String YEAR, String MONTH, HttpServletResponse response) {
		logger.info("allProjectByManager start");
		if (StringUtil.isEmpty(YEAR)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[YEAR]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(MONTH)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[MONTH]不能为空!"), response);
			return;
		}
		if (MONTH.length() == 1) {
			MONTH = "0" + MONTH; //补零
		}
		List<GzrzProject> lists = gzrzProjectService.getGzrzProjects(USERCODE, YEAR + MONTH);
		List<ProjectVO> voList = new ArrayList<>();
		ProjectVO vo;
		List<ModelUserVO> userListVO;
		for (GzrzProject gzrzProject : lists) {
			vo = new ProjectVO();
			vo.setId(gzrzProject.getId());
			vo.setName(gzrzProject.getName());
			vo.setStartTime(DateUtil.formatDefaultDate(gzrzProject.getStartTime()));
			vo.setEndTime(DateUtil.formatDefaultDate(gzrzProject.getEndTime()));
			vo.setAllTime(gzrzProject.getAllTime());
			vo.setStatus(gzrzProject.getStatus());
			vo.setLastTime(gzrzProject.getLastTime());
			vo.setRemarks(gzrzProject.getRemarks());
			List<GzrzModelUser> userList = gzrzModelUserService.getGzrzModelUserByProjectId(gzrzProject.getId());
			userListVO = new ArrayList<>();
			ModelUserVO modelUserVO;
			if (userList != null) {
				for (GzrzModelUser modelUser: userList) {
					modelUserVO = new ModelUserVO();
					modelUserVO.convertPOToVO(modelUser);
					userListVO.add(modelUserVO);
				}
			}
			vo.setUserList(userListVO);
			vo.setUsercode(gzrzProject.getUsercode());
			voList.add(vo);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询所管辖的项目信息成功！", voList), response);
		logger.info("allProjectByManager end");
	}
	
	/**
	 * 根据项目ID查询项目参与人员
	 * 
	 * @param ID 项目ID
	 * @param response
	 */
	@RequestMapping(value = "/getJoinUserByProject", method = RequestMethod.POST)
	public void getJoinUserByProject(Integer ID, HttpServletResponse response) {
		logger.info("getJoinUserByProject start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}		
		List<ModelUserVO> userListVO = new ArrayList<>();
		List<GzrzModelUser> userList = gzrzModelUserService.getGzrzModelUserByProjectId(ID);
		ModelUserVO modelUserVO;
		if (userList != null) {
			for (GzrzModelUser modelUser: userList) {
				modelUserVO = new ModelUserVO();
				modelUserVO.convertPOToVO(modelUser);
				userListVO.add(modelUserVO);
			}
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询项目参与人员成功！", userListVO), response);
		logger.info("getJoinUserByProject end");
	}
	
}