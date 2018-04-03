package com.tzt.workLog.core.cache.service.impl;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.tzt.workLog.core.cache.service.DataPopulateService;
import com.tzt.workLog.core.cache.service.DataCacheService;
import com.tzt.workLog.core.mybatis.dao.DataRequiredReflect;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.tool.ObjectUtil;

@SuppressWarnings({"rawtypes","unchecked"})
public class DataPopulateServiceImpl extends DataRequiredReflect implements DataPopulateService{

	private MyBatisDAO myBatisDAO = null;
	
	private DataCacheService dataCacheService;
	
	@Override
	public void setObjectInfo(Object obj, Class fillClass, String searchStrId) {

		if (obj == null)
			return;
		List list = new ArrayList();
		list.add(obj);
		setListInfos(list, fillClass, searchStrId);
	}

	@Override
	public void setListInfos(List list, Class fillClass, String searchStrId) {

		fillDataDetail(list, fillClass, searchStrId);
	}

	@Override
	public void setObjectInfo(Object obj, String property, Class fillClass,String searchStrId) {

		setObjectInfo(ObjectUtil.getNestedProperty(obj, property), fillClass,searchStrId);
	}

	@Override
	public void setListInfos(List list, String property, Class fillClass,
			String searchStrId) {

		if (list == null || list.isEmpty()) {
			return;
		}

		List objects = new ArrayList();
		for (Object object : list) {
			objects.add(ObjectUtil.getNestedProperty(object, property));
		}

		fillDataDetail(objects, fillClass, searchStrId);
	}

	protected Map findDataMapByIds(Object[] ids, String sqlMapId) {
		Map result = new HashMap();
		if (ids == null || ids.length == 0)
			return result;
		List list = myBatisDAO.findForList(sqlMapId, ids);
		try {
			for (Object obj : list) {
				Long id = (Long) obj.getClass().getMethod("getId", null).invoke(obj, null);
				result.put(id, obj);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		return result;
	}

	private void fillDataDetail(List list, Class fillClass, String searchStr) {

		if (list == null || list.isEmpty()) {
			return;
		}
		
		Class dataClass = list.get(0).getClass();
		List<String[]> detailMethodNames = super.getNeedDetailMethod(dataClass,fillClass);
		Object[] ids = super.getNeedDetailIds(list, dataClass, fillClass,detailMethodNames);
		Map map = dataCacheService.getDataMapByTypeKeys(fillClass, ids); //先从从缓存中查询
		if(map==null || map.size()==0)
		   map = findDataMapByIds(ids, searchStr);
		
		super.detailDatas(list, dataClass, map, fillClass, detailMethodNames);
	}
	
	public void setMyBatisDAO(MyBatisDAO myBatisDAO) {
		this.myBatisDAO = myBatisDAO;
	}

	public MyBatisDAO getMyBatisDAO() {
		return myBatisDAO;
	}

	public DataCacheService getDataCacheService() {
		return dataCacheService;
	}

	public void setDataCacheService(DataCacheService dataCacheService) {
		this.dataCacheService = dataCacheService;
	}
	
}