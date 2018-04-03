package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzDayTask;

public interface GzrzDayTaskService {

	/**
	* 添加
	* @param gzrzDayTask
	* @return
	*/
	public boolean insertGzrzDayTask(GzrzDayTask gzrzDayTask);

	/**
	* 修改
	* @param gzrzDayTask
	* @return
	*/
	public boolean updateGzrzDayTask(GzrzDayTask gzrzDayTask);

	/**
	* 删除
	* @param gzrzDayTask
	* @return
	*/
	public boolean deleteGzrzDayTask(GzrzDayTask gzrzDayTask);

	/**
	* 查询
	* @param gzrzDayTask
	* @return
	*/
	public GzrzDayTask getGzrzDayTask(GzrzDayTask gzrzDayTask);

//<=================定制内容开始==============
//==================定制内容结束==============>

	/**
	 * 批量添加
	 * @param list
	 * @return
	 */
	public boolean insertGzrzDayTaskBatch(List<GzrzDayTask> list);
	
	/**
	* 查询本周日报
	* @param gzrzDayTask
	* @return
	*/
	public List<GzrzDayTask> findGzrzDayTaskByYearAndMonthAndDay(GzrzDayTask gzrzDayTask);
	
	/**
	* 查询本周日报
	* @param gzrzDayTask
	* @return
	*/
	public List<GzrzDayTask> findGzrzDayTaskByProject(GzrzDayTask gzrzDayTask);
	
	/**
	* 查询项目下人员日报汇总
	* @param gzrzDayTask
	* @return
	*/
	public List<GzrzDayTask> findGzrzDayTaskSummary(GzrzDayTask gzrzDayTask);
	
}