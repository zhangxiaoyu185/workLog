package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzGroup;

public interface GzrzGroupService {

	/**
	* 添加
	* @param gzrzGroup
	* @return
	*/
	public boolean insertGzrzGroup(GzrzGroup gzrzGroup);

	/**
	* 修改
	* @param gzrzGroup
	* @return
	*/
	public boolean updateGzrzGroup(GzrzGroup gzrzGroup);

	/**
	* 删除
	* @param gzrzGroup
	* @return
	*/
	public boolean deleteGzrzGroup(GzrzGroup gzrzGroup);

	/**
	* 查询
	* @param gzrzGroup
	* @return
	*/
	public GzrzGroup getGzrzGroup(GzrzGroup gzrzGroup);

//<=================定制内容开始==============
//==================定制内容结束==============>

	/**
	* 根据主管工号查询组别列表(Usercode为null即查询全部组别)
	* @param Usercode
	* @return
	*/
	public List<GzrzGroup> findGzrzGroup(String Usercode);
	
	/**
	 * 根据主管工号删除管理组别关系
	 * @param Usercode
	 * @return
	 */
	public boolean updateGzrzGroupByCode(String Usercode);
	
	/**
	* 获取所有项目经理
	* @return
	*/
	public List<GzrzGroup> findAllProjectManage();
	
}