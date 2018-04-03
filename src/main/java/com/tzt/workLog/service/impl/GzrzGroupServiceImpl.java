package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.service.GzrzGroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzGroup;

@Service("gzrzGroupService")
public class GzrzGroupServiceImpl implements GzrzGroupService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzGroup(GzrzGroup gzrzGroup) {
		myBatisDAO.insert(gzrzGroup);
		return true;
	}

	@Override
	public boolean updateGzrzGroup(GzrzGroup gzrzGroup) {
		myBatisDAO.update(gzrzGroup);
		return true;
	}

	@Override
	public boolean deleteGzrzGroup(GzrzGroup gzrzGroup) {
		myBatisDAO.delete(gzrzGroup);
		return true;
	}

	@Override
	public GzrzGroup getGzrzGroup(GzrzGroup gzrzGroup) {
		return (GzrzGroup) myBatisDAO.findForObject(gzrzGroup);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

	private static final String FIND_GZRZ_GROUP = "findGzrzGroup";
	private static final String UPDATE_GZRZ_GROUP_BY_CODE = "updateGzrzGroupByCode";
	private static final String FIND_ALL_PROJECT_MANAGE = "findAllProjectManage";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzGroup> findGzrzGroup(String Usercode) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", Usercode);
		return myBatisDAO.findForList(FIND_GZRZ_GROUP, hashMap);
	}

	@Override
	public boolean updateGzrzGroupByCode(String Usercode) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", Usercode);
		myBatisDAO.update(UPDATE_GZRZ_GROUP_BY_CODE, hashMap);
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzGroup> findAllProjectManage() {
		return myBatisDAO.findForList(FIND_ALL_PROJECT_MANAGE, null);
	}
	
}