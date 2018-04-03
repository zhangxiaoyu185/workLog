package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;

public class GzrzGroup extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*组别名
	*/
	private String Name;

	/**
	*主管工号
	*/
	private String Usercode;
	
	/**
	*主管姓名
	*/
	private String Username;

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

	public void setUsercode(String Usercode) {
		this.Usercode = Usercode;
	}

	public String getUsercode( ) {
		return Usercode;
	}

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public GzrzGroup( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}