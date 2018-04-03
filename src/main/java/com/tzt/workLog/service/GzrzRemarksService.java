package com.tzt.workLog.service;

import java.util.List;
import com.tzt.workLog.entity.GzrzRemarks;

public interface GzrzRemarksService {

	/**
	* 添加
	* @param gzrzRemarks
	* @return
	*/
	public boolean insertGzrzRemarks(GzrzRemarks gzrzRemarks);

	/**
	* 修改
	* @param gzrzRemarks
	* @return
	*/
	public boolean updateGzrzRemarks(GzrzRemarks gzrzRemarks);

	/**
	* 删除
	* @param gzrzRemarks
	* @return
	*/
	public boolean deleteGzrzRemarks(GzrzRemarks gzrzRemarks);

	/**
	* 查询
	* @param gzrzRemarks
	* @return
	*/
	public GzrzRemarks getGzrzRemarks(GzrzRemarks gzrzRemarks);

	
//<=================定制内容开始==============
	
//==================定制内容结束==============>

	/**
	* 根绝关联类型和关联ID查询备注列表
	* @param dayTaskId
	* @return
	*/
	public List<GzrzRemarks> findGzrzRemarks(int dayTaskId);
	
}