package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;

public class GzrzUser extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*角色集合
	*/
	private String Roles;
	
	/**
	*工号
	*/
	private String Code;

	/**
	*姓名
	*/
	private String Name;

	/**
	*密码
	*/
	private String Pwd;
	
	/**
	*状态（0不启用/1启用）
	*/
	private String Status;
	
	/**
	 * 手机号
	 */
	private String mobile;
	
	/**
	 * 邮箱
	 */
	private String email;
	
	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setCode(String Code) {
		this.Code = Code;
	}

	public String getCode( ) {
		return Code;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getName( ) {
		return Name;
	}

	public void setPwd(String Pwd) {
		this.Pwd = Pwd;
	}

	public String getPwd( ) {
		return Pwd;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRoles() {
		return Roles;
	}

	public void setRoles(String roles) {
		Roles = roles;
	}

	public GzrzUser( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}