package com.tzt.workLog.controller;

import java.util.Locale;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

/**
 * Handles requests for the application home page.
 */
@Controller
public class ApiController {

	private static final Logger logger = LoggerFactory.getLogger("BASE_LOGGER");

	/**
	 * Simply selects the home view to render by returning its name.
	 */
	@RequestMapping(value = "/", method = RequestMethod.GET)
	public String home(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "api";
	}

	@RequestMapping(value = "/api", method = RequestMethod.GET)
	public String t(Locale locale, Model model) {
		logger.info("Welcome home! The client locale is {}.", locale);

		return "api";
	}

}