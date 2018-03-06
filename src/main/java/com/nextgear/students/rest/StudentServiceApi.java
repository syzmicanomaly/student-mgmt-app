package com.nextgear.students.rest;

import com.nextgear.students.db.InvalidStudentException;
import com.nextgear.students.db.PersistenceException;
import com.nextgear.students.app.StudentManagementService;
import com.nextgear.students.db.StudentAlreadyExistsException;
import com.nextgear.students.model.Student;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("student")
@Api("/student")
public class StudentServiceApi {
	private static final Logger LOGGER = LoggerFactory.getLogger(StudentServiceApi.class);

	private final StudentManagementService studentManagementService;

	@Autowired
	public StudentServiceApi(final StudentManagementService studentManagementService) {
		Assert.notNull(studentManagementService, "The StudentManagementService is required");
		this.studentManagementService = studentManagementService;
	}

	@ExceptionHandler(PersistenceException.class)
	public ResponseEntity<Map<String, Object>> handleException(final PersistenceException ex) {
		LOGGER.error("PersistenceException occurred in call to StudentServiceApi", ex);

		final Map<String, Object> error = new HashMap<>();
		if (ex.getCause() == null) {
			error.put("message", ex.getMessage());
		} else {
			error.put("message", ex.getCause().getMessage());
		}
		return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
	}

	@ExceptionHandler(value = {InvalidStudentException.class, StudentAlreadyExistsException.class, IllegalArgumentException.class})
	public ResponseEntity<Map<String, Object>> handleException(final Exception ex) {
		LOGGER.error("{} occurred in call to StudentServiceApi", ex.getClass().getSimpleName(), ex);

		final Map<String, Object> error = new HashMap<>();
		error.put("message", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
	}

	// -----------------------------------------------------------------------------------------------------------------
	// endpoint calls

	@ApiOperation(value = "Gets all Students", response = Student.class, responseContainer = "List")
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public Iterable<Student> getAllStudents() throws PersistenceException {
		final List<Student> allStudents = studentManagementService.getAllStudents();
		return allStudents;
	}

	@ApiOperation(value = "Creates new Student", response = Student.class)
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Student createStudent(@RequestBody final Student student) throws InvalidStudentException, StudentAlreadyExistsException, PersistenceException {
		final Student created = studentManagementService.createStudent(student);
		return created;
	}

	@ApiOperation(value = "Updates existing Student", response = Student.class)
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Student updateStudent(@RequestBody final Student student) throws InvalidStudentException, StudentAlreadyExistsException, PersistenceException {
		final Student updated = studentManagementService.updateStudent(student);
		return updated;
	}

	@ApiOperation(value = "Deletes existing Student", response = ResponseEntity.class)
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteStudentBybId(@PathVariable("id") final Long id) throws PersistenceException {
		studentManagementService.deleteStudentBybId(id);
		return new ResponseEntity<>("Student was deleted successfully", HttpStatus.OK);
	}

}
