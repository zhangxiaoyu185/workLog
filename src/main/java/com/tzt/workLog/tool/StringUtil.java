package com.tzt.workLog.tool;

import java.io.UnsupportedEncodingException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.text.MessageFormat;
import java.util.Date;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import com.tzt.workLog.tool.DateUtil;

public class StringUtil {

	private static char[] hexDigits = { '0', '1', '2', '3', '4', '5', '6', '7',
			'8', '9', 'A', 'B', 'C', 'D', 'E', 'F' };

	/**
	 * 字符串转换成double 数
	 * 
	 * @param strDouble
	 * @return
	 */
	public static double toDouble(String strDouble) {
		if (strDouble == null || strDouble.trim().length() == 0) {
			return 0d;
		}
		try {
			return Double.parseDouble(strDouble);
		} catch (Exception e) {
			return 0d;
		}
	}

	/**
	 * 字符串转换成int 数
	 * 
	 * @param strInt
	 * @return
	 */
	public static int toInt(String strInt) {
		if (strInt == null || strInt.trim().length() == 0) {
			return 0;
		}
		try {
			return Integer.parseInt(strInt);
		} catch (Exception e) {
			return 0;
		}
	}

	/**
	 * 字符串是否为空
	 * 
	 * @param input
	 * @return
	 */
	public static boolean isEmpty(String input) {
		return input == null || input.trim().isEmpty();
	}

	/**
	 * 把指定的数据转化为16进制格式的字符串
	 * 
	 * @param data
	 *            待转化的数据
	 * @return 16进制表示的数据
	 */
	public static String toHexString(byte[] data) {
		return toHexString(data, 0, data.length);
	}

	/**
	 * 把指定的数据转化为16进制格式的字符串， 如toHexString({8,9,12,4},1,3) = "090C"
	 * 
	 * @param data
	 *            待转化的数据
	 * @param beginIndex
	 *            需转化的数据的起始索引
	 * @param endIndex
	 *            需转化的数据的结束索引
	 * @return 16进制表示的数据
	 */
	public static String toHexString(byte[] data, int beginIndex, int endIndex) {
		if (data == null || beginIndex < 0)
			return null;
		StringBuilder strBuilder = new StringBuilder();
		for (int i = beginIndex; i < endIndex; i++) {
			strBuilder.append(hexDigits[data[i] >>> 4 & 0xf]);
			strBuilder.append(hexDigits[data[i] & 0xf]);
		}
		return strBuilder.toString();
	}

	/**
	 * 返回16进制的MDS加密串
	 * 
	 * @param str
	 *            需要加密的字符串
	 * @return
	 */
	public static String md5Encrypt(String str) {
		if (Validators.isEmpty(str)) {
			return null;
		}
		try {
			MessageDigest messageDigest = MessageDigest.getInstance("MD5");
			messageDigest.reset();
			return toHexString(messageDigest.digest(str.getBytes("UTF-8")));
		} catch (NoSuchAlgorithmException e) {
			throw new RuntimeException(e);
		} catch (UnsupportedEncodingException e) {
			throw new RuntimeException(e);
		}
	}

	/**
	 * 字符串处理，如果字符串为空，则返加null,否则返回 str.trim()
	 * 
	 * @param str
	 *            字符串
	 * @return
	 */
	public static String trimNull(String str) {
		if (Validators.isEmpty(str)) {
			return null;
		}
		return str.trim();
	}

	/**
	 * 使用<code>MessageFormat</code>格式化字符串.
	 *
	 * @param message
	 *            要格式化的字符串
	 * @param params
	 *            参数表
	 * @return 格式化的字符串，如果message为<code>null</code>，则返回<code>null</code>
	 */
	public static String formatMessage(String message, Object... params) {
		if ((message == null) || (params == null) || (params.length == 0)) {
			return message;
		}

		return MessageFormat.format(message, params);
	}

	/**
	 * 使用java正则表达式去掉多余的.与0
	 * 
	 * @param s
	 * @return
	 */
	public static String subZeroAndDot(String s) {
		if (s.indexOf(".") > 0) {
			s = s.replaceAll("0+?$", "");// 去掉多余的0
			s = s.replaceAll("[.]$", "");// 如最后一位是.则去掉
		}
		return s;
	}

	/**
	 * 隐藏用户的名字
	 * 
	 * @param fullName
	 * @return
	 */
	public static String maskUserName(String fullName) {
		if (StringUtil.isEmpty(fullName)) {
			return "";
		}
		char firstName = fullName.charAt(0);

		return firstName + "**";
	}

	/**
	 * 返回规定数字的文字内容，多余的补“......”
	 * 
	 * @param longContent
	 * @param showNum
	 * @return
	 */
	public static String maskLongString(String longContent, int showNum) {
		if (longContent == null)
			return "";
		if (longContent.length() < showNum)
			return longContent;
		String result = longContent.substring(0, showNum) + "...";
		return result;
	}

