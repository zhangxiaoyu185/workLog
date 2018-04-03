package com.tzt.workLog.controller;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import com.tzt.workLog.entity.GzrzDayTask;
import com.tzt.workLog.entity.GzrzMonthTask;
import com.tzt.workLog.entity.GzrzRemarks;
import com.tzt.workLog.entity.GzrzWeekTask;
import com.tzt.workLog.service.GzrzDayTaskService;
import com.tzt.workLog.service.GzrzMonthTaskService;
import com.tzt.workLog.service.GzrzRemarksService;
import com.tzt.workLog.service.GzrzWeekTaskService;
import com.tzt.workLog.tool.DateUtil;
import com.tzt.workLog.tool.SpringConstant;
import com.tzt.workLog.tool.StringUtil;
import com.tzt.workLog.tool.out.ResultMessageBuilder;
import com.tzt.workLog.vo.DayTaskVO;
import com.tzt.workLog.vo.DayVO;
import com.tzt.workLog.vo.MonthTaskVO;
import com.tzt.workLog.vo.WeekAndDayTaskVO;
import com.tzt.workLog.vo.WeekTaskVO;

@Controller
@RequestMapping(value="/worklog")
public class WorkLogController extends BaseController {

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
	 * 日报表
	 */
	@Autowired
	private GzrzDayTaskService gzrzDayTaskService;
	
	/**
	 * 备注表
	 */
	@Autowired
	private GzrzRemarksService gzrzRemarksService;

	/**
	 * 月任务列表
	 * 
	 * @param USERCODE 工号
	 * @param YEAR 年份
	 * @param MONTH 月份
	 * @param response
	 */
	@RequestMapping(value = "/monthTaskList", method = RequestMethod.POST)
	public void monthTaskList(String USERCODE, Integer YEAR, Integer MONTH, HttpServletResponse response) {
		logger.info("monthTaskList start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (YEAR == null || YEAR <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[YEAR]不能为空!"), response);
			return;
		}
		if (MONTH == null || MONTH <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[MONTH]不能为空!"), response);
			return;
		}
		List<GzrzMonthTask> list = gzrzMonthTaskService.findGzrzMonthTaskByUserCode(USERCODE, YEAR, MONTH);
		List<MonthTaskVO> voList = new ArrayList<>();
		MonthTaskVO vo;
		for (GzrzMonthTask monthTask : list) {
			vo = new MonthTaskVO();
			vo.setId(monthTask.getId());
			vo.setContent(monthTask.getContent());
			vo.setUsercode(monthTask.getUsercode());
			vo.setStatus(monthTask.getStatus());
			vo.setProjectId(monthTask.getProjectId());
			vo.setProjectName(monthTask.getProjectName());
			vo.setStartTime(DateUtil.formatDefaultDate(monthTask.getStartTime()));
			vo.setEndTime(DateUtil.formatDefaultDate(monthTask.getEndTime()));
			vo.setRemarks(monthTask.getRemarks());
			vo.setType(monthTask.getType());
			voList.add(vo);
		}
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询月任务列表成功!", voList), response);
		logger.info("monthTaskList end");
	}

	/**
	 * 获取单个月任务
	 * 
	 * @param ID 月任务ID
	 * @param response
	 */
	@RequestMapping(value = "/getMonthTask", method = RequestMethod.POST)
	public void getMonthTask(Integer ID, HttpServletResponse response) {
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		GzrzMonthTask monthTask = new GzrzMonthTask();
		monthTask.setId(ID);
		monthTask = gzrzMonthTaskService.getGzrzMonthTask(monthTask);
		if (monthTask == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "获取月任务失败!"), response);
			return;
		}
		MonthTaskVO vo = new MonthTaskVO();
		vo.setId(monthTask.getId());
		vo.setContent(monthTask.getContent());
		vo.setUsercode(monthTask.getUsercode());
		vo.setStatus(monthTask.getStatus());
		vo.setProjectId(monthTask.getProjectId());
		vo.setProjectName(monthTask.getProjectName());
		vo.setStartTime(DateUtil.formatDefaultDate(monthTask.getStartTime()));
		vo.setEndTime(DateUtil.formatDefaultDate(monthTask.getEndTime()));
		vo.setRemarks(monthTask.getRemarks());
		vo.setType(monthTask.getType());

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取月任务成功!", vo), response);
		logger.info("getMonthTask end");
	}
	
	/**
	 * 批量新增月任务
	 * 
	 * @param USERCODE 责任人工号
	 * @param TYPE 分配类型（0分配/1添加）
	 * @param TASKGRID 月任务列表  内容|项目ID|开始时间|结束时间|
	 * @param response
	 */
	@RequestMapping(value = "/addMonthTask", method = RequestMethod.POST)
	public void addMonthTask(String USERCODE, Integer TYPE, String TASKGRID, HttpServletResponse response) {
		logger.info("addMonthTask start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		Date date = new Date();
		int YEAR = DateUtil.getYear(date);
		int MONTH = DateUtil.getMonth(date);
		int DAY = DateUtil.getDay(date);
		if (TYPE == 0) {
			if (DAY > 10 && DAY < 20) {
				writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "分配月任务的时间为上月20号到本月10号!"), response);
				return;
			}
			if (DAY >= 20) { //添加的为下个月的月任务
				if (MONTH == 12) {
					YEAR = YEAR +1;
					MONTH = 1;
				}else {
					MONTH = MONTH +1;
				}
			}
//			if (DAY > 10) {
//				writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "分配月任务的截止时间为本月10号!"), response);
//				return;
//			}
		}
		if (StringUtil.isEmpty(TASKGRID)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[TASKGRID]不能为空!"), response);
			return;
		}
		List<GzrzMonthTask> taskList = new ArrayList<>();
		GzrzMonthTask gzrzMonthTask = new GzrzMonthTask(); 
		String[] monthTaskList = TASKGRID.split("\r\n");
		for (int i = 0; i < monthTaskList.length; i++) {
			String[] unList = monthTaskList[i].split("\\|");
			if (unList.length < 4 || ("").equals(unList[0]) || ("").equals(unList[1])
					|| ("").equals(unList[2]) || ("").equals(unList[3])) { //都不能为空
				continue;
			}
			gzrzMonthTask = new GzrzMonthTask();
			gzrzMonthTask.setContent(unList[0]);
			gzrzMonthTask.setEndTime(DateUtil.parseDefaultDate(unList[3]));
			gzrzMonthTask.setMonth(MONTH);
			gzrzMonthTask.setProjectId(Integer.valueOf(unList[1]));
			gzrzMonthTask.setType(TYPE);
			gzrzMonthTask.setUsercode(USERCODE);
			gzrzMonthTask.setYear(YEAR);
			gzrzMonthTask.setStartTime(DateUtil.parseDefaultDate(unList[2]));
			taskList.add(gzrzMonthTask);
		}
		if (taskList.size() <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -100, "添加月任务失败!"), response);
			logger.info("addMonthTask end");
			return;
		}
		gzrzMonthTaskService.insertGzrzMonthTaskBatch(taskList);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加月任务成功!"), response);
		logger.info("addMonthTask end");
	}

	/**
	 * 修改月任务(只有项目经理修改月分配任务)
	 * 
	 * @param ID ID
	 * @param USERCODE 责任人工号
	 * @param CONTENT 内容
	 * @param PROJECT_ID 项目ID
	 * @param START_TIME 开始时间
	 * @param END_TIME 结束时间
	 * @param response
	 */
	@RequestMapping(value = "/updateMonthTask", method = RequestMethod.POST)
	public void updateMonthTask(Integer ID, String USERCODE, String CONTENT, Integer PROJECT_ID, String START_TIME, String END_TIME, HttpServletResponse response) {
		logger.info("updateMonthTask start");
		if (ID == null || ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(CONTENT)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[CONTENT]不能为空!"), response);
			return;
		}
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(START_TIME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[START_TIME]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(END_TIME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[END_TIME]不能为空!"), response);
			return;
		}
		Date date = new Date();
		int YEAR = DateUtil.getYear(date);
		int MONTH = DateUtil.getMonth(date);
		int DAY = DateUtil.getDay(date);
		if (DAY > 10 && DAY < 20) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "分配月任务的时间为上月20号到本月10号!"), response);
			return;
		}
		if (DAY >= 20) { // 添加的为下个月的月任务
			if (MONTH == 12) {
				YEAR = YEAR + 1;
				MONTH = 1;
			} else {
				MONTH = MONTH + 1;
			}
		}
