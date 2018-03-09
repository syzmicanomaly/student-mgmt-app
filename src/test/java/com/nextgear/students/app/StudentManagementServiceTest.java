package com.nextgear.students.app;

import com.nextgear.students.db.InvalidStudentException;
import com.nextgear.students.db.PersistenceException;
import com.nextgear.students.db.StudentAlreadyExistsException;
import com.nextgear.students.model.Student;
import com.nextgear.students.utils.DateUtils;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;

import static org.springframework.test.annotation.DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD;

/**
 * Basic unit tests for {@link StudentManagementService}.
 *
 * @author Ryan Hardy
 */
@RunWith(SpringRunner.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.NONE)
@Transactional(propagation = Propagation.NEVER)
@ContextConfiguration(classes = NextGearStudentApp.class)
@DirtiesContext(classMode = BEFORE_EACH_TEST_METHOD)
@ActiveProfiles("demo")
public class StudentManagementServiceTest {

	final Random r = new Random();

	@Autowired
	private StudentManagementService studentManagementService;

	@Test
	public void getAllStudents() throws PersistenceException {
		final List<Student> students = studentManagementService.getAllStudents();
		Assert.assertNotNull("The students list is null", students);
		Assert.assertEquals("The student list should contain 3 elements", 3, students.size());
	}

	@Test
	public void createStudent() throws InvalidStudentException, StudentAlreadyExistsException, PersistenceException {

		Student student;
		final String existingEmail;

		// happy path
		student = createTestStudent();
		existingEmail = student.getEmail();
		studentManagementService.createStudent(student);

		// bad first name
		student = createTestStudent();

		student.setFirstName("");
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Empty first name should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
		student.setFirstName("     ");
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Blank first name should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
		student.setFirstName(null);
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Null first name should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}

		// bad last name
		student = createTestStudent();

		student.setLastName("");
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Empty last name should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
		student.setLastName("     ");
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Blank last name should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
		student.setLastName(null);
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Null last name should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}

		// bad email
		student = createTestStudent();

		student.setEmail("");
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Empty email should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
		student.setEmail("     ");
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Blank email should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
		student.setEmail(null);
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Null email should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}

		// non-distinct email
		student = createTestStudent();
		student.setEmail(existingEmail);
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Non-distinct email should cause exception");
		} catch (final StudentAlreadyExistsException e) {
			// ignored
		}

		// bad birthdate
		student = createTestStudent();
		student.setBirthDate(null);
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Null birth date should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}

		// birthdate in future
		student = createTestStudent();
		student.setBirthDate(DateUtils.asDate(LocalDate.now().plus(30, ChronoUnit.DAYS)));
		try {
			studentManagementService.createStudent(student);
			Assert.fail("Birth date in future should cause exception");
		} catch (final InvalidStudentException e) {
			// ignored
		}
	}


	@Test
	public void updateStudent() throws InvalidStudentException, StudentAlreadyExistsException, PersistenceException {
		final Student student = createTestStudent();
		final Student created = studentManagementService.createStudent(student);

		created.setFirstName("NewFirstName");
		final Student updated = studentManagementService.updateStudent(created);

		Assert.assertNotNull("Updated object is null", updated);
		Assert.assertEquals("", "NewFirstName", updated.getFirstName());
	}

	@Test
	public void deleteStudentBybId() throws PersistenceException, InvalidStudentException, StudentAlreadyExistsException {
		final Student student = createTestStudent();
		final Student created = studentManagementService.createStudent(student);

		List<Student> allStudents = studentManagementService.getAllStudents();
		Assert.assertTrue("All students does not contain created student", allStudents.contains(created));

		final Long id = created.getId();
		studentManagementService.deleteStudentById(id);

		allStudents = studentManagementService.getAllStudents();
		Assert.assertFalse("All students contains deleted student", allStudents.contains(created));

	}


	private Student createTestStudent() {
		final int i = r.nextInt();
		final Student student = new Student(
				"test" + i + "@test.com",
				"Test" + i,
				"Test" + i,
				LocalDate.of(1976,3,3)
		);
		return student;
	}
}