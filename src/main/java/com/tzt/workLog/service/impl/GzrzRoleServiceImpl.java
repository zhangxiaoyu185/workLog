package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.service.GzrzRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzRole;

@Service("gzrzRoleService")
public class GzrzRoleServiceImpl implements GzrzRoleService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzRole(GzrzRole gzrzRole) {
		myBatisDAO.insert(gzrzRole);
		return true;
	}

	@Override
	public boolean updateGzrzRole(GzrzRole gzrzRole) {
		myBatisDAO.update(gzrzRole);
		return true;
	}

	@Override
	public boolean deleteGzrzRole(GzrzRole gzrzRole) {
		myBatisDAO.delete(gzrzRole);
		return true;
	}

	@Override
	public GzrzRole getGzrzRole(GzrzRole gzrzRole) {
		return (GzrzRole) myBatisDAO.findForObject(gzrzRole);
	}

	private static final String FIND_GZRZROLE_ALL = "findGzrzRoleAll";
	private static final String FIND_GZRZROLE_BY_IDS = "findGzrzRoleByIds";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzRole> findGzrzRoleAll() {
		return myBatisDAO.findForList(FIND_GZRZROLE_ALL, null);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzRole> findGzrzRoleByIds(List<String> ids) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("list", ids);
		return myBatisDAO.findForList(FIND_GZRZROLE_BY_IDS, hashMap);
	}
	
}