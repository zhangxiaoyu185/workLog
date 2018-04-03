package com.tzt.workLog.core.exception;


/**
 * checked异常基础类
 * 
 */
public class BasicException extends Exception {

	private static final long serialVersionUID = 1L;

	/**
	 * 错误信息
	 */
	private String errMsg;

	/**
	 * 错误代码
	 */
	private String code;

	public BasicException(String errMsg) {

		super(errMsg);

		setErrMsg(errMsg);
	}

	public BasicException(String errMsg, Throwable cause) {

		super(errMsg, cause);

		setErrMsg(errMsg);
	}

	public BasicException(String code, String errMsg) {

		super(errMsg);

		setErrMsg(errMsg);
		setCode(code);
	}

	public BasicException(String code, String errMsg, Throwable cause) {

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
