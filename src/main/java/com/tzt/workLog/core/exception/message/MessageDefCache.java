package com.tzt.workLog.core.exception.message;

import java.util.Collection;
import com.tzt.workLog.core.cache.Cache;
import com.tzt.workLog.core.cache.SimpleCache;

/**
 * 错误提示信息定义缓存类
 * 
 * @param <K>
 * @param <V>
 */
public class MessageDefCache extends SimpleCache<Integer, MessageDefinition> {

	private static final MessageDefCache instance = new MessageDefCache();

	private boolean needToUpdate = true;

	private static final MessageDefinition unloadedMsgDef = new MessageDefinition();

	static {
		unloadedMsgDef.setId(0);
		unloadedMsgDef.setLevel("ERROR");
		unloadedMsgDef.setInternalCode("msg.def.load.failed");
		unloadedMsgDef.setExternalCode("SYS_ERROR_9999");
		unloadedMsgDef.setMessage("错误定义文件未能正确加载.");
	}

	private MessageDefCache() {

	}

	public static Cache<Integer, MessageDefinition> getInstance() {

		return instance;
	}

	@Override
	public MessageDefinition get(Integer key) {

		if (isEmpty())
			return unloadedMsgDef;
		else
			return super.get(key);
	}

	private void setNeedUpdate() {

		needToUpdate = isEmpty();
	}

	@Override
	public void put(Collection<MessageDefinition> objects) {

		clean();
		super.put(objects);
		setNeedUpdate();
	}
	
	public boolean needUpdate() {

		return needToUpdate;
	}
	
}