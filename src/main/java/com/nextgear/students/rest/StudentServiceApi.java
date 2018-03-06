package com.nextgear.students.rest;

import com.nextgear.students.app.PersistenceException;
import com.nextgear.students.app.StudentManagementService;
import com.nextgear.students.model.Student;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Assert;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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

	@ApiOperation(value = "Gets all Students", response = Student.class, responseContainer = "List")
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public Iterable<Student> getAllStudents() throws PersistenceException {
		final List<Student> allStudents = studentManagementService.getAllStudents();
		return allStudents;
	}

	@ApiOperation(value = "Creates new Student", response = Student.class)
	@RequestMapping(value = "/create", method = RequestMethod.POST)
	public Student createStudent(@RequestBody final Student student) throws IllegalArgumentException, PersistenceException {
		final Student created = studentManagementService.createStudent(student);
		return created;
	}

	@ApiOperation(value = "Updates existing Student", response = Student.class)
	@RequestMapping(value = "/update", method = RequestMethod.PUT)
	public Student updateStudent(@RequestBody final Student student) throws PersistenceException {
		final Student updated = studentManagementService.updateStudent(student);
		return updated;
	}

	@ApiOperation(value = "Deletes existing Student", response = ResponseEntity.class)
	@RequestMapping(value = "/delete/{id}", method = RequestMethod.DELETE)
	public ResponseEntity<String> deleteStudentBybId(@PathVariable("id") final Long id) {
		studentManagementService.deleteStudentBybId(id);
		return new ResponseEntity<>("Student was deleted successfully", HttpStatus.OK);
	}

}
