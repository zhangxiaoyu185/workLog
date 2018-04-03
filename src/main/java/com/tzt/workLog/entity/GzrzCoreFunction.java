package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzCoreFunction extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*标识UNID
	*/
	private Integer crfntUnid;

	/**
	*层级编码
	*/
	private String crfntLevelCode;

	/**
	*功能项名称
	*/
	private String crfntFunName;

	/**
	*资源请求地址
	*/
	private String crfntResource;

	/**
	*状态
	*/
	private Integer crfntStatus;

	/**
	*创建日期
	*/
	private Date crfntCdate;

	/**
	*修改日期
	*/
	private Date crfntUdate;

	public void setCrfntUnid(Integer crfntUnid) {
		this.crfntUnid = crfntUnid;
	}

	public Integer getCrfntUnid( ) {
		return crfntUnid;
	}

	public void setCrfntLevelCode(String crfntLevelCode) {
		this.crfntLevelCode = crfntLevelCode;
	}

	public String getCrfntLevelCode( ) {
		return crfntLevelCode;
	}

	public void setCrfntFunName(String crfntFunName) {
		this.crfntFunName = crfntFunName;
	}

	public String getCrfntFunName( ) {
		return crfntFunName;
	}

	public void setCrfntResource(String crfntResource) {
		this.crfntResource = crfntResource;
	}

	public String getCrfntResource( ) {
		return crfntResource;
	}

	public void setCrfntStatus(Integer crfntStatus) {
		this.crfntStatus = crfntStatus;
	}

	public Integer getCrfntStatus( ) {
		return crfntStatus;
	}

	public void setCrfntCdate(Date crfntCdate) {
		this.crfntCdate = crfntCdate;
	}

	public Date getCrfntCdate( ) {
		return crfntCdate;
	}

	public void setCrfntUdate(Date crfntUdate) {
		this.crfntUdate = crfntUdate;
	}

	public Date getCrfntUdate( ) {
		return crfntUdate;
	}

	public GzrzCoreFunction( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}