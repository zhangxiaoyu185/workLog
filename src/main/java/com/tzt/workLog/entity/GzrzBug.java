package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzBug extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	*ID
	*/
	private Integer Id;

	/**
	*级别
	*/
	private Integer Level;

	/**
	*标题
	*/
	private String Title;

	/**
	*状态
	*/
	private Integer Status;

	/**
	*严重程度
	*/
	private Integer Severity;

	/**
	*所属项目id
	*/
	private Integer projectId;

	/**
	*所属项目名称
	*/
	private String projectName;
	
	/**
	*所属模块
	*/
	private Integer modelId;

	/**
	*创建者工号
	*/
	private String Usercode;

	/**
	*创建者姓名
	*/
	private String Name;

	/**
	*创建时间
	*/
	private Date addTime;

	/**
	*内容
	*/
	private String Content;

	/**
	*指派给工号
	*/
	private String assignedCode;
	
	/**
	*指派给工号-对应名称
	*/
	private String assignedName;

	/**
	*修改时间
	*/
	private Date solveTime;

	/**
	*BUG类型
	*/
	private Integer bugType;

	/**
	*影响版本
	*/
	private String affectVersion;

	/**
	*指派记录
	*/
	private String assignedRecord;

	/**
	*状态修改记录
	*/
	private String statusRecord;
	
	/**
	*操作系统
	*/
	private Integer systemType;

	/**
	*浏览器
	*/
	private Integer Browser;

	/**
	*备注
	*/
	private String Remarks;
	
	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setLevel(Integer Level) {
		this.Level = Level;
	}

	public Integer getLevel( ) {
		return Level;
	}

	public void setTitle(String Title) {
		this.Title = Title;
	}

	public String getTitle( ) {
		return Title;
	}

	public void setStatus(Integer Status) {
		this.Status = Status;
	}

	public Integer getStatus( ) {
		return Status;
	}

	public void setSeverity(Integer Severity) {
		this.Severity = Severity;
	}

	public Integer getSeverity( ) {
		return Severity;
	}

	public void setProjectId(Integer projectId) {
		this.projectId = projectId;
	}

	public Integer getProjectId( ) {
		return projectId;
	}

	public String getProjectName() {
		return projectName;
	}

	public void setProjectName(String projectName) {
		this.projectName = projectName;
	}

	public void setModelId(Integer modelId) {
		this.modelId = modelId;
	}

	public Integer getModelId( ) {
		return modelId;
	}

	public void setUsercode(String Usercode) {
		this.Usercode = Usercode;
	}

	public String getUsercode( ) {
		return Usercode;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getName( ) {
		return Name;
	}

	public void setAddTime(Date addTime) {
		this.addTime = addTime;
	}

	public Date getAddTime( ) {
		return addTime;
	}

	public void setContent(String Content) {
		this.Content = Content;
	}

	public String getContent( ) {
		return Content;
	}

	public void setAssignedCode(String assignedCode) {
		this.assignedCode = assignedCode;
	}

	public String getAssignedCode( ) {
		return assignedCode;
	}

	public String getAssignedName() {
		return assignedName;
	}

	public void setAssignedName(String assignedName) {
		this.assignedName = assignedName;
	}

	public void setSolveTime(Date solveTime) {
		this.solveTime = solveTime;
	}

	public Date getSolveTime( ) {
		return solveTime;
	}

	public void setBugType(Integer bugType) {
		this.bugType = bugType;
	}

	public Integer getBugType( ) {
		return bugType;
	}

	public void setAffectVersion(String affectVersion) {
		this.affectVersion = affectVersion;
	}

	public String getAffectVersion( ) {
		return affectVersion;
	}

	public void setAssignedRecord(String assignedRecord) {
		this.assignedRecord = assignedRecord;
	}

	public String getAssignedRecord( ) {
		return assignedRecord;
	}

	public String getStatusRecord() {
		return statusRecord;
	}

	public void setStatusRecord(String statusRecord) {
		this.statusRecord = statusRecord;
	}

	public void setSystemType(Integer systemType) {
		this.systemType = systemType;
	}

	public Integer getSystemType( ) {
		return systemType;
	}

	public void setBrowser(Integer Browser) {
		this.Browser = Browser;
	}

	public Integer getBrowser( ) {
		return Browser;
	}

	public String getRemarks() {
		return Remarks;
	}

	public void setRemarks(String remarks) {
		Remarks = remarks;
	}

	public GzrzBug( ) { 
	}

	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		GzrzBugCAP po = (GzrzBugCAP) poObj;
		this.addTime = po.getADDTIME();
		this.affectVersion = po.getAFFECTVERSION();
		this.assignedCode = po.getASSIGNEDCODE();
		this.assignedName = po.getASSIGNEDNAME();
		this.assignedRecord = po.getASSIGNEDRECORD();
		this.Browser = po.getBROWSER();
		this.bugType = po.getBUGTYPE();
		this.Content = po.getCONTENT();
		this.Id = po.getID();
		this.Level = po.getLEVEL();
		this.modelId = po.getMODELID();
		this.Name = po.getNAME();
		this.projectId = po.getPROJECTID();
		this.projectName = po.getPROJECTNAME();
		this.Remarks = po.getREMARKS();
		this.Severity = po.getSEVERITY();
		this.solveTime = po.getSOLVETIME();
		this.Status = po.getSTATUS();
		this.statusRecord = po.getSTATUSRECORD();
		this.systemType = po.getSYSTEMTYPE();
		this.Title = po.getTITLE();
		this.Usercode = po.getUSERCODE();
	}

}