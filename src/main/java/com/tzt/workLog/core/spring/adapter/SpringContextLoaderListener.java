package com.tzt.workLog.core.spring.adapter;

import javax.servlet.ServletContextEvent;

import org.springframework.web.context.ContextLoaderListener;

/**
 * Spring上下文环境监听器,用于BeanFactory从Servlet上下文中获取Bean
 * 
 */
public class SpringContextLoaderListener extends ContextLoaderListener {

	public void contextInitialized(ServletContextEvent event) {
		super.contextInitialized(event);
		
		ServletContextHolder.setContext(event.getServletContext());
	}
	
}