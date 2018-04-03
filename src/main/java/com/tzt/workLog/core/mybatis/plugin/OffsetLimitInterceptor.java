package com.tzt.workLog.core.mybatis.plugin;

import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.MappedStatement.Builder;
import org.apache.ibatis.mapping.SqlSource;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

import com.tzt.workLog.core.mybatis.dialect.Dialect;
import com.tzt.workLog.tool.properties.PropertiesHelper;

/**
 * 为ibatis3提供基于方言(Dialect)的分页查询的插件<br>
 * 
 * 将拦截Executor.query()方法实现分页方言的插入<br>
 * 
 * 配置文件内容:
 * 
 * <pre>
 * 	&lt;plugins>
 * 	&lt;plugin interceptor="ewell.nis.common.ibatis.plugin.OffsetLimitInterceptor">
 * 		&lt;property name="dialectClass" value="ewell.nis.common.ibatis.dialect.MySQLDialect"/>
 * 	&lt;/plugin>
 * &lt;/plugins>
 * </pre>
 */
@Intercepts( { @Signature(type = Executor.class, method = "query", args = {
		MappedStatement.class, Object.class, RowBounds.class,
		ResultHandler.class }) })
public class OffsetLimitInterceptor implements Interceptor {

	private static int MAPPED_STATEMENT_INDEX = 0;

	private static int PARAMETER_INDEX = 1;

	private static int ROWBOUNDS_INDEX = 2;

	private Dialect dialect;

	@Override
	public Object intercept(Invocation invocation) throws Throwable {

		processIntercept(invocation.getArgs());
		return invocation.proceed();
	}

	void processIntercept(final Object[] queryArgs) {

		// queryArgs = query(MappedStatement ms, Object parameter, RowBounds
		// rowBounds, ResultHandler resultHandler)
		MappedStatement ms = (MappedStatement) queryArgs[MAPPED_STATEMENT_INDEX];
		Object parameter = queryArgs[PARAMETER_INDEX];
		final RowBounds rowBounds = (RowBounds) queryArgs[ROWBOUNDS_INDEX];
		int offset = rowBounds.getOffset();
		int limit = rowBounds.getLimit();

		if (dialect.supportsLimit()
				&& (offset != RowBounds.NO_ROW_OFFSET || limit != RowBounds.NO_ROW_LIMIT)) {
			BoundSql boundSql = ms.getBoundSql(parameter);
			String sql = boundSql.getSql().trim();
			if (dialect.supportsLimitOffset()) {
				sql = dialect.getLimitString(sql, offset, limit);
				offset = RowBounds.NO_ROW_OFFSET;
			}
			else {
				sql = dialect.getLimitString(sql, 0, offset+limit);
			}
			limit = RowBounds.NO_ROW_LIMIT;

			queryArgs[ROWBOUNDS_INDEX] = new RowBounds(offset, limit);
			BoundSql newBoundSql = new BoundSql(ms.getConfiguration(), sql,
					boundSql.getParameterMappings(), boundSql
							.getParameterObject());
			MappedStatement newMs = copyFromMappedStatement(ms,
					new BoundSqlSqlSource(newBoundSql));
			queryArgs[MAPPED_STATEMENT_INDEX] = newMs;
		}
	}

	// see: MapperBuilderAssistant
	private MappedStatement copyFromMappedStatement(MappedStatement ms,
			SqlSource newSqlSource) {

		Builder builder = new MappedStatement.Builder(ms.getConfiguration(), ms
				.getId(), newSqlSource, ms.getSqlCommandType());

		builder.resource(ms.getResource());
		builder.fetchSize(ms.getFetchSize());
		builder.statementType(ms.getStatementType());
		builder.keyGenerator(ms.getKeyGenerator());
		builder.keyProperty(getKeyProperty(ms.getKeyProperties()));

		// setStatementTimeout()
		builder.timeout(ms.getTimeout());

		// setStatementResultMap()
		builder.parameterMap(ms.getParameterMap());

		// setStatementResultMap()
		builder.resultMaps(ms.getResultMaps());
		builder.resultSetType(ms.getResultSetType());

		// setStatementCache()
		builder.cache(ms.getCache());
		builder.flushCacheRequired(ms.isFlushCacheRequired());
		builder.useCache(ms.isUseCache());

		return builder.build();
	}

	public Object plugin(Object target) {

		return Plugin.wrap(target, this);
	}

	public void setProperties(Properties properties) {

		String dialectClass = new PropertiesHelper(properties)
				.getRequiredString("dialectClass");
		try {
			dialect = (Dialect) Class.forName(dialectClass).newInstance();
		} catch (Exception e) {
			throw new RuntimeException(
					"cannot create dialect instance by dialectClass:"
							+ dialectClass, e);
		}
		System.out.println(OffsetLimitInterceptor.class.getSimpleName()
				+ ".dialect=" + dialectClass);
	}
	
	private String getKeyProperty(String[] keyProperties) {

		StringBuilder builder = new StringBuilder();
		if (keyProperties != null && keyProperties.length > 0) {
			int length = keyProperties.length;
			for (int i = 0; i < length; i++) {
				builder.append(keyProperties[i]);
				if (i < length -1) {
					builder.append(",");
				}
			}
			return builder.toString();
		}
		
		return null;
	}

	public static class BoundSqlSqlSource implements SqlSource {

		private BoundSql boundSql;

		public BoundSqlSqlSource(BoundSql boundSql) {

			this.boundSql = boundSql;
		}

		public BoundSql getBoundSql(Object parameterObject) {

			return boundSql;
		}
	}
}
