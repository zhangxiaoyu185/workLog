package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tzt.workLog.service.GzrzBugService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.core.mybatis.page.PageRequest;
import com.tzt.workLog.entity.GzrzBug;

@Service("gzrzBugService")
public class GzrzBugServiceImpl implements GzrzBugService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzBug(GzrzBug gzrzBug) {
		myBatisDAO.insert(gzrzBug);
		return true;
	}

	@Override
	public boolean updateGzrzBug(GzrzBug gzrzBug) {
		myBatisDAO.update(gzrzBug);
		return true;
	}

	@Override
	public boolean deleteGzrzBug(GzrzBug gzrzBug) {
		myBatisDAO.delete(gzrzBug);
		return true;
	}

	@Override
	public GzrzBug getGzrzBug(GzrzBug gzrzBug) {
		return (GzrzBug) myBatisDAO.findForObject(gzrzBug);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<GzrzBug> getGzrzBugsByConditions(Integer pageIndex,
			Integer pageSize, Integer status, Integer role_id, String usercode,
			String title, String projectName, String assignedName) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Status", status);
		hashMap.put("Usercode", usercode);
		hashMap.put("Title", title);
		hashMap.put("projectName", projectName);
		hashMap.put("assignedName", assignedName);
		// 默认获取个人的bug列表
		String sqlType = "getBugsByPerson";
		if (role_id == 3) {// 测试
			sqlType = "getGzrzBugsByConditions";
		}
		if (role_id == 0 || role_id == 1) {// 管理员或总监
			sqlType = "getBugsByDirector";
		}
		if (role_id == 2) {// 项目经理
			sqlType = "getBugsByManage";
		}
		return myBatisDAO.findForPage(sqlType, new PageRequest(pageIndex,pageSize, hashMap));
	}

}