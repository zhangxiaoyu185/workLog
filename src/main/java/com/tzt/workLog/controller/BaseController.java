package com.tzt.workLog.controller;

import java.io.PrintWriter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.tzt.workLog.tool.out.ResultMessageBuilder;

public abstract class BaseController {	
		
	protected static final int DEFAULT_PAGESIZE = 10;// 默认每页10条
	
	protected static final int DEFAULT_PAGENUM = 1;// 默认第一页
	
	protected static final String ERROR_MSG_KEY = "errMsg";
	
	protected static final int SESSION_TIMEOUTCODE = 2;// session超时返回码
	
	protected final Logger logger = LoggerFactory.getLogger("BASE_LOGGER");
	
	protected final Logger analysisLogger = LoggerFactory.getLogger("ANALYSIS_LOGGER");
	
	protected static final String SESSION_KEY = "session_key";
	
    /**
	 * 
	 * @param response
	 * @return
	 */
	protected PrintWriter getWriter(HttpServletResponse response){
		if(response==null)
			return null;
		
		PrintWriter writer = null;
		try{
			writer = response.getWriter();
		}catch(Exception e){
			logger.error("unknow exception",e);
		}
		
		return writer;
	}
	
	/**
	 * send the string message back
	 * @param returnResult
	 * @param response
	 */
	protected void writeAjaxResponse(String returnResult,HttpServletResponse response){
		PrintWriter writer = getWriter(response);
		if(writer==null || returnResult==null){
			return;
		}			
		try {
			writer.write(returnResult); 
		} finally{
			writer.flush();
			writer.close();
		}
	}
	
	/**
	 * description:send the ajax response back to the client side.
	 * @param responseType
	 * @param responseContent
	 * @param writer
	 */
	protected void writeAjaxJSONResponse(Object responseObj,PrintWriter writer){
		if(writer==null || responseObj==null){
			return;
		}			
		try {
			writer.write(JSON.toJSONString(responseObj,SerializerFeature.DisableCircularReferenceDetect)); 
		} finally{
			writer.flush();
			writer.close();
		}
	}
	
	/**
	 * description:send the ajax response back to the client side. DisableCircularReferenceDetect true or false
	 * @param responseObj
	 * @param writer
	 * @param cirReferDetect
	 */
	protected void writeAjaxJSONResponse(Object responseObj ,HttpServletResponse response , boolean cirReferDetect){
		PrintWriter writer = getWriter(response);
		if(writer==null || responseObj==null){
			return;
		}			
		try {
			if(!cirReferDetect){
				writeAjaxJSONResponse(responseObj , writer) ; 
				return;
			}
			writer.write(JSON.toJSONString(responseObj)); 
		} finally{
			if(writer!=null){
				writer.flush();
				writer.close();
			}
		}
	}
	
	/**
	 * description:send the ajax response back to the client side (Date object
	 * will be formatted as per the given <code>dateFormat</code>).
	 * 
	 * @param responseObj
	 * @param writer
	 * @param dateFormat
	 */
	protected void writeAjaxJSONResponseWithDateFormat(Object responseObj,PrintWriter writer,String dateFormat){
		if(writer==null || responseObj==null || dateFormat == null){
			return;
		}

		try {
			writer.write(JSON.toJSONStringWithDateFormat(responseObj, dateFormat,SerializerFeature.DisableCircularReferenceDetect));
		} finally{
			writer.flush();
			writer.close();
		}
	}

	/**
	 * description:send the ajax response back to the client side.
	 * 
	 * @param responseObj
	 * @param response
	 */
	protected void writeAjaxJSONResponse(Object responseObj,HttpServletResponse response){
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Content-Type", "application/json");
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0
		response.setDateHeader("Expires", 0); // Proxies.
		
		PrintWriter writer = getWriter(response);
		writeAjaxJSONResponse(responseObj, writer);
	}

	/**
	 * description:send the ajax response back to the client side (Date object
	 * will be formatted as per the given <code>dateFormat</code>).
	 * 
	 * @param responseObj
	 * @param response
	 * @param dateFormat
	 */
	protected void writeAjaxJSONResponseWithDateFormat(Object responseObj,HttpServletResponse response,String dateFormat){
		response.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1
		response.setHeader("Pragma", "no-cache"); // HTTP 1.0
		response.setDateHeader("Expires", 0); // Proxies.
		PrintWriter writer = getWriter(response);
		if (dateFormat != null)
			writeAjaxJSONResponseWithDateFormat(responseObj, writer, dateFormat);
		else
			writeAjaxJSONResponse(responseObj, writer);
	}
	
	/**
	 * get session
	 * @param request
	 * @return
	 */
    protected Object getSession(HttpServletRequest request) {  
        return (Object) request.getSession().getAttribute(  
        		SESSION_KEY);  
    }  
     
    /**
     * object set session
     * @param request
     * @param object
     */
    protected void setSession(HttpServletRequest request,Object object) {  
        request.getSession().setAttribute(SESSION_KEY,  
        		object);  
    }  
    
    /**
     * remove session
     * @param request
     * @param object
     */
    protected void removeSession(HttpServletRequest request) {  
        request.getSession().removeAttribute(SESSION_KEY); 
    } 
    
    /**
     * determine if overdue for session
     * @param request
     * @return false -->Session is active true -->Session has been invalidated
     */
    protected boolean isSession(HttpServletRequest request) {
		return request.getSession(false) == null?true:false;
    }
    
    /**
     * check session
     * @param request
     * @return
     */
    protected boolean checkSession(HttpServletRequest request, HttpServletResponse response) {
    	if (isSession(request)) {
    		writeAjaxJSONResponse(ResultMessageBuilder.build(false, SESSION_TIMEOUTCODE, "您的操作已过时，请重新登录"), response);
    		return true;
		}else {
			return false;
		}
    }
    
}