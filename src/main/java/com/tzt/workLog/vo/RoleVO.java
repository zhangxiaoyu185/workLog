package com.tzt.workLog.vo;

import com.tzt.workLog.entity.GzrzRole;

public class RoleVO implements BaseVO {

	/**
	*ID
	*/
	private Integer Id;

	/**
	*角色名
	*/
	private String Name;
	
	/**
	*权限unid集合
	*/
	private String FunctionUnids;
	
	/**
	*权限名称集合
	*/
	private String FunctionNames;
	
	/**
	*备注
	*/
	private String Remarks;
	
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

	public String getFunctionUnids() {
		return FunctionUnids;
	}

	public void setFunctionUnids(String functionUnids) {
		FunctionUnids = functionUnids;
	}

	public String getFunctionNames() {
		return FunctionNames;
	}

	public void setFunctionNames(String functionNames) {
		FunctionNames = functionNames;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	@Override
	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		GzrzRole po = (GzrzRole) poObj;
		this.Id = po.getId();
		this.Name = po.getName();
		this.FunctionUnids = po.getPermissions();
		this.Remarks = po.getRemarks();
	}

}