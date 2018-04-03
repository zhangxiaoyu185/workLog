package com.tzt.workLog.core.cache;

import java.util.Collection;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 简单的缓存实现类(因暂没去研究memcached等的使用)，该实现目前只能用于单个JVM
 * 
 * @param <K>
 * @param <V>
 */
public abstract class SimpleCache<K, V extends CachedObject<K>> implements Cache<K, V> {

	private final ConcurrentHashMap<K, V> cacheMap = new ConcurrentHashMap<K, V>();

	public void put(K key, V value) {

		if (key == null)
			return;
		cacheMap.put(key, value);
	}

	public void put(Collection<V> objects) {

		if (objects == null || objects.isEmpty())
			return;
		for (V object : objects)
			cacheMap.put(object.getKey(), object);
	}

	public V get(K key) {

		return cacheMap.get(key);
	}

	public void remove(K key) {

		cacheMap.remove(key);
	}

	public void clean() {

		cacheMap.clear();
	}

	public int size() {

		return cacheMap.size();
	}

	public boolean isEmpty() {

		return cacheMap.isEmpty();
	}

	public Collection<V> getAllObjects() {

		return cacheMap.values();
	}
	
}