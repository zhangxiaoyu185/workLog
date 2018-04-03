package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.service.GzrzCoreFunctionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzCoreFunction;

@Service("gzrzCoreFunctionService")
public class GzrzCoreFunctionServiceImpl implements GzrzCoreFunctionService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction) {
		myBatisDAO.insert(gzrzCoreFunction);
		return true;
	}

	@Override
	public boolean updateGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction) {
		myBatisDAO.update(gzrzCoreFunction);
		return true;
	}

	@Override
	public boolean deleteGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction) {
		myBatisDAO.delete(gzrzCoreFunction);
		return true;
	}

	@Override
	public GzrzCoreFunction getGzrzCoreFunction(GzrzCoreFunction gzrzCoreFunction) {
		return (GzrzCoreFunction) myBatisDAO.findForObject(gzrzCoreFunction);
	}
	
	private static final String GET_ALL_COREFUNCTIONS = "getAllCoreFunctions";
	private static final String FIND_GZRZ_FUNCTIONS_BY_IDS = "findGzrzFunctionsByIds";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzCoreFunction> getGzrzCoreFunctions() {
		return myBatisDAO.findForList(GET_ALL_COREFUNCTIONS, null);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzCoreFunction> findGzrzFunctionsByIds(List<String> ids) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("list", ids);
		return myBatisDAO.findForList(FIND_GZRZ_FUNCTIONS_BY_IDS, hashMap);
	}

}