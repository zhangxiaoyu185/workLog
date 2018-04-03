package com.tzt.workLog.tool;

public class BytesClass {

	static public byte[] ShortToBytes(short nValues) throws Exception {
		byte[] pData = new byte[2];
		pData[0] = (byte) nValues;
		pData[1] = (byte) ((nValues >> 8) & 0xff);
		return pData;
	}

	static public byte[] IntToBytes(int nValues) throws Exception {
		byte[] pData = new byte[4];

		pData[0] = (byte) nValues;
		pData[1] = (byte) ((nValues >> 8) & 0xff);
		pData[2] = (byte) ((nValues >> 16) & 0xff);
		pData[3] = (byte) ((nValues >> 24) & 0xff);

		return pData;
	}

	static public String BytesToString(byte[] pData, int nBegin, int nEnd) {
		try {
			if (pData != null && (nBegin + nEnd) <= pData.length) {
				return (new String(pData, nBegin, nEnd, "GBK"));
			}
		} catch (Exception e) {
		}
		return "";
	}

	static public String BytesToString(byte[] pData, int nBegin, int nEnd,
			String Encoding) {
		try {
			if (pData != null && (nBegin + nEnd) <= pData.length) {
				return (new String(pData, nBegin, nEnd, Encoding));
			}
		} catch (Exception e) {
		}
		return "";
	}

	static public short BytesToShort(byte[] pData, int nBegin) {
		if (pData != null && (nBegin + 2) <= pData.length) {
			return (short) (((pData[nBegin + 1] & 0x000000ff) << 8) + (pData[nBegin] & 0x000000ff));
		}
		return 0;
	}

	static public int BytesToInt(byte[] pData, int nBegin) throws Exception {
		if (pData != null && (nBegin + 4) <= pData.length) {
			int tmp = (((pData[nBegin + 3] & 0x000000ff) << 24)
					+ ((pData[nBegin + 2] & 0x000000ff) << 16)
					+ ((pData[nBegin + 1] & 0x000000ff) << 8) + (pData[nBegin] & 0x000000ff));
			if (tmp == 0x7fffffff/* Integer.MAX_VALUE */) {
				tmp = 0;
			}
			return tmp;
		}

		return 0;
	}

	static public short[] IntToShort(int nValues) throws Exception {
		short[] pShort = new short[2];
		byte[] pData = IntToBytes(nValues);
		pShort[0] = BytesToShort(pData, 0);
		pShort[1] = BytesToShort(pData, 2);
		return pShort;
	}

	public static byte[] DoubleToBytes(double d) {
		byte[] pData = new byte[8];
		long l = Double.doubleToLongBits(d);
		pData[0] = (byte) l;
		pData[1] = (byte) ((l >> 8) & 0xff);
		pData[2] = (byte) ((l >> 16) & 0xff);
		pData[3] = (byte) ((l >> 24) & 0xff);
		pData[4] = (byte) ((l >> 32) & 0xff);
		pData[5] = (byte) ((l >> 40) & 0xff);
		pData[6] = (byte) ((l >> 48) & 0xff);
		pData[7] = (byte) ((l >> 56) & 0xff);
		return pData;
	}

	// 字节到浮点转换
	public static double BytesToDouble(byte[] pData, int nBegin) {
		if (pData != null && (nBegin + 8) <= pData.length) {
			long tmp = ((((long) (pData[nBegin + 7] & 0x000000ff)) << 56)
					+ (((long) (pData[nBegin + 6] & 0x000000ff)) << 48)
					+ (((long) (pData[nBegin + 5] & 0x000000ff)) << 40)
					+ (((long) (pData[nBegin + 4] & 0x000000ff)) << 32)
					+ (((long) (pData[nBegin + 3] & 0x000000ff)) << 24)
					+ ((pData[nBegin + 2] & 0x000000ff) << 16)
					+ ((pData[nBegin + 1] & 0x000000ff) << 8) + (pData[nBegin] & 0x000000ff));
			return Double.longBitsToDouble(tmp);
		}
		return 0;
	}

