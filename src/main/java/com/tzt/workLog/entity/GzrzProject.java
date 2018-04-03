package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzProject extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*项目名
	*/
	private String Name;

	/**
	*开始时间
	*/
	private Date startTime;

	/**
	*结束时间
	*/
	private Date endTime;

	/**
	*总工时
	*/
	private Double allTime;

	/**
	*状态（0完成/1未完成）
	*/
	private Integer Status;

	/**
	*最新更新时间
	*/
	private String lastTime;

	/**
	*项目经理工号
	*/
	private String Usercode;

	/**
	*项目经理姓名
	*/
	private String Username;
	
	/**
	*备注
	*/
	private String Remarks;
	
	/**
	 * 
	 * 说明(记录测试、正式的账号，地址等信息)
	 */
	private String Explanation;
	
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

	public void setAllTime(Double allTime) {
		this.allTime = allTime;
	}

	public Double getAllTime( ) {
		return allTime;
	}

	public void setStatus(Integer Status) {
		this.Status = Status;
	}

	public Integer getStatus( ) {
		return Status;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}

	public String getLastTime( ) {
		return lastTime;
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

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	public String getExplanation() {
		return Explanation;
	}

	public void setExplanation(String explanation) {
		Explanation = explanation;
	}

	public GzrzProject( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}