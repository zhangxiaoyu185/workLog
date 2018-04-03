package com.tzt.workLog.vo;

public class WeekTaskVO implements BaseVO {

	/**
	 * ID
	 */
	private Integer Id;

	/**
	 * 任务内容
	 */
	private String Content;

	/**
	 * 责任人工号
	 */
	private String Usercode;

	/**
	 * 状态(0:未完成/1：已完成)
	 */
	private Integer Status;

	/**
	 * 所属项目
	 */
	private Integer projectId;

	/**
	*所属项目名称
	*/
	private String projectName;
	
	/**
	 * 开始日期
	 */
	private String startTime;

	/**
	 * 结束日期
	 */
	private String endTime;

	/**
	 * 备注
	 */
	private String Remarks;

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getContent() {
		return Content;
	}

	public void setContent(String content) {
		Content = content;
	}

	public String getUsercode() {
		return Usercode;
	}

	public void setUsercode(String usercode) {
		Usercode = usercode;
	}

	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getStartTime() {
		return startTime;
	}

	public void setStartTime(String startTime) {
		this.startTime = startTime;
	}

	public String getEndTime() {
		return endTime;
	}

	public void setEndTime(String endTime) {
		this.endTime = endTime;
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

	@Override
	public void convertPOToVO(Object poObj) {
	}

}