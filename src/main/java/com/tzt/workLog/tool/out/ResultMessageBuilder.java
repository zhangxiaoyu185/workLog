package com.tzt.workLog.tool.out;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

public class ResultMessageBuilder {

	private static final SerializerFeature[] JSON_SERIALIZER_FEATURES =
		new SerializerFeature[] { SerializerFeature.DisableCircularReferenceDetect };
	
	public static ResultMessage build() {
		return new ResultMessage();
	}

	public static ResultMessage build(Object data) {
		return new ResultMessage(data);
	}

	public static ResultMessage build(boolean success, String errMsg) {
		return new ResultMessage(success, errMsg);
	}

	public static ResultMessage build(boolean success, Integer code, String errMsg) {
		return new ResultMessage(success, code, errMsg);
	}

	public static ResultMessage build(boolean success, String errMsg, Object data) {
		return new ResultMessage(success, errMsg, data);
	}

	public static ResultMessage build(boolean success, Integer code, String errMsg, Object data) {
		return new ResultMessage(success, code, errMsg, data);
	}

	public static ResultMessageRaw buildRaw(String jsonStr) {
		return new ResultMessageRaw(jsonStr);
	}

	public static class ResultMessage {

		private boolean success = true;
		private Integer code = null;
		private String errMsg = null;
		private Object data = null;

		public ResultMessage() {}

		public ResultMessage(Object data) {
			this.data = data;
		}

		public ResultMessage(boolean success, String errMsg) {
			this.success = success;
			this.errMsg = errMsg;
		}

		public ResultMessage(boolean success, Integer code, String errMsg) {
			this.success = success;
			this.code = code;
			this.errMsg = errMsg;
		}

		public ResultMessage(boolean success, String errMsg, Object data) {
			this.success = success;
			this.errMsg = errMsg;
			this.data = data;
		}

		public ResultMessage(boolean success, Integer code, String errMsg, Object data) {
			this.success = success;
			this.code = code;
			this.errMsg = errMsg;
			this.data = data;
		}

		public boolean isSuccess() {
			return success;
		}

		public ResultMessage setSuccess(boolean success) {
			this.success = success;
			return this;
		}

		public Integer getCode() {
        	return code;
        }

		public void setCode(Integer code) {
        	this.code = code;
        }

		public String getErrMsg() {
			return errMsg;
		}

		public ResultMessage setErrMsg(String errMsg) {
			this.errMsg = errMsg;
			return this;
		}

		public Object getData() {
			return data;
		}

		public ResultMessage setData(Object data) {
			this.data = data;
			return this;
		}

		public String toJSONString() {
			return JSON.toJSONString(this, JSON_SERIALIZER_FEATURES);
		}

		public String toJSONStringWithDateFormat(String dateFormat) {
			return JSON.toJSONStringWithDateFormat(this, dateFormat, JSON_SERIALIZER_FEATURES);
		}
	}

	public static class ResultMessageRaw {

		private String jsonStr = null;

		public ResultMessageRaw() {
			
		}

		public ResultMessageRaw(String jsonStr) {
			this.jsonStr = jsonStr;
		}

		public String getJsonStr() {
			return jsonStr;
		}

		public void setJsonStr(String jsonStr) {
			this.jsonStr = jsonStr;
		}

		public String toJSONString() {
			StringBuilder buff = new StringBuilder("{\"success\": true, \"data\": ");
			buff.append(jsonStr).append("}");
			return buff.toString();
		}
	}

}