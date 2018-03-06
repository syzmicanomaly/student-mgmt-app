package com.nextgear.students.app;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Collections;

import static springfox.documentation.builders.PathSelectors.regex;

@Configuration
@EnableSwagger2
@Profile("swagger")
public class SwaggerConfiguration {

	@Bean
	public Docket api() {
		return new Docket(DocumentationType.SWAGGER_2).
				select().
				apis(RequestHandlerSelectors.basePackage("com.nextgear.students.rest")).
				paths(regex("/student.*")).
				build().
				apiInfo(metaData())
		;
	}

	private ApiInfo metaData() {
		final ApiInfo apiInfo = new ApiInfo(
				"NextGear Capital Student Management System REST API",
				"Student Management System REST API",
				"1.0.0",
				"Terms of service",
				new Contact("Ryan Hardy", "http://www.hardwyred.net", "ryan@hardwyred.net"),
				"Apache License Version 2.0",
				"https://www.apache.org/licenses/LICENSE-2.0",
				Collections.emptyList()
		);
		return apiInfo;
	}
}
