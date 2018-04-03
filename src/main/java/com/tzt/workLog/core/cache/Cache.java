package com.tzt.workLog.core.cache;

import java.util.Collection;

/**
 * 缓存类接口，目的是为了以后可以替换缓存的实现，比如引用memcached实现。
 * 
 * @param <K>
 * @param <V>
 */
public interface Cache<K, V extends CachedObject<K>> {

	/**
	 * 添加一条数据到缓存
	 * 
	 * @param key
	 *            数据的关键字
	 * @param value
	 *            待添加的数据
	 */
	public void put(K key, V value);

	/**
	 * 添加一批数据到缓存
	 * 
	 * @param objects
	 *            待添加的数据
	 */
	public void put(Collection<V> objects);

	/**
	 * 根据关键字从缓存中取得相应的数据
	 * 
	 * @param key
	 * @return
	 */
	public V get(K key);

	/**
	 * 根据关键字删除相应的缓存数据
	 * 
	 * @param key
	 */
	public void remove(K key);

	/**
	 * 删除所有的缓存数据
	 */
	public void clean();

	/**
	 * 缓存中所包含的数据个数
	 * 
	 * @return
	 */
	public int size();

	/**
	 * 判断是否有缓存内容
	 * 
	 * @return
	 */
	public boolean isEmpty();

	/**
	 * 判断是否要更新缓存
	 * 
	 * @return
	 */
	public boolean needUpdate();

	/**
	 * 取得缓存中的所有对象
	 */
	public Collection<V> getAllObjects();
	
}