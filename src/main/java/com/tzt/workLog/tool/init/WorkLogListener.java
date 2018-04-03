package com.tzt.workLog.tool.init;

import javax.servlet.*;

public class WorkLogListener implements ServletContextListener {
	
	private ServletContext context = null;

	public void contextDestroyed(ServletContextEvent event) {
		// 程序关闭
		this.context = null;
	}

	// 这个方法在Web应用服务做好接受请求的时候被调用。
	public void contextInitialized(ServletContextEvent event) {
		this.context = event.getServletContext();
		//初始化一些配置文件
		//加载config.ini
		ConfigIni.setClassPath(Thread.currentThread().getContextClassLoader().getResource("/global/config.ini").getPath());
	}
	
}