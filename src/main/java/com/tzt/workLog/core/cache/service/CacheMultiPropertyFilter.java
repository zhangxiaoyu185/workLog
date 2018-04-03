package com.tzt.workLog.core.cache.service;

import java.util.HashMap;
import java.util.Map;

import org.apache.commons.beanutils.PropertyUtils;
/**
 * 查询静态缓存时，封装多个过滤条件
 *
 */
public class CacheMultiPropertyFilter {
	
	private Map<String,Object> propertyValueMap = new HashMap<String,Object>();
	
	/**
	 * @param propertyName:目标对象的过滤属性名称
	 * @param value:目标属性值，类型必须和对象中定义的类型相同，比如long:100L, double 2.3d  ....
	 */
	public void addFilterProperty(String propName,Object value) throws IllegalArgumentException{		
		propertyValueMap.put(propName, value);
	}
	
	/**
	 * 判断该缓存的对象是否满足查询条件
	 * @param cacheObject
	 * @return
	 */
	public boolean isQualifiedObject(Object cacheObject){
		if(cacheObject==null || propertyValueMap.size()==0){
			return false;
		}
		
		for(String propertyName:propertyValueMap.keySet()){
			if(!isQualifiedProperty(propertyName, propertyValueMap.get(propertyName), cacheObject)){
				return false;
			}
		}		
		return true;
	}
	
	private boolean isQualifiedProperty(String propertyName,Object targetValue,Object obj){
		int index = propertyName.indexOf(".");
		if(index>0){		
			Object subObj;
			try {
				subObj = PropertyUtils.getProperty(obj, propertyName.substring(0,index));
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			} 
			return isQualifiedProperty(propertyName.substring(index+1),targetValue,subObj);
		}else{
			try {
				return targetValue.equals(PropertyUtils.getProperty(obj, propertyName));
			} catch (Exception e) {
				e.printStackTrace();
				return false;
			} 
		}
	}
}
