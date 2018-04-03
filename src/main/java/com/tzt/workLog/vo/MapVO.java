package com.tzt.workLog.vo;

import java.lang.reflect.Field;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class MapVO<F, T extends BaseVO> {
	private Map<F, T> voMap = new HashMap<F, T>();

	@SuppressWarnings({ "unchecked", "rawtypes" })
	public MapVO(List poList, String key, Class<T> VOType) {
		if (voMap == null || VOType == null)
			return;
		for (Object obj : poList) {
			try {
				BaseVO vo = VOType.newInstance();
				vo.convertPOToVO(obj);
				Field keyField = VOType.getDeclaredField(key);
				keyField.setAccessible(true);
				F keyvalue = (F) keyField.get(vo);
				voMap.put(keyvalue, (T) vo);
			} catch (InstantiationException e) {
				e.printStackTrace();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}

	public Map<F, T> getVoMap() {
		return voMap;
	}

	public void setVoMap(Map<F, T> voMap) {
		this.voMap = voMap;
	}

}