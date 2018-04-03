package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.GzrzUser;

public interface GzrzUserService {

	/**
	* 添加
	* @param gzrzUser
	* @return
	*/
	public boolean insertGzrzUser(GzrzUser gzrzUser);

	/**
	* 修改
	* @param gzrzUser
	* @return
	*/
	public boolean updateGzrzUser(GzrzUser gzrzUser);

	/**
	* 删除
	* @param gzrzUser
	* @return
	*/
	public boolean deleteGzrzUser(GzrzUser gzrzUser);

	/**
	* 查询
	* @param gzrzUser
	* @return
	*/
	public GzrzUser getGzrzUser(GzrzUser gzrzUser);

//<=================定制内容开始==============
//==================定制内容结束==============>
	
	/**
	* 根据员工工号集合查询人员
	* @param codes
	* @return
	*/
	public List<GzrzUser> findGzrzUserByCodes(List<String> codes);
	
	/**
	* 全部人员列表(分页)
	* @return
	*/
	public Page<GzrzUser> findUserListForPage(String USERCODE, String USERNAME, Integer pageIndex, Integer pageSize);
	
	/**
	* 全部人员列表(不分页)
	* @return
	*/
	public List<GzrzUser> findUserList();
	
}