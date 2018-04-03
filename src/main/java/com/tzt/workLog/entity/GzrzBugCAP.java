package com.tzt.workLog.entity;

import com.tzt.workLog.entity.BaseEntity;
import java.util.Date;

public class GzrzBugCAP extends BaseEntity {

	private static final long serialVersionUID = 1L;

	/**
	 * ID
	 */
	private Integer ID;

	/**
	 * 级别
	 */
	private Integer LEVEL;

	/**
	 * 标题
	 */
	private String TITLE;

	/**
	 * 状态
	 */
	private Integer STATUS;

	/**
	 * 严重程度
	 */
	private Integer SEVERITY;

	/**
	 * 所属项目id
	 */
	private Integer PROJECTID;

	/**
	 * 所属项目名称
	 */
	private String PROJECTNAME;

	/**
	 * 所属模块
	 */
	private Integer MODELID;

	/**
	 * 创建者工号
	 */
	private String USERCODE;

	/**
	 * 创建者姓名
	 */
	private String NAME;

	/**
	 * 创建时间
	 */
	private Date ADDTIME;

	/**
	 * 内容
	 */
	private String CONTENT;

	/**
	 * 指派给工号
	 */
	private String ASSIGNEDCODE;

	/**
	 * 指派给工号-对应名称
	 */
	private String ASSIGNEDNAME;

	/**
	 * 修改时间
	 */
	private Date SOLVETIME;

	/**
	 * BUG类型
	 */
	private Integer BUGTYPE;

	/**
	 * 影响版本
	 */
	private String AFFECTVERSION;

	/**
	 * 指派记录
	 */
	private String ASSIGNEDRECORD;

	/**
	 * 状态修改记录
	 */
	private String STATUSRECORD;

	/**
	 * 操作系统
	 */
	private Integer SYSTEMTYPE;

	/**
	 * 浏览器
	 */
	private Integer BROWSER;

	/**
	 * 备注
	 */
	private String REMARKS;

	public Integer getID() {
		return ID;
	}

	public void setID(Integer iD) {
		ID = iD;
	}

	public Integer getLEVEL() {
		return LEVEL;
	}

	public void setLEVEL(Integer lEVEL) {
		LEVEL = lEVEL;
	}

	public String getTITLE() {
		return TITLE;
	}

	public void setTITLE(String tITLE) {
		TITLE = tITLE;
	}

	public Integer getSTATUS() {
		return STATUS;
	}

	public void setSTATUS(Integer sTATUS) {
		STATUS = sTATUS;
	}

	public Integer getSEVERITY() {
		return SEVERITY;
	}

	public void setSEVERITY(Integer sEVERITY) {
		SEVERITY = sEVERITY;
	}

	public Integer getPROJECTID() {
		return PROJECTID;
	}

	public void setPROJECTID(Integer pROJECTID) {
		PROJECTID = pROJECTID;
	}

	public String getPROJECTNAME() {
		return PROJECTNAME;
	}

	public void setPROJECTNAME(String pROJECTNAME) {
		PROJECTNAME = pROJECTNAME;
	}

	public Integer getMODELID() {
		return MODELID;
	}

	public void setMODELID(Integer mODELID) {
		MODELID = mODELID;
	}

	public String getUSERCODE() {
		return USERCODE;
	}

	public void setUSERCODE(String uSERCODE) {
		USERCODE = uSERCODE;
	}

	public String getNAME() {
		return NAME;
	}

	public void setNAME(String nAME) {
		NAME = nAME;
	}

	public Date getADDTIME() {
		return ADDTIME;
	}

	public void setADDTIME(Date aDDTIME) {
		ADDTIME = aDDTIME;
	}

	public String getCONTENT() {
		return CONTENT;
	}

	public void setCONTENT(String cONTENT) {
		CONTENT = cONTENT;
	}

	public String getASSIGNEDCODE() {
		return ASSIGNEDCODE;
	}

	public void setASSIGNEDCODE(String aSSIGNEDCODE) {
		ASSIGNEDCODE = aSSIGNEDCODE;
	}

	public String getASSIGNEDNAME() {
		return ASSIGNEDNAME;
	}

	public void setASSIGNEDNAME(String aSSIGNEDNAME) {
		ASSIGNEDNAME = aSSIGNEDNAME;
	}

	public Date getSOLVETIME() {
		return SOLVETIME;
	}

	public void setSOLVETIME(Date sOLVETIME) {
		SOLVETIME = sOLVETIME;
	}

	public Integer getBUGTYPE() {
		return BUGTYPE;
	}

	public void setBUGTYPE(Integer bUGTYPE) {
		BUGTYPE = bUGTYPE;
	}

	public String getAFFECTVERSION() {
		return AFFECTVERSION;
	}

	public void setAFFECTVERSION(String aFFECTVERSION) {
		AFFECTVERSION = aFFECTVERSION;
	}

	public String getASSIGNEDRECORD() {
		return ASSIGNEDRECORD;
	}

	public void setASSIGNEDRECORD(String aSSIGNEDRECORD) {
		ASSIGNEDRECORD = aSSIGNEDRECORD;
	}

	public String getSTATUSRECORD() {
		return STATUSRECORD;
	}

	public void setSTATUSRECORD(String sTATUSRECORD) {
		STATUSRECORD = sTATUSRECORD;
	}

	public Integer getSYSTEMTYPE() {
		return SYSTEMTYPE;
	}

	public void setSYSTEMTYPE(Integer sYSTEMTYPE) {
		SYSTEMTYPE = sYSTEMTYPE;
	}

	public Integer getBROWSER() {
		return BROWSER;
	}

	public void setBROWSER(Integer bROWSER) {
		BROWSER = bROWSER;
	}

	public String getREMARKS() {
		return REMARKS;
	}

	public void setREMARKS(String rEMARKS) {
		REMARKS = rEMARKS;
	}

	public GzrzBugCAP() {
	}

}