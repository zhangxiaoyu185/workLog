package com.tzt.workLog.vo;

import com.tzt.workLog.entity.CoreTlog;
import com.tzt.workLog.vo.BaseVO;
import com.tzt.workLog.tool.DateUtil;

public class CoreTlogVO implements BaseVO {

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
	private String crtogOdate;

	public Integer getCrtogUnid() {
		return crtogUnid;
	}

	public void setCrtogUnid(Integer crtogUnid) {
		this.crtogUnid = crtogUnid;
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

	public void setCrtogOdate(String crtogOdate) {
		this.crtogOdate = crtogOdate;
	}

	public String getCrtogOdate( ) {
		return crtogOdate;
	}

	public CoreTlogVO( ) { 
	}

	@Override
	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		CoreTlog po = (CoreTlog) poObj;
		this.crtogUnid = po.getCrtogUnid();
		this.crtogCode = po.getCrtogCode();
		this.crtogType = po.getCrtogType();
		this.crtogDesc = po.getCrtogDesc();
		this.Username = po.getUsername();
		this.crtogOdate = po.getCrtogOdate()!=null?DateUtil.formatDefaultDate(po.getCrtogOdate()):"";
	}
//<=================定制内容开始==============
//==================定制内容结束==============>

}