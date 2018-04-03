package com.tzt.workLog.core.spring.adapter;

import javax.servlet.ServletContext;

public class ServletContextHolder {

	private static ServletContext context;
	
	public static void setContext(ServletContext context){
		ServletContextHolder.context = context;
	}
	
	public static ServletContext getContext(){
		return ServletContextHolder.context;
	}
	
}