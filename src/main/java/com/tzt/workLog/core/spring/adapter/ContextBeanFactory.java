package com.tzt.workLog.core.spring.adapter;

public class ContextBeanFactory extends AbstractBeanFactory{
	
	protected static ContextBeanFactory instance;

	protected ContextBeanFactory() {
		super(AbstractBeanFactory.CONTEXT_CREATE);
	}

	public static ContextBeanFactory getInstance() {

		if (instance == null) {
			synchronized (ContextBeanFactory.class) {
				instance = new ContextBeanFactory();
			}
		}

		return instance;
	}

	@Override
	public String getConfigLocation() {
		return null;
	}
	
}