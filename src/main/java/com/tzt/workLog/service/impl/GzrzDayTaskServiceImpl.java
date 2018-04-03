package com.tzt.workLog.service.impl;

import java.util.List;

import com.tzt.workLog.service.GzrzDayTaskService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzDayTask;

@Service("gzrzDayTaskService")
public class GzrzDayTaskServiceImpl implements GzrzDayTaskService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzDayTask(GzrzDayTask gzrzDayTask) {
		myBatisDAO.insert(gzrzDayTask);
		return true;
	}

	@Override
	public boolean updateGzrzDayTask(GzrzDayTask gzrzDayTask) {
		myBatisDAO.update(gzrzDayTask);
		return true;
	}

	@Override
	public boolean deleteGzrzDayTask(GzrzDayTask gzrzDayTask) {
		myBatisDAO.delete(gzrzDayTask);
		return true;
	}

	@Override
	public GzrzDayTask getGzrzDayTask(GzrzDayTask gzrzDayTask) {
		return (GzrzDayTask) myBatisDAO.findForObject(gzrzDayTask);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

	private static final String INSERT_DAY_TASK_BATCH = "insertGzrzDayTaskBatch";
	private static final String FIND_GZRZ_TASK_BY_YEAR_AND_MONTH_AND_DAY = "findGzrzDayTaskByYearAndMonthAndDay";
	private static final String FIND_GZRZ_DAY_TASK_BY_PROJECT = "findGzrzDayTaskByProject";
	private static final String FIND_GZRZ_DAY_TASK_SUMMARY = "findGzrzDayTaskSummary";
	
	@Override
	public boolean insertGzrzDayTaskBatch(List<GzrzDayTask> list) {
		myBatisDAO.insert(INSERT_DAY_TASK_BATCH, list);
		return true;
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzDayTask> findGzrzDayTaskByYearAndMonthAndDay(
			GzrzDayTask gzrzDayTask) {
		return myBatisDAO.findForList(FIND_GZRZ_TASK_BY_YEAR_AND_MONTH_AND_DAY, gzrzDayTask);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzDayTask> findGzrzDayTaskByProject(GzrzDayTask gzrzDayTask) {
		return myBatisDAO.findForList(FIND_GZRZ_DAY_TASK_BY_PROJECT, gzrzDayTask);
	}

	@SuppressWarnings("unchecked")
	@Override
	public List<GzrzDayTask> findGzrzDayTaskSummary(GzrzDayTask gzrzDayTask) {
		return myBatisDAO.findForList(FIND_GZRZ_DAY_TASK_SUMMARY, gzrzDayTask);
	}
	
}