package com.tzt.workLog.core.cache;

public class RedisConfigurer {

	private String host;
	private int port;
	private String auth;
	private String pubsubSubject;

	public String getHost() {
		return host;
	}

	public void setHost(String host) {
		this.host = host;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public String getAuth() {
		return auth;
	}

	public void setAuth(String redisAuth) {
		this.auth = redisAuth;
	}

	public String getPubsubSubject() {
		return pubsubSubject;
	}

	public void setPubsubSubject(String redisSubject) {
		this.pubsubSubject = redisSubject;
	}

}