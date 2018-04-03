package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzWeekTask;

public interface GzrzWeekTaskService {

	/**
	* 添加
	* @param gzrzWeekTask
	* @return
	*/
	public boolean insertGzrzWeekTask(GzrzWeekTask gzrzWeekTask);

	/**
	* 修改
	* @param gzrzWeekTask
	* @return
	*/
	public boolean updateGzrzWeekTask(GzrzWeekTask gzrzWeekTask);

	/**
	* 删除
	* @param gzrzWeekTask
	* @return
	*/
	public boolean deleteGzrzWeekTask(GzrzWeekTask gzrzWeekTask);

	/**
	* 查询
	* @param gzrzWeekTask
	* @return
	*/
	public GzrzWeekTask getGzrzWeekTask(GzrzWeekTask gzrzWeekTask);

//<=================定制内容开始==============
//==================定制内容结束==============>

	/**
	* 查询
	* @param CODE
	* @param YEAR
	* @param MONTH
	* @param WEEK
	* @return
	*/
	public List<GzrzWeekTask> findGzrzWeekTaskByUserCode(String CODE, int YEAR, int MONTH, int WEEK);

	/**
	 * 批量添加
	 * @param list
	 * @return
	 */
	public boolean insertGzrzWeekTaskBatch(List<GzrzWeekTask> list);
	
	/**
	* 查询最大周
	* @param CODE
	* @param YEAR
	* @param MONTH
	* @return
	*/
	public int getMaxWeekByYearAndMonth(String CODE, int YEAR, int MONTH);
		
	/**
	* 查询最大周
	* @param projectId
	* @param YEAR
	* @param MONTH
	* @return
	*/
	public int getMaxWeekByProjectId(int projectId, int YEAR, int MONTH);
	
}