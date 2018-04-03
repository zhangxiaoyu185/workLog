package com.tzt.workLog.service.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.service.GzrzMonthTaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzMonthTask;

@Service("gzrzMonthTaskService")
public class GzrzMonthTaskServiceImpl implements GzrzMonthTaskService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzMonthTask(GzrzMonthTask gzrzMonthTask) {
		myBatisDAO.insert(gzrzMonthTask);
		return true;
	}

	@Override
	public boolean updateGzrzMonthTask(GzrzMonthTask gzrzMonthTask) {
		myBatisDAO.update(gzrzMonthTask);
		return true;
	}

	@Override
	public boolean deleteGzrzMonthTask(GzrzMonthTask gzrzMonthTask) {
		myBatisDAO.delete(gzrzMonthTask);
		return true;
	}

	@Override
	public GzrzMonthTask getGzrzMonthTask(GzrzMonthTask gzrzMonthTask) {
		return (GzrzMonthTask) myBatisDAO.findForObject(gzrzMonthTask);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>
	private static final String FIND_MONTH_TASK_BY_USERCODE = "findGzrzMonthTaskByUserCode";
	private static final String INSERT_MONTH_TASK_BATCH = "insertGzrzMonthTaskBatch";
	
	@Override
	public boolean insertGzrzMonthTaskBatch(List<GzrzMonthTask> list) {
		myBatisDAO.insert(INSERT_MONTH_TASK_BATCH, list);
		return true;
	}
	
	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzMonthTask> findGzrzMonthTaskByUserCode(String CODE,
			int YEAR, int MONTH) {
		Map<String, Object> hashMap = new HashMap<String, Object>();
		hashMap.put("Usercode", CODE);
		hashMap.put("Year", YEAR);
		hashMap.put("Month", MONTH);
		return myBatisDAO.findForList(FIND_MONTH_TASK_BY_USERCODE, hashMap);
	}

}