package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzGroupUser;

public interface GzrzGroupUserService {

	/**
	* 添加
	* @param gzrzGroupUser
	* @return
	*/
	public boolean insertGzrzGroupUser(GzrzGroupUser gzrzGroupUser);

	/**
	* 修改
	* @param gzrzGroupUser
	* @return
	*/
	public boolean updateGzrzGroupUser(GzrzGroupUser gzrzGroupUser);

	/**
	* 删除
	* @param gzrzGroupUser
	* @return
	*/
	public boolean deleteGzrzGroupUser(GzrzGroupUser gzrzGroupUser);

	/**
	* 查询
	* @param gzrzGroupUser
	* @return
	*/
	public GzrzGroupUser getGzrzGroupUser(GzrzGroupUser gzrzGroupUser);

//<=================定制内容开始==============
//==================定制内容结束==============>

	/**
	* 根据组别ID查询组别内人员
	* @param groupId
	* @return
	*/
	public List<GzrzGroupUser> findGzrzGroupUser(int groupId);
	
	/**
	* 根据组别ID集合查询所有管理下的人员
	* @param groupId
	* @return
	*/
	public List<GzrzGroupUser> findGzrzGroupUserByIds(List<Integer> groupIds);
	
}