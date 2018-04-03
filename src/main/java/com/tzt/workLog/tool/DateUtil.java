package com.tzt.workLog.tool;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.regex.Pattern;
import org.apache.commons.lang.StringUtils;

public class DateUtil {

	public static long daysDiff(Date firstDay, Date lastDay) {
		if (firstDay == null || lastDay == null) {
			return 0;
		}
		long allDays = (lastDay.getTime() - (firstDay.getTime())) / (1000 * 24 * 60 * 60);

		return allDays;
	}

	public static Long yearDiff(Date firstDay, Date lastDay) {
		if (firstDay == null || lastDay == null)
			return null;
		Calendar first = Calendar.getInstance();
		first.setTime(firstDay);
		Calendar last = Calendar.getInstance();
		last.setTime(lastDay);
		long years = last.get(Calendar.YEAR) - first.get(Calendar.YEAR);
		return years;
	}

	public static Date addMinute(Date src, int minute) {
		Calendar c = Calendar.getInstance();
		c.setTime(src);
		c.add(Calendar.MINUTE, minute);
		return c.getTime();
	}

	public static String getTodayTextYMD() {
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		return df.format(new Date());

	}

	public static String getYesterdayTextYMD() {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.DAY_OF_YEAR, -1);
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		return df.format(c.getTime());

	}

	public static Date getYesterday() {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.DAY_OF_YEAR, -1);
		return c.getTime();
	}

	public static Date getTomorrowday() {
		Calendar c = Calendar.getInstance();
		c.add(Calendar.DAY_OF_YEAR, 1);
		return c.getTime();
	}
	
	public static Date parseDateYMD(String ymd) {
		DateFormat df = new SimpleDateFormat("yyyyMMdd");
		try {
			return df.parse(ymd);
		} catch (ParseException e) {
			return getYesterday();
		}
	}

	public static Date getAddDayDate(Date dt, int days) {
		Calendar cal = Calendar.getInstance();
		if (dt != null) {
			cal.setTime(dt);
		}
		cal.add(5, days);
		return cal.getTime();
	}

	public static Date getToday() {
		Date now = new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(now);
		cal.set(11, 0);
		cal.set(12, 0);
		cal.set(13, 0);
		cal.set(14, 0);
		return cal.getTime();
	}

	public static String formatDate(String format, Date dt) {
		if (dt == null) {
			return "";
		}
		if (StringUtils.isBlank(format)) {
			format = "yyyy-MM-dd";
		}
		SimpleDateFormat fmt = new SimpleDateFormat(format);
		return fmt.format(dt);
	}

	public static String FILE_NAME = "MMddHHmmssSSS";
	public static String DEFAULT_PATTERN = "yyyy-MM-dd";
	public static String DIR_PATTERN = "yyyy/MM/dd/";
	public static String TIMESTAMP_PATTERN = "yyyy-MM-dd HH:mm:ss";
	public static String TIMES_PATTERN = "HH:mm:ss";
	public static String NOCHAR_PATTERN = "yyyyMMddHHmmss";
	public static String CHINESE_PATTEN = "yyyy年MM月dd日";

	/**
	 * 获取当前时间戳
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static String formatDefaultFileName() {
		return formatDateByFormat(new Date(), FILE_NAME);
	}

	/**
	 * 日期转换为字符串
	 * 
	 * @param date
	 *            日期
	 * @param format
	 *            日期格式
	 * @return 指定格式的日期字符串
	 */
	public static String formatDateByFormat(Date date, String format) {
		String result = "";
		if (date != null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat(format);
				result = sdf.format(date);
			} catch (Exception ex) {
				ex.printStackTrace();
			}
		}
		return result;
	}

	/**
	 * 转换为默认格式(yyyy-MM-dd)的日期字符串
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static String formatDefaultDate(Date date) {
		return formatDateByFormat(date, DEFAULT_PATTERN);
	}

	/**
	 * 转换为目录格式(yyyy/MM/dd/)的日期字符串
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static String formatDirDate(Date date) {
		return formatDateByFormat(date, DIR_PATTERN);
	}

	/**
	 * 转换为完整格式(yyyy-MM-dd HH:mm:ss)的日期字符串
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static String formatTimesTampDate(Date date) {
		return formatDateByFormat(date, TIMESTAMP_PATTERN);
	}

	/**
	 * 转换为时分秒格式(HH:mm:ss)的日期字符串
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static String formatTimesDate(Date date) {
		return formatDateByFormat(date, TIMES_PATTERN);
	}

	/**
	 * 转换为时分秒格式(HH:mm:ss)的日期字符串
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static String formatNoCharDate(Date date) {
		return formatDateByFormat(date, NOCHAR_PATTERN);
	}

	/**
	 * 日期格式字符串转换为日期对象
	 * 
	 * @param strDate
	 *            日期格式字符串
	 * @param pattern
	 *            日期对象
	 * @return
	 */
	public static Date parseDate(String strDate, String pattern) {
		try {
			SimpleDateFormat format = new SimpleDateFormat(pattern);
			Date nowDate = format.parse(strDate);
			return nowDate;
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}

	/**
	 * 字符串转换为默认格式(yyyy-MM-dd)日期对象
	 * 
	 * @param date
	 * 
	 * @return
	 * 
	 * @throws Exception
	 */
	public static Date parseDefaultDate(String date) {
		return parseDate(date, DEFAULT_PATTERN);
	}

	/**
	 * 字符串转换为完整格式(yyyy-MM-dd HH:mm:ss)日期对象
	 * 
	 * @param date
	 * 
	 * @return
	 * 
	 * @throws Exception
	 */
	public static Date parseTimesTampDate(String date) {
		return parseDate(date, TIMESTAMP_PATTERN);
	}

	/**
	 * 获得当前时间
	 * 
	 * @return
	 */
	public static Date getCurrentDate() {
		Calendar calendar = Calendar.getInstance();
		return calendar.getTime();
	}

	/**
	 * sql Date 转 util Date
	 * 
	 * @param date
	 *            java.sql.Date日期
	 * @return java.util.Date
	 */
	public static Date parseUtilDate(java.sql.Date date) {
		return date;
	}

	/**
	 * util Date 转 sql Date
	 * 
	 * @param date
	 *            java.sql.Date日期
	 * @return
	 */
	public static java.sql.Date parseSqlDate(Date date) {
		return new java.sql.Date(date.getTime());
	}

	/**
	 * 获取年份
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getYear(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.YEAR);
	}

	/**
	 * 获取月份
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getMonth(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MONTH) + 1;
	}

	/**
	 * 获取第几周
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getWhileWeek(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int dayOfWeek = c.get(Calendar.WEEK_OF_MONTH);
		return dayOfWeek;
	}
	
	/**
	 * 获取第几周
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getWhileWeekOfMonth(Date date) {
		Date firstDate = getFirstDayOfWeek(date);
		int i=(getDay(firstDate)-1)/7+1;
		return i;
	}

	/**
	 * 获取星期
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getWeek(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		int dayOfWeek = c.get(Calendar.DAY_OF_WEEK);
		dayOfWeek = dayOfWeek - 1;
		if (dayOfWeek == 0) {
			dayOfWeek = 7;
		}
		return dayOfWeek;
	}

	/**
	 * 获取日期(多少号)
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getDay(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.DAY_OF_MONTH);
	}

	/**
	 * 获取当前时间(小时)
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getHour(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.HOUR_OF_DAY);
	}

	/**
	 * 获取当前时间(分)
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getMinute(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.MINUTE);
	}

	/**
	 * 获取当前时间(秒)
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static int getSecond(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.get(Calendar.SECOND);
	}

	/**
	 * 获取当前毫秒
	 * 
	 * @param date
	 * 
	 * @return
	 */
	public static long getMillis(Date date) {
		Calendar c = Calendar.getInstance();
		c.setTime(date);
		return c.getTimeInMillis();
	}

	/**
	 * 日期增加
	 * 
	 * @param date
	 *            Date
	 * 
	 * @param day
	 *            int
	 * 
	 * @return Date
	 */
	public static Date addDate(Date date, int day) {
		java.util.Calendar c = java.util.Calendar.getInstance();
		c.setTimeInMillis(getMillis(date) + ((long) day) * 24 * 3600 * 1000);
		return c.getTime();
	}

	/**
	 * 日期相减(返回天数)
	 * 
	 * @param date
	 *            Date
	 * 
	 * @param date1
	 *            Date
	 * 
	 * @return int 相差的天数
	 */
	public static int diffDate(Date date, Date date1) {
		return (int) ((getMillis(date) - getMillis(date1)) / (24 * 3600 * 1000));
	}

	/**
	 * 日期相减(返回秒值)
	 * 
	 * @param date
	 *            Date
	 * @param date1
	 *            Date
	 * @return int
	 * @author
	 */
	public static Long diffDateTime(Date date, Date date1) {
		return (Long) ((getMillis(date) - getMillis(date1)) / 1000);
	}

	private static String[] randomValues = new String[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "a", "b",
			"c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "u", "t", "s", "o", "x", "v", "p", "q", "r",
			"w", "y", "z" };

	public static String getRandomNumber(int lenght) {
		StringBuffer str = new StringBuffer();
		for (int i = 0; i < lenght; i++) {
			Double number = Math.random() * (randomValues.length - 1);
			str.append(randomValues[number.intValue()]);
		}
		return str.toString();
	}

	/**
	 * 生成账号
	 * 
	 * @param acount
	 * @return
	 */
	public static String nextAcounnt(String acount) {
		String newAcc = "";
		if (Integer.parseInt(acount) < 10000) {
			Integer newAc = Integer.parseInt(acount) + 1;
			if (newAc < 1000) {
				int count = String.valueOf(newAc).length();
				if (count == 1) {
					newAcc = "000" + newAc;
				} else if (count == 2) {
					newAcc = "00" + newAc;
				} else if (count == 3) {
					newAcc = "0" + newAc;
				}
			} else {
				newAcc = String.valueOf(newAc);
			}
		} else {
			newAcc = acount;
		}
		return newAcc;
	}

	public static boolean isNumeric1(String str) {
		if (str != null && !"".equals(str) && str.length() <= 9) {
			Pattern pattern = Pattern.compile("[0-9]*");
			return pattern.matcher(str).matches();
		} else {
			return false;
		}
	}

	/**
	 * 生成流水号
	 * 
	 * @param t
	 *            流水号位数
	 * @return 流水号
	 */
	public static String getSequenceNumber(int t) {
		Date d = new Date();
		SimpleDateFormat sdf = new SimpleDateFormat("yyyyMMddhhmmss");
		String str = sdf.format(d);
		String haomiao = String.valueOf(System.nanoTime());
		str = str + haomiao.substring(haomiao.length() - 6, haomiao.length());
		return str.substring(str.length() - t, str.length());
	}
	
	/**
	 * 获得本日星期数,星期一:1,星期日:7
	 * 如果传入null则默认为本日
	 * @return
	 */
	public static int getDayOfWeek(Calendar calendar){
		int today;
		if(calendar!=null){
			today=calendar.get(Calendar.DAY_OF_WEEK);
		}else{
			today = Calendar.getInstance().get(Calendar.DAY_OF_WEEK);
		}
		if(today==1)
			return 7;
		else
			return today-1;
	}
	
	/**
	 * 获取指定时间一周的第一天
	 * @return
	 */
	public static Date getFirstDayOfWeek(Date date){
		if(date == null){
			date = getToday();
		}
		int week = getWeek(date);
		
		return getAddDayDate(date,1-week);
	}
	
	/**
	 * 获取指定时间一周的第一天
	 * @return
	 */
	public static String getFirstDayOfWeek(String workday){
		Date date = DateUtil.parseDate(workday, "yyyy-MM-dd");
		if(date == null){
			date = getToday();
		}
		int week = getWeek(date);
		
		return DateUtil.formatDate("yyyy-MM-dd", getAddDayDate(date,1-week));
	}

	public List<String> process(String date1, String date2) {
		SimpleDateFormat format = new SimpleDateFormat(DEFAULT_PATTERN);
		List<String> list_date=new ArrayList<String>();
		if(date1.equals(date2)){
			list_date.add(date1);
		    return list_date;
		}
		
		String tmp;
		if(date1.compareTo(date2) > 0){   //确保 date1的日期不晚于date2
			tmp = date1; date1 = date2; date2 = tmp;
		}
		
		tmp = format.format(strToDate(date1).getTime() + 3600*24*1000);

        while(tmp.compareTo(date2) < 0){        	        
        	list_date.add(tmp);
        	tmp = format.format(strToDate(tmp).getTime() + 3600*24*1000);
        }
        return list_date;
	}

	private Date strToDate(String str) {
		if (str == null) return null;		
		try {
			return new SimpleDateFormat(DEFAULT_PATTERN).parse(str);
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static void main(String[] args) {
		Date date = DateUtil.parseDate("2015-09-09", "yyyy-MM-dd");
		System.out.println(DateUtil.formatDate("yyyy-MM-dd", getFirstDayOfWeek(date)));
		System.out.println(getWhileWeekOfMonth(date));
	}
	
}