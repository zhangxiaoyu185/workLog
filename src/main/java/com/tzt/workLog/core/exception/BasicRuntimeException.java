package com.tzt.workLog.core.exception;

/**
 * unchecked异常基础类
 * 
 */
public class BasicRuntimeException extends RuntimeException {

	private static final long serialVersionUID = 1L;

	/**
	 * 错误信息
	 */
	private String errMsg;
	
	/**
	 * 错误代码
	 */
	private String code;

	public BasicRuntimeException(String errMsg) {

		super(errMsg);

		setErrMsg(errMsg);
	}

	public BasicRuntimeException(String errMsg, Throwable cause) {

		super(errMsg, cause);

		setErrMsg(errMsg);
	}
	
	public BasicRuntimeException(String code, String errMsg) {

		super(errMsg);

		setErrMsg(errMsg);
		setCode(code);
	}
	
	public BasicRuntimeException(String code, String errMsg, Throwable cause) {

		super(errMsg, cause);

		setErrMsg(errMsg);
		setCode(code);
	}
	
	public String getErrMsg() {
		return errMsg;
	}

	public void setErrMsg(String errMsg) {
		this.errMsg = errMsg;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}
}