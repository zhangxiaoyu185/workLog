package com.tzt.workLog.core.cache.service;

import java.util.List;
import java.util.Map;
import java.util.Set;
import com.tzt.workLog.core.cache.ICacheRefreshObserver;
import com.tzt.workLog.core.mybatis.page.Page;

public interface DataCacheService {
	
	/**
	 * 添加静态缓存刷新的观察者
	 * @param observer
	 */
	void addCacheRefreshObserver(List<Class<?>> clazzList,ICacheRefreshObserver observer);
	
	/**
	 * 刷新本地缓存
	 * @param clzssType
	 */
	<T> void refreshCache(Class<T> clzssType);
	
	/**
	 * 获取缓存的该类型所有值的列表
	 */
	<T> List<T> getDataListByType(Class<T> clzss);
	
	/**
	 * 根据主键值，获取改类型的单一缓存数据
	 */
	<T> T getSingleDataByTypeKey(Class<T> clzss,Object key);
	
	/**
	 * 获取指定类型的一页数据
	 */
	<T> Page<T> getPageDataByType(Class<T> clzss,int pageNum,int pageSize);
	
	/**
	 * 根据主键数组，获取指定类型的数据列表
	 */
	<T> List<T> getDataListByTypeKeys(Class<T> clzss,Object[] keys);
		
	/**
	 * 根据主键数组，获取指定类型的数据MAP
	 */
	<T> Map<String,T> getDataMapByTypeKeys(Class<T> clzss,Object[] keys);
	
	/**
	 * 获取分组的数据MAP,EXAMPLE:对于专家表，获取每个医院的专家，MAP 中key 为医院ID,value为对应该医院的专家列表
	 * @param clzss
	 * @param groupFieldName
	 */
	<T> Map<String,Map<String,List<T>>> getDataMapByGroup(Class<T> clzss,String groupFieldName);
	
	/**
	 * 根据数据的分组，获取相同组内值的列表。Example, 对于专家表，我们可以根据医院分组，然后获取这个医院里的所有专家，或者根据地区，然后获取相同地区的所有专家
	 * @param clzss
	 * @param groupFieldName, 所属组的名字
	 * @param groupFieldValue 具体组的值
	 */
	<T> List<T> getDataListByGroup(Class<T> clzss,String groupFieldName,String ... groupFieldValues);	
	
	/**
	 * 根据数据的分组，获取相同组内值的分页列表。Example, 对于专家表，我们可以根据医院分组，然后获取这个医院里的所有专家，或者根据地区，然后获取相同地区的所有专家
	 * @param clzss
	 * @param groupFieldName, 所属组的名字
	 * @param groupFieldValue 具体组的值
	 */
	<T> Page<T> getPageDataByGroup(Class<T> clzss,String groupFieldName,int pageNum,int pageSize,String... groupFieldValue);
	
	/**
	 * 根据多个查询条件，查询目标缓存数据
	 * @param filter
	 */
	<T> List<T> getDataListByMultiProperty(Class<T> clzss,CacheMultiPropertyFilter filter);
	
	/**
	 * 根据多个查询条件，查询目标缓存数据，同时已知目标数据属于哪个分组
	 * @param filter
	 * @param groupFieldName
	 * @param groupFieldValues
	 */
	<T> List<T> getDataListByMultiProperty(Class<T> clzss,CacheMultiPropertyFilter filter,String groupFieldName,String ... groupFieldValues);
	
	/**
	 * 数据以key-value形式存放在缓存中（本地或者远程），通过KEY值来获取
	 */
	public Object getSingleValueByKey(final String key);
	
	/**
	 * 保存KEY-VALUE值对到缓存, seconds 过期时间
	 * @param key
	 * @param value
	 * @param seconds
	 */
	void setSingleData(final String key, final Object value, final int seconds);
	
