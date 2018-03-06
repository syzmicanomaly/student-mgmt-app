package com.nextgear.students.app;

import com.nextgear.students.db.impl.UserSpringRepo;
import com.nextgear.students.model.Student;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityExistsException;
import javax.persistence.TransactionRequiredException;
import java.util.ArrayList;
import java.util.List;

/**
 * @author Ryan Hardy
 */
@Service
public class StudentManagementService {
	private static final Logger LOGGER = LoggerFactory.getLogger(StudentManagementService.class);

	private final UserSpringRepo userRepo;

	@Autowired
	public StudentManagementService(final UserSpringRepo userRepo) {
		Assert.notNull(userRepo, "The UserSpringRepo is required");
		this.userRepo = userRepo;
	}

	public List<Student> getAllStudents() throws PersistenceException {
		final Iterable<Student> all;
		try {
			all = this.userRepo.findAll();
		} catch (Exception e) {
			LOGGER.error("Could not fetch all Students.", e);
			throw new PersistenceException("Could not fetch all Students.", e);
		}
		final List<Student> students = new ArrayList<>();
		all.forEach(students::add);
		return students;
	}

	public Student createStudent(final Student student) throws IllegalArgumentException, PersistenceException {
		validateStudent(student);
		Assert.isNull(student.getId(), "Student object must not have id set");

		final Student saved;
		try {
			saved = this.userRepo.save(student);
			LOGGER.info("Created new Student: {}", saved);
		} catch (final EntityExistsException e) {
			LOGGER.error("Can not create Student, Student to create is not unique.", e);
			throw new PersistenceException("Student is not unique", e);
		} catch (final TransactionRequiredException e) {
			LOGGER.error("Can not create Student, no transaction found.", e);
			throw new PersistenceException("Can not create Student, no transaction found.", e);
		}

		return saved;
	}

	public Student updateStudent(final Student student) throws PersistenceException {
		validateStudent(student);
		Assert.notNull(student.getId(), "Student object must an id");

		final Student updated;
		try {
			updated = this.userRepo.save(student);
			LOGGER.info("Updated Student: {}", updated);
		} catch (final TransactionRequiredException e) {
			LOGGER.error("Can not update Student, no transaction found.", e);
			throw new PersistenceException("Can not update Student, no transaction found.", e);
		}

		return updated;
	}

	public void deleteStudentBybId(final Long id) {
		Assert.notNull(id, "Student id is required for call to delete");

		try {
			this.userRepo.delete(id);
			LOGGER.info("Student with id {} has been deleted", id);
		} catch (final EmptyResultDataAccessException e) {
			LOGGER.warn("Can not delete Student with id {}, no Student found.", id, e);
		}
	}

	private void validateStudent(final Student student) {
		Assert.notNull(student, "Student object is required");

		Assert.hasLength(student.getEmail(), "Student email is required");
		Assert.hasLength(student.getEmail().trim(), "Student email must not be empty string");
		//TODO ensure valid email address

		Assert.hasLength(student.getFirstName(), "Student first name is required");
		Assert.hasLength(student.getFirstName().trim(), "Student first must not be empty string");

		Assert.hasLength(student.getLastName(), "Student last name is required");
		Assert.hasLength(student.getLastName().trim(), "Student last must not be empty string");

		Assert.notNull(student.getBirthDate(), "Student birth date is required");
	}
}
