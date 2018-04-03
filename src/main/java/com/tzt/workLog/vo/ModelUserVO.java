package com.tzt.workLog.vo;

import com.tzt.workLog.entity.GzrzModelUser;
import com.tzt.workLog.tool.DateUtil;

public class ModelUserVO implements BaseVO {

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
	private String startTime;

	/**
	 * 结束时间
	 */
	private String endTime;

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
	 * 状态（0完成/1未完成/2作废）
	 */
	private Integer Status;

	/**
	 * 备注
	 */
	private String Remarks;

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public String getUsercode() {
		return Usercode;
	}

	public void setUsercode(String usercode) {
		Usercode = usercode;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public Double getUsedTimes() {
		return usedTimes;
	}

	public void setUsedTimes(Double usedTimes) {
		this.usedTimes = usedTimes;
	}

	public Double getWorkTimes() {
		return workTimes;
	}

	public void setWorkTimes(Double workTimes) {
		this.workTimes = workTimes;
	}

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

	public Integer getModelId() {
		return modelId;
	}

	public void setModelId(Integer modelId) {
		this.modelId = modelId;
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

	public Double getWorkTime() {
		return workTime;
	}

	public void setWorkTime(Double workTime) {
		this.workTime = workTime;
	}

	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
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

	@Override
	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		GzrzModelUser po = (GzrzModelUser) poObj;
		this.Content = po.getContent();
		this.endTime = DateUtil.formatDefaultDate(po.getEndTime());
		this.Id = po.getId();
		this.modelId = po.getModelId();
		this.projectId = po.getProjectId();
		this.Remarks = po.getRemarks();
		this.startTime = DateUtil.formatDefaultDate(po.getStartTime());
		this.Status = po.getStatus();
		this.usedTimes = po.getUsedTimes();
		this.Usercode = po.getUsercode();
		this.userName = po.getUserName();
		this.workTime = po.getWorkTime();
		this.workTimes = po.getWorkTimes();
		this.confirmTimes=po.getConfirmTimes();
	}

}