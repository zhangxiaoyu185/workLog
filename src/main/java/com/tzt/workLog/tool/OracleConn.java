package com.tzt.workLog.tool;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.sql.Connection; 
import java.sql.DriverManager; 
import com.tzt.workLog.tool.init.ConfigIni;

public class OracleConn {
	private static Map<String, Connection> _mapOracle = null;
	public OracleConn(int ThreadCount){ 
		if(_mapOracle == null)
			_mapOracle = new HashMap<String,Connection>();
    } 
	
	public static Connection getConn(int ThreadTag){
    	try { 
    		if(_mapOracle == null){
    			_mapOracle = new HashMap<String,Connection>();
    		}
    		String strTag = String.valueOf(ThreadTag);
    		Connection tag_conn = _mapOracle.get(strTag);
			if(tag_conn == null){
				Class.forName("oracle.jdbc.driver.OracleDriver");  
				String url = ConfigIni.getIniStrValue("oracle", "url", "jdbc:oracle:thin:@192.168.0.124:1521:ORCL"); 
				String strUser = ConfigIni.getIniStrValue("oracle","user","hsrun10");
				String strPass = ConfigIni.getIniStrValue("oracle","pass","hsrun10");
				tag_conn = DriverManager.getConnection(url, strUser, strPass); 
		    	_mapOracle.put(strTag, tag_conn);
			}
			return tag_conn;
    	}catch(Exception e){
    		return null;
    	}
	}
	
	//
	public static void removeConn(int ThreadTag){
		if(_mapOracle != null){
			String strKey = String.valueOf(ThreadTag);
			_mapOracle.remove(strKey);
		}
	}
	
	public static void free(){
		if(_mapOracle != null){
			Iterator<Connection> iter = _mapOracle.values().iterator();
			while (iter.hasNext()) {
				try{
					Connection conn = iter.next();
					conn.close();
				}catch (Exception e){
				}
			}
			_mapOracle.clear();
		}
	}
	
	public static void main(String[] args) {
		getConn(1);
		System.out.println("连接成");
	}
}
