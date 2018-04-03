package com.tzt.workLog.entity;

import java.util.Date;

public class GzrzModelUser extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	 * ID
	 */
	private Integer Id;

	/**
	 * 任务内容
	 */
	private String Content;

	/**
	 * 所属项目
	 */
	private Integer projectId;

	/**
	 * 所属项目名称
	 */
	private String projectName;

	/**
	 * 所属模块
	 */
	private Integer modelId;

	/**
	 * 开始时间
	 */
	private Date startTime;

	/**
	 * 结束时间
	 */
	private Date endTime;

	/**
	 * 参与人工号
	 */
	private String Usercode;

	/**
	 * 参与人姓名
	 */
	private String userName;

	/**
	 * 工时
	 */
	private Double workTime;

	/**
	 * 日报工时汇总
	 */
	private Double usedTimes;

	/**
	 * 日报确认工时汇总
	 */
	private Double confirmTimes;
	/**
	 * 模块工时汇总
	 */
	private Double workTimes;

	/**
	 * 状态（0完成/1未完成）
	 */
	private Integer Status;

	/**
	 * 备注
	 */
	private String Remarks;
	
	/**
	 * @return the usedTimes
	 */
	public Double getUsedTimes() {
		return usedTimes;
	}

	/**
	 * @param usedTimes
	 *            the usedTimes to set
	 */
	public void setUsedTimes(Double usedTimes) {
		this.usedTimes = usedTimes;
	}

	/**
	 * @return the workTimes
	 */
	public Double getWorkTimes() {
		return workTimes;
	}

	/**
	 * @param workTimes
	 *            the workTimes to set
	 */
	public void setWorkTimes(Double workTimes) {
		this.workTimes = workTimes;
	}

	/**
	 * @return the userName
	 */
	public String getUserName() {
		return userName;
	}

	/**
	 * @param userName
	 *            the userName to set
	 */
	public void setUserName(String userName) {
		this.userName = userName;
	}

	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId() {
		return Id;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}

	public Date getStartTime() {
		return startTime;
	}

	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}

	public Date getEndTime() {
		return endTime;
	}

	public void setUsercode(String Usercode) {
		this.Usercode = Usercode;
	}

	public String getUsercode() {
		return Usercode;
	}

	public void setWorkTime(Double workTime) {
		this.workTime = workTime;
	}

	public Double getWorkTime() {
		return workTime;
	}

	public String getContent() {
		return Content;
	}

	public void setContent(String content) {
		Content = content;
	}

	public Integer getModelId() {
		return modelId;
	}

	public void setModelId(Integer modelId) {
		this.modelId = modelId;
	}

	public void setStatus(Integer Status) {
		this.Status = Status;
	}

	public Integer getStatus() {
		return Status;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	public Double getConfirmTimes() {
		return confirmTimes;
	}

	public void setConfirmTimes(Double confirmTimes) {
		this.confirmTimes = confirmTimes;
	}

	public GzrzModelUser() {
	}

	// <=================定制内容开始==============
	// ==================定制内容结束==============>

}