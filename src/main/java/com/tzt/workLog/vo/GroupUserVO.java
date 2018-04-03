package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;
import com.tzt.workLog.entity.GzrzGroupUser;

public class GroupUserVO implements BaseVO {

	/**
	*ID
	*/
	private Integer Id;

	/**
	*组别名
	*/
	private String Name;

	/**
	*工号
	*/
	private String Usercode;

	/**
	*项目经理
	*/
	private String manageName;
	
	/**
	*组别内的人员列表
	*/
	private List<GzrzGroupUser> groupUserList = new ArrayList<>();
	
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

	public String getUsercode() {
		return Usercode;
	}

	public void setUsercode(String usercode) {
		Usercode = usercode;
	}

	public List<GzrzGroupUser> getGroupUserList() {
		return groupUserList;
	}

	public void setGroupUserList(List<GzrzGroupUser> groupUserList) {
		this.groupUserList = groupUserList;
	}

	public String getManageName() {
		return manageName;
	}

	public void setManageName(String manageName) {
		this.manageName = manageName;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}
	
}