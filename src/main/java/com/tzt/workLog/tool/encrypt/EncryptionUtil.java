package com.tzt.workLog.tool.encrypt;

import java.security.MessageDigest;
import java.security.SecureRandom;

import javax.crypto.Cipher;
import javax.crypto.SecretKey;
import javax.crypto.SecretKeyFactory;
import javax.crypto.spec.DESKeySpec;

import com.tzt.workLog.tool.StringUtil;


public class EncryptionUtil {

	/**
	 * 取得以DES算法加密后的数据
	 * 
	 * @param key
	 *            des密钥
	 * @param input
	 *            明文
	 * @return 以DES算法加密后的数据，16进制的格式返回
	 */
	public static String getDESEncrptedString(String key, String input) {
		try {
			// DES算法要求有一个可信任的随机数源
			SecureRandom sr = new SecureRandom();
			// 从原始密匙数据创建DESKeySpec对象
			DESKeySpec dks = new DESKeySpec(key.getBytes());
			// 创建一个密匙工厂，然后用它把DESKeySpec转换成一个SecretKey对象
			SecretKeyFactory keyFactory = SecretKeyFactory.getInstance("DES");
			SecretKey securekey = keyFactory.generateSecret(dks);
			// Cipher对象实际完成加密操作
			Cipher cipher = Cipher.getInstance("DES");
			// 用密匙初始化Cipher对象
			cipher.init(Cipher.ENCRYPT_MODE, securekey, sr);
			// 获取数据并加密正式执行加密操作
			return StringUtil.toHexString(cipher.doFinal(input.getBytes()));
		} catch (Exception e) {
			throw new RuntimeException("Error to encrypt data.", e);
		}
	}

	public final static String genMd5Value(String input) {
		if (input == null)
			return null;
		try {
			MessageDigest md = MessageDigest.getInstance("MD5");
			md.update(input.getBytes());
			return StringUtil.toHexString(md.digest());
		} catch (Exception e) {
			throw new RuntimeException("Error to generate MD5 data.");
		}
	}

}
