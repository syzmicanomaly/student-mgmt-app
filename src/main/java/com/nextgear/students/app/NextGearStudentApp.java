package com.nextgear.students.app;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ConfigurableApplicationContext;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

/**
 * @author Ryan Hardy
 */
@SpringBootApplication(scanBasePackages = {"com.nextgear.students.app", "com.nextgear.students.db.impl", "com.nextgear.students.rest"})
@EnableJpaRepositories(basePackages = {"com.nextgear.students.db.impl"})
@EntityScan(basePackages = {"com.nextgear.students.model"})
public class NextGearStudentApp {
	private static final Logger LOGGER = LoggerFactory.getLogger(NextGearStudentApp.class);

	public static void main(final String[] args) {
		LOGGER.info("Preparing to fire up NextGearStudentApp in Spring Boot...");
		@SuppressWarnings("unused") // left here for examination while debugging
		final ConfigurableApplicationContext context = SpringApplication.run(NextGearStudentApp.class, args);
		LOGGER.info("NextGearStudentApp has started in Spring Boot.");
	}

}
