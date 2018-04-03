package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class CoreTlog extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*标识UNID
	*/
	private Integer crtogUnid;

	/**
	*操作用户工号
	*/
	private String crtogCode;

	/**
	*操作用户姓名
	*/
	private String Username;
	
	/**
	*操作类型
	*/
	private String crtogType;

	/**
	*操作说明
	*/
	private String crtogDesc;

	/**
	*操作日期
	*/
	private Date crtogOdate;

	public void setCrtogUnid(Integer crtogUnid) {
		this.crtogUnid = crtogUnid;
	}

	public Integer getCrtogUnid( ) {
		return crtogUnid;
	}

	public void setCrtogCode(String crtogCode) {
		this.crtogCode = crtogCode;
	}

	public String getCrtogCode( ) {
		return crtogCode;
	}

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public void setCrtogType(String crtogType) {
		this.crtogType = crtogType;
	}

	public String getCrtogType( ) {
		return crtogType;
	}

	public void setCrtogDesc(String crtogDesc) {
		this.crtogDesc = crtogDesc;
	}

	public String getCrtogDesc( ) {
		return crtogDesc;
	}

	public void setCrtogOdate(Date crtogOdate) {
		this.crtogOdate = crtogOdate;
	}

	public Date getCrtogOdate( ) {
		return crtogOdate;
	}

	public CoreTlog( ) { 
	}

}