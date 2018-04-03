package com.tzt.workLog.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.Iterator;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;
import org.springframework.web.multipart.commons.CommonsMultipartResolver;
import com.tzt.workLog.core.mybatis.page.Page;
import com.tzt.workLog.entity.GzrzBug;
import com.tzt.workLog.entity.GzrzBugCAP;
import com.tzt.workLog.entity.GzrzModel;
import com.tzt.workLog.service.GzrzBugService;
import com.tzt.workLog.service.GzrzModelService;
import com.tzt.workLog.tool.DateUtil;
import com.tzt.workLog.tool.StringUtil;
import com.tzt.workLog.tool.init.ConfigIni;
import com.tzt.workLog.tool.out.ResultMessageBuilder;
import com.tzt.workLog.vo.BugVO;
import com.tzt.workLog.vo.BugsVO;

@Controller
@RequestMapping(value = "/bug")
public class BugController extends BaseController {

	@Autowired
	private GzrzBugService gzrzBugService;

	@Autowired
	private GzrzModelService gzrzModelService;

	/**
	 * 新增bug
	 * 
	 * @param gzrzBugCap
	 * @param response
	 */
	@RequestMapping(value = "/insertBug", method = RequestMethod.POST)
	public void insertProject(GzrzBugCAP gzrzBugCap,
			HttpServletResponse response) {
		logger.info("insertBug start");
		GzrzBug gzrzBug = new GzrzBug();
		gzrzBug.convertPOToVO(gzrzBugCap);
		if (StringUtil.isEmpty(gzrzBug.getContent())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "bug内容不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(gzrzBug.getAssignedCode())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "指派人不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(gzrzBug.getTitle())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "标题不能为空!"), response);
			return;
		}
		if (gzrzBug.getProjectId() == null || gzrzBug.getProjectId() == 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "所属项目不能为空!"),
					response);
			return;
		}
		Date date = new Date();
		gzrzBug.setAddTime(date);// 创建时间
		StringBuffer assigned_recordBuffer = new StringBuffer(
				DateUtil.formatTimesTampDate(date) + ",由")
				.append("<span style='font-weight:bold;'>" + gzrzBug.getName()
						+ "</span>创建。<br> ")
				.append(DateUtil.formatTimesTampDate(date) + ",由")
				.append("<span style='font-weight:bold;'>" + gzrzBug.getName()
						+ "</span>指派给")
				.append("<span style='font-weight:bold;'>"
						+ gzrzBug.getAssignedName() + "</span>。<br> ");
		gzrzBug.setAssignedRecord(assigned_recordBuffer.toString());
		// gzrzBug.setSolveTime(new Date());//解决时间
		// System.out.println("gzrzBug:" + gzrzBug);
		Boolean boolBug = gzrzBugService.insertGzrzBug(gzrzBug);
		if (boolBug) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(true, 1, "新增bug成功!"), response);
		} else {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "新增bug失败!"), response);
		}
		logger.info("insertBug end");
	}

	/**
	 * 根据项目ID、项目名称、指派给人工号查询bug列表(测试和个人、项目经理、总监和管理员通用)
	 * (测试查询所测项目的BUG,先查出测试提了哪几个项目的bug，再用个in查询根据项目名称、指派给人工号查询bug列表)
	 * (个人查询参与项目的BUG,先查出参与的项目，再用个in查询根据项目名称、指派给人工号查询bug列表)
	 * (总监和管理员公用一个查询bug的接口(根据项目名称、指派给人工号查询bug列表)
	 * (项目经理查询bug一个接口(查询所管理项目的BUG,先查出管理的项目，再用个in查询根据项目名称、指派给人工号查询bug列表)
	 * 
	 * @param USERCODE
	 * @param TITLE
	 * @param PROJECTNAME
	 * @param ASSIGNED_NAME
	 * @param response
	 */
	@RequestMapping(value = "/getBugsByConditions", method = RequestMethod.POST)
	public void getBugsByConditions(Integer PAGENUM, Integer PAGESIZE,
			Integer STATUS, Integer ROLE_ID, String USERCODE, String TITLE,
			String PROJECT_NAME, String ASSIGNED_NAME,
			HttpServletResponse response) {
		logger.info("getBugsByConditions start");
		if (PAGENUM == null || PAGENUM == 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[pageNum]不能为空！"),
					response);
			return;
		}
		if (PAGESIZE == null || PAGESIZE == 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[pageSize]不能为空！"),
					response);
			return;
		}
		if (ROLE_ID != null && ROLE_ID < 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[ROLE_ID]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(USERCODE)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[USERCODE]不能为空!"),
					response);
			return;
		}
		Page<GzrzBug> list = gzrzBugService.getGzrzBugsByConditions(PAGENUM,
				PAGESIZE, STATUS, ROLE_ID, USERCODE, TITLE, PROJECT_NAME,
				ASSIGNED_NAME);
		int len = list.getTotalCount();
		BugsVO bugsVO = new BugsVO();
		bugsVO.setCount(len);
		
		List<BugVO> voList = new ArrayList<>();
		if (len > 0) {
			BugVO vo;
			for (GzrzBug gzrzBug : list.getResult()) {
				vo = new BugVO();

				vo.setId(gzrzBug.getId());
				vo.setLevel(gzrzBug.getLevel());
				vo.setTitle(gzrzBug.getTitle());
				vo.setStatus(gzrzBug.getStatus());

				vo.setSeverity(gzrzBug.getSeverity());
				vo.setProjectId(gzrzBug.getProjectId());
				vo.setProjectName(gzrzBug.getProjectName());
				vo.setModelId(gzrzBug.getModelId());

				vo.setUsercode(gzrzBug.getUsercode());
				vo.setName(gzrzBug.getName());
				vo.setAddTime(gzrzBug.getAddTime());
				vo.setContent(gzrzBug.getContent());

				vo.setAssignedCode(gzrzBug.getAssignedCode());
				vo.setAssignedName(gzrzBug.getAssignedName());

				vo.setSolveTime(gzrzBug.getSolveTime());
				vo.setBugType(gzrzBug.getBugType());
				vo.setAffectVersion(gzrzBug.getAffectVersion());
				vo.setAssignedRecord(gzrzBug.getAssignedRecord());

				vo.setStatusRecord(gzrzBug.getStatusRecord());
				vo.setSystemType(gzrzBug.getSystemType());
				vo.setBrowser(gzrzBug.getBrowser());
				vo.setRemarks(gzrzBug.getRemarks());

				voList.add(vo);
			}
			bugsVO.setList(voList);
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "分页查询bug列表成功！", bugsVO), response);
		} else {
			writeAjaxJSONResponse(ResultMessageBuilder.build(true, -1, "无数据！", bugsVO), response);
		}
		logger.info("getBugsByConditions end");
	}

	/**
	 * 修改bug（需要判断状态是否改变、指派人是否改变），最后改变指派记录和状态修改记录
	 * 
	 * @param OLD_STATUS
	 * @param OLD_ASSIGNEDCODE
	 * @param USERNAME
	 * @param gzrzBugCap
	 * @param response
	 */
	@RequestMapping(value = "/updateBugs", method = RequestMethod.POST)
	public void updateBugs(Integer OLD_STATUS, String OLD_ASSIGNEDCODE,
			String USERNAME, GzrzBugCAP gzrzBugCap, HttpServletResponse response) {
		logger.info("updateBugs start");
		GzrzBug gzrzBug = new GzrzBug();
		gzrzBug.convertPOToVO(gzrzBugCap);
		if (OLD_STATUS == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[OLD_STATUS]不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(OLD_ASSIGNEDCODE)) {
			writeAjaxJSONResponse(ResultMessageBuilder.build(false, -1,
					"[OLD_ASSIGNEDCODE]不能为空!"), response);
			return;
		}

		if (gzrzBug.getId() == null || gzrzBug.getId() == 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "bugID不能为空!"),
					response);
			return;
		}
		if (StringUtil.isEmpty(gzrzBug.getAssignedCode())) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "指派人不能为空!"), response);
			return;
		}
		if (StringUtil.isEmpty(USERNAME)) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "USERNAME不能为空!"),
					response);
			return;
		}
		if (gzrzBug.getStatus() == null) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "状态不能为空!"), response);
			return;
		}
		Date date = new Date();
		GzrzBug gzrzBugOld = gzrzBugService.getGzrzBug(gzrzBug);
		// 指派人是否改变，如改变：追加指派记录信息；否则保持原样
		String newAssignedCode = gzrzBug.getAssignedCode();
		if (!"".equals(newAssignedCode)
				&& !OLD_ASSIGNEDCODE.equals(newAssignedCode)) {// 指定人改变，追加指派记录信息
		// GzrzBug gzrzBug1 = gzrzBugService.getGzrzBug(gzrzBug);
			StringBuffer buffer = new StringBuffer(
					(gzrzBugOld.getAssignedRecord() == null ? ""
							: gzrzBugOld.getAssignedRecord()))
					.append(DateUtil.formatTimesTampDate(date) + ",由")
					.append("<span style='font-weight:bold;'>" + USERNAME
							+ "</span>指派给")
					.append("<span style='font-weight:bold;'>"
							+ (gzrzBug.getAssignedName() == null ? "" : gzrzBug
									.getAssignedName()) + "</span>。<br>");
			gzrzBug.setAssignedRecord(buffer.toString());
		}

		// 判断bug状态是否改变，如改变：追加状态修改记录；否则保持原样
		int newStatus = gzrzBug.getStatus();
		if (OLD_STATUS != newStatus) {// 状态改变，追加状态记录信息
			StringBuffer buffer = new StringBuffer(
					(gzrzBugOld.getStatusRecord() == null ? ""
							: gzrzBugOld.getStatusRecord()))
					.append(DateUtil.formatTimesTampDate(date) + ",由")
					.append("<span style='font-weight:bold;'>" + USERNAME
							+ "</span>将状态由")
					.append(ConfigIni.getIniStrValue("BUG_STATUS",
							String.valueOf(OLD_STATUS)))
					.append("改为<span style='font-weight:bold;'>"
							+ ConfigIni.getIniStrValue("BUG_STATUS", String
									.valueOf((gzrzBug.getStatus() == 0 ? 1
											: gzrzBug.getStatus())))
							+ "</span>。<br>");
			gzrzBug.setStatusRecord(buffer.toString());
		}
		gzrzBug.setSolveTime(new Date());
		boolean boolUpd = gzrzBugService.updateGzrzBug(gzrzBug);
		if (boolUpd) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, 1, "bug修改成功!"), response);
		} else {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "bug修改失败!"), response);
		}
		logger.info("updateBugs end");
	}

	/**
	 * 查询bug详情
	 * 
	 * @param BUGID
	 * @param response
	 */
	@RequestMapping(value = "/getBugsbyId", method = RequestMethod.POST)
	public void getBugsbyId(Integer BUGID, HttpServletResponse response) {
		logger.info("getBugsbyId start");
		if (BUGID != null && BUGID <= 0) {
			writeAjaxJSONResponse(
					ResultMessageBuilder.build(false, -1, "[BUGID]不能为空!"),
					response);
			return;
		}
		GzrzBug gzrzBug = new GzrzBug();
		gzrzBug.setId(BUGID);
		gzrzBug = gzrzBugService.getGzrzBug(gzrzBug);
		BugVO vo = new BugVO();
		if (gzrzBug != null) {
			vo.setId(gzrzBug.getId());
			vo.setLevel(gzrzBug.getLevel());
			vo.setTitle(gzrzBug.getTitle());
			vo.setStatus(gzrzBug.getStatus());

			vo.setSeverity(gzrzBug.getSeverity());
			vo.setProjectId(gzrzBug.getProjectId());
			vo.setProjectName(gzrzBug.getProjectName());
			vo.setModelId(gzrzBug.getModelId());

			vo.setUsercode(gzrzBug.getUsercode());
			vo.setName(gzrzBug.getName());
			vo.setAddTime(gzrzBug.getAddTime());
			vo.setContent(gzrzBug.getContent());

			vo.setAssignedCode(gzrzBug.getAssignedCode());
			vo.setAssignedName(gzrzBug.getAssignedName());

			vo.setSolveTime(gzrzBug.getSolveTime());
			vo.setBugType(gzrzBug.getBugType());
			vo.setAffectVersion(gzrzBug.getAffectVersion());
			vo.setAssignedRecord(gzrzBug.getAssignedRecord());

			vo.setStatusRecord(gzrzBug.getStatusRecord());
			vo.setSystemType(gzrzBug.getSystemType());
			vo.setBrowser(gzrzBug.getBrowser());
			vo.setRemarks(gzrzBug.getRemarks());

			GzrzModel gzrzModel = new GzrzModel();
			gzrzModel.setId(gzrzBug.getModelId());
			gzrzModel = gzrzModelService.getGzrzModel(gzrzModel);
			vo.setModelName(gzrzModel.getName());
		}
		writeAjaxJSONResponse(
				ResultMessageBuilder.build(true, 1, "获取bug信息详情成功！", vo),
				response);
		logger.info("getBugsbyId end");
	}

	/**
	 * springMvc自带 上传附件（包括文件、图片、压缩包、音频）
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws IllegalStateException
	 * @throws IOException
	 */
	@RequestMapping(value = "/upload")
	public void upLoad(HttpServletRequest request, HttpServletResponse response)
			throws IllegalStateException, IOException {
		// 解析器解析request的上下文/创建一个通用的多部分解析器
		CommonsMultipartResolver multipartResolver = new CommonsMultipartResolver(
				request.getSession().getServletContext());
		// 先判断request中是否包涵multipart类型的数据，
		if (multipartResolver.isMultipart(request)) {
			// 再将request中的数据转化成multipart类型的数据
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest) request;
			// 取得request中的所有文件名
			Iterator<String> iter = multiRequest.getFileNames();
			while (iter.hasNext()) {
				// 记录上传过程起始时的时间，用来计算上传时间
				int pre = (int) System.currentTimeMillis();
				// 取得上传文件
				MultipartFile file = multiRequest.getFile(iter.next());
				if (file != null) {
					String fileName = file.getOriginalFilename();

					String path = ConfigIni.getIniStrValue("IMAGE_PIC", "PATH",
							"D:/axImage/") + fileName;
					File localFile = new File(path);
					// 写文件到本地
					file.transferTo(localFile);
				}
				// 记录上传该文件后的时间
				int finaltime = (int) System.currentTimeMillis();
				System.out.println(finaltime - pre);
			}
		}
		writeAjaxJSONResponse(ResultMessageBuilder.build(true, 1, "操作成功!"),
				response);
	}

}