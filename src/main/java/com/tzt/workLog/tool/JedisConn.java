package com.tzt.workLog.tool;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import com.tzt.workLog.tool.init.ConfigIni;

import redis.clients.jedis.Jedis;

public class JedisConn {
	private static Map<String, Jedis> _mapJedis = null;
	//private int _nThreadCount;
	public JedisConn(int ThreadCount){ 
		//_nThreadCount = ThreadCount;
		if(_mapJedis == null)
			_mapJedis = new HashMap<String,Jedis>();
    } 
	
	public static Jedis getConn(int ThreadTag){
    	try { 
    		if(_mapJedis == null){
    			_mapJedis = new HashMap<String,Jedis>();
    		}
    		
    		String strTag = String.valueOf(ThreadTag);
			Jedis tag_jedis = _mapJedis.get(strTag);
			if(tag_jedis == null){
				String strRedisAdd = ConfigIni.getIniStrValue("redis","address","");
				if(strRedisAdd.length() <= 0)
					return null;
		    	int nRedisPort = ConfigIni.getIniIntValue("redis","port", 6379);
		    	tag_jedis = new Jedis(strRedisAdd,nRedisPort,ConfigIni.getIniIntValue("redis","timeout",3000));
				_mapJedis.put(strTag, tag_jedis);
			}
			return tag_jedis;
    	}catch(Exception e){
    		return null;
    	}
	}
	
	//
	public static void removeConn(int ThreadTag){
		if(_mapJedis != null){
			String strKey = String.valueOf(ThreadTag);
			_mapJedis.remove(strKey);
		}
	}
	
	public static void free(){
		if(_mapJedis != null){
			Iterator<Jedis> iter = _mapJedis.values().iterator();
			while (iter.hasNext()) {
				try{
					Jedis conn = iter.next();
					conn.disconnect();
				}catch (Exception e){
				}
			}
			_mapJedis.clear();
		}
	}
}
