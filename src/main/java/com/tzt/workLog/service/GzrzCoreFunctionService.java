package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzCoreFunction;

public interface GzrzCoreFunctionService {

	/**
	* 添加
	* @param gzrzCoreFunction
	* @return
	*/
	public boolean insertGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction);

	/**
	* 修改
	* @param gzrzCoreFunction
	* @return
	*/
	public boolean updateGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction);

	/**
	* 删除
	* @param gzrzCoreFunction
	* @return
	*/
	public boolean deleteGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction);

	/**
	* 查询
	* @param gzrzCoreFunction
	* @return
	*/
	public GzrzCoreFunction getGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction);

	/**
	* 查询菜单列表
	* @return
	*/
	public List<GzrzCoreFunction> getGzrzCoreFunctions();

	/**
	* 根据菜单ID集合查询菜单名称
	* 
	* @param ids
	* @return
	*/
	public List<GzrzCoreFunction> findGzrzFunctionsByIds(List<String> ids);

}