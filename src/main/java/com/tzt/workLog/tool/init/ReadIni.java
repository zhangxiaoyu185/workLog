package com.tzt.workLog.tool.init;

import java.io.BufferedReader;  
import java.io.FileReader;  
import java.io.IOException;  
import java.util.ArrayList;
import java.util.Enumeration;
import java.util.HashMap;  
import java.util.List;
import java.util.Properties;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
  
public class ReadIni {
	private static Logger logger = LoggerFactory.getLogger("CACHE_LOGGER");
    protected HashMap<String, Properties> sections = new HashMap<String, Properties>();  
    private transient String currentSecion;  
    private transient Properties currentProperties;  
  
    public ReadIni(String filename) throws IOException { 
        BufferedReader reader = new BufferedReader(new FileReader(filename));  
        read(reader);  
        reader.close();
    }  
  
    protected void read(BufferedReader reader) throws IOException {  
        String line;  
        while ((line = reader.readLine()) != null) {  
            parseLine(line);  
        }  
    }  
  
    private void parseLine(String line) {  
        line = line.trim();
        if (!line.startsWith(";")) {
        	if (line.matches("\\[.*\\]") == true) {  
            	currentSecion = line.replaceFirst("\\[(.*)\\]", "$1");  
            	currentProperties = new Properties();  
                sections.put(currentSecion, currentProperties);
                logger.info(currentSecion + " : " + currentProperties);
            }else if(line.matches(".*=.*") == true) {  
                if (currentProperties != null) {  
                    int i = line.indexOf('=');  
                    String name = line.substring(0, i);  
                    String value = line.substring(i + 1);  
                    currentProperties.setProperty(name, value);
                    logger.info(name + " : " + value);
                }  
            }
		}        
    } 
  
    public String getValue(String section, String name) {  
        Properties p = (Properties)sections.get(section);  
        if (p == null) {  
            return null;  
        }  
        String value = p.getProperty(name);  
        return value;  
    }
    
    @SuppressWarnings("rawtypes")
	public List<String> getAllKey(String section) {
		List<String> strList = new ArrayList<String>();
		Properties p = (Properties) sections.get(section);
		try {
			Enumeration en = p.propertyNames();
			while (en.hasMoreElements()) {
				String key = (String) en.nextElement();
				strList.add(key);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return strList;
	}
    
} 