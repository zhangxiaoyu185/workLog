package com.tzt.workLog.tool;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.Properties;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 文件读写操作应用模块
 * 
 * @author Bergson
 * 
 */
public class FileUtil {

	private static Logger logger = LoggerFactory.getLogger("BASE_LOGGER");
	
	private static final int BUFFER_SIZE = 16 * 1024;

	/**
	 * 将文件转成字节流
	 * 
	 * @param fileName
	 *            文件名(完整路径)
	 * @return
	 */
	public static byte[] getBytes(String fileName) {

        if(!(new File(fileName).exists())){
            return null;
        }

		try {
			BufferedInputStream buf = new BufferedInputStream(
					new FileInputStream(fileName));
			ByteArrayOutputStream outByte = new ByteArrayOutputStream();
			byte[] b = new byte[1024];
			int i = 0;
			while ((i = buf.read(b, 0, 1024)) != -1) {
				outByte.write(b, 0, i);
			}
			outByte.flush();
			buf.close();
			return outByte.toByteArray();
		} catch (IOException e) {
			logger.error("Read file error! ", e);
			return null;
		}
	}
	
	/**
	 * 将文件转成字节流
	 * 
	 * @param folder
	 *            文件夹
	 * @param fileName
	 *            文件名称
	 * @return
	 */
	public static byte[] getBytes(String folder, String fileName) {

		return getBytes(getFolder(folder) + fileName);
	}

	/**
	 * 将字节流转成文件
	 * 
	 * @param sourceBytes
	 *            源字节流
	 * @param targetFolder
	 *            目标文件夹
	 * 
	 */
	public static void writeBytes(byte[] sourceBytes, String targetFile) {

		try {
			int index = targetFile.lastIndexOf(File.separator);
			if (index != -1) {
				FileUtil.makedirs(targetFile.substring(0, index));
			}

			FileOutputStream fileOutputStream = new FileOutputStream(targetFile);
			fileOutputStream.write(sourceBytes);

			fileOutputStream.close();
		} catch (IOException e) {
			logger.error("Save file error! ", e.getMessage());
			e.printStackTrace();
		}
	}

	/**
	 * 创建文件夹，若文件夹已存在，则不创建
	 * 
	 * @param path
	 *            文件夹路径
	 */
	public static void makedirs(String path) {

		if (!Validators.isEmpty(File.separator)) {
			File dir = new File(path);
			if (!dir.exists()) {
				dir.mkdirs();
			}
		}
	}

	/**
	 * 将字节流转成文件
	 * 
	 * @param sourceBytes
	 *            源字节流
	 * @param targetFolder
	 *            目标文件夹
	 * @param targetFile
	 *            目标文件名称
	 */
	public static void writeBytes(byte[] sourceBytes, String targetFolder,
			String targetFile) {

		writeBytes(sourceBytes, getFolder(targetFolder) + targetFile);
	}

	private static String getFolder(String folder) {

		if (Validators.isEmpty(folder)) {
			folder = File.separator;
		}

		if (!File.separator.equals(folder.substring(folder.length() - 1))) {
			folder = folder + File.separator;
		}
		return folder;
	}

	/**
	 * 读取roperties文件
	 * 
	 * @param fileName
	 *            文件名 eg:D:/temp.properties
	 * @return
	 */
	public static Properties getProperties(String fileName) {

		Properties result = new Properties();// 属性集合对象
		FileInputStream fis = null;
		try {
			fis = new FileInputStream(fileName);
			result.load(fis);// 将属性文件流装载到Properties对象中

		} catch (Exception e) {
			logger.error("Save file error! " + e.getMessage());
			e.printStackTrace();
		} finally {
			try {
				if (fis != null) {
					fis.close();
				}
			} catch (IOException e) {
				logger.error("Save file error! " + e.getMessage());
				e.printStackTrace();
			}
		}

		return result;
	}

	/**
	 * 保存properties 文件
	 * 
	 * @param savedProp
	 *            需要保存的properties文件
	 * @param targetFile
	 *            保存文件名 eg:D:/temp.properties
	 */
	public static void writeProperties(Properties savedProp, String targetFile) {

		writeProperties(savedProp, null, targetFile);
	}

