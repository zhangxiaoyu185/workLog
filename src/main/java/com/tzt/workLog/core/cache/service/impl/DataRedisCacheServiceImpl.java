package com.tzt.workLog.core.cache.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import redis.clients.jedis.Jedis;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.tzt.workLog.core.cache.RedisPool;

public class DataRedisCacheServiceImpl extends DefaultCacheServiceImpl {

	private static final Logger logger = LoggerFactory
			.getLogger(DataRedisCacheServiceImpl.class);

	private RedisPool redisPool;

	@Override
	public String getSingleValueByKey(final String key) {
		try {
			return (String) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					return jedis.get(key);
				}
			});
		} catch (Exception e) {
			logger.error("fail to get the string value from redis", e);
			return null;
		}
	}

	@Override
	public void setSingleData(final String key, final Object value,
			final int seconds) {
		if (value == null)
			return;
		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					jedis.setex(key, seconds, value.toString());
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the String value to redis", e);
		}
	}

	@Override
	public void setSingleData(final String key, final Object value) {
		if (value == null)
			return;
		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					jedis.set(key, value.toString());
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the String value to redis", e);
		}
	}

	@Override
	public boolean setIfAbsent(final String key, final String value) {
		if (value == null)
			return false;
		try {
			return (Boolean) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					long result = jedis.setnx(key, value);
					return result == 1 ? true : false;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the String value to redis", e);
			return false;
		}
	}

	@SuppressWarnings("unchecked")
	@Override
	public Map<String, String> getHashByKey(final String key) {
		try {
			return (Map<String, String>) redisPool
					.run(new RedisPool.RedisCommand() {
						@Override
						public Object execute(Jedis jedis) {
							return jedis.hgetAll(key);
						}
					});
		} catch (Exception e) {
			logger.error("fail to get the hash value from redis", e);
			return null;
		}
	}

	@SuppressWarnings("unchecked")
	public Set<String> getHashKeys(final String key) {
		try {
			return (Set<String>) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					return jedis.hkeys(key);
				}
			});
		} catch (Exception e) {
			logger.error("fail to get the hash value from redis", e);
			return null;
		}
	}

	@Override
	public void setHashData(final String key, final Map<String, String> hash) {
		if (hash == null)
			return;

		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					jedis.hmset(key, hash);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the hash value to redis", e);
		}
	}

	public void setHashData(final String key, final String fieldKey,
			final String fieldValue) {
		if (key == null)
			return;

		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					jedis.hset(key, fieldKey, fieldValue);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error(
					"fail to set the String value to specific map in redis", e);
		}
	}

	public String getHashData(final String key, final String fieldKey) {
		if (key == null)
			return null;

		try {
			return (String) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					return jedis.hget(key, fieldKey);
				}
			});
		} catch (Exception e) {
			logger.error("fail to get the specific value of map in redis", e);
			return null;
		}
	}

	@Override
	public boolean setHashIfAbsent(final String key, final String fieldKey,
			final String value) {
		if (value == null)
			return false;
		try {
			return (Boolean) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					long result = jedis.hsetnx(key, fieldKey, value);
					return result == 1 ? true : false;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the String value to redis", e);
			return false;
		}
	}

	@Override
	public int incrByHash(final String key, final String fieldKey,
			final int increment) {
		try {
			return (Integer) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					return jedis.hincrBy(key, fieldKey, increment);

				}
			});
		} catch (Exception e) {
			logger.error("fail to set the String value to redis", e);
			return 0;
		}
	}

	public void deleteHash(final String key, final String fieldKey) {
		if (key == null)
			return;
		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					return jedis.hdel(key, fieldKey);
				}
			});
		} catch (Exception e) {
			logger.error("fail to delete the specific key of map in redis", e);
		}
	}

	@Override
	public void setObject(final String key, final Object value) {
		if (value == null)
			return;
		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					String jsonStr = JSON.toJSONString(value,
							SerializerFeature.DisableCircularReferenceDetect);
					jedis.set(key, jsonStr);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the Object value to redis", e);
		}
	}

	@Override
	public Object getObject(final String key) {
		try {
			return redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {

					String value = jedis.get(key);
					if (value != null) {
						return value;
					}
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to get the Object from redis", e);
			return null;
		}
	}

	@Override
	public void del(final String... key) {
		try {
			redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					jedis.del(key);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to get the Object from redis", e);
		}
	}

	@Override
	public void increaseValue(final String key) {
		try {
			redisPool.run(new RedisPool.RedisCommand() {

				@Override
				public Object execute(Jedis jedis) {
					jedis.incr(key);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("value++ is error");
		}

	}

	@Override
	public List<String> getValuesByFuzzyKey(final String fuzzyKey) {
		try {
			redisPool.run(new RedisPool.RedisCommand() {

				@Override
				public Object execute(Jedis jedis) {
					jedis.keys(fuzzyKey);
					Set<String> keys = jedis.keys(fuzzyKey);
					List<String> kList = new ArrayList<String>();
					kList.addAll(keys);
					List<String> vList = new ArrayList<String>();
					for (String k : kList) {
						vList.add(jedis.get(k));
					}
					return vList;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the Object value to redis" + e);
		}

		return null;
	}

	@Override
	public List<String> getKeysByFuzzyKey(final String fuzzyKey) {
		try {
			redisPool.run(new RedisPool.RedisCommand() {

				@Override
				public Object execute(Jedis jedis) {
					Set<String> keys = jedis.keys(fuzzyKey);
					List<String> list = new ArrayList<String>();
					return list.addAll(keys);
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the Object value to redis" + e);
		}

		return null;
	}

	@Override
	public void setSetData(final String key, final String data) {
		try {
			redisPool.run(new RedisPool.RedisCommand() {

				@Override
				public Object execute(Jedis jedis) {
					jedis.sadd(key, data);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to set the data:{} to set:{}", data, key);
		}
	}

	@Override
	public void deleteSetData(final String key, final String data) {
		try {
			redisPool.run(new RedisPool.RedisCommand() {

				@Override
				public Object execute(Jedis jedis) {
					jedis.srem(key, data);
					return null;
				}
			});
		} catch (Exception e) {
			logger.error("fail to delete data:{} from set:{}", data, key);
		}
	}

	@Override
	public boolean isExistSetData(final String key, final String data) {
		try {
			return (Boolean) redisPool.run(new RedisPool.RedisCommand() {
				@Override
				public Object execute(Jedis jedis) {
					return jedis.sismember(key, data);
				}
			});
		} catch (Exception e) {
			logger.error("fail to judge whether the member exist in the set", e);
			return false;
		}
	}

	/************************ Spring inject method ***********************/
	public void setRedisPool(RedisPool redisPool) {
		this.redisPool = redisPool;
	}

}