package com.tzt.workLog.core.spring.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.core.NamedThreadLocal;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class PerfMonitorInterceptor extends HandlerInterceptorAdapter {

	private NamedThreadLocal<Map<String,Object>> perfMonitorLocal = new NamedThreadLocal<Map<String,Object>>("StopWatch-StartTime");
	
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
	    throws Exception {
		
		Map<String,Object> localMap = new HashMap<String,Object>();
		localMap.put("beginTime", System.nanoTime());
		localMap.put("URI", request.getRequestURI());
		perfMonitorLocal.set(localMap);
		return true;
	}
	
	
	public void afterCompletion(
			HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex)
			throws Exception {
		
		Map<String,Object> localMap = perfMonitorLocal.get();
		if(localMap==null){
			return;
		}
		
		long beginTime = (Long)localMap.get("beginTime");
		String URI = (String)localMap.get("URI");
		System.out.println("Show:" + URI + ":" + (System.nanoTime() - beginTime));
		perfMonitorLocal.remove();
	}
}
