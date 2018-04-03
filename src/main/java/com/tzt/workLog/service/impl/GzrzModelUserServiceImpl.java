package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzModelUser;
import com.tzt.workLog.service.GzrzModelUserService;

@Service("gzrzModelUserService")
public class GzrzModelUserServiceImpl implements GzrzModelUserService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzModelUser(GzrzModelUser gzrzModelUser) {
		myBatisDAO.insert(gzrzModelUser);
		return true;
	}

	@Override
	public boolean updateGzrzModelUser(GzrzModelUser gzrzModelUser) {
		int updsize = myBatisDAO.update(gzrzModelUser);
		if (updsize > 0) {
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteGzrzModelUser(GzrzModelUser gzrzModelUser) {
		myBatisDAO.delete(gzrzModelUser);
		return true;
	}

	@Override
	public GzrzModelUser getGzrzModelUser(GzrzModelUser gzrzModelUser) {
		return (GzrzModelUser) myBatisDAO.findForObject(gzrzModelUser);
	}

	private static final String FIND_GZRZMODELUSER_BY_IDS = "getGzrzModelUserByIds";
	private static final String GET_GZRZMODELUSER_BY_PROJECTID = "getGzrzModelUserByProjectId";

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzModelUser> getGzrzModelUserByIds(String projectId, String modelId, List<String> status) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("projectId", projectId);
		hashMap.put("modelId", modelId);
		hashMap.put("list", status);
		return myBatisDAO.findForList(FIND_GZRZMODELUSER_BY_IDS, hashMap);
	}

	private static final String FIND_WORKTIMES_BY_PID = "getWorkTimesByPId";

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzModelUser> getWorkTimesById(String projectId) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("projectId", projectId);
		return myBatisDAO.findForList(FIND_WORKTIMES_BY_PID, hashMap);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzModelUser> getGzrzModelUserByProjectId(Integer projectId) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("projectId", projectId);
		return myBatisDAO.findForList(GET_GZRZMODELUSER_BY_PROJECTID, hashMap);
	}

	private static final String FIND_GZRZMODELUSER_BY_UCODE = "getGzrzModelUserByUcode";

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzModelUser> findGzrzProjectsByUcode(String USERCODE) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", USERCODE);
		return myBatisDAO.findForList(FIND_GZRZMODELUSER_BY_UCODE, hashMap);
	}
}