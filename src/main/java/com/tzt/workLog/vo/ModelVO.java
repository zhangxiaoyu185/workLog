package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

public class ModelVO implements BaseVO {

	/**
	 * ID
	 */
	private Integer Id;

	/**
	 * 名称
	 */
	private String Name;

	/**
	 * 所属项目
	 */
	private Integer projectId;

	/**
	 * 开始时间
	 */
	private String startTime;

	/**
	 * 结束时间
	 */
	private String endTime;

	/**
	 * 备注
	 */
	private String Remarks;

	/**
	 * 模块用户关联
	 */
	private List<ModelUserVO> list = new ArrayList<>();

	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getName() {
		return Name;
	}

	public void setName(String name) {
		Name = name;
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

	public List<ModelUserVO> getList() {
		return list;
	}

	public void setList(List<ModelUserVO> list) {
		this.list = list;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}

}