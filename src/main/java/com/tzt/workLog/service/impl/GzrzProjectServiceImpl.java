package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tzt.workLog.service.GzrzProjectService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.core.mybatis.page.PageRequest;
import com.tzt.workLog.entity.GzrzProject;

@Service("gzrzProjectService")
public class GzrzProjectServiceImpl implements GzrzProjectService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzProject(GzrzProject gzrzProject) {
		myBatisDAO.insert(gzrzProject);
		return true;
	}

	@Override
	public boolean updateGzrzProject(GzrzProject gzrzProject) {
		int updateLen=myBatisDAO.update(gzrzProject);
		if(updateLen>0){
			return true;
		}
		return false;
	}

	@Override
	public boolean deleteGzrzProject(GzrzProject gzrzProject) {
		myBatisDAO.delete(gzrzProject);
		return true;
	}

	@Override
	public GzrzProject getGzrzProject(GzrzProject gzrzProject) {
		return (GzrzProject) myBatisDAO.findForObject(gzrzProject);
	}

	private static final String FIND_GZRZPROJECTS_BY_TIME = "findGzrzProjectsByTime";
	private static final String UPDATE_ADD_PROJECT_ALL_TIME = "updateAddProjectAllTime";
	private static final String UPDATE_DESC_PROJECT_ALL_TIME = "updateDescProjectAllTime";
	private static final String FIND_GZRZ_PROJECTS_BY_NAME = "findGzrzProjectsByName";
	private static final String FIND_GZRZ_PROJECTS_ALL_LIST_BY_NAME = "findGzrzProjectsAllListByName";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzProject> getGzrzProjects(String userCode,String startTime) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", userCode);
		hashMap.put("startTime", startTime);
		return myBatisDAO.findForList(FIND_GZRZPROJECTS_BY_TIME, hashMap);
	}

	@Override
	public boolean updateProjectAllTime(GzrzProject gzrzProject, int status) {
		if (status > 0) {
			myBatisDAO.update(UPDATE_ADD_PROJECT_ALL_TIME, gzrzProject);
		}
		else {
			myBatisDAO.update(UPDATE_DESC_PROJECT_ALL_TIME, gzrzProject);
		}
		return true;		
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzProject> findGzrzProjectsByName(String Name) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Name", Name);
		return myBatisDAO.findForList(FIND_GZRZ_PROJECTS_BY_NAME, hashMap);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<GzrzProject> findGzrzProjectsAllListByName(String Code, String Name, String Username, Integer pageIndex, Integer pageSize) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", Code);
		hashMap.put("Name", Name);
		hashMap.put("Username", Username);
		return myBatisDAO.findForPage(FIND_GZRZ_PROJECTS_ALL_LIST_BY_NAME, new PageRequest(pageIndex, pageSize, hashMap));
	}
	
}