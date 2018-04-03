package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * 操作日志分页列表
 */
public class CoreTlogListVO {

	private List<CoreTlogVO> list = new ArrayList<>(); //操作日志列表
	private Integer count; //总数

	public List<CoreTlogVO> getList() {
		return list;
	}

	public void setList(List<CoreTlogVO> list) {
		this.list = list;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

}