//		if (DAY > 10) {
//			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "修改分配月任务的截止时间为本月10号!"), response);
//			return;
//		}
		GzrzMonthTask gzrzMonthTask = new GzrzMonthTask();
		gzrzMonthTask.setId(ID);
		gzrzMonthTask.setContent(CONTENT);
		gzrzMonthTask.setEndTime(DateUtil.parseDefaultDate(END_TIME));
		gzrzMonthTask.setProjectId(PROJECT_ID);
		gzrzMonthTask.setUsercode(USERCODE);
		gzrzMonthTask.setStartTime(DateUtil.parseDefaultDate(START_TIME));
		gzrzMonthTaskService.updateGzrzMonthTask(gzrzMonthTask);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改月任务成功!"), response);
		logger.info("updateMonthTask end");
	}
	
	/**
	 * 删除月任务(只有项目经理删除月分配任务)
	 * 
	 * @param ID ID
	 * @param response
	 */
	@RequestMapping(value = "/deleteMonthTask", method = RequestMethod.POST)
	public void deleteMonthTask(Integer ID, HttpServletResponse response) {
		logger.info("deleteMonthTask start");
		if (ID == null || ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		Date date = new Date();
		int YEAR = DateUtil.getYear(date);
		int MONTH = DateUtil.getMonth(date);
		int DAY = DateUtil.getDay(date);
		if (DAY > 10 && DAY < 20) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "分配月任务的时间为上月20号到本月10号!"), response);
			return;
		}
		if (DAY >= 20) { // 添加的为下个月的月任务
			if (MONTH == 12) {
				YEAR = YEAR + 1;
				MONTH = 1;
			} else {
				MONTH = MONTH + 1;
			}
		}
