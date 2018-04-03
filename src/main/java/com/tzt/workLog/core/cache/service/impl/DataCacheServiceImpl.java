package com.tzt.workLog.core.cache.service.impl;

import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import org.apache.commons.beanutils.PropertyUtils;
import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tzt.workLog.core.cache.ICacheRefreshObserver;
import com.tzt.workLog.core.cache.LocalCacheDefParser;
import com.tzt.workLog.core.cache.LocalCacheDefinition;
import com.tzt.workLog.core.cache.LocalCacheDefinition.GroupField;
import com.tzt.workLog.core.cache.service.CacheMultiPropertyFilter;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.core.mybatis.page.Page;

public class DataCacheServiceImpl extends DefaultCacheServiceImpl{
	
	private MyBatisDAO myBatisDAO;
	
	private ExecutorService ex = Executors.newFixedThreadPool(Runtime.getRuntime().availableProcessors()+1); //定义线程池，并行加载本地缓存数据
	
	private ScheduledExecutorService cacheRefreshService = Executors.newSingleThreadScheduledExecutor(); //定义单线程定时执行器，用于定时刷新缓存
	
	private final Map<String,Object> tempCacheMap = new ConcurrentHashMap<String, Object>(); //用户临时缓存一些数据
	
	private final Map<Class<?>,LocalCacheComponent<?>> cacheMap = new ConcurrentHashMap<Class<?>,LocalCacheComponent<?>>();
	
	private final Map<Class<?>,CacheLoadWorker> workerMap = new HashMap<Class<?>,CacheLoadWorker>();
	
	private final Map<Class<?>,List<ICacheRefreshObserver>> observersMap = new ConcurrentHashMap<Class<?>,List<ICacheRefreshObserver>>();
	
	private static List<LocalCacheDefinition> cacheDefs;
	
	private static int CACHE_REFRESH_INTERVAL = 2; //minutes
	
	private static final Logger logger = LoggerFactory.getLogger("CACHE_LOGGER");
	
	/*
	 * 初始化本地缓存，本地缓存保存系统用到的静态数据，或基本不变的数据，
	 * 对于可能变化的数据必须是不需要实时刷新的，可以通过某种策略（待定）定时和数据库进行同步
	 */
	public void init(){
		cacheDefs = LocalCacheDefParser.parse();
		if(cacheDefs==null || cacheDefs.size()==0){
			logger.info("无初始化缓存");
			return;
		}
		
		loadTheCacheData(cacheDefs);
		startRefreshCache();
	}
	
	
	private void loadTheCacheData(List<LocalCacheDefinition> cacheDefs){
		logger.info("ZHPDataCacheServiceImpl --->loadTheCacheData()");
		for(LocalCacheDefinition oneCache:cacheDefs){
			if(oneCache==null)
				continue;
			
			Class<?> voCalssType = oneCache.getVOClassObject();
			if(voCalssType==null){
				logger.warn("fail to load the data from table '{}'",oneCache.getTableName());
				continue;
			}
			
			CacheLoadWorker worker = new CacheLoadWorker(oneCache);
			workerMap.put(oneCache.getVOClassObject(), worker);
			
			ex.execute(worker);
		}
	}
	
	private void startRefreshCache(){
		cacheRefreshService.scheduleAtFixedRate(new Runnable() {			
			@Override
			public void run() {
				logger.info("***********start to refresh the cache*********************");
				for(LocalCacheDefinition oneCache:cacheDefs){
					if(!oneCache.isNeedRefresh())
						continue;
					
					refreshCache(oneCache.getVOClassObject());
				}
			}
		}, CACHE_REFRESH_INTERVAL, CACHE_REFRESH_INTERVAL, TimeUnit.MINUTES);
	}
	
	@Override
	public synchronized void addCacheRefreshObserver(List<Class<?>> clazzList,ICacheRefreshObserver observer){
		for(Class<?> clazz:clazzList){
			List<ICacheRefreshObserver> observers = observersMap.get(clazz);
			if(observers==null){
				observers = new ArrayList<ICacheRefreshObserver>();
				observersMap.put(clazz, observers);
			}
			
			observers.add(observer);
		}
	}
	
	/**
	 * 缓存更新，通知观察者
	 * @param clazz
	 */
	private void notifyObserver(Class<?> clazz){
		List<ICacheRefreshObserver> observers = observersMap.get(clazz);
		if(observers==null || observers.size()==0){
			return;
		}
		
		for(ICacheRefreshObserver observer:observers){
			observer.notifyBasicCacheRefresh();
		}
	}
	
