package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;

import java.util.Date;

public class GzrzWeekTask extends BaseEntity {

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
	*责任人工号
	*/
	private String Usercode;

	/**
	*状态(0:未完成/1：已完成)
	*/
	private Integer Status;

	/**
	*所属项目
	*/
	private Integer projectId;

	/**
	*所属项目名称
	*/
	private String projectName;
	
	/**
	*开始日期
	*/
	private Date startTime;

	/**
	*结束日期
	*/
	private Date endTime;

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

	public void setContent(String Content) {
		this.Content = Content;
	}

	public String getContent( ) {
		return Content;
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

	public void setUsercode(String Usercode) {
		this.Usercode = Usercode;
	}

	public String getUsercode( ) {
		return Usercode;
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

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getStartTime( ) {
		return startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Date getEndTime( ) {
		return endTime;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public GzrzWeekTask( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}