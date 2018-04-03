package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzMonthTask;

public interface GzrzMonthTaskService {

	/**
	* 添加
	* @param gzrzMonthTask
	* @return
	*/
	public boolean insertGzrzMonthTask(GzrzMonthTask gzrzMonthTask);

	/**
	* 修改
	* @param gzrzMonthTask
	* @return
	*/
	public boolean updateGzrzMonthTask(GzrzMonthTask gzrzMonthTask);

	/**
	* 删除
	* @param gzrzMonthTask
	* @return
	*/
	public boolean deleteGzrzMonthTask(GzrzMonthTask gzrzMonthTask);

	/**
	* 查询
	* @param gzrzMonthTask
	* @return
	*/
	public GzrzMonthTask getGzrzMonthTask(GzrzMonthTask gzrzMonthTask);

//<=================定制内容开始==============
//==================定制内容结束==============>
	
	/**
	* 查询
	* @param CODE
	* @param YEAR
	* @param MONTH
	* @return
	*/
	public List<GzrzMonthTask> findGzrzMonthTaskByUserCode(String CODE, int YEAR, int MONTH);

	/**
	 * 批量添加
	 * @param list
	 * @return
	 */
	public boolean insertGzrzMonthTaskBatch(List<GzrzMonthTask> list);
	
}