package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;

public class GzrzRemarks extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*添加人工号
	*/
	private String Usercode;

	/**
	*添加人姓名
	*/
	private String Name;

	/**
	*内容
	*/
	private String Content;

	/**
	*日报ID
	*/
	private Integer dayTaskId;

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setUsercode(String Usercode) {
		this.Usercode = Usercode;
	}

	public String getUsercode( ) {
		return Usercode;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getName( ) {
		return Name;
	}

	public void setContent(String Content) {
		this.Content = Content;
	}

	public String getContent( ) {
		return Content;
	}

	public Integer getDayTaskId() {
		return dayTaskId;
	}

	public void setDayTaskId(Integer dayTaskId) {
		this.dayTaskId = dayTaskId;
	}

	public GzrzRemarks( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}