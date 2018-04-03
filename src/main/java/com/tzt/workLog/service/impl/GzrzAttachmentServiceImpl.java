package com.tzt.workLog.service.impl;

import com.tzt.workLog.service.GzrzAttachmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.tzt.workLog.core.mybatis.dao.MyBatisDAO;
import com.tzt.workLog.entity.GzrzAttachment;

@Service("gzrzAttachmentService")
public class GzrzAttachmentServiceImpl implements GzrzAttachmentService {

	@Autowired
	private MyBatisDAO myBatisDAO;

	@Override
	public boolean insertGzrzAttachment(GzrzAttachment gzrzAttachment) {
		myBatisDAO.insert(gzrzAttachment);
		return true;
	}

	@Override
	public boolean updateGzrzAttachment(GzrzAttachment gzrzAttachment) {
		myBatisDAO.update(gzrzAttachment);
		return true;
	}

	@Override
	public boolean deleteGzrzAttachment(GzrzAttachment gzrzAttachment) {
		myBatisDAO.delete(gzrzAttachment);
		return true;
	}

	@Override
	public GzrzAttachment getGzrzAttachment(GzrzAttachment gzrzAttachment) {
		return (GzrzAttachment) myBatisDAO.findForObject(gzrzAttachment);
	}

//<=================定制内容开始==============
//==================定制内容结束==============>

}