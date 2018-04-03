package com.tzt.workLog.core.exception;

public class SystemException extends BasicRuntimeException {

	private static final long serialVersionUID = 6630554653850974892L;

	public SystemException(String errMsg) {

		super(errMsg);
	}

	public SystemException(String errMsg, Throwable cause) {

		super(errMsg, cause);
	}

	public SystemException(String code, String errMsg) {
		
		super(code, errMsg);
	}

	public SystemException(String code, String errMsg, Throwable cause) {
		
		super(code, errMsg, cause);
	}
}
