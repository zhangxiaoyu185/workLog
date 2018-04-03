package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzModel;

public interface GzrzModelService {

	/**
	* 添加
	* @param gzrzModel
	* @return
	*/
	public boolean insertGzrzModel(GzrzModel gzrzModel);

	/**
	* 修改
	* @param gzrzModel
	* @return
	*/
	public boolean updateGzrzModel(GzrzModel gzrzModel);

	/**
	* 删除
	* @param gzrzModel
	* @return
	*/
	public boolean deleteGzrzModel(GzrzModel gzrzModel);

	/**
	* 查询
	* @param gzrzModel
	* @return
	*/
	public GzrzModel getGzrzModel(GzrzModel gzrzModel);

	/**
	 * 获取项目下模块的每个人的用时情况
	 */
	public List<GzrzModel> getGzrzModelByPid(String projectId);
//<=================定制内容开始==============
//==================定制内容结束==============>

}