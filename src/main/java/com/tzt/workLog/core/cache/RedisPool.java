package com.tzt.workLog.core.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.tzt.workLog.core.spring.adapter.ContextBeanFactory;
import redis.clients.jedis.BinaryJedis;
import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisCommands;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;
import redis.clients.jedis.exceptions.JedisException;

public class RedisPool {

    private static final Logger logger = LoggerFactory.getLogger(RedisPool.class);

    /** the bean name defined in your spring context */
	private static String beanName = "redisPool";

	/* redis pool settings */
	private JedisPoolConfig poolConfig = new JedisPoolConfig();

	/** a singleton instance actually managed by spring */
	private static RedisPool instance = null;

    private RedisConfigurer redisConfig = null;

    private JedisPool pool = null;

	/**
	 * Gets the singleton instance managed by spring and cache it in <code>instance </code>.
	 * 
	 * NOTE: You'd better use Spring injection instread of calling this method
	 * 		 since it references a hard-coded beanName.
	 * 
	 * @return  RedisPool
	 * @throws  IllegalStateException if the given <code>beanName</code> is not
	 * 			defined.
	 */
	public static RedisPool getInstance() {
		if (instance == null)
			instance = (RedisPool) ContextBeanFactory.getInstance().getBean(beanName);
		if (instance == null)
			throw new IllegalStateException("bean " + beanName + " is not defined in your spring context!");
		return instance;
	}

    public RedisPool() {

    }

    public void init() {
    	logger.debug("Initializing RedisPool to {}:{}", redisConfig.getHost(), redisConfig.getPort());
    	pool = new JedisPool(poolConfig, redisConfig.getHost(), redisConfig.getPort());
    }

    public void destroy() {
    	pool.destroy();
    }

	public RedisConfigurer getRedisConfig() {
		return redisConfig;
	}

	public void setRedisConfig(RedisConfigurer redisConfig) {
		this.redisConfig = redisConfig;
	}

	/**
	 * Runs a redis command wraps by {@link RedisCommand}.
	 * It is always better to use this method instead of {@link #getResource()}.
	 * 
	 * @param command
	 */
	public Object run(RedisCommand command) {
		Jedis jedis = pool.getResource();
		boolean valid = true;
		try {
			auth(jedis);
			return command.execute(jedis);
		} catch (JedisException je) {
			valid = false;
			throw je;
		} finally {
			if (valid) {
				pool.returnResource(jedis);
			} else {
				pool.returnBrokenResource(jedis);
			}
		}
	}

	/**
	 * Use with CAUTION!!
	 * This method returns a redis connection from the pool.  The caller must
	 * take care of returning it to the pool, otherwise connection leaks.
	 * 
	 * It is better and always suffient to use the {@link #run(RedisCommand)} method.
	 * 
	 * @return Jedis   a redis connection
	 * 
	 */
	public JedisCommands getResource() {
		return pool.getResource();
	}

	public void returnBrokenResource(JedisCommands resource) {
		pool.returnBrokenResource((BinaryJedis) resource);
	}

	public void returnResource(JedisCommands resource) {
		pool.returnResource((BinaryJedis) resource);
	}

	/**
	 * Wraps redis commands.
	 */
	public static interface RedisCommand {
		/**
		 * @param jedis  it is managed by the framework, the caller does not need to worry about how to free it.
		 * 
		 * @throws JedisException  
		 */
		Object execute(Jedis jedis);
	}

	private void auth(Jedis jedis) {
    	String redisAuth = redisConfig.getAuth();
        if (redisAuth != null && redisAuth.length() > 0)
            jedis.auth(redisAuth);
	}

    public JedisPool getPool() {
        return pool;
    }

    // -------------------- delegates
	public void setMaxIdle(int maxIdle) {
		poolConfig.setMaxIdle(maxIdle);
	}
	public void setMinIdle(int minIdle) {
		poolConfig.setMinIdle(minIdle);
	}
	public void setMaxActive(int maxActive) {
		poolConfig.setMaxActive(maxActive);
	}
	public void setMaxWait(long maxWait) {
		poolConfig.setMaxWait(maxWait);
	}
	public void setWhenExhaustedAction(byte whenExhaustedAction) {
		poolConfig.setWhenExhaustedAction(whenExhaustedAction);
	}
	public void setTestOnBorrow(boolean testOnBorrow) {
		poolConfig.setTestOnBorrow(testOnBorrow);
	}
	public void setTestOnReturn(boolean testOnReturn) {
		poolConfig.setTestOnReturn(testOnReturn);
	}
	public void setTestWhileIdle(boolean testWhileIdle) {
		poolConfig.setTestWhileIdle(testWhileIdle);
	}
	public void setTimeBetweenEvictionRunsMillis(long timeBetweenEvictionRunsMillis) {
		poolConfig.setTimeBetweenEvictionRunsMillis(timeBetweenEvictionRunsMillis);
	}
	public void setNumTestsPerEvictionRun(int numTestsPerEvictionRun) {
		poolConfig.setNumTestsPerEvictionRun(numTestsPerEvictionRun);
	}
	public void setMinEvictableIdleTimeMillis(long minEvictableIdleTimeMillis) {
		poolConfig.setMinEvictableIdleTimeMillis(minEvictableIdleTimeMillis);
	}
	public void setSoftMinEvictableIdleTimeMillis(long softMinEvictableIdleTimeMillis) {
		poolConfig.setSoftMinEvictableIdleTimeMillis(softMinEvictableIdleTimeMillis);
	}

}