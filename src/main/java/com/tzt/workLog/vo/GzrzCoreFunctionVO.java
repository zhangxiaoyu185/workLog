package com.tzt.workLog.vo;

import com.tzt.workLog.entity.GzrzCoreFunction;
import com.tzt.workLog.vo.BaseVO;
import com.tzt.workLog.tool.DateUtil;

public class GzrzCoreFunctionVO implements BaseVO {

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
	private String crfntCdate;

	/**
	*修改日期
	*/
	private String crfntUdate;

	public Integer getCrfntUnid() {
		return crfntUnid;
	}

	public void setCrfntUnid(Integer crfntUnid) {
		this.crfntUnid = crfntUnid;
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

	public void setCrfntCdate(String crfntCdate) {
		this.crfntCdate = crfntCdate;
	}

	public String getCrfntCdate( ) {
		return crfntCdate;
	}

	public void setCrfntUdate(String crfntUdate) {
		this.crfntUdate = crfntUdate;
	}

	public String getCrfntUdate( ) {
		return crfntUdate;
	}

	public GzrzCoreFunctionVO( ) { 
	}

	@Override
	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		GzrzCoreFunction po = (GzrzCoreFunction) poObj;
		this.crfntUnid = po.getCrfntUnid();
		this.crfntLevelCode = po.getCrfntLevelCode();
		this.crfntFunName = po.getCrfntFunName();
		this.crfntResource = po.getCrfntResource();
		this.crfntStatus = po.getCrfntStatus();
		this.crfntCdate = po.getCrfntCdate()!=null?DateUtil.formatDefaultDate(po.getCrfntCdate()):"";
		this.crfntUdate = po.getCrfntUdate()!=null?DateUtil.formatDate("yyyy-MM-dd HH:mm:ss", po.getCrfntUdate()):"";
	}

}