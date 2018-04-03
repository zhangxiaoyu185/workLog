package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.Map;
import com.tzt.workLog.service.CoreTlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.core.mybatis.page.PageRequest;
import com.tzt.workLog.entity.CoreTlog;

@Service("coreTlogService")
public class CoreTlogServiceImpl implements CoreTlogService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertCoreTlog(CoreTlog coreTlog) {
		myBatisDAO.insert(coreTlog);
		return true;
	}

	@Override
	public boolean updateCoreTlog(CoreTlog coreTlog) {
		myBatisDAO.update(coreTlog);
		return true;
	}

	@Override
	public boolean deleteCoreTlog(CoreTlog coreTlog) {
		myBatisDAO.delete(coreTlog);
		return true;
	}

	@Override
	public CoreTlog getCoreTlog(CoreTlog coreTlog) {
		return (CoreTlog) myBatisDAO.findForObject(coreTlog);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

	private static final String GET_ALL_CORETLOG = "getAllCoreTlog";

	@SuppressWarnings("unchecked")
	@Override
	public Page<CoreTlog> getAllCoreTlog(String name, String type, Integer pageIndex, Integer pageSize) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Username", name);
		hashMap.put("crtogType", type);
		return myBatisDAO.findForPage(GET_ALL_CORETLOG, new PageRequest(pageIndex, pageSize, hashMap));
	}
	
}