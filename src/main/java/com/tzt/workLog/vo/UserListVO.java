package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

/**
 * 用户分页列表
 */
public class UserListVO {

	private List<UserVO> list = new ArrayList<>(); //员工列表
	private Integer count; //总数

	public List<UserVO> getList() {
		return list;
	}

	public void setList(List<UserVO> list) {
		this.list = list;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

}