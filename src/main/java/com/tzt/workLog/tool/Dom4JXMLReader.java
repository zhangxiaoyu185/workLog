package com.tzt.workLog.tool;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.io.SAXReader;

/**
 * Dom4J XML Reader
 */
public abstract class Dom4JXMLReader {

	private InputStream is;

	protected Dom4JXMLReader(String fileName){
		
		is = Thread.currentThread().getContextClassLoader().getResourceAsStream(fileName);
	}
	
	protected Document getDocument(){
		
		SAXReader reader = new SAXReader();
		Document doc = null;
		
		try{
			doc = reader.read(is);
		}
		catch(DocumentException e){
			e.printStackTrace();
		}
		finally{
			try {
				if(is != null){
					is.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		
		return doc;
	}
	
	protected abstract List<?> getXMLInfoList();
}
