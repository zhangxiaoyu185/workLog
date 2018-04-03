package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.service.GzrzWeekTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzWeekTask;

@Service("gzrzWeekTaskService")
public class GzrzWeekTaskServiceImpl implements GzrzWeekTaskService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzWeekTask(GzrzWeekTask gzrzWeekTask) {
		myBatisDAO.insert(gzrzWeekTask);
		return true;
	}

	@Override
	public boolean updateGzrzWeekTask(GzrzWeekTask gzrzWeekTask) {
		myBatisDAO.update(gzrzWeekTask);
		return true;
	}

	@Override
	public boolean deleteGzrzWeekTask(GzrzWeekTask gzrzWeekTask) {
		myBatisDAO.delete(gzrzWeekTask);
		return true;
	}

	@Override
	public GzrzWeekTask getGzrzWeekTask(GzrzWeekTask gzrzWeekTask) {
		return (GzrzWeekTask) myBatisDAO.findForObject(gzrzWeekTask);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>
	
	private static final String FIND_WEEK_TASK_BY_USERCODE = "findGzrzWeekTaskByUserCode";
	private static final String INSERT_WEEK_TASK_BATCH = "insertGzrzWeekTaskBatch";
	private static final String GET_MAX_WEEK_BY_YEAR_AND_MONTH = "getMaxWeekByYearAndMonth";
	private static final String GET_MAX_WEEK_BY_PROJECTID = "getMaxWeekByProjectId";
	
	@Override
	public boolean insertGzrzWeekTaskBatch(List<GzrzWeekTask> list) {
		myBatisDAO.insert(INSERT_WEEK_TASK_BATCH, list);
		return true;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzWeekTask> findGzrzWeekTaskByUserCode(String CODE, int YEAR,
			int MONTH, int WEEK) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", CODE);
		hashMap.put("Year", YEAR);
		hashMap.put("Month", MONTH);
		hashMap.put("Week", WEEK);
		return myBatisDAO.findForList(FIND_WEEK_TASK_BY_USERCODE, hashMap);
	}

	@Override
	public int getMaxWeekByYearAndMonth(String CODE, int YEAR, int MONTH) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", CODE);
		hashMap.put("Year", YEAR);
		hashMap.put("Month", MONTH);
		Integer max = (Integer) myBatisDAO.findForObject(GET_MAX_WEEK_BY_YEAR_AND_MONTH, hashMap);
		if (max == null) {
			max = 1;
		}
		return max;
	}

	@Override
	public int getMaxWeekByProjectId(int projectId, int YEAR, int MONTH) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("projectId", projectId);
		hashMap.put("Year", YEAR);
		hashMap.put("Month", MONTH);
		Integer max = (Integer) myBatisDAO.findForObject(GET_MAX_WEEK_BY_PROJECTID, hashMap);
		if (max == null) {
			max = 1;
		}
		return max;
	}
	
}