	// static public int ReadDataHead(DataHead DataHead, short nType, byte[]
	// pData, int nBegin) throws Exception {
	// if (pData == null && DataHead == null) {
	// return 0;
	// }
	// DataHead.m_nType = nType;
	//
	// if (DataHead.m_nType == -1) {
	// return nBegin;
	// }
	// DataHead.m_nIndex = pData[nBegin];
	// nBegin += 1;
	// if (DataHead.m_nIndex == -1) {
	// return nBegin;
	// }
	// DataHead.m_cSrv = pData[nBegin];
	// nBegin += 1;
	// if (DataHead.m_cSrv == -1) {
	// return nBegin;
	// }
	// DataHead.m_lKey = BytesToInt(pData, nBegin);
	// nBegin += 4;
	// if (DataHead.m_lKey == -1) {
	// return nBegin;
	// }
	// DataHead.m_nPrivateKey.m_cCodeType = BytesToShort(pData, nBegin);
	// nBegin += 2;
	// if (DataHead.m_nPrivateKey.m_cCodeType == -1) {
	// return nBegin;
	// }
	// DataHead.m_nPrivateKey.m_cCode = BytesToString(pData, nBegin, 6);
	// nBegin += 6;
	//
	// return nBegin;
	// }

	public static String TrimStr(String s) {
		int t = s.indexOf(0);
		if (t > 0)
			return s.substring(0, t);
		return s;
	}

	public static String convertString(String gbk) {
		String utf8 = "";
		try {
			utf8 = new String(gbk2utf8(gbk), "UTF-8");
		} catch (Exception e) {
		}
		return utf8;
	}

	public static String unicodeToBinary(String content) {
		String hexStr = "";
		try {
			char contentBuffer[] = content.toCharArray();
			for (int i = 0; i < content.length(); i++) {
				int n = contentBuffer[i];
				String s = Integer.toHexString(n);
				if (s.length() > 4)
					s = s.substring(0, 4);
				else
					s = "0000".substring(0, 4 - s.length()) + s;
				hexStr = hexStr + "&#x" + s + ";";
			}

		} catch (Exception ex) {
			hexStr = "";
		}
		return hexStr;
	}

	public static byte[] gbk2utf8(String chenese) {
		char c[] = chenese.toCharArray();
		byte[] fullByte = new byte[3 * c.length];
		for (int i = 0; i < c.length; i++) {
			int m = (int) c[i];
			String word = Integer.toBinaryString(m);

			StringBuffer sb = new StringBuffer();
			int len = 16 - word.length();
			for (int j = 0; j < len; j++) {
				sb.append("0");
			}
			sb.append(word);
			sb.insert(0, "1110");
			sb.insert(8, "10");
			sb.insert(16, "10");

			String s1 = sb.substring(0, 8);
			String s2 = sb.substring(8, 16);
			String s3 = sb.substring(16);

			byte b0 = Integer.valueOf(s1, 2).byteValue();
			byte b1 = Integer.valueOf(s2, 2).byteValue();
			byte b2 = Integer.valueOf(s3, 2).byteValue();
			byte[] bf = new byte[3];
			bf[0] = b0;
			fullByte[i * 3] = bf[0];
			bf[1] = b1;
			fullByte[i * 3 + 1] = bf[1];
			bf[2] = b2;
			fullByte[i * 3 + 2] = bf[2];
		}
		return fullByte;
	}

	public static byte[] RC4(byte[] inp, int len, String key) {
		key = "19781117";
		int[] S = new int[256];
		int[] K = new int[256];
		int i, j, t, x, Y, temp;
		// char o;
		byte outp[] = new byte[len];
		j = 0;
		for (i = 0; i < 256; i++) {
			S[i] = (i + 1);
			if (j > key.length()/* strlen(key) */- 1)
				j = 0;
			K[i] = (int) (key.charAt(j));
			j = j + 1;
		}
		j = 0;
		for (i = 0; i < 256; i++) {
			j = (j + S[i] + K[i]) % 256;
			temp = S[i];
			S[i] = S[j];
			S[j] = temp;
		}
		i = 0;
		j = 0;
		for (x = 0; x < len; x++) {
			i = (i + 1) % 256;
			j = (j + S[i]) % 256;
			temp = S[i];
			S[i] = S[j];
			S[j] = temp;
			t = (S[i] + S[j]) % 256;
			Y = S[t];
			outp[x] = (byte) (inp[x] ^ Y);
		}
		return outp;
	}

}