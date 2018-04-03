package com.tzt.workLog.core.exception;

public class ExceptionFactory {

	public static BusinessException createBisException(String errMsg) {

		return new BusinessException(errMsg);
	}

	public static BusinessException createBisException(String errMsg, Throwable cause) {

		return new BusinessException(errMsg, cause);
	}
	
	public static SystemException createSysException(String errMsg) {

		return new SystemException(errMsg);
	}

	public static SystemException createSysException(String errMsg, Throwable cause) {

		return new SystemException(errMsg, cause);
	}
}
