package com.tzt.workLog.core.mybatis.dao;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import com.tzt.workLog.tool.ObjectUtil;

@SuppressWarnings({"rawtypes","unchecked"})
public class DataRequiredDAOImpl extends DataRequiredReflect implements DataRequiredDAO {	
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
			Object obj = ObjectUtil.getNestedProperty(object, property) ; 
			if(obj==null){
				continue ; 
			}
			objects.add(obj);
		}

		fillDataDetail(objects, fillClass, searchStrId);
	}

	private MyBatisDAO myBatisDAO = null;

	public void setMyBatisDAO(MyBatisDAO myBatisDAO) {
		this.myBatisDAO = myBatisDAO;
	}

	public MyBatisDAO getMyBatisDAO() {
		return myBatisDAO;
	}

	protected Map findDataMapByIds(Object[] ids, String sqlMapId) {
		Map result = new HashMap();
		if (ids == null || ids.length == 0)
			return result;
		List list = myBatisDAO.findForList(sqlMapId, ids);
		try {
			for (Object obj : list) {
				Object id = (Object) obj.getClass().getMethod("getId", null).invoke(obj, null);
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
		Map map = findDataMapByIds(ids, searchStr);
		super.detailDatas(list, dataClass, map, fillClass, detailMethodNames);
	}
}
