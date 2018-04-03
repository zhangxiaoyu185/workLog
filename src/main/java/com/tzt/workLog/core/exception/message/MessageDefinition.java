package com.tzt.workLog.core.exception.message;

import java.io.Serializable;
import com.tzt.workLog.core.cache.CachedObject;

public class MessageDefinition implements CachedObject<Integer>, Serializable {

	private static final long serialVersionUID = 1L;

	public static final String LEVEL_INFO = "INFO";

	public static final String LEVEL_WARN = "WARN";

	public static final String LEVEL_ERROR = "ERROR";

	private int id;

	/**
	 * 提示信息的级别，分为INFO,WARN,ERROR 3级
	 */
	private String level;

	/**
	 * 内部代码，如USER_NOT_FOUND
	 */
	private String internalCode;

	/**
	 * 外部代码，主要显示给用户，如EWELL_BIZ_ERROR_0001
	 */
	private String externalCode;

	/**
	 * 中文错误描述信息，如病人 'Steven Lee' 不存在.
	 */
	private String message;

	/**
	 * 英文描述信息  如Patient 'Steven Lee' isn't found.
	 */
	private String messageEn;

	public int getId() {

		return id;
	}

	public void setId(int id) {

		this.id = id;
	}

	public String getLevel() {

		return level;
	}

	public void setLevel(String level) {

		this.level = level;
	}

	public String getInternalCode() {

		return internalCode;
	}

	public void setInternalCode(String internalCode) {

		this.internalCode = internalCode;
	}

	public String getExternalCode() {

		return externalCode;
	}

	public void setExternalCode(String externalCode) {

		this.externalCode = externalCode;
	}

	public String getMessage() {

		return message;
	}

	public void setMessage(String message) {

		this.message = message;
	}

	public String getMessageEn() {
		return messageEn;
	}

	public void setMessageEn(String messageEn) {
		this.messageEn = messageEn;
	}

	public MessageDefinition copy() {
		MessageDefinition def = new MessageDefinition();
		def.setId(getId());
		def.setExternalCode(getExternalCode());
		def.setInternalCode(getInternalCode());
		def.setLevel(getLevel());
		def.setMessage(getMessage());
		def.setMessageEn(getMessageEn());
		return def;
	}

	public Integer getKey() {
		return getId();
	}

}