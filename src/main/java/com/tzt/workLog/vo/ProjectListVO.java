package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * 项目分页列表
 */
public class ProjectListVO {

	private List<ProjectVO> list = new ArrayList<>(); //项目列表
	private Integer count; //总数

	public List<ProjectVO> getList() {
		return list;
	}

	public void setList(List<ProjectVO> list) {
		this.list = list;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

}