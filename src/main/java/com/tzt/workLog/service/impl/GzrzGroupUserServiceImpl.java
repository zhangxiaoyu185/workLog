package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tzt.workLog.service.GzrzGroupUserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzGroupUser;

@Service("gzrzGroupUserService")
public class GzrzGroupUserServiceImpl implements GzrzGroupUserService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzGroupUser(GzrzGroupUser gzrzGroupUser) {
		myBatisDAO.insert(gzrzGroupUser);
		return true;
	}

	@Override
	public boolean updateGzrzGroupUser(GzrzGroupUser gzrzGroupUser) {
		myBatisDAO.update(gzrzGroupUser);
		return true;
	}

	@Override
	public boolean deleteGzrzGroupUser(GzrzGroupUser gzrzGroupUser) {
		myBatisDAO.delete(gzrzGroupUser);
		return true;
	}

	@Override
	public GzrzGroupUser getGzrzGroupUser(GzrzGroupUser gzrzGroupUser) {
		return (GzrzGroupUser) myBatisDAO.findForObject(gzrzGroupUser);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

	private static final String FIND_GZRZ_GROUP_USER = "findGzrzGroupUser";
	private static final String FIND_GZRZ_GROUP_USER_BY_IDS = "findGzrzGroupUserByIds";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzGroupUser> findGzrzGroupUser(int groupId) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("groupId", groupId);
		return myBatisDAO.findForList(FIND_GZRZ_GROUP_USER, hashMap);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzGroupUser> findGzrzGroupUserByIds(List<Integer> groupIds) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("list", groupIds);
		return myBatisDAO.findForList(FIND_GZRZ_GROUP_USER_BY_IDS, hashMap);
	}
	
}