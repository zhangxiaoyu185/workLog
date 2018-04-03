package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户分页列表
 */
public class ErrorLogListVO {

	private List<ErrorLogVO> list = new ArrayList<>(); //错误日志列表
	private Integer count; //总数

	public List<ErrorLogVO> getList() {
		return list;
	}

	public void setList(List<ErrorLogVO> list) {
		this.list = list;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

}