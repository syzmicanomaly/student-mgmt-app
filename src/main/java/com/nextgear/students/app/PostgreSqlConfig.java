package com.nextgear.students.app;

import org.postgresql.ds.PGSimpleDataSource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import javax.sql.DataSource;

@Profile("postgresql")
public class PostgreSqlConfig extends BaseDbConfig {

	@Bean
	public DataSource dataSource() {
		final PGSimpleDataSource dataSource = new PGSimpleDataSource();
		dataSource.setDatabaseName(databaseName);

		return dataSource;
	}
}
