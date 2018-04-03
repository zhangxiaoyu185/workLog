package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tzt.workLog.service.GzrzModelService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzModel;

@Service("gzrzModelService")
public class GzrzModelServiceImpl implements GzrzModelService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzModel(GzrzModel gzrzModel) {
		myBatisDAO.insert(gzrzModel);
		return true;
	}

	@Override
	public boolean updateGzrzModel(GzrzModel gzrzModel) {
		int lenMo=myBatisDAO.update(gzrzModel);
		if(lenMo>0){
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteGzrzModel(GzrzModel gzrzModel) {
		myBatisDAO.delete(gzrzModel);
		return true;
	}

	@Override
	public GzrzModel getGzrzModel(GzrzModel gzrzModel) {
		return (GzrzModel) myBatisDAO.findForObject(gzrzModel);
	}

	private static final String FIND_GZRZMODEL_BY_PID = "getGzrzModelByPid";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzModel> getGzrzModelByPid(String projectId) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("projectId", projectId);
		return myBatisDAO.findForList(FIND_GZRZMODEL_BY_PID, hashMap);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}