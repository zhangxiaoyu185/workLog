package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

public class ProjectVO implements BaseVO {

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
	private String startTime;

	/**
	*结束时间
	*/
	private String endTime;

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
	
	/**
	 * 参与人列表
	 */
	private List<ModelUserVO> userList = new ArrayList<>();
	
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

	public Double getAllTime() {
		return allTime;
	}

	public void setAllTime(Double allTime) {
		this.allTime = allTime;
	}

	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
	}

	public String getLastTime() {
		return lastTime;
	}

	public void setLastTime(String lastTime) {
		this.lastTime = lastTime;
	}

	public String getUsercode() {
		return Usercode;
	}

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public void setUsercode(String usercode) {
		Usercode = usercode;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	public List<ModelUserVO> getUserList() {
		return userList;
	}

	public void setUserList(List<ModelUserVO> userList) {
		this.userList = userList;
	}

	public String getExplanation() {
		return Explanation;
	}

	public void setExplanation(String explanation) {
		Explanation = explanation;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}

}