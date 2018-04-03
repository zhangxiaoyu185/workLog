package com.tzt.workLog.core.spring.adapter;

public class BeanFactory extends AbstractBeanFactory {

	protected static BeanFactory instance;

	protected BeanFactory() {
		super();
	}

	public static BeanFactory getInstance() {

		if (instance == null) {
			synchronized (BeanFactory.class) {
				instance = new BeanFactory();
			}
		}

		return instance;
	}

	@Override
	public String getConfigLocation() {
		return "applicationContext.xml";
	}
	
}