package com.tzt.workLog.tool;

/**
 * 基础数据类型验证模块
 *
 */
public final class Validators {

	public static boolean isEmail(String value) {

		return !isEmpty(value) && value.indexOf("@") > 0;
	}

	/**
	 * 当判断数组是为null或长度为0是返回 <code>true</code>
	 * 
	 * @param args
	 * @return
	 */
	public static boolean isEmpty(Object[] args) {

		return args == null || args.length == 0;
	}

	public static boolean isEmpty(String value) {

		return value == null || value.trim().length() == 0;
	}

	public static boolean isNumber(String value) {
		if (isEmpty(value)) {
			return false;
		}

		for (int i = 0; i < value.length(); i++) {
			if (value.charAt(i) > '9' || value.charAt(i) < '0') {
				return false;
			}
		}
		return true;
	}

	public static boolean isFloat(String value) {

		if (isEmpty(value)) {
			return false;
		}

		for (int i = 0; i < value.length(); i++) {
			if ((value.charAt(i) > '9' || value.charAt(i) < '0')
					&& value.charAt(i) != '.' && value.charAt(i) != '-') {
				return false;
			}
		}
		return true;
	}

	public static boolean isNumber(String value, int min, int max) {

		if (!isNumber(value)) {
			return false;
		}

		int number = Integer.parseInt(value);
		return number >= min && number <= max;
	}

	public static boolean isString(String value, int minLength, int maxLength) {

		if (value == null) {
			return false;
		}

		if (minLength < 0) {
			return value.length() <= maxLength;
		}
		else if (maxLength < 0) {
			return value.length() >= minLength;
		}
		else {
			return value.length() >= minLength && value.length() <= maxLength;
		}
	}

	public static boolean isTime(String value) {

		if (isEmpty(value) || value.length() > 8) {
			return false;
		}

		String[] items = value.split(":");

		if (items.length != 2 && items.length != 3) {
			return false;
		}

		for (int i = 0; i < items.length; i++) {
			if (items[i].length() != 2 && items[i].length() != 1) {
				return false;
			}
		}

		return !(!isNumber(items[0], 0, 23) || !isNumber(items[1], 0, 59) || (items.length == 3 && !isNumber(
				items[2], 0, 59)));
	}

	private Validators() {

	}

}
