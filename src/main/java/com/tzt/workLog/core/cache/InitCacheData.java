package com.tzt.workLog.core.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

/**
 * 初始化加载缓存数据到redis中
 */
public class InitCacheData {

	protected final Logger logger = LoggerFactory.getLogger("CACHE_LOGGER");
	
	@Autowired
	private RedisTemplate<String, String> redisTemplate;

	public void add(String str) {
		ValueOperations<String, String> valueops = redisTemplate.opsForValue();
		valueops.set("key", str);
	}

	public String get(String key) {
		ValueOperations<String, String> valueops = redisTemplate.opsForValue();
		String str = valueops.get(key);
		return str;
	}
	
}