package com.tzt.workLog.core.spring.interceptor;

import org.aopalliance.intercept.MethodInterceptor;
import org.aopalliance.intercept.MethodInvocation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MethodCallLogInterceptor implements MethodInterceptor {

	private static final Logger logger = LoggerFactory.getLogger("BASE_LOGGER");
	@Override
	public Object invoke(MethodInvocation invocation) throws Throwable {

		Object result = null;
		long startMilis = System.currentTimeMillis();

		logger.debug(">>>>>>>>>>>>>>>>>>>Start Into method-----"
				+ invocation.getMethod().getDeclaringClass().getName() + "."
				+ invocation.getMethod().getName() + "-----");
		result = invocation.proceed();
		long endMilis = System.currentTimeMillis();
		logger.debug(">>>>>>>>>>>>>>>>>>>Start Out method(" + (endMilis-startMilis) + " ms)-----"
				+ invocation.getMethod().getDeclaringClass().getName() + "."
				+ invocation.getMethod().getName() + "-----");		
		return result;
	}
	
}