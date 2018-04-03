package com.tzt.workLog.tool;

import org.apache.commons.beanutils.BeanUtils;
import org.apache.commons.beanutils.PropertyUtilsBean;

public class ObjectUtil {

	private ObjectUtil() {

	}

	/**
	 * 读取静态属性
	 * 
	 * @param class1
	 *            类
	 * @param name
	 *            静态属性
	 * @return
	 */
	public static Object getStaticProperty(Class class1, String name) {

		try {
			return class1.getField(name).get(null);
		} catch (Exception e) {
			throw new RuntimeException("Could not get Static Property[" + name
					+ "]", e);
		}
	}

	/**
	 * 读取对像的属性值(不能嵌套读取)
	 * 
	 * @param object
	 *            对象
	 * @param name
	 *            属性名称
	 * @return
	 */
	public static Object getProperty(Object object, String name) {

		try {
			// return BeanUtils.getProperty(model, propertyName);
			return new PropertyUtilsBean().getProperty(object, name);
		} catch (Exception e) {
			throw new RuntimeException("Could not getProperty[" + name + "]", e);
		}
	}

	/**
	 * 读取对像的属性值(可嵌套读取)
	 * 
	 * @param object
	 *            对象
	 * @param nestedName
	 *            嵌套属性名称 eg：user.name
	 * @return
	 */
	public static Object getNestedProperty(Object object, String nestedName) {

		if (nestedName.indexOf(".") == -1) {
			return getProperty(object, nestedName);
		}

		String[] names = nestedName.split("\\.");
		for (int i = 0; i < names.length; i++) {
			object = getProperty(object, names[i]);
		}
		return object;
	}

	/**
	 * 设置对像的属性值
	 * 
	 * @param object
	 *            对象
	 * @param name
	 *            属性
	 * @param value
	 *            值
	 */
	public static void setProperty(Object object, String name, Object value) {

		try {
			BeanUtils.setProperty(object, name, value);
		} catch (Exception e) {
			throw new RuntimeException("Could not setProperty[" + name + "]", e);
		}
	}

	/**
	 * 创建对象实例
	 * 
	 * @param class1
	 *            类
	 * @return
	 */
	public static Object createInstance(Class class1) {

		try {
			return class1.newInstance();
		} catch (Exception e) {
			throw new RuntimeException("Could not create instance", e);
		}
	}

	/**
	 * 创建对家实例
	 * 
	 * @param className
	 *            类名
	 * @return
	 */
	public static Object createInstance(String className) {

		try {
			return Class.forName(className).newInstance();
		} catch (Exception e) {
			throw new RuntimeException("Could not create instance[" + className
					+ "]", e);
		}
	}

}
