package com.tzt.workLog.tool;

import java.io.InputStreamReader;
import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.DefaultHttpClient;

public class HttpClientRequestUtil {
	private static HttpClient httpclient;
	public static HttpPost httppost;

	public static String getResponse(String url,String paramStr) {
		String responseString="";
		try {
			//发送post请求 传输无参数据 方法
			httpclient = new DefaultHttpClient();
			httppost = new HttpPost(url); 
			StringEntity myEntity = new StringEntity(paramStr, "utf-8");
			//httppost.addHeader("AllowAutoRedirect", "False");
			httppost.addHeader("Content-Type", "text/xml; charset=utf-8");
			//Content-Type:text/html(html),image/jpeg(jpg),text/plain(txt),text/javascript(javascript),text/json(json),application/x-json(json)
			httppost.addHeader("Method","POST");
			httppost.addHeader("SOAPAction","");
			httppost.addHeader("Timeout","100000");
			//发送实体
			httppost.setEntity(myEntity); 
			//执行请求
			HttpResponse response = httpclient.execute(httppost);
			
			HttpEntity resEntity = response.getEntity();
			InputStreamReader reader = new InputStreamReader(resEntity.getContent(), "UTF-8");
			StringBuffer sb=new StringBuffer();
			char[] buff = new char[1024]; 
			int length = 0;
			while ((length = reader.read(buff)) != -1) {
			  sb.append(new String(buff, 0, length));
			} 
			responseString= sb.toString();
		}  catch (Exception e) {
			e.printStackTrace();
		}finally{
			//关闭连接，释放资源
			httpclient.getConnectionManager().shutdown();
		}
		return responseString;
	}

	public static void main(String[] args) {
		StringBuffer buffer = new StringBuffer("<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" "
				+ "xmlns:ser=\"http://service.webservice.linkstec.com/\"><soapenv:Header/><soapenv:Body> <ser:saveKHLY>");
		buffer.append("<khid>").append(1)
		.append("</khid>").append("<khxm>").append(1).append("</khxm>").append("<lynr>")
		.append(1).append("</lynr></ser:saveKHLY></soapenv:Body></soapenv:Envelope>");
		
		System.out.println(getResponse("http://218.17.23.202:8002/lmsp-zscrm-bl/ZsJfWebService?wsdl", buffer.toString()));
	}
}
