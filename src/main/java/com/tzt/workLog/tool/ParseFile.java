package com.tzt.workLog.tool;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ParseFile {

	public static List<String> operation(String fileDirPath, String logStrPath, String type, String date) {		
		if(fileDirPath == null || ("").equals(fileDirPath)) {
			return null;
		}

		if(date != null) {
			logStrPath += "." + date;
		}
		List<String> contentList = new ArrayList<String>();
		File[] files = findFileByRegex(new File(fileDirPath), logStrPath);
		for(int i=0; i<files.length; i++){
			try {
				InputStreamReader f = new InputStreamReader(new FileInputStream(files[i]), "GBK");
				BufferedReader in = new BufferedReader(f);
				String line;
				while ((line = in.readLine()) != null) {
					if(line.contains(type)) {
						contentList.add(line);
					}
				}
				in.close();
			} catch (IOException e) {				
				e.printStackTrace();
			} finally {				
			}			
		}
		return contentList;
	}
	
	/**
	 * 查询目录下特殊文件名的文件
	 * @param dir
	 * @param pattern
	 * @return
	 */
	public static File[] findFileByRegex(File dir, String pattern) {
		File[] files = dir.listFiles();
		if (files == null || files.length == 0) {
			return new File[0]; // 返回空数组表示没有文件
		}
		ArrayList<File> list = new ArrayList<File>();
		for (File file : files) {
			if (file.isFile()) {
				if (file.getName().startsWith(pattern)) {
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
	
}