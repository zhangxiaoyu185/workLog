package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;

public class ModelAndUserVO implements BaseVO {

	private List<ModelVO> modelVOList = new ArrayList<>();

	private List<ModelUserVO> modelUserVOList = new ArrayList<>();

	public List<ModelVO> getModelVOList() {
		return modelVOList;
	}

	public void setModelVOList(List<ModelVO> modelVOList) {
		this.modelVOList = modelVOList;
	}

	public List<ModelUserVO> getModelUserVOList() {
		return modelUserVOList;
	}

	public void setModelUserVOList(List<ModelUserVO> modelUserVOList) {
		this.modelUserVOList = modelUserVOList;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}

}