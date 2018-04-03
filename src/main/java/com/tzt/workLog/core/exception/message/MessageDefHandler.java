package com.tzt.workLog.core.exception.message;

import com.tzt.workLog.core.cache.Cache;
import com.tzt.workLog.tool.StringUtil;

public class MessageDefHandler {

	public static MessageDefinition getMsgDefinition(Integer id, Object... params) {
		Cache<Integer, MessageDefinition> msgDefCache = getMsgDef();
		MessageDefinition msgDefFound = msgDefCache.get(id);
		MessageDefinition msgDef = null;
		if (msgDefFound != null) {
			msgDef = msgDefFound.copy();
			msgDef.setMessage(StringUtil.formatMessage(
					msgDefFound.getMessage(), params));
			msgDef.setMessageEn(StringUtil.formatMessage(
					msgDefFound.getMessageEn(), params));
		} else {
			msgDefFound = msgDefCache.get(InnerMessaqeConst.UNDEFINED_ERROR_CODE);
			msgDef = msgDefFound.copy();
			msgDef.setMessage(StringUtil.formatMessage(
					msgDefFound.getMessage(), id));
			msgDef.setMessageEn(StringUtil.formatMessage(
					msgDefFound.getMessageEn(), params));
		}
		return msgDef;
	}

	public static MessageDefinition getDefaultMsgDef(Object param) {
		return getMsgDefinition(InnerMessaqeConst.DEFAULT_ERROR_CODE, param);
	}

	public static Cache<Integer, MessageDefinition> getMsgDef() {
		Cache<Integer, MessageDefinition> msgDefCache = MessageDefCache.getInstance();
		if (msgDefCache.needUpdate()) {
			synchronized (msgDefCache) {
				try {
					if (msgDefCache.needUpdate()) {
						msgDefCache.put(new MessageDefParser()
								.parseMessageDef());
					}
				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		}
		return msgDefCache;
	}
	
}