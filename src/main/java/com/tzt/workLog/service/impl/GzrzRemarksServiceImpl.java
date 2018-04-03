package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tzt.workLog.service.GzrzRemarksService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzRemarks;

@Service("gzrzRemarksService")
public class GzrzRemarksServiceImpl implements GzrzRemarksService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzRemarks(GzrzRemarks gzrzRemarks) {
		myBatisDAO.insert(gzrzRemarks);
		return true;
	}

	@Override
	public boolean updateGzrzRemarks(GzrzRemarks gzrzRemarks) {
		myBatisDAO.update(gzrzRemarks);
		return true;
	}

	@Override
	public boolean deleteGzrzRemarks(GzrzRemarks gzrzRemarks) {
		myBatisDAO.delete(gzrzRemarks);
		return true;
	}

	@Override
	public GzrzRemarks getGzrzRemarks(GzrzRemarks gzrzRemarks) {
		return (GzrzRemarks) myBatisDAO.findForObject(gzrzRemarks);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>
	
	private static final String FIND_GZRZ_REMARKS = "findGzrzRemarks";

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzRemarks> findGzrzRemarks(int dayTaskId) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("dayTaskId", dayTaskId);
		return myBatisDAO.findForList(FIND_GZRZ_REMARKS, hashMap);
	}
	
}