package com.tzt.workLog.service;

import com.tzt.workLog.entity.GzrzAttachment;

public interface GzrzAttachmentService {

	/**
	* 添加
	* @param gzrzAttachment
	* @return
	*/
	public boolean insertGzrzAttachment(GzrzAttachment gzrzAttachment);

	/**
	* 修改
	* @param gzrzAttachment
	* @return
	*/
	public boolean updateGzrzAttachment(GzrzAttachment gzrzAttachment);

	/**
	* 删除
	* @param gzrzAttachment
	* @return
	*/
	public boolean deleteGzrzAttachment(GzrzAttachment gzrzAttachment);

	/**
	* 查询
	* @param gzrzAttachment
	* @return
	*/
	public GzrzAttachment getGzrzAttachment(GzrzAttachment gzrzAttachment);

//<=================定制内容开始==============
//==================定制内容结束==============>

}