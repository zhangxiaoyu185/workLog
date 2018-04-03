package com.tzt.workLog.core.mybatis.dao;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

@SuppressWarnings({ "rawtypes", "unchecked" })
public abstract class DataRequiredReflect {

	protected List<String[]> getNeedDetailMethod(Class dataClass,Class needDetailed) {
		List<String[]> result = new ArrayList<String[]>();
		while (dataClass != null) {
			for (Field field : dataClass.getDeclaredFields()) {
				if (needDetailed.isAssignableFrom(field.getType())) {
					String methodNamePostfix = field.getName().substring(0, 1).toUpperCase()+ field.getName().substring(1);
					String[] tmp = new String[2];
					tmp[0] = "get" + methodNamePostfix;
					tmp[1] = "set" + methodNamePostfix;
					result.add(tmp);
				}
			}
			dataClass = dataClass.getSuperclass();
		}
		return result;
	}

	protected Object[] getNeedDetailIds(List list, Class dataClass,Class needDetailed, List<String[]> detailMethodNames) {
		Set<Object> result = new HashSet<Object>();
		try {
			List<Method> getMethods = new ArrayList<Method>();
			for (String[] getSetName : detailMethodNames) {
				Method getMethod = dataClass.getMethod(getSetName[0], null);
				if (getMethod != null)
					getMethods.add(getMethod);
			}
			if (getMethods.isEmpty())
				return null;
			
			Method getIdMethod = needDetailed.getMethod("getId", null);
			for (Object obj : list) {
				if(obj==null){
					continue;
				}
				for (Method method : getMethods) {
					Object detailedObj = method.invoke(obj, null);
					if (detailedObj != null) {
						Object tmpId = (Object) getIdMethod.invoke(detailedObj);
						if (tmpId!=null)
							result.add(tmpId);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.toArray(new Object[0]);
	}

	protected String[] getNeedDetailStringIds(List list, Class dataClass,
			Class needDetailed, List<String[]> detailMethodNames) {
		Set<String> result = new HashSet<String>();
		try {
			List<Method> getMethods = new ArrayList<Method>();
			for (String[] getSetName : detailMethodNames) {
				Method setMethod = dataClass.getMethod(getSetName[0], null);
				if (setMethod != null)
					getMethods.add(setMethod);
			}
			if (getMethods.isEmpty())
				return null;
			Method getIdMethod = needDetailed.getMethod("getId", null);
			if (getIdMethod != null)
				for (Object obj : list) {
					for (Method method : getMethods) {
						Object propertyVal = method.invoke(obj, null);
						if (propertyVal != null) {
							Object idVal = getIdMethod.invoke(propertyVal);
							if (idVal != null && !"0".equals(idVal))
								result.add((String) idVal);
						}
					}
				}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return result.toArray(new String[0]);
	}

	@SuppressWarnings("unchecked")
	protected void detailDatas(List list, Class dataClass, Map cachedDatas,
			Class needDetailed, List<String[]> detailMethodNames) {

		try {
			if (detailMethodNames == null || detailMethodNames.isEmpty()
					|| cachedDatas == null || cachedDatas.isEmpty()
					|| list == null || list.isEmpty())
				return;
			Method getIdMethod = needDetailed.getMethod("getId", null);
			if (getIdMethod != null)
				for (Object obj : list) {
					if(obj==null){
						continue;
					}
					for (String[] getSetName : detailMethodNames) {

						Method getMethod = dataClass.getMethod(getSetName[0],null);
						Method setMethod = dataClass.getMethod(getSetName[1],needDetailed);

						if (getMethod != null && setMethod != null) {

							Object detailedObj = getMethod.invoke(obj, null);

							if (detailedObj != null) {

								Object datailedVal = cachedDatas.get(getIdMethod.invoke(detailedObj,new Object[]{}));
								
								if(datailedVal==null){
									datailedVal = cachedDatas.get(getIdMethod.invoke(detailedObj,new Object[]{})+"");
								}

								if (datailedVal != null)
									setMethod.invoke(obj, datailedVal);
							}
						}
					}
				}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

}
