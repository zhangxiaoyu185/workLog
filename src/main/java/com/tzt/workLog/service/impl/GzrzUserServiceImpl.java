package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.service.GzrzUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.core.mybatis.page.PageRequest;
import com.tzt.workLog.entity.GzrzUser;

@Service("gzrzUserService")
public class GzrzUserServiceImpl implements GzrzUserService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzUser(GzrzUser gzrzUser) {
		myBatisDAO.insert(gzrzUser);
		return true;
	}

	@Override
	public boolean updateGzrzUser(GzrzUser gzrzUser) {
		myBatisDAO.update(gzrzUser);
		return true;
	}

	@Override
	public boolean deleteGzrzUser(GzrzUser gzrzUser) {
		myBatisDAO.delete(gzrzUser);
		return true;
	}

	@Override
	public GzrzUser getGzrzUser(GzrzUser gzrzUser) {
		return (GzrzUser) myBatisDAO.findForObject(gzrzUser);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

	private static final String FIND_GZRZ_USER_BY_CODES = "findGzrzUserByCodes";
	private static final String FIND_USER_LIST = "findUserList";
	private static final String FIND_USER_LIST_FOR_PAGE = "findUserListForPage";
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzUser> findGzrzUserByCodes(List<String> codes) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("list", codes);
		return myBatisDAO.findForList(FIND_GZRZ_USER_BY_CODES, hashMap);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzUser> findUserList() {
		return myBatisDAO.findForList(FIND_USER_LIST, null);
	}

	@SuppressWarnings("unchecked")
	@Override
	public Page<GzrzUser> findUserListForPage(String USERCODE, String USERNAME, Integer pageIndex, Integer pageSize) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Code", USERCODE);
		hashMap.put("Name", USERNAME);
		return myBatisDAO.findForPage(FIND_USER_LIST_FOR_PAGE, new PageRequest(pageIndex, pageSize, hashMap));
	}
	
}