//		if (DAY > 10) {
//			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "删除分配月任务的截止时间为本月10号!"), response);
//			return;
//		}
		GzrzMonthTask gzrzMonthTask = new GzrzMonthTask();
		gzrzMonthTask.setId(ID);
		gzrzMonthTaskService.deleteGzrzMonthTask(gzrzMonthTask);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "删除月任务成功!"), response);
		logger.info("deleteMonthTask end");
	}
	
	/**
	 * 每周周任务列表和日报列表(带回复)，按周分页
	 * 
	 * @param USERCODE 工号
	 * @param TYPE -1上一周,1下一周
	 * @param YEAR 年份
	 * @param MONTH 月份
	 * @param WEEK 周数
	 * @param response
	 */
	@RequestMapping(value = "/weekAndDayTaskList", method = RequestMethod.POST)
	public void weekAndDayTaskList(String USERCODE, Integer TYPE, Integer YEAR, Integer MONTH, Integer WEEK, Integer NOW_WEEK, HttpServletResponse response) {
		logger.info("weekAndDayTaskList start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (TYPE == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[TYPE]不能为空!"), response);
			return;
		}
		if (YEAR == null || YEAR <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[YEAR]不能为空或0!"), response);
			return;
		}
		if (MONTH == null || MONTH <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[MONTH]不能为空或0!"), response);
			return;
		}
		if (NOW_WEEK == null || NOW_WEEK <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[NOW_WEEK]不能为空或0!"), response);
			return;
		}
		if (WEEK == null || WEEK <= 0) {			
			//WEEK = gzrzWeekTaskService.getMaxWeekByYearAndMonth(USERCODE, YEAR, MONTH);	//取数据库里最大周
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[WEEK]不能为空或0!"), response);
			return;
		}
		WeekAndDayTaskVO weekAndDayTaskVO = new WeekAndDayTaskVO();
		while (true) {
			WEEK = WEEK + TYPE; //上一周下一周操作
			if (WEEK <= 0 || WEEK > 5) {
				break;
			}
			weekAndDayTaskVO = new WeekAndDayTaskVO();
			//查找周任务
			List<WeekTaskVO> weekTaskVOList = new ArrayList<>();
			WeekTaskVO weekVo;
			List<GzrzWeekTask> list = gzrzWeekTaskService.findGzrzWeekTaskByUserCode(USERCODE, YEAR, MONTH, WEEK);
			for (GzrzWeekTask weekTask : list) {
				weekVo = new WeekTaskVO();
				weekVo.setContent(weekTask.getContent());
				weekVo.setEndTime(DateUtil.formatDefaultDate(weekTask.getEndTime()));
				weekVo.setId(weekTask.getId());
				weekVo.setProjectId(weekTask.getProjectId());
				weekVo.setProjectName(weekTask.getProjectName());
				weekVo.setRemarks(weekTask.getRemarks());
				weekVo.setStartTime(DateUtil.formatDefaultDate(weekTask.getStartTime()));
				weekVo.setStatus(weekTask.getStatus());
				weekVo.setUsercode(weekTask.getUsercode());
				weekTaskVOList.add(weekVo);
			}
			weekAndDayTaskVO.setWeekTaskVOList(weekTaskVOList);		
			//查找周任务下的日报列表
			GzrzDayTask gzrzDayTask = new GzrzDayTask();
			gzrzDayTask.setUsercode(USERCODE);
			gzrzDayTask.setYear(YEAR);
			gzrzDayTask.setMonth(MONTH);
			gzrzDayTask.setWeek(WEEK);
			List<DayVO> dayVOList = new ArrayList<>();
			List<DayTaskVO> dayTaskVOList = new ArrayList<>();
			DayTaskVO vo;
			DayVO dayVO = new DayVO();
			String strWorkdate = "";
			List<GzrzDayTask> dayList = gzrzDayTaskService.findGzrzDayTaskByYearAndMonthAndDay(gzrzDayTask);
			for (GzrzDayTask dayTask : dayList) {
				if (("").equals(strWorkdate)) {
					strWorkdate = dayTask.getWorkdate();
					dayVO.setWorkdate(strWorkdate);
				}
				vo = new DayTaskVO();
				vo.setAdddate(DateUtil.formatTimesTampDate(dayTask.getAdddate()));
				vo.setContent(dayTask.getContent());
				vo.setId(dayTask.getId());
				vo.setProjectId(dayTask.getProjectId());		
				vo.setStatus(dayTask.getStatus());
				vo.setUsedtimes(dayTask.getUsedtimes());
				vo.setUsercode(dayTask.getUsercode());
				vo.setWorkdate(dayTask.getWorkdate());
				vo.setProjectName(dayTask.getProjectName());
				vo.setUsername(dayTask.getUsername());
				vo.setYear(dayTask.getYear());
				vo.setMonth(dayTask.getMonth());
				vo.setWeek(dayTask.getWeek());
				vo.setConfirmtimes(dayTask.getConfirmtimes());
				vo.setIsconfirm(dayTask.getIsconfirm());
				//查询回复列表
				List<GzrzRemarks> remarksList = gzrzRemarksService.findGzrzRemarks(dayTask.getId());
				String strRemarks = "";
				String str = "";
				for (GzrzRemarks remarks: remarksList) {
					if (!("").equals(strRemarks)) {
						strRemarks += "<br />";
					}
					str = "<font color='#FF0000'>" + remarks.getName() + "</font>：" + remarks.getContent();
					strRemarks += str;
				}
				vo.setStrRemarks(strRemarks);
				if (!strWorkdate.equals(vo.getWorkdate())) {
					strWorkdate = vo.getWorkdate();
					dayVO.setVoList(dayTaskVOList);
					dayVOList.add(dayVO);
					dayVO = new DayVO();
					dayVO.setWorkdate(vo.getWorkdate());
					dayTaskVOList = new ArrayList<>();
				}
				dayTaskVOList.add(vo);
			}
			dayVO.setVoList(dayTaskVOList);
			dayVOList.add(dayVO);
			weekAndDayTaskVO.setDayTaskVOList(dayVOList);
			if (list.size() > 0 || dayList.size() > 0) {
				break;
			}
			if (YEAR == DateUtil.getYear(DateUtil.getFirstDayOfWeek(new Date())) && MONTH == DateUtil.getMonth(DateUtil.getFirstDayOfWeek(new Date())) && NOW_WEEK == WEEK) {
				break;
			}
			if (TYPE == 0) {
				TYPE = -1;
			}
		}
		weekAndDayTaskVO.setWeek(WEEK); //返回本周
		if (WEEK <= 0 || WEEK > 5) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, 2, "无数据!",weekAndDayTaskVO), response);
			return;
		}		
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询成功!", weekAndDayTaskVO), response);
		logger.info("weekAndDayTaskList end");
	}

	/**
	 * 批量新增周任务
	 * 
	 * @param USERCODE 工号
	 * @param TASKGRID 周任务列表  内容|项目ID|开始时间|结束时间|
	 * @param response
	 */
	@RequestMapping(value = "/addWeekTask", method = RequestMethod.POST)
	public void addWeekTask(String USERCODE, String TASKGRID, HttpServletResponse response) {
		logger.info("addWeekTask start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		Date date = new Date();
		int YEAR = DateUtil.getYear(DateUtil.getFirstDayOfWeek(date));
		int MONTH = DateUtil.getMonth(DateUtil.getFirstDayOfWeek(date));
		int WEEK = DateUtil.getWhileWeekOfMonth((DateUtil.getFirstDayOfWeek(date)));
		if (StringUtil.isEmpty(TASKGRID)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[TASKGRID]不能为空!"), response);
			return;
		}
		List<GzrzWeekTask> taskList = new ArrayList<>();
		GzrzWeekTask gzrzWeekTask = new GzrzWeekTask(); 
		String[] weekTaskList = TASKGRID.split("\r\n");
		for (int i = 0; i < weekTaskList.length; i++) {
			String[] unList = weekTaskList[i].split("\\|");
			if (unList.length < 4 || ("").equals(unList[0]) || ("").equals(unList[1])
					|| ("").equals(unList[2]) || ("").equals(unList[3])) { //都不能为空
				continue;
			}
			gzrzWeekTask = new GzrzWeekTask();
			gzrzWeekTask.setContent(unList[0]);
			gzrzWeekTask.setEndTime(DateUtil.parseDefaultDate(unList[3]));
			gzrzWeekTask.setMonth(MONTH);
			gzrzWeekTask.setProjectId(Integer.valueOf(unList[1]));
			gzrzWeekTask.setWeek(WEEK);
			gzrzWeekTask.setUsercode(USERCODE);
			gzrzWeekTask.setYear(YEAR);
			gzrzWeekTask.setStartTime(DateUtil.parseDefaultDate(unList[2]));
			taskList.add(gzrzWeekTask);
		}		
		if (taskList.size() <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "添加周任务失败!"), response);
			logger.info("addWeekTask end");
			return;
		}
		gzrzWeekTaskService.insertGzrzWeekTaskBatch(taskList);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加周任务成功!"), response);
		logger.info("addWeekTask end");
	}

	/**
	 * 获取单个周任务
	 * 
	 * @param ID 周任务ID
	 * @param response
	 */
	@RequestMapping(value = "/getWeekTask", method = RequestMethod.POST)
	public void getWeekTask(Integer ID, HttpServletResponse response) {
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		GzrzWeekTask weekTask = new GzrzWeekTask();
		weekTask.setId(ID);
		weekTask = gzrzWeekTaskService.getGzrzWeekTask(weekTask);
		if (weekTask == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "获取周任务失败!"), response);
			return;
		}
		WeekTaskVO vo = new WeekTaskVO();
		vo.setContent(weekTask.getContent());
		vo.setEndTime(DateUtil.formatDefaultDate(weekTask.getEndTime()));
		vo.setId(weekTask.getId());
		vo.setProjectId(weekTask.getProjectId());
		vo.setProjectName(weekTask.getProjectName());
		vo.setRemarks(weekTask.getRemarks());
		vo.setStartTime(DateUtil.formatDefaultDate(weekTask.getStartTime()));
		vo.setStatus(weekTask.getStatus());
		vo.setUsercode(weekTask.getUsercode());

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取周任务成功!", vo), response);
		logger.info("getWeekTask end");
	}
	
	/**
	 * 修改周任务
	 * 
	 * @param ID ID
	 * @param CONTENT 内容
	 * @param PROJECT_ID 项目ID
	 * @param START_TIME 开始时间
	 * @param END_TIME 结束时间
	 * @param response
	 */
	@RequestMapping(value = "/updateWeekTask", method = RequestMethod.POST)
	public void updateWeekTask(Integer ID, String CONTENT, Integer PROJECT_ID, String START_TIME, String END_TIME, HttpServletResponse response) {
		logger.info("updateWeekTask start");
		if (ID == null || ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(CONTENT)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[CONTENT]不能为空!"), response);
			return;
		}
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(START_TIME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[START_TIME]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(END_TIME)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[END_TIME]不能为空!"), response);
			return;
		}
		GzrzWeekTask gzrzWeekTask = new GzrzWeekTask();
		gzrzWeekTask.setId(ID);
		gzrzWeekTask.setContent(CONTENT);
		gzrzWeekTask.setEndTime(DateUtil.parseDefaultDate(END_TIME));
		gzrzWeekTask.setProjectId(PROJECT_ID);
		gzrzWeekTask.setStartTime(DateUtil.parseDefaultDate(START_TIME));
		gzrzWeekTaskService.updateGzrzWeekTask(gzrzWeekTask);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改周任务成功!"), response);
		logger.info("updateWeekTask end");
	}
	
	/**
	 * 日报备注
	 * @param WORKDATE
	 * @param USERCODE
	 * @param response
	 */
	@RequestMapping(value = "/dayTaskListByIUW", method = RequestMethod.POST)
	public void dayTaskListByIUW(String WORKDATE, String USERCODE, HttpServletResponse response) {
		logger.info("dayTaskListByIUW start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(WORKDATE)) {			
			WORKDATE = DateUtil.formatDefaultDate(DateUtil.getTomorrowday()); //获取当前年月日+1
		}
		if (gzrzDayTaskService == null) {
			gzrzDayTaskService = (GzrzDayTaskService) SpringConstant.ctx.getBean("gzrzDayTaskService");				
		}
		if (gzrzRemarksService == null) {
			gzrzRemarksService = (GzrzRemarksService) SpringConstant.ctx.getBean("gzrzRemarksService");
		}
		GzrzDayTask gzrzDayTask = new GzrzDayTask();
		gzrzDayTask.setUsercode(USERCODE);
		gzrzDayTask.setWorkdate(WORKDATE);
		List<GzrzDayTask> dayList = gzrzDayTaskService.findGzrzDayTaskSummary(gzrzDayTask);
		List<DayTaskVO> dayTaskVOList = new ArrayList<>();
		DayTaskVO vo;
		DayVO dayVO = new DayVO();
		String strWorkdate = "";
		for (GzrzDayTask dayTask : dayList) {
			if (("").equals(strWorkdate)) {
				strWorkdate = dayTask.getWorkdate();
				dayVO.setWorkdate(strWorkdate);
			}
			vo = new DayTaskVO();
			vo.setAdddate(DateUtil.formatTimesTampDate(dayTask.getAdddate()));
			vo.setContent(dayTask.getContent());
			vo.setId(dayTask.getId());
			vo.setProjectId(dayTask.getProjectId());		
			vo.setStatus(dayTask.getStatus());
			vo.setUsedtimes(dayTask.getUsedtimes());
			vo.setUsercode(dayTask.getUsercode());
			vo.setWorkdate(dayTask.getWorkdate());
			vo.setProjectName(dayTask.getProjectName());
			vo.setUsername(dayTask.getUsername());
			vo.setYear(dayTask.getYear());
			vo.setMonth(dayTask.getMonth());
			vo.setWeek(dayTask.getWeek());
			vo.setConfirmtimes(dayTask.getConfirmtimes());
			vo.setIsconfirm(dayTask.getIsconfirm());
			//查询回复列表
			List<GzrzRemarks> remarksList = gzrzRemarksService.findGzrzRemarks(dayTask.getId());
			String strRemarks = "";
			String str = "";
			for (GzrzRemarks remarks: remarksList) {
				if (!("").equals(strRemarks)) {
					strRemarks += "<br />";
				}
				str = "<font color='#FF0000'>" + remarks.getName() + "</font>：" + remarks.getContent();
				strRemarks += str;
			}
			vo.setStrRemarks(strRemarks);
			dayTaskVOList.add(vo);
		}
		dayVO.setVoList(dayTaskVOList);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询成功!", dayVO), response);
		logger.info("dayTaskListByIUW end");
	}
	
	/**
	 * 项目最近1天的日报列表(带回复)，按天分页
	 * 
	 * @param PROJECT_ID 项目ID
	 * @param WORKDATE 日报日期
	 * @param response 
	 */
	@RequestMapping(value = "/dayTaskList", method = RequestMethod.POST)
	public void dayTaskList(Integer PROJECT_ID, String WORKDATE, HttpServletResponse response) {
		logger.info("dayTaskList start");
		if (PROJECT_ID == null || PROJECT_ID <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(WORKDATE)) {			
			WORKDATE = DateUtil.formatDefaultDate(DateUtil.getTomorrowday()); //获取当前年月日+1
		}
		if (gzrzDayTaskService == null) {
			gzrzDayTaskService = (GzrzDayTaskService) SpringConstant.ctx.getBean("gzrzDayTaskService");				
		}
		if (gzrzRemarksService == null) {
			gzrzRemarksService = (GzrzRemarksService) SpringConstant.ctx.getBean("gzrzRemarksService");
		}
		GzrzDayTask gzrzDayTask = new GzrzDayTask();
		gzrzDayTask.setProjectId(PROJECT_ID);
		gzrzDayTask.setWorkdate(WORKDATE);
		List<GzrzDayTask> dayList = gzrzDayTaskService.findGzrzDayTaskByProject(gzrzDayTask);
		List<DayTaskVO> dayTaskVOList = new ArrayList<>();
		DayTaskVO vo;
		DayVO dayVO = new DayVO();
		String strWorkdate = ""; // 更多下一日
		for (GzrzDayTask dayTask : dayList) {
			if (("").equals(strWorkdate)) {
				strWorkdate = dayTask.getWorkdate();
				dayVO.setWorkdate(strWorkdate);
			}
			vo = new DayTaskVO();
			vo.setAdddate(DateUtil.formatTimesTampDate(dayTask.getAdddate()));
			vo.setContent(dayTask.getContent());
			vo.setId(dayTask.getId());
			vo.setProjectId(dayTask.getProjectId());		
			vo.setStatus(dayTask.getStatus());
			vo.setUsedtimes(dayTask.getUsedtimes());
			vo.setUsercode(dayTask.getUsercode());
			vo.setWorkdate(dayTask.getWorkdate());
			vo.setProjectName(dayTask.getProjectName());
			vo.setUsername(dayTask.getUsername());
			vo.setConfirmtimes(dayTask.getConfirmtimes());
			vo.setIsconfirm(dayTask.getIsconfirm());
			//查询回复列表
			List<GzrzRemarks> remarksList = gzrzRemarksService.findGzrzRemarks(dayTask.getId());
			String strRemarks = "";
			String str = "";
			for (GzrzRemarks remarks: remarksList) {
				if (!("").equals(strRemarks)) {
					strRemarks += "<br />";
				}
				str = "<font color='#FF0000'>" + remarks.getName() + "</font>：" + remarks.getContent();
				strRemarks += str;
			}
			vo.setStrRemarks(strRemarks);
			dayTaskVOList.add(vo);
		}
		dayVO.setVoList(dayTaskVOList);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询成功!", dayVO), response);
		logger.info("dayTaskList end");
	}
	
	/**
	 * 新增日报
	 * 
	 * @param USERCODE 责任人工号
	 * @param WORKDATE 日报日期
	 * @param UNFINISH 未完成列表 内容|所属项目ID|用时
	 * @param FINISH 已完成列表 内容|所属项目ID|用时
	 * @param response
	 */
	@RequestMapping(value = "/addDayTask", method = RequestMethod.POST)
	public void addDayTask(String USERCODE, String WORKDATE, String UNFINISH, String FINISH, HttpServletResponse response) {
		logger.info("addDayTask start");
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(WORKDATE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[WORKDATE]不能为空!"), response);
			return;
		}
		Date workDay = DateUtil.parseDate(WORKDATE, "yyyy-MM-dd");
		if (DateUtil.diffDate(new Date(), workDay) > 7) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "选择的日报日期已超过7天，不能补!"), response);
			return;
		}
		List<GzrzDayTask> taskList = new ArrayList<>();
		GzrzDayTask gzrzDayTask = new GzrzDayTask(); 
		//未完成列表 内容|所属项目ID|用时
		if (!StringUtil.isEmpty(WORKDATE)) {
			String[] unfinishList = UNFINISH.split("\r\n");
			for (int i = 0; i < unfinishList.length; i++) {
				String[] unList = unfinishList[i].split("\\|");
				if (unList.length < 3) {
					continue;
				}
				gzrzDayTask = new GzrzDayTask();
				gzrzDayTask.setYear(DateUtil.getYear(DateUtil.getFirstDayOfWeek(workDay)));
				gzrzDayTask.setMonth(DateUtil.getMonth(DateUtil.getFirstDayOfWeek(workDay)));
				gzrzDayTask.setWeek(DateUtil.getWhileWeekOfMonth(DateUtil.getFirstDayOfWeek(workDay)));
				gzrzDayTask.setUsercode(USERCODE);
				gzrzDayTask.setWorkdate(WORKDATE);
				gzrzDayTask.setProjectId(Integer.valueOf(unList[1]));
				gzrzDayTask.setContent(unList[0]);
				gzrzDayTask.setUsedtimes(Double.valueOf(unList[2])); // 用时
				gzrzDayTask.setAdddate(new Date());
				gzrzDayTask.setStatus(0);
				gzrzDayTask.setConfirmtimes(Double.valueOf(unList[2]));
				gzrzDayTask.setIsconfirm(1);
				taskList.add(gzrzDayTask);
			}
		}		
		//已完成列表 内容|所属项目ID|用时
		if (!StringUtil.isEmpty(WORKDATE)) {
			String[] finishList = FINISH.split("\r\n");
			for (int i = 0; i < finishList.length; i++) {
				String[] list = finishList[i].split("\\|");
				if (list.length < 3) {
					continue;
				}
				gzrzDayTask = new GzrzDayTask();
				gzrzDayTask.setYear(DateUtil.getYear(DateUtil.getFirstDayOfWeek(workDay)));
				gzrzDayTask.setMonth(DateUtil.getMonth(DateUtil.getFirstDayOfWeek(workDay)));
				gzrzDayTask.setWeek(DateUtil.getWhileWeekOfMonth(DateUtil.getFirstDayOfWeek(workDay)));
				gzrzDayTask.setUsercode(USERCODE);
				gzrzDayTask.setWorkdate(WORKDATE);
				gzrzDayTask.setProjectId(Integer.valueOf(list[1]));
				gzrzDayTask.setContent(list[0]);
				gzrzDayTask.setUsedtimes(Double.valueOf(list[2])); // 用时
				gzrzDayTask.setAdddate(new Date());
				gzrzDayTask.setStatus(1);
				gzrzDayTask.setConfirmtimes(Double.valueOf(list[2]));
				gzrzDayTask.setIsconfirm(1);
				taskList.add(gzrzDayTask);
			}
		}		
		if (taskList.size() <= 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "添加日报失败!"), response);
			logger.info("addWeekTask end");
			return;
		}
		gzrzDayTaskService.insertGzrzDayTaskBatch(taskList);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "添加日报成功!"), response);
		logger.info("addDayTask end");
	}
	
	/**
	 * 确认工时，即修改状态和工时
	 * 
	 * @param STATUS 完成状态
	 * @param ID 日报ID
	 * @param CONFIRMTIMES 确认的用时
	 * @param response
	 */
	@RequestMapping(value = "/confirm/time", method = RequestMethod.POST)
	public void confirmWorkTime(Integer STATUS, Integer ID, Double CONFIRMTIMES, HttpServletResponse response) {
		logger.info("confirmWorkTime start");		
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		if (STATUS == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[STATUS]不能为空!"), response);
			return;
		}
		if (CONFIRMTIMES == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[CONFIRMTIMES]不能为空!"), response);
			return;
		}
		GzrzDayTask gzrzDayTask = new GzrzDayTask();
		gzrzDayTask.setId(ID);
		gzrzDayTask.setStatus(STATUS);
		gzrzDayTask.setConfirmtimes(CONFIRMTIMES); // 用时
		gzrzDayTask.setIsconfirm(2);
		gzrzDayTask.setAdddate(new Date());
		gzrzDayTaskService.updateGzrzDayTask(gzrzDayTask);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "确认工时成功!"), response);
		logger.info("confirmWorkTime end");
	}
	
	/**
	 * 修改当天日报
	 * 
	 * @param STATUS 完成状态
	 * @param ID 日报ID
	 * @param CONTENT 内容
	 * @param PROJRCT_ID 所属项目ID
	 * @param USEDTIMES 用时
	 * @param response
	 */
	@RequestMapping(value = "/updateDayTask", method = RequestMethod.POST)
	public void updateDayTask(Integer STATUS, Integer ID, String CONTENT, Integer PROJRCT_ID, Double USEDTIMES, HttpServletResponse response) {
		logger.info("updateDayTask start");		
		/*if (StringUtil.isEmpty(WORKDATE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[WORKDATE]不能为空!"), response);
			return;
		}
		if (!DateUtil.formatDate("yyyy-MM-dd", new Date()).equals(WORKDATE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "只能修改当天的日报!"), response);
			return;
		}*/
		if (ID == null || ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(CONTENT)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[CONTENT]不能为空!"), response);
			return;
		}
		if (PROJRCT_ID == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PROJRCT_ID]不能为空!"), response);
			return;
		}
		if (USEDTIMES == null || USEDTIMES == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USEDTIMES]不能为空!"), response);
			return;
		}
		GzrzDayTask gzrzDayTask = new GzrzDayTask();
		gzrzDayTask.setId(ID);
		gzrzDayTask = gzrzDayTaskService.getGzrzDayTask(gzrzDayTask);		
		if (2 == gzrzDayTask.getIsconfirm()) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, -1, "该日报已确认,不能修改!"), response);
			logger.info("updateDayTask end");
		}
		gzrzDayTask.setStatus(STATUS);
		gzrzDayTask.setProjectId(PROJRCT_ID);
		gzrzDayTask.setContent(CONTENT);
		gzrzDayTask.setUsedtimes(USEDTIMES); // 用时
		gzrzDayTask.setAdddate(new Date());
		gzrzDayTask.setConfirmtimes(USEDTIMES); // 确认用时
		gzrzDayTaskService.updateGzrzDayTask(gzrzDayTask);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "修改日报成功!"), response);
		logger.info("updateDayTask end");
	}
	
	/**
	 * 获取日报
	 * 
	 * @param DAYTASK_ID 日报ID
	 * @param response
	 */
	@RequestMapping(value = "/getDayTask", method = RequestMethod.POST)
	public void getDayTask(Integer DAYTASK_ID, HttpServletResponse response) {
		logger.info("getDayTask start");
		if (DAYTASK_ID == null || DAYTASK_ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[DAYTASK_ID]不能为空!"), response);
			return;
		}
		GzrzDayTask dayTask = new GzrzDayTask();
		dayTask.setId(DAYTASK_ID);
		dayTask = gzrzDayTaskService.getGzrzDayTask(dayTask);
		if (dayTask == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "获取日报失败!"), response);
			return;
		}
		DayTaskVO vo = new DayTaskVO();
		vo.setAdddate(DateUtil.formatTimesTampDate(dayTask.getAdddate()));
		vo.setContent(dayTask.getContent());
		vo.setId(dayTask.getId());
		vo.setProjectId(dayTask.getProjectId());
		vo.setStatus(dayTask.getStatus());
		vo.setUsedtimes(dayTask.getUsedtimes());
		vo.setUsercode(dayTask.getUsercode());
		vo.setWorkdate(dayTask.getWorkdate());
		vo.setProjectName(dayTask.getProjectName());
		vo.setUsername(dayTask.getUsername());
		vo.setConfirmtimes(dayTask.getConfirmtimes());
		vo.setIsconfirm(dayTask.getIsconfirm());
		//查询回复列表
		List<GzrzRemarks> remarksList = gzrzRemarksService.findGzrzRemarks(DAYTASK_ID);
		String strRemarks = "";
		String str = "";
		for (GzrzRemarks remarks: remarksList) {
			if (!("").equals(strRemarks)) {
				strRemarks += "<br />";
			}
			str = "<font color='#FF0000'>" + remarks.getName() + "</font>：" + remarks.getContent();
			strRemarks += str;
		}
		vo.setStrRemarks(strRemarks);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "获取日报成功!", vo), response);
		logger.info("getDayTask end");
	}
	
	/**
	 * 删除日报
	 * 
	 * @param DAYTASK_ID 日报ID
	 * @param response
	 */
	@RequestMapping(value = "/deleteDayTask", method = RequestMethod.POST)
	public void deleteDayTask(Integer DAYTASK_ID, HttpServletResponse response) {
		logger.info("deleteDayTask start");		
		if (DAYTASK_ID == null || DAYTASK_ID == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[DAYTASK_ID]不能为空!"), response);
			return;
		}
		GzrzDayTask gzrzDayTask = new GzrzDayTask(); 
		gzrzDayTask.setId(DAYTASK_ID);
		//删除日报
		gzrzDayTaskService.deleteGzrzDayTask(gzrzDayTask);
		//删除备注
		GzrzRemarks gzrzRemarks = new GzrzRemarks();
		gzrzRemarks.setDayTaskId(DAYTASK_ID);
		gzrzRemarksService.deleteGzrzRemarks(gzrzRemarks);
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "删除日报成功!"), response);
		logger.info("deleteDayTask end");
	}
	
	/**
	 * 总监-项目汇总-项目下人员日报汇总
	 * 
	 * @param PROJECT_ID 项目ID
	 * @param USERCODE 责任人工号
	 * @param response
	 */
	@RequestMapping(value = "/dayTaskSummaryByProject", method = RequestMethod.POST)
	public void dayTaskSummaryByProject(Integer PROJECT_ID, String USERCODE, HttpServletResponse response) {
		logger.info("dayTaskSummary start");
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		// 查找项目下人员日报列表
		GzrzDayTask gzrzDayTask = new GzrzDayTask();
		gzrzDayTask.setProjectId(PROJECT_ID);
		gzrzDayTask.setUsercode(USERCODE);
		List<GzrzDayTask> dayList = gzrzDayTaskService.findGzrzDayTaskSummary(gzrzDayTask);
		List<DayTaskVO> voList = new ArrayList<>();
		DayTaskVO vo;
		for (GzrzDayTask dayTask : dayList) {
			vo = new DayTaskVO();
			vo.setAdddate(DateUtil.formatTimesTampDate(dayTask.getAdddate()));
			vo.setContent(dayTask.getContent());
			vo.setId(dayTask.getId());
			vo.setProjectId(dayTask.getProjectId());		
			vo.setStatus(dayTask.getStatus());
			vo.setUsedtimes(dayTask.getUsedtimes());
			vo.setUsercode(dayTask.getUsercode());
			vo.setWorkdate(dayTask.getWorkdate());
			vo.setProjectName(dayTask.getProjectName());
			vo.setUsername(dayTask.getUsername());
			vo.setConfirmtimes(dayTask.getConfirmtimes());
			vo.setIsconfirm(dayTask.getIsconfirm());
			voList.add(vo);
		}
		
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询成功!", voList), response);
		logger.info("dayTaskSummary end");
	}
	
	/**
	 * 总监-人员管理-项目下人员日报汇总（按日期排序）
	 * 
	 * @param PROJECT_ID 项目ID
	 * @param USERCODE 责任人工号
	 * @param response
	 */
	@RequestMapping(value = "/dayTaskSummaryByUser", method = RequestMethod.POST)
	public void dayTaskSummaryByUser(Integer PROJECT_ID, String USERCODE, HttpServletResponse response) {
		logger.info("dayTaskSummary start");
		if (PROJECT_ID == null) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[PROJECT_ID]不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"), response);
			return;
		}
		// 查找项目下人员日报列表
		GzrzDayTask gzrzDayTask = new GzrzDayTask();
		gzrzDayTask.setProjectId(PROJECT_ID);
		gzrzDayTask.setUsercode(USERCODE);
		List<GzrzDayTask> dayList = gzrzDayTaskService.findGzrzDayTaskSummary(gzrzDayTask);
		List<DayVO> dayVOList = new ArrayList<>();
		DayVO dayVO = new DayVO();
		List<DayTaskVO> dayTaskVOList = new ArrayList<>();
		DayTaskVO vo;
		String strWorkdate = "";
		for (GzrzDayTask dayTask : dayList) {
			if (("").equals(strWorkdate)) {
				strWorkdate = dayTask.getWorkdate();
				dayVO.setWorkdate(strWorkdate);
			}
			vo = new DayTaskVO();
			vo.setAdddate(DateUtil.formatTimesTampDate(dayTask.getAdddate()));
			vo.setContent(dayTask.getContent());
			vo.setId(dayTask.getId());
			vo.setProjectId(dayTask.getProjectId());		
			vo.setStatus(dayTask.getStatus());
			vo.setUsedtimes(dayTask.getUsedtimes());
			vo.setUsercode(dayTask.getUsercode());
			vo.setWorkdate(dayTask.getWorkdate());
			vo.setProjectName(dayTask.getProjectName());
			vo.setUsername(dayTask.getUsername());
			vo.setConfirmtimes(dayTask.getConfirmtimes());
			vo.setIsconfirm(dayTask.getIsconfirm());
			//查询回复列表
			List<GzrzRemarks> remarksList = gzrzRemarksService.findGzrzRemarks(dayTask.getId());
			String strRemarks = "";
			String str = "";
			for (GzrzRemarks remarks: remarksList) {
				if (!("").equals(strRemarks)) {
					strRemarks += "<br />";
				}
				str = "<font color='#FF0000'>" + remarks.getName() + "</font>：" + remarks.getContent();
				strRemarks += str;
			}
			vo.setStrRemarks(strRemarks);
			if (!strWorkdate.equals(vo.getWorkdate())) {
				strWorkdate = vo.getWorkdate();
				dayVO.setVoList(dayTaskVOList);
				dayVOList.add(dayVO);
				dayVO = new DayVO();
				dayVO.setWorkdate(vo.getWorkdate());
				dayTaskVOList = new ArrayList<>();
			}
			dayTaskVOList.add(vo);
		}
		dayVO.setVoList(dayTaskVOList);
		dayVOList.add(dayVO);

		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询成功!", dayVOList), response);
		logger.info("dayTaskSummary end");
	}
	
}