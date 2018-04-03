package com.tzt.workLog.core.exception.message;

import java.io.InputStream;
import java.net.URL;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Enumeration;
import java.util.Iterator;
import java.util.List;

import org.dom4j.Document;
import org.dom4j.Element;
import org.dom4j.io.SAXReader;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class MessageDefParser {

	private Logger logger = LoggerFactory.getLogger(MessageDefParser.class);
	
	private String DEFAULT_MESSAGE_DEFINITION_PATH = "message_definition.xml";
//	private String ISD_MESSAGE_DEFINITION_PATH = "isd_message_definition.xml"; // 框架内部的异常编码

	public Collection<MessageDefinition> parseMessageDef() {

		// String msgDefFile = DEFAULT_MESSAGE_DEFINITION_PATH;
		List<MessageDefinition> msgDefList = new ArrayList<MessageDefinition>();
		try {
			msgDefList = loadMsgDefs(getClass().getClassLoader().getResources(DEFAULT_MESSAGE_DEFINITION_PATH));
		} catch (Exception e) {
			throw new RuntimeException(e);
		}
		return msgDefList;
	}

	@SuppressWarnings("unchecked")
	private List<MessageDefinition> loadMsgDefs(Enumeration<URL> resources)
			throws Exception {		
		List<MessageDefinition> msgDefList = new ArrayList<MessageDefinition>();
		if (resources != null) {
			while (resources.hasMoreElements()){
				URL resource = resources.nextElement();
				InputStream inputStream = resource.openStream();
				if (inputStream == null) {
					logger.warn("未正确加载错误定义文件:" + resource);
					continue;
				}
				SAXReader reader = new SAXReader();
				Document doc = reader.read(inputStream);
				Element rootNode = doc.getRootElement();
				Iterator<Element> msgDefNodes = rootNode.elementIterator();
				while (msgDefNodes.hasNext()) {
					Element msgDefNode = msgDefNodes.next();
					MessageDefinition msgDef = new MessageDefinition();
					msgDef.setId(Integer.parseInt(msgDefNode.attributeValue("id")));
					msgDef.setInternalCode(msgDefNode.attributeValue("interCode"));
					msgDef.setExternalCode(msgDefNode.attributeValue("exterCode"));
					msgDef.setLevel(msgDefNode.attributeValue("level"));
					msgDef.setMessage(msgDefNode.attributeValue("msg"));
					msgDef.setMessageEn(msgDefNode.attributeValue("msg_en"));
					
					msgDefList.add(msgDef);
				}
				inputStream.close();
			}
		}
		
		return msgDefList;
	}
	
}