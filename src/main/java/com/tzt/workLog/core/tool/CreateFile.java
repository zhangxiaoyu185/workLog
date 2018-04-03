package com.tzt.workLog.core.tool;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.UnsupportedEncodingException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class CreateFile {

	Configuration con = Configuration.configure();

	/**
	 * 得到包名
	 * @return
	 */
	public String getPackageName(String type) {
		String packageName = "com/tzt/" + con.getAppName() + "/" + type;
		if(!("").equals(con.getBackageName())) {
			packageName += "/" +con.getBackageName();
		}
		return packageName;
	}

	/**
	 * 得到类名
	 * @return
	 */
	public String getClassName(String type) {
		String tableName = con.getTableName();
		String[] strList = tableName.split("_");
		StringBuffer className = new StringBuffer();
		StringBuffer fullClassName = new StringBuffer();
		className.append(strList[0].toLowerCase());
		for (int i = 1; i < strList.length; i++) {
			className.append(strList[i].substring(0, 1).toUpperCase()).append(strList[i].substring(1, strList[i].length()).toLowerCase());
		}
		if ("service".equals(type)) {
			fullClassName.append(className).append("Service");
		}
		if ("service/impl".equals(type)) {
			fullClassName.append(className).append("ServiceImpl");
		}
		if ("controller".equals(type)) {
			fullClassName.append(className).append("Controller");
		}
		if ("mapper".equals(type)) {
			fullClassName.append(className).append("Mapper");
		}
		if ("entity".equals(type)) {
			fullClassName.append(className);
		}
		if ("vo".equals(type)) {
			fullClassName.append(className).append("VO");
		}
		return toUpperCaseFirstOne(fullClassName.toString());
	}

	/**
	 * 首字母转大写
	 * @param s
	 * @return
	 */
    public static String toUpperCaseFirstOne(String s) {
        if(Character.isUpperCase(s.charAt(0)))
            return s;
        else
            return (new StringBuilder()).append(Character.toUpperCase(s.charAt(0))).append(s.substring(1)).toString();
    }
    
	/**
	 * 首字母转小写
	 * @param s
	 * @return
	 */
    public static String toLowerCaseFirstOne(String s) {
        if(Character.isLowerCase(s.charAt(0)))
            return s;
        else
            return (new StringBuilder()).append(Character.toLowerCase(s.charAt(0))).append(s.substring(1)).toString();
    }
    
	/**
	 * 得到当前项目的路径
	 * @param type service/mapper等
	 * @param Filetype 文件的格式java/xml       
	 * @return
	 */
	public String getPath(String type, String Filetype) {
		File file = new File("");
		String path = file.getAbsolutePath() + "/src/main/java/" + getPackageName(type) + "/" + getClassName(type) + Filetype;
		path = path.replaceAll("\\\\", "/");
		return path;
	}

	/**
	 * 创建文件
	 * @param dirFile
	 */
	public void createFile(File dirFile) {
		File dir = dirFile.getParentFile();
		if (dir != null && !dir.exists()) {
			dir.mkdirs();
		}
		try {
			dirFile.createNewFile();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 判断文件或文件夹是否存在
	 * @param path
	 */
	public static boolean isExist(String path) {
		File file = new File(path);
		return file.exists();
	}
	 
	/**
	 * 读取文件定制内容
	 * @param dirFile
	 * @param type 读取文件类型
	 * @return 返回定制内容
	 */
	public String ReadFile(File dirFile, String charset, String type) {
		StringBuffer content = new StringBuffer();
		StringBuffer myContent = new StringBuffer();
		String strContent = "";
		InputStreamReader reader = null;
		try {
			reader = new InputStreamReader(new FileInputStream(dirFile), charset);
			char[] buffer = new char[1024];
			int len = 0;
			while ((len = reader.read(buffer)) != -1) {// 读取文件内容
				String str = new String(buffer, 0, len);
				content.append(str);
			}
			if ("xml".equals(type)) {
				int start = content.indexOf("<!-- 定制内容开始 -->") + "<!-- 定制内容开始 -->".length();
				int end = content.indexOf("<!-- 定制内容结束 -->");
				if (start > 0 && end > start)
					strContent = content.substring(start, end);
			} else {
				String regx = ".*定制内容开始=.*\n((.*\n)+?).*=定制内容结束=.*";
				Pattern p = Pattern.compile(regx);
				Matcher macher = p.matcher(content);
				while (macher.find()) {
					myContent.append(macher.group(1));
				}
				strContent = myContent.toString();
			}
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} finally {
			try {
				reader.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return strContent;
	}

	/**
	 * 生成 Entity
	 * @param dirFile
	 */
	public void writeEntityFile(File dirFile, String charset) {
		String myContent = ReadFile(dirFile, charset, "java"); // 读取自己的定制内容
		StringBuffer entity = new StringBuffer(); // 总文件
		StringBuffer head = new StringBuffer(); // 头文件		
		StringBuffer columnDefine = new StringBuffer(); // 字段的声明
		StringBuffer columnSetGet = new StringBuffer(); // 字段的set get方法
		StringBuffer constructor = new StringBuffer(); // 构造方法
		String columnName = ""; // 字段的名称
		String columnType = ""; // 字段的类型
		String remarks = ""; // 字段的注释
		boolean flag = true; //是否已导date包
		try {
			List<Map<String, Object>> columnList = PTTools.getColumnNameList(DBUtil.getConnection(), con.getTableName()); // 得到列名集合
			String packageName = getPackageName("entity");
			packageName = packageName.replaceAll("/", ".");
			head.append("package " + packageName).append(";\n\n"); // 包名
			head.append("import com.tzt.workLog.entity.BaseEntity;\n"); // 导包
			
			columnDefine.append("\tprivate static final long serialVersionUID = 1L;\n"); // 版本控制
			
			for (Map<String, Object> map : columnList) {
				columnName = map.get("SMALL_COLUMN_NAME").toString();				
				columnType = map.get("SMALL_TYPE_NAME").toString();
				if(("int").equals(columnType)) {
					columnType = "Integer";
				}
				if(("long").equals(columnType)) {
					columnType = "Long";
				}
				if(("double").equals(columnType)) {
					columnType = "Double";
				}
				remarks = map.get("Remarks").toString();
				if (flag && "Date".equals(columnType)) {
					head.append("import java.util.Date;\n"); // 导包
					flag = false;
				}
				columnDefine.append("\n\t/**\n\t*").append(remarks).append("\n\t*/\n").append("\tprivate ").append(columnType).append(" ").append(columnName).append(";\n"); // 声明变量
				String setgetName = columnName.substring(0, 1).toUpperCase() + columnName.substring(1);
				columnSetGet.append("\tpublic void set").append(setgetName).append("(").append(columnType).append(" ").append(columnName).append(") {\n").append("\t\tthis.")
						.append(columnName).append(" = ").append(columnName).append(";\n\t}\n\n"); // 组装set方法
				columnSetGet.append("\tpublic ").append(columnType).append(" get").append(setgetName).append("( ) {\n\t\t").append("return ").append(columnName).append(";\n\t}\n\n"); // 组装get方法
			}

			constructor.append("\tpublic ").append(getClassName("entity"))
					.append("( ) { \n").append("\t}\n");// 默认构造器

			entity.append(head).append("\n").append("public class ").append(getClassName("entity")).append(
					" extends BaseEntity").append(" {\n\n").append(columnDefine).append("\n").append(columnSetGet)
					.append(constructor).append("\n").append("//<=================定制内容开始==============\n")
					.append(myContent).append("//==================定制内容结束==============>\n")
					.append("\n}");

			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(dirFile), charset);
			out.write(entity.toString());
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	/**
	 * 生成VO
	 * @param dirFile
	 */
	public void writeVOFile(File dirFile, String charset) {
		String myContent = ReadFile(dirFile, charset, "java"); // 读取自己的定制内容
		StringBuffer vo = new StringBuffer(); // 总文件
		StringBuffer head = new StringBuffer(); // 头文件		
		StringBuffer columnDefine = new StringBuffer(); // 字段的声明
		StringBuffer columnSetGet = new StringBuffer(); // 字段的set get方法
		StringBuffer constructor = new StringBuffer(); // 构造方法
		StringBuffer convertPOToVO = new StringBuffer(); // convertPOToVO方法
		String columnName = ""; // 字段的名称
		String columnType = ""; // 字段的类型
		String remarks = ""; // 字段的注释
		boolean flag = true; //是否已导date包
		try {
			List<Map<String, Object>> columnList = PTTools.getColumnNameList(DBUtil.getConnection(), con.getTableName()); // 得到列名集合
			String packageName = getPackageName("vo");
			packageName = packageName.replaceAll("/", ".");
			head.append("package " + packageName).append(";\n\n"); // 包名
			head.append("import com.tzt.workLog.entity.").append(getClassName("entity")).append(";\n"); // 导包
			head.append("import com.tzt.workLog.vo.BaseVO;\n"); // 导包
			
			convertPOToVO.append("\n\t@Override\n\tpublic void convertPOToVO(Object poObj) {\n\t\t")
			.append("if (null == poObj) {\n\t\t\treturn;\n\t\t}\n\n\t\t").append(getClassName("entity"))
			.append(" po = (").append(getClassName("entity")).append(") poObj;\n");
			
			for (Map<String, Object> map : columnList) {
				columnName = map.get("SMALL_COLUMN_NAME").toString();				
				columnType = map.get("SMALL_TYPE_NAME").toString();
				if(("int").equals(columnType)) {
					columnType = "Integer";
				}
				if(("long").equals(columnType)) {
					columnType = "Long";
				}
				if(("double").equals(columnType)) {
					columnType = "Double";
				}
				remarks = map.get("Remarks").toString();
				if (flag && "Date".equals(columnType)) {
					head.append("import com.tzt.workLog.tool.DateUtil;\n"); // 导包
					flag = false;
				}
				if(!columnName.toUpperCase().endsWith("UNID") && !columnType.equals("Date")) {
					columnDefine.append("\n\t/**\n\t*").append(remarks).append("\n\t*/\n").append("\tprivate ").append(columnType).append(" ").append(columnName).append(";\n"); // 声明变量
					String setgetName = columnName.substring(0, 1).toUpperCase() + columnName.substring(1);
					columnSetGet.append("\tpublic void set").append(setgetName).append("(").append(columnType).append(" ").append(columnName).append(") {\n").append("\t\tthis.")
							.append(columnName).append(" = ").append(columnName).append(";\n\t}\n\n"); // 组装set方法
					columnSetGet.append("\tpublic ").append(columnType).append(" get").append(setgetName).append("( ) {\n\t\t").append("return ").append(columnName).append(";\n\t}\n\n"); // 组装get方法
					convertPOToVO.append("\t\tthis.").append(columnName).append(" = po.get").append(setgetName).append("();\n");
					continue;
				}
				if(columnType.equals("Date")) {
					columnType = "String";
					columnDefine.append("\n\t/**\n\t*").append(remarks).append("\n\t*/\n").append("\tprivate ").append(columnType).append(" ").append(columnName).append(";\n"); // 声明变量
					String setgetName = columnName.substring(0, 1).toUpperCase() + columnName.substring(1);
					columnSetGet.append("\tpublic void set").append(setgetName).append("(").append(columnType).append(" ").append(columnName).append(") {\n").append("\t\tthis.")
							.append(columnName).append(" = ").append(columnName).append(";\n\t}\n\n"); // 组装set方法
					columnSetGet.append("\tpublic ").append(columnType).append(" get").append(setgetName).append("( ) {\n\t\t").append("return ").append(columnName).append(";\n\t}\n\n"); // 组装get方法
					convertPOToVO.append("\t\tthis.").append(columnName).append(" = po.get").append(setgetName).append("()!=null?DateUtil.formatDefaultDate(po.get").append(setgetName).append("()):\"\";\n");
				}
			}

			constructor.append("\tpublic ").append(getClassName("vo"))
					.append("( ) { \n").append("\t}\n");// 默认构造器

			vo.append(head).append("\n").append("public class ").append(getClassName("vo")).append(
					" implements BaseVO").append(" {\n").append(columnDefine).append("\n").append(columnSetGet)
					.append(constructor).append(convertPOToVO).append("\t}\n")
					.append("//<=================定制内容开始==============\n")
					.append(myContent).append("//==================定制内容结束==============>\n")
					.append("\n}");

			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(dirFile), charset);
			out.write(vo.toString());
			out.flush();
			out.close();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 生成Service接口
	 * @param dirFile
	 * @param charset
	 */
	public void writeServiceIFile(File dirFile, String charset) {
		String myContent = ReadFile(dirFile, charset, "java");// 读取定制内容
		String packageName = getPackageName("service");// 获取包名
		packageName = packageName.replaceAll("/", ".");
		String entityPackageName = getPackageName("entity");// 获取entity包名
		entityPackageName = entityPackageName.replaceAll("/", ".");
		String className = getClassName("service");// 获取service类名
		String entityName = getClassName("entity");// 获取entity类名
		String smallClassName = toLowerCaseFirstOne(entityName);
		StringBuffer serviceI = new StringBuffer();
		StringBuffer insert = new StringBuffer(); //添加
		StringBuffer update = new StringBuffer(); //修改
		StringBuffer delete = new StringBuffer(); //删除
		StringBuffer get = new StringBuffer(); //查询
		
		serviceI.append("package ").append(packageName).append(";\n\n"); // 包名
		serviceI.append("import ").append(entityPackageName).append(".").append(entityName).append(";\n\n");// 导包
		serviceI.append("public interface ").append(className).append(" {\n\n");// 类的开始
		
		insert.append("\t/**\n\t* 添加\n\t* @param ").append(smallClassName).append("\n\t* @return\n\t*/\n\tpublic boolean insert")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(");\n\n");
		update.append("\t/**\n\t* 修改\n\t* @param ").append(smallClassName).append("\n\t* @return\n\t*/\n\tpublic boolean update")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(");\n\n");
		delete.append("\t/**\n\t* 删除\n\t* @param ").append(smallClassName).append("\n\t* @return\n\t*/\n\tpublic boolean delete")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(");\n\n");
		get.append("\t/**\n\t* 查询\n\t* @param ").append(smallClassName).append("\n\t* @return\n\t*/\n\tpublic ").append(entityName).append(" get")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(");\n\n");
		
		serviceI.append(insert).append(update).append(delete).append(get);
		serviceI.append("//<=================定制内容开始==============\n").append(
				myContent).append(
				"//==================定制内容结束==============>\n\n");// 定制内容
		serviceI.append("}");

		try {
			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(dirFile), charset);
			out.write(serviceI.toString());
			out.flush();
			out.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	/**
	 * 生成Service实现类
	 * @param dirFile
	 * @param charset
	 */
	public void writeServiceFile(File dirFile, String charset) {
		String myContent = ReadFile(dirFile, charset, "java");// 读取定制内容
		String packageName = getPackageName("service/impl");// 获取包名
		packageName = packageName.replaceAll("/", ".");
		String entityPackageName = getPackageName("entity");// 获取entity包名
		entityPackageName = entityPackageName.replaceAll("/", ".");
		String iPackageName = getPackageName("service");// 获取接口包路径
		iPackageName = iPackageName.replaceAll("/", ".");
		String iClassName = getClassName("service");
		String className = getClassName("service/impl");// 获取类名
		String entityName = getClassName("entity");// 获取entity类名
		String smallClassName = toLowerCaseFirstOne(entityName);
		StringBuffer service = new StringBuffer();
		StringBuffer insert = new StringBuffer(); //添加
		StringBuffer update = new StringBuffer(); //修改
		StringBuffer delete = new StringBuffer(); //删除
		StringBuffer get = new StringBuffer(); //查询
		
		service.append("package ").append(packageName).append(";\n\n"); // 包名
		service.append("import ").append(iPackageName).append(".").append(
				iClassName).append(";\n").append("import org.springframework.beans.factory.annotation.Autowired;\n")
				.append("import org.springframework.stereotype.Service;\n").append("import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;\n")
				.append("import ").append(entityPackageName).append(".").append(
						getClassName("entity")).append(";\n\n");// 导包;

		service.append("@Service(\"").append(toLowerCaseFirstOne(iClassName)).append("\")\n");
		service.append("public class ").append(className).append(" implements ").append(iClassName).append(
						" {\n\n");// 类的开始
		service.append("\t@Autowired\n\tprivate MyBatisDAO myBatisDAO;\n");
		
		insert.append("\n\t@Override\n\tpublic boolean insert")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(") {\n")
		.append("\t\tmyBatisDAO.insert(").append(smallClassName).append(");\n\t\treturn true;\n\t}\n");
		update.append("\n\t@Override\n\tpublic boolean update")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(") {\n")
		.append("\t\tmyBatisDAO.update(").append(smallClassName).append(");\n\t\treturn true;\n\t}\n");
		delete.append("\n\t@Override\n\tpublic boolean delete")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(") {\n")
		.append("\t\tmyBatisDAO.delete(").append(smallClassName).append(");\n\t\treturn true;\n\t}\n");
		get.append("\n\t@Override\n\tpublic ").append(entityName).append(" get")
		.append(entityName).append("(").append(entityName).append(" ").append(smallClassName).append(") {\n")
		.append("\t\treturn (").append(entityName).append(") myBatisDAO.findForObject(").append(smallClassName).append(");\n\t}\n\n");
		
		service.append(insert).append(update).append(delete).append(get);
		service.append("//<=================定制内容开始==============\n").append(
				myContent).append(
				"//==================定制内容结束==============>\n\n");// 定制内容
		service.append("}");

		try {
			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(dirFile), charset);
			out.write(service.toString());
			out.flush();
			out.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 生成Mapper
	 * @param dirFile
	 * @param charset
	 */
	public void writeMapperFile(File dirFile, String charset) {
		String packageName = getPackageName("entity");// 得到包路径
		packageName = packageName.replaceAll("/", ".");
		String smallClassName = toLowerCaseFirstOne(getClassName("entity")); //小写类名
		String smallColumnName = ""; // 小写字段的名称
		String bigColumnName = ""; // 大写字段的名称
		String bigColumnType = ""; // 大写字段的类型
		String remarks = ""; // 字段的注释
		String smallUuid = "";// 获取小写uuid的全名
		String bigUuid = "";// 获取大写uuid的全名
		String typeUuid = "";// 获取大写uuid的类型
		String myContent = ReadFile(dirFile, charset, "xml");// 读取定制内容
		StringBuffer resultMap = new StringBuffer();// 生成resultMap的内容
		StringBuffer fieldAsProperty = new StringBuffer();// 生成id为fieldAsProperty的sql语句
		StringBuffer fieldIf = new StringBuffer();// 生成id为fieldIf的sql语句
		StringBuffer fieldIfUUID = new StringBuffer();// fieldIf的uuid语句
		StringBuffer property = new StringBuffer();// 生成id为property的sql语句
		StringBuffer propertyUUID = new StringBuffer();// property的uuid语句
		StringBuffer fieldPropertyIf = new StringBuffer();// 生成id为fieldPropertyIf的sql语句
		StringBuffer fieldPropertyIfUUID = new StringBuffer();// fieldPropertyIf的uuid语句
		StringBuffer insertEntity = new StringBuffer(); // 生成id为insertEntity的insert语句
		StringBuffer deleteEntity = new StringBuffer(); // 生成id为deleteEntity的delete语句
		StringBuffer getEntity = new StringBuffer(); // 生成id为getEntity的select语句
		StringBuffer updateEntity = new StringBuffer();// 生成id为updateEntity的update语句

		StringBuffer mapper = new StringBuffer();
		mapper.append("<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE mapper PUBLIC \"-//mybatis.org//DTD Mapper 3.0//EN\"\n\"http://mybatis.org/dtd/mybatis-3-mapper.dtd\">\n");
		mapper.append("<mapper namespace=\"").append(packageName).append(".").append(getClassName("entity")).append("\">\n\t");// mapper 开始
		resultMap.append("<resultMap id=\"").append(smallClassName).append("Mapper\" type=\"").append(getClassName("entity")).append("\">\n");// resultMap 开始
		fieldAsProperty.append("\t<sql id=\"").append(smallClassName).append("AsProperty\">\n");// sql id为fieldAsProperty开始
		fieldIf.append("\t<sql id=\"").append(smallClassName).append("FieldIf\">\n");// sql id为field开始
		property.append("\t<sql id=\"").append(smallClassName).append("Property\">\n");// sql id为property开始		
		fieldPropertyIf.append("\t<sql id=\"").append(smallClassName).append("PropertyIf\">\n");// sql id为fieldPropertyIf开始
		
		try {
			List<Map<String, Object>> columnList = PTTools.getColumnNameList(
					DBUtil.getConnection(), con.getTableName()); //得到全部列名
			for (Map<String, Object> map : columnList) {
				smallColumnName = map.get("SMALL_COLUMN_NAME").toString();
				bigColumnName = map.get("BIG_COLUMN_NAME").toString();
				bigColumnType = map.get("BIG_TYPE_NAME").toString();
				remarks = map.get("Remarks").toString();
				
				fieldAsProperty.append("\t\t").append(bigColumnName).append(
						" AS ").append(smallColumnName).append(",\n");
				
				if ("".equals(smallUuid) && bigColumnName.endsWith("UUID")) {
					smallUuid = smallColumnName;
					bigUuid = bigColumnName;
					typeUuid = bigColumnType;
					fieldPropertyIfUUID.append("\t\t").append("<if test=\"").append(
							smallColumnName).append("!=null\" >").append(
							bigColumnName).append("=#{").append(smallColumnName)
							.append(",jdbcType=").append(bigColumnType).append(
									"},</if>\n");
					fieldIfUUID.append("\t\t").append("<if test=\"").append(
							smallColumnName).append("!=null\" >").append(bigColumnName).append(",</if>\n");
					propertyUUID.append("\t\t").append("<if test=\"").append(
							smallColumnName).append("!=null\" >").append("#{").append(smallColumnName).append(
							",jdbcType=").append(bigColumnType).append("},</if>\n");
				}else {
					fieldPropertyIf.append("\t\t").append("<if test=\"").append(
							smallColumnName).append("!=null\" >").append(
							bigColumnName).append("=#{").append(smallColumnName)
							.append(",jdbcType=").append(bigColumnType).append(
									"},</if>\n");
					fieldIf.append("\t\t").append("<if test=\"").append(
							smallColumnName).append("!=null\" >").append(bigColumnName).append(",</if>\n");
					property.append("\t\t").append("<if test=\"").append(
							smallColumnName).append("!=null\" >").append("#{").append(smallColumnName).append(
							",jdbcType=").append(bigColumnType).append("},</if>\n");
				}				
				
				if (bigColumnName.endsWith("UNID")) {
					resultMap.append("\t\t<id column=\"").append(bigColumnName)
							.append("\" jdbcType=\"").append(bigColumnType)
							.append("\" property=\"").append(smallColumnName)
							.append("\" /><!-- ").append(remarks).append(
									" -->\n");					
					continue;
				}
				resultMap.append("\t\t<result column=\"").append(bigColumnName)
					.append("\" jdbcType=\"").append(bigColumnType).append(
						"\" property=\"").append(smallColumnName)
						.append("\" /><!-- ").append(remarks).append(" -->\n");
												
			}
			
			insertEntity.append("\t<insert id=\"insert").append(getClassName("entity")).append("\" parameterType=\"").append(getClassName("entity")).append("\" useGeneratedKeys=\"true\" keyProperty=\"id\" >\n");// sql id为insertEntity开始
			insertEntity.append("\t\tINSERT INTO ").append(con.getTableName()).append("(<include refid=\"").append(smallClassName).append("FieldIf\" />) VALUES (<include refid=\"").append(smallClassName).append("Property\" />)\n\t</insert>\n");// sql id为insertEntity结束
			deleteEntity.append("\t<delete id=\"delete").append(getClassName("entity")).append("\" parameterType=\"").append(getClassName("entity")).append("\">\n");// sql id为deleteEntity开始
			deleteEntity.append("\t\tDELETE FROM ").append(con.getTableName()).append(" <where> ").append(bigUuid).append("=#{").append(smallUuid).append(",jdbcType=").append(typeUuid).append("} </where>\n\t</delete>\n");// sql id为deleteEntity结束
			getEntity.append("\t<select id=\"get").append(getClassName("entity")).append("\" resultMap=\"").append(smallClassName).append("Mapper\"").append(" parameterType=\"").append(getClassName("entity")).append("\">\n");// sql id为getEntity开始
			getEntity.append("\t\tSELECT <include refid=\"").append(smallClassName).append("AsProperty\" /> FROM ").append(con.getTableName()).append(" <where> ").append(bigUuid).append("=#{").append(smallUuid).append(",jdbcType=").append(typeUuid).append("} </where>\n\t</select>\n");// sql																																		// id为getEntity结束
			updateEntity.append("\t<update id=\"update").append(getClassName("entity")).append("\" parameterType=\"").append(getClassName("entity")).append("\">\n");// sql id为updateEntity开始
			updateEntity.append("\t\tUPDATE ").append(con.getTableName()).append("<set><include refid=\"").append(smallClassName).append("PropertyIf\" /></set>").append(" <where> ").append(bigUuid).append("=#{").append(smallUuid).append(",jdbcType=").append(typeUuid).append("} </where>\n\t</update>\n");// sql id为updateEntity结束
			
			resultMap.append("\t</resultMap>\n");// resultMap结束
			fieldAsProperty.delete(fieldAsProperty.length() - 2,
					fieldAsProperty.length() - 1);// 去除fieldAsProperty最后字段的逗号
			fieldAsProperty.append("\t</sql>\n");// sql fieldAsProperty结束
			fieldIf.append(fieldIfUUID).delete(fieldIf.length() - 7, fieldIf.length() - 6);// 去除field最后字段的逗号
			fieldIf.append("\t</sql>\n");// sql field结束
			property.append(propertyUUID).delete(property.length() - 7, property.length() - 6);// 去除property最后字段的逗号
			property.append("\t</sql>\n");// sql property结束
			fieldPropertyIf.append(fieldPropertyIfUUID).delete(fieldPropertyIf.length() - 7, fieldPropertyIf.length() - 6);// 去除fieldEqPropertyIf最后字段的逗号
			fieldPropertyIf.append("\t</sql>\n");// sql fieldEqPropertyIf结束
		} catch (SQLException e1) {
			e1.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} 
		// 得到列名集合
		mapper.append(resultMap).append(fieldAsProperty).append(fieldIf).append(
				property).append(fieldPropertyIf).append(insertEntity).append(deleteEntity)
				.append(getEntity).append(updateEntity).append("<!-- 定制内容开始 -->")
				.append(myContent).append("<!-- 定制内容结束 -->\n\n");// 定制内容
		mapper.append("</mapper>");
		try {
			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(dirFile), charset);
			out.write(mapper.toString());
			out.flush();
			out.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 生成Controller
	 * @param dirFile
	 * @param charset
	 */
	public void writeControllerFile(File dirFile, String charset) {
		String myContent = ReadFile(dirFile, charset, "java");// 读取定制内容
		String packageName = getPackageName("controller");// 获取包名
		packageName = packageName.replaceAll("/", ".");
		String entityPackageName = getPackageName("entity");// 获取entity包名
		entityPackageName = entityPackageName.replaceAll("/", ".");
		String className = getClassName("controller");// 获取类名
		StringBuffer controller = new StringBuffer();

		controller.append("package ").append(packageName).append(";\n\n"); // 包名
		controller.append("import org.springframework.stereotype.Controller;\n");
		controller.append("import org.springframework.web.bind.annotation.RequestMapping;\n");
		controller.append("import com.tzt.").append(con.getAppName()).append(".controller.BaseController;\n")// 导包
				.append("import ").append(entityPackageName).append(".").append(
						getClassName("entity")).append(";\n\n");// 导包;
		controller.append("@Controller\n@RequestMapping(value=\"/").append(toLowerCaseFirstOne(getClassName("entity"))).append("\")\n");
		controller.append("public class ").append(className).append(" extends BaseController {\n\n");// 类的开始
		controller.append("//<=================定制内容开始==============\n").append(
				myContent).append(
				"//==================定制内容结束==============>\n\n");// 定制内容
		controller.append("}");

		try {
			OutputStreamWriter out = new OutputStreamWriter(
					new FileOutputStream(dirFile), charset);
			out.write(controller.toString());
			out.flush();
			out.close();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void main(String[] args) {
		CreateFile f = new CreateFile();
		String charset = f.con.getCharset();
		
		String entityPath = f.getPath("entity", ".java");
		if(!isExist(entityPath)) {
			File dirEntityFile = new File(entityPath);
			f.createFile(dirEntityFile);
			f.writeEntityFile(dirEntityFile, charset);
		}
		
		String voPath = f.getPath("vo", ".java");
		if(!isExist(voPath)) {
			File dirVOFile = new File(voPath);
			f.createFile(dirVOFile);
			f.writeVOFile(dirVOFile, charset);
		}
		
		String MapperPath = f.getPath("mapper", ".xml");
		if(!isExist(MapperPath)) {
			File dirMapperFile = new File(MapperPath);
			f.createFile(dirMapperFile);
			f.writeMapperFile(dirMapperFile, charset);
		}
		
//		String ControllerPath = f.getPath("controller", ".java");
//		if(!isExist(ControllerPath)) {
//			File dirControllerFile = new File(ControllerPath);
//			f.createFile(dirControllerFile);
//			f.writeControllerFile(dirControllerFile, charset);
//		}
		
		String serviceIPath = f.getPath("service", ".java");
		if(!isExist(serviceIPath)) {
			File dirServiceIFile = new File(serviceIPath);
			f.createFile(dirServiceIFile);
			f.writeServiceIFile(dirServiceIFile, charset);
		}
		
		String servicePath = f.getPath("service/impl",".java");
		if(!isExist(servicePath)) {
			File dirServiceFile = new File(servicePath);		
			f.createFile(dirServiceFile);		
			f.writeServiceFile(dirServiceFile, charset);
		}
	}
	
}