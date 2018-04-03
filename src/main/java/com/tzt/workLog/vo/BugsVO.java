package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * bug分页列表
 */
public class BugsVO {

	private List<BugVO> list = new ArrayList<>(); //bug列表
	private Integer count; //总数

	public List<BugVO> getList() {
		return list;
	}

	public void setList(List<BugVO> list) {
		this.list = list;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

}