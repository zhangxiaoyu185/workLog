package com.tzt.workLog.tool;

import net.sourceforge.pinyin4j.PinyinHelper;
import net.sourceforge.pinyin4j.format.HanyuPinyinCaseType;
import net.sourceforge.pinyin4j.format.HanyuPinyinOutputFormat;
import net.sourceforge.pinyin4j.format.HanyuPinyinToneType;
import net.sourceforge.pinyin4j.format.HanyuPinyinVCharType;
import net.sourceforge.pinyin4j.format.exception.BadHanyuPinyinOutputFormatCombination;

public class ChineseToPinYin {
	
	/**
	 * 得到 全拼
	 * 
	 * @param src
	 * @return
	 */
	public static String getPinYin(String src) {
		char[] t1 = null;
		t1 = src.toCharArray();
		String[] t2 = new String[t1.length];
		HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
		format.setCaseType(HanyuPinyinCaseType.LOWERCASE);
		format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		format.setVCharType(HanyuPinyinVCharType.WITH_V);
		String t3 = "";
		int t0 = t1.length;
		try {
			for (int i = 0; i < t0; i++) {
				// 判断是否为汉字字符
				if (java.lang.Character.toString(t1[i]).matches(
						"[\\u4E00-\\u9FA5]+")) {
					t2 = PinyinHelper.toHanyuPinyinStringArray(t1[i], format);
					t3 += t2[0];
				} else {
					t3 += java.lang.Character.toString(t1[i]);
				}
			}
			return t3;
		} catch (BadHanyuPinyinOutputFormatCombination e1) {
			e1.printStackTrace();
		}
		return t3;
	}

	/**
	 * 得到中文首字母
	 * 
	 * @param str
	 * @return
	 */
	public static String getPinYinHeadChar(String str) {

		String convert = "";
		HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
		format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
		format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		format.setVCharType(HanyuPinyinVCharType.WITH_V);

		for (int j = 0; j < str.length(); j++) {
			char word = str.charAt(j);
			String[] pinyinArray;
			try {
				pinyinArray = PinyinHelper.toHanyuPinyinStringArray(word,
						format);

				if (pinyinArray != null) {
					convert += pinyinArray[0].charAt(0);
				} else {
					convert += word;
				}
			} catch (BadHanyuPinyinOutputFormatCombination e) {
				e.printStackTrace();
			}
		}

		return convert;
	}

	/**
	 * 得到中文首字母
	 * 
	 * @param str
	 * @return
	 */
	public static String getFirstPinYinHeadChar(String str) {
		String convert = "";
		HanyuPinyinOutputFormat format = new HanyuPinyinOutputFormat();
		format.setCaseType(HanyuPinyinCaseType.UPPERCASE);
		format.setToneType(HanyuPinyinToneType.WITHOUT_TONE);
		format.setVCharType(HanyuPinyinVCharType.WITH_V);
		if (str.length() > 0) {
			char word = str.charAt(0);
			String[] pinyinArray;
			try {
				pinyinArray = PinyinHelper.toHanyuPinyinStringArray(word,
						format);

				if (pinyinArray != null) {
					convert += pinyinArray[0].charAt(0);
				} else {
					convert += word;
				}
			} catch (BadHanyuPinyinOutputFormatCombination e) {
				e.printStackTrace();
			}
		}
		return convert;
	}
	
	public static void main(String[] args) {
		System.out.println(getFirstPinYinHeadChar("中Q国"));
	}
}