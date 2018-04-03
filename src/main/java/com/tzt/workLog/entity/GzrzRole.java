package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;

public class GzrzRole extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*角色名
	*/
	private String Name;

	/**
	*权限集合
	*/
	private String Permissions;
	
	/**
	*备注
	*/
	private String Remarks;

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getName( ) {
		return Name;
	}

	public String getPermissions() {
		return Permissions;
	}

	public void setPermissions(String permissions) {
		Permissions = permissions;
	}

	public void setRemarks(String Remarks) {
		this.Remarks = Remarks;
	}

	public String getRemarks( ) {
		return Remarks;
	}

	public GzrzRole( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}