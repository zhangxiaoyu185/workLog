package com.tzt.workLog.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.tzt.workLog.entity.GzrzModel;
import com.tzt.workLog.entity.GzrzModelUser;
import com.tzt.workLog.entity.GzrzProject;
import com.tzt.workLog.service.GzrzModelService;
import com.tzt.workLog.service.GzrzModelUserService;
import com.tzt.workLog.service.GzrzProjectService;
import com.tzt.workLog.tool.DateUtil;
import com.tzt.workLog.tool.StringUtil;
import com.tzt.workLog.tool.out.ResultMessageBuilder;
import com.tzt.workLog.vo.ModelAndUserVO;
import com.tzt.workLog.vo.ModelUserVO;
import com.tzt.workLog.vo.ModelVO;
import com.tzt.workLog.vo.ProjectVO;

@Controller
@RequestMapping(value = "/project")
public class ProjectModelController extends BaseController {

	@Autowired
	private GzrzProjectService gzrzProjectService;

	@Autowired
	private GzrzModelService gzrzModelService;

	@Autowired
	private GzrzModelUserService gzrzModelUserService;

	/**
	 * 插入项目
	 * 
	 * @param userCode
	 * @param projectName
	 * @param startTime
	 * @param endTime
	 * @param allTime
	 * @param status
	 * @param remarks
	 * @param explanation  说明(记录测试、正式的账号，地址等信息)
	 * @param response
	 */
	@RequestMapping(value = "/insertProject", method = RequestMethod.POST)
	public void insertProject(String USERCODE, String PROJECT_NAME,
			String STARTTIME, String ENDTIME, Integer STATUS, String REMARKS, String EXPLANATION,
			HttpServletResponse response) {
		logger.info("insertProject start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(PROJECT_NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1,
					"[PROJECT_NAME]不能为空!"), response);
			return;
		}
		if (PROJECT_NAME.length() >= 20) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "项目名称请控制在20字以内!"), response);
			return;
		}
		if (StringUtil.isEmpty(STARTTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STARTTIME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(ENDTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ENDTIME]不能为空!"),
					response);
			return;
		}
		if (STATUS == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STATUS]不能为空!"),
					response);
			return;
		}
		GzrzProject gzrzProject = new GzrzProject();
		gzrzProject.setName(PROJECT_NAME);
		//判断项目是否已存在
		List<GzrzProject> list = gzrzProjectService.findGzrzProjectsByName(PROJECT_NAME);
		if (list != null && list.size() > 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "该项目已存在!"), response);
			return;
		}
		gzrzProject.setStartTime(DateUtil.parseDefaultDate(STARTTIME));
		gzrzProject.setEndTime(DateUtil.parseDefaultDate(ENDTIME));
		gzrzProject.setStatus(STATUS);
		gzrzProject.setLastTime(DateUtil.formatTimesTampDate(new Date()));
		gzrzProject.setUsercode(USERCODE);
		gzrzProject.setRemarks(REMARKS);
		gzrzProject.setExplanation(EXPLANATION);
		gzrzProjectService.insertGzrzProject(gzrzProject);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "新增项目成功!"),
				response);
		logger.info("insertProject end");
	}

	/**
	 * 根据项目id获取项目信息
	 *
	 * @param projectId
	 * @param response
	 */
	@RequestMapping(value = "/getProject", method = RequestMethod.POST)
	public void getProject(Integer PROJECT_ID,String USERCODE, String PROJECT_NAME, HttpServletResponse response) {
		logger.info("getProject start");
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"),
					response);
			return;
		}
		GzrzProject gzrzProject = new GzrzProject();
		if ( PROJECT_ID != -1) {
			gzrzProject.setId(PROJECT_ID);
		}
		if (!StringUtil.isEmpty(USERCODE)) {
			gzrzProject.setUsercode(USERCODE);
		}
		if (!StringUtil.isEmpty(PROJECT_NAME)) {
			gzrzProject.setName(PROJECT_NAME);
		}
		gzrzProject = gzrzProjectService.getGzrzProject(gzrzProject);
		if (gzrzProject == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "获取项目信息失败!"),
					response);
			return;
		}
		ProjectVO vo = new ProjectVO();
		vo.setId(gzrzProject.getId());
		vo.setName(gzrzProject.getName());
		vo.setStartTime(DateUtil.formatDefaultDate(gzrzProject.getStartTime()));
		vo.setEndTime(DateUtil.formatDefaultDate(gzrzProject.getEndTime()));
		vo.setAllTime(gzrzProject.getAllTime());
		vo.setStatus(gzrzProject.getStatus());
		vo.setLastTime(gzrzProject.getLastTime());
		vo.setRemarks(gzrzProject.getRemarks());
		vo.setExplanation(gzrzProject.getExplanation());
		vo.setUsercode(gzrzProject.getUsercode());

		writeAjaxJSONResponse(
				ResultMessageBuilder.build(true, 1, "获取项目信息成功!", vo), response);
		logger.info("getProject end");
	}

	/**
	 * 更新项目
	 * 
	 * @param projectId
	 * @param projectName
	 * @param startTime
	 * @param endTime
	 * @param remarks
	 * @param explanation	 说明(记录测试、正式的账号，地址等信息)
	 * @param response
	 */
	@RequestMapping(value = "/updateProject", method = RequestMethod.POST)
	public void updateProject(String PROJECT_ID, String PROJECT_NAME,
			String STARTTIME, String ENDTIME, String REMARKS, String USERCODE,
			String EXPLANATION, Integer STATUS, HttpServletResponse response) {
		logger.info("updateProject start");
		if (StringUtil.isEmpty(PROJECT_ID)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(PROJECT_NAME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1,
					"[PROJECT_NAME]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(STARTTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STARTTIME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(ENDTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ENDTIME]不能为空!"),
					response);
			return;
		}
		GzrzProject gzrzProject = new GzrzProject();
		gzrzProject.setId(Integer.parseInt(PROJECT_ID));
		gzrzProject.setName(PROJECT_NAME);
		gzrzProject.setStartTime(DateUtil.parseDefaultDate(STARTTIME));
		gzrzProject.setEndTime(DateUtil.parseDefaultDate(ENDTIME));
		gzrzProject.setLastTime(DateUtil.formatTimesTampDate(new Date()));
		gzrzProject.setRemarks(REMARKS);
		
		if (!StringUtil.isEmpty(USERCODE)) {
			gzrzProject.setUsercode(USERCODE);
		}
		if (!StringUtil.isEmpty(EXPLANATION)) {
			gzrzProject.setExplanation(EXPLANATION);
		}
		if(STATUS!=null){
			gzrzProject.setStatus(STATUS);
		}
		gzrzProjectService.updateGzrzProject(gzrzProject);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改成功!"), response);
		logger.info("updateProject end");
	}

	/**
	 * 根据时间获取项目列表(USERCODE为null即为全部项目)
	 * 
	 * @param userCode
	 * @param year
	 * @param month
	 * @param response
	 */
	@RequestMapping(value = "/getProjectsByTime", method = RequestMethod.POST)
	public void getProjectsByTime(String USERCODE, String YEAR, String MONTH,
			HttpServletResponse response) {
		logger.info("getProjectsByTime start");
		if (StringUtil.isEmpty(YEAR)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[YEAR]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(MONTH)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[MONTH]不能为空!"),
					response);
			return;
		}
		List<GzrzProject> lists = gzrzProjectService.getGzrzProjects(USERCODE,
				YEAR + MONTH);
		List<ProjectVO> voList = new ArrayList<>();
		ProjectVO vo;
		for (GzrzProject gzrzProject : lists) {
			vo = new ProjectVO();
			vo.setId(gzrzProject.getId());
			vo.setName(gzrzProject.getName());
			vo.setStartTime(DateUtil.formatDefaultDate(gzrzProject
					.getStartTime()));
			vo.setEndTime(DateUtil.formatDefaultDate(gzrzProject.getEndTime()));
			vo.setAllTime(gzrzProject.getAllTime());
			vo.setStatus(gzrzProject.getStatus());
			vo.setLastTime(gzrzProject.getLastTime());
			vo.setRemarks(gzrzProject.getRemarks());
			vo.setExplanation(gzrzProject.getExplanation());
			vo.setUsercode(gzrzProject.getUsercode());
			voList.add(vo);
		}
		writeAjaxJSONResponse(
				ResultMessageBuilder.build(true, 1, "获取项目列表成功!", voList),
				response);
		logger.info("getProjectsByTime end");
	}

	/**
	 * 获取所有的项目(过滤重复的)
	 * @param response
	 */
	@RequestMapping(value = "/getProjects", method = RequestMethod.POST)
	public void getProjects(String Name,HttpServletResponse response) {
		logger.info("getProjects start");
		List<GzrzProject> lists = gzrzProjectService.findGzrzProjectsByName(Name);
		List<ProjectVO> voList = new ArrayList<>();
		ProjectVO vo;
		for (GzrzProject gzrzProject : lists) {
			vo = new ProjectVO();
			vo.setId(gzrzProject.getId());
			vo.setName(gzrzProject.getName());
			vo.setStartTime(DateUtil.formatDefaultDate(gzrzProject
					.getStartTime()));
			vo.setEndTime(DateUtil.formatDefaultDate(gzrzProject.getEndTime()));
			vo.setAllTime(gzrzProject.getAllTime());
			vo.setStatus(gzrzProject.getStatus());
			vo.setLastTime(gzrzProject.getLastTime());
			vo.setRemarks(gzrzProject.getRemarks());
			vo.setExplanation(gzrzProject.getExplanation());
			vo.setUsercode(gzrzProject.getUsercode());
			voList.add(vo);
		}
		writeAjaxJSONResponse(
				ResultMessageBuilder.build(true, 1, "获取项目列表成功!", voList),
				response);
		logger.info("getProjects end");
	}
	
	/**
	 * 新增项目模块
	 * 
	 * @param modelName
	 * @param projectId
	 * @param startTime
	 * @param endTime
	 * @param remarks
	 * @param response
	 */
	@RequestMapping(value = "/insertModel", method = RequestMethod.POST)
	public void insertModel(String MODEL_NAME, String PROJECT_ID,
			String STARTTIME, String ENDTIME, String REMARKS,
			HttpServletResponse response) {
		logger.info("insertModel start");
		if (StringUtil.isEmpty(MODEL_NAME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[MODEL_NAME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(PROJECT_ID)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(STARTTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STARTTIME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(ENDTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ENDTIME]不能为空!"),
					response);
			return;
		}
		GzrzModel gzrzModel = new GzrzModel();
		gzrzModel.setName(MODEL_NAME);
		gzrzModel.setProjectId(Integer.parseInt(PROJECT_ID));
		gzrzModel.setStartTime(DateUtil.parseDefaultDate(STARTTIME));
		gzrzModel.setEndTime(DateUtil.parseDefaultDate(ENDTIME));
		gzrzModel.setRemarks(REMARKS);
		;
		gzrzModelService.insertGzrzModel(gzrzModel);

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "新增模块成功!"),
				response);
		logger.info("insertModel end");
	}

	/**
	 * 更新项目模块
	 * 
	 * @param modelId
	 * @param modelName
	 * @param startTime
	 * @param endTime
	 * @param remarks
	 * @param response
	 */
	@RequestMapping(value = "/updateModel", method = RequestMethod.POST)
	public void updateModel(String MODEL_ID, String MODEL_NAME,
			String STARTTIME, String ENDTIME, String REMARKS,
			HttpServletResponse response) {
		logger.info("updateModel start");
		if (StringUtil.isEmpty(MODEL_ID)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[MODEL_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(MODEL_NAME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[MODEL_NAME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(STARTTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STARTTIME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(ENDTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ENDTIME]不能为空!"),
					response);
			return;
		}
		GzrzModel gzrzModel = new GzrzModel();
		gzrzModel.setId(Integer.parseInt(MODEL_ID));
		gzrzModel.setName(MODEL_NAME);
		gzrzModel.setStartTime(DateUtil.parseDefaultDate(STARTTIME));
		gzrzModel.setEndTime(DateUtil.parseDefaultDate(ENDTIME));
		gzrzModel.setRemarks(REMARKS);
		
		gzrzModelService.updateGzrzModel(gzrzModel);

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改模块成功!"),
				response);
		logger.info("updateModel end");
	}

	/**
	 * 新增模块人员信息
	 * 
	 * @param content
	 * @param projectId
	 * @param modelId
	 * @param startTime
	 * @param endTime
	 * @param userCode
	 * @param workTime
	 * @param status
	 * @param remarks
	 * @param response
	 */
	@RequestMapping(value = "/insertModelUser", method = RequestMethod.POST)
	public void insertModelUser(String CONTENT, Integer PROJECT_ID,
			String MODEL_ID, String STARTTIME, String ENDTIME, String USERCODE,
			Double WORKTIME, Integer STATUS, String REMARKS,
			HttpServletResponse response) {
		logger.info("insertModelUser start");
		if (StringUtil.isEmpty(CONTENT)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[CONTENT]不能为空!"),
					response);
			return;
		}
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(MODEL_ID)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[MODEL_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(STARTTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STARTTIME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(ENDTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ENDTIME]不能为空!"),
					response);
			return;
		}
		if (STATUS == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STATUS]不能为空!"),
					response);
			return;
		}
		GzrzModelUser gzrzModelUser = new GzrzModelUser();
		gzrzModelUser.setContent(CONTENT);
		gzrzModelUser.setProjectId(PROJECT_ID);
		gzrzModelUser.setModelId(Integer.parseInt(MODEL_ID));
		gzrzModelUser.setStartTime(DateUtil.parseDefaultDate(STARTTIME));
		gzrzModelUser.setEndTime(DateUtil.parseDefaultDate(ENDTIME));
		gzrzModelUser.setUsercode(USERCODE);
		if (WORKTIME == null) {
			WORKTIME = 0.0;
		}
		gzrzModelUser.setWorkTime(WORKTIME);
		gzrzModelUser.setStatus(STATUS);
		gzrzModelUser.setRemarks(REMARKS);
		;
		gzrzModelUserService.insertGzrzModelUser(gzrzModelUser);
		// 更新项目总工时
		GzrzProject gzrzProject = new GzrzProject();
		gzrzProject.setId(PROJECT_ID);
		gzrzProject.setAllTime(WORKTIME);
		gzrzProjectService.updateProjectAllTime(gzrzProject, 1);

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "新增模块计划成功!"),
				response);
		logger.info("insertModelUser end");
	}

	/**
	 * 获取模块人员关联信息
	 *
	 * @param ID
	 * @param response
	 */
	@RequestMapping(value = "/getModelUser", method = RequestMethod.POST)
	public void getModelUser(Integer ID, HttpServletResponse response) {
		logger.info("getModelUser start");
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ID]不能为空!"),
					response);
			return;
		}
		GzrzModelUser gzrzModelUser = new GzrzModelUser();
		gzrzModelUser.setId(ID);
		gzrzModelUser = gzrzModelUserService.getGzrzModelUser(gzrzModelUser);
		if (gzrzModelUser == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "获取模块人员关联信息失败!"),
					response);
			return;
		}
		ModelUserVO modelUserVO = new ModelUserVO();
		modelUserVO.setProjectId(gzrzModelUser.getProjectId());
		modelUserVO.setRemarks(gzrzModelUser.getRemarks());
		modelUserVO.setUsercode(gzrzModelUser.getUsercode());
		modelUserVO.setWorkTime(gzrzModelUser.getWorkTime());
		modelUserVO.setContent(gzrzModelUser.getContent());
		modelUserVO.setStartTime(DateUtil.formatDefaultDate(gzrzModelUser
				.getStartTime()));
		modelUserVO.setEndTime(DateUtil.formatDefaultDate(gzrzModelUser
				.getEndTime()));
		modelUserVO.setId(gzrzModelUser.getId());
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1,
				"获取模块人员关联信息成功!", modelUserVO), response);
		logger.info("getModelUser end");
	}

	/**
	 * 更新模块人员信息
	 * 
	 * @param modelUserId
	 * @param content
	 * @param projectId
	 * @param startTime
	 * @param endTime
	 * @param userCode
	 * @param workTime
	 * @param status
	 * @param remarks
	 * @param response
	 */
	@RequestMapping(value = "/updateModelUser", method = RequestMethod.POST)
	public void updateModelUser(String MODELUSER_ID, String CONTENT,
			Integer PROJECT_ID, String STARTTIME, String ENDTIME,
			String USERCODE, Double WORKTIME, String REMARKS,
			HttpServletResponse response) {
		logger.info("updateModelUser start");
		if (StringUtil.isEmpty(MODELUSER_ID)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1,
					"[MODELUSER_ID]不能为空!"), response);
			return;
		}
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(STARTTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[STARTTIME]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(ENDTIME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ENDTIME]不能为空!"),
					response);
			return;
		}
		GzrzModelUser gzrzModelUser = new GzrzModelUser();
		gzrzModelUser.setId(Integer.parseInt(MODELUSER_ID));
		GzrzModelUser user = gzrzModelUserService
				.getGzrzModelUser(gzrzModelUser);
		gzrzModelUser.setContent(CONTENT);
		gzrzModelUser.setStartTime(DateUtil.parseDefaultDate(STARTTIME));
		gzrzModelUser.setEndTime(DateUtil.parseDefaultDate(ENDTIME));
		gzrzModelUser.setUsercode(USERCODE);
		if (WORKTIME == null) {
			WORKTIME = 0.0;
		}
		gzrzModelUser.setWorkTime(WORKTIME);
		gzrzModelUser.setRemarks(REMARKS);
		gzrzModelUserService.updateGzrzModelUser(gzrzModelUser);
		// 更新项目总工时
		GzrzProject gzrzProject = new GzrzProject();
		gzrzProject.setId(PROJECT_ID);
		gzrzProject.setAllTime(user.getWorkTime());
		gzrzProjectService.updateProjectAllTime(gzrzProject, -1);
		gzrzProject.setAllTime(WORKTIME);
		gzrzProjectService.updateProjectAllTime(gzrzProject, 1);

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改模块计划成功!"),
				response);
		logger.info("updateModelUser end");
	}

	/**
	 * 根据项目id获取模块相关信息
	 *
	 * @param projectId
	 * @param response
	 */
	@RequestMapping(value = "/getModelByPId", method = RequestMethod.POST)
	public void getModelByPId(String PROJECT_ID, String FILTER_MODELS, HttpServletResponse response) {
		logger.info("getModelByPId start");
		if (StringUtil.isEmpty(PROJECT_ID)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"),
					response);
			return;
		}
		List<String> statusIds = new ArrayList<String>();
		if(!StringUtil.isEmpty(FILTER_MODELS)){
			String [] filterModels=FILTER_MODELS.split("\\|");
			statusIds=Arrays.asList(filterModels);
		}
		// 获取项目下模块的的信息
		List<GzrzModel> models = gzrzModelService.getGzrzModelByPid(PROJECT_ID);
		ModelAndUserVO modelAndUserVO = new ModelAndUserVO();
		List<ModelVO> modelVOList = new ArrayList<>();
		ModelVO modelVO;
		List<ModelUserVO> userListVO;
		for (GzrzModel gzrzModel : models) {
			modelVO = new ModelVO();
			modelVO.setEndTime(DateUtil.formatDefaultDate(gzrzModel
					.getEndTime()));
			modelVO.setId(gzrzModel.getId());
			List<GzrzModelUser> modelUsers = gzrzModelUserService
					.getGzrzModelUserByIds(PROJECT_ID,
							String.valueOf(gzrzModel.getId()),statusIds);
			userListVO = new ArrayList<>();
			ModelUserVO modelUserVO;
			if (modelUsers != null) {
				for (GzrzModelUser modelUser : modelUsers) {
					modelUserVO = new ModelUserVO();
					modelUserVO.convertPOToVO(modelUser);
					userListVO.add(modelUserVO);
				}
			}
			modelVO.setList(userListVO);
			modelVO.setName(gzrzModel.getName());
			modelVO.setProjectId(gzrzModel.getProjectId());
			modelVO.setRemarks(gzrzModel.getRemarks());
			modelVO.setStartTime(DateUtil.formatDefaultDate(gzrzModel
					.getStartTime()));
			modelVOList.add(modelVO);
		}
		// 获取项目下人员工时汇总
		List<GzrzModelUser> workTimes = gzrzModelUserService
				.getWorkTimesById(PROJECT_ID);
		List<ModelUserVO> modelUserVOList = new ArrayList<>();
		ModelUserVO modelUserVO;
		for (GzrzModelUser gzrzModelUser : workTimes) {
			modelUserVO = new ModelUserVO();
			modelUserVO.setProjectId(gzrzModelUser.getProjectId());
			modelUserVO.setUsedTimes(gzrzModelUser.getUsedTimes());
			modelUserVO.setUsedTimes(gzrzModelUser.getUsedTimes());
			modelUserVO.setConfirmTimes(gzrzModelUser.getConfirmTimes());
			modelUserVO.setUsercode(gzrzModelUser.getUsercode());
			modelUserVO.setUserName(gzrzModelUser.getUserName());
			modelUserVO.setWorkTimes(gzrzModelUser.getWorkTimes());
			modelUserVOList.add(modelUserVO);
		}
		modelAndUserVO.setModelVOList(modelVOList);
		modelAndUserVO.setModelUserVOList(modelUserVOList);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "项目下模块获取成功!",
				modelAndUserVO), response);
		logger.info("getModelByPId end");
	}

	/**
	 * 获取当前用户下参与的项目列表
	 * 
	 * @param USERCODE
	 * @param response
	 */
	@RequestMapping(value = "/getModelByUCode", method = RequestMethod.POST)
	public void getModelByUCode(String USERCODE, HttpServletResponse response) {
		logger.info("getModelByUCode start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"),
					response);
			return;
		}
		// 获取用戶下参与的项目列表
		List<GzrzModelUser> projects = gzrzModelUserService
				.findGzrzProjectsByUcode(USERCODE);
		List<ModelUserVO> modelUserVOList = new ArrayList<>();
		ModelUserVO modelUserVO;
		for (GzrzModelUser modelUser : projects) {
			modelUserVO = new ModelUserVO();
			modelUserVO.setProjectId(modelUser.getProjectId());
			modelUserVO.setProjectName(modelUser.getProjectName());
			modelUserVOList.add(modelUserVO);
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1,
				"获取用户下参与的项目列表成功！", modelUserVOList), response);
		logger.info("getModelByUCode end");
	}

	/**
	 * 删除项目
	 * @param PROJECTID
	 * @param response
	 */
	@RequestMapping(value = "/deleteProject", method = RequestMethod.POST)
	public void deleteProject(Integer PROJECT_ID, HttpServletResponse response) {
		logger.info("deleteProject start");
		if(PROJECT_ID == null){
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "项目ID不能为空!"),response);
			return;
		}
		GzrzProject gzrzProject=new GzrzProject();
		gzrzProject.setId(PROJECT_ID);
		Boolean booDel=gzrzProjectService.deleteGzrzProject(gzrzProject);
		if (booDel) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(true, 1, "项目删除成功！"), response);
		} else {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(true, -1, "项目删除失败！"), response);
			return;
		}
		logger.info("deleteProject end");
	}
	
}