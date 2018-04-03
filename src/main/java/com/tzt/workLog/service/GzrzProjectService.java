package com.tzt.workLog.service;

import java.util.List;

import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.GzrzProject;

public interface GzrzProjectService {

	/**
	* 添加
	* @param gzrzProject
	* @return
	*/
	public boolean insertGzrzProject(GzrzProject gzrzProject);

	/**
	* 修改
	* @param gzrzProject
	* @return
	*/
	public boolean updateGzrzProject(GzrzProject gzrzProject);

	/**
	* 删除
	* @param gzrzProject
	* @return
	*/
	public boolean deleteGzrzProject(GzrzProject gzrzProject);

	/**
	* 查询
	* @param gzrzProject
	* @return
	*/
	public GzrzProject getGzrzProject(GzrzProject gzrzProject);

//<=================定制内容开始==============
//==================定制内容结束==============>

	/**
	 * 根据时间获取项目列表(不包括综合项目)
	 */
	public List<GzrzProject> getGzrzProjects(String userCode, String startTime);
	
	/**
	* 根据工号和项目名模糊查询所有的项目列表（包括综合项目）
	* @param Code
	* @param Name
	* @param pageIndex
	* @param pageSize
	* @return
	*/
	public Page<GzrzProject> findGzrzProjectsAllListByName(String Code, String Name, String Username, Integer pageIndex, Integer pageSize);
	
	/**
	* 更新项目总工时
	* @param gzrzProject
	* @param status -1:减；1加
	* @return
	*/
	public boolean updateProjectAllTime(GzrzProject gzrzProject, int status);
	
	/**
	* 根据项目名获取项目列表
	* @param Name
	* @return
	*/
	public List<GzrzProject> findGzrzProjectsByName(String Name);
	
}