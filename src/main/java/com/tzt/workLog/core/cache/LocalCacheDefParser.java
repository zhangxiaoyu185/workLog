package com.tzt.workLog.core.cache;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.jdom.Document;
import org.jdom.Element;
import org.jdom.JDOMException;
import org.jdom.input.SAXBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


public class LocalCacheDefParser {	
	private static final Logger logger = LoggerFactory.getLogger("CACHE_LOGGER");	
		
	private static final String CACHE_SERVICE_DEFINITION = "/global/cache_data_service.xml";
	
	@SuppressWarnings("unchecked")
	public static List<LocalCacheDefinition> parse(){
		List<LocalCacheDefinition> cacheDefs = new ArrayList<LocalCacheDefinition>();
		SAXBuilder builder = new SAXBuilder(false);
		try {
			Document doc = builder.build(Thread.currentThread().getContextClassLoader().getResourceAsStream(CACHE_SERVICE_DEFINITION));
			Element caches = doc.getRootElement();
			List<Element> cacheList = (List<Element>)caches.getChildren("cache");
			for (Element oneCache:cacheList) {
				String table = oneCache.getAttributeValue("table");
				String mapperSQLId  = oneCache.getAttributeValue("mapper_sql_id");
				String checkSQLId   = oneCache.getAttributeValue("check_sql_id");
				String voClassName  = oneCache.getAttributeValue("vo_name");
				String voPrimaryKey = oneCache.getAttributeValue("vo_key");
				boolean needRefresh = false;
				String strNeedRefresh = oneCache.getAttributeValue("refresh");
				try{
					needRefresh = Boolean.valueOf(strNeedRefresh);
				}catch(Exception e){
					needRefresh = false;
				}
				
				LocalCacheDefinition oneDef = new LocalCacheDefinition(table,mapperSQLId,checkSQLId,voClassName,voPrimaryKey,needRefresh);		
				cacheDefs.add(oneDef);
				
				List<Element> groups = oneCache.getChildren("group");
				if(groups==null || groups.size()==0)
					continue;
				
				for(Element group:groups){
					oneDef.addGroup(group.getAttributeValue("field_name"), group.getAttributeValue("field_key"));
				}				
			}
		} catch (JDOMException e) {
			e.printStackTrace();
			logger.error("Fail to parse the cache definition",e);
		} catch (IOException e) {
			logger.error("Fail to parse the cache definition",e);
		} catch (Exception e){
			logger.error("Fail to parse the cache definition",e);
		}
		return cacheDefs;
	}	
}
