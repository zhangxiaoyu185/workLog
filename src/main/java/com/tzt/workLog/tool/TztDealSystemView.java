package com.tzt.workLog.tool;

import java.util.ArrayList;
import java.util.LinkedList;
import java.util.Map;

public class TztDealSystemView {

	public static void GetMapValue(String strSrc,
			Map<String, String[]> GridMap, Map<String, String> VlaueMap,
			String strSplitFlag, boolean bKeyToUpp) {
		int iSubBegin = 0;
		int iBegin = -1;
		iBegin = strSrc.indexOf("<GRID");
		int iGridb = -1;
		String strGrid = "";
		String strGridValue = "";
		int iEnd = -1;
		LinkedList<String> ValueList = new LinkedList<String>();

		if (GridMap != null)
			GridMap.clear();
		if (VlaueMap != null)
			VlaueMap.clear();

		int lCountSize = strSrc.length();

		while (iSubBegin < lCountSize) {
			if (iBegin >= 0)
				iGridb = strSrc.indexOf(">", iBegin);
			if (iGridb >= iSubBegin) {
				if (iGridb > iSubBegin) {
					String strValue = strSrc.substring(iSubBegin, iBegin);
					ValueList.add(strValue);
				}
				strGrid = strSrc.substring(iBegin + 1, iGridb);
				iEnd = strSrc.indexOf("</" + strGrid + ">", iGridb);
				if (iEnd >= iSubBegin) {
					if (GridMap != null) {
						strGridValue = strSrc.substring(
								iBegin + strGrid.length() + 2, iEnd);
						String[] ayGridValue = strGridValue.split(strSplitFlag);
						GridMap.put(strGrid, ayGridValue);
					}
				} else {
					String strValue = strSrc.substring(iSubBegin);
					ValueList.add(strValue);
					break;
				}
			} else {
				String strValue = strSrc.substring(iSubBegin);
				ValueList.add(strValue);
				break;
			}
			iSubBegin = iEnd + strGrid.length() + 3;
			iBegin = strSrc.indexOf("<GRID", iSubBegin);
		}
		if (VlaueMap != null) {
			for (int i = 0; i < ValueList.size(); i++) {
				String strValue = ValueList.get(i);
				String[] ayValue = split(strValue, strSplitFlag);// 不等于空则分割字符串放入ArrayList里
				for (int j = 0; j < ayValue.length; j++) {
					String strKeyValue = ayValue[j];
					int iKey = strKeyValue.indexOf("=");
					if (iKey > 0 && iKey < strKeyValue.length()) {
						String finalkey = strKeyValue.substring(0, iKey);
						if (bKeyToUpp) {
							finalkey = finalkey.toUpperCase();
						}
						String finalValue = strKeyValue.substring(iKey + 1);
						VlaueMap.put(finalkey, finalValue);
					}
				}
			}
		}
	}

	public static void GetMapValue(String strSrc,
			Map<String, String[]> GridMap, Map<String, String> VlaueMap) {
		GetMapValue(strSrc, GridMap, VlaueMap, "\r\n", true);
	}

	/**
	 * 分割字符串放入ArrayList里
	 * 
	 * @param original
	 *            字符串
	 * @param regex
	 *            分隔符
	 * @param AyList
	 *            ArrayList
	 * @return 空
	 */
	public static void split(String original, String regex,
			ArrayList<String> AyList) {
		int startIndex = 0;
		if (AyList == null)
			AyList = new ArrayList<String>();
		int index = 0;
		startIndex = original.indexOf(regex);
		while (startIndex < original.length() && startIndex != -1) {
			String temp = original.substring(index, startIndex);
			AyList.add(temp);
			index = startIndex + regex.length();
			startIndex = original.indexOf(regex, startIndex + regex.length());
		}
		if (index < original.length())
			AyList.add(original.substring(index));
		return;
	}

	/**
	 * 分割字符串，返回分割后的字符串数组
	 * 
	 * @param original
	 *            字符串
	 * @param regex
	 *            分隔符
	 * @return str
	 */
	public static String[] split(String original, String regex) {
		if (original == null || original.length() <= 0)
			return null;
		String[] str = null;
		ArrayList<String> AyList = new ArrayList<String>();
		split(original, regex, AyList);
		str = new String[AyList.size()];
		for (int i = 0; i < AyList.size(); i++) {
			str[i] = AyList.get(i);
		}
		return str;
	}

	/**
	 * 字符转化为数字(正整数)
	 */
	public static int parseInt(String nStr) {
		int n;
		try {
			n = Integer.parseInt(nStr);
		} catch (Exception e) {
			n = -1;
		}
		return n;
	}
}
