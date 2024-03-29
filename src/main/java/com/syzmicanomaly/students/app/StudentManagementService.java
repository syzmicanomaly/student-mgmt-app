package com.syzmicanomaly.students.app;

import com.syzmicanomaly.students.db.InvalidStudentException;
import com.syzmicanomaly.students.db.PersistenceException;
import com.syzmicanomaly.students.db.StudentAlreadyExistsException;
import com.syzmicanomaly.students.db.impl.UserSpringRepo;
import com.syzmicanomaly.students.model.Student;
import org.apache.commons.validator.routines.EmailValidator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Service;
import org.springframework.util.Assert;

import javax.persistence.EntityExistsException;
import javax.persistence.TransactionRequiredException;
import javax.validation.ConstraintViolationException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * Service facade for management of {@link Student} entities.
 *
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

	/**
	 * Fetches all Students from DB.
	 *
	 * @return list of all Students
	 * @throws PersistenceException if any DB errors occur
	 */
	public List<Student> getAllStudents() throws PersistenceException {
		final Iterable<Student> all;
		try {
			all = this.userRepo.findAll();
		} catch (final Exception e) {
			LOGGER.error("Could not fetch all Students.", e);
			throw new PersistenceException("Could not fetch all Students.", e);
		}
		final List<Student> students = new ArrayList<>();
		all.forEach(students::add);
		return students;
	}

	/**
	 * Creates a new Student in DB.
	 *
	 * @param student Student to create
	 * @return newly created Student instance
	 * @throws InvalidStudentException       if any property is missing/invalid on Student
	 * @throws StudentAlreadyExistsException if any unique property on Student already exists in DB
	 * @throws PersistenceException          if any DB errors occur
	 */
	public Student createStudent(final Student student) throws InvalidStudentException, StudentAlreadyExistsException, PersistenceException {
		try {
			validateStudent(student);
			Assert.isNull(student.getId(), "Student object must not have id set");
		} catch (final Exception e) {
			throw new InvalidStudentException(e.getMessage());
		}

		final Student saved;
		try {
			saved = this.userRepo.save(student);
			LOGGER.info("Created new Student: {}", saved);
		} catch (final EntityExistsException | ConstraintViolationException | DataIntegrityViolationException e) {
			//TODO email is only unique constraint (currently) - need better reporting of failed constraint
			LOGGER.error("Can not create Student, Student already exists with email: " + student.getEmail(), e);
			throw new StudentAlreadyExistsException("Can not create Student, Student already exists with email: " + student.getEmail(), e);

		} catch (final TransactionRequiredException e) {

			LOGGER.error("Can not create Student, no transaction found.", e);
			throw new PersistenceException("Can not create Student, no transaction found.", e);

		} catch (final RuntimeException e) {

			LOGGER.error("Can not create Student, an error occurred.", e);
			throw new PersistenceException("Can not create Student, an error occurred.", e);

		}

		return saved;
	}

	/**
	 * Updates an already existing Student.
	 *
	 * @param student Student to update
	 * @return updated Student
	 * @throws InvalidStudentException       if any property is missing/invalid on Student
	 * @throws StudentAlreadyExistsException if any unique property on Student already exists in DB
	 * @throws PersistenceException          if any DB errors occur
	 */
	public Student updateStudent(final Student student) throws InvalidStudentException, StudentAlreadyExistsException, PersistenceException {
		try {
			validateStudent(student);
			Assert.notNull(student.getId(), "Student object must an id");
		} catch (final Exception e) {
			throw new InvalidStudentException(e.getMessage());
		}

		final Student updated;
		try {
			final Student toCheck = this.userRepo.findOne(student.getId());
			Assert.notNull(toCheck, "No Student found with id " + student.getId());

			updated = this.userRepo.save(student);
			LOGGER.info("Updated Student: {}", updated);
		} catch (final EntityExistsException | ConstraintViolationException | DataIntegrityViolationException e) {
			//TODO email is only unique constraint (currently) - need better reporting of failed constraint
			LOGGER.error("Can not update Student, Student already exists with email: " + student.getEmail(), e);
			throw new StudentAlreadyExistsException("Can not update Student, Student already exists with email: " + student.getEmail(), e);

		} catch (final IllegalArgumentException e) {

			LOGGER.error("Can not update Student", e);
			throw new InvalidStudentException("Can not update Student: " + e.getMessage());

		} catch (final TransactionRequiredException e) {

			LOGGER.error("Can not update Student, no transaction found.", e);
			throw new PersistenceException("Can not update Student, no transaction found.", e);

		} catch (final RuntimeException e) {

			LOGGER.error("Can not update Student, an error occurred.", e);
			throw new PersistenceException("Can not update Student, an error occurred.", e);

		}

		return updated;
	}

	/**
	 * Deletes Student with given persistence id. Will ignore call if no Student is found with provided id.
	 *
	 * @param id id of Student to delete
	 * @throws IllegalArgumentException if id is null
	 * @throws PersistenceException     if any DB errors occur
	 */
	public void deleteStudentById(final Long id) throws IllegalArgumentException, PersistenceException {
		Assert.notNull(id, "Student id is required for call to delete");

		try {
			this.userRepo.delete(id);
			LOGGER.info("Student with id {} has been deleted", id);
		} catch (final EmptyResultDataAccessException e) {
			LOGGER.warn("Can not delete Student with id {}, no Student found.", id, e);
		} catch (final RuntimeException e) {
			LOGGER.error("Can not delete Student, an error occurred.", e);
			throw new PersistenceException("Can not delete Student, an error occurred.", e);
		}
	}

	/**
	 * Performs validation on given Student.
	 */
	private void validateStudent(final Student student) {
		Assert.notNull(student, "Student object is required");

		Assert.isTrue(EmailValidator.getInstance(true).isValid(student.getEmail()), "Student must have a valid email");

		Assert.hasLength(student.getFirstName(), "Student first name is required");
		Assert.hasLength(student.getFirstName().trim(), "Student first must not be empty string");

		Assert.hasLength(student.getLastName(), "Student last name is required");
		Assert.hasLength(student.getLastName().trim(), "Student last must not be empty string");

		Assert.notNull(student.getBirthDate(), "Student birth date is required");
		Assert.isTrue(student.getBirthDate().before(new Date()), "Student birth date must be a date in the past");
	}
}
