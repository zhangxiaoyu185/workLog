package com.tzt.workLog.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.ErrorLog;
import com.tzt.workLog.service.ErrorLogService;
import com.tzt.workLog.tool.DateUtil;
import com.tzt.workLog.tool.StringUtil;
import com.tzt.workLog.tool.out.ResultMessageBuilder;
import com.tzt.workLog.vo.ErrorLogListVO;
import com.tzt.workLog.vo.ErrorLogVO;

@Controller
@RequestMapping(value = "/errorLog")
public class ErrorLogController extends BaseController {

	@Autowired
	private ErrorLogService errorLogService;

	/**
	 * 插入错误日志
	 * 
	 * @param errorlog
	 * @param response
	 */
	@RequestMapping(value = "/addErrorLog", method = RequestMethod.POST)
	public void addErrorLog(ErrorLogVO errorlogVo, HttpServletResponse response) {
		logger.info("addErrorLog start");
		if (errorlogVo == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "日志对象不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(errorlogVo.getSoftwareid())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "软件ID不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(errorlogVo.getSoftwarename())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "软件名称不能为空!"),
					response);
			return;
		}
		if(StringUtil.isEmpty(errorlogVo.getAddtime())){
			errorlogVo.setAddtime(null);
		}
		ErrorLog errorlog=new ErrorLog();
		errorlog.convertPOToVO(errorlogVo);
		Boolean boolErrLog = errorLogService.insertErrorLog(errorlog);
		if (boolErrLog) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(true, 1, "新增错误日志成功!"), response);
		} else {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "新增错误日志失败!"),
					response);
		}
		logger.info("addErrorLog end");
	}

	/**
	 * 获取错误日志列表（不包括错误详情）
	 * @param STARTTIME
	 * @param ENDTIME
	 * @param SOFTWAREID
	 * @param SOFTWARENAME
	 * @param ERRORNAME
	 * @param PAGENUM
	 * @param PAGESIZE
	 * @param response
	 */
	@RequestMapping(value = "/getErrorlogsByParams", method = RequestMethod.POST)
	public void getErrorlogsByParams(String STARTTIME, String ENDTIME,
			String SOFTWAREID, String SOFTWARENAME, String ERRORNAME,
			Integer PAGENUM, Integer PAGESIZE, HttpServletResponse response) {
		logger.info("getErrorlogsByParams start");
		if (PAGENUM == null || PAGENUM == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageNum]不能为空！"), response);
			return;
		}
		if (PAGESIZE == null || PAGESIZE == 0) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "[pageSize]不能为空！"), response);
			return;
		}
		if(StringUtil.isEmpty(STARTTIME)){
			STARTTIME=null;
		}
		if(StringUtil.isEmpty(ENDTIME)){
			ENDTIME=null;
		}
		Page<ErrorLog> list=errorLogService.getErrorLogs(STARTTIME, ENDTIME, SOFTWAREID,
				SOFTWARENAME, ERRORNAME, PAGENUM, PAGESIZE);
		int count=list.getTotalCount();
		ErrorLogListVO listVO=new ErrorLogListVO();
		listVO.setCount(count);
		List<ErrorLogVO> errorLogVOs=new ArrayList<ErrorLogVO>();
		ErrorLogVO errorLogVO;
		for (ErrorLog errorLog : list) {
			errorLogVO=new ErrorLogVO();
			
			errorLogVO.setId(errorLog.getId());
			errorLogVO.setAddtime(DateUtil.formatTimesTampDate(errorLog.getAddtime()));
			errorLogVO.setDeviceinfo(errorLog.getDeviceinfo());
			errorLogVO.setErrorcause(errorLog.getErrorcause());
			
			errorLogVO.setErrorname(errorLog.getErrorname());
			errorLogVO.setSoftwareid(errorLog.getSoftwareid());
			errorLogVO.setSoftwarename(errorLog.getSoftwarename());
			errorLogVO.setSoftwareversion(errorLog.getSoftwareversion());
			
			errorLogVO.setUpgradeversionnum(errorLog.getUpgradeversionnum());
//			errorLogVO.setErrordetails(errorLog.getErrordetails());
			
			errorLogVOs.add(errorLogVO);
		}
		listVO.setList(errorLogVOs);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "分页查询错误日志列表成功！", listVO), response);
		logger.info("getErrorlogsByParams end");
	}
	
	/**
	 * 
	 * 根据id获取错误详情
	 * @param EID
	 * @param response
	 */
	@RequestMapping(value = "/getErrorlogById", method = RequestMethod.POST)
	public void getErrorlogById(Integer EID, HttpServletResponse response) {
		logger.info("getErrorlogById start");
		if(EID==null && EID==0){
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1, "错误日志ID不能为空！"), response);
			return;
		}
		ErrorLog errorLog=new ErrorLog();
		errorLog.setId(EID);
		errorLog=errorLogService.getErrorLog(errorLog);
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "查询单个错误日志成功！", errorLog), response);
		logger.info("getErrorlogById end");
	}
	
}