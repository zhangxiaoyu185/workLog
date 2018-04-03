package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzAttachment extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*附件名
	*/
	private String fileName;

	/**
	*创建人工号
	*/
	private String addCode;

	/**
	*BUG_ID
	*/
	private Integer bugId;

	/**
	*创建时间
	*/
	private Date addTime;

	/**
	*状态（0启用/1禁用）
	*/
	private Integer addStatus;

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setFileName(String fileName) {
		this.fileName = fileName;
	}

	public String getFileName( ) {
		return fileName;
	}

	public void setAddCode(String addCode) {
		this.addCode = addCode;
	}

	public String getAddCode( ) {
		return addCode;
	}

	public void setBugId(Integer bugId) {
		this.bugId = bugId;
	}

	public Integer getBugId( ) {
		return bugId;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public Date getAddTime( ) {
		return addTime;
	}

	public void setAddStatus(Integer addStatus) {
		this.addStatus = addStatus;
	}

	public Integer getAddStatus( ) {
		return addStatus;
	}

	public GzrzAttachment( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}