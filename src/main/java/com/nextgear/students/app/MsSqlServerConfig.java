package com.nextgear.students.app;

import com.microsoft.sqlserver.jdbc.SQLServerDataSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Profile("mssql-server")
public class MsSqlServerConfig extends BaseDbConfig {

	@Bean
	public DataSource dataSource() {
		final SQLServerDataSource dataSource = new SQLServerDataSource();
		dataSource.setDatabaseName(databaseName);
		return dataSource;
	}

}
