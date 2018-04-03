package com.tzt.workLog.tool;

import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.ByteArrayOutputStream;
import java.io.DataInputStream;
import java.io.DataOutputStream;
import java.io.File;
import java.io.FileFilter;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

public class IOUtil {

	// 查询目录下特殊文件名的文件
	public static File[] findFileByRegex(File dir, String pattern) {
		File[] files = dir.listFiles();
		if (files == null || files.length == 0) {
			return new File[0]; // 返回空数组表示没有文件
		}
		ArrayList<File> list = new ArrayList<File>();
		for (File file : files) {
			if (file.isFile()) {
				if (file.getName().matches(pattern)) {
					list.add(file);
				} else {
					// 递归在目录file查找
					File[] arr = findFileByRegex(file, pattern);
					Collections.addAll(list, arr);
				}
			}
		}
		return list.toArray(new File[0]);
	}

	// 获取本地有效盘符方法
	public File[] getRoot() {
		File[] roots = File.listRoots();
		return roots;
	}
	
	// 获取磁盘所有文件方法(去除了根路径)
	public List<String> getFileList(String path) {
		LinkedList<File> list = new LinkedList<File>();
		ArrayList<String> listPath = new ArrayList<String>();
		File dir = new File(path);
		File file[] = dir.listFiles();
		for (int i = 0; i < file.length; i++) {
			if (file[i].isDirectory())
				list.add(file[i]);
			else {
				listPath.add(file[i].getAbsolutePath().replace(path, ""));
			}
		}
		File tmp;
		while (!list.isEmpty()) {
			tmp = list.removeFirst(); // 移除并返回集合中第一项
			if (tmp.isDirectory()) {
				file = tmp.listFiles();
				if (file == null)
					continue;
				for (int i = 0; i < file.length; i++) {
					if (file[i].isDirectory())
						list.add(file[i]);
					else {
						listPath.add(file[i].getAbsolutePath().replace(path, ""));
					}

				}
			} else {

			}
		}
		return listPath;
	}
	
	// 按过滤器查找目录下文件
	public static File[] findFileByFilter(File dir, FileFilter filter) {
		File[] files = dir.listFiles();
		if (files == null || files.length == 0) {
			return new File[0];
		}
		ArrayList<File> list = new ArrayList<File>();
		for (File file : files) {
			if (file.isFile()) {
				if (filter.accept(file)) { // 用过滤器判断文件是否符合条件
					list.add(file);
				}
			} else {
				File[] arr = findFileByFilter(file, filter);
				Collections.addAll(list, arr);
			}
		}
		return list.toArray(new File[0]);
	}
	
	// 求目录下文件字节大小
	public static long dirLength(File dir) {
		File[] files = dir.listFiles();
		if (files == null || files.length == 0) { // 如果没有权限
			return 0;
		}
		long size = 0;
		for (File file : files) {
			if (file.isFile()) {
				size += file.length();
			} else {
				size += dirLength(file); // 求目录file的大小
			}
		}
		return size;
	}	

