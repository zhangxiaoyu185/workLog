package com.tzt.workLog.vo;

import java.util.Map;
import com.tzt.workLog.entity.GzrzUser;

/**
 * 用户VO
 */
public class UserVO implements BaseVO {

	/**
	*ID
	*/
	private Integer Id;

	/**
	*角色集合
	*/
	private String Roles;
	
	/**
	*角色名集合
	*/
	private String RoleNames;
	
	/**
	*工号
	*/
	private String Code;

	/**
	*姓名
	*/
	private String Name;

	/**
	*密码
	*/
	private String Pwd;
	
	/**
	*状态（0不启用/1启用）
	*/
	private String Status;
	
	/**
	 * 手机号
	 */
	private String mobile;
	
	/**
	 * 邮箱
	 */
	private String email;
	
	/**
	 * 菜单Map
	 */
	private Map<String, Object> menuMap;
	
	public void setId(Integer Id) {
		this.Id = Id;
	}

	public Integer getId( ) {
		return Id;
	}

	public void setCode(String Code) {
		this.Code = Code;
	}

	public String getCode( ) {
		return Code;
	}

	public void setName(String Name) {
		this.Name = Name;
	}

	public String getName( ) {
		return Name;
	}

	public void setPwd(String Pwd) {
		this.Pwd = Pwd;
	}

	public String getPwd( ) {
		return Pwd;
	}

	public String getStatus() {
		return Status;
	}

	public void setStatus(String status) {
		Status = status;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getRoles() {
		return Roles;
	}

	public void setRoles(String roles) {
		Roles = roles;
	}

	public String getRoleNames() {
		return RoleNames;
	}

	public void setRoleNames(String roleNames) {
		RoleNames = roleNames;
	}

	public Map<String, Object> getMenuMap() {
		return menuMap;
	}

	public void setMenuMap(Map<String, Object> menuMap) {
		this.menuMap = menuMap;
	}

	public UserVO( ) { 
	}

	@Override
	public void convertPOToVO(Object poObj) {
		if (null == poObj) {
			return;
		}

		GzrzUser po = (GzrzUser) poObj;
		this.Code = po.getCode();
		this.email = po.getEmail();
		this.Id = po.getId();
		this.mobile = po.getMobile();
		this.Name = po.getName();
		this.Pwd = po.getPwd();
		this.Roles = po.getRoles();
		this.Status = po.getStatus();
	}

}