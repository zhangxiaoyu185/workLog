package com.tzt.workLog.core.spring.adapter;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.context.support.WebApplicationContextUtils;

public abstract class AbstractBeanFactory {

	private ApplicationContext ctx;

	protected static int AUTO_CREATE = 1;

	protected static int CONFIG_LOCATION_CREATE = 2;

	protected static int CONTEXT_CREATE = 3;

	public AbstractBeanFactory() {
		this(AUTO_CREATE);
	}

	public AbstractBeanFactory(int mode) {

		if (AUTO_CREATE == mode) {
			if (ServletContextHolder.getContext() != null) {
				ctx = WebApplicationContextUtils
						.getWebApplicationContext(ServletContextHolder
								.getContext());
			} else {
				ctx = new ClassPathXmlApplicationContext(getConfigLocation().split(","));
			}
		} else if (CONFIG_LOCATION_CREATE == mode) {
			ctx = new ClassPathXmlApplicationContext(getConfigLocation());
		} else if (CONTEXT_CREATE == mode) {
			if (ServletContextHolder.getContext() != null) {
				ctx = WebApplicationContextUtils
						.getWebApplicationContext(ServletContextHolder
								.getContext());
			}
		}
	}

	public Object getBean(String beanName) {

		return ctx.getBean(beanName);
	}

	public abstract String getConfigLocation();
	
}