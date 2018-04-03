package com.tzt.workLog.core.tool;

import java.sql.*;
import java.util.Properties;

public class DBUtil {
	
	public DBUtil() {}
	
	//得到连接
	public static Connection getConnection()throws Exception {
		Connection con = null;
		Configuration configuration = Configuration.configure();
		if (con==null) {
			Properties props =new Properties();
			props.put("remarksReporting","true");
			props.put("user", configuration.getUsername());
			props.put("password", configuration.getPassword());
			Class.forName(configuration.getDriverClassName());
			con =DriverManager.getConnection(configuration.getUrl(),props);
		}
		return con;
	}
	
	//执行有结果集返回的SQL语句
	public static ResultSet executeQuery(String sql,Connection con)throws Exception {
		if (con==null) {
			throw new Exception("没有连接对象可用");
		}
		//创建语句对象
		Statement stmt = null;
		ResultSet rs = null;
		stmt = con.createStatement();
		rs = stmt.executeQuery(sql);
		if(stmt!=null) stmt.close();
		return rs;
	}
	
	//执行更新语句
	public static int executeUpdate(String sql,Connection con)throws Exception {
		if (con==null) {
			throw new Exception("没有连接可用");
		}
		//创建语句对象
		Statement stmt = null;
		stmt = con.createStatement();
		int i = stmt.executeUpdate(sql);
		if(stmt!=null) stmt.close();
		return i;
	}
	
	public static void close(Connection con,ResultSet rs,Statement stmt) {
		try {
			if (rs!=null) {
				rs.close();
			}
		} catch (Exception e) {
		}
		try {
			stmt.close();
		} catch (Exception e) {
		}
		try {
			con.close();
		} catch (Exception e) {
		}
	}
	
	public static void main(String[] args) throws Exception {
		Connection con = DBUtil.getConnection();
		System.out.println("连接成功！");
		if (con!=null) con.close();
	}
}