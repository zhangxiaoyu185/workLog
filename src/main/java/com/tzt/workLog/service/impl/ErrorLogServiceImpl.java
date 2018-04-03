package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.Map;

import com.tzt.workLog.service.ErrorLogService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.core.mybatis.page.PageRequest;
import com.tzt.workLog.entity.ErrorLog;

@Service("errorLogService")
public class ErrorLogServiceImpl implements ErrorLogService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertErrorLog(ErrorLog errorLog) {
		myBatisDAO.insert(errorLog);
		return true;
	}

	@Override
	public boolean updateErrorLog(ErrorLog errorLog) {
		myBatisDAO.update(errorLog);
		return true;
	}

	@Override
	public boolean deleteErrorLog(ErrorLog errorLog) {
		myBatisDAO.delete(errorLog);
		return true;
	}

	@Override
	public ErrorLog getErrorLog(ErrorLog errorLog) {
		return (ErrorLog) myBatisDAO.findForObject(errorLog);
	}
	
	private static final String GET_ERRORLOGS_BY_PARAMS = "getErrorlogsByParams";
	
	@SuppressWarnings("unchecked")
	@Override
	public Page<ErrorLog> getErrorLogs(String STARTTIME, String ENDTIME,
			String SOFTWAREID, String SOFTWARENAME, String ERRORNAME,
			Integer pageIndex, Integer pageSize) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Starttime", STARTTIME);
		hashMap.put("Endtime", ENDTIME);
		hashMap.put("Softwareid", SOFTWAREID);
		hashMap.put("Softwarename", SOFTWARENAME);
		hashMap.put("Errorname", ERRORNAME);
		return myBatisDAO.findForPage(GET_ERRORLOGS_BY_PARAMS, new PageRequest(pageIndex, pageSize, hashMap));
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}