	public <T> void refreshCache(Class<T> clzssType){
		if(clzssType==null){
			logger.warn("***************clzssType is null*******************");
			return;
		}
		
		CacheLoadWorker worker = workerMap.get(clzssType);
		if(worker==null){
			logger.warn("can not find the cacheLoadWork for '{}'",clzssType.toString());
			return;
		}
		
		logger.info("ZHPDataCacheServiceImpl --->refreshCache() for Type '{}'",clzssType.toString());
		ex.execute(worker);
	}

	@Override
	public Object getSingleValueByKey(String key) {
		return tempCacheMap.get(key);
	}
	
	@Override
	public void setSingleData(String key, Object value, int seconds) {
		tempCacheMap.put(key, value);		
	}
	
	/**
	 * 获取缓存的该类型所有值的列表
	 */
	@Override
	public <T> List<T> getDataListByType(Class<T> clzss) {
		if(clzss==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		return component.getObjectList();
	}
	/**
	 * 根据主键值，获取改类型的单一缓存数据
	 */
	@Override
	public <T> T getSingleDataByTypeKey(Class<T> clzss, Object key) {
		if(clzss==null || key==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		return component.getSingleData(key);
	}
	
	/**
	 * 获取指定类型的一页数据
	 * @param clzss
	 * @param pageNum
	 * @param pageSize
	 * @return
	 */
	public <T> Page<T> getPageDataByType(Class<T> clzss,int pageNum,int pageSize){
		if(clzss==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		return component.getPageData(pageNum, pageSize);
	}
	
	/**
	 * 根据主键数组，获取指定类型的数据列表
	 */
	public <T> List<T> getDataListByTypeKeys(Class<T> clzss,Object[] keys){
		if(clzss==null || keys==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		return component.getDataListByKeys(keys);
	}
	
	/**
	 * 根据主键数组，获取指定类型的数据MAP
	 */
	public <T> Map<String,T> getDataMapByTypeKeys(Class<T> clzss,Object[] keys){
		if(clzss==null || keys==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		return component.getDataMapByKeys(keys);
	}
	
	/**
	 * 根据数据的分组，获取相同组内值的列表。Example, 对于专家表，我们可以根据医院分组，然后获取这个医院里的所有专家，或者根据地区，然后获取相同地区的所有专家
	 * @param clzss
	 * @param groupFieldName
	 * @param groupFieldValues
	 * @return
	 */
	
	@Override
	public <T> List<T> getDataListByGroup(Class<T> clzss, String groupFieldName,String... groupFieldValues) {
		if(clzss==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		List<T> allData = new ArrayList<T>();
		for(String fieldValue:groupFieldValues){
			List<T> results = component.getGroupData(groupFieldName,fieldValue);
			if(results!=null){
				allData.addAll(results);
			}
		}
		
		return allData;
	}
	
	/**
	 * 多条件过滤缓存的数据
	 * @param filter
	 * @return
	 */
	public <T> List<T> getDataListByMultiProperty(Class<T> clzss,CacheMultiPropertyFilter filter){
		if(filter==null || clzss==null){
			return null;
		}
		
		List<T> result = getDataListByType(clzss);
		if(result==null || result.size()==0){
			return result;
		}
		
		List<T> finalResult = new ArrayList<T>();
		for(T obj:result){
			if(filter.isQualifiedObject(obj)){
				finalResult.add(obj);
			}
		}
		
		return finalResult;
	}
	
	/**
	 * 多条件过滤缓存的数据
	 * 传入分组的条件及值，可以更快的从缓存中过滤出目标数据
	 * @param filter
	 * @param groupFieldName  
	 * @param groupFieldValues
	 * @return
	 */
	public <T> List<T> getDataListByMultiProperty(Class<T> clzss,CacheMultiPropertyFilter filter,String groupFieldName,String ... groupFieldValues){
		if(filter==null || clzss==null){
			return null;
		}
		
		List<T> result = getDataListByGroup(clzss, groupFieldName, groupFieldValues);
		if(result==null || result.size()==0){
			return result;
		}
		
		List<T> finalResult = new ArrayList<T>();
		for(T obj:result){
			if(filter.isQualifiedObject(obj)){
				finalResult.add(obj);
			}
		}
		
		return finalResult;
	}
	
	/**
	 * 获取分组的数据MAP,EXAMPLE:对于专家表，获取每个医院的专家，MAP 中key 为医院ID,value为对应该医院的专家列表
	 * @param clzss
	 * @param groupFieldName
	 * @return
	 */
	@Override
	public <T> Map<String,Map<String,List<T>>> getDataMapByGroup(Class<T> clzss, String groupFieldName) {
		if(clzss==null || StringUtils.isBlank(groupFieldName)){
			return null;
		}
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		return component.getGroupMap();
	}

	@Override
	public <T> Page<T> getPageDataByGroup(Class<T> clzss, String groupFieldName, int pageNum, int pageSize,String... groupFieldValues) {
		if(clzss==null)
			return null;
		
		@SuppressWarnings("unchecked")
		LocalCacheComponent<T> component = (LocalCacheComponent<T>)cacheMap.get(clzss);
		if(component==null)
			return null;
		
		List<T> allData = new ArrayList<T>();
		for(String fieldValue:groupFieldValues){
			List<T> list = component.getGroupData(groupFieldName,fieldValue);
			if(list!=null){
				allData.addAll(component.getGroupData(groupFieldName,fieldValue));
			}
		}
		return getPageDate(allData, pageNum, pageSize);
	}
		
	public MyBatisDAO getMyBatisDAO() {
		return myBatisDAO;
	}

	public void setMyBatisDAO(MyBatisDAO myBatisDAO) {
		this.myBatisDAO = myBatisDAO;
	}
	
	private <T> Page<T> getPageDate(List<T> allData,int pageNum,int pageSize){
		int beginIndex = (pageNum-1)*pageSize;
		int endIndex   = (pageNum)*pageSize;
		
		if(allData==null || allData.size()==0 || allData.size()<=beginIndex)
			return null;
		
		List<T> result = new ArrayList<T>();
		if(allData.size()<endIndex){
			result.addAll(allData.subList(beginIndex, allData.size()));
		}else{			
			result.addAll(allData.subList(beginIndex, endIndex));
		}
		
		Page<T> page = new Page<T>(pageNum,pageSize,allData.size(),result);
		return page;
	}

	/**
	 * The worker for loading the cache data;
	 * @author Lijun Zhao
	 *
	 */
	private class CacheLoadWorker implements Runnable{
		
		private LocalCacheDefinition cacheDef;
		
		CacheLoadWorker(LocalCacheDefinition cacheDef){
			this.cacheDef = cacheDef;
		}
	
		@SuppressWarnings("unchecked")
		@Override
		public void run() {
			Class<?> type = cacheDef.getVOClassObject();
			@SuppressWarnings("rawtypes")
			LocalCacheComponent component = cacheMap.get(type);
			Date current = new Date();
			boolean cacheUpdated = false;
			if(component!=null){
				Map<String,Date> param = new HashMap<String,Date>();
				param.put("lastUpdateTime", component.getLastUpdateTime());
				int updateNumber = (Integer)myBatisDAO.findForObject(cacheDef.getChangeSQLId(),param);
				if(updateNumber==0){
					logger.info("****** No Data changed for table '{}' ******",cacheDef.getTableName());
					return;
				}else{
					cacheUpdated = true;
					logger.info("****** Data changed for table '{}' ******",cacheDef.getTableName());
				}
			}	
			
			loadFromDB(type, current, component,cacheUpdated);
		}
		
		private <T> void loadFromDB(Class<T> type,Date current,LocalCacheComponent<T> component,boolean cacheUpdated){
			logger.info("**********Begin to load the cache data for one table************");
			logger.info("table:{}", cacheDef.getTableName());
			logger.info("mapperSQLId:{}" , cacheDef.getMapperSQLId());
			logger.info("VOClassName:{}" , cacheDef.getVoCalssName());
			logger.info("VOPrimaryKey{}:" ,cacheDef.getVoPrimaryKey());		
			logger.info("Group By Info:{}",cacheDef.getGroupInfo());
			try {
				@SuppressWarnings("unchecked")
				List<T> datas = (List<T>)myBatisDAO.findForList(cacheDef.getMapperSQLId());
				Map<String,T> dataMap = new HashMap<String,T>();
				Map<String,Map<String,List<T>>> groupMap = new HashMap<String,Map<String,List<T>>>();
				
				List<GroupField> groups = cacheDef.getGroups();				
				for(T data:datas){
					Object key = PropertyUtils.getProperty(data, cacheDef.getVoPrimaryKey());
					dataMap.put(key.toString(), data);
					
					for(GroupField group:groups){
						Map<String,List<T>> oneGroupMap = groupMap.get(group.getFieldName());
						if(oneGroupMap==null){
							oneGroupMap = new HashMap<String,List<T>>();
							groupMap.put(group.getFieldName(),oneGroupMap);
						}
						
						Object groupKeyVal = PropertyUtils.getProperty(data, group.getFieldName());
						if(StringUtils.isNotEmpty(group.getFieldKey())){
							groupKeyVal = PropertyUtils.getProperty(groupKeyVal, group.getFieldKey());
						}
						
						List<T> groupData = oneGroupMap.get(groupKeyVal.toString());
						if(groupData==null){
							groupData = new ArrayList<T>();
							oneGroupMap.put(groupKeyVal.toString(), groupData);
						}
						groupData.add(data);					
					}
					
				}
				component = new LocalCacheComponent<T>();
				component.setObjectList(datas);
				component.setObjectMap(dataMap);
				component.setGroupMap(groupMap);
				component.setLastUpdateTime(current);
				
				cacheMap.put(type, component);
				
				if(cacheUpdated){
					notifyObserver(type);
				}
			} catch (Exception e) {
                logger.error("fail to load the data from " + cacheDef.getTableName(),e);
			}		
		}
		
	}
	
	/**
	 * Note:now all the key in the map is String
	 * @author Lijun Zhao
	 *
	 */
	private class LocalCacheComponent<T> {

		private Date lastUpdateTime;  //该类型数据上一次更新的时间
		
		private Map<String,T> objectMap;
		
		private Map<String,Map<String,List<T>>> groupMap;
		
		private List<T>  objectList;

		public Date getLastUpdateTime() {
			return lastUpdateTime;
		}


		public void setLastUpdateTime(Date lastUpdateTime) {
			this.lastUpdateTime = lastUpdateTime;
		}


		public Map<String,T> getObjectMap() {
			return objectMap;
		}
		

		public Map<String, Map<String, List<T>>> getGroupMap() {
			return groupMap;
		}

		/**
		 * 获取一页的缓存数据，页面从1开始
		 * @param pageNum
		 * @param pageSize
		 * @return
		 */
		public Page<T> getPageData(int pageNum,int pageSize){						
			return  getPageDate(objectList, pageNum, pageSize);
		}
		
		/**
		 * 通过一组主键值获取数据列表
		 * @param keys
		 * @return
		 */
		public List<T> getDataListByKeys(Object[] keys){
			List<T> datas = new ArrayList<T>();
			for(Object key:keys){
				if(key==null)
					continue;
				
				datas.add(objectMap.get(key.toString()));
			}
			
			return datas;
		}
		
		/**
		 * 通过一组主键值获取数据MAP
		 * @param keys
		 * @return
		 */
		public Map<String,T> getDataMapByKeys(Object[] keys){
			Map<String,T> dataMap = new HashMap<String,T>();
			for(Object key:keys){
				if(key==null)
					continue;
				
				T data = (T)objectMap.get(key.toString());
				if(data==null)
					continue;
				
				dataMap.put(key.toString(),data);
			}			
			return dataMap;
		}
		
		public T getSingleData(Object key){
			if(key==null)
				return null;
			
			return getObjectMap().get(key.toString());
		}
		
		public void setObjectMap(Map<String,T> objectMap) {
			this.objectMap = objectMap;
		}

		public List<T> getObjectList() {
			return objectList;
		}

		public void setObjectList(List<T> objectList) {
			this.objectList = objectList;
		}
		
		
		public List<T> getGroupData(String groupFieldName,String groupFieldValue) {
			Map<String, List<T>> oneGroupData = groupMap.get(groupFieldName);
			if(oneGroupData==null)
				return null;
			return oneGroupData.get(groupFieldValue);
		}
		
		@SuppressWarnings("unused")
		public Page<T> getGroupPageData(String groupFieldName,String groupFieldValue,int pageNum,int pageSize) {
			Map<String, List<T>> oneGroupData = groupMap.get(groupFieldName);
			if(oneGroupData==null)
				return null;
			
			List<T> dataList = oneGroupData.get(groupFieldValue);	
			
			return getPageDate(dataList, pageNum, pageSize);
		}

		public void setGroupMap(Map<String, Map<String, List<T>>> groupMap) {
			this.groupMap = groupMap;
		}	
	}
}