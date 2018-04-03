package com.tzt.workLog.service;

import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.ErrorLog;

public interface ErrorLogService {

	/**
	* 添加
	* @param errorLog
	* @return
	*/
	public boolean insertErrorLog(ErrorLog errorLog);

	/**
	* 修改
	* @param errorLog
	* @return
	*/
	public boolean updateErrorLog(ErrorLog errorLog);

	/**
	* 删除
	* @param errorLog
	* @return
	*/
	public boolean deleteErrorLog(ErrorLog errorLog);

	/**
	* 查询
	* @param errorLog
	* @return
	*/
	public ErrorLog getErrorLog(ErrorLog errorLog);

	public Page<ErrorLog> getErrorLogs(String STARTTIME, String ENDTIME,
			String SOFTWAREID, String SOFTWARENAME, String ERRORNAME,
			Integer pageIndex, Integer pageSize);
//<=================定制内容开始==============
//==================定制内容结束==============>

}