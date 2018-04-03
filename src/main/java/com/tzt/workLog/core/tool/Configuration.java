package com.tzt.workLog.core.tool;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Properties;
import org.dom4j.Document;
import org.dom4j.DocumentException;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;

public class Configuration {
	private String url;
	private String driverClassName;
	private String username;
	private String password;
	private String appName; // 业务名称
	private String tableName; // 表名称
	private String backageName; // 包名称
	private int minIdle; // 最小空闲数
	private int maxIdle; // 最大空闲数
	private Long maxWait; // 最大等待时间
	private int maxActive; // 最大连接数
	private String validationQuery; //验证SQL
	private String testOnBorrow; //验证断开时数据是否有效
	private String testOnReturn; //验证断开时数据是否有效
	private String testWhileIdle; //验证断开时数据是否有效
	private String charset; //编码格式

	public int getMaxActive() {
		return maxActive;
	}

	public void setMaxActive(int maxActive) {
		this.maxActive = maxActive;
	}

	public String getDriverClassName() {
		return driverClassName;
	}

	public void setDriverClassName(String driverClassName) {
		this.driverClassName = driverClassName;
	}

	public String getAppName() {
		return appName;
	}

	public void setAppName(String appName) {
		this.appName = appName;
	}

	public Configuration() {
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getMinIdle() {
		return minIdle;
	}

	public void setMinIdle(int minIdle) {
		this.minIdle = minIdle;
	}

	public int getMaxIdle() {
		return maxIdle;
	}

	public void setMaxIdle(int maxIdle) {
		this.maxIdle = maxIdle;
	}

	public Long getMaxWait() {
		return maxWait;
	}

	public void setMaxWait(Long maxWait) {
		this.maxWait = maxWait;
	}

	public String getValidationQuery() {
		return validationQuery;
	}

	public void setValidationQuery(String validationQuery) {
		this.validationQuery = validationQuery;
	}

	public String getTestOnBorrow() {
		return testOnBorrow;
	}

	public void setTestOnBorrow(String testOnBorrow) {
		this.testOnBorrow = testOnBorrow;
	}

	public String getTestOnReturn() {
		return testOnReturn;
	}

	public void setTestOnReturn(String testOnReturn) {
		this.testOnReturn = testOnReturn;
	}

	public String getTestWhileIdle() {
		return testWhileIdle;
	}

	public void setTestWhileIdle(String testWhileIdle) {
		this.testWhileIdle = testWhileIdle;
	}
	
	public String getTableName() {
		return tableName;
	}

	public void setTableName(String tableName) {
		this.tableName = tableName;
	}
	
	public void setCharset(String charset) {
		this.charset = charset;
	}
	
	public String getCharset(){
		return charset;
	}
	
	public String getBackageName() {
		return backageName;
	}

	public void setBackageName(String backageName) {
		this.backageName = backageName;
	}

	public Configuration(String url, String driverClassName, String username,
			String password) {
		super();
		this.url = url;
		this.driverClassName = driverClassName;
		this.username = username;
		this.password = password;
	}

	public Configuration(String url, String driverClassName, String username,
			String password, String appName, String tableName, String backageName) {
		super();
		this.url = url;
		this.driverClassName = driverClassName;
		this.username = username;
		this.password = password;
		this.appName = appName;
		this.tableName = tableName;
		this.backageName = backageName;
	}

	public Configuration(String url, String driverClassName, String username,
			String password, String appName, String tableName, String backageName, int minIdle,
			int maxIdle, Long maxWait, int maxActive, String validationQuery,
			String testOnBorrow, String testOnReturn, String testWhileIdle) {
		super();
		this.url = url;
		this.driverClassName = driverClassName;
		this.username = username;
		this.password = password;
		this.appName = appName;
		this.tableName = tableName;
		this.backageName = backageName;
		this.minIdle = minIdle;
		this.maxIdle = maxIdle;
		this.maxWait = maxWait;
		this.maxActive = maxActive;
		this.validationQuery = validationQuery;
		this.testOnBorrow = testOnBorrow;
		this.testOnReturn = testOnReturn;
		this.testWhileIdle = testWhileIdle;
	}

	/**
	 * 默认读取配置文件Properties
	 */
	public static Configuration configure() {
		try {
			InputStream in = new FileInputStream(System.getProperty("user.dir")+"/src/main/java/com/tzt/workLog/core/tool/tools.Properties");
			//Configuration.class.getResourceAsStream("/com/xiaoyu/fun/tool/tools.Properties");
			Configuration cfg = load(in);
			return cfg;
		} catch (Exception e) {
			e.printStackTrace();
			return null;// 无法加载配置信息，返回null
		}
	}

	/**
	 * 指定配置文件xml加载配置信息
	 */
	public static Configuration configure(File configFile) {
		try {
			InputStream in = new FileInputStream(configFile);
			Configuration cfg = loadXml(in);
			return cfg;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	/**
	 * SAXReader读取xml配置文件
	 * @param in
	 * @return
	 * @throws DocumentException
	 */
	private static Configuration loadXml(InputStream in) throws DocumentException {
		SAXReader reader = new SAXReader();
		Document doc = reader.read(in);
		Element jdbc = doc.getRootElement();
		String url = jdbc.element("url").getText();
		String driverClassName = jdbc.element("driverClassName").getText();
		String username = jdbc.element("username").getText();
		String password = jdbc.element("password").getText();
		String appName = jdbc.element("appName").getText();
		String tableName = jdbc.element("tableName").getText().toUpperCase();
		String backageName = jdbc.element("backageName").getText();
		Configuration cfg = new Configuration(url, driverClassName, username, password, appName, tableName, backageName);
		cfg.setMinIdle(Integer.parseInt(jdbc.element("minIdle").getText()));
		cfg.setMaxIdle(Integer.parseInt(jdbc.element("maxIdle").getText()));
		cfg.setMaxActive(Integer.parseInt(jdbc.element("maxActive").getText()));
		cfg.setMaxWait(Long.parseLong(jdbc.element("maxWait").getText()));
		cfg.setValidationQuery(jdbc.element("validationQuery").getText());
		cfg.setTestOnBorrow(jdbc.element("testOnBorrow").getText());
		cfg.setTestOnReturn(jdbc.element("testOnReturn").getText());
		cfg.setTestWhileIdle(jdbc.element("testWhileIdle").getText());
		return cfg;
	}
	/**
	 * 读取配置文件Properties
	 * @param in
	 * @return
	 * @throws DocumentException
	 */
	private static Configuration load(InputStream in) throws DocumentException {
		Properties pro = new Properties(); //pro是一个键值对对象
		try {
			pro.load(in);
		} catch (IOException e) {
			e.printStackTrace();
		} 
		//加载文件
		String url = pro.getProperty("url");
		String driverClassName = pro.getProperty("driverClassName");
		String username = pro.getProperty("username");
		String password = pro.getProperty("password");
		String appName = pro.getProperty("appName");
		String tableName = pro.getProperty("tableName").toUpperCase();
		String backageName = pro.getProperty("backageName");
		String charSet = pro.getProperty("Charset");
		
		Configuration cfg = new Configuration(url, driverClassName, username, password, appName, tableName, backageName);
		cfg.setMinIdle(Integer.parseInt(pro.getProperty("minIdle")));
		cfg.setMaxIdle(Integer.parseInt(pro.getProperty("maxIdle")));
		cfg.setMaxActive(Integer.parseInt(pro.getProperty("maxActive")));
		cfg.setMaxWait(Long.parseLong(pro.getProperty("maxWait")));
		cfg.setValidationQuery(pro.getProperty("validationQuery"));
		cfg.setTestOnBorrow(pro.getProperty("testOnBorrow"));
		cfg.setTestOnReturn(pro.getProperty("testOnReturn"));
		cfg.setTestWhileIdle(pro.getProperty("testWhileIdle"));
		cfg.setCharset(charSet);
		return cfg;
	}
	
}
