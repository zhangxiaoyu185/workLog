package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzRole;

public interface GzrzRoleService {

	/**
	* 添加
	* @param gzrzRole
	* @return
	*/
	public boolean insertGzrzRole(GzrzRole gzrzRole);

	/**
	* 修改
	* @param gzrzRole
	* @return
	*/
	public boolean updateGzrzRole(GzrzRole gzrzRole);

	/**
	* 删除
	* @param gzrzRole
	* @return
	*/
	public boolean deleteGzrzRole(GzrzRole gzrzRole);

	/**
	* 查询
	* @param gzrzRole
	* @return
	*/
	public GzrzRole getGzrzRole(GzrzRole gzrzRole);
	
	/**
	* 获取所有角色列表
	* @return
	*/
	public List<GzrzRole> findGzrzRoleAll();
	
	/**
	* 根据角色ID集合查询角色名称
	* 
	* @param ids
	* @return
	*/
	public List<GzrzRole> findGzrzRoleByIds(List<String> ids);
	
}