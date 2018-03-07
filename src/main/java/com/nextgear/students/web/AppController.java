package com.nextgear.students.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AppController {

	@RequestMapping(value = "/")
	public String index() {
		return "index";
	}
}
