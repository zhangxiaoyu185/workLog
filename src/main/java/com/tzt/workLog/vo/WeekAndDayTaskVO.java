package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

public class WeekAndDayTaskVO implements BaseVO {

	/**
	 * 日报列表
	 */
	private List<DayVO> dayTaskVOList = new ArrayList<>();

	/**
	 * 周报列表
	 */
	private List<WeekTaskVO> weekTaskVOList = new ArrayList<>();

	/**
	 * 下一周
	 */
	private Integer week;

	public List<DayVO> getDayTaskVOList() {
		return dayTaskVOList;
	}

	public void setDayTaskVOList(List<DayVO> dayTaskVOList) {
		this.dayTaskVOList = dayTaskVOList;
	}

	public List<WeekTaskVO> getWeekTaskVOList() {
		return weekTaskVOList;
	}

	public void setWeekTaskVOList(List<WeekTaskVO> weekTaskVOList) {
		this.weekTaskVOList = weekTaskVOList;
	}

	public Integer getWeek() {
		return week;
	}

	public void setWeek(Integer week) {
		this.week = week;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}

}