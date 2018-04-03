package com.tzt.workLog.tool.properties;

import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.Reader;
import java.util.HashMap;
import java.util.Map;
import java.util.Properties;

public class PropertiesUtil {
	private static Map<String, String> propertiesMap;
	private static final String FILE = "config.properties";

	protected void init() {
		Properties props = new Properties();
		
		try {
			InputStream in = Thread.currentThread().getContextClassLoader().getResourceAsStream(FILE);
			Reader reader = new InputStreamReader(in, "UTF-8");
			props.load(reader);
		} catch (IOException e) {
			e.printStackTrace();
		}

		propertiesMap = new HashMap<String, String>();
		for (Object key : props.keySet()) {
			String keyStr = key.toString();
			propertiesMap.put(keyStr, props.getProperty(keyStr));
		}
	}

	public static String getProperty(String name) {
		return propertiesMap.get(name);
	}

}