	/**
	 * 用有效地身份证号，获得年龄的字符串
	 * 
	 * @param idCard
	 * @return
	 */
	public static String idCardToAgeStr(String idCard) {
		int age = 0;
		String yearStr = null;
		int nowYear = DateUtil.getYear(new Date());
		if (idCard != null && StringUtil.trimNull(idCard) != "") {
			yearStr = StringUtil.trimNull(idCard).substring(6, 10);
			if (Validators.isNumber(yearStr)) {
				age = nowYear - Integer.parseInt(yearStr);
			}
		}
		return String.valueOf(age);
	}

	public static String trim(String str) {
		return str == null ? "" : str.trim();
	}

	public static String escapeHTML(String value) {
		if (value == null || value.length() == 0) {
			return value;
		}
		StringBuffer result = null;
		String filtered = null;
		for (int i = 0; i < value.length(); i++) {
			filtered = null;
			switch (value.charAt(i)) {
			case '<':
				filtered = "&lt;";
				break;
			case '>':
				filtered = "&gt;";
				break;
			case '&':
				filtered = "&amp;";
				break;
			case '"':
				filtered = "&quot;";
				break;
			case '\'':
				filtered = "&#39;";
				break;
			}
			if (result == null) {
				if (filtered != null) {
					result = new StringBuffer(value.length() + 50);
					if (i > 0) {
						result.append(value.substring(0, i));
					}
					result.append(filtered);
				}
			} else {
				if (filtered == null) {
					result.append(value.charAt(i));
				} else {
					result.append(filtered);
				}
			}
		}

		return result == null ? value : result.toString();
	}

	/**
	 * 截取包含html标签的字符串，如果文本超过length个字符，多余的将用replaceStr显示
	 * 
	 * @param sourceStr
	 *            : 要截取的字符串
	 * @param length
	 *            : 需要显示的长度
	 * @param replaceStr
	 *            : 多余的字段，将用 replaceStr代替，如(replaceStr="...")
	 * @return Object
	 * 
	 */
	public static String abbreviate(String sourceStr, int length,
			String replaceStr) {
		if (sourceStr == null || "".equals(sourceStr)) {
			return "";
		}
		String destStr = Html2Text(sourceStr);
		if (destStr.length() > length) {
			destStr = destStr.substring(0, length - 1) + replaceStr;
		}
		return destStr;
	}

	/**
	 * 截取包含html标签的字符串
	 * 
	 * @param str
	 *            : 要截取的字符串
	 * @return 去掉html标签后的纯文本
	 */
	public static String Html2Text(String sourceStr) {
		String htmlStr = sourceStr; // 含html标签的字符串
		String textStr = "";
		java.util.regex.Pattern p_script;
		java.util.regex.Matcher m_script;
		java.util.regex.Pattern p_style;
		java.util.regex.Matcher m_style;
		java.util.regex.Pattern p_html;
		java.util.regex.Matcher m_html;
		java.util.regex.Pattern p_html1;
		java.util.regex.Matcher m_html1;
		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script>
			// }
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style>
			// }
			String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式
			String regEx_html1 = "<[^>]+";
			p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
			m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll(""); // 过滤html标签

			p_html1 = Pattern.compile(regEx_html1, Pattern.CASE_INSENSITIVE);
			m_html1 = p_html1.matcher(htmlStr);
			htmlStr = m_html1.replaceAll(""); // 过滤html标签
			htmlStr = htmlStr.replaceAll("&nbsp;", "");
			textStr = htmlStr;
		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}

