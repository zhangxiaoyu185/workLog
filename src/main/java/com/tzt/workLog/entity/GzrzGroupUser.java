package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;

public class GzrzGroupUser extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*组别ID
	*/
	private Integer groupId;

	/**
	*员工工号
	*/
	private String Usercode;

	/**
	*员工姓名
	*/
	private String Name;
	
	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setGroupId(Integer groupId) {
		this.groupId = groupId;
	}

	public Integer getGroupId( ) {
		return groupId;
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
	
	public GzrzGroupUser( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}