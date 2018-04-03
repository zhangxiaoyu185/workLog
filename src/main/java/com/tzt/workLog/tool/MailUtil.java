package com.tzt.workLog.tool;

import java.net.MalformedURLException;
import java.net.URL;
import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.Message.RecipientType;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import org.apache.commons.mail.DefaultAuthenticator;
import org.apache.commons.mail.EmailAttachment;
import org.apache.commons.mail.EmailException;
import org.apache.commons.mail.HtmlEmail;

public class MailUtil {

	/**
	 * html格式发送邮件
	 * @param hostName
	 * @param isTLS
	 * @param isSSL
	 * @param Authenticator
	 * @param pwd
	 * @param Charset
	 * @param toMail
	 * @param toAuthor
	 * @param fromMail
	 * @param fromAuthor
	 * @param strCc
	 * @param Bcc
	 * @param mailTitle
	 * @param mailContent
	 * @param strUrl 相对路径集合
	 * @param picName
	 * @param attachmentUrl
	 * @param attachmentDesc
	 * @param attachmentName
	 * @return
	 */
	public static String htmlsend(String hostName, Boolean isTLS, Boolean isSSL,
			String Authenticator, String pwd, String Charset, String[] toMail,
			String[] toAuthor, String fromMail, String fromAuthor,String strCc,String Bcc,
			String mailTitle, String mailContent, String[] strUrl,
			String[] picName,String[] attachmentUrl,String[] attachmentDesc,String[] attachmentName) {
		HtmlEmail email = new HtmlEmail();
		email.setHostName(hostName); // 例如："smtp.163.com",为SMTP发送服务器的名字
		email.setTLS(isTLS); // 是否TLS校验
		email.setSSL(isSSL); // 是否SSL校验
		// 如果需要认证信息的话，设置认证：用户名-密码。分别为发件人在邮件服务器上的注册名称和密码
		email.setAuthenticator(new DefaultAuthenticator(Authenticator, pwd));
		try {
			email.setCharset(Charset);
			//收件人
			for(int i = 0;i<toMail.length;i++){
				email.addTo(toMail[i], toAuthor[i]);
			}
			//发件人
			email.setFrom(fromMail, fromAuthor);
			email.addCc(strCc); // 抄送方
			email.addBcc(Bcc); // 秘密抄送方
			// 邮件标题
			email.setSubject(mailTitle);
			// 要发送的信息，由于使用了HtmlEmail，可以在邮件内容中使用HTML标签
			email.setMsg(mailContent);
			//绝对路径
			EmailAttachment attachment;
			for(int x=0;x<attachmentUrl.length;x++){
				attachment= new EmailAttachment();	
				attachment.setPath(attachmentUrl[x]);// 绝对路径
				attachment.setDisposition(EmailAttachment.ATTACHMENT);
				attachment.setDescription(attachmentDesc[x]);
				attachment.setName(attachmentName[x]);	
				email.attach(attachment);
			}
			//相对路径
			String htmlmsg = "<html><p>"+mailContent+"</p>";
			String testmsg = "";
			for(int j=0;j<strUrl.length;j++){
				URL url = new URL(strUrl[j]);
				email.embed(url, picName[j]);// 变成附件
				htmlmsg+="<img src='" + url + "' />";
				testmsg+=picName[j];
			}
			if(!("<html><p>"+mailContent+"</p>").equals(htmlmsg)){
				email.setHtmlMsg(htmlmsg+"</html>");// 输出到内容中
				email.setTextMsg(testmsg);// 假如图片失效时显示的文字
			}
			email.send();
			System.out.print("ok");
			return "success";
		} catch (EmailException e) {
			e.printStackTrace();
		} catch (MalformedURLException e) {
			e.printStackTrace();
		}
		return "error";
	}

	/**
	 * 发送邮件
	 * @param content
	 * @param 对方邮箱
	 * @throws MessagingException
	 */
	public static void sendMail(String content, String email)  throws MessagingException {
		// 配置发送邮件的环境属性
        final Properties props = new Properties();
        /*
         * 可用的属性： mail.store.protocol / mail.transport.protocol / mail.host /
         * mail.user / mail.from
         */
        // 表示SMTP发送邮件，需要进行身份验证
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.host", "smtp.163.com");
        // 发件人的账号
        props.put("mail.user", "zy135185@163.com");
        // 访问SMTP服务时需要提供的密码
        props.put("mail.password", "123456a");
        // 构建授权信息，用于进行SMTP进行身份验证
        Authenticator authenticator = new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                // 用户名、密码
                String userName = props.getProperty("mail.user");
                String password = props.getProperty("mail.password");
                return new PasswordAuthentication(userName, password);
            }
        };
        // 使用环境属性和授权信息，创建邮件会话
        Session mailSession = Session.getInstance(props, authenticator);
        // 创建邮件消息
        MimeMessage message = new MimeMessage(mailSession);
        // 设置发件人
        InternetAddress form = new InternetAddress(props.getProperty("mail.user"));
        message.setFrom(form);
        // 设置收件人
        InternetAddress to = new InternetAddress(email);
        message.setRecipient(RecipientType.TO, to);
        // 设置抄送
        //InternetAddress cc = new InternetAddress("muxiaoren@gmail.com");
        //message.setRecipient(RecipientType.CC, cc);
        // 设置密送，其他的收件人不能看到密送的邮件地址
        //InternetAddress bcc = new InternetAddress("1556377990@qq.com");
        //message.setRecipient(RecipientType.CC, bcc);
        // 设置邮件标题
        message.setSubject("邮件验证激活");
        // 设置邮件的内容体
        message.setContent(content, "text/html;charset=UTF-8");
        // 发送邮件
        Transport.send(message);
	}
	
	public static void main(String[] args) {
		String[] list1 = new String[]{"zy135185@163.com","zy1351851@163.com"};
		String[] list2 = new String[]{"zy1","zy2"};
		String[] url1 = new String[]{"http://www.baidu.com/img/bdlogo.gif","http://www.baidu.com/cache/global/img/gs.gif"};
		String[] url2 = new String[]{"bdlogo.gif","gs.gif"};
		String[] fj1 = new String[]{"F:\\Material\\image\\oracle.txt","F:\\Material\\image\\多线程的程序设计在线判题系统4-24.doc"};
		String[] fj2 = new String[]{"ms1","ms2"};
		String[] fj3 = new String[]{"name1","name2"};
		htmlsend("smtp.163.com", true, true, "zy135185@163.com", "123456a",
				"GBK", list1, list2, "zy135185@163.com", "zy3",
				"muxiaoren@gmail.com","muxiaoren@gmail.com","123", "456",url1,url2,fj1,fj2,fj3);
	}
}
