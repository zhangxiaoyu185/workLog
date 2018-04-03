package com.tzt.workLog.tool.out;

import java.text.MessageFormat;
import com.tzt.workLog.tool.properties.PropertiesUtil;

public class ResultMessageWithPropBuilder extends ResultMessageBuilder {
	
	public static ResultMessage buildWithProp(boolean success, String key, Object[] dataArr) {
		String message = PropertiesUtil.getProperty(key);
		if (null != dataArr) {
			message = new MessageFormat(message).format(dataArr);
		}
		
		return new ResultMessage(success, message);
	}
	
}