	/**
	 * <strong>数据以key-value形式存放在缓存中，通过KEY的模糊值来获取值列表<br/></strong>
	 * 1.KEYS * 匹配数据库中所有 key 。<br/>
	 * 2.KEYS h?llo 匹配 hello ， hallo 和 hxllo 等。<br/>
	 * 3.KEYS h*llo 匹配 hllo 和 heeeeello 等。<br/>
	 * 4.KEYS h[ae]llo 匹配 hello 和 hallo ，但不匹配 hillo 。<br/>
	 * @param fuzzyKey 模糊key值
	 */
	List<String> getValuesByFuzzyKey(final String fuzzyKey);
	
	/**
	 * <strong>数据以key-value形式存放在缓存中，通过KEY的模糊值来获取键列表<br/></strong>
	 * 1.KEYS * 匹配数据库中所有 key 。<br/>
	 * 2.KEYS h?llo 匹配 hello ， hallo 和 hxllo 等。<br/>
	 * 3.KEYS h*llo 匹配 hllo 和 heeeeello 等。<br/>
	 * 4.KEYS h[ae]llo 匹配 hello 和 hallo ，但不匹配 hillo 。<br/>
	 * @param fuzzyKey 模糊key值
	 */
	List<String> getKeysByFuzzyKey(final String fuzzyKey);
	
	/**
	 * 如果key不存在，则设置值
	 * @param key
	 * @param value  
	 * @return true:不存在，设置成功   false:已经存在
	 */
	boolean setIfAbsent(final String key,final String value);
	/**
	 * 保存key value 值 永不过期
	 * @param key
	 * @param value
	 */
	void setSingleData(final String key, final Object value);
	/**
	 * 通过KEY值来获取保存在缓存中的map数据
	 */
	public Map<String, String> getHashByKey(final String key);
	
	/**
	 * 通过KEY值获取缓存中map的所有keys
	 * @param key
	 */
	public Set<String> getHashKeys(final String key);
	/**
	 * 保存map数据到缓存
	 * @param key
	 * @param value(hash)
	 */
	public void setHashData(final String key, final Map<String, String> hash);	
	
	/**
	 * 保存某一个 KEY-VALUE 对到	map 中
	 * @param key
	 * @param fieldKey
	 * @param fieldValue
	 */
	public void setHashData(final String key,final String fieldKey,final String fieldValue);
	
	/**
	 * 获取存储在缓存的map中特定key对应的值
	 * @param key
	 * @param fieldKey
	 */
	public String getHashData(final String key,final String fieldKey);
		
	/**
	 * 如果map中不存在特定key，则设置上去
	 * @param key
	 * @param fieldKey
	 */
	public boolean setHashIfAbsent(final String key,final String fieldKey,final String value);
	
	/**
	 * 为哈希表 key 中的域 field 的值加上增量 increment(也可以为负数)
	 * @param key
	 * @param fieldKey
	 * @param increment
	 */
	public int incrByHash(final String key,final String fieldKey,final int increment);
	
	/**
	 *  删除存储在缓存的map中特定key-value 对
	 * @param key
	 * @param fieldKey
	 */
	public void deleteHash(final String key,final String fieldKey);
	
	/**
	 * 添加数据到特定key对应的set中去
	 * @param key
	 * @param data
	 */
	public void setSetData(final String key,final String data);
	
    /**
     * 从特定key对应的set中删除数据	
     * @param key
     * @param data
     */
	public void deleteSetData(final String key,final String data);
	
	/**
	 * 判断特定数据值是否存在于特定key对应的set中
	 * @param key
	 * @param data
	 */
	public boolean isExistSetData(final String key,final String data);
	
	/**
	 * 将对象保存序列化存储在redis中
	 * @param key
	 * @param value
	 */
	void setObject(final String key, final Object value);
	
	/**
	 * 取得redis中保存的保存的对象,实际
	 * @param key
	 */
	Object getObject(final String key);

    /**
     * 删除redis中保存的key和对象
     */
	void del(final String... key);
	
	/**
	 * 将key所对应的value加1
	 */
	void increaseValue(String key);
	
}