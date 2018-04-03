package com.tzt.workLog.vo;

import java.util.ArrayList;
import java.util.List;
import com.tzt.workLog.core.mybatis.page.Page;

@SuppressWarnings({"rawtypes","unchecked"})
public class PageVO<T extends BaseVO> {
	
	List<T> pageData = new ArrayList<T>();
	
	private int currentPage;
	
	private int totalPage;
	
	private int pageSize;
	
	private int totalRows;
	
	public PageVO(int pageSize,int currentPage,int totalRows){
		this.pageSize = pageSize;
		this.currentPage = currentPage;
		this.totalRows   = totalRows;
		
		totalPage = totalRows%pageSize==0?totalRows/pageSize:totalRows/pageSize+1;
	}
	
	/**
	 * 转换数据库取出来的List到页面展示需要的page
	 * @param poList
	 * @param VOType
	 */
	public PageVO(List poList,Class<T> VOType){
		if(poList!=null){
			this.totalPage   =1;		
			this.totalRows   = poList.size();		
			this.currentPage = 1;
			this.pageSize    = poList.size();
		
			this.convertPagePOtoVO(poList, VOType);
		}
		
	}
	
	/**
	 * 转换数据库取出来的page到页面展示需要的page,
	 * @param page
	 * @param VOType  //目标VO的class 对象
	 */
	public PageVO(Page page,Class<T> VOType){
		this(page.getPageSize(),page.getPageNumber(),page.getTotalCount());
		
		this.convertPagePOtoVO(page.getResult(), VOType);
	}
	
	
	private void convertPagePOtoVO(List poList,Class<T> VOType){
		try {
			//Method method = MethodUtils.getAccessibleMethod(VOType, "convertPOToVO", Object.class);
			for(Object poObj:poList){
				BaseVO voObj = (BaseVO)VOType.newInstance();
				voObj.convertPOToVO(poObj);
				pageData.add((T)voObj);
			}
		} catch (InstantiationException e) {
			e.printStackTrace();
		} catch (IllegalAccessException e) {
			e.printStackTrace();
		} 
	}
	
	public List<T> getPageData() {
		return pageData;
	}

	public void setPageData(List<T> pageData) {
		this.pageData = pageData;
	}

	public int getCurrentPage() {
		return currentPage;
	}

	
	public int getPageSize() {
		return pageSize;
	}
	
	/**
	 * 
	 * @param currentPage
	 */
	public void setCurrentPage(int currentPage) {
		this.currentPage = currentPage;
	}

	public int getTotalPage() {
		return totalPage;
	}

	public void setTotalPage(int totalPage) {
		this.totalPage = totalPage;
	}

	public int getTotalRows() {
		return totalRows;
	}
}
