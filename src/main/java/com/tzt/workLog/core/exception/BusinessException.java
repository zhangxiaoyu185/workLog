package com.tzt.workLog.core.exception;

/**
 * 业务层异常类
 * 
 */
public class BusinessException extends BasicException {

	private static final long serialVersionUID = 1L;

	public BusinessException(String errMsg) {
		
		super(errMsg);
	}

	public BusinessException(String errMsg, Throwable cause) {
		
		super(errMsg, cause);
	}

	public BusinessException(String code, String errMsg) {
		
		super(code, errMsg);
	}

	public BusinessException(String code, String errMsg, Throwable cause) {
		
		super(code, errMsg, cause);
	}
}
