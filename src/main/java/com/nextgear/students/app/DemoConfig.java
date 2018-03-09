package com.nextgear.students.app;

import com.nextgear.students.model.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;

import java.time.LocalDate;

/**
 * Spring config for loading demo data (alsoe does create-drop on DB).
 *
 * @author Ryan Hardy
 */
@Configuration
@Profile("demo")
public class DemoConfig {

	private final StudentManagementService studentManagementService;

	@Autowired
	public DemoConfig(final StudentManagementService studentManagementService) {
		this.studentManagementService = studentManagementService;
	}

	@Bean
	public CommandLineRunner testDataPopulator() {
		return args -> {
			studentManagementService.createStudent(new Student("ryan@hardwyred.net", "Ryan", "Hardy", LocalDate.of(1976, 8, 8)));
			studentManagementService.createStudent(new Student("doh@springfield.org", "Homer", "Simpson", LocalDate.of(1956, 5, 12)));
			studentManagementService.createStudent(new Student("dude@abides.ca", "Jeff", "Lebowski", LocalDate.of(1942, 12, 4)));
		};
	}
}
