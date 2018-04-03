package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzDayTask extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*任务内容
	*/
	private String Content;

	/**
	*日报日期(YYYY-MM-DD)
	*/
	private String Workdate;

	/**
	*责任人工号(索引)
	*/
	private String Usercode;

	/**
	*责任人姓名
	*/
	private String Username;
	
	/**
	*用时
	*/
	private Double Usedtimes;

	/**
	*状态(0:未完成/1：已完成)
	*/
	private Integer Status;

	/**
	*所属项目ID
	*/
	private Integer projectId;

	/**
	*所属项目名称
	*/
	private String projectName;
	
	/**
	*上报日期
	*/
	private Date Adddate;

	/**
	*年度
	*/
	private Integer Year;

	/**
	*月份
	*/
	private Integer Month;

	/**
	*周度
	*/
	private Integer Week;
	
	/**
	*确认工时
	*/
	private Double Confirmtimes;
	
	/**
	*是否确认(1未确认/2已确认)
	*/
	private Integer Isconfirm;
	
	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setContent(String Content) {
		this.Content = Content;
	}

	public String getContent( ) {
		return Content;
	}

	public void setWorkdate(String Workdate) {
		this.Workdate = Workdate;
	}

	public String getWorkdate( ) {
		return Workdate;
	}

	public void setUsercode(String Usercode) {
		this.Usercode = Usercode;
	}

	public String getUsercode( ) {
		return Usercode;
	}

	public Double getUsedtimes() {
		return Usedtimes;
	}

	public void setUsedtimes(Double usedtimes) {
		Usedtimes = usedtimes;
	}

	public void setStatus(Integer Status) {
		this.Status = Status;
	}

	public Integer getStatus( ) {
		return Status;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public Integer getProjectId( ) {
		return projectId;
	}

	public void setAdddate(Date Adddate) {
		this.Adddate = Adddate;
	}

	public Date getAdddate( ) {
		return Adddate;
	}

	public void setYear(Integer Year) {
		this.Year = Year;
	}

	public Integer getYear( ) {
		return Year;
	}

	public void setMonth(Integer Month) {
		this.Month = Month;
	}

	public Integer getMonth( ) {
		return Month;
	}

	public void setWeek(Integer Week) {
		this.Week = Week;
	}

	public Integer getWeek( ) {
		return Week;
	}
	
	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public Double getConfirmtimes() {
		return Confirmtimes;
	}

	public void setConfirmtimes(Double confirmtimes) {
		Confirmtimes = confirmtimes;
	}

	public Integer getIsconfirm() {
		return Isconfirm;
	}

	public void setIsconfirm(Integer isconfirm) {
		Isconfirm = isconfirm;
	}

	public GzrzDayTask( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}