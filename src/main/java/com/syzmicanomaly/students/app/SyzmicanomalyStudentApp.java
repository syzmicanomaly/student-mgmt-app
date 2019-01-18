package com.syzmicanomaly.students.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * Main entry point and config for Spring Boot application.
 *
 * @author Ryan Hardy
 */
@SpringBootApplication(scanBasePackages = {
	"com.syzmicanomaly.students.app", "com.syzmicanomaly.students.db.impl", "com.syzmicanomaly.students.rest"
})
@EnableJpaRepositories(basePackages = { "com.syzmicanomaly.students.db.impl" })
@EntityScan(basePackages = { "com.syzmicanomaly.students.model" })
public class SyzmicanomalyStudentApp {
	private static final Logger LOGGER = LoggerFactory.getLogger(SyzmicanomalyStudentApp.class);

	public static void main(final String[] args) {
		LOGGER.info("Preparing to fire up SyzmicanomalyStudentApp in Spring Boot...");
		@SuppressWarnings("unused") // left here for examination while debugging
		final ConfigurableApplicationContext context = SpringApplication.run(SyzmicanomalyStudentApp.class, args);
		LOGGER.info("SyzmicanomalyStudentApp has started in Spring Boot.");
	}

}
