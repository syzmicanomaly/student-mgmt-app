package com.nextgear.students.app;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
abstract class BaseDbConfig {

	@Value("${com.nextgear.db.name}")
	protected String databaseName;

	@Value("${com.nextgear.db.host}")
	protected String databaseHost;

	@Value("${com.nextgear.db.port}")
	protected Integer databasePort;

	@Value("${com.nextgear.db.user}")
	protected String databaseUser;

	@Value("${com.nextgear.db.password}")
	protected String databasePassword;
}
