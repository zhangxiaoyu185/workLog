package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

public class DayVO implements BaseVO {

	/**
	*日报日期(YYYY-MM-DD)
	*/
	private String Workdate;

	/**
	*日报内容
	*/
	private List<DayTaskVO> voList = new ArrayList<>();
	
	public String getWorkdate() {
		return Workdate;
	}

	public void setWorkdate(String workdate) {
		Workdate = workdate;
	}

	public List<DayTaskVO> getVoList() {
		return voList;
	}

	public void setVoList(List<DayTaskVO> voList) {
		this.voList = voList;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}
		
}