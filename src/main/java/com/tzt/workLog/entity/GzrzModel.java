package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzModel extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*名称
	*/
	private String Name;

	/**
	*所属项目
	*/
	private Integer projectId;

	/**
	*开始时间
	*/
	private Date startTime;

	/**
	*结束时间
	*/
	private Date endTime;
	
	/**
	*备注
	*/
	private String Remarks;
	
	/**
	 * 用户ID
	 */
	private Integer userCode;
	
	/**
	*用户名称
	*/
	private String UserName;
	
	/**
	*总工时
	*/
	private String worktimes;

	/**
	 * @return the worktimes
	 */
	public String getWorktimes() {
		return worktimes;
	}

	/**
	 * @return the userCode
	 */
	public Integer getUserCode() {
		return userCode;
	}

	/**
	 * @param userCode the userCode to set
	 */
	public void setUserCode(Integer userCode) {
		this.userCode = userCode;
	}

	/**
	 * @param worktimes the worktimes to set
	 */
	public void setWorktimes(String worktimes) {
		this.worktimes = worktimes;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return UserName;
	}

	/**
	 * @param userName the userName to set
	 */
	public void setUserName(String userName) {
		UserName = userName;
	}

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

	public GzrzModel( ) { 
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}