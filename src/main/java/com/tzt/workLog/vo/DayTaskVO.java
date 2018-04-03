package com.tzt.workLog.vo;

public class DayTaskVO implements BaseVO {

	/**
	*ID
	*/
	private Integer Id;

	/**
	*任务内容
	*/
	private String Content;

	/**
	*日报日期(YYYY-MM-DD)
	*/
	private String Workdate;

	/**
	*责任人工号(索引)
	*/
	private String Usercode;

	/**
	*责任人姓名
	*/
	private String Username;
	
	/**
	*用时
	*/
	private Double Usedtimes;

	/**
	*确认用时
	*/
	private Double Confirmtimes;
	
	/**
	*状态(0:未完成/1：已完成)
	*/
	private Integer Status;

	/**
	*所属项目ID
	*/
	private Integer projectId;

	/**
	*所属项目名称
	*/
	private String projectName;
	
	/**
	*上报日期
	*/
	private String Adddate;

	/**
	 * 回复组合
	 */
	private String strRemarks;

	/**
	*年度
	*/
	private Integer Year;

	/**
	*月份
	*/
	private Integer Month;

	/**
	*周度
	*/
	private Integer Week;
	
	/**
	*是否确认(1未确认/2已确认)
	*/
	private Integer Isconfirm;
	
	public Integer getId() {
		return Id;
	}

	public void setId(Integer id) {
		Id = id;
	}

	public String getContent() {
		return Content;
	}

	public void setContent(String content) {
		Content = content;
	}

	public String getWorkdate() {
		return Workdate;
	}

	public void setWorkdate(String workdate) {
		Workdate = workdate;
	}

	public String getUsercode() {
		return Usercode;
	}

	public void setUsercode(String usercode) {
		Usercode = usercode;
	}

	public Double getUsedtimes() {
		return Usedtimes;
	}

	public void setUsedtimes(Double usedtimes) {
		Usedtimes = usedtimes;
	}

	public Integer getStatus() {
		return Status;
	}

	public void setStatus(Integer status) {
		Status = status;
	}

	public Integer getProjectId() {
		return projectId;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public String getAdddate() {
		return Adddate;
	}

	public void setAdddate(String adddate) {
		Adddate = adddate;
	}
	
	public String getStrRemarks() {
		return strRemarks;
	}

	public void setStrRemarks(String strRemarks) {
		this.strRemarks = strRemarks;
	}

	public String getUsername() {
		return Username;
	}

	public void setUsername(String username) {
		Username = username;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public Integer getYear() {
		return Year;
	}

	public void setYear(Integer year) {
		Year = year;
	}

	public Integer getMonth() {
		return Month;
	}

	public void setMonth(Integer month) {
		Month = month;
	}

	public Integer getWeek() {
		return Week;
	}

	public void setWeek(Integer week) {
		Week = week;
	}

	public Double getConfirmtimes() {
		return Confirmtimes;
	}

	public void setConfirmtimes(Double confirmtimes) {
		Confirmtimes = confirmtimes;
	}

	public Integer getIsconfirm() {
		return Isconfirm;
	}

	public void setIsconfirm(Integer isconfirm) {
		Isconfirm = isconfirm;
	}

	@Override
	public void convertPOToVO(Object poObj) {
	}

}