	/**
	 * 保存properties文件
	 * 
	 * @param savedProp
	 *            需要保存的properties文件
	 * @param comments
	 *            properties文件注释
	 * @param targetFile
	 *            保存文件名 eg:D:/temp.properties
	 */
	public static void writeProperties(Properties savedProp, String comments,
			String targetFile) {

		FileOutputStream fout = null;
		try {
			fout = new FileOutputStream(targetFile);
			savedProp.store(fout, comments);
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (fout != null) {
					fout.close();
				}
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	/**
	 * 删除文件
	 * 
	 * @param pathname
	 * 			文件名（包括路径）
	 */
	public static void deleteFile(String pathname){
		
		File file = new File(pathname);
		if(file.isFile() && file.exists()){
			file.delete();
		}
		else{
			logger.error("File["+ pathname +"] not exists!");
		}
		
	}
	
	/**
	 * 将二进制转保存成临时文件
	 *
	
	 * @param dirStr
	 *            路径
	 * @param fileName
	 *            文件名称
	 * @param bytes
	 *            二进制数组
	 * @return
	 */
	public static boolean saveTempFile(String dirStr, String fileName,
			byte[] bytes) {

		File dirFile = new File(dirStr);
		if (!dirFile.exists()) {
			dirFile.mkdirs();
		}
		File saveFile = new File(dirStr + getFileSeparator() + fileName);
		if(saveFile.exists()){
			saveFile.delete();
		}
		try {
			FileOutputStream os = new FileOutputStream(dirStr
					+ getFileSeparator() + fileName);
			os.write(bytes);
			os.flush();
			os.close();
			return true;
		} catch (IOException e) {
			logger.error("IOException",e);
		}

		return false;
	}

	/**
	 * 文件拷贝
	 *
	 * @param src
	 *            源文件
	 * @param dst
	 *            目标文件
	 * @throws Exception
	 */
	public static void copy(File src, File dst) throws Exception {
		try {
			InputStream in = null;
			OutputStream out = null;
			try {
				in = new BufferedInputStream(new FileInputStream(src),
						BUFFER_SIZE);
				out = new BufferedOutputStream(new FileOutputStream(dst),
						BUFFER_SIZE);
				byte[] buffer = new byte[BUFFER_SIZE];
				while (in.read(buffer) > 0) {
					out.write(buffer);
				}
			} finally {
				if (null != in) {
					in.close();
				}
				if (null != out) {
					out.close();
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
	}

	/**
	 * 获取文件扩展名
	 *
	 * @param fileName
	 *            文件名
	 * @return
	 */
	public static String getExtention(String fileName) {
		int pos = fileName.lastIndexOf(".");
		return fileName.substring(pos);
	}

	/**
	 * 获取文件分隔符
	 *
	 * @return
	 */
	public static String getFileSeparator() {
		return File.separator;
	}

	/**
	 * 获取相对路径
	 *
	 * @param params
	 * 			按参数先后位置得到相对路径
	 * @return
	 */
	public static String getRelativePath(String... params){

		if(null != params){
			String path = "";
			for(String str : params){
				path = path + getFileSeparator() + str;
			}

			return path;
		}

		return null;
	}
	/**
	 * 把一个字符串写到指定文件中
	 * @param str
	 * @param path
	 * @param fileName
	 */
    public static void writeStringToFile(String str,String path,String fileName){
    	try {
    		File fileDir = new File(path);
        	if(!fileDir.exists()){
        		fileDir.mkdirs();
        	}
        	File file = new File(path+fileName);
    		if(!file.exists()){
        		file.createNewFile();
        	}
			FileWriter fw = new FileWriter(file,true);
			fw.write(str);
			fw.flush();
			fw.close();
		} catch (IOException e) {
			logger.error("load in file error");
		}
    }
    
    public static String readStringFromFile(String path,String fileName){
    	StringBuffer fileInString = null;
    	File fileDir = new File(path);
    	if(!fileDir.exists()){
    		return null;
    	}
    	File file = new File(path+fileName);
    	if(!file.exists()){
    		return null;
    	}
    	try {
			BufferedReader br = new BufferedReader(new FileReader(file));
			String str = "";
			while((str = br.readLine()) != null){
				fileInString = fileInString.append(str);
			}
			br.close();
		} catch (Exception e) {
			logger.error("read file error");
			return null;
		}
    	return fileInString.toString();
    }
	/**
	 * 把含html标签的富文本字符串转化成纯文本
	 *
	 * @param inputString
	 *            待转换的字符串
	 * @return
	 */
	public static String htmlToTxt(String inputString) {

		String htmlStr = inputString; // 含html标签的字符串
		String textStr = "";
		java.util.regex.Pattern p_script;
		java.util.regex.Matcher m_script;
		java.util.regex.Pattern p_style;
		java.util.regex.Matcher m_style;
		java.util.regex.Pattern p_html;
		java.util.regex.Matcher m_html;

		try {
			String regEx_script = "<[\\s]*?script[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?script[\\s]*?>"; // 定义script的正则表达式{或<script[^>]*?>[\\s\\S]*?<\\/script>
																										// }
			String regEx_style = "<[\\s]*?style[^>]*?>[\\s\\S]*?<[\\s]*?\\/[\\s]*?style[\\s]*?>"; // 定义style的正则表达式{或<style[^>]*?>[\\s\\S]*?<\\/style>
																									// }
			String regEx_html = "<[^>]+>"; // 定义HTML标签的正则表达式

			p_script = Pattern.compile(regEx_script, Pattern.CASE_INSENSITIVE);
			m_script = p_script.matcher(htmlStr);
			htmlStr = m_script.replaceAll(""); // 过滤script标签

			p_style = Pattern.compile(regEx_style, Pattern.CASE_INSENSITIVE);
			m_style = p_style.matcher(htmlStr);
			htmlStr = m_style.replaceAll(""); // 过滤style标签

			p_html = Pattern.compile(regEx_html, Pattern.CASE_INSENSITIVE);
			m_html = p_html.matcher(htmlStr);
			htmlStr = m_html.replaceAll(""); // 过滤html标签

			textStr = htmlStr;

		} catch (Exception e) {
			System.err.println("Html2Text: " + e.getMessage());
		}

		textStr = textStr.replaceAll("&amp;", "&");
		textStr = textStr.replaceAll("&lt;", "<");
		textStr = textStr.replaceAll("&gt;", ">");
		textStr = textStr.replaceAll("&quot;", "\"");

		return textStr;// 返回文本字符串
	}

}