		return textStr;// 返回文本字符串
	}

	/**
	 * 
	 * 2013-08-05 ZengBiao -规范化金额格式 2013-07-17 Zengbiao -Initial
	 * 2个字符串（其实是数值），的和；如addAsDouble("8.00","3.00") = "11.00";
	 * 
	 * @param firstStr
	 * @param secStr
	 * @return
	 */
	public static String addAsDouble(String firstStr, String secStr) {
		double resultDoubleVal = 0.0;
		double firstDoubleVal = 0.0;
		double secDoubleVal = 0.0;
		String result = null;
		if (firstStr != null && !"".equals(firstStr)) {
			firstDoubleVal = Double.parseDouble(firstStr);
		}
		if (secStr != null && !"".equals(secStr)) {
			secDoubleVal = Double.parseDouble(secStr);
		}
		resultDoubleVal = firstDoubleVal + secDoubleVal;
		result = String.valueOf(resultDoubleVal);
		result = getUniversalFeeFormat(result);
		return result;
	}

	/**
	 * 将字符串形式的金额统一起来，目前都显示2位小数点
	 * 
	 * @param feeStr
	 * @return
	 */
	public static String getUniversalFeeFormat(String feeStr) {
		String resultStr = "";
		if (StringUtil.isEmpty(feeStr))
			return "";
		int dotLoc = feeStr.indexOf(".");
		int length = feeStr.length();
		if (dotLoc == -1) {
			// 没有小数点，则补充2位
			resultStr = feeStr + ".00";
		} else if (dotLoc == 0) {
			// 没有小数点，如.2756或.1
			resultStr = "0" + feeStr;
			resultStr = getUniversalFeeFormat(resultStr);
		} else if (length - dotLoc == 2) {
			// 如3.4，将它转化为3.40
			resultStr = feeStr + "0";
		} else if (length - dotLoc == 3) {
			// 如3.40，不需要改变
			resultStr = feeStr;
		} else if (length - dotLoc > 3) {
			// 如3.14159265
			resultStr = feeStr.substring(0, dotLoc + 3);
		} else if (length - dotLoc == 1) {
			// 如312. 较少见，补充00
			resultStr = feeStr + "00";
		}

		return resultStr;
	}

	/**
	 * 根据分隔符来分割数字串 example:"1-9",解析后结构就是[1,2,3,4,5,6,7,8,9], "1;2;4;5"
	 * 分割后结果就是[1,2,4,5], 暂时只支持这两种格式的解析
	 * 
	 * @param numArea
	 * @param delimiter
	 * @return
	 */
	public static String[] parseNumArea(String numArea) {
		String[] noArray;
		if (numArea.indexOf("-") > 0) {
			String[] nums = numArea.split("-");
			int first = Integer.parseInt(nums[0]);
			int last = Integer.parseInt(nums[1]);
			noArray = new String[last - first + 1];
			for (int i = 0, j = first; j <= last; i++, j++) {
				noArray[i] = j + "";
			}
		} else {
			noArray = numArea.split(";");
		}

		return noArray;
	}

	public static boolean isDoubleString(String inputStr) {
		try {
			Double.valueOf(inputStr);
		} catch (Exception e) {
			return false;
		}

		return true;
	}

	public static boolean isChinese(char c) {
		Character.UnicodeBlock ub = Character.UnicodeBlock.of(c);
		if (ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_COMPATIBILITY_IDEOGRAPHS
				|| ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_A
				|| ub == Character.UnicodeBlock.CJK_UNIFIED_IDEOGRAPHS_EXTENSION_B
				|| ub == Character.UnicodeBlock.CJK_SYMBOLS_AND_PUNCTUATION
				|| ub == Character.UnicodeBlock.HALFWIDTH_AND_FULLWIDTH_FORMS
				|| ub == Character.UnicodeBlock.GENERAL_PUNCTUATION) {
			return true;
		}

		return false;
	}

	/**
	 * 生成特定前缀的唯一字符串
	 * 
	 * @param prefix
	 * @return
	 */
	public static String generateUniqueSequence(String prefix) {
		return prefix + System.nanoTime();
	}

	/**
	 * 验证邮箱
	 * 
	 * @param email
	 * @return
	 */
	public static boolean checkEmail(String email) {
		boolean flag = false;
		try {
			String check = "^([a-z0-9A-Z]+[-|_|\\.]?)+[a-z0-9A-Z]@([a-z0-9A-Z]+(-[a-z0-9A-Z]+)?\\.)+[a-zA-Z]{2,}$";
			Pattern regex = Pattern.compile(check);
			Matcher matcher = regex.matcher(email);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	/**
	 * 验证手机号码
	 * 
	 * @param mobiles
	 * @return
	 */
	public static boolean checkMobileNumber(String mobileNumber) {
		boolean flag = false;
		try {
			Pattern regex = Pattern
					.compile("^(((13[0-9])|(15([0-3]|[5-9]))|(18[0,5-9]))\\d{8})|(0\\d{2}-\\d{8})|(0\\d{3}-\\d{7})$");
			Matcher matcher = regex.matcher(mobileNumber);
			flag = matcher.matches();
		} catch (Exception e) {
			flag = false;
		}
		return flag;
	}

	/**
	 * 根据输入的字符串，生成指定长度的随机字符串
	 * 
	 * @param strPool
	 * @param length
	 * @return
	 */
	public static String randomString(String strPool, int length) {
		if (strPool == null || length < 1) {
			return null;
		}

		Random randGen = new Random();
		char[] numbersAndLetters = (strPool).toCharArray();

		char[] randBuffer = new char[length];
		for (int i = 0; i < randBuffer.length; i++) {
			randBuffer[i] = numbersAndLetters[randGen.nextInt(strPool.length())];
		}
		return new String(randBuffer);
	}

}