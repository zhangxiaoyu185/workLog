package com.tzt.workLog.service;

import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.CoreTlog;

public interface CoreTlogService {

	/**
	* 添加
	* 
	* @param coreTlog
	* @return
	*/
	public boolean insertCoreTlog(CoreTlog coreTlog);

	/**
	* 修改
	* 
	* @param coreTlog
	* @return
	*/
	public boolean updateCoreTlog(CoreTlog coreTlog);

	/**
	* 删除
	* 
	* @param coreTlog
	* @return
	*/
	public boolean deleteCoreTlog(CoreTlog coreTlog);

	/**
	* 查询
	* 
	* @param coreTlog
	* @return
	*/
	public CoreTlog getCoreTlog(CoreTlog coreTlog);

	/**
	* 根据工号查询全部日志(分页)
	* 
	* @param name
	* @param type
	* @param pageIndex
	* @param pageSize
	* @return
	*/
	public Page<CoreTlog> getAllCoreTlog(String name, String type, Integer pageIndex, Integer pageSize);

}