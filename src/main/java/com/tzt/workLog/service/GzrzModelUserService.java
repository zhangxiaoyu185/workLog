package com.tzt.workLog.service;

import java.util.List;

import com.tzt.workLog.entity.GzrzModelUser;

public interface GzrzModelUserService {

	/**
	 * 添加
	 * 
	 * @param gzrzModelUser
	 * @return
	 */
	public boolean insertGzrzModelUser(GzrzModelUser gzrzModelUser);

	/**
	 * 修改
	 * 
	 * @param gzrzModelUser
	 * @return
	 */
	public boolean updateGzrzModelUser(GzrzModelUser gzrzModelUser);

	/**
	 * 删除
	 * 
	 * @param gzrzModelUser
	 * @return
	 */
	public boolean deleteGzrzModelUser(GzrzModelUser gzrzModelUser);

	/**
	 * 查询
	 * 
	 * @param gzrzModelUser
	 * @return
	 */
	public GzrzModelUser getGzrzModelUser(GzrzModelUser gzrzModelUser);

	/**
	 * 获取项目下模块负责信息
	 * 
	 * @param projectId
	 * @return
	 */
	public List<GzrzModelUser> getGzrzModelUserByIds(String projectId,
			String modelId, List<String> status);

	/**
	 * 获取项目下人员用时情况
	 * 
	 * @param projectId
	 * @return
	 */
	public List<GzrzModelUser> getWorkTimesById(String projectId);

	// <=================定制内容开始==============
	// ==================定制内容结束==============>

	/**
	 * 获取项目下参与人员信息
	 * 
	 * @param projectId
	 * @return
	 */
	public List<GzrzModelUser> getGzrzModelUserByProjectId(Integer projectId);

	/**
	 * 获取用户下负责项目
	 */
	public List<GzrzModelUser> findGzrzProjectsByUcode(String USERCODE);

}