package com.tzt.workLog.tool.init;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigIni {
	
	private static Logger logger = LoggerFactory.getLogger("BASE_LOGGER");	
	private static String _strClassPath = "";
	private static ReadIni _iniJniModule = null;
	
	public static void setClassPath(String path) {
		if(path.startsWith("/"))
			path = path.substring(1, path.length());
		_strClassPath = path;
		getIniJniModule();
	}
	
	public static String getClassPath() {
		return _strClassPath;
	}

	//获取配置
	public static ReadIni getIniJniModule() {
		try{
			if(_iniJniModule == null){
				String strPath = getClassPath();
				File f = new File(strPath);
				if(f.exists()){
					_iniJniModule = new ReadIni(strPath);    
				}
			}
		}catch (Exception e){
			logger.error("获取配置文件失败！");
		}
		return _iniJniModule;
	}
	
	// 获取所有键
	public static List<String> getAllKey(String strSec) {
		if (_iniJniModule != null) {
			List<String> strList = _iniJniModule.getAllKey(strSec);
			if (strList != null)
				return strList;
		}
		return new ArrayList<String>();
	}
		
	//获取配置值
	public static String getIniStrValue(String strSec,String strKey) {
		return getIniStrValue(strSec,strKey,"");
	}
	
	//获取配置值
	public static String getIniStrValue(String strSec,String strKey,String strDef) {
		if(_iniJniModule != null){
			String strValue = _iniJniModule.getValue(strSec,strKey);
			if(strValue != null)
				return strValue;
		}
		return strDef;
	}
	
	public static int getIniIntValue(String strSec,String strKey,int nDef) {
		try{
			if(_iniJniModule != null){
				String strValue = _iniJniModule.getValue(strSec, strKey);
				if(strValue != null)
					return Integer.parseInt(strValue);
			}
		}
		catch (Exception e){
			logger.error("获取int转换错误！");
		}
		return nDef;
	}
	
	public static int getIniIntValue(String strSec,String strKey){
		return getIniIntValue(strSec,strKey,0);
	}

}