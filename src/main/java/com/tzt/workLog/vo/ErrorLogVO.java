package com.tzt.workLog.vo;

import com.tzt.workLog.entity.ErrorLog;
import com.tzt.workLog.vo.BaseVO;
import com.tzt.workLog.tool.DateUtil;

public class ErrorLogVO implements BaseVO {

	/**
	*
	*/
	private Integer Id;

	/**
	*时间
	*/
	private String Addtime;

	/**
	*软件ID
	*/
	private String Softwareid;

	/**
	*软件名称
	*/
	private String Softwarename;

	/**
	*设备信息
	*/
	private String Deviceinfo;

	/**
	*软件版本
	*/
	private String Softwareversion;

	/**
	*升级版本号
	*/
	private String Upgradeversionnum;

	/**
	*错误原因
	*/
	private String Errorcause;

	/**
	*错误名称
	*/
	private String Errorname;

	/**
	*错误详情
	*/
	private String Errordetails;

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setAddtime(String Addtime) {
		this.Addtime = Addtime;
	}

	public String getAddtime( ) {
		return Addtime;
	}

	public void setSoftwareid(String Softwareid) {
		this.Softwareid = Softwareid;
	}

	public String getSoftwareid( ) {
		return Softwareid;
	}

	public void setSoftwarename(String Softwarename) {
		this.Softwarename = Softwarename;
	}

	public String getSoftwarename( ) {
		return Softwarename;
	}

	public void setDeviceinfo(String Deviceinfo) {
		this.Deviceinfo = Deviceinfo;
	}

	public String getDeviceinfo( ) {
		return Deviceinfo;
	}

	public void setSoftwareversion(String Softwareversion) {
		this.Softwareversion = Softwareversion;
	}

	public String getSoftwareversion( ) {
		return Softwareversion;
	}

	public void setUpgradeversionnum(String Upgradeversionnum) {
		this.Upgradeversionnum = Upgradeversionnum;
	}

	public String getUpgradeversionnum( ) {
		return Upgradeversionnum;
	}

	public void setErrorcause(String Errorcause) {
		this.Errorcause = Errorcause;
	}

	public String getErrorcause( ) {
		return Errorcause;
	}

	public void setErrorname(String Errorname) {
		this.Errorname = Errorname;
	}

	public String getErrorname( ) {
		return Errorname;
	}

	public void setErrordetails(String Errordetails) {
		this.Errordetails = Errordetails;
	}

	public String getErrordetails( ) {
		return Errordetails;
	}

	public ErrorLogVO( ) { 
	}

	@Override
	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		ErrorLog po = (ErrorLog) poObj;
		this.Id = po.getId();
		this.Addtime = po.getAddtime()!=null?DateUtil.formatDefaultDate(po.getAddtime()):"";
		this.Softwareid = po.getSoftwareid();
		this.Softwarename = po.getSoftwarename();
		this.Deviceinfo = po.getDeviceinfo();
		this.Softwareversion = po.getSoftwareversion();
		this.Upgradeversionnum = po.getUpgradeversionnum();
		this.Errorcause = po.getErrorcause();
		this.Errorname = po.getErrorname();
		this.Errordetails = po.getErrordetails();
	}
//<=================定制内容开始==============
//==================定制内容结束==============>

}