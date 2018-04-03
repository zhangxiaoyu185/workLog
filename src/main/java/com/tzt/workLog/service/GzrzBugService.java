package com.tzt.workLog.service;

import java.util.List;

import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.GzrzBug;
import com.tzt.workLog.entity.GzrzUser;

public interface GzrzBugService {

	/**
	 * 添加
	 * 
	 * @param gzrzBug
	 * @return
	 */
	public boolean insertGzrzBug(GzrzBug gzrzBug);

	/**
	 * 修改
	 * 
	 * @param gzrzBug
	 * @return
	 */
	public boolean updateGzrzBug(GzrzBug gzrzBug);

	/**
	 * 删除
	 * 
	 * @param gzrzBug
	 * @return
	 */
	public boolean deleteGzrzBug(GzrzBug gzrzBug);

	/**
	 * 查询
	 * 
	 * @param gzrzBug
	 * @return
	 */
	public GzrzBug getGzrzBug(GzrzBug gzrzBug);

	// <=================定制内容开始==============
	// ==================定制内容结束==============>
	/**
	 * 根据角色ID、本人工号、名称、项目名称、指派给人工号查询bug列表
	 * 
	 * @param USERCODE
	 * @param TITLE
	 * @param PROJECT_NAME
	 * @param ASSIGNED_NAME
	 * @return
	 */
	public Page<GzrzBug> getGzrzBugsByConditions(Integer pageNum, Integer pageSize, Integer STATUS,Integer ROLE_ID, String USERCODE, String TITLE, String PROJECT_NAME, String ASSIGNED_NAME);
}