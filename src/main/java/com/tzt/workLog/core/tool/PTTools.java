package com.tzt.workLog.core.tool;

import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class PTTools {

	/**
	 * 获取数据库中所有表的表名
	 * @param conn
	 * @param userName
	 * @return
	 * @throws SQLException
	 */
	public static List<String> getTableNameList(Connection conn, String userName) throws SQLException {
		DatabaseMetaData dbmd = conn.getMetaData();
		// 如果使用%，则表示需要访问的是数据库下的所有表
		ResultSet rs = dbmd.getTables("null", userName, "%", new String[] { "TABLE" });
		List<String> tableNameList = new ArrayList<String>();
		while (rs.next()) {
			tableNameList.add(rs.getString("TABLE_NAME"));
		}
		if(rs!=null) rs.close();
		return tableNameList;
	}

	/**
	 * 获取数据表中所有列的列名、数据类型和类型名称
	 * @param conn
	 * @param tableName
	 * @return
	 * @throws SQLException
	 */
	public static List<Map<String, Object>> getColumnNameList(Connection conn, String tableName) throws SQLException {
		DatabaseMetaData dbmd = conn.getMetaData();
		ResultSet rs = dbmd.getColumns(null, dbmd.getUserName(), tableName, "%");
		List<Map<String, Object>> columnList = new ArrayList<Map<String, Object>>();
		Map<String, Object> columnMap;
		while (rs.next()) {
			String smallModelName = "";
			String bigModelName = "";
			columnMap = new HashMap<String, Object>();
			// 转换字段名
			String columnName = rs.getString("COLUMN_NAME");
			bigModelName = columnName;
			while (columnName.indexOf('_') != -1) {
				int y = columnName.indexOf('_');
				if (!"".equals(smallModelName))
					smallModelName += columnName.substring(0, 1) + columnName.substring(1, y).toLowerCase();
				else
					smallModelName += columnName.substring(0, y).toLowerCase();
				columnName = columnName.substring(y + 1, columnName.length());
			}
			smallModelName = smallModelName + columnName.substring(0, 1) + columnName.substring(1, columnName.length()).toLowerCase();

			// 转化成类型
			String typeName = rs.getString("TYPE_NAME").toLowerCase();
			String smallModelType = "";
			String bigModelType = "";
			if ("varchar2".equalsIgnoreCase(typeName) || "varchar".equalsIgnoreCase(typeName) || "text".equalsIgnoreCase(typeName)) {
				smallModelType = "String";
				bigModelType = "VARCHAR";
			}
			if ("number".equalsIgnoreCase(typeName) || "int".equalsIgnoreCase(typeName)) {
				smallModelType = "int";
				bigModelType = "NUMERIC";
			}
			if ("double".equalsIgnoreCase(typeName)) {
				smallModelType = "double";
				bigModelType = "NUMERIC";
			}
			if ("date".equalsIgnoreCase(typeName) || "datetime".equalsIgnoreCase(typeName)) {
				smallModelType = "Date";
				bigModelType = "TIMESTAMP";
			}

			columnMap.put("Remarks", rs.getString("REMARKS"));
			columnMap.put("DATA_TYPE", rs.getString("DATA_TYPE"));
			columnMap.put("SMALL_COLUMN_NAME", smallModelName);
			columnMap.put("BIG_COLUMN_NAME", bigModelName);
			columnMap.put("SMALL_TYPE_NAME", smallModelType);
			columnMap.put("BIG_TYPE_NAME", bigModelType);
			columnList.add(columnMap);
		}
		return columnList;
	}
	
	/**
	 * 获取数据表中的主键
	 * @param conn
	 * @param tableName
	 * @return
	 * @throws SQLException
	 */
	public static List<Map<String, Object>> getPrimaryKeys(Connection conn, String tableName) throws SQLException {
		DatabaseMetaData dbmd = conn.getMetaData();		
		ResultSet rs = dbmd.getPrimaryKeys(null, null, tableName);
		List<Map<String, Object>> columnList = new ArrayList<Map<String, Object>>();
		Map<String, Object> columnMap;
		while(rs.next()) {
			columnMap = new HashMap<String, Object>();
			columnMap.put("TableCat", rs.getObject("TABLE_CAT")+"");
			columnMap.put("TableSchem", rs.getObject("TABLE_SCHEM")+"");
			columnMap.put("TableName", rs.getObject("TABLE_NAME")+"");
			columnMap.put("ColumnName", rs.getObject("COLUMN_NAME")+"");
			columnMap.put("KeySeq", rs.getObject("KEY_SEQ")+"");
			columnMap.put("PkName", rs.getObject("PK_NAME")+"");
			columnList.add(columnMap);
		}
		return columnList;
	}
	
	public static void main(String[] args) throws SQLException, Exception{		
		Configuration con = Configuration.configure();
		List<Map<String, Object>> columnList = PTTools.getColumnNameList(DBUtil.getConnection(), con.getTableName()); // 得到列名集合
		for (Map<String, Object> map : columnList) {
			String columnName = map.get("SMALL_COLUMN_NAME").toString();
			String columnType = map.get("SMALL_TYPE_NAME").toString();
			String columnRemarks = map.get("Remarks").toString();
			System.out.println(columnName+"     "+columnType+"      "+columnRemarks);
		}
	}
}