	//读取文件数据
	public static String read(String filePathName) throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(new File(filePathName)));
		StringBuffer sb = new StringBuffer();
		String line;
		int i = 0;
		while ((line = in.readLine()) != null) {
			if (i > 0) {
				sb.append("\n");
			}
			sb.append(line);
			i++;
		}
		in.close();
		return sb.toString();
	}
	
	//读取文件数据
	public static Map<String, String> readToMap(String filePathName)
			throws IOException {
		BufferedReader in = new BufferedReader(new FileReader(new File(
				filePathName)));
		Map<String, String> map = new HashMap<String, String>();

		String line;
		while ((line = in.readLine()) != null) {
			String[] list = line.split("=");
			map.put(list[0], list[1]);
		}
		in.close();
		return map;
	}
	
	/** 
     * 将内容回写到文件中  
     * @param filePath 
     * @param content 
     */  
    public static void write(String filePath, String content) {  
        BufferedWriter bw = null;          
        try {  
            // 根据文件路径创建缓冲输出流  
            bw = new BufferedWriter(new FileWriter(filePath));  
            // 将内容写入文件中  
            bw.write(content);  
        } catch (Exception e) {  
            e.printStackTrace();  
        } finally {  
            // 关闭流  
            if (bw != null) {  
                try {  
                    bw.close();  
                } catch (IOException e) {  
                    bw = null;  
                }  
            }  
        }  
    }
    
	// 以字节拷贝文件
	public static void copy(String from, String path) throws IOException {
		FileInputStream inputStream = new FileInputStream(new File(from));
		FileOutputStream outputStream = new FileOutputStream(new File(path));
		byte[] buff = new byte[1024];
		int n;
		while ((n = inputStream.read(buff)) != -1) {
			outputStream.write(buff, 0, n);
		}
		inputStream.close();
		outputStream.close();
	}

	// 以字符拷贝文件
	@SuppressWarnings("unused")
	private static void copy(File from, File to) throws Exception {
		BufferedReader in = new BufferedReader(new FileReader(from));
		PrintWriter out = new PrintWriter(new BufferedWriter(new FileWriter(to)));
		String line;
		while ((line = in.readLine()) != null) {
			out.println(line);
		}
		in.close();
		out.close();
	}
	
	// 复制整个文件夹
	public void copyFolder(String oldPath, String newPath) {
		try {
			(new File(newPath)).mkdirs(); // 如果文件夹不存在 则建立新文件夹
			File oldfile = new File(oldPath);
			String[] file = oldfile.list();
			File temp = null;
			for (int i = 0; i < file.length; i++) {
				if (oldPath.endsWith(File.separator)) {
					temp = new File(oldPath + file[i]);
				} else {
					temp = new File(oldPath + File.separator + file[i]);
				}
				if (temp.isFile()) {
					FileInputStream input = new FileInputStream(temp);
					FileOutputStream output = new FileOutputStream(newPath
							+ "/" + (temp.getName()).toString());
					byte[] b = new byte[1024 * 5];
					int len;
					while ((len = input.read(b)) != -1) {
						output.write(b, 0, len);
					}
					output.flush();
					output.close();
					input.close();
				}
				if (temp.isDirectory()) {
					copyFolder(oldPath + "/" + file[i], newPath + "/" + file[i]);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 创建文件
	@SuppressWarnings("unused")
	private static void createFile(String path) {
		File file = new File(path); 
		File parent = file.getParentFile(); 
		if(parent!=null&&!parent.exists()){ 
			parent.mkdirs(); 
		}
		if (!file.exists()) {
			try {
				file.createNewFile();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}
	
	//批量创建文件
	public static void add(File dir){	
		for (int i = 1; i < 1001; i++) {
			File dir1 = new File(dir+"/"+String.format("%04d",i)+".txt");
			System.out.println(dir1);
			try {
				if (!dir1.createNewFile()) {
					System.out.println("创建文件失败！");
				}
			} catch (IOException e) {
				System.out.println("创建文件失败！");
				e.printStackTrace();
			}
			System.out.println("创建文件成功！");
		}
	}
	
	//批量重命名文件
	public static void torename(File dir,File[] files){
		File dir1 = new File(dir+"/"+String.format("%03d",1));
		int n=1;
		dir1.mkdir();
		for (int i = 1; i < 1001; i++) {
			if (!files[i-1].renameTo(new File(dir1,files[i-1].getName()))) {
				System.out.println("重命名失败！");
			}
			if (i%30==0) {
				dir1 = new File(dir+"/dir"+String.format("%03d",++n));
				System.out.println(i+"        "+n);
				dir1.mkdir();
			}
		}
	}
	
	// 文件重命名方法
	public void renamePath(String oldpath, String newPath) {
		File file = new File(oldpath);
		File files = new File(newPath);
		if (!files.exists()) {
			file.renameTo(files);
		}
	}
	
	// 创建目录
	public void createFolder(String strPath) {
		try {
			String filePath = strPath;
			File myFilePath = new File(filePath);
			if (!myFilePath.exists()) {
				myFilePath.mkdir();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 删除目录
	public void deleteDirs(File file) {
		if (file.exists()) {
			if (file.isFile()) {
				file.delete();
			} else if (file.isDirectory()) {
				File[] files = file.listFiles();
				for (int i = 0; i < files.length; i++) {
					this.deleteDirs(files[i]);
				}
				file.delete();
			}
		}
	}
	
	// 单个文件转码拷贝
	public static void turnCode(File from, File to, String fromCharset, String toCharset) throws Exception {
		InputStreamReader in = new InputStreamReader(new FileInputStream(from), fromCharset);
		OutputStreamWriter out = new OutputStreamWriter(new FileOutputStream(to), toCharset);
		char[] buff = new char[1024];
		int n;
		while ((n = in.read(buff)) != -1) {
			String str = new String(buff, 0, n);
			out.write(str);
			System.out.println(str);
		}
		in.close();
		out.close();
	}

	// 对目录中所有文件进行编码转换
	public static void dirCopy(File fromDir, File toDir, String fromCharset, String toCharset) throws Exception {
		InputStreamReader in;
		OutputStreamWriter out;
		File[] files = fromDir.listFiles();
		toDir.mkdir();
		if (files == null || files.length == 0) {
			return;
		}
		for (File file : files) {
			if (file.isFile()) {
				in = new InputStreamReader(new FileInputStream(file), fromCharset);
				System.out.println(file);
				out = new OutputStreamWriter(new FileOutputStream(new File(toDir + "/" + file.getName())), toCharset);
				System.out.println(toDir + "/" + file.getName());
				char[] buff = new char[1024];
				int n;
				while ((n = in.read(buff)) != -1) {
					String str = new String(buff, 0, n);
					out.write(str);
					System.out.println(str);
				}
				in.close();
				out.close();
			} else {
				dirCopy(file, new File(toDir + "/" + file.getName()), fromCharset, toCharset);
			}
		}
	}
	
	// 文件编码格式转换方法
	public void setEnd(String fileStr, String fileSave, String change) {
		try {
			File file = new File(fileStr);
			FileInputStream fis = new FileInputStream(file);
			byte byt[] = new byte[1024];
			File filea = new File(fileSave);
			filea.createNewFile();
			FileOutputStream fop = new FileOutputStream(filea);
			String str = "";
			int read = -1;
			while ((read = fis.read(byt)) != -1) {
				str = new String(byt, 0, read, change);
				fop.write(str.getBytes());
			}
			fop.close();
			fis.close();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	// 文件加密
	public static void encript(File from, File to) throws IOException {
		BufferedInputStream in = new BufferedInputStream(new FileInputStream(from));
		BufferedOutputStream out = new BufferedOutputStream(new FileOutputStream(to));
		int b;
		while ((b = in.read()) != -1) {
			b = b ^ 0xFF;
			out.write(b);
		}
		in.close();
		out.flush();
		out.close();
	}

	// 文件解密
	public static void decript(File from, File to) throws IOException {
		encript(from, to);
	}

	// 转字节URL
	public static String urlEncode(String s, String charset) throws Exception {
		byte[] arr = s.getBytes(charset);
		StringBuffer sb = new StringBuffer();
		for (byte b : arr) {
			if ((b >= 'a' && b <= 'z') || (b >= 'A' && b <= 'Z')
					|| (b >= '0' && b >= '9') || b == '.' || b == '-'
					|| b == '*' || b == '_') {
				sb.append((char) b);
			} else if (b == ' ') {
				sb.append('+');
			} else {
				String hex = Integer.toHexString(b & 0xFF);
				hex = "%" + (hex.length() == 1 ? "0" : "") + hex;
				sb.append(hex);
			}
		}
		return sb.toString();
	}

	// 转回字节URL
	public static String urlDecode(String s, String charset) throws Exception {
		ByteArrayOutputStream out = new ByteArrayOutputStream();
		for (int i = 0; i < s.length();) {
			char c = s.charAt(i);
			if ('+' == c) {
				out.write(' ');
				i++;
			} else if ('%' == c) {
				StringBuffer sb = new StringBuffer();
				sb.append(s.charAt(++i));
				sb.append(s.charAt(++i));
				int b = Integer.parseInt(sb.toString(), 16);
				out.write(b);
				i++;
			} else {
				out.write(c);
				i++;
			}
		}
		byte[] arr = out.toByteArray(); // 获取生成的字节数组
		String str = new String(arr, charset);
		return str;
	}
	
	/**
	 * 文件拆分
	 * @param commFile 源文件
	 * @param untieFile 拆分后的路径
	 * @param filesize 拆分大小，单位KB
	 */
	public void fenGe(File commFile, File untieFile, int filesize) {
		FileInputStream fis = null;
		int size=1024*1024;
		try {
			if (!untieFile.isDirectory()) {
				untieFile.mkdirs();
			}
			size = size * filesize;
			int length = (int) commFile.length();
			int num = length / size;
			int yu = length % size;
			String newfengeFile = commFile.getAbsolutePath();
			int fileNew = newfengeFile.lastIndexOf(".");
			String strNew = newfengeFile.substring(fileNew, newfengeFile.length());
			fis = new FileInputStream(commFile);
			File[] fl = new File[num + 1];
			int begin = 0;
			for (int i = 0; i < num; i++) {
				fl[i] = new File(untieFile.getAbsolutePath() + "\\" + (i + 1)
						+ strNew + ".tem");
				if (!fl[i].isFile()) {
					fl[i].createNewFile();
				}
				FileOutputStream fos = new FileOutputStream(fl[i]);
				byte[] bl = new byte[size];
				fis.read(bl);
				fos.write(bl);
				begin = begin + size * 1024 * 1024;
				System.out.println("BEGIN " + begin);
				fos.close();
			}
			if (yu != 0) {
				fl[num] = new File(untieFile.getAbsolutePath() + "\\"
						+ (num + 1) + strNew + ".tem");
				if (!fl[num].isFile()) {
					fl[num].createNewFile();
				}
				FileOutputStream fyu = new FileOutputStream(fl[num]);
				byte[] byt = new byte[yu];
				fis.read(byt);

				fyu.write(byt);
				fyu.close();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}	

	/**
	 * 文件合并
	 * @param file:要进行分割的文件数组对象
	 * @param cunDir：合并后文件的保存路径
	 * @param type：合并后的文件名
	 */
	public void heBing(File[] file, File cunDir, String fileName) {
		try {
			File heBingFile = new File(cunDir.getAbsoluteFile() + "\\"+ fileName);
			if (!heBingFile.isFile()) {
				heBingFile.createNewFile();
			}
			FileOutputStream fos = new FileOutputStream(heBingFile);
			for (int i = 0; i < file.length; i++) {
				FileInputStream fis = new FileInputStream(file[i]);
				int len = (int) file[i].length();
				byte[] bRead = new byte[len];
				fis.read(bRead);
				fos.write(bRead);
				fis.close();
			}
			fos.close();
			System.out.println("文件合并成功");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	// 文件拆分
	public static void split(File src, int size) throws IOException {
		DataInputStream in = new DataInputStream(new BufferedInputStream(new FileInputStream(src)));
		int i = 1;
		File file = new File(src + "." + i);
		DataOutputStream out = new DataOutputStream(new BufferedOutputStream(
				new FileOutputStream(file)));
		int b = 2;
		while (in.available() > 0) {
			System.out.println(in.read());
			out.write(in.read());
			out.flush();
			if (b % size == 0) {
				i++;
				out.close();
				file = new File(src + "." + i);
				out = new DataOutputStream(new BufferedOutputStream(
						new FileOutputStream(file)));
			}
			b += 2;
		}
		System.out.println(b);
		out.close();
		in.close();
	}

	// 文件合并
	public static void concat(File[] files, File target) throws IOException {
		DataInputStream in = null;
		DataOutputStream out = new DataOutputStream(new BufferedOutputStream(
				new FileOutputStream(target)));
		for (File file : files) {
			in = new DataInputStream(new BufferedInputStream(
					new FileInputStream(file)));
			while (in.available() > 0) {
				out.write(in.read());
			}
		}
		out.close();
		in.close();
	}
	
}