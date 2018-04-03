package com.tzt.workLog.tool;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class HtmlRegexpUtil {

	/**
	 * 替换基本标记
	 * @param input
	 * @return String
	 */
	public static String replaceTag(String input) {
		if (!hasSpecialChars(input)) {
			return input;
		}
		StringBuffer filtered = new StringBuffer(input.length());
		char c;
		for (int i = 0; i <= input.length() - 1; i++) {
			c = input.charAt(i);
			switch (c) {
			case '<':
				filtered.append("&lt;");
				break;
			case '>':
				filtered.append("&gt;");
				break;
			case '"':
				filtered.append("&quot;");
				break;
			case '&':
				filtered.append("&amp;");
				break;
			default:
				filtered.append(c);
			}
		}
		return (filtered.toString());
	}

	/**
	 * 反向替换基本标记
	 * @param input
	 * @return String
	 */
	public static String replaceText(String input) {
		input = input.replaceAll(" ", "").replaceAll("&nbsp;", "").replaceAll("\n\r", "").replaceAll("\r\n", "").replaceAll("\n", "").replaceAll("\r", "").replaceAll("<BR>", ".").replaceAll("<br>", ".").replaceAll("<br />", ".").replaceAll("<br/>", ".").replaceAll("\t", "");
		return input;
	}
	
	/**
	 * 反向替换基本标记
	 * @param input
	 * @return String
	 */
	public static String replaceTextByTag(String input) {
		input = input.replaceAll("&ldquo;", "“").replaceAll("&rdquo;", "”").replaceAll("&mdash;", "-").replaceAll("&hellip;", "...");
		return input;
	}
	
	/**
	 * 根据正则取出数据
	 * @return String
	 */
	public static String getTextByTag(String str, String regxpForHtml) {
		Pattern pattern = Pattern.compile(regxpForHtml);
		Matcher matcher = pattern.matcher(str);
		boolean result = matcher.find();
		if (result) {
			return matcher.group();
		} else {
			return "";
		}
	}
	
	/**
	 * 
	 * 判断基本标记是否存在
	 * @param input
	 * @return boolean
	 */
	public static boolean hasSpecialChars(String input) {
		boolean flag = false;
		if ((input != null) && (input.length() > 0)) {
			char c;
			for (int i = 0; i <= input.length() - 1; i++) {
				c = input.charAt(i);
				switch (c) {
				case '>':
					flag = true;
					break;
				case '<':
					flag = true;
					break;
				case '"':
					flag = true;
					break;
				case '&':
					flag = true;
					break;
				}
			}
		}
		return flag;
	}

	/**
	 * 
	 * 过滤正则
	 * @param str
	 * @return String
	 */
	public static String filterHtml(String str, String regxpForHtml) {
		Pattern pattern = Pattern.compile(regxpForHtml);
		Matcher matcher = pattern.matcher(str);
		StringBuffer sb = new StringBuffer();
		boolean result = matcher.find();
		while (result) {
			matcher.appendReplacement(sb, "");
			result = matcher.find();
		}
		matcher.appendTail(sb);
		return sb.toString();
	}

	/**
	 * 替换指定的标签的值
	 * @param str 字符串
	 * @param beforeTag 要替换的标签
	 * @param tagAttrib 要替换的标签属性值
	 * @param startTag 新标签开始标记
	 * @param endTag 新标签结束标记
	 * @return String
	 */
	public static String replaceHtmlTag(String str, String beforeTag, String tagAttrib, String startTag, String endTag) {
		String regxpForTag = "<[url=file://s/]\\s[/url]*" + beforeTag + "[url=file://s+([%5e%3e]*)//s]\\s+([^>]*)\\s[/url]*>";
		String regxpForTagAttrib = tagAttrib + "=\"([^\"]+)\"";
		Pattern patternForTag = Pattern.compile(regxpForTag);
		Pattern patternForAttrib = Pattern.compile(regxpForTagAttrib);
		Matcher matcherForTag = patternForTag.matcher(str);
		StringBuffer sb = new StringBuffer();
		boolean result = matcherForTag.find();
		while (result) {
			StringBuffer sbreplace = new StringBuffer();
			Matcher matcherForAttrib = patternForAttrib.matcher(matcherForTag.group(1));
			if (matcherForAttrib.find()) {
				matcherForAttrib.appendReplacement(sbreplace, startTag + matcherForAttrib.group(1) + endTag);
			}
			matcherForTag.appendReplacement(sb, sbreplace.toString());
			result = matcherForTag.find();
		}
		matcherForTag.appendTail(sb);
		return sb.toString();
	}
	
}