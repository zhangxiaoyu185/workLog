package com.tzt.workLog.core.mybatis.dao;

import java.util.List;

public interface DataRequiredDAO {

	/**
	 * 填兖单个对象的信息
	 * 
	 * @param obj
	 *            需要被填充的对象
	 * @param fillClass
	 *            需要填充属性所属的类
	 * @param searchStrId
	 *            查询条件
	 * @throws WSMessage
	 */
	public void setObjectInfo(Object obj, Class fillClass, String searchStrId);

	/**
	 * 批量填兖对象的信息
	 * 
	 * @param list
	 *            需要被填充的对象
	 * @param fillClass
	 *            需要填充属性所属的类
	 * @param searchStrId
	 *            查询条件
	 * @throws WSMessage
	 */
	public void setListInfos(List list, Class fillClass, String searchStrId);
	
	/**
	 * 根据属性填兖单个对象的信息
	 * 
	 * @param obj
	 *            需要被填充的对象
	 * @param property
	 *            需要被填充的属性
	 * @param fillClass
	 *            需要填充属性所属的类
	 * @param searchStrId
	 *            查询条件
	 * @throws WSMessage
	 */
	public void setObjectInfo(Object obj, String property, Class fillClass,
			String searchStrId);

	/**
	 * 根据属性批量填兖对象的信息
	 * 
	 * @param list
	 *            需要被填充的对象
	 * @param property
	 *            需要被填充的属性
	 * @param fillClass
	 *            需要填充属性所属的类
	 * @param searchStrId
	 *            查询条件
	 */
	public void setListInfos(List list, String property, Class fillClass,
			String searchStrId);
}
