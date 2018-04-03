package com.tzt.workLog.core.cache.service.impl;

import java.util.List;
import java.util.Map;
import java.util.Set;
import com.tzt.workLog.core.cache.ICacheRefreshObserver;
import com.tzt.workLog.core.cache.service.CacheMultiPropertyFilter;
import com.tzt.workLog.core.cache.service.DataCacheService;
import com.tzt.workLog.core.mybatis.page.Page;

public abstract class DefaultCacheServiceImpl implements DataCacheService {

	@Override
	public void addCacheRefreshObserver(List<Class<?>> clazzList,ICacheRefreshObserver observer){
		
	}
	
	@Override
	public <T> void refreshCache(Class<T> clzssType) {
		// TODO Auto-generated method stub

	}

	@Override
	public <T> List<T> getDataListByType(Class<T> clzss) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> T getSingleDataByTypeKey(Class<T> clzss, Object key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> Page<T> getPageDataByType(Class<T> clzss, int pageNum, int pageSize) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> List<T> getDataListByTypeKeys(Class<T> clzss, Object[] keys) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> Map<String,T> getDataMapByTypeKeys(Class<T> clzss, Object[] keys) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> Map<String,Map<String,List<T>>> getDataMapByGroup(Class<T> clzss, String groupFieldName) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> List<T> getDataListByGroup(Class<T> clzss, String groupFieldName,
			String... groupFieldValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> Page<T> getPageDataByGroup(Class<T> clzss, String groupFieldName,
			int pageNum, int pageSize, String... groupFieldValue) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> List<T> getDataListByMultiProperty(Class<T> clzss,
			CacheMultiPropertyFilter filter) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public <T> List<T> getDataListByMultiProperty(Class<T> clzss,
			CacheMultiPropertyFilter filter, String groupFieldName,
			String... groupFieldValues) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Object getSingleValueByKey(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setSingleData(String key, Object value, int seconds) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setSingleData(String key, Object value) {
		// TODO Auto-generated method stub

	}

	@Override
	public Map<String, String> getHashByKey(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void setHashData(String key, Map<String, String> hash) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setObject(String key, Object value) {
		// TODO Auto-generated method stub

	}

	@Override
	public Object getObject(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void del(String... key) {
		// TODO Auto-generated method stub

	}

	@Override
	public void increaseValue(String key) {
		// TODO Auto-generated method stub

	}

	@Override
	public void setHashData(String key, String fieldKey, String fieldValue) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public String getHashData(String key, String fieldKey) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Set<String> getHashKeys(String key) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteHash(String key, String fieldKey) {
		// TODO Auto-generated method stub
		
	}
	
	@Override
	public List<String> getValuesByFuzzyKey(final String fuzzyKey) {
		
		return null;
	}
	
	@Override
	public List<String> getKeysByFuzzyKey(final String fuzzyKey) {
		
		return null;
	}
	
	@Override
	public void setSetData(String key, String data) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void deleteSetData(String key, String data) {
		// TODO Auto-generated method stub
		
	}

	@Override
	public boolean isExistSetData(String key, String data) {
		return false;
	}

	@Override
	public boolean setIfAbsent(String key, String value) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public boolean setHashIfAbsent(String key, String fieldKey, String value) {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public int incrByHash(String key, String fieldKey, int increment) {
		// TODO Auto-generated method stub
		return 